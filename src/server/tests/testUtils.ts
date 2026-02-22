import { join } from "path";
import { pendingVerifications, userRoleRelationship, users } from "@/server/db/tables";
import { createClient, type Client } from "@libsql/client";
import bcrypt from "bcryptjs";
import { drizzle } from "drizzle-orm/libsql";
import { migrate } from "drizzle-orm/libsql/migrator";

export type TestDB = ReturnType<typeof drizzle>;

// Insert a pending verification into the DB strictly for testing
export const insertTestPendingVerification = async (db: TestDB, email: string, username: string, password: string, code: string) => {
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

// Insert a user into the DB strictly for testing (bypasses auth endpoints)
export const insertTestUser = async (db: TestDB, id: string, username: string, email: string, password?: string, role = "user") => {
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

  if (role) {
    await db.insert(userRoleRelationship).values({ userId: id, role });
  }
};

// --- Database Setup Helpers ---

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
