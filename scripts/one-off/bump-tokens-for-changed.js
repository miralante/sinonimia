#!/usr/bin/env node
/* one-off/bump-tokens-for-changed.js

   Sube el `?v=` de las referencias que apuntan a un fichero concreto, sin
   tocar el resto. Hay 42 páginas de routime que comparten el token
   `routime-v3bce` entre `assets/css/tokens.css` y el `styles.css` de cada
   herramienta: subir el token a ojo tocaría también las hojas que no he
   modificado, y no subir el de tokens.css dejaría a los navegadores con
   la copia vieja —que es justo la que tenía el bloque `prefers-color-scheme`.

   Por eso no hay ni un token escrito a mano aquí: se recorre cada HTML, se
   resuelve cada href/src contra el directorio de esa página y se compara
   con la ruta real del fichero. Solo se toca lo que apunta exactamente al
   fichero cambiado.

   El token se incrementa añadiendo una letra al final, que es como lo hace
   el resto de la suite (`1aa` -> `1aaa`), y se avisa de cada cambio. */

'use strict';
const fs = require('fs');
const path = require('path');

const SUITE = path.resolve(__dirname, '..', '..', '..');

// Ficheros cuyo contenido cambió en esta tanda y necesitan token nuevo.
const CHANGED = {
  apptonomia: ['assets/js/locale-picker.js', 'css/styles.css'],
  calculia: ['assets/js/locale-picker.js', 'assets/css/tokens.css'],
  ludia: ['assets/js/locale-picker.js', 'assets/css/styles.css'],
  memofun: ['assets/js/locale-picker.js', 'assets/css/tokens.css'],
  okeymoney: ['assets/js/locale-picker.js', 'assets/css/tokens.css'],
  routime: ['assets/js/locale-picker.js', 'assets/css/tokens.css'],
  teclatlon: ['assets/js/locale-picker.js'],
  sinonimia: ['js/locale-picker.js', 'css/styles.css'],
};

const SKIP = /node_modules|graphify-out|test-results|playwright-report|_mojibake|doc[\\/]templates|scripts[\\/]download/;

function htmlFiles(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP.test(e.name)) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) htmlFiles(full, out);
    else if (e.isFile() && /\.html?$/.test(e.name)) out.push(full);
  }
  return out;
}

// Devuelve la ruta del repo a la que apunta `ref` desde la página `page`.
function resolveTarget(page, ref) {
  const clean = ref.split('#')[0].split('?')[0];
  if (/^https?:|^\/\//i.test(clean)) return null; // CDN u otra web
  const abs = clean.startsWith('/')
    ? path.join(SUITE, clean.replace(/^\/+/, ''))          // raíz del sitio
    : path.resolve(path.dirname(page), clean);
  return path.relative(SUITE, abs).replace(/\\/g, '/');
}

const ATTRS = /(href|src)=("([^"]*)"|'([^']*)')/g;

let touched = 0;
for (const [proj, files] of Object.entries(CHANGED)) {
  // Ojo con el prefijo: `resolveTarget` devuelve la ruta DESDE LA RAÍZ de
  // la suite ("apptonomia/assets/js/locale-picker.js"), no la relativa al
  // proyecto. Sin este prefijo el `wanted.has(target)` no cuadra nunca y el
  // script recorre los ocho proyectos sin tocar nada, en silencio.
  const wanted = new Set(files.map((f) => `${proj}/${f}`));
  const projDir = path.join(SUITE, proj);
  let changed = 0;

  for (const page of htmlFiles(projDir)) {
    const src = fs.readFileSync(page, 'utf8');
    // Se juntan primero todas las sustituciones y se aplican DE FINAL A
    // PRINCIPIO. Cada token crece en un caracter, así que si se fuera
    // aplicando en orden, el indice del segundo match —sacado de `src`—
    // ya no apuntaría al sitio correcto en `next`.
    const edits = [];

    ATTRS.lastIndex = 0;
    let m;
    while ((m = ATTRS.exec(src))) {
      const raw = m[3] !== undefined ? m[3] : m[4];
      const q = raw.indexOf('?');
      if (q === -1) continue;
      // Ojo: raw.slice(q) empieza por "?", así que el prefijo que hay que
      // mirar es el que va DESPUÉS del interrogante.
      const after = raw.slice(q + 1);
      if (!after.startsWith('v=')) continue;
      const token = after.slice(2);
      if (!token) continue;
      const target = resolveTarget(page, raw);
      if (!target || !wanted.has(target)) continue;
      if (!fs.existsSync(path.join(SUITE, target))) continue;

      const pos = m[2].lastIndexOf(raw);
      edits.push({ at: m.index + pos, len: raw.length, text: raw.slice(0, q) + '?v=' + token + 'a' });
    }

    if (!edits.length) continue;
    let next = src;
    for (const e of edits.reverse()) {
      next = next.slice(0, e.at) + e.text + next.slice(e.at + e.len);
    }
    fs.writeFileSync(page, next, 'utf8');
    changed++;
  }
  console.log(`  ${proj.padEnd(11)} ${changed} pagina(s) con token subido  (${files.join(', ')})`);
  touched += changed;
}
console.log(`\n${touched} páginas actualizadas.`);