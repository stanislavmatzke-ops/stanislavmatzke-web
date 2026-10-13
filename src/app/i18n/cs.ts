import { Block, Meta } from './types';

/**
 * Zdrojový slovník – čeština. Angličtina (en.ts) má typ `typeof cs`,
 * takže kompilátor odmítne chybějící překlad.
 */
export const cs = {
  nav: {
    services: 'Služby',
    ai: 'Práce s AI',
    showcase: 'Ukázky',
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
  },

  meta: {
    home: {
      title: 'Stanislav Matzke – softwarový architekt, který i programuje',
      description:
        'Návrh, vývoj a modernizace podnikových systémů v .NET, Javě, Oracle a Azure – s AI tam, kde práci opravdu zrychlí. Praha / hybrid.',
    },
    services: {
      title: 'Služby – Stanislav Matzke',
      description:
        'Konzultace a review architektury, systémy na míru, modernizace Delphi a Oracle PL/SQL, integrace, AI v řešeních a tech lead na kontrakt.',
    },
    ai: {
      title: 'Jak pracuji s AI – Stanislav Matzke',
      description:
        'AI zrychlí vývoj několikanásobně – pokud ji řídí někdo, kdo ví, co dělá. Skutečné chyby AI agenta z vývoje aplikace Job Scout a co z nich plyne.',
    },
    jobScout: {
      title: 'Job Scout – případová studie – Stanislav Matzke',
      description:
        'AI agent, který každé ráno projde nabídky práce a připraví podklady. .NET 10, Angular, Claude API, Azure. Postaveno za ~10 dní s AI.',
    },
    references: {
      title: 'Reference – Stanislav Matzke',
      description:
        'Firmy a projekty, na kterých jsem pracoval: VZP ČR, Raiffeisenbank, MONETA Money Bank, SAB Finance, ARBES, Vodafone a další.',
    },
    about: {
      title: 'O mně – Stanislav Matzke',
      description: '15 let návrhu a vývoje podnikových systémů – od Delphi a Oracle po .NET, Azure a AI.',
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
  },

  home: {
    kicker: 'Softwarový architekt, který i programuje',
    title: 'Systémy, které vydrží. A ty staré, které ještě musí.',
    lead:
      'Patnáct let navrhuji a programuji podnikové systémy v .NET, Javě a Oracle na Azure – pro banky, pojišťovny a velké firmy. Postavím nové řešení, rozumně zmodernizuji to staré a zapojím AI tam, kde práci opravdu zrychlí.',
    ctaSecondary: 'Ukázky práce',
    tags: ['.NET', 'Java', 'Oracle PL/SQL', 'Azure', 'Angular', 'LLM a AI agenti'],
    logosLabel: 'Pracoval jsem pro',
    logos: ['VZP ČR', 'Raiffeisenbank', 'MONETA Money Bank', 'SAB Finance', 'ARBES', 'Vodafone', 'IFS'],

    fit: {
      eyebrow: 'Je to pro vás?',
      title: 'Typické situace, se kterými za mnou firmy přicházejí',
      items: [
        'Klíčový systém funguje, ale každá změna trvá týdny a lidí, kteří mu rozumí, ubývá.',
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

    ai: {
      eyebrow: 'Práce s AI',
      title: 'AI zrychlí vývoj několikanásobně. Pokud ji řídí někdo, kdo ví, co dělá.',
      lead:
        'AI napíše kód rychleji než kdokoli z nás. Neumí ale rozhodnout, co se má postavit, poznat, kdy se sebejistě mýlí, ani nést odpovědnost za výsledek. Ten rozdíl dělá zkušenost.',
      fastTitle: 'Co AI zrychlí',
      fast: [
        'orientaci ve velkém a starém kódu',
        'vytěžení byznys pravidel z kódu a databáze',
        'testy, dokumentaci a rutinní kód',
        'prototypy, na kterých se rychle ověří nápad',
      ],
      humanTitle: 'Kde rozhoduje člověk',
      human: [
        'architektura a kompromisy, které vydrží roky',
        'kdo smí co vidět – oprávnění a osobní data',
        'co se stane při zneužití a kolik to bude stát',
        'kontrola výstupů – zelené testy nestačí',
      ],
      statLabel: 'Na vlastním projektu',
      statValue: '~10 dní',
      statText:
        'místo odhadovaných 40–60 člověkodní bez AI. Job Scout: backend, AI agent, přihlášení, správa uživatelů, přes 600 testů, nasazení v Azure.',
      data:
        'Vaše data: jen firemní AI služby, které na nich netrénují – nebo nástroje ve vašem vlastním prostředí. Bez AI to jde taky, jen pomaleji a dráž.',
      articleLink: 'Přečíst článek: Co AI agent pokazil a jak jsem na to přišel →',
    },

    showcase: {
      eyebrow: 'Ukázky',
      title: 'Nemusíte mi věřit na slovo – vyzkoušejte si to',
      jobScoutTitle: 'Job Scout',
      jobScoutText:
        'AI agent, který každé ráno projde nabídky práce, ohodnotí je podle profilu uživatele a připraví podklady. Agent připravuje, člověk rozhoduje.',
      jobScoutTags: ['.NET 10', 'Angular', 'Claude API', 'Azure Container Apps', 'PostgreSQL'],
      demo: 'Vyzkoušet demo →',
      study: 'Případová studie →',
      github: 'GitHub →',
      delphiTitle: 'Modernizace Delphi\u00a0→ .NET s AI',
      delphiText:
        'Ukázková migrace systému správy pohledávek: charakterizační testy, postupný převod logiky z PL/SQL, AI asistent nad daty.',
      webTitle: 'Tento web',
      webText: 'Angular, světlý i tmavý režim, čeština a angličtina. Kód bude veřejný.',
    },

    references: {
      eyebrow: 'Reference',
      title: 'Kde jsem pracoval',
      lead: 'Výběr z posledních 15 let – přímo i přes dodavatele. Bankovnictví, finance, zdravotnictví, logistika.',
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
      'Pracuji jako architekt, který i programuje. Pomůžu s rozhodnutím, navrhnu řešení a sám ho postavím – nebo posílím váš tým. Cenu stanovuji individuálně po úvodním hovoru, vždy za výsledek.',
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
        short: 'Interní informační systémy a webové aplikace od analýzy po provoz – pro menší firmy i velké organizace.',
        forWhom: 'Firmy, kterým nestačí excel a krabicový software – od menších firem po interní IT velkých organizací.',
        points: [
          'interní informační systémy, evidence, workflow a schvalování',
          'webové aplikace s přihlášením přes firemní účty (Microsoft, Google, SSO)',
          'nasazení v cloudu (Azure) nebo u vás, CI/CD, monitoring',
        ],
        outcome: 'Analýza → návrh → vývoj po etapách s ukázkou každé etapy → předání a provoz. Kód a dokumentace patří vám.',
        experience: 'Čtyři roky interního vývoje ve VZP ČR (modernizace aplikací, vedení týmu), systémy pro banky a finanční firmy.',
        firstStep: 'Úvodní analýza a návrh první etapy.',
      },
      {
        id: 'modernizace',
        title: 'Modernizace starších systémů',
        short: 'Delphi, Oracle PL/SQL, starý .NET nebo Java. Postupný převod do moderní architektury bez výpadku provozu.',
        forWhom: 'Firmy s klíčovým systémem starým 10–25 let – Delphi, Oracle PL/SQL, starý .NET Framework nebo Java.',
        points: [
          'rychlá diagnóza: stav, rizika, doporučená strategie',
          'analýza a návrh: inventura, byznys pravidla vytěžená z kódu, cílová architektura, roadmapa a odhad',
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
        forWhom: 'Firmy, které chtějí AI využít smysluplně – ne kvůli módě.',
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
        short: 'Posílím váš tým jako architekt, který i programuje – code review, vedení vývojářů, srozumitelná komunikace s vedením.',
        forWhom: 'Týmy, kterým chybí seniorní člověk na architekturu a technická rozhodnutí.',
        points: [
          'architektura a technická rozhodnutí zapsaná tak, aby se k nim dalo vrátit (ADR)',
          'code review, mentoring, nastavení CI/CD a kvality',
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

  ai: {
    eyebrow: 'Práce s AI',
    title: 'AI zrychlí vývoj několikanásobně. Pokud ji řídí někdo, kdo ví, co dělá.',
    lead:
      'Aplikaci Job Scout jsem postavil za necelé dva týdny. Kód psal AI agent, já jsem byl v roli architekta a reviewera – zadával jsem, kontroloval, testoval a nasazoval. Tady je, co agent zvládl skvěle, co pokazil a co z toho plyne pro firmy.',
    meta: 'Říjen 2026 · 7 minut čtení',
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
          'AI nikdy nedávám klíče a hesla. Každou změnu, kterou agent udělá, projdu a schválím sám.',
          'Když AI nepovolíte, jde to taky – jen pomaleji a dráž, zhruba o třetinu až polovinu.',
        ],
      },
    ] as Block[],
    ctaTitle: 'Chcete vědět, kde by AI pomohla ve vašem systému?',
    ctaText: 'Probereme to na nezávazném hovoru.',
  },

  jobScout: {
    eyebrow: 'Případová studie',
    title: 'Job Scout: AI agent, který připraví, ale nerozhoduje',
    lead:
      'Každé ráno projde pracovní portály, najde inzeráty odpovídající CV uživatele, ohodnotí je a k nejlepším napíše návrh průvodního dopisu. Na inzeráty vždy odpovídá člověk.',
    facts: [
      { value: '~10 dní', label: 'vývoje s AI agentem' },
      { value: '40–60 MD', label: 'odhad stejné práce bez AI' },
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
      'Za 15 let jsem pracoval v bankách, finančních firmách, zdravotnictví i logistice – jako zaměstnanec i přes dodavatele. Detaily projektů jsou důvěrné, proto jen stručně.',
    items: [
      {
        name: 'Platforma chytrých doručovacích boxů',
        years: '2025–2026',
        sector: 'Logistika',
        text: 'Architektura a vývoj cloudové platformy pro síť stovek doručovacích boxů ve více než 100 obcích – mikroslužby v Azure, integrace s dopravci a partnery.',
        tags: ['Architektura', 'Azure', 'Integrace'],
      },
      {
        name: 'VZP ČR',
        years: '2020–2025',
        sector: 'Zdravotnictví',
        text: 'Modernizace interních aplikací na webové aplikace v Azure a vedení vývojového týmu. Klíčový projekt PZS Manager pro správu poskytovatelů zdravotních služeb.',
        tags: ['Modernizace', 'Vedení týmu', 'Java, Angular'],
      },
      {
        name: 'Spisová služba',
        years: '2018–2020',
        sector: 'Státní správa',
        text: 'Přepis backendu ze staré Javy do .NET Core včetně údržby původního systému během migrace.',
        tags: ['Migrace', '.NET'],
      },
      {
        name: 'SAB Finance',
        years: '2018–2020',
        sector: 'Finance',
        text: 'Backend online platformy pro devizové obchody.',
        tags: ['.NET', 'Oracle PL/SQL'],
      },
      {
        name: 'Raiffeisenbank',
        years: '2018–2020',
        sector: 'Bankovnictví',
        text: 'Interní systém oddělení Treasury.',
        tags: ['Delphi', '.NET', 'PL/SQL'],
      },
      {
        name: 'ARBES Technologies',
        years: '2013–2020',
        sector: 'Asset management',
        text: 'Systémy pro správu portfolií, obchodování a správu podílových listů.',
        tags: ['Delphi', 'PL/SQL'],
      },
      {
        name: 'Vodafone',
        years: '2017–2018',
        sector: 'Telekomunikace',
        text: 'Rozvoj a stabilizace portálu BidSimplifier.',
        tags: ['.NET', 'MS SQL'],
      },
      {
        name: 'IFS',
        years: '2016–2017',
        sector: 'ERP',
        text: 'Zákaznické úpravy ERP systému.',
        tags: ['.NET', 'PL/SQL'],
      },
      {
        name: 'MONETA Money Bank',
        years: '2015–2016',
        sector: 'Bankovnictví',
        text: 'Rebranding z GE Money Bank: migrace interního frontendu z Delphi 6 na XE5 a systém pro správu pohledávek.',
        tags: ['Migrace', 'Delphi', 'PL/SQL'],
      },
      {
        name: 'Registr dárců krvetvorných buněk',
        years: '2011–2013',
        sector: 'Zdravotnictví',
        text: 'Vývoj systému Prometheus.',
        tags: ['Delphi'],
      },
    ],
    ctaTitle: 'Chcete být další referencí?',
    ctaText: 'Začněme nezávazným hovorem.',
  },

  about: {
    eyebrow: 'O mně',
    title: 'Architekt, který i programuje',
    paragraphs: [
      'Jmenuji se Stanislav Matzke a 15 let navrhuji a vyvíjím podnikové systémy. Začínal jsem na systémech v Delphi a Oracle pro banky a finanční firmy, přes .NET a Javu jsem se dostal k cloudovým řešením v Azure a k vedení týmu v interním IT VZP. Naposledy jsem navrhoval mikroservisní platformu pro síť chytrých doručovacích boxů.',
      'Díky tomu rozumím starému i novému světu: vím, proč je systém z roku 2005 napsaný tak, jak je, a umím ho bezpečně převést do moderní architektury. Dnes k tomu přidávám AI – jako nástroj, který mi zrychluje práci, i jako součást řešení, která stavím.',
    ],
    howTitle: 'Jak rád pracuji',
    how: [
      'S jasným cílem, důvěrou a odpovědností za výsledek.',
      'Méně porad, víc hotové práce.',
      'Rozhodnutí zapisuji, aby se k nim dalo vrátit.',
      'Kód předávám tak, aby se v něm vyznal i ten, kdo přijde po mně.',
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
        a: 'Jen firemní AI služby, které na datech netrénují, nebo nástroje ve vašem prostředí. Žádná produkční osobní data. Podrobně v článku o práci s AI.',
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
