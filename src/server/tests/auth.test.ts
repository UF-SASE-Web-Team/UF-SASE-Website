import { oauthAccounts, pendingVerifications, professionalInfo, sessions, userRoleRelationship, users } from "@/server/db/tables";
import type { Client } from "@libsql/client";
import type { ErrorResponse, SuccessResponse } from "@schema/responseSchema";
import bcrypt from "bcryptjs";
import { afterAll, beforeAll, beforeEach, describe, expect, it, mock } from "bun:test";
import { and, count, eq } from "drizzle-orm";
import { Hono } from "hono";
import { createTestDatabase, resetTestDatabase } from "./testDb";

// Verify-code endpoint response type
interface VerifySuccessResponse extends SuccessResponse {
  data: {
    userId: string;
    sessionId: string;
  };
}

// Login endpoint response type
interface LoginSuccessResponse extends SuccessResponse {
  data: {
    sessionId: string;
  };
}

// Session endopint response type
interface SessionSuccessResponse extends SuccessResponse {
  data: {
    id: string;
    username: string;
    roles: Array<string>;
  };
}

// Declare state
let client: Client;
let db: Awaited<ReturnType<typeof createTestDatabase>>["db"];
let emailSendCalls: Array<{ to: Array<string>; subject: string }> = [];
let app: Hono;

// OAuth mock — stable state string used by arctic mock and callback tests
const mockOAuthState = "mock-state";

// Default Google user returned by the mocked fetch; override per-test via mockGoogleUserResponse
const defaultGoogleUser = {
  id: "google-id-123",
  email: "googleuser@gmail.com",
  verified_email: true,
  name: "Google User",
  given_name: "Google",
  family_name: "User",
};

// Override per test to simulate different Google API responses
let mockGoogleUserResponse: { ok: boolean; json: () => Promise<Record<string, unknown>> } = {
  ok: true,
  json: async () => ({ ...defaultGoogleUser }),
};

// Intercept Google userinfo fetch — everything else passes through
const originalFetch = globalThis.fetch;
globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
  const url = typeof input === "string" ? input : input instanceof URL ? input.toString() : input.url;
  if (url.includes("googleapis.com/oauth2/v2/userinfo")) return mockGoogleUserResponse as Response;
  return originalFetch(input, init);
}) as typeof fetch;

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

mock.module("arctic", () => ({
  generateState: () => mockOAuthState,
  generateCodeVerifier: () => "mock-verifier",
  Google: class MockGoogle {
    createAuthorizationURL = async () => new URL(`https://accounts.google.com/o/oauth2/auth?state=${mockOAuthState}`);
    validateAuthorizationCode = async () => ({ accessToken: () => "mock-token" });
  },
}));

// --- Helpers ---

/** Insert pending verification via DB */
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

/** Insert user via DB */
const insertUser = async (id: string, username: string, email: string, password?: string) => {
  const hashedPassword = password ? await bcrypt.hash(password, 10) : null;
  await db.insert(users).values({
    id,
    username,
    email,
    password: hashedPassword,
    firstName: "",
    lastName: "",
    timeAdded: Date.now(),
    timeUpdated: Date.now(),
    points: 0,
  });
};

/** Signup via API */
const signupViaApi = async (email: string, password: string, username: string) => {
  return app.request("/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, username }),
  });
};

/** Signup via API and extract the verification code from the mock email */
const signupViaApiAndGetCode = async (email: string, password: string, username: string) => {
  const prevEmailCount = emailSendCalls.length;
  const res = await signupViaApi(email, password, username);
  const code = emailSendCalls[prevEmailCount]?.subject.split(" ")[0];
  return { res, code };
};

/** Verify code via API */
const verifyViaApi = async (email: string, code: string) => {
  return app.request("/api/auth/verify-code", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, code }),
  });
};

