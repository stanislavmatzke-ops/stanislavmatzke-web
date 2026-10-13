import { Component, inject } from '@angular/core';
import { I18n } from '../i18n/i18n.service';
import { CtaBand } from '../shared/cta-band';

@Component({
  selector: 'app-references',
  imports: [CtaBand],
  template: `
    @let t = i18n.t();
    @let r = t.references;
    <section class="page-head">
      <div class="container stack stack--sm">
        <span class="eyebrow">{{ r.eyebrow }}</span>
        <h1>{{ r.title }}</h1>
        <p class="lead">{{ r.lead }}</p>
      </div>
    </section>

    <section class="logos logos--plain" [attr.aria-label]="t.home.logosLabel">
      <div class="container logos__inner">
        @for (logo of t.home.logos; track logo) { <span class="logos__item">{{ logo }}</span> }
      </div>
    </section>

    <section class="section">
      <div class="container grid">
        @for (item of r.items; track item.name; let i = $index) {
          <article class="card ref-card">
            <div class="ref-card__meta">
              <span class="card__num">{{ pad(i + 1) }}</span>
              <span>{{ item.years }} · {{ item.sector }}</span>
            </div>
            <h2 class="h3">{{ item.name }}</h2>
            <p class="muted">{{ item.text }}</p>
            <ul class="tags" role="list">
              @for (tag of item.tags; track tag) { <li class="tag tag--small">{{ tag }}</li> }
            </ul>
          </article>
        }
      </div>
    </section>

    <app-cta-band [title]="r.ctaTitle" [text]="r.ctaText" />
  `,
})
export class ReferencesPage {
  protected readonly i18n = inject(I18n);
  protected pad(n: number): string {
    return n.toString().padStart(2, '0');
  }
}
