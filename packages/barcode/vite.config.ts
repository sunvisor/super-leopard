import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    sourcemap: true,
    lib: {
      entry: './src/index.ts',
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: [],
      output: [
        {
          format: "es",
          preserveModules: false,
          entryFileNames: '[name].mjs',
        },
        {
          format: "cjs",
          preserveModules: false,
          entryFileNames: '[name].cjs',
        }
      ]
    },
    outDir: 'dist',
  },
  plugins: [
    dts({
      tsconfigPath: './tsconfig.json',
      outDir: 'dist',
      insertTypesEntry: true,
      exclude: ['node_modules', '**/*.test.ts', '**/*.test.tsx'],
    })
  ],
});
