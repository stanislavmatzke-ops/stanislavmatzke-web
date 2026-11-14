// A small parser for the editor's markdown: a YAML-like header and a body made of the blocks the web
// knows (see MARKERS in schema.mjs). It never produces HTML – only data for the Angular templates.
// Anything it does not understand is an error with a line number; it never guesses.
import { CURRENT_STAGE, LESSON_LABELS, MARKERS } from './schema.mjs';

// ---------------------------------------------------------------------------------------------------
// Header
// ---------------------------------------------------------------------------------------------------

/**
 * Parses the `---` header. Supports what the editor uses: `key: value` with a bare, "double" or
 * 'single' quoted value, a number, an empty value, `[a, b]` lists, `[CS: /x, EN: /y]` and
 * `{ key: "…", key: "…" }` maps.
 * @returns {{ header: Record<string, unknown>, lines: Record<string, number>, bodyStart: number, errors: {line:number,message:string}[] }}
 */
export function parseHeader(lines) {
  const header = {};
  const at = {};
  const errors = [];
  if (lines[0]?.trim() !== '---') {
    return { header, lines: at, bodyStart: 0, errors: [{ line: 1, message: 'the file must start with a "---" header' }] };
  }
  const end = lines.findIndex((l, i) => i > 0 && l.trim() === '---');
  if (end < 0) return { header, lines: at, bodyStart: 0, errors: [{ line: 1, message: 'the header is not closed with "---"' }] };

  for (let i = 1; i < end; i++) {
    const raw = lines[i];
    if (!raw.trim() || raw.trim().startsWith('#')) continue;
    const m = /^([A-Za-z_][A-Za-z0-9_]*):(?:[ \t]+(.*))?$/.exec(raw.trimEnd());
    if (!m) {
      errors.push({ line: i + 1, message: `cannot read header line "${raw.trim()}" (expected "key: value")` });
      continue;
    }
    const [, key, value = ''] = m;
    if (key in header) errors.push({ line: i + 1, message: `header field "${key}" is repeated` });
    try {
      header[key] = parseValue(value.trim());
    } catch (e) {
      errors.push({ line: i + 1, message: `"${key}": ${e.message}` });
    }
    at[key] = i + 1;
  }
  return { header, lines: at, bodyStart: end + 1, errors };
}

export function parseValue(s) {
  if (s === '') return null;
  if (s[0] === '[') {
    if (!s.endsWith(']')) throw new Error('a list must end with "]"');
    const items = splitTopLevel(s.slice(1, -1));
    const pairs = items.map(splitPair);
    if (items.length && pairs.every(Boolean)) return Object.fromEntries(pairs.map(([k, v]) => [k, parseScalar(v)]));
    if (pairs.some(Boolean)) throw new Error('a list cannot mix "key: value" and plain items');
    return items.map(parseScalar);
  }
  if (s[0] === '{') {
    if (!s.endsWith('}')) throw new Error('a map must end with "}"');
    const out = {};
    for (const item of splitTopLevel(s.slice(1, -1))) {
      const pair = splitPair(item);
      if (!pair) throw new Error(`cannot read "${item}" (expected key: value)`);
      out[pair[0]] = parseScalar(pair[1]);
    }
    return out;
  }
  return parseScalar(s);
}

