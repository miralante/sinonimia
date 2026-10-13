// Verifica que TODAS las etiquetas que cargan locale-picker.js en los HTML de
// la suite tienen la forma canonica <script src="RUTA?v=TOKEN_ESPERADO" defer></script>
// y que no queda ninguna con la forma rota.
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..', '..');
const PROJECTS = ['apptonomia', 'calculia', 'ludia', 'memofun', 'okeymoney', 'routime', 'sinonimia', 'teclatlon'];
const SKIP = new Set(['node_modules', '.git', '.wrangler', '.claude', 'dist', 'build']);
const ESPERADO = {
  apptonomia: 'apptonomia-v5aca', calculia: 'calculia-v5aaa', ludia: 'ludia-v4aaa',
  memofun: 'memofun-v4aaa', okeymoney: 'okeymoney-v4aaa', routime: 'routime-v2aaa',
  sinonimia: 'sinonimia-v6aaa', teclatlon: 'teclatlon-v4aaa',
};
const CANON = /^<script src="[^"?]+\?v=([a-z0-9-]+)" defer><\/script>$/;
const FORMA_ROTA = /<script s(?!rc=)[^?"']*\?v=[^"']*" defer><\/script>/;

function walk(dir, out) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith('.') || SKIP.has(e.name)) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, out);
    else if (e.isFile() && /\.html?$/i.test(e.name)) out.push(full);
  }
}

let ok = 0; const fallos = [];
for (const p of PROJECTS) {
  const files = []; walk(path.join(ROOT, p), files);
  let n = 0;
  for (const f of files) {
    const src = fs.readFileSync(f, 'utf8');
    if (FORMA_ROTA.test(src)) fallos.push(`ROTA   ${path.relative(ROOT, f)}`);
    src.split(/\r?\n/).forEach((line, i) => {
      if (!line.includes('locale-picker.js?v=')) return;
      const t = line.trim();
      const m = CANON.exec(t);
      if (!m) { fallos.push(`FORMA  ${path.relative(ROOT, f)}:${i + 1}  ${t}`); return; }
      if (m[1] !== ESPERADO[p]) { fallos.push(`TOKEN  ${path.relative(ROOT, f)}:${i + 1}  ${m[1]} != ${ESPERADO[p]}`); return; }
      n++; ok++;
    });
  }
  console.log(`  ${p.padEnd(12)} ${n} etiqueta(s) correcta(s)`);
}
console.log(`\nCorrectas: ${ok}`);
if (fallos.length) {
  console.log(`FALLOS (${fallos.length}):`);
  for (const x of fallos) console.log('  ' + x);
  process.exitCode = 1;
} else {
  console.log('Ninguna etiqueta rota y ningun token fuera de sitio.');
}