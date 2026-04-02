import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    exclude: ['playwright/**', '**/node_modules/**'],
    coverage: {
      reporter: ['text', 'html', 'lcov', 'json-summary', 'json'],
      reportsDirectory: './coverage',
      reportOnFailure: true,
      exclude: ['playwright/**', '**/*.html'],
      thresholds: {
        global: {
          lines: 90,
          functions: 90,
          statements: 90,
          branches: 80,
        },
      },
    },
  },
});
