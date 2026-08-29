import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: process.env.GITHUB_ACTIONS ? '/udupi-flower-mart/' : '/',
  test: { environment: 'jsdom', globals: true, setupFiles: './src/tests/setup.ts' },
});
