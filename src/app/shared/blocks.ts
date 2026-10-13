import { Component, input } from '@angular/core';
import { Block } from '../i18n/types';

/** Vykreslí souvislý text (článek, případová studie, zásady). */
@Component({
  selector: 'app-blocks',
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
      }
    }
  `,
})
export class Blocks {
  readonly blocks = input.required<Block[]>();
  readonly lessonLabel = input('Ponaučení');
}
