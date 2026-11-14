---
typ: clanek
slug: rychlost-vyvoje
jazyk: cs
url: /clanky/rychlost-vyvoje
titulek: "Rychlost vývoje: co se za pár let změnilo"
perex: "Patnáct let se vývoj software zrychloval pomalu. Pak přišla AI a během pár let – v posledních měsících ještě výrazněji – se změnilo, co jeden zkušený člověk zvládne. Co to znamená pro nové projekty i pro modernizaci starých systémů."
meta_description: "Patnáct let se vývoj software zrychloval pomalu. Pak přišla AI a během pár let – v posledních měsících ještě výrazněji – se změnilo, co jeden zkušený člověk zvládne. Co to znamená pro nové projekty i pro modernizaci starých systémů."
og_title: "Rychlost vývoje: co se za pár let změnilo – Stanislav Matzke"
oblast: ai-ve-vyvoji
datum_publikace: 2026-10-13
datum_aktualizace: 2026-11-14
doba_cteni: 7
og_image: /img/og-default.jpg
souvisejici: [co-ai-agent-pokazil, kam-mizi-vyvojarska-prace]
cta: { titulek: "Chcete vědět, co by AI udělala s vaším systémem?", text: "Probereme to na nezávazném hovoru." }
stav: publikovano
preklad: [CS: /clanky/rychlost-vyvoje, EN: /en/articles/rychlost-vyvoje]
zrcadleno_z_webu: 2026-11-14
zmeneno_editorem: 2026-11-14
---

# Rychlost vývoje: co se za pár let změnilo

*Články · Říjen 2026 · 6 minut čtení*

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

Konkrétní příklad: aplikaci Job Scout – backend v .NET 10, stahování nabídek, AI pipeline, přihlášení přes Microsoft a Google, správa uživatelů, Angular, přes 600 testů, CI, 21 zapsaných architektonických rozhodnutí a nasazení v Azure – jsem postavil zhruba za tři dny intenzivní práce.

<!-- blok: srovnání -->
- **2–3 měsíce** – tříčlenný tým bez AI (odhad)
- **~3 dny** – jeden zkušený člověk s AI agentem

*Stejný rozsah, stejné nároky na kvalitu: testy, bezpečnost, dokumentace, nasazení.*

Druhý, novější příklad je [Párování plateb s AI](/projekty/parovani-plateb): modernizace starého modulu v Delphi a PL/SQL do .NET 10, AI párování plateb s evaly, server pro AI agenty, veřejná aplikace a otevřený kód. Zabralo to zhruba dva a půl dne. Můj odhad pro tým bez AI je čtyři až pět lidí na čtyři až šest měsíců.

Sám jsem to zažil i dřív: když jsem po letech v Javě přešel na .NET, byl jsem díky AI plně produktivní během pár dnů. Dnes už nejde jen o rychlejší psaní kódu, ale o to, že jeden člověk zvládne celé workflow – od návrhu po provoz.

## Nezáleží jen na nástroji, ale na způsobu práce

Mezi oběma projekty se nezměnil jen nástroj, ale hlavně způsob, jakým s ním pracuji.

U Job Scoutu agent připravoval kód a já ho v IDE procházel řádek po řádku, přepisoval a upravoval. Bylo to rychlé, ale úzké hrdlo jsem byl já a moje čtení.

U Párování plateb jsem nejdřív napsal specifikaci a plán a agent pak pracoval samostatně po fázích. Já jsem schvaloval plán a výsledek každé fáze, ale každý řádek jsem nečetl. Kvalitu hlídaly testy proti chování starého systému, evaly v CI, nezávislé review a zapsaná rozhodnutí. Výsledek byl rychlejší a zároveň lépe zkontrolovaný.

Je to posun od „AI píše, já čtu“ k „AI pracuje v mantinelech, které jsem navrhl“. Proč to funguje, popisuji v článku [Nečti každý řádek](/clanky/necti-kazdy-radek).

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

<!-- blok: ponaučení -->
> **Ponaučení**
>
> Projekt, který jste před dvěma lety odložili jako příliš drahý, stojí za to přepočítat. Cena se mezitím změnila víc než za předchozích deset let. Rychlost ale přináší AI, jistotu přinášejí mantinely, které kolem ní postavíte.

## Kde je teď úzké hrdlo

Psaní kódu už není to nejpomalejší. Úzkým hrdlem jsou rozhodnutí: co stavět, jak to navrhnout, kdo smí co vidět, kolik to bude stát v provozu a co se stane, když něco selže. AI zrychluje toho, kdo ví, co dělá. Bez zkušenosti dostanete rychle hodně kódu, kterému nikdo nerozumí.

<!-- blok: odkaz -->
[Na co jsem při vývoji s AI agentem narazil v praxi →](/clanky/co-ai-agent-pokazil)

<!-- blok: CTA pás -->
> Chcete vědět, co by AI udělala s vaším systémem?  
> Probereme to na nezávazném hovoru.
>
> [Domluvit nezávazný hovor](/kontakt)
