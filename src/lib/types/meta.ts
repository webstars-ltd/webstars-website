export type ArticleMetaFields = {
  publishedTime?: string;
  modifiedTime?: string;
  expirationTime?: string;
  authors?: Array<string>;
  section?: string; // high-level section name, e.g. 'Technology'
  tags?: Array<string>;
};

export type MetaFields = {
  _uid?: string;
  title: string;
  plugin?: string;
  og_image?: string;
  og_title?: string;
  description: string;
  twitter_image?: string;
  twitter_title?: string;
  og_description?: string;
  twitter_description?: string;
};
