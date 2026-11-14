import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18n } from '../i18n/i18n.service';
import { Blocks } from '../shared/blocks';
import { CtaBand } from '../shared/cta-band';

/** Stránka, jejíž text je v markdownu (content/stranky): Důvěrnost a ochrana dat, Otázky a odpovědi. */
@Component({
  selector: 'app-content-page',
  imports: [Blocks, CtaBand, RouterLink],
  template: `
    @let t = i18n.t();
    @if (i18n.contentPage(); as p) {
      <section class="page-head page-head--pattern">
        <div class="container container--narrow stack stack--sm">
          <h1>{{ p.title }}</h1>
          <p class="lead">{{ p.perex }}</p>
        </div>
      </section>
      <div class="container container--narrow prose section section--flush-top">
        <app-blocks [blocks]="i18n.body()" [lessonLabel]="t.common.lesson" />
      </div>
      <app-cta-band [title]="t.articles.ctaTitle" [text]="t.articles.ctaText" />
    } @else {
      <section class="page-head page-head--center">
        <div class="container container--narrow stack">
          <span class="eyebrow">404</span>
          <h1>{{ t.notFound.title }}</h1>
          <p class="lead">{{ t.notFound.text }}</p>
          <div class="actions">
            <a class="btn btn--primary" [routerLink]="i18n.link('home')">{{ t.notFound.back }}</a>
          </div>
        </div>
      </section>
    }
  `,
})
export class ContentPageView {
  protected readonly i18n = inject(I18n);
}
