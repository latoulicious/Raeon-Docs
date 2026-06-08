# Findings

Append-only log of code-review findings. Each finding gets a stable ID
(`F-NNN`) and a matching entry in [resolutions.md](resolutions.md) once
addressed. Do not edit or delete past findings — supersede them.

| ID | Date | Severity | Area | Finding | Status |
| --- | --- | --- | --- | --- | --- |
| F-001 | 2026-06-08 | major | `.nvmrc` | CodeRabbit flags `24.16` as an invalid Node version and suggests downgrading to 22.x. | Won't fix — see [R-001](resolutions.md) |
| F-002 | 2026-06-08 | minor | `package.json` | Suggests pinning react/react-dom → 19.2.7, react-router-dom → 7.17.0, and Vite → 8.0.16. | Won't fix — see [R-002](resolutions.md) |

> Source: CodeRabbit CLI review, 2026-06-08, base `review-base` (empty
> root commit). Both findings reviewed with the user and declined.
