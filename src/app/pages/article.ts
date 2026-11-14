import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18n } from '../i18n/i18n.service';
import { SITE } from '../core/site';
import { Blocks } from '../shared/blocks';
import { CtaBand } from '../shared/cta-band';

@Component({
  selector: 'app-article',
  imports: [Blocks, CtaBand, RouterLink],
  template: `
    @let t = i18n.t();
    @if (i18n.article(); as a) {
      <article>
        <header class="page-head page-head--pattern">
          <div class="container container--narrow stack stack--sm">
            <a class="back-link" [routerLink]="i18n.link('articles')">{{ t.articles.back }}</a>
            <span class="eyebrow">{{ t.articles.eyebrow }}</span>
            <h1>{{ a.title }}</h1>
            <p class="lead">{{ a.perex }}</p>
            <p class="article-meta">
              {{ t.articles.published }} <time [attr.datetime]="a.published">{{ i18n.date(a.published) }}</time>
              @if (a.updated) { · {{ t.articles.updated }} <time [attr.datetime]="a.updated">{{ i18n.date(a.updated) }}</time> }
              · {{ i18n.readTime(a.readMinutes) }}
              @if (area(); as ar) { · <a [routerLink]="i18n.areaLink(ar)">{{ ar.name[i18n.lang()] }}</a> }
            </p>
          </div>
        </header>
        <div class="container container--narrow prose">
          <app-blocks [blocks]="a.blocks" [lessonLabel]="t.common.lesson" />
        </div>

        <footer class="container container--narrow article-foot">
          <aside class="author-box">
            <img [src]="site.portrait" alt="" width="96" height="120" loading="lazy" />
            <div>
              <strong>{{ site.name }}</strong>
              <p>{{ authorLine() }}</p>
              <a [routerLink]="i18n.link('about')">{{ t.articles.aboutMore }}</a>
            </div>
          </aside>

          @if (related().length) {
            <section class="related">
              <h2 class="h3">{{ t.articles.related }}</h2>
              <ul class="related__list" role="list">
                @for (r of related(); track r.slug) {
                  <li>
                    <a [routerLink]="i18n.articleLink(r.slug)">{{ r.title }}</a>
                    <span class="related__meta">{{ i18n.date(r.published) }} · {{ i18n.readTime(r.readMinutes) }}</span>
                  </li>
                }
              </ul>
            </section>
          }
        </footer>
      </article>
      <app-cta-band [title]="a.ctaTitle ?? t.articles.ctaTitle" [text]="a.ctaText ?? t.articles.ctaText" />
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
export class ArticlePage {
  protected readonly i18n = inject(I18n);
  protected readonly site = SITE;

  protected readonly area = computed(() => {
    const a = this.i18n.article();
    return a ? this.i18n.areaById(a.area) : undefined;
  });

  /** Související články v pořadí podle hlavičky `souvisejici`. */
  protected readonly related = computed(() => {
    const a = this.i18n.article();
    const all = this.i18n.articles();
    return (a?.related ?? []).map((slug) => all.find((x) => x.slug === slug)).filter((x) => !!x);
  });

  /** Autorský box: první věta úvodu stránky O mně. */
  protected readonly authorLine = computed(() => {
    const p = this.i18n.t().about.paragraphs[0];
    return /^.*?[.!?](?=\s|$)/.exec(p)?.[0] ?? p;
  });
}
