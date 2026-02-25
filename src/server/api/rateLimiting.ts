import { db } from "@/server/db/db";
import { createErrorResponse } from "@/shared/utils";
import { rateLimit } from "@db/tables";
import { eq } from "drizzle-orm";
import type { MiddlewareHandler } from "hono";
import { SERVER_ENV } from "../env";

// Token bucket configuration, controlled by environment variables
const MAX_TOKENS = SERVER_ENV.RATE_LIMIT_MAX_TOKENS;
const REFILL_RATE = SERVER_ENV.RATE_LIMIT_REFILL_RATE; // tokens per minute

// Ratelimiter works by first getting the client IP address from the request, look that up on the database to see how many tokens they have left, and when the last time they made a request was. Then we calculate how many tokens to refill based on the time elapsed since the last request, and if they have enough tokens to make the current request. If they do, we consume a token and allow the request to proceed. If not, we return a 429 Too Many Requests response.

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
  const elapsedWindow = Math.floor(elapsedMs / SERVER_ENV.RATE_LIMIT_REFILL_WINDOW_MS);

  const tokensToAdd = elapsedWindow * REFILL_RATE;

  return Math.min(MAX_TOKENS, storedTokens + tokensToAdd);
}

/**
 * Calculate how many milliseconds until the next token refill.
 */
function msUntilNextRefill(lastUpdated: number): number {
  const elapsed = Date.now() - lastUpdated;
  const remainder = elapsed % SERVER_ENV.RATE_LIMIT_REFILL_WINDOW_MS;
  return SERVER_ENV.RATE_LIMIT_REFILL_WINDOW_MS - remainder;
}

export const rateLimiter: MiddlewareHandler = async (c, next) => {
  const ip = getClientIp(c);

  try {
    const record = await db.select().from(rateLimit).where(eq(rateLimit.ip, ip)).get();
    const now = Date.now();
    if (!record) {
      const remaining = MAX_TOKENS - 1;
      await db.insert(rateLimit).values({
        ip,
        tokenCount: remaining,
        lastUpdated: now,
      });

      c.header("X-RateLimit-Limit", String(MAX_TOKENS));
      c.header("X-RateLimit-Remaining", String(remaining));
      c.header("X-RateLimit-Reset", String(Math.ceil((now + SERVER_ENV.RATE_LIMIT_REFILL_WINDOW_MS) / 1000)));

      await next();
      return;
    }

    const currentTokens = calculateCurrentTokens(record.tokenCount, record.lastUpdated);
    const retryAfterMs = msUntilNextRefill(record.lastUpdated);
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

    await db
      .update(rateLimit)
      .set({
        tokenCount: remaining,
        lastUpdated: now,
      })
      .where(eq(rateLimit.id, record.id));

    c.header("X-RateLimit-Limit", String(MAX_TOKENS));
    c.header("X-RateLimit-Remaining", String(remaining));
    c.header("X-RateLimit-Reset", String(resetEpochSecs));

    await next();
  } catch (error) {
    console.error("Rate limiter error:", error);

    await next();
  }
};
