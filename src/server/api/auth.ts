import { db } from "@/server/db/db";
import { VerificationTemplate } from "@/server/email/verification-template";
import { requireSession } from "@/server/middleware/auth";
import { createErrorResponse, createSuccessResponse, emailRegex, passwordRegex } from "@/shared/utils";
import { oauthAccounts, pendingVerifications, professionalInfo, sessions, userRoleRelationship, users } from "@db/tables";
import { SERVER_ENV } from "@server/env";
import { generateCodeVerifier, generateState, Google } from "arctic";
import bcrypt from "bcryptjs";
import { and, eq } from "drizzle-orm";
import { Hono } from "hono";
import { getCookie } from "hono/cookie";
import { generateIdFromEntropySize } from "lucia";
import { Resend } from "resend";

const { compare, hash } = bcrypt;

const authRoutes = new Hono();

const resend = new Resend(SERVER_ENV.RESEND_API_KEY);
const google = new Google(SERVER_ENV.GOOGLE_OAUTH_CLIENT_ID, SERVER_ENV.GOOGLE_OAUTH_CLIENT_SECRET, SERVER_ENV.GOOGLE_OAUTH_REDIRECT_URI);

authRoutes.post("/auth/signup", async (c) => {
  const { email, password, username } = await c.req.json();

  //validate username
  if (!username || typeof username !== "string") {
    return createErrorResponse(c, "INVALID_USERNAME", "Invalid username!", 400);
  }
  //validate password
  if (!password || typeof password !== "string" || !passwordRegex.test(password)) {
    return createErrorResponse(c, "INVALID_PASSWORD", "Invalid password from regex", 400);
  }
  //validate email
  if (!email || typeof email !== "string" || !emailRegex.test(email)) {
    return createErrorResponse(c, "INVALID_EMAIL", "Invalid email!", 400);
  }

  try {
    // Check if user already exists
    const [existingEmail, existingUsername] = await Promise.all([
      db.select().from(users).where(eq(users.email, email)).get(),
      db.select().from(users).where(eq(users.username, username)).get(),
    ]);

    if (existingEmail) {
      return createErrorResponse(c, "EMAIL_TAKEN", "Email already registered", 400);
    }

    if (existingUsername) {
      return createErrorResponse(c, "USERNAME_TAKEN", "Username already taken", 400);
    }

    // Generate and store verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedCode = await hash(verificationCode, 10);
    const hashedPassword = await hash(password, 10);

    // Store pending verification
    await db
      .insert(pendingVerifications)
      .values({
        email,
        code: hashedCode,
        userData: JSON.stringify({ username, password: hashedPassword, email }),
        expiresAt: Date.now() + 10 * 60 * 1000,
      })
      .onConflictDoUpdate({
        target: pendingVerifications.email,
        set: {
          code: hashedCode,
          userData: JSON.stringify({ username, password: hashedPassword, email }),
          expiresAt: Date.now() + 10 * 60 * 1000,
          attempts: 0,
        },
      });

    // Send verification email
    await resend.emails.send({
      from: "UF SASE <alerts@email.ufsase.com>",
      to: [email],
      subject: `${verificationCode} is your verification code`,
      react: VerificationTemplate({ code: verificationCode }),
    });

    return createSuccessResponse(c, { message: "Verification code sent" }, "Please check your email");
  } catch (error) {
    console.error(error);
    return createErrorResponse(c, "SIGNUP_ERROR", "Error during signup", 500);
  }
});

authRoutes.post("/auth/resend-code", async (c) => {
  try {
    const { email } = await c.req.json();
    if (!email || typeof email !== "string" || !emailRegex.test(email)) {
      return createErrorResponse(c, "INVALID_EMAIL", "Invalid email", 400);
    }
    const pending = await db.select().from(pendingVerifications).where(eq(pendingVerifications.email, email)).get();
    if (!pending) {
      return createErrorResponse(c, "NO_PENDING", "No verification pending", 400);
    }

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedCode = await hash(verificationCode, 10);

    await db
      .update(pendingVerifications)
      .set({
        code: hashedCode,
        expiresAt: Date.now() + 10 * 60 * 1000,
        attempts: 0,
      })
      .where(eq(pendingVerifications.email, email));

    await resend.emails.send({
      from: "UF SASE <alerts@email.ufsase.com>",
      to: [email],
      subject: `${verificationCode} is your verification code`,
      react: VerificationTemplate({ code: verificationCode }),
    });

    return createSuccessResponse(c, { message: "Verification code resent" }, "Check your email");
  } catch (err) {
    console.error("Resend error:", err);
    return createErrorResponse(c, "RESEND_ERROR", "Failed to resend code", 500);
  }
});

