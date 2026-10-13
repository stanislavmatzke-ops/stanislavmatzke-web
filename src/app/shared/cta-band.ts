import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18n } from '../i18n/i18n.service';

/** Závěrečná výzva ke kontaktu na konci podstránek. */
@Component({
  selector: 'app-cta-band',
  imports: [RouterLink],
  template: `
    <section class="cta-band">
      <div class="container cta-band__inner">
        <div>
          <h2>{{ title() }}</h2>
          <p>{{ text() }}</p>
        </div>
        <a class="btn btn--primary" [routerLink]="i18n.link('contact')">{{ i18n.t().common.bookCall }}</a>
      </div>
    </section>
  `,
})
export class CtaBand {
  protected readonly i18n = inject(I18n);
  readonly title = input.required<string>();
  readonly text = input.required<string>();
}
