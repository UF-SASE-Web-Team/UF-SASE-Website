import { Client } from "@modelcontextprotocol/sdk/client/index.js"
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js"

const MCP_URL = process.env.LINKEDIN_MCP_URL ?? "http://localhost:3000/mcp"
const TIMEOUT_MS = 10_000;

function buildClient(){
    return new Client({
        name: "linkedin-mcp-client",
        version: "1.0.0"
    })
}

function buildTransport(){
    return new StreamableHTTPClientTransport(new URL(MCP_URL));
}

function parseResult(result: unknown): Record<string, unknown> {
  try {
    if (typeof result === "string") return JSON.parse(result);
    if (typeof result === "object" && result !== null) return result as Record<string, unknown>;
    return { raw: result };
  } catch {
    return { raw: result };
  }
}

export async function fetchLinkedInProfile(
  username: string
): Promise<Record<string, unknown>> {
  for (let attempt = 1; attempt <= 2; attempt++) {
    const client = buildClient();
    const transport = buildTransport();

    try {
      await client.connect(transport);

      const response = await Promise.race([
        client.callTool({
          name: "get_person_profile",
          arguments: { username },
        }),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error("MCP request timed out")), TIMEOUT_MS)
        ),
      ]);

      const content = (response as any)?.content;
      const text = Array.isArray(content)
        ? content.find((c: any) => c.type === "text")?.text
        : undefined;

      return parseResult(text ?? response);
    } catch (err) {
      const isTimeout = err instanceof Error && err.message.includes("timed out");
      if (attempt === 2 || !isTimeout) throw err;
      console.warn(`[linkedin-mcp] Timeout on attempt ${attempt}, retrying…`);
    } finally {
      try {
        await client.close();
      } catch {
      }
    }
  }

  throw new Error("fetchLinkedInProfile: exhausted retries");
}