import { useEffect, useMemo, useState } from "react";

type EventItem = {
  id: string;
  title: string;
  description?: string;
  location?: string;
  start: Date;
  end?: Date;
};

type Props = {
  // Public .ics URL
  icsUrl: string;
  // How many days ahead to include
  days?: number;
  // Max items to show
  limit?: number;
  // Show one-line description under each item
  showDescription?: boolean;
};

function unfoldIcsLines(text: string): Array<string> {
  const raw = text.split(/\r?\n/);
  const out: Array<string> = [];
  for (const line of raw) {
    if (/^[ \t]/.test(line) && out.length) out[out.length - 1] += line.slice(1);
    else out.push(line);
  }
  return out;
}

// Helper to unescape values
function icsUnescape(s: string): string {
  return s
    .replace(/\\\\/g, "\\") // backslash
    .replace(/\\n/gi, "\n") // newline
    .replace(/\\,/g, ",") // comma
    .replace(/\\;/g, ";") // semicolon
    .replace(/\\:/g, ":"); // colon
}

function parseIcsDate(v: string): Date | null {
  const m = v.match(/^(\d{4})(\d{2})(\d{2})(T(\d{2})(\d{2})(\d{2})(Z)?)?$/);
  if (!m) return null;
  const [_, y, mo, d, tPart, hh, mm, ss, z] = m;
  if (!tPart) return new Date(+y, +mo - 1, +d);
  if (z === "Z") return new Date(Date.UTC(+y, +mo - 1, +d, +(hh ?? 0), +(mm ?? 0), +(ss ?? 0)));
  return new Date(+y, +mo - 1, +d, +(hh ?? 0), +(mm ?? 0), +(ss ?? 0));
}

function parseIcs(text: string): Array<EventItem> {
  const lines = unfoldIcsLines(text);
  const events: Array<EventItem> = [];
  let inEvent = false;
  let cur: Partial<EventItem & { uid?: string }> = {};

  function firstUnquotedColonIndex(line: string): number {
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (c === '"') inQuotes = !inQuotes;
      else if (c === ":" && !inQuotes) return i;
    }
    return -1;
  }

  const valRaw = (line: string) => {
    const i = firstUnquotedColonIndex(line);
    return i >= 0 ? line.slice(i + 1) : "";
  };
  const valEsc = (line: string) => icsUnescape(valRaw(line).trim());

  for (const line of lines) {
    if (line === "BEGIN:VEVENT") {
      inEvent = true;
      cur = {};
      continue;
    }
    if (line === "END:VEVENT") {
      if (cur.title && cur.start) {
        events.push({
          id: cur.uid ?? `${cur.title}-${cur.start.toISOString()}`,
          title: cur.title,
          description: cur.description,
          location: cur.location,
          start: cur.start,
          end: cur.end,
        });
      }
      inEvent = false;
      continue;
    }
    if (!inEvent) continue;

    if (line.startsWith("UID:")) cur.uid = valRaw(line).trim();
    else if (line.startsWith("SUMMARY")) cur.title = valEsc(line);
    else if (line.startsWith("DESCRIPTION")) cur.description = valEsc(line);
    else if (line.startsWith("LOCATION")) cur.location = valEsc(line);
    else if (line.startsWith("DTSTART")) {
      const dt = parseIcsDate(valRaw(line));
      if (dt) cur.start = dt;
    } else if (line.startsWith("DTEND")) {
      const dt = parseIcsDate(valRaw(line));
      if (dt) cur.end = dt;
    }
  }
  return events;
}

