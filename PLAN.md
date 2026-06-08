# Raeon Docs — Plan

Landing page **and** documentation portal for the Raeon Discord music
bot. Separate repo, hosted on Vercel, **zero runtime coupling** to the
bot — the site is static; the bot never needs it.

> Status: W1–W3 built, W4 deploy-ready. Vite is wired, the landing page
> and docs portal render (`npm run build` passes), and a `vercel.json`
> SPA rewrite is in place. Remaining: link the Vercel project + final
> avatar-derived og-image/favicon art.

## Context

Raeon (`../Raeon`) shipped v2.0.0 — Lavalink audio, persistent queues,
playlist queueing. It has a thorough wiki (`../Raeon/docs/wiki`) but no
public face. This site is that face: a minimalist landing page plus a
small docs portal that mirrors the operationally-useful wiki pages
(setup, commands, architecture) for people who don't want to read a
GitHub repo.

Origin: planning notes lived in `../Raeon/docs/wiki/landing-page-notes.md`
(temp, untracked). This PLAN.md supersedes and moves them here.

## Scope

- **Landing** — one scrollable page: hero, what-it-is, commands, quick
  start. The pitch is **self-host** ("run your own"), not a public-bot
  invite (Raeon is a single self-hosted instance — no OAuth, no invite).
- **Docs portal** — a handful of rendered doc pages sourced from the bot
  wiki: Getting Started, Commands, Configuration, Architecture. Read-only
  reference, not a wiki clone.

## Stack (decided)

- **React + Vite**, static build, deployed to Vercel free tier. (Astro
  ruled out — never used.)
- **react-router-dom** for `/` (landing) + `/docs/*` (portal). Intended
  dep; **not installed until W1**.
- Plain CSS with custom properties (`src/styles/theme.css`) — no heavy
  component lib, matches the minimalism. Tailwind optional, not required.
- Docs content as Markdown/MDX under `content/` rendered at build (lib
  chosen at W3 — likely a thin MD renderer, not a full framework).

## Design system

Minimalist **structure** (borrowed from `../LazyScan/web`) on a restrained
near-black canvas with a **single calm blue accent**. Color is used
sparingly — restraint and whitespace carry it. (An earlier banner-derived
iridescent palette was tried and dialled back: too colorful in practice.)

Structure rules:
- Flat surfaces, no shadows, no card-soup. One bg, one raised surface,
  thin 1px borders.
- Whitespace does the work: centered ~1120px column, generous vertical
  padding, sections breathe.
- Inter + system fallback; headings 700–800, body 1.5 line-height;
  modest 6px radii.
- Restraint in copy — facts, not marketing. Color carries personality.

Palette (restrained, one accent) — see `src/styles/theme.css`:

| Token | Hex | Use |
| --- | --- | --- |
| `--bg` | `#0D0F14` | page background (near-black) |
| `--surface` | `#161922` | nav, cards, code blocks, footer |
| `--border` | `#232733` | thin 1px lines |
| `--primary` | `#6E8BEF` | calm blue: links, buttons, wordmark |
| `--primary-deep` | `#5B76D6` | active borders, dividers |
| `--primary-soft` | `#93A8F5` | hover |
| `--text` | `#E8EBF2` | body |
| `--muted` | `#99A2B3` | secondary text |

No gradients or hero glow — the wordmark and primary button are solid
`--primary`. Color stays confined to those few moments so the body reads
calm.

Voice (from the bot bio — deadpan):
- Hero subline: "Silent conductor. Pulls bytes, pushes waves."
- Footer joke: "Funded entirely by bad decisions."
- Everything else factual; humor only in hero + footer.

## Information architecture

```
/                 Landing (hero · what-it-is · commands · quick start)
/docs             Docs index (links to the pages below)
/docs/getting-started   from ../Raeon/README.md + docs/DOCKER.md (Docker path)
/docs/commands          from the 14 command builders (Playback/Queue/Utility)
/docs/configuration     from ../Raeon/docs/wiki/running.md (env table)
/docs/architecture      condensed from ../Raeon/docs/wiki/architecture.md
```

Content is **mirrored, not imported** — the bot wiki stays the source of
truth; these pages are a curated, public-friendly subset. Note drift risk
in each page's frontmatter (which wiki page + commit it was synced from).

## Repo structure (W0 skeleton)

```
raeon-docs/
  PLAN.md              this file
  README.md            what it is, how to run (post-W1), structure map
  LICENSE              MIT
  .gitignore           node, dist, .env, .vercel
  index.html           Vite entry (placeholder until W1)
  public/              static assets — favicon, og-image, banner art
  content/             docs source (Markdown) — placeholders for now
  src/
    main.tsx           app entry (stub)
    App.tsx            route shell: landing + /docs (stub)
    styles/
      theme.css        palette + base tokens (concrete — the design system)
    pages/
      Landing.tsx      stub
      docs/            doc page components (stub dir)
    components/        shared UI (stub dir)
```

Stubs are marked `SCAFFOLD STUB` and do not run until W1 installs deps.

## Phases

- **W0 — Skeleton (this scaffold).** Repo structure, PLAN, README,
  LICENSE, .gitignore, `theme.css` palette, placeholder stubs. No npm, no
  deps. Exit: structure reviewable, palette decided in code.
- **W1 — Vite boot.** `npm create vite@latest` (react-ts), add
  react-router-dom, wire `main.tsx`/`App.tsx`/routes, `theme.css`
  imported, `npm run dev` serves a blank shell. Exit: dev server runs,
  routes resolve.
- **W2 — Landing.** Hero (gradient wordmark + bio subline + 2 buttons),
  what-it-is lines, commands list, quick-start code block, footer. Exit:
  landing reads top-to-bottom, responsive, on-brand.
- **W3 — Docs portal.** MD renderer chosen + wired; the four doc pages
  populated from the wiki sources above; `/docs` index. Exit: all pages
  render, nav works, sync-source noted per page.
- **W4 — Deploy.** Vercel project, static build, og-image + favicon from
  avatar art. Exit: live on a Vercel subdomain.

## Assets needed

- Banner lockup + avatar art (exist in the bot's Discord profile).
- 1–2 real embed screenshots (now-playing, queue) for og-image — crop
  after the bot's in-Discord smoke pass when embeds are final.
- `LICENSE` (MIT) — included here at W0; the bot repo is also missing
  one (`package.json` says MIT) — flag separately.

## Non-goals

- Dashboard, OAuth, any backend — static only.
- Public-bot invite flow.
- Analytics / telemetry.
- Feature-card grids, parallax, animated-everything (a subtle hero
  gradient shimmer is fine).
- A full docs framework (Docusaurus/Nextra) — too heavy for ~4 pages.

## Open questions

- Repo/site name confirmed as `raeon-docs` (was weighing `raeon-web`).
- Dark-only, or also light? Lean **dark-only for v1** (less work,
  on-brand).
- Markdown render approach at W3: build-time import vs runtime fetch.
