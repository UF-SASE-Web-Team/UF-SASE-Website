import { pendingVerifications, sessions, users } from "@/server/db/tables";
import type { Client } from "@libsql/client";
import type { ErrorResponse, SuccessResponse } from "@schema/responseSchema";
import bcrypt from "bcryptjs";
import { afterAll, beforeAll, beforeEach, describe, expect, it, mock } from "bun:test";
import { count, eq } from "drizzle-orm";
import { Hono } from "hono";
import { createTestDatabase, resetTestDatabase } from "./testDb";

// Detailed response type for verify-code endpoint
interface VerifySuccessResponse extends SuccessResponse {
  data: {
    userId: string;
    sessionId: string;
  };
}

// Declare state
let client: Client;
let db: Awaited<ReturnType<typeof createTestDatabase>>["db"];
let emailSendCalls: Array<{ to: Array<string>; subject: string }> = [];
let app: Hono;

// Setup mocks
const mockEmailSend = async (opts: { to: Array<string>; subject: string }) => {
  emailSendCalls.push({ to: opts.to, subject: opts.subject });
  return { data: { id: "mock-email-id" }, error: null };
};

mock.module("resend", () => ({
  Resend: class MockResend {
    emails = { send: mockEmailSend };
  },
}));

mock.module("@server/env", () => ({
  SERVER_ENV: {
    DATABASE_URL: ":memory:",
    DATABASE_AUTH_TOKEN: "",
    RESEND_API_KEY: "re_test_key",
    GOOGLE_OAUTH_CLIENT_ID: "test-client-id",
    GOOGLE_OAUTH_CLIENT_SECRET: "test-secret",
    GOOGLE_OAUTH_REDIRECT_URI: "http://localhost/callback",
  },
}));

mock.module("@/server/email/verification-template", () => ({
  VerificationTemplate: ({ code }: { code: string }) => `<div>Your code: ${code}</div>`,
}));

// Helper to insert pending verification to db
const createPendingVerification = async (email: string, username: string, password: string, code: string) => {
  const hashedCode = await bcrypt.hash(code, 10);
  const hashedPassword = await bcrypt.hash(password, 10);
  await db.insert(pendingVerifications).values({
    email,
    code: hashedCode,
    userData: JSON.stringify({ username, password: hashedPassword, email }),
    expiresAt: Date.now() + 10 * 60 * 1000,
    attempts: 0,
  });
};

// Helper to insert user to db
const insertUser = async (id: string, username: string, email: string) => {
  await db.insert(users).values({
    id,
    username,
    email,
    password: "passwordHash",
    firstName: "",
    lastName: "",
    timeAdded: Date.now(),
    timeUpdated: Date.now(),
    points: 0,
  });
};

