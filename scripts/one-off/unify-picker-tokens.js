#!/usr/bin/env node
/* one-off/unify-picker-tokens.js

   Sube el sw.js VERSION y unifica el `?v=` del componente en las cinco
   páginas de sinonimia que lo cargan. Sin BOM y sin acentos que interpretar:
   todo el trabajo se hace en Node, no en PowerShell.

   Por qué:

   1) sw.js — ya cubierto, no se toca. `VERSION` está en `sinonimia-v448`
      y su fichero se escribió a las 22:42, después de que este proyecto
      recibiera el componente unificado (21:39). Como el service worker
      borra la caché `sinonimia-<VERSION>` entera al activarse, cualquier
      subida posterior al cambio vuelve a pedir `./js/locale-picker.js`
      desde la red: el fichero nuevo entra en la caché sin tocar el
      VERSION aquí. Subirlo otra vez sería ruido.

   2) Los tokens. El mismo fichero estaba referenciado con cinco valores
      distintos: `?v=sinonimia-v2d` (css de la portada), `?v=sinonimia-v4`
      (js de la portada), `?v=sinonimia-v4aa` (subpáginas), `?v=1` (config) y
      sin token (404.html y el config de la portada). Cinco URLs = cinco
      entradas en la caché del service worker, porque `caches.match(request)`
      compara la URL COMPLETA, query incluida. El comentario de las
      subpáginas dice "Mismo ?v= que la portada, para que las dos páginas
      compartan la copia en caché": eso era intención y no lo-era.

      Se elige `sinonimia-v5aa`, que sigue la serie `v4aa` y es un valor
      nuevo: obligatorio, porque el contenido del componente ha cambiado y
      con un token viejo el navegador pediría la copia antigua.

      Solo se toca la query. La ruta no se reescribe nunca. */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const COMPONENT_TOKEN = 'sinonimia-v5aa';
const CONFIG_TOKEN = '1';

/* [fichero, [[viejo, nuevo], …]] — cada par tiene que aparecer exactamente
   una vez; si aparece cero o varias, el script para sin escribir. */
const EDITS = [
  ['404.html', [
    ['href="css/locale-picker.css"', 'href="css/locale-picker.css?v=' + COMPONENT_TOKEN + '"'],
    ['src="js/locale-picker-config.js"', 'src="js/locale-picker-config.js?v=' + CONFIG_TOKEN + '"'],
    ['src="js/locale-picker.js"', 'src="js/locale-picker.js?v=' + COMPONENT_TOKEN + '"'],
  ]],
  ['index.html', [
    ['href="css/locale-picker.css?v=sinonimia-v2d"', 'href="css/locale-picker.css?v=' + COMPONENT_TOKEN + '"'],
    ['src="js/locale-picker-config.js"', 'src="js/locale-picker-config.js?v=' + CONFIG_TOKEN + '"'],
    ['src="js/locale-picker.js?v=sinonimia-v4"', 'src="js/locale-picker.js?v=' + COMPONENT_TOKEN + '"'],
  ]],
  ['about/index.html', [
    ['locale-picker.css?v=sinonimia-v4aa', 'locale-picker.css?v=' + COMPONENT_TOKEN],
    ['locale-picker.js?v=sinonimia-v4aa', 'locale-picker.js?v=' + COMPONENT_TOKEN],
  ]],
  ['config/index.html', [
    ['locale-picker.css?v=sinonimia-v4aa', 'locale-picker.css?v=' + COMPONENT_TOKEN],
    ['locale-picker.js?v=sinonimia-v4aa', 'locale-picker.js?v=' + COMPONENT_TOKEN],
  ]],
  ['team/index.html', [
    ['locale-picker.css?v=sinonimia-v4aa', 'locale-picker.css?v=' + COMPONENT_TOKEN],
    ['locale-picker.js?v=sinonimia-v4aa', 'locale-picker.js?v=' + COMPONENT_TOKEN],
  ]],
];

/* 1) Validar todo antes de escribir nada. */
let total = 0;
for (const [rel, pairs] of EDITS) {
  const src = fs.readFileSync(path.join(ROOT, rel), 'utf8');
  for (const [find] of pairs) {
    const at = src.indexOf(find);
    if (at === -1) throw new Error(rel + ': no aparece «' + find + '»');
    if (at !== src.lastIndexOf(find)) {
      throw new Error(rel + ': «' + find + '» aparece más de una vez');
    }
    total++;
  }
}

/* 2) Escribir. Los bytes no se tocan: solo se sustituye texto, y los
      ficheros conservan su BOM y sus finales de línea tal cual. */
for (const [rel, pairs] of EDITS) {
  const file = path.join(ROOT, rel);
  let src = fs.readFileSync(file, 'utf8');
  const before = src;
  for (const [find, replace] of pairs) src = src.replace(find, replace);
  if (src === before) throw new Error(rel + ': no cambió nada');
  fs.writeFileSync(file, src, 'utf8');
  console.log('  ' + rel.padEnd(20) + pairs.length + ' cambio(s)');
}

console.log('\n' + total + ' cambios en ' + EDITS.length + ' ficheros.');