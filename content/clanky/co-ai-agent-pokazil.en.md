---
typ: clanek
slug: co-ai-agent-pokazil
jazyk: en
url: /en/articles/co-ai-agent-pokazil
titulek: "What the AI agent got wrong – and why it matters"
perex: "An AI agent wrote Job Scout; I was the architect and reviewer – I specified, checked, tested and deployed. The agent did not make the classic security mistakes. The ones it did make were trickier: correct code, green tests, logic not thought through."
meta_description: "An AI agent wrote Job Scout; I was the architect and reviewer – I specified, checked, tested and deployed. The agent did not make the classic security mistakes. The ones it did make were trickier: correct code, green tests, logic not thought through."
og_title: "What the AI agent got wrong – and why it matters – Stanislav Matzke"
oblast: ai-ve-vyvoji
datum_publikace: 2026-10-13
datum_aktualizace: 2026-11-14
doba_cteni: 8
og_image: /img/job-scout-og-en.jpg
souvisejici: [rychlost-vyvoje, kam-mizi-vyvojarska-prace]
cta: { titulek: "Want to know what AI could do with your system?", text: "Let’s discuss it on a free call." }
stav: publikovano
preklad: [CS: /clanky/co-ai-agent-pokazil, EN: /en/articles/co-ai-agent-pokazil]
zrcadleno_z_webu: 2026-11-14
zmeneno_editorem: 2026-11-14
---

# What the AI agent got wrong – and why it matters

*Articles · October 2026 · 7 min read*

An AI agent wrote Job Scout; I was the architect and reviewer – I specified, checked, tested and deployed. The agent did not make the classic security mistakes. The ones it did make were trickier: correct code, green tests, logic not thought through.

<!-- blok: projekt -->
> ![Job Scout – application preview](img/job-scout-cover.webp)
>
> **Which project this is about**
>
> Job Scout is a web application that reviews new job offers every morning, scores them against your CV and drafts cover letters for the best ones. It runs in production on Azure and anyone can try it.
>
> - ~3 days of intensive work by one person with an AI agent
> - Microsoft / Google sign-in, multiple users, access approval
> - .NET 10, Angular, Claude API, Azure, 600+ tests
>
> [Job Scout case study →](/en/projects/job-scout)

## The good news first: it (almost) no longer makes silly mistakes

The usual “vibe coding” horrors never showed up in Job Scout. On its own, the agent:

- kept passwords and API keys out of the repository,
- validated input and never hand-assembled SQL,
- wrote 600+ automated tests and tests that guard the application’s layers,
- added prompt-injection protection.

The mistakes it did make were of a different kind: the code was correct, the tests were green – but the logic was not thought through. Exactly the kind no linter or security scanner will find.

## Story 1: anyone with access could burn through the AI budget

The morning run had hard limits from day one. Then we added “Score” and “Write a new cover letter” buttons – each one a paid AI call. The agent implemented them exactly as specified.

<!-- blok: fakta -->
- **The bug:** Nobody asked “what if someone clicks a thousand times?”. Changing one letter in the notes re-ran the profile analysis; a letter could be rewritten endlessly.
- **How I found it:** The day after launch, when I sent the app to the first users and clicked through it myself. A human found it, not the AI.
- **The fix (one morning):** Per-click limits in a rolling 24-hour window, a daily “emergency brake” that e-mails the admin, a double-click lock and a monthly cap with the AI provider.

<!-- blok: ponaučení -->
> **Lesson**
>
> In AI applications, a “denial of wallet” attack is as real a risk as a data leak (OWASP lists it for LLM apps as Unbounded Consumption). AI delivers what you specify – the question “how much could this cost us if it is abused” has to come from a human.

## Story 2: a rejected user got into the app

Access to Job Scout is approved by an admin. The agent implemented “Reject request” – using the existing “suspended account” state. Logical at first glance.

<!-- blok: fakta -->
- **The bug:** A suspended user is still a member and may view their own data. So a rejected applicant could sign in and get inside.
- **Why tests missed it:** They tested exactly what the agent wrote. Nobody tested that a rejected applicant must see nothing at all.
- **How I found it:** A manual test in production: I rejected a test account and it signed in just fine. Rejection is now a separate action.

<!-- blok: ponaučení -->
> **Lesson**
>
> Authorisation is where “almost right” means “wrong”. No automation replaces a review of access rules and a manual “let me try to get in” test.

## Bonus: two parts that never talked to each other

The agent wrote a workflow that builds a Docker image after every commit – and sensibly skips commits that only touch documentation. On another day it wrote a deploy script that deploys the image for the latest commit. Each part correct on its own. Together: after a README change the script tried to deploy an image that was never built. Not a bug in the code, but in combining two decisions made on different days.

## Checking against a list: where AI shines

After launch we went through the app point by point against a security checklist for vibe coding. The agent did the review – and given a clear list, it is thorough. It found another hole it had created itself: anyone could request access a hundred times and the admin would get a hundred e-mails.

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

## What this means for companies

- AI is improving fast – a good agent with clear rules no longer makes the classic security mistakes on its own. That does not mean the code is finished.
- What needs watching is logic, not syntax: who may see what, what happens when it is abused, what it costs, how the parts work together.
- Green tests are not enough – the agent tests what it wrote. Tests for “what must never happen” have to be invented by a human.
- Fast feedback from real use caught both main bugs within 24 hours. Releasing early to a small group and having limits and cost monitoring from day one paid off.

## How I use AI on client work

- I use AI to find my way around large codebases, extract business rules, and draft tests and documentation. Conclusions, architecture and recommendations are mine.
- Only business versions of AI services that contractually do not train on customer data. If you have your own approved tools (e.g. Azure OpenAI in your tenant), I use those.
- I work on a copy of the code with anonymised or test data, never with production personal data. When the engagement ends I delete everything and confirm it in writing.
- I never give AI keys or passwords. I review, approve and stand behind every change the agent makes.

## And what if you don’t want AI?

It can be done without it. But honestly: it is a step backwards. Whoever develops slower and more expensively than the competition will lose – companies in their markets and people in the job market. I had to adapt myself, and I know it can be done.

The answer is not to avoid AI but to use it deliberately: with a focus on security, data protection and reviewing the output. I will gladly help you make that transition – just as I made it myself.

## How it went the second time

On the next project, [Payment matching with AI](/en/projects/payment-matching), I worked differently: from a specification, phase by phase, with tests and evals as guardrails. The agent made mistakes there too. It got one rule wrong by one position, the validation once let a payment through to a wrong combination of invoices, and a prompt differed by operating system. The difference was that tests and evals caught these mistakes before anything depended on them.

What the tests didn’t catch, deployment and the first user revealed:

- **Four traps in Azure:** a new database with a different schema owner, a password change that silently broke the running app, telemetry that dropped the data of a short job on its own, and a changed identity format for passwordless sign-in.
- **A hole in the deployment pipeline:** it checked only the branch name, not where the code came from. Anyone could have copied the repository, sent a change from a branch called `main`, and their code would have been deployed to production. It was found before the code went public. CI/CD is code with the same rights as production.
- **The first hour with a user:** a new user waited for the AI until the next morning – a direct consequence of a security rule. And a person in the queue couldn’t see the invoice next to the payment, so they had nothing to decide from.

So the lesson from Job Scout still holds: logic, operations and the user’s view need a human. What is new is that I no longer hunt for the agent’s routine mistakes myself – the mechanisms I built around it do.

<!-- blok: CTA pás -->
> Want to know what AI could do with your system?  
> Let’s discuss it on a free call.
>
> [Book a free call](/en/contact)
