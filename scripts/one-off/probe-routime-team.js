#!/usr/bin/env node
/* one-off/probe-routime-team.js

   El emoji del título del módulo 2 de routime/team estaba destruido (U+FFFD)
   en el HTML y en los dos ficheros de traducciones. Ni ui-smoke.js ni
   smoke-sw.js abren team/, así que nada lo cubría: se comprueba aquí
   renderizando de verdad, en español y en inglés.

   Lo que importa no es el fichero: es lo que se ve. Se lee el texto
   RENDERIZADO del h3 con la tabla de traducciones puesta, que es el caso
   normal, y se comprueba que el emoji es el de git (💜) y no un cuadrito. */
'use strict';
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require(path.join(__dirname, '..', '..', 'node_modules', 'playwright'));

const ROOT = path.resolve(__dirname, '..', '..', '..', 'routime');
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json' };

const server = http.createServer((req, res) => {
  const rel = decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '') || 'index.html';
  fs.readFile(path.join(ROOT, rel), (err, buf) => {
    if (err) { res.writeHead(404).end(); return; }
    res.writeHead(200, { 'content-type': MIME[path.extname(rel)] || 'application/octet-stream' });
    res.end(buf);
  });
});

(async () => {
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  const base = `http://127.0.0.1:${server.address().port}`;
  const browser = await chromium.launch();
  const p = await (await browser.newContext()).newPage();
  let fail = 0;

  for (const lang of ['es', 'en']) {
    await p.goto(base + '/team/index.html', { waitUntil: 'load' });
    await p.evaluate((l) => localStorage.setItem('routime:locale', l), lang);
    await p.reload({ waitUntil: 'load' });
    await p.waitForTimeout(700);

    const shown = (await p.locator('[data-i18n="module2Title"]').first().innerText()).trim();
    const hasFffd = shown.includes(String.fromCharCode(0xFFFD));
    const startsHeart = shown.codePointAt(0) === 0x1f49c;
    const ok = !hasFffd && startsHeart;
    if (!ok) fail++;
    console.log(`  ${lang}  ${ok ? 'OK  ' : 'FALLA'}  "${shown}"`);
  }

  // Y el texto tal cual está en el HTML, que es lo que se ve si el JS de
  // traducciones no llega a cargar. Se lee del fichero, NO del DOM: para
  // ver el HTML de reserva de verdad hay que cortar el JS, y `addStyleTag`
  // no lo hace —ya se había ejecutado— así que el DOM seguiría dando la
  // traducción y la comprobación passing sin probar nada.
  const raw = (() => {
    const src = fs.readFileSync(path.join(ROOT, 'team/index.html'), 'utf8');
    const m = src.match(/<h3 data-i18n="module2Title">([^<]*)</);
    return m ? m[1].trim() : '';
  })();
  const rawOk = !!raw && raw.codePointAt(0) === 0x1f49c && !raw.includes(String.fromCharCode(0xFFFD));
  if (!rawOk) fail++;
  console.log(`  html  ${rawOk ? 'OK  ' : 'FALLA'}  "${raw}"   (leido del fichero, sin ejecutar JS)`);

  await browser.close();
  server.close();
  console.log(fail ? `\n${fail} FALLO(S)` : '\nEl emoji se ve bien en español, en ingles y en el HTML de reserva.');
  process.exit(fail ? 1 : 0);
})();
