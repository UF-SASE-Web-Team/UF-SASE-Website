import { db } from "@/server/db/db";
import { sessions } from "@db/tables";
import { eq } from "drizzle-orm";
import { createUploadthing, UploadThingError } from "uploadthing/server";
import type { FileRouter } from "uploadthing/server";

const f = createUploadthing();

async function auth(req: Request) {
  const cookieHeader = req.headers.get("cookie");
  if (!cookieHeader) return null;

  const match = cookieHeader.match(/sessionId=([^;]+)/);
  if (!match) return null;
  
  const sessionId = match[1];
  const session = await db.select().from(sessions).where(eq(sessions.id, sessionId)).get();
  
  if (session && session.expiresAt > Date.now()) {
    return { id: session.userId };
  }
  return null;
}

export const uploadRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "16MB",
      maxFileCount: 100,
    },
  })
    .middleware(async ({ req }) => {
      const user = await auth(req);
      if (!user) throw new UploadThingError("Unauthorized");
      return { userId: user.id };
    })
    .onUploadComplete(async ({ file, metadata }) => {
      console.log("Upload successful for userId: ", metadata.userId);
      console.log("New File URL: ", file.ufsUrl);
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type UploadRouter = typeof uploadRouter;
