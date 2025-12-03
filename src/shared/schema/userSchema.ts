import { z } from "zod";

export const userSchema = z.object({
  id: z.string().min(1, "User ID is required."),
  username: z.string().min(1, "Username is required."),
  password: z.string().min(1, "Password is required.").nullable(),
  email: z.string().email("Invalid email address."),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  timeAdded: z.number().int().min(0, "Time added must be a valid timestamp."),
  timeUpdated: z.number().int().min(0, "Time updated must be a valid timestamp."),
  points: z.number().int().min(0).optional(),

  // TODO: remove roles from here? Shouldn't be part of users, only joined through the roles table
  roles: z.string().optional(),
});
export type User = z.infer<typeof userSchema>;

// Omits fields that are auto-generated or not required during user creation
export const insertUserSchema = userSchema
  .omit({
    id: true,
    timeAdded: true,
    timeUpdated: true,
    password: true,
  })
  .extend({
    password: z.string().min(6, "Password must be at least 6 characters long."), // Accept plain password
  });
export type InsertUser = z.infer<typeof insertUserSchema>;

export const selectUserSchema = userSchema.omit({
  password: true,
});
export type SelectUser = z.infer<typeof selectUserSchema>;

export const updateUserSchema = userSchema
  .pick({
    id: true,
    username: true,
    points: true,
    roles: true,
  })
  .partial(); // Make all fields optional
export type UpdateUser = z.infer<typeof updateUserSchema>;

export const deleteUserSchema = z.object({
  id: z.string().min(1, "User ID is required."),
});
export type DeleteUser = z.infer<typeof deleteUserSchema>;

export const minimalUserSchema = z.object({
  id: z.string().min(1, "User ID is required."),
  username: z.string().min(1, "Username is required."),
  firstName: z.string().min(1, "First name is required."),
  lastName: z.string().min(1, "Last name is required."),
});
export type MinimalUser = z.infer<typeof minimalUserSchema>;

export const publicUserSchema = userSchema.omit({
  password: true,
  timeAdded: true,
  timeUpdated: true,
});
export type PublicUser = z.infer<typeof publicUserSchema>;
