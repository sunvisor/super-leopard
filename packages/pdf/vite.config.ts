import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    sourcemap: true,
    lib: {
      entry: './src/index.ts',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: [
        'fs',
        /\.test\.ts$/,
        'pdfkit',
        '__test_assets__',
        'svg-to-pdfkit',
      ],
      output: {
        preserveModules: false,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].[format].js',
      }
    },
    outDir: 'dist',
  },
  plugins: [
    dts({
      tsconfigPath: './tsconfig.json',
      outDir: 'dist',
      insertTypesEntry: true,
      exclude: ['**/*.test.ts', '**/*.test.tsx'],
    })
  ],
});
