import { Routes } from '@angular/router';
import { Lang, PageKey, PATHS } from './i18n/types';
import { HomePage } from './pages/home';
import { ServicesPage } from './pages/services';
import { AiPage } from './pages/ai';
import { JobScoutPage } from './pages/job-scout';
import { ReferencesPage } from './pages/references';
import { AboutPage } from './pages/about';
import { ContactPage } from './pages/contact';
import { PrivacyPage } from './pages/privacy';
import { NotFoundPage } from './pages/not-found';

const components: Record<PageKey, Routes[number]['component']> = {
  home: HomePage,
  services: ServicesPage,
  ai: AiPage,
  jobScout: JobScoutPage,
  references: ReferencesPage,
  about: AboutPage,
  contact: ContactPage,
  privacy: PrivacyPage,
};

/** Každá stránka existuje česky (bez prefixu) a anglicky (/en/...). */
function routesFor(lang: Lang): Routes {
  return (Object.keys(components) as PageKey[]).map((page) => {
    const path = PATHS[lang][page];
    return {
      path: lang === 'en' ? (path ? `en/${path}` : 'en') : path,
      pathMatch: 'full',
      component: components[page],
      data: { lang, page },
    };
  });
}

export const routes: Routes = [
  ...routesFor('cs'),
  ...routesFor('en'),
  { path: 'en', children: [{ path: '**', component: NotFoundPage, data: { lang: 'en', page: 'notFound' } }] },
  { path: '**', component: NotFoundPage, data: { lang: 'cs', page: 'notFound' } },
];
