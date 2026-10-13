import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18n } from '../i18n/i18n.service';
import { SITE } from '../core/site';
import { CtaBand } from '../shared/cta-band';

@Component({
  selector: 'app-projects',
  imports: [RouterLink, CtaBand],
  template: `
    @let t = i18n.t();
    @let p = t.projects;
    <section class="page-head page-head--pattern">
      <div class="container stack stack--sm">
        <span class="eyebrow">{{ p.eyebrow }}</span>
        <h1>{{ p.title }}</h1>
        <p class="lead">{{ p.lead }}</p>
      </div>
    </section>

    <section class="section">
      <div class="container project-list">
        @for (item of p.items; track item.id) {
          <article class="project-card" [class.project-card--with-image]="item.image">
            @if (item.image) {
              <a class="project-card__image" [routerLink]="i18n.link('jobScout')">
                <img [src]="item.image" [alt]="item.title" loading="lazy" width="1600" height="1000" />
              </a>
            }
            <div class="project-card__body">
              <span class="pill pill--small" [class.pill--warn]="item.status === 'soon'" [class.pill--neutral]="item.status === 'done'">
                {{ statusLabel(item.status) }}
              </span>
              <h2>{{ item.title }}</h2>
              <span class="project-card__subtitle">{{ item.subtitle }}</span>
              <p class="muted">{{ item.text }}</p>
              <ul class="project-card__facts" role="list">
                @for (f of item.facts; track f) { <li>{{ f }}</li> }
              </ul>
              <ul class="tags" role="list">
                @for (tag of item.tags; track tag) { <li class="tag tag--small">{{ tag }}</li> }
              </ul>
              <div class="links">
                @switch (item.id) {
                  @case ('job-scout') {
                    <a [routerLink]="i18n.link('jobScout')">{{ p.caseStudy }}</a>
                    <a [href]="site.jobScoutDemo" target="_blank" rel="noopener">{{ p.demo }}</a>
                    <a [href]="site.jobScoutRepo" target="_blank" rel="noopener">{{ p.github }}</a>
                  }
                  @case ('delphi') {
                    <a [routerLink]="i18n.link('contact')">{{ p.soonNote }}</a>
                  }
                  @case ('web') {
                    <a [href]="site.github" target="_blank" rel="noopener">{{ p.github }}</a>
                  }
                }
              </div>
            </div>
          </article>
        }
      </div>
    </section>

    <app-cta-band [title]="t.articles.ctaTitle" [text]="t.articles.ctaText" />
  `,
})
export class ProjectsPage {
  protected readonly i18n = inject(I18n);
  protected readonly site = SITE;

  protected statusLabel(status: string): string {
    const s = this.i18n.t().projects.status;
    return status === 'live' ? s.live : status === 'soon' ? s.soon : s.done;
  }
}
