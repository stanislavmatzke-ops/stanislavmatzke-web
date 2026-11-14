---
typ: clanek
slug: rychlost-vyvoje
jazyk: cs
url: /clanky/rychlost-vyvoje
titulek: "Rychlost vývoje: co se za pár let změnilo"
perex: "Patnáct let se vývoj software zrychloval pomalu. Pak přišla AI a během pár let – v posledních měsících ještě výrazněji – se změnilo, co jeden zkušený člověk zvládne. Co to znamená pro nové projekty i pro modernizaci starých systémů."
meta_description: "Jak AI změnila rychlost vývoje: dva projekty postavené za dny místo měsíců, proč rozhoduje i způsob práce s AI agenty a co to znamená pro modernizaci starých systémů."
og_title: "Rychlost vývoje: co se za pár let změnilo – Stanislav Matzke"
oblast: ai-ve-vyvoji
datum_publikace: 2026-10-13
datum_aktualizace: 2026-11-14
doba_cteni: 6
og_image: /img/og-default.jpg
souvisejici: [necti-kazdy-radek, co-ai-agent-pokazil, modernizace-bez-velkeho-tresku]
cta: { titulek: "Chcete vědět, co by AI udělala s vaším systémem?", text: "Probereme to na nezávazném hovoru." }
stav: publikovano
preklad: [CS: /clanky/rychlost-vyvoje, EN: /en/articles/rychlost-vyvoje]
zmeneno_editorem: 2026-11-14
---

# Rychlost vývoje: co se za pár let změnilo

*Články · 13. října 2026 · aktualizováno 14. listopadu 2026*

Patnáct let se vývoj software zrychloval pomalu. Pak přišla AI a během pár let – v posledních měsících ještě výrazněji – se změnilo, co jeden zkušený člověk zvládne. Co to znamená pro nové projekty i pro modernizaci starých systémů.

Vývoji podnikových systémů se věnuji od roku 2011. Za tu dobu se vystřídalo spoustu nástrojů a módních vln, ale skutečný skok v tom, co jeden člověk zvládne, přišel až s AI. Jak to vypadalo krok za krokem:

<!-- blok: časová osa -->
- **2011–2022 – Řádek po řádku**  
  Lepší IDE, frameworky, cloud a CI/CD. Zrychlení se ale počítalo na procenta – kód pořád psal člověk.
- **První asistenti – Našeptávač a chat**  
  AI doplňovala řádky a odpovídala na otázky. Užitečné hlavně u rutiny, často se sebejistými nesmysly.
- **Celý projekt – AI rozumí repozitáři**  
  Refaktoring přes desítky souborů, testy, vysvětlení cizího kódu. Nová technologie za dny, ne měsíce.
- **Dnes – Agenti dotáhnou úkol** <!-- aktuální etapa -->  
  Naplánují, upraví soubory, spustí build a testy, opraví chyby. Zlepšují se po měsících, ne po letech.

## Co to znamená v praxi

Nejlíp to ukazují dva projekty, které jsem postavil s AI agentem a které si můžete vyzkoušet. Větší z nich, [Párování plateb s AI](/projekty/parovani-plateb), je modernizace starého modulu v Delphi a PL/SQL do .NET 10 s AI, která páruje bankovní platby s fakturami. Včetně evalů, nasazení v Azure a veřejného kódu.

<!-- blok: srovnání -->
- **4–6 měsíců** – tým 4–5 lidí bez AI (můj odhad)
- **~2,5 dne** – jeden zkušený člověk s AI agentem

*Stejný rozsah, stejné nároky na kvalitu: testy, bezpečnost, dokumentace, nasazení.*

| | [Job Scout](/projekty/job-scout) | [Párování plateb s AI](/projekty/parovani-plateb) |
|---|---|---|
| Co to je | webová aplikace s AI pro hledání práce | modernizace Delphi → .NET 10 a AI párování plateb |
| Odhad bez AI | 3 lidé, 2–3 měsíce | 4–5 lidí, 4–6 měsíců |
| S AI agentem | ~3 dny | ~2,5 dne |
| Jak jsem pracoval | agent psal, já četl každý řádek | specifikace, agent po fázích, testy a evaly |

Sám jsem to zažil i dřív: když jsem po letech v Javě přešel na .NET, byl jsem díky AI plně produktivní během pár dnů. Dnes už nejde jen o rychlejší psaní kódu, ale o to, že jeden člověk zvládne celé workflow – od návrhu po provoz.

## Rychlost nedělá jen nástroj, ale způsob práce

Párování plateb bylo podle odhadu výrazně větší projekt než Job Scout, a přesto bylo hotové rychleji. Nebyl to jen lepší nástroj. Změnil se způsob, jakým s ním pracuji.

<!-- blok: srovnání -->
- **AI píše, já čtu** – Job Scout: agent připravil kód, já ho v IDE procházel řádek po řádku a upravoval
- **AI pracuje v mantinelech** – Párování plateb: specifikace a plán, agent samostatně po fázích, kvalitu hlídají testy a evaly

*U prvního projektu jsem byl úzkým hrdlem já a moje čtení. U druhého jsem schvaloval plán a výsledek každé fáze.*

U Párování plateb jsem každý řádek nečetl. Kvalitu hlídaly testy proti chování starého systému, evaly v CI, nezávislé review a zapsaná rozhodnutí. Výsledek byl rychlejší a zároveň lépe zkontrolovaný: chyby, které agent udělal, chytily mechanismy dřív, než na nich cokoli stálo. Jaké chyby to byly, popisuji v článku [Co AI agent při vývoji pokazil](/clanky/co-ai-agent-pokazil) a proč takhle kontrolovat, v článku [Nečti každý řádek](/clanky/necti-kazdy-radek).

## Co to znamená pro modernizaci starých systémů

<!-- blok: karty -->
- **01 · Orientace v kódu**  
  Dny místo týdnů – AI projde formuláře, uložené procedury i triggery.
- **02 · Byznys pravidla**  
  Pravidla schovaná v kódu se dají vytěžit a sepsat; člověk je ověří s uživateli.
- **03 · Testy jako záchranná síť**  
  Charakterizační testy, které hlídají, že nový systém funguje stejně jako starý.
- **04 · Převod po modulech**  
  Výrazně levnější než dřív – systémy, na které se roky nesahalo, stojí za přepočítání.

Přesně tímhle postupem vzniklo Párování plateb. Obecně ho popisuji v článku [Modernizace bez velkého třesku](/clanky/modernizace-bez-velkeho-tresku).

<!-- blok: ponaučení -->
> **Ponaučení**
>
> Projekt, který jste před dvěma lety odložili jako příliš drahý, stojí za to přepočítat. Cena se mezitím změnila víc než za předchozích deset let. Rychlost přináší AI, jistotu mantinely, které kolem ní postavíte.

## Kde je teď úzké hrdlo

Psaní kódu už není to nejpomalejší. Úzkým hrdlem jsou rozhodnutí a ověřování: co stavět, jak to navrhnout, kdo smí co vidět, kolik to bude stát v provozu, co se stane, když něco selže, a jak poznáme, že to funguje. AI zrychluje toho, kdo ví, co dělá. Bez zkušenosti dostanete rychle hodně kódu, kterému nikdo nerozumí.
