#!/usr/bin/env node
/* one-off/remove-auto-css.js

   Quita los bloques `@media (prefers-color-scheme: dark) { :root:not([data-theme]) … }`
   que implementaban el tema "auto". Sin la opción "auto" el atributo
   `data-theme` lo pone siempre el componente compartido —"light", "dark"
   o "contrast"—, así que `:root:not([data-theme])` ya no puede llegar a
   coincidir: queda muerto y, si alguien lo dejase, seguiría dejando el
   sitio oscuro antes de que corra el JS.

   Se localiza emparejando llaves y no con anclas literales porque ludia lo
   tiene minificado en una sola línea y sinonimia tiene dos bloques, cada
   uno con un comentario distinto delante. Si un fichero ya no tiene
   ninguno, no se toca.

   Cada bloque borrado se enseña por pantalla: saber QUÉ ha desaparecido
   importa más que el recuento. */

'use strict';
const fs = require('fs');
const path = require('path');

const SUITE = path.resolve(__dirname, '..', '..', '..');
const FILES = [
  'apptonomia/css/styles.css',
  'apptonomia/assets/css/tokens.css',
  'calculia/assets/css/tokens.css',
  'ludia/assets/css/styles.css',
  'memofun/assets/css/tokens.css',
  'okeymoney/assets/css/tokens.css',
  'routime/assets/css/tokens.css',
  'sinonimia/css/styles.css',
].filter((rel) => fs.existsSync(path.join(SUITE, rel)));

const MEDIA = /@media\s*\(\s*prefers-color-scheme\s*:\s*dark\s*\)/g;

let total = 0;
for (const rel of FILES) {
  const file = path.join(SUITE, rel);
  let src = fs.readFileSync(file, 'utf8');
  const eol = src.includes('\r\n') ? '\r\n' : '\n';
  let out = src;
  let removed = 0;

  MEDIA.lastIndex = 0;
  let m;
  // Se va de delante hacia atrás: al borrar, los índices anteriores siguen
  // valiendo y los posteriores no.
  const hits = [];
  while ((m = MEDIA.exec(src))) hits.push(m.index);

  for (let i = hits.length - 1; i >= 0; i--) {
    const start = hits[i];
    const braceAt = src.indexOf('{', start);
    if (braceAt === -1) continue;
    let depth = 0;
    let end = -1;
    for (let k = braceAt; k < src.length; k++) {
      if (src[k] === '{') depth++;
      else if (src[k] === '}') { depth--; if (depth === 0) { end = k + 1; break; } }
    }
    if (end === -1) continue;

    const block = src.slice(start, end);
    if (!block.includes(':root:not([data-theme])')) continue;

    // El comentario que lo anuncia va justo delante y también se va: si
    // queda, miente sobre lo que hace la hoja.
    let from = start;
    const before = src.slice(0, start);
    const commentMatch = before.match(/(?:^|\n)([ \t]*\/\*(?:[^*]|\*(?!\/))*\*\/[ \t]*)$/);
    if (commentMatch && /auto|Auto|prefers-color-scheme/i.test(commentMatch[1])) {
      from = start - commentMatch[1].length + (commentMatch[0].startsWith('\n') ? 1 : 0);
      if (commentMatch[0].startsWith('\n')) from -= 0;
      from = start - commentMatch[1].length;
    }

    // Una línea en blanco de más no hace daño pero deja huecos.
    let to = end;
    while (src[to] === '\r' || src[to] === '\n') to++;

    out = out.slice(0, from) + out.slice(to);
    removed++;
    console.log(`  - ${rel}: ${block.replace(/\s+/g, ' ').slice(0, 78)}…`);
  }

  if (removed) {
    fs.writeFileSync(file, out, 'utf8');
    total += removed;
    console.log(`    ${rel}: ${removed} bloque(s) fuera\n`);
  } else {
    console.log(`  = ${rel}: nada que quitar\n`);
  }
}
console.log(`${total} bloque(s) prefers-color-scheme retirados.`);