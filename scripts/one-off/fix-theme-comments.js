#!/usr/bin/env node
/* one-off/fix-theme-comments.js

   Al quitar el tema "auto" también se han ido sus bloques
   `prefers-color-scheme`, pero los comentarios que los describían siguen
   ahí diciendo que el sitio se pone oscuro por preferencia del sistema.
   Un comentario que miente es peor que un comentario que falta: el
   siguiente que lea la hoja creerá que queda un camino sin atributo y
   acabará "reparando" algo que no está roto.

   Las cadenas de abajo están copiadas literalmente de cada fichero (con
   su mezcla de CRLF y LF), y como en el parche anterior se adaptan al
   fin de línea real antes de buscar. Si un ancla no aparece, ese fichero
   se salta sin escribir. */

'use strict';
const fs = require('fs');
const path = require('path');

const SUITE = path.resolve(__dirname, '..', '..', '..');

const EDITS = [
  {
    file: 'apptonomia/css/styles.css',
    from: '/* -------- Tema oscuro --------\n       data-theme="dark", o solo por prefers-color-scheme cuando no hay\n       tema forzado (opción "Auto"). */',
    to: '/* -------- Tema oscuro --------\n' +
        '       data-theme="dark", que es lo que pone el conmutador del engranaje.\n' +
        '       El tema por defecto es "light": antes había un "auto" que dejaba el\n' +
        '       atributo sin poner y delegaba en prefers-color-scheme, así que en un\n' +
        '       equipo en oscuro el sitio salía oscuro sin haberlo pedido. */',
  },
  {
    file: 'calculia/assets/css/tokens.css',
    from: '/* -------- Tema oscuro --------\n   Se aplica con data-theme="dark", o solo por prefers-color-scheme\n   cuando el atributo no está puesto (tema "auto"). */',
    to: '/* -------- Tema oscuro --------\n' +
        '   Se aplica con data-theme="dark", que es lo que pone el conmutador del\n' +
        '   engranaje. El tema por defecto es "light": se ha quitado el "auto", que\n' +
        '   dejaba el atributo sin poner y delegaba en prefers-color-scheme, con lo\n' +
        '   que en un equipo en oscuro el sitio salía oscuro sin haberlo pedido. */',
  },
  {
    file: 'ludia/assets/css/styles.css',
    from: '/* -------- Tema oscuro --------\n   data-theme="dark" lo pone el conmutador del engranaje; si no hay\n   tema forzado (opción "Auto"), lo aplica prefers-color-scheme.\n',
    to: '/* -------- Tema oscuro --------\n' +
        '   data-theme="dark" lo pone el conmutador del engranaje. El tema por defecto\n' +
        '   es "light"; el "auto" que antes seguía al sistema ya no existe.\n',
  },
  {
    file: 'memofun/assets/css/tokens.css',
    from: '/* -------- Dark theme --------\n   data-theme="dark", or on its own via prefers-color-scheme when no\n   theme was forced (the "auto" option). */',
    to: '/* -------- Dark theme --------\n' +
        '   data-theme="dark", which is what the gear switch sets. The default is\n' +
        '   "light": the "auto" option is gone. It used to leave the attribute off and\n' +
        '   let prefers-color-scheme decide, so a dark-OS machine saw a dark site\n' +
        '   that nobody had asked for. */',
  },
  {
    file: 'okeymoney/assets/css/tokens.css',
    from: '/* -------- Dark theme --------\n   data-theme="dark", or via prefers-color-scheme when no theme was\n   forced (the "auto" option). Both the English and the Spanish token\n   families are overridden: the app reads a mix of them. */',
    to: '/* -------- Dark theme --------\n' +
        '   data-theme="dark", which is what the gear switch sets; the default is\n' +
        '   "light" and the "auto" option is gone. Both the English and the Spanish\n' +
        '   token families are overridden: the app reads a mix of them. */',
  },
  {
    file: 'routime/assets/css/tokens.css',
    from: '/* -------- Tema oscuro --------\n   data-theme="dark", o solo por prefers-color-scheme cuando el\n   atributo no está puesto (tema "auto"). */',
    to: '/* -------- Tema oscuro --------\n' +
        '   Se aplica con data-theme="dark", que es lo que pone el conmutador del\n' +
        '   engranaje. El tema por defecto es "light": se ha quitado el "auto", que\n' +
        '   dejaba el atributo sin poner y en un equipo en oscuro el sitio salía\n' +
        '   oscuro sin que nadie lo hubiera pedido. */',
  },
  {
    file: 'sinonimia/css/styles.css',
    from: '/* -------- Tema oscuro --------\n   Lo activa el conmutador del engranaje con data-theme="dark", o solo\n   prefers-color-scheme cuando no hay tema forzado (opcion "Auto").\n   El alto contraste es el tercer tema: data-theme="contrast". */',
    to: '/* -------- Tema oscuro --------\n' +
        '   Lo activa el conmutador del engranaje con data-theme="dark". El tema por\n' +
        '   defecto es "light" y el "auto" ya no existe: delegaba en\n' +
        '   prefers-color-scheme, con lo que en un equipo en oscuro el sitio salía\n' +
        '   oscuro sin que nadie lo hubiera pedido. El alto contraste es el tercer\n' +
        '   tema: data-theme="contrast". */',
  },
];

const withEol = (t, eol) => (eol === '\r\n' ? t.replace(/\n/g, '\r\n') : t);

let ok = 0;
for (const e of EDITS) {
  const file = path.join(SUITE, e.file);
  if (!fs.existsSync(file)) { console.log(`  ? no existe ${e.file}`); process.exitCode = 1; continue; }
  const src = fs.readFileSync(file, 'utf8');
  const eol = src.includes('\r\n') ? '\r\n' : '\n';
  const from = withEol(e.from, eol);
  if (!src.includes(from)) { console.log(`  ! ${e.file}: no encuentro el comentario — no toco nada`); process.exitCode = 1; continue; }
  fs.writeFileSync(file, src.replace(from, withEol(e.to, eol)), 'utf8');
  console.log(`  + ${e.file}`);
  ok++;
}
console.log(`\n${ok}/${EDITS.length} comentarios actualizados.`);