import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Block } from '../i18n/types';
import { I18n } from '../i18n/i18n.service';

/** Vykreslí souvislý text (článek, případová studie, zásady) včetně vizuálních bloků. */
@Component({
  selector: 'app-blocks',
  imports: [RouterLink],
  template: `
    @for (b of blocks(); track $index) {
      @switch (b.kind) {
        @case ('h2') { <h2>{{ b.text }}</h2> }
        @case ('h3') { <h3>{{ b.text }}</h3> }
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

        @case ('stages') {
          <ol class="stages" role="list">
            @for (e of b.entries ?? []; track $index; let last = $last) {
              <li class="stages__item" [class.stages__item--now]="last">
                <span class="stages__label">{{ e.label }}</span>
                <strong>{{ e.title }}</strong>
                <span>{{ e.text }}</span>
              </li>
            }
          </ol>
        }

        @case ('compare') {
          @let e = b.entries ?? [];
          @if (e.length === 2) {
            <div class="compare">
              <div class="compare__side">
                <span class="compare__value">{{ e[0].label }}</span>
                <span class="compare__title">{{ e[0].title }}</span>
              </div>
              <span class="compare__arrow" aria-hidden="true">→</span>
              <div class="compare__side compare__side--after">
                <span class="compare__value">{{ e[1].label }}</span>
                <span class="compare__title">{{ e[1].title }}</span>
              </div>
            </div>
            @if (b.text) { <p class="compare__note">{{ b.text }}</p> }
          }
        }

        @case ('cards') {
          <div class="block-cards">
            @for (e of b.entries ?? []; track $index) {
              <div class="block-card">
                @if (e.label) { <span class="block-card__label">{{ e.label }}</span> }
                <strong>{{ e.title }}</strong>
                @if (e.text) { <span>{{ e.text }}</span> }
              </div>
            }
          </div>
        }

        @case ('facts') {
          <dl class="block-facts">
            @for (e of b.entries ?? []; track $index) {
              <div><dt>{{ e.title }}</dt><dd>{{ e.text }}</dd></div>
            }
          </dl>
        }

        @case ('image') {
          <figure class="block-image">
            <img [src]="b.src" [alt]="b.alt ?? ''" loading="lazy" />
            @if (b.caption) { <figcaption>{{ b.caption }}</figcaption> }
          </figure>
        }

        @case ('project') {
          <aside class="project-box">
            @if (b.src) { <img [src]="b.src" [alt]="b.alt ?? ''" loading="lazy" /> }
            <div class="project-box__body">
              <span class="project-box__label">{{ b.caption }}</span>
              <p>{{ b.text }}</p>
              @if (b.items?.length) {
                <ul>
                  @for (item of b.items ?? []; track $index) { <li>{{ item }}</li> }
                </ul>
              }
              <a [routerLink]="i18n.link('jobScout')">{{ b.href }}</a>
            </div>
          </aside>
        }
      }
    }
  `,
})
export class Blocks {
  protected readonly i18n = inject(I18n);
  readonly blocks = input.required<Block[]>();
  readonly lessonLabel = input('Ponaučení');
}
