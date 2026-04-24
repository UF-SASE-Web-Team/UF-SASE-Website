import { extractCompanies, extractLinkedInUsername, filterAlumni } from "@/server/api/alumniBank";
import type { AlumniBankRow } from "@/server/api/alumniBank";
import { describe, expect, it } from "bun:test";

describe("extractLinkedInUsername", () => {
  describe("full LinkedIn URLs", () => {
    it("extracts username from full URL with trailing slash", () => {
      expect(extractLinkedInUsername("https://www.linkedin.com/in/johndoe/")).toBe("johndoe");
    });

    it("extracts username from full URL without trailing slash", () => {
      expect(extractLinkedInUsername("https://www.linkedin.com/in/johndoe")).toBe("johndoe");
    });

    it("extracts username from short URL (no www)", () => {
      expect(extractLinkedInUsername("linkedin.com/in/johndoe")).toBe("johndoe");
    });

    it("extracts username from http (non-https) URL", () => {
      expect(extractLinkedInUsername("http://www.linkedin.com/in/johndoe")).toBe("johndoe");
    });

    it("strips query string from URL", () => {
      expect(extractLinkedInUsername("https://linkedin.com/in/johndoe?trk=abc")).toBe("johndoe");
    });

    it("strips hash fragment from URL", () => {
      expect(extractLinkedInUsername("https://linkedin.com/in/johndoe#section")).toBe("johndoe");
    });

    it("strips both query string and hash fragment", () => {
      expect(extractLinkedInUsername("https://linkedin.com/in/johndoe?trk=abc#section")).toBe("johndoe");
    });

    it("strips multiple trailing slashes", () => {
      expect(extractLinkedInUsername("https://linkedin.com/in/johndoe///")).toBe("johndoe");
    });

    it("handles username with hyphens in URL", () => {
      expect(extractLinkedInUsername("https://www.linkedin.com/in/john-doe/")).toBe("john-doe");
    });
  });

  describe("bare usernames (no URL)", () => {
    it("returns bare username as-is", () => {
      expect(extractLinkedInUsername("johndoe")).toBe("johndoe");
    });

    it("returns username with hyphens as-is", () => {
      expect(extractLinkedInUsername("john-doe")).toBe("john-doe");
    });

    it("trims surrounding whitespace from bare username", () => {
      expect(extractLinkedInUsername("  johndoe  ")).toBe("johndoe");
    });
  });

  describe("null / invalid inputs", () => {
    it("returns null for empty string", () => {
      expect(extractLinkedInUsername("")).toBeNull();
    });

    it("returns null for whitespace-only string", () => {
      expect(extractLinkedInUsername("   ")).toBeNull();
    });

    it("returns null for a URL with dots and slashes but no /in/ segment", () => {
      expect(extractLinkedInUsername("www.linkedin.com")).toBeNull();
    });

    it("returns null for a domain-only URL", () => {
      expect(extractLinkedInUsername("https://www.linkedin.com/")).toBeNull();
    });
  });
});

describe("extractCompanies", () => {
  describe("current company detection", () => {
    it("identifies current company via isCurrent flag", () => {
      const result = extractCompanies([
        { company: "Google", isCurrent: true },
        { company: "Meta", endDate: "2022-01" },
      ]);
      expect(result.currentCompany).toBe("Google");
    });

    it("identifies current company via null endDate", () => {
      const result = extractCompanies([
        { company: "Stripe", endDate: null },
        { company: "Amazon", endDate: "2021-06" },
      ]);
      expect(result.currentCompany).toBe("Stripe");
    });

    it("identifies current company via undefined endDate", () => {
      const result = extractCompanies([{ company: "Apple" }, { company: "Microsoft", endDate: "2020-03" }]);
      expect(result.currentCompany).toBe("Apple");
    });

    it("returns null currentCompany when all roles have end dates", () => {
      const result = extractCompanies([
        { company: "Netflix", endDate: "2023-01" },
        { company: "Spotify", endDate: "2021-05" },
      ]);
      expect(result.currentCompany).toBeNull();
    });

    it("trims whitespace from current company name", () => {
      const result = extractCompanies([{ company: "  OpenAI  ", isCurrent: true }]);
      expect(result.currentCompany).toBe("OpenAI");
    });

    it("returns null currentCompany for empty array", () => {
      expect(extractCompanies([]).currentCompany).toBeNull();
    });
  });

  describe("past companies extraction", () => {
    it("collects companies from non-current roles", () => {
      const result = extractCompanies([
        { company: "Google", isCurrent: true },
        { company: "Meta", endDate: "2022-01" },
        { company: "Amazon", endDate: "2020-06" },
      ]);
      expect(result.pastCompanies).toEqual(["Meta", "Amazon"]);
    });

    it("excludes the current role from past companies", () => {
      const result = extractCompanies([{ company: "Google", isCurrent: true }]);
      expect(result.pastCompanies).toEqual([]);
    });

    it("returns empty pastCompanies for empty array", () => {
      expect(extractCompanies([]).pastCompanies).toEqual([]);
    });

    it("trims whitespace from past company names", () => {
      const result = extractCompanies([
        { company: "Google", isCurrent: true },
        { company: "  Meta  ", endDate: "2022-01" },
      ]);
      expect(result.pastCompanies).toEqual(["Meta"]);
    });

    it("skips entries with empty company name", () => {
      const result = extractCompanies([
        { company: "Google", isCurrent: true },
        { company: "", endDate: "2022-01" },
        { company: "   ", endDate: "2021-01" },
      ]);
      expect(result.pastCompanies).toEqual([]);
    });
  });

  describe("deduplication", () => {
    it("deduplicates exact duplicate company names", () => {
      const result = extractCompanies([
        { company: "Google", isCurrent: true },
        { company: "Meta", endDate: "2022-01" },
        { company: "Meta", endDate: "2019-06" },
      ]);
      expect(result.pastCompanies).toEqual(["Meta"]);
    });

    it("deduplicates company names case-insensitively", () => {
      const result = extractCompanies([
        { company: "Google", isCurrent: true },
        { company: "meta", endDate: "2022-01" },
        { company: "Meta", endDate: "2019-06" },
        { company: "META", endDate: "2017-03" },
      ]);
      expect(result.pastCompanies).toHaveLength(1);
    });

    it("preserves the first-seen casing when deduplicating", () => {
      const result = extractCompanies([
        { company: "Google", isCurrent: true },
        { company: "meta", endDate: "2022-01" },
        { company: "Meta", endDate: "2019-06" },
      ]);
      expect(result.pastCompanies[0]).toBe("meta");
    });
  });
});