function parseScalar(s) {
  s = s.trim();
  if (s[0] === '"' || s[0] === "'") {
    const q = s[0];
    let out = '';
    let i = 1;
    for (; i < s.length; i++) {
      const c = s[i];
      if (q === '"' && c === '\\' && i + 1 < s.length) {
        const n = s[++i];
        out += n === 'n' ? '\n' : n;
      } else if (c === q) {
        if (q === "'" && s[i + 1] === "'") {
          out += "'";
          i++;
        } else break;
      } else out += c;
    }
    if (i >= s.length) throw new Error('the quoted text is not closed');
    const rest = s.slice(i + 1).trim();
    if (rest && !rest.startsWith('#')) throw new Error(`unexpected text after the closing quote: "${rest}"`);
    return out;
  }
  const bare = s.replace(/\s+#.*$/, '').trim();
  if (/^-?\d+$/.test(bare)) return Number(bare);
  return bare === '' ? null : bare;
}

/** Splits `a, "b, c", d` on top-level commas. */
function splitTopLevel(s) {
  const out = [];
  let cur = '';
  let quote = null;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (quote) {
      if (c === '\\' && quote === '"') {
        cur += c + (s[++i] ?? '');
        continue;
      }
      if (c === quote) quote = null;
    } else if (c === '"' || c === "'") quote = c;
    else if (c === ',') {
      out.push(cur.trim());
      cur = '';
      continue;
    }
    cur += c;
  }
  if (quote) throw new Error('a quoted text is not closed');
  if (cur.trim()) out.push(cur.trim());
  return out;
}

/** `key: value` → [key, value]; a quoted item or a plain slug → null. */
function splitPair(item) {
  const m = /^([A-Za-z_][A-Za-z0-9_]*):\s*(.*)$/.exec(item);
  return m ? [m[1], m[2]] : null;
}

// ---------------------------------------------------------------------------------------------------
// Body
// ---------------------------------------------------------------------------------------------------

const MARKER = /^<!--\s*blok:\s*(.+?)\s*-->$/;
const HEADING = /^(#{1,6})\s+(.+?)\s*#*$/;
const UL_ITEM = /^[-*]\s+(.*)$/;
const OL_ITEM = /^\d+[.)]\s+(.*)$/;
const IMAGE = /^!\[([^\]]*)\]\(([^)\s]+)\)$/;
const ITALIC_LINE = /^\*([^*].*?)\*$|^_([^_].*?)_$/;
const LINK_ONLY = /^\[([^\]]+)\]\(([^)\s]+)\)$/;
const BOLD_ONLY = /^\*\*(.+?)\*\*$/;

const isListLine = (t) => UL_ITEM.test(t) || OL_ITEM.test(t);
const norm = (s) => s.replace(/\s+/g, ' ').trim();

/**
 * Splits body lines into chunks: runs of non-blank lines. A block marker and a heading are always
 * chunks of their own; a list that starts right under a paragraph starts a new chunk.
 */
export function chunk(lines, firstLineNo) {
  const chunks = [];
  let cur = null;
  const close = () => {
    if (cur) chunks.push(cur);
    cur = null;
  };
  lines.forEach((text, i) => {
    const line = { text, no: firstLineNo + i };
    const t = text.trim();
    if (!t) return close();
    if (MARKER.test(t) || HEADING.test(t)) {
      close();
      chunks.push({ lines: [line] });
      return;
    }
    if (cur && !text.startsWith(' ') && isListLine(t)) {
      const head = cur.lines[0].text.trim();
      if (!isListLine(head)) close();
    }
    if (!cur) cur = { lines: [] };
    cur.lines.push(line);
  });
  close();
  return chunks;
}

/**
 * Parses list items. An item starts with "- " or "1. " at the start of the line; indented lines below
 * it continue it. Returns [{ head, rest[], line }].
 */
function listItems(c, err) {
  const items = [];
  const ordered = OL_ITEM.test(c.lines[0].text.trim());
  for (const { text, no } of c.lines) {
    const m = ordered ? OL_ITEM.exec(text) : UL_ITEM.exec(text);
    if (m && !/^\s/.test(text)) items.push({ head: m[1].trim(), rest: [], line: no });
    else if (items.length && /^\s/.test(text)) {
      if (isListLine(text.trim())) err(no, 'nested lists are not supported');
      items.at(-1).rest.push(text.trim());
    } else err(no, `expected a list item ("${ordered ? '1.' : '-'} …") or an indented continuation line`);
  }
  return { ordered, items };
}

const joinItem = (it) => norm([it.head, ...it.rest].join(' '));

