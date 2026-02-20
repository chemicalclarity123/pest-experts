// @ts-check
import { defineConfig } from 'astro/config';


import cloudflare from '@astrojs/cloudflare';

import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://pestexperts.co.za',
  output: 'static',
  adapter: cloudflare(),
  integrations: [sitemap({
    filter: (page) => !page.includes('/test-sanity')
  })],

  vite: {
    plugins: [tailwindcss()]
  }
});