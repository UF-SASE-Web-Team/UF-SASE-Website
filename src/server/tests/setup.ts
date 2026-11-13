import { mock } from "bun:test";

// Preloaded before every test file (see bunfig.toml) so no test depends on real
// environment variables or on another test file having mocked them first.
mock.module("@server/env", () => ({
  SERVER_ENV: {
    DATABASE_URL: ":memory:",
    DATABASE_AUTH_TOKEN: "",
    RESEND_API_KEY: "re_test_key",
    GOOGLE_OAUTH_CLIENT_ID: "test-client-id",
    GOOGLE_OAUTH_CLIENT_SECRET: "test-secret",
    GOOGLE_OAUTH_REDIRECT_URI: "http://localhost/callback",
  },
}));
