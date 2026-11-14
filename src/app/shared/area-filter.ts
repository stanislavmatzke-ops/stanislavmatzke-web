import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18n } from '../i18n/i18n.service';

/** Filtr podle oblastí nad seznamem článků: odkazy na stránky oblastí (jen oblasti s články). */
@Component({
  selector: 'app-area-filter',
  imports: [RouterLink],
  template: `
    @let t = i18n.t();
    <nav class="area-filter" [attr.aria-label]="t.articles.topics">
      <a class="tag" [class.is-active]="!active()" [routerLink]="i18n.link('articles')" [attr.aria-current]="!active() ? 'page' : null">{{ t.articles.allTopics }}</a>
      @for (a of i18n.areas; track a.id) {
        <a class="tag" [class.is-active]="active() === a.id" [routerLink]="i18n.areaLink(a)" [attr.aria-current]="active() === a.id ? 'page' : null">{{ a.name[i18n.lang()] }}</a>
      }
    </nav>
  `,
})
export class AreaFilter {
  protected readonly i18n = inject(I18n);
  /** Id aktivní oblasti; prázdné = všechny články. */
  readonly active = input<string | null>(null);
}
