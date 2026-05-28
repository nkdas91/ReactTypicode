import "dotenv/config";

import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",

  use: {
    baseURL: process.env.APP_URL || "http://localhost:5173",
  },

  webServer: {
    command: "npm run dev",
    url: process.env.APP_URL || "http://localhost:5173",
    reuseExistingServer: !process.env.CI,
  },
});
