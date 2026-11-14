import { inject } from '@angular/core';
import { ResolveFn, Routes } from '@angular/router';
import { I18n } from './i18n/i18n.service';
import { AREA_SEGMENT, Lang, PageKey, PATHS } from './i18n/types';
import { HomePage } from './pages/home';
import { ServicesPage } from './pages/services';
import { ArticlesPage } from './pages/articles';
import { ArticlePage } from './pages/article';
import { AreaPage } from './pages/area';
import { ProjectsPage } from './pages/projects';
import { StudyPage } from './pages/study';
import { ReferencesPage } from './pages/references';
import { AboutPage } from './pages/about';
import { ContactPage } from './pages/contact';
import { PrivacyPage } from './pages/privacy';
import { ContentPageView } from './pages/content-page';
import { NotFoundPage } from './pages/not-found';

const components: Record<PageKey, Routes[number]['component']> = {
  home: HomePage,
  services: ServicesPage,
  articles: ArticlesPage,
  projects: ProjectsPage,
  references: ReferencesPage,
  about: AboutPage,
  contact: ContactPage,
  privacy: PrivacyPage,
  confidentiality: ContentPageView,
  faq: ContentPageView,
  forEmployers: ContentPageView,
};

/** Před zobrazením článku, studie nebo stránky z markdownu načte její text (samostatný chunk). */
const body: ResolveFn<boolean> = async (route) => {
  await inject(I18n).loadBody(I18n.bodyKey(route.data['page'], route.data['lang'], route.paramMap.get('slug')));
  return true;
};

const prefixed = (lang: Lang, path: string) => (lang === 'en' ? (path ? `en/${path}` : 'en') : path);

/**
 * Každá stránka existuje česky (bez prefixu) a anglicky (/en/...).
 * Články, studie a oblasti mají adresu podle slugu z markdownu (content/).
 */
function routesFor(lang: Lang): Routes {
  const pages: Routes = (Object.keys(components) as PageKey[]).map((page) => ({
    path: prefixed(lang, PATHS[lang][page]),
    pathMatch: 'full',
    component: components[page],
    data: { lang, page },
    ...(components[page] === ContentPageView ? { resolve: { body } } : {}),
  }));
  pages.push(
    {
      path: prefixed(lang, `${PATHS[lang].articles}/${AREA_SEGMENT[lang]}/:slug`),
      component: AreaPage,
      data: { lang, page: 'area' },
    },
    {
      path: prefixed(lang, `${PATHS[lang].articles}/:slug`),
      component: ArticlePage,
      data: { lang, page: 'article' },
      resolve: { body },
    },
    {
      path: prefixed(lang, `${PATHS[lang].projects}/:slug`),
      component: StudyPage,
      data: { lang, page: 'study' },
      resolve: { body },
    },
  );
  return pages;
}

export const routes: Routes = [
  ...routesFor('cs'),
  ...routesFor('en'),
  { path: 'en', children: [{ path: '**', component: NotFoundPage, data: { lang: 'en', page: 'notFound' } }] },
  { path: '**', component: NotFoundPage, data: { lang: 'cs', page: 'notFound' } },
];
