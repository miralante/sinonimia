// Escaneo DEFINITIVO y estricto de etiquetas <link>/<script> con el atributo
// href/src truncado. A diferencia del inventario anterior, este NO depende de
// comparar con HEAD (funciona igual en ficheros sin HEAD) y NO se deja atrapar
// por lineas minificadas: recorre el HTML entero con un regex global.
//
// Firma del daño: dentro de una etiqueta <link ...> o <script ...>, aparece un
//   espacio seguido de 'h' o 's' pegado directamente a una ruta que contiene
//   '/' o '.css'/'.js', y NO hay un '="' despues (o sea, el atributo se
//   comio a si mismo: 'h' + ruta en vez de 'href="' + ruta).
//
// Se rechazan los atributos legitimos que empiezan por h/s (href, src,
// sizes, srcset, span...) exigiendo que lo que sigue a la letra sea una RUTA
// (contenga / o terminen en .css/.js).
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..', '..');
const PROJECTS = ['apptonomia', 'calculia', 'ludia', 'memofun', 'okeymoney', 'routime', 'sinonimia', 'teclatlon'];
const SKIP = new Set(['node_modules', '.git', '.wrangler', '.claude', 'dist', 'build']);

// Etiqueta completa.
const ET = /<link\b[^>]*>|<script\b[^>]*>/gi;
// Dentro de la etiqueta, un ' ' + h/s pegado a ruta (contiene / o .css/.js)
const ATRIB = /\s[hs](?=[^ >"']*(?:\/|\.css|\.js))[^"'\s>]*\?v=/;

function walk(dir, out) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith('.') || SKIP.has(e.name)) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, out);
    else if (e.isFile() && /\.html?$/i.test(e.name)) out.push(full);
  }
}

let total = 0;
const porP = {};
const muestras = [];

for (const p of PROJECTS) {
  const files = [];
  walk(path.join(ROOT, p), files);
  let n = 0;
  for (const f of files) {
    const src = fs.readFileSync(f, 'utf8');
    const rel = path.relative(ROOT, f).split(path.sep).join('/');
    ET.lastIndex = 0;
    let m;
    while ((m = ET.exec(src)) !== null) {
      const et = m[0];
      if (ATRIB.test(et)) {
        n++; total++;
        if (muestras.length < 200) muestras.push({ rel, et: et.trim() });
      }
    }
  }
  porP[p] = n;
}

console.log('Etiquetas con atributo h/s truncado (con ?v=), por proyecto:');
for (const p of PROJECTS) console.log('  ' + p.padEnd(12) + porP[p]);
console.log('  TOTAL       ' + total);
console.log('');
for (const d of muestras) {
  console.log('  ' + d.rel);
  console.log('    ' + d.et);
}