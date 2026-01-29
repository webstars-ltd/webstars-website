//export const prerender = false;

import type { APIRoute, APIContext } from 'astro';
import { getWhispers } from '@lib/api';

export const GET: APIRoute = async ({ url }: APIContext) => {
  const whispers = await getWhispers({
    page: 1,
    count: 100,
  });

  return new Response(JSON.stringify(whispers), {
    headers: {
      'Cache-Control': 'public, max-age=300, s-maxage=3600',
      'Netlify-CDN-Cache-Control':
        'public, s-maxage=604800, stale-while-revalidate=604800',
    },
  });
};
