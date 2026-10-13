// Escaneo AMPLIO de etiquetas <link> / <script> malformadas en todos los HTML
// de la suite. El script de tokens anterior no solo rompio los <script> de
// locale-picker.js: tambien toco el atributo href de varios <link> (CSS) y el
// src de otros <script>. Este validador NO se fija en un literal concreto:
// extrae cada etiqueta y comprueba que:
//   - <link ...> tiene href="RUTA" (no 'h' suelto pegado a la ruta)
//   - <script ...> tiene src="RUTA" o es inline (sin src)
//   - el token ?v= no esta duplicado (patron tipico del fallo)
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..', '..');
const PROJECTS = ['apptonomia', 'calculia', 'ludia', 'memofun', 'okeymoney', 'routime', 'sinonimia', 'teclatlon'];
const SKIP = new Set(['node_modules', '.git', '.wrangler', '.claude', 'dist', 'build']);

// Una etiqueta rota tiene el atributo reducido a una letra + ruta pegada
// ( hRUTA  o  sRUTA ), o un token ?v= duplicado.
const ATRIBUTO_ROTO = /(?:\sh|\ss)(?=[^ >]*[\/.])(?:[^"'\s>]*)/;
const TOKEN_DUP = /[?-]v=([a-z0-9-]*?)\1[a-z0-9-]*/i;

function walk(dir, out) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith('.') || SKIP.has(e.name)) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, out);
    else if (e.isFile() && /\.html?$/i.test(e.name)) out.push(full);
  }
}

let total = 0;
const porProyecto = {};
const detalles = [];

for (const p of PROJECTS) {
  const files = [];
  walk(path.join(ROOT, p), files);
  let n = 0;
  for (const f of files) {
    const src = fs.readFileSync(f, 'utf8');
    const lineas = src.split(/\r?\n/);
    lineas.forEach((line, i) => {
      const Etiquetas = line.match(/<link\b[^>]*>|<script\b[^>]*>/gi);
      if (!Etiquetas) return;
      for (const et of Etiquetas) {
        const esLink = /^<link/i.test(et);
        // <link> debe bring href=" ; <script> debe bring src=" o ser inline.
        const malLink = esLink && /<link\b[^>]*\s(?!href=)[a-z]+\s*=/i.test(et) && !/href=/i.test(et);
        const malScript = !esLink && /<script\b[^>]*\s(?!src=)[a-z]+\s*=/i.test(et) && !/src=/i.test(et) && !/\stype=/i.test(et);
        const dup = TOKEN_DUP.test(et);
        if (malLink || malScript || dup) {
          n++; total++;
          if (detalles.length < 120) detalles.push({ rel: path.relative(ROOT, f).split(path.sep).join('/'), linea: i + 1, et: et.trim() });
        }
      }
    });
  }
  porProyecto[p] = n;
}

console.log('Etiquetas potencialmente malformadas por proyecto:');
for (const p of PROJECTS) console.log('  ' + p.padEnd(12) + porProyecto[p]);
console.log('  TOTAL       ' + total);
console.log('');
for (const d of detalles) {
  console.log('  ' + d.rel + ':' + d.linea);
  console.log('    ' + d.et);
}