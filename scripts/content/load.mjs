// Reads content/**/*.md, checks it and builds the data model the web is generated from.
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { parseBody, parseHeader } from './markdown.mjs';
import { DRAFT_STATES, FOLDERS, checkHeader } from './schema.mjs';

/** Collects errors as "file:line: message"; the build fails if there are any. */
export class Problems {
  list = [];
  add(file, line, message) {
    this.list.push(`${file}:${line}: ${message}`);
  }
  for(file) {
    return (line, message) => this.add(file, line, message);
  }
}

const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;

/**
 * @param {{ root: string, contentDir: string, publicDir: string, paths: any, includeDrafts: boolean }} opts
 */
export function loadContent({ root, contentDir, publicDir, paths, includeDrafts }) {
  const problems = new Problems();
  const rel = (p) => relative(root, p).replace(/\\/g, '/');

  const areas = loadAreas(join(contentDir, 'stranky', 'oblasti.md'), rel, problems);

  /** All items: { file, lang, type, header, lines, body } */
  const items = [];
  for (const [folder, type] of Object.entries(FOLDERS)) {
    const dir = join(contentDir, folder);
    if (!existsSync(dir)) continue;
    for (const name of readdirSync(dir).filter((n) => n.endsWith('.md')).sort()) {
      if (folder === 'stranky' && name === 'oblasti.md') continue;
      const path = join(dir, name);
      const file = rel(path);
      const err = problems.for(file);
      const lines = readFileSync(path, 'utf8').replace(/^﻿/, '').split(/\r?\n/);
      const head = parseHeader(lines);
      head.errors.forEach((e) => err(e.line, e.message));
      if (head.errors.length) continue;
      const h = head.header;
      const before = problems.list.length;
      checkHeader(h, head.lines, type).forEach((e) => err(e.line, e.message));
      const lang = name.endsWith('.en.md') ? 'en' : 'cs';
      if (h.jazyk && h.jazyk !== lang) err(head.lines.jazyk, `jazyk is "${h.jazyk}" but the file name says "${lang}" (English files end with .en.md)`);
      if (problems.list.length > before) continue;

      checkUrl(h, type, lang, paths, (m) => err(head.lines.url, m));
      if (h.preklad[lang.toUpperCase()] !== h.url) err(head.lines.preklad, `preklad.${lang.toUpperCase()} must be the same as url (${h.url})`);
      if (h.oblast && !areas.some((a) => a.id === h.oblast)) err(head.lines.oblast, `unknown oblast "${h.oblast}" (see content/stranky/oblasti.md)`);

      const body = parseBody(lines.slice(head.bodyStart), head.bodyStart + 1, { type, perex: h.perex, err });
      if (type === 'pripadova-studie') {
        if (!body.buttons) err(head.bodyStart + 1, 'a case study needs a line of links "[Demo](https://…) · [GitHub](https://…)" under the perex');
        if (!body.image) err(head.bodyStart + 1, 'a case study needs a main image "![alt](img/…)"');
        if (!body.stats) err(head.bodyStart + 1, 'a case study needs a <!-- blok: fakta --> with the numbers for the page header');
      }
      items.push({ file, path, err, lang, type, header: h, lines: head.lines, body });
    }
  }

  // Pair translations by preklad (the Czech address identifies the item in both languages).
  const groups = new Map();
  for (const it of items) {
    const key = `${it.type}|${it.header.preklad.CS}`;
    if (!groups.has(key)) groups.set(key, {});
    const g = groups.get(key);
    if (g[it.lang]) it.err(1, `the same item exists twice in ${it.lang}: also in ${g[it.lang].file}`);
    g[it.lang] = it;
  }
  for (const g of groups.values()) {
    const one = g.cs ?? g.en;
    const other = one.lang === 'cs' ? 'en' : 'cs';
    if (!g[other]) {
      one.err(one.lines.preklad, `the ${other === 'en' ? 'English' : 'Czech'} version (${one.header.preklad[other.toUpperCase()]}) is missing`);
      continue;
    }
    if (g.cs.header.preklad.EN !== g.en.header.preklad.EN) g.en.err(g.en.lines.preklad, `preklad differs from ${g.cs.file}`);
    if (one.type === 'clanek' && g.cs.header.slug !== g.en.header.slug) g.en.err(g.en.lines.slug, 'an article has the same slug in both languages');
    if (g.cs.header.oblast !== g.en.header.oblast) g.en.err(g.en.lines.oblast, `oblast differs from ${g.cs.file}`);
  }

  // Drafts: an item counts as a draft when either language is a draft, so a page never goes out
  // without its translation.
  const isDraft = (it) => {
    const g = groups.get(`${it.type}|${it.header.preklad.CS}`);
    return [g.cs, g.en].some((x) => x && DRAFT_STATES.includes(x.header.stav));
  };
  const included = items.filter((it) => includeDrafts || !isDraft(it));
  const skipped = items.filter((it) => !included.includes(it));

  const model = {
    includeDrafts,
    areas,
    articles: { cs: [], en: [] },
    studies: { cs: [], en: [] },
    pages: {},
    skipped: skipped.map((it) => it.file),
  };

  for (const it of included) {
    const h = it.header;
    const common = {
      slug: h.slug,
      title: h.titulek,
      perex: h.perex,
      description: h.meta_description,
      ...(h.og_title ? { ogTitle: h.og_title } : {}),
      published: h.datum_publikace,
      ...(h.datum_aktualizace ? { updated: h.datum_aktualizace } : {}),
      draft: isDraft(it),
    };
    const cta = h.cta ? { ctaTitle: h.cta.titulek, ctaText: h.cta.text } : {};
    if (it.type === 'clanek') {
      model.articles[it.lang].push({
        ...common,
        area: h.oblast,
        readMinutes: h.doba_cteni,
        ogImage: h.og_image,
        related: h.souvisejici ?? [],
        ...cta,
        blocks: it.body.blocks,
      });
    } else if (it.type === 'pripadova-studie') {
      model.studies[it.lang].push({
        id: h.preklad.CS.split('/').pop(),
        ...common,
        ...(h.doba_cteni ? { readMinutes: h.doba_cteni } : {}),
        ogImage: h.og_image,
        related: h.souvisejici ?? [],
        ...cta,
        buttons: it.body.buttons ?? [],
        image: it.body.image ?? { src: '', alt: '' },
        stats: it.body.stats ?? [],
        blocks: it.body.blocks,
      });
    } else {
      const key = pageKeyFor(h.url, it.lang, paths);
      (model.pages[key] ??= {})[it.lang] = { ...common, blocks: it.body.blocks };
    }
  }
  const byDate = (a, b) => b.published.localeCompare(a.published) || a.slug.localeCompare(b.slug);
  for (const lang of ['cs', 'en']) {
    model.articles[lang].sort(byDate);
    model.studies[lang].sort(byDate);
  }

  // Cross-checks on what goes out: related articles, links and images must exist.
  const urls = new Set(allUrls(model, paths).map((u) => u.path));
  const articleSlugs = new Set(model.articles.cs.map((a) => a.slug));
  for (const it of included) {
    const lang = it.lang;
    for (const slug of it.header.souvisejici ?? []) {
      if (!articleSlugs.has(slug)) {
        const hint = skipped.some((s) => s.type === 'clanek' && s.header.slug === slug) ? ' (it is a draft, left out of this build)' : '';
        it.err(it.lines.souvisejici, `souvisejici: article "${slug}" does not exist${hint}`);
      }
    }
    if (it.header.og_image && !existsSync(join(publicDir, it.header.og_image))) it.err(it.lines.og_image, `og_image ${it.header.og_image} is not in public/`);
    const body = it.body;
    const images = [body.image, ...body.blocks.filter((b) => b.kind === 'image' || (b.kind === 'project' && b.src))].filter(Boolean);
    for (const img of images) {
      if (img.src && !existsSync(join(publicDir, img.src))) it.err(lineOf(it, img.src), `image ${img.src} is not in public/`);
    }
    for (const href of collectLinks([body.blocks, body.buttons ?? []])) {
      if (/^https?:\/\//.test(href)) continue;
      if (!href.startsWith('/')) {
        it.err(1, `link "${href}" must be a path starting with / (e.g. /clanky/rychlost-vyvoje) or a full https:// address`);
      } else if (!urls.has(href)) {
        const hint = skipped.some((s) => s.header.url === href) ? ' (it is a draft, left out of this build)' : '';
        it.err(lineOf(it, href), `link to ${href}: no such page${hint}`);
      } else if ((lang === 'en') !== href.startsWith('/en')) {
        it.err(lineOf(it, href), `link to ${href} leads to the other language`);
      }
    }
  }
  return { model, problems: problems.list };
}

function lineOf(it, needle) {
  const text = readFileSync(it.path, "utf8").split(/\r?\n/);
  const i = text.findIndex((l) => l.includes(`(${needle})`));
  return i >= 0 ? i + 1 : 1;
}

/** Every link target in the blocks (inline [text](href) and the href fields). */
function collectLinks(value, out = []) {
  if (typeof value === 'string') for (const m of value.matchAll(LINK)) out.push(m[2]);
  else if (Array.isArray(value)) value.forEach((v) => collectLinks(v, out));
  else if (value && typeof value === 'object') {
    for (const [k, v] of Object.entries(value)) {
      if (k === 'href' && typeof v === 'string') out.push(v);
      else collectLinks(v, out);
    }
  }
  return out;
}

function checkUrl(h, type, lang, paths, fail) {
  const prefix = lang === 'en' ? '/en/' : '/';
  if (type === 'clanek') {
    const want = `${prefix}${paths[lang].articles}/${h.slug}`;
    if (h.url !== want) fail(`url must be ${want}`);
  } else if (type === 'pripadova-studie') {
    const want = `${prefix}${paths[lang].projects}/${h.slug}`;
    if (h.url !== want) fail(`url must be ${want}`);
  } else if (!pageKeyFor(h.url, lang, paths)) {
    const known = paths.contentPages.map((k) => `${prefix}${paths[lang][k]}`).join(', ');
    fail(`url ${h.url} is not a content page of the web (known: ${known}; a new one is added in src/app/i18n/paths.json)`);
  } else if (h.url.split('/').pop() !== h.slug) fail(`slug must be the last part of url (${h.url.split('/').pop()})`);
}

function pageKeyFor(url, lang, paths) {
  const prefix = lang === 'en' ? '/en/' : '/';
  return paths.contentPages.find((k) => `${prefix}${paths[lang][k]}` === url);
}

/** The areas table in content/stranky/oblasti.md. */
function loadAreas(path, rel, problems) {
  const file = rel(path);
  const err = problems.for(file);
  if (!existsSync(path)) {
    err(1, 'missing: the list of article areas');
    return [];
  }
  const lines = readFileSync(path, 'utf8').replace(/^﻿/, '').split(/\r?\n/);
  const head = parseHeader(lines);
  head.errors.forEach((e) => err(e.line, e.message));
  if (head.header.typ !== 'oblasti') err(head.lines.typ ?? 1, 'typ must be "oblasti"');
  const rows = [];
  lines.forEach((l, i) => {
    if (i >= head.bodyStart && l.trim().startsWith('|')) rows.push({ cells: l.trim().slice(1, -1).split('|').map((s) => s.trim()), no: i + 1 });
  });
  const COLUMNS = ['Pořadí', 'slug (CZ)', 'slug (EN)', 'Název CZ', 'Název EN', 'Úvod CZ', 'Úvod EN'];
  if (!rows.length || COLUMNS.some((c, i) => rows[0].cells[i] !== c)) {
    err(rows[0]?.no ?? 1, `the areas table must have the columns: ${COLUMNS.join(' | ')}`);
    return [];
  }
  const slug = (s) => s.replace(/^`|`$/g, '');
  const areas = rows.slice(2).map(({ cells, no }) => {
    const [order, cs, en, nameCs, nameEn, introCs, introEn] = cells;
    const a = { order: Number(order), id: slug(cs), slug: { cs: slug(cs), en: slug(en) }, name: { cs: nameCs, en: nameEn }, intro: { cs: introCs, en: introEn } };
    if (cells.length !== COLUMNS.length) err(no, `the row has ${cells.length} cells, expected ${COLUMNS.length}`);
    if (!Number.isInteger(a.order)) err(no, 'Pořadí must be a number');
    for (const s of [a.slug.cs, a.slug.en]) if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(s)) err(no, `"${s}" is not a slug`);
    if (!nameCs || !nameEn || !introCs || !introEn) err(no, 'name and intro are needed in both languages');
    return a;
  });
  for (const lang of ['cs', 'en']) {
    const seen = new Set();
    areas.forEach((a) => {
      if (seen.has(a.slug[lang])) err(1, `area slug "${a.slug[lang]}" is used twice`);
      seen.add(a.slug[lang]);
    });
  }
  return areas.sort((a, b) => a.order - b.order).map(({ order, ...a }) => a);
}

