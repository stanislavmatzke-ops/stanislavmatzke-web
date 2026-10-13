import { RenderMode, ServerRoute } from '@angular/ssr';
import { cs } from './i18n/cs';
import { Lang, PageKey, PATHS } from './i18n/types';

/**
 * Předgenerování (prerender): každá stránka v obou jazycích se při buildu uloží jako hotové HTML
 * se správným titulkem, popisem a Open Graph značkami – kvůli vyhledávačům a náhledům odkazů.
 * Neznámé adresy (404) se vykreslí až v prohlížeči.
 */
const prefixed = (lang: Lang, path: string) => (lang === 'en' ? (path ? `en/${path}` : 'en') : path);

const pages: ServerRoute[] = (['cs', 'en'] as Lang[]).flatMap((lang) =>
  (Object.keys(PATHS[lang]) as PageKey[]).map((page) => ({
    path: prefixed(lang, PATHS[lang][page]),
    renderMode: RenderMode.Prerender,
  })),
);

const articleSlugs = async () => cs.articles.items.map((a) => ({ slug: a.slug }));

export const serverRoutes: ServerRoute[] = [
  ...pages,
  { path: `${PATHS.cs.articles}/:slug`, renderMode: RenderMode.Prerender, getPrerenderParams: articleSlugs },
  { path: `en/${PATHS.en.articles}/:slug`, renderMode: RenderMode.Prerender, getPrerenderParams: articleSlugs },
  { path: '**', renderMode: RenderMode.Client },
];
