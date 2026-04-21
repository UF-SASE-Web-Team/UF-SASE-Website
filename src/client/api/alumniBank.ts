import { alumniBankRowSchema, alumniRefreshStatusSchema } from "@shared/schema";
import { apiFetch } from "@shared/utils";

export type AlumniBankEntry = {
  id: string;
  name: string;
  major: string;
  minor: string;
  graduationMonth: string;
  graduationYear: number;
  currentRole: string;
  currentCompany: string;
  pastCompanies: Array<string>;
  email: string;
  linkedin: string;
};

export type AlumniRefreshStatus = {
  state: "idle" | "running" | "completed" | "failed";
  runId: number;
  startedAt: number | null;
  finishedAt: number | null;
  total: number;
  processed: number;
  succeeded: number;
  failed: number;
  skipped: number;
  added: number;
  currentName: string | null;
  currentLinkedin: string | null;
  lastError: string | null;
  logs: Array<{
    timestamp: number;
    level: "info" | "error";
    message: string;
  }>;
  pipelineReady?: boolean;
  pipelineReason?: string | null;
  mcpUrl?: string;
};

export const fetchAlumniBank = async (): Promise<Array<AlumniBankEntry>> => {
  const response = await apiFetch(
    "/api/alumni-bank",
    {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    },
    alumniBankRowSchema.array(),
  );

  return response.data;
};

export const fetchAlumniRefreshStatus = async (): Promise<AlumniRefreshStatus> => {
  const response = await apiFetch(
    "/api/alumni-bank/refresh/status",
    {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    },
    alumniRefreshStatusSchema,
  );

  return response.data;
};

export const triggerAlumniRefresh = async (): Promise<AlumniRefreshStatus> => {
  const response = await apiFetch(
    "/api/alumni-bank/refresh",
    {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    },
    alumniRefreshStatusSchema,
  );

  return response.data;
};
