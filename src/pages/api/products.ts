//export const prerender = false;

import type { APIRoute, APIContext } from 'astro';
import { getProducts } from '@lib/api';

export const GET: APIRoute = async ({ url }: APIContext) => {
  const products = await getProducts({
    page: 1,
    count: 100,
  });

  return new Response(JSON.stringify(products), {
    headers: {
      'Cache-Control': 'public, max-age=300, s-maxage=3600',
      'Netlify-CDN-Cache-Control':
        'public, s-maxage=604800, stale-while-revalidate=604800',
    },
  });
};
