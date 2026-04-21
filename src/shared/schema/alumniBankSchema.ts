import * as z from "zod";

export const alumniBankSchema = z.object({
  name: z.string(),
  major: z.string(),
  minor: z.string(),
  graduationMonth: z.string(),
  graduationYear: z.number().int(),
  currentRole: z.string(),
  currentCompany: z.string(),
  pastCompanies: z.array(z.string()).default([]).optional(),
  email: z.string().email(),
  linkedin: z.string(),
});

export const alumniBankRowSchema = alumniBankSchema.extend({
  id: z.string(),
});

export const LinkedInRefreshOperationSchema = z.object({
  updated: z.number().int().min(0),
  skipped: z.number().int().min(0),
});
