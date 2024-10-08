import type { SbAsset, SbStoryDefaults } from '.';

export type ProductContent = {
  title: string;
  list_title: string;
  tagline: string;
  product_type: string;
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
  meta_title: string;
  meta_description: string;
};

export type Product = SbStoryDefaults & {
  content: ProductContent;
};

export type ProductResponse = {
  products: Array<Product>;
  count: number;
};
