//export const prerender = false;

import type { APIRoute, APIContext } from 'astro';
import { getProducts } from '@lib/api';

export const GET: APIRoute = async ({ url }: APIContext) => {
  const products = await getProducts({
    page: 1,
    count: 100,
  });

  return new Response(JSON.stringify(products));
};
