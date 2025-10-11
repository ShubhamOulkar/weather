/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'
import { codecovVitePlugin } from "@codecov/vite-plugin";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr(), codecovVitePlugin({
    enableBundleAnalysis: process.env.VITE_CODECOV_TOKEN !== undefined,
    bundleName: "weather bundle size",
    uploadToken: process.env.VITE_CODECOV_TOKEN,
  })],
  test: {
    environment: 'jsdom',
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['lcov']
    }
  }
})
