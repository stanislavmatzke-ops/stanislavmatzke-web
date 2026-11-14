---
typ: pripadova-studie
slug: payment-matching
jazyk: en
url: /en/projects/payment-matching
titulek: "Payment matching with AI: from Delphi to an AI-native application"
perex: "With an AI agent, I moved an old Delphi and PL/SQL module to .NET in two and a half days and built AI on top of it that matches the unclear payments. Code checks every answer the model gives, so in testing not a single payment ended up on the wrong invoice. The app runs publicly on synthetic data and the code is open."
meta_description: "Case study: modernising Delphi + PL/SQL to .NET 10 and AI payment matching with validation in code, evals in CI and production on Azure. 100 % correct automatic matches, $0.36 per 1,000 payments, 2.5 days with an AI agent."
og_title: "Payment matching with AI – case study – Stanislav Matzke"
datum_publikace: 2026-11-14
datum_aktualizace:
doba_cteni: 16
og_image: /img/payment-matching-og-en.jpg
souvisejici: [modernizace-bez-velkeho-tresku, necti-kazdy-radek, co-ai-agent-pokazil]
cta: { titulek: "Have an old system you'd like to move forward?", text: "Let’s discuss it on a free call." }
stav: koncept
preklad: [CS: /projekty/parovani-plateb, EN: /en/projects/payment-matching]
---

# Payment matching with AI: from Delphi to an AI-native application

*Case study*

With an AI agent, I moved an old Delphi and PL/SQL module to .NET in two and a half days and built AI on top of it that matches the unclear payments. Code checks every answer the model gives, so in testing not a single payment ended up on the wrong invoice. The app runs publicly on synthetic data and the code is open.