/** Login via API */
const loginViaApi = async (username: string, password: string) => {
  return app.request("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
};

/** Check session via API */
const sessionViaApi = async (sessionId: string) => {
  return app.request("/api/auth/session", {
    headers: { Cookie: `sessionId=${sessionId}` },
  });
};

/** Logout via API */
const logoutViaApi = async (sessionId: string) => {
  return app.request("/api/auth/logout", {
    method: "POST",
    headers: { Cookie: `sessionId=${sessionId}` },
  });
};

/** Resend verification code via API */
const resendCodeViaApi = async (email: string) => {
  return app.request("/api/auth/resend-code", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
};

// --- Test Suite ---

describe("Auth Integration Tests", () => {
  beforeAll(async () => {
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
    describe("input validation", () => {
      it("should reject invalid email format", async () => {
        const res = await signupViaApi("not-an-email", "P@ssword123", "validuser");

        expect(res.status).toBe(400);
        const json = (await res.json()) as ErrorResponse;
        expect(json.error.errCode).toBe("INVALID_EMAIL");
      });

      it("should reject invalid password format", async () => {
        const res = await signupViaApi("valid@email.com", "weakpass", "validuser");

        expect(res.status).toBe(400);
        const json = (await res.json()) as ErrorResponse;
        expect(json.error.errCode).toBe("INVALID_PASSWORD");
      });

      it("should reject missing username", async () => {
        const res = await signupViaApi("a@b.com", "P@ssword123", "");

        expect(res.status).toBe(400);
        const json = (await res.json()) as ErrorResponse;
        expect(json.error.errCode).toBe("INVALID_USERNAME");
      });
    });

    describe("duplicate rejection", () => {
      it("should reject when email is already registered", async () => {
        await insertUser("existing-id", "existinguser", "taken@email.com", "P@ssword123");

        const res = await signupViaApi("taken@email.com", "P@ssword123", "differentuser");

        expect(res.status).toBe(400);
        const json = (await res.json()) as ErrorResponse;
        expect(json.error.errCode).toBe("EMAIL_TAKEN");
      });

      it("should reject when username is already registered", async () => {
        await insertUser("existing-id", "takenuser", "other@email.com", "P@ssword123");

        const res = await signupViaApi("new@email.com", "P@ssword123", "takenuser");

        expect(res.status).toBe(400);
        const json = (await res.json()) as ErrorResponse;
        expect(json.error.errCode).toBe("USERNAME_TAKEN");
      });
    });

    describe("successful signup", () => {
      it("should create pending verification and send email", async () => {
        const res = await signupViaApi("testuser@email.com", "P@ssword123", "testuser");

        expect(res.status).toBe(200);

        const [pending] = await db.select().from(pendingVerifications).where(eq(pendingVerifications.email, "testuser@email.com"));
        expect(pending).toBeDefined();
        if (!pending) return;

        expect(pending.email).toBe("testuser@email.com");
        expect(pending.expiresAt).toBeGreaterThan(Date.now());

        const userData = JSON.parse(pending.userData) as { username: string; email: string };
        expect(userData.username).toBe("testuser");
        expect(userData.email).toBe("testuser@email.com");

        expect(emailSendCalls.length).toBe(1);
        expect(emailSendCalls[0].to).toEqual(["testuser@email.com"]);
      });
    });

    describe("re-signup behavior", () => {
      it("should allow two different emails to have the same pending username", async () => {
        await createPendingVerification("user@email.com", "john", "P@ssword123", "111111");

        const res = await signupViaApi("differentuser@email.com", "P@ssword123", "john");

        expect(res.status).toBe(200);

        const allPending = await db.select().from(pendingVerifications);
        expect(allPending.length).toBe(2);
      });

      it("should reset attempts counter allowing fresh verification tries", async () => {
        const email = "resetsattempts@email.com";

        // First signup
        const { code: code1 } = await signupViaApiAndGetCode(email, "P@ssword123", "attuser1");
        expect(code1).toBeDefined();

        // Fail twice
        await verifyViaApi(email, "000000");
        await verifyViaApi(email, "000000");
        const [before] = await db.select().from(pendingVerifications).where(eq(pendingVerifications.email, email));
        expect(before?.attempts).toBe(2);

        // Re-signup overwrites pending with attempts=0
        const { code: code2 } = await signupViaApiAndGetCode(email, "P@ssword123", "attuser2");
        expect(code2).toBeDefined();

        const [after] = await db.select().from(pendingVerifications).where(eq(pendingVerifications.email, email));
        expect(after?.attempts).toBe(0);
      });
    });
  });

  describe("POST /api/auth/verify-code", () => {
    describe("input validation", () => {
      it("should reject missing code", async () => {
        const res = await verifyViaApi("a@b.com", "");

        expect(res.status).toBe(400);
        const json = (await res.json()) as ErrorResponse;
        expect(json.error.errCode).toBe("INVALID_INPUT");
      });

      it("should reject missing email", async () => {
        const res = await verifyViaApi("", "123456");

        expect(res.status).toBe(400);
        const json = (await res.json()) as ErrorResponse;
        expect(json.error.errCode).toBe("INVALID_INPUT");
      });
    });

    describe("successful verification", () => {
      it("should create user, session, and clean up pending verification", async () => {
        const email = "verifytest@email.com";
        const username = "verifyuser";
        const knownCode = "123456";

        await createPendingVerification(email, username, "P@ssword123", knownCode);

        const res = await verifyViaApi(email, knownCode);

        expect(res.status).toBe(200);
        const json = (await res.json()) as VerifySuccessResponse;
        expect(json.message).toBe("Account created and logged in");
        expect(json.data.userId).toBeDefined();
        expect(json.data.sessionId).toBeDefined();

        const [user] = await db.select().from(users).where(eq(users.email, email));
        expect(user).toBeDefined();
        expect(user?.username).toBe(username);

        const pendingRows = await db.select().from(pendingVerifications).where(eq(pendingVerifications.email, email));
        expect(pendingRows.length).toBe(0);

        // Session created
        const [session] = await db.select().from(sessions).where(eq(sessions.id, json.data.sessionId));
        expect(session).toBeDefined();
        expect(session?.userId).toBe(json.data.userId);
      });
    });

    describe("code validation failures", () => {
      it("should reject incorrect code", async () => {
        await createPendingVerification("wrongcode@email.com", "wrongcodeuser", "P@ssword123", "999999");

        const res = await verifyViaApi("wrongcode@email.com", "000000");

        expect(res.status).toBe(400);
        const json = (await res.json()) as ErrorResponse;
        expect(json.error.errCode).toBe("INVALID_CODE");
      });

      it("should reject expired code and clean up pending", async () => {
        const email = "expired@email.com";
        const hashedCode = await bcrypt.hash("123456", 10);

        await db.insert(pendingVerifications).values({
          email,
          code: hashedCode,
          userData: JSON.stringify({ username: "exp", password: "hash", email }),
          expiresAt: Date.now() - 1000, // Force expiration
          attempts: 0,
        });

        const res = await verifyViaApi(email, "123456");

        expect(res.status).toBe(400);
        const json = (await res.json()) as ErrorResponse;
        expect(json.error.errCode).toBe("CODE_EXPIRED");

        const pendingRows = await db.select().from(pendingVerifications).where(eq(pendingVerifications.email, email));
        expect(pendingRows.length).toBe(0);
      });

      it("should reject when no pending verification exists", async () => {
        const res = await verifyViaApi("nonexistent@email.com", "123456");

        expect(res.status).toBe(400);
        const json = (await res.json()) as ErrorResponse;
        expect(json.error.errCode).toBe("INVALID_CODE");
      });
    });

    describe("attempt limiting", () => {
      it("should lock out after 3 failed attempts and clean up pending", async () => {
        const email = "lockout@email.com";
        await createPendingVerification(email, "lockoutuser", "P@ssword123", "999999");

        for (let i = 0; i < 3; i++) {
          const res = await verifyViaApi(email, "000000");
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

    describe("race conditions", () => {
      it("should reject verification when username was taken by another user first", async () => {
        const code1 = "111111";
        const code2 = "222222";

        await createPendingVerification("first@email.com", "john", "P@ssword123", code1);
        await createPendingVerification("second@email.com", "john", "P@ssword123", code2);

        // First user takes username
        const res1 = await verifyViaApi("first@email.com", code1);
        expect(res1.status).toBe(200);

        // Second user tries to verify but username already taken
        const res2 = await verifyViaApi("second@email.com", code2);
        expect(res2.status).toBe(400);

        const json = (await res2.json()) as ErrorResponse;
        expect(json.error.errCode).toBe("USERNAME_TAKEN");

        const pendingRows = await db.select().from(pendingVerifications).where(eq(pendingVerifications.email, "second@email.com"));
        expect(pendingRows.length).toBe(0);
      });

      it("should reject verification when email was registered via OAuth before completion", async () => {
        const email = "oauth@email.com";
        const code = "123456";

        await createPendingVerification(email, "oauthuser", "P@ssword123", code);

        // Simulate Google OAuth registering this email first
        await insertUser("oauth-id", "oauthuser-google", email);

        const res = await verifyViaApi(email, code);
        expect(res.status).toBe(400);

        const json = (await res.json()) as ErrorResponse;
        expect(json.error.errCode).toBe("EMAIL_TAKEN");

        const pendingRows = await db.select().from(pendingVerifications).where(eq(pendingVerifications.email, email));
        expect(pendingRows.length).toBe(0);
      });
    });
  });

  describe("POST /api/auth/login", () => {
    describe("input validation", () => {
      it("should reject missing username", async () => {
        const res = await loginViaApi("", "P@ssword123");
        expect(res.status).toBe(401);

        const json = (await res.json()) as ErrorResponse;
        expect(json.error.errCode).toBe("INVALID_USERNAME");
      });

      it("should reject missing password", async () => {
        const res = await loginViaApi("testuser", "");
        expect(res.status).toBe(401);

        const json = (await res.json()) as ErrorResponse;
        expect(json.error.errCode).toBe("INVALID_PASSWORD");
      });
    });

    describe("successful login", () => {
      it("should login with correct username and password", async () => {
        await insertUser("user", "testuser", "test@email.com", "P@ssword123");

        const res = await loginViaApi("testuser", "P@ssword123");
        expect(res.status).toBe(200);

        const json = (await res.json()) as LoginSuccessResponse;
        expect(json.data.sessionId).toBeDefined();

        const [session] = await db.select().from(sessions).where(eq(sessions.id, json.data.sessionId));
        expect(session).toBeDefined();
        expect(session?.userId).toBe("user");
      });

      it("should login with email instead of username", async () => {
        await insertUser("user", "testuser", "test@email.com", "P@ssword123");

        const res = await loginViaApi("test@email.com", "P@ssword123");
        expect(res.status).toBe(200);

        const json = (await res.json()) as LoginSuccessResponse;
        expect(json.data.sessionId).toBeDefined();
      });
    });

    describe("failed login", () => {
      it("should reject non-existent user", async () => {
        const res = await loginViaApi("ghost", "P@ssword123");
        expect(res.status).toBe(401);

        const json = (await res.json()) as ErrorResponse;
        expect(json.error.errCode).toBe("INVALID_CREDENTIALS");
      });

      it("should reject incorrect password", async () => {
        await insertUser("user", "testuser", "test@email.com", "P@ssword123");

        const res = await loginViaApi("testuser", "WrongPassword1!");
        expect(res.status).toBe(401);

        const json = (await res.json()) as ErrorResponse;
        expect(json.error.errCode).toBe("INVALID_PASSWORD");
      });

      it("should reject login for OAuth-only user (no password)", async () => {
        await insertUser("oauth-user", "googleuser", "google@email.com");

        const res = await loginViaApi("googleuser", "P@ssword123");
        expect(res.status).toBe(401);

        const json = (await res.json()) as ErrorResponse;
        expect(json.error.errCode).toBe("NO_PASSWORD");
      });
    });
  });

  describe("POST /api/auth/logout", () => {
    it("should delete session and log out", async () => {
      await insertUser("user", "testuser", "test@email.com", "P@ssword123");

      const loginRes = await loginViaApi("testuser", "P@ssword123");
      const loginJson = (await loginRes.json()) as LoginSuccessResponse;
      const { sessionId } = loginJson.data;

      const logoutRes = await logoutViaApi(sessionId);
      expect(logoutRes.status).toBe(200);

      const sessionRows = await db.select().from(sessions).where(eq(sessions.id, sessionId));
      expect(sessionRows.length).toBe(0);
    });

    it("should reject logout with no session cookie", async () => {
      const res = await logoutViaApi("");
      expect(res.status).toBe(401);
      const json = (await res.json()) as ErrorResponse;
      expect(json.error.errCode).toBe("NO_SESSION");
    });

    it("should succeed with non-existent session ID", async () => {
      const res = await logoutViaApi("totally-fake-session-id");
      expect(res.status).toBe(200);
    });
  });

  describe("GET /api/auth/session", () => {
    it("should return user info for valid session", async () => {
      await insertUser("user", "testuser", "test@email.com", "P@ssword123");

      const loginRes = await loginViaApi("testuser", "P@ssword123");
      const loginJson = (await loginRes.json()) as LoginSuccessResponse;
      const { sessionId } = loginJson.data;

      const res = await sessionViaApi(sessionId);
      expect(res.status).toBe(200);

      const json = (await res.json()) as SessionSuccessResponse;
      expect(json.data.id).toBe("user");
      expect(json.data.username).toBe("testuser");
    });

    it("should reject when no session cookie is provided", async () => {
      const res = await sessionViaApi("");
      expect(res.status).toBe(401);

      const json = (await res.json()) as ErrorResponse;
      expect(json.error.errCode).toBe("NO_SESSION");
    });

    it("should reject invalid session ID", async () => {
      const res = await sessionViaApi("nonexistent-session-id");
      expect(res.status).toBe(401);

      const json = (await res.json()) as ErrorResponse;
      expect(json.error.errCode).toBe("SESSION_NOT_FOUND");
    });

    it("should reject expired session and clean it up", async () => {
      await insertUser("user", "testuser", "test@email.com", "P@ssword123");

      // Insert an already-expired session directly
      await db.insert(sessions).values({
        id: "expired-session",
        userId: "user",
        expiresAt: Date.now() - 1000, // Force expiration
      });

      const res = await sessionViaApi("expired-session");
      expect(res.status).toBe(401);

      const json = (await res.json()) as ErrorResponse;
      expect(json.error.errCode).toBe("SESSION_EXPIRED");

      const sessionRows = await db.select().from(sessions).where(eq(sessions.id, "expired-session"));
      expect(sessionRows.length).toBe(0);
    });
  });

  describe("cross-endpoint auth flows", () => {
    it("signup -> verify -> login -> session -> logout -> session invalid", async () => {
      const email = "test@email.com";
      const username = "testuser";
      const password = "P@ssword123";

      const { code, res: signupRes } = await signupViaApiAndGetCode(email, password, username);
      expect(signupRes.status).toBe(200);
      expect(code).toBeDefined();
      if (!code) return;

      const verifyRes = await verifyViaApi(email, code);
      expect(verifyRes.status).toBe(200);
      const verifyJson = (await verifyRes.json()) as VerifySuccessResponse;
      expect(verifyJson.data.userId).toBeDefined();

      const loginRes = await loginViaApi(username, password);
      expect(loginRes.status).toBe(200);
      const loginJson = (await loginRes.json()) as LoginSuccessResponse;
      const { sessionId } = loginJson.data;

      const sessionRes = await sessionViaApi(sessionId);
      expect(sessionRes.status).toBe(200);
      const sessionJson = (await sessionRes.json()) as SessionSuccessResponse;
      expect(sessionJson.data.username).toBe(username);

      const logoutRes = await logoutViaApi(sessionId);
      expect(logoutRes.status).toBe(200);

      const invalidSessionRes = await sessionViaApi(sessionId);
      expect(invalidSessionRes.status).toBe(401);
      const invalidJson = (await invalidSessionRes.json()) as ErrorResponse;
      expect(invalidJson.error.errCode).toBe("SESSION_NOT_FOUND");
    });

    it("re-signup should invalidate old pending code", async () => {
      const email = "test@email.com";

      // Signup
      const { code: oldCode, res: firstRes } = await signupViaApiAndGetCode(email, "OldPass123!", "olduser");
      expect(firstRes.status).toBe(200);
      expect(oldCode).toBeDefined();
      if (!oldCode) return;

      // Re-signup to overwrite previous pending verification
      const { code: newCode, res: secondRes } = await signupViaApiAndGetCode(email, "NewPass123!", "newuser");
      expect(secondRes.status).toBe(200);
      expect(newCode).toBeDefined();
      if (!newCode) return;

      const [countResult] = await db.select({ count: count() }).from(pendingVerifications).where(eq(pendingVerifications.email, "test@email.com"));
      expect(countResult?.count).toBe(1);

      const oldRes = await verifyViaApi(email, oldCode);
      expect(oldRes.status).toBe(400);
      const json = (await oldRes.json()) as ErrorResponse;
      expect(json.error.errCode).toBe("INVALID_CODE");

      const newRes = await verifyViaApi(email, newCode);
      expect(newRes.status).toBe(200);
      const [user] = await db.select().from(users).where(eq(users.email, email));
      expect(user?.username).toBe("newuser");
    });

    it("verified user should not be able to verify again with same email", async () => {
      const email = "test@email.com";

      const { code, res: signupRes } = await signupViaApiAndGetCode(email, "P@ssword123", "testuser");
      expect(signupRes.status).toBe(200);
      expect(code).toBeDefined();
      if (!code) return;

      // Verify once
      const res1 = await verifyViaApi(email, code);
      expect(res1.status).toBe(200);

      // Try to verify again but no pending verification
      const res2 = await verifyViaApi(email, code);
      expect(res2.status).toBe(400);
      const json = (await res2.json()) as ErrorResponse;
      expect(json.error.errCode).toBe("INVALID_CODE");
    });

    it("should return roles for valid session", async () => {
      // Full signup + verify flow to get proper roles
      const { code } = await signupViaApiAndGetCode("roles@email.com", "P@ssword123", "rolesuser");
      expect(code).toBeDefined();
      if (!code) return;

      const verifyRes = await verifyViaApi("roles@email.com", code);
      const verifyJson = (await verifyRes.json()) as VerifySuccessResponse;

      const sessionRes = await sessionViaApi(verifyJson.data.sessionId);
      expect(sessionRes.status).toBe(200);
      const sessionJson = (await sessionRes.json()) as SessionSuccessResponse;
      expect(sessionJson.data.roles).toBeInstanceOf(Array);
      expect(sessionJson.data.roles).toContain("user");
    });
  });

  describe("POST /api/auth/resend-code", () => {
    it("should resend code and reset attempts for an existing pending verification", async () => {
      await createPendingVerification("test@email.com", "testuser", "P@ssword123", "111111");

      // Fail once to bump attempts
      await verifyViaApi("test@email.com", "000000");

      const prevEmailCount = emailSendCalls.length;
      const res = await resendCodeViaApi("test@email.com");
      expect(res.status).toBe(200);

      // New email sent
      expect(emailSendCalls.length).toBe(prevEmailCount + 1);
      expect(emailSendCalls[prevEmailCount].to).toEqual(["test@email.com"]);

      // Attempts reset to 0
      const [pending] = await db.select().from(pendingVerifications).where(eq(pendingVerifications.email, "test@email.com"));
      expect(pending?.attempts).toBe(0);
    });

    it("should invalidate old code after resend", async () => {
      const email = "test@email.com";
      const { code: oldCode } = await signupViaApiAndGetCode(email, "P@ssword123", "testold");
      expect(oldCode).toBeDefined();
      if (!oldCode) return;

      // Resend
      const prevEmailCount = emailSendCalls.length;
      await resendCodeViaApi(email);
      const newCode = emailSendCalls[prevEmailCount]?.subject.split(" ")[0];
      expect(newCode).toBeDefined();
      if (!newCode) return;

      // Old code should fail
      const oldRes = await verifyViaApi(email, oldCode);
      expect(oldRes.status).toBe(400);

      // New code should succeed (re-signup to get fresh pending since attempt was used)
      // Need a fresh pending — resend again to reset attempts consumed above
      await resendCodeViaApi(email);
      const freshEmailCount = emailSendCalls.length;
      const freshCode = emailSendCalls[freshEmailCount - 1]?.subject.split(" ")[0];
      if (!freshCode) return;

      const newRes = await verifyViaApi(email, freshCode);
      expect(newRes.status).toBe(200);
    });

    it("should reject empty email", async () => {
      const res = await resendCodeViaApi("");
      expect(res.status).toBe(400);
      const json = (await res.json()) as ErrorResponse;
      expect(json.error.errCode).toBe("INVALID_EMAIL");
    });

    it("should reject when no pending verification exists", async () => {
      const res = await resendCodeViaApi("nobody@email.com");
      expect(res.status).toBe(400);
      const json = (await res.json()) as ErrorResponse;
      expect(json.error.errCode).toBe("NO_PENDING");
    });

    it("should allow fresh attempts after resend resets counter", async () => {
      const email = "test@email.com";
      await createPendingVerification(email, "testuser", "P@ssword123", "999999");

      // Use up 2 of 3 attempts
      await verifyViaApi(email, "000000");
      await verifyViaApi(email, "000000");

      const [beforeResend] = await db.select().from(pendingVerifications).where(eq(pendingVerifications.email, email));
      expect(beforeResend?.attempts).toBe(2);

      // Resend resets attempts
      await resendCodeViaApi(email);
      const [afterResend] = await db.select().from(pendingVerifications).where(eq(pendingVerifications.email, email));
      expect(afterResend?.attempts).toBe(0);

      // Should get 3 fresh attempts — use 2 more without lockout
      const _newCode = emailSendCalls[emailSendCalls.length - 1]?.subject.split(" ")[0];
      await verifyViaApi(email, "000000");
      await verifyViaApi(email, "000000");

      const [afterRetries] = await db.select().from(pendingVerifications).where(eq(pendingVerifications.email, email));
      expect(afterRetries?.attempts).toBe(2); // Still alive, not locked out

      // Third wrong attempt should lock out
      const lockoutRes = await verifyViaApi(email, "000000");
      expect(lockoutRes.status).toBe(400);
      const lockoutJson = (await lockoutRes.json()) as ErrorResponse;
      expect(lockoutJson.error.errCode).toBe("TOO_MANY_ATTEMPTS");
    });
  });

  describe("GET /api/auth/google", () => {
    it("should redirect to Google OAuth URL", async () => {
      const res = await app.request("/api/auth/google");
      expect(res.status).toBe(302);

      const location = res.headers.get("Location");
      expect(location).toContain("accounts.google.com");
      expect(location).toContain(mockOAuthState);
    });
  });

  describe("GET /api/auth/google/callback", () => {
    it("should reject missing code or state", async () => {
      const res = await app.request("/api/auth/google/callback?code=abc");
      expect(res.status).toBe(400);
      const json = (await res.json()) as ErrorResponse;
      expect(json.error.errCode).toBe("INVALID_CALLBACK");

      const res2 = await app.request("/api/auth/google/callback?state=abc");
      expect(res2.status).toBe(400);
      const json2 = (await res2.json()) as ErrorResponse;
      expect(json2.error.errCode).toBe("INVALID_CALLBACK");
    });

    it("should reject invalid/unknown state", async () => {
      const res = await app.request("/api/auth/google/callback?code=abc&state=unknown-state");
      expect(res.status).toBe(400);
      const json = (await res.json()) as ErrorResponse;
      expect(json.error.errCode).toBe("INVALID_STATE");
    });

    it("should reject unverified Google email", async () => {
      // First hit /auth/google to create the state entry
      await app.request("/api/auth/google");

      mockGoogleUserResponse = {
        ok: true,
        json: async () => ({
          id: "unverified-id",
          email: "unverified@gmail.com",
          verified_email: false,
          name: "Unverified User",
        }),
      };

      const res = await app.request(`/api/auth/google/callback?code=authcode&state=${mockOAuthState}`);
      expect(res.status).toBe(400);
      const json = (await res.json()) as ErrorResponse;
      expect(json.error.errCode).toBe("UNVERIFIED_EMAIL");

      // Reset mock
      mockGoogleUserResponse = { ok: true, json: async () => ({ ...defaultGoogleUser }) };
    });

    it("should create new user, session, and redirect for first-time OAuth login", async () => {
      // Hit /auth/google to register the state
      await app.request("/api/auth/google");

      const res = await app.request(`/api/auth/google/callback?code=authcode&state=${mockOAuthState}`);
      expect(res.status).toBe(302);
      expect(res.headers.get("Location")).toBe("/");

      // User created
      const [user] = await db.select().from(users).where(eq(users.email, "googleuser@gmail.com"));
      expect(user).toBeDefined();
      expect(user?.firstName).toBe("Google");
      expect(user?.lastName).toBe("User");
      expect(user?.password).toBeNull();

      // OAuth account linked
      const [oauth] = await db
        .select()
        .from(oauthAccounts)
        .where(and(eq(oauthAccounts.provider, "google"), eq(oauthAccounts.providerUserId, "google-id-123")));
      expect(oauth).toBeDefined();
      expect(oauth?.userId).toBe(user?.id);

      // Professional info and role created
      if (!user) return;
      const [profInfo] = await db.select().from(professionalInfo).where(eq(professionalInfo.userId, user.id));
      expect(profInfo).toBeDefined();

      const roles = await db.select({ role: userRoleRelationship.role }).from(userRoleRelationship).where(eq(userRoleRelationship.userId, user.id));
      expect(roles.map((r) => r.role)).toContain("user");

      // Session created (check cookie)
      const setCookie = res.headers.get("Set-Cookie");
      expect(setCookie).toContain("sessionId=");
    });

    it("should link OAuth to existing email user and create session", async () => {
      // Pre-create user with password (email signup)
      await insertUser("existing-user", "existinguser", "googleuser@gmail.com", "P@ssword123");

      await app.request("/api/auth/google");
      const res = await app.request(`/api/auth/google/callback?code=authcode&state=${mockOAuthState}`);
      expect(res.status).toBe(302);

      // OAuth account linked to existing user
      const [oauth] = await db
        .select()
        .from(oauthAccounts)
        .where(and(eq(oauthAccounts.provider, "google"), eq(oauthAccounts.providerUserId, "google-id-123")));
      expect(oauth).toBeDefined();
      expect(oauth?.userId).toBe("existing-user");

      // Session created
      const setCookie = res.headers.get("Set-Cookie");
      expect(setCookie).toContain("sessionId=");
    });

    it("should reuse existing OAuth account and create session on repeat login", async () => {
      // First OAuth login
      await app.request("/api/auth/google");
      await app.request(`/api/auth/google/callback?code=authcode&state=${mockOAuthState}`);

      // Count users and oauth accounts
      const [userCount] = await db.select({ count: count() }).from(users).where(eq(users.email, "googleuser@gmail.com"));
      expect(userCount?.count).toBe(1);

      // Second OAuth login
      await app.request("/api/auth/google");
      const res = await app.request(`/api/auth/google/callback?code=authcode&state=${mockOAuthState}`);
      expect(res.status).toBe(302);

      // Still only one user
      const [userCount2] = await db.select({ count: count() }).from(users).where(eq(users.email, "googleuser@gmail.com"));
      expect(userCount2?.count).toBe(1);

      // Session created
      const setCookie = res.headers.get("Set-Cookie");
      expect(setCookie).toContain("sessionId=");
    });
  });
});
