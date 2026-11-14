---
typ: pripadova-studie
slug: job-scout
jazyk: en
url: /en/projects/job-scout
titulek: "Job Scout: a smart assistant for your job search"
perex: "A complete web application that reviews new job offers every morning, scores them against your CV, drafts cover letters for the best ones and sends a summary by e-mail. AI pre-selects, a human decides."
meta_description: "A smart assistant for your job search: offers scored against your CV, cover letter drafts, a morning e-mail. .NET 10, Angular, Claude API, Azure. One person with AI in ~3 days."
og_title: "Job Scout – case study – Stanislav Matzke"
datum_publikace: 2026-10-13
datum_aktualizace:
doba_cteni: 
og_image: /img/job-scout-og-en.jpg
souvisejici: [co-ai-agent-pokazil]
cta: { titulek: "Want to know what AI could do with your system?", text: "Let’s discuss it on a free call." }
stav: publikovano
preklad: [CS: /projekty/job-scout, EN: /en/projects/job-scout]
zrcadleno_z_webu: 2026-11-14
---

# Job Scout: a smart assistant for your job search

*Case study*

A complete web application that reviews new job offers every morning, scores them against your CV, drafts cover letters for the best ones and sends a summary by e-mail. AI pre-selects, a human decides.

[Try it without signing up](https://jobscout.stanislavmatzke.com) · [Source code on GitHub](https://github.com/stanislavmatzke-ops/job-scout)

![Job Scout – offers scored against a CV, Microsoft and Google sign-in, morning e-mail and AI costs](img/job-scout-cover.webp)  
*Illustration of the app – companies and offers are fictional.*

<!-- blok: fakta -->
- **~3 days:** of intensive work with an AI agent
- **2–3 months:** estimate for a team of three without AI
- **600+:** automated tests
- **21:** recorded architecture decisions

## Why it exists

Everyone knows job hunting: dozens of portals, hundreds of ads and hours of reading before you find the few offers that really fit. I wanted to show that with AI you can quickly build an application that does this work for you – while meeting everything expected of a real product: sign-in, multiple users, data protection, cost control and cloud operations.

It runs in production, I use it every day, and anyone can try it – without signing up, on a demo account with real current job offers.

## How it works

<!-- blok: časová osa -->
- **1 – Sign-in**  
  With a Microsoft or Google account – no new passwords.
- **2 – Your CV**  
  Upload a CV and a few notes (“fully remote, no Java”). AI builds your profile from them.
- **3 – Search every morning**  
  At 6:30 only new offers are fetched; a cheap model triages titles, a stronger one scores the rest 1–10.
- **4 – Letter and e-mail** <!-- aktuální etapa -->  
  Cover letter drafts for the best offers, a morning summary by e-mail. Nothing is ever sent automatically.

## Under the hood – for developers

For those who want to know how it is built. All decisions, including rejected alternatives, are recorded as ADRs in the public repository.

### Sign-in and access

- OpenID Connect with Microsoft and Google, no own passwords.
- BFF pattern: the browser never sees a token, only an HttpOnly / Secure / __Host- cookie; CSRF protection.
- Access by admin approval, one-link invitations; permissions are read from the database on every request.

### AI you can steer and afford

- A pipeline instead of one expensive call: a cheap model (Haiku) triages in batches, a stronger one (Sonnet) scores and writes letters.
- Structured output with a JSON schema and validation – AI output is never trusted blindly; CVs and ads are untrusted data for the model.
- Every call is recorded with tokens and price; per-click limits (rolling 24 h) and an emergency brake for the whole app.
- Own narrow LLM port – the model is switched in configuration, the app does not know the vendor SDK.

### Cloud and operations

- The whole environment as code (Bicep), deployed with one script.
- One Docker image (Angular + API + worker + headless Chromium) from GitHub Actions; Azure Container Apps + a Container Apps Job for the morning run.
- Secrets only in Key Vault via managed identity; PostgreSQL, data in the EU; e-mails via Azure Communication Services with SPF and DKIM.

### Quality and security

- 600+ automated tests (533 .NET + 85 Angular) with no network and no AI calls; architecture tests guard the layers.
- CI on every commit, CodeQL, Dependabot, vulnerable package checks, security headers, rate limiting.
- A modular monolith with ports and adapters; 21 ADRs public on GitHub.

<!-- blok: karty -->
- **Backend · .NET 10 · ASP.NET Core · EF Core**
- **Frontend · Angular 21 · signals · CZ / EN**
- **AI · Claude API · Haiku + Sonnet**
- **Cloud · Azure Container Apps · PostgreSQL · Key Vault**

<!-- blok: odkaz -->
[What the agent got wrong and how I found out →](/en/articles/co-ai-agent-pokazil)

<!-- blok: CTA pás -->
> Want to know what AI could do with your system?  
> Let’s discuss it on a free call.
>
> [Book a free call](/en/contact)
