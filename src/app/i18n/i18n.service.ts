import { Injectable, computed, inject, signal } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { cs, Content } from './cs';
import { en } from './en';
import { AREA_SEGMENT, AnyPage, Area, Block, CONTENT_PAGE_KEYS, Lang, PageKey, PATHS } from './types';
import { AREAS, ARTICLES, BODIES, PAGES, STUDIES } from '../content/content.generated';
import { formatDate, readTime } from './format';

/** Aktuální jazyk a stránka podle adresy; texty v `t()`, obsah z markdownu (content/) přes computed signály. */
@Injectable({ providedIn: 'root' })
export class I18n {
  private readonly router = inject(Router);

  readonly lang = signal<Lang>('cs');
  readonly page = signal<AnyPage>('home');
  /** Slug článku nebo studie, slug oblasti – podle typu stránky. */
  readonly slug = signal<string | null>(null);
  readonly t = computed<Content>(() => (this.lang() === 'en' ? en : cs));
  readonly otherLang = computed<Lang>(() => (this.lang() === 'en' ? 'cs' : 'en'));

  /** Články aktuálního jazyka, nejnovější první. */
  readonly articles = computed(() => ARTICLES[this.lang()]);
  readonly studies = computed(() => STUDIES[this.lang()]);
  /** Oblasti, které mají aspoň jeden článek. */
  readonly areas = AREAS;

  /** Otevřený článek (nebo null, když slug neexistuje). */
  readonly article = computed(() => (this.page() === 'article' ? (this.articles().find((a) => a.slug === this.slug()) ?? null) : null));
  /** Otevřená případová studie. */
  readonly study = computed(() => (this.page() === 'study' ? (this.studies().find((s) => s.slug === this.slug()) ?? null) : null));
  /** Otevřená oblast článků. */
  readonly area = computed(() => (this.page() === 'area' ? (AREAS.find((a) => a.slug[this.lang()] === this.slug()) ?? null) : null));
  /** Text stránky z markdownu (Důvěrnost, Otázky). */
  readonly contentPage = computed(() => {
    const page = this.page();
    return CONTENT_PAGE_KEYS.includes(page as PageKey) ? (PAGES[page as PageKey]?.[this.lang()] ?? null) : null;
  });

  /** Načtené texty (bloky) podle klíče 'article:cs:<slug>', 'study:en:<slug>', 'page:cs:<klíč>'. */
  private readonly bodies = signal<Record<string, Block[]>>({});

  /** Text otevřeného článku, studie nebo stránky z markdownu (načtený resolverem routy). */
  readonly body = computed<Block[]>(() => {
    const key = I18n.bodyKey(this.page(), this.lang(), this.slug());
    return (key && this.bodies()[key]) || [];
  });

  /** Klíč textu pro stránku, nebo null, když stránka žádný text z markdownu nemá. */
  static bodyKey(page: AnyPage, lang: Lang, slug: string | null): string | null {
    if (page === 'article' || page === 'study') return slug ? `${page}:${lang}:${slug}` : null;
    return CONTENT_PAGE_KEYS.includes(page as PageKey) ? `page:${lang}:${page}` : null;
  }

  /**
   * Načte text stránky (samostatný chunk přes import()). Volá ho resolver routy, takže předgenerování
   * i první vykreslení v prohlížeči počká, až je text k dispozici. Neexistující klíč = nic (stránka ukáže 404).
   */
  async loadBody(key: string | null): Promise<void> {
    const load = key ? BODIES[key] : undefined;
    if (!key || !load || this.bodies()[key]) return;
    const blocks = await load();
    this.bodies.update((b) => ({ ...b, [key]: blocks }));
  }

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

  /** Existuje stránka v tomto buildu? (Stránka z markdownu ve stavu koncept chybí v produkčním buildu.) */
  hasPage(page: PageKey): boolean {
    return !CONTENT_PAGE_KEYS.includes(page) || !!PAGES[page];
  }

  /** Adresa článku, např. '/clanky/rychlost-vyvoje' nebo '/en/articles/rychlost-vyvoje'. */
  articleLink(slug: string, lang: Lang = this.lang()): string {
    return `${this.link('articles', lang)}/${slug}`;
  }

  /** Adresa studie podle id (český slug), např. '/en/projects/payment-matching'; null, když v buildu není. */
  studyLink(id: string, lang: Lang = this.lang()): string | null {
    const s = STUDIES[lang].find((x) => x.id === id);
    return s ? `${this.link('projects', lang)}/${s.slug}` : null;
  }

  /** Adresa stránky oblasti, např. '/clanky/tema/modernizace'. */
  areaLink(area: Area, lang: Lang = this.lang()): string {
    return `${this.link('articles', lang)}/${AREA_SEGMENT[lang]}/${area.slug[lang]}`;
  }

  areaById(id: string): Area | undefined {
    return AREAS.find((a) => a.id === id);
  }

  /** '13. října 2026' / '13 October 2026' */
  date(iso: string): string {
    return formatDate(iso, this.lang());
  }

  /** '6 minut čtení' / '6 min read' */
  readTime(minutes: number): string {
    return readTime(minutes, this.lang());
  }

  /** Stejná stránka v druhém jazyce (přepínač CZ / EN, hreflang). */
  linkIn(lang: Lang): string {
    const page = this.page();
    if (page === 'article') {
      const a = this.article();
      return a ? this.articleLink(a.slug, lang) : this.link('articles', lang);
    }
    if (page === 'study') {
      const s = this.study();
      return (s && this.studyLink(s.id, lang)) ?? this.link('projects', lang);
    }
    if (page === 'area') {
      const a = this.area();
      return a ? this.areaLink(a, lang) : this.link('articles', lang);
    }
    return this.link(page === 'notFound' ? 'home' : page, lang);
  }

  readonly otherLangLink = computed(() => this.linkIn(this.otherLang()));
}
