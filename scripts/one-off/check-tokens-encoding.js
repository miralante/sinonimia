#!/usr/bin/env node
/* one-off/check-tokens-encoding.js

   Dos comprobaciones caras sobre los HTML de la suite, porque las dos
   cosas pasan por separado y por caminos distintos:

   1. Token del config — que cada página apunte al `?v=` de su proyecto.
   2. Codificación — que los ficheros que acabamos de reescribir sigan
      siendo UTF-8 válido, CON BOM si lo tenían, con los mismos finales de
      línea, y que no hayan perdido los acentos por el camino.

   Un fichero UTF-8 válido puede llevar los bytes de una doble
   codificación (los acentos salen como `Ã©`) y un fichero al que le hayan
   borrado los acentos sale limpio en cualquier detector de mojibake: por
   eso se comprueban las dos cosas por separado. */
'use strict';
const fs = require('fs');
const path = require('path');

const SUITE = path.resolve(__dirname, '..', '..', '..');
const TOKENS = {
  calculia: '1ab',
  ludia: '2ab',
  memofun: '2ab',
  okeymoney: '1ab',
  routime: '1ab',
  sinonimia: '1ab',
};
const SKIP = /node_modules|graphify-out|test-results|playwright-report|_mojibake|doc[\\/]templates/;

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP.test(e.name)) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, out);
    else if (e.isFile() && /\.html?$/.test(e.name)) out.push(full);
  }
  return out;
}

// Doble codificación UTF-8 leída como cp1252: el segundo byte cae en el
// tramo alto, así que el patrón tiene que cubrir Latin-1 *y* los
// especiales de cp1252 (U+2013-U+2026, U+20AC…).
const MOJIBAKE = /[ÃÂâðï][\u0080-\u00BF\u0152-\u017E\u0192\u2013-\u2026\u2030\u20AC\u2122]/;
const HAS_ACCENT = /[À-ÿ]/;
// written as fromCharCode on purpose: a bare escape in this file survives
// badly in some editors, and an empty regex literal is a *comment* in JS,
// which turns the line below into a syntax error.
const REPLACEMENT_CHAR = String.fromCharCode(0xFFFD);

let badToken = 0;
let files = 0;
const encProblems = [];

for (const [proj, token] of Object.entries(TOKENS)) {
  let projBad = 0;
  for (const file of walk(path.join(SUITE, proj))) {
    const buf = fs.readFileSync(file);
    const src = buf.toString('utf8');
    const rel = path.relative(SUITE, file);
    files++;

    for (const m of src.matchAll(/locale-picker-config\.js(\?v=[^"\s]*)?/g)) {
      if (m[1] !== '?v=' + token) {
        console.log(`  token  ${rel}: ${m[0]}`);
        projBad++; badToken++;
      }
    }

    const hasBOM = buf[0] === 0xef && buf[1] === 0xbb && buf[2] === 0xbf;
    const crlf = (src.match(/\r\n/g) || []).length;
    const loneLf = (src.match(/(?<!\r)\n/g) || []).length;
    if (MOJIBAKE.test(src)) encProblems.push(`${rel}: mojibake`);
    if (src.indexOf(REPLACEMENT_CHAR) !== -1) encProblems.push(`${rel}: U+FFFD`);
    if (!HAS_ACCENT.test(src)) encProblems.push(`${rel}: sin acentos (¿borrados?)`);
    if (hasBOM) encProblems.push(`${rel}: BOM presente`);
    if (loneLf && crlf) encProblems.push(`${rel}: mezcla CRLF(${crlf}) y LF(${loneLf})`);
    if (!crlf && loneLf) encProblems.push(`${rel}: solo LF`);
  }
  console.log(`  ${proj.padEnd(10)} ${projBad ? projBad + ' token(s) raros' : 'tokens OK'}`);
}

console.log(`\n${files} HTML revisados.`);
console.log(badToken ? `${badToken} referencias con token equivocado.` : 'Tokens: OK en los 6 proyectos.');
if (encProblems.length) {
  console.log('\nAvisos de codificación/fin de línea:');
  for (const p of encProblems) console.log('  ' + p);
} else {
  console.log('Codificación: UTF-8 sin BOM, sin mojibake, CRLF uniforme y acentos presentes.');
}
process.exit(badToken ? 1 : 0);
