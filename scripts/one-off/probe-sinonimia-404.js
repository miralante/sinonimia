#!/usr/bin/env node
/* one-off/probe-sinonimia-404.js

   El test 17h de sinonimia se cuelga al cambiar de idioma en `404.html`.
   Playwright solo da "Test timeout of 120000ms exceeded", que no dice qué
   paso falla. Este probe va paso a paso y va contando: qué se ve antes,
   qué pasa al abrir el ⚙️, al elegir English, y qué queda después.

   La 404 es un caso aparte porque no tiene hash: no enruta a la app, así
   que cualquier cosa que dependa de `#/…` no aplica aquí. */
'use strict';
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require(path.join(__dirname, '..', '..', 'node_modules', 'playwright'));

const ROOT = path.resolve(__dirname, '..', '..', '..', 'sinonimia');
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.png': 'image/png', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.woff2': 'font/woff2' };

const server = http.createServer((req, res) => {
  const rel = decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '') || 'index.html';
  const f = path.join(ROOT, rel);
  if (!f.startsWith(ROOT)) { res.writeHead(403).end(); return; }
  fs.readFile(f, (err, buf) => {
    if (err) { res.writeHead(404).end(); return; }
    res.writeHead(200, { 'content-type': MIME[path.extname(f).toLowerCase()] || 'application/octet-stream' });
    res.end(buf);
  });
});

const snap = (p) => p.evaluate(() => ({
  url: location.pathname + location.hash,
  lang: document.documentElement.getAttribute('lang'),
  storage: localStorage.getItem('sinonimia-idioma'),
  heading: (document.querySelector('.error-404-encabezado') || {}).textContent || '(no hay .error-404-encabezado)',
  homeHref: (document.querySelector('#error-404-inicio') || {}).getAttribute
    ? document.querySelector('#error-404-inicio').getAttribute('href') : '(no hay #error-404-inicio)',
  drawerHidden: document.getElementById('accessibility-settings')
    ? document.getElementById('accessibility-settings').hidden : '(sin cajon)',
  pickerInDrawer: (() => {
    const lp = document.getElementById('locale-picker');
    const d = document.getElementById('accessibility-settings');
    return !!(lp && d && d.contains(lp));
  })(),
  appRoot: !!(document.querySelector('#app, .app-root, #contenido')),
}));

(async () => {
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  const base = `http://127.0.0.1:${server.address().port}`;
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ locale: 'es-ES' });
  const p = await ctx.newPage();
  const errs = [];
  p.on('pageerror', (e) => errs.push(e.message.split('\n')[0]));

  await p.goto(base + '/404.html', { waitUntil: 'load' });
  await p.waitForTimeout(900);
  console.log('\n1. al cargar 404.html');
  console.log('  ', JSON.stringify(await snap(p), null, 0));

  console.log('\n2. abrir el ⚙️');
  await p.click('.locale-settings-trigger');
  await p.locator('#accessibility-settings').waitFor({ state: 'visible', timeout: 5000 });
  await p.waitForTimeout(300);
  console.log('  ', JSON.stringify(await snap(p)));

  console.log('\n3. abrir el desplegable y leer el boton actual');
  await p.click('#accessibility-settings .locale-picker-btn');
  await p.locator('#accessibility-settings .locale-picker-panel').waitFor({ state: 'visible', timeout: 5000 });
  const current = (await p.locator('#accessibility-settings .locale-picker-current').innerText()).trim();
  console.log('   muestra:', current);
  const opts = await p.locator('#accessibility-settings .locale-picker-panel li').allInnerTexts();
  console.log('   opciones:', JSON.stringify(opts));

  console.log('\n4. elegir English');
  await p.click('#accessibility-settings .locale-picker-panel li[data-locale="en"]');
  await p.waitForTimeout(1500);
  console.log('  ', JSON.stringify(await snap(p)));

  if (errs.length) console.log('\nerrores JS:', errs.slice(0, 3).join(' | '));
  await ctx.close();
  await browser.close();
  server.close();
})();
