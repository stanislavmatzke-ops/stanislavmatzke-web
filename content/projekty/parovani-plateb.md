---
typ: pripadova-studie
slug: parovani-plateb
jazyk: cs
url: /projekty/parovani-plateb
titulek: "Párování plateb s AI: od Delphi k AI-native aplikaci"
perex: "Starý modul v Delphi a PL/SQL jsem s AI agentem za dva a půl dne převedl do .NET a postavil nad ním AI, která páruje nejasné platby. Každou její odpověď kontroluje kód, takže v testech neskončila jediná platba u špatné faktury. Aplikace běží veřejně nad syntetickými daty a kód je otevřený."
meta_description: "Případová studie: modernizace Delphi + PL/SQL do .NET 10 a AI párování plateb s validací kódem, evaly v CI a provozem v Azure. 100 % správných automatických párování, $0,36 za 1 000 plateb, 2,5 dne s AI agentem."
og_title: "Párování plateb s AI – případová studie – Stanislav Matzke"
datum_publikace: 2026-11-14
datum_aktualizace:
doba_cteni: 13
og_image: /img/payment-matching-og.jpg
souvisejici: [modernizace-bez-velkeho-tresku, necti-kazdy-radek, co-ai-agent-pokazil]
cta: { titulek: "Máte starý systém, který byste rádi posunuli dál?", text: "Probereme to na nezávazném hovoru." }
stav: koncept
preklad: [CS: /projekty/parovani-plateb, EN: /en/projects/payment-matching]
---

# Párování plateb s AI: od Delphi k AI-native aplikaci

*Případová studie*

Starý modul v Delphi a PL/SQL jsem s AI agentem za dva a půl dne převedl do .NET a postavil nad ním AI, která páruje nejasné platby. Každou její odpověď kontroluje kód, takže v testech neskončila jediná platba u špatné faktury. Aplikace běží veřejně nad syntetickými daty a kód je otevřený.

