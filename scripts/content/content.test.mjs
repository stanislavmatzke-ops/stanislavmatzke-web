// Tests of the content conversion (npm test). Plain node:test, no dependencies.
import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { after, describe, test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { feedXml, generatedTs, sitemapXml, staticWebAppConfig } from './emit.mjs';
import { loadContent } from './load.mjs';
import { parseBody, parseHeader, parseValue } from './markdown.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const paths = JSON.parse(readFileSync(join(root, 'src/app/i18n/paths.json'), 'utf8'));

/** Parses a body; returns { out, errors }. */
function body(md, { type = 'clanek', perex = 'Perex.' } = {}) {
  const errors = [];
  const out = parseBody(md.split('\n'), 1, { type, perex, err: (line, message) => errors.push({ line, message }) });
  return { out, errors };
}

describe('header', () => {
  test('values', () => {
    assert.equal(parseValue('"Text, s čárkou – a \\"uvozovkami\\""'), 'Text, s čárkou – a "uvozovkami"');
    assert.equal(parseValue('7'), 7);
    assert.equal(parseValue(''), null);
    assert.equal(parseValue('ai-ve-vyvoji'), 'ai-ve-vyvoji');
    assert.deepEqual(parseValue('[a, b-c]'), ['a', 'b-c']);
    assert.deepEqual(parseValue('[CS: /clanky/x, EN: /en/articles/x]'), { CS: '/clanky/x', EN: '/en/articles/x' });
    assert.deepEqual(parseValue('{ titulek: "A, b", text: "C." }'), { titulek: 'A, b', text: 'C.' });
    assert.throws(() => parseValue('"neuzavřené'), /not closed/);
  });

  test('line numbers and errors', () => {
    const { header, lines, bodyStart, errors } = parseHeader(['---', 'typ: clanek', 'datum_aktualizace:', 'bad line', '---', '# T']);
    assert.equal(header.typ, 'clanek');
    assert.equal(header.datum_aktualizace, null);
    assert.equal(lines.typ, 2);
    assert.equal(bodyStart, 5);
    assert.deepEqual(errors.map((e) => e.line), [4]);
  });
});

describe('body', () => {
  test('skips title, eyebrow and perex; headings, paragraphs and lists', () => {
    const { out, errors } = body(`# Titulek

*Články · Říjen 2026*

Perex.

## Nadpis
Odstavec **tučně** a [odkaz](/clanky/x)
na dva řádky.

- a
- b
  pokračování
### Menší
1. jedna
2. dvě`);
    assert.deepEqual(errors, []);
    assert.deepEqual(out.blocks, [
      { kind: 'h2', text: 'Nadpis' },
      { kind: 'p', text: 'Odstavec **tučně** a [odkaz](/clanky/x) na dva řádky.' },
      { kind: 'ul', items: ['a', 'b pokračování'] },
      { kind: 'h3', text: 'Menší' },
      { kind: 'ol', items: ['jedna', 'dvě'] },
    ]);
  });

  test('timeline with the highlighted stage', () => {
    const { out, errors } = body(`<!-- blok: časová osa -->
- **2011–2022 – Řádek po řádku**
  Text jedna.
- **Dnes – Agenti** <!-- aktuální etapa -->
  Text dvě.`);
    assert.deepEqual(errors, []);
    assert.deepEqual(out.blocks[0].entries, [
      { label: '2011–2022', title: 'Řádek po řádku', text: 'Text jedna.' },
      { label: 'Dnes', title: 'Agenti', text: 'Text dvě.', current: true },
    ]);
  });

  test('comparison with its note, cards, facts, lesson, source, link', () => {
    const { out, errors } = body(`<!-- blok: srovnání -->
- **19 z 1 000** – před
- **0** – po

*Poznámka.*

<!-- blok: karty -->
- **Backend · .NET 10 · EF Core**
- **Jen titulek**
  text karty

<!-- blok: fakta -->
- **Chyba:** popis

<!-- blok: ponaučení -->
> **Ponaučení**
>
> Text poučení.

<!-- blok: zdroj -->
[Zdroj ↗](https://example.com/a)

<!-- blok: odkaz -->
[Další →](/projekty/job-scout)

<!-- blok: CTA pás -->
> Ignoruje se.`);
    assert.deepEqual(errors, []);
    assert.deepEqual(out.blocks, [
      { kind: 'compare', entries: [{ label: '19 z 1 000', title: 'před' }, { label: '0', title: 'po' }], text: 'Poznámka.' },
      { kind: 'cards', entries: [{ label: 'Backend', title: '.NET 10 · EF Core' }, { title: 'Jen titulek', text: 'text karty' }] },
      { kind: 'facts', entries: [{ title: 'Chyba', text: 'popis' }] },
      { kind: 'lesson', text: 'Text poučení.' },
      { kind: 'source', text: 'Zdroj', href: 'https://example.com/a' },
      { kind: 'link', text: 'Další →', href: '/projekty/job-scout' },
    ]);
  });

  test('project box, image with caption, table', () => {
    const { out, errors } = body(`<!-- blok: projekt -->
> ![Alt](img/a.webp)
>
> **O projektu**
>
> Text.
>
> - fakt
>
> [Studie →](/projekty/job-scout)

![Popis](img/b.webp)
*Popisek.*

| | A | **B** |
|---|---|---|
| Řádek | 1 | **2** |`);
    assert.deepEqual(errors, []);
    assert.deepEqual(out.blocks, [
      { kind: 'project', src: 'img/a.webp', alt: 'Alt', caption: 'O projektu', text: 'Text.', items: ['fakt'], href: '/projekty/job-scout', label: 'Studie →' },
      { kind: 'image', src: 'img/b.webp', alt: 'Popis', caption: 'Popisek.' },
      { kind: 'table', head: ['', 'A', '**B**'], rows: [['Řádek', '1', '**2**']] },
    ]);
  });

  test('case study: buttons, main image and stats', () => {
    const { out, errors } = body(
      `# T

*Případová studie*

Perex.

[Demo](https://a.example) · [GitHub](https://b.example)

![Hlavní](img/c.webp)
*Popisek.*

<!-- blok: fakta -->
- **~3 dny:** práce

## Dál

<!-- blok: fakta -->
- **Druhá:** fakta jsou blok`,
      { type: 'pripadova-studie' },
    );
    assert.deepEqual(errors, []);
    assert.deepEqual(out.buttons, [
      { text: 'Demo', href: 'https://a.example' },
      { text: 'GitHub', href: 'https://b.example' },
    ]);
    assert.deepEqual(out.image, { src: 'img/c.webp', alt: 'Hlavní', caption: 'Popisek.' });
    assert.deepEqual(out.stats, [{ title: '~3 dny', text: 'práce' }]);
    assert.deepEqual(out.blocks.map((b) => b.kind), ['h2', 'facts']);
  });

  test('errors carry the line number', () => {
    const cases = [
      ['<!-- blok: neznámý -->\ntext', 1, /unknown block "neznámý"/],
      ['text\n\n<!-- blok: časová osa -->\n- **bez pomlčky**', 4, /timeline item/],
      ['<!-- blok: srovnání -->\n- **1** – jen jedna', 2, /exactly 2 items/],
      ['<!-- blok: ponaučení -->\n> bez popisku', 2, /lesson quote must start/],
      ['<!-- blok: zdroj -->\n[bez https](/clanky/x)', 2, /source must be/],
      ['<!-- blok: fakta -->\n\n## Nadpis', 1, /must be followed by its block/],
      ['<!-- jiný komentář -->', 1, /unknown HTML comment/],
      ['| a | b |\n| c | d |', 1, /separator row/],
    ];
    for (const [md, line, re] of cases) {
      const { errors } = body(md);
      assert.ok(errors.length, `no error for: ${md}`);
      assert.equal(errors[0].line, line, md);
      assert.match(errors[0].message, re);
    }
  });
});

describe('content folder', () => {
  const tmp = mkdtempSync(join(tmpdir(), 'content-test-'));
  after(() => rmSync(tmp, { recursive: true, force: true }));

  const head = (o) => `---\n${Object.entries(o).map(([k, v]) => `${k}: ${v}`).join('\n')}\n---\n`;
  const article = (lang, extra = {}) =>
    head({
      typ: 'clanek',
      slug: 'a',
      jazyk: lang,
      url: lang === 'en' ? '/en/articles/a' : '/clanky/a',
      titulek: '"Titulek"',
      perex: '"Perex."',
      meta_description: '"Popis."',
      oblast: 'ai-ve-vyvoji',
      datum_publikace: '2026-10-13',
      datum_aktualizace: '2026-11-01',
      doba_cteni: 6,
      og_image: '/img/og.jpg',
      souvisejici: '[]',
      stav: 'publikovano',
      preklad: '[CS: /clanky/a, EN: /en/articles/a]',
      ...extra,
    }) + '\n# Titulek\n\nPerex.\n\nText s [odkazem](' + (lang === 'en' ? '/en/faq' : '/otazky') + ').\n';

  function site(files) {
    const dir = mkdtempSync(join(tmp, 'site-'));
    const write = (rel, text) => {
      mkdirSync(dirname(join(dir, rel)), { recursive: true });
      writeFileSync(join(dir, rel), text);
    };
    write('public/img/og.jpg', 'x');
    write(
      'content/stranky/oblasti.md',
      '---\ntyp: oblasti\n---\n\n| Pořadí | slug (CZ) | slug (EN) | Název CZ | Název EN | Úvod CZ | Úvod EN |\n|---|---|---|---|---|---|---|\n| 1 | `ai-ve-vyvoji` | `ai-in-development` | AI ve vývoji | AI in development | Úvod. | Intro. |\n| 2 | `prazdna` | `empty` | Prázdná | Empty | Úvod. | Intro. |\n',
    );
    for (const [rel, text] of Object.entries(files)) write(rel, text);
    return (includeDrafts = true) => loadContent({ root: dir, contentDir: join(dir, 'content'), publicDir: join(dir, 'public'), paths, includeDrafts });
  }

  const page = (lang, stav = 'publikovano') =>
    head({
      typ: 'stranka',
      slug: lang === 'en' ? 'faq' : 'otazky',
      jazyk: lang,
      url: lang === 'en' ? '/en/faq' : '/otazky',
      titulek: '"Otázky"',
      perex: '"Perex."',
      meta_description: '"Popis."',
      datum_publikace: '2026-11-14',
      stav,
      preklad: '[CS: /otazky, EN: /en/faq]',
    }) + '\n# Otázky\n\nPerex.\n\n## Otázka?\n\nOdpověď.\n';

  test('valid content → model, sitemap, feed, rewrites', () => {
    const load = site({
      'content/clanky/a.md': article('cs'),
      'content/clanky/a.en.md': article('en'),
      'content/stranky/otazky.md': page('cs'),
      'content/stranky/otazky.en.md': page('en'),
    });
    const { model, problems } = load();
    assert.deepEqual(problems, []);
    assert.equal(model.articles.cs[0].updated, '2026-11-01');
    assert.equal(model.articles.en[0].readMinutes, 6);
    assert.deepEqual(Object.keys(model.pages), ['faq']);

    const sitemap = sitemapXml(model, paths);
    assert.match(sitemap, /<loc>https:\/\/stanislavmatzke\.com\/clanky\/a<\/loc>\n {4}<lastmod>2026-11-01<\/lastmod>/);
    assert.match(sitemap, /hreflang="en" href="https:\/\/stanislavmatzke\.com\/en\/articles\/topic\/ai-in-development"/);
    assert.doesNotMatch(sitemap, /prazdna|confidentiality/, 'an empty area and a missing page are not in the sitemap');

    const feed = feedXml(model, paths, 'en');
    assert.match(feed, /<link>https:\/\/stanislavmatzke\.com\/en\/articles\/a<\/link>/);
    assert.match(feed, /<pubDate>Tue, 13 Oct 2026 00:00:00 GMT<\/pubDate>/);

    const swa = JSON.parse(staticWebAppConfig({ routes: [{ route: '/img/*' }] }, model, paths));
    assert.deepEqual(swa.routes.at(0), { route: '/en', rewrite: '/en/index.html' });
    assert.ok(swa.routes.some((r) => r.route === '/en/faq' && r.rewrite === '/en/faq/index.html'));
    assert.deepEqual(swa.routes.at(-1), { route: '/img/*' });

    // Texts are split into their own modules (loaded per page), the main file keeps only metadata.
    const ts = generatedTs(model);
    assert.deepEqual(Object.keys(ts).sort(), ['bodies/article-cs-a.ts', 'bodies/article-en-a.ts', 'bodies/page-cs-faq.ts', 'bodies/page-en-faq.ts', 'content.generated.ts']);
    assert.doesNotMatch(ts['content.generated.ts'], /"blocks"/);
    assert.ok(ts['content.generated.ts'].includes("'article:cs:a': () => import('./bodies/article-cs-a')"));
    assert.match(ts['bodies/page-en-faq.ts'], /"kind": "h2"/);
  });

  test('drafts are left out of the production build, and links to them fail', () => {
    const load = site({
      'content/clanky/a.md': article('cs'),
      'content/clanky/a.en.md': article('en'),
      'content/stranky/otazky.md': page('cs', 'koncept'),
      'content/stranky/otazky.en.md': page('en'),
    });
    assert.deepEqual(load(true).problems, []);
    const prod = load(false);
    assert.equal(prod.model.pages.faq, undefined);
    assert.ok(prod.problems.some((p) => /content\/clanky\/a\.md:\d+: link to \/otazky: no such page \(it is a draft/.test(p)), prod.problems.join('\n'));
  });

  test('header problems name the file and line', () => {
    const load = site({
      'content/clanky/a.md': article('cs', { oblast: 'neexistuje', doba_cteni: 'šest', navic: 'x' }),
      'content/clanky/a.en.md': article('en', { souvisejici: '[chybi]' }),
    });
    const { problems } = load();
    assert.ok(problems.some((p) => /^content\/clanky\/a\.md:\d+: unknown header field "navic"/.test(p)), problems.join('\n'));
    assert.ok(problems.some((p) => /^content\/clanky\/a\.md:\d+: "doba_cteni" must be a whole number/.test(p)), problems.join('\n'));
  });

  test('a hidden page is prerendered and rewritten but not in the sitemap; mailto: and tel: links are allowed', () => {
    const hidden = (lang) =>
      head({
        typ: 'stranka',
        slug: lang === 'en' ? 'for-employers' : 'pro-zamestnavatele',
        jazyk: lang,
        url: lang === 'en' ? '/en/for-employers' : '/pro-zamestnavatele',
        titulek: '"Pro zaměstnavatele"',
        perex: '"Perex."',
        meta_description: '"Popis."',
        datum_publikace: '2026-11-14',
        skryta: 'true          # mimo menu',
        zmeneno_editorem: '2026-11-14',
        stav: 'publikovano',
        preklad: '[CS: /pro-zamestnavatele, EN: /en/for-employers]',
      }) + '\n# Pro zaměstnavatele\n\nPerex.\n\n[E-mail](mailto:kontakt@example.com) · [Telefon](tel:+420123456789)\n';
    const { model, problems } = site({
      'content/stranky/pro-zamestnavatele.md': hidden('cs'),
      'content/stranky/pro-zamestnavatele.en.md': hidden('en'),
    })();
    assert.deepEqual(problems, []);
    assert.equal(model.pages.forEmployers.cs.hidden, true);
    assert.doesNotMatch(sitemapXml(model, paths), /zamestnavatele|employers/);
    const swa = JSON.parse(staticWebAppConfig({ routes: [] }, model, paths));
    assert.ok(swa.routes.some((r) => r.route === '/pro-zamestnavatele'));
    assert.ok(swa.routes.some((r) => r.route === '/en/for-employers'));
  });

  test('a missing translation is an error', () => {
    const { problems } = site({ 'content/clanky/a.md': article('cs') })();
    assert.ok(problems.some((p) => /English version \(\/en\/articles\/a\) is missing/.test(p)), problems.join('\n'));
  });

  test('the real content/ folder converts without problems, with and without drafts', () => {
    for (const includeDrafts of [true, false]) {
      const { problems } = loadContent({ root, contentDir: join(root, 'content'), publicDir: join(root, 'public'), paths, includeDrafts });
      assert.deepEqual(problems, []);
    }
  });
});
