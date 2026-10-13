import { Article, Block, Meta, Reference } from './types';

/**
 * Zdrojový slovník – čeština. Angličtina (en.ts) má typ `typeof cs`,
 * takže kompilátor odmítne chybějící překlad.
 */
export const cs = {
  nav: {
    services: 'Služby',
    showcase: 'Projekty',
    articles: 'Články',
    references: 'Reference',
    about: 'O mně',
    contact: 'Kontakt',
    cta: 'Nezávazná konzultace',
    menu: 'Menu',
    close: 'Zavřít menu',
    toDark: 'Přepnout na tmavý režim',
    toLight: 'Přepnout na světlý režim',
    otherLang: 'English',
    otherLangShort: 'EN',
    skip: 'Přeskočit na obsah',
    home: 'Stanislav Matzke – úvodní stránka',
  },

  meta: {
    home: {
      title: 'Stanislav Matzke – vývoj a modernizace podnikových systémů s AI',
      description:
        'Patnáct let vývoje podnikových systémů a rychlost, kterou přinesla AI. Návrh, vývoj, nasazení i provoz v .NET, Javě, Oracle a Azure. Praha / hybrid.',
    },
    services: {
      title: 'Služby – Stanislav Matzke',
      description:
        'Konzultace a review architektury, systémy na míru, modernizace Delphi a Oracle PL/SQL, integrace, AI v řešeních a tech lead na kontrakt.',
    },
    articles: {
      title: 'Články – Stanislav Matzke',
      description: 'Poznatky z praxe: jak AI mění vývoj software, modernizaci starých systémů a na co si při tom dát pozor.',
    },
    article: {
      title: 'Článek – Stanislav Matzke',
      description: '',
    },
    jobScout: {
      title: 'Job Scout – případová studie – Stanislav Matzke',
      description:
        'AI agent, který každé ráno projde nabídky práce a připraví podklady. .NET 10, Angular, Claude API, Azure. Jeden člověk s AI za ~10 dní.',
    },
    references: {
      title: 'Reference – Stanislav Matzke',
      description:
        'Firmy a projekty, na kterých jsem pracoval: VZP ČR, Raiffeisenbank, MONETA Money Bank, SAB Finance, ARBES, Vodafone a další.',
    },
    about: {
      title: 'O mně – Stanislav Matzke',
      description: '15 let návrhu a vývoje podnikových systémů – od Delphi a Oracle po .NET, Azure a AI agenty.',
    },
    contact: {
      title: 'Kontakt – Stanislav Matzke',
      description: 'Popište, co vás brzdí. Ozvu se do jednoho pracovního dne.',
    },
    privacy: {
      title: 'Ochrana osobních údajů – Stanislav Matzke',
      description: 'Jak tento web zachází s osobními údaji.',
    },
    notFound: {
      title: 'Stránka nenalezena – Stanislav Matzke',
      description: 'Tato stránka neexistuje.',
    },
  } satisfies Record<string, Meta>,

  common: {
    availability: 'Volné kapacity od listopadu 2026',
    location: 'Praha / hybrid · projekty, IČO i dlouhodobě',
    bookCall: 'Domluvit nezávazný hovor',
    writeMe: 'Napište mi',
    soon: 'připravuji',
    live: 'běží živě',
    openSource: 'open source',
    screenshot: 'Snímek obrazovky Job Scout – doplníme',
    lesson: 'Ponaučení',
    readArticle: 'Číst článek →',
    via: 'přes',
  },

  home: {
    kicker: 'Architektura · vývoj · nasazení · provoz',
    titleStart: 'Roky zkušeností s\u00a0vývojem aplikací.',
    titleHighlight: 'Rychlost nové generace.',
    lead:
      'Propojuji know-how z vývoje podnikových systémů od píky s tím, co dnes umí AI. Navrhnu řešení, postavím ho, nasadím a postarám se o provoz – rychle, bezpečně a s odpovědností za výsledek. Důkazem jsou projekty, které si můžete vyzkoušet.',
    ctaSecondary: 'Ukázky projektů',
    tags: ['.NET', 'Java', 'Oracle PL/SQL', 'Azure', 'Angular', 'AI agenti a LLM'],
    logosLabel: 'Pracoval jsem pro',
    logos: ['VZP ČR', 'Raiffeisenbank', 'MONETA Money Bank', 'SAB Finance', 'ARBES', 'Vodafone', 'IFS'],

    fit: {
      eyebrow: 'Je to pro vás?',
      title: 'Typické situace, se kterými za mnou firmy přicházejí',
      items: [
        'Klíčový systém funguje, ale každá změna trvá týdny – a modernizaci odkládáte, protože vypadá drahá a riskantní.',
        'Dodavatel nabízí velký projekt a potřebujete nezávislý pohled na jeho návrh a cenu.',
        'Interní agenda běží v excelech a e-mailech a zaslouží si pořádnou aplikaci.',
        'Systémy spolu nemluví a data se mezi nimi přepisují ručně.',
        'Chcete využít AI – ale smysluplně, bezpečně a se známými náklady.',
      ],
      ctaText: 'Poznáváte se? Probereme to za 30 minut, zdarma a bez závazku.',
      ctaLink: 'Domluvit hovor →',
    },

    services: {
      eyebrow: 'Služby',
      title: 'S čím vám mohu pomoci',
      all: 'Všechny služby podrobně →',
    },

    built: {
      eyebrow: 'Postaveno s AI',
      title: 'Co dřív zabralo měsíce týmu, dnes zvládnu za dny.',
      lead:
        'Ukázkové projekty, které jsem postavil s AI agenty – od návrhu přes kód a testy po nasazení v Azure. Ne prototypy na slajdy, ale aplikace, které běží a můžete si je vyzkoušet.',
      statValue: '~10 dní',
      statLabel: 'Job Scout',
      statText: 'jeden člověk s AI agentem. Bez AI odhadem 2–3 měsíce práce tříčlenného týmu.',
      jobScoutTitle: 'Job Scout',
      jobScoutText:
        'AI agent, který každé ráno projde nabídky práce, ohodnotí je podle profilu uživatele a připraví podklady. Agent připravuje, člověk rozhoduje.',
      jobScoutTags: ['.NET 10', 'Angular', 'Claude API', 'Azure', 'PostgreSQL', '600+ testů'],
      demo: 'Vyzkoušet demo →',
      study: 'Případová studie →',
      github: 'GitHub →',
      delphiTitle: 'Modernizace Delphi → .NET s AI',
      delphiText:
        'Ukázková migrace systému správy pohledávek: charakterizační testy, postupný převod logiky z PL/SQL, AI asistent nad daty.',
      webTitle: 'Tento web',
      webText: 'Angular, světlý i tmavý režim, čeština a angličtina, nasazení v Azure. Kód bude veřejný.',
      data:
        'Bezpečnost na prvním místě: jen firemní AI služby, které na vašich datech netrénují, nebo nástroje ve vašem prostředí. Každou změnu kontroluji a ručím za ni.',
      articleLink: 'Co AI agent pokazil a jak jsem na to přišel →',
    },

    articles: {
      eyebrow: 'Články',
      title: 'Poznatky z praxe',
      all: 'Všechny články →',
    },

    references: {
      eyebrow: 'Reference',
      title: 'Kde jsem pracoval',
      lead: 'Výběr z posledních 15 let – přímo i přes dodavatele. Bankovnictví, finance, zdravotnictví, logistika, státní správa.',
      all: 'Všechny reference →',
      rows: [
        { years: '2025–2026', name: '', text: 'Cloudová platforma pro síť chytrých doručovacích boxů · Azure, mikroslužby' },
        { years: '2020–2025', name: 'VZP ČR', text: 'modernizace interních aplikací, vedení týmu' },
        { years: '2018–2020', name: 'Raiffeisenbank, SAB Finance', text: 'systémy pro Treasury a devizové obchody; spisová služba' },
        { years: '2016–2018', name: 'Vodafone, IFS', text: 'portál BidSimplifier, úpravy ERP' },
        { years: '2015–2016', name: 'MONETA Money Bank', text: 'rebranding, migrace Delphi, správa pohledávek' },
        { years: '2011–2015', name: 'ARBES, registr dárců krvetvorných buněk', text: 'asset management, zdravotnictví' },
      ],
    },

    process: {
      eyebrow: 'Jak pracuji',
      title: 'Jasný postup, žádná překvapení',
      steps: [
        { title: 'Úvodní hovor zdarma.', text: '30 minut: co systém dělá, co bolí, co má být výsledkem.' },
        { title: 'Návrh a pevná cena', text: 'do dvou pracovních dnů – rozsah, výstupy, termín.' },
        { title: 'Práce s kontrolním bodem', text: 'v polovině, ať víte, kam to směřuje.' },
        { title: 'Předání', text: '– kód, dokumentace, prezentace pro vedení i IT. Vše patří vám.' },
        { title: 'Provoz a rozvoj,', text: 'pokud o ně stojíte.' },
      ],
    },

    forms: {
      eyebrow: 'Formy spolupráce',
      title: 'Jak spolu můžeme pracovat',
      items: [
        { title: 'Projekt', text: 'jasný výstup za pevnou cenu' },
        { title: 'Konzultace', text: 'review, audit, druhý názor' },
        { title: 'Dlouhodobě na IČO', text: 'architekt nebo tech lead ve vašem týmu' },
        { title: 'Hlavní pracovní poměr', text: 'pro správný tým a firmu' },
      ],
      note: 'Cenu stanovuji individuálně po úvodním hovoru – za výsledek, ne za vykázané hodiny.',
    },

    contact: {
      title: 'Pojďme to probrat.',
      lead: 'Popište pár větami, co vás brzdí. Ozvu se do jednoho pracovního dne.',
    },
  },

  services: {
    eyebrow: 'Služby',
    title: 'S čím vám mohu pomoci',
    lead:
      'Pokryju celé workflow – od návrhu a analýzy přes vývoj po nasazení a provoz. Díky AI rychleji a levněji než dřív, s důrazem na bezpečnost a kvalitu. Cenu stanovuji individuálně po úvodním hovoru, vždy za výsledek.',
    guarantee: {
      title: 'Platíte za výsledek, ne za snahu',
      text: 'Před začátkem se domluvíme, co přesně dodám, do kdy a za kolik. Pak je na mně, abych to splnil. Pokud dohodnutý výsledek nedodám, nic neplatíte – a případnou zálohu vám vrátím. Riziko nesu já, ne vy.',
    },
    labels: {
      forWhom: 'Pro koho',
      outcome: 'Co dostanete',
      experience: 'Zkušenost',
      firstStep: 'Typický první krok',
    },
    items: [
      {
        id: 'konzultace',
        title: 'Konzultace a review architektury',
        short: 'Druhý názor na řešení, návrh dodavatele nebo technický dluh – s doporučeními, podle kterých se dá jednat.',
        forWhom: 'Firmy, které stojí před důležitým technickým rozhodnutím nebo potřebují nezávislý pohled.',
        points: [
          'review architektury nebo návrhu dodavatele včetně rizik a odhadu ceny',
          'audit kódu, databáze a technického dluhu',
          'druhý názor: přepsat, modernizovat, nebo koupit hotový produkt?',
        ],
        outcome: 'Stručnou zprávu s nálezy seřazenými podle závažnosti, konkrétní doporučení a prezentaci pro vedení i IT.',
        experience: '',
        firstStep: 'Review za 1–2 týdny.',
      },
      {
        id: 'na-miru',
        title: 'Systémy na míru',
        short: 'Interní informační systémy a webové aplikace od návrhu po provoz – pro menší firmy i velké organizace.',
        forWhom: 'Firmy, kterým nestačí excel a krabicový software – od menších firem po interní IT velkých organizací.',
        points: [
          'interní informační systémy, evidence, workflow a schvalování',
          'webové aplikace s přihlášením přes firemní účty (Microsoft, Google, SSO)',
          'nasazení v cloudu (Azure) nebo u vás, CI/CD, monitoring a provoz',
        ],
        outcome: 'Analýza → návrh → vývoj po etapách s ukázkou každé etapy → nasazení a provoz. Kód a dokumentace patří vám.',
        experience: 'Čtyři roky interního vývoje ve VZP ČR (modernizace aplikací, vedení týmu), systémy pro banky a finanční firmy, Job Scout od nuly po provoz.',
        firstStep: 'Úvodní analýza a návrh první etapy.',
      },
      {
        id: 'modernizace',
        title: 'Modernizace starších systémů',
        short: 'Delphi, Oracle PL/SQL, starý .NET nebo Java. Díky AI dnes rychlejší a levnější než kdy dřív – a bez výpadku provozu.',
        forWhom: 'Firmy s klíčovým systémem starým 10–25 let, jehož modernizaci odkládaly, protože vypadala drahá a riskantní.',
        points: [
          'rychlá diagnóza: stav, rizika, doporučená strategie',
          'analýza a návrh: inventura, byznys pravidla vytěžená z kódu s pomocí AI, cílová architektura, roadmapa a odhad',
          'postupný převod s testy, které hlídají, že nový systém počítá stejně jako starý',
        ],
        outcome: 'Jasný plán, co se systémem dál – co ponechat, co modernizovat, v jakém pořadí a za kolik.',
        experience: 'Systémy v Delphi a PL/SQL jsem roky vyvíjel (MONETA, Raiffeisenbank, ARBES), dnes navrhuji řešení v .NET a Azure. Rozumím oběma světům.',
        firstStep: 'Diagnóza za týden. Když pak objednáte analýzu, cena diagnózy se odečte.',
      },
      {
        id: 'integrace',
        title: 'Integrace a API',
        short: 'Napojení na partnery, dopravce, banky a další systémy – spolehlivě, bezpečně a s monitoringem.',
        forWhom: 'Firmy, kde se data mezi systémy přepisují ručně nebo kde integrace padají.',
        points: [
          'napojení na partnery, dopravce, banky, státní a interní systémy',
          'návrh API, fronty zpráv (Azure Service Bus), zabezpečení a správa tajných klíčů',
          'monitoring, aby se chyba zjistila dřív, než ji nahlásí zákazník',
        ],
        outcome: 'Spolehlivé propojení s dokumentací a přehledem o tom, co se děje.',
        experience: 'Integrace s partnery a dopravci na platformě chytrých doručovacích boxů (např. Rohlik.cz), napojení interních systémů ve VZP.',
        firstStep: 'Návrh integrace a odhad.',
      },
      {
        id: 'ai',
        title: 'AI v řešeních',
        short: 'Asistenti a agenti nad firemními daty – bezpečně, s měřitelnou kvalitou a předem známými náklady.',
        forWhom: 'Firmy, které chtějí AI využít naplno a bezpečně – ne se jí vyhýbat, ani ji nasazovat naslepo.',
        points: [
          'návrh, kde AI ve vašem systému dává smysl a kde ne',
          'asistenti a agenti nad firemními daty (LLM přes API, tool calling, vyhledávání v dokumentech)',
          'měření kvality, ochrana proti prompt injection a zneužití, hlídání nákladů',
        ],
        outcome: 'Případy použití, architekturu, rizika a odhad nákladů na provoz – nebo rovnou funkční řešení.',
        experience: 'Job Scout – AI agent v provozu, s evidencí každého volání, jeho ceny a s limity proti zneužití.',
        firstStep: 'Návrh zapojení AI za 1–2 týdny.',
      },
      {
        id: 'tech-lead',
        title: 'Tech lead na kontrakt',
        short: 'Posílím váš tým – architektura, code review, vedení vývojářů a zavedení práce s AI do týmu.',
        forWhom: 'Týmy, kterým chybí seniorní člověk na architekturu, technická rozhodnutí a přechod na vývoj s AI.',
        points: [
          'architektura a technická rozhodnutí zapsaná tak, aby se k nim dalo vrátit (ADR)',
          'code review, mentoring, CI/CD a pravidla pro bezpečnou práci s AI agenty',
          'komunikace s vedením a byznysem srozumitelnou řečí',
        ],
        outcome: 'Dlouhodobě na IČO, část úvazku nebo plný. Pro správný tým i hlavní pracovní poměr.',
        experience: 'Vedení vývojového týmu ve VZP ČR s přímým reportingem řediteli IT.',
        firstStep: 'Úvodní schůzka s týmem.',
      },
    ],
    ctaTitle: 'Nevíte, co z toho potřebujete?',
    ctaText: 'To je v pořádku – na úvodním hovoru to zjistíme.',
  },

  articles: {
    eyebrow: 'Články',
    title: 'Poznatky z praxe',
    lead: 'Jak AI mění vývoj software a modernizaci starých systémů – z vlastní zkušenosti, bez marketingu.',
    back: '← Všechny články',
    ctaTitle: 'Chcete vědět, co by AI udělala s vaším systémem?',
    ctaText: 'Probereme to na nezávazném hovoru.',
    items: [
      {
        slug: 'rychlost-vyvoje',
        title: 'Rychlost vývoje: co se za pár let změnilo',
        perex:
          'Patnáct let se vývoj software zrychloval pomalu. Pak přišla AI a během pár let – v posledních měsících ještě výrazněji – se změnilo, co jeden zkušený člověk zvládne. Co to znamená pro nové projekty i pro modernizaci starých systémů.',
        date: 'Říjen 2026',
        readTime: '6 minut čtení',
        blocks: [
          { kind: 'h2', text: 'Patnáct let skoro beze změny' },
          {
            kind: 'p',
            text: 'Když jsem v roce 2011 začínal na systémech v Delphi, psal vývojář kód řádek po řádku. Do roku 2022 se změnilo hodně – lepší IDE, frameworky, cloud, CI/CD, kontejnery. Podstata ale zůstala: produktivitu seniorního vývojáře určovalo hlavně to, kolik kódu zvládne napsat, odladit a zkontrolovat. Zrychlení se počítalo na procenta.',
          },
          { kind: 'h2', text: 'Našeptávač a chat' },
          {
            kind: 'p',
            text: 'První AI asistenti doplňovali řádky a odpovídali na otázky v chatu. Užitečné, ale pořád jste všechno skládali sami – a často jste opravovali sebejisté nesmysly. Zrychlení bylo znát hlavně u rutiny.',
          },
          { kind: 'h2', text: 'AI, která rozumí celému projektu' },
          {
            kind: 'p',
            text: 'Pak modely začaly pracovat s celým repozitářem: refaktoring přes desítky souborů, testy, vysvětlení cizího kódu. Sám jsem to zažil, když jsem po letech v Javě přešel na .NET – byl jsem plně produktivní během pár dnů, ne měsíců.',
          },
          { kind: 'h2', text: 'Dnes: agenti, kteří práci dotáhnou' },
          {
            kind: 'p',
            text: 'Současný AI agent dostane úkol, naplánuje ho, upraví soubory, spustí build a testy, opraví chyby a vrátí se s výsledkem. A zlepšuje se to po měsících, ne po letech – co nešlo loni, jde dnes.',
          },
          {
            kind: 'p',
            text: 'Konkrétně: aplikaci Job Scout – backend v .NET 10, stahování nabídek, AI pipeline, přihlášení přes Microsoft a Google, správa uživatelů, Angular, přes 600 testů, CI, 21 zapsaných architektonických rozhodnutí a nasazení v Azure – jsem postavil za zhruba deset dní. Bez AI bych to odhadl na 2–3 měsíce práce tříčlenného týmu.',
          },
          { kind: 'h2', text: 'Co to znamená pro modernizaci starých systémů' },
          {
            kind: 'ul',
            items: [
              'Orientace ve velkém starém kódu trvá dny, ne týdny – AI projde formuláře, uložené procedury i triggery.',
              'Byznys pravidla schovaná v kódu se dají vytěžit a sepsat; člověk je pak ověří s uživateli.',
              'Charakterizační testy, které hlídají, že nový systém počítá stejně jako starý, se píšou mnohem rychleji.',
              'Převod modul po modulu je výrazně levnější – systémy, na které se roky „nesahalo, protože je to drahé“, stojí za to přepočítat.',
            ],
          },
          {
            kind: 'lesson',
            text: 'Projekt, který jste před dvěma lety odložili jako příliš drahý, stojí za to přepočítat. Cena se mezitím změnila víc než za předchozích deset let.',
          },
          { kind: 'h2', text: 'Kde je teď úzké hrdlo' },
          {
            kind: 'p',
            text: 'Psaní kódu už není to nejpomalejší. Úzkým hrdlem jsou rozhodnutí: co stavět, jak to navrhnout, kdo smí co vidět, kolik to bude stát v provozu a co se stane, když něco selže. AI zrychluje toho, kdo ví, co dělá. Bez zkušenosti dostanete rychle hodně kódu, kterému nikdo nerozumí.',
          },
          { kind: 'link', text: 'Na co jsem při vývoji s AI agentem narazil v praxi →', article: 'co-ai-agent-pokazil' },
        ] as Block[],
      },
      {
        slug: 'co-ai-agent-pokazil',
        title: 'Co AI agent při vývoji pokazil – a proč na tom záleží',
        perex:
          'Aplikaci Job Scout psal AI agent, já jsem byl architekt a reviewer – zadával jsem, kontroloval, testoval a nasazoval. Klasické bezpečnostní chyby agent nedělal. Ty, které udělal, byly zrádnější: kód správně, testy zelené, logika nedomyšlená.',
        date: 'Říjen 2026',
        readTime: '7 minut čtení',
        blocks: [
          { kind: 'h2', text: 'Nejdřív to dobré: hloupé chyby už (skoro) nedělá' },
          {
            kind: 'p',
            text: 'Typické strašáky „vibe codingu“ – hesla a API klíče v kódu, chybějící kontrola vstupů, SQL injection, přihlašování na koleni – se v Job Scoutu neobjevily. Agent sám od sebe držel klíče mimo repozitář, validoval vstupy, napsal přes 600 automatických testů, přidal ochranu proti prompt injection a testy, které hlídají vrstvy aplikace.',
          },
          {
            kind: 'p',
            text: 'Chyby, které udělal, byly jiného druhu: kód byl správně, testy zelené – ale logika nedomyšlená. Přesně ty, které žádný linter ani bezpečnostní scanner nenajde.',
          },
          { kind: 'h2', text: 'Příběh 1: Kdokoli s přístupem mohl „vyžrat“ AI tokeny' },
          {
            kind: 'p',
            text: 'Ranní běh Job Scoutu měl od začátku pevné limity. Pak jsme přidali tlačítka „Ohodnotit“ a „Napsat nový návrh dopisu“ – každé z nich je placené volání AI. Agent je naprogramoval přesně podle zadání: fungovala, byla otestovaná, náklady se zaznamenávaly.',
          },
          {
            kind: 'p',
            text: 'Jenže nikdo – ani agent – se nezeptal: „A co když někdo klikne tisíckrát?“ Stačilo v poznámkách změnit jedno písmeno a profil se znovu analyzoval. Dopis šlo přepisovat donekonečna. Přišel na to člověk, ne AI – den po spuštění, když jsem aplikaci poslal prvním lidem a sám si ji proklikal.',
          },
          {
            kind: 'p',
            text: 'Oprava zabrala jedno dopoledne: limity na kliknutí v klouzavém okně 24 hodin, denní „záchranná brzda“ pro celou aplikaci s e-mailem správci, zámek proti dvěma rychlým kliknutím a měsíční limit útraty přímo u poskytovatele AI.',
          },
          {
            kind: 'lesson',
            text: 'U aplikací s AI je „útok na peněženku“ stejně reálné riziko jako únik dat (OWASP ho pro LLM aplikace vede jako Unbounded Consumption). AI dodá, co zadáte – otázku „kolik nás to může stát, když se to zneužije“ musí položit člověk.',
          },
          { kind: 'h2', text: 'Příběh 2: Zamítnutý uživatel se dostal do aplikace' },
          {
            kind: 'p',
            text: 'Přístup do Job Scoutu schvaluje správce. Agent implementoval „Zamítnout žádost“ – a použil k tomu existující stav „pozastavený účet“. Na první pohled logické. Jenže pozastavený uživatel je pořád členem a smí si prohlížet svá data. Zamítnutý žadatel tak po přihlášení prošel dovnitř.',
          },
          {
            kind: 'p',
            text: 'Testy byly zelené, protože testovaly přesně to, co agent napsal. Nikdo netestoval, že zamítnutý žadatel nemá vidět vůbec nic. Přišel jsem na to ručním testem v produkci: zamítl jsem testovací účet a ten se normálně přihlásil.',
          },
          {
            kind: 'lesson',
            text: 'Autorizace je místo, kde „skoro správně“ znamená „špatně“. Review přístupových pravidel a ruční test „zkusím se tam dostat“ nenahradí žádný automat.',
          },
          { kind: 'h2', text: 'Bonus: dvě části, které spolu nemluvily' },
          {
            kind: 'p',
            text: 'Agent napsal workflow, které po každém commitu postaví Docker image – a rozumně vynechá commity, kde se mění jen dokumentace. Jindy napsal nasazovací skript, který nasadí image podle posledního commitu. Každá část sama o sobě správně. Dohromady: po změně README chtěl skript nasadit image, který nikdy nevznikl. Chyba ne v kódu, ale ve spojení dvou rozhodnutí z různých dnů.',
          },
          { kind: 'h2', text: 'Kontrola podle seznamu: tady je AI silná' },
          {
            kind: 'p',
            text: 'Po spuštění jsme aplikaci prošli bod po bodu podle bezpečnostního checklistu pro „vibe coding“ – validace vstupů, autorizace, session, rate limiting, tajné klíče, závislosti, prompt injection, analýza kódu v CI, bezpečnostní hlavičky. Kontrolu dělal opět agent. Když dostane jasný seznam, proti čemu kontrolovat, je důkladný – a našel další díru, kterou předtím sám vytvořil: o přístup mohl kdokoli požádat stokrát a správci by přišlo sto e-mailů.',
          },
          {
            kind: 'source',
            text: 'O2 CyberNews: Vibe coding – funkční kód není automaticky bezpečný',
            href: 'https://o2cybernews.cz/clanky/vibe-coding-funkcni-kod-neni-automaticky-bezpecny',
          },
          { kind: 'h2', text: 'Co z toho plyne pro firmy' },
          {
            kind: 'ul',
            items: [
              'AI se rychle zlepšuje – klasické bezpečnostní chyby dnes dobrý agent s jasnými pravidly sám od sebe nedělá. To ale neznamená, že je kód hotový.',
              'Hlídat je potřeba logiku, ne syntaxi: kdo smí co vidět, co se stane při zneužití, kolik to stojí, jak spolu části fungují dohromady.',
              'Zelené testy nestačí – agent testuje to, co napsal. Testy na „co by se stát nemělo“ musí vymyslet člověk.',
              'Rychlá zpětná vazba z provozu odhalila obě hlavní chyby do 24 hodin. Pustit aplikaci brzy malé skupině lidí a mít limity a monitoring nákladů od prvního dne se vyplatilo.',
            ],
          },
          { kind: 'h2', text: 'Jak s AI zacházím u zákazníků' },
          {
            kind: 'ul',
            items: [
              'AI používám k orientaci ve velkém kódu, vytěžení byznys pravidel, návrhu testů a dokumentace. Závěry, architekturu a doporučení dělám já.',
              'Jen firemní verze AI služeb, které smluvně netrénují na datech zákazníka. Když máte vlastní schválené nástroje (třeba Azure OpenAI ve vašem tenantu), použiju je.',
              'Pracuji na kopii kódu a s anonymizovanými nebo testovacími daty, nikdy s produkčními osobními údaji. Po skončení zakázky vše smažu a potvrdím to písemně.',
              'AI nikdy nedávám klíče a hesla. Každou změnu, kterou agent udělá, projdu, schválím a ručím za ni.',
            ],
          },
          { kind: 'h2', text: 'A co když AI nechcete?' },
          {
            kind: 'p',
            text: 'Jde to i bez ní. Ale upřímně: je to cesta zpátky. Kdo dnes vyvíjí pomaleji a dráž než konkurence, prohraje – firmy na trhu i lidé na pracovním trhu. Sám jsem se musel přizpůsobit a vím, že to jde.',
          },
          {
            kind: 'p',
            text: 'Řešením není se AI vyhýbat, ale používat ji vědomě: s důrazem na bezpečnost, ochranu dat a kontrolu výstupů. S tímhle přechodem vám rád pomůžu – stejně jako jsem ho zvládl já.',
          },
        ] as Block[],
      },
    ] as Article[],
  },

  jobScout: {
    eyebrow: 'Případová studie',
    title: 'Job Scout: AI agent, který připraví, ale nerozhoduje',
    lead:
      'Každé ráno projde pracovní portály, najde inzeráty odpovídající CV uživatele, ohodnotí je a k nejlepším napíše návrh průvodního dopisu. Na inzeráty vždy odpovídá člověk.',
    facts: [
      { value: '~10 dní', label: 'jeden člověk s AI agentem' },
      { value: '2–3 měsíce', label: 'odhad pro tříčlenný tým bez AI' },
      { value: '600+', label: 'automatických testů' },
      { value: '21', label: 'zapsaných architektonických rozhodnutí' },
    ],
    blocks: [
      { kind: 'h2', text: 'Proč vznikl' },
      {
        kind: 'p',
        text: 'Chtěl jsem se prakticky naučit stavět aplikace s AI na skutečném problému – vlastním hledání práce. Pak se z něj stal nástroj, který denně používám, a ukázka, jak takovou aplikaci postavit pořádně: s přihlášením, víc uživateli, hlídáním nákladů a nasazením v cloudu.',
      },
      { kind: 'h2', text: 'Jak funguje' },
      {
        kind: 'ul',
        items: [
          'Z CV a volných poznámek („full remote, žádná Java“) udělá AI strukturovaný profil.',
          'Každé ráno stáhne jen nové inzeráty od posledního běhu.',
          'Levný model (Haiku) roztřídí titulky po dávkách, zjevně nerelevantní vyřadí.',
          'Silnější model (Sonnet) ohodnotí celý inzerát: skóre 1–10, důvody, rizika, otázky na zaměstnavatele.',
          'U skóre 7 a víc napíše návrh průvodního dopisu v jazyce inzerátu.',
          'Uživatel vše vidí ve webové aplikaci a ráno dostane krátký e-mail. Nic se neodesílá automaticky.',
        ],
      },
      { kind: 'h2', text: 'Co je na něm zajímavé' },
      {
        kind: 'ul',
        items: [
          'Dva modely podle ceny a náročnosti úlohy, evidence tokenů a ceny u každého volání, limity proti zneužití.',
          'Strukturovaný výstup s validací – výstupu AI se nikdy slepě nevěří. Ochrana proti prompt injection.',
          'Přihlášení přes Microsoft a Google bez tokenů v prohlížeči (BFF), schvalování přístupu správcem.',
          'Modulární monolit s porty a adaptéry, architektonické testy, 21 zdokumentovaných rozhodnutí (ADR).',
          'Azure Container Apps, PostgreSQL, Key Vault, infrastruktura jako kód (Bicep), CI v GitHub Actions s kontrolou zranitelností.',
          'Čeština a angličtina, veřejný ukázkový účet, který se každé ráno vrátí do výchozího stavu.',
        ],
      },
      { kind: 'h2', text: 'Technologie' },
      {
        kind: 'p',
        text: '.NET 10 · ASP.NET Core · EF Core · Angular 21 · Claude API (oficiální SDK) · Playwright · Azure Container Apps · PostgreSQL · Key Vault · Azure Communication Services · Bicep · GitHub Actions',
      },
    ] as Block[],
    aiLink: 'Co agent při vývoji pokazil a jak jsem na to přišel →',
    demo: 'Vyzkoušet bez registrace',
    github: 'Zdrojový kód na GitHubu',
  },

  references: {
    eyebrow: 'Reference',
    title: 'Firmy a projekty, na kterých jsem pracoval',
    lead:
      'Za 15 let jsem pracoval v bankách, finančních firmách, zdravotnictví, logistice i státní správě – jako zaměstnanec i přes dodavatele. Detaily projektů jsou důvěrné, proto jen to podstatné.',
    stats: [
      { value: '15 let', label: 'praxe ve vývoji podnikových systémů' },
      { value: '10', label: 'firem a velkých projektů' },
      { value: '5 oborů', label: 'banky, finance, zdravotnictví, logistika, státní správa' },
    ],
    items: [
      {
        name: 'Platforma chytrých doručovacích boxů',
        project: 'Cloudová platforma pro síť boxů',
        years: '2025–2026',
        sector: 'logistics',
        sectorLabel: 'Logistika',
        role: 'Softwarový architekt / senior vývojář (OSVČ)',
        via: '',
        text: 'Stovky chytrých boxů ve více než 100 obcích, ve špičkách tisíce až desetitisíce zásilek.',
        highlights: [
          'mikroservisní řešení v Azure s cca 35 doménami',
          'nové integrace s partnery a dopravci (např. Rohlik.cz)',
          'zásilka s více balíky napříč službami',
          'bezpečnost, správa secrets, volba Azure komponent',
        ],
        tags: ['C#/.NET', 'Azure Service Bus', 'PostgreSQL', 'MongoDB', 'Docker'],
      },
      {
        name: 'VZP ČR',
        project: 'Modernizace interních aplikací',
        years: '2020–2025',
        sector: 'health',
        sectorLabel: 'Zdravotnictví',
        role: 'Team leader / full stack developer (HPP)',
        via: '',
        text: 'Převod interních aplikací největší zdravotní pojišťovny na moderní webové aplikace v Azure.',
        highlights: [
          'vedení tříčlenného týmu s přímým reportingem řediteli IT',
          'PZS Manager – správa poskytovatelů zdravotních služeb, dopad na pobočky VZP Point a vyhledávání lékařů',
          'CI/CD v Azure DevOps, Docker, přihlášení přes MS SSO',
        ],
        tags: ['Java', 'Spring Boot', 'Angular', 'Azure', 'OAuth2'],
      },
      {
        name: 'Spisová služba',
        project: 'Přepis backendu Java → .NET Core',
        years: '2018–2020',
        sector: 'public',
        sectorLabel: 'Státní správa',
        role: 'Senior vývojář (OSVČ)',
        via: 'Mediaport Solutions / ISF Group',
        text: 'Přepis backendu spisové služby ze staré Javy do .NET Core 3.1.',
        highlights: ['údržba původního systému po celou dobu migrace'],
        tags: ['Java', '.NET Core', 'Migrace'],
      },
      {
        name: 'SAB Finance',
        project: 'ProStream',
        years: '2018–2020',
        sector: 'finance',
        sectorLabel: 'Finance',
        role: 'Senior vývojář (OSVČ)',
        via: '',
        text: 'Backend online platformy pro devizové obchody.',
        highlights: [],
        tags: ['C#/.NET', 'Oracle PL/SQL'],
      },
      {
        name: 'Raiffeisenbank',
        project: 'CRAFOL',
        years: '2018–2020',
        sector: 'bank',
        sectorLabel: 'Bankovnictví',
        role: 'Senior vývojář (OSVČ)',
        via: '',
        text: 'Interní systém oddělení Treasury.',
        highlights: [],
        tags: ['Delphi', 'C#/.NET', 'PL/SQL'],
      },
      {
        name: 'ARBES Technologies',
        project: 'ARBES TOPAS a ARBES TA',
        years: '2013–2015 · 2018–2020',
        sector: 'asset',
        sectorLabel: 'Asset management',
        role: 'Vývojář',
        via: '',
        text: 'Informační systémy pro správu portfolií, obchodování a správu podílových listů.',
        highlights: ['ARBES TOPAS – správa portfolií a obchodování', 'ARBES TA – správa podílových listů'],
        tags: ['Delphi', 'PL/SQL'],
      },
      {
        name: 'Vodafone',
        project: 'BidSimplifier',
        years: '2017–2018',
        sector: 'telecom',
        sectorLabel: 'Telekomunikace',
        role: 'Vývojář',
        via: 'Cleverlance',
        text: 'Rozvoj a stabilizace portálu BidSimplifier.',
        highlights: [],
        tags: ['C#/.NET', 'MS SQL'],
      },
      {
        name: 'IFS',
        project: 'Zákaznické úpravy ERP',
        years: '2016–2017',
        sector: 'erp',
        sectorLabel: 'ERP',
        role: 'Vývojář',
        via: '',
        text: 'Zákaznické úpravy ERP systému IFS.',
        highlights: [],
        tags: ['C#/.NET', 'PL/SQL'],
      },
      {
        name: 'MONETA Money Bank',
        project: 'Rebranding z GE Money Bank',
        years: '2015–2016',
        sector: 'bank',
        sectorLabel: 'Bankovnictví',
        role: 'Vývojář',
        via: '',
        text: 'Projekt rebrandingu banky – úpravy interních systémů.',
        highlights: ['migrace interního frontendu z Delphi 6 na XE5', 'systém pro správu pohledávek'],
        tags: ['Delphi', 'PL/SQL', 'Migrace'],
      },
      {
        name: 'Registr dárců krvetvorných buněk',
        project: 'Prometheus',
        years: '2011–2013',
        sector: 'health',
        sectorLabel: 'Zdravotnictví',
        role: 'Vývojář',
        via: 'Steiner',
        text: 'Vývoj systému Prometheus pro registr dárců krvetvorných buněk.',
        highlights: [],
        tags: ['Delphi'],
      },
    ] as Reference[],
    ctaTitle: 'Chcete být další referencí?',
    ctaText: 'Začněme nezávazným hovorem.',
  },

  about: {
    eyebrow: 'O mně',
    title: 'Od návrhu po provoz',
    paragraphs: [
      'Jmenuji se Stanislav Matzke a 15 let navrhuji a vyvíjím podnikové systémy. Začínal jsem na systémech v Delphi a Oracle pro banky a finanční firmy, přes .NET a Javu jsem se dostal k cloudovým řešením v Azure a k vedení týmu v interním IT VZP.',
      'V poslední době jsem se podílel na vývoji mikroservisní platformy pro síť chytrých doručovacích boxů a stavím vlastní aplikace – některé z nich najdete tady na webu a na GitHubu.',
      'Díky tomu rozumím starému i novému světu: vím, proč je systém z roku 2005 napsaný tak, jak je, a umím ho bezpečně převést do moderní architektury. Posledních pár let k tomu přidávám AI – a změnilo to, co jeden člověk zvládne. Dnes pokryju celé workflow od návrhu přes vývoj a nasazení po provoz.',
    ],
    howTitle: 'Jak rád pracuji',
    how: [
      'S jasným cílem, důvěrou a odpovědností za výsledek.',
      'Méně porad, víc hotové práce.',
      'Rozhodnutí zapisuji, aby se k nim dalo vrátit.',
      'Předávám kód, který je bezpečný, otestovaný a zdokumentovaný – a ručím za něj, i když velkou část napsala AI.',
    ],
    timelineTitle: 'Praxe',
    timeline: [
      { years: '2025–2026', text: 'Softwarový architekt / senior vývojář (OSVČ) – cloudová platforma pro síť chytrých doručovacích boxů' },
      { years: '2020–2025', text: 'VZP ČR – team leader / full stack developer' },
      { years: '2018–2020', text: 'OSVČ – kontrakty ve finančním sektoru a státní správě (Mediaport / ISF Group, ARBES)' },
      { years: '2011–2018', text: 'Cleverlance, IFS, MONETA Money Bank, ARBES Technologies, Steiner' },
    ],
    techTitle: 'Technologie',
    tech: [
      'C#/.NET', 'Java (Spring Boot)', 'Delphi', 'Oracle PL/SQL', 'MS SQL', 'PostgreSQL', 'MongoDB',
      'Azure', 'Docker', 'Azure DevOps', 'GitHub Actions', 'Angular', 'Claude API', 'AI agenti',
    ],
    hobbiesTitle: 'Mimo práci',
    hobbies: 'Řemeslná a manuální práce, homebrewing, cestování, sport.',
    downloadsTitle: 'Ke stažení a odkazy',
    cvCz: 'Životopis (CZ, PDF)',
    cvEn: 'CV (EN, PDF)',
  },

  contact: {
    eyebrow: 'Kontakt',
    title: 'Pojďme to probrat.',
    lead: 'Popište pár větami, co vás brzdí. Ozvu se do jednoho pracovního dne.',
    direct: 'Přímý kontakt',
    billing: 'Fakturační údaje',
    tradeRegister: 'Fyzická osoba zapsaná v živnostenském rejstříku',
    form: {
      name: 'Jméno',
      email: 'E-mail',
      company: 'Firma (nepovinné)',
      message: 'S čím potřebujete pomoci',
      submit: 'Odeslat zprávu',
      note: 'Údaje použiji jen k odpovědi na vaši zprávu.',
      subject: 'Poptávka z webu',
      sent: 'Otevřel se váš e-mailový program s předvyplněnou zprávou. Stačí ji odeslat.',
    },
    faqTitle: 'Časté otázky',
    faq: [
      {
        q: 'Kolik to stojí?',
        a: 'Záleží na rozsahu. Po úvodním hovoru dostanete do dvou pracovních dnů nabídku s pevnou cenou za konkrétní výstup. U dlouhodobé spolupráce se domluvíme na denní sazbě.',
      },
      {
        q: 'Pracujete i pro velké firmy a státní instituce?',
        a: 'Ano, většinu kariéry jsem pracoval právě pro banky, pojišťovny a velké organizace. Znám jejich procesy, bezpečnostní požadavky i tempo.',
      },
      {
        q: 'Komu patří kód?',
        a: 'Vám – kód, dokumentace i přístupy, po zaplacení bez omezení.',
      },
      {
        q: 'Pracujete na místě, nebo na dálku?',
        a: 'Převážně na dálku, na důležité schůzky rád přijedu. Jsem z Prahy.',
      },
      {
        q: 'Co se děje s našimi daty, když používáte AI?',
        a: 'Jen firemní AI služby, které na datech netrénují, nebo nástroje ve vašem prostředí. Žádná produkční osobní data. Podrobně v článku o tom, co AI agent pokazil.',
      },
      {
        q: 'Co když výsledek nebude podle dohody?',
        a: 'Pak neplatíte. Před začátkem si písemně domluvíme, co přesně dodám a podle čeho poznáme, že je hotovo. Když to nesplním, případnou zálohu vracím – riziko nesu já.',
      },
      {
        q: 'Můžeme to udělat bez AI?',
        a: 'Můžeme, ale bude to pomalejší a dražší – a dlouhodobě je to cesta zpátky. Raději vám pomůžu AI zavést bezpečně: s ochranou dat a kontrolou výstupů.',
      },
      {
        q: 'Hledáte i stálé místo?',
        a: 'Pro správný tým a firmu ano. Jinak preferuji projekty a dlouhodobou spolupráci na IČO.',
      },
    ],
  },

  privacy: {
    title: 'Ochrana osobních údajů',
    blocks: [
      { kind: 'p', text: 'Správcem osobních údajů je Stanislav Matzke (kontaktní údaje níže).' },
      { kind: 'h2', text: 'Kontaktní formulář a e-mail' },
      {
        kind: 'p',
        text: 'Když mi napíšete, použiji vaše jméno, e-mail, případně firmu a obsah zprávy jen k odpovědi a k jednání o případné spolupráci (oprávněný zájem, resp. jednání o smlouvě). Zprávy uchovávám nejdéle 2 roky od posledního kontaktu, pokud z ní nevznikne smluvní vztah.',
      },
      { kind: 'h2', text: 'Návštěvnost' },
      {
        kind: 'p',
        text: 'Web nepoužívá reklamní ani sledovací cookies. Návštěvnost měřím anonymně bez cookies. Volbu světlého nebo tmavého režimu si pamatuje jen váš prohlížeč.',
      },
      { kind: 'h2', text: 'Vaše práva' },
      {
        kind: 'p',
        text: 'Máte právo na přístup k údajům, opravu, výmaz, omezení zpracování, vznesení námitky a podání stížnosti u Úřadu pro ochranu osobních údajů. Stačí mi napsat.',
      },
    ] as Block[],
  },

  footer: {
    tradeRegister: 'Fyzická osoba zapsaná v živnostenském rejstříku',
    privacy: 'Ochrana osobních údajů',
  },

  notFound: {
    title: 'Tahle stránka tu není.',
    text: 'Možná se změnila adresa. Zkuste to z úvodní stránky.',
    back: 'Na úvodní stránku',
  },
};

export type Content = typeof cs;
