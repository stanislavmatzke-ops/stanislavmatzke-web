import { Component, inject } from '@angular/core';
import { I18n } from '../i18n/i18n.service';
import { SITE } from '../core/site';
import { Blocks } from '../shared/blocks';

@Component({
  selector: 'app-privacy',
  imports: [Blocks],
  template: `
    @let t = i18n.t();
    <section class="page-head">
      <div class="container container--narrow">
        <h1>{{ t.privacy.title }}</h1>
      </div>
    </section>
    <div class="container container--narrow prose section--flush-top section">
      <app-blocks [blocks]="t.privacy.blocks" />
      <p class="muted">
        {{ site.name }} · IČO {{ site.ico }} · {{ site.address }} ·
        <a [href]="'mailto:' + site.email">{{ site.email }}</a>
      </p>
    </div>
  `,
})
export class PrivacyPage {
  protected readonly i18n = inject(I18n);
  protected readonly site = SITE;
}
