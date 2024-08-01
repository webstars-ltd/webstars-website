//export const prerender = false;

import type { APIRoute, APIContext } from 'astro';
import { getProjects } from '@lib/api';

export const GET: APIRoute = async ({ url }: APIContext) => {
  const projects = await getProjects({
    page: 1,
    count: 100,
  });

  return new Response(JSON.stringify(projects), {
    headers: {
      'Cache-Control': 'public, max-age=300, s-maxage=3600',
      'Netlify-CDN-Cache-Control':
        'public, s-maxage=604800, stale-while-revalidate=604800',
    },
  });
};
