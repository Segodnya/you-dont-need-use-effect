// @ts-check

import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';

// https://astro.build/config
export default defineConfig({
  site: 'https://segodnya.github.io',
  base: '/you-dont-need-use-effect',

  vite: {
    // @ts-expect-error - Tailwind Vite plugin has minor type incompatibility with Vite 6
    plugins: [tailwindcss()],
    build: {
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              if (id.includes('preact')) {
                return 'vendor-preact';
              }
              if (id.includes('alpinejs')) {
                return 'vendor-alpine';
              }
              if (id.includes('ogl')) {
                return 'vendor-ogl';
              }
              return 'vendor';
            }
            if (id.includes('/slides/')) {
              const match = id.match(/(\d{2})-(\w+)Slide/);
              if (match) {
                const slideNum = parseInt(match[1]);
                const chunkNum = Math.floor((slideNum - 1) / 3);
                return `slides-${chunkNum}`;
              }
            }
          },
        },
      },
      chunkSizeWarningLimit: 1000,
      cssCodeSplit: true,
    },
    optimizeDeps: {
      include: ['alpinejs', 'preact', 'preact/hooks'],
      exclude: ['ogl'],
    },
  },

  integrations: [preact()],

  build: {
    inlineStylesheets: 'auto',
  },

  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
});
