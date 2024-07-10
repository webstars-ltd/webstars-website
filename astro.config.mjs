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
  output: 'server',
  adapter: netlify({ cacheOnDemandPages: true }),
  site: 'https://webstarsltd.com',
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },
  redirects: {
    '/guides': {
      status: 301,
      destination: '/',
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
        'client-images-grid': 'components/storyblok/client-images-grid',
        'staff-profile': 'components/storyblok/staff-profile',
        'team-member-grid': 'components/storyblok/team-member-grid',
        project: 'components/storyblok/project',
        insight: 'components/storyblok/insight',
        product: 'components/storyblok/product',
        guide: 'components/storyblok/guide',
        selected_insights: 'components/storyblok/selected-insights',
        selected_projects: 'components/storyblok/selected-projects',
        call_to_action: 'components/storyblok/call-to-action',
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
