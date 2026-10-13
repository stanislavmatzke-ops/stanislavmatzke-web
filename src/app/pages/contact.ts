import { Component, inject } from '@angular/core';
import { I18n } from '../i18n/i18n.service';
import { SITE } from '../core/site';
import { ContactForm } from '../shared/contact-form';

@Component({
  selector: 'app-contact',
  imports: [ContactForm],
  template: `
    @let c = i18n.t().contact;
    <section class="page-head page-head--pattern">
      <div class="container split split--even">
        <div class="stack">
          <span class="eyebrow">{{ c.eyebrow }}</span>
          <h1>{{ c.title }}</h1>
          <p class="lead">{{ c.lead }}</p>
          <h2 class="h3">{{ c.direct }}</h2>
          <div class="contact-list">
            <a [href]="'mailto:' + site.email">{{ site.email }}</a>
            <a [href]="site.phoneHref">{{ site.phone }}</a>
            <a [href]="site.linkedin" target="_blank" rel="noopener">linkedin.com/in/stanislav-matzke</a>
          </div>
          <h2 class="h3">{{ c.billing }}</h2>
          <p class="muted">{{ site.name }}<br />IČO {{ site.ico }}<br />{{ site.address }}<br />{{ c.tradeRegister }}</p>
        </div>
        <app-contact-form />
      </div>
    </section>

    <section class="section section--surface">
      <div class="container container--narrow stack">
        <h2>{{ c.faqTitle }}</h2>
        <div class="faq">
          @for (item of c.faq; track item.q) {
            <details>
              <summary>{{ item.q }}</summary>
              <p>{{ item.a }}</p>
            </details>
          }
        </div>
      </div>
    </section>
  `,
})
export class ContactPage {
  protected readonly i18n = inject(I18n);
  protected readonly site = SITE;
}
