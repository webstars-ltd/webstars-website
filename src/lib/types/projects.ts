import type { MetaFields, SbAsset, SbStoryDefaults } from '.';

export type ProjectContent = {
  client: string;
  list_title: string; // this is used when they want a custom title on the list page, otherwise the regular title is used
  title: string;
  subtitle: string;
  featured_image: SbAsset;
  featured_image_lp: SbAsset;
  intro: string;
  objectives_content: any;
  features_content: any;
  services_content: any;
  results_content: any;
  related_projects: Project[];
  meta_fields: MetaFields;
};

export type Project = SbStoryDefaults & {
  content: ProjectContent;
};

export type ProjectResponse = {
  projects: Array<Project>;
  count: number;
};