[Vyzkoušet demo](https://payments.stanislavmatzke.com/demo) · [Zdrojový kód na GitHubu](https://github.com/stanislavmatzke-ops/payment-matching-ai)

![Párování plateb – přehled s tím, co přidala AI, rozhodnutí modelu ověřené kódem a výsledky evalů](img/payment-matching-cover.webp)  
*Ilustrace aplikace – firmy, platby a faktury jsou smyšlené.*

<!-- blok: fakta -->
- **~2,5 dne:** práce jednoho člověka s AI agentem
- **100 %:** správných automatických párování (zlatá sada 300 plateb)
- **40 / 40:** odražených pokusů o prompt injection
- **$0,36:** za AI na 1 000 plateb

## Proč zrovna párování plateb

Každá firma, která vystavuje faktury, musí zjistit, ke které faktuře patří která příchozí platba. Většina plateb je jednoduchá: variabilní symbol i částka sedí. Zbytek je nepořádek. Překlep ve VS, číslo faktury schované ve zprávě, jedna platba za tři faktury, mateřská firma platí za dceřinou, platba v eurech. Takové platby každý den skončí na něčím stole.

Je to typický kus podnikového systému: pravidla napsaná před lety, peníze ve hře a spousta okrajových případů. Proto je to dobrý model pro otázku, kterou dnes řeší hodně firem: jak starý systém modernizovat a kam do něj rozumně pustit AI.

Celou práci řídilo jedno pravidlo: **špatné spárování je horší než žádné.** Nespárovanou platbu člověk dořeší. Platbu spárovanou se špatnou fakturou nikdo nehledá, dokud se neozve zákazník.

## Výchozí bod: modul „z roku 2005“

Nechtěl jsem ukazovat modernizaci na hračce, ale nemůžu použít kód žádného klienta. Proto projekt začíná fiktivním modulem v Delphi a Oracle PL/SQL, napsaným tak, jak se takové věci psaly kolem roku 2005. Jde opravdu přeložit a spustit (Free Pascal v Dockeru). Data jsou syntetická, z generátoru, který ke každé platbě zná správnou odpověď.

Díky tomu šlo starý systém poctivě změřit. Ze tří stovek a z tisíce plateb spároval automaticky zhruba dvě třetiny. Jenže jen asi 80 % z toho bylo správně a **19 plateb z 1 000 skončilo u špatné faktury**. Objevil se i domino efekt, který nikdo neplánoval: špatné spárování „spotřebuje“ fakturu a správná platba, která přijde později, skončí jako duplicita.

<!-- blok: srovnání -->
- **19 z 1 000** – plateb na špatnou fakturu ve starém modulu
- **0** – po modernizaci a s AI vrstvou

*Měřeno proti správným odpovědím generátoru, stejná data pro oba systémy.*

## AI jako archeolog kódu

Prvním krokem modernizace je porozumět, co starý systém doopravdy dělá. U skutečného legacy kódu to bývá nejdražší část: dokumentace chybí a autoři odešli.

Udělal jsem slepý test. Jedna session agenta modul napsala a do kódu zasadila 11 obchodních pravidel a dvě drobnosti, jejichž seznam zůstal mimo repozitář. Druhá, úplně izolovaná session neměla žádný kontext ani přístup k plánu a nesměla kód spouštět. Dostala jen zdrojáky a úkol sepsat pravidla.

Našla všech 13 a k nim **sedm skutečných problémů, které nikdo nezasadil**. Třeba že PL/SQL okno na 26 znaků uřízne číslo faktury a platba pak sedne na jinou fakturu. Nebo že v PL/SQL verzi projde prázdná měna jako koruny. Nebo že nečitelná částka je nula a „částečná úhrada“ pak fakturu uzavře. AI byla důkladnější než autor fikce.

Jedno pravidlo ale měla o jedničku vedle (okno 0–14 místo 0–15). Nechytilo to čtení, ale test nad skutečným chováním starého programu. Odtud pořadí autorit, které platí pro každou modernizaci: **běžící kód > čtení kódu > dokument.**

## Modernizace bez dramatu

Modernizace šla po krocích podle vzoru *strangler fig*: nový systém postupně obrůstá starý, místo aby ho jedním velkým přepisem nahradil.

<!-- blok: časová osa -->
- **1 – Porozumět**  
  Pravidla z kódu vytáhne izolovaný agent a člověk je zkontroluje.
- **2 – Zachytit chování**  
  Výstup starého programu nad stejnými daty je „golden master“: pravda, se kterou se nedá hádat.
- **3 – Přenést věrně**  
  Nová verze v .NET musí dát bajtově stejný výsledek včetně chyb.
- **4 – Měnit vědomě** <!-- aktuální etapa -->  
  Teprve pak opravy, a každý rozdíl proti starému chování musí být vysvětlený.

Port do .NET byl bajtově shodný se starým modulem na 1 300 platbách hned napoprvé. Pomohla dobrá specifikace včetně detailů jako „vstup čti jako Latin-1“. Díky golden masteru šel udělat i refaktoring, kterého se u peněz každý bojí: přechod z `double` na `decimal` bez jediné změny výstupu. Dokázaný, ne odhadnutý.

Potom přišly vědomé opravy. Test „každý rozdíl musí být vysvětlený“ v tu chvíli chytil agenta dvakrát: jeho klasifikátor rozdílů nepočítal se dvěma situacemi, které v datech byly. Výsledek modernizace: **na stejných datech už žádná platba neskončila u špatné faktury.**

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
  faktura existuje, částky a měna sedí, odpověď je jednoznačná, není to injection
- **5 · Člověk**  
  co je nejisté, jde do fronty s připraveným návrhem

Model nemá poslední slovo. Když vybere fakturu, kód ověří, že taková existuje, že částka sedí a že žádná jiná kombinace nesedí stejně dobře. Teprve potom se něco uloží. Text, který napsal plátce, je pro model nedůvěryhodná data, ne pokyny.

Nejcennější lekci z této fáze ale nedal model. Než jsem pustil skutečné AI, běžel „stub“: deterministická náhražka, která bere vždy prvního kandidáta. A ten při prvním běhu **spároval eurovou platbu se dvěma jinými fakturami téhož odběratele**, protože jejich součet se náhodou vešel do pásma kurzu. Test s náhodnými odpověďmi to předtím přešel jen díky štěstí. Agent ho proto nahradil vyčerpávajícím testem, který jako „odpověď modelu“ zkusí každou kombinaci kandidátů. Našel 45 děr a dvě nová pravidla je zavřela.

Pointa: bezpečnost AI v produktu nestojí na modelu, ale na validaci. A validace se testuje celým prostorem možných odpovědí, ne vzorkem.

## Evaly: vyplatí se AI vůbec?

U AI nestačí, že „to vypadá dobře“. Potřebujete číslo, které se po každé změně přepočítá. Proto vznikla zlatá sada 300 plateb, z toho 30 % záměrně záludných: remízy dvou stejných faktur, čísla faktur ve formátu, který kód nepřečte, a pokusy o prompt injection schované v textu zprávy. Odpovědi skutečného modelu jsou nahrané a v CI se přehrávají bez API klíče. **Build spadne**, jakmile přesnost klesne pod 99 % nebo se spáruje jediná injection.

První běh evalů hned našel díru, a zase ne v modelu, ale ve validaci. Ta kontrolovala, že návrh sedí, ale ne, že je jediný, který sedí. U remíz tak 8 plateb šlo na špatnou fakturu. Gate v CI to shodil a přibylo pravidlo: když sedí i jiná kombinace, rozhodne člověk. Test je jen tak dobrý jako data, nad kterými běží.

| | Jen pravidla | Pravidla + kód bez AI | **Pravidla + Claude** |
|---|---|---|---|
| Správná automatická párování | 100 % | 100 % | **100 %** |
| Spárováno bez člověka | 37,7 % | 53,3 % | **53,3 %** |
| Odražené prompt injection (ze 40) | 40 | 20 | **40** |
| Cena za 1 000 plateb | – | – | **$0,36** |

Tabulka ukazuje i to, co se v prezentacích o AI obvykle neříká. Automatizaci tady dá i kód bez modelu: výběr kandidátů a validace odvedou většinu práce. Model přidává hodnotu jinde. Pozná všechny skryté pokusy o injection (bez něj by člověk dvacetkrát dostal jako návrh fakturu útočníka) a ke každé nejasné platbě napíše zdůvodnění, ze kterého člověk rozhoduje. Upřímně řečeno: **na čistých datech je AI zbytečná dekorace.** Svou hodnotu ukáže až na nepřátelském a nejednoznačném vstupu, a i tam hranici drží kód.

Evaly si kdokoli pustí sám jedním příkazem, bez API klíče a zdarma.

<!-- blok: zdroj -->
[Kompletní report evalů na GitHubu ↗](https://github.com/stanislavmatzke-ops/payment-matching-ai/tree/main/evals/reports)

## Cena a provoz

Za AI se platí $0,36 za 1 000 plateb. Většinu rozhodne malý a levný model. Velký se volá jen tam, kde jeho odpověď může změnit výsledek, a jen tím pravidlem klesl počet jeho volání ze 39 na 4. Na [ukázkové platbě v demu](https://payments.stanislavmatzke.com/demo/payments/P0016) je to vidět v auditní stopě: malý model si nebyl jistý, velký platbu s prohozenými číslicemi ve VS spároval s jistotou 0,93 a kód odpověď ověřil. Stálo to zhruba jeden cent.

Veřejná aplikace má jedno tvrdé pravidlo: **návštěvník nikdy nespustí model.** AI běží v plánovaném ranním jobu se třemi rozpočty a odpovědi se ukládají do cache. Cena tak nezávisí na tom, kolik lidí se přihlásí. Hosting v Azure stojí pár dolarů měsíčně a AI v provozu se vejde do rozpočtu $0,50 měsíčně.

Pro firmu je zajímavější srovnání s ruční prací. Při předpokladu 1,5 minuty na platbu a nákladech 600 Kč na hodinu vychází ruční párování 1 000 plateb zhruba na 25 hodin práce. S pravidly a AI zbude člověku necelá polovina plateb, a to s připraveným návrhem. Cena modelu je vedle toho zanedbatelná. Hlavní přínos je ale jinde: v testech ani jedna platba na špatné faktuře.

## Co ukázalo až nasazení a první uživatel

Nasazení je samostatná fáze s vlastními chybami. V Azure se objevily čtyři, které žádný test chytit nemohl. Nová databáze měla schéma jiného vlastníka, takže první migrace neprošla. Změna hesla v Key Vaultu tiše shodila běžící aplikaci, protože ta si držela starou hodnotu. Telemetrie si sama zapnula vzorkování a zahodila jediný trace krátkého jobu. A GitHub mezitím změnil formát identity pro přihlašování bez hesla. Agent je diagnostikoval z logů a opravil ve skriptech a konfiguraci.

Poslední díru odhalila až příprava na zveřejnění kódu. Nasazovací pipeline se spouštěla po zeleném CI na větvi `main`, jenže kontrolovala jen *název* větve, ne odkud kód pochází. Kdokoli by si mohl udělat kopii repozitáře, pojmenovat svou větev `main`, poslat pull request a jeho kód by se nasadil do produkce, i s přístupem k tajným klíčům aplikace. V soukromém repozitáři taková chyba neexistuje, takže ji žádný test nemohl najít. Pipeline teď nasazuje jen kód z vlastního repozitáře. Ponaučení: **CI/CD je kód se stejnými právy jako produkce** a zelený build neříká nic o tom, čí kód prošel.

Pak jsem aplikaci hodinu používal jako běžný uživatel a našel věci, které by žádný test nenašel. Nový uživatel viděl AI platby jako „čeká na AI“ až do druhého rána. Byl to přímý důsledek bezpečnostního pravidla, takže řešení ho muselo zachovat: startovní data teď předpočítá plánovaný job a přihlášení čte rozhodnutí AI z cache, bez jediného volání modelu.

Druhý nález: člověk ve frontě viděl návrh, ale ne fakturu vedle platby. Neměl tedy z čeho rozhodnout a jen klikal. *Člověk ve smyčce* funguje, jen když vidí obě strany a rozdíl mezi nimi. Navíc teď jde každé párování od AI jedním klikem vrátit. Dashboard ukazuje, kolik jich lidé nechali být, a vedle evalů tak vzniká druhý, provozní signál kvality: přesnost AI očima lidí.

## Jak se to stavělo s agentem

Kód, testy, infrastrukturu i dokumentaci napsal AI agent (Claude Code). Já jsem byl architekt, zadavatel a kontrola. Práce zabrala zhruba dva a půl dne:

<!-- blok: časová osa -->
- **Půl dne – Zadání**  
  Analýza, cíle, plán a prázdné repo jen se specifikací (SPEC), plánem (PLAN) a pravidly pro agenta.
- **1 den – Vývoj**  
  Fáze po fázi: legacy a golden master, vytažení pravidel, věrný port, AI vrstva, evaly a zlatá sada, první prototyp.
- **1 den – Dotažení a provoz** <!-- aktuální etapa -->  
  Testy a evaly, refaktoring, uživatelské testování a změny podle něj, smoke testy, nasazení do Azure, zveřejnění repa.

Každá fáze běžela stejně, většinou v nové session agenta, která znala jen specifikaci, plán a zapsaná rozhodnutí. Agent si je přečetl a navrhl postup. Já ho schválil nebo upravil. Agent implementoval s testy a zastavil se, aby ukázal výsledek. **Schvaloval jsem plány, ne diffy.** Kontrola desetiřádkového plánu je místo, kde člověk přidá nejvíc. Diff zkontrolují testy.

Agent dělal chyby, což je normální. Neposílal kód, který by se nepřeložil, ale kód věrohodný a špatný způsobem, který ukážou až data, jiný operační systém nebo paralelní běh. Všechny takové chyby chytil mechanismus: golden master, vyčerpávající test, eval gate, CI na Linuxu. Žádná z nich se nedostala do provozu. Podobné zkušenosti jsem popsal v článku [Co AI agent při vývoji pokazil](/clanky/co-ai-agent-pokazil).

### Jak velký projekt to je

Aby „dva a půl dne“ nebylo jen číslo: aplikační kód má zhruba 7 900 řádků v C#, k tomu 1 800 řádků UI, 5 300 řádků testů (401 testů), 700 řádků infrastruktury a CI/CD a asi 40 000 slov dokumentace s 18 zapsanými rozhodnutími. Zlatá sada má 300 ručně zkontrolovaných plateb.

<!-- blok: srovnání -->
- **4–6 měsíců** – tým 4–5 lidí bez AI (můj odhad, ~70–115 člověkotýdnů)
- **~2,5 dne** – jeden zkušený člověk s AI agentem

*Odhad je spíš dolní hranice: legacy je tu malá fikce (650 řádků) a projekt nemá napojení na skutečnou banku ani ERP. U skutečného systému by analýza trvala déle.*

Kalendář týmu by nezkrátilo ani přidání dalších lidí. Analýzu starého systému, kontrolu zlaté sady a obchodní rozhodnutí nejde rozdělit mezi víc hlav. Právě tady AI zrychlila nejvíc: agent připravil podklady za hodiny a mně zbylo rozhodovat.

Moje role byla jinde: co a proč stavíme, co je „správně“, a všechno, co stojí peníze nebo mění infrastrukturu. Každé placené volání modelu a každá změna v Azure potřebovaly moje výslovné „ano“. A pár věcí přinesl úsudek, ne kód. Agent pečlivě omezil počet volání AI na jeden sandbox, jenže tak přísně, že noví uživatelé čekali na AI několik dní. Skutečnou pojistkou proti „vytočení“ účtu je globální strop a počet nových účtů za den. Limit na sandbox jen zdržoval. Tohle rozhodnutí jsem musel udělat já.

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

Před pár lety by takový projekt byl na **čtyři až šest měsíců práce týmu čtyř až pěti lidí**, od analýzy starého systému přes vývoj a testy až po nasazení. Dnes ho zvládne jeden zkušený člověk s AI agentem za pár dní, pokud ví, co chce, a umí to ověřit. Víc o tom, jak se změnila rychlost vývoje, píšu v článku [Rychlost vývoje: co se za pár let změnilo](/clanky/rychlost-vyvoje) a o tom, kam se tím posouvá práce vývojáře, v článku [Kam mizí vývojářská práce](/clanky/kam-mizi-vyvojarska-prace).

<!-- blok: odkaz -->
[Další projekt: Job Scout – chytrý pomocník pro hledání práce →](/projekty/job-scout)
