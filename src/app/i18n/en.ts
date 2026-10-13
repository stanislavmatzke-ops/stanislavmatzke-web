import { Content } from './cs';
import { Article, Block, Reference } from './types';

/** English – návrh překladu, doladit po schválení češtiny. */
export const en: Content = {
  nav: {
    services: 'Services',
    showcase: 'Projects',
    articles: 'Articles',
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
    home: 'Stanislav Matzke – home page',
  },

  meta: {
    home: {
      title: 'Stanislav Matzke – building and modernising enterprise systems with AI',
      description:
        'Fifteen years of enterprise development and the speed AI brings. Design, development, deployment and operations in .NET, Java, Oracle and Azure. Prague / hybrid.',
    },
    services: {
      title: 'Services – Stanislav Matzke',
      description:
        'Architecture consulting and reviews, custom systems, modernisation of Delphi and Oracle PL/SQL, integrations, AI in your solutions and contract tech lead.',
    },
    articles: {
      title: 'Articles – Stanislav Matzke',
      description: 'Lessons from practice: how AI is changing software development, legacy modernisation and what to watch out for.',
    },
    article: {
      title: 'Article – Stanislav Matzke',
      description: '',
    },
    projects: {
      title: 'Projects – Stanislav Matzke',
      description: 'Showcases of what one experienced person can deliver with AI today: Job Scout, a Delphi → .NET transformation and this website.',
    },
    jobScout: {
      title: 'Job Scout – case study – Stanislav Matzke',
      description:
        'A smart assistant for your job search: offers scored against your CV, cover letter drafts, a morning e-mail. .NET 10, Angular, Claude API, Azure. One person with AI in ~3 days.',
    },
    references: {
      title: 'References – Stanislav Matzke',
      description:
        'Companies and projects I have worked on: VZP ČR, Raiffeisenbank, MONETA Money Bank, SAB Finance, ARBES, Vodafone and more.',
    },
    about: {
      title: 'About – Stanislav Matzke',
      description: '15 years of designing and building enterprise systems – from Delphi and Oracle to .NET, Azure and AI agents.',
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
    readArticle: 'Read the article →',
    via: 'via',
  },

  home: {
    kicker: 'Architecture · development · deployment · operations',
    titleStart: 'Years of building applications.',
    titleHighlight: 'Next-generation speed.',
    lead:
      'I combine know-how from building enterprise systems from the ground up with what AI can do today. I design the solution, build it, deploy it and keep it running – fast, securely and owning the result. The proof is in projects you can try yourself.',
    ctaSecondary: 'See the projects',
    tags: ['.NET', 'Java', 'Oracle PL/SQL', 'Azure', 'Angular', 'AI agents & LLMs'],
    logosLabel: 'I have worked for',
    logos: ['VZP ČR', 'Raiffeisenbank', 'MONETA Money Bank', 'SAB Finance', 'ARBES', 'Vodafone', 'IFS'],

    fit: {
      eyebrow: 'Is this you?',
      title: 'Typical situations companies come to me with',
      items: [
        {
          title: 'An old system is holding you back',
          text: 'Whether it still works or fails more and more often – every change takes weeks and you keep postponing modernisation because it looks expensive and risky.',
        },
        {
          title: 'The vendor’s quote looks expensive',
          text: 'Months of work for a whole team? With modern AI-assisted development it often takes a fraction of the time and cost. I will independently assess the design and the budget.',
        },
        {
          title: 'You have an idea for an app',
          text: 'An internal process living in spreadsheets and e-mails, or your own idea you want to bring to life. The road from idea to working application is shorter than ever.',
        },
        {
          title: 'Your systems don’t talk to each other',
          text: 'Data is re-typed by hand or through spreadsheets and connecting to the old system seems impossible. I am happy to show you it can be done.',
        },
        {
          title: 'You want to use AI',
          text: 'Whether in development or directly in your processes and products – sensibly, securely and with known costs.',
        },
      ],
      ctaText: 'Sound familiar? Let’s talk it through in 30 minutes, free and with no obligation.',
      ctaLink: 'Book a call →',
    },

    services: {
      eyebrow: 'Services',
      title: 'How I can help',
      all: 'All services in detail →',
    },

    built: {
      eyebrow: 'Built with AI',
      title: 'What used to take a team months, one experienced person now delivers in days.',
      lead:
        'Showcase projects I built with AI agents – from design through code and tests to deployment on Azure. Not “slide-deck” prototypes, but applications that run and that you can try.',
      statValue: '~3 days',
      statLabel: 'Job Scout',
      statText: 'of intensive work by one person with an AI agent. Without AI, an estimated 2–3 months for a team of three.',
      jobScoutTitle: 'Job Scout',
      jobScoutText:
        'A smart assistant for your job search: every morning it reviews new offers, scores them against your CV, drafts cover letters and sends a summary by e-mail. AI pre-selects, a human decides.',
      jobScoutTags: ['.NET 10', 'Angular', 'Claude API', 'Azure', 'PostgreSQL', '600+ tests'],
      demo: 'Try the demo →',
      study: 'Case study →',
      github: 'GitHub →',
      delphiTitle: 'Delphi → .NET modernisation with AI',
      delphiText:
        'A sample migration of a receivables system: characterisation tests, step-by-step move of logic out of PL/SQL, an AI assistant over the data.',
      webTitle: 'This website',
      webText: 'Angular, light and dark mode, Czech and English, deployed on Azure. The code is public on GitHub.',
      data:
        'Security first: only business-grade AI services that do not train on your data, or tools inside your own environment. I review every change and stand behind it.',
      articleLink: 'What the AI agent got wrong and how I found out →',
    },

    articles: {
      eyebrow: 'Articles',
      title: 'Lessons from practice',
      all: 'All articles →',
    },

    references: {
      eyebrow: 'References',
      title: 'Where I have worked',
      lead: 'A selection from the last 15 years – directly and through vendors. Banking, finance, healthcare, logistics, public sector.',
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
      'I cover the whole workflow – from design and analysis through development to deployment and operations. Faster and cheaper than before thanks to AI, with a focus on security and quality. I price individually after the intro call, always for the result.',
    guarantee: {
      title: 'You pay for results, not effort',
      text: 'Before we start, we agree on exactly what I will deliver, by when and for how much. Then it is up to me to deliver it. If I do not deliver the agreed result, you pay nothing – and I refund any deposit. The risk is mine, not yours.',
    },
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
        firstStep: 'Send me the materials (design, vendor proposal, code access) – you usually get the assessment within 1–2 weeks, depending on scope.',
      },
      {
        id: 'na-miru',
        title: 'Custom systems',
        short: 'Internal information systems and web applications from design to operations – for smaller firms and large organisations.',
        forWhom: 'Companies for whom spreadsheets and boxed software are no longer enough – from smaller firms to in-house IT of large organisations.',
        points: [
          'internal information systems, records, workflows and approvals',
          'web applications with sign-in via company accounts (Microsoft, Google, SSO)',
          'deployment to the cloud (Azure) or on-premises, CI/CD, monitoring and operations',
        ],
        outcome: 'Analysis → design → development in stages with a demo of each stage → deployment and operations. The code and documentation belong to you.',
        experience: 'Four years of in-house development at VZP ČR (application modernisation, team lead), systems for banks and financial companies, Job Scout and other custom applications – see Projects.',
        firstStep: 'An initial analysis and design of the first stage.',
      },
      {
        id: 'modernizace',
        title: 'Modernising legacy systems',
        short: 'Delphi, Oracle PL/SQL, old .NET or Java. Faster and cheaper than ever thanks to AI – and with no downtime.',
        forWhom: 'Companies with a key system that is 10–25 years old whose modernisation they kept postponing because it looked expensive and risky.',
        points: [
          'quick diagnosis: current state, risks, recommended strategy',
          'analysis and design: inventory, business rules extracted from code with the help of AI, target architecture, roadmap and estimate',
          'gradual migration with tests that check the new system behaves exactly like the old one',
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
        experience: 'Integrations with carriers (PPL, DPD, Czech Post) and partners on a smart parcel locker platform, internal system integration at VZP.',
        firstStep: 'An integration design and estimate.',
      },
      {
        id: 'ai',
        title: 'AI in your solutions',
        short: 'Assistants and agents over company data – secure, with measurable quality and costs known upfront.',
        forWhom: 'Companies that want to use AI fully and securely – neither avoiding it nor deploying it blindly.',
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
        id: 'posila-tymu',
        title: 'Architect and team reinforcement',
        short: 'I will strengthen your team in a role with real responsibility – architect, tech lead or senior developer. Architecture, code reviews, leadership and bringing AI into the team’s work.',
        forWhom: 'Teams lacking an experienced person for architecture, technical decisions or the move to AI-assisted development.',
        points: [
          'architecture and technical decisions recorded so you can come back to them (ADRs)',
          'code reviews, mentoring, CI/CD and rules for working safely with AI agents',
          'communication with management and the business in plain language',
        ],
        outcome: 'Long-term on contract, part-time or full-time. For the right team, employment too.',
        experience: 'Leading a development team at VZP ČR reporting directly to the IT director, architecture of a smart parcel locker microservice platform.',
        firstStep: 'An intro meeting with the team.',
      },
    ],
    ctaTitle: 'Not sure which of these you need?',
    ctaText: 'That’s fine – we will find out on the intro call.',
  },

  articles: {
    eyebrow: 'Articles',
    title: 'Lessons from practice',
    lead: 'How AI is changing software development and legacy modernisation – from my own experience, without the marketing.',
    back: '← All articles',
    ctaTitle: 'Want to know what AI could do with your system?',
    ctaText: 'Let’s discuss it on a free call.',
    items: [
      {
        slug: 'rychlost-vyvoje',
        title: 'Development speed: what changed in just a few years',
        perex:
          'For fifteen years software development got faster slowly. Then AI arrived and within a few years – and even more so in recent months – what one experienced person can deliver changed. What it means for new projects and for modernising old systems.',
        date: 'October 2026',
        readTime: '6 min read',
        blocks: [
          {
            kind: 'p',
            text: 'I have been building enterprise systems since 2011. Plenty of tools and trends came and went, but the real leap in what one person can deliver came only with AI. Step by step:',
          },
          {
            kind: 'stages',
            entries: [
              { label: '2011–2022', title: 'Line by line', text: 'Better IDEs, frameworks, cloud and CI/CD. But speed-ups were measured in percent – a human still wrote the code.' },
              { label: 'First assistants', title: 'Autocomplete and chat', text: 'AI completed lines and answered questions. Useful mostly for routine work, often with confident nonsense.' },
              { label: 'Whole project', title: 'AI understands the repo', text: 'Refactoring across dozens of files, tests, explaining unfamiliar code. A new technology in days, not months.' },
              { label: 'Today', title: 'Agents finish the job', text: 'They plan, edit files, run the build and tests, fix errors. Improving month by month, not year by year.' },
            ],
          },
          { kind: 'h2', text: 'What it means in practice' },
          {
            kind: 'p',
            text: 'A concrete example: I built Job Scout – a .NET 10 backend, job-ad scraping, an AI pipeline, sign-in via Microsoft and Google, user management, Angular, 600+ tests, CI, 21 recorded architecture decisions and deployment on Azure – in about three days of intensive work.',
          },
          {
            kind: 'compare',
            entries: [
              { label: '2–3 months', title: 'a team of three without AI (estimate)' },
              { label: '~3 days', title: 'one experienced person with an AI agent' },
            ],
            text: 'Same scope, same quality bar: tests, security, documentation, deployment.',
          },
          {
            kind: 'p',
            text: 'I had experienced it before: when I moved to .NET after years of Java, AI made me fully productive within days. Today it is no longer just about writing code faster – one person can cover the whole workflow, from design to operations.',
          },
          { kind: 'h2', text: 'What it means for modernising old systems' },
          {
            kind: 'cards',
            entries: [
              { label: '01', title: 'Understanding the code', text: 'Days instead of weeks – AI goes through forms, stored procedures and triggers.' },
              { label: '02', title: 'Business rules', text: 'Rules hidden in code can be extracted and written down; a human verifies them with users.' },
              { label: '03', title: 'Tests as a safety net', text: 'Characterisation tests that check the new system behaves exactly like the old one.' },
              { label: '04', title: 'Module by module', text: 'Much cheaper than before – systems nobody touched for years are worth recalculating.' },
            ],
          },
          {
            kind: 'lesson',
            text: 'A project you shelved two years ago as too expensive is worth recalculating. The price has changed more since then than in the previous ten years.',
          },
          { kind: 'h2', text: 'Where the bottleneck is now' },
          {
            kind: 'p',
            text: 'Writing code is no longer the slowest part. The bottleneck is decisions: what to build, how to design it, who may see what, what it will cost to run and what happens when something fails. AI speeds up those who know what they are doing. Without experience you quickly get a lot of code nobody understands.',
          },
          { kind: 'link', text: 'What I ran into in practice when building with an AI agent →', article: 'co-ai-agent-pokazil' },
        ] as Block[],
      },
      {
        slug: 'co-ai-agent-pokazil',
        title: 'What the AI agent got wrong – and why it matters',
        perex:
          'An AI agent wrote Job Scout; I was the architect and reviewer – I specified, checked, tested and deployed. The agent did not make the classic security mistakes. The ones it did make were trickier: correct code, green tests, logic not thought through.',
        date: 'October 2026',
        readTime: '7 min read',
        blocks: [
          {
            kind: 'project',
            caption: 'Which project this is about',
            src: 'img/job-scout-cover.webp',
            alt: 'Job Scout – application preview',
            text: 'Job Scout is a web application that reviews new job offers every morning, scores them against your CV and drafts cover letters for the best ones. It runs in production on Azure and anyone can try it.',
            items: [
              '~3 days of intensive work by one person with an AI agent',
              'Microsoft / Google sign-in, multiple users, access approval',
              '.NET 10, Angular, Claude API, Azure, 600+ tests',
            ],
            href: 'Job Scout case study →',
          },
          { kind: 'h2', text: 'The good news first: it (almost) no longer makes silly mistakes' },
          {
            kind: 'p',
            text: 'The usual “vibe coding” horrors never showed up in Job Scout. On its own, the agent:',
          },
          {
            kind: 'ul',
            items: [
              'kept passwords and API keys out of the repository,',
              'validated input and never hand-assembled SQL,',
              'wrote 600+ automated tests and tests that guard the application’s layers,',
              'added prompt-injection protection.',
            ],
          },
          {
            kind: 'p',
            text: 'The mistakes it did make were of a different kind: the code was correct, the tests were green – but the logic was not thought through. Exactly the kind no linter or security scanner will find.',
          },
          { kind: 'h2', text: 'Story 1: anyone with access could burn through the AI budget' },
          {
            kind: 'p',
            text: 'The morning run had hard limits from day one. Then we added “Score” and “Write a new cover letter” buttons – each one a paid AI call. The agent implemented them exactly as specified.',
          },
          {
            kind: 'facts',
            entries: [
              { title: 'The bug', text: 'Nobody asked “what if someone clicks a thousand times?”. Changing one letter in the notes re-ran the profile analysis; a letter could be rewritten endlessly.' },
              { title: 'How I found it', text: 'The day after launch, when I sent the app to the first users and clicked through it myself. A human found it, not the AI.' },
              { title: 'The fix (one morning)', text: 'Per-click limits in a rolling 24-hour window, a daily “emergency brake” that e-mails the admin, a double-click lock and a monthly cap with the AI provider.' },
            ],
          },
          {
            kind: 'lesson',
            text: 'In AI applications, a “denial of wallet” attack is as real a risk as a data leak (OWASP lists it for LLM apps as Unbounded Consumption). AI delivers what you specify – the question “how much could this cost us if it is abused” has to come from a human.',
          },
          { kind: 'h2', text: 'Story 2: a rejected user got into the app' },
          {
            kind: 'p',
            text: 'Access to Job Scout is approved by an admin. The agent implemented “Reject request” – using the existing “suspended account” state. Logical at first glance.',
          },
          {
            kind: 'facts',
            entries: [
              { title: 'The bug', text: 'A suspended user is still a member and may view their own data. So a rejected applicant could sign in and get inside.' },
              { title: 'Why tests missed it', text: 'They tested exactly what the agent wrote. Nobody tested that a rejected applicant must see nothing at all.' },
              { title: 'How I found it', text: 'A manual test in production: I rejected a test account and it signed in just fine. Rejection is now a separate action.' },
            ],
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
            text: 'After launch we went through the app point by point against a security checklist for vibe coding. The agent did the review – and given a clear list, it is thorough. It found another hole it had created itself: anyone could request access a hundred times and the admin would get a hundred e-mails.',
          },
          {
            kind: 'cards',
            entries: [
              { title: 'Input and injection', text: 'parameterised queries, output escaping, size limits' },
              { title: 'Authorisation', text: 'every query scoped to the data owner, permissions from the database' },
              { title: 'Abuse', text: 'rate limiting, AI limits, capped e-mails' },
              { title: 'CI and dependencies', text: 'CodeQL, Dependabot, vulnerable package checks' },
            ],
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
              'I never give AI keys or passwords. I review, approve and stand behind every change the agent makes.',
            ],
          },
          { kind: 'h2', text: 'And what if you don’t want AI?' },
          {
            kind: 'p',
            text: 'It can be done without it. But honestly: it is a step backwards. Whoever develops slower and more expensively than the competition will lose – companies in their markets and people in the job market. I had to adapt myself, and I know it can be done.',
          },
          {
            kind: 'p',
            text: 'The answer is not to avoid AI but to use it deliberately: with a focus on security, data protection and reviewing the output. I will gladly help you make that transition – just as I made it myself.',
          },
        ] as Block[],
      },
    ] as Article[],
  },

  projects: {
    eyebrow: 'Projects',
    title: 'Built with AI',
    lead: 'Showcases of what one experienced person can deliver with AI today – from design through code and tests to deployment and operations. Not “slide-deck” prototypes, but things that run.',
    status: { live: 'live', soon: 'in progress', done: 'done' },
    items: [
      {
        id: 'job-scout',
        status: 'live',
        title: 'Job Scout',
        subtitle: 'A smart assistant for your job search',
        text: 'A complete web application: every morning it reviews new job offers, scores them against your CV, drafts cover letters for the best ones and sends a summary by e-mail. Microsoft and Google sign-in, multiple users, AI cost control, running on Azure.',
        facts: ['~3 days of intensive work', '600+ tests', '21 ADRs', 'CZ / EN'],
        tags: ['.NET 10', 'Angular', 'Claude API', 'Azure', 'PostgreSQL'],
        image: 'img/job-scout-cover.webp',
      },
      {
        id: 'delphi',
        status: 'soon',
        title: 'Delphi → .NET transformation with AI',
        subtitle: 'Modernising a typical enterprise system',
        text: 'A sample modernisation of a receivables system from Delphi and Oracle PL/SQL to .NET and Azure – step by step, no “big bang”. Characterisation tests as a safety net, gradual move of logic out of the database, an AI agent as a helper and an AI assistant in the new application. I will publish the result as a case study and open source.',
        facts: ['Delphi + Oracle PL/SQL', '→ .NET 10 + Azure', 'Strangler Fig', 'AI assistant over the data'],
        tags: ['Delphi', 'Oracle', '.NET', 'Azure', 'AI'],
        image: '',
      },
      {
        id: 'web',
        status: 'done',
        title: 'This website',
        subtitle: 'From brief to production in one day',
        text: 'A personal website with everything around it: design, Angular, Czech and English, light and dark mode, Azure hosting with a custom domain and certificate, automatic deployment from GitHub and e-mail on the own domain with SPF, DKIM and DMARC. All in one day with AI.',
        facts: ['1 day', 'Azure Static Web Apps', 'own domain and e-mail', 'CZ / EN, light / dark'],
        tags: ['Angular', 'Azure', 'GitHub Actions', 'Cloudflare'],
        image: '',
      },
    ],
    caseStudy: 'Case study →',
    demo: 'Try the demo →',
    github: 'GitHub →',
    soonNote: 'Want to know when it is ready? Drop me a line.',
  },

  jobScout: {
    eyebrow: 'Case study',
    title: 'Job Scout: a smart assistant for your job search',
    lead:
      'A complete web application that reviews new job offers every morning, scores them against your CV, drafts cover letters for the best ones and sends a summary by e-mail. AI pre-selects, a human decides.',
    imageAlt: 'Job Scout – offers scored against a CV, Microsoft and Google sign-in, morning e-mail and AI costs',
    imageCaption: 'Illustration of the app – companies and offers are fictional.',
    facts: [
      { value: '~3 days', label: 'of intensive work with an AI agent' },
      { value: '2–3 months', label: 'estimate for a team of three without AI' },
      { value: '600+', label: 'automated tests' },
      { value: '21', label: 'recorded architecture decisions' },
    ],
    blocks: [
      { kind: 'h2', text: 'Why it exists' },
      {
        kind: 'p',
        text: 'Everyone knows job hunting: dozens of portals, hundreds of ads and hours of reading before you find the few offers that really fit. I wanted to show that with AI you can quickly build an application that does this work for you – while meeting everything expected of a real product: sign-in, multiple users, data protection, cost control and cloud operations.',
      },
      {
        kind: 'p',
        text: 'It runs in production, I use it every day, and anyone can try it – without signing up, on a demo account with real current job offers.',
      },
      { kind: 'h2', text: 'How it works' },
      {
        kind: 'stages',
        entries: [
          { label: '1', title: 'Sign-in', text: 'With a Microsoft or Google account – no new passwords.' },
          { label: '2', title: 'Your CV', text: 'Upload a CV and a few notes (“fully remote, no Java”). AI builds your profile from them.' },
          { label: '3', title: 'Search every morning', text: 'At 6:30 only new offers are fetched; a cheap model triages titles, a stronger one scores the rest 1–10.' },
          { label: '4', title: 'Letter and e-mail', text: 'Cover letter drafts for the best offers, a morning summary by e-mail. Nothing is ever sent automatically.' },
        ],
      },
      { kind: 'h2', text: 'Under the hood – for developers' },
      {
        kind: 'p',
        text: 'For those who want to know how it is built. All decisions, including rejected alternatives, are recorded as ADRs in the public repository.',
      },
      { kind: 'h3', text: 'Sign-in and access' },
      {
        kind: 'ul',
        items: [
          'OpenID Connect with Microsoft and Google, no own passwords.',
          'BFF pattern: the browser never sees a token, only an HttpOnly / Secure / __Host- cookie; CSRF protection.',
          'Access by admin approval, one-link invitations; permissions are read from the database on every request.',
        ],
      },
      { kind: 'h3', text: 'AI you can steer and afford' },
      {
        kind: 'ul',
        items: [
          'A pipeline instead of one expensive call: a cheap model (Haiku) triages in batches, a stronger one (Sonnet) scores and writes letters.',
          'Structured output with a JSON schema and validation – AI output is never trusted blindly; CVs and ads are untrusted data for the model.',
          'Every call is recorded with tokens and price; per-click limits (rolling 24 h) and an emergency brake for the whole app.',
          'Own narrow LLM port – the model is switched in configuration, the app does not know the vendor SDK.',
        ],
      },
      { kind: 'h3', text: 'Cloud and operations' },
      {
        kind: 'ul',
        items: [
          'The whole environment as code (Bicep), deployed with one script.',
          'One Docker image (Angular + API + worker + headless Chromium) from GitHub Actions; Azure Container Apps + a Container Apps Job for the morning run.',
          'Secrets only in Key Vault via managed identity; PostgreSQL, data in the EU; e-mails via Azure Communication Services with SPF and DKIM.',
        ],
      },
      { kind: 'h3', text: 'Quality and security' },
      {
        kind: 'ul',
        items: [
          '600+ automated tests (533 .NET + 85 Angular) with no network and no AI calls; architecture tests guard the layers.',
          'CI on every commit, CodeQL, Dependabot, vulnerable package checks, security headers, rate limiting.',
          'A modular monolith with ports and adapters; 21 ADRs public on GitHub.',
        ],
      },
      {
        kind: 'cards',
        entries: [
          { label: 'Backend', title: '.NET 10 · ASP.NET Core · EF Core' },
          { label: 'Frontend', title: 'Angular 21 · signals · CZ / EN' },
          { label: 'AI', title: 'Claude API · Haiku + Sonnet' },
          { label: 'Cloud', title: 'Azure Container Apps · PostgreSQL · Key Vault' },
        ],
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
      'Over 15 years I have worked in banks, financial companies, healthcare, logistics and the public sector – as an employee and through vendors. Project details are confidential, so only what matters.',
    stats: [
      { value: '15 years', label: 'of building enterprise systems' },
      { value: '10', label: 'companies and major projects' },
      { value: '5 sectors', label: 'banking, finance, healthcare, logistics, public sector' },
    ],
    items: [
      {
        name: 'Smart parcel locker platform',
        project: 'Cloud platform for a locker network',
        years: '2025–2026',
        sector: 'logistics',
        sectorLabel: 'Logistics',
        role: 'Software architect / senior developer (contractor)',
        via: '',
        text: 'Hundreds of smart lockers in more than 100 municipalities, thousands to tens of thousands of parcels at peak.',
        highlights: [
          'microservice solution on Azure with about 35 domains',
          'integrations with carriers and partners (e.g. PPL, DPD, Czech Post)',
          'multi-package shipments across services',
          'security, secrets management, choice of Azure components',
        ],
        tags: ['C#/.NET', 'Azure Service Bus', 'PostgreSQL', 'MongoDB', 'Docker'],
      },
      {
        name: 'VZP ČR',
        project: 'Modernising internal applications',
        years: '2020–2025',
        sector: 'health',
        sectorLabel: 'Healthcare',
        role: 'Team leader / full-stack developer (employee)',
        via: '',
        text: 'Moving the internal applications of the largest Czech health insurer to modern web applications on Azure.',
        highlights: [
          'leading a team of three, reporting directly to the IT director',
          'PZS Manager – managing healthcare providers, used by VZP Point branches and the doctor search',
          'CI/CD in Azure DevOps, Docker, sign-in via MS SSO',
        ],
        tags: ['Java', 'Spring Boot', 'Angular', 'Azure', 'OAuth2'],
      },
      {
        name: 'Records management system',
        project: 'Backend rewrite Java → .NET Core',
        years: '2018–2020',
        sector: 'public',
        sectorLabel: 'Public sector',
        role: 'Senior developer (contractor)',
        via: 'Mediaport Solutions / ISF Group',
        text: 'Rewriting the backend of a records management system from old Java to .NET Core 3.1.',
        highlights: ['maintaining the original system throughout the migration'],
        tags: ['Java', '.NET Core', 'Migration'],
      },
      {
        name: 'SAB Finance',
        project: 'ProStream',
        years: '2018–2020',
        sector: 'finance',
        sectorLabel: 'Finance',
        role: 'Senior developer (contractor)',
        via: '',
        text: 'Backend of an online FX trading platform.',
        highlights: [],
        tags: ['C#/.NET', 'Oracle PL/SQL'],
      },
      {
        name: 'Raiffeisenbank',
        project: 'CRAFOL',
        years: '2018–2020',
        sector: 'bank',
        sectorLabel: 'Banking',
        role: 'Senior developer (contractor)',
        via: '',
        text: 'Internal system for the Treasury department.',
        highlights: [],
        tags: ['Delphi', 'C#/.NET', 'PL/SQL'],
      },
      {
        name: 'ARBES Technologies',
        project: 'ARBES TOPAS and ARBES TA',
        years: '2013–2015 · 2018–2020',
        sector: 'asset',
        sectorLabel: 'Asset management',
        role: 'Developer',
        via: '',
        text: 'Information systems for portfolio management, trading and unit-holder administration.',
        highlights: ['ARBES TOPAS – portfolio management and trading', 'ARBES TA – unit-holder administration'],
        tags: ['Delphi', 'PL/SQL'],
      },
      {
        name: 'Vodafone',
        project: 'BidSimplifier',
        years: '2017–2018',
        sector: 'telecom',
        sectorLabel: 'Telecommunications',
        role: 'Developer',
        via: 'Cleverlance',
        text: 'Development and stabilisation of the BidSimplifier portal.',
        highlights: [],
        tags: ['C#/.NET', 'MS SQL'],
      },
      {
        name: 'IFS',
        project: 'ERP customisation',
        years: '2016–2017',
        sector: 'erp',
        sectorLabel: 'ERP',
        role: 'Developer',
        via: '',
        text: 'Customer customisations of the IFS ERP system.',
        highlights: [],
        tags: ['C#/.NET', 'PL/SQL'],
      },
      {
        name: 'MONETA Money Bank',
        project: 'Rebranding from GE Money Bank',
        years: '2015–2016',
        sector: 'bank',
        sectorLabel: 'Banking',
        role: 'Developer',
        via: '',
        text: 'The bank’s rebranding project – changes to internal systems.',
        highlights: ['migrating the internal frontend from Delphi 6 to XE5', 'receivables management system'],
        tags: ['Delphi', 'PL/SQL', 'Migration'],
      },
      {
        name: 'Stem cell donor registry',
        project: 'Prometheus',
        years: '2011–2013',
        sector: 'health',
        sectorLabel: 'Healthcare',
        role: 'Developer',
        via: 'Steiner',
        text: 'Development of the Prometheus system for the haematopoietic stem cell donor registry.',
        highlights: [],
        tags: ['Delphi'],
      },
    ] as Reference[],
    ctaTitle: 'Want to be the next reference?',
    ctaText: 'Let’s start with a free call.',
  },

  about: {
    eyebrow: 'About',
    title: 'From design to operations',
    paragraphs: [
      'My name is Stanislav Matzke and I have been designing and building enterprise systems for 15 years. I started on Delphi and Oracle systems for banks and financial companies, moved through .NET and Java to cloud solutions on Azure and to leading a team in the in-house IT of VZP.',
      'Recently I worked on a microservice platform for a network of smart parcel lockers, and I build my own applications – you can find some of them here on this website and on GitHub.',
      'That is why I understand both the old and the new world: I know why a system from 2005 is written the way it is, and I can move it safely to a modern architecture. In the last few years I have added AI – and it changed what one person can deliver. Today I cover the whole workflow from design through development and deployment to operations.',
    ],
    howTitle: 'How I like to work',
    how: [
      'With a clear goal, trust and ownership of the result.',
      'I focus on efficiency – fewer meetings, more finished work.',
      'I write important decisions down briefly and clearly, so everyone knows why we decided the way we did.',
      'I hand over code that is secure, tested and documented – and I stand behind it, even though I make full use of AI tools in development.',
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
      { name: 'Backend', items: ['C# / .NET (Core)', 'ASP.NET Core', 'Entity Framework', 'Java', 'Spring Boot', 'Delphi', 'REST API', 'microservices', 'messaging (Service Bus)'] },
      { name: 'Databases', items: ['Oracle PL/SQL', 'MS SQL', 'PostgreSQL', 'MongoDB', 'SQLite', 'schema design and tuning'] },
      { name: 'Cloud and DevOps', items: ['Azure', 'App Service', 'Container Apps', 'Service Bus', 'Key Vault', 'Communication Services', 'Bicep', 'Docker', 'Kubernetes', 'Azure DevOps', 'GitHub Actions', 'Jenkins', 'Git'] },
      { name: 'Security and identity', items: ['OAuth2', 'OpenID Connect', 'Microsoft Entra ID / SSO', 'Google sign-in', 'secrets management', 'OWASP'] },
      { name: 'Frontend', items: ['Angular', 'TypeScript', 'React', 'RxJS / signals'] },
      { name: 'AI', items: ['Claude API', 'AI agents', 'tool calling', 'structured output', 'evals and costs', 'prompt-injection protection'] },
      { name: 'Quality and architecture', items: ['xUnit', 'Playwright', 'architecture tests', 'CI/CD', 'ADRs', 'modular monolith', 'Strangler Fig'] },
    ],
    hobbiesTitle: 'Outside work',
    hobbies: 'Craft and manual work, homebrewing, travel, sport.',
    linksTitle: 'Links',
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
        a: 'Only business AI services that do not train on your data, or tools inside your environment. No production personal data. More in the article on what the AI agent got wrong.',
      },
      {
        q: 'What if the result is not as agreed?',
        a: 'Then you do not pay. Before we start, we agree in writing on exactly what I will deliver and how we will know it is done. If I do not deliver, I refund any deposit – the risk is mine.',
      },
      {
        q: 'Can we do it without AI?',
        a: 'We can, but it will be slower and more expensive – and in the long run it is a step backwards. I would rather help you adopt AI safely: with data protection and reviewed output.',
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
      {
        kind: 'p',
        text: 'E-mails to kontakt@stanislavmatzke.com are forwarded by Cloudflare to my Google (Gmail) mailbox. Both providers process the messages only as technical intermediaries.',
      },
      { kind: 'h2', text: 'Visiting the website' },
      {
        kind: 'p',
        text: 'This website uses no cookies or tracking tools and loads nothing from third parties – even the fonts are hosted on the site itself. Hosting is provided by Microsoft Azure, which briefly processes technical access data (such as your IP address) for security and operation. Your choice of light or dark mode is remembered only by your browser.',
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
