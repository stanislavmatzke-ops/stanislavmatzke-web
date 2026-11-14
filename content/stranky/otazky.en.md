---
typ: stranka
slug: faq
jazyk: en
url: /en/faq
titulek: "Questions and answers"
perex: "What companies ask most often when they are planning to modernise a system or develop with AI."
meta_description: "Answers to common questions: AI training on your code, company AI, where data goes, modernising Delphi and Oracle, who is responsible for AI-written code, how we work together and costs."
datum_publikace: 2026-11-14
datum_aktualizace:
stav: koncept
preklad: [CS: /otazky, EN: /en/faq]
---

# Questions and answers

What companies ask most often when they are planning to modernise a system or develop with AI.

## Won’t the AI be trained on our code?

No. I only use commercial AI accounts, where under the providers’ terms customer data is not used for training by default. I don’t use personal or free versions of AI tools for client work. Details and links to the providers’ terms are on the [Confidentiality and data protection](/en/confidentiality) page.

## Do we need our own company AI?

No, I bring my own. Each client gets a separate workspace with its own key and spending limit. If you want everything under your control, the model can run in your own Azure in a European region, with the contract with Microsoft in your name.

## Where does our data go?

Only source code and documentation go to AI, never production data such as customers, invoices or personal data. I test on synthetic or anonymised data. The code stays in your repository, and I delete all copies when the engagement ends.

## What if we don’t want any cloud?

It can be done with an open-weight model on your hardware or mine. It is weaker and slower, so the work takes longer and costs more. I will tell you up front so that you can decide.

## Who is responsible for code written by AI?

I am. AI is a tool. I review, test and stand behind every change just as if I had written it by hand. What to watch out for is described in [What the AI agent got wrong](/en/articles/co-ai-agent-pokazil).

## Can an old system be modernised step by step, without a “big bang”?

Yes, and it is usually the better way. First I capture how today’s system behaves, then I move it over piece by piece, and each piece must give the same results as the original. Users keep working in the meantime. The [Payment matching with AI](/en/projects/payment-matching) case study shows what this looks like on a real example from Delphi and Oracle PL/SQL.

## How do we start, and what does the first analysis cost?

We start with a free call about what the system does and what is bothering you. Then I propose the scope of the analysis and a price based on the size of the system. You know the price up front, not after the work is done.

## Do you also work without AI?

Yes, if you want it that way or your rules require it. But to be honest, without AI the work is slower and more expensive. I explain why in [Development speed: what changed in just a few years](/en/articles/rychlost-vyvoje).

## What does AI cost in a running application?

It depends on how much the AI decides. With a good design, the cost of the model is small next to the cost of human work. In [Payment matching with AI](/en/projects/payment-matching) it comes to about $0.36 per 1,000 payments, because the model is called only where it can change something. I will prepare an estimate for your case as part of the analysis.

## How do we work together?

1. A free call: what you have and what you need.
2. A proposal with scope, price and the terms for using AI.
3. Work in phases. At the end of each phase you see the result and decide on the next one.
4. Handover: code in your repository, documentation and recorded decisions.

Didn’t find your question? [Write to me](/en/contact).
