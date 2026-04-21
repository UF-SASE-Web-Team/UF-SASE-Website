import { db } from "@/server/db/db";
import { requireRoles, requireSession } from "@/server/middleware/auth";
import { createErrorResponse, createSuccessResponse } from "@/shared/utils";
import * as Schema from "@db/tables";
import { asc } from "drizzle-orm";
import { Hono } from "hono";

const alumniRoutes = new Hono();

export interface WorkExperience {
  company: string;
  title?: string;
  startDate?: string;
  endDate?: string | null;
  isCurrent?: boolean;
}

export interface CompanyInfo {
  currentCompany: string | null;
  pastCompanies: Array<string>;
}

export interface AlumniBankRow {
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
}

const monthToIndex = new Map<string, number>([
  ["january", 1],
  ["february", 2],
  ["march", 3],
  ["april", 4],
  ["may", 5],
  ["june", 6],
  ["july", 7],
  ["august", 8],
  ["september", 9],
  ["october", 10],
  ["november", 11],
  ["december", 12],
]);

// Identifies the current company and a deduplicated list of past companies
// from a list of work experiences. A role is considered current if isCurrent
// is true or endDate is null/undefined.
export function extractCompanies(experiences: Array<WorkExperience>): CompanyInfo {
  if (!experiences || experiences.length === 0) {
    return { currentCompany: null, pastCompanies: [] };
  }

  const currentRole = experiences.find((exp) => exp.isCurrent === true || exp.endDate == null);

  const currentCompany = currentRole?.company?.trim() || null;

  const seenLower = new Set<string>();
  const pastCompanies: Array<string> = [];

  for (const exp of experiences) {
    if (exp === currentRole) continue;
    const name = exp.company?.trim();
    if (!name) continue;
    const nameLower = name.toLowerCase();
    if (!seenLower.has(nameLower)) {
      seenLower.add(nameLower);
      pastCompanies.push(name);
    }
  }

  return { currentCompany, pastCompanies };
}

//Extracts LinkedIn username from various URL formats
export function extractLinkedInUsername(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  //If the string contains "/in/", grab the stuff after it
  const inIndex = trimmed.indexOf("/in/");
  if (inIndex !== -1) {
    const afterIn = trimmed.slice(inIndex + 4);
    //Strip query string and trailing slashes
    const username = afterIn.split("?")[0].split("#")[0].replace(/\/+$/, "");
    return username || null;
  }

  //Bare username: no slashes or dots
  if (!/[/.]/.test(trimmed)) {
    return trimmed;
  }

  return null;
}

alumniRoutes.get("/alumni-bank", requireSession, async (c) => {
  try {
    const rows = await db.select().from(Schema.alumniBank).orderBy(asc(Schema.alumniBank.name));
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    const filteredRows: Array<AlumniBankRow> = rows.filter((row) => {
      if (!row.linkedin.trim()) return false;

      const graduationMonth = monthToIndex.get(row.graduationMonth.trim().toLowerCase());
      if (!graduationMonth) return false;

      return row.graduationYear < currentYear || (row.graduationYear === currentYear && graduationMonth < currentMonth);
    });

    return createSuccessResponse(c, filteredRows, "Alumni bank retrieved successfully");
  } catch (error) {
    console.error("Error fetching alumni bank:", error);
    return createErrorResponse(c, "FETCH_ALUMNI_BANK_ERROR", "Failed to fetch alumni bank", 500);
  }
});

alumniRoutes.get("/alumni-bank/refresh/status", requireSession, requireRoles(["admin"]), async (c) => {
  const { getAlumniRefreshStatus, validateAlumniRefreshConfig } = await import("@/server/services/alumniBankRefresh");
  const configCheck = validateAlumniRefreshConfig();
  return createSuccessResponse(
    c,
    {
      ...getAlumniRefreshStatus(),
      pipelineReady: configCheck.ok,
      pipelineReason: configCheck.reason ?? null,
      mcpUrl: configCheck.mcpUrl,
    },
    "Alumni refresh status retrieved",
  );
});

alumniRoutes.post("/alumni-bank/refresh", requireSession, requireRoles(["admin"]), async (c) => {
  const { startAlumniRefresh, validateAlumniRefreshConfig } = await import("@/server/services/alumniBankRefresh");
  const configCheck = validateAlumniRefreshConfig();
  if (!configCheck.ok) {
    return createErrorResponse(c, "ALUMNI_REFRESH_CONFIG_INVALID", configCheck.reason ?? "Alumni refresh configuration is invalid.", 400);
  }

  const result = startAlumniRefresh();
  return createSuccessResponse(c, result.status, result.started ? "Alumni refresh started." : "Alumni refresh is already running.");
});

export default alumniRoutes;
