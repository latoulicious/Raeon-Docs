// Minimal YAML-ish frontmatter splitter — dependency-free on purpose.
// Docs source files carry a small `--- key: value ---` block recording the
// wiki page + commit they were synced from (drift visibility). react-markdown
// would render that block as body text, so we strip it here and expose the
// pairs separately. Only flat `key: value` lines are supported — that is all
// the sync metadata needs.

export interface ParsedDoc {
  frontmatter: Record<string, string>;
  body: string;
}

const FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;

export function parseFrontmatter(raw: string): ParsedDoc {
  const match = FRONTMATTER_RE.exec(raw);
  if (!match) return { frontmatter: {}, body: raw };

  const frontmatter: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const sep = line.indexOf(":");
    if (sep === -1) continue;
    const key = line.slice(0, sep).trim();
    const value = line.slice(sep + 1).trim().replace(/^["']|["']$/g, "");
    if (key) frontmatter[key] = value;
  }

  return { frontmatter, body: raw.slice(match[0].length) };
}
