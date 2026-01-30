import type { SbAsset, SbStoryDefaults } from '.';

export type WhisperContent = {
  title: string;
  tagline: string;
  featured_image?: SbAsset;
  intro: string;
  content: any;
  quote: any;
  author_byline: string;
  meta_title: string;
  meta_description: string;
};

export type Whisper = SbStoryDefaults & {
  content: WhisperContent;
};

export type WhisperResponse = {
  whispers: Array<Whisper>;
  count: number;
};
