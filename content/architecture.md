---
title: Architecture
synced_from: ../Raeon/docs/wiki/architecture.md (condensed)
synced_commit: 16af148
synced_date: 2026-06-08
---

# Architecture

Raeon is a standalone Discord music bot: TypeScript, ESM, compiled with
`tsc`. **No HTTP server, no web framework.** Audio is resolved and
streamed by a Lavalink v4 node (Docker) — the bot ships no audio bytes
itself.

## Layers

- **domain** — dependency-free. The `Track` model, the `PlayerPort`
  interface, and the `GuildPlayer` queue orchestrator (cap 20,
  end-event auto-advance). discord.js and Shoukaku types never leak in
  here.
- **application** — `MusicService` (per-guild player registry, resolve
  proxy, idle timeout, user-friendly error mapping) and a trivial ping
  service.
- **infrastructure** — the Discord client, slash-command sync, the
  Shoukaku/Lavalink adapter (implements `PlayerPort`), the embed service,
  logging + optional PostgreSQL sink, queue persistence, and the idle
  timeout sweep.
- **handler** — command dispatch and error-reply fallback.

## Audio pipeline

```txt
/play <url|query>
  → MusicService.resolve()         Lavalink REST /loadtracks
  → MusicService.play()            queue-cap check → join voice → enqueue
  → GuildPlayer.start()            PlayerPort.playTrack(encoded)
                                   Lavalink decodes + streams opus to Discord
  → track `end` event              auto-advance to the next queued track
```

The hidden contract is the track-`end` event driving auto-advance:
`end(finished | loadFailed)` advances; fatal exceptions ride the same
`end(loadFailed)` path; a `stuck` track is force-stopped (which produces
the `end` that advances); `end(stopped)` after `/stop` halts with the
queue intact.

## Queue persistence

Write-through and optional. After every queue mutation `MusicService`
debounces a whole-row upsert of `[currentTrack, queue]` to a
`guild_sessions` table — fire-and-forget, so a dead database never blocks
playback. Restore is lazy: on boot, persisted rows are staged (stale or
empty rows are swept); the next `/play` in that guild enqueues the
restored tracks first, or `/resume` with no live player revives the
session into your current voice channel. Without `DATABASE_URL` the whole
mechanism is a no-op.

## Deployment

A multi-stage `node:24-alpine` image (non-root, no exposed ports). Compose
runs `raeon-bot` + `lavalink` (v4 with the youtube-source plugin) +
`postgres`; the bot is gated on both services' healthchecks. See
[Getting Started](/docs/getting-started).
