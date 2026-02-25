import { extractLinkedInUsername } from "@/server/api/alumniBank";
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
