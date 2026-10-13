# stanislavmatzke.com

[English](README.md) · **Česky**

Osobní web **Stanislava Matzkeho** – softwarový architekt a vývojář na volné noze (.NET, Java, Oracle, Azure, AI).

**Web:** [stanislavmatzke.com](https://stanislavmatzke.com) · čeština a angličtina · světlý a tmavý režim

Web je sám jednou z ukázek práce: návrh, kód, texty ve dvou jazycích, hosting v Azure s vlastní doménou, CI/CD i e-mail na doméně (SPF, DKIM, DMARC) vznikly zhruba za jeden den společně s AI agentem – pod vedením a kontrolou člověka.

## Technologie

- **Angular 21** – standalone komponenty, signals, bez zone.js, bez UI knihovny
- **Typované překlady** – čeština je zdrojový slovník, anglický musí odpovídat jeho typu (`Content = typeof cs`), takže chybějící překlad je chyba při kompilaci
- **Čisté CSS** s proměnnými pro světlý a tmavý režim
- **Předgenerováno při buildu** (`outputMode: static`) – každá stránka v obou jazycích je hotové HTML s vlastním titulkem, popisem a Open Graph značkami; v prohlížeči se na něj aplikace jen napojí (hydratace)
- **Písma hostovaná u sebe** (IBM Plex Sans, IBM Plex Mono, Newsreader) – žádné požadavky na třetí strany
- **Kontaktní API** – .NET 10 Azure Function, izolovaný worker (`api/`), e-mail přes Azure Communication Services
- **Azure Static Web Apps** (Free), nasazení přes GitHub Actions při každém pushi do `main`

## Spuštění lokálně

Potřeba Node.js 22.12 nebo novější.

```bash
npm install
npm start          # http://localhost:4200
npm run build      # produkční build do dist/stanislavmatzke-web/browser
```

Kontaktní formulář potřebuje API. Obojí najednou spustíš přes [Static Web Apps CLI](https://github.com/Azure/static-web-apps-cli) a [Azure Functions Core Tools](https://learn.microsoft.com/azure/azure-functions/functions-run-local):

```bash
cp api/local.settings.example.json api/local.settings.json   # bez connection stringu se nic neodešle (formulář ukáže chybu)
npx @azure/static-web-apps-cli start http://localhost:4200 --api-location api --run "npm start"
# → http://localhost:4280
```

V Azure si API čte `CONTACT_ACS_CONNECTION_STRING` (volitelně `CONTACT_FROM`, `CONTACT_TO`, `CONTACT_LIMIT_PER_HOUR`, `CONTACT_LIMIT_PER_DAY`) z proměnných prostředí Static Web App.

## Struktura projektu

| Co | Kde |
| --- | --- |
| Texty – čeština (zdroj) | `src/app/i18n/cs.ts` |
| Texty – angličtina | `src/app/i18n/en.ts` |
| Adresy stránek v obou jazycích | `src/app/i18n/types.ts` (`PATHS`) |
| Kontaktní a fakturační údaje | `src/app/core/site.ts` |
| Titulek, popis, canonical, hreflang, Open Graph | `src/app/core/seo.service.ts` |
| Stránky | `src/app/pages/` |
| Hlavička, patička | `src/app/layout/` |
| Sdílené komponenty (bloky článků, formulář, logo) | `src/app/shared/` |
| Barvy, typografie, rozvržení | `src/styles.css` |
| Obrázky, písma, favicon, `robots.txt`, `sitemap.xml` | `public/` |
| Konfigurace hostingu – směrování, bezpečnostní hlavičky, cache | `public/staticwebapp.config.json` |
| API kontaktního formuláře (.NET) | `api/` |

## Přidání stránky nebo článku

Předgenerované stránky jsou uvedené na třech místech, která musí sedět: `src/app/app.routes.server.ts` (generuje se automaticky z `PATHS` a seznamu článků), `public/sitemap.xml` a přesměrování v `routes` v `public/staticwebapp.config.json`.

## Stránky

| Česky | Anglicky |
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

## Bezpečnost a soukromí

- Statický web a jeden malý API endpoint – žádná databáze, uživatelské účty ani tajné údaje v repozitáři.
- Kontaktní formulář posílá na `/api/contact`, který e-mailuje vždy jen do mé schránky (Reply-To je návštěvník; žádný potvrzovací e-mail, takže formulářem nejde posílat poštu jiným lidem). Ochrana: kontrola původu požadavku, past na roboty, minimální doba vyplnění, filtr na zprávy plné odkazů, validace vstupu, limit zpráv na připojení za hodinu a denní strop pro celý web.
- Přísné bezpečnostní hlavičky: Content-Security-Policy (`script-src 'self'`, žádné cizí zdroje), HSTS, `X-Frame-Options: DENY`, `nosniff`, Referrer-Policy, Permissions-Policy.
- Žádné cookies, analytika, cizí písma ani skripty.
- Token pro nasazení je jen v GitHub Actions secrets; pull requesty z forků nikdy nedostanou náhledové nasazení.
- Dependabot hlídá aktualizace npm balíčků i GitHub Actions.

Nahlášení bezpečnostní chyby: viz [SECURITY.md](SECURITY.md).

## Plán

- [ ] CAPTCHA (Cloudflare Turnstile) pro formulář – jen pokud by spam prošel současnou ochranou
- [ ] Loga firem v referencích
- [ ] Analytika bez cookies, šetrná k soukromí

## Licence

**Zdrojový kód** je pod [licencí MIT](LICENSE).
**Obsah** – texty, články a fotografie – je © Stanislav Matzke, všechna práva vyhrazena; viz [CONTENT-LICENSE.md](CONTENT-LICENSE.md).
