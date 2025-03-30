import { defineConfig } from 'vitest/config'
import * as path from 'node:path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  }
});
