#!/usr/bin/env node
/* one-off/fix-smoke-indent.js — cosmético

   Dos líneas quedaron con 6 espacios en vez de 4 dentro del `try`: el
   parche anterior las indentó y luego el de reparación las indentó otra
   vez. No cambia el comportamiento; se deja el fichero legible para que
   el siguiente que lo lea no tenga que descifrar por qué ese bloque tiene
   una sangría distinta. */
'use strict';
const fs = require('fs');
const path = require('path');

const SUITE = path.resolve(__dirname, '..', '..', '..');
const FILES = ['calculia', 'ludia', 'memofun', 'okeymoney', 'routime'].map((p) =>
  path.join(SUITE, p, 'scripts', 'ui-smoke.js')
);

const BAD = "      const en = await languageLocator(page, 'en');\n" +
  '      if (!await en.count() || !await en.isVisible().catch(() => false)) return;\n';
const GOOD = "    const en = await languageLocator(page, 'en');\n" +
  '    if (!await en.count() || !await en.isVisible().catch(() => false)) return;\n';

let n = 0;
for (const file of FILES) {
  const src = fs.readFileSync(file, 'utf8');
  if (!src.includes(BAD)) { console.log(`  = ${path.relative(SUITE, file)}: ya nivelado`); continue; }
  fs.writeFileSync(file, src.replace(BAD, GOOD), 'utf8');
  console.log(`  + ${path.relative(SUITE, file)}`);
  n++;
}
console.log(`\n${n} fichero(s) nivelados.`);
