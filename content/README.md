# content/

Docs-portal source, rendered at `/docs/*` (W3). Each file is a curated,
public-friendly subset of a bot wiki page — **mirrored, not imported**.
The bot wiki (`../Raeon/docs/wiki`) stays the source of truth.

Planned files (populated at W3):

| File | Route | Synced from |
| --- | --- | --- |
| `getting-started.md` | `/docs/getting-started` | `../Raeon/README.md` + `docs/DOCKER.md` |
| `commands.md` | `/docs/commands` | the 14 command builders |
| `configuration.md` | `/docs/configuration` | `../Raeon/docs/wiki/running.md` (env table) |
| `architecture.md` | `/docs/architecture` | `../Raeon/docs/wiki/architecture.md` (condensed) |

Each page's frontmatter should record the wiki page + commit it was
synced from, so drift is visible.
