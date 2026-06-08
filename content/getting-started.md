---
title: Getting Started
synced_from: ../Raeon/README.md + docs/DOCKER.md
synced_commit: 16af148
synced_date: 2026-06-08
---

# Getting Started

Raeon is **self-hosted** — you run your own instance. There is no public
invite. You need two things on the host:

- **Node.js 24+**
- **Docker** (runs the Lavalink audio node)

No system audio binaries are required — all track resolution and streaming
happen on the Lavalink node.

## Docker (recommended)

The full stack — bot, Lavalink node, and PostgreSQL — comes up with one
command.

```bash
cp .env.example .env
# fill DISCORD_TOKEN, LAVALINK_PASSWORD, DB_PASSWORD
docker compose up -d --build
docker compose logs -f raeon-bot
```

The bot starts only after the `lavalink` and `postgres` healthchecks
pass. In-stack `LAVALINK_HOST` and `DATABASE_URL` are injected by
compose — you do not set them in `.env` for the Docker path. Commands
register globally; expect up to ~1h propagation on first registration.

## Local (bot on host, services in Docker)

Run the bot directly while Docker provides only the services.

```bash
npm install
cp .env.example .env   # fill DISCORD_TOKEN, LAVALINK_PASSWORD
docker compose up -d lavalink   # add postgres for DB logging
npm run build
npm start
```

For DB logging from a host-run bot, also start postgres and set
`DATABASE_URL=postgresql://raeon:<DB_PASSWORD>@localhost:5432/raeon`
(compose binds postgres to `127.0.0.1:5432`, lavalink to
`127.0.0.1:2333`).

For fast slash-command iteration set `NODE_ENV=development` and
`DEV_GUILD_ID` — commands sync to one guild instantly instead of waiting
on global propagation.

## Next steps

- [Configuration](/docs/configuration) — every environment variable.
- [Commands](/docs/commands) — the full slash-command list.
