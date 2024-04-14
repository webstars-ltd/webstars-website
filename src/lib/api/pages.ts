import { storyblokApi } from '@lib/api/storyblok';
import { isPreviewMode } from '@lib/helpers';
import type { SbPageDataOptions } from '@lib/types/storyblok';
import type { ISbStoriesParams } from '@storyblok/js';

export const getSbPagePaths = async (options?: ISbStoriesParams) => {
  const { data } = await storyblokApi('cdn/stories', options);
  let stories = data.stories;
  stories = Object.values(stories);

  return stories;
};

export const getStaticPageParams = async (options?: ISbStoriesParams) => {
  const stories = await getSbPagePaths(options);

  const returnParams = stories.map((story: any) => {
    return {
      params: {
        slug:
          story.slug === 'home'
            ? undefined
            : story.full_slug.replace(options?.starts_with ?? '', ''),
      },
    };
  });

  return returnParams;
};

export const isPageNotFound = async (
  slug: string,
  options?: ISbStoriesParams
) => {
  if (isPreviewMode) {
    const stories = await getSbPagePaths(options);

    // console.log('slug', slug);
    // console.log('page not found stories', stories);

    const matchedLink = stories.find(
      (story: any) => story.full_slug === slug || story.slug === slug
    );
    return !matchedLink;
  }

  return false;
};

export const getStoryblokPageData = async ({
  slug,
  resolution = 'url',
  relations = [],
}: SbPageDataOptions) => {
  // todo: should this redirect to a 404 in the caller component/page if the result is undefined?

  return await storyblokApi(
    `cdn/stories/${slug === undefined ? 'home' : slug}`,
    {
      resolve_links: resolution,
      resolve_relations: relations,
    }
  );
};
