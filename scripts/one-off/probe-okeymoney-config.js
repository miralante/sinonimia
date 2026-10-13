#!/usr/bin/env node
/* one-off/probe-okeymoney-config.js

   `okeymoney/config/` pone `lang="en"` en el <html> pero el texto no se
   traduce. Este probe separa las dos mitades para decir cuál falla:

     - el atributo `lang` lo pone el componente compartido, siempre;
     - los `[data-i18n]` los traduce `App.i18n.apply()`, que es de la app.

   Y responde a la pregunta que importa: ¿es esto de esta tanda? Se mide
   también lo que hace `App.i18n.setLocale()` por su cuenta, sin el
   componente de por medio. Si setLocale no re-traduce, el fallo es de la
   app y no del sitio donde vive el desplegable. */
'use strict';
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require(path.join(__dirname, '..', '..', 'node_modules', 'playwright'));

const ROOT = path.resolve(__dirname, '..', '..', '..', 'okeymoney');
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8' };

const server = http.createServer((req, res) => {
  const rel = decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '') || 'index.html';
  fs.readFile(path.join(ROOT, rel), (err, buf) => {
    if (err) { res.writeHead(404).end(); return; }
    res.writeHead(200, { 'content-type': MIME[path.extname(rel)] || 'application/octet-stream' });
    res.end(buf);
  });
});

const snap = (p) => p.evaluate(() => ({
  lang: document.documentElement.getAttribute('lang'),
  h1: (document.querySelector('h1') || {}).textContent || '',
  intro: (document.querySelector('.entradilla') || {}).textContent || '',
  estado: (document.querySelector('#listaEstado') || {}).textContent || '',
  localeApi: window.App && window.App.i18n ? window.App.i18n.locale() : '(sin App.i18n)',
}));

(async () => {
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  // Ruta concreta, no `/config/`: este servidor no resuelve un directorio
  // con barra final, así que pedirlo devuelve un 404 vacío y la página
  // parece no tener ni el ⚙️ ni nada.
  const base = `http://127.0.0.1:${server.address().port}/config/index.html`;
  const browser = await chromium.launch();
  const ctx = await browser.newContext();
  const p = await ctx.newPage();
  const errs = [];
  p.on('pageerror', (e) => errs.push(e.message.split('\n')[0]));

  await p.goto(base, { waitUntil: 'load' });
  await p.waitForTimeout(900);

  const inDrawer = await p.evaluate(() => {
    const lp = document.getElementById('locale-picker');
    const d = document.getElementById('accessibility-settings');
    return !!(lp && d && d.contains(lp));
  });
  const a = await snap(p);

  // Vía A: el desplegable dentro del cajón, como está ahora.
  await p.locator('.locale-settings-trigger').waitFor({ state: 'visible', timeout: 10000 });
  if (inDrawer) await p.click('.locale-settings-trigger');
  await p.locator('#accessibility-settings').waitFor({ state: 'visible', timeout: 10000 });
  console.log(`   #locale-picker dentro del cajón: ${inDrawer}`);
  console.log(`   botones .locale-picker-btn en la pagina: ${await p.locator('.locale-picker-btn').count()}`);
  await p.click('#accessibility-settings .locale-picker-btn');
  await p.locator('#accessibility-settings .locale-picker-panel').waitFor({ state: 'visible', timeout: 10000 });
  await p.click('#accessibility-settings .locale-picker-panel li[data-locale="en"]');
  await p.waitForTimeout(900);
  const b = await snap(p);

  console.log('\n--- vía A: el desplegable de la app (como está ahora) ---');
  console.log(`   en el cajón: ${inDrawer}`);
  for (const k of ['lang', 'localeApi', 'h1', 'intro', 'estado']) {
    console.log(`   ${k.padEnd(10)} ${k === 'h1' || k === 'intro' ? '"' + a[k] + '"' : a[k]}`);
    console.log(`   ${''.padEnd(10)} ${k === 'h1' || k === 'intro' ? '"' + b[k] + '"' : b[k]}   ${a[k] === b[k] ? '<- IGUAL' : '<- cambia'}`);
  }

  // Vía B: la API de la app sola, sin el componente. Si esto tampoco
  // traduce, el problema no es dónde vive el desplegable.
  await p.evaluate(() => window.App.i18n.setLocale('es'));
  await p.waitForTimeout(600);
  const c = await snap(p);
  await p.evaluate(() => window.App.i18n.setLocale('en'));
  await p.waitForTimeout(600);
  const d = await snap(p);
  console.log('\n--- vía B: App.i18n.setLocale() directo, sin el componente ---');
  console.log(`   localeApi: ${c.localeApi} -> ${d.localeApi}`);
  console.log(`   h1:      "${c.h1}"`);
  console.log(`   h1:      "${d.h1}"   ${c.h1 === d.h1 ? '<- IGUAL (la API no re-traduce)' : '<- cambia'}`);

  if (errs.length) console.log(`\nerrores JS: ${errs.slice(0, 3).join(' | ')}`);
  await ctx.close();
  await browser.close();
  server.close();
})();
