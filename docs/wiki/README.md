# Raeon-Docs Wiki

Project documentation for the Raeon-Docs site (landing page + docs portal).
The plan of record is [PLAN.md](../../PLAN.md) at the repo root; agent
rules are in [AGENTS.md](../../AGENTS.md).

## Structure

```txt
docs/wiki/
  README.md      this index
  findings.md    append-only code-review findings log (IDs: F-NNN)
  resolutions.md fixes for findings (same IDs, never orphaned)
  sessions/      append-only session history (DD-MM-YYYY.md)
```

`findings.md` and `resolutions.md` are interconnected — every resolution
references the finding ID it closes; no finding is left orphaned.
