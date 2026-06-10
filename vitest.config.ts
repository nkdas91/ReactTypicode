/// <reference types="vitest" />

import { defineConfig } from "vitest/config";

export default defineConfig({
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
