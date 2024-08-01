import type { SbAsset, SbStoryDefaults } from '.';

export type GuideContent = {
  title: string;
  tagline: string;
  featured_image: SbAsset;
  content: any;
  body: any[];
  meta_title: string;
  meta_description: string;
};

export type Guide = SbStoryDefaults & {
  content: GuideContent;
};
