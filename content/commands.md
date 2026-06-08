---
title: Commands
synced_from: ../Raeon/src/commands (14 builders)
synced_commit: 16af148
synced_date: 2026-06-08
---

# Commands

Raeon ships 14 slash commands. Grouping below is for reading convenience;
the bot itself keeps them in one flat list. Names and descriptions are
copied verbatim from each command builder.

## Playback

| Command | Description |
| --- | --- |
| `/play <url \| query>` | Play a song from YouTube |
| `/pause` | Pause the currently playing song |
| `/resume` | Resume paused playback |
| `/skip` | Skip the current song |
| `/stop` | Stop playing music and disconnect from voice channel |
| `/nowplaying` | Show the currently playing song |

`/play` accepts a YouTube URL or a bare search query (e.g.
`ytsearch10:song name`). A pure playlist URL bulk-enqueues up to the
20-track cap and reports "Queued N of M".

`/resume` has two meanings: with a paused player it unpauses; with no
live player but a persisted session it revives that session into your
current voice channel.

## Queue

| Command | Description |
| --- | --- |
| `/queue` | Show the current music queue |
| `/clear` | Clear the music queue |
| `/shuffle` | Shuffle the music queue |
| `/remove <position>` | Remove a song from the queue (1 = first) |
| `/search <query> [limit]` | Search for songs on YouTube |

The queue is capped at 20 tracks. Idle disconnect happens after 5 minutes
with nothing playing.

## Utility

| Command | Description |
| --- | --- |
| `/ping` | Check bot latency |
| `/commands` | List all available commands |
| `/prune [amount]` | Delete bot messages in the current channel (max 100) |
