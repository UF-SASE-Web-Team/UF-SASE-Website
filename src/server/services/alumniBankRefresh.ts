import { fetchLinkedInProfile } from "@/server/mcp/linkedin";
import { db } from "@db/db";
import { alumniBank, company, professionalInfo, users } from "@db/tables";
import { eq } from "drizzle-orm";

type RefreshState = "idle" | "running" | "completed" | "failed";
type LogLevel = "info" | "error";

interface RefreshLog {
  timestamp: number;
  level: LogLevel;
  message: string;
}

export interface AlumniRefreshStatus {
  state: RefreshState;
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
  logs: Array<RefreshLog>;
}

type AlumniBankRow = typeof alumniBank.$inferSelect;
type CompanyRow = typeof company.$inferSelect;

const MAX_LOGS = 80;
const DEFAULT_MCP_URL = "http://127.0.0.1:8000/mcp";
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

let refreshStatus: AlumniRefreshStatus = {
  state: "idle",
  runId: 0,
  startedAt: null,
  finishedAt: null,
  total: 0,
  processed: 0,
  succeeded: 0,
  failed: 0,
  skipped: 0,
  added: 0,
  currentName: null,
  currentLinkedin: null,
  lastError: null,
  logs: [],
};

interface WorkExperience {
  company: string;
  role?: string;
  endDate?: string | null;
  isCurrent?: boolean;
}

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null;
};

const asString = (value: unknown): string | null => {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
};

const appendLog = (level: LogLevel, message: string) => {
  const log: RefreshLog = { timestamp: Date.now(), level, message };
  refreshStatus.logs = [log, ...refreshStatus.logs].slice(0, MAX_LOGS);
};

const parseLinkedInUsername = (urlOrUsername: string): string | null => {
  const trimmed = urlOrUsername.trim();
  if (!trimmed) return null;

  const inIndex = trimmed.indexOf("/in/");
  if (inIndex !== -1) {
    const afterIn = trimmed.slice(inIndex + 4);
    const username = afterIn.split("?")[0]?.split("#")[0]?.replace(/\/+$/, "");
    return username || null;
  }

  if (!/[/.]/.test(trimmed)) {
    return trimmed;
  }

  return null;
};

const pickString = (record: Record<string, unknown>, keys: Array<string>): string | null => {
  for (const key of keys) {
    const value = asString(record[key]);
    if (value) return value;
  }
  return null;
};

const parseBoolean = (value: unknown): boolean | null => {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    const lower = value.trim().toLowerCase();
    if (["true", "yes", "current", "present", "now"].includes(lower)) return true;
    if (["false", "no", "past", "former"].includes(lower)) return false;
  }
  return null;
};

const parseGraduationSemester = (semester: string | null): { month: string; year: number } | null => {
  if (!semester) return null;
  const match = semester.trim().match(/^(Spring|Summer|Fall|Winter)\s+(\d{4})$/i);
  if (!match) return null;

  const term = match[1]?.toLowerCase();
  const year = Number(match[2]);
  if (!term || !Number.isFinite(year)) return null;

  if (term === "spring") return { month: "May", year };
  if (term === "summer") return { month: "August", year };
  return { month: "December", year };
};

const isBeforeCurrentMonthYear = (month: string, year: number, now: Date): boolean => {
  const monthIndex = monthToIndex.get(month.trim().toLowerCase());
  if (!monthIndex) return false;
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;
  return year < currentYear || (year === currentYear && monthIndex < currentMonth);
};

const dedupeStrings = (values: Array<string>): Array<string> => {
  const seen = new Set<string>();
  const result: Array<string> = [];

  for (const value of values) {
    const trimmed = value.trim();
    if (!trimmed) continue;
    const lower = trimmed.toLowerCase();
    if (seen.has(lower)) continue;
    seen.add(lower);
    result.push(trimmed);
  }

  return result;
};

