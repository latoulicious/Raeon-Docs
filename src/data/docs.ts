// Docs-portal registry. Each .md under content/ is imported at build time
// (Vite `?raw`) and split into frontmatter + body. Content is MIRRORED from
// the bot wiki, not imported — see content/README.md. Order here drives the
// /docs index and per-page nav.

import gettingStarted from "../../content/getting-started.md?raw";
import commands from "../../content/commands.md?raw";
import configuration from "../../content/configuration.md?raw";
import architecture from "../../content/architecture.md?raw";
import { parseFrontmatter, type ParsedDoc } from "../lib/frontmatter";

export interface DocEntry {
  slug: string;
  title: string;
  blurb: string;
  doc: ParsedDoc;
}

const RAW: Record<string, { title: string; blurb: string; raw: string }> = {
  "getting-started": {
    title: "Getting Started",
    blurb: "Prerequisites, env setup, and the Docker run path.",
    raw: gettingStarted,
  },
  commands: {
    title: "Commands",
    blurb: "All 14 slash commands, grouped by what they do.",
    raw: commands,
  },
  configuration: {
    title: "Configuration",
    blurb: "Every environment variable the bot reads.",
    raw: configuration,
  },
  architecture: {
    title: "Architecture",
    blurb: "Layers, audio pipeline, and queue persistence at a glance.",
    raw: architecture,
  },
};

// Render/nav order.
export const DOC_SLUGS = [
  "getting-started",
  "commands",
  "configuration",
  "architecture",
] as const;

export const DOCS: DocEntry[] = DOC_SLUGS.map((slug) => ({
  slug,
  title: RAW[slug].title,
  blurb: RAW[slug].blurb,
  doc: parseFrontmatter(RAW[slug].raw),
}));

export function getDoc(slug: string): DocEntry | undefined {
  return DOCS.find((d) => d.slug === slug);
}
