//export const prerender = false;

import type { APIRoute, APIContext } from 'astro';
import { getProjects } from '@lib/api';

export const GET: APIRoute = async ({ url }: APIContext) => {
  const projects = await getProjects({
    page: 1,
    count: 100,
  });

  return new Response(JSON.stringify(projects));
};
