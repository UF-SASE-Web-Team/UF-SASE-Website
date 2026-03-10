import { Hono } from "hono";
import type { Context } from "hono";
import type { StatusCode } from "hono/utils/http-status";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// ── Shared utils mock ────────────────────────────────────────────────
vi.mock("@/shared/utils", () => ({
  createErrorResponse: (c: Context, errCode: string, errMsg: string, statusCode: StatusCode = 500) =>
    c.json({ error: { errCode, errMsg } }, statusCode),
}));

// ── Redis mock ───────────────────────────────────────────────────────
const mockExec = vi.fn().mockResolvedValue([]);
const mockMulti = vi.fn(() => ({
  hset: vi.fn().mockReturnThis(),
  expire: vi.fn().mockReturnThis(),
  exec: mockExec,
}));
const mockHgetall = vi.fn();

vi.mock("../db/redis", () => ({
  default: {
    hgetall: mockHgetall,
    multi: mockMulti,
  },
}));

// ── Env mock ─────────────────────────────────────────────────────────
vi.mock("../env", () => ({
  SERVER_ENV: {
    RATE_LIMIT_MAX_TOKENS: 5,
    RATE_LIMIT_REFILL_RATE: 2,
    RATE_LIMIT_REFILL_WINDOW_MS: 10_000, // 10 s
  },
}));

// Import AFTER mocks are registered
const { rateLimiter } = await import("../api/rateLimiting");

// ── Test app ─────────────────────────────────────────────────────────
function buildApp() {
  const app = new Hono();
  app.use("*", rateLimiter);
  app.get("/test", (c) => c.json({ ok: true }));
  return app;
}

