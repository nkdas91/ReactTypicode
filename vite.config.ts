/// <reference types="vitest" />

import { defineConfig } from "vitest/config";

import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

import { analyzer } from "vite-bundle-analyzer";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    analyzer({
      analyzerMode: "static",
      openAnalyzer: true,
    }),
  ],

  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",

    exclude: ["**/node_modules/**", "**/dist/**", "tests/e2e/**"],

    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      thresholds: {
        statements: 70,
        branches: 60,
        functions: 70,
        lines: 70,
      },
    },
  },
});
