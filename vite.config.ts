import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Vercel-də VERCEL dəyişəni avtomatik olur -> base "/"
// GitHub Pages-də (build zamanı) -> base "/Capstone_public_repo/"
export default defineConfig(({ command }) => ({
  base:
    process.env.VERCEL || command !== "build"
      ? "/"
      : "/Capstone_public_repo/",

  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "@tanstack/react-query",
      "@tanstack/query-core",
    ],
  },
}));
