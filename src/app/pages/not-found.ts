import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18n } from '../i18n/i18n.service';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  template: `
    @let n = i18n.t().notFound;
    <section class="page-head page-head--center">
      <div class="container container--narrow stack">
        <span class="eyebrow">404</span>
        <h1>{{ n.title }}</h1>
        <p class="lead">{{ n.text }}</p>
        <div class="actions">
          <a class="btn btn--primary" [routerLink]="i18n.link('home')">{{ n.back }}</a>
        </div>
      </div>
    </section>
  `,
})
export class NotFoundPage {
  protected readonly i18n = inject(I18n);
}
