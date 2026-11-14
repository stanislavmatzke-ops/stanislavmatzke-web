---
typ: clanek
slug: necti-kazdy-radek
jazyk: en
url: /en/articles/necti-kazdy-radek
titulek: "Don’t read every line: code review in the age of AI agents"
perex: "When AI writes the code, nobody can read it line by line any more. Experienced people are right that AI code has more bugs. They are wrong that the only defence is reading it. Where review is moving, and what stays human."
meta_description: "Code review in the age of AI agents: data on AI code quality, why review by eye doesn’t scale, and how to review by risk – mechanisms for the code, people for intent, criteria and evidence."
oblast: ai-ve-vyvoji
datum_publikace: 2026-11-14
datum_aktualizace:
doba_cteni: 7
og_image: /img/og-default-en.jpg
souvisejici: [co-ai-agent-pokazil, kam-mizi-vyvojarska-prace, modernizace-bez-velkeho-tresku]
cta: { titulek: "Bringing AI into development and wondering how to keep it in check?", text: "Let’s discuss it on a free call." }
stav: publikovano
preklad: [CS: /clanky/necti-kazdy-radek, EN: /en/articles/necti-kazdy-radek]
---

# Don’t read every line: code review in the age of AI agents

*Articles · 14 November 2026 · 7 min read*

When AI writes the code, nobody can read it line by line any more. Experienced people are right that AI code has more bugs. They are wrong that the only defence is reading it. Where review is moving, and what stays human.

I recently talked to an experienced team leader who has been working in .NET for over twenty years. His view was clear: “I understand code far better than any AI. I know why to use native logging instead of a popular library. That’s why I check every line to make it perfect. AI is just guessing.”

He is right about a lot. But on a recent project, where an AI agent wrote over seven thousand lines of application code and five thousand lines of tests in a few days, I asked the question differently. Not “who understands code better”, but “what actually catches the bugs”.

## Where the expert is right

AI code really does have more problems. CodeRabbit compared 470 open-source pull requests. Those with AI involvement had on average 10.83 issues found, human ones 6.45 – about 1.7 times more. AI had more problems with logic, security and performance. People, on the other hand, made more typos and wrote less testable code. Mind the context: CodeRabbit sells AI review, so it has a stake in the result.

<!-- blok: zdroj -->
[CodeRabbit: State of AI vs Human Code Generation ↗](https://www.coderabbit.ai/blog/state-of-ai-vs-human-code-generation-report)

Performance is a weak spot. A model learns from the average code on the internet and reaches for what is popular, not what is best for the case at hand. In the EffiBench benchmark, code from the best model tested was on average 1.69 times slower than the reference human solutions. This is exactly what an experienced person sees: the difference between “it works” and “ideal for this case”.

<!-- blok: zdroj -->
[EffiBench (NeurIPS 2024) ↗](https://huggingface.co/papers/2402.02037)

## Where the expert is wrong

**“AI is just guessing” doesn’t hold for review.** ByteDance runs AI review for more than 12,000 developers a week and, after a two-stage filter, reached 75 % precision of comments. Their data also shows that human comments lead to code changes more often. So AI review is a good first filter, not a replacement for an expert.

<!-- blok: zdroj -->
[BitsAI-CR: Automated Code Review via LLM in Practice ↗](https://arxiv.org/pdf/2501.15134)

**Human review also finds less than we think.** A Microsoft study found that finding defects is the main motivation for review, but review turns out to be less about defects than expected. Its real benefits are knowledge transfer, team awareness and alternative solutions.

<!-- blok: zdroj -->
[Bacchelli & Bird: Expectations, Outcomes, and Challenges of Modern Code Review (ICSE 2013) ↗](https://doi.org/10.1109/ICSE.2013.6606617)

**And an expert doesn’t scale.** Writing code is no longer the bottleneck. Review is, and review by eye doesn’t scale. When an agent produces in a day what a team used to produce in a week, nobody reads it carefully. Either review speeds up to “approved”, or it becomes the brake.

## What caught the bugs in my project

While building [Payment matching with AI](/en/projects/payment-matching), I wrote down every mistake the agent made and what caught it. The result surprised me: **none of the significant bugs was found by reading the code.**

<!-- blok: karty -->
- **An off-by-one error in a rule**  
  caught by a test against the old system’s actual behaviour
- **Validation that let a wrong combination of invoices through**  
  caught by a test that tries every possible answer, not a sample
- **Ties where the code didn’t spot the ambiguity**  
  caught by an eval in CI that turned the build red
- **A prompt that differed by operating system**  
  caught by CI on Linux within a minute
- **A library that logged what it shouldn’t**  
  caught by a test that looks for data in the telemetry

The agent’s code always compiled and looked right at first glance. The bugs only showed up where reading doesn’t reach: on specific data, on another operating system or when tests ran in parallel. A person reading the code easily misses them, because it *looks* right. A mechanism doesn’t. A different kind of mistake – logic not thought through, which tests won’t catch – is described in [What the AI agent got wrong](/en/articles/co-ai-agent-pokazil). There, it was a person using the app who helped.

## Review by risk

I’m not saying code isn’t worth checking. I’m saying **mechanisms check the code, and a person checks the intent, the criteria and the evidence.** In practice:

1. **Line by line only where a lot is at stake:** money, security and permissions, concurrency, the data model, public APIs, prompts and AI guardrails.
2. **Automated gates everywhere else:** analysers with warnings as errors, tests, evals, benchmarks and load tests. Plus an AI reviewer with a checklist, ideally a different model from the one that wrote the code.
3. **A person approves the plan, not the diff:** the brief, architecture decisions, interfaces, the data model and the criteria for “done”. Reviewing a ten-line plan adds more than reading a thousand lines of diff.
4. **Performance isn’t judged by eye, it’s measured.** A load test, a profiler, the number of SQL queries per request. What an expert would “see” can be turned into a number that every build checks.
5. **Turn expert knowledge into rules.** Now and then give a module to a real expert, compare their comments with the AI review, and write what the AI missed into the agent’s rules, an analyser or a checklist. The expert’s experience then guards every line, not just the ones they have time to read.

<!-- blok: ponaučení -->
> **Lesson**
>
> Don’t read every line. Understand the intent and verify the evidence. An expert’s experience is worth most when you turn it into tests, rules and measurements, because those never get tired.

## What this means for companies

For teams bringing AI into development, the most expensive mistake is to leave review unchanged. It either becomes a rubber stamp, or a bottleneck that cancels out the benefit of AI.

Instead, it pays to invest in what replaces review: tests against real behaviour, evals, measurements and clear rules for agents. And to move experienced people to where they are irreplaceable: the brief, the architecture, the risky parts and the question of what “correct” actually means. How this changes a developer’s role is the subject of [Where developer work is going](/en/articles/kam-mizi-vyvojarska-prace).

**An experienced team leader knows better than anyone what to look for and where to focus. He just shouldn’t be looking for it by eye.**
