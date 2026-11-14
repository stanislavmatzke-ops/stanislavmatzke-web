---
typ: stranka
slug: duvernost
jazyk: cs
url: /duvernost
titulek: "Důvěrnost a ochrana dat"
perex: "Jak pracuji s vaším kódem a daty, když při vývoji používám AI. Krátce: firemní AI mít nemusíte, k AI jde jen kód, nikdy data vašich zákazníků, a všechno je ve smlouvě."
meta_description: "Jak pracuji s kódem a daty klienta při vývoji s AI: jen komerční AI účty bez trénování na datech, k AI jde jen kód, testovací data, smlouva, možnost provozu ve vašem Azure v EU."
datum_publikace: 2026-11-14
datum_aktualizace:
stav: publikovano
preklad: [CS: /duvernost, EN: /en/confidentiality]
---

# Důvěrnost a ochrana dat

Jak pracuji s vaším kódem a daty, když při vývoji používám AI. Krátce: firemní AI mít nemusíte, k AI jde jen kód, nikdy data vašich zákazníků, a všechno je ve smlouvě.

Nejčastější otázka, kterou slyším: „Nebude se AI učit na našem kódu? A kam to vlastně odchází?“ Je to správná otázka. Tady je, jak to mám nastavené.

## Jen komerční AI, nikdy osobní předplatné

Na zakázky používám výhradně komerční přístup k AI: API účet u poskytovatele modelu, případně modely přes Microsoft Azure. U těchto služeb poskytovatelé podle svých podmínek data zákazníků ve výchozím nastavení k trénování modelů nepoužívají. Osobní a bezplatné verze AI nástrojů, kde o tom rozhoduje nastavení uživatele, na práci pro klienty nepoužívám.

<!-- blok: zdroj -->
[Anthropic: použití dat z komerčních produktů ↗](https://privacy.claude.com/en/articles/7996868-is-my-data-used-for-training)

<!-- blok: zdroj -->
[Microsoft: data a soukromí v Azure OpenAI / Foundry ↗](https://learn.microsoft.com/en-us/azure/foundry/responsible-ai/openai/data-privacy)

Aktuální podmínky poskytovatele přikládám k nabídce, aby bylo jasné, na čem se dohodneme.

## Firemní AI mít nemusíte, přinesu si ji

Jako řemeslník, který si nosí vlastní nářadí. Máte dvě možnosti:

<!-- blok: karty -->
- **1 · Můj komerční účet (výchozí)**  
  Pro každého klienta samostatný pracovní prostor s vlastním klíčem a limitem útraty. Spotřebu přesně doložím a po skončení zakázky klíč zruším.
- **2 · Váš vlastní Azure**  
  Pro opatrné: model běží ve vašem předplatném Azure v evropském regionu. Smlouvu s Microsoftem máte vy, kód ani případná data neopustí váš tenant a po skončení mi jen odeberete přístup. Zároveň je to základ vaší vlastní firemní AI.

## K AI jde jen kód, nikdy data vašich zákazníků

- AI vidí zdrojový kód, dokumentaci a testovací data. Nikdy produkční data: zákazníky, faktury ani osobní údaje.
- Testuji na syntetických nebo anonymizovaných datech. Ukázkou je [Párování plateb s AI](/projekty/parovani-plateb), kde jsou všechna data generovaná.
- Pracuji na kopii kódu. Kód zůstává ve vašem repozitáři.
- Klíče a hesla AI nikdy nedostane a do repozitáře se nedostanou. Hlídá to automatická kontrola v CI.

## Co je ve smlouvě

- Dohoda o mlčenlivosti (NDA), u osobních údajů smlouva o zpracování (DPA).
- Seznam AI nástrojů, které použiju, a jejich podmínky.
- Kde se data zpracovávají (u varianty s vaším Azure evropský region).
- Smazání všech kopií po skončení zakázky, potvrzené písemně.

## Když nechcete žádný cloud

Jde to i bez cloudu: model s otevřenými vahami poběží na vašem nebo mém hardwaru. Funguje, ale je slabší a pomalejší, což se promítne do ceny a termínu. Řeknu vám to předem, ne až v průběhu.

## Za výsledek ručím já

AI je nástroj, ne autor. Každou změnu, kterou agent udělá, projdu, otestuji a ručím za ni. Kód, architektura a doporučení jsou moje odpovědnost. Jak to vypadá v praxi a co AI dokáže pokazit, jsem popsal v článku [Co AI agent při vývoji pokazil](/clanky/co-ai-agent-pokazil).

## Jak vznikají texty na tomto webu

Články a případové studie píšu s pomocí AI. Zkušenosti, čísla a závěry jsou moje: pocházejí z mých projektů a před zveřejněním je ověřuji. Čísla z cizích zdrojů uvádím s odkazem.

## Otázky

Další odpovědi najdete v sekci [Otázky a odpovědi](/otazky). A pokud řešíte konkrétní situaci, probereme ji na nezávazném hovoru.