const deriveCompanySnapshot = (
  rows: Array<CompanyRow>,
): {
  currentCompany: string;
  currentRole: string;
  pastCompanies: Array<string>;
} => {
  if (rows.length === 0) {
    return {
      currentCompany: "Unknown",
      currentRole: "Unknown",
      pastCompanies: [],
    };
  }

  const current = rows.find((row) => row.isCurrent === 1) ?? rows.find((row) => row.endDate == null || row.endDate.trim().length === 0) ?? rows[0];

  const currentCompany = current?.name?.trim() || "Unknown";
  const currentRole = current?.role?.trim() || "Unknown";

  const pastCompanies = dedupeStrings(
    rows
      .filter((row) => row.id !== current?.id)
      .map((row) => row.name)
      .filter((name): name is string => Boolean(name)),
  );

  return { currentCompany, currentRole, pastCompanies };
};

const syncNewGraduatedUsers = async (now: Date): Promise<number> => {
  const existingRows = await db.select({ id: alumniBank.id }).from(alumniBank);
  const existingIds = new Set(existingRows.map((row) => row.id));

  const profileRows = await db
    .select({
      userId: users.id,
      firstName: users.firstName,
      lastName: users.lastName,
      email: users.email,
      major: professionalInfo.majors,
      minor: professionalInfo.minors,
      graduationSemester: professionalInfo.graduationSemester,
      linkedin: professionalInfo.linkedin,
    })
    .from(users)
    .leftJoin(professionalInfo, eq(professionalInfo.userId, users.id));

  const companyRows = await db.select().from(company);
  const companiesByUser = new Map<string, Array<CompanyRow>>();
  for (const row of companyRows) {
    const list = companiesByUser.get(row.userId) ?? [];
    list.push(row);
    companiesByUser.set(row.userId, list);
  }

  let added = 0;

  for (const row of profileRows) {
    if (existingIds.has(row.userId)) continue;

    const graduation = parseGraduationSemester(row.graduationSemester);
    if (!graduation) continue;
    if (!isBeforeCurrentMonthYear(graduation.month, graduation.year, now)) continue;

    const snapshot = deriveCompanySnapshot(companiesByUser.get(row.userId) ?? []);
    const fullName = `${row.firstName ?? ""} ${row.lastName ?? ""}`.trim() || row.email;

    await db.insert(alumniBank).values({
      id: row.userId,
      name: fullName,
      major: row.major?.trim() || "Undeclared",
      minor: row.minor?.trim() || "None",
      graduationMonth: graduation.month,
      graduationYear: graduation.year,
      currentRole: snapshot.currentRole,
      currentCompany: snapshot.currentCompany,
      pastCompanies: snapshot.pastCompanies,
      email: row.email,
      linkedin: row.linkedin?.trim() || "",
    });

    existingIds.add(row.userId);
    added += 1;
    appendLog("info", `Added newly graduated user to alumni bank: ${fullName}`);
  }

  return added;
};

const monthNamePattern =
  "(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:t(?:ember)?)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)";
const dateRangeRegex = new RegExp(`\\b${monthNamePattern}\\s+\\d{4}\\s*-\\s*(?:Present|${monthNamePattern}\\s+\\d{4})\\b`, "i");
const durationSummaryRegex = /^\d+\s+(?:yr|yrs|year|years|mo|mos|month|months)(?:\s+\d+\s+(?:mo|mos|month|months))?$/i;

const isDateRangeLine = (line: string): boolean => dateRangeRegex.test(line);

const isDurationSummaryLine = (line: string): boolean => durationSummaryRegex.test(line);

const isLocationLine = (line: string): boolean => {
  const lower = line.toLowerCase();
  if (lower.includes("united states") || lower.includes("on-site") || lower.includes("hybrid") || lower.includes("remote")) return true;
  if (line.includes(",") && line.includes("·")) return true;
  return false;
};

const isNoiseLine = (line: string): boolean => {
  const trimmed = line.trim();
  if (!trimmed) return true;
  const lower = trimmed.toLowerCase();
  if (lower === "experience" || lower === "about") return true;
  if (trimmed.startsWith("•")) return true;
  if (lower.startsWith("skills:")) return true;
  if (isDurationSummaryLine(trimmed)) return true;
  if (isLocationLine(trimmed)) return true;
  return false;
};

