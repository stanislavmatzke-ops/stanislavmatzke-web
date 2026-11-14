---
typ: clanek
slug: rychlost-vyvoje
jazyk: en
url: /en/articles/rychlost-vyvoje
titulek: "Development speed: what changed in just a few years"
perex: "For fifteen years software development got faster slowly. Then AI arrived and within a few years – and even more so in recent months – what one experienced person can deliver changed. What it means for new projects and for modernising old systems."
meta_description: "For fifteen years software development got faster slowly. Then AI arrived and within a few years – and even more so in recent months – what one experienced person can deliver changed. What it means for new projects and for modernising old systems."
og_title: "Development speed: what changed in just a few years – Stanislav Matzke"
oblast: ai-ve-vyvoji
datum_publikace: 2026-10-13
datum_aktualizace:
doba_cteni: 6
og_image: /img/og-default-en.jpg
souvisejici: [co-ai-agent-pokazil, kam-mizi-vyvojarska-prace]
cta: { titulek: "Want to know what AI could do with your system?", text: "Let’s discuss it on a free call." }
stav: publikovano
preklad: [CS: /clanky/rychlost-vyvoje, EN: /en/articles/rychlost-vyvoje]
zrcadleno_z_webu: 2026-11-14
---

# Development speed: what changed in just a few years

*Articles · October 2026 · 6 min read*

For fifteen years software development got faster slowly. Then AI arrived and within a few years – and even more so in recent months – what one experienced person can deliver changed. What it means for new projects and for modernising old systems.

I have been building enterprise systems since 2011. Plenty of tools and trends came and went, but the real leap in what one person can deliver came only with AI. Step by step:

<!-- blok: časová osa -->
- **2011–2022 – Line by line**  
  Better IDEs, frameworks, cloud and CI/CD. But speed-ups were measured in percent – a human still wrote the code.
- **First assistants – Autocomplete and chat**  
  AI completed lines and answered questions. Useful mostly for routine work, often with confident nonsense.
- **Whole project – AI understands the repo**  
  Refactoring across dozens of files, tests, explaining unfamiliar code. A new technology in days, not months.
- **Today – Agents finish the job** <!-- aktuální etapa -->  
  They plan, edit files, run the build and tests, fix errors. Improving month by month, not year by year.

## What it means in practice

A concrete example: I built Job Scout – a .NET 10 backend, job-ad scraping, an AI pipeline, sign-in via Microsoft and Google, user management, Angular, 600+ tests, CI, 21 recorded architecture decisions and deployment on Azure – in about three days of intensive work.

<!-- blok: srovnání -->
- **2–3 months** – a team of three without AI (estimate)
- **~3 days** – one experienced person with an AI agent

*Same scope, same quality bar: tests, security, documentation, deployment.*

I had experienced it before: when I moved to .NET after years of Java, AI made me fully productive within days. Today it is no longer just about writing code faster – one person can cover the whole workflow, from design to operations.

## What it means for modernising old systems

<!-- blok: karty -->
- **01 · Understanding the code**  
  Days instead of weeks – AI goes through forms, stored procedures and triggers.
- **02 · Business rules**  
  Rules hidden in code can be extracted and written down; a human verifies them with users.
- **03 · Tests as a safety net**  
  Characterisation tests that check the new system behaves exactly like the old one.
- **04 · Module by module**  
  Much cheaper than before – systems nobody touched for years are worth recalculating.

<!-- blok: ponaučení -->
> **Lesson**
>
> A project you shelved two years ago as too expensive is worth recalculating. The price has changed more since then than in the previous ten years.

## Where the bottleneck is now

Writing code is no longer the slowest part. The bottleneck is decisions: what to build, how to design it, who may see what, what it will cost to run and what happens when something fails. AI speeds up those who know what they are doing. Without experience you quickly get a lot of code nobody understands.

<!-- blok: odkaz -->
[What I ran into in practice when building with an AI agent →](/en/articles/co-ai-agent-pokazil)

<!-- blok: CTA pás -->
> Want to know what AI could do with your system?  
> Let’s discuss it on a free call.
>
> [Book a free call](/en/contact)
