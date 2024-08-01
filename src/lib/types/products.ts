import type { MetaFields, SbAsset, SbStoryDefaults } from '.';

export type ProductContent = {
  title: string;
  tagline: string;
  featured_image: SbAsset;
  content: any;
  quote: string;
  quote_name: string;
  author_byline: string;
  author_image: SbAsset;
  body: any[];
  table_header: string;
  table_subheader: string;
  pricing_table: any;
  table_caption: string;
  meta_fields: MetaFields;
};

export type Product = SbStoryDefaults & {
  content: ProductContent;
};

export type ProductResponse = {
  products: Array<Product>;
  count: number;
};
