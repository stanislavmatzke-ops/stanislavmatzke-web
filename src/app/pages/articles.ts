import { Component, computed, inject } from '@angular/core';
import { I18n } from '../i18n/i18n.service';
import { Article, CaseStudy } from '../i18n/types';
import { ArticleCard } from '../shared/article-card';
import { AreaFilter } from '../shared/area-filter';
import { CtaBand } from '../shared/cta-band';

@Component({
  selector: 'app-articles',
  imports: [ArticleCard, AreaFilter, CtaBand],
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

    <section class="section section--flush-top">
      <div class="container stack">
        <div class="list-tools">
          <app-area-filter />
          <a class="list-tools__rss" [href]="i18n.link('articles') + '/feed.xml'">{{ a.rss }}</a>
        </div>
        <div class="article-list">
          @for (item of items(); track item.key) {
            <app-article-card [article]="item.article" [study]="item.study" />
          }
        </div>
      </div>
    </section>

    <app-cta-band [title]="a.ctaTitle" [text]="a.ctaText" />
  `,
})
export class ArticlesPage {
  protected readonly i18n = inject(I18n);

  /** Články a případové studie podle data publikace, nejnovější první. */
  protected readonly items = computed(() => {
    const list: { key: string; date: string; article: Article | null; study: CaseStudy | null }[] = [
      ...this.i18n.articles().map((a) => ({ key: `a:${a.slug}`, date: a.published, article: a, study: null })),
      ...this.i18n.studies().map((s) => ({ key: `s:${s.slug}`, date: s.published, article: null, study: s })),
    ];
    return list.sort((x, y) => y.date.localeCompare(x.date) || x.key.localeCompare(y.key));
  });
}
