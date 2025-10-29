import { SERVER_ENV } from "@server/env";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/server/db/tables.ts",
  dialect: "turso",
  out: "./drizzle",
  dbCredentials: {
    url: SERVER_ENV.DATABASE_URL,
    authToken: SERVER_ENV.DATABASE_AUTH_TOKEN,
  },
  verbose: true,
  strict: true,
});

// Local config
// export default defineConfig({
//   schema: "./src/server/db/tables.ts",
//   out: "./drizzle",
//   dialect: "sqlite",
//   dbCredentials: {
//     url: "file:local.db",
//   },
// });
