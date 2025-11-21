import { db } from "@/server/db/db";
import * as Schema from "@db/tables";
import { like } from "drizzle-orm";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

const boardRoutes = new Hono();

boardRoutes.get("/board/:year", async (c) => {
  const year: number = Number(c.req.param("year"));
  if (isNaN(year) || year <= 2000 || year > 5000) {
    throw new HTTPException(400, { message: "Invalid year" });
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

  return c.json(data);
});

export default boardRoutes;
