---
typ: clanek
slug: modernizace-bez-velkeho-tresku
jazyk: cs
url: /clanky/modernizace-bez-velkeho-tresku
titulek: "Modernizace bez velkého třesku: jiný motor ve stejné karoserii"
perex: "Starý systém v Delphi nebo Oracle Forms funguje, jen ho už nikdo nechce udržovat. Přepsat ho najednou je riskantní a drahé. Jde to i jinak: nejdřív věrně zachytit, co systém dělá, a pak ho po částech přesunout na nový motor. A AI z toho dělá úplně jinou kalkulaci."
meta_description: "Jak modernizovat starý systém (Delphi, Oracle, PL/SQL) postupně a bez výpadků: porozumění s AI, golden master, věrný převod po částech, vědomé změny. Co AI zlevnila a co zůstává na lidech."
oblast: modernizace
datum_publikace: 2026-11-14
datum_aktualizace:
doba_cteni: 4
og_image: /img/og-default.jpg
souvisejici: [rychlost-vyvoje, necti-kazdy-radek]
cta: { titulek: "Máte starý systém, na který se roky nesahá?", text: "Spočítáme, co by modernizace stála dnes. Nezávazně." }
stav: koncept
preklad: [CS: /clanky/modernizace-bez-velkeho-tresku, EN: /en/articles/modernizace-bez-velkeho-tresku]
---

# Modernizace bez velkého třesku: jiný motor ve stejné karoserii

*Články · 14. listopadu 2026 · 4 minut čtení*

Starý systém v Delphi nebo Oracle Forms funguje, jen ho už nikdo nechce udržovat. Přepsat ho najednou je riskantní a drahé. Jde to i jinak: nejdřív věrně zachytit, co systém dělá, a pak ho po částech přesunout na nový motor. A AI z toho dělá úplně jinou kalkulaci.

Patnáct let jsem pracoval na podnikových systémech v bankách, pojišťovnictví a logistice. Pracoval jsem přitom i s Delphi, Oracle PL/SQL a Oracle Forms. Takové systémy mají společné tři věci. Fungují. Obsahují roky obchodních pravidel, která nikde jinde sepsaná nejsou. A lidí, kteří jim rozumějí, ubývá.

Firma pak stojí před nepříjemnou volbou: držet systém naživu, dokud to jde, nebo ho celý přepsat. Obojí je špatně.

## Proč velký přepis tak často nevyjde

Přepis „na zelené louce“ vypadá lákavě: nová technologie, čistý kód, žádné staré dluhy. V praxi ale naráží na jednu věc. Nikdo přesně neví, co starý systém dělá. Dokumentace je zastaralá, pravidla jsou schovaná v uložených procedurách a triggerech a část chování vznikla omylem, na který se mezitím někdo spolehl.

Nový systém pak měsíce vzniká vedle starého a v den přepnutí se ukáže, že dělá něco trochu jinak. Uživatelé to poznají první.

## Jiný motor ve stejné karoserii

Postupná modernizace na to jde obráceně. Pro uživatele se na začátku nic nemění: stejné obrazovky, stejné výsledky, stejné procesy. Mění se motor pod kapotou, a to po částech. Martin Fowler tomu říká *strangler fig*, podle fíkovníku, který postupně obroste starý strom, až ho nahradí.

