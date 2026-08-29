import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // This is a project site, so every production asset is served below the
  // repository name. Keeping the base deterministic also makes a local
  // `npm run build` safe to deploy to GitHub Pages.
  base: '/udupi-flower-mart/',
  test: { environment: 'jsdom', globals: true, setupFiles: './src/tests/setup.ts' },
});
