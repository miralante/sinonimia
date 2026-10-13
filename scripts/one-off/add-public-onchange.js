#!/usr/bin/env node
/* one-off/add-public-onchange.js

   Implementa el hook público `window.LocalePicker.onChange` que el propio
   componente documenta desde hace meses pero que nunca existió: se
   mencionaba en la cabecera del fichero y no había ni una línea de código
   que lo creara.

   Por qué hace falta, con un caso real: las páginas estáticas de sinonimia
   (about/, legal/, config/) no cargan js/i18n.js, así que no tienen
   `App.i18n`, y su contenido no son tablas sino pares de bloques
   `[data-lang-block="es"|"en"]` que about.js muestra u oculta moviendo
   `data-lang` en <html>. El desplegable escribía el localStorage, avisaba a
   nadie y se quedaba vivo y mudo: se pulsaba "English" y la página
   seguía en español. Medido en el navegador antes de este cambio.

   El hook se llama SIEMPRE, tenga la app `App.i18n` o no: en las páginas
   con tablas ya se han re-aplicado las traducciones, y a esas apps les
   llega un aviso extra que no escuchan. Con eso las cuatro páginas se
   comportan igual que el resto de la suite: un solo control de idioma y
   funciona.

   Las ocho copias del componente deben quedar byte a byte idénticas, que
   es como las mantiene la suite; el script lo comprueba antes de escribir. */
'use strict';
const fs = require('fs');
const path = require('path');

const SUITE = path.resolve(__dirname, '..', '..', '..');

const JS = {
  apptonomia: 'assets/js/locale-picker.js',
  calculia: 'assets/js/locale-picker.js',
  ludia: 'assets/js/locale-picker.js',
  memofun: 'assets/js/locale-picker.js',
  okeymoney: 'assets/js/locale-picker.js',
  routime: 'assets/js/locale-picker.js',
  sinonimia: 'js/locale-picker.js',
  teclatlon: 'assets/js/locale-picker.js',
};

const PATCHES = [
  /* 1) La cabecera prometía un hook que no existía: se documenta bien. */
  [
    "   - Si no, expone `window.LocalePicker.onChange(locale, nativeName)` y\n" +
    "     la app debe implementar su propio handler.\n",
    "   - Si no, la app registra `window.LocalePicker.onChange(locale,\n" +
    "     nativeName, prev)`. Se llama SIEMPRE, tenga o no `App.i18n`:\n" +
    "     hay páginas cuyo contenido no son tablas sino pares de bloques\n" +
    "     `[data-lang-block]` que se muestran u ocultan moviendo un\n" +
    "     atributo en <html> (las about/ legal/ config/ de sinonimia).\n"
  ],
  /* 2) El objeto público, que antes no se creaba en ningún punto. */
  [
    "  var cfg = window.LocalePickerConfig || {};\n",
    "  /* Punto de enganche público. Una página sin `App.i18n` registra aquí\n" +
    "     su manejador y el componente se lo llama en cada cambio de idioma\n" +
    "     (ver apply(), paso 2b). Antes este objeto no lo creaba nadie y el\n" +
    "     hook solo existía en el comentario de arriba. */\n" +
    "  window.LocalePicker = window.LocalePicker || {};\n" +
    "  var cfg = window.LocalePickerConfig || {};\n"
  ],
  /* 3) El aviso, después del callback de configuración. */
  [
    "    /* 2) Callback custom (para apps que no usan App.i18n). */\n" +
    "    if (typeof ON_CHANGE === 'function') {\n" +
    "      ON_CHANGE(chosen, NATIVE_LABELS[chosen] || chosen.toUpperCase());\n" +
    "    }\n",
    "    /* 2) Callback custom (para apps que no usan App.i18n). */\n" +
    "    if (typeof ON_CHANGE === 'function') {\n" +
    "      ON_CHANGE(chosen, NATIVE_LABELS[chosen] || chosen.toUpperCase());\n" +
    "    }\n" +
    "\n" +
    "    /* 2b) Hook público `window.LocalePicker.onChange`. Va DESPUÉS del\n" +
    "       camino de App.i18n a propósito: en las apps con tablas las\n" +
    "       traducciones ya están aplicadas y este aviso solo les llega a las\n" +
    "       que se hayan registrado. Sin él, una página sin App.i18n recibe\n" +
    "       el cambio de idioma en el localStorage y en nada más: el\n" +
    "       desplegable parece funcionar y la página no se entera. */\n" +
    "    if (typeof window.LocalePicker.onChange === 'function') {\n" +
    "      window.LocalePicker.onChange(\n" +
    "        chosen,\n" +
    "        NATIVE_LABELS[chosen] || chosen.toUpperCase(),\n" +
    "        prev\n" +
    "      );\n" +
    "    }\n"
  ],
];

const ref = path.join(SUITE, 'sinonimia', JS.sinonimia);
const raw = fs.readFileSync(ref, 'utf8');
const crlf = raw.indexOf('\r\n') !== -1;
let text = crlf ? raw.replace(/\r\n/g, '\n') : raw;

PATCHES.forEach(([find, replace], i) => {
  const at = text.indexOf(find);
  if (at === -1) throw new Error(`locale-picker.js: no aparece el parche ${i + 1}.\n${find.slice(0, 160)}`);
  if (at !== text.lastIndexOf(find)) throw new Error(`locale-picker.js: el parche ${i + 1} aparece más de una vez.`);
  text = text.replace(find, replace);
});

/* Salvaguarda: si dos proyectos ya no eran idénticos, esta escritura se
   pisaría una versión propia. */
const targets = Object.keys(JS).map((p) => path.join(SUITE, p, JS[p]));
const contents = targets.map((f) => fs.readFileSync(f, 'utf8'));
contents.forEach((cur, i) => {
  if (cur !== contents[0]) throw new Error('Las ocho copias ya no eran idénticas: ' + targets[i]);
});

const out = crlf ? text.replace(/\n/g, '\r\n') : text;
targets.forEach((f) => fs.writeFileSync(f, out, 'utf8'));
console.log('OK  ' + targets.length + ' copias escritas, ' + PATCHES.length + ' parches.');