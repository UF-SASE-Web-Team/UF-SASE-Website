import "dotenv/config";
import { getAlumniRefreshStatus, startAlumniRefresh, validateAlumniRefreshConfig } from "../src/server/services/alumniBankRefresh";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const logKey = (timestamp: number, level: string, message: string): string => `${timestamp}|${level}|${message}`;

const main = async () => {
  const config = validateAlumniRefreshConfig();
  if (!config.ok) {
    console.error(`Config error: ${config.reason ?? "Invalid alumni refresh configuration."}`);
    process.exit(1);
  }

  console.log(`Using MCP URL: ${config.mcpUrl}`);

  const started = startAlumniRefresh();
  if (started.started) {
    console.log(`Started alumni refresh run ${started.status.runId}.`);
  } else {
    console.log(`A refresh is already running (run ${started.status.runId}). Watching existing run.`);
  }

  const seenLogs = new Set<string>();

  while (true) {
    const status = getAlumniRefreshStatus();

    for (const log of [...status.logs].reverse()) {
      const key = logKey(log.timestamp, log.level, log.message);
      if (seenLogs.has(key)) continue;
      seenLogs.add(key);
      console.log(`[${new Date(log.timestamp).toISOString()}] ${log.level.toUpperCase()}: ${log.message}`);
    }

    if (status.state === "completed") {
      console.log(
        `Completed run ${status.runId}. total=${status.total}, processed=${status.processed}, succeeded=${status.succeeded}, failed=${status.failed}, skipped=${status.skipped}, added=${status.added}`,
      );
      process.exit(0);
    }

    if (status.state === "failed") {
      console.error(`Run ${status.runId} failed: ${status.lastError ?? "Unknown error"}`);
      process.exit(1);
    }

    await sleep(1500);
  }
};

void main();
