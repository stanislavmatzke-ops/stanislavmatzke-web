import { Lang } from './types';

const MONTHS: Record<Lang, string[]> = {
  cs: ['ledna', 'února', 'března', 'dubna', 'května', 'června', 'července', 'srpna', 'září', 'října', 'listopadu', 'prosince'],
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
};

/**
 * '2026-10-13' → '13. října 2026' / '13 October 2026'.
 * Formátuje přímo z ISO řetězce, ne přes new Date(): žádné časové pásmo, server i prohlížeč
 * vykreslí totéž (jinak by hydratace nesouhlasila).
 */
export function formatDate(iso: string, lang: Lang): string {
  const [y, m, d] = iso.split('-').map(Number);
  const month = MONTHS[lang][m - 1];
  return lang === 'en' ? `${d} ${month} ${y}` : `${d}. ${month} ${y}`;
}

/** 6 → '6 minut čtení' / '6 min read'. */
export function readTime(minutes: number, lang: Lang): string {
  if (lang === 'en') return `${minutes} min read`;
  const word = minutes === 1 ? 'minuta' : minutes >= 2 && minutes <= 4 ? 'minuty' : 'minut';
  return `${minutes} ${word} čtení`;
}
