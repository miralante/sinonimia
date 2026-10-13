#!/usr/bin/env node
/* one-off/fix-config-tokens.js

   Fuerza el `?v=` del `locale-picker-config.js` al valor de cada proyecto
   en todas sus páginas. Es idempotente a propósito: se puede volver a
   lanzar cuando algo reescriba una página por debajo (en este repo hay
   otra sesión tocando ficheros a la vez) y solo cambia lo que no coincide.

   El componente no ha cambiado en esta tanda —la opción `languageInDrawer`
   ya existía— pero el contenido del config sí, y con el token viejo el
   navegador se queda con la copia anterior: el desplegable sigue en la
   cabecera, sin un solo error en ninguna puerta. */
'use strict';
const fs = require('fs');
const path = require('path');

const SUITE = path.resolve(__dirname, '..', '..', '..');

const PROJECTS = {
  calculia: '1ab',
  ludia: '2ab',
  memofun: '2ab',
  okeymoney: '1ab',
  routime: '1ab',
  sinonimia: '1ab',
};

function htmlFiles(dir) {
  const out = [];
  (function walk(d) {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      if (/node_modules|graphify-out|_mojibake|doc[\\/]templates|test-results|playwright-report/.test(e.name)) continue;
      const full = path.join(d, e.name);
      if (e.isDirectory()) walk(full);
      else if (e.isFile() && /\.html?$/.test(e.name)) out.push(full);
    }
  })(dir);
  return out;
}

let fixed = 0;
for (const [name, token] of Object.entries(PROJECTS)) {
  const projDir = path.join(SUITE, name);

  const cfgRel = name === 'sinonimia' ? 'js/locale-picker-config.js' : 'assets/js/locale-picker-config.js';
  const cfg = fs.readFileSync(path.join(projDir, cfgRel), 'utf8');
  const hasFlag = /languageInDrawer:\s*true/.test(cfg);
  if (!hasFlag) console.log(`  \u26a0 ${name}: el config NO tiene languageInDrawer — revisa que nadie lo haya revertido`);

  let pages = 0;
  let changed = 0;
  for (const file of htmlFiles(projDir)) {
    const src = fs.readFileSync(file, 'utf8');
    if (src.indexOf('locale-picker-config.js') === -1) continue;
    pages++;
    const next = src.replace(/locale-picker-config\.js(\?v=[^"\s]*)?/g, 'locale-picker-config.js?v=' + token);
    if (next !== src) { fs.writeFileSync(file, next, 'utf8'); changed++; fixed++; }
  }
  console.log(`  ${name.padEnd(10)} flag=${hasFlag ? 'si' : 'NO'}  ${pages} paginas, ${changed} corregidas -> ?v=${token}`);
}
console.log(`\n${fixed} referencias corregidas.`);