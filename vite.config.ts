import { defineConfig } from 'vite';

export default defineConfig({
  //assetsInclude: ['**/*.jpg', '**/*.glb'],
  base: '/',
  build: {
    outDir: 'dist', // Specify the output directory for the production build
  },
});