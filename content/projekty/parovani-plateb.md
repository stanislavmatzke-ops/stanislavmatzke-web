---
typ: pripadova-studie
slug: parovani-plateb
jazyk: cs
url: /projekty/parovani-plateb
titulek: "Párování plateb s AI: od Delphi k AI-native aplikaci"
perex: "Za dva a půl dne jsem s AI agentem udělal to, co by týmu čtyř až pěti lidí trvalo čtyři až šest měsíců: převedl starý modul v Delphi a PL/SQL do .NET a postavil nad ním AI, která páruje nejasné platby. Každou její odpověď kontroluje kód, takže v testech neskončila jediná platba u špatné faktury. Aplikace běží veřejně nad syntetickými daty a kód je otevřený."
meta_description: "Případová studie: modernizace Delphi + PL/SQL do .NET 10 a AI párování plateb za 2,5 dne s AI agentem místo 4–6 měsíců týmu. 19 z 1 000 špatných párování → 0, evaly v CI, provoz v Azure, $0,36 za 1 000 plateb."
og_title: "Párování plateb s AI – případová studie – Stanislav Matzke"
datum_publikace: 2026-11-14
datum_aktualizace:
doba_cteni: 12
og_image: /img/payment-matching-og.jpg
souvisejici: [modernizace-bez-velkeho-tresku, necti-kazdy-radek, co-ai-agent-pokazil]
cta: { titulek: "Máte starý systém, který byste rádi posunuli dál?", text: "Probereme to na nezávazném hovoru." }
stav: publikovano
preklad: [CS: /projekty/parovani-plateb, EN: /en/projects/payment-matching]
---

# Párování plateb s AI: od Delphi k AI-native aplikaci

*Případová studie*

Za dva a půl dne jsem s AI agentem udělal to, co by týmu čtyř až pěti lidí trvalo čtyři až šest měsíců: převedl starý modul v Delphi a PL/SQL do .NET a postavil nad ním AI, která páruje nejasné platby. Každou její odpověď kontroluje kód, takže v testech neskončila jediná platba u špatné faktury. Aplikace běží veřejně nad syntetickými daty a kód je otevřený.

