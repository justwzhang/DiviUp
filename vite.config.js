import {defineConfig} from 'vite';

export default defineConfig({
    build:{
        outDir: './vite-assets',
        emptyOutDir: true,
        assetsDir:'',
        rollupOptions:{
            input:'./vite-src/js/main.js',
            output:{
                assetFileNames:'[name][extname]',
                chunkFileNames:'[name].js',
                entryFileNames:'[name].js'
            }
        }
    },
    css: {
        preprocessorOptions: {
          scss: {
            additionalData: `@use "./src/styles/variables.scss" as *;`,
          },
        },
      },
});