const cleanCompanyName = (line: string): string | null => {
  const normalized = line.split("·")[0]?.trim() ?? "";
  return normalized.length > 0 ? normalized : null;
};

const parseExperiencesFromSectionText = (text: string): Array<WorkExperience> => {
  const lines = text
    .split("\n")
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter((line) => line.length > 0);

  if (lines.length === 0) return [];

  const experiences: Array<WorkExperience> = [];
  let activeCompany: string | null = null;

  const findPreviousContentIndex = (startIndex: number): number => {
    for (let index = startIndex; index >= 0; index -= 1) {
      if (!isNoiseLine(lines[index] ?? "")) return index;
    }
    return -1;
  };

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index] ?? "";
    const nextLine = lines[index + 1] ?? "";

    if (!isNoiseLine(line) && isDurationSummaryLine(nextLine)) {
      activeCompany = cleanCompanyName(line);
      continue;
    }

    if (!isDateRangeLine(line)) continue;

    const previousIndex = findPreviousContentIndex(index - 1);
    if (previousIndex < 0) continue;

    const previousLine = lines[previousIndex] ?? "";
    const previousTwoIndex = findPreviousContentIndex(previousIndex - 1);
    const previousTwoLine = previousTwoIndex >= 0 ? (lines[previousTwoIndex] ?? "") : null;

    let role = previousLine;
    let company = activeCompany;

    const previousLooksLikeInlineCompany = previousLine.includes("·") && !isLocationLine(previousLine);
    if (previousLooksLikeInlineCompany) {
      company = cleanCompanyName(previousLine) ?? company;
      role = previousTwoLine ?? role;
    }

    if (!company || !role || isNoiseLine(role)) {
      continue;
    }

    const [, endRaw] = line.split("-");
    const endDate = endRaw?.trim() || null;

    experiences.push({
      company,
      role: role.trim(),
      endDate,
      isCurrent: /\bpresent\b/i.test(line),
    });
  }

  return experiences;
};

const parseExperienceSectionFromProfile = (profile: Record<string, unknown>): Array<WorkExperience> => {
  const sections = isRecord(profile.sections) ? profile.sections : null;
  const text = sections ? asString(sections.experience) : null;
  if (!text) return [];
  return parseExperiencesFromSectionText(text);
};

