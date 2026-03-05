import { createErrorResponse } from "@/shared/utils";
import type { MiddlewareHandler } from "hono";
import redis from "../db/redis";
import { SERVER_ENV } from "../env";

// Token bucket configuration, controlled by environment variables
const MAX_TOKENS = SERVER_ENV.RATE_LIMIT_MAX_TOKENS;
const REFILL_RATE = SERVER_ENV.RATE_LIMIT_REFILL_RATE; // tokens per window
const REFILL_WINDOW_MS = SERVER_ENV.RATE_LIMIT_REFILL_WINDOW_MS;
const RATE_LIMIT_TTL_SECONDS = 12 * 60 * 60; // 43200
// Redis key prefix for rate limit hashes
const RATE_LIMIT_PREFIX = "ratelimit:";

// Each key is a hash with fields: tokenCount, lastUpdated
// TTL is set so stale entries are automatically cleaned up.

function getClientIp(c: Parameters<MiddlewareHandler>[0]): string {
  const xForwardedFor = c.req.header("x-forwarded-for");
  if (xForwardedFor) {
    return xForwardedFor.split(",")[0].trim();
  }
  const xRealIp = c.req.header("x-real-ip");
  if (xRealIp) {
    return xRealIp;
  }
  const cfConnectingIp = c.req.header("cf-connecting-ip");
  if (cfConnectingIp) {
    return cfConnectingIp;
  }
  return "unknown";
}

function calculateCurrentTokens(storedTokens: number, lastUpdated: number): number {
  const now = Date.now();
  const elapsedMs = now - lastUpdated;
  const elapsedWindow = Math.floor(elapsedMs / REFILL_WINDOW_MS);

  const tokensToAdd = elapsedWindow * REFILL_RATE;

  return Math.min(MAX_TOKENS, storedTokens + tokensToAdd);
}
function msUntilNextRefill(lastUpdated: number): number {
  const elapsed = Date.now() - lastUpdated;
  const remainder = elapsed % REFILL_WINDOW_MS;
  return REFILL_WINDOW_MS - remainder;
}

export const rateLimiter: MiddlewareHandler = async (c, next) => {
  const ip = getClientIp(c);
  const key = `${RATE_LIMIT_PREFIX}${ip}`;

  try {
    const record = await redis.hgetall(key);
    const now = Date.now();

    if (!record || Object.keys(record).length === 0) {
      // First request from this IP — initialise the hash
      const remaining = MAX_TOKENS - 1;
      await redis.multi().hset(key, "tokenCount", String(remaining), "lastUpdated", String(now)).expire(key, RATE_LIMIT_TTL_SECONDS).exec();

      c.header("X-RateLimit-Limit", String(MAX_TOKENS));
      c.header("X-RateLimit-Remaining", String(remaining));
      c.header("X-RateLimit-Reset", String(Math.ceil((now + REFILL_WINDOW_MS) / 1000)));

      await next();
      return;
    }

    const storedTokens = parseInt(record.tokenCount, 10);
    const lastUpdated = parseInt(record.lastUpdated, 10);

    const currentTokens = calculateCurrentTokens(storedTokens, lastUpdated);
    const retryAfterMs = msUntilNextRefill(lastUpdated);
    const resetEpochSecs = Math.ceil((Date.now() + retryAfterMs) / 1000);

    if (currentTokens <= 0) {
      const retryAfterSecs = Math.ceil(retryAfterMs / 1000);
      c.header("X-RateLimit-Limit", String(MAX_TOKENS));
      c.header("X-RateLimit-Remaining", "0");
      c.header("X-RateLimit-Reset", String(resetEpochSecs));
      c.header("Retry-After", String(retryAfterSecs));
      return createErrorResponse(c, "RATE_LIMIT_EXCEEDED", `Rate limit exceeded. Please try again in ${retryAfterSecs} seconds`, 429);
    }

    const remaining = currentTokens - 1;

    await redis.multi().hset(key, "tokenCount", String(remaining), "lastUpdated", String(now)).expire(key, RATE_LIMIT_TTL_SECONDS).exec();

    c.header("X-RateLimit-Limit", String(MAX_TOKENS));
    c.header("X-RateLimit-Remaining", String(remaining));
    c.header("X-RateLimit-Reset", String(resetEpochSecs));

    await next();
  } catch (error) {
    console.error("Rate limiter error:", error);
    // Fail open — allow the request through if Redis is unavailable
    await next();
  }
};
