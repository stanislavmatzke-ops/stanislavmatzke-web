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
npm start              # http://localhost:4200, včetně konceptů (stav: koncept)
npm run build          # produkční build do dist/stanislavmatzke-web/browser, bez konceptů
npm run build:drafts   # produkční build včetně konceptů, pro lokální kontrolu
npm test               # testy převodu obsahu (node:test, bez závislostí)
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
| Články, případové studie, stránky (markdown) | `content/clanky/`, `content/projekty/`, `content/stranky/` |
| Oblasti článků (názvy, úvody, slugy) | `content/stranky/oblasti.md` |
| Převod obsahu (markdown → data, sitemap, RSS, přesměrování) | `scripts/build-content.mjs`, `scripts/content/` |
| Formát obsahu – pole hlavičky, značky bloků | `scripts/content/schema.mjs` |
| Texty rozhraní – čeština (zdroj) | `src/app/i18n/cs.ts` |
| Texty rozhraní – angličtina | `src/app/i18n/en.ts` |
| Adresy stránek v obou jazycích | `src/app/i18n/paths.json` |
| Kontaktní a fakturační údaje | `src/app/core/site.ts` |
| Titulek, popis, canonical, hreflang, Open Graph, JSON-LD | `src/app/core/seo.service.ts` |
| Stránky | `src/app/pages/` |
| Hlavička, patička | `src/app/layout/` |
| Sdílené komponenty (bloky obsahu, karta článku, formulář, logo) | `src/app/shared/` |
| Barvy, typografie, rozvržení | `src/styles.css` |
| Obrázky, písma, favicon, `robots.txt` | `public/` |
| Konfigurace hostingu – fallback, bezpečnostní hlavičky, cache | `staticwebapp.config.base.json` |
| API kontaktního formuláře (.NET) | `api/` |

## Obsah: jak se texty dostanou na web

Články, případové studie a stránky *Důvěrnost* a *Otázky* jsou markdown soubory s YAML hlavičkou od editora. **Předávka textu = zkopírovat soubor do `content/` a spustit build.** Nikdo ho nepřepisuje do TypeScriptu.

- `content/clanky/<slug>.md` + `<slug>.en.md` – články, `/clanky/<slug>` a `/en/articles/<slug>` (stejný slug v obou jazycích)
- `content/projekty/<slug>.md` + `.en.md` – případové studie; anglický slug se může lišit (rozhoduje `url` a `preklad` v hlavičce), obrázky patří do `public/img/`
- `content/stranky/` – stránky psané v markdownu a `oblasti.md` (tabulka oblastí článků)

Před `ng build` / `ng serve` převede `scripts/build-content.mjs` (čistý Node, bez závislostí) markdown na typovaná data a vygeneruje:

| Vygenerovaný soubor (není v gitu) | Co |
| --- | --- |
| `src/app/content/content.generated.ts`, `src/app/content/bodies/` | články, studie, stránky a oblasti jako typovaná data; text každého je samostatný modul načtený až pro jeho stránku, takže hlavní balík s dalšími články neroste |
| `public/sitemap.xml` | všechny stránky s hreflang a `lastmod` |
| `public/clanky/feed.xml`, `public/en/articles/feed.xml` | RSS článků |
| `public/staticwebapp.config.json` | `staticwebapp.config.base.json` + přesměrování pro každou předgenerovanou stránku |

Pole hlavičky a značky bloků jsou definované na jednom místě, `scripts/content/schema.mjs`. Jakýkoli problém – neznámé pole hlavičky, chybějící překlad, neznámý blok, odkaz na neexistující stránku, chybějící obrázek – **zastaví build** hláškou `soubor:řádek: co je špatně`. Typová kontrola potřebuje vygenerovaný soubor, takže po čerstvém klonu spusťte `npm start`, `npm run build` nebo `npm run content`.

**Koncepty:** položky se `stav: koncept` ukáže `npm start` a `npm run build:drafts`, ale `npm run build` je vynechá – produkční build v CI koncept nikdy nezveřejní. Stránka v konceptu zmizí i z menu a patičky a zveřejněný text, který na koncept odkazuje, build zastaví.

## Přidání stránky nebo článku

- **Článek nebo případová studie:** přidejte markdown do `content/` a spusťte build. Routy, předgenerování, sitemap, RSS i přesměrování ve Static Web Apps plynou z obsahu – dřívější „tři místa“ teď řeší build.
- **Nová stránka z markdownu** (jako `/duvernost`): klíč a adresy do `src/app/i18n/paths.json` (`cs`, `en` a `contentPages`), klíč namapovat na `ContentPageView` v `src/app/app.routes.ts` a markdown do `content/stranky/`.
- **Nová stránka s vlastní šablonou:** do `paths.json` a `app.routes.ts`, texty do `cs.ts` / `en.ts`. Sitemap a přesměrování se generují z `paths.json`.

## Stránky

| Česky | Anglicky |
| --- | --- |
| `/` | `/en` |
| `/sluzby` | `/en/services` |
| `/projekty`, `/projekty/<slug>` | `/en/projects`, `/en/projects/<slug>` |
| `/clanky`, `/clanky/<slug>` | `/en/articles`, `/en/articles/<slug>` |
| `/clanky/tema/<oblast>` | `/en/articles/topic/<area>` |
| `/duvernost` | `/en/confidentiality` |
| `/otazky` | `/en/faq` |
| `/reference` | `/en/references` |
| `/o-mne` | `/en/about` |
| `/kontakt` | `/en/contact` |
| `/ochrana-osobnich-udaju` | `/en/privacy` |

RSS: `/clanky/feed.xml`, `/en/articles/feed.xml`.

## Bezpečnost a soukromí

- Statický web a jeden malý API endpoint – žádná databáze, uživatelské účty ani tajné údaje v repozitáři.
- Kontaktní formulář posílá na `/api/contact`, který e-mailuje vždy jen do mé schránky (Reply-To je návštěvník; žádný potvrzovací e-mail, takže formulářem nejde posílat poštu jiným lidem). Ochrana: kontrola původu požadavku, past na roboty, minimální doba vyplnění, filtr na zprávy plné odkazů, validace vstupu, limit zpráv na připojení za hodinu a denní strop pro celý web.
- Přísné bezpečnostní hlavičky: Content-Security-Policy (`script-src 'self'` plus měřicí skript Cloudflare, nic jiného), HSTS, `X-Frame-Options: DENY`, `nosniff`, Referrer-Policy, Permissions-Policy.
- Žádné cookies ani cizí písma; jediný skript třetí strany je měření návštěvnosti bez cookies – [Cloudflare Web Analytics](https://www.cloudflare.com/web-analytics/).
- Token pro nasazení je jen v GitHub Actions secrets; pull requesty z forků nikdy nedostanou náhledové nasazení.
- Dependabot hlídá aktualizace npm balíčků i GitHub Actions.

Nahlášení bezpečnostní chyby: viz [SECURITY.md](SECURITY.md).

## Plán

- [ ] CAPTCHA (Cloudflare Turnstile) pro formulář – jen pokud by spam prošel současnou ochranou
- [ ] Loga firem v referencích

## Licence

**Zdrojový kód** je pod [licencí MIT](LICENSE).
**Obsah** – texty, články a fotografie – je © Stanislav Matzke, všechna práva vyhrazena; viz [CONTENT-LICENSE.md](CONTENT-LICENSE.md).
