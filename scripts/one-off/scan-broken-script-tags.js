// Escanea TODOS los .html de la suite buscando etiquetas <script>/<link>
// a las que les falte el 'rc="'/'el="' (las que corrompió bump-tokens-for-changed.js).
// No escribe nada: solo informa.
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..', '..');
const PROJECTS = ['apptonomia', 'calculia', 'ludia', 'memofun', 'okeymoney', 'routime', 'sinonimia', 'teclatlon'];
const SKIP = new Set(['node_modules', '.git', '.wrangler', '.claude', 'dist', 'build']);

const BAD = /<(script s(?!rc=)|link r(?!el=))/g;

let total = 0;
const porProyecto = {};
const samples = [];

function walk(dir, out) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith('.') || SKIP.has(e.name)) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, out);
    else if (e.isFile() && /\.html?$/i.test(e.name)) out.push(full);
  }
}

for (const p of PROJECTS) {
  const files = [];
  walk(path.join(ROOT, p), files);
  let n = 0;
  for (const f of files) {
    const src = fs.readFileSync(f, 'utf8');
    if (!BAD.test(src)) { BAD.lastIndex = 0; continue; }
    BAD.lastIndex = 0;
    const lines = src.split(/\r?\n/);
    lines.forEach((line, i) => {
      BAD.lastIndex = 0;
      if (!BAD.test(line)) return;
      BAD.lastIndex = 0;
      n++;
      if (samples.length < 200) {
        samples.push({ file: path.relative(ROOT, f), line: i + 1, text: line.trim() });
      }
    });
  }
  porProyecto[p] = n;
  total += n;
}

console.log('Etiquetas rotas por proyecto:');
for (const p of PROJECTS) console.log('  ' + p.padEnd(12) + porProyecto[p]);
console.log('  TOTAL       ' + total);
console.log('\nPrimeras coincidencias:');
for (const s of samples) {
  console.log(`  ${s.file}:${s.line}`);
  console.log(`    ${s.text}`);
}