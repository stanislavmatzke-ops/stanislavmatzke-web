import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { I18n } from '../i18n/i18n.service';
import { ThemeService } from '../core/theme.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  template: `
    @let t = i18n.t();
    <header class="site-header">
      <div class="container site-header__inner">
        <a class="brand" [routerLink]="i18n.link('home')" (click)="open.set(false)">
          <span class="brand__mark" aria-hidden="true">SM</span>
          <span class="brand__name">Stanislav Matzke</span>
        </a>

        <div class="site-header__tools">
          <a class="lang-switch" [routerLink]="i18n.otherLangLink()" [attr.aria-label]="t.nav.otherLang" [attr.hreflang]="i18n.otherLang()">
            {{ t.nav.otherLangShort }}
          </a>
          <button type="button" class="icon-btn" (click)="theme.toggle()"
                  [attr.aria-label]="theme.theme() === 'dark' ? t.nav.toLight : t.nav.toDark"
                  [attr.title]="theme.theme() === 'dark' ? t.nav.toLight : t.nav.toDark">
            @if (theme.theme() === 'dark') {
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true">
                <circle cx="12" cy="12" r="4.5" />
                <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8" />
              </svg>
            } @else {
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />
              </svg>
            }
          </button>
          <button type="button" class="icon-btn menu-btn" (click)="open.set(!open())"
                  [attr.aria-expanded]="open()" aria-controls="hlavni-menu"
                  [attr.aria-label]="open() ? t.nav.close : t.nav.menu">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true">
              @if (open()) {
                <path d="M6 6l12 12M18 6L6 18" />
              } @else {
                <path d="M4 7h16M4 12h16M4 17h16" />
              }
            </svg>
          </button>
        </div>

        <nav id="hlavni-menu" class="site-nav" [class.site-nav--open]="open()" [attr.aria-label]="t.nav.menu">
          <a [routerLink]="i18n.link('services')" routerLinkActive="is-active" (click)="open.set(false)">{{ t.nav.services }}</a>
          <a [routerLink]="i18n.link('ai')" routerLinkActive="is-active" (click)="open.set(false)">{{ t.nav.ai }}</a>
          <a [routerLink]="i18n.link('jobScout')" routerLinkActive="is-active" (click)="open.set(false)">{{ t.nav.showcase }}</a>
          <a [routerLink]="i18n.link('references')" routerLinkActive="is-active" (click)="open.set(false)">{{ t.nav.references }}</a>
          <a [routerLink]="i18n.link('about')" routerLinkActive="is-active" (click)="open.set(false)">{{ t.nav.about }}</a>
          <a class="btn btn--primary btn--small" [routerLink]="i18n.link('contact')" (click)="open.set(false)">{{ t.nav.cta }}</a>
        </nav>
      </div>
    </header>
  `,
})
export class Header {
  protected readonly i18n = inject(I18n);
  protected readonly theme = inject(ThemeService);
  protected readonly open = signal(false);
}
