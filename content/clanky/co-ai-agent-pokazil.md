---
typ: clanek
slug: co-ai-agent-pokazil
jazyk: cs
url: /clanky/co-ai-agent-pokazil
titulek: "Co AI agent při vývoji pokazil – a proč na tom záleží"
perex: "Dvě aplikace, Job Scout a Párování plateb, psal AI agent. Já byl architekt a kontrola. Klasické bezpečnostní chyby agent nedělal. Ty, které udělal, byly zrádnější: kód správně, testy zelené, logika nedomyšlená. Kde AI chybuje, jak jsem na to přišel a jak to ohlídat."
meta_description: "Co AI agent pokazil při vývoji dvou aplikací: nedomyšlená logika, chyby, které ukážou až data, a pasti při nasazení. Jak jsem na ně přišel a jak je ohlídat testy, evaly a lidským okem."
og_title: "Co AI agent při vývoji pokazil – a proč na tom záleží – Stanislav Matzke"
oblast: ai-ve-vyvoji
datum_publikace: 2026-10-13
datum_aktualizace: 2026-11-14
doba_cteni: 8
og_image: /img/job-scout-og.jpg
souvisejici: [necti-kazdy-radek, rychlost-vyvoje, modernizace-bez-velkeho-tresku]
cta: { titulek: "Chcete vědět, co by AI udělala s vaším systémem?", text: "Probereme to na nezávazném hovoru." }
stav: publikovano
preklad: [CS: /clanky/co-ai-agent-pokazil, EN: /en/articles/co-ai-agent-pokazil]
zmeneno_editorem: 2026-11-14
---

# Co AI agent při vývoji pokazil – a proč na tom záleží

*Články · 13. října 2026 · aktualizováno 14. listopadu 2026*

Dvě aplikace, Job Scout a Párování plateb, psal AI agent. Já byl architekt a kontrola. Klasické bezpečnostní chyby agent nedělal. Ty, které udělal, byly zrádnější: kód správně, testy zelené, logika nedomyšlená. Kde AI chybuje, jak jsem na to přišel a jak to ohlídat.

Oba projekty běží veřejně a dají se vyzkoušet. [Job Scout](/projekty/job-scout) každé ráno hodnotí nabídky práce podle životopisu. [Párování plateb s AI](/projekty/parovani-plateb) modernizuje starý systém v Delphi a páruje bankovní platby s fakturami. U Job Scoutu jsem kód od agenta četl řádek po řádku. U Párování plateb už jsem schvaloval plány a kvalitu hlídaly testy a evaly. Chyby agenta se ale v obou projektech dělily do stejných tří skupin.

## Nejdřív to dobré: hloupé chyby už (skoro) nedělá

Typické strašáky „vibe codingu“ se neobjevily ani jednou. Agent sám od sebe držel hesla a API klíče mimo repozitář, validoval vstupy, nepsal ručně skládané SQL, chránil se proti prompt injection a napsal stovky automatických testů. Chyby, které udělal, byly jiného druhu: takové, které žádný linter ani bezpečnostní scanner nenajde.

## 1. Nedomyšlená logika

Tohle jsou chyby, kde agent udělal přesně to, co měl zadané, jen nikdo nedomyslel důsledky.

**Kdokoli mohl „vyžrat“ AI tokeny.** V Job Scoutu přibyla tlačítka „Ohodnotit“ a „Napsat nový návrh dopisu“, každé z nich je placené volání AI. Agent je naprogramoval podle zadání. Nikdo se ale nezeptal, co když někdo klikne tisíckrát. Přišel jsem na to den po spuštění, když jsem si aplikaci sám proklikal. Oprava zabrala jedno dopoledne: limity na kliknutí, denní „záchranná brzda“ s e-mailem správci a měsíční limit u poskytovatele AI. OWASP tohle riziko u aplikací s AI vede jako *Unbounded Consumption*: útok na peněženku je stejně reálný jako únik dat.

**Zamítnutý uživatel se dostal dovnitř.** Přístup do Job Scoutu schvaluje správce. Agent pro „Zamítnout žádost“ použil existující stav „pozastavený účet“, jenže pozastavený uživatel smí vidět svá data. Testy prošly, protože testovaly přesně to, co agent napsal. Nikdo netestoval, že zamítnutý žadatel nemá vidět nic. Našel jsem to ručním testem: zamítl jsem testovací účet a ten se normálně přihlásil.

U Párování plateb byla podobná chyba v nákladech, jen opačně. Agent omezil počet volání AI na jeden sandbox tak přísně, že noví uživatelé čekali na AI několik dní. Skutečnou pojistkou proti vysokému účtu je globální strop a počet nových účtů za den. Na to přijde člověk, který přemýšlí, jak by aplikaci zneužil, ne agent, který plní zadání.

## 2. Chyby, které ukážou až data

