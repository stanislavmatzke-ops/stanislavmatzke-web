import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18n } from '../i18n/i18n.service';
import { ArticleCard } from '../shared/article-card';
import { AreaFilter } from '../shared/area-filter';
import { CtaBand } from '../shared/cta-band';

/** Stránka oblasti: /clanky/tema/<oblast> – úvod a články oblasti. */
@Component({
  selector: 'app-area',
  imports: [ArticleCard, AreaFilter, CtaBand, RouterLink],
  template: `
    @let t = i18n.t();
    @if (i18n.area(); as area) {
      <section class="page-head page-head--pattern">
        <div class="container stack stack--sm">
          <a class="back-link" [routerLink]="i18n.link('articles')">{{ t.articles.back }}</a>
          <span class="eyebrow">{{ t.articles.eyebrow }}</span>
          <h1>{{ area.name[i18n.lang()] }}</h1>
          <p class="lead">{{ area.intro[i18n.lang()] }}</p>
        </div>
      </section>

      <section class="section section--flush-top">
        <div class="container stack">
          <div class="list-tools"><app-area-filter [active]="area.id" /></div>
          <div class="article-list">
            @for (a of articles(); track a.slug) {
              <app-article-card [article]="a" />
            }
          </div>
        </div>
      </section>

      <app-cta-band [title]="t.articles.ctaTitle" [text]="t.articles.ctaText" />
    } @else {
      <section class="page-head page-head--center">
        <div class="container container--narrow stack">
          <span class="eyebrow">404</span>
          <h1>{{ t.notFound.title }}</h1>
          <p class="lead">{{ t.notFound.text }}</p>
          <div class="actions">
            <a class="btn btn--primary" [routerLink]="i18n.link('articles')">{{ t.articles.back }}</a>
          </div>
        </div>
      </section>
    }
  `,
})
export class AreaPage {
  protected readonly i18n = inject(I18n);
  protected readonly articles = computed(() => {
    const area = this.i18n.area();
    return area ? this.i18n.articles().filter((a) => a.area === area.id) : [];
  });
}
