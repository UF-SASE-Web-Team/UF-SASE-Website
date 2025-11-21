import { createEnv } from "@t3-oss/env-core";
import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

// This parses the enviorment variables according to a zod schema and provides them to the server
export const SERVER_ENV = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    DATABASE_AUTH_TOKEN: z.string().optional(),
    RESEND_API_KEY: z.string(),
    GOOGLE_CREDENTIALS: z.preprocess(
      (val) => {
        if (typeof val === "string") {
          return JSON.parse(val);
        }
        return val;
      },
      z.object({
        type: z.literal("service_account"),
        project_id: z.string(),
        private_key_id: z.string(),
        private_key: z.string(),
        client_email: z.string().email(),
        client_id: z.string(),
        auth_uri: z.string().url(),
        token_uri: z.string().url(),
        auth_provider_x509_cert_url: z.string().url(),
        client_x509_cert_url: z.string().url(),
        universe_domain: z.string().optional(),
      }),
    ),
    GOOGLE_OAUTH_CLIENT_ID: z.string(),
    GOOGLE_OAUTH_CLIENT_SECRET: z.string(),
    GOOGLE_OAUTH_REDIRECT_URI: z.string().url(),
  },
  runtimeEnv: process.env,
});
