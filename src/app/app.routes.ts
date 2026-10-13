import { Routes } from '@angular/router';
import { Lang, PageKey, PATHS } from './i18n/types';
import { HomePage } from './pages/home';
import { ServicesPage } from './pages/services';
import { ArticlesPage } from './pages/articles';
import { ArticlePage } from './pages/article';
import { JobScoutPage } from './pages/job-scout';
import { ReferencesPage } from './pages/references';
import { AboutPage } from './pages/about';
import { ContactPage } from './pages/contact';
import { PrivacyPage } from './pages/privacy';
import { NotFoundPage } from './pages/not-found';

const components: Record<PageKey, Routes[number]['component']> = {
  home: HomePage,
  services: ServicesPage,
  articles: ArticlesPage,
  jobScout: JobScoutPage,
  references: ReferencesPage,
  about: AboutPage,
  contact: ContactPage,
  privacy: PrivacyPage,
};

const prefixed = (lang: Lang, path: string) => (lang === 'en' ? (path ? `en/${path}` : 'en') : path);

/** Každá stránka existuje česky (bez prefixu) a anglicky (/en/...); články mají adresu podle slugu. */
function routesFor(lang: Lang): Routes {
  const pages: Routes = (Object.keys(components) as PageKey[]).map((page) => ({
    path: prefixed(lang, PATHS[lang][page]),
    pathMatch: 'full',
    component: components[page],
    data: { lang, page },
  }));
  pages.push({
    path: prefixed(lang, `${PATHS[lang].articles}/:slug`),
    component: ArticlePage,
    data: { lang, page: 'article' },
  });
  return pages;
}

export const routes: Routes = [
  ...routesFor('cs'),
  ...routesFor('en'),
  { path: 'en', children: [{ path: '**', component: NotFoundPage, data: { lang: 'en', page: 'notFound' } }] },
  { path: '**', component: NotFoundPage, data: { lang: 'cs', page: 'notFound' } },
];