authRoutes.post("/auth/verify-code", async (c) => {
  const { code, email } = await c.req.json();

  if (!code || typeof code !== "string" || !email || typeof email !== "string") {
    return createErrorResponse(c, "INVALID_INPUT", "Invalid verification input", 400);
  }
  const pending = await db.select().from(pendingVerifications).where(eq(pendingVerifications.email, email)).get();

  if (!pending) {
    return createErrorResponse(c, "INVALID_CODE", "No verification pending", 400);
  }

  if (pending.expiresAt < Date.now()) {
    await db.delete(pendingVerifications).where(eq(pendingVerifications.email, email));
    return createErrorResponse(c, "CODE_EXPIRED", "Verification code expired", 400);
  }

  // Verify the code
  const isValidCode = await compare(code, pending.code);
  if (!isValidCode) {
    const newAttempts = pending.attempts + 1;
    await db.update(pendingVerifications).set({ attempts: newAttempts }).where(eq(pendingVerifications.email, email));

    if (newAttempts >= 3) {
      await db.delete(pendingVerifications).where(eq(pendingVerifications.email, email));
      return createErrorResponse(c, "TOO_MANY_ATTEMPTS", "Too many attempts, please register again", 400);
    }
    return createErrorResponse(c, "INVALID_CODE", "Invalid verification code", 400);
  }

  const userData = JSON.parse(pending.userData) as {
    username: string;
    password: string;
    email: string;
  };

  // Check if username or email was claimed by another user while pending
  const [existingEmail, existingUsername] = await Promise.all([
    db.select().from(users).where(eq(users.email, userData.email)).get(),
    db.select().from(users).where(eq(users.username, userData.username)).get(),
  ]);

  if (existingEmail) {
    await db.delete(pendingVerifications).where(eq(pendingVerifications.email, email));
    return createErrorResponse(c, "EMAIL_TAKEN", "Email was already registered by another user", 400);
  }

  if (existingUsername) {
    await db.delete(pendingVerifications).where(eq(pendingVerifications.email, email));
    return createErrorResponse(c, "USERNAME_TAKEN", "Username was already taken by another user", 400);
  }

  try {
    const userId = generateIdFromEntropySize(16);

    // Create verified user
    await db.insert(users).values({
      id: userId,
      username: userData.username,
      password: userData.password,
      email: userData.email,
    });

    // Set up additional user data
    await Promise.all([db.insert(professionalInfo).values({ userId }), db.insert(userRoleRelationship).values({ userId, role: "user" })]);

    await db.delete(pendingVerifications).where(eq(pendingVerifications.email, email));

    // Create session and log user in automatically
    const sessionId = generateIdFromEntropySize(16);
    await createSession(sessionId, userId);
    c.header("Set-Cookie", `sessionId=${sessionId}; Path=/; HttpOnly; Secure; Max-Age=3600; SameSite=Strict`);

    return createSuccessResponse(c, { userId, sessionId }, "Account created and logged in");
  } catch (error) {
    console.error("Error completing verification:", error);
    return createErrorResponse(c, "VERIFICATION_ERROR", "Error completing signup", 500);
  }
});

// Login route
authRoutes.post("/auth/login", async (c) => {
  const formData = await c.req.json();
  const username = formData["username"];
  const password = formData["password"];

  if (!username || typeof username !== "string" || username.trim() === "") {
    return createErrorResponse(c, "INVALID_USERNAME", "Invalid username!", 401);
  }

  if (!password || typeof password !== "string") {
    return createErrorResponse(c, "INVALID_PASSWORD", "Invalid password from login", 401);
  }

  let user;
  if (emailRegex.test(username)) {
    user = await db.select().from(users).where(eq(users.email, username));
  } else {
    user = await db.select().from(users).where(eq(users.username, username));
  }

  if (user.length === 0) {
    return createErrorResponse(c, "INVALID_CREDENTIALS", "Invalid username or password!", 401);
  }

  if (!user[0].password) {
    return createErrorResponse(c, "NO_PASSWORD", "This account uses a social login (e.g., Google)", 401);
  }
  const validPassword = await compare(password, user[0].password);
  if (!validPassword) {
    return createErrorResponse(c, "INVALID_PASSWORD", "Incorrect password!", 401);
  } else {
    const session_id = generateIdFromEntropySize(16);
    await createSession(session_id, user[0].id);
    c.header("Set-Cookie", `sessionId=${session_id}; Path=/; HttpOnly; Secure; Max-Age=3600; SameSite=Strict`);
    return createSuccessResponse(c, { sessionId: session_id }, "Successfully logged in");
  }
});

// Logout route
authRoutes.post("/auth/logout", async (c) => {
  const sessionId = getCookie(c, "sessionId");

  if (!sessionId) {
    return createErrorResponse(c, "NO_SESSION", "No active session found", 401);
  }

  try {
    await db.delete(sessions).where(eq(sessions.id, sessionId));

    return createSuccessResponse(c, null, "Successfully logged out");
  } catch (error) {
    console.error(error);
    return createErrorResponse(c, "LOGOUT_ERROR", "Error logging out", 500);
  }
});

// used for validating sessions
authRoutes.get("/auth/session", requireSession, async (c) => {
  try {
    const session = c.get("session");
    const user = await db.select({ id: users.id, username: users.username }).from(users).where(eq(users.id, session.userId)).get();

    if (!user) {
      return createErrorResponse(c, "USER_NOT_FOUND", "User not found", 401);
    }

    const roles = await db
      .select({ role: userRoleRelationship.role })
      .from(userRoleRelationship)
      .where(eq(userRoleRelationship.userId, session.userId))
      .all()
      .then((rows) => rows.map((r) => r.role));

    return createSuccessResponse(c, { id: user.id, username: user.username, roles }, "Session valid");
  } catch (error) {
    console.error(error);
    return createErrorResponse(c, "SESSION_CHECK_ERROR", "Error checking session", 500);
  }
});

