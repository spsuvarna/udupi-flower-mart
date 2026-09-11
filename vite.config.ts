import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Cloudflare Pages serves the application from the root of its domain.
  base: '/',
  test: { environment: 'jsdom', globals: true, setupFiles: './src/tests/setup.ts', exclude: ['e2e/**', 'node_modules/**', 'dist/**'] },
});
