/*
 * Tests helper for creating in-memory databases and applying migrations
 */

import { join } from "path";
import { createClient, type Client } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { migrate } from "drizzle-orm/libsql/migrator";

async function applySchema(client: Client, db: ReturnType<typeof drizzle>) {
  await migrate(db, { migrationsFolder: join(process.cwd(), "drizzle") });
  await client.execute(`INSERT OR IGNORE INTO roles (id, name) VALUES ('default-role', 'user')`);
}

export const createTestDatabase = async () => {
  const client = createClient({ url: ":memory:" });
  const db = drizzle(client);
  await applySchema(client, db);
  return { client, db };
};

export const resetTestDatabase = async (client: Client) => {
  client.close();
  const newClient = createClient({ url: ":memory:" });
  const newDb = drizzle(newClient);
  await applySchema(newClient, newDb);
  return { client: newClient, db: newDb };
};
