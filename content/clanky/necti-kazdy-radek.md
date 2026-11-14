---
typ: clanek
slug: necti-kazdy-radek
jazyk: cs
url: /clanky/necti-kazdy-radek
titulek: "Nečti každý řádek: code review v éře AI agentů"
perex: "Když kód píše AI, nikdo už ho nestihne přečíst řádek po řádku. Zkušení lidé mají pravdu, že AI kód má víc chyb. Nemají ale pravdu, že jediná obrana je číst ho očima. Kam se review posouvá a co v něm zůstává lidské."
meta_description: "Code review v éře AI agentů: data o kvalitě AI kódu, proč review očima neškáluje a jak kontrolovat podle rizika – mechanismy na kód, člověk na záměr, kritéria a důkazy."
oblast: ai-ve-vyvoji
datum_publikace: 2026-11-14
datum_aktualizace:
doba_cteni: 7
og_image: /img/og-default.jpg
souvisejici: [co-ai-agent-pokazil, kam-mizi-vyvojarska-prace, modernizace-bez-velkeho-tresku]
cta: { titulek: "Zavádíte AI do vývoje a řešíte, jak ji kontrolovat?", text: "Probereme to na nezávazném hovoru." }
stav: publikovano
preklad: [CS: /clanky/necti-kazdy-radek, EN: /en/articles/necti-kazdy-radek]
---

# Nečti každý řádek: code review v éře AI agentů

*Články · 14. listopadu 2026 · 7 minut čtení*

Když kód píše AI, nikdo už ho nestihne přečíst řádek po řádku. Zkušení lidé mají pravdu, že AI kód má víc chyb. Nemají ale pravdu, že jediná obrana je číst ho očima. Kam se review posouvá a co v něm zůstává lidské.

Nedávno jsem mluvil se zkušeným team leaderem, který dělá v .NET přes dvacet let. Jeho postoj byl jasný: „Rozumím kódu daleko víc než nějaká AI. Vím, proč použít nativní logování místo oblíbené knihovny. Proto každý řádek pohlídám, aby byl perfektní. AI jen hádá.“

V mnohém má pravdu. Jenže při nedávném projektu, kde AI agent napsal přes sedm tisíc řádků aplikace a pět tisíc řádků testů za pár dní, jsem si položil otázku jinak. Ne „kdo rozumí kódu líp“, ale „co vlastně chytá chyby“.

## Kde má expert pravdu

AI kód opravdu má víc problémů. Firma CodeRabbit porovnala 470 open-source pull requestů. Ty, na kterých se podílela AI, měly v průměru 10,83 nalezeného problému, lidské 6,45, tedy zhruba 1,7krát víc. AI měla víc chyb v logice, bezpečnosti i výkonu. Lidé zase víc překlepů a hůř testovatelný kód. Pozor na kontext: CodeRabbit prodává AI review, takže na výsledku má zájem.

