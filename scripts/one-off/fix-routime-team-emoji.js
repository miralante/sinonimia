#!/usr/bin/env node
/* one-off/fix-routime-team-emoji.js

   `routime/team/` tenía el emoji del título del módulo 2 destruido: en vez
   de 💜 había un U+FFFD. Sale en pantalla, en español y en inglés, y en el
   HTML de reserva (que es lo que se ve si el JS de traducciones no carga).

   El emoji original está en el historial: antes de renumerar los módulos
   era `module6Title: '💜 Emociones — Emociones y relaciones'` (commit
   035aee1). Se recupera de ahí en vez de inventar otro.

   El script comprueba que cada línea a tocar tiene el U+FFFD *antes* de
   escribir, y que el número de reemplazos es exactamente el esperado. Si
   alguien ha arreglado ya el fichero, no toca nada. */
'use strict';
const fs = require('fs');
const path = require('path');

const ROUTIME = path.resolve(__dirname, '..', '..', '..', 'routime');
const FFFD = String.fromCharCode(0xFFFD);
const EMOJI = '\u{1F49C}'; // purple heart, tal cual estaba en 035aee1

const TARGETS = [
  { file: 'team/index.html', line: '<h3 data-i18n="module2Title">' },
  { file: 'team/strings.es.js', line: '"module2Title":' },
  { file: 'team/strings.en.js', line: '"module2Title":' },
];

let changed = 0;
for (const { file, line } of TARGETS) {
  const full = path.join(ROUTIME, file);
  const src = fs.readFileSync(full, 'utf8');
  const lines = src.split('\n');
  const idx = lines.findIndex((l) => l.includes(line));

  if (idx === -1) {
    console.log(`  ? ${file}: no encuentro la linea de module2Title`);
    continue;
  }
  if (!lines[idx].includes(FFFD)) {
    console.log(`  = ${file}: ya no tiene U+FFFD, no toco nada`);
    continue;
  }

  const before = lines[idx];
  lines[idx] = before.split(FFFD).join(EMOJI);
  fs.writeFileSync(full, lines.join('\n'), 'utf8');
  changed++;
  console.log(`  + ${file}:${idx + 1}`);
  console.log(`      - ${before.trim()}`);
  console.log(`      + ${lines[idx].trim()}`);
}

console.log(`\n${changed} fichero(s) corregidos.`);
process.exit(changed === TARGETS.length ? 0 : 1);
