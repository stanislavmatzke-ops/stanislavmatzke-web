import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18n } from '../i18n/i18n.service';
import { SITE } from '../core/site';
import { ContactForm } from '../shared/contact-form';

@Component({
  selector: 'app-home',
  imports: [RouterLink, ContactForm],
  template: `
    @let t = i18n.t();
    @let h = t.home;

    <!-- Úvod -->
    <section class="hero">
      <div class="container hero__inner">
        <div class="hero__text">
          <span class="pill"><span class="pill__dot" aria-hidden="true"></span>{{ t.common.availability }}</span>
          <span class="kicker">{{ h.kicker }}</span>
          <h1 class="display">{{ h.title }}</h1>
          <p class="lead">{{ h.lead }}</p>
          <div class="actions">
            <a class="btn btn--primary" [routerLink]="i18n.link('contact')">{{ t.common.bookCall }}</a>
            <a class="btn btn--ghost" [routerLink]="i18n.link('home')" fragment="ukazky">{{ h.ctaSecondary }}</a>
          </div>
          <ul class="tags" role="list">
            @for (tag of h.tags; track tag) { <li class="tag">{{ tag }}</li> }
          </ul>
        </div>
        <figure class="hero__photo">
          <img [src]="site.portrait" alt="Stanislav Matzke" width="480" height="600" />
          <figcaption>{{ t.common.location }}</figcaption>
        </figure>
      </div>
    </section>

    <!-- Loga -->
    <section class="logos" [attr.aria-label]="h.logosLabel">
      <div class="container logos__inner">
        <span class="logos__label">{{ h.logosLabel }}</span>
        @for (logo of h.logos; track logo) { <span class="logos__item">{{ logo }}</span> }
      </div>
    </section>

    <!-- Je to pro vás? -->
    <section class="section section--tight-bottom">
      <div class="container stack">
        <header class="section-head">
          <span class="eyebrow">{{ h.fit.eyebrow }}</span>
          <h2>{{ h.fit.title }}</h2>
        </header>
        <div class="grid">
          @for (item of h.fit.items; track $index) { <div class="card">{{ item }}</div> }
          <div class="card card--accent">
            <span>{{ h.fit.ctaText }}</span>
            <a [routerLink]="i18n.link('contact')">{{ h.fit.ctaLink }}</a>
          </div>
        </div>
      </div>
    </section>

    <!-- Služby -->
    <section class="section" id="sluzby">
      <div class="container stack">
        <header class="section-head section-head--split">
          <div>
            <span class="eyebrow">{{ h.services.eyebrow }}</span>
            <h2>{{ h.services.title }}</h2>
          </div>
          <a class="link-strong" [routerLink]="i18n.link('services')">{{ h.services.all }}</a>
        </header>
        <div class="grid">
          @for (s of t.services.items; track s.id; let i = $index) {
            <a class="card card--link" [routerLink]="i18n.link('services')" [fragment]="s.id">
              <span class="card__num">{{ pad(i + 1) }}</span>
              <h3>{{ s.title }}</h3>
              <p>{{ s.short }}</p>
            </a>
          }
        </div>
      </div>
    </section>

    <!-- Práce s AI -->
    <section class="band" id="ai">
      <div class="container stack stack--lg">
        <header class="section-head section-head--wide">
          <span class="eyebrow eyebrow--band">{{ h.ai.eyebrow }}</span>
          <h2 class="band__title">{{ h.ai.title }}</h2>
          <p class="band__lead">{{ h.ai.lead }}</p>
        </header>
        <div class="grid grid--3">
          <div class="band-card">
            <h3>{{ h.ai.fastTitle }}</h3>
            <ul>@for (x of h.ai.fast; track x) { <li>{{ x }}</li> }</ul>
          </div>
          <div class="band-card">
            <h3>{{ h.ai.humanTitle }}</h3>
            <ul>@for (x of h.ai.human; track x) { <li>{{ x }}</li> }</ul>
          </div>
          <div class="band-card band-card--filled">
            <span class="band-card__label">{{ h.ai.statLabel }}</span>
            <span class="band-card__stat">{{ h.ai.statValue }}</span>
            <span>{{ h.ai.statText }}</span>
          </div>
        </div>
        <div class="band__foot">
          <span>{{ h.ai.data }}</span>
          <a [routerLink]="i18n.link('ai')">{{ h.ai.articleLink }}</a>
        </div>
      </div>
    </section>

    <!-- Ukázky -->
    <section class="section" id="ukazky">
      <div class="container stack">
        <header class="section-head">
          <span class="eyebrow">{{ h.showcase.eyebrow }}</span>
          <h2>{{ h.showcase.title }}</h2>
        </header>
        <div class="showcase">
          <article class="card card--flush showcase__main">
            <div class="shot" role="img" [attr.aria-label]="t.common.screenshot">{{ t.common.screenshot }}</div>
            <div class="card__body">
              <div class="title-row">
                <h3 class="h3-lg">{{ h.showcase.jobScoutTitle }}</h3>
                <span class="pill pill--small">{{ t.common.live }}</span>
              </div>
              <p class="muted">{{ h.showcase.jobScoutText }}</p>
              <ul class="tags" role="list">
                @for (tag of h.showcase.jobScoutTags; track tag) { <li class="tag tag--small">{{ tag }}</li> }
              </ul>
              <div class="links">
                <a [href]="site.jobScoutDemo" target="_blank" rel="noopener">{{ h.showcase.demo }}</a>
                <a [routerLink]="i18n.link('jobScout')">{{ h.showcase.study }}</a>
                <a [href]="site.jobScoutRepo" target="_blank" rel="noopener">{{ h.showcase.github }}</a>
              </div>
            </div>
          </article>
          <div class="showcase__side">
            <article class="card">
              <span class="pill pill--small pill--warn">{{ t.common.soon }}</span>
              <h3>{{ h.showcase.delphiTitle }}</h3>
              <p class="muted">{{ h.showcase.delphiText }}</p>
            </article>
            <article class="card">
              <span class="pill pill--small pill--neutral">{{ t.common.openSource }}</span>
              <h3>{{ h.showcase.webTitle }}</h3>
              <p class="muted">{{ h.showcase.webText }}</p>
            </article>
          </div>
        </div>
      </div>
    </section>

    <!-- Reference -->
    <section class="section section--ruled" id="reference">
      <div class="container split">
        <header class="split__aside stack stack--sm">
          <span class="eyebrow">{{ h.references.eyebrow }}</span>
          <h2>{{ h.references.title }}</h2>
          <p class="muted">{{ h.references.lead }}</p>
          <a class="link-strong" [routerLink]="i18n.link('references')">{{ h.references.all }}</a>
        </header>
        <ol class="timeline" role="list">
          @for (r of h.references.rows; track r.years) {
            <li>
              <span class="timeline__years">{{ r.years }}</span>
              <span>@if (r.name) { <strong>{{ r.name }}</strong> · }{{ r.text }}</span>
            </li>
          }
        </ol>
      </div>
    </section>

    <!-- Jak pracuji + formy spolupráce -->
    <section class="section section--surface">
      <div class="container split split--even">
        <div class="stack">
          <span class="eyebrow">{{ h.process.eyebrow }}</span>
          <h2>{{ h.process.title }}</h2>
          <ol class="steps" role="list">
            @for (s of h.process.steps; track $index) {
              <li><span class="steps__num">{{ $index + 1 }}</span><span><strong>{{ s.title }}</strong> {{ s.text }}</span></li>
            }
          </ol>
        </div>
        <div class="stack">
          <span class="eyebrow">{{ h.forms.eyebrow }}</span>
          <h2>{{ h.forms.title }}</h2>
          <div class="mini-grid">
            @for (f of h.forms.items; track f.title) {
              <div class="mini-card"><strong>{{ f.title }}</strong><span>{{ f.text }}</span></div>
            }
          </div>
          <p class="muted small">{{ h.forms.note }}</p>
        </div>
      </div>
    </section>

    <!-- Kontakt -->
    <section class="section" id="kontakt">
      <div class="container split split--even">
        <div class="stack">
          <h2 class="h2-xl">{{ h.contact.title }}</h2>
          <p class="lead">{{ h.contact.lead }}</p>
          <div class="contact-list">
            <a [href]="'mailto:' + site.email">{{ site.email }}</a>
            <a [href]="site.phoneHref">{{ site.phone }}</a>
            <a [href]="site.linkedin" target="_blank" rel="noopener">linkedin.com/in/stanislav-matzke</a>
          </div>
        </div>
        <app-contact-form />
      </div>
    </section>
  `,
})
export class HomePage {
  protected readonly i18n = inject(I18n);
  protected readonly site = SITE;
  protected pad(n: number): string {
    return n.toString().padStart(2, '0');
  }
}
