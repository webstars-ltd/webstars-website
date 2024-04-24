//export const prerender = false;

import type { APIRoute, APIContext } from 'astro';
import { getInsights } from '@lib/api';

export const GET: APIRoute = async ({ url }: APIContext) => {
  const insights = await getInsights({
    page: 1,
    count: 100,
  });

  return new Response(JSON.stringify(insights));
};
