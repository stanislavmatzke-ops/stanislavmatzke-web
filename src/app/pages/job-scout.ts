import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18n } from '../i18n/i18n.service';
import { SITE } from '../core/site';
import { Blocks } from '../shared/blocks';
import { CtaBand } from '../shared/cta-band';

@Component({
  selector: 'app-job-scout',
  imports: [Blocks, CtaBand, RouterLink],
  template: `
    @let t = i18n.t();
    @let j = t.jobScout;
    <article>
      <header class="page-head">
        <div class="container stack stack--sm">
          <span class="eyebrow">{{ j.eyebrow }}</span>
          <h1>{{ j.title }}</h1>
          <p class="lead">{{ j.lead }}</p>
          <div class="actions">
            <a class="btn btn--primary" [href]="site.jobScoutDemo" target="_blank" rel="noopener">{{ j.demo }}</a>
            <a class="btn btn--ghost" [href]="site.jobScoutRepo" target="_blank" rel="noopener">{{ j.github }}</a>
          </div>
        </div>
      </header>

      <div class="container">
        <div class="shot shot--wide" role="img" [attr.aria-label]="t.common.screenshot">{{ t.common.screenshot }}</div>
        <dl class="stats">
          @for (f of j.facts; track f.label) {
            <div><dt>{{ f.value }}</dt><dd>{{ f.label }}</dd></div>
          }
        </dl>
      </div>

      <div class="container container--narrow prose">
        <app-blocks [blocks]="j.blocks" [lessonLabel]="t.common.lesson" />
        <p class="prose__more"><a [routerLink]="i18n.link('ai')">{{ j.aiLink }}</a></p>
      </div>
    </article>
    <app-cta-band [title]="t.ai.ctaTitle" [text]="t.ai.ctaText" />
  `,
})
export class JobScoutPage {
  protected readonly i18n = inject(I18n);
  protected readonly site = SITE;
}
