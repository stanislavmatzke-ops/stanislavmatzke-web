import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18n } from '../i18n/i18n.service';
import { Blocks } from '../shared/blocks';
import { CtaBand } from '../shared/cta-band';

/** Případová studie z markdownu (content/projekty): Job Scout, Párování plateb… */
@Component({
  selector: 'app-study',
  imports: [Blocks, CtaBand, RouterLink],
  template: `
    @let t = i18n.t();
    @if (i18n.study(); as s) {
      <article>
        <header class="page-head page-head--pattern">
          <div class="container stack stack--sm">
            <span class="eyebrow">{{ t.study.eyebrow }}</span>
            <h1>{{ s.title }}</h1>
            <p class="lead">{{ s.perex }}</p>
            <div class="actions">
              @for (b of s.buttons; track b.href; let first = $first) {
                @if (b.href.startsWith('/')) {
                  <a class="btn" [class.btn--primary]="first" [class.btn--ghost]="!first" [routerLink]="b.href">{{ b.text }}</a>
                } @else {
                  <a class="btn" [class.btn--primary]="first" [class.btn--ghost]="!first" [href]="b.href" target="_blank" rel="noopener">{{ b.text }}</a>
                }
              }
            </div>
          </div>
        </header>

        <div class="container">
          <figure class="case-image">
            <img [src]="s.image.src" [alt]="s.image.alt" width="1600" height="1000" />
            @if (s.image.caption) { <figcaption>{{ s.image.caption }}</figcaption> }
          </figure>
          <dl class="stats">
            @for (f of s.stats; track f.title) {
              <div><dt>{{ f.title }}</dt><dd>{{ f.text }}</dd></div>
            }
          </dl>
        </div>

        <div class="container container--narrow prose">
          <app-blocks [blocks]="i18n.body()" [lessonLabel]="t.common.lesson" />
        </div>
      </article>
      <app-cta-band [title]="s.ctaTitle ?? t.articles.ctaTitle" [text]="s.ctaText ?? t.articles.ctaText" />
    } @else {
      <section class="page-head page-head--center">
        <div class="container container--narrow stack">
          <span class="eyebrow">404</span>
          <h1>{{ t.notFound.title }}</h1>
          <p class="lead">{{ t.notFound.text }}</p>
          <div class="actions">
            <a class="btn btn--primary" [routerLink]="i18n.link('projects')">{{ t.nav.showcase }}</a>
          </div>
        </div>
      </section>
    }
  `,
})
export class StudyPage {
  protected readonly i18n = inject(I18n);
}
