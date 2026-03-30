import { extractCompanies, extractLinkedInUsername } from "@/server/api/alumniBank";
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