const collectExperiences = (profile: Record<string, unknown>): Array<WorkExperience> => {
  const companyKeys = ["company", "company_name", "companyName", "organization", "employer", "organization_name"];
  const roleKeys = ["title", "role", "position", "job_title", "headline", "position_title"];
  const endDateKeys = ["end_date", "endDate", "to", "date_to", "end"];
  const positionArrayKeys = ["positions", "roles", "items", "experience"];

  const experiences: Array<WorkExperience> = [];
  const visited = new Set<unknown>();

  const pushExperience = (
    companyName: string | null,
    role: string | null,
    endDate: string | null,
    isCurrentFlag: boolean | null,
    dateRange: string | null,
  ) => {
    if (!companyName) return;

    const normalizedCompany = companyName.trim();
    if (!normalizedCompany) return;

    const normalizedRole = role?.trim() || undefined;
    const normalizedEndDate = endDate?.trim() || null;

    const inferredCurrent =
      isCurrentFlag ??
      (typeof dateRange === "string" && /(present|current|now)/i.test(dateRange)) ??
      (typeof normalizedEndDate === "string" && /(present|current|now)/i.test(normalizedEndDate)) ??
      false;

    experiences.push({
      company: normalizedCompany,
      role: normalizedRole,
      endDate: normalizedEndDate,
      isCurrent: inferredCurrent,
    });
  };

  const visit = (node: unknown, inheritedCompany: string | null = null) => {
    if (!node) return;
    if (visited.has(node)) return;
    visited.add(node);

    if (Array.isArray(node)) {
      for (const item of node) {
        visit(item, inheritedCompany);
      }
      return;
    }

    if (!isRecord(node)) {
      return;
    }

    const companyName = pickString(node, companyKeys) ?? inheritedCompany;
    const role = pickString(node, roleKeys);
    const endDate = pickString(node, endDateKeys);
    const currentFlag = parseBoolean(node.isCurrent ?? node.is_current ?? node.current ?? node.currently_working);
    const dateRange = pickString(node, ["date_range", "duration", "period"]);

    const hasCompanySignal = companyName != null;
    const hasRoleSignal = role != null;
    const hasDateSignal = endDate != null || dateRange != null || currentFlag != null;
    if (hasCompanySignal && (hasRoleSignal || hasDateSignal)) {
      pushExperience(companyName, role, endDate, currentFlag, dateRange);
    }

    for (const key of positionArrayKeys) {
      const positions = node[key];
      if (!Array.isArray(positions)) continue;
      for (const position of positions) {
        if (!isRecord(position)) continue;
        const posRole = pickString(position, roleKeys);
        const posEndDate = pickString(position, endDateKeys);
        const posCurrent = parseBoolean(position.isCurrent ?? position.is_current ?? position.current ?? position.currently_working);
        const posDateRange = pickString(position, ["date_range", "duration", "period"]);
        pushExperience(companyName, posRole, posEndDate, posCurrent, posDateRange);
      }
    }

    for (const value of Object.values(node)) {
      visit(value, companyName);
    }
  };

  visit(profile);
  for (const parsed of parseExperienceSectionFromProfile(profile)) {
    experiences.push(parsed);
  }

  const deduped: Array<WorkExperience> = [];
  const seen = new Set<string>();
  for (const experience of experiences) {
    const key = `${experience.company.toLowerCase()}|${(experience.role ?? "").toLowerCase()}|${experience.endDate ?? ""}|${experience.isCurrent ? "1" : "0"}`;
    if (seen.has(key)) continue;
    seen.add(key);
    deduped.push(experience);
  }

  return deduped;
};

const extractCompanyData = (
  experiences: Array<WorkExperience>,
): { currentCompany: string | null; pastCompanies: Array<string>; currentRole: string | null } => {
  if (experiences.length === 0) {
    return { currentCompany: null, pastCompanies: [], currentRole: null };
  }

  const current = experiences.find((exp) => exp.isCurrent) ?? experiences[0] ?? null;
  const currentCompany = current?.company?.trim() || null;
  const currentRole = current?.role?.trim() || null;

  const pastCompanies = dedupeStrings(experiences.filter((exp) => exp !== current).map((exp) => exp.company));

  return { currentCompany, pastCompanies, currentRole };
};

const parseEducation = (profile: Record<string, unknown>): { major: string | null; minor: string | null } => {
  const majorKeys = ["major", "field_of_study", "study_field", "concentration"];
  const minorKeys = ["minor", "secondary_field", "secondaryField"];

  const visit = (node: unknown): { major: string | null; minor: string | null } => {
    if (Array.isArray(node)) {
      for (const item of node) {
        const found = visit(item);
        if (found.major || found.minor) return found;
      }
      return { major: null, minor: null };
    }

    if (!isRecord(node)) return { major: null, minor: null };

    const major = pickString(node, majorKeys);
    const minor = pickString(node, minorKeys);
    if (major || minor) return { major, minor };

    for (const value of Object.values(node)) {
      const found = visit(value);
      if (found.major || found.minor) return found;
    }

    return { major: null, minor: null };
  };

  return visit(profile);
};

const parseEmail = (profile: Record<string, unknown>): string | null => {
  const direct = pickString(profile, ["email", "email_address"]);
  if (direct) return direct;

  const visit = (node: unknown): string | null => {
    if (Array.isArray(node)) {
      for (const item of node) {
        const found = visit(item);
        if (found) return found;
      }
      return null;
    }
    if (!isRecord(node)) return null;

    const email = pickString(node, ["email", "email_address"]);
    if (email) return email;
    for (const value of Object.values(node)) {
      const found = visit(value);
      if (found) return found;
    }
    return null;
  };

  return visit(profile);
};

