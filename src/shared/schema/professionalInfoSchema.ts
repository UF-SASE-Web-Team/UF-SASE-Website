import { z } from "zod";

export const professionalInfoSchema = z.object({
  userId: z.string().min(1, "User ID is required."),
  phone: z.string().optional(),
  discord: z.string().optional(),
  bio: z.string().optional(),
  resumePath: z.string().optional(),
  linkedin: z.union([z.string().url("LinkedIn must be a valid URL."), z.literal("")]).optional(),
  portfolio: z.union([z.string().url("Portfolio must be a valid URL."), z.literal("")]).optional(),
  majors: z.string().optional(),
  minors: z.string().optional(),
  graduationSemester: z.string().optional(),
});

// All optional except id
export const professionalInfoInsertSchema = professionalInfoSchema.partial({
  resumePath: true,
  linkedin: true,
  portfolio: true,
  majors: true,
  minors: true,
  graduationSemester: true,
});

// All optional
export const professionalInfoUpdateSchema = professionalInfoSchema.partial();

export type ProfessionalInfo = z.infer<typeof professionalInfoSchema>;
export type ProfessionalInfoInsert = z.infer<typeof professionalInfoInsertSchema>;
export type ProfessionalInfoUpdate = z.infer<typeof professionalInfoUpdateSchema>;
