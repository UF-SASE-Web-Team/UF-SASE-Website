# Alumni Bank Update Pipeline (Run From Local Clone)

This guide explains how to run the Alumni Bank update pipeline from your local clone of this repo.

Important: running from local does **not** mean you must use a local SQLite DB. You can point `DATABASE_URL` to local or production, and the pipeline will update whichever database your env points to.

## What The Pipeline Does

The refresh pipeline performs these steps:

1. Validates pipeline config (`LINKEDIN_MCP_URL` must be a valid URL).
2. Syncs newly graduated users into `alumni_bank`.
3. Selects refresh targets from `alumni_bank` where:

- LinkedIn URL is present
- Graduation month/year is before current month/year

4. Calls LinkedIn MCP for each target.
5. Updates `currentRole`, `currentCompany`, and `pastCompanies`.

## Recommended Way: Admin UI Trigger

The preferred way is to run from your local app UI as an admin user.

### 1. Configure `.env`

Minimum required:

```env
DATABASE_URL="file:local.db" # or your production/libsql URL
DATABASE_AUTH_TOKEN=""       # required when your DB provider needs auth
LINKEDIN_MCP_URL="http://127.0.0.1:8000/mcp"
LINKEDIN_MCP_TIMEOUT_MS="120000"
```

### 2. Install dependencies

```bash
bun install
```

### 3. Start LinkedIn MCP server

```bash
uvx linkedin-scraper-mcp@latest --transport streamable-http --host 127.0.0.1 --port 8000 --path /mcp --log-level INFO
```

### 4. Start the app

```bash
bun dev
```

### 5. Trigger from admin dashboard

1. Sign in to your **local app instance** as an admin.
2. Go to `/profile/alumni-bank`.
3. Click **Run Alumni Bank Update**.

This still runs against whatever DB your local `.env` points to.

## Alternative Way (No Website Login): CLI Runner

You can run the same pipeline directly from terminal:

```bash
bun alumni:update
```

The command streams refresh logs and exits with:

- `0` on success
- `1` on failure/config error

## Local Dev DB Bootstrap (Optional)

If you want a fresh local SQLite database:

```bash
bun db:local:init
```

Seed defaults include:

- `RJ_ADMIN`
- `RJ_USER`
- password from `SEED_USER_PASSWORD` (default `DevPassword123!`)

## Safety Notes

- If `.env` points to production DB credentials, this pipeline writes to production data.
- Use a staging DB first if you want to validate behavior before production.

## Troubleshooting

### “Config error: LINKEDIN_MCP_URL is not a valid URL.”

- Fix `LINKEDIN_MCP_URL` in `.env`.

### MCP logs show an initial `POST /mcp 404`

- This can occur during session setup; if following requests are `200`, pipeline can still succeed.

### Rows are skipped for unusable role/company data

- LinkedIn profile may not expose a parseable experience section.
- MCP/browser session may not have access to that profile.

### Slow runs or timeout errors

- Increase `LINKEDIN_MCP_TIMEOUT_MS`.
- Keep MCP server running for the full refresh duration.