describe("filterAlumni", () => {
  const base: AlumniBankRow = {
    id: "1",
    name: "Alice Smith",
    major: "Computer Science",
    minor: "Math",
    graduationMonth: "May",
    graduationYear: 2023,
    currentRole: "Software Engineer",
    currentCompany: "Google",
    pastCompanies: ["Meta", "Amazon"],
    email: "alice@example.com",
    linkedin: "alice-smith",
  };

  const rows: Array<AlumniBankRow> = [
    base,
    {
      ...base,
      id: "2",
      name: "Bob Lee",
      major: "Electrical Engineering",
      minor: "None",
      graduationYear: 2022,
      currentRole: "Product Manager",
      currentCompany: "Apple",
      pastCompanies: ["Netflix"],
    },
    {
      ...base,
      id: "3",
      name: "Carol Nguyen",
      major: "Computer Science",
      minor: "None",
      graduationYear: 2024,
      currentRole: "Data Scientist",
      currentCompany: "Stripe",
      pastCompanies: ["Google", "Spotify"],
    },
  ];

  it("returns all rows when no params given", () => {
    expect(filterAlumni(rows, {})).toHaveLength(3);
  });

  it("search matches on name", () => {
    const result = filterAlumni(rows, { search: "Alice" });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("1");
  });

  it("search matches on currentRole", () => {
    const result = filterAlumni(rows, { search: "Data Scientist" });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("3");
  });

  it("search matches on currentCompany", () => {
    const result = filterAlumni(rows, { search: "Apple" });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("2");
  });

  it("search matches on a pastCompanies element", () => {
    const result = filterAlumni(rows, { search: "Netflix" });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("2");
  });

  it("search is case-insensitive", () => {
    expect(filterAlumni(rows, { search: "alice" })).toHaveLength(1);
    expect(filterAlumni(rows, { search: "ALICE" })).toHaveLength(1);
  });

  it("search returns empty array when no match", () => {
    expect(filterAlumni(rows, { search: "zzznomatch" })).toHaveLength(0);
  });

  it("search matches partial substring", () => {
    const result = filterAlumni(rows, { search: "Smith" });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("1");
  });

  it("major filter is case-insensitive contains match", () => {
    const result = filterAlumni(rows, { major: "computer science" });
    expect(result).toHaveLength(2);
  });

  it("major filter returns empty when no match", () => {
    expect(filterAlumni(rows, { major: "Biology" })).toHaveLength(0);
  });

  it("company filter matches currentCompany", () => {
    const result = filterAlumni(rows, { company: "Google" });
    expect(result.some((r) => r.id === "1")).toBe(true);
  });

  it("company filter matches inside pastCompanies", () => {
    const result = filterAlumni(rows, { company: "Spotify" });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("3");
  });

  it("company filter is case-insensitive", () => {
    const lower = filterAlumni(rows, { company: "google" });
    const upper = filterAlumni(rows, { company: "GOOGLE" });
    expect(lower.length).toBe(upper.length);
    expect(lower.length).toBeGreaterThan(0);
  });

  it("graduationYear exact match", () => {
    const result = filterAlumni(rows, { graduationYear: 2022 });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("2");
  });

  it("graduationYear returns empty when no match", () => {
    expect(filterAlumni(rows, { graduationYear: 1999 })).toHaveLength(0);
  });

  it("multiple params are AND'd together", () => {
    const result = filterAlumni(rows, { major: "Computer Science", graduationYear: 2023 });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("1");
  });

  it("search and company combined must both match", () => {
    // Alice works at Google currently but has Meta/Amazon in past — search "Alice" + company "Meta" should match
    const result = filterAlumni(rows, { search: "Alice", company: "Meta" });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("1");
  });

  it("returns empty array when AND combination has no matches", () => {
    const result = filterAlumni(rows, { search: "Alice", company: "Netflix" });
    expect(result).toHaveLength(0);
  });
});
