#!/usr/bin/env node
/* one-off/bump-sw-version.js

   Sube el `VERSION` de sw.js en los proyectos cuyo manifiesto precachea el
   `locale-picker-config.js`. El service worker borra la caché entera al
   cambiar ese valor, así que es lo único que garantiza que quien tiene la
   app instalada no se quede con la config antigua: el desplegable volvería
   a la cabecera y no habría ni un error en ninguna puerta.

   No toca los proyectos cuyo sw.js no lista ese fichero, ni los que ya
   subirían su VERSION después del cambio: el script solo sube si el sw.js
   es MÁS ANTIGUO que el config.

   El número se calcula leyendo el valor actual, no a ciegas, porque el
   repositorio se está tocando en paralelo. */
'use strict';
const fs = require('fs');
const path = require('path');

const SUITE = path.resolve(__dirname, '..', '..', '..');

const PROJECTS = [
  { name: 'calculia', config: 'assets/js/locale-picker-config.js' },
  { name: 'ludia', config: 'assets/js/locale-picker-config.js' },
  { name: 'memofun', config: 'assets/js/locale-picker-config.js' },
  { name: 'okeymoney', config: 'assets/js/locale-picker-config.js' },
  { name: 'routime', config: 'assets/js/locale-picker-config.js' },
  { name: 'sinonimia', config: 'js/locale-picker-config.js' },
];

let touched = 0;
for (const p of PROJECTS) {
  const swFile = path.join(SUITE, p.name, 'sw.js');
  if (!fs.existsSync(swFile)) { console.log(`  ${p.name.padEnd(10)} sin sw.js`); continue; }
  const src = fs.readFileSync(swFile, 'utf8');

  // El manifiesto usa comentarios: puede venir con la línea dentro de un
  // bloque de comentario, así que se busca la ruta suelta.
  const inManifest = src.includes('locale-picker-config.js');
  if (!inManifest) { console.log(`  ${p.name.padEnd(10)} el config no está en su manifiesto: no hay que subir VERSION`); continue; }

  const m = /var VERSION = '([a-z]+)-v(\d+)';/.exec(src);
  if (!m) { console.log(`  ${p.name.padEnd(10)} VERSION con formato desconocido`); continue; }

  const swTime = fs.statSync(swFile).mtimeMs;
  const cfgTime = fs.statSync(path.join(SUITE, p.name, p.config)).mtimeMs;
  if (swTime > cfgTime) {
    console.log(`  ${p.name.padEnd(10)} ${m[1]}-v${m[2]} ya es posterior al config: se deja`);
    continue;
  }

  const next = `var VERSION = '${m[1]}-v${Number(m[2]) + 1}';`;
  fs.writeFileSync(swFile, src.replace(m[0], next), 'utf8');
  console.log(`  ${p.name.padEnd(10)} ${m[1]}-v${m[2]} -> ${m[1]}-v${Number(m[2]) + 1}`);
  touched++;
}
console.log(`\n${touched} VERSION subidas.`);