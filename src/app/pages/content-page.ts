import { Component, computed, inject } from '@angular/core';
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
        <app-blocks [blocks]="blocks().main" [lessonLabel]="t.common.lesson" />
        @if (i18n.page() === 'faq') {
          <!-- Dočasně: otázky přesunuté ze stránky Kontakt, dokud je editor nezapracuje do content/stranky/otazky.md. -->
          @for (item of t.faqPage.extra; track item.q) {
            <h2>{{ item.q }}</h2>
            <p>{{ item.a }}</p>
          }
        }
        <app-blocks [blocks]="blocks().closing" [lessonLabel]="t.common.lesson" />
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

  /**
   * Text stránky rozdělený kvůli dočasně vloženým otázkám z Kontaktu: na stránce Otázky jde poslední
   * odstavec editora („Nenašli jste svou otázku?…“) až za ně. Jinde je celý text v `main`.
   */
  protected readonly blocks = computed(() => {
    const body = this.i18n.body();
    const last = body.at(-1);
    return this.i18n.page() === 'faq' && last?.kind === 'p'
      ? { main: body.slice(0, -1), closing: [last] }
      : { main: body, closing: [] };
  });
}
