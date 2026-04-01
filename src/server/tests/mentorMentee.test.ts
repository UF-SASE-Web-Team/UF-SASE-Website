import { mentorMenteeRelationship, roles } from "@/server/db/tables";
import { createTestDatabase, insertTestUser, resetTestDatabase } from "@/server/tests/testUtils";
import type { Client } from "@libsql/client";
import type { SuccessResponse } from "@schema/responseSchema";
import { afterAll, beforeAll, beforeEach, describe, expect, it, mock } from "bun:test";
import { Hono } from "hono";

let client: Client;
let db: Awaited<ReturnType<typeof createTestDatabase>>["db"];
let app: Hono;

const seedAdminAndMembers = async () => {
  await db.insert(roles).values({ name: "admin" });

  const adminId = "admin-user";
  const mentorId = "mentor-user";
  const menteeId = "mentee-user";

  await insertTestUser(db, adminId, "adminUser", "admin@example.com", "P@ssword123", "admin");
  await insertTestUser(db, mentorId, "mentorUser", "mentor@example.com");
  await insertTestUser(db, menteeId, "menteeUser", "mentee@example.com");

  return { adminId, mentorId, menteeId };
};

describe("Mentor/Mentee API", () => {
  // NOTICE: if admin-only middleware exists for these routes, should need to update tests to authenticate as admin
  beforeAll(async () => {
    ({ client, db } = await createTestDatabase());
    mock.module("@/server/db/db", () => ({ db }));
    const { default: mentorMenteeRoutes } = await import("@/server/api/mentorMentee");
    app = new Hono().route("/", mentorMenteeRoutes);
  });

  beforeEach(async () => {
    ({ client, db } = await resetTestDatabase(client));
    mock.module("@/server/db/db", () => ({ db }));
  });

  afterAll(() => {
    client.close();
  });

  it("creates a mentor/mentee relationship", async () => {
    const { menteeId, mentorId } = await seedAdminAndMembers();

    const res = await app.request("/mentorMentee/single", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mentorId, menteeId }),
    });

    expect(res.status).toBe(200);
    const json = (await res.json()) as SuccessResponse;
    expect(json.message).toBe("Mentor/Mentee pair inserted successfully");

    const relationships = await db.select().from(mentorMenteeRelationship);
    expect(relationships).toHaveLength(1);
    expect(relationships[0]).toMatchObject({ mentorId, menteeId });
  });

  it("lists mentor/mentee relationships after members are paired", async () => {
    const { menteeId, mentorId } = await seedAdminAndMembers();

    await app.request("/mentorMentee/single", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mentorId, menteeId }),
    });

    const res = await app.request("/mentorMentee/all");
    expect(res.status).toBe(200);

    const json = (await res.json()) as SuccessResponse;
    const relationships = json.data as Array<{ mentorId: string; menteeId: string }>;
    expect(relationships).toHaveLength(1);
    expect(relationships[0]).toMatchObject({ mentorId, menteeId });
  });
});
