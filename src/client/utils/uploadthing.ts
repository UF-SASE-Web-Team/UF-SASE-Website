import { 
  generateUploadButton, 
  generateUploadDropzone,
  generateReactHelpers
} from "@uploadthing/react";
import type { UploadRouter } from "@/server/api/uploadthing";

export const UploadButton = generateUploadButton<UploadRouter>();
export const UploadDropzone = generateUploadDropzone<UploadRouter>();

export const { useUploadThing } = generateReactHelpers<UploadRouter>();