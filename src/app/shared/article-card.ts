import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18n } from '../i18n/i18n.service';
import { Article, CaseStudy } from '../i18n/types';

/** Karta v seznamu článků: článek (datum · doba čtení · oblast), nebo případová studie (vede do Projektů). */
@Component({
  selector: 'app-article-card',
  imports: [RouterLink],
  template: `
    @let t = i18n.t();
    @if (article(); as a) {
      <a class="article-card" [routerLink]="i18n.articleLink(a.slug)">
        <div class="article-card__body">
          <span class="article-card__meta">{{ i18n.date(a.published) }} · {{ i18n.readTime(a.readMinutes) }}@if (areaName(); as area) { · {{ area }}}</span>
          <h2>{{ a.title }}</h2>
          <p>{{ a.perex }}</p>
          <span class="article-card__more">{{ t.common.readArticle }}</span>
        </div>
      </a>
    }
    @if (study(); as s) {
      <a class="article-card article-card--study" [routerLink]="i18n.studyLink(s.id)">
        <div class="article-card__body">
          <span class="article-card__meta"><span class="pill pill--small">{{ t.articles.caseStudy }}</span> {{ i18n.date(s.published) }}@if (s.readMinutes) { · {{ i18n.readTime(s.readMinutes) }}}</span>
          <h2>{{ s.title }}</h2>
          <p>{{ s.perex }}</p>
          <span class="article-card__more">{{ t.projects.caseStudy }}</span>
        </div>
      </a>
    }
  `,
})
export class ArticleCard {
  protected readonly i18n = inject(I18n);
  readonly article = input<Article | null>(null);
  readonly study = input<CaseStudy | null>(null);
  protected readonly areaName = computed(() => {
    const a = this.article();
    return a ? this.i18n.areaById(a.area)?.name[this.i18n.lang()] : undefined;
  });
}
