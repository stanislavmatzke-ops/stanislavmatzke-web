// The one place that defines the editor's content format: header fields, item types and block markers.
// Used by scripts/build-content.mjs; see README "Content" for the editor's view of the same rules.

export const ORIGIN = 'https://stanislavmatzke.com';

/** Content folders and the item type each one holds. */
export const FOLDERS = {
  clanky: 'clanek',
  projekty: 'pripadova-studie',
  stranky: 'stranka',
};

export const TYPES = ['clanek', 'pripadova-studie', 'stranka'];
export const LANGS = ['cs', 'en'];
export const STATES = ['koncept', 'schvaleno', 'predano', 'publikovano'];
/** Items in this state are left out of `npm run build` (the production build). */
export const DRAFT_STATES = ['koncept'];

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DATE = /^\d{4}-\d{2}-\d{2}$/;
const PATH = /^\/[a-z0-9/-]*$/;

const isRealDate = (s) => {
  if (!DATE.test(s)) return false;
  const d = new Date(`${s}T00:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === s;
};

/**
 * Header fields. `need`: which item types require the field ('all' or a list); types not listed may
 * still use it unless they are in `forbid`. `check` returns an error message or null.
 */
export const FIELDS = {
  typ: { need: 'all', check: (v) => (TYPES.includes(v) ? null : `must be one of: ${TYPES.join(', ')}`) },
  slug: { need: 'all', check: (v) => (typeof v === 'string' && SLUG.test(v) ? null : 'must be a slug (a-z, 0-9, hyphens)') },
  jazyk: { need: 'all', check: (v) => (LANGS.includes(v) ? null : `must be one of: ${LANGS.join(', ')}`) },
  url: { need: 'all', check: (v) => (typeof v === 'string' && PATH.test(v) ? null : 'must be a path starting with /') },
  titulek: { need: 'all', check: nonEmptyString },
  perex: { need: 'all', check: nonEmptyString },
  meta_description: { need: 'all', check: nonEmptyString },
  og_title: { need: [], check: nonEmptyString },
  oblast: { need: ['clanek'], forbid: ['pripadova-studie', 'stranka'], check: (v) => (typeof v === 'string' && SLUG.test(v) ? null : 'must be an area slug') },
  datum_publikace: { need: 'all', check: (v) => (isRealDate(v) ? null : 'must be a date YYYY-MM-DD') },
  datum_aktualizace: { need: [], check: (v) => (isRealDate(v) ? null : 'must be a date YYYY-MM-DD or empty') },
  doba_cteni: { need: ['clanek'], forbid: ['stranka'], check: (v) => (Number.isInteger(v) && v > 0 ? null : 'must be a whole number of minutes') },
  og_image: { need: ['clanek', 'pripadova-studie'], check: (v) => (typeof v === 'string' && /^\/img\/[\w.-]+\.(jpg|jpeg|png|webp)$/.test(v) ? null : 'must be /img/<file>.jpg|png|webp') },
  souvisejici: { need: [], forbid: ['stranka'], check: (v) => (Array.isArray(v) && v.every((s) => typeof s === 'string' && SLUG.test(s)) ? null : 'must be a list of article slugs, e.g. [a, b]') },
  cta: {
    need: [],
    forbid: ['stranka'],
    check: (v) =>
      v && typeof v === 'object' && !Array.isArray(v) && typeof v.titulek === 'string' && v.titulek && typeof v.text === 'string' && v.text && Object.keys(v).length === 2
        ? null
        : 'must be { titulek: "…", text: "…" }',
  },
  stav: { need: 'all', check: (v) => (STATES.includes(v) ? null : `must be one of: ${STATES.join(', ')}`) },
  preklad: {
    need: 'all',
    check: (v) =>
      v && typeof v === 'object' && !Array.isArray(v) && PATH.test(v.CS ?? '') && PATH.test(v.EN ?? '') && Object.keys(v).length === 2
        ? null
        : 'must be [CS: /path, EN: /en/path]',
  },
  /** Hidden page: not in the menu, footer or sitemap, robots noindex, nofollow (e.g. /pro-zamestnavatele). */
  skryta: { need: [], forbid: ['clanek', 'pripadova-studie'], check: (v) => (typeof v === 'boolean' ? null : 'must be true or false') },
  /** Editor's bookkeeping, not used by the web. */
  zrcadleno_z_webu: { need: [], check: (v) => (isRealDate(v) ? null : 'must be a date YYYY-MM-DD or empty') },
  zmeneno_editorem: { need: [], check: (v) => (isRealDate(v) ? null : 'must be a date YYYY-MM-DD or empty') },
};

function nonEmptyString(v) {
  return typeof v === 'string' && v.trim() ? null : 'must be a non-empty text';
}

/** Checks a parsed header; returns a list of { line, message }. */
export function checkHeader(header, lines, expectedType) {
  const errors = [];
  const at = (key) => lines[key] ?? 1;
  const type = header.typ;
  for (const key of Object.keys(header)) {
    if (!(key in FIELDS)) errors.push({ line: at(key), message: `unknown header field "${key}"` });
  }
  if (type !== expectedType) errors.push({ line: at('typ'), message: `typ must be "${expectedType}" in this folder, found "${type ?? ''}"` });
  for (const [key, f] of Object.entries(FIELDS)) {
    const value = header[key];
    const empty = value === undefined || value === null || value === '';
    const needed = f.need === 'all' || f.need.includes(type);
    if (empty) {
      if (needed) errors.push({ line: at(key), message: `missing header field "${key}"` });
      continue;
    }
    if (f.forbid?.includes(type)) {
      errors.push({ line: at(key), message: `header field "${key}" is not allowed for typ ${type}` });
      continue;
    }
    const problem = f.check(value);
    if (problem) errors.push({ line: at(key), message: `"${key}" ${problem}` });
  }
  return errors;
}

/** Block markers `<!-- blok: … -->` and the block each one produces. */
export const MARKERS = {
  'ponaučení': 'lesson',
  'časová osa': 'stages',
  'srovnání': 'compare',
  'karty': 'cards',
  'fakta': 'facts',
  'projekt': 'project',
  'zdroj': 'source',
  'odkaz': 'link',
  /** Information only: the call to action comes from the `cta` header field. */
  'CTA pás': 'cta',
};

/** First line of a lesson quote; the web adds its own label. */
export const LESSON_LABELS = ['Ponaučení', 'Lesson'];

/** Marker after a timeline item that highlights it. */
export const CURRENT_STAGE = '<!-- aktuální etapa -->';

/** RSS channel texts (same as the meta of the article list in src/app/i18n/cs.ts and en.ts). */
export const FEED = {
  cs: { title: 'Články – Stanislav Matzke', description: 'Poznatky z praxe: jak AI mění vývoj software, modernizaci starých systémů a na co si při tom dát pozor.' },
  en: { title: 'Articles – Stanislav Matzke', description: 'Lessons from practice: how AI is changing software development, legacy modernisation and what to watch out for.' },
};
