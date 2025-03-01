import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import dts from 'vite-plugin-dts';


export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      tsconfigPath: 'tsconfig.json',
      outDir: 'dist',
      exclude: ['**/*.test.ts', '**/*.test.tsx', "**/*.stories.tsx", "**/__test_assets__"],
    }),
  ],
  build: {
    outDir: 'dist',
    lib: {
      entry: './src/index.ts',
      name: 'SuperLeopardComponent',
      formats: ['es'],
      fileName: 'index.js',
    },
    rollupOptions: {
      external: [
        /react.*$/,
        /react-dom.*$/,
        /jotai.*$/,
        /^@bwip-js.*$/,
        /^@dnd-kit\/.*$/,
        /^@mui\/.*$/,
        /^@emotion\/.*$/,
        /^@svgdotjs\/.*$/,
        /\.test\.ts$/,
        /\.stories\.ts$/,
      ],
      output: {
        preserveModules: false,
        entryFileNames: '[name].js',
      },
    },
    sourcemap: true,
  },
});
