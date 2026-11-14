# stanislavmatzke.com

**English** · [Česky](README.cs.md)

Personal website of **Stanislav Matzke** – freelance software architect and developer (.NET, Java, Oracle, Azure, AI).

**Live:** [stanislavmatzke.com](https://stanislavmatzke.com) · Czech and English · light and dark mode

The site itself is one of the showcase projects: design, code, texts in two languages, Azure hosting with a custom domain, CI/CD and e-mail on the domain (SPF, DKIM, DMARC) were built in about a day together with an AI coding agent – reviewed and directed by a human.

## Tech stack

- **Angular 21** – standalone components, signals, zoneless change detection, no UI library
- **Typed i18n** – Czech is the source dictionary, the English one must match its type (`Content = typeof cs`), so a missing translation is a compile error
- **Plain CSS** with custom properties for the light and dark theme
- **Prerendered at build time** (`outputMode: static`) – every page in both languages ships as ready-made HTML with its own title, description and Open Graph tags, then hydrates in the browser
- **Self-hosted fonts** (IBM Plex Sans, IBM Plex Mono, Newsreader) – no third-party requests
- **Contact API** – .NET 10 isolated Azure Function (`api/`), e-mail via Azure Communication Services
- **Azure Static Web Apps** (Free tier), deployed by GitHub Actions on every push to `main`

## Running locally

Requires Node.js 22.12 or newer.

```bash
npm install
npm start              # http://localhost:4200, including drafts (stav: koncept)
npm run build          # production build in dist/stanislavmatzke-web/browser, drafts left out
npm run build:drafts   # production build including drafts, to check it locally
npm test               # tests of the content conversion (node:test, no dependencies)
```

The contact form needs the API. To run both together, use the [Static Web Apps CLI](https://github.com/Azure/static-web-apps-cli) and [Azure Functions Core Tools](https://learn.microsoft.com/azure/azure-functions/functions-run-local):

```bash
cp api/local.settings.example.json api/local.settings.json   # without a connection string nothing is sent (the form shows an error)
npx @azure/static-web-apps-cli start http://localhost:4200 --api-location api --run "npm start"
# → http://localhost:4280
```

In Azure the API reads `CONTACT_ACS_CONNECTION_STRING` (and optionally `CONTACT_FROM`, `CONTACT_TO`, `CONTACT_LIMIT_PER_HOUR`, `CONTACT_LIMIT_PER_DAY`) from the Static Web App's environment variables.

## Project structure

| What | Where |
| --- | --- |
| Articles, case studies, content pages (markdown) | `content/clanky/`, `content/projekty/`, `content/stranky/` |
| Article areas (names, intros, slugs) | `content/stranky/oblasti.md` |
| Content conversion (markdown → data, sitemap, RSS, rewrites) | `scripts/build-content.mjs`, `scripts/content/` |
| Content format – header fields, block markers | `scripts/content/schema.mjs` |
| UI texts – Czech (source) | `src/app/i18n/cs.ts` |
| UI texts – English | `src/app/i18n/en.ts` |
| URL paths in both languages | `src/app/i18n/paths.json` |
| Contact and company details | `src/app/core/site.ts` |
| Title, description, canonical, hreflang, Open Graph, JSON-LD | `src/app/core/seo.service.ts` |
| Pages | `src/app/pages/` |
| Header, footer | `src/app/layout/` |
| Shared components (content blocks, article card, contact form, logo) | `src/app/shared/` |
| Colours, typography, layout | `src/styles.css` |
| Images, fonts, favicon, `robots.txt` | `public/` |
| Hosting config – routing fallback, security headers, caching | `staticwebapp.config.base.json` |
| Contact form API (.NET) | `api/` |

## Content: how texts get to the web

Articles, case studies and the pages *Confidentiality* and *FAQ* are markdown files with a YAML header, written by the editor. **Handing over a text = copying the file into `content/` and running the build.** Nobody rewrites it into TypeScript.

- `content/clanky/<slug>.md` + `<slug>.en.md` – articles, `/clanky/<slug>` and `/en/articles/<slug>` (same slug in both languages)
- `content/projekty/<slug>.md` + `.en.md` – case studies; the English slug may differ (`url` and `preklad` in the header decide), images go to `public/img/`
- `content/stranky/` – pages written in markdown and `oblasti.md` (the table of article areas)

Before `ng build` / `ng serve`, `scripts/build-content.mjs` (plain Node, no dependencies) converts the markdown into typed data and generates:

| Generated file (not in git) | What |
| --- | --- |
| `src/app/content/content.generated.ts` | articles, case studies, pages and areas as typed data (`Article`, `CaseStudy`, `Block`…) |
| `public/sitemap.xml` | every page with hreflang and `lastmod` |
| `public/clanky/feed.xml`, `public/en/articles/feed.xml` | RSS feeds of the articles |
| `public/staticwebapp.config.json` | `staticwebapp.config.base.json` + a rewrite for every prerendered page |

The header fields and block markers are defined in one place, `scripts/content/schema.mjs`. Any problem – an unknown header field, a missing translation, an unknown block, a link to a page that does not exist, a missing image – **stops the build** with `file:line: what is wrong`. Type checking needs the generated file, so run `npm start`, `npm run build` or `npm run content` after a fresh clone.

**Drafts:** items with `stav: koncept` are shown by `npm start` and `npm run build:drafts` but left out of `npm run build` – the production build in CI never publishes a draft. A draft page also disappears from the menu and footer, and a published text that links to a draft fails the build.

## Adding a page or an article

- **An article or a case study:** add the markdown files to `content/` and run the build. Routes, prerendering, sitemap, RSS and Static Web Apps rewrites all follow from the content – the old "three places" are now handled by the build.
- **A new content page** (like `/duvernost`): add its key and paths to `src/app/i18n/paths.json` (`cs`, `en` and `contentPages`), map the key to `ContentPageView` in `src/app/app.routes.ts`, and add the markdown to `content/stranky/`.
- **A new page with its own template:** add it to `paths.json` and `app.routes.ts`, and its texts to `cs.ts` / `en.ts`. Sitemap and rewrites are generated from `paths.json`.

## Pages

| Czech | English |
| --- | --- |
| `/` | `/en` |
| `/sluzby` | `/en/services` |
| `/projekty`, `/projekty/<slug>` | `/en/projects`, `/en/projects/<slug>` |
| `/clanky`, `/clanky/<slug>` | `/en/articles`, `/en/articles/<slug>` |
| `/clanky/tema/<area>` | `/en/articles/topic/<area>` |
| `/duvernost` | `/en/confidentiality` |
| `/otazky` | `/en/faq` |
| `/reference` | `/en/references` |
| `/o-mne` | `/en/about` |
| `/kontakt` | `/en/contact` |
| `/ochrana-osobnich-udaju` | `/en/privacy` |

Feeds: `/clanky/feed.xml`, `/en/articles/feed.xml`.

## Security and privacy

- Static site plus one small API endpoint – no database, no user accounts, no secrets in the repository.
- The contact form posts to `/api/contact`, which only ever e-mails my own inbox (Reply-To is the visitor; no confirmation mail, so it cannot be used to send mail to others). Protection: same-origin check, honeypot, minimum fill time, link-stuffing filter, input validation, a per-client hourly limit and a daily cap for the whole site.
- Strict security headers: Content-Security-Policy (`script-src 'self'` plus the Cloudflare analytics beacon, nothing else), HSTS, `X-Frame-Options: DENY`, `nosniff`, Referrer-Policy, Permissions-Policy.
- No cookies and no external fonts; the only third-party script is cookie-less [Cloudflare Web Analytics](https://www.cloudflare.com/web-analytics/).
- The deployment token lives only in GitHub Actions secrets; pull requests from forks never get a preview deployment.
- Dependabot keeps npm packages and GitHub Actions up to date.

See [SECURITY.md](SECURITY.md) for reporting a vulnerability.

## Roadmap

- [ ] CAPTCHA (Cloudflare Turnstile) for the contact form – only if spam gets through the current protection
- [ ] Company logos in the references section

## License

The **source code** is released under the [MIT License](LICENSE).
The **content** – texts, articles and photographs – is © Stanislav Matzke, all rights reserved; see [CONTENT-LICENSE.md](CONTENT-LICENSE.md).
