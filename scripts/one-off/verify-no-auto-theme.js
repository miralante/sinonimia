#!/usr/bin/env node
/* one-off/verify-no-auto-theme.js

   Comprueba, en un navegador de verdad y con el sistema emulado en oscuro,
   las cuatro cosas que cambian al quitar el tema "auto":

     1. el cajón ofrece solo Claro y Oscuro (y no hay botón Auto);
     2. sin nada guardado, el documento queda en data-theme="light";
     3. con el sistema en oscuro la página NO se pone oscura: antes lo
        hacía porque "auto" delegaba en prefers-color-scheme;
     4. un "auto" que venga guardado de la versión anterior migra a
        "light" en vez de dejar el atributo sin poner.

   El punto 3 es el que se queja el usuario, así que se emula el sistema
   oscuro ANTES de cargar. Si el fallo volviese a colarse, saldría aquí y
   no en ningún test: los tests comprueban el atributo, esto comprueba la
   paleta que se ve. */

'use strict';
const http = require('node:http');
const fs = require('node:fs');
const path = require('path');
const { chromium } = require(path.join(__dirname, '..', '..', 'node_modules', 'playwright'));

const SUITE = path.resolve(__dirname, '..', '..', '..');
const PROJECTS = ['apptonomia', 'calculia', 'ludia', 'memofun', 'okeymoney', 'routime', 'sinonimia', 'teclatlon'];
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.woff2': 'font/woff2' };

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

(async () => {
  const browser = await chromium.launch();
  const fails = [];

  for (const proj of PROJECTS) {
    const root = path.join(SUITE, proj);
    const server = await serve(root);
    const base = `http://127.0.0.1:${server.address().port}`;
    const rows = [];

    // --- contexto 1: sistema oscuro, nada guardado ---
    const ctx = await browser.newContext({ colorScheme: 'dark' });
    const p = await ctx.newPage();
    try {
      await p.addInitScript(() => localStorage.clear());
      await p.goto(base + '/index.html', { waitUntil: 'load', timeout: 30000 });
      await p.waitForTimeout(900);

      const autoButtons = await p.locator('.btn-theme[data-theme="auto"], [data-settings-theme="auto"]').count();
      rows.push(['no hay botón Auto', autoButtons === 0, `encontrados=${autoButtons}`]);

      const theme = await p.evaluate(() => document.documentElement.getAttribute('data-theme'));
      rows.push(['el tema por defecto es light', theme === 'light', `data-theme=${theme}`]);

      // Que no se ponga oscuro de verdad: se compara el fondo pintado con
      // el que se obtiene forzando light a mano.
      const forcedLight = await p.evaluate(() => {
        const html = document.documentElement;
        const before = getComputedStyle(document.body).backgroundColor;
        html.setAttribute('data-theme', 'light');
        const after = getComputedStyle(document.body).backgroundColor;
        html.setAttribute('data-theme', 'dark');
        const dark = getComputedStyle(document.body).backgroundColor;
        html.setAttribute('data-theme', before === after ? 'light' : 'dark');
        return { auto: before, light: after, dark };
      });
      rows.push([
        'paleta clara pese al sistema oscuro',
        forcedLight.auto === forcedLight.light,
        `auto=${forcedLight.auto} light=${forcedLight.light} dark=${forcedLight.dark}`,
      ]);

      // Las dos opciones que quedan funcionan.
      const gear = await p.locator('.locale-settings-trigger').count();
      const drawerSel = '#accessibility-settings';
      if (gear === 1) {
        await p.click('.locale-settings-trigger');
        const drawer = p.locator(drawerSel);
        await drawer.waitFor({ state: 'visible', timeout: 8000 });
        const themes = await drawer.locator('[data-settings-theme]').evaluateAll(
          (ns) => ns.map((n) => n.getAttribute('data-settings-theme')));
        rows.push(['el cajón ofrece light y dark',
          themes.length === 2 && themes.includes('light') && themes.includes('dark'),
          JSON.stringify(themes)]);
        await drawer.locator('[data-settings-theme="dark"]').click();
        await p.waitForTimeout(300);
        rows.push(['oscuro se aplica al pulsar',
          (await p.evaluate(() => document.documentElement.getAttribute('data-theme'))) === 'dark', '']);
      }
    } catch (e) {
      rows.push(['sin error', false, e.message.split('\n')[0].slice(0, 60)]);
    }
    await ctx.close();

    // --- contexto 2: un "auto" guardado por la versión anterior ---
    const ctx2 = await browser.newContext();
    const p2 = await ctx2.newPage();
    try {
      const cfgFile = fs.existsSync(path.join(root, 'js/locale-picker-config.js'))
        ? 'js/locale-picker-config.js' : 'assets/js/locale-picker-config.js';
      const cfg = fs.readFileSync(path.join(root, cfgFile), 'utf8');
      const key = (cfg.match(/storageKey:\s*'([^']+)'/) || [])[1];
      const settingsKey = (cfg.match(/settingsStorageKey:\s*'([^']+)'/) || [])[1]
        || ((key || 'apptonomia:locale') + ':accessibility');
      await p2.addInitScript((k) => {
        localStorage.clear();
        localStorage.setItem(k, JSON.stringify({ theme: 'auto', textSize: 'normal', contrast: false }));
      }, settingsKey);
      await p2.goto(base + '/index.html', { waitUntil: 'load', timeout: 30000 });
      await p2.waitForTimeout(800);
      const migrated = await p2.evaluate(() => document.documentElement.getAttribute('data-theme'));
      rows.push(['un "auto" guardado migra a light', migrated === 'light', `data-theme=${migrated}`]);
    } catch (e) {
      rows.push(['migración sin error', false, e.message.split('\n')[0].slice(0, 60)]);
    }
    await ctx2.close();

    const bad = rows.filter(([, ok]) => !ok);
    console.log(`\n${proj}  ${bad.length ? 'FALLOS: ' + bad.length : 'OK ' + rows.length + '/' + rows.length}`);
    for (const [n, ok, d] of rows) {
      if (!ok) { console.log('   FALLA ' + n + '  ' + d); fails.push(`${proj}: ${n} (${d})`); }
    }
    server.close();
  }

  await browser.close();
  console.log('\n' + '='.repeat(60));
  console.log(fails.length ? fails.length + ' FALLO(S):\n  ' + fails.join('\n  ')
    : `Los ${PROJECTS.length} proyectos: sin tema Auto y con el claro por defecto.`);
  process.exit(fails.length ? 1 : 0);
})();