import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"
import { visualizer } from "rollup-plugin-visualizer"

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "")

  return {
    plugins: [
      react(),
      visualizer({ open: true, filename: "stats.html", gzipSize: true }),
    ],
  }
})
