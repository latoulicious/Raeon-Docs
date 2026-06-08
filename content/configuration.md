---
title: Configuration
synced_from: ../Raeon/docs/wiki/running.md
synced_commit: 16af148
synced_date: 2026-06-08
---

# Configuration

Raeon is configured entirely through environment variables. Secrets live
in `.env` (never committed). The Docker stack injects the in-stack values
for you; you only set them yourself on the local path.

## Environment variables

| Variable | Required | Default | Used by |
| --- | --- | --- | --- |
| `DISCORD_TOKEN` | yes (≥50 chars) | — | login; validated at startup |
| `LAVALINK_PASSWORD` | yes (non-empty) | — | bot ↔ node auth; also interpolated into the lavalink compose service |
| `LAVALINK_HOST` | no | `localhost` | node address (compose sets `lavalink` in-stack) |
| `LAVALINK_PORT` | no | `2333` | node port; validated 1–65535 when set |
| `DATABASE_URL` | no | — | PostgreSQL log sink + persistent queue sessions; both disabled without it |
| `DB_PASSWORD` | compose only | — | interpolated into the postgres service and the in-stack `DATABASE_URL` |
| `LOG_LEVEL` | no | `info` | pino level |
| `NODE_ENV` | no | — | `development` → pino-pretty + per-guild command sync; otherwise JSON logs + global sync |
| `DEV_GUILD_ID` | no | — | dev-mode guild for instant command sync |
| `CLEAR_GUILDS` | no | `false` | `true` → wipe guild commands from all guilds at boot |

## Optional PostgreSQL

The database is optional. Without `DATABASE_URL`, log mirroring and queue
persistence are simply no-ops — playback is unaffected. Set it to enable:

- **Log mirroring** — structured logs written to a `logs` table.
- **Persistent queues** — the queue survives a restart; the next `/play`
  (or a `/resume` with no live player) replays the interrupted session.

Both tables are auto-created at boot; there is no migration system.

## Command registration

- `NODE_ENV=development` + `DEV_GUILD_ID` → commands sync to that one
  guild instantly (use this while iterating).
- Otherwise → commands register globally (up to ~1h propagation on first
  registration).
- `CLEAR_GUILDS=true` → wipe guild-scoped commands from every guild
  first; run once when switching from guild to global to clear
  duplicates.
