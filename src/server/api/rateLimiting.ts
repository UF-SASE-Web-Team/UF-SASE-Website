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

export const rateLimiter: MiddlewareHandler = async (c, next) => {
  const ip = getClientIp(c);

  try {
    const record = await db.select().from(rateLimit).where(eq(rateLimit.ip, ip)).get();
    const now = Date.now();
    if (!record) {
      await db.insert(rateLimit).values({
        ip,
        tokenCount: MAX_TOKENS - 1,
        lastUpdated: now,
      });

      await next();
      return;
    }

    const currentTokens = calculateCurrentTokens(record.tokenCount, record.lastUpdated);

    if (currentTokens <= 0) {
      return createErrorResponse(c, "RATE_LIMIT_EXCEEDED", `Rate limit exceeded. Please try again later`, 429);
    }

    await db
      .update(rateLimit)
      .set({
        tokenCount: currentTokens - 1,
        lastUpdated: now,
      })
      .where(eq(rateLimit.id, record.id));

    await next();
  } catch (error) {
    console.error("Rate limiter error:", error);

    await next();
  }
};