[Try the demo](https://payments.stanislavmatzke.com/demo) · [Source code on GitHub](https://github.com/stanislavmatzke-ops/payment-matching-ai)

![Payment matching – overview of what AI added, a model decision checked by code and eval results](img/payment-matching-cover-en.webp)  
*Illustration of the app – companies, payments and invoices are fictional.*

<!-- blok: fakta -->
- **~2.5 days:** of work by one person with an AI agent
- **100 %:** correct automatic matches (gold set of 300 payments)
- **40 / 40:** prompt injection attempts defended
- **$0.36:** for AI per 1,000 payments

## Why payment matching

Every company that issues invoices has to work out which incoming payment belongs to which invoice. Most payments are simple: the reference number and the amount match. The rest is a mess. A typo in the reference, the invoice number hidden in the message, one payment for three invoices, a parent company paying for its subsidiary, a payment in euros. Every day, those payments land on somebody’s desk.

It is a typical piece of an enterprise system: rules written years ago, money at stake and plenty of edge cases. That makes it a good model for a question many companies are asking today: how to modernise an old system and where AI sensibly fits in.

One rule drove the whole project: **a wrong match is worse than no match.** A person will sort out an unmatched payment. A payment matched to the wrong invoice goes unnoticed until the customer calls.

## The starting point: a module “from 2005”

I didn’t want to show modernisation on a toy, but I can’t use any client’s code. So the project starts with a fictional module in Delphi and Oracle PL/SQL, written the way such things were written around 2005. It really compiles and runs (Free Pascal in Docker). The data is synthetic, from a generator that knows the right answer for every payment.

That made it possible to measure the old system honestly. On both 300 and 1,000 payments it matched about two thirds automatically. But only about 80 % of those were right, and **19 payments out of 1,000 ended up on the wrong invoice**. There was also a domino effect nobody had planned: a wrong match “uses up” an invoice, and the correct payment that arrives later is rejected as a duplicate.

<!-- blok: srovnání -->
- **19 in 1,000** – payments on the wrong invoice in the old module
- **0** – after modernisation and with the AI layer

*Measured against the generator’s correct answers, same data for both systems.*

## AI as a code archaeologist

The first step of any modernisation is understanding what the old system really does. With real legacy code that is often the most expensive part: the documentation is missing and the authors are gone.

I ran a blind test. One agent session wrote the module and planted 11 business rules and two minor quirks in it, with the list kept outside the repository. A second, fully isolated session had no context, no access to the plan and was not allowed to run the code. It got only the source and the task of writing down the rules.

It found all 13, plus **seven real problems nobody had planted**. For example, a 26-character PL/SQL window cuts off the invoice number, so the payment lands on a different invoice. In the PL/SQL version, an empty currency passes as Czech crowns. An unreadable amount becomes zero, and the “partial payment” rule then closes the invoice. The AI was more thorough than the author of the fiction.

It did get one rule off by one, though (a window of 0–14 instead of 0–15). Reading didn’t catch it; a test against the old program’s actual behaviour did. That gives an order of authority that holds for any modernisation: **running code > reading code > documents.**

## Modernisation without drama

The modernisation followed the *strangler fig* pattern: the new system gradually grows around the old one instead of replacing it in one big rewrite.

<!-- blok: časová osa -->
- **1 – Understand**  
  An isolated agent extracts the rules from the code and a human reviews them.
- **2 – Capture the behaviour**  
  The old program’s output over the same data is the “golden master”: a truth you cannot argue with.
- **3 – Port faithfully**  
  The new .NET version must produce byte-identical output, bugs included.
- **4 – Change deliberately** <!-- aktuální etapa -->  
  Only then come the fixes, and every difference from the old behaviour must be explained.

The .NET port was byte-identical to the old module on 1,300 payments on the very first run. A good specification helped, down to details like “read the input as Latin-1”. The golden master also made possible a refactoring everyone fears when money is involved: switching from `double` to `decimal` without a single change in output. Proven, not estimated.

Then came the deliberate fixes. The “every difference must be explained” test caught the agent twice at this point: its difference classifier missed two situations that were in the data. The result of the modernisation: **on the same data, not a single payment ended up on the wrong invoice any more.**

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
  the invoice exists, amounts and currency match, the answer is unambiguous, it is not an injection
- **5 · Person**  
  anything uncertain goes to a queue with a prefilled proposal

The model does not have the last word. When it picks an invoice, code checks that the invoice exists, that the amount fits and that no other combination fits equally well. Only then is anything saved. Text written by the payer is untrusted data for the model, not instructions.

The most valuable lesson of this phase didn’t come from the model, though. Before the real AI was switched on, a “stub” ran: a deterministic stand-in that always takes the first candidate. On its first run it **matched a euro payment to two other invoices of the same customer**, because their sum happened to fit into the exchange-rate band. A test with random answers had passed earlier only by luck. So the agent replaced it with an exhaustive test that tries every combination of candidates as “the model’s answer”. It found 45 holes, and two new rules closed them.

The point: the safety of AI in a product rests not on the model but on validation. And validation is tested against the whole space of possible answers, not a sample.

## Evals: is AI worth it at all?

With AI, “it looks good” is not enough. You need a number that is recalculated after every change. So there is a gold set of 300 payments, 30 % of them deliberately tricky: ties between two identical invoices, invoice numbers in a format the code cannot read, and prompt injection attempts hidden in the payment message. The real model’s answers are recorded and replayed in CI without an API key. **The build fails** as soon as precision drops below 99 % or a single injection is matched.

The first eval run found a hole straight away, and again not in the model but in the validation. It checked that a proposal fits, but not that it is the only one that fits. With the ties, 8 payments went to the wrong invoice. The CI gate turned the build red, and a new rule arrived: if another combination fits too, a person decides. A test is only as good as the data it runs on.

| | Rules only | Rules + code without AI | **Rules + Claude** |
|---|---|---|---|
| Correct automatic matches | 100 % | 100 % | **100 %** |
| Matched without a person | 37.7 % | 53.3 % | **53.3 %** |
| Prompt injections defended (of 40) | 40 | 20 | **40** |
| Cost per 1,000 payments | – | – | **$0.36** |

The table also shows what AI presentations usually leave out. Here, the automation comes from code even without a model: candidate selection and validation do most of the work. The model adds value elsewhere. It recognises every hidden injection attempt (without it, a person would get the attacker’s invoice as a proposal twenty times) and for every unclear payment it writes the reasoning a person decides from. To be honest: **on clean data, AI is unnecessary decoration.** It shows its value only on hostile and ambiguous input, and even there, code holds the line.

Anyone can run the evals themselves with a single command, without an API key and for free.

<!-- blok: zdroj -->
[Full eval report on GitHub ↗](https://github.com/stanislavmatzke-ops/payment-matching-ai/tree/main/evals/reports)

## Cost and operations

AI costs $0.36 per 1,000 payments. A small, cheap model decides most of them. The large one is called only where its answer can change the outcome, and that rule alone cut its calls from 39 to 4. You can see it in the audit trail of a [sample payment in the demo](https://payments.stanislavmatzke.com/demo/payments/P0016): the small model was not sure, the large one matched a payment with two swapped digits in the reference with confidence 0.93, and code checked the answer. It cost about a cent.

The public app has one hard rule: **a visitor never triggers the model.** AI runs in a scheduled morning job with three budgets, and answers are cached. So the cost does not depend on how many people sign in. Hosting on Azure costs a few dollars a month, and AI in production fits into a budget of $0.50 a month.

For a company, the comparison with manual work is more interesting. Assuming 1.5 minutes per payment and a fully loaded cost of CZK 600 per hour, matching 1,000 payments by hand takes about 25 hours. With rules and AI, a person is left with less than half of the payments, each with a prefilled proposal. The model’s cost is negligible next to that. But the main benefit is elsewhere: in testing, not a single payment on the wrong invoice.

## What only deployment and the first user revealed

Deployment is a phase of its own, with its own bugs. Azure produced four that no test could have caught. The new database had a schema owned by someone else, so the first migration failed. Rotating a password in Key Vault silently broke the running app, which kept the old value. Telemetry turned on sampling by itself and dropped the only trace of a short job. And GitHub had meanwhile changed the identity format used for passwordless sign-in. The agent diagnosed them from logs and fixed them in the scripts and configuration.

The last hole showed up only while preparing to publish the code. The deployment pipeline ran after a green CI on the `main` branch, but it checked only the branch *name*, not where the code came from. Anyone could have copied the repository, named their branch `main`, opened a pull request, and their code would have been deployed to production, along with access to the app’s secrets. In a private repository the problem does not exist, so no test could have found it. The pipeline now deploys only code from its own repository. The lesson: **CI/CD is code with the same rights as production**, and a green build says nothing about whose code passed.

Then I used the app for an hour as an ordinary user and found things no test would find. A new user saw AI payments as “waiting for AI” until the next morning. That was a direct consequence of a security rule, so the fix had to keep it: a scheduled job now precomputes the starter data, and sign-in reads the AI decisions from the cache without a single model call.

The second finding: a person in the queue saw the proposal, but not the invoice next to the payment. They had nothing to decide from and were just clicking. *Human in the loop* only works when the person sees both sides and the difference between them. In addition, any match made by AI can now be undone with one click. The dashboard shows how many of them people left in place, which gives a second, operational quality signal next to the evals: AI precision as people see it.

## How it was built with an agent

The code, tests, infrastructure and documentation were written by an AI agent (Claude Code). I was the architect, the client and the reviewer. The work took about two and a half days:

<!-- blok: časová osa -->
- **Half a day – Brief**  
  Analysis, goals, a plan and an empty repo with just a specification (SPEC), a plan (PLAN) and rules for the agent.
- **1 day – Development**  
  Phase by phase: legacy and golden master, rule extraction, faithful port, AI layer, evals and gold set, first prototype.
- **1 day – Finishing and operations** <!-- aktuální etapa -->  
  Tests and evals, refactoring, user testing and changes based on it, smoke tests, deployment to Azure, publishing the repo.

Every phase ran the same way, mostly in a fresh agent session that knew only the specification, the plan and the recorded decisions. The agent read them and proposed an approach. I approved or adjusted it. The agent implemented it with tests and stopped to show the result. **I approved plans, not diffs.** Reviewing a ten-line plan is where a human adds the most. The tests review the diff.

The agent made mistakes, which is normal. It didn’t send code that wouldn’t compile, but code that was plausible and wrong in ways that only data, another operating system or a parallel run would show. Every such mistake was caught by a mechanism: the golden master, an exhaustive test, the eval gate, CI on Linux. None of them reached production. I described similar experiences in [What the AI agent got wrong](/en/articles/co-ai-agent-pokazil).

### How big the project is

So that “two and a half days” isn’t just a number: the application code is roughly 7,900 lines of C#, plus 1,800 lines of UI, 5,300 lines of tests (401 tests), 700 lines of infrastructure and CI/CD, and about 40,000 words of documentation with 18 recorded decisions. The gold set has 300 hand-checked payments.

<!-- blok: srovnání -->
- **4–6 months** – a team of 4–5 people without AI (my estimate, ~70–115 person-weeks)
- **~2.5 days** – one experienced person with an AI agent

*The estimate is more of a lower bound: the legacy here is a small fiction (650 lines), and the project has no connection to a real bank or ERP. With a real system, the analysis would take longer.*

Adding people wouldn’t shorten a team’s calendar either. Analysing the old system, reviewing the gold set and making business decisions can’t be split across more heads. That is exactly where AI sped things up most: the agent prepared the groundwork in hours, and what was left for me was the decisions.

My role was elsewhere: what we build and why, what “correct” means, and everything that costs money or changes infrastructure. Every paid model call and every change in Azure needed my explicit “yes”. And a few things came from judgement, not code. The agent carefully limited the number of AI calls per sandbox, but so strictly that new users waited days for the AI. The real protection against a runaway bill is the global cap and the number of new accounts per day. The per-sandbox limit only slowed people down. That call was mine to make.

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

A few years ago, a project like this would have taken **a team of four to five people four to six months**, from analysing the old system through development and testing to deployment. Today one experienced person with an AI agent can do it in a few days, as long as they know what they want and how to verify it. I write more about how development speed has changed in [Development speed: what changed in just a few years](/en/articles/rychlost-vyvoje), and about where this moves a developer’s work in [Where developer work is going](/en/articles/kam-mizi-vyvojarska-prace).

<!-- blok: odkaz -->
[Next project: Job Scout – a smart assistant for your job search →](/en/projects/job-scout)
