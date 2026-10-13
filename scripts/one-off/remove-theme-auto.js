#!/usr/bin/env node
/* one-off/remove-theme-auto.js

   Quita el tema "auto" del componente compartido de los ajustes y pone
   "light" por defecto, en las 8 copias de `locale-picker.js`.

   Por qué: "auto" no fijaba atributo y delegaba en
   `prefers-color-scheme`, así que en un equipo en modo oscuro el sitio
   aparecía oscuro sin que nadie lo hubiera pedido. Solo había dos caminos
   útiles —claro u oscuro— y "auto" era un tercero que no elegía nada.

   Siete cambios en el mismo fichero, todos con ancla literal: si una no
   aparece, ese fichero se salta SIN escribir. Es lo que evita el fallo de
   encadenar parches sobre parches: si un ancla no está, el fichero tiene
   otra forma y no es este script quien la va a fabricar. */

'use strict';
const fs = require('fs');
const path = require('path');

const SUITE = path.resolve(__dirname, '..', '..', '..');
const COPIES = {
  apptonomia: 'assets/js/locale-picker.js',
  calculia: 'assets/js/locale-picker.js',
  ludia: 'assets/js/locale-picker.js',
  memofun: 'assets/js/locale-picker.js',
  okeymoney: 'assets/js/locale-picker.js',
  routime: 'assets/js/locale-picker.js',
  teclatlon: 'assets/js/locale-picker.js',
  sinonimia: 'js/locale-picker.js',
};

const EDITS = [
  {
    what: 'cadena themeAuto en español',
    from: "theme: 'Tema', themeAuto: 'Auto', themeLight: 'Claro', themeDark: 'Oscuro',",
    to: "theme: 'Tema', themeLight: 'Claro', themeDark: 'Oscuro',",
  },
  {
    what: 'cadena themeAuto en inglés',
    from: "theme: 'Theme', themeAuto: 'Auto', themeLight: 'Light', themeDark: 'Dark',",
    to: "theme: 'Theme', themeLight: 'Light', themeDark: 'Dark',",
  },
  {
    what: 'lista THEMES y su comentario',
    from:
      '  /* Temas que la suite soporta. "auto" no fija atributo: deja que el\n' +
      '     navegador aplique prefers-color-scheme. Los otros tres se aplican\n' +
      '     con data-theme, que es lo que las paletas oscuras de cada tokens.css\n' +
      '     escuchan. */\n' +
      "  var THEMES = ['auto', 'light', 'dark'];",
    to:
      '  /* Temas que la suite soporta: claro y oscuro. Antes estaba tambien\n' +
      '     "auto", que no fijaba atributo y dejaba que el navegador aplicase\n' +
      '     prefers-color-scheme; en un equipo en oscuro el sitio salia\n' +
      '     oscuro sin que nadie lo hubiera pedido, y eso no es elegir un\n' +
      '     tema. Los dos valores se aplican con data-theme, que es lo que\n' +
      '     escuchan las paletas de cada tokens.css. Un "auto" ya guardado se\n' +
      '     migra a "light" al leer, por no estar en la lista. */\n' +
      "  var THEMES = ['light', 'dark'];",
  },
  {
    what: 'tema por defecto al leer lo guardado',
    from: "      theme: THEMES.indexOf(saved.theme) !== -1 ? saved.theme : 'auto',",
    to: "      theme: THEMES.indexOf(saved.theme) !== -1 ? saved.theme : 'light',",
  },
  {
    what: 'applyTheme sin la rama que quitaba el atributo',
    from:
      "    if (settingsState.contrast) {\n" +
      "      html.setAttribute('data-theme', 'contrast');\n" +
      "    } else if (settingsState.theme === 'auto') {\n" +
      "      html.removeAttribute('data-theme');\n" +
      '    } else {\n' +
      "      html.setAttribute('data-theme', settingsState.theme);\n" +
      '    }',
    to:
      "    if (settingsState.contrast) {\n" +
      "      html.setAttribute('data-theme', 'contrast');\n" +
      '    } else {\n' +
      "      /* Siempre se fija el atributo. Antes el tema \"auto\" lo quitaba y\n" +
      "         dejaba `:root:not([data-theme])` de las hojas de tokens decidir\n" +
      "         por prefers-color-scheme; sin \"auto\" ese bloque ya no decide\n" +
      "         nada, porque data-theme siempre esta. */\n" +
      "      html.setAttribute('data-theme', settingsState.theme);\n" +
      '    }',
  },
  {
    what: 'texto del boton Auto en el cajon',
    from: "    drawer.querySelector('[data-settings-theme-auto]').textContent = copy.themeAuto;\n",
    to: '',
  },
  {
    what: 'boton Auto en el markup del cajon',
    from:
      '            \'<button type="button" data-settings-theme="auto" data-settings-theme-auto></button>\' +\n',
    to: '',
  },
  {
    what: 'el contraste se apaga siempre al elegir tema',
    from:
      '        /* Elegir un tema concreto apaga el alto contraste: si no, el\n' +
      '           contraste se comería la elección y los botones aparecerían\n' +
      '           pulsados sin efecto visible. */\n' +
      "        if (chosen !== 'auto') settingsState.contrast = false;",
    to:
      '        /* Elegir un tema apaga el alto contraste: si no, el contraste\n' +
      '           se comería la eleccion y los botones aparecerian pulsados\n' +
      '           sin efecto visible. */\n' +
      '        settingsState.contrast = false;',
  },
];

/* Las anclas de arriba están escritas con \n porque en un script es lo
   natural, pero los ficheros de la suite usan CRLF (680 CRLF y cero LF
   sueltos en locale-picker.js). Buscar "\n" dentro de un fichero CRLF no
   encuentra nada, y el resultado es que el guard de "si falta el ancla,
   no escribo" salta siempre y no cambia ni un solo fichero: parece un
   error de las anclas cuando el problema son los finales de línea. */
function withEol(text, eol) {
  return eol === '\r\n' ? text.replace(/\n/g, '\r\n') : text;
}

let ok = 0;
for (const [proj, rel] of Object.entries(COPIES)) {
  const file = path.join(SUITE, proj, rel);
  if (!fs.existsSync(file)) { console.log(`  ? ${proj}: no existe ${rel}`); process.exitCode = 1; continue; }
  let src = fs.readFileSync(file, 'utf8');

  // ¿ya aplicado?
  if (src.includes("var THEMES = ['light', 'dark'];")) { console.log(`  = ${proj}: ya sin auto`); ok++; continue; }

  const eol = src.includes('\r\n') ? '\r\n' : '\n';
  const edits = EDITS.map((e) => ({ what: e.what, from: withEol(e.from, eol), to: withEol(e.to, eol) }));

  const missing = edits.filter((e) => !src.includes(e.from));
  if (missing.length) {
    console.log(`  ! ${proj}: NO toco nada; faltan ${missing.length} ancla(s): ${missing.map((m) => m.what).join(', ')}`);
    process.exitCode = 1;
    continue;
  }

  for (const e of edits) src = src.replace(e.from, e.to);
  fs.writeFileSync(file, src, 'utf8');
  console.log(`  + ${proj}: ${edits.length} cambios (eol ${JSON.stringify(eol)})`);
  ok++;
}
console.log(`\n${ok}/8 copias actualizadas.`);