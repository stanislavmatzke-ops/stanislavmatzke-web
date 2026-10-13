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
- **Azure Static Web Apps** (Free tier), deployed by GitHub Actions on every push to `main`

## Running locally

Requires Node.js 22.12 or newer.

```bash
npm install
npm start          # http://localhost:4200
npm run build      # production build in dist/stanislavmatzke-web/browser
```

## Project structure

| What | Where |
| --- | --- |
| Texts – Czech (source) | `src/app/i18n/cs.ts` |
| Texts – English | `src/app/i18n/en.ts` |
| URL paths in both languages | `src/app/i18n/types.ts` (`PATHS`) |
| Contact and company details | `src/app/core/site.ts` |
| Title, description, canonical, hreflang, Open Graph | `src/app/core/seo.service.ts` |
| Pages | `src/app/pages/` |
| Header, footer | `src/app/layout/` |
| Shared components (article blocks, contact form, logo) | `src/app/shared/` |
| Colours, typography, layout | `src/styles.css` |
| Images, fonts, favicon, `robots.txt`, `sitemap.xml` | `public/` |
| Hosting config – routing fallback, security headers, caching | `public/staticwebapp.config.json` |

## Adding a page or an article

Prerendered pages are listed in three places that must stay in sync: `src/app/app.routes.server.ts` (generated from `PATHS` and the article list automatically), `public/sitemap.xml` and the `routes` rewrites in `public/staticwebapp.config.json`.

## Pages

| Czech | English |
| --- | --- |
| `/` | `/en` |
| `/sluzby` | `/en/services` |
| `/projekty` | `/en/projects` |
| `/projekty/job-scout` | `/en/projects/job-scout` |
| `/clanky`, `/clanky/:slug` | `/en/articles`, `/en/articles/:slug` |
| `/reference` | `/en/references` |
| `/o-mne` | `/en/about` |
| `/kontakt` | `/en/contact` |
| `/ochrana-osobnich-udaju` | `/en/privacy` |

## Security and privacy

- Static site only – no backend, no database, no user accounts, no secrets in the repository.
- The contact form opens the visitor's e-mail client (`mailto:`); the site itself cannot send e-mail, so it cannot be abused to flood an inbox.
- Strict security headers: Content-Security-Policy (`script-src 'self'`, no third-party origins), HSTS, `X-Frame-Options: DENY`, `nosniff`, Referrer-Policy, Permissions-Policy.
- No cookies, no analytics, no external fonts or scripts.
- The deployment token lives only in GitHub Actions secrets; pull requests from forks never get a preview deployment.
- Dependabot keeps npm packages and GitHub Actions up to date.

See [SECURITY.md](SECURITY.md) for reporting a vulnerability.

## Roadmap

- [ ] Contact form backed by a small .NET Azure Function and Azure Communication Services – with a honeypot, CAPTCHA (Cloudflare Turnstile), per-IP rate limiting and a daily cap
- [ ] Company logos in the references section
- [ ] Cookie-less, privacy-friendly analytics

## License

The **source code** is released under the [MIT License](LICENSE).
The **content** – texts, articles and photographs – is © Stanislav Matzke, all rights reserved; see [CONTENT-LICENSE.md](CONTENT-LICENSE.md).