describe("rateLimiter middleware", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-01-01T00:00:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  // ── IP extraction ────────────────────────────────────────────────
  // Tests the priority chain for resolving client IP:
  //   x-forwarded-for > x-real-ip > cf-connecting-ip > "unknown"
  // The extracted IP is used as the Redis key for per-client rate limiting.
  describe("client IP extraction", () => {
    // Input:  Request with header x-forwarded-for: "1.2.3.4, 5.6.7.8" (comma-separated list)
    // Output: Redis is queried with key "ratelimit:1.2.3.4" (first IP only)
    it("uses x-forwarded-for header (first IP)", async () => {
      mockHgetall.mockResolvedValue({});
      const app = buildApp();
      await app.request("/test", {
        headers: { "x-forwarded-for": "1.2.3.4, 5.6.7.8" },
      });

      const key = mockHgetall.mock.calls[0][0] as string;
      expect(key).toBe("ratelimit:1.2.3.4");
    });

    // Input:  Request with only x-real-ip: "10.0.0.1" (no x-forwarded-for)
    // Output: Redis key is "ratelimit:10.0.0.1"
    it("uses x-real-ip when x-forwarded-for is absent", async () => {
      mockHgetall.mockResolvedValue({});
      const app = buildApp();
      await app.request("/test", {
        headers: { "x-real-ip": "10.0.0.1" },
      });

      const key = mockHgetall.mock.calls[0][0] as string;
      expect(key).toBe("ratelimit:10.0.0.1");
    });

    // Input:  Request with only cf-connecting-ip: "172.16.0.1" (Cloudflare header)
    // Output: Redis key is "ratelimit:172.16.0.1"
    it("uses cf-connecting-ip as fallback", async () => {
      mockHgetall.mockResolvedValue({});
      const app = buildApp();
      await app.request("/test", {
        headers: { "cf-connecting-ip": "172.16.0.1" },
      });

      const key = mockHgetall.mock.calls[0][0] as string;
      expect(key).toBe("ratelimit:172.16.0.1");
    });

    // Input:  Request with no IP-related headers at all
    // Output: Redis key is "ratelimit:unknown"
    it("falls back to 'unknown' when no IP headers present", async () => {
      mockHgetall.mockResolvedValue({});
      const app = buildApp();
      await app.request("/test");

      const key = mockHgetall.mock.calls[0][0] as string;
      expect(key).toBe("ratelimit:unknown");
    });
  });

  // ── User experience scenarios ─────────────────────────────────────
  // These tests simulate realistic user flows to verify the rate limiter
  // works correctly from an end-user's perspective (no Redis password needed).
  describe("user experience scenarios", () => {
    // Scenario: A user visits the site and makes several requests normally.
    // Input:  5 sequential requests from the same IP, each with tokens decremented.
    // Output: All 5 return HTTP 200. Remaining header counts down 4 → 3 → 2 → 1 → 0.
    it("allows a user to make requests up to the limit", async () => {
      const app = buildApp();
      const ip = "203.0.113.50";

      for (let i = 0; i < 5; i++) {
        const remaining = 5 - 1 - i; // MAX_TOKENS - 1 on first, decreasing
        // First request sees empty bucket; subsequent ones see leftover tokens
        if (i === 0) {
          mockHgetall.mockResolvedValueOnce({});
        } else {
          mockHgetall.mockResolvedValueOnce({
            tokenCount: String(5 - i),
            lastUpdated: String(Date.now()),
          });
        }

        const res = await app.request("/test", {
          headers: { "x-forwarded-for": ip },
        });

        expect(res.status).toBe(200);
        expect(res.headers.get("X-RateLimit-Remaining")).toBe(String(remaining));
      }
    });

    // Scenario: A user exhausts their tokens, then gets blocked.
    // Input:  6th request after all 5 tokens are used up.
    // Output: HTTP 429, body tells user how long to wait, Retry-After header present.
    it("blocks a user after they exceed the rate limit and tells them to wait", async () => {
      const app = buildApp();
      const ip = "203.0.113.50";

      // Simulate the 6th request — all tokens used up
      mockHgetall.mockResolvedValue({
        tokenCount: "0",
        lastUpdated: String(Date.now()),
      });

      const res = await app.request("/test", {
        headers: { "x-forwarded-for": ip },
      });

      expect(res.status).toBe(429);
      const body = (await res.json()) as { error: { errCode: string; errMsg: string } };
      expect(body.error.errMsg).toMatch(/try again in \d+ seconds/);
      expect(res.headers.get("Retry-After")).toBeTruthy();
    });

    // Scenario: A user is blocked, waits for the refill window, then can use the site again.
    // Input:  Tokens at 0, but a full 10s refill window has passed since last request.
    // Output: HTTP 200 — user is unblocked and can browse again.
    it("unblocks a user after the refill window passes", async () => {
      const app = buildApp();
      const ip = "203.0.113.50";
      const now = Date.now();

      // User was blocked, but 10s have passed → 2 new tokens available
      mockHgetall.mockResolvedValue({
        tokenCount: "0",
        lastUpdated: String(now - 10_000),
      });

      const res = await app.request("/test", {
        headers: { "x-forwarded-for": ip },
      });

      expect(res.status).toBe(200);
      expect(res.headers.get("X-RateLimit-Remaining")).toBe("1"); // 2 refilled - 1 used
    });

    // Scenario: Two different users hit the site at the same time.
    // Input:  User A has 0 tokens, User B has 3 tokens.
    // Output: User A gets 429, User B gets 200 — they don't affect each other.
    it("one user being rate-limited does not affect other users", async () => {
      const app = buildApp();
      const now = Date.now();

      // User A — blocked
      mockHgetall.mockResolvedValueOnce({
        tokenCount: "0",
        lastUpdated: String(now),
      });
      const resA = await app.request("/test", {
        headers: { "x-forwarded-for": "10.0.0.1" },
      });

      // User B — has tokens
      mockHgetall.mockResolvedValueOnce({
        tokenCount: "3",
        lastUpdated: String(now),
      });
      const resB = await app.request("/test", {
        headers: { "x-forwarded-for": "10.0.0.2" },
      });

      expect(resA.status).toBe(429);
      expect(resB.status).toBe(200);
      expect(resB.headers.get("X-RateLimit-Remaining")).toBe("2");
    });

    // Scenario: A user makes a request but Redis/backend is down.
    // Input:  Redis throws an error when checking rate limit.
    // Output: HTTP 200 — user is NOT blocked, site stays available (fail-open).
    it("does not block users when the rate-limit backend is down", async () => {
      const app = buildApp();
      // Let console.error print so the "Rate limiter error" is visible in test output
      mockHgetall.mockRejectedValue(new Error("Redis unavailable"));

      const res = await app.request("/test", {
        headers: { "x-forwarded-for": "203.0.113.50" },
      });

      expect(res.status).toBe(200);
      expect(await res.json()).toEqual({ ok: true });
      consoleSpy.mockRestore();
    });

    // Scenario: A user waits a long time and comes back — they should have full tokens.
    // Input:  Last request was 10 minutes ago, had 0 tokens.
    // Output: HTTP 200, remaining = MAX_TOKENS - 1 = 4 (fully refilled, capped at max).
    it("fully restores a user's tokens after a long idle period", async () => {
      const app = buildApp();
      const now = Date.now();

      mockHgetall.mockResolvedValue({
        tokenCount: "0",
        lastUpdated: String(now - 600_000), // 10 minutes ago
      });

      const res = await app.request("/test", {
        headers: { "x-forwarded-for": "203.0.113.50" },
      });

      expect(res.status).toBe(200);
      // Fully refilled to MAX_TOKENS=5, minus 1 used = 4
      expect(res.headers.get("X-RateLimit-Remaining")).toBe("4");
      expect(res.headers.get("X-RateLimit-Limit")).toBe("5");
    });
  });
});