/** Strips "> " from a quote chunk; returns inner lines (with line numbers) or reports an error. */
function quoteLines(c, err) {
  return c.lines.map(({ text, no }) => {
    const m = /^\s*>\s?(.*)$/.exec(text);
    if (!m) err(no, 'every line of a quote must start with ">"');
    return { text: m ? m[1] : text, no };
  });
}

/** Paragraph text of a chunk: lines joined with a space (a hard break "  " counts as a space). */
const paragraph = (c) => norm(c.lines.map((l) => l.text).join(' '));

function parseTable(c, err) {
  const cells = (text) => {
    const t = text.trim();
    if (!t.startsWith('|') || !t.endsWith('|')) return null;
    return t.slice(1, -1).split('|').map((s) => norm(s));
  };
  const rows = c.lines.map((l) => {
    const r = cells(l.text);
    if (!r) err(l.no, 'every table line must start and end with "|"');
    return r ?? [];
  });
  if (rows.length < 2 || !rows[1].every((s) => /^:?-{3,}:?$/.test(s))) {
    err(c.lines[0].no, 'a table needs a header row and a "|---|" separator row');
    return null;
  }
  const head = rows[0];
  const body = rows.slice(2);
  body.forEach((r, i) => {
    if (r.length !== head.length) err(c.lines[i + 2].no, `table row has ${r.length} cells, the header has ${head.length}`);
  });
  return { kind: 'table', head, rows: body };
}

/**
 * Parses the body into blocks.
 * @param {string[]} lines body lines
 * @param {number} firstLineNo line number of lines[0] in the file
 * @param {{ type: string, perex: string, err: (line:number, message:string) => void }} opts
 * @returns {{ blocks: object[], buttons?: {text:string,href:string}[], image?: object, stats?: object[] }}
 */
export function parseBody(lines, firstLineNo, { type, perex, err }) {
  const chunks = chunk(lines, firstLineNo);
  const study = type === 'pripadova-studie';
  const out = { blocks: [] };
  const blocks = out.blocks;
  let pending = null; // { name, kind, line }
  let titleSeen = false;
  let perexSkipped = false;

  for (let i = 0; i < chunks.length; i++) {
    const c = chunks[i];
    const first = c.lines[0];
    const t = first.text.trim();

    // Block marker
    const marker = MARKER.exec(t);
    if (marker) {
      if (pending) err(pending.line, `block marker "${pending.name}" is not followed by its block`);
      const kind = MARKERS[marker[1]];
      if (!kind) {
        err(first.no, `unknown block "${marker[1]}" (known: ${Object.keys(MARKERS).join(', ')})`);
        pending = null;
      } else pending = { name: marker[1], kind, line: first.no };
      continue;
    }
    if (t.startsWith('<!--') && !t.startsWith(CURRENT_STAGE)) {
      err(first.no, `unknown HTML comment "${t}" (blocks are marked with <!-- blok: … -->)`);
      continue;
    }

    // Headings
    const h = HEADING.exec(t);
    if (h) {
      if (pending) {
        err(pending.line, `block marker "${pending.name}" must be followed by its block, found a heading`);
        pending = null;
      }
      const level = h[1].length;
      if (level === 1) {
        if (titleSeen || blocks.length) err(first.no, 'only one "# title" is allowed, at the top of the text');
        titleSeen = true;
        // Eyebrow: a line in italics right under the title (e.g. *Články · Říjen 2026 · 7 minut čtení*).
        const next = chunks[i + 1];
        if (next && next.lines.length === 1 && ITALIC_LINE.test(next.lines[0].text.trim())) i++;
        continue;
      }
      if (level > 3) err(first.no, `heading level ${level} is not supported (use ## or ###)`);
      blocks.push({ kind: level === 2 ? 'h2' : 'h3', text: h[2] });
      continue;
    }

    // Marked blocks
    if (pending) {
      const p = pending;
      pending = null;
      const consumedNext = parseMarked(p, c, chunks[i + 1], { err, blocks, out, study });
      if (consumedNext) i++;
      continue;
    }

    // Unmarked blocks
    if (t.startsWith('>')) {
      const inner = quoteLines(c, err);
      blocks.push({ kind: 'quote', text: norm(inner.map((l) => l.text).join(' ')) });
      continue;
    }
    if (t.startsWith('|')) {
      const table = parseTable(c, err);
      if (table) blocks.push(table);
      continue;
    }
    if (isListLine(t)) {
      const { ordered, items } = listItems(c, err);
      blocks.push({ kind: ordered ? 'ol' : 'ul', items: items.map(joinItem) });
      continue;
    }
    const img = IMAGE.exec(t);
    if (img) {
      const image = parseImage(c, err);
      if (study && !out.image) out.image = image;
      else blocks.push({ kind: 'image', ...image });
      continue;
    }

    const text = paragraph(c);
    if (!perexSkipped && norm(perex ?? '') === text) {
      perexSkipped = true;
      continue;
    }
    if (study && !out.buttons && isButtonRow(text)) {
      out.buttons = text.split(' · ').map((part) => {
        const m = LINK_ONLY.exec(part.trim());
        return { text: m[1], href: m[2] };
      });
      continue;
    }
    blocks.push({ kind: 'p', text });
  }
  if (pending) err(pending.line, `block marker "${pending.name}" is not followed by its block`);
  return out;
}

