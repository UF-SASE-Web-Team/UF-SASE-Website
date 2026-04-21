const MCP_URL = process.env.LINKEDIN_MCP_URL ?? "http://127.0.0.1:8000/mcp";
const TIMEOUT_MS = Number(process.env.LINKEDIN_MCP_TIMEOUT_MS ?? "120000");
const SUPPORTED_PROTOCOL_VERSIONS = ["2025-11-25", "2025-06-18", "2025-03-26", "2024-11-05", "2024-10-07"];

let nextRequestId = 1;
let mcpSessionId: string | null = null;
let initialized = false;
let initPromise: Promise<void> | null = null;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function parseResult(result: unknown): Record<string, unknown> {
  if (typeof result === "string") {
    try {
      const parsed: unknown = JSON.parse(result);
      return isRecord(parsed) ? parsed : { raw: parsed };
    } catch {
      return { raw: result };
    }
  }

  return isRecord(result) ? result : { raw: result };
}

function parseMcpPayload(rawText: string): Record<string, unknown> | null {
  const trimmed = rawText.trim();
  if (!trimmed) return null;

  try {
    const parsed: unknown = JSON.parse(trimmed);
    return isRecord(parsed) ? parsed : null;
  } catch {
    // Streamable HTTP may return SSE chunks; parse the last JSON data payload.
  }

  const lines = trimmed.split("\n").map((line) => line.trim());
  const dataLines = lines
    .filter((line) => line.startsWith("data:"))
    .map((line) => line.slice(5).trim())
    .filter((line) => line.length > 0 && line !== "[DONE]");

  for (let index = dataLines.length - 1; index >= 0; index -= 1) {
    const candidate = dataLines[index];
    if (!candidate) continue;
    try {
      const parsed: unknown = JSON.parse(candidate);
      if (isRecord(parsed)) return parsed;
    } catch {
      // Try older entries.
    }
  }

  return null;
}

async function postRpc(
  payload: Record<string, unknown>,
  options: {
    expectResponse: boolean;
    includeSession: boolean;
  },
): Promise<Record<string, unknown> | null> {
  const abortController = new AbortController();
  const timeout = setTimeout(() => abortController.abort(), TIMEOUT_MS);

  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Accept: "application/json, text/event-stream",
    };

    if (options.includeSession && mcpSessionId) {
      headers["mcp-session-id"] = mcpSessionId;
    }

    const response = await fetch(MCP_URL, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
      signal: abortController.signal,
    });

    const responseSessionId = response.headers.get("mcp-session-id");
    if (responseSessionId) {
      mcpSessionId = responseSessionId;
    }

    const rawText = await response.text();
    if (!response.ok) {
      throw new Error(`MCP HTTP ${response.status}: ${rawText || response.statusText}`);
    }

    if (!options.expectResponse) {
      return null;
    }

    const parsed = parseMcpPayload(rawText);
    if (!parsed) {
      throw new Error(`MCP response could not be parsed: ${rawText}`);
    }

    return parsed;
  } finally {
    clearTimeout(timeout);
  }
}

function resetMcpSession() {
  mcpSessionId = null;
  initialized = false;
  initPromise = null;
}

async function initializeMcpClient() {
  let lastError: Error | null = null;

  for (const protocolVersion of SUPPORTED_PROTOCOL_VERSIONS) {
    const initializeId = nextRequestId++;
    try {
      const initializeResponse = await postRpc(
        {
          jsonrpc: "2.0",
          id: initializeId,
          method: "initialize",
          params: {
            protocolVersion,
            capabilities: {},
            clientInfo: {
              name: "uf-sase-website",
              version: "1.0.0",
            },
          },
        },
        { expectResponse: true, includeSession: false },
      );

      if (!initializeResponse) {
        throw new Error("Empty initialize response");
      }

      if (isRecord(initializeResponse.error)) {
        const message = typeof initializeResponse.error.message === "string" ? initializeResponse.error.message : "Unknown initialize error";
        throw new Error(message);
      }

      await postRpc(
        {
          jsonrpc: "2.0",
          method: "notifications/initialized",
          params: {},
        },
        { expectResponse: false, includeSession: true },
      );

      initialized = true;
      return;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error("Unknown initialize error");
      resetMcpSession();
    }
  }

  throw new Error(`Failed to initialize MCP client. ${lastError?.message ?? ""}`.trim());
}

