---
typ: clanek
slug: co-ai-agent-pokazil
jazyk: cs
url: /clanky/co-ai-agent-pokazil
titulek: "Co AI agent při vývoji pokazil – a proč na tom záleží"
perex: "Aplikaci Job Scout psal AI agent, já jsem byl architekt a reviewer – zadával jsem, kontroloval, testoval a nasazoval. Klasické bezpečnostní chyby agent nedělal. Ty, které udělal, byly zrádnější: kód správně, testy zelené, logika nedomyšlená."
meta_description: "Aplikaci Job Scout psal AI agent, já jsem byl architekt a reviewer – zadával jsem, kontroloval, testoval a nasazoval. Klasické bezpečnostní chyby agent nedělal. Ty, které udělal, byly zrádnější: kód správně, testy zelené, logika nedomyšlená."
og_title: "Co AI agent při vývoji pokazil – a proč na tom záleží – Stanislav Matzke"
oblast: ai-ve-vyvoji
datum_publikace: 2026-10-13
datum_aktualizace: 2026-11-14
doba_cteni: 8
og_image: /img/job-scout-og.jpg
souvisejici: [rychlost-vyvoje, kam-mizi-vyvojarska-prace]
cta: { titulek: "Chcete vědět, co by AI udělala s vaším systémem?", text: "Probereme to na nezávazném hovoru." }
stav: publikovano
preklad: [CS: /clanky/co-ai-agent-pokazil, EN: /en/articles/co-ai-agent-pokazil]
zrcadleno_z_webu: 2026-11-14
zmeneno_editorem: 2026-11-14
---

# Co AI agent při vývoji pokazil – a proč na tom záleží

*Články · Říjen 2026 · 7 minut čtení*

Aplikaci Job Scout psal AI agent, já jsem byl architekt a reviewer – zadával jsem, kontroloval, testoval a nasazoval. Klasické bezpečnostní chyby agent nedělal. Ty, které udělal, byly zrádnější: kód správně, testy zelené, logika nedomyšlená.

<!-- blok: projekt -->
> ![Job Scout – ukázka aplikace](img/job-scout-cover.webp)
>
> **O jakém projektu je řeč**
>
> Job Scout je webová aplikace, která každé ráno projde nové nabídky práce, ohodnotí je podle životopisu a k nejlepším připraví návrh průvodního dopisu. Běží naostro v Azure a vyzkoušet si ji může každý.
>
> - ~3 dny intenzivní práce jednoho člověka s AI agentem
> - přihlášení Microsoft / Google, víc uživatelů, schvalování přístupu
> - .NET 10, Angular, Claude API, Azure, přes 600 testů
>
> [Případová studie Job Scout →](/projekty/job-scout)

## Nejdřív to dobré: hloupé chyby už (skoro) nedělá

Typické strašáky „vibe codingu“ se v Job Scoutu neobjevily. Agent sám od sebe:

- držel hesla a API klíče mimo repozitář,
- validoval vstupy a nepsal ručně skládané SQL,
- napsal přes 600 automatických testů a testy, které hlídají vrstvy aplikace,
- přidal ochranu proti prompt injection.

Chyby, které udělal, byly jiného druhu: kód byl správně, testy zelené – ale logika nedomyšlená. Přesně ty, které žádný linter ani bezpečnostní scanner nenajde.

## Příběh 1: Kdokoli s přístupem mohl „vyžrat“ AI tokeny

Ranní běh měl od začátku pevné limity. Pak jsme přidali tlačítka „Ohodnotit“ a „Napsat nový návrh dopisu“ – každé z nich je placené volání AI. Agent je naprogramoval přesně podle zadání.

<!-- blok: fakta -->
- **Chyba:** Nikdo se nezeptal „co když někdo klikne tisíckrát?“. Stačilo změnit jedno písmeno v poznámkách a profil se znovu analyzoval; dopis šlo přepisovat donekonečna.
- **Jak jsem na to přišel:** Den po spuštění, když jsem aplikaci poslal prvním lidem a sám si ji proklikal. Přišel na to člověk, ne AI.
- **Oprava (jedno dopoledne):** Limity na kliknutí v klouzavém okně 24 hodin, denní „záchranná brzda“ s e-mailem správci, zámek proti dvojkliku a měsíční limit u poskytovatele AI.

<!-- blok: ponaučení -->
> **Ponaučení**
>
> U aplikací s AI je „útok na peněženku“ stejně reálné riziko jako únik dat (OWASP ho pro LLM aplikace vede jako Unbounded Consumption). AI dodá, co zadáte – otázku „kolik nás to může stát, když se to zneužije“ musí položit člověk.

## Příběh 2: Zamítnutý uživatel se dostal do aplikace

Přístup do Job Scoutu schvaluje správce. Agent implementoval „Zamítnout žádost“ – a použil k tomu existující stav „pozastavený účet“. Na první pohled logické.

<!-- blok: fakta -->
- **Chyba:** Pozastavený uživatel je pořád členem a smí si prohlížet svá data. Zamítnutý žadatel tak po přihlášení prošel dovnitř.
- **Proč to testy nechytily:** Testovaly přesně to, co agent napsal. Nikdo netestoval, že zamítnutý žadatel nemá vidět vůbec nic.
- **Jak jsem na to přišel:** Ručním testem v produkci: zamítl jsem testovací účet a ten se normálně přihlásil. Zamítnutí je teď samostatná akce.

