import * as sb from '@storyblok/astro';
import type { ISbStoriesParams } from '@storyblok/js';
import { isPreviewMode } from '@lib/helpers';

export const storyblokApi = (slug: string, options: ISbStoriesParams = {}) => {
  const api = sb.useStoryblokApi();

  return api.get(slug, {
    version: isPreviewMode ? 'draft' : 'published',
    ...options,
  });
};
