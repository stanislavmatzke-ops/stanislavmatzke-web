export type Lang = 'cs' | 'en';

/** Stránky webu. Klíč = interní název, hodnota = adresa v daném jazyce. */
export const PATHS = {
  cs: {
    home: '',
    services: 'sluzby',
    ai: 'prace-s-ai',
    jobScout: 'projekty/job-scout',
    references: 'reference',
    about: 'o-mne',
    contact: 'kontakt',
    privacy: 'ochrana-osobnich-udaju',
  },
  en: {
    home: '',
    services: 'services',
    ai: 'working-with-ai',
    jobScout: 'projects/job-scout',
    references: 'references',
    about: 'about',
    contact: 'contact',
    privacy: 'privacy',
  },
} as const;

export type PageKey = keyof typeof PATHS.cs;

/** Blok souvislého textu (článek, případová studie, zásady). */
export interface Block {
  kind: 'h2' | 'p' | 'ul' | 'lesson' | 'quote' | 'source';
  text?: string;
  items?: string[];
  href?: string;
}

export interface Meta {
  title: string;
  description: string;
}
