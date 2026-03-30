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

export default alumniRoutes;