/**
 * Every prerendered address with its translation and last change. Used for the link check, the
 * sitemap and the Static Web Apps rewrites.
 * @returns {{ path: string, lang: 'cs'|'en', alt: { cs: string, en: string }, lastmod?: string }[]}
 */
export function allUrls(model, paths) {
  const out = [];
  const url = (lang, p) => (lang === 'en' ? (p ? `/en/${p}` : '/en') : `/${p}`);
  const add = (alt, lastmod) => {
    for (const lang of ['cs', 'en']) out.push({ path: alt[lang], lang, alt, ...(lastmod ? { lastmod } : {}) });
  };
  const lastChange = (items) => items.map((i) => i.updated ?? i.published).sort().at(-1);
  const newest = lastChange([...model.articles.cs, ...model.studies.cs]);

  for (const key of Object.keys(paths.cs)) {
    if (paths.contentPages.includes(key) && !model.pages[key]) continue;
    const page = model.pages[key]?.cs;
    const lastmod = page ? (page.updated ?? page.published) : key === 'articles' ? newest : undefined;
    add({ cs: url('cs', paths.cs[key]), en: url('en', paths.en[key]) }, lastmod);
  }
  model.articles.cs.forEach((a, i) => {
    add({ cs: url('cs', `${paths.cs.articles}/${a.slug}`), en: url('en', `${paths.en.articles}/${a.slug}`) }, a.updated ?? a.published);
  });
  model.studies.cs.forEach((s) => {
    const en = model.studies.en.find((x) => x.id === s.id);
    add({ cs: url('cs', `${paths.cs.projects}/${s.slug}`), en: url('en', `${paths.en.projects}/${en.slug}`) }, s.updated ?? s.published);
  });
  for (const area of visibleAreas(model)) {
    const inArea = model.articles.cs.filter((a) => a.area === area.id);
    add(
      {
        cs: url('cs', `${paths.cs.articles}/${paths.areaSegment.cs}/${area.slug.cs}`),
        en: url('en', `${paths.en.articles}/${paths.areaSegment.en}/${area.slug.en}`),
      },
      lastChange(inArea),
    );
  }
  return out;
}

/** Areas that have at least one article in this build. */
export function visibleAreas(model) {
  return model.areas.filter((a) => model.articles.cs.some((x) => x.area === a.id));
}
