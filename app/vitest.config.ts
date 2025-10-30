import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: "jsdom",
      setupFiles: ["./vitest.setup.ts", "./msw.setup.ts"],
      globals: true,
      coverage: {
        provider: "v8",
        reporter: ["lcov"],
      },
      clearMocks: true,
    },
  }),
);
