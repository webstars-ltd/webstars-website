import { storyblokApi } from '@lib/api';
import type { ProductResponse } from '@lib/types';
import type { ISbStoriesParams } from '@storyblok/js';

const generateDefaultParameters = (
  page = 1,
  per_page = 100
): ISbStoriesParams => ({
  starts_with: 'products/',
  sort_by: 'content.order_date:desc',
  content_type: 'product',
  excluding_fields: 'content,quote,pricing_table',
  resolve_relations: [],
  page,
  per_page,
});

type RequestOptions = {
  page: number;
  count: number;
};

export const getProducts = async (
  options: RequestOptions
): Promise<ProductResponse> => {
  const params = generateDefaultParameters(
    options.page ?? 1,
    options.count ?? 100
  );

  const { data, headers } = await storyblokApi('cdn/stories', params);

  const headersObj = headers as { [key: string]: any };
  const count = parseInt(headersObj['total'] ?? '0', 10);

  return {
    products: data.stories,
    count,
  };
};
