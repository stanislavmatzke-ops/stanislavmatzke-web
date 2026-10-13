import { Component, inject } from '@angular/core';
import { I18n } from '../i18n/i18n.service';
import { SITE } from '../core/site';
import { CtaBand } from '../shared/cta-band';

@Component({
  selector: 'app-about',
  imports: [CtaBand],
  template: `
    @let t = i18n.t();
    @let a = t.about;
    <section class="page-head page-head--pattern">
      <div class="container about">
        <div class="stack">
          <span class="eyebrow">{{ a.eyebrow }}</span>
          <h1>{{ a.title }}</h1>
          @for (p of a.paragraphs; track $index) { <p class="lead">{{ p }}</p> }
        </div>
        <figure class="hero__photo about__photo">
          <img [src]="site.portrait" alt="Stanislav Matzke" width="480" height="600" />
          <figcaption>{{ t.common.location }}</figcaption>
        </figure>
      </div>
    </section>

    <section class="section section--flush-top">
      <div class="container split split--even">
        <div class="stack about-col">
          <h2 class="h2-sm">{{ a.howTitle }}</h2>
          <ul class="checks">@for (x of a.how; track x) { <li>{{ x }}</li> }</ul>

          <h2 class="h2-sm">{{ a.techTitle }}</h2>
          <div class="tech-groups">
            @for (g of a.tech; track g.name) {
              <div class="tech-group">
                <span class="tech-group__name">{{ g.name }}</span>
                <ul class="tags" role="list">@for (x of g.items; track x) { <li class="tag tag--small">{{ x }}</li> }</ul>
              </div>
            }
          </div>

          <h2 class="h2-sm">{{ a.hobbiesTitle }}</h2>
          <p class="muted">{{ a.hobbies }}</p>
        </div>
        <div class="stack about-col">
          <h2 class="h2-sm">{{ a.timelineTitle }}</h2>
          <ol class="timeline" role="list">
            @for (x of a.timeline; track x.years) {
              <li><span class="timeline__years">{{ x.years }}</span><span>{{ x.text }}</span></li>
            }
          </ol>

          <h2 class="h2-sm">{{ a.linksTitle }}</h2>
          <div class="contact-list">
            <a [href]="site.linkedin" target="_blank" rel="noopener">LinkedIn</a>
            <a [href]="site.github" target="_blank" rel="noopener">GitHub</a>
          </div>
        </div>
      </div>
    </section>

    <app-cta-band [title]="t.home.contact.title" [text]="t.home.contact.lead" />
  `,
})
export class AboutPage {
  protected readonly i18n = inject(I18n);
  protected readonly site = SITE;
}
