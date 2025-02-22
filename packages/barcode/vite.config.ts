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
        /^@bwip-js.*$/,
        /^@sunvisor.*$/,
      ],
      output: {
        preserveModules: true,
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
      exclude: ['node_modules', '**/*.test.ts', '**/*.test.tsx'],
    })
  ],
});
