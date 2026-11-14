---
typ: clanek
slug: rychlost-vyvoje
jazyk: en
url: /en/articles/rychlost-vyvoje
titulek: "Development speed: what changed in just a few years"
perex: "For fifteen years software development got faster slowly. Then AI arrived and within a few years – and even more so in recent months – what one experienced person can deliver changed. What it means for new projects and for modernising old systems."
meta_description: "How AI changed development speed: two projects built in days instead of months, why the way you work with AI agents matters too, and what it means for modernising old systems."
og_title: "Development speed: what changed in just a few years – Stanislav Matzke"
oblast: ai-ve-vyvoji
datum_publikace: 2026-10-13
datum_aktualizace: 2026-11-14
doba_cteni: 6
og_image: /img/og-default-en.jpg
souvisejici: [necti-kazdy-radek, co-ai-agent-pokazil, modernizace-bez-velkeho-tresku]
cta: { titulek: "Want to know what AI could do with your system?", text: "Let’s discuss it on a free call." }
stav: publikovano
preklad: [CS: /clanky/rychlost-vyvoje, EN: /en/articles/rychlost-vyvoje]
zmeneno_editorem: 2026-11-14
---

# Development speed: what changed in just a few years

*Articles · 13 October 2026 · updated 14 November 2026*

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

Two projects I built with an AI agent, both of which you can try, show it best. The bigger one, [Payment matching with AI](/en/projects/payment-matching), modernises an old Delphi and PL/SQL module to .NET 10 with AI that matches bank payments to invoices – including evals, deployment on Azure and public code.

<!-- blok: srovnání -->
- **4–6 months** – a team of 4–5 people without AI (my estimate)
- **~2.5 days** – one experienced person with an AI agent

*Same scope, same quality bar: tests, security, documentation, deployment.*

| | [Job Scout](/en/projects/job-scout) | [Payment matching with AI](/en/projects/payment-matching) |
|---|---|---|
| What it is | a web app with AI for job hunting | Delphi → .NET 10 modernisation and AI payment matching |
| Estimate without AI | 3 people, 2–3 months | 4–5 people, 4–6 months |
| With an AI agent | ~3 days | ~2.5 days |
| How I worked | the agent wrote, I read every line | specification, agent phase by phase, tests and evals |

I had experienced it before: when I moved to .NET after years of Java, AI made me fully productive within days. Today it is no longer just about writing code faster – one person can cover the whole workflow, from design to operations.

## Speed comes not just from the tool, but from the way of working

By my estimate, Payment matching was a considerably bigger project than Job Scout, and yet it was finished faster. It wasn’t just a better tool. The way I work with it changed.

<!-- blok: srovnání -->
- **AI writes, I read** – Job Scout: the agent prepared the code, I went through it line by line in the IDE and adjusted it
- **AI works within guardrails** – Payment matching: a specification and a plan, the agent working on its own phase by phase, tests and evals guarding quality

*On the first project, the bottleneck was me and my reading. On the second, I approved the plan and the result of each phase.*

On Payment matching I didn’t read every line. Quality was guarded by tests against the old system’s behaviour, evals in CI, independent review and recorded decisions. The result was faster and better checked at the same time: the mistakes the agent made were caught by mechanisms before anything depended on them. What those mistakes were is described in [What the AI agent got wrong](/en/articles/co-ai-agent-pokazil), and why to review this way in [Don’t read every line](/en/articles/necti-kazdy-radek).

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

This is exactly how Payment matching was built. I describe the approach in general in [Modernisation without a big bang](/en/articles/modernizace-bez-velkeho-tresku).

<!-- blok: ponaučení -->
> **Lesson**
>
> A project you shelved two years ago as too expensive is worth recalculating. The price has changed more since then than in the previous ten years. AI brings the speed; the certainty comes from the guardrails you build around it.

## Where the bottleneck is now

Writing code is no longer the slowest part. The bottleneck is decisions and verification: what to build, how to design it, who may see what, what it will cost to run, what happens when something fails, and how we know it works. AI speeds up those who know what they are doing. Without experience you quickly get a lot of code nobody understands.
