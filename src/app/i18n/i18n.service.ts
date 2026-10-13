import { Injectable, computed, inject, signal } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { cs, Content } from './cs';
import { en } from './en';
import { Lang, PageKey, PATHS } from './types';

/** Aktuální jazyk a stránka podle adresy; texty v `t()`. */
@Injectable({ providedIn: 'root' })
export class I18n {
  private readonly router = inject(Router);

  readonly lang = signal<Lang>('cs');
  /** Klíč stránky z `PATHS`, nebo 'notFound'. */
  readonly page = signal<PageKey | 'notFound'>('home');
  readonly t = computed<Content>(() => (this.lang() === 'en' ? en : cs));
  readonly otherLang = computed<Lang>(() => (this.lang() === 'en' ? 'cs' : 'en'));

  constructor() {
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(() => {
      let route: ActivatedRouteSnapshot = this.router.routerState.snapshot.root;
      while (route.firstChild) route = route.firstChild;
      this.lang.set((route.data['lang'] as Lang | undefined) ?? 'cs');
      this.page.set((route.data['page'] as PageKey | 'notFound' | undefined) ?? 'notFound');
    });
  }

  /** Adresa stránky v daném jazyce, např. link('services') → '/sluzby' nebo '/en/services'. */
  link(page: PageKey, lang: Lang = this.lang()): string {
    const path = PATHS[lang][page];
    const prefix = lang === 'en' ? '/en' : '';
    const url = path ? `${prefix}/${path}` : prefix;
    return url || '/';
  }

  /** Stejná stránka v druhém jazyce (přepínač CZ / EN). */
  readonly otherLangLink = computed(() => {
    const page = this.page();
    return this.link(page === 'notFound' ? 'home' : page, this.otherLang());
  });
}
