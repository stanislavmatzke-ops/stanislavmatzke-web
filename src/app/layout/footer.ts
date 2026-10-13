import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18n } from '../i18n/i18n.service';
import { SITE } from '../core/site';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  template: `
    @let t = i18n.t();
    <footer class="site-footer">
      <div class="container site-footer__inner">
        <div class="site-footer__id">
          <strong>{{ site.name }}</strong>
          <span>IČO {{ site.ico }} · {{ site.address }}</span>
          <span>{{ t.footer.tradeRegister }}</span>
        </div>
        <div class="site-footer__links">
          <a [href]="'mailto:' + site.email">{{ site.email }}</a>
          <a [href]="site.phoneHref">{{ site.phone }}</a>
          <a [href]="site.linkedin" rel="noopener" target="_blank">LinkedIn</a>
          <a [href]="site.github" rel="noopener" target="_blank">GitHub</a>
          <a [routerLink]="i18n.link('privacy')">{{ t.footer.privacy }}</a>
          <span>© {{ year }}</span>
        </div>
      </div>
    </footer>
  `,
})
export class Footer {
  protected readonly i18n = inject(I18n);
  protected readonly site = SITE;
  protected readonly year = new Date().getFullYear();
}
