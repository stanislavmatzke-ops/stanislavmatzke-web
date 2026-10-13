import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18n } from '../i18n/i18n.service';
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
            <span class="eyebrow">{{ t.articles.eyebrow }} · {{ a.date }} · {{ a.readTime }}</span>
            <h1>{{ a.title }}</h1>
            <p class="lead">{{ a.perex }}</p>
          </div>
        </header>
        <div class="container container--narrow prose">
          <app-blocks [blocks]="a.blocks" [lessonLabel]="t.common.lesson" />
        </div>
      </article>
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
export class ArticlePage {
  protected readonly i18n = inject(I18n);
}