[Vyzkoušet demo](https://payments.stanislavmatzke.com/demo) · [Zdrojový kód na GitHubu](https://github.com/stanislavmatzke-ops/payment-matching-ai)

![Párování plateb – přehled s tím, co přidala AI, rozhodnutí modelu ověřené kódem a výsledky evalů](img/payment-matching-cover.webp)  
*Ilustrace aplikace – firmy, platby a faktury jsou smyšlené.*

<!-- blok: fakta -->
- **~2,5 dne:** místo 4–6 měsíců týmu bez AI
- **19 → 0:** plateb z 1 000 na špatné faktuře
- **100 %:** správných automatických párování (zlatá sada 300 plateb)
- **$0,36:** za AI na 1 000 plateb

## Proč zrovna párování plateb

Každá firma, která vystavuje faktury, musí zjistit, ke které faktuře patří která příchozí platba. Většina plateb je jednoduchá: variabilní symbol i částka sedí. Zbytek je nepořádek. Překlep ve VS, číslo faktury schované ve zprávě, jedna platba za tři faktury, mateřská firma platí za dceřinou, platba v eurech. Takové platby každý den skončí na něčím stole.

Je to typický kus podnikového systému: pravidla napsaná před lety, peníze ve hře a spousta okrajových případů. Celou práci proto řídilo jedno pravidlo: **špatné spárování je horší než žádné.** Nespárovanou platbu člověk dořeší. Platbu spárovanou se špatnou fakturou nikdo nehledá, dokud se neozve zákazník.

## 2,5 dne místo 4–6 měsíců

Aby „dva a půl dne“ nebylo jen číslo: aplikační kód má zhruba 7 900 řádků v C#, k tomu 1 800 řádků UI, 5 300 řádků testů (401 testů), 700 řádků infrastruktury a CI/CD a asi 40 000 slov dokumentace s 18 zapsanými rozhodnutími. Zlatá sada má 300 ručně zkontrolovaných plateb.

<!-- blok: srovnání -->
- **4–6 měsíců** – tým 4–5 lidí bez AI (můj odhad, ~70–115 člověkotýdnů)
- **~2,5 dne** – jeden zkušený člověk s AI agentem

*Odhad je spíš dolní hranice: starý modul je tu malá fikce (650 řádků) a projekt nemá napojení na skutečnou banku ani ERP. U skutečného systému by analýza trvala déle.*

Kalendář týmu by nezkrátilo ani přidání dalších lidí. Analýzu starého systému, kontrolu testovacích dat a obchodní rozhodnutí nejde rozdělit mezi víc hlav. Právě tady AI zrychlila nejvíc: agent připravil podklady za hodiny a mně zbylo rozhodovat.

## Výchozí bod: modul „z roku 2005“

Nechtěl jsem ukazovat modernizaci na hračce, ale nemůžu použít kód žádného klienta. Proto projekt začíná fiktivním modulem v Delphi a Oracle PL/SQL, napsaným tak, jak se takové věci psaly kolem roku 2005. Jde opravdu přeložit a spustit. Data jsou syntetická, z generátoru, který ke každé platbě zná správnou odpověď.

Díky tomu šlo starý systém poctivě změřit. Automaticky spároval zhruba dvě třetiny plateb, jenže jen asi 80 % z toho bylo správně a **19 plateb z 1 000 skončilo u špatné faktury**. A každé špatné spárování navíc fakturu „zablokovalo“, takže správná platba, která přišla později, skončila jako duplicita.

<!-- blok: srovnání -->
- **19 z 1 000** – plateb na špatnou fakturu ve starém modulu
- **0** – po modernizaci a s AI vrstvou

*Měřeno proti správným odpovědím generátoru, stejná data pro oba systémy.*

## Modernizace bez dramatu

Nejdražší na modernizaci bývá zjistit, co starý systém vlastně dělá. Dal jsem proto zdrojový kód agentovi, který neměl žádný kontext a nesměl ho spouštět, a požádal ho o sepsání pravidel. Našel všechna, která jsem do modulu záměrně vložil, a k tomu **sedm skutečných chyb, o kterých jsem nevěděl ani já**. Třeba že databázová funkce uřízne číslo faktury a platba pak sedne na úplně jinou fakturu. V jednom detailu se ale spletl a odhalil to až test proti skutečnému chování starého programu. Proto platí: **jak se systém skutečně chová > co je napsané v kódu > co tvrdí dokumentace.**

Další kroky šly podle vzoru *strangler fig*: nový systém postupně obrůstá starý, místo aby ho jedním velkým přepisem nahradil.

<!-- blok: časová osa -->
- **1 – Porozumět**  
  Pravidla z kódu vytáhne izolovaný agent a člověk je zkontroluje.
- **2 – Zachytit chování**  
  Výstup starého programu nad stejnými daty je „golden master“: pravda, se kterou se nedá hádat.
- **3 – Přenést věrně**  
  Nová verze v .NET musí dát bajtově stejný výsledek včetně chyb.
- **4 – Měnit vědomě** <!-- aktuální etapa -->  
  Teprve pak opravy, a každý rozdíl proti starému chování musí být vysvětlený.

Port do .NET byl bajtově shodný se starým modulem na 1 300 platbách hned napoprvé. Díky golden masteru šel udělat i refaktoring, kterého se u peněz každý bojí: přechod z `double` na `decimal` bez jediné změny výstupu. Dokázaný, ne odhadnutý.

Teprve potom jsem opravoval chyby starého systému. Každá oprava změní některé výsledky a test hlídal, aby každá změna byla záměrná: když se výsledek změnil a nebylo jasné proč, build spadl. Výsledek: **na stejných datech už žádná platba neskončila u špatné faktury.**

## Kde AI rozhoduje a kde ne

Až teď přichází AI. Ne místo pravidel, ale nad nimi. Pravidla dál vyřeší, co umějí, a model vidí jen platby, které nerozhodla.

<!-- blok: karty -->
- **1 · Pravidla**  
  port starého modulu, vyřeší jednoduché případy
- **2 · Kandidáti z kódu**  
  kód vybere možné faktury, model nikdy nevidí databázi
- **3 · Model**  
  vybere fakturu a napíše zdůvodnění a jistotu
- **4 · Validace kódem**  
  faktura existuje, částky a měna sedí, odpověď je jednoznačná, není to podvrh
- **5 · Člověk**  
  co je nejisté, jde do fronty s připraveným návrhem

Model nemá poslední slovo. Když vybere fakturu, kód ověří, že taková existuje, že částka sedí a že žádná jiná kombinace nesedí stejně dobře. Teprve potom se něco uloží. Text, který napsal plátce, je pro model nedůvěryhodná data, ne pokyny.

Nejcennější lekci ale nedal model. Než jsem pustil skutečnou AI, běžela náhražka, která brala vždy prvního kandidáta. A ta hned **spárovala eurovou platbu se dvěma jinými fakturami téhož odběratele**, protože jejich součet se náhodou vešel do pásma kurzu. Agent proto napsal test, který jako „odpověď modelu“ zkusí každou možnou kombinaci faktur. Našel 45 děr a dvě nová pravidla je zavřela. Bezpečnost AI v produktu nestojí na modelu, ale na validaci, a ta se testuje všemi možnými odpověďmi, ne vzorkem.

## Co AI přinesla

U AI nestačí, že „to vypadá dobře“. Proto vznikla zlatá sada 300 plateb, z toho 30 % záměrně záludných: dvě stejné faktury, čísla faktur ve formátu, který kód nepřečte, a pokusy o podvržení faktury schované v textu zprávy. Odpovědi skutečného modelu jsou nahrané a v CI se přehrávají bez API klíče. **Build spadne**, jakmile přesnost klesne pod 99 % nebo se spáruje jediný podvrh. První běh hned našel díru, a to ne v modelu, ale ve validaci, která nepoznala dvojznačnost. Dnes ji pozná.

| | Jen pravidla | Pravidla + kód bez AI | **Pravidla + Claude** |
|---|---|---|---|
| Správná automatická párování | 100 % | 100 % | **100 %** |
| Spárováno bez člověka | 37,7 % | 53,3 % | **53,3 %** |
| Odhalené pokusy o podvrh (ze 40) | 40 | 20 | **40** |
| Cena za 1 000 plateb | – | – | **$0,36** |

Proti samotným pravidlům převzatým ze starého systému se automatizace zvedla z 38 na 53 % a žádná platba neskončila na špatné faktuře. Většinu toho nárůstu udělal nový kód kolem modelu: výběr kandidátů a validace. Model přidal to, co kód sám neumí: odhalil všech 40 pokusů o podvržení faktury (kód bez něj jen polovinu) a u každé nejasné platby napíše zdůvodnění, ze kterého člověk rozhoduje.

**Na čistých datech je AI zbytečná dekorace. Hodnotu ukáže na nepřátelském a nejednoznačném vstupu, a přesně takové jsou platby od externích plátců, kteří si do zprávy napíšou, co chtějí.** I tam ale hranici drží kód.

Evaly si kdokoli pustí sám jedním příkazem, bez API klíče a zdarma.

<!-- blok: zdroj -->
[Kompletní report evalů na GitHubu ↗](https://github.com/stanislavmatzke-ops/payment-matching-ai/tree/main/evals/reports)

## Cena a provoz

Za AI se platí $0,36 za 1 000 plateb. Většinu rozhodne malý a levný model. Velký se volá jen tam, kde jeho odpověď může změnit výsledek. Na [ukázkové platbě v demu](https://payments.stanislavmatzke.com/demo/payments/P0016) je to vidět v auditní stopě: malý model si nebyl jistý, velký platbu s prohozenými číslicemi ve VS spároval s jistotou 0,93 a kód odpověď ověřil. Stálo to zhruba jeden cent.

Veřejná aplikace má jedno tvrdé pravidlo: **návštěvník nikdy nespustí model.** AI běží v plánovaném ranním jobu se třemi rozpočty a odpovědi se ukládají do cache. Cena tak nezávisí na počtu uživatelů.

Nasazení a první hodina s reálným uživatelem pak ukázaly věci, které žádný test nenašel. Píšu o nich v článku [Co AI agent při vývoji pokazil](/clanky/co-ai-agent-pokazil).

## Jak se to stavělo s agentem

Kód, testy, infrastrukturu i dokumentaci napsal AI agent (Claude Code). Já jsem byl architekt, zadavatel a kontrola.

<!-- blok: časová osa -->
- **Půl dne – Zadání**  
  Analýza, cíle, plán a prázdné repo jen se specifikací, plánem a pravidly pro agenta.
- **1 den – Vývoj**  
  Fáze po fázi: starý modul a golden master, vytažení pravidel, věrný port, AI vrstva, evaly a zlatá sada, první prototyp.
- **1 den – Dotažení a provoz** <!-- aktuální etapa -->  
  Testy a evaly, refaktoring, uživatelské testování a změny podle něj, smoke testy, nasazení do Azure, zveřejnění repa.

Každá fáze běžela většinou v nové session agenta, která znala jen specifikaci, plán a zapsaná rozhodnutí. Agent navrhl postup, já ho schválil nebo upravil, agent implementoval s testy a zastavil se, aby ukázal výsledek. **Schvaloval jsem plány, ne diffy.** Proč to funguje, píšu v článku [Nečti každý řádek](/clanky/necti-kazdy-radek).

Agent dělal chyby, což je normální. Jeho kód se vždycky přeložil a na první pohled vypadal správně. Chyby se ukázaly až tam, kam při čtení nevidíte: na konkrétních datech, na jiném operačním systému nebo při souběžném běhu testů. Všechny chytil mechanismus (golden master, test všech odpovědí, evaly, CI na Linuxu) a žádná se nedostala do provozu.

Moje role byla jinde: co a proč stavíme, co je „správně“, a všechno, co stojí peníze nebo mění infrastrukturu. Každé placené volání modelu a každá změna v Azure potřebovaly moje výslovné „ano“. A pár věcí přinesl úsudek, ne kód. Agent pečlivě omezil počet volání AI na jeden sandbox, jenže tak přísně, že noví uživatelé čekali na AI několik dní. Skutečnou pojistkou proti „vytočení“ účtu je globální strop a počet nových účtů za den. Tohle rozhodnutí jsem musel udělat já.

<!-- blok: ponaučení -->
> **Ponaučení**
>
> Špatné spárování je horší než žádné. Model navrhuje, ale hranici drží kód, který jde otestovat celý. Člověk rozhoduje o tom, co je „správně“, a vidí, co testy nenajdou.

## Pod kapotou – pro vývojáře

Všechna rozhodnutí včetně zamítnutých alternativ jsou zapsaná jako ADR (18) ve veřejném repozitáři.

### Modernizace
- Fiktivní legacy v Delphi + PL/SQL, spustitelné přes Free Pascal v Dockeru; jeho výstup je golden master.
- Pravidla vytažená izolovanou session agenta, ověřená testy proti běžící binárce.
- Port nejdřív bajtově shodný, potom vědomé změny s testem „každý rozdíl vysvětlený“.

### AI vrstva
- Tenká AI gateway v .NET: malý model (Haiku) → velký (Opus) jen když může změnit výsledek, rozpočty, cena za každé volání.
- Structured output s JSON schématem, verzovaný prompt, text z výpisu jako nedůvěryhodná data.
- Validace kódem včetně jednoznačnosti; práh jistoty 0,90, pod ním rozhoduje člověk.
- Record/replay odpovědí modelu: testy bez API klíče, cache v provozu a okamžitý první dojem za $0.

### Evaly
- Zmrazená zlatá sada 300 syntetických plateb, 30 % záměrně těžkých.
- Gate v CI: přesnost ≥ 99 % a žádná spárovaná injection, jinak červený build.
- Evaly i všechny testy běží bez API klíče nad nahranými odpověďmi; kdokoli si je pustí jedním příkazem.
- Měří se i rozptyl: tři živé běhy, stejná rozhodnutí; lišil se jen návrh u remíz, které stejně jdou člověku.

### Bezpečnost
- Prošlé podle OWASP Top 10 pro LLM aplikace.
- MCP server pro AI agenty jen pro čtení a návrhy: agent nemůže nic spárovat, jen navrhnout člověku.
- Izolace tenantů v datové vrstvě (filtr na každé tabulce), testy úniku se stejnými id ve dvou tenantech.
- UI renderované na serveru bez JavaScriptu, přísná CSP; návštěvník nikdy nespustí model.

### Provoz
- Azure Container Apps (web a plánovaný job, který běží pár minut denně), PostgreSQL, Key Vault přes managed identity.
- Nasazení z GitHub Actions přes OIDC bez hesel, smoke testy v pipeline.
- OpenTelemetry s redakcí dat před exportem; lokálně Aspire dashboard, v Azure Application Insights.
- ~400 testů (databázové proti skutečnému PostgreSQL), CI bez API klíče.

<!-- blok: karty -->
- **Backend · .NET 10 · ASP.NET Core · EF Core**
- **Data · PostgreSQL · syntetická data s odpověďmi**
- **AI · Claude API · Haiku + Opus · MCP**
- **Cloud · Azure Container Apps · Key Vault · App Insights**

## Co z toho plyne pro firmy

- **Starý systém není překážka, ale zdroj.** Pravidla v něm jsou roky ověřené know-how a AI pomůže je vytáhnout rychleji, než by je kdokoli sepsal ručně.
- **Začněte od pravidel a evalů, ne od modelu.** Nejdřív změřte, jak dobře funguje dnešní řešení. Pak víte, co má AI zlepšit, a poznáte, jestli to dělá.
- **Měřte, kolik automatických rozhodnutí je správně,** ne obecnou „přesnost“. U peněz je chybné rozhodnutí dražší než žádné.
- **Plánujte nasazení a první uživatele jako samostatné fáze.** Obě odhalí věci, které žádný test nenajde.

Před pár lety by takový projekt byl na čtyři až šest měsíců práce týmu čtyř až pěti lidí. Dnes ho zvládne jeden zkušený člověk s AI agentem za pár dní, pokud ví, co chce, a umí to ověřit. Jak postupnou modernizaci starého systému vést obecně, popisuji v článku [Modernizace bez velkého třesku](/clanky/modernizace-bez-velkeho-tresku).

<!-- blok: odkaz -->
[Další projekt: Job Scout – chytrý pomocník pro hledání práce →](/projekty/job-scout)
