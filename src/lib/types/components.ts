import type { SbAsset } from './storyblok';

export type CallToActionContent = {
  title: string;
  intro: string;
  type: string;
  download_item: string;
  image: SbAsset;
  background_color_hex: string;
};
