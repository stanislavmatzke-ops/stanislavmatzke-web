import { RenderMode, ServerRoute } from '@angular/ssr';
import { AREA_SEGMENT, CONTENT_PAGE_KEYS, Lang, PageKey, PATHS } from './i18n/types';
import { AREAS, ARTICLES, PAGES, STUDIES } from './content/content.generated';

/**
 * Předgenerování (prerender): každá stránka v obou jazycích se při buildu uloží jako hotové HTML
 * se správným titulkem, popisem a Open Graph značkami – kvůli vyhledávačům a náhledům odkazů.
 * Články, studie a oblasti se berou z obsahu (content/ → content.generated.ts).
 * Neznámé adresy (404) se vykreslí až v prohlížeči.
 */
const prefixed = (lang: Lang, path: string) => (lang === 'en' ? (path ? `en/${path}` : 'en') : path);
const LANGS: Lang[] = ['cs', 'en'];

const pages: ServerRoute[] = LANGS.flatMap((lang) =>
  (Object.keys(PATHS[lang]) as PageKey[])
    // Stránka z markdownu bez obsahu (koncept v produkčním buildu) se nepředgeneruje.
    .filter((page) => !CONTENT_PAGE_KEYS.includes(page) || PAGES[page])
    .map((page) => ({ path: prefixed(lang, PATHS[lang][page]), renderMode: RenderMode.Prerender })),
);

const bySlug = (lang: Lang): ServerRoute[] => [
  {
    path: prefixed(lang, `${PATHS[lang].articles}/${AREA_SEGMENT[lang]}/:slug`),
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => AREAS.map((a) => ({ slug: a.slug[lang] })),
  },
  {
    path: prefixed(lang, `${PATHS[lang].articles}/:slug`),
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => ARTICLES[lang].map((a) => ({ slug: a.slug })),
  },
  {
    path: prefixed(lang, `${PATHS[lang].projects}/:slug`),
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => STUDIES[lang].map((s) => ({ slug: s.slug })),
  },
];

export const serverRoutes: ServerRoute[] = [...pages, ...bySlug('cs'), ...bySlug('en'), { path: '**', renderMode: RenderMode.Client }];
