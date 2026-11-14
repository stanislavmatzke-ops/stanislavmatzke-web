---
typ: pripadova-studie
slug: job-scout
jazyk: cs
url: /projekty/job-scout
titulek: "Job Scout: chytrý pomocník pro hledání práce"
perex: "Kompletní webová aplikace, která každé ráno projde nové nabídky práce, ohodnotí je podle vašeho životopisu, k nejlepším připraví návrh průvodního dopisu a pošle souhrn e-mailem. AI předvybírá, člověk rozhoduje."
meta_description: "Chytrý pomocník pro hledání práce: nabídky ohodnocené podle životopisu, návrhy dopisů, ranní e-mail. .NET 10, Angular, Claude API, Azure. Jeden člověk s AI za ~3 dny."
og_title: "Job Scout – případová studie – Stanislav Matzke"
datum_publikace: 2026-10-13
datum_aktualizace:
doba_cteni: 
og_image: /img/job-scout-og.jpg
souvisejici: [co-ai-agent-pokazil]
cta: { titulek: "Chcete vědět, co by AI udělala s vaším systémem?", text: "Probereme to na nezávazném hovoru." }
stav: publikovano
preklad: [CS: /projekty/job-scout, EN: /en/projects/job-scout]
zrcadleno_z_webu: 2026-11-14
---

# Job Scout: chytrý pomocník pro hledání práce

*Případová studie*

Kompletní webová aplikace, která každé ráno projde nové nabídky práce, ohodnotí je podle vašeho životopisu, k nejlepším připraví návrh průvodního dopisu a pošle souhrn e-mailem. AI předvybírá, člověk rozhoduje.

[Vyzkoušet bez registrace](https://jobscout.stanislavmatzke.com) · [Zdrojový kód na GitHubu](https://github.com/stanislavmatzke-ops/job-scout)

![Job Scout – nabídky ohodnocené podle životopisu, přihlášení přes Microsoft a Google, ranní e-mail a náklady na AI](img/job-scout-cover.webp)  
*Ilustrace aplikace – firmy a nabídky jsou smyšlené.*

<!-- blok: fakta -->
- **~3 dny:** intenzivní práce s AI agentem
- **2–3 měsíce:** odhad pro tříčlenný tým bez AI
- **600+:** automatických testů
- **21:** zapsaných architektonických rozhodnutí

## Proč vznikl

Hledání práce zná každý: desítky portálů, stovky inzerátů a hodiny čtení, než najdete pár nabídek, které opravdu sedí. Chtěl jsem ukázat, že s AI se dá rychle postavit aplikace, která tuhle práci udělá za vás – a přitom splňuje všechno, co se od skutečného produktu čeká: přihlášení, víc uživatelů, ochranu dat, hlídání nákladů a provoz v cloudu.

Výsledek běží naostro, sám ho denně používám a vyzkoušet si ho může každý – bez registrace, na ukázkovém účtu se skutečnými aktuálními nabídkami.

## Jak funguje

<!-- blok: časová osa -->
- **1 – Přihlášení**  
  Účtem Microsoft nebo Google – žádná nová hesla.
- **2 – Životopis**  
  Nahrajete CV a pár poznámek („plně na dálku, žádná Java“). AI z nich sestaví váš profil.
- **3 – Hledání každé ráno**  
  V 6:30 se stáhnou jen nové nabídky; levný model roztřídí titulky, silnější ohodnotí zbytek 1–10.
- **4 – Dopis a e-mail** <!-- aktuální etapa -->  
  K nejlepším nabídkám návrh průvodního dopisu, ráno souhrn e-mailem. Nic se neodesílá samo.

## Pod kapotou – pro vývojáře

Pro ty, kdo chtějí vědět, jak je to postavené. Všechna rozhodnutí včetně zamítnutých alternativ jsou zapsaná jako ADR ve veřejném repozitáři.

### Přihlášení a přístup

- OpenID Connect s Microsoftem a Googlem, žádná vlastní hesla.
- Vzor BFF: prohlížeč nikdy nevidí token, jen cookie HttpOnly / Secure / __Host-; ochrana proti CSRF.
- Přístup na schválení správcem, pozvánky jedním odkazem; oprávnění se čtou z databáze při každém požadavku.

### AI, která se dá řídit a zaplatit

- Pipeline místo jednoho drahého volání: levný model (Haiku) třídí po dávkách, silnější (Sonnet) hodnotí a píše dopisy.
- Strukturovaný výstup s JSON schématem a validací – výstupu AI se nikdy slepě nevěří; CV a inzeráty jsou pro model nedůvěryhodná data.
- Každé volání se zapíše s tokeny a cenou; limity na kliknutí (klouzavých 24 h) a záchranná brzda pro celou aplikaci.
- Vlastní úzké rozhraní k LLM – model se mění v konfiguraci, aplikace nezná SDK dodavatele.

### Cloud a provoz

- Celé prostředí jako kód (Bicep), nasazení jedním skriptem.
- Jeden Docker obraz (Angular + API + worker + headless Chromium) z GitHub Actions; Azure Container Apps + Container Apps Job pro ranní běh.
- Tajné údaje jen v Key Vaultu přes managed identity; PostgreSQL, data v EU; e-maily přes Azure Communication Services s SPF a DKIM.

### Kvalita a bezpečnost

- 600+ automatických testů (533 .NET + 85 Angular) bez sítě a bez volání AI; architektonické testy hlídají vrstvy.
- CI na každý commit, CodeQL, Dependabot, kontrola zranitelných balíčků, bezpečnostní hlavičky, rate limiting.
- Modulární monolit s porty a adaptéry; 21 ADR veřejně na GitHubu.

<!-- blok: karty -->
- **Backend · .NET 10 · ASP.NET Core · EF Core**
- **Frontend · Angular 21 · signals · CZ / EN**
- **AI · Claude API · Haiku + Sonnet**
- **Cloud · Azure Container Apps · PostgreSQL · Key Vault**

<!-- blok: odkaz -->
[Co agent při vývoji pokazil a jak jsem na to přišel →](/clanky/co-ai-agent-pokazil)

<!-- blok: CTA pás -->
> Chcete vědět, co by AI udělala s vaším systémem?  
> Probereme to na nezávazném hovoru.
>
> [Domluvit nezávazný hovor](/kontakt)
