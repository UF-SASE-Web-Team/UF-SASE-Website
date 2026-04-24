// import * as Schema from "./db/schema";
// import { eq } from "drizzle-orm";
import infoRoutes from "@/server/api/professionalInfo";
import { uploadRouter } from "@/server/api/uploadthing";
import alumniRoutes from "@api/alumniBank";
import authRoutes from "@api/auth";
import blogRoutes from "@api/blogs";
import contactRoutes from "@api/contact";
import emailRoutes from "@api/email";
import eventRoutes from "@api/events";
import mentorMenteeRoutes from "@api/mentorMentee";
import boardRoutes from "@api/pastBoard";
import profileRoutes from "@api/profile";
import roleRoutes from "@api/roles";
import saseRoutes from "@api/saseInfo";
import sheetsRoutes from "@api/sheets";
import tagRoutes from "@api/tags";
import userRoutes from "@api/user";
import type { MiddlewareHandler } from "hono";
import { Hono } from "hono";
import { createRouteHandler } from "uploadthing/server";
import { eventHandler, toWebRequest } from "vinxi/http";

// This is the (actual) entry point, which we just redirect to the Hono server (https://h3.unjs.io/guide/event-handler)
export default eventHandler(async (event) => {
  return app.fetch(toWebRequest(event));
});

// Hono! https://hono.dev/
// This is the entry point for our server which lives on the /api path
const app = new Hono();

const logger: MiddlewareHandler = async (c, next) => {
  console.log(`${c.req.method} ${c.req.url}`);
  await next();
};
app.use("*", logger);

const CAL_ID = "37ac4d5540136c7524b9a64daa11762754c52afa770f3f12e1ac6edca7cb59a3@group.calendar.google.com";
const ICS_URL = `https://calendar.google.com/calendar/ical/${encodeURIComponent(CAL_ID)}/public/basic.ics`;

const uploadthingHandler = createRouteHandler({
  router: uploadRouter,
  config: {},
});

app.all("/api/uploadthing/*", (c) => uploadthingHandler(c.req.raw));
app.all("/api/uploadthing", (c) => uploadthingHandler(c.req.raw));

app.get("/api/calendar/ics", async (_c) => {
  try {
    const r = await fetch(ICS_URL, {
      headers: { "User-Agent": "UF-SASE-Website/1.0 (+https://uf-sase.com)" },
      cache: "no-store",
    });

    if (!r.ok) return new Response("Upstream error", { status: r.status });

    const text = await r.text();

    return new Response(text, {
      status: 200,
      headers: {
        "Content-Type": "text/calendar; charset=utf-8",
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=86400",
      },
    });
  } catch {
    return new Response("Proxy failed", { status: 500 });
  }
});

app.routes.forEach((route) => {
  console.log(`Method: ${route.method}, Path: ${route.path}`);
});

app
  .get("/", (c) => c.text("TEST"))
  .route("/api", userRoutes)
  .route("/api", blogRoutes)
  .route("/api", infoRoutes)
  .route("/api", tagRoutes)
  .route("/api", saseRoutes)
  .route("/api", authRoutes)
  .route("/api", emailRoutes)
  .route("/api", profileRoutes)
  .route("/api", contactRoutes)
  .route("/api", eventRoutes)
  .route("/api", alumniRoutes)
  .route("/api", sheetsRoutes)
  .route("/api", roleRoutes)
  .route("/api", mentorMenteeRoutes)
  .route("/api", boardRoutes);
