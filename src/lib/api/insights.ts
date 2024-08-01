import { storyblokApi } from '@lib/api';
import type { InsightResponse, SbDatasourceEntry } from '@lib/types';
import type { ISbStoriesParams } from '@storyblok/js';

const generateDefaultParameters = (
  page = 1,
  per_page = 100
): ISbStoriesParams => ({
  starts_with: 'insights/',
  sort_by: 'published_at',
  content_type: 'insight',
  excluding_fields: 'content,author_byline,author_image',
  resolve_relations: [],
  page,
  per_page,
});

type RequestOptions = {
  page: number;
  count: number;
};

export const getInsights = async (
  options: RequestOptions
): Promise<InsightResponse> => {
  const params = generateDefaultParameters(
    options.page ?? 1,
    options.count ?? 100
  );

  const { data, headers } = await storyblokApi('cdn/stories', params);

  const headersObj = headers as { [key: string]: any };
  const count = parseInt(headersObj['total'] ?? '0', 10);

  return {
    insights: data.stories,
    count,
  };
};

export const getInsightCategories = async (): Promise<SbDatasourceEntry[]> => {
  const { data } = await storyblokApi('cdn/datasource_entries', {
    datasource: 'insight-categories',
    page: 1,
    per_page: 100,
  });

  return data.datasource_entries;
};
