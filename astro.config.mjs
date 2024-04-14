import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import svelte from '@astrojs/svelte';
import sitemap from '@astrojs/sitemap';
import netlify from '@astrojs/netlify';
import storyblok from '@storyblok/astro';
import basicSsl from '@vitejs/plugin-basic-ssl';
import robotsTxt from 'astro-robots-txt';
import { loadEnv } from 'vite';

const { STORYBLOK_TOKEN_PREVIEW, STORYBLOK_TOKEN_PUBLISHED, PUBLIC_ENV } =
  loadEnv('', process.cwd(), '');

// Set up development previews using public environment variables
const isPreviewMode = PUBLIC_ENV === 'preview' || PUBLIC_ENV === 'development';

// https://astro.build/config
export default defineConfig({
  output: isPreviewMode ? 'server' : 'hybrid',
  adapter: netlify({ cacheOnDemandPages: true }),
  site: 'https://webstarsltd.com',
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    svelte(),
    sitemap(),
    storyblok({
      accessToken: isPreviewMode
        ? STORYBLOK_TOKEN_PREVIEW
        : STORYBLOK_TOKEN_PUBLISHED,
      bridge: isPreviewMode,
      components: {
        page: 'components/storyblok/page',
        'rich-text': 'components/storyblok/rich-text',
        grid: 'components/storyblok/grid',
        divider: 'components/storyblok/divider',
        'image-item': 'components/storyblok/image-item',
      },
      apiOptions: {
        region: 'eu',
      },
    }),
    robotsTxt({
      policy: [
        {
          userAgent: '*',
          disallow: isPreviewMode ? '/' : '',
        },
      ],
    }),
  ],
  vite: {
    plugins: [basicSsl()],
    server: {
      https: true,
    },
  },
});
