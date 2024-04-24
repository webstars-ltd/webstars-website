import { storyblokApi } from '@lib/api';
import type { ProjectResponse } from '@lib/types';
import type { ISbStoriesParams } from '@storyblok/js';

const generateDefaultParameters = (
  page = 1,
  per_page = 100
): ISbStoriesParams => ({
  starts_with: 'projects/',
  sort_by: 'published_at',
  content_type: 'project',
  excluding_fields:
    'objectives_content,features_content,services_content,results_content',
  resolve_relations: [],
  page,
  per_page,
});

type RequestOptions = {
  page: number;
  count: number;
};

export const getProjects = async (
  options: RequestOptions
): Promise<ProjectResponse> => {
  const params = generateDefaultParameters(
    options.page ?? 1,
    options.count ?? 100
  );

  const { data, headers } = await storyblokApi('cdn/stories', params);

  const headersObj = headers as { [key: string]: any };
  const count = parseInt(headersObj['total'] ?? '0', 10);

  return {
    projects: data.stories,
    count,
  };
};
