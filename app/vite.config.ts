/// <reference types="vitest/config" />

import path from "node:path";
import { codecovVitePlugin } from "@codecov/vite-plugin";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    codecovVitePlugin({
      enableBundleAnalysis: process.env.VITE_CODECOV_TOKEN !== undefined,
      bundleName: "weather-bundle-size",
      uploadToken: process.env.VITE_CODECOV_TOKEN,
    }),
  ],
  test: {
    environment: "jsdom",
    globals: true,
    coverage: {
      provider: "v8",
      reporter: ["lcov"],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
