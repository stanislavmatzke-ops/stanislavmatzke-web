---
typ: stranka
slug: confidentiality
jazyk: en
url: /en/confidentiality
titulek: "Confidentiality and data protection"
perex: "How I handle your code and data when I use AI in development. In short: you don’t need your own company AI, only code goes to AI, never your customers’ data, and it is all in the contract."
meta_description: "How I handle client code and data when developing with AI: commercial AI accounts only, no training on your data, only code goes to AI, test data, a contract, and the option to run in your own Azure in the EU."
datum_publikace: 2026-11-14
datum_aktualizace:
stav: publikovano
preklad: [CS: /duvernost, EN: /en/confidentiality]
---

# Confidentiality and data protection

How I handle your code and data when I use AI in development. In short: you don’t need your own company AI, only code goes to AI, never your customers’ data, and it is all in the contract.

The question I hear most often: “Won’t the AI learn from our code? And where does it actually go?” It is the right question. Here is how I have it set up.

## Commercial AI only, never a personal subscription

For client work I only use commercial access to AI: an API account with the model provider, or models through Microsoft Azure. Under their terms, these providers do not use customer data to train their models by default. Personal and free versions of AI tools, where this depends on the user’s settings, are not used for client work.

<!-- blok: zdroj -->
[Anthropic: use of data from commercial products ↗](https://privacy.claude.com/en/articles/7996868-is-my-data-used-for-training)

<!-- blok: zdroj -->
[Microsoft: data and privacy in Azure OpenAI / Foundry ↗](https://learn.microsoft.com/en-us/azure/foundry/responsible-ai/openai/data-privacy)

I attach the provider’s current terms to my proposal, so it is clear what we are agreeing to.

## You don’t need your own company AI – I bring mine

Like a craftsman who brings his own tools. You have two options:

<!-- blok: karty -->
- **1 · My commercial account (default)**  
  A separate workspace for each client with its own key and spending limit. I can document usage exactly, and the key is revoked when the engagement ends.
- **2 · Your own Azure**  
  For the cautious: the model runs in your Azure subscription in a European region. You hold the contract with Microsoft, neither the code nor any data leaves your tenant, and when we are done you simply remove my access. It also becomes the foundation of your own company AI.

## Only code goes to AI, never your customers’ data

- AI sees source code, documentation and test data. Never production data: customers, invoices or personal data.
- I test on synthetic or anonymised data. An example is [Payment matching with AI](/en/projects/payment-matching), where all data is generated.
- I work on a copy of the code. The code stays in your repository.
- AI never gets keys or passwords, and they never get into the repository. An automatic check in CI makes sure of it.

## What goes into the contract

- A non-disclosure agreement (NDA) and, where personal data is involved, a data processing agreement (DPA).
- The list of AI tools I will use and their terms.
- Where data is processed (a European region in the option with your own Azure).
- Deletion of all copies when the engagement ends, confirmed in writing.

## If you don’t want any cloud at all

It can be done without the cloud: an open-weight model running on your hardware or mine. It works, but it is weaker and slower, which shows in the price and the timeline. I will tell you up front, not halfway through.

## I stand behind the result

AI is a tool, not the author. I review, test and take responsibility for every change the agent makes. Code, architecture and recommendations are my responsibility. I describe what this looks like in practice, and what AI can get wrong, in [What the AI agent got wrong](/en/articles/co-ai-agent-pokazil).

## How the texts on this website are written

I write the articles and case studies with the help of AI. The experience, numbers and conclusions are mine: they come from my own projects, and I check them before publishing. Numbers from other sources come with a link.

## Questions

You will find more answers in [Questions and answers](/en/faq). And if you are dealing with a specific situation, let’s discuss it on a free call.
