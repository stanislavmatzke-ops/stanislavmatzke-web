import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18n } from '../i18n/i18n.service';
import { Blocks } from '../shared/blocks';
import { CtaBand } from '../shared/cta-band';

@Component({
  selector: 'app-ai',
  imports: [Blocks, CtaBand, RouterLink],
  template: `
    @let t = i18n.t();
    @let a = t.ai;
    <article>
      <header class="page-head">
        <div class="container container--narrow stack stack--sm">
          <span class="eyebrow">{{ a.eyebrow }} · {{ a.meta }}</span>
          <h1>{{ a.title }}</h1>
          <p class="lead">{{ a.lead }}</p>
        </div>
      </header>
      <div class="container container--narrow prose">
        <app-blocks [blocks]="a.blocks" [lessonLabel]="t.common.lesson" />
        <p class="prose__more">
          <a [routerLink]="i18n.link('jobScout')">{{ t.home.showcase.study }}</a>
        </p>
      </div>
    </article>
    <app-cta-band [title]="a.ctaTitle" [text]="a.ctaText" />
  `,
})
export class AiPage {
  protected readonly i18n = inject(I18n);
}
