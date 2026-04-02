import { defineConfig } from 'vitest/config';
import '@angular/compiler';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./setup.vitest.ts'],
  },
});
