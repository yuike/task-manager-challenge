import path from "node:path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vitest/config"

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    setupFiles: ["./vitest.setup.ts"],
  },
})