const parseName = (profile: Record<string, unknown>): string | null => {
  const direct = pickString(profile, ["name", "full_name", "display_name"]);
  if (direct) return direct;

  const visit = (node: unknown): string | null => {
    if (Array.isArray(node)) {
      for (const item of node) {
        const found = visit(item);
        if (found) return found;
      }
      return null;
    }
    if (!isRecord(node)) return null;

    const value = pickString(node, ["name", "full_name", "display_name"]);
    if (value) return value;
    for (const child of Object.values(node)) {
      const found = visit(child);
      if (found) return found;
    }
    return null;
  };

  return visit(profile);
};

const parseProfileUrl = (profile: Record<string, unknown>): string | null => {
  const direct = pickString(profile, ["profile_url", "url", "linkedin_url"]);
  if (direct) return direct;

  const visit = (node: unknown): string | null => {
    if (Array.isArray(node)) {
      for (const item of node) {
        const found = visit(item);
        if (found) return found;
      }
      return null;
    }
    if (!isRecord(node)) return null;

    const value = pickString(node, ["profile_url", "url", "linkedin_url"]);
    if (value) return value;
    for (const child of Object.values(node)) {
      const found = visit(child);
      if (found) return found;
    }
    return null;
  };

  return visit(profile);
};

const parsePastCompanies = (profile: Record<string, unknown>): Array<string> => {
  const visit = (node: unknown): Array<string> => {
    if (Array.isArray(node)) {
      const result: Array<string> = [];
      for (const item of node) {
        const nested = visit(item);
        for (const value of nested) {
          result.push(value);
        }
      }
      return result;
    }

    if (!isRecord(node)) return [];

    const directList = node.past_companies;
    if (Array.isArray(directList)) {
      return dedupeStrings(directList.map((item) => asString(item) ?? "").filter(Boolean));
    }

    if (typeof directList === "string") {
      return dedupeStrings(directList.split(",").map((value) => value.trim()));
    }

    for (const child of Object.values(node)) {
      const found = visit(child);
      if (found.length > 0) return found;
    }

    return [];
  };

  return visit(profile);
};

const buildUpdate = (
  row: AlumniBankRow,
  profile: Record<string, unknown>,
): {
  update: Partial<AlumniBankRow>;
  experienceCount: number;
  hasRoleCompanySignals: boolean;
  roleCompanyChanged: boolean;
} => {
  const experiences = collectExperiences(profile);
  const companyData = extractCompanyData(experiences);
  const education = parseEducation(profile);
  const email = parseEmail(profile);
  const name = parseName(profile);
  const profileUrl = parseProfileUrl(profile);
  const fallbackPastCompanies = parsePastCompanies(profile);
  const nextCurrentRole = companyData.currentRole ?? row.currentRole;
  const nextCurrentCompany = companyData.currentCompany ?? row.currentCompany;
  const nextPastCompanies =
    companyData.pastCompanies.length > 0 ? companyData.pastCompanies : fallbackPastCompanies.length > 0 ? fallbackPastCompanies : row.pastCompanies;

  return {
    experienceCount: experiences.length,
    hasRoleCompanySignals:
      experiences.length > 0 || fallbackPastCompanies.length > 0 || companyData.currentCompany != null || companyData.currentRole != null,
    roleCompanyChanged:
      nextCurrentRole !== row.currentRole ||
      nextCurrentCompany !== row.currentCompany ||
      JSON.stringify(nextPastCompanies) !== JSON.stringify(row.pastCompanies),
    update: {
      name: name ?? row.name,
      major: education.major ?? row.major,
      minor: education.minor ?? row.minor,
      currentRole: nextCurrentRole,
      currentCompany: nextCurrentCompany,
      pastCompanies: nextPastCompanies,
      email: email ?? row.email,
      linkedin: profileUrl ?? row.linkedin,
    },
  };
};