<!-- blok: ponaučení -->
> **Ponaučení**
>
> Autorizace je místo, kde „skoro správně“ znamená „špatně“. Review přístupových pravidel a ruční test „zkusím se tam dostat“ nenahradí žádný automat.

## Bonus: dvě části, které spolu nemluvily

Agent napsal workflow, které po každém commitu postaví Docker image – a rozumně vynechá commity, kde se mění jen dokumentace. Jindy napsal nasazovací skript, který nasadí image podle posledního commitu. Každá část sama o sobě správně. Dohromady: po změně README chtěl skript nasadit image, který nikdy nevznikl. Chyba ne v kódu, ale ve spojení dvou rozhodnutí z různých dnů.

## Kontrola podle seznamu: tady je AI silná

Po spuštění jsme aplikaci prošli bod po bodu podle bezpečnostního checklistu pro „vibe coding“. Kontrolu dělal opět agent – a když dostane jasný seznam, je důkladný. Našel i další díru, kterou předtím sám vytvořil: o přístup mohl kdokoli požádat stokrát a správci by přišlo sto e-mailů.

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

## Co z toho plyne pro firmy

- AI se rychle zlepšuje – klasické bezpečnostní chyby dnes dobrý agent s jasnými pravidly sám od sebe nedělá. To ale neznamená, že je kód hotový.
- Hlídat je potřeba logiku, ne syntaxi: kdo smí co vidět, co se stane při zneužití, kolik to stojí, jak spolu části fungují dohromady.
- Zelené testy nestačí – agent testuje to, co napsal. Testy na „co by se stát nemělo“ musí vymyslet člověk.
- Rychlá zpětná vazba z provozu odhalila obě hlavní chyby do 24 hodin. Pustit aplikaci brzy malé skupině lidí a mít limity a monitoring nákladů od prvního dne se vyplatilo.

## Jak s AI zacházím u zákazníků

- AI používám k orientaci ve velkém kódu, vytěžení byznys pravidel, návrhu testů a dokumentace. Závěry, architekturu a doporučení dělám já.
- Jen firemní verze AI služeb, které smluvně netrénují na datech zákazníka. Když máte vlastní schválené nástroje (třeba Azure OpenAI ve vašem tenantu), použiju je.
- Pracuji na kopii kódu a s anonymizovanými nebo testovacími daty, nikdy s produkčními osobními údaji. Po skončení zakázky vše smažu a potvrdím to písemně.
- AI nikdy nedávám klíče a hesla. Každou změnu, kterou agent udělá, projdu, schválím a ručím za ni.

## A co když AI nechcete?

Jde to i bez ní. Ale upřímně: je to cesta zpátky. Kdo dnes vyvíjí pomaleji a dráž než konkurence, prohraje – firmy na trhu i lidé na pracovním trhu. Sám jsem se musel přizpůsobit a vím, že to jde.

Řešením není se AI vyhýbat, ale používat ji vědomě: s důrazem na bezpečnost, ochranu dat a kontrolu výstupů. S tímhle přechodem vám rád pomůžu – stejně jako jsem ho zvládl já.

## Jak to dopadlo podruhé

U dalšího projektu, [Párování plateb s AI](/projekty/parovani-plateb), jsem pracoval jinak: podle specifikace, po fázích a s testy a evaly jako mantinely. Agent chyboval taky. V jednom pravidle se spletl o jedno místo, validace jednou pustila platbu na špatnou kombinaci faktur a prompt se lišil podle operačního systému. Rozdíl byl v tom, že tyhle chyby chytily testy a evaly dřív, než na nich cokoli stálo.

Co testy nechytily, ukázalo až nasazení a první uživatel:

- **Čtyři pasti v Azure:** nová databáze s jiným vlastníkem schématu, změna hesla, která tiše shodila běžící aplikaci, telemetrie, která sama zahodila data krátkého jobu, a změněný formát identity pro přihlašování bez hesla.
- **Díra v nasazovací pipeline:** kontrolovala jen název větve, ne odkud kód pochází. Kdokoli by si mohl udělat kopii repozitáře, poslat změnu z větve pojmenované `main` a jeho kód by se nasadil do produkce. Našlo se to před zveřejněním kódu. CI/CD je kód se stejnými právy jako produkce.
- **První hodina s uživatelem:** nový uživatel čekal na AI do druhého rána, což byl přímý důsledek bezpečnostního pravidla. A člověk ve frontě neviděl fakturu vedle platby, takže neměl z čeho rozhodnout.

Vzorec z Job Scoutu tedy platí dál: logiku, provoz a pohled uživatele musí pohlídat člověk. Nové je, že rutinní chyby agenta už nehledám já, ale mechanismy, které jsem kolem něj postavil.

<!-- blok: CTA pás -->
> Chcete vědět, co by AI udělala s vaším systémem?  
> Probereme to na nezávazném hovoru.
>
> [Domluvit nezávazný hovor](/kontakt)
