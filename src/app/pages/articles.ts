import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18n } from '../i18n/i18n.service';
import { CtaBand } from '../shared/cta-band';

@Component({
  selector: 'app-articles',
  imports: [RouterLink, CtaBand],
  template: `
    @let t = i18n.t();
    @let a = t.articles;
    <section class="page-head page-head--pattern">
      <div class="container stack stack--sm">
        <span class="eyebrow">{{ a.eyebrow }}</span>
        <h1>{{ a.title }}</h1>
        <p class="lead">{{ a.lead }}</p>
      </div>
    </section>

    <section class="section">
      <div class="container article-list">
        @for (item of a.items; track item.slug; let i = $index) {
          <a class="article-card" [routerLink]="i18n.articleLink(item.slug)">
            <span class="article-card__num">{{ pad(i + 1) }}</span>
            <div class="article-card__body">
              <span class="article-card__meta">{{ item.date }} · {{ item.readTime }}</span>
              <h2>{{ item.title }}</h2>
              <p>{{ item.perex }}</p>
              <span class="article-card__more">{{ t.common.readArticle }}</span>
            </div>
          </a>
        }
      </div>
    </section>

    <app-cta-band [title]="a.ctaTitle" [text]="a.ctaText" />
  `,
})
export class ArticlesPage {
  protected readonly i18n = inject(I18n);
  protected pad(n: number): string {
    return n.toString().padStart(2, '0');
  }
}
