// Text snapshot of the prerendered site, for regression checks before and after a change.
//
//   node scripts/snapshot-text.mjs <output-dir> [dist-dir]
//
// For every dist/**/index.html it writes <output-dir>/<route>.txt with the page title, the meta
// description and the visible text of <main>, one block element per line. Compare two snapshots
// with any diff tool (e.g. `git diff --no-index before after`).
import { mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';

const [out, dist = 'dist/stanislavmatzke-web/browser'] = process.argv.slice(2);
if (!out) {
  console.error('Usage: node scripts/snapshot-text.mjs <output-dir> [dist-dir]');
  process.exit(1);
}

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', '#39': "'" };
const decode = (s) =>
  s.replace(/&(#x?[0-9a-f]+|\w+);/gi, (m, e) => {
    if (e[0] === '#') return String.fromCodePoint(e[1] === 'x' || e[1] === 'X' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10));
    return ENTITIES[e] ?? m;
  });

function text(html) {
  return decode(
    html
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/<(script|style|svg)[\s\S]*?<\/\1>/gi, '')
      .replace(/<\/?(p|h[1-6]|li|dt|dd|div|section|header|footer|article|aside|figure|figcaption|blockquote|tr|summary|details|br|nav|ul|ol|dl|table)\b[^>]*>/gi, '\n')
      .replace(/<(td|th)\b[^>]*>/gi, ' | ')
      .replace(/<img\b[^>]*\balt="([^"]*)"[^>]*>/gi, ' [img: $1] ')
      .replace(/<a\b[^>]*\bhref="([^"]*)"[^>]*>/gi, ' [→$1] ')
      .replace(/<[^>]+>/g, ''),
  )
    .split('\n')
    .map((l) => l.replace(/\s+/g, ' ').trim())
    .filter(Boolean)
    .join('\n');
}

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) yield* walk(p);
    else if (name === 'index.html') yield p;
  }
}

let count = 0;
for (const file of walk(dist)) {
  const html = readFileSync(file, 'utf8');
  const route = '/' + relative(dist, dirname(file)).replace(/\\/g, '/');
  const title = /<title>([\s\S]*?)<\/title>/.exec(html)?.[1] ?? '';
  const desc = /<meta name="description" content="([^"]*)"/.exec(html)?.[1] ?? '';
  const main = /<main\b[^>]*>([\s\S]*)<\/main>/.exec(html)?.[1] ?? '';
  const body = `# ${route}\ntitle: ${decode(title)}\ndescription: ${decode(desc)}\n\n${text(main)}\n`;
  const name = route === '/' ? '_home' : route.slice(1).replace(/\//g, '__');
  mkdirSync(out, { recursive: true });
  writeFileSync(join(out, `${name}.txt`), body);
  count++;
}
console.log(`Snapshot of ${count} pages written to ${out}`);
