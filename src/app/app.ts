import { DOCUMENT, Component, inject } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header';
import { Footer } from './layout/footer';
import { SeoService } from './core/seo.service';
import { I18n } from './i18n/i18n.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  template: `
    <a class="skip-link" href="#obsah">{{ i18n.t().nav.skip }}</a>
    <app-header />
    <main id="obsah">
      <router-outlet />
    </main>
    <app-footer />
  `,
})
export class App {
  protected readonly i18n = inject(I18n);

  constructor() {
    inject(SeoService); // spustí aktualizaci titulku a meta značek

    // Router při skoku na kotvu (#konzultace) ignoruje CSS scroll-margin,
    // proto mu odsazení předáme sami: výška sticky hlavičky + kousek vzduchu.
    const doc = inject(DOCUMENT);
    inject(ViewportScroller).setOffset(() => {
      const header = doc.querySelector('.site-header');
      return [0, (header?.getBoundingClientRect().height ?? 72) + 24];
    });
  }
}
