import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

// GitHub Pages serves this project below the repository name.
export default defineConfig(({ command }) => ({
  base: command === "build" ? "/pong/" : "/",
  plugins: [tailwindcss()],
}));