const runRefresh = async (runId: number) => {
  try {
    const now = new Date();

    const added = await syncNewGraduatedUsers(now);
    refreshStatus.added = added;
    appendLog("info", `Graduation sync complete. Added ${added} new alumni rows.`);

    const rows = await db.select().from(alumniBank);
    const targets = rows.filter((row) => row.linkedin.trim().length > 0 && isBeforeCurrentMonthYear(row.graduationMonth, row.graduationYear, now));

    refreshStatus.total = targets.length;
    appendLog("info", `Starting run ${runId} with ${targets.length} refreshable alumni rows.`);

    for (const row of targets) {
      if (refreshStatus.runId !== runId) return;

      refreshStatus.currentName = row.name;
      refreshStatus.currentLinkedin = row.linkedin;

      const username = parseLinkedInUsername(row.linkedin);
      if (!username) {
        refreshStatus.skipped += 1;
        refreshStatus.processed += 1;
        appendLog("error", `Skipped ${row.name}: could not parse LinkedIn username.`);
        continue;
      }

      try {
        const profile = await fetchLinkedInProfile(username);
        const built = buildUpdate(row, profile);

        if (!built.hasRoleCompanySignals) {
          refreshStatus.skipped += 1;
          appendLog("error", `Skipped ${row.name} (${username}): MCP response did not contain usable role/company experience data.`);
          continue;
        }

        await db.update(alumniBank).set(built.update).where(eq(alumniBank.id, row.id));

        refreshStatus.succeeded += 1;
        appendLog(
          "info",
          `Updated ${row.name} (${username}) with ${built.experienceCount} parsed experience records. Role/company changed: ${built.roleCompanyChanged ? "yes" : "no"}.`,
        );
      } catch (error) {
        refreshStatus.failed += 1;
        refreshStatus.lastError = error instanceof Error ? error.message : "Unknown refresh error";
        appendLog("error", `Failed ${row.name}: ${refreshStatus.lastError}`);
      } finally {
        refreshStatus.processed += 1;
      }
    }

    refreshStatus.state = "completed";
    refreshStatus.finishedAt = Date.now();
    refreshStatus.currentName = null;
    refreshStatus.currentLinkedin = null;
    appendLog("info", `Run ${runId} completed.`);
  } catch (error) {
    refreshStatus.state = "failed";
    refreshStatus.finishedAt = Date.now();
    refreshStatus.currentName = null;
    refreshStatus.currentLinkedin = null;
    refreshStatus.lastError = error instanceof Error ? error.message : "Unknown fatal refresh error";
    appendLog("error", `Run ${runId} crashed: ${refreshStatus.lastError}`);
  }
};

export function validateAlumniRefreshConfig(): { ok: boolean; reason?: string; mcpUrl: string } {
  const mcpUrl = process.env.LINKEDIN_MCP_URL ?? DEFAULT_MCP_URL;
  try {
    new URL(mcpUrl);
  } catch {
    return { ok: false, reason: "LINKEDIN_MCP_URL is not a valid URL.", mcpUrl };
  }

  return { ok: true, mcpUrl };
}

export function getAlumniRefreshStatus(): AlumniRefreshStatus {
  return {
    ...refreshStatus,
    logs: [...refreshStatus.logs],
  };
}

export function startAlumniRefresh(): { started: boolean; status: AlumniRefreshStatus } {
  if (refreshStatus.state === "running") {
    return { started: false, status: getAlumniRefreshStatus() };
  }

  const runId = refreshStatus.runId + 1;
  refreshStatus = {
    state: "running",
    runId,
    startedAt: Date.now(),
    finishedAt: null,
    total: 0,
    processed: 0,
    succeeded: 0,
    failed: 0,
    skipped: 0,
    added: 0,
    currentName: null,
    currentLinkedin: null,
    lastError: null,
    logs: [],
  };

  void runRefresh(runId);
  return { started: true, status: getAlumniRefreshStatus() };
}
