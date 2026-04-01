import { db } from "@/server/db/db";
import { createErrorResponse } from "@/shared/utils";
import * as Schema from "@db/tables";
import { eq } from "drizzle-orm";
import { getCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";

export type Env = {
  Variables: {
    session: {
      id: string;
      userId: string;
      expiresAt: number;
    };
  };
};

export const requireSession = createMiddleware<Env>(async (c, next) => {
  const sessionId = getCookie(c, "sessionId");

  if (!sessionId) {
    return createErrorResponse(c, "NO_SESSION", "No active session", 401);
  }

  try {
    const session = await db.select().from(Schema.sessions).where(eq(Schema.sessions.id, sessionId)).get();

    if (!session) {
      return createErrorResponse(c, "SESSION_NOT_FOUND", "Session not found", 401);
    }

    if (session.expiresAt < Date.now()) {
      await db.delete(Schema.sessions).where(eq(Schema.sessions.id, sessionId));
      return createErrorResponse(c, "SESSION_EXPIRED", "Session expired", 401);
    }

    c.set("session", session);
    await next();
  } catch (error) {
    console.error("Session middleware error:", error);
    return createErrorResponse(c, "SESSION_CHECK_ERROR", "Error checking session", 500);
  }
});

export const requireRoles = (allowedRoles: Array<string>) =>
  createMiddleware<Env>(async (c, next) => {
    const session = c.get("session");

    if (!session) {
      return createErrorResponse(c, "UNAUTHORIZED", "Unauthorized: No user session found", 401);
    }

    try {
      const userRoles = await db
        .select({ role: Schema.userRoleRelationship.role })
        .from(Schema.userRoleRelationship)
        .where(eq(Schema.userRoleRelationship.userId, session.userId))
        .all();

      const hasRole = userRoles.some((r) => allowedRoles.includes(r.role));

      if (!hasRole) {
        return createErrorResponse(c, "FORBIDDEN", `Forbidden: Requires one of roles [${allowedRoles.join(", ")}]`, 403);
      }

      await next();
    } catch (error) {
      console.error("Role check error:", error);
      return createErrorResponse(c, "ROLE_CHECK_ERROR", "Error checking roles", 500);
    }
  });
