#!/usr/bin/env node
/* one-off/bump-tokens-idioma-fix.js

   Deja los `?v=` de sinonimia en un único valor por fichero, en las siete
   páginas, después de arreglar el idioma en las estáticas.

   Por qué hace falta: el arreglo del idioma tocó tres ficheros que las
   páginas cargan —`js/locale-picker.js` (el hook), `css/styles.css` (las
   reglas `[data-lang-block]`) y `about/about.js` (quien registra el hook)—.
   Con el token viejo en el navegador se sirve la copia anterior: el
   desplegable vuelve a no hacer nada y nobody lo ve, porque la página
   sigue teniendo el aspecto de siempre. Es el fallo más caro de esta
   familia y el que más veces ha salido en la suite.

   Tokens resultantes, uno por fichero para que las siete páginas
   compartan la misma copia en caché:

     css/styles.css                -> sinonimia-v5
     css/locale-picker.css         -> sinonimia-v6aa
     js/locale-picker.js           -> sinonimia-v6aa
     js/locale-picker-config.js    -> 1        (no ha cambiado)
     about/about.js                -> about-v1 (ha cambiado)

   Solo se toca la query. Nunca la ruta. Cada par tiene que aparecer
   exactamente una vez, y el script para sin escribir si no. */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');

const EDITS = [
  ['404.html', [
    ['href="css/styles.css"', 'href="css/styles.css?v=sinonimia-v5"'],
    ['locale-picker.css?v=sinonimia-v5aa', 'locale-picker.css?v=sinonimia-v6aa'],
    ['locale-picker.js?v=sinonimia-v5aa', 'locale-picker.js?v=sinonimia-v6aa'],
  ]],
  ['index.html', [
    ['href="css/styles.css?v=sinonimia-v4"', 'href="css/styles.css?v=sinonimia-v5"'],
    ['locale-picker.css?v=sinonimia-v5aa', 'locale-picker.css?v=sinonimia-v6aa'],
    ['locale-picker.js?v=sinonimia-v5aa', 'locale-picker.js?v=sinonimia-v6aa'],
  ]],
  ['about/index.html', [
    ['href="../css/styles.css"', 'href="../css/styles.css?v=sinonimia-v5"'],
    ['locale-picker.css?v=sinonimia-v5aa', 'locale-picker.css?v=sinonimia-v6aa'],
    ['locale-picker.js?v=sinonimia-v5aa', 'locale-picker.js?v=sinonimia-v6aa'],
    ['src="about.js"', 'src="about.js?v=about-v1"'],
  ]],
  ['config/index.html', [
    ['href="../css/styles.css?v=sinonimia-v4"', 'href="../css/styles.css?v=sinonimia-v5"'],
    ['locale-picker.css?v=sinonimia-v5aa', 'locale-picker.css?v=sinonimia-v6aa'],
    ['locale-picker.js?v=sinonimia-v5aa', 'locale-picker.js?v=sinonimia-v6aa'],
    ['src="../about/about.js"', 'src="../about/about.js?v=about-v1"'],
  ]],
  ['team/index.html', [
    ['href="../css/styles.css"', 'href="../css/styles.css?v=sinonimia-v5"'],
    ['locale-picker.css?v=sinonimia-v5aa', 'locale-picker.css?v=sinonimia-v6aa'],
    ['locale-picker.js?v=sinonimia-v5aa', 'locale-picker.js?v=sinonimia-v6aa'],
  ]],
  ['legal/index.html', [
    ['href="../css/styles.css"', 'href="../css/styles.css?v=sinonimia-v5"'],
    ['locale-picker.css?v=sinonimia-v5aa', 'locale-picker.css?v=sinonimia-v6aa'],
    ['locale-picker.js?v=sinonimia-v5aa', 'locale-picker.js?v=sinonimia-v6aa'],
    ['src="../about/about.js"', 'src="../about/about.js?v=about-v1"'],
  ]],
  ['legal/privacidad.html', [
    ['href="../css/styles.css"', 'href="../css/styles.css?v=sinonimia-v5"'],
    ['locale-picker.css?v=sinonimia-v5aa', 'locale-picker.css?v=sinonimia-v6aa'],
    ['locale-picker.js?v=sinonimia-v5aa', 'locale-picker.js?v=sinonimia-v6aa'],
    ['src="../about/about.js"', 'src="../about/about.js?v=about-v1"'],
  ]],
];

let total = 0;
for (const [rel, pairs] of EDITS) {
  const src = fs.readFileSync(path.join(ROOT, rel), 'utf8');
  for (const [find] of pairs) {
    const at = src.indexOf(find);
    if (at === -1) throw new Error(rel + ': no aparece «' + find + '»');
    if (at !== src.lastIndexOf(find)) throw new Error(rel + ': «' + find + '» aparece más de una vez');
    total++;
  }
}

for (const [rel, pairs] of EDITS) {
  const file = path.join(ROOT, rel);
  let src = fs.readFileSync(file, 'utf8');
  for (const [find, replace] of pairs) src = src.replace(find, replace);
  fs.writeFileSync(file, src, 'utf8');
  console.log('  ' + rel.padEnd(20) + pairs.length + ' token(s)');
}
console.log('\n' + total + ' tokens en ' + EDITS.length + ' ficheros.');