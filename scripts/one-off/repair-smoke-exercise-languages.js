#!/usrint/env node
/* eslint-disable */
/* one-off/repair-smoke-exercise-languages.js — versión 2

   Lo que pasó: `src.indexOf('  try {\n', i1)` searches hacia ADELANTE desde
   el `finally`; si no encuentra uno devuelve -1, y `src.slice(0, -1)` es
   "el fichero entero menos el último carácter". Al reensamblar, ese
   `-1` metió la cola del fichero dos veces: quedó una copia de la cabecera
   de `exerciseUnsupportedBrowserLanguage` pegada tras el `}` bueno.

   No se puede tirar el fichero con `git checkout`: tiene 305 líneas sin
   commitear y solo una parte son mías —la otra sesión está trabajando en
   estos repos ahora mismo—. Se repara in situ y con literals exactos.

   1. Se borra el fragmento duplicado.
   2. Se sangra el interior del `try`, que se quedó sin sangrar. */

const fs = require('fs');
const path = require('path');

const SUITE = path.resolve(__dirname, '..', '..', '..');
const FILES = ['calculia', 'ludia', 'memofun', 'okeymoney', 'routime'].map((p) =>
  path.join(SUITE, p, 'scripts', 'ui-smoke.js')
);

const HEAD = "  const page = await context.newPage();\n";
const DUP =
  HEAD +
  '  } finally {\n' +
  '    if (hasDrawer) await closeSettingsDrawer(page);\n' +
  '  }\n' +
  '}\n' +
  '\n' +
  'async function exerciseUnsupportedBrowserLanguage(browser, baseUrl) {\n' +
  '  const context = await browser.newContext({\n' +
  "    locale: 'fr-FR', serviceWorkers: 'block', viewport: { width: 1280, height: 900 },\n" +
  '  });\n' +
  HEAD;
const FIXED_DUP = HEAD + '  try {\n';

const FINALLY =
  '  } finally {\n' +
  '    if (hasDrawer) await closeSettingsDrawer(page);\n' +
  '  }\n' +
  '}\n';

let ok = 0;
for (const file of FILES) {
  const rel = path.relative(SUITE, file);
  let src = fs.readFileSync(file, 'utf8');
  let changed = false;

  if (src.includes(DUP)) {
    src = src.replace(DUP, FIXED_DUP);
    console.log(`  - ${rel}: fragmento duplicado eliminado`);
    changed = true;
  } else if (src.includes(FIXED_DUP)) {
    console.log(`  = ${rel}: sin duplicado`);
  } else {
    console.log(`  ! ${rel}: no encuentro el duplicado — lo reviso a mano`);
    process.exitCode = 1;
    continue;
  }

  // Sangrar el interior del try de exerciseLanguages. `lastIndexOf` hacia
  // ATRÁS a propósito: el `try` que buscamos está antes del `finally`, y el
  // fallo anterior fue buscarlo hacia delante.
  const i = src.indexOf(FINALLY);
  const t = src.lastIndexOf('  try {\n', i);
  if (t !== -1) {
    const start = t + '  try {\n'.length;
    const inner = src.slice(start, i);
    const indented = inner.split('\n').map((l, n) => (n === inner.split('\n').length - 1 || l === '' ? l : '  ' + l)).join('\n');
    src = src.slice(0, start) + indented + src.slice(i);
    console.log(`  + ${rel}: interior del try sangrado`);
    changed = true;
  }

  if (changed) fs.writeFileSync(file, src, 'utf8');
  ok++;
}
console.log(`\n${ok} fichero(s) revisados.`);
