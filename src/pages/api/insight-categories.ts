//export const prerender = false;

import type { APIRoute, APIContext } from 'astro';
import { getInsightCategories } from '@lib/api';

export const GET: APIRoute = async ({ url }: APIContext) => {
  const categories = await getInsightCategories();

  return new Response(JSON.stringify(categories));
};
