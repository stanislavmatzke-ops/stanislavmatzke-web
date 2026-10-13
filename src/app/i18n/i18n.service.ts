import { Injectable, computed, inject, signal } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { cs, Content } from './cs';
import { en } from './en';
import { AnyPage, Lang, PageKey, PATHS } from './types';

/** Aktuální jazyk a stránka podle adresy; texty v `t()`. */
@Injectable({ providedIn: 'root' })
export class I18n {
  private readonly router = inject(Router);

  readonly lang = signal<Lang>('cs');
  readonly page = signal<AnyPage>('home');
  /** Slug článku, pokud je otevřený detail článku. */
  readonly slug = signal<string | null>(null);
  readonly t = computed<Content>(() => (this.lang() === 'en' ? en : cs));
  readonly otherLang = computed<Lang>(() => (this.lang() === 'en' ? 'cs' : 'en'));

  /** Otevřený článek (nebo null, když slug neexistuje). */
  readonly article = computed(() => {
    const slug = this.slug();
    return slug ? (this.t().articles.items.find((a) => a.slug === slug) ?? null) : null;
  });

  constructor() {
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(() => {
      let route: ActivatedRouteSnapshot = this.router.routerState.snapshot.root;
      while (route.firstChild) route = route.firstChild;
      this.lang.set((route.data['lang'] as Lang | undefined) ?? 'cs');
      this.page.set((route.data['page'] as AnyPage | undefined) ?? 'notFound');
      this.slug.set(route.paramMap.get('slug'));
    });
  }

  /** Adresa stránky v daném jazyce, např. link('services') → '/sluzby' nebo '/en/services'. */
  link(page: PageKey, lang: Lang = this.lang()): string {
    const path = PATHS[lang][page];
    const prefix = lang === 'en' ? '/en' : '';
    const url = path ? `${prefix}/${path}` : prefix;
    return url || '/';
  }

  /** Adresa článku, např. '/clanky/rychlost-vyvoje' nebo '/en/articles/rychlost-vyvoje'. */
  articleLink(slug: string, lang: Lang = this.lang()): string {
    return `${this.link('articles', lang)}/${slug}`;
  }

  /** Stejná stránka v druhém jazyce (přepínač CZ / EN). */
  readonly otherLangLink = computed(() => {
    const page = this.page();
    const other = this.otherLang();
    if (page === 'article') {
      const slug = this.slug();
      return slug ? this.articleLink(slug, other) : this.link('articles', other);
    }
    return this.link(page === 'notFound' ? 'home' : page, other);
  });
}
