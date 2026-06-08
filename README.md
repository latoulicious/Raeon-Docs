# raeon-docs

Landing page and documentation portal for
[Raeon](https://github.com/latoulicious/Raeon), the self-hosted Discord
music bot. Static React + Vite site, deployed to Vercel. **No coupling to
the bot** — the site is informational only.

> **Status: W1–W3 built, W4 deploy-ready.** Vite is wired, the landing
> page and docs portal render, and a `vercel.json` SPA rewrite is in
> place. Linking the Vercel project is the only remaining step. See
> [PLAN.md](PLAN.md) for phases and scope.

## Structure

```
PLAN.md            full plan + phases
index.html         Vite entry
vite.config.ts     Vite + React plugin
vercel.json        SPA rewrite (deep links → index.html)
public/            static assets (favicon; og-image pending art)
content/           docs source — Markdown mirrored from the bot wiki
src/
  main.tsx         app entry
  App.tsx          routes: / (landing) + /docs/* (portal)
  data/            commands, docs registry, site constants
  lib/             frontmatter splitter
  components/      Nav, Footer
  pages/           Landing, NotFound, docs/*
  styles/          theme.css (design tokens) + layout/landing/docs CSS
```

## Running

```bash
npm install
npm run dev      # local dev server
npm run build    # type-check + static build to dist/
npm run preview  # serve the built dist/ locally
```

## Docs content

The four `/docs/*` pages are **mirrored, not imported** from the bot wiki
(`../Raeon/docs/wiki`), which stays the source of truth. Each
`content/*.md` file records the wiki page and commit it was synced from in
its frontmatter, so drift is visible. See
[content/README.md](content/README.md).

## Design

Minimalist layout (whitespace, flat surfaces, thin borders, Inter) with
Raeon's banner-derived iridescent palette as the signature. Tokens live
in [`src/styles/theme.css`](src/styles/theme.css); rationale in
[PLAN.md](PLAN.md#design-system).

## License

MIT — see [LICENSE](LICENSE).
