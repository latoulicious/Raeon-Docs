// Command list mirrored from the bot's 14 slash-command builders
// (../Raeon/src/commands/*.ts). Names + descriptions are copied verbatim
// from each builder's setName/setDescription. Grouping is presentational
// (Playback / Queue / Utility) and lives only here — the bot has no such
// grouping. Keep in sync when the bot adds or renames a command.

export interface Command {
  name: string;
  args?: string;
  description: string;
}

export interface CommandGroup {
  title: string;
  commands: Command[];
}

export const COMMAND_GROUPS: CommandGroup[] = [
  {
    title: "Playback",
    commands: [
      { name: "play", args: "<url | query>", description: "Play a song from YouTube" },
      { name: "pause", description: "Pause the currently playing song" },
      { name: "resume", description: "Resume paused playback" },
      { name: "skip", description: "Skip the current song" },
      { name: "stop", description: "Stop playing music and disconnect from voice channel" },
      { name: "nowplaying", description: "Show the currently playing song" },
    ],
  },
  {
    title: "Queue",
    commands: [
      { name: "queue", description: "Show the current music queue" },
      { name: "clear", description: "Clear the music queue" },
      { name: "shuffle", description: "Shuffle the music queue" },
      { name: "remove", args: "<position>", description: "Remove a song from the queue" },
      { name: "search", args: "<query> [limit]", description: "Search for songs on YouTube" },
    ],
  },
  {
    title: "Utility",
    commands: [
      { name: "ping", description: "Check bot latency" },
      { name: "commands", description: "List all available commands" },
      { name: "prune", args: "[amount]", description: "Delete bot messages in the current channel" },
    ],
  },
];