<!-- blok: zdroj -->
[Martin Fowler: Strangler Fig Application ↗](https://martinfowler.com/bliki/StranglerFigApplication.html)

Postup, který používám:

<!-- blok: časová osa -->
- **1 – Porozumět**  
  Sepsat obchodní pravidla přímo z kódu, včetně okrajových případů, a ověřit je s lidmi, kteří systém používají.
- **2 – Zachytit chování**  
  Pustit starý systém nad testovacími daty a jeho výstup uložit jako „golden master“, pravdu, se kterou se nedá hádat.
- **3 – Přenést věrně**  
  Převést jednu část na novou platformu tak, aby nad stejnými daty dala stejný výsledek, i se starými chybami.
- **4 – Měnit vědomě** <!-- aktuální etapa -->  
  Teprve teď opravovat a zlepšovat. Každý rozdíl proti starému chování je záměrný a vysvětlený.

Nejdůležitější je pořadí kroků 3 a 4. Kdo začne opravovat už při převodu, nepozná, jestli rozdíl ve výsledku je oprava, nebo nová chyba.

## Co na tom změnila AI

Tenhle postup není nový. Nový je jeho cena. Nejdražší byl vždycky krok 1, porozumění. Týdny čtení cizího kódu, workshopy, dohledávání, proč tu je tahle podmínka. S AI se ten poměr obrací.

Vyzkoušel jsem to na referenčním projektu [Párování plateb s AI](/projekty/parovani-plateb). Modul v Delphi a PL/SQL dostal AI agent, který neměl žádný kontext a nesměl kód spouštět, a měl z něj sepsat pravidla. Našel všechna, která tam byla, a navíc sedm skutečných chyb, o kterých nevěděl ani autor. Například že databázová funkce uřízne číslo faktury a platba pak sedne na jinou fakturu.

AI ale není neomylná. Jedno pravidlo popsala o jedničku vedle a odhalil to až golden master. Proto platí pořadí autorit: **běžící kód > čtení kódu > dokument.** AI je výborný začátek analýzy, poslední slovo má test proti skutečnému chování.

Kroky 2 a 3 zlevnila AI také. Převod do .NET byl v tom projektu bajtově shodný se starým modulem hned napoprvé a celý projekt od analýzy po nasazení trval zhruba dva a půl dne místo měsíců. Podrobnosti jsou v případové studii.

<!-- blok: karty -->
- **Analýza kódu**  
  dny místo týdnů, AI projde formuláře, procedury i triggery
- **Testy proti starému chování**  
  AI je napíše a nachystá data, člověk určí, co je důležité
- **Převod po částech**  
  výrazně levnější, takže se vyplatí i menší moduly
- **Dokumentace**  
  vzniká průběžně, ne jako dluh na konci

## Co AI nezrychlí

Byl bych nepoctivý, kdybych tvrdil, že modernizace teď trvá vždycky pár dní. Referenční projekt měl záměrně malý legacy modul a žádné napojení na skutečnou banku ani ERP. Ve skutečné firmě zůstávají věci, které žádný model neurychlí:

- **Rozhodnutí.** Co se má chovat stejně a co se konečně může změnit, rozhoduje byznys, ne vývojář ani AI.
- **Data.** Migrace let produkčních dat má vlastní pravidla a vlastní testy.
- **Integrace.** Okolní systémy, se kterými starý systém mluví, se často mění pomaleji než on sám.
- **Lidé.** Uživatelé potřebují vědět, co se mění a kdy. I když se na obrazovce nic nemění, mění se, komu volat, když něco nejde.

Proto začínám vždycky stejně: krátkou analýzou, která řekne, co systém dělá, co je rizikové a kolik by převod stál. Pro mnoho firem je výsledek překvapivý, protože poslední odhad dělaly před lety, kdy ruční analýza stála úplně jiné peníze. O tom, jak se ta čísla změnila, píšu v článku [Rychlost vývoje: co se za pár let změnilo](/clanky/rychlost-vyvoje).

<!-- blok: ponaučení -->
> **Ponaučení**
>
> Nejdřív věrná kopie chování, teprve potom zlepšování. A starý systém není překážka, ale nejlepší specifikace, jakou máte: roky ověřených pravidel, která AI dnes dokáže vytáhnout rychleji, než by je kdokoli sepsal ručně.

## Co z toho plyne pro firmy

Pokud máte systém, na který se roky nesahá, protože „modernizace je moc drahá“, stojí za to ten odhad přepočítat. Nemusíte se rozhodnout pro velký přepis. Stačí začít porozuměním a jednou malou částí a uvidíte, jak to jde. Pro uživatele se nic nezmění. Jen motor pod kapotou bude nový a bude ho mít kdo udržovat.
