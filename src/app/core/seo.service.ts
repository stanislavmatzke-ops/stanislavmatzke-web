import { DOCUMENT, Injectable, effect, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { I18n } from '../i18n/i18n.service';
import { Lang } from '../i18n/types';

const ORIGIN = 'https://stanislavmatzke.com';

/** Titulek, popis, jazyk stránky, kanonická adresa a hreflang podle aktuální stránky. */
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
      const m = t.meta[page];

      this.title.setTitle(m.title);
      this.meta.updateTag({ name: 'description', content: m.description });
      this.meta.updateTag({ property: 'og:title', content: m.title });
      this.meta.updateTag({ property: 'og:description', content: m.description });
      this.meta.updateTag({ property: 'og:locale', content: lang === 'en' ? 'en_GB' : 'cs_CZ' });
      this.doc.documentElement.lang = lang;

      if (page === 'notFound') {
        this.meta.updateTag({ name: 'robots', content: 'noindex' });
        return;
      }
      this.meta.removeTag('name="robots"');
      const url = (l: Lang) => ORIGIN + this.i18n.link(page, l);
      this.setLink('canonical', url(lang));
      this.setLink('alternate', url('cs'), 'cs');
      this.setLink('alternate', url('en'), 'en');
      this.setLink('alternate', url('cs'), 'x-default');
    });
  }

  private setLink(rel: string, href: string, hreflang?: string): void {
    const selector = hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"]`;
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
