// Builds public/words/{5,6,7,8}.txt from the MIT-licensed `word-list` package
// (SCOWL-derived English word list). These are the words accepted as guesses;
// the answers themselves come from the curated lists in src/data.
//
// Run with: node scripts/build-dictionary.mjs
import fs from 'node:fs';
import path from 'node:path';
const pkgDir = path.resolve('node_modules/word-list');
const listPath = path.join(pkgDir, 'words.txt');
const words = fs.readFileSync(listPath, 'utf8').split('\n');
const outDir = path.resolve('public/words');
fs.mkdirSync(outDir, { recursive: true });

for (const n of [5, 6, 7, 8]) {
  const picked = words.filter((w) => w.length === n && /^[a-z]+$/.test(w)).map((w) => w.toUpperCase());
  fs.writeFileSync(path.join(outDir, `${n}.txt`), picked.join('\n') + '\n');
  console.log(`${n} letters: ${picked.length} words`);
}

fs.copyFileSync(
  path.join(pkgDir, 'license'),
  path.join(outDir, 'LICENSE-word-list.txt')
);
