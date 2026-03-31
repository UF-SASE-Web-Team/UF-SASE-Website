import { events as eventsTable } from "@/server/db/tables";
import { createTestDatabase, resetTestDatabase } from "@/server/tests/testUtils";
import type { Client } from "@libsql/client";
import type { ErrorResponse, SuccessResponse } from "@schema/responseSchema";
import { afterAll, beforeAll, beforeEach, describe, expect, it, mock } from "bun:test";
import { Hono } from "hono";

let client: Client;
let db: Awaited<ReturnType<typeof createTestDatabase>>["db"];
let app: Hono;

type EventRow = typeof eventsTable.$inferSelect;

const toDate = (dateStr: string) => new Date(`${dateStr}T00:00:00.000Z`);

const insertEvent = async (id: string, name: string, dateStr: string) => {
  await db.insert(eventsTable).values({
    id,
    name,
    description: "",
    location: "Reitz Union",
    startTime: toDate(dateStr),
    endTime: toDate(dateStr),
  });
};

describe("Events API", () => {
  beforeAll(async () => {
    ({ client, db } = await createTestDatabase());
    mock.module("@/server/db/db", () => ({ db }));
    const { default: eventsRoutes } = await import("@/server/api/events");
    app = new Hono().route("/", eventsRoutes);
  });

  beforeEach(async () => {
    ({ client, db } = await resetTestDatabase(client));
    mock.module("@/server/db/db", () => ({ db }));
  });

  afterAll(() => {
    client.close();
  });

  describe("GET /events with date filters", () => {
    it("returns events inside the range and excludes events outside", async () => {
      await insertEvent("event-a", "Event A", "2024-01-01");
      await insertEvent("event-b", "Event B", "2024-06-15");
      await insertEvent("event-c", "Event C", "2024-12-31");

      const res = await app.request("/events?start_date=2024-01-01&end_date=2024-06-30");
      expect(res.status).toBe(200);

      const json = (await res.json()) as SuccessResponse;
      const events = json.data as Array<EventRow>;
      const eventNames = events.map((event) => event.name);

      expect(eventNames).toContain("Event A");
      expect(eventNames).toContain("Event B");
      expect(eventNames).not.toContain("Event C");
    });

    it("returns all events when no date filters are provided", async () => {
      await insertEvent("event-a", "Event A", "2024-01-01");
      await insertEvent("event-b", "Event B", "2024-06-15");

      const res = await app.request("/events");
      expect(res.status).toBe(200);

      const json = (await res.json()) as SuccessResponse;
      const events = json.data as Array<EventRow>;
      const eventNames = events.map((event) => event.name);

      expect(eventNames).toContain("Event A");
      expect(eventNames).toContain("Event B");
    });

    it("rejects invalid date formats", async () => {
      const res = await app.request("/events?start_date=not-a-date&end_date=2024-06-30");
      expect(res.status).toBe(400);

      const json = (await res.json()) as ErrorResponse;
      expect(json.error.errCode).toBe("DATE_FORMAT_INVALID");
    });
  });
});
