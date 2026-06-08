import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Static SPA — no API proxy (zero runtime coupling to the bot).
export default defineConfig({
  plugins: [react()],
});
