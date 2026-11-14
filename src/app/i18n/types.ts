import routing from './paths.json';

export type Lang = 'cs' | 'en';

/**
 * Stránky webu. Klíč = interní název, hodnota = adresa v daném jazyce.
 * Tabulka je v paths.json, aby ji četl i převod obsahu (scripts/build-content.mjs) – ten z ní
 * generuje sitemap.xml a přesměrování ve staticwebapp.config.json.
 */
export const PATHS: { cs: Record<PageKey, string>; en: Record<PageKey, string> } = { cs: routing.cs, en: routing.en };

export type PageKey = keyof typeof routing.cs;
/** Stránky, jejichž text je v markdownu (content/stranky). Bez obsahu (koncept v produkčním buildu) se nepředgenerují. */
export const CONTENT_PAGE_KEYS = routing.contentPages as PageKey[];
/** Část adresy stránky oblasti: /clanky/tema/<oblast>, /en/articles/topic/<area>. */
export const AREA_SEGMENT: Record<Lang, string> = routing.areaSegment;

/** Stránka, která není v PATHS: článek, případová studie, oblast článků (adresa podle slugu) a 404. */
export type AnyPage = PageKey | 'article' | 'study' | 'area' | 'notFound';

/** Položka ve vizuálních blocích (časová osa, karty, srovnání, fakta). */
export interface Entry {
  label?: string;
  title: string;
  text?: string;
  /** U časové osy: zvýrazněná etapa (v markdownu <!-- aktuální etapa -->). */
  current?: boolean;
}

/**
 * Blok souvislého textu (článek, případová studie, stránka, zásady).
 * V textu odstavců, seznamů, tabulek a poučení funguje **tučně**, *kurzíva*, `kód`
 * a [odkaz](/cesta) nebo [odkaz](https://…) – viz shared/inline.ts.
 */
export interface Block {
  kind:
    | 'h2'
    | 'h3'
    | 'p'
    | 'ul'
    | 'ol'
    | 'lesson'
    | 'quote'
    | 'source'
    | 'link'
    | 'stages'
    | 'compare'
    | 'cards'
    | 'facts'
    | 'image'
    | 'project'
    | 'table';
  text?: string;
  items?: string[];
  entries?: Entry[];
  /** U 'source' externí adresa, u 'link' a 'project' adresa stránky webu (/clanky/…, /en/projects/…). */
  href?: string;
  /** U 'project': text odkazu. */
  label?: string;
  /** U 'image' a 'project': obrázek. */
  src?: string;
  alt?: string;
  caption?: string;
  /** U 'table': záhlaví a řádky (buňky s inline formátováním). */
  head?: string[];
  rows?: string[][];
}

export interface Meta {
  title: string;
  description: string;
}

/** Společné údaje textů z markdownu (content/). Data jsou ISO 8601 (YYYY-MM-DD). */
interface ContentItem {
  slug: string;
  title: string;
  perex: string;
  /** Meta description pro vyhledávače. */
  description: string;
  /** Titulek stránky a og:title; jinak „<title> – Stanislav Matzke“. */
  ogTitle?: string;
  published: string;
  updated?: string;
  /** stav: koncept – jen v npm start a npm run build:drafts. */
  draft: boolean;
  blocks: Block[];
}

export interface Article extends ContentItem {
  /** Oblast (id = český slug oblasti). */
  area: string;
  readMinutes: number;
  /** Obrázek pro náhled odkazu, např. /img/og-default.jpg. */
  ogImage: string;
  /** Související články podle slugu. */
  related: string[];
  /** Vlastní závěrečná výzva; jinak společná pro všechny články. */
  ctaTitle?: string;
  ctaText?: string;
}

export interface CaseStudy extends ContentItem {
  /** Společné id pro oba jazyky (český slug); slug v adrese se může lišit (payment-matching). */
  id: string;
  readMinutes?: number;
  ogImage: string;
  related: string[];
  ctaTitle?: string;
  ctaText?: string;
  /** Tlačítka v hlavičce, první je primární. */
  buttons: { text: string; href: string }[];
  image: { src: string; alt: string; caption?: string };
  /** Čísla v hlavičce: title = hodnota, text = popis. */
  stats: Entry[];
}

export type ContentPage = ContentItem;

export interface Area {
  /** Neměnné id = český slug. */
  id: string;
  slug: Record<Lang, string>;
  name: Record<Lang, string>;
  intro: Record<Lang, string>;
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
