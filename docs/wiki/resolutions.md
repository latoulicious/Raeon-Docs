# Resolutions

Fixes for the findings in [findings.md](findings.md). Each resolution
references the finding ID it closes (`F-NNN`) — never orphaned. Append-only.

| Finding | Date | Resolution | Commit |
| --- | --- | --- | --- |
| [F-001](findings.md) | 2026-06-08 | **Won't fix (false positive).** Node `24.16.0` is a real release on the Node 24 LTS line and satisfies `engines >=22.12.0`; the reviewer's model predates Node 24. The version is also the user's explicit local default. `.nvmrc` left at `24.16`. | n/a |
| [F-002](findings.md) | 2026-06-08 | **Won't fix.** `package.json` uses caret ranges (`^19.2.0`, `^7.9.4`, vite `^7.2.4`), so `npm install` already floats to the suggested react/router patch+minor — no pin needed. Vite `8.0.16` is a **major** bump out of scope (precedent + PLAN target Vite 7); rejected for safety. | n/a |
