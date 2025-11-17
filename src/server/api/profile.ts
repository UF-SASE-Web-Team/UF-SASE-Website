import { isAdmin } from "@/server/api/roles";
import { db } from "@/server/db/db";
import { createErrorResponse, createSuccessResponse } from "@/shared/utils";
import * as Schema from "@db/tables";
import { updateUserSchema } from "@schema/userSchema";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { ZodError } from "zod";

const profileRoutes = new Hono();

// profile selection includes both user and professional info for combined read-only view
const profileSelection = {
  id: Schema.users.id,
  username: Schema.users.username,
  email: Schema.users.email,
  timeAdded: Schema.users.timeAdded,
  timeUpdated: Schema.users.timeUpdated,

  firstName: Schema.users.firstName,
  lastName: Schema.users.lastName,

  bio: Schema.professionalInfo.bio,
  phone: Schema.professionalInfo.phone,
  discord: Schema.professionalInfo.discord,

  resumePath: Schema.professionalInfo.resumePath,
  linkedin: Schema.professionalInfo.linkedin,
  portfolio: Schema.professionalInfo.portfolio,
  majors: Schema.professionalInfo.majors,
  minors: Schema.professionalInfo.minors,
  graduationSemester: Schema.professionalInfo.graduationSemester,
};

profileRoutes.get("/profile", async (c) => {
  try {
    const cookie = c.req.header("Cookie") || "";
    const sessionIDMatch = cookie.match(/sessionId=([^;]*)/);
    if (!sessionIDMatch) {
      return createErrorResponse(c, "INVALID_SESSION", "Missing or invalid session ID", 400);
    }
    const sessionID = sessionIDMatch[1];

    const result = await db
      .select(profileSelection)
      .from(Schema.users)
      .innerJoin(Schema.sessions, eq(Schema.users.id, Schema.sessions.userId))
      .innerJoin(Schema.professionalInfo, eq(Schema.users.id, Schema.professionalInfo.userId))
      .where(eq(Schema.sessions.id, sessionID));

    if (result.length === 1) {
      return createSuccessResponse(c, result[0], "Profile retrieved successfully");
    } else if (result.length === 0) {
      console.log(sessionID);
      return createErrorResponse(c, "NO_USER_FOUND", "No user found", 404);
    } else {
      return createErrorResponse(c, "MULTIPLE_USERS", "Multiple users", 500);
    }
  } catch (err) {
    console.error("Error:", err);
    return createErrorResponse(c, "FETCH_PROFILE_ERROR", "Internal server error", 500);
  }
});

// update user information only (professional info updates go through /api/users/professional/:id)
profileRoutes.patch("/profile", async (c) => {
  try {
    const cookie = c.req.header("Cookie") || "";
    const sessionIDMatch = cookie.match(/sessionId=([^;]*)/);
    if (!sessionIDMatch) {
      return createErrorResponse(c, "INVALID_SESSION", "Missing or invalid session ID", 400);
    }
    const sessionID = sessionIDMatch[1];
    const adminPerms = await isAdmin(sessionID);
    const result = await db.select().from(Schema.sessions).where(eq(Schema.sessions.id, sessionID));

    if (result.length === 0) {
      return createErrorResponse(c, "INVALID_SESSION", "Invalid session", 400);
    }

    const userID = result[0].userId;
    const body = await c.req.json();

    // separate user fields from roles fields
    const userFields: Record<string, unknown> = {};
    let rolesUpdate: string | undefined;

    // allowed user fields that can be updated
    const allowedUserFields = ["firstName", "lastName", "username", "email", "points"];
    for (const [key, value] of Object.entries(body)) {
      if (key === "roles") {
        rolesUpdate = value as string;
      } else if (allowedUserFields.includes(key)) {
        userFields[key] = value;
      }
    }

    // validate and apply user field updates
    if (Object.keys(userFields).length > 0) {
      // non-admin users can only update firstName and lastName
      if (!adminPerms) {
        const restrictedFields = ["username", "email", "points"];
        for (const field of restrictedFields) {
          if (field in userFields) {
            delete userFields[field];
          }
        }
      }

      // Build update object with validation for specific fields
      const finalUpdate: Record<string, unknown> = {};

      // validate and add username, points if present (using updateUserSchema)
      if ("username" in userFields || "points" in userFields) {
        const updateData = { ...userFields, id: userID };
        try {
          const validatedData = updateUserSchema.parse(updateData);
          const { id: _id, ...validatedFields } = validatedData;
          Object.assign(finalUpdate, validatedFields);
        } catch (error) {
          if (error instanceof ZodError) {
            const errorMessages = error.errors.map((e) => `${e.path.join(".")}: ${e.message}`).join("; ");
            return createErrorResponse(c, "VALIDATION_ERROR", `Validation failed: ${errorMessages}`, 400);
          }
          throw error;
        }
      }

      // add firstName and lastName
      if ("firstName" in userFields) {
        const firstName = userFields.firstName;
        if (typeof firstName === "string") {
          finalUpdate.firstName = firstName;
        }
      }
      if ("lastName" in userFields) {
        const lastName = userFields.lastName;
        if (typeof lastName === "string") {
          finalUpdate.lastName = lastName;
        }
      }

      // add email if present (admin only)
      if ("email" in userFields && adminPerms) {
        const email = userFields.email;
        if (typeof email === "string" && email.includes("@")) {
          finalUpdate.email = email;
        }
      }

      // perform database update if there are any fields to update
      if (Object.keys(finalUpdate).length > 0) {
        await db.update(Schema.users).set(finalUpdate).where(eq(Schema.users.id, userID));
      }
    }

    // roles update (admin only)
    if (rolesUpdate && adminPerms) {
      const newRoleArray: Array<string> = rolesUpdate.split(",");
      // delete user's existing roles
      await db.delete(Schema.userRoleRelationship).where(eq(Schema.userRoleRelationship.userId, userID));
      await insertRoles(newRoleArray, userID);
    }

    return createSuccessResponse(c, {}, "User profile updated successfully");
  } catch (err) {
    console.error("Error updating profile:", err);
    return createErrorResponse(c, "UPDATE_PROFILE_ERROR", "Failed to update profile", 500);
  }
});

const insertRoles = (roleArray: Array<string>, userID: string) => {
  return Promise.all(
    roleArray.map(async (raw) => {
      const role = raw.trim();
      try {
        await db.insert(Schema.roles).values({ name: role }).onConflictDoNothing();
        await db.insert(Schema.userRoleRelationship).values({ userId: userID, role }).onConflictDoNothing();
      } catch (err) {
        console.error(`Error inserting role “${role}”:`, err);
      }
    }),
  );
};

export default profileRoutes;