Druhá skupina: kód se přeloží a na první pohled vypadá správně. Chyba se ukáže až na konkrétních datech, na jiném operačním systému nebo při souběžném běhu.

| Chyba | Projekt | Co ji chytilo |
|---|---|---|
| Validace pustila eurovou platbu na kombinaci dvou jiných faktur téhož odběratele | Párování plateb | test, který zkusí všechny možné odpovědi, ne vzorek |
| Kód nepoznal, když platbě sedí dvě faktury stejně dobře | Párování plateb | eval v CI, build zčervenal |
| Pravidlo vytažené ze starého kódu bylo o jedno místo vedle | Párování plateb | test proti skutečnému chování starého systému |
| Text pro model se lišil podle operačního systému | Párování plateb | CI na Linuxu během minuty |
| Dvě části (build a nasazení), každá správně, dohromady nefungovaly | Job Scout | první nasazení po změně dokumentace |

Tyhle chyby by člověk při čtení snadno přehlédl, protože kód *vypadá* správně. U Job Scoutu jsem je ještě hledal očima. U Párování plateb je chytaly mechanismy dřív, než na nich cokoli stálo. Proč na to stačí testy a evaly a nemusím číst každý řádek, popisuji v článku [Nečti každý řádek](/clanky/necti-kazdy-radek).

## 3. Provoz a první uživatel

Třetí skupinu nenajde žádný test, protože vzniká až ve skutečném prostředí.

- **Pasti v Azure:** nová databáze s jiným vlastníkem schématu, změna hesla, která tiše shodila běžící aplikaci, a telemetrie, která sama zahodila data krátkého jobu.
- **Díra v nasazovací pipeline:** kontrolovala jen název větve, ne odkud kód pochází. Kdokoli by si mohl udělat kopii repozitáře a poslat změnu, která by se nasadila do produkce. Našlo se to před zveřejněním kódu. CI/CD je kód se stejnými právy jako produkce.
- **První hodina s uživatelem:** nový uživatel čekal na AI do druhého rána a člověk ve frontě neviděl fakturu vedle platby, takže neměl z čeho rozhodnout.

V obou projektech platilo totéž: nejcennější zpětná vazba přišla do 24 hodin od prvního skutečného použití.

## Jak to ohlídat

Po spuštění Job Scoutu jsme aplikaci prošli bod po bodu podle bezpečnostního checklistu pro „vibe coding“. Kontrolu dělal opět agent, a když dostane jasný seznam, je důkladný. Našel i další díru, kterou předtím sám vytvořil: o přístup mohl kdokoli požádat stokrát a správci by přišlo sto e-mailů.

<!-- blok: karty -->
- **Vstupy a injekce**  
  parametrizované dotazy, escapování výstupu, limity velikosti
- **Autorizace**  
  každý dotaz omezený na vlastníka dat, oprávnění z databáze
- **Zneužití**  
  rate limiting, limity na AI, omezení e-mailů
- **CI a závislosti**  
  CodeQL, Dependabot, kontrola zranitelných balíčků

<!-- blok: zdroj -->
[O2 CyberNews: Vibe coding – funkční kód není automaticky bezpečný ↗](https://o2cybernews.cz/clanky/vibe-coding-funkcni-kod-neni-automaticky-bezpecny)

Ke každé skupině chyb patří jiná obrana:

1. **Nedomyšlenou logiku** pohlídá člověk. Musí se zeptat „kolik nás to může stát, když se to zneužije“ a „kdo se kam nesmí dostat“ a k tomu napsat testy na to, co se stát *nesmí*. Agent testuje to, co napsal.
2. **Chyby v datech** pohlídají mechanismy: testy proti chování starého systému, testy všech možných odpovědí, evaly v CI a běh na víc platformách.
3. **Provoz** pohlídá plán: nasazení jako samostatná fáze se smoke testy, limity a hlídání nákladů od prvního dne a brzké puštění malé skupině lidí.

<!-- blok: ponaučení -->
> **Ponaučení**
>
> AI dodá, co zadáte. Otázky „kolik nás to může stát“ a „kdo se kam nesmí dostat“ musí položit člověk. Zbytek chyb chytí mechanismy, pokud je postavíte dřív než aplikaci.

## Co z toho plyne pro firmy

- AI se rychle zlepšuje a klasické bezpečnostní chyby dnes dobrý agent s jasnými pravidly nedělá. To ale neznamená, že je kód hotový.
- Hlídat je potřeba logiku, ne syntaxi: kdo smí co vidět, co se stane při zneužití, kolik to stojí a jak spolu části fungují.
- Zelené testy nestačí, pokud je psal jen agent. Testy na „co se stát nesmí“ musí vymyslet člověk.
- Řešením není se AI vyhýbat, ale používat ji vědomě. Jak u zakázek chráním kód a data, popisuji na stránce [Důvěrnost a ochrana dat](/duvernost).
