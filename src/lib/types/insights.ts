import type { MetaFields, SbAsset, SbStoryDefaults } from '.';

export type InsightContent = {
  title: string;
  tagline: string;
  featured_image: SbAsset;
  content: any;
  categories: string[];
  author_byline: string;
  author_image: SbAsset;
  body: any[];
  meta_fields: MetaFields;
};

export type Insight = SbStoryDefaults & {
  content: InsightContent;
};

export type InsightResponse = {
  insights: Array<Insight>;
  count: number;
};