---
typ: pripadova-studie
slug: payment-matching
jazyk: en
url: /en/projects/payment-matching
titulek: "Payment matching with AI: from Delphi to an AI-native application"
perex: "In two and a half days, working with an AI agent, I did what would take a team of four to five people four to six months: I moved an old Delphi and PL/SQL module to .NET and built AI on top of it that matches the unclear payments. Code checks every answer the model gives, so in testing not a single payment ended up on the wrong invoice. The app runs publicly on synthetic data and the code is open."
meta_description: "Case study: modernising Delphi + PL/SQL to .NET 10 and AI payment matching in 2.5 days with an AI agent instead of 4–6 months of a team. 19 wrong matches in 1,000 → 0, evals in CI, running on Azure, $0.36 per 1,000 payments."
og_title: "Payment matching with AI – case study – Stanislav Matzke"
datum_publikace: 2026-11-14
datum_aktualizace:
doba_cteni: 12
og_image: /img/payment-matching-og-en.jpg
souvisejici: [modernizace-bez-velkeho-tresku, necti-kazdy-radek, co-ai-agent-pokazil]
cta: { titulek: "Have an old system you'd like to move forward?", text: "Let’s discuss it on a free call." }
stav: publikovano
preklad: [CS: /projekty/parovani-plateb, EN: /en/projects/payment-matching]
---

# Payment matching with AI: from Delphi to an AI-native application

*Case study*

In two and a half days, working with an AI agent, I did what would take a team of four to five people four to six months: I moved an old Delphi and PL/SQL module to .NET and built AI on top of it that matches the unclear payments. Code checks every answer the model gives, so in testing not a single payment ended up on the wrong invoice. The app runs publicly on synthetic data and the code is open.

[Try the demo](https://payments.stanislavmatzke.com/demo) · [Source code on GitHub](https://github.com/stanislavmatzke-ops/payment-matching-ai)

![Payment matching – overview of what AI added, a model decision checked by code and eval results](img/payment-matching-cover-en.webp)  
*Illustration of the app – companies, payments and invoices are fictional.*

<!-- blok: fakta -->
- **~2.5 days:** instead of 4–6 months of a team without AI
- **19 → 0:** payments in 1,000 on the wrong invoice
- **100 %:** correct automatic matches (gold set of 300 payments)
- **$0.36:** for AI per 1,000 payments

## Why payment matching

Every company that issues invoices has to work out which incoming payment belongs to which invoice. Most payments are simple: the reference number and the amount match. The rest is a mess. A typo in the reference, the invoice number hidden in the message, one payment for three invoices, a parent company paying for its subsidiary, a payment in euros. Every day, those payments land on somebody’s desk.

It is a typical piece of an enterprise system: rules written years ago, money at stake and plenty of edge cases. So one rule drove the whole project: **a wrong match is worse than no match.** A person will sort out an unmatched payment. A payment matched to the wrong invoice goes unnoticed until the customer calls.

## 2.5 days instead of 4–6 months

So that “two and a half days” isn’t just a number: the application code is roughly 7,900 lines of C#, plus 1,800 lines of UI, 5,300 lines of tests (401 tests), 700 lines of infrastructure and CI/CD, and about 40,000 words of documentation with 18 recorded decisions. The gold set has 300 hand-checked payments.

<!-- blok: srovnání -->
- **4–6 months** – a team of 4–5 people without AI (my estimate, ~70–115 person-weeks)
- **~2.5 days** – one experienced person with an AI agent

*The estimate is more of a lower bound: the old module here is a small fiction (650 lines), and the project has no connection to a real bank or ERP. With a real system, the analysis would take longer.*

Adding people wouldn’t shorten a team’s calendar either. Analysing the old system, reviewing the test data and making business decisions can’t be split across more heads. That is exactly where AI sped things up most: the agent prepared the groundwork in hours, and what was left for me was the decisions.

## The starting point: a module “from 2005”

I didn’t want to show modernisation on a toy, but I can’t use any client’s code. So the project starts with a fictional module in Delphi and Oracle PL/SQL, written the way such things were written around 2005. It really compiles and runs. The data is synthetic, from a generator that knows the right answer for every payment.

That made it possible to measure the old system honestly. It matched about two thirds of payments automatically, but only about 80 % of those were right, and **19 payments out of 1,000 ended up on the wrong invoice**. On top of that, every wrong match “blocked” the invoice, so the correct payment that arrived later was rejected as a duplicate.

<!-- blok: srovnání -->
- **19 in 1,000** – payments on the wrong invoice in the old module
- **0** – after modernisation and with the AI layer

*Measured against the generator’s correct answers, same data for both systems.*

## Modernisation without drama

The most expensive part of a modernisation is usually finding out what the old system actually does. So I gave the source code to an agent that had no context and wasn’t allowed to run it, and asked it to write down the rules. It found every rule I had deliberately put into the module, plus **seven real bugs that not even I knew about**. For example, a database function that cuts off the invoice number, so the payment lands on a completely different invoice. It did get one detail wrong, though, and only a test against the old program’s actual behaviour revealed it. Hence the rule: **how the system really behaves > what the code says > what the documentation claims.**

The next steps followed the *strangler fig* pattern: the new system gradually grows around the old one instead of replacing it in one big rewrite.

<!-- blok: časová osa -->
- **1 – Understand**  
  An isolated agent extracts the rules from the code and a human reviews them.
- **2 – Capture the behaviour**  
  The old program’s output over the same data is the “golden master”: a truth you cannot argue with.
- **3 – Port faithfully**  
  The new .NET version must produce byte-identical output, bugs included.
- **4 – Change deliberately** <!-- aktuální etapa -->  
  Only then come the fixes, and every difference from the old behaviour must be explained.

The .NET port was byte-identical to the old module on 1,300 payments on the very first run. The golden master also made possible a refactoring everyone fears when money is involved: switching from `double` to `decimal` without a single change in output. Proven, not estimated.

Only then did I fix the old system’s bugs. Every fix changes some results, and a test made sure each change was intentional: if a result changed and it wasn’t clear why, the build failed. It caught the agent twice. The result: **on the same data, no payment ended up on the wrong invoice any more.**

## Where AI decides and where it doesn’t

Only now does AI come in. Not instead of the rules, but on top of them. The rules still settle what they can, and the model sees only the payments they could not decide.

<!-- blok: karty -->
- **1 · Rules**  
  the port of the old module settles the simple cases
- **2 · Candidates from code**  
  code picks the possible invoices; the model never sees the database
- **3 · Model**  
  picks the invoice and writes its reasoning and confidence
- **4 · Validation in code**  
  the invoice exists, amounts and currency match, the answer is unambiguous, it isn’t a fake
- **5 · Person**  
  anything uncertain goes to a queue with a prefilled proposal

The model does not have the last word. When it picks an invoice, code checks that the invoice exists, that the amount fits and that no other combination fits equally well. Only then is anything saved. Text written by the payer is untrusted data for the model, not instructions.

The most valuable lesson didn’t come from the model, though. Before the real AI was switched on, a stand-in ran that always took the first candidate. It straight away **matched a euro payment to two other invoices of the same customer**, because their sum happened to fit into the exchange-rate band. So the agent wrote a test that tries every possible combination of invoices as “the model’s answer”. It found 45 holes, and two new rules closed them. The safety of AI in a product rests not on the model but on validation, and validation is tested against every possible answer, not a sample.

## What AI added

With AI, “it looks good” is not enough. So there is a gold set of 300 payments, 30 % of them deliberately tricky: two identical invoices, invoice numbers in a format the code cannot read, and attempts to slip in a fake invoice hidden in the payment message. The real model’s answers are recorded and replayed in CI without an API key. **The build fails** as soon as precision drops below 99 % or a single fake is matched. The first run found a hole straight away – not in the model, but in the validation, which didn’t recognise ambiguity. Now it does.

| | Rules only | Rules + code without AI | **Rules + Claude** |
|---|---|---|---|
| Correct automatic matches | 100 % | 100 % | **100 %** |
| Matched without a person | 37.7 % | 53.3 % | **53.3 %** |
| Fake-invoice attempts caught (of 40) | 40 | 20 | **40** |
| Cost per 1,000 payments | – | – | **$0.36** |

Compared with the rules taken over from the old system alone, automation rose from 38 to 53 % and no payment ended up on the wrong invoice. Most of that increase came from the new code around the model: candidate selection and validation. The model added what code can’t do on its own: it caught all 40 attempts to slip in a fake invoice (code without it only half) and writes reasoning for every unclear payment, which a person decides from.

**On clean data, AI is pointless decoration. It shows its value on hostile and ambiguous input – and that is exactly what payments from external payers are, who can write whatever they like in the message.** Even there, code holds the line.

Anyone can run the evals themselves with a single command, without an API key and for free.

<!-- blok: zdroj -->
[Full eval report on GitHub ↗](https://github.com/stanislavmatzke-ops/payment-matching-ai/tree/main/evals/reports)

## Cost and operations

AI costs $0.36 per 1,000 payments. A small, cheap model decides most of them. The large one is called only where its answer can change the outcome. You can see it in the audit trail of a [sample payment in the demo](https://payments.stanislavmatzke.com/demo/payments/P0016): the small model was not sure, the large one matched a payment with two swapped digits in the reference with confidence 0.93, and code checked the answer. It cost about a cent.

The public app has one hard rule: **a visitor never triggers the model.** AI runs in a scheduled morning job with three budgets, and answers are cached. So the cost doesn’t depend on the number of users.

Deployment and the first hour with a real user then revealed things no test had found. I write about them in [What the AI agent got wrong](/en/articles/co-ai-agent-pokazil).

## How it was built with an agent

The code, tests, infrastructure and documentation were written by an AI agent (Claude Code). I was the architect, the client and the reviewer.

<!-- blok: časová osa -->
- **Half a day – Brief**  
  Analysis, goals, a plan and an empty repo with just a specification, a plan and rules for the agent.
- **1 day – Development**  
  Phase by phase: the old module and golden master, rule extraction, faithful port, AI layer, evals and gold set, first prototype.
- **1 day – Finishing and operations** <!-- aktuální etapa -->  
  Tests and evals, refactoring, user testing and changes based on it, smoke tests, deployment to Azure, publishing the repo.

Most phases ran in a new agent session that knew only the specification, the plan and the recorded decisions. The agent proposed an approach, I approved or adjusted it, and the agent implemented it with tests and stopped to show the result. **I approved plans, not diffs.** Why this works is the subject of [Don’t read every line](/en/articles/necti-kazdy-radek).

The agent made mistakes, which is normal. Its code always compiled and looked right at first glance. The bugs only showed up where reading doesn’t reach: on specific data, on another operating system or when tests ran in parallel. A mechanism caught every one of them (the golden master, the every-answer test, evals, CI on Linux), and none reached production.

My role was elsewhere: what we build and why, what “correct” means, and everything that costs money or changes infrastructure. Every paid model call and every change in Azure needed my explicit “yes”. And a few things came from judgement, not code. The agent carefully limited the number of AI calls per sandbox, but so strictly that new users waited days for the AI. The real protection against a runaway bill is the global cap and the number of new accounts per day. That call was mine to make.

<!-- blok: ponaučení -->
> **Lesson**
>
> A wrong match is worse than no match. The model proposes, but the line is held by code that can be tested end to end. A person decides what “correct” means and sees what tests won’t find.

## Under the hood – for developers

All decisions, including rejected alternatives, are recorded as ADRs (18) in the public repository.

### Modernisation
- Fictional legacy in Delphi + PL/SQL, runnable with Free Pascal in Docker; its output is the golden master.
- Rules extracted by an isolated agent session, verified by tests against the running binary.
- Port byte-identical first, then deliberate changes with an “every difference explained” test.

### AI layer
- Thin AI gateway in .NET: small model (Haiku) → large (Opus) only when it can change the outcome, budgets, price per call.
- Structured output with a JSON schema, versioned prompt, statement text as untrusted data.
- Validation in code including ambiguity; confidence threshold 0.90, below it a person decides.
- Record/replay of model answers: tests without an API key, a cache in production and an instant first impression for $0.

### Evals
- Frozen gold set of 300 synthetic payments, 30 % deliberately hard.
- CI gate: precision ≥ 99 % and no matched injection, otherwise a red build.
- The evals and all tests run on recorded answers without an API key; anyone can run them with one command.
- Variance is measured too: three live runs, the same decisions; only the proposal for ties differed, and those go to a person anyway.

### Security
- Reviewed against the OWASP Top 10 for LLM applications.
- MCP server for AI agents with read tools and proposals only: an agent cannot match anything, only propose it to a person.
- Tenant isolation in the data layer (a filter on every table), leak tests with the same ids in two tenants.
- Server-rendered UI without JavaScript, strict CSP; a visitor never triggers the model.

### Operations
- Azure Container Apps (the web app and a scheduled job that runs a few minutes a day), PostgreSQL, Key Vault via managed identity.
- Deployment from GitHub Actions via OIDC without passwords, smoke tests in the pipeline.
- OpenTelemetry with data redaction before export; Aspire dashboard locally, Application Insights in Azure.
- ~400 tests (database tests against real PostgreSQL), CI without an API key.

<!-- blok: karty -->
- **Backend · .NET 10 · ASP.NET Core · EF Core**
- **Data · PostgreSQL · synthetic data with answers**
- **AI · Claude API · Haiku + Opus · MCP**
- **Cloud · Azure Container Apps · Key Vault · App Insights**

## What this means for companies

- **An old system is not an obstacle but a source.** Its rules are years of proven know-how, and AI helps extract them faster than anyone could write them down by hand.
- **Start with the rules and evals, not the model.** First measure how well today’s solution works. Then you know what AI should improve, and you can tell whether it does.
- **Measure how many automatic decisions are right,** not a general “accuracy”. With money, a wrong decision costs more than none.
- **Plan deployment and the first users as separate phases.** Both reveal things no test will find.

A few years ago, a project like this would have taken a team of four to five people four to six months. Today one experienced person with an AI agent can do it in a few days, as long as they know what they want and how to verify it. How to run a gradual modernisation of an old system in general is described in [Modernisation without a big bang](/en/articles/modernizace-bez-velkeho-tresku).

<!-- blok: odkaz -->
[Next project: Job Scout – a smart assistant for your job search →](/en/projects/job-scout)
