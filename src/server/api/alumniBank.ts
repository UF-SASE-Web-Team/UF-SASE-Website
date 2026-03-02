import { Hono } from "hono";

const alumniRoutes = new Hono();

//Extracts LinkedIn username from various URL formats
export function extractLinkedInUsername(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  //If the string contains "/in/", grab the stuff after it
  const inIndex = trimmed.indexOf("/in/");
  if (inIndex !== -1) {
    const afterIn = trimmed.slice(inIndex + 4);
    //Strip query string and trailing slashes
    const username = afterIn.split("?")[0].split("#")[0].replace(/\/+$/, "");
    return username || null;
  }

  //Bare username: no slashes or dots
  if (!/[/.]/.test(trimmed)) {
    return trimmed;
  }

  return null;
}

export default alumniRoutes;
