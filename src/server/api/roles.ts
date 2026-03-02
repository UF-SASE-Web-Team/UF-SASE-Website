import { db } from "@/server/db/db";
import { createErrorResponse, createSuccessResponse } from "@/shared/utils";
import * as Schema from "@db/tables";
import { and, eq } from "drizzle-orm";
import { Hono } from "hono";

const roleRoutes = new Hono();

roleRoutes.get("/roles/:userID", async (c) => {
  try {
    const userId = c.req.param("userID");
    const userRoles = await db
      .select({ role: Schema.userRoleRelationship.role })
      .from(Schema.userRoleRelationship)
      .where(eq(Schema.userRoleRelationship.userId, userId))
      .all();
    if (userRoles.length === 0) {
      return createErrorResponse(c, "ROLE_NOT_FOUND", "No role found", 404);
    }

    return createSuccessResponse(c, userRoles, "User roles retrieved successfully");
  } catch (error) {
    console.log(error);
    return createErrorResponse(c, "FETCH_ROLES_ERROR", "Failed to fetch roles", 500);
  }
});

roleRoutes.post("/roles/assign", async (c) => {
  try {
    const { role, userId } = await c.req.json();
    const cookie = c.req.header("Cookie") || "";
    console.log(cookie);
    const sessionIDMatch = cookie.match(/sessionId=([^;]*)/);
    if (!sessionIDMatch) {
      return createErrorResponse(c, "INVALID_SESSION", "Missing or invalid session ID", 400);
    }
    const sessionID = sessionIDMatch[1];
    if (!(await isAdmin(sessionID))) {
      return createErrorResponse(c, "ASSIGN_ACTION_UNAUTHORIZED", "Assigning unauthorized: Admin role required", 403);
    }

    const roleExist = await db.select().from(Schema.roles).where(eq(Schema.roles.name, role)).get();
    if (!roleExist) {
      return createErrorResponse(c, "NO_SUCH_ROLE", "Role does not exist", 400);
    }

    const currentRoles = await db
      .select({ role: Schema.userRoleRelationship.role })
      .from(Schema.userRoleRelationship)
      .where(eq(Schema.userRoleRelationship.userId, userId))
      .all();
    if (currentRoles.some((r) => r.role === role)) {
      return createErrorResponse(c, "ROLE_ALREADY_ASSIGNED", "Role already assigned", 400);
    }

    await db.insert(Schema.userRoleRelationship).values({
      userId,
      role,
    });

    return createSuccessResponse(c, `Role '${role}' assigned to user ${userId}`);
  } catch (error) {
    console.log(error);
    return createErrorResponse(c, "ASSIGN_ROLE_ERROR", "Failed to assign role", 500);
  }
});

roleRoutes.post("/roles/delete", async (c) => {
  try {
    const { role, userId } = await c.req.json();
    const cookie = c.req.header("Cookie") || "";
    const sessionIDMatch = cookie.match(/sessionId=([^;]*)/);
    if (!sessionIDMatch) {
      return createErrorResponse(c, "INVALID_SESSION", "Missing or invalid session ID", 400);
    }
    const sessionID = sessionIDMatch[1];
    if (!(await isAdmin(sessionID))) {
      return createErrorResponse(c, "USER_NOT_ADMIN", "Deleting unauthorized: Admin role required", 403);
    }

    const roleExist = await db.select().from(Schema.roles).where(eq(Schema.roles.name, role)).get();
    if (!roleExist) {
      return createErrorResponse(c, "NO_SUCH_ROLE", "Role does not exist", 400);
    }

    const currentRoles = await db
      .select({ role: Schema.userRoleRelationship.role })
      .from(Schema.userRoleRelationship)
      .where(eq(Schema.userRoleRelationship.userId, userId))
      .all();
    if (!currentRoles.some((r) => r.role === role)) {
      return createErrorResponse(c, "ROLE_NOT_FOUND", "User doesn't have role", 400);
    }

    await db
      .delete(Schema.userRoleRelationship)
      .where(and(eq(Schema.userRoleRelationship.userId, userId), eq(Schema.userRoleRelationship.role, role)));

    return createSuccessResponse(c, `Role '${role}' deleted from user ${userId}`);
  } catch (error) {
    console.log(error);
    return createErrorResponse(c, "DELETE_ROLE_ERROR", "Failed to delete role", 500);
  }
});

export async function isAdmin(sessionId: string) {
  const session = await db.select().from(Schema.sessions).where(eq(Schema.sessions.id, sessionId)).get();
  if (!session) return false;

  const userRoles = await db
    .select({ role: Schema.userRoleRelationship.role })
    .from(Schema.userRoleRelationship)
    .where(eq(Schema.userRoleRelationship.userId, session.userId))
    .all();

  if (userRoles.some((r) => r.role === "admin" || r.role === "board")) return true;
}

export default roleRoutes;
