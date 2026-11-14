---
typ: clanek
slug: modernizace-bez-velkeho-tresku
jazyk: en
url: /en/articles/modernizace-bez-velkeho-tresku
titulek: "Modernisation without a big bang: a new engine in the same body"
perex: "An old system in Delphi or Oracle Forms works, it’s just that nobody wants to maintain it any more. Rewriting it in one go is risky and expensive. There is another way: first capture faithfully what the system does, then move it to a new engine piece by piece. And AI changes the maths completely."
meta_description: "How to modernise an old system (Delphi, Oracle, PL/SQL) step by step and without downtime: understanding with AI, a golden master, a faithful port piece by piece, deliberate changes. What AI made cheaper and what stays with people."
oblast: modernizace
datum_publikace: 2026-11-14
datum_aktualizace:
doba_cteni: 5
og_image: /img/og-default-en.jpg
souvisejici: [rychlost-vyvoje, necti-kazdy-radek]
cta: { titulek: "Have a system nobody has touched in years?", text: "Let’s work out what modernising it would cost today. No obligation." }
stav: koncept
preklad: [CS: /clanky/modernizace-bez-velkeho-tresku, EN: /en/articles/modernizace-bez-velkeho-tresku]
---

# Modernisation without a big bang: a new engine in the same body

*Articles · 14 November 2026 · 5 min read*

An old system in Delphi or Oracle Forms works, it’s just that nobody wants to maintain it any more. Rewriting it in one go is risky and expensive. There is another way: first capture faithfully what the system does, then move it to a new engine piece by piece. And AI changes the maths completely.

For fifteen years I worked on enterprise systems in banking, insurance and logistics. Along the way I also worked with Delphi, Oracle PL/SQL and Oracle Forms. Such systems have three things in common. They work. They contain years of business rules that are written down nowhere else. And the people who understand them are getting fewer.

A company then faces an unpleasant choice: keep the system alive as long as possible, or rewrite it from scratch. Both are wrong.

## Why big rewrites so often fail

A greenfield rewrite looks tempting: new technology, clean code, no old debt. In practice it runs into one thing. Nobody knows exactly what the old system does. The documentation is out of date, the rules are hidden in stored procedures and triggers, and some of the behaviour started as a mistake that someone has since come to rely on.

The new system is built next to the old one for months, and on switch-over day it turns out to do something slightly differently. Users notice first.

## A new engine in the same body

Gradual modernisation goes the other way round. At first, nothing changes for users: the same screens, the same results, the same processes. What changes is the engine under the bonnet, piece by piece. Martin Fowler calls it *strangler fig*, after the fig that slowly grows around an old tree until it replaces it.

<!-- blok: zdroj -->
[Martin Fowler: Strangler Fig Application ↗](https://martinfowler.com/bliki/StranglerFigApplication.html)

The approach I use:

<!-- blok: časová osa -->
- **1 – Understand**  
  Write down the business rules straight from the code, edge cases included, and check them with the people who use the system.
- **2 – Capture the behaviour**  
  Run the old system over test data and save its output as a “golden master”: a truth you cannot argue with.
- **3 – Port faithfully**  
  Move one part to the new platform so that it gives the same result over the same data, old bugs included.
- **4 – Change deliberately** <!-- aktuální etapa -->  
  Only now fix and improve. Every difference from the old behaviour is intentional and explained.

The order of steps 3 and 4 matters most. If you start fixing things during the port, you can’t tell whether a difference in the result is a fix or a new bug.

## What AI has changed

This approach isn’t new. What is new is its cost. The most expensive part was always step 1, understanding. Weeks of reading someone else’s code, workshops, digging into why a condition is there. With AI, that ratio flips.

I tried it on a reference project, [Payment matching with AI](/en/projects/payment-matching). An AI agent with no context and no permission to run the code was given a module in Delphi and PL/SQL and asked to write down its rules. It found every one of them, plus seven real bugs that even the author didn’t know about. For example, a database function that cuts off the invoice number, so the payment lands on a different invoice.

But AI isn’t infallible. It got one rule off by one, and only the golden master revealed it. Hence the order of authority: **running code > reading code > documents.** AI is an excellent start to an analysis, but the last word belongs to a test against real behaviour.

AI made steps 2 and 3 cheaper too. In that project, the .NET port was byte-identical to the old module on the very first run, and the whole project, from analysis to deployment, took about two and a half days instead of months. The details are in the case study.

<!-- blok: karty -->
- **Code analysis**  
  days instead of weeks; AI goes through forms, procedures and triggers
- **Tests against the old behaviour**  
  AI writes them and prepares the data; a person decides what matters
- **Porting piece by piece**  
  much cheaper, so even smaller modules are worth it
- **Documentation**  
  written along the way, not left as a debt at the end

## What AI doesn’t speed up

It would be dishonest to claim that modernisation now always takes a few days. The reference project had a deliberately small legacy module and no connection to a real bank or ERP. In a real company, some things stay that no model can speed up:

- **Decisions.** What must behave the same and what can finally change is decided by the business, not by a developer or by AI.
- **Data.** Migrating years of production data has its own rules and its own tests.
- **Integrations.** The systems around the old one often change more slowly than the old system itself.
- **People.** Users need to know what is changing and when. Even if nothing changes on screen, who to call when something doesn’t work does.

That’s why I always start the same way: with a short analysis that tells you what the system does, what is risky and what a migration would cost. For many companies the result is a surprise, because their last estimate was made years ago, when manual analysis cost completely different money. I write about how those numbers have changed in [Development speed: what changed in just a few years](/en/articles/rychlost-vyvoje).

<!-- blok: ponaučení -->
> **Lesson**
>
> First a faithful copy of the behaviour, only then improvements. And the old system isn’t an obstacle but the best specification you have: years of proven rules that AI can now extract faster than anyone could write them down by hand.

## What this means for companies

If you have a system nobody has touched in years because “modernisation is too expensive”, it is worth redoing the estimate. You don’t have to commit to a big rewrite. Start with understanding and one small part, and see how it goes. Nothing changes for users. Only the engine under the bonnet will be new, and there will be someone to maintain it.
