import { Component, inject } from '@angular/core';
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
  }
}
