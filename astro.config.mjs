import { defineConfig } from 'astro/config';

export default defineConfig({
  // Change this once the custom domain is bought.
  site: 'https://portfolio-wongers432.vercel.app',
  build: {
    // Keep CSS and JS in files so the Content-Security-Policy can stay strict (no 'unsafe-inline').
    inlineStylesheets: 'never',
  },
  vite: {
    build: { assetsInlineLimit: 0 },
  },
});
