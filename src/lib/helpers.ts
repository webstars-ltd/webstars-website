import type { SbLink, SbContent } from '@lib/types';

const PUBLIC_ENV = import.meta.env.PUBLIC_ENV;
export const isPreviewMode =
  PUBLIC_ENV === 'preview' || PUBLIC_ENV === 'development';

export const linkFinder = (
  content: SbContent,
  links: Array<SbLink>
): string => {
  if (content?.id && links.length > 0) {
    const link = links.find((link) => link.uuid === content.id)?.url;
    return link ? '/' + link : '/';
  }

  if (content?.url) return `/${content.url}`;

  return '/';
};

export const toSentenceCase = (str: string, separator?: string): string => {
  return str
    .split(separator ?? ' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export function isMap<T>(component: any): component is Array<T> {
  if (Array.isArray(component)) return true;

  return false;
}

export function truncate(input: string, length: number) {
  if (!input) return '';
  if (input.length <= length) return input;

  return input.slice(0, length) + '...';
}
