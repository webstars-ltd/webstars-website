import { storyblokApi } from '@lib/api';
import type { WhisperResponse } from '@lib/types';
import type { ISbStoriesParams } from '@storyblok/js';

const generateDefaultParameters = (
  page = 1,
  per_page = 100
): ISbStoriesParams => ({
  starts_with: 'webstars-whispers/',
  sort_by: 'published_at',
  content_type: 'whisper',
  excluding_fields: '',
  resolve_relations: [],
  page,
  per_page,
});

type RequestOptions = {
  page: number;
  count: number;
};

export const getWhispers = async (
  options: RequestOptions
): Promise<WhisperResponse> => {
  const params = generateDefaultParameters(
    options.page ?? 1,
    options.count ?? 100
  );

  const { data, headers } = await storyblokApi('cdn/stories', params);

  const headersObj = headers as { [key: string]: any };
  const count = parseInt(headersObj['total'] ?? '0', 10);

  console.log('Fetched whispers:', data);

  return {
    whispers: data.stories,
    count,
  };
};