async function ensureInitialized() {
  if (initialized) return;
  if (!initPromise) {
    initPromise = initializeMcpClient().finally(() => {
      initPromise = null;
    });
  }
  await initPromise;
}

async function callTool(name: string, args: Record<string, unknown>): Promise<Record<string, unknown>> {
  await ensureInitialized();

  const response = await postRpc(
    {
      jsonrpc: "2.0",
      id: nextRequestId++,
      method: "tools/call",
      params: {
        name,
        arguments: args,
      },
    },
    { expectResponse: true, includeSession: true },
  );

  if (!response) {
    throw new Error("Empty tools/call response");
  }

  if (isRecord(response.error)) {
    const message = typeof response.error.message === "string" ? response.error.message : "Unknown tools/call error";
    throw new Error(message);
  }

  return response;
}

function isArgumentSchemaError(message: string): boolean {
  const lower = message.toLowerCase();
  const mentionsValidation = lower.includes("validation");
  const mentionsArgShape =
    lower.includes("missing required argument") ||
    lower.includes("unexpected keyword argument") ||
    lower.includes("linkedin_username") ||
    lower.includes("username");

  return mentionsValidation || mentionsArgShape;
}

function extractToolErrorMessage(result: Record<string, unknown>): string {
  const content = Array.isArray(result.content) ? result.content : [];
  const textMessages = content
    .filter((item): item is { type: string; text?: unknown } => isRecord(item) && typeof item.type === "string")
    .map((item) => (typeof item.text === "string" ? item.text.trim() : ""))
    .filter((value) => value.length > 0);

  if (textMessages.length > 0) {
    return textMessages.join("\n");
  }

  return "MCP tool returned an error result.";
}

async function fetchProfileWithCompatibleArgs(username: string): Promise<Record<string, unknown>> {
  const argVariants: Array<Record<string, unknown>> = [
    { linkedin_username: username, sections: "experience" },
    { username, sections: "experience" },
    { linkedin_username: username },
    { username },
  ];
  let lastError: unknown = null;

  for (let index = 0; index < argVariants.length; index += 1) {
    const args = argVariants[index];
    try {
      const response = await callTool("get_person_profile", args);
      const result = isRecord(response.result) ? response.result : response;
      const isErrorResult = result.isError === true;
      if (isErrorResult) {
        throw new Error(extractToolErrorMessage(result));
      }

      const structured = result.structuredContent;
      if (isRecord(structured)) {
        return structured;
      }

      const content = Array.isArray(result.content) ? result.content : [];
      const textPart = content.find(
        (item): item is { type: string; text?: unknown } => isRecord(item) && typeof item.type === "string" && item.type === "text",
      );
      const text = isRecord(textPart) ? textPart.text : undefined;

      return parseResult(text ?? result);
    } catch (error) {
      lastError = error;
      const message = error instanceof Error ? error.message : "Unknown MCP error";
      const hasFallback = index < argVariants.length - 1;

      if (hasFallback && isArgumentSchemaError(message)) {
        continue;
      }

      throw error;
    }
  }

  throw lastError instanceof Error ? lastError : new Error("Unknown MCP error");
}

export async function fetchLinkedInProfile(username: string): Promise<Record<string, unknown>> {
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      return await fetchProfileWithCompatibleArgs(username);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown MCP error";
      const shouldRetry = attempt === 1 && (message.toLowerCase().includes("session") || message.toLowerCase().includes("initialize"));
      if (shouldRetry) {
        resetMcpSession();
        continue;
      }
      throw error;
    }
  }

  throw new Error("fetchLinkedInProfile: exhausted retries");
}
