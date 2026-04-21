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

export const alumniRefreshLogSchema = z.object({
  timestamp: z.number(),
  level: z.enum(["info", "error"]),
  message: z.string(),
});

export const alumniRefreshStatusSchema = z.object({
  state: z.enum(["idle", "running", "completed", "failed"]),
  runId: z.number(),
  startedAt: z.number().nullable(),
  finishedAt: z.number().nullable(),
  total: z.number(),
  processed: z.number(),
  succeeded: z.number(),
  failed: z.number(),
  skipped: z.number(),
  added: z.number(),
  currentName: z.string().nullable(),
  currentLinkedin: z.string().nullable(),
  lastError: z.string().nullable(),
  logs: z.array(alumniRefreshLogSchema),
  pipelineReady: z.boolean().optional(),
  pipelineReason: z.string().nullable().optional(),
  mcpUrl: z.string().optional(),
});

export const LinkedInRefreshOperationSchema = z.object({
  updated: z.number().int().min(0),
  skipped: z.number().int().min(0),
});
