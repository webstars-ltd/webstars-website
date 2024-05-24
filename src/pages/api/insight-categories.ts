//export const prerender = false;

import type { APIRoute, APIContext } from 'astro';
import { getInsightCategories } from '@lib/api';

export const GET: APIRoute = async ({ url }: APIContext) => {
  const categories = await getInsightCategories();

  return new Response(JSON.stringify(categories), {
    headers: {
      'Cache-Control': 'public, max-age=300, s-maxage=3600',
      'Netlify-CDN-Cache-Control':
        'public, s-maxage=604800, stale-while-revalidate=604800',
    },
  });
};
