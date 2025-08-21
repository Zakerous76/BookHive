import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { visualizer } from "rollup-plugin-visualizer"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({ open: true, filename: "stats.html", gzipSize: true }),
  ],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3056",
        changeOrigin: true,
      },
    },
  },
})