const isButtonRow = (text) => text.split(' · ').every((part) => LINK_ONLY.test(part.trim()));

function parseImage(c, err) {
  const [imgLine, captionLine, ...extra] = c.lines;
  const m = IMAGE.exec(imgLine.text.trim());
  const image = { src: m[2], alt: m[1] };
  if (captionLine) {
    const cap = ITALIC_LINE.exec(captionLine.text.trim());
    if (cap) image.caption = cap[1] ?? cap[2];
    else err(captionLine.no, 'the line under an image must be its caption in *italics*');
  }
  for (const l of extra) err(l.no, 'unexpected text after the image caption (add an empty line)');
  if (!m[1]) err(imgLine.no, 'the image needs an alt text: ![description](img/file.webp)');
  return image;
}

/** Parses a block that has a `<!-- blok: … -->` marker. Returns true when it also used the next chunk. */
function parseMarked(p, c, next, { err, blocks, out, study }) {
  const first = c.lines[0];
  const t = first.text.trim();
  const needList = () => {
    if (!isListLine(t)) {
      err(first.no, `block "${p.name}" must be a list ("- …")`);
      return null;
    }
    return listItems(c, err).items;
  };

  switch (p.kind) {
    case 'cta':
      return false; // information only, the CTA comes from the header

    case 'lesson': {
      if (!t.startsWith('>')) return err(first.no, `block "${p.name}" must be a quote ("> …")`), false;
      const inner = quoteLines(c, err);
      const paras = chunk(inner.map((l) => l.text), inner[0].no).map(paragraph);
      const label = BOLD_ONLY.exec(paras[0] ?? '');
      if (!label || !LESSON_LABELS.includes(label[1])) {
        err(first.no, `a lesson quote must start with "> **${LESSON_LABELS.join('** / **')}**"`);
        return false;
      }
      if (paras.length < 2) err(first.no, 'the lesson has no text');
      blocks.push({ kind: 'lesson', text: paras.slice(1).join(' ') });
      return false;
    }

    case 'stages': {
      const items = needList();
      if (!items) return false;
      const entries = items.map((it) => {
        let head = it.head;
        const current = head.includes(CURRENT_STAGE);
        head = head.replace(CURRENT_STAGE, '').trim();
        const m = BOLD_ONLY.exec(head);
        const parts = m?.[1].split(' – ');
        if (!m || parts.length < 2) {
          err(it.line, 'a timeline item must be "- **label – title**" with the text on the next line');
          return { title: head };
        }
        const entry = { label: parts[0], title: parts.slice(1).join(' – ') };
        if (it.rest.length) entry.text = norm(it.rest.join(' '));
        if (current) entry.current = true;
        return entry;
      });
      if (entries.filter((e) => e.current).length > 1) err(first.no, 'only one timeline item can be marked <!-- aktuální etapa -->');
      blocks.push({ kind: 'stages', entries });
      return false;
    }

    case 'compare': {
      const items = needList();
      if (!items) return false;
      const entries = items.map((it) => {
        const m = /^\*\*(.+?)\*\*\s+–\s+(.+)$/.exec(joinItem(it));
        if (!m) {
          err(it.line, 'a comparison item must be "- **value** – description"');
          return { title: joinItem(it) };
        }
        return { label: m[1], title: m[2] };
      });
      if (entries.length !== 2) err(first.no, `a comparison needs exactly 2 items, found ${entries.length}`);
      const block = { kind: 'compare', entries };
      const note = next && next.lines.length === 1 ? ITALIC_LINE.exec(next.lines[0].text.trim()) : null;
      if (note) block.text = note[1] ?? note[2];
      blocks.push(block);
      return Boolean(note);
    }

    case 'cards': {
      const items = needList();
      if (!items) return false;
      const entries = items.map((it) => {
        const m = BOLD_ONLY.exec(it.head);
        if (!m) {
          err(it.line, 'a card must be "- **label · title**" or "- **title**", with optional text on the next line');
          return { title: it.head };
        }
        const at = m[1].indexOf(' · ');
        const entry = at < 0 ? { title: m[1] } : { label: m[1].slice(0, at), title: m[1].slice(at + 3) };
        if (it.rest.length) entry.text = norm(it.rest.join(' '));
        return entry;
      });
      blocks.push({ kind: 'cards', entries });
      return false;
    }

    case 'facts': {
      const items = needList();
      if (!items) return false;
      const entries = items.map((it) => {
        const m = /^\*\*(.+?):\*\*\s+(.+)$/.exec(joinItem(it)) ?? /^\*\*(.+?)\*\*:\s+(.+)$/.exec(joinItem(it));
        if (!m) {
          err(it.line, 'a fact must be "- **value:** description"');
          return { title: joinItem(it) };
        }
        return { title: m[1], text: m[2] };
      });
      if (study && !out.stats) out.stats = entries;
      else blocks.push({ kind: 'facts', entries });
      return false;
    }

    case 'source': {
      const m = LINK_ONLY.exec(paragraph(c));
      if (!m || !/^https?:\/\//.test(m[2])) {
        err(first.no, 'a source must be a single link "[text ↗](https://…)"');
        return false;
      }
      blocks.push({ kind: 'source', text: m[1].replace(/\s*↗\s*$/, ''), href: m[2] });
      return false;
    }

    case 'link': {
      const m = LINK_ONLY.exec(paragraph(c));
      if (!m || !m[2].startsWith('/')) {
        err(first.no, 'a link block must be a single link to a page of this web "[text](/path)"');
        return false;
      }
      blocks.push({ kind: 'link', text: m[1], href: m[2] });
      return false;
    }

    case 'project': {
      if (!t.startsWith('>')) return err(first.no, `block "${p.name}" must be a quote ("> …")`), false;
      const inner = quoteLines(c, err);
      const block = { kind: 'project' };
      for (const part of chunk(inner.map((l) => l.text), inner[0].no)) {
        const pt = part.lines[0].text.trim();
        const pText = paragraph(part);
        let m;
        if ((m = IMAGE.exec(pt)) && part.lines.length === 1) Object.assign(block, { src: m[2], alt: m[1] });
        else if ((m = BOLD_ONLY.exec(pText)) && !block.caption) block.caption = m[1];
        else if (isListLine(pt)) block.items = listItems(part, err).items.map(joinItem);
        else if ((m = LINK_ONLY.exec(pText))) Object.assign(block, { href: m[2], label: m[1] });
        else if (!block.text) block.text = pText;
        else err(part.lines[0].no, 'a project box has an image, a **title**, one paragraph, a list and a link – this part does not fit');
      }
      if (!block.caption || !block.text || !block.href) err(first.no, 'a project box needs a **title**, a paragraph and a link');
      blocks.push(block);
      return false;
    }
  }
  return false;
}
