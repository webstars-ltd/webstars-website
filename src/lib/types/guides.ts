import type { MetaFields, SbAsset, SbStoryDefaults } from '.';

export type GuideContent = {
  title: string;
  tagline: string;
  featured_image: SbAsset;
  content: any;
  body: any[];
  meta_fields: MetaFields;
};

export type Guide = SbStoryDefaults & {
  content: GuideContent;
};
