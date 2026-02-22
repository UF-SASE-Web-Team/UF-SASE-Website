import { db } from "@/server/db/db";
import { createErrorResponse, createSuccessResponse } from "@/shared/utils";
import * as Schema from "@db/tables";
import { like } from "drizzle-orm";
import { Hono } from "hono";

const boardRoutes = new Hono();

boardRoutes.get("/board/:year", async (c) => {
  const year: number = Number(c.req.param("year"));
  if (isNaN(year) || year <= 2000 || year > 5000) {
    return createErrorResponse(c, "INVALID_YEAR", "Invalid year", 400);
  }

  const strYear: string = year.toString();

  const members = await db
    .select()
    .from(Schema.boardMemberHistory)
    .where(like(Schema.boardMemberHistory.uploadedAt, `${strYear}%`));

  const data = [];

  for (const member of members) {
    data.push({
      name: member.name,
      role: member.role,
      yearMajor: member.description,
      bio: member.bio,
      imageUrl: member.url,
    });
  }

  return createSuccessResponse(c, data, "Board retrieved successfully");
});

export default boardRoutes;
