import { Content } from './cs';
import { Block } from './types';

/** English – návrh překladu, doladit po schválení češtiny. */
export const en: Content = {
  nav: {
    services: 'Services',
    ai: 'Working with AI',
    showcase: 'Showcase',
    references: 'References',
    about: 'About',
    contact: 'Contact',
    cta: 'Free consultation',
    menu: 'Menu',
    close: 'Close menu',
    toDark: 'Switch to dark mode',
    toLight: 'Switch to light mode',
    otherLang: 'Čeština',
    otherLangShort: 'CZ',
    skip: 'Skip to content',
  },

  meta: {
    home: {
      title: 'Stanislav Matzke – a software architect who still writes code',
      description:
        'Design, development and modernisation of enterprise systems in .NET, Java, Oracle and Azure – with AI where it genuinely speeds things up. Prague / hybrid.',
    },
    services: {
      title: 'Services – Stanislav Matzke',
      description:
        'Architecture consulting and reviews, custom systems, modernisation of Delphi and Oracle PL/SQL, integrations, AI in your solutions and contract tech lead.',
    },
    ai: {
      title: 'How I work with AI – Stanislav Matzke',
      description:
        'AI makes development several times faster – if someone who knows what they are doing is in charge. Real mistakes an AI agent made while building Job Scout.',
    },
    jobScout: {
      title: 'Job Scout – case study – Stanislav Matzke',
      description:
        'An AI agent that reviews job offers every morning and prepares the groundwork. .NET 10, Angular, Claude API, Azure. Built in ~10 days with AI.',
    },
    references: {
      title: 'References – Stanislav Matzke',
      description:
        'Companies and projects I have worked on: VZP ČR, Raiffeisenbank, MONETA Money Bank, SAB Finance, ARBES, Vodafone and more.',
    },
    about: {
      title: 'About – Stanislav Matzke',
      description: '15 years of designing and building enterprise systems – from Delphi and Oracle to .NET, Azure and AI.',
    },
    contact: {
      title: 'Contact – Stanislav Matzke',
      description: 'Tell me what is holding you back. I will reply within one business day.',
    },
    privacy: {
      title: 'Privacy – Stanislav Matzke',
      description: 'How this website handles personal data.',
    },
    notFound: {
      title: 'Page not found – Stanislav Matzke',
      description: 'This page does not exist.',
    },
  },

  common: {
    availability: 'Available from November 2026',
    location: 'Prague / hybrid · projects, contracting or long-term',
    bookCall: 'Book a free call',
    writeMe: 'Get in touch',
    soon: 'in progress',
    live: 'live',
    openSource: 'open source',
    screenshot: 'Job Scout screenshot – coming soon',
    lesson: 'Lesson',
  },

  home: {
    kicker: 'A software architect who still writes code',
    title: 'Systems that last. And the old ones that still have to.',
    lead:
      'For fifteen years I have been designing and building enterprise systems in .NET, Java and Oracle on Azure – for banks, insurers and large companies. I build new solutions, modernise old ones sensibly and bring in AI where it genuinely speeds up the work.',
    ctaSecondary: 'See my work',
    tags: ['.NET', 'Java', 'Oracle PL/SQL', 'Azure', 'Angular', 'LLMs & AI agents'],
    logosLabel: 'I have worked for',
    logos: ['VZP ČR', 'Raiffeisenbank', 'MONETA Money Bank', 'SAB Finance', 'ARBES', 'Vodafone', 'IFS'],

    fit: {
      eyebrow: 'Is this you?',
      title: 'Typical situations companies come to me with',
      items: [
        'A key system works, but every change takes weeks and fewer and fewer people understand it.',
        'A vendor is proposing a big project and you need an independent view of the design and the price.',
        'An internal process runs on spreadsheets and e-mails and deserves a proper application.',
        'Your systems do not talk to each other and data is re-typed by hand.',
        'You want to use AI – sensibly, securely and with known costs.',
      ],
      ctaText: 'Sound familiar? Let’s talk it through in 30 minutes, free and with no obligation.',
      ctaLink: 'Book a call →',
    },

    services: {
      eyebrow: 'Services',
      title: 'How I can help',
      all: 'All services in detail →',
    },

    ai: {
      eyebrow: 'Working with AI',
      title: 'AI makes development several times faster. If someone who knows what they’re doing is in charge.',
      lead:
        'AI writes code faster than any of us. But it cannot decide what should be built, notice when it is confidently wrong, or take responsibility for the result. That difference is experience.',
      fastTitle: 'What AI speeds up',
      fast: [
        'finding your way around large, old codebases',
        'extracting business rules from code and databases',
        'tests, documentation and routine code',
        'prototypes that validate an idea quickly',
      ],
      humanTitle: 'Where a human decides',
      human: [
        'architecture and trade-offs that will last for years',
        'who may see what – permissions and personal data',
        'what happens when it is abused, and what it will cost',
        'reviewing the output – green tests are not enough',
      ],
      statLabel: 'On my own project',
      statValue: '~10 days',
      statText:
        'instead of an estimated 40–60 person-days without AI. Job Scout: backend, AI agent, sign-in, user management, 600+ tests, deployed on Azure.',
      data:
        'Your data: only business-grade AI services that do not train on it – or tools inside your own environment. Without AI is possible too, just slower and more expensive.',
      articleLink: 'Read: What the AI agent got wrong and how I found out →',
    },

    showcase: {
      eyebrow: 'Showcase',
      title: 'Don’t take my word for it – try it',
      jobScoutTitle: 'Job Scout',
      jobScoutText:
        'An AI agent that reviews job offers every morning, scores them against the user’s profile and prepares the groundwork. The agent prepares, a human decides.',
      jobScoutTags: ['.NET 10', 'Angular', 'Claude API', 'Azure Container Apps', 'PostgreSQL'],
      demo: 'Try the demo →',
      study: 'Case study →',
      github: 'GitHub →',
      delphiTitle: 'Delphi\u00a0→ .NET modernisation with AI',
      delphiText:
        'A sample migration of a receivables system: characterisation tests, step-by-step move of logic out of PL/SQL, an AI assistant over the data.',
      webTitle: 'This website',
      webText: 'Angular, light and dark mode, Czech and English. The code will be public.',
    },

    references: {
      eyebrow: 'References',
      title: 'Where I have worked',
      lead: 'A selection from the last 15 years – directly and through vendors. Banking, finance, healthcare, logistics.',
      all: 'All references →',
      rows: [
        { years: '2025–2026', name: '', text: 'Cloud platform for a network of smart parcel lockers · Azure, microservices' },
        { years: '2020–2025', name: 'VZP ČR', text: 'modernising internal applications, team lead' },
        { years: '2018–2020', name: 'Raiffeisenbank, SAB Finance', text: 'treasury and FX trading systems; records management' },
        { years: '2016–2018', name: 'Vodafone, IFS', text: 'BidSimplifier portal, ERP customisation' },
        { years: '2015–2016', name: 'MONETA Money Bank', text: 'rebranding, Delphi migration, receivables management' },
        { years: '2011–2015', name: 'ARBES, stem cell donor registry', text: 'asset management, healthcare' },
      ],
    },

    process: {
      eyebrow: 'How I work',
      title: 'A clear process, no surprises',
      steps: [
        { title: 'A free intro call.', text: '30 minutes: what the system does, what hurts, what the outcome should be.' },
        { title: 'Proposal and fixed price', text: 'within two business days – scope, deliverables, deadline.' },
        { title: 'Work with a checkpoint', text: 'halfway through, so you know where it is heading.' },
        { title: 'Handover', text: '– code, documentation, a presentation for management and IT. It all belongs to you.' },
        { title: 'Operations and further development,', text: 'if you want them.' },
      ],
    },

    forms: {
      eyebrow: 'Ways to work together',
      title: 'How we can work together',
      items: [
        { title: 'Project', text: 'a clear deliverable for a fixed price' },
        { title: 'Consulting', text: 'review, audit, second opinion' },
        { title: 'Long-term contract', text: 'architect or tech lead in your team' },
        { title: 'Employment', text: 'for the right team and company' },
      ],
      note: 'I price individually after the intro call – for the result, not for logged hours.',
    },

    contact: {
      title: 'Let’s talk it through.',
      lead: 'Describe in a few sentences what is holding you back. I will reply within one business day.',
    },
  },

  services: {
    eyebrow: 'Services',
    title: 'How I can help',
    lead:
      'I work as an architect who still writes code. I will help you decide, design the solution and build it myself – or strengthen your team. I price individually after the intro call, always for the result.',
    labels: {
      forWhom: 'Who it is for',
      outcome: 'What you get',
      experience: 'Experience',
      firstStep: 'Typical first step',
    },
    items: [
      {
        id: 'konzultace',
        title: 'Architecture consulting and reviews',
        short: 'A second opinion on a solution, a vendor’s design or technical debt – with recommendations you can act on.',
        forWhom: 'Companies facing an important technical decision or needing an independent view.',
        points: [
          'review of an architecture or a vendor’s proposal, including risks and a cost estimate',
          'audit of code, database and technical debt',
          'a second opinion: rewrite, modernise, or buy an off-the-shelf product?',
        ],
        outcome: 'A concise report with findings ranked by severity, concrete recommendations and a presentation for management and IT.',
        experience: '',
        firstStep: 'A review in 1–2 weeks.',
      },
      {
        id: 'na-miru',
        title: 'Custom systems',
        short: 'Internal information systems and web applications from analysis to operations – for smaller firms and large organisations.',
        forWhom: 'Companies for whom spreadsheets and boxed software are no longer enough – from smaller firms to in-house IT of large organisations.',
        points: [
          'internal information systems, records, workflows and approvals',
          'web applications with sign-in via company accounts (Microsoft, Google, SSO)',
          'deployment to the cloud (Azure) or on-premises, CI/CD, monitoring',
        ],
        outcome: 'Analysis → design → development in stages with a demo of each stage → handover and operations. The code and documentation belong to you.',
        experience: 'Four years of in-house development at VZP ČR (application modernisation, team lead), systems for banks and financial companies.',
        firstStep: 'An initial analysis and design of the first stage.',
      },
      {
        id: 'modernizace',
        title: 'Modernising legacy systems',
        short: 'Delphi, Oracle PL/SQL, old .NET or Java. A gradual move to a modern architecture with no downtime.',
        forWhom: 'Companies with a key system that is 10–25 years old – Delphi, Oracle PL/SQL, old .NET Framework or Java.',
        points: [
          'quick diagnosis: current state, risks, recommended strategy',
          'analysis and design: inventory, business rules extracted from code, target architecture, roadmap and estimate',
          'gradual migration with tests that check the new system calculates exactly like the old one',
        ],
        outcome: 'A clear plan for the system – what to keep, what to modernise, in which order and for how much.',
        experience: 'I spent years building systems in Delphi and PL/SQL (MONETA, Raiffeisenbank, ARBES); today I design solutions in .NET and Azure. I understand both worlds.',
        firstStep: 'A diagnosis in one week. If you then order the analysis, the diagnosis fee is deducted.',
      },
      {
        id: 'integrace',
        title: 'Integrations and APIs',
        short: 'Connecting partners, carriers, banks and other systems – reliably, securely and with monitoring.',
        forWhom: 'Companies where data is re-typed between systems or integrations keep failing.',
        points: [
          'integration with partners, carriers, banks, government and internal systems',
          'API design, message queues (Azure Service Bus), security and secrets management',
          'monitoring, so you learn about a failure before a customer reports it',
        ],
        outcome: 'A reliable connection with documentation and visibility into what is happening.',
        experience: 'Integrations with partners and carriers on a smart parcel locker platform (e.g. Rohlik.cz), internal system integration at VZP.',
        firstStep: 'An integration design and estimate.',
      },
      {
        id: 'ai',
        title: 'AI in your solutions',
        short: 'Assistants and agents over company data – secure, with measurable quality and costs known upfront.',
        forWhom: 'Companies that want to use AI sensibly – not because it is fashionable.',
        points: [
          'where AI makes sense in your system and where it does not',
          'assistants and agents over company data (LLMs via API, tool calling, document search)',
          'quality measurement, protection against prompt injection and abuse, cost control',
        ],
        outcome: 'Use cases, architecture, risks and an estimate of running costs – or a working solution straight away.',
        experience: 'Job Scout – an AI agent in production, with every call and its cost recorded and limits against abuse.',
        firstStep: 'An AI adoption proposal in 1–2 weeks.',
      },
      {
        id: 'tech-lead',
        title: 'Contract tech lead',
        short: 'I will strengthen your team as an architect who still writes code – code reviews, leading developers, clear communication with management.',
        forWhom: 'Teams lacking a senior person for architecture and technical decisions.',
        points: [
          'architecture and technical decisions recorded so you can come back to them (ADRs)',
          'code reviews, mentoring, CI/CD and quality setup',
          'communication with management and the business in plain language',
        ],
        outcome: 'Long-term on contract, part-time or full-time. For the right team, employment too.',
        experience: 'Leading a development team at VZP ČR, reporting directly to the IT director.',
        firstStep: 'An intro meeting with the team.',
      },
    ],
    ctaTitle: 'Not sure which of these you need?',
    ctaText: 'That’s fine – we will find out on the intro call.',
  },

  ai: {
    eyebrow: 'Working with AI',
    title: 'AI makes development several times faster. If someone who knows what they’re doing is in charge.',
    lead:
      'I built Job Scout in under two weeks. An AI agent wrote the code; I acted as the architect and reviewer – I specified, checked, tested and deployed. Here is what the agent did brilliantly, what it got wrong, and what that means for companies.',
    meta: 'October 2026 · 7 min read',
    blocks: [
      { kind: 'h2', text: 'The good news first: it (almost) no longer makes silly mistakes' },
      {
        kind: 'p',
        text: 'The usual “vibe coding” horrors – passwords and API keys in code, missing input validation, SQL injection, home-made authentication – never showed up in Job Scout. The agent kept secrets out of the repository on its own, validated input, wrote 600+ automated tests, added prompt-injection protection and tests that guard the application’s layers.',
      },
      {
        kind: 'p',
        text: 'The mistakes it did make were of a different kind: the code was correct, the tests were green – but the logic was not thought through. Exactly the kind no linter or security scanner will find.',
      },
      { kind: 'h2', text: 'Story 1: anyone with access could burn through the AI budget' },
      {
        kind: 'p',
        text: 'Job Scout’s morning run had hard limits from day one. Then we added “Score” and “Write a new cover letter” buttons – each one a paid AI call. The agent implemented them exactly as specified: they worked, were tested, and the costs were recorded.',
      },
      {
        kind: 'p',
        text: 'But nobody – the agent included – asked: “What if someone clicks a thousand times?” Changing a single letter in the notes re-ran the profile analysis. A letter could be rewritten endlessly. A human found it, not the AI – the day after launch, when I sent the app to the first users and clicked through it myself.',
      },
      {
        kind: 'p',
        text: 'The fix took one morning: per-click limits in a rolling 24-hour window, a daily “emergency brake” for the whole app that e-mails the admin, a lock against two quick clicks, and a monthly spending cap directly with the AI provider.',
      },
      {
        kind: 'lesson',
        text: 'In AI applications, a “denial of wallet” attack is as real a risk as a data leak (OWASP lists it for LLM apps as Unbounded Consumption). AI delivers what you specify – the question “how much could this cost us if it is abused” has to come from a human.',
      },
      { kind: 'h2', text: 'Story 2: a rejected user got into the app' },
      {
        kind: 'p',
        text: 'Access to Job Scout is approved by an admin. The agent implemented “Reject request” – using the existing “suspended account” state. Logical at first glance. But a suspended user is still a member and may view their own data. So a rejected applicant could sign in and get inside.',
      },
      {
        kind: 'p',
        text: 'The tests were green because they tested exactly what the agent wrote. Nobody tested that a rejected applicant must see nothing at all. I found it with a manual test in production: I rejected a test account and it signed in just fine.',
      },
      {
        kind: 'lesson',
        text: 'Authorisation is where “almost right” means “wrong”. No automation replaces a review of access rules and a manual “let me try to get in” test.',
      },
      { kind: 'h2', text: 'Bonus: two parts that never talked to each other' },
      {
        kind: 'p',
        text: 'The agent wrote a workflow that builds a Docker image after every commit – and sensibly skips commits that only touch documentation. On another day it wrote a deploy script that deploys the image for the latest commit. Each part correct on its own. Together: after a README change the script tried to deploy an image that was never built. Not a bug in the code, but in combining two decisions made on different days.',
      },
      { kind: 'h2', text: 'Checking against a list: where AI shines' },
      {
        kind: 'p',
        text: 'After launch we went through the app point by point against a security checklist for vibe coding – input validation, authorisation, sessions, rate limiting, secrets, dependencies, prompt injection, code analysis in CI, security headers. The agent did the review. Give it a clear list to check against and it is thorough – and it found another hole it had created itself: anyone could request access a hundred times and the admin would get a hundred e-mails.',
      },
      {
        kind: 'source',
        text: 'O2 CyberNews: Vibe coding – working code is not automatically secure (in Czech)',
        href: 'https://o2cybernews.cz/clanky/vibe-coding-funkcni-kod-neni-automaticky-bezpecny',
      },
      { kind: 'h2', text: 'What this means for companies' },
      {
        kind: 'ul',
        items: [
          'AI is improving fast – a good agent with clear rules no longer makes the classic security mistakes on its own. That does not mean the code is finished.',
          'What needs watching is logic, not syntax: who may see what, what happens when it is abused, what it costs, how the parts work together.',
          'Green tests are not enough – the agent tests what it wrote. Tests for “what must never happen” have to be invented by a human.',
          'Fast feedback from real use caught both main bugs within 24 hours. Releasing early to a small group and having limits and cost monitoring from day one paid off.',
        ],
      },
      { kind: 'h2', text: 'How I use AI on client work' },
      {
        kind: 'ul',
        items: [
          'I use AI to find my way around large codebases, extract business rules, and draft tests and documentation. Conclusions, architecture and recommendations are mine.',
          'Only business versions of AI services that contractually do not train on customer data. If you have your own approved tools (e.g. Azure OpenAI in your tenant), I use those.',
          'I work on a copy of the code with anonymised or test data, never with production personal data. When the engagement ends I delete everything and confirm it in writing.',
          'I never give AI keys or passwords. I review and approve every change the agent makes.',
          'If you do not allow AI, that works too – just slower and more expensive, roughly by a third to a half.',
        ],
      },
    ] as Block[],
    ctaTitle: 'Want to know where AI could help in your system?',
    ctaText: 'Let’s discuss it on a free call.',
  },

  jobScout: {
    eyebrow: 'Case study',
    title: 'Job Scout: an AI agent that prepares, but does not decide',
    lead:
      'Every morning it goes through job portals, finds ads matching the user’s CV, scores them and drafts a cover letter for the best ones. A human always does the replying.',
    facts: [
      { value: '~10 days', label: 'of development with an AI agent' },
      { value: '40–60 MD', label: 'estimate for the same work without AI' },
      { value: '600+', label: 'automated tests' },
      { value: '21', label: 'recorded architecture decisions' },
    ],
    blocks: [
      { kind: 'h2', text: 'Why it exists' },
      {
        kind: 'p',
        text: 'I wanted to learn hands-on how to build applications with AI on a real problem – my own job search. It became a tool I use every day and a demonstration of how to build such an application properly: with sign-in, multiple users, cost control and cloud deployment.',
      },
      { kind: 'h2', text: 'How it works' },
      {
        kind: 'ul',
        items: [
          'AI turns a CV and free-form notes (“fully remote, no Java”) into a structured profile.',
          'Every morning it fetches only ads published since the last run.',
          'A cheap model (Haiku) triages titles in batches and drops the clearly irrelevant ones.',
          'A stronger model (Sonnet) scores the full ad: 1–10, reasons, risks, questions for the employer.',
          'For a score of 7 or more it drafts a cover letter in the language of the ad.',
          'The user sees everything in the web app and gets a short morning e-mail. Nothing is ever sent automatically.',
        ],
      },
      { kind: 'h2', text: 'What makes it interesting' },
      {
        kind: 'ul',
        items: [
          'Two models chosen by cost and difficulty, tokens and price recorded for every call, limits against abuse.',
          'Structured output with validation – AI output is never trusted blindly. Prompt-injection protection.',
          'Sign-in via Microsoft and Google with no tokens in the browser (BFF), admin approval of access.',
          'A modular monolith with ports and adapters, architecture tests, 21 documented decisions (ADRs).',
          'Azure Container Apps, PostgreSQL, Key Vault, infrastructure as code (Bicep), CI in GitHub Actions with vulnerability scanning.',
          'Czech and English, a public demo account that resets every morning.',
        ],
      },
      { kind: 'h2', text: 'Technology' },
      {
        kind: 'p',
        text: '.NET 10 · ASP.NET Core · EF Core · Angular 21 · Claude API (official SDK) · Playwright · Azure Container Apps · PostgreSQL · Key Vault · Azure Communication Services · Bicep · GitHub Actions',
      },
    ] as Block[],
    aiLink: 'What the agent got wrong and how I found out →',
    demo: 'Try it without signing up',
    github: 'Source code on GitHub',
  },

  references: {
    eyebrow: 'References',
    title: 'Companies and projects I have worked on',
    lead:
      'Over 15 years I have worked in banks, financial companies, healthcare and logistics – as an employee and through vendors. Project details are confidential, so only briefly.',
    items: [
      {
        name: 'Smart parcel locker platform',
        years: '2025–2026',
        sector: 'Logistics',
        text: 'Architecture and development of a cloud platform for a network of hundreds of parcel lockers in more than 100 municipalities – microservices on Azure, integrations with carriers and partners.',
        tags: ['Architecture', 'Azure', 'Integrations'],
      },
      {
        name: 'VZP ČR (General Health Insurance Company)',
        years: '2020–2025',
        sector: 'Healthcare',
        text: 'Modernising internal applications into web applications on Azure and leading the development team. Key project: PZS Manager for managing healthcare providers.',
        tags: ['Modernisation', 'Team lead', 'Java, Angular'],
      },
      {
        name: 'Records management system',
        years: '2018–2020',
        sector: 'Public sector',
        text: 'Rewriting the backend from old Java to .NET Core while maintaining the original system during the migration.',
        tags: ['Migration', '.NET'],
      },
      {
        name: 'SAB Finance',
        years: '2018–2020',
        sector: 'Finance',
        text: 'Backend of an online FX trading platform.',
        tags: ['.NET', 'Oracle PL/SQL'],
      },
      {
        name: 'Raiffeisenbank',
        years: '2018–2020',
        sector: 'Banking',
        text: 'Internal system for the Treasury department.',
        tags: ['Delphi', '.NET', 'PL/SQL'],
      },
      {
        name: 'ARBES Technologies',
        years: '2013–2020',
        sector: 'Asset management',
        text: 'Systems for portfolio management, trading and unit-holder administration.',
        tags: ['Delphi', 'PL/SQL'],
      },
      {
        name: 'Vodafone',
        years: '2017–2018',
        sector: 'Telecommunications',
        text: 'Development and stabilisation of the BidSimplifier portal.',
        tags: ['.NET', 'MS SQL'],
      },
      {
        name: 'IFS',
        years: '2016–2017',
        sector: 'ERP',
        text: 'Customer customisations of an ERP system.',
        tags: ['.NET', 'PL/SQL'],
      },
      {
        name: 'MONETA Money Bank',
        years: '2015–2016',
        sector: 'Banking',
        text: 'Rebranding from GE Money Bank: migrating the internal frontend from Delphi 6 to XE5 and a receivables management system.',
        tags: ['Migration', 'Delphi', 'PL/SQL'],
      },
      {
        name: 'Stem cell donor registry',
        years: '2011–2013',
        sector: 'Healthcare',
        text: 'Development of the Prometheus system.',
        tags: ['Delphi'],
      },
    ],
    ctaTitle: 'Want to be the next reference?',
    ctaText: 'Let’s start with a free call.',
  },

  about: {
    eyebrow: 'About',
    title: 'An architect who still writes code',
    paragraphs: [
      'My name is Stanislav Matzke and I have been designing and building enterprise systems for 15 years. I started on Delphi and Oracle systems for banks and financial companies, moved through .NET and Java to cloud solutions on Azure and to leading a team in the in-house IT of VZP. Most recently I designed a microservice platform for a network of smart parcel lockers.',
      'That is why I understand both the old and the new world: I know why a system from 2005 is written the way it is, and I can move it safely to a modern architecture. Today I add AI to that – as a tool that speeds up my work and as part of the solutions I build.',
    ],
    howTitle: 'How I like to work',
    how: [
      'With a clear goal, trust and ownership of the result.',
      'Fewer meetings, more finished work.',
      'I write decisions down so we can come back to them.',
      'I hand over code that the next person can find their way around.',
    ],
    timelineTitle: 'Experience',
    timeline: [
      { years: '2025–2026', text: 'Software architect / senior developer (contractor) – cloud platform for a smart parcel locker network' },
      { years: '2020–2025', text: 'VZP ČR – team leader / full-stack developer' },
      { years: '2018–2020', text: 'Contractor in the financial sector and public administration (Mediaport / ISF Group, ARBES)' },
      { years: '2011–2018', text: 'Cleverlance, IFS, MONETA Money Bank, ARBES Technologies, Steiner' },
    ],
    techTitle: 'Technology',
    tech: [
      'C#/.NET', 'Java (Spring Boot)', 'Delphi', 'Oracle PL/SQL', 'MS SQL', 'PostgreSQL', 'MongoDB',
      'Azure', 'Docker', 'Azure DevOps', 'GitHub Actions', 'Angular', 'Claude API', 'AI agents',
    ],
    hobbiesTitle: 'Outside work',
    hobbies: 'Craft and manual work, homebrewing, travel, sport.',
    downloadsTitle: 'Downloads and links',
    cvCz: 'CV (Czech, PDF)',
    cvEn: 'CV (English, PDF)',
  },

  contact: {
    eyebrow: 'Contact',
    title: 'Let’s talk it through.',
    lead: 'Describe in a few sentences what is holding you back. I will reply within one business day.',
    direct: 'Direct contact',
    billing: 'Business details',
    tradeRegister: 'Sole trader registered in the Czech Trade Register',
    form: {
      name: 'Name',
      email: 'E-mail',
      company: 'Company (optional)',
      message: 'What do you need help with',
      submit: 'Send message',
      note: 'I will only use your details to reply to your message.',
      subject: 'Enquiry from the website',
      sent: 'Your e-mail program has opened with a pre-filled message. Just hit send.',
    },
    faqTitle: 'Frequently asked questions',
    faq: [
      {
        q: 'How much does it cost?',
        a: 'It depends on the scope. After the intro call you will get a fixed-price proposal for a concrete deliverable within two business days. For long-term work we agree on a day rate.',
      },
      {
        q: 'Do you work for large companies and public institutions?',
        a: 'Yes, I have spent most of my career working for banks, insurers and large organisations. I know their processes, security requirements and pace.',
      },
      {
        q: 'Who owns the code?',
        a: 'You do – code, documentation and access, without restriction once paid.',
      },
      {
        q: 'Do you work on-site or remotely?',
        a: 'Mostly remotely; I am happy to come in for important meetings. I am based in Prague.',
      },
      {
        q: 'What happens to our data when you use AI?',
        a: 'Only business AI services that do not train on your data, or tools inside your environment. No production personal data. More in the article on working with AI.',
      },
      {
        q: 'Are you also looking for a permanent position?',
        a: 'For the right team and company, yes. Otherwise I prefer projects and long-term contracting.',
      },
    ],
  },

  privacy: {
    title: 'Privacy',
    blocks: [
      { kind: 'p', text: 'The data controller is Stanislav Matzke (contact details below).' },
      { kind: 'h2', text: 'Contact form and e-mail' },
      {
        kind: 'p',
        text: 'When you write to me, I use your name, e-mail, company if given and the message only to reply and to discuss a possible engagement (legitimate interest or pre-contractual steps). I keep messages for at most 2 years from the last contact unless they lead to a contract.',
      },
      { kind: 'h2', text: 'Analytics' },
      {
        kind: 'p',
        text: 'This website uses no advertising or tracking cookies. Visits are measured anonymously without cookies. Your choice of light or dark mode is remembered only by your browser.',
      },
      { kind: 'h2', text: 'Your rights' },
      {
        kind: 'p',
        text: 'You have the right to access, rectification, erasure, restriction of processing, to object, and to lodge a complaint with the Czech Office for Personal Data Protection. Just write to me.',
      },
    ] as Block[],
  },

  footer: {
    tradeRegister: 'Sole trader registered in the Czech Trade Register',
    privacy: 'Privacy',
  },

  notFound: {
    title: 'This page isn’t here.',
    text: 'The address may have changed. Try starting from the home page.',
    back: 'Go to the home page',
  },
};
