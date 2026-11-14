// Converts the editor's markdown in content/ into what the Angular build needs:
//   src/app/content/                         typed articles, case studies, pages and areas (texts in bodies/)
//   public/sitemap.xml                       every prerendered page with hreflang and lastmod
//   public/clanky/feed.xml, public/en/articles/feed.xml   RSS
//   public/staticwebapp.config.json         staticwebapp.config.base.json + rewrites for every page
// None of these files is in git; they are rebuilt by npm start / npm run build.
//
//   node scripts/build-content.mjs            production: leaves out drafts (stav: koncept)
//   node scripts/build-content.mjs --drafts   includes drafts (npm start, npm run build:drafts)
//   CONTENT_DRAFTS=1 has the same effect as --drafts.
//
// Any problem in the content stops the build with "file:line: what is wrong".
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { feedXml, generatedTs, sitemapXml, staticWebAppConfig } from './content/emit.mjs';
import { loadContent } from './content/load.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const includeDrafts = process.argv.includes('--drafts') || ['1', 'true'].includes(process.env.CONTENT_DRAFTS ?? '');

const paths = JSON.parse(readFileSync(join(root, 'src/app/i18n/paths.json'), 'utf8'));
const { model, problems } = loadContent({
  root,
  contentDir: join(root, 'content'),
  publicDir: join(root, 'public'),
  paths,
  includeDrafts,
});

if (problems.length) {
  console.error(`\nContent has ${problems.length} problem(s):\n`);
  for (const p of problems) console.error(`  ${p}`);
  console.error('\nFix the markdown in content/ and run the build again.\n');
  process.exit(1);
}

const write = (rel, text) => {
  const p = join(root, rel);
  mkdirSync(dirname(p), { recursive: true });
  writeFileSync(p, text);
};
const base = JSON.parse(readFileSync(join(root, 'staticwebapp.config.base.json'), 'utf8'));

rmSync(join(root, 'src/app/content'), { recursive: true, force: true });
for (const [rel, text] of Object.entries(generatedTs(model))) write(`src/app/content/${rel}`, text);
write('public/sitemap.xml', sitemapXml(model, paths));
write(`public/${paths.cs.articles}/feed.xml`, feedXml(model, paths, 'cs'));
write(`public/en/${paths.en.articles}/feed.xml`, feedXml(model, paths, 'en'));
write('public/staticwebapp.config.json', staticWebAppConfig(base, model, paths));

const count = (o) => o.cs.length;
console.log(
  `Content: articles: ${count(model.articles)}, case studies: ${count(model.studies)}, pages: ${Object.keys(model.pages).length}` +
    ` (CZ + EN)${includeDrafts ? ', drafts included' : ''}.`,
);
if (model.skipped.length) console.log(`Left out as drafts (stav: koncept): ${model.skipped.join(', ')}`);