async function createSession(sessionID: string, userID: string) {
  try {
    await db.insert(sessions).values({
      id: sessionID,
      userId: userID, //Session expires in 1 hour from when it is created
      expiresAt: Date.now() + 3600 * 1000,
    });
  } catch (error) {
    console.error(error);
  }
}

const oauthStates = new Map<string, { codeVerifier: string; expiresAt: number }>();

// Clean up expired states every 10 minutes
setInterval(
  () => {
    const now = Date.now();
    for (const [state, data] of oauthStates.entries()) {
      if (data.expiresAt < now) {
        oauthStates.delete(state);
      }
    }
  },
  10 * 60 * 1000,
);

authRoutes.get("/auth/google", async (c) => {
  try {
    const state = generateState();
    const codeVerifier = generateCodeVerifier();

    oauthStates.set(state, {
      codeVerifier,
      expiresAt: Date.now() + 10 * 60 * 1000,
    });

    const url = await google.createAuthorizationURL(state, codeVerifier, ["profile", "email"]);

    return c.redirect(url.toString());
  } catch (error) {
    console.error("Error initiating Google OAuth:", error);
    return createErrorResponse(c, "OAUTH_INIT_ERROR", "Failed to initiate Google login", 500);
  }
});

authRoutes.get("/auth/google/callback", async (c) => {
  const url = new URL(c.req.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  if (!code || !state) {
    return createErrorResponse(c, "INVALID_CALLBACK", "Missing code or state parameter", 400);
  }

  const storedData = oauthStates.get(state);
  if (!storedData) {
    return createErrorResponse(c, "INVALID_STATE", "Invalid or expired state", 400);
  }

  oauthStates.delete(state);

  if (storedData.expiresAt < Date.now()) {
    return createErrorResponse(c, "EXPIRED_STATE", "State has expired", 400);
  }

  try {
    const tokens = await google.validateAuthorizationCode(code, storedData.codeVerifier);
    const accessToken = tokens.accessToken();

    const googleUserResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!googleUserResponse.ok) {
      return createErrorResponse(c, "GOOGLE_API_ERROR", "Failed to fetch user info from Google", 500);
    }

    const googleUser = (await googleUserResponse.json()) as {
      id: string;
      email: string;
      verified_email: boolean;
      name: string;
      given_name?: string;
      family_name?: string;
      picture?: string;
    };

    if (!googleUser.verified_email) {
      return createErrorResponse(c, "UNVERIFIED_EMAIL", "Please verify your Google email first", 400);
    }

    const existingOAuthAccount = await db
      .select()
      .from(oauthAccounts)
      .where(and(eq(oauthAccounts.provider, "google"), eq(oauthAccounts.providerUserId, googleUser.id)))
      .get();

    let user;

    if (existingOAuthAccount) {
      user = await db.select().from(users).where(eq(users.id, existingOAuthAccount.userId)).get();
    } else {
      const existingEmailUser = await db.select().from(users).where(eq(users.email, googleUser.email)).get();

      if (existingEmailUser) {
        await db.insert(oauthAccounts).values({
          userId: existingEmailUser.id,
          provider: "google",
          providerUserId: googleUser.id,
          email: googleUser.email,
        });

        await db
          .update(users)
          .set({
            firstName: existingEmailUser.firstName || googleUser.given_name || "",
            lastName: existingEmailUser.lastName || googleUser.family_name || "",
          })
          .where(eq(users.id, existingEmailUser.id));

        user = existingEmailUser;
      } else {
        const userId = generateIdFromEntropySize(16);
        // Generate a temporary username for OAuth users
        const username = googleUser.email;
        await db.insert(users).values({
          id: userId,
          username,
          password: null,
          email: googleUser.email,
          firstName: googleUser.given_name || "",
          lastName: googleUser.family_name || "",
        });

        await db.insert(oauthAccounts).values({
          userId,
          provider: "google",
          providerUserId: googleUser.id,
          email: googleUser.email,
        });

        await db.insert(professionalInfo).values({ userId });
        await db.insert(userRoleRelationship).values({
          userId,
          role: "user",
        });

        user = await db.select().from(users).where(eq(users.id, userId)).get();
      }
    }

    if (!user) {
      return createErrorResponse(c, "USER_CREATION_ERROR", "Failed to create or find user", 500);
    }

    const sessionId = generateIdFromEntropySize(16);
    await createSession(sessionId, user.id);

    c.header("Set-Cookie", `sessionId=${sessionId}; Path=/; HttpOnly; Secure; Max-Age=3600; SameSite=Strict`);

    return c.redirect("/");
  } catch (error) {
    console.error("Error in Google OAuth callback:", error);
    return createErrorResponse(c, "OAUTH_CALLBACK_ERROR", "Failed to complete Google login", 500);
  }
});

export default authRoutes;
