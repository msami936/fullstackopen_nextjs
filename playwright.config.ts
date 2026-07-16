import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

// Prefer .env.test (CI + local e2e against test DB); fall back to .env.local
dotenv.config({ path: ".env.test" });
dotenv.config({ path: ".env.local" });

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: "html",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
    env: {
      ...process.env,
      DATABASE_URL: process.env.DATABASE_URL!,
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET!,
      NEXTAUTH_URL: process.env.NEXTAUTH_URL || "http://localhost:3000",
    },
  },
});