function decodeHtmlEntities(s: string): string {
  // common named entities
  s = s
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/g, "'");
  // numeric entities: decimal and hex
  s = s.replace(/&#(\d+);/g, (_, d) => String.fromCharCode(Number(d)));
  s = s.replace(/&#x([\da-f]+);/gi, (_, h) => String.fromCharCode(parseInt(h, 16)));
  return s;
}

// handle href with "..." or '...' or bare, plus nested tags
function normalizeDescription(raw: string): string {
  let s = decodeHtmlEntities(raw);

  // <br> variations -> newline
  s = s.replace(/<br\s*\/?>/gi, "\n");

  // 1) Proper <a ...>label</a>  -> "Label: URL"  (no parens, easier to wrap)
  s = s.replace(/<a\b[^>]*?href\s*=\s*(?:(["'])(.*?)\1|([^\s>]+))[^>]*>([\s\S]*?)<\/a>/gi, (_m, _q, qUrl, bareUrl, labelHtml) => {
    const url = (qUrl || bareUrl || "").trim();
    const label = labelHtml.replace(/<\/?[^>]+>/g, "").trim();
    // If label is empty or already looks like a URL, just return the URL
    if (!label || /^https?:\/\//i.test(label)) return url;
    return `${label}: ${url}`;
  });

  // 2) Orphan/opening <a ...> (no closing tag) -> " URL "
  //    (so our linkifier will pick it up)
  s = s.replace(/<a\b[^>]*?\bhref\s*=\s*(?:(["'])(.*?)\1|([^\s>]+))[^>]*>?/gi, (_m, _q, qUrl, bareUrl) => {
    const url = (qUrl || bareUrl || "").trim();
    return url ? ` ${url} ` : " ";
  });

  // Clean up artifact from copied descriptions: "-->" arrows etc.
  s = s.replace(/--\s*>/g, " ");

  // Strip any remaining tags
  s = s.replace(/<\/?[^>]+>/g, "");

  // Tidy whitespace
  s = s
    .replace(/\r/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  return s;
}

function renderWithLinks(s: string): Array<string | JSX.Element> {
  const parts: Array<string | JSX.Element> = [];
  const re = /\bhttps?:\/\/[^\s<)]+/g; // match URLs, stop before spaces/")"/">"
  let last = 0;
  let m: RegExpExecArray | null;

  while ((m = re.exec(s))) {
    if (m.index > last) parts.push(s.slice(last, m.index));

    // Trim common trailing punctuation/quotes/brackets copied after links
    const raw = m[0];
    const url = raw.replace(/[)\]\u201D"'’>.,!?;:]+$/u, "");

    parts.push(
      <a
        key={`${url}-${m.index}`}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="break-words break-all text-saseBlue underline underline-offset-2 hover:no-underline"
      >
        {url}
      </a>,
    );

    last = m.index + raw.length;
  }

  if (last < s.length) parts.push(s.slice(last));
  return parts;
}

export default function UpcomingEventsBox({ days = 7, icsUrl, limit = 5, showDescription: _showDescription = false }: Props) {
  const [items, setItems] = useState<Array<EventItem>>([]);
  const [_error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  useEffect(() => {
    const ctrl = new AbortController();
    (async () => {
      try {
        setError(null);
        const resp = await fetch(icsUrl, { signal: ctrl.signal, headers: { "cache-control": "no-cache" } });
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        const text = await resp.text();
        const all = parseIcs(text);

        const now = new Date();
        const cutoff = new Date(now);
        cutoff.setDate(cutoff.getDate() + days);

        const next = all
          .filter((e) => e.start >= now && e.start <= cutoff)
          .sort((a, b) => a.start.getTime() - b.start.getTime())
          .slice(0, limit);

        setItems(next);
        setError(null);
        setLoading(false);
      } catch (e) {
        console.error(e);
        setError("Could not load upcoming events.");
        setLoading(false);
      }
    })();
    return () => ctrl.abort();
  }, [days, icsUrl, limit]);

  const fmt = useMemo(
    () =>
      new Intl.DateTimeFormat(undefined, {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      }),
    [],
  );

  return (
    <div className="relative">
      {/* offset green 'shadow' */}
      <div aria-hidden className="pointer-events-none absolute inset-0 translate-x-3 translate-y-3 rounded-2xl bg-saseGreen/40" />

      {/* main card */}
      <div className="overflow-wrap relative rounded-2xl border-[3px] border-black bg-white">
        {/* header */}
        <div className="rounded-t-xl bg-saseGreen text-center">
          <h3 className="py-3 font-oswald text-xl tracking-wide text-black md:text-2xl">Upcoming This Week</h3>
          <div className="h-[3px] w-full bg-black/70" />
        </div>

        {/* body */}
        <div className="p-4">
          {loading && <p className="py-8 text-center text-sm text-neutral-600">Loading…</p>}

          {!loading && items.length === 0 && <p className="py-10 text-center text-lg font-medium text-neutral-800">Nothing</p>}

          {!loading && items.length > 0 && (
            <ul className="divide-y divide-black/10">
              {items.map((e) => {
                const hasDesc = !!e.description?.trim();
                const isOpen = hasDesc && expanded.has(e.id);

                return (
                  <li key={e.id} className="py-2">
                    <div
                      role={hasDesc ? "button" : undefined}
                      tabIndex={hasDesc ? 0 : -1}
                      aria-expanded={hasDesc ? isOpen : undefined}
                      aria-controls={hasDesc ? `desc-${e.id}` : undefined}
                      onClick={hasDesc ? () => toggle(e.id) : undefined}
                      onKeyDown={
                        hasDesc
                          ? (ev) => {
                              if (ev.key === "Enter" || ev.key === " ") {
                                ev.preventDefault();
                                toggle(e.id);
                              }
                            }
                          : undefined
                      }
                      className={`rounded-xl border-[2px] border-border outline-none transition ${
                        hasDesc ? "cursor-pointer p-3 hover:bg-neutral-50 focus:ring-2 focus:ring-saseGreen/50" : "px-3 pb-4 pt-3" // extra bottom padding when no description
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {/* fixed-width chevron slot to keep titles aligned */}
                        <div className="mt-1 h-4 w-4 flex-none">
                          {hasDesc && (
                            <svg
                              className={`h-4 w-4 transform transition-transform ${isOpen ? "rotate-180" : ""}`}
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.2l3.71-2.97a.75.75 0 111.04 1.08l-4.23 3.39a.75.75 0 01-.94 0L5.21 8.31a.75.75 0 01.02-1.1z" />
                            </svg>
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="truncate font-semibold text-neutral-900">{e.title}</div>
                          <div className="text-sm text-neutral-600">{fmt.format(e.start)}</div>
                          {e.location && <div className="text-xs text-neutral-600">{e.location}</div>}

                          {hasDesc && (
                            <div
                              id={`desc-${e.id}`}
                              className={`mt-2 border-t border-black/10 pt-2 text-xs text-neutral-800 transition-opacity duration-200 ${
                                isOpen ? "opacity-100" : "max-h-0 overflow-hidden opacity-0"
                              }`}
                            >
                              <div className="whitespace-pre-wrap">{renderWithLinks(normalizeDescription(e.description ?? ""))}</div>
                            </div>
                          )}
                        </div>

                        {/* fixed-width label slot to keep right edge aligned */}
                        <span
                          className={`ml-2 hidden w-[52px] text-right text-xs font-medium text-neutral-700 md:block ${
                            hasDesc ? "visible" : "invisible"
                          }`}
                        >
                          {isOpen ? "Hide" : "Details"}
                        </span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
