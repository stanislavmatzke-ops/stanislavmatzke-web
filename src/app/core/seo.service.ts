import { DOCUMENT, Injectable, effect, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { I18n } from '../i18n/i18n.service';
import { Lang, Meta as PageMeta } from '../i18n/types';

const ORIGIN = 'https://stanislavmatzke.com';
const SITE_NAME = 'Stanislav Matzke';

/**
 * Titulek, popis, jazyk stránky, kanonická adresa, hreflang, Open Graph a strukturovaná data (JSON-LD)
 * podle aktuální stránky. JSON-LD je datový blok (<script type="application/ld+json">), CSP ho neblokuje.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly i18n = inject(I18n);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly doc = inject(DOCUMENT);

  constructor() {
    effect(() => {
      const t = this.i18n.t();
      const page = this.i18n.page();
      const lang = this.i18n.lang();
      const article = this.i18n.article();
      const study = this.i18n.study();
      const area = this.i18n.area();
      const contentPage = this.i18n.contentPage();
      const doc = article ?? study ?? contentPage;

      const missing =
        page === 'notFound' ||
        (page === 'article' && !article) ||
        (page === 'study' && !study) ||
        (page === 'area' && !area) ||
        (!this.i18n.hasPage(page as never) && !contentPage);

      let m: PageMeta;
      if (missing) m = t.meta.notFound;
      else if (doc) m = { title: doc.ogTitle ?? `${doc.title} – ${SITE_NAME}`, description: doc.description };
      else if (area) m = { title: `${area.name[lang]} – ${t.meta.articles.title}`, description: area.intro[lang] };
      else m = t.meta[page as keyof typeof t.meta] ?? t.meta.notFound;

      this.title.setTitle(m.title);
      this.meta.updateTag({ name: 'description', content: m.description });
      this.meta.updateTag({ property: 'og:title', content: m.title });
      this.meta.updateTag({ property: 'og:description', content: m.description });
      this.meta.updateTag({ property: 'og:locale', content: lang === 'en' ? 'en_GB' : 'cs_CZ' });
      this.doc.documentElement.lang = lang;

      // Obrázek pro náhled odkazu (LinkedIn, Facebook, Slack…): u článku a studie z hlavičky (og_image),
      // u Projektů první projekt (Párování plateb, bez jeho studie v buildu Job Scout), jinak obecný s portrétem.
      const projectsImage = this.i18n.studyLink('parovani-plateb') ? 'payment-matching-og' : 'job-scout-og';
      const ogImage =
        article || study
          ? ORIGIN + (article ?? study)!.ogImage
          : `${ORIGIN}/img/${page === 'projects' ? projectsImage : 'og-default'}${lang === 'en' ? '-en' : ''}.jpg`;
      this.meta.updateTag({ property: 'og:image', content: ogImage });
      this.meta.updateTag({ property: 'og:image:width', content: '1200' });
      this.meta.updateTag({ property: 'og:image:height', content: '630' });
      this.meta.updateTag({ property: 'og:type', content: article || study ? 'article' : 'website' });
      this.meta.updateTag({ property: 'og:site_name', content: SITE_NAME });
      this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });

      const dated = article ?? study;
      this.setOrRemove('article:published_time', dated?.published);
      this.setOrRemove('article:modified_time', dated?.updated);

      this.setFeed(lang);

      if (missing) {
        this.meta.updateTag({ name: 'robots', content: 'noindex' });
        this.setJsonLd(null);
        return;
      }
      this.meta.removeTag('name="robots"');
      const url = (l: Lang) => ORIGIN + this.i18n.linkIn(l);
      this.setLink('canonical', url(lang));
      this.meta.updateTag({ property: 'og:url', content: url(lang) });
      this.setLink('alternate', url('cs'), 'cs');
      this.setLink('alternate', url('en'), 'en');
      this.setLink('alternate', url('cs'), 'x-default');

      // Strukturovaná data: BlogPosting u článku, Article u případové studie.
      // Data jsou ISO 8601 ze stejné hlavičky jako viditelné datum.
      this.setJsonLd(
        dated
          ? {
              '@context': 'https://schema.org',
              '@type': article ? 'BlogPosting' : 'Article',
              headline: dated.title,
              description: dated.description,
              datePublished: dated.published,
              ...(dated.updated ? { dateModified: dated.updated } : {}),
              author: { '@type': 'Person', name: SITE_NAME, url: ORIGIN + this.i18n.link('about') },
              inLanguage: lang,
              image: [ogImage],
              url: url(lang),
              mainEntityOfPage: { '@type': 'WebPage', '@id': url(lang) },
            }
          : null,
      );
    });
  }

  private setOrRemove(property: string, content: string | undefined): void {
    if (content) this.meta.updateTag({ property, content });
    else this.meta.removeTag(`property="${property}"`);
  }

  /** <link rel="alternate" type="application/rss+xml"> na feed článků v jazyce stránky. */
  private setFeed(lang: Lang): void {
    let el = this.doc.head.querySelector<HTMLLinkElement>('link[rel="alternate"][type="application/rss+xml"]');
    if (!el) {
      el = this.doc.createElement('link');
      el.rel = 'alternate';
      el.type = 'application/rss+xml';
      this.doc.head.appendChild(el);
    }
    el.title = this.i18n.t().meta.articles.title;
    el.href = `${ORIGIN}${this.i18n.link('articles', lang)}/feed.xml`;
  }

  private setJsonLd(data: object | null): void {
    let el = this.doc.head.querySelector<HTMLScriptElement>('script#structured-data');
    if (!data) {
      el?.remove();
      return;
    }
    if (!el) {
      el = this.doc.createElement('script');
      el.id = 'structured-data';
      el.type = 'application/ld+json';
      this.doc.head.appendChild(el);
    }
    // Ochrana proti ukončení skriptu textem obsahu („</script>“).
    el.textContent = JSON.stringify(data).replace(/</g, '\\u003c');
  }

  private setLink(rel: string, href: string, hreflang?: string): void {
    const selector = hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"]:not([hreflang]):not([type])`;
    let el = this.doc.head.querySelector<HTMLLinkElement>(selector);
    if (!el) {
      el = this.doc.createElement('link');
      el.rel = rel;
      if (hreflang) el.hreflang = hreflang;
      this.doc.head.appendChild(el);
    }
    el.href = href;
  }
}
