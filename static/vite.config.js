import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/static/",
  build: {
    manifest: "manifest.json",
    outDir: resolve("../static/build"),
    rollupOptions: {
      input: {
        entry: "./src/main.js",
      },
    },
  },
  plugins: [svelte()],
});
