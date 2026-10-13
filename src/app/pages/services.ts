import { Component, inject } from '@angular/core';
import { I18n } from '../i18n/i18n.service';
import { CtaBand } from '../shared/cta-band';

@Component({
  selector: 'app-services',
  imports: [CtaBand],
  template: `
    @let s = i18n.t().services;
    <section class="page-head page-head--pattern">
      <div class="container stack stack--sm">
        <span class="eyebrow">{{ s.eyebrow }}</span>
        <h1>{{ s.title }}</h1>
        <p class="lead">{{ s.lead }}</p>
        <aside class="guarantee">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.3 7.5 9.5 4.3-1.2 7.5-4.9 7.5-9.5V6z" /><path d="m8.8 12 2.2 2.2 4.4-4.4" />
          </svg>
          <div>
            <strong>{{ s.guarantee.title }}</strong>
            <p>{{ s.guarantee.text }}</p>
          </div>
        </aside>
      </div>
    </section>

    <section class="section section--flush-top">
      <div class="container service-list">
        @for (item of s.items; track item.id; let i = $index) {
          <article class="service" [id]="item.id">
            <div class="service__head">
              <span class="card__num">{{ pad(i + 1) }}</span>
              <h2>{{ item.title }}</h2>
              <p class="muted">{{ item.forWhom }}</p>
            </div>
            <div class="service__body">
              <ul class="checks">
                @for (p of item.points; track p) { <li>{{ p }}</li> }
              </ul>
              <dl class="facts">
                <div><dt>{{ s.labels.outcome }}</dt><dd>{{ item.outcome }}</dd></div>
                @if (item.experience) {
                  <div><dt>{{ s.labels.experience }}</dt><dd>{{ item.experience }}</dd></div>
                }
                <div><dt>{{ s.labels.firstStep }}</dt><dd>{{ item.firstStep }}</dd></div>
              </dl>
            </div>
          </article>
        }
      </div>
    </section>

    <app-cta-band [title]="s.ctaTitle" [text]="s.ctaText" />
  `,
})
export class ServicesPage {
  protected readonly i18n = inject(I18n);
  protected pad(n: number): string {
    return n.toString().padStart(2, '0');
  }
}
