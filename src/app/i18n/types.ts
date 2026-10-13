export type Lang = 'cs' | 'en';

/** Stránky webu. Klíč = interní název, hodnota = adresa v daném jazyce. */
export const PATHS = {
  cs: {
    home: '',
    services: 'sluzby',
    articles: 'clanky',
    jobScout: 'projekty/job-scout',
    references: 'reference',
    about: 'o-mne',
    contact: 'kontakt',
    privacy: 'ochrana-osobnich-udaju',
  },
  en: {
    home: '',
    services: 'services',
    articles: 'articles',
    jobScout: 'projects/job-scout',
    references: 'references',
    about: 'about',
    contact: 'contact',
    privacy: 'privacy',
  },
} as const;

export type PageKey = keyof typeof PATHS.cs;
/** Stránka, která není v PATHS: detail článku (adresa podle slugu) a 404. */
export type AnyPage = PageKey | 'article' | 'notFound';

/** Blok souvislého textu (článek, případová studie, zásady). */
export interface Block {
  kind: 'h2' | 'p' | 'ul' | 'lesson' | 'quote' | 'source' | 'link';
  text?: string;
  items?: string[];
  href?: string;
  /** U kind 'link': odkaz na jiný článek podle slugu. */
  article?: string;
}

export interface Meta {
  title: string;
  description: string;
}

export interface Article {
  /** Část adresy, stejná v obou jazycích: /clanky/<slug>, /en/articles/<slug>. */
  slug: string;
  title: string;
  perex: string;
  date: string;
  readTime: string;
  blocks: Block[];
}

/** Odvětví reference – určuje ikonu. */
export type Sector = 'logistics' | 'health' | 'public' | 'finance' | 'bank' | 'asset' | 'telecom' | 'erp';

export interface Reference {
  name: string;
  project: string;
  years: string;
  sector: Sector;
  sectorLabel: string;
  role: string;
  via: string;
  text: string;
  highlights: string[];
  tags: string[];
}
