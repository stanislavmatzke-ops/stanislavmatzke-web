import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18n } from '../i18n/i18n.service';
import { Block } from '../i18n/types';
import { Blocks } from '../shared/blocks';
import { CtaBand } from '../shared/cta-band';

/** Otázky a odpovědi rozdělené pro rozbalovací seznam. */
interface Faq {
  /** Text před první otázkou. */
  intro: Block[];
  items: { question: string; answer: Block[] }[];
  /** Závěrečný odstavec stránky („Nenašli jste svou otázku?…“), mimo poslední odpověď. */
  closing: Block[];
}

/**
 * Stránka Otázky a odpovědi: každý nadpis `##` je otázka, bloky pod ním odpověď (do dalšího `##`).
 * Poslední odstavec stránky je závěr, ne součást poslední odpovědi, pokud ta má i jiný obsah.
 */
export function toFaq(blocks: Block[]): Faq {
  const faq: Faq = { intro: [], items: [], closing: [] };
  for (const b of blocks) {
    if (b.kind === 'h2') faq.items.push({ question: b.text ?? '', answer: [] });
    else if (faq.items.length) faq.items[faq.items.length - 1].answer.push(b);
    else faq.intro.push(b);
  }
  const last = faq.items.at(-1);
  if (last && last.answer.length > 1 && last.answer.at(-1)?.kind === 'p') faq.closing = [last.answer.pop()!];
  return faq;
}

/**
 * Stránka, jejíž text je v markdownu (content/stranky): Důvěrnost a ochrana dat, Otázky a odpovědi
 * (rozbalovací, všechny odpovědi sbalené), skrytá stránka Pro zaměstnavatele (bez závěrečné výzvy).
 */
@Component({
  selector: 'app-content-page',
  imports: [Blocks, CtaBand, RouterLink],
  template: `
    @let t = i18n.t();
    @if (i18n.contentPage(); as p) {
      <section class="page-head page-head--pattern">
        <div class="container container--narrow stack stack--sm">
          <h1>{{ p.title }}</h1>
          <p class="lead">{{ p.perex }}</p>
        </div>
      </section>
      <div class="container container--narrow prose section section--flush-top">
        @if (faq(); as f) {
          <app-blocks [blocks]="f.intro" [lessonLabel]="t.common.lesson" />
          <div class="faq faq--page">
            @for (item of f.items; track $index) {
              <details>
                <summary><h2>{{ item.question }}</h2></summary>
                <div class="faq__answer"><app-blocks [blocks]="item.answer" [lessonLabel]="t.common.lesson" /></div>
              </details>
            }
          </div>
          <app-blocks [blocks]="f.closing" [lessonLabel]="t.common.lesson" />
        } @else {
          <app-blocks [blocks]="i18n.body()" [lessonLabel]="t.common.lesson" />
        }
      </div>
      @if (!p.hidden) {
        <app-cta-band [title]="t.articles.ctaTitle" [text]="t.articles.ctaText" />
      }
    } @else {
      <section class="page-head page-head--center">
        <div class="container container--narrow stack">
          <span class="eyebrow">404</span>
          <h1>{{ t.notFound.title }}</h1>
          <p class="lead">{{ t.notFound.text }}</p>
          <div class="actions">
            <a class="btn btn--primary" [routerLink]="i18n.link('home')">{{ t.notFound.back }}</a>
          </div>
        </div>
      </section>
    }
  `,
})
export class ContentPageView {
  protected readonly i18n = inject(I18n);
  protected readonly faq = computed(() => (this.i18n.page() === 'faq' ? toFaq(this.i18n.body()) : null));
}
