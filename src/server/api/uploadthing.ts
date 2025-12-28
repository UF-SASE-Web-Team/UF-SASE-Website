import { createUploadthing, UploadThingError } from "uploadthing/server";
import type { FileRouter } from "uploadthing/server";

const f = createUploadthing();

async function auth(req: Request) {
  const key = req.headers.get("x-uploadthing-key");
  if (key === process.env.UPLOADTHING_KEY) {
    return { id: "Admin" };
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
