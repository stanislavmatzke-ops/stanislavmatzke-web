import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Block } from '../i18n/types';
import { I18n } from '../i18n/i18n.service';

/** Vykreslí souvislý text (článek, případová studie, zásady). */
@Component({
  selector: 'app-blocks',
  imports: [RouterLink],
  template: `
    @for (b of blocks(); track $index) {
      @switch (b.kind) {
        @case ('h2') { <h2>{{ b.text }}</h2> }
        @case ('p') { <p>{{ b.text }}</p> }
        @case ('ul') {
          <ul>
            @for (item of b.items ?? []; track $index) { <li>{{ item }}</li> }
          </ul>
        }
        @case ('lesson') { <aside class="lesson"><span class="lesson__label">{{ lessonLabel() }}</span>{{ b.text }}</aside> }
        @case ('quote') { <blockquote>{{ b.text }}</blockquote> }
        @case ('source') { <p class="source"><a [href]="b.href" rel="noopener" target="_blank">{{ b.text }} ↗</a></p> }
        @case ('link') { <p class="prose__more"><a [routerLink]="i18n.articleLink(b.article ?? '')">{{ b.text }}</a></p> }
      }
    }
  `,
})
export class Blocks {
  protected readonly i18n = inject(I18n);
  readonly blocks = input.required<Block[]>();
  readonly lessonLabel = input('Ponaučení');
}