<!-- blok: zdroj -->
[CodeRabbit: State of AI vs Human Code Generation ↗](https://www.coderabbit.ai/blog/state-of-ai-vs-human-code-generation-report)

Výkon je slabé místo. Model se učí na průměrném kódu z internetu a sáhne po tom, co je populární, ne po tom, co je pro daný případ nejlepší. V benchmarku EffiBench byl kód nejlepšího testovaného modelu v průměru 1,69krát pomalejší než vzorová lidská řešení. Přesně tohle zkušený člověk vidí: rozdíl mezi „funguje“ a „ideální pro tenhle případ“.

<!-- blok: zdroj -->
[EffiBench (NeurIPS 2024) ↗](https://huggingface.co/papers/2402.02037)

## Kde pravdu nemá

**„AI jen hádá“ neplatí pro review.** ByteDance nasadil AI review pro víc než 12 000 vývojářů týdně a po dvoustupňovém filtru dosáhl 75% přesnosti komentářů. Jejich data zároveň ukazují, že lidské připomínky vedou ke změně kódu častěji. AI review je tedy dobré první síto, ne náhrada experta.

<!-- blok: zdroj -->
[BitsAI-CR: Automated Code Review via LLM in Practice ↗](https://arxiv.org/pdf/2501.15134)

**Lidské review taky najde méně, než si myslíme.** Studie z Microsoftu zjistila, že hlavním důvodem review je hledání chyb, ale review je o chybách méně, než se čeká. Jeho skutečný přínos je sdílení znalostí, přehled v týmu a alternativní řešení.

<!-- blok: zdroj -->
[Bacchelli & Bird: Expectations, Outcomes, and Challenges of Modern Code Review (ICSE 2013) ↗](https://doi.org/10.1109/ICSE.2013.6606617)

**A expert se neškáluje.** Rychlost psaní kódu přestala být úzké hrdlo. Teď je jím review, a review očima neškáluje. Když agent za den vyrobí to, co dřív tým za týden, nikdo to nepřečte pozorně. Buď se review zrychlí na „schváleno“, nebo se z něj stane brzda.

## Co chytalo chyby v mém projektu

Při stavbě aplikace [Párování plateb s AI](/projekty/parovani-plateb) jsem si zapisoval každou chybu, kterou agent udělal, a co ji chytilo. Výsledek mě překvapil: **žádnou z podstatných chyb nenašlo čtení kódu.**

<!-- blok: karty -->
- **Chyba o jedničku v pravidle**  
  chytil ji test proti skutečnému chování starého systému
- **Validace, která pustila špatnou kombinaci faktur**  
  chytil ji test, který zkusí všechny možné odpovědi, ne vzorek
- **Remízy, kde kód nepoznal dvojznačnost**  
  chytil je eval v CI, build zčervenal
- **Prompt, který se lišil podle operačního systému**  
  chytilo ho CI na Linuxu během minuty
- **Knihovna, která zapisovala, co neměla**  
  chytil ji test, který hledá data v telemetrii

Agentův kód se vždycky přeložil a na první pohled vypadal správně. Chyby se ukázaly až tam, kam při čtení nevidíte: na konkrétních datech, na jiném operačním systému nebo při souběžném běhu testů. Člověk je při čtení snadno přehlédne, protože kód *vypadá* správně. Mechanismus je nepřehlédne. Jiný typ chyb, nedomyšlenou logiku, kterou testy nechytí, jsem popsal v článku [Co AI agent při vývoji pokazil](/clanky/co-ai-agent-pokazil). Tam naopak pomohl člověk, který aplikaci prošel jako uživatel.

## Review podle rizika

Neříkám, že kód nemá cenu kontrolovat. Říkám, že **kód kontrolují mechanismy a člověk kontroluje záměr, kritéria a důkazy.** V praxi:

1. **Řádek po řádku jen tam, kde jde o hodně:** peníze, bezpečnost a oprávnění, souběh, datový model, veřejná API, prompty a ochranné mantinely AI.
2. **Všude jinde automatické brány:** analyzátory s chybami místo varování, testy, evaly, benchmarky a zátěžové testy. A AI reviewer s checklistem, ideálně jiný model než ten, který kód psal.
3. **Člověk schvaluje plán, ne diff:** zadání, rozhodnutí o architektuře, rozhraní, datový model a kritéria, podle kterých se pozná „hotovo“. Kontrola desetiřádkového plánu přidá víc než čtení tisíce řádků diffu.
4. **Výkon se neposuzuje očima, ale měří.** Zátěžový test, profiler, počet SQL dotazů na požadavek. To, co by expert „viděl“, se dá převést na číslo, které hlídá každý build.
5. **Expertní znalost převést do pravidel.** Občas dát modul opravdovému expertovi, porovnat jeho připomínky s AI review a to, co AI minula, zapsat do pravidel pro agenta, do analyzátoru nebo do checklistu. Expertova zkušenost pak hlídá každý řádek, ne jen ty, které stihne přečíst.

<!-- blok: ponaučení -->
> **Ponaučení**
>
> Nečti každý řádek. Rozuměj záměru a ověřuj důkazy. Zkušenost experta má největší cenu, když ji převedeš do testů, pravidel a měření, protože ty se neunaví.

## Co z toho plyne pro firmy

Pro týmy, které AI do vývoje zavádějí, je nejdražší chybou nechat review beze změny. Buď se z něj stane razítko, nebo úzké hrdlo, které sníží přínos AI na nulu.

Místo toho stojí za to investovat do toho, co review nahrazuje: testů proti skutečnému chování, evalů, měření a jasných pravidel pro agenty. A zkušené lidi posunout tam, kde jsou nenahraditelní: k zadání, architektuře, rizikovým místům a k otázce, co je vlastně „správně“. O tom, jak se tím mění role vývojáře, píšu v článku [Kam mizí vývojářská práce](/clanky/kam-mizi-vyvojarska-prace).

**Zkušený team leader ví líp než kdokoli, co hledat a na co se zaměřit. Jen by to neměl hledat očima.**
