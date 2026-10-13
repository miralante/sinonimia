#!/usr/bin/env node
/* one-off/bump-sw-for-theme.js

   Sube la VERSION de los `sw.js` que cachean ficheros cambiados en esta
   tanda (el componente `locale-picker.js` y las hojas de tokens/styles).

   No sirve apoyarse en `check-version-bump.js` para esto: ese script
   compara commits, no el árbol de trabajo, así que mientras los cambios no
   estén commiteados da verde sin haber mirado nada de lo que he escrito.
   Es lo que ha pasado: con el árbol lleno de cambios sin commitear ha
   informado "VERSION correctly bumped" sin haber comprobado nada de lo
   que he escrito.

   El patrón se valida antes de escribir y se escribe solo si encaja. */

'use strict';
const fs = require('fs');
const path = require('path');

const SUITE = path.resolve(__dirname, '..', '..', '..');
const PROJECTS = ['calculia', 'ludia', 'memofun', 'okeymoney', 'routime', 'sinonimia', 'teclatlon'];

const RE = /(var\s+VERSION\s*=\s*')([^']+)(')/;

let ok = 0;
for (const proj of PROJECTS) {
  const file = path.join(SUITE, proj, 'sw.js');
  if (!fs.existsSync(file)) { console.log(`  ? ${proj}: sin sw.js`); continue; }
  const src = fs.readFileSync(file, 'utf8');
  const m = src.match(RE);
  if (!m) { console.log(`  ! ${proj}: no encuentro "var VERSION = '…'" — no toco nada`); process.exitCode = 1; continue; }

  const [full, head, current, tail] = m;
  const next = current.replace(/v(\d+)$/, (_, n) => `v${Number(n) + 1}`);
  if (next === current) {
    console.log(`  ! ${proj}: "${current}" no termina en -vN, no sé cómo subirlo — no toco nada`);
    process.exitCode = 1;
    continue;
  }
  fs.writeFileSync(file, src.replace(full, head + next + tail), 'utf8');
  console.log(`  + ${proj.padEnd(11)} ${current} -> ${next}`);
  ok++;
}
console.log(`\n${ok}/${PROJECTS.length} sw.js con VERSION subida.`);