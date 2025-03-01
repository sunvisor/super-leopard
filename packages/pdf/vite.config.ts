import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    sourcemap: true,
    lib: {
      entry: './src/index.ts',
      fileName: (format) => `index.${format === "es" ? "mjs" : "cjs"}`
    },
    rollupOptions: {
      external: [
        /@sunvisor\/super-leopard.*$/,
        'fs',
        /\.test\.ts$/,
        'pdfkit',
        '__test_assets__',
        'svg-to-pdfkit',
      ],
      output: [
        {
          format: "es",
          entryFileNames: '[name].mjs',
          dir: "dist",
          preserveModules: true,
        },
        {
          format: "cjs",
          entryFileNames: '[name].cjs',
          dir: "dist",
          preserveModules: true,
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
      exclude: ['**/*.test.ts', '**/*.test.tsx', '**/__test_assets__'],
    })
  ],
});
