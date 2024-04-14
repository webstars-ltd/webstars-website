import { type SbBlokData } from '@storyblok/astro';

export type LinkItem = {
  id: string;
  url: string;
  email?: string;
  target: string;
  linktype: string;
  fieldtype: string;
  cached_url: string;
};

export type MenuLinkItem = {
  _uid: string;
  link: LinkItem;
  sub_menu: Array<MenuLinkItem>;
  component: string;
  link_text: string;
};

export type SbContent = {
  id: string;
  url: string;
};

export type SbLink = {
  name: string;
  id: number;
  uuid: string;
  slug: string;
  url: string;
  full_slug: string;
};

export type DefaultComponentProps = Record<string, any> & {
  blok: SbBlokData;
  id: number;
  uuid: string;
};

export type ComponentPropsWithLinks = DefaultComponentProps & {
  links: Array<SbLink>;
};

export type ComponentPropsWithLinksAndDates = ComponentPropsWithLinks & {
  publishedDate: string;
  updatedDate: string;
};

export type ComponentPropsWithLinksDatesAndStyles =
  ComponentPropsWithLinksAndDates & {
    styles: string;
  };

export type ComponentProps =
  | DefaultComponentProps
  | ComponentPropsWithLinks
  | ComponentPropsWithLinksAndDates
  | ComponentPropsWithLinksDatesAndStyles;

export type SbSocialLink = {
  _uid: string;
  link: LinkItem;
  component: string;
  social_network: string;
  _editable: string;
};

export type SbPageDataOptions = {
  slug: string;
  resolution: 'link' | 'url' | 'story' | '0' | '1' | 'link';
  relations: Array<string>;
};

export type SbStoryDefaults = {
  name: string;
  created_at: string;
  published_at: string | null;
  id: number;
  uuid: string;
  content: unknown;
  slug: string;
  full_slug: string;
  meta_data: unknown | null;
  first_published_at: string | null;
  path: string | null;
  parent_id: number | null;
};

export type SbAsset = {
  id: number;
  alt: string;
  name: string;
  focus: string;
  title: string;
  source: string;
  filename: string;
  copyright: string;
  fieldtype: string;
  meta_data: object;
  is_external_url: boolean;
};

export type SbDatasourceEntry = {
  id: number;
  name: string;
  value: string;
  dimension_value: null | unknown;
};
