import { emailRegex, passwordRegex } from "@/shared/utils";
import { describe, expect, it } from "bun:test";

describe("Auth Regex Validators", () => {
  describe("emailRegex", () => {
    it("should match valid email addresses", () => {
      const validEmails = ["test@example.com", "user.name@domain.co", "user+tag@domain.com", "admin@subdomain.example.org"];
      validEmails.forEach((email) => {
        expect(emailRegex.test(email), `Email "${email}" should be accepted`).toBe(true);
      });
    });

    it("should fail invalid email addresses", () => {
      const invalidEmails = [
        "plainaddress",
        "#@%^%#$@#$@#.com",
        "@example.com",
        "Joe Smith <email@example.com>",
        "email.example.com",
        "email@example@example.com",
        ".email@example.com",
        "email.@example.com",
        "email..email@example.com",
      ];
      invalidEmails.forEach((email) => {
        expect(emailRegex.test(email), `Email "${email}" should be rejected`).toBe(false);
      });
    });
  });

  describe("passwordRegex", () => {
    // Passwords should be at least length 8, at least 1 uppercase, at least 1 number, and at least 1 special char

    it("should match valid passwords", () => {
      const validPasswords = ["Password123!", "SecurePass!2024", "Complex#Pass99", "Short1!a"];
      validPasswords.forEach((pwd) => {
        expect(passwordRegex.test(pwd)).toBe(true);
      });
    });

    it("should fail if missing uppercase", () => {
      expect(passwordRegex.test("password123!")).toBe(false);
    });

    it("should fail if missing number", () => {
      expect(passwordRegex.test("Password!")).toBe(false);
    });

    it("should fail if missing special character", () => {
      expect(passwordRegex.test("Password123")).toBe(false);
    });

    it("should fail if too short", () => {
      expect(passwordRegex.test("Pass1!")).toBe(false);
    });
  });
});
