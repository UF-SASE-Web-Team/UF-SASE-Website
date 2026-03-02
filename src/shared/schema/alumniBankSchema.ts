import * as z from "zod";

export const alumniBankSchema = z.object({
  name: z.string(),
  graduationYear: z.string(),
  major: z.string(),
  currentCompany: z.string(),
  pastCompanies: z.array(z.string()).default([]).optional(),
});

export const LinkedInRefreshOperationSchema = z.object({
  updated: z.number().int().min(0),
  skipped: z.number().int().min(0),
});
