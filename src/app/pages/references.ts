import { Component, inject } from '@angular/core';
import { I18n } from '../i18n/i18n.service';
import { CtaBand } from '../shared/cta-band';
import { SectorIcon } from '../shared/sector-icon';

@Component({
  selector: 'app-references',
  imports: [CtaBand, SectorIcon],
  template: `
    @let t = i18n.t();
    @let r = t.references;
    <section class="page-head page-head--pattern">
      <div class="container stack stack--sm">
        <span class="eyebrow">{{ r.eyebrow }}</span>
        <h1>{{ r.title }}</h1>
        <p class="lead">{{ r.lead }}</p>
        <dl class="stats stats--compact">
          @for (s of r.stats; track s.label) {
            <div><dt>{{ s.value }}</dt><dd>{{ s.label }}</dd></div>
          }
        </dl>
      </div>
    </section>

    <section class="logos logos--plain" [attr.aria-label]="t.home.logosLabel">
      <div class="container logos__inner">
        @for (logo of t.home.logos; track logo) { <span class="logos__item">{{ logo }}</span> }
      </div>
    </section>

    <section class="section">
      <div class="container ref-grid">
        @for (item of r.items; track item.name + item.project) {
          <article class="ref-card">
            <header class="ref-card__head">
              <span class="ref-card__icon"><app-sector-icon [sector]="item.sector" /></span>
              <div class="ref-card__meta">
                <span>{{ item.sectorLabel }}</span>
                <span>{{ item.years }}</span>
              </div>
            </header>
            <div class="ref-card__title">
              <h2 class="h3">{{ item.name }}</h2>
              <span class="ref-card__project">{{ item.project }}</span>
            </div>
            <p class="ref-card__role">
              {{ item.role }}@if (item.via) { · {{ t.common.via }} {{ item.via }} }
            </p>
            <p class="muted">{{ item.text }}</p>
            @if (item.highlights.length) {
              <ul class="checks checks--small">
                @for (x of item.highlights; track x) { <li>{{ x }}</li> }
              </ul>
            }
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
}
