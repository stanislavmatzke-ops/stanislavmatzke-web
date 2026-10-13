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
          <h1 class="display">{{ h.titleStart }} <span class="highlight">{{ h.titleHighlight }}</span></h1>
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

    <!-- 01 Je to pro vás? -->
    <section class="section">
      <div class="container stack stack--lg">
        <header class="section-head">
          <span class="eyebrow eyebrow--num" data-num="01">{{ h.fit.eyebrow }}</span>
          <h2>{{ h.fit.title }}</h2>
        </header>
        <div class="grid">
          @for (item of h.fit.items; track $index) {
            <div class="card card--quote">
              <h3>{{ item.title }}</h3>
              <p>{{ item.text }}</p>
            </div>
          }
          <div class="card card--accent">
            <span>{{ h.fit.ctaText }}</span>
            <a [routerLink]="i18n.link('contact')">{{ h.fit.ctaLink }}</a>
          </div>
        </div>
      </div>
    </section>

    <!-- 02 Služby -->
    <section class="section section--surface" id="sluzby">
      <div class="container stack stack--lg">
        <header class="section-head section-head--split">
          <div>
            <span class="eyebrow eyebrow--num" data-num="02">{{ h.services.eyebrow }}</span>
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

    <!-- 03 Postaveno s AI (ukázky) -->
    <section class="band" id="ukazky">
      <div class="container stack stack--lg">
        <div class="band__head">
          <header class="section-head section-head--wide">
            <span class="eyebrow eyebrow--band eyebrow--num" data-num="03">{{ h.built.eyebrow }}</span>
            <h2 class="band__title">{{ h.built.title }}</h2>
            <p class="band__lead">{{ h.built.lead }}</p>
          </header>
          <div class="band-stat">
            <span class="band-stat__label">{{ h.built.statLabel }}</span>
            <span class="band-stat__value">{{ h.built.statValue }}</span>
            <span class="band-stat__text">{{ h.built.statText }}</span>
          </div>
        </div>

        <div class="showcase">
          <article class="band-card band-card--main showcase__main">
            <a class="shot-img" [routerLink]="i18n.link('jobScout')">
              <img src="img/job-scout-cover.webp" [alt]="t.jobScout.imageAlt" width="1600" height="1000" loading="lazy" />
            </a>
            <div class="band-card__body">
              <div class="title-row">
                <h3 class="h3-lg">{{ h.built.jobScoutTitle }}</h3>
                <span class="pill pill--small pill--band">{{ t.common.live }}</span>
              </div>
              <p>{{ h.built.jobScoutText }}</p>
              <ul class="tags tags--band" role="list">
                @for (tag of h.built.jobScoutTags; track tag) { <li class="tag tag--small">{{ tag }}</li> }
              </ul>
              <div class="links links--band">
                <a [href]="site.jobScoutDemo" target="_blank" rel="noopener">{{ h.built.demo }}</a>
                <a [routerLink]="i18n.link('jobScout')">{{ h.built.study }}</a>
                <a [routerLink]="i18n.link('projects')">{{ t.nav.showcase }} →</a>
                <a [href]="site.jobScoutRepo" target="_blank" rel="noopener">{{ h.built.github }}</a>
              </div>
            </div>
          </article>
          <div class="showcase__side">
            <article class="band-card">
              <span class="pill pill--small pill--warn">{{ t.common.soon }}</span>
              <h3>{{ h.built.delphiTitle }}</h3>
              <p>{{ h.built.delphiText }}</p>
            </article>
            <article class="band-card">
              <span class="pill pill--small pill--band-neutral">{{ t.common.openSource }}</span>
              <h3>{{ h.built.webTitle }}</h3>
              <p>{{ h.built.webText }}</p>
            </article>
          </div>
        </div>

        <div class="band__foot">
          <span>{{ h.built.data }}</span>
          <a [routerLink]="i18n.articleLink('co-ai-agent-pokazil')">{{ h.built.articleLink }}</a>
        </div>
      </div>
    </section>

    <!-- 04 Články -->
    <section class="section">
      <div class="container stack stack--lg">
        <header class="section-head section-head--split">
          <div>
            <span class="eyebrow eyebrow--num" data-num="04">{{ h.articles.eyebrow }}</span>
            <h2>{{ h.articles.title }}</h2>
          </div>
          <a class="link-strong" [routerLink]="i18n.link('articles')">{{ h.articles.all }}</a>
        </header>
        <div class="grid grid--2">
          @for (a of t.articles.items; track a.slug) {
            <a class="card card--link card--article" [routerLink]="i18n.articleLink(a.slug)">
              <span class="card__num">{{ a.date }} · {{ a.readTime }}</span>
              <h3>{{ a.title }}</h3>
              <p>{{ a.perex }}</p>
              <span class="link-strong">{{ t.common.readArticle }}</span>
            </a>
          }
        </div>
      </div>
    </section>

    <!-- 05 Reference -->
    <section class="section section--surface" id="reference">
      <div class="container split">
        <header class="split__aside stack stack--sm">
          <span class="eyebrow eyebrow--num" data-num="05">{{ h.references.eyebrow }}</span>
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

    <!-- 06 Jak pracuji + formy spolupráce -->
    <section class="section">
      <div class="container split split--even">
        <div class="stack">
          <span class="eyebrow eyebrow--num" data-num="06">{{ h.process.eyebrow }}</span>
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
    <section class="section section--contact" id="kontakt">
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
