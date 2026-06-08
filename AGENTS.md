# Project Agent Instructions

You are working inside Raeon-Docs: the **static** landing page and
documentation portal for Raeon, the self-hosted Discord music bot. It is
React + Vite, plain CSS, built to static files and deployed to Vercel.
There is **zero runtime coupling** to the bot — the site never calls it,
and the bot never needs the site. Raeon-Docs is a separate repo from the
bot (`../Raeon`) and from LazyScan and its services (Kiln/Herald/Aegis);
sibling repos under `../` are convention precedent only, never runtime
dependencies.

Your primary role is:

* understanding the existing codebase
* implementing features safely
* debugging issues
* performing targeted refactors
* maintaining design + architecture consistency
* updating project documentation when needed

Do not immediately generate code from prompt context alone.

Always inspect existing implementation first.

Prioritize:

* correctness
* maintainability
* readability
* small reviewable diffs

over:

* theoretical purity
* unnecessary abstractions
* broad rewrites

---

# Project Constraints

* **Static only.** No backend, no API, no OAuth, no analytics/telemetry,
  no public-bot invite flow. The site is informational. Do not add a
  server or data fetching without approval.
* **The design system lives in `src/styles/theme.css`.** That file owns
  the palette and base tokens (banner-derived iridescent accent on a
  near-black canvas). Extend via the existing CSS custom properties;
  do not redefine or fork the token set. The signature gradient
  (`--iris`) is confined to hero/structural moments — keep the body calm.
* **Dark-only for v1.** No light theme unless explicitly asked.
* **Plain CSS, no heavy component lib.** Tailwind/Chakra/etc. are out
  unless explicitly approved. Matches the minimalism.
* **Docs are mirrored, not imported.** The four `content/*.md` pages are a
  curated, public-friendly subset of the bot wiki (`../Raeon/docs/wiki`),
  which stays the source of truth. Each file's frontmatter records the
  `synced_from` source and `synced_commit`; update both when re-syncing so
  drift stays visible. Do not deep-link or build against the bot repo at
  runtime.
* **SPA routing depends on the Vercel rewrite.** `/docs/*` are
  client-side BrowserRouter routes; `vercel.json` rewrites all unmatched
  paths to `/index.html`. Removing it breaks deep links (hard 404).

---

# Project Wiki

Project documentation lives inside this repository:

```txt
docs/wiki
```

Before significant implementation work, read relevant documents under
`docs/wiki`. Current structure:

```txt
docs/wiki/
  README.md      index of the wiki
  findings.md    append-only code-review findings log
  resolutions.md fixes for findings (same IDs, never orphaned)
  sessions/      append-only session history (DD-MM-YYYY.md)
```

If documentation conflicts with implementation:

* treat code as source of truth
* mention documentation drift

The plan of record is [PLAN.md](PLAN.md) at the repo root (phases W0–W4).

---

# Session Logging

After meaningful implementation changes, append a session entry to:

```txt
docs/wiki/sessions/DD-MM-YYYY.md
```

Recommended format:

```md
---
time: 08:42 PM
type: feature|fix|refactor|investigation|docs
breaking_change: false
modules:
  - example-module
---

# Summary

# Files Touched

# Previous Behavior

# New Behavior

# Reason For Change

# Risks

# Notes
```

Do not overwrite previous session history. Prefer append-only updates.

---

# Before Writing Code

Before non-trivial implementation:

1. inspect surrounding code
2. identify existing patterns
3. identify affected modules
4. identify hidden contracts
5. identify rollback risk
6. prefer smallest safe implementation

The hidden contracts here are: the `theme.css` token set (the whole site
draws from it), the docs sync frontmatter contract (`synced_from` /
`synced_commit` per `content/*.md`), the route table in `src/App.tsx`
paired with the `vercel.json` rewrite, and the single-source command list
in `src/data/commands.ts` (mirrored from the bot's 14 builders).

---

# Change Safety Rules

Do NOT modify unless explicitly required:

* the `--*` token definitions in `src/styles/theme.css`
* the route table in `src/App.tsx` or the `vercel.json` SPA rewrite
* the docs sync frontmatter keys in `content/*.md`

If breaking changes appear necessary:

1. explain why
2. explain risks
3. propose safer alternatives first

Avoid mixing cleanup, formatting, refactors, and behavior changes inside
the same diff unless necessary.

---

# Verification Expectations

There is no test suite (the site is small + static). Verification baseline
for any change:

* `npm run build` passes (`tsc -b` strict + `vite build`)
* spot-check the touched pages in `npm run dev` or `npm run preview`
  (landing reads top-to-bottom; `/docs/*` routes resolve, including a
  hard refresh on a deep link once deployed)

When behavior changes, state what was verified and what was not.

---

# Documentation Expectations

If structure or behavior changes meaningfully, update the relevant docs
(`README.md`, `PLAN.md`, or `docs/wiki`). Prefer concise notes and
append-only history. Avoid giant documentation dumps.

---

# Communication Style

Be direct and pragmatic. Challenge unsafe assumptions. Explain tradeoffs
clearly. Protect long-term maintainability.
