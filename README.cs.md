# stanislavmatzke.com

[English](README.md) · **Česky**

Osobní web **Stanislava Matzkeho** – softwarový architekt a vývojář na volné noze (.NET, Java, Oracle, Azure, AI).

**Web:** [stanislavmatzke.com](https://stanislavmatzke.com) · čeština a angličtina · světlý a tmavý režim

Web je sám jednou z ukázek práce: návrh, kód, texty ve dvou jazycích, hosting v Azure s vlastní doménou, CI/CD i e-mail na doméně (SPF, DKIM, DMARC) vznikly zhruba za jeden den společně s AI agentem – pod vedením a kontrolou člověka.

## Technologie

- **Angular 21** – standalone komponenty, signals, bez zone.js, bez UI knihovny
- **Typované překlady** – čeština je zdrojový slovník, anglický musí odpovídat jeho typu (`Content = typeof cs`), takže chybějící překlad je chyba při kompilaci
- **Čisté CSS** s proměnnými pro světlý a tmavý režim
- **Písma hostovaná u sebe** (IBM Plex Sans, IBM Plex Mono, Newsreader) – žádné požadavky na třetí strany
- **Azure Static Web Apps** (Free), nasazení přes GitHub Actions při každém pushi do `main`

## Spuštění lokálně

Potřeba Node.js 22.12 nebo novější.

```bash
npm install
npm start          # http://localhost:4200
npm run build      # produkční build do dist/stanislavmatzke-web/browser
```

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
| Obrázky, CV, písma, favicon, `robots.txt`, `sitemap.xml` | `public/` |
| Konfigurace hostingu – směrování, bezpečnostní hlavičky, cache | `public/staticwebapp.config.json` |

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

- Čistě statický web – žádný backend, databáze, uživatelské účty ani tajné údaje v repozitáři.
- Kontaktní formulář otevře e-mailový program návštěvníka (`mailto:`); web sám e-maily neodesílá, takže jím nejde zahltit schránku.
- Přísné bezpečnostní hlavičky: Content-Security-Policy (`script-src 'self'`, žádné cizí zdroje), HSTS, `X-Frame-Options: DENY`, `nosniff`, Referrer-Policy, Permissions-Policy.
- Žádné cookies, analytika, cizí písma ani skripty.
- Token pro nasazení je jen v GitHub Actions secrets; pull requesty z forků nikdy nedostanou náhledové nasazení.
- Dependabot hlídá aktualizace npm balíčků i GitHub Actions.

Nahlášení bezpečnostní chyby: viz [SECURITY.md](SECURITY.md).

## Plán

- [ ] Předgenerování stránek (`@angular/ssr`, `outputMode: static`), aby náhledy odkazů na LinkedInu a jinde ukazovaly správný titulek a obrázek
- [ ] Kontaktní formulář přes malou .NET Azure Function a Azure Communication Services – s pastí na roboty, CAPTCHA (Cloudflare Turnstile), limitem na IP adresu a denním stropem
- [ ] Loga firem v referencích
- [ ] Analytika bez cookies, šetrná k soukromí

## Licence

**Zdrojový kód** je pod [licencí MIT](LICENSE).
**Obsah** – texty, články, fotografie a CV – je © Stanislav Matzke, všechna práva vyhrazena; viz [CONTENT-LICENSE.md](CONTENT-LICENSE.md).
