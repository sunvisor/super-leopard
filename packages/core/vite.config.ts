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
      external: [
        '__test_assets__',
        /\.test\.ts$/
      ],
      output: [
        {
          format: "es",
          preserveModules: true,
          preserveModulesRoot: 'src',
          entryFileNames: '[name].mjs',
        },
        {
          format: "cjs",
          preserveModules: true,
          preserveModulesRoot: 'src',
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
      exclude: ['**/*.test.ts', '**/*.test.tsx', '**/__test_assets__'],
    })
  ],
});