describe("Auth API Integration Tests", () => {
  beforeAll(async () => {
    // Dynamically import routes here to ensure mocks are registered first
    const { default: authRoutes } = await import("@/server/api/auth");
    app = new Hono().route("/api", authRoutes);

    ({ client, db } = await createTestDatabase());
    mock.module("@/server/db/db", () => ({ db }));
  });

  beforeEach(async () => {
    ({ client, db } = await resetTestDatabase(client));
    mock.module("@/server/db/db", () => ({ db }));
    emailSendCalls = [];
  });

  afterAll(() => {
    client.close();
  });

  describe("POST /api/auth/signup", () => {
    describe("valid signup flow", () => {
      it("should create pending verification for valid inputs", async () => {
        const signupData = {
          email: "testuser@email.com",
          password: "P@ssword123",
          username: "testuser",
        };

        const res = await app.request("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(signupData),
        });

        expect(res.status).toBe(200);
        const json = (await res.json()) as SuccessResponse;
        expect(json.message).toBe("Please check your email");

        const [pending] = await db.select().from(pendingVerifications).where(eq(pendingVerifications.email, signupData.email));

        expect(pending).toBeDefined();
        if (!pending) return;

        expect(pending.email).toBe(signupData.email);
        expect(pending.expiresAt).toBeGreaterThan(Date.now());

        const userData = JSON.parse(pending.userData) as { username: string; email: string };
        expect(userData.username).toBe(signupData.username);
        expect(userData.email).toBe(signupData.email);
      });
    });

    describe("duplicate rejection", () => {
      it("should return 400 EMAIL_TAKEN when email already exists", async () => {
        await insertUser("existing-id", "existinguser", "taken@email.com");

        const res = await app.request("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: "taken@email.com",
            password: "P@ssword123",
            username: "differentuser",
          }),
        });

        expect(res.status).toBe(400);
        const json = (await res.json()) as ErrorResponse;
        expect(json.error.errCode).toBe("EMAIL_TAKEN");
        expect(json.error.errMsg).toBe("Email already registered");
      });

      it("should return 400 USERNAME_TAKEN when username already exists", async () => {
        await insertUser("existing-id", "takenuser", "other@email.com");

        const res = await app.request("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: "new@email.com",
            password: "P@ssword123",
            username: "takenuser",
          }),
        });

        expect(res.status).toBe(400);
        const json = (await res.json()) as ErrorResponse;
        expect(json.error.errCode).toBe("USERNAME_TAKEN");
        expect(json.error.errMsg).toBe("Username already taken");
      });
    });

    describe("validation errors", () => {
      it("should reject signup with invalid password format", async () => {
        const res = await app.request("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: "valid@email.com",
            password: "weakpass",
            username: "validuser",
          }),
        });

        expect(res.status).toBe(400);
        const json = (await res.json()) as ErrorResponse;
        expect(json.error.errCode).toBe("INVALID_PASSWORD");
      });

      it("should reject signup with invalid email format", async () => {
        const res = await app.request("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: "not-an-email",
            password: "P@ssword123",
            username: "validuser",
          }),
        });

        expect(res.status).toBe(400);
        const json = (await res.json()) as ErrorResponse;
        expect(json.error.errCode).toBe("INVALID_EMAIL");
      });
    });

    describe("re-signup behavior", () => {
      it("should overwrite pending verification for same email", async () => {
        const email = "resend@email.com";
        await createPendingVerification(email, "originaluser", "OldPass123!", "111111");

        const res = await app.request("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            password: "NewPass456!",
            username: "newusername",
          }),
        });

        expect(res.status).toBe(200);

        const [countResult] = await db.select({ count: count() }).from(pendingVerifications).where(eq(pendingVerifications.email, email));
        expect(countResult?.count).toBe(1);

        const [pending] = await db
          .select({ userData: pendingVerifications.userData })
          .from(pendingVerifications)
          .where(eq(pendingVerifications.email, email));
        if (!pending) return;

        const userData = JSON.parse(pending.userData) as { username: string };
        expect(userData.username).toBe("newusername");
      });

      it("should allow pending signup with username that exists in pending verifications", async () => {
        const username = "john";
        await createPendingVerification("user@email.com", username, "P@ssword123", "111111");

        const res = await app.request("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: "differentuser@email.com",
            password: "P@ssword123",
            username: "john",
          }),
        });
        expect(res.status).toBe(200);
        const json = (await res.json()) as SuccessResponse;
        expect(json.message).toBe("Please check your email");

        const [pending] = await db.select().from(pendingVerifications).where(eq(pendingVerifications.email, "differentuser@email.com"));
        expect(pending).toBeDefined();
        if (!pending) return;

        const userData = JSON.parse(pending.userData) as { username: string };
        expect(userData.username).toBe("john");

        const allPending = await db.select().from(pendingVerifications);
        expect(allPending.length).toBe(2);
      });
    });
  });

  describe("POST /api/auth/verify-code", () => {
    describe("successful verification", () => {
      it("should complete registration when correct code is provided", async () => {
        const email = "verifytest@email.com";
        const username = "verifyuser";
        const password = "P@ssword123";
        const knownCode = "123456";

        await createPendingVerification(email, username, password, knownCode);

        const verifyRes = await app.request("/api/auth/verify-code", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, code: knownCode }),
        });

        expect(verifyRes.status).toBe(200);
        const verifyJson = (await verifyRes.json()) as VerifySuccessResponse;
        expect(verifyJson.message).toBe("Account created and logged in");
        expect(verifyJson.data.userId).toBeDefined();
        expect(verifyJson.data.sessionId).toBeDefined();

        const [user] = await db.select().from(users).where(eq(users.email, email));
        expect(user).toBeDefined();
        if (!user) return;
        expect(user.username).toBe(username);

        const pendingRows = await db.select().from(pendingVerifications).where(eq(pendingVerifications.email, email));
        expect(pendingRows.length).toBe(0);

        const [session] = await db.select().from(sessions).where(eq(sessions.id, verifyJson.data.sessionId));
        expect(session).toBeDefined();
        expect(session.userId).toBe(verifyJson.data.userId);
      });
    });

    describe("verification failures", () => {
      it("should reject invalid verification code", async () => {
        const email = "wrongcode@email.com";
        await createPendingVerification(email, "wrongcodeuser", "P@ssword123", "999999");

        const verifyRes = await app.request("/api/auth/verify-code", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, code: "000000" }),
        });

        expect(verifyRes.status).toBe(400);
        const json = (await verifyRes.json()) as ErrorResponse;
        expect(json.error.errCode).toBe("INVALID_CODE");
      });

      it("should reject expired verification codes", async () => {
        const email = "expired@email.com";
        const hashedCode = await bcrypt.hash("123456", 10);

        await db.insert(pendingVerifications).values({
          email,
          code: hashedCode,
          userData: JSON.stringify({ username: "exp", password: "hash", email }),
          expiresAt: Date.now() - 1000, // Force expiration
          attempts: 0,
        });

        const res = await app.request("/api/auth/verify-code", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, code: "123456" }),
        });

        expect(res.status).toBe(400);
        const json = (await res.json()) as ErrorResponse;
        expect(json.error.errCode).toBe("CODE_EXPIRED");

        const pendingRows = await db.select().from(pendingVerifications).where(eq(pendingVerifications.email, email));
        expect(pendingRows.length).toBe(0);
      });

      it("should reject when no pending verification exists", async () => {
        const res = await app.request("/api/auth/verify-code", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: "nonexistent@email.com",
            code: "123456",
          }),
        });

        expect(res.status).toBe(400);
        const json = (await res.json()) as ErrorResponse;
        expect(json.error.errCode).toBe("INVALID_CODE");
        expect(json.error.errMsg).toBe("No verification pending");
      });

      it("should reject verification if username was taken by another user before completion", async () => {
        const email1 = "first@email1.com";
        const email2 = "second@email1.com";
        const code1 = "111111";
        const code2 = "222222";

        await createPendingVerification(email1, "john", "P@ssword123", code1);
        await createPendingVerification(email2, "john", "P@ssword123", code2);

        const res1 = await app.request("/api/auth/verify-code", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email1, code: code1 }),
        });
        expect(res1.status).toBe(200);

        const res2 = await app.request("/api/auth/verify-code", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: "second@email.com", code: code2 }),
        });

        expect(res2.status).toBe(400);
        const json = (await res2.json()) as ErrorResponse;
        expect(json.error.errCode).toBe("USERNAME_TAKEN");
      });
    });

    describe("rate limiting", () => {
      it("should lock out after 3 failed verification attempts", async () => {
        const email = "lockout@email.com";
        await createPendingVerification(email, "lockoutuser", "P@ssword123", "999999");

        for (let i = 0; i < 3; i++) {
          const res = await app.request("/api/auth/verify-code", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, code: "000000" }),
          });

          expect(res.status).toBe(400);
          const json = (await res.json()) as ErrorResponse;

          if (i < 2) {
            expect(json.error.errCode).toBe("INVALID_CODE");
          } else {
            expect(json.error.errCode).toBe("TOO_MANY_ATTEMPTS");
          }
        }

        const pendingRows = await db.select().from(pendingVerifications).where(eq(pendingVerifications.email, email));
        expect(pendingRows.length).toBe(0);
      });
    });
  });
});
