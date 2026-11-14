---
typ: clanek
slug: co-ai-agent-pokazil
jazyk: en
url: /en/articles/co-ai-agent-pokazil
titulek: "What the AI agent got wrong – and why it matters"
perex: "An AI agent wrote two applications, Job Scout and Payment matching. I was the architect and the reviewer. The agent didn’t make the classic security mistakes. The ones it did make were trickier: correct code, green tests, logic not thought through. Where AI goes wrong, how I found out, and how to guard against it."
meta_description: "What an AI agent got wrong while building two applications: logic not thought through, bugs that only data reveals, and deployment traps. How I found them and how to guard against them with tests, evals and a human eye."
og_title: "What the AI agent got wrong – and why it matters – Stanislav Matzke"
oblast: ai-ve-vyvoji
datum_publikace: 2026-10-13
datum_aktualizace: 2026-11-14
doba_cteni: 8
og_image: /img/job-scout-og-en.jpg
souvisejici: [necti-kazdy-radek, rychlost-vyvoje, modernizace-bez-velkeho-tresku]
cta: { titulek: "Want to know what AI could do with your system?", text: "Let’s discuss it on a free call." }
stav: publikovano
preklad: [CS: /clanky/co-ai-agent-pokazil, EN: /en/articles/co-ai-agent-pokazil]
zmeneno_editorem: 2026-11-14
---

# What the AI agent got wrong – and why it matters

*Articles · 13 October 2026 · updated 14 November 2026*

An AI agent wrote two applications, Job Scout and Payment matching. I was the architect and the reviewer. The agent didn’t make the classic security mistakes. The ones it did make were trickier: correct code, green tests, logic not thought through. Where AI goes wrong, how I found out, and how to guard against it.

Both projects run publicly and you can try them. [Job Scout](/en/projects/job-scout) scores job offers against your CV every morning. [Payment matching with AI](/en/projects/payment-matching) modernises an old Delphi system and matches bank payments to invoices. On Job Scout I read the agent’s code line by line. On Payment matching I approved plans, and tests and evals guarded the quality. Yet in both projects, the agent’s mistakes fell into the same three groups.

## The good news first: it (almost) no longer makes silly mistakes

The usual “vibe coding” horrors never showed up. On its own, the agent kept passwords and API keys out of the repository, validated input, never hand-assembled SQL, protected against prompt injection and wrote hundreds of automated tests. The mistakes it did make were of a different kind: the kind no linter or security scanner will find.

## 1. Logic not thought through

These are mistakes where the agent did exactly what it was asked, but nobody thought through the consequences.

**Anyone could burn through the AI budget.** Job Scout got “Score” and “Write a new cover letter” buttons, each one a paid AI call. The agent implemented them as specified. But nobody asked what happens if someone clicks a thousand times. I found it the day after launch, clicking through the app myself. The fix took a morning: per-click limits, a daily “emergency brake” that e-mails the admin, and a monthly cap with the AI provider. OWASP lists this risk for AI applications as *Unbounded Consumption*: a “denial of wallet” attack is as real as a data leak.

**A rejected user got in.** Access to Job Scout is approved by an admin. For “Reject request”, the agent reused the existing “suspended account” state – but a suspended user may still see their own data. The tests passed, because they tested exactly what the agent wrote. Nobody tested that a rejected applicant must see nothing at all. I found it with a manual test: I rejected a test account and it signed in just fine.

Payment matching had a similar mistake around costs, only the other way round. The agent limited AI calls per sandbox so strictly that new users waited days for the AI. The real protection against a big bill is the global cap and the number of new accounts per day. That is something a person thinking about how to abuse the app will spot, not an agent fulfilling a brief.

## 2. Bugs that only data reveals

The second group: the code compiles and looks right at first glance. The bug only shows up on specific data, on another operating system or when things run in parallel.

| Bug | Project | What caught it |
|---|---|---|
| Validation let a euro payment through to a combination of two other invoices of the same customer | Payment matching | a test that tries every possible answer, not a sample |
| The code didn’t notice when two invoices fit a payment equally well | Payment matching | an eval in CI that turned the build red |
| A rule extracted from the old code was off by one position | Payment matching | a test against the old system’s actual behaviour |
| The text sent to the model differed by operating system | Payment matching | CI on Linux within a minute |
| Two parts (build and deploy), each correct, didn’t work together | Job Scout | the first deployment after a documentation change |

A person reading the code easily misses these bugs, because it *looks* right. On Job Scout I was still hunting for them by eye. On Payment matching, mechanisms caught them before anything depended on them. Why tests and evals are enough and I don’t have to read every line is the subject of [Don’t read every line](/en/articles/necti-kazdy-radek).

## 3. Operations and the first user

No test finds the third group, because it only appears in the real environment.

- **Traps in Azure:** a new database with a different schema owner, a password change that silently broke the running app, and telemetry that dropped a short job’s data on its own.
- **A hole in the deployment pipeline:** it checked only the branch name, not where the code came from. Anyone could have copied the repository and sent a change that would be deployed to production. It was found before the code went public. CI/CD is code with the same rights as production.
- **The first hour with a user:** a new user waited for the AI until the next morning, and a person in the queue couldn’t see the invoice next to the payment, so they had nothing to decide from.

In both projects the same thing held: the most valuable feedback came within 24 hours of the first real use.

## How to guard against it

After Job Scout went live, we went through the app point by point against a security checklist for vibe coding. The agent did the review again – and given a clear list, it is thorough. It even found another hole it had created itself: anyone could request access a hundred times, and the admin would get a hundred e-mails.

<!-- blok: karty -->
- **Input and injection**  
  parameterised queries, output escaping, size limits
- **Authorisation**  
  every query scoped to the data owner, permissions from the database
- **Abuse**  
  rate limiting, AI limits, capped e-mails
- **CI and dependencies**  
  CodeQL, Dependabot, vulnerable package checks

<!-- blok: zdroj -->
[O2 CyberNews: Vibe coding – working code is not automatically secure (in Czech) ↗](https://o2cybernews.cz/clanky/vibe-coding-funkcni-kod-neni-automaticky-bezpecny)

Each group of mistakes needs a different defence:

1. **Logic not thought through** needs a person. Someone has to ask “how much could this cost us if it is abused” and “who must not get where”, and write tests for what must *not* happen. The agent tests what it wrote.
2. **Bugs in data** need mechanisms: tests against the old system’s behaviour, tests of every possible answer, evals in CI and runs on more than one platform.
3. **Operations** need a plan: deployment as a phase of its own with smoke tests, limits and cost monitoring from day one, and an early release to a small group of people.

<!-- blok: ponaučení -->
> **Lesson**
>
> AI delivers what you specify. The questions “how much could this cost us” and “who must not get where” have to come from a person. Mechanisms catch the rest – if you build them before the app.

## What this means for companies

- AI is improving fast, and a good agent with clear rules no longer makes the classic security mistakes. That doesn’t mean the code is finished.
- What needs watching is logic, not syntax: who may see what, what happens when it is abused, what it costs and how the parts work together.
- Green tests are not enough if only the agent wrote them. Tests for “what must never happen” have to be invented by a person.
- The answer is not to avoid AI but to use it deliberately. How I protect code and data on client work is described on the [Confidentiality and data protection](/en/confidentiality) page.
