#!/usr/bin/env node
/* one-off/verify-language-in-drawer-all.js

   `verify-language-in-drawer.js` mira solo la portada de cada proyecto. Eso
   no basta: el `locale-picker-config.js` —y con el, `languageInDrawer`— lo
   cargan también about/, config/, legal/, team/, site/, dev/ y las 404. Si
   en una de esas páginas el ⚙️ no se pinta, el desplegable se queda dentro
   de un cajón que nadie puede abrir y el idioma no se puede cambiar: verde
   en la portada, muerto en la subpágina.

   Este recorre TODOS los HTML que cargan el config y comprueba en cada uno
   que el ⚙️ existe, que el desplegable cuelga de su cajón y que elegir el
   otro idioma cambia el texto de verdad.

   Se reutiliza `verify-language-in-drawer.js` como referencia de qué mirar;
   aquí lo importante es la cobertura de rutas, no repetir las mismas 10
   aserciones una y otra vez. */
'use strict';
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require(path.join(__dirname, '..', '..', 'node_modules', 'playwright'));

const SUITE = path.resolve(__dirname, '..', '..', '..');
const PROJECTS = ['apptonomia', 'calculia', 'ludia', 'memofun', 'okeymoney', 'routime', 'sinonimia'];
const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.webp': 'image/webp', '.woff2': 'font/woff2', '.ico': 'image/x-icon',
};
const SKIP = /node_modules|graphify-out|test-results|playwright-report|_mojibake|\.git[\\/]|doc[\\/]templates|scripts[\\/]download/;

function serve(root) {
  const s = http.createServer((req, res) => {
    const rel = decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '') || 'index.html';
    const f = path.join(root, rel);
    if (!f.startsWith(root)) { res.writeHead(403).end(); return; }
    fs.readFile(f, (err, buf) => {
      if (err) { res.writeHead(404).end(); return; }
      res.writeHead(200, { 'content-type': MIME[path.extname(f).toLowerCase()] || 'application/octet-stream' });
      res.end(buf);
    });
  });
  return new Promise((r) => s.listen(0, '127.0.0.1', () => r(s)));
}

function htmlWithConfig(dir, base = '') {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP.test(e.name)) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...htmlWithConfig(full, base + e.name + '/'));
    else if (e.isFile() && /\.html?$/.test(e.name)) {
      if (fs.readFileSync(full, 'utf8').includes('locale-picker-config.js')) out.push(base + e.name);
    }
  }
  return out;
}

(async () => {
  const browser = await chromium.launch();
  const fails = [];
  let total = 0;

  for (const proj of PROJECTS) {
    const root = path.join(SUITE, proj);
    const pages = htmlWithConfig(root).sort();
    const server = await serve(root);
    const base = `http://127.0.0.1:${server.address().port}`;
    const bad = [];
    total += pages.length;

    for (const rel of pages) {
      const ctx = await browser.newContext();
      const p = await ctx.newPage();
      const jsErrors = [];
      p.on('pageerror', (e) => jsErrors.push(e.message.split('\n')[0]));
      try {
        await p.goto(base + '/' + rel, { waitUntil: 'load', timeout: 20000 });
        await p.waitForTimeout(500);

        const gear = await p.locator('.locale-settings-trigger').count();
        if (gear !== 1) { bad.push(`${rel}: no hay un único ⚙️ (${gear})`); await ctx.close(); continue; }

        const placement = await p.evaluate(() => {
          const lp = document.getElementById('locale-picker');
          const drawer = document.getElementById('accessibility-settings');
          return {
            inDrawer: !!(lp && drawer && drawer.contains(lp)),
            inHeader: !!(lp && lp.closest('.suite-controls')),
          };
        });
        if (!placement.inDrawer) { bad.push(`${rel}: el desplegable no cuelga del cajón`); await ctx.close(); continue; }
        if (placement.inHeader) { bad.push(`${rel}: el desplegable sigue en la cabecera`); await ctx.close(); continue; }

        // Y que de verdad cambie el idioma al pulsarlo.
        const before = (await p.locator('body').innerText()).replace(/\s+/g, '');
        const langBefore = await p.evaluate(() => document.documentElement.getAttribute('lang'));
        await p.click('.locale-settings-trigger');
        await p.waitForTimeout(250);
        const drawer = p.locator('#accessibility-settings');
        await drawer.locator('.locale-picker-btn').click();
        await p.waitForTimeout(150);
        const other = langBefore === 'en' ? 'es' : 'en';
        await drawer.locator(`.locale-picker-panel li[data-locale="${other}"]`).click();
        await p.waitForTimeout(600);
        const after = (await p.locator('body').innerText()).replace(/\s+/g, '');
        const lang = await p.evaluate(() => document.documentElement.getAttribute('lang'));
        if (after === before || lang !== other) {
          bad.push(`${rel}: el idioma no cambia (lang ${langBefore} -> ${lang}, texto ${after === before ? 'igual' : 'cambia'})`);
        }
        if (jsErrors.length) bad.push(`${rel}: error JS ${jsErrors[0]}`);
      } catch (e) {
        bad.push(`${rel}: ${e.message.split('\n')[0]}`);
      }
      await ctx.close();
    }

    console.log(`\n${proj}  ${pages.length} paginas con el config  ${bad.length ? '-> ' + bad.length + ' FALLO(S)' : '-> todas OK'}`);
    for (const b of bad) { console.log('     ' + b); fails.push(`${proj}/${b}`); }
    server.close();
  }

  await browser.close();
  console.log('\n' + '='.repeat(60));
  console.log(`${total} paginas revisadas.`);
  console.log(fails.length ? fails.length + ' FALLO(S):\n  ' + fails.join('\n  ') : 'En todas, el idioma esta dentro del ⚙️ y cambia de verdad.');
  process.exit(fails.length ? 1 : 0);
})();
