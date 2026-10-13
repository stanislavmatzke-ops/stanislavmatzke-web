# stanislavmatzke.com

Osobní web Stanislava Matzkeho – služby, ukázky práce, reference. Angular 21, čeština a angličtina, světlý a tmavý režim.

## Spuštění lokálně (Windows)

Potřebuješ Node.js 22 a npm (stejné jako pro Job Scout).

```powershell
cd "C:\Users\stani\Documents\Claude\Projects\New Job\dev\web\stanislavmatzke-web"
npm install        # poprvé, trvá 1–2 minuty
npm start          # otevře http://localhost:4200
```

Změny v souborech se v prohlížeči projeví samy. Zastavení: `Ctrl+C`.

Produkční build na zkoušku: `npm run build` → výsledek ve složce `dist/`.

## Kde co je

| Co | Kde |
| --- | --- |
| **Texty (čeština)** | `src/app/i18n/cs.ts` |
| **Texty (angličtina)** | `src/app/i18n/en.ts` – kompilátor hlídá, že nic nechybí |
| Kontaktní a fakturační údaje (IČO, adresa, e-mail…) | `src/app/core/site.ts` |
| Adresy stránek v obou jazycích | `src/app/i18n/types.ts` (`PATHS`) |
| Barvy, písma, rozvržení (světlý i tmavý režim) | `src/styles.css` (proměnné nahoře) |
| Stránky | `src/app/pages/` |
| Hlavička, patička | `src/app/layout/` |
| Fotka, CV ke stažení, favicon | `public/` |

## Stránky

| Česky | Anglicky |
| --- | --- |
| `/` | `/en` |
| `/sluzby` | `/en/services` |
| `/prace-s-ai` | `/en/working-with-ai` |
| `/projekty/job-scout` | `/en/projects/job-scout` |
| `/reference` | `/en/references` |
| `/o-mne` | `/en/about` |
| `/kontakt` | `/en/contact` |
| `/ochrana-osobnich-udaju` | `/en/privacy` |

## Nasazení

Azure Static Web Apps (Free), nasazení z GitHub Actions při každém pushi do `main`.

- Build: `app_location: "/"`, `output_location: "dist/stanislavmatzke-web/browser"`
- `public/staticwebapp.config.json` – směrování všech adres na Angular, bezpečnostní hlavičky
- **Dokud web není spuštěný naostro:** hlavička `X-Robots-Tag: noindex` a `robots.txt` zakazují indexování.
  Při spuštění odstranit `X-Robots-Tag` a upravit `robots.txt` (návod je v něm).

## Před spuštěním naostro (TODO)

- [ ] IČO a adresa sídla v `site.ts`
- [ ] Snímek obrazovky Job Scout (místo zástupného rámečku)
- [ ] Loga firem místo textových názvů (po kontrole smluv / NDA)
- [ ] Předgenerování stránek (prerender) kvůli vyhledávačům – `@angular/ssr`, `outputMode: static`
- [ ] Písma hostovat u sebe (GDPR) místo Google Fonts
- [ ] Kontaktní formulář → .NET Azure Function + Azure Communication Services (teď otevře e-mailový program)
- [ ] `sitemap.xml`, `robots.txt`, Open Graph obrázek, analytika bez cookies
- [ ] GitHub repozitář, Azure Static Web Apps, doména, e-mail na doméně (Microsoft 365)
