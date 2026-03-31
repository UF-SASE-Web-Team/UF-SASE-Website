import { db } from "@/server/db/db";
import { publicUserSchema } from "@/shared/schema";
import { createErrorResponse, createSuccessResponse } from "@/shared/utils";
import { userRoleRelationship, users } from "@db/tables";
import type { User } from "@shared/schema/userSchema";
import bcrypt from "bcryptjs";
import { eq, inArray } from "drizzle-orm";
import { Hono } from "hono";

const userRoutes = new Hono();

// Fetch a single user by ID
userRoutes.get("/users/:id", async (c) => {
  try {
    const userId = c.req.param("id");
    const user = await db.select().from(users).where(eq(users.id, userId)).get();
    if (!user) {
      return createErrorResponse(c, "USER_NOT_FOUND", "User not found", 404);
    }
    const userRoles = await db.select({ role: userRoleRelationship.role }).from(userRoleRelationship).where(eq(userRoleRelationship.userId, userId));
    const roleArray: Array<string> = userRoles.map((r) => r.role);
    const roleString = arrayToString(roleArray);

    //initialize full Zod schema verified object with roles
    const schemaUser: User = { ...user, roles: roleString };
    return createSuccessResponse(c, schemaUser, "User retrieved successfully");
  } catch (error) {
    console.error("Error fetching user:", error);
    return createErrorResponse(c, "FETCH_USER_ERROR", "An error occurred while fetching the user", 500);
  }
});

export const arrayToString = (arr: Array<string>): string => {
  let res: string = "";
  if (arr.length > 0) {
    for (const role of arr) {
      res += role + ", ";
    }
    res.trim();
    res = res.slice(0, -2);
  }

  return res;
};

userRoutes.get("/users", async (c) => {
  try {
    const rows = await db.select().from(users);
    const userIds = rows.map((user) => user.id);

    const roleRows = userIds.length
      ? await db
          .select({ userId: userRoleRelationship.userId, role: userRoleRelationship.role })
          .from(userRoleRelationship)
          .where(inArray(userRoleRelationship.userId, userIds))
      : [];

    const rolesByUser = new Map<string, Array<string>>();
    for (const roleRow of roleRows) {
      const existingRoles = rolesByUser.get(roleRow.userId) ?? [];
      existingRoles.push(roleRow.role);
      rolesByUser.set(roleRow.userId, existingRoles);
    }

    // Get roles for each user
    const usersWithRoles = rows.map((user) => {
      const roleArray = rolesByUser.get(user.id) ?? [];
      const roleString = arrayToString(roleArray);

      // Initialize full Zod schema verified object with roles
      const schemaUser: User = { ...user, roles: roleString };
      return schemaUser;
    });

    return createSuccessResponse(c, usersWithRoles, "Fetched all users");
  } catch (err) {
    console.error(err);
    return createErrorResponse(c, "FETCH_USERS_ERROR", "Failed to fetch users", 500);
  }
});

// TODO: move validation to the server instaed of the client/api level
userRoutes.get("/users/public/:username/:id", async (c) => {
  try {
    const usernameParam = c.req.param("username");
    const userId = c.req.param("id");
    if (!usernameParam || !userId) {
      return createErrorResponse(c, "MISSING_PARAMETERS", "Username and ID are required", 422);
    }
    const row = await db
      .select({
        id: users.id,
        username: users.username,
        email: users.email,
        firstName: users.firstName,
        lastName: users.lastName,
        points: users.points,
      })
      .from(users)
      .where(eq(users.id, userId))
      .get();

    if (!row) {
      return createErrorResponse(c, "USER_NOT_FOUND", "User not found", 404);
    }

    // Optional: enforce slug correctness
    if (row.username !== usernameParam) {
      return createErrorResponse(c, "SLUG_MISMATCH", `Expected username '${row.username}' but got '${usernameParam}'`, 404);
    }

    // Validate the shape
    const user = publicUserSchema.parse(row);
    return createSuccessResponse(c, user, "User retrieved successfully");
  } catch (err) {
    console.error("Error fetching user:", err);
    return createErrorResponse(c, "adfasdf", "An error occurred while fetching the user", 500);
  }
});

// Update an existing user
// userRoutes.patch("/users/:id", async (c) => {
//   try {
//     const userId = c.req.param("id");
//     const userToUpdate = updateUser.parse(await c.req.json());
//     // Fetch existing user from the database
//     const existingUser = await db.select().from(users).where(eq(users.id, userId));
//     if (!existingUser || existingUser.length === 0) {
//       return createErrorResponse(c, "USER_NOT_FOUND", "User not found", 404);
//     }
//     // Merge updated fields with the existing user data (Important to do this first so types match!)
//     const mergedUser = { ...existingUser[0], ...userToUpdate };
//     const updatedUser = await db.update(users).set(mergedUser).where(eq(users.id, userId)).returning();
//     return createSuccessResponse(c, updatedUser, "User updated successfully");
//   } catch (error) {
//     console.error("Error updating user:", error);
//     return createErrorResponse(c, "UPDATE_USER_ERROR", "Failed to update user", 400);
//   }
// });

// Delete a user
userRoutes.delete("/users/:id", async (c) => {
  try {
    const userId = c.req.param("id");
    await db.delete(users).where(eq(users.id, userId));
    return createSuccessResponse(c, { success: true }, "User deleted successfully");
  } catch (error) {
    console.error("Error deleting user:", error);
    return createErrorResponse(c, "DELETE_USER_ERROR", "Failed to delete user", 400);
  }
});

// User password update
userRoutes.patch("/users/password", async (c) => {
  try {
    const { id: userID, newPassword: newPassword } = await c.req.json();
    // Find user
    const user = await db.select().from(users).where(eq(users.id, userID));
    if (!user || user.length === 0) {
      return createErrorResponse(c, "USER_NOT_FOUND", "User not found", 404);
    }
    // Hash the new password
    const passSalt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(newPassword, passSalt);
    await db.update(users).set({ password: passwordHash }).where(eq(users.id, userID));
    return createSuccessResponse(c, { success: true }, "Password updated successfully");
  } catch (error) {
    console.error("Error updating password:", (error as Error).message || error);
    return createErrorResponse(c, "UPDATE_PASSWORD_ERROR", "Failed to update password", 500);
  }
});

export default userRoutes;
