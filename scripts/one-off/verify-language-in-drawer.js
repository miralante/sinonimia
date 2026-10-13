#!/usr/bin/env node
/* one-off/verify-language-in-drawer.js

   Comprueba en un navegador real, proyecto por proyecto, lo que pediste:
   el selector de idioma DENTRO del ⚙️, como primera fila, y no en la
   cabecera.

   Por qué un script y no los tests de cada proyecto: los tests comprueban
   que el control exista y que al pulsarlo cambie el idioma, pero no que
   esté *dentro del cajón* — y ese es exactamente el cambio. Una opción
   que no se aplica no falla ningún test: el desplegable se queda en la
   cabecera, verde por todas partes, y el requisito incumplido.

   Las comprobaciones, en orden:
     1. hay ⚙️
     2. el desplegable cuelga del cajón (#accessibility-settings)
     3. ya NO está en la fila de cabecera (.suite-controls)
     4. es la PRIMERA fila del cuerpo del cajón
     5. con el cajón cerrado no se ve; abierto, sí
     6. al elegir el otro idioma cambia el texto Y se guarda

   Cada proyecto se sirve en su propio puerto efímero, así que no choca con
   nada que ya esté levantado ni con la otra sesión. */
'use strict';
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require(path.join(__dirname, '..', '..', 'node_modules', 'playwright'));

const SUITE = path.resolve(__dirname, '..', '..', '..');
const PROJECTS = [
  ['apptonomia', 'apptonomia:locale'],
  ['calculia', 'calculia:locale'],
  ['ludia', 'enroca:locale'], // ludia guarda bajo el nombre de enroca
  ['memofun', 'memofun:locale'],
  ['okeymoney', 'okeymoney:locale'],
  ['routime', 'routime:locale'],
  ['sinonimia', 'sinonimia-idioma'],
];

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.ico': 'image/x-icon',
};

function startServer(root) {
  const server = http.createServer((req, res) => {
    const rel = decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '') || 'index.html';
    const file = path.join(root, rel);
    if (!file.startsWith(root)) { res.writeHead(403).end(); return; }
    fs.readFile(file, (err, buf) => {
      if (err) { res.writeHead(404).end('no'); return; }
      res.writeHead(200, { 'content-type': MIME[path.extname(file).toLowerCase()] || 'application/octet-stream' });
      res.end(buf);
    });
  });
  return new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', () => resolve(server));
  });
}

const checks = [];
function check(name, ok, detail) {
  checks.push({ name, ok, detail });
  return ok;
}

(async () => {
  const browser = await chromium.launch();
  const failures = [];

  for (const [proj, storageKey] of PROJECTS) {
    const root = path.join(SUITE, proj);
    const server = await startServer(root);
    const base = `http://127.0.0.1:${server.address().port}`;
    const ctx = await browser.newContext();
    const p = await ctx.newPage();
    const errors = [];
    p.on('pageerror', (e) => errors.push(e.message));

    try {
      await p.goto(base + '/index.html', { waitUntil: 'load' });
      await p.waitForFunction(() => !!window.LocalePicker || !!document.querySelector('.locale-settings-trigger'), null, { timeout: 8000 }).catch(() => {});
      await p.waitForTimeout(600);

      const gear = await p.locator('.locale-settings-trigger').count();

      // Estado en frío: cajón cerrado.
      const cold = await p.evaluate(() => {
        const lp = document.getElementById('locale-picker');
        const drawer = document.getElementById('accessibility-settings');
        return {
          exists: !!lp,
          inDrawer: !!(lp && drawer && drawer.contains(lp)),
          inHeader: !!(lp && lp.closest('.suite-controls')),
          visible: !!(lp && lp.offsetParent !== null),
          headerHtml: (document.querySelector('.suite-controls') || {}).innerHTML || '',
        };
      });

      await p.click('.locale-settings-trigger');
      await p.waitForTimeout(400);

      const open = await p.evaluate(() => {
        const lp = document.getElementById('locale-picker');
        const drawer = document.getElementById('accessibility-settings');
        const body = drawer && drawer.querySelector('.locale-settings-drawer-body');
        const firstRow = body && body.firstElementChild;
        const btn = lp && lp.querySelector('.locale-picker-btn');
        const r = btn ? btn.getBoundingClientRect() : null;
        const dr = drawer ? drawer.getBoundingClientRect() : null;
        return {
          drawerOpen: !!(drawer && !drawer.hidden),
          firstRowIsLanguage: !!(firstRow && firstRow.hasAttribute('data-settings-language-row')),
          rowIndex: body ? Array.prototype.indexOf.call(body.children, firstRow) : -1,
          rows: body ? body.querySelectorAll('.locale-settings-row').length : 0,
          btnVisible: !!(btn && btn.offsetParent !== null),
          // el panel se ancla a la izquierda dentro del cajón: si se sale,
          // deja de recibir clics y el desplegable "no hace nada"
          btnInsideDrawer: !!(r && dr && r.left >= dr.left - 1 && r.right <= dr.right + 1),
          label: (lp && lp.querySelector('.locale-picker-btn') || {}).textContent || '',
        };
      });

      const before = (await p.locator('main').first().innerText().catch(() => '')).replace(/\s+/g, ' ').trim();
      const langBefore = await p.evaluate(() => document.documentElement.getAttribute('lang'));

      // Elegir el otro idioma desde dentro del cajón.
      await p.click('#accessibility-settings .locale-picker-btn');
      await p.waitForTimeout(250);
      const other = langBefore === 'en' ? 'es' : 'en';
      await p.click(`#accessibility-settings .locale-picker-panel li[data-locale="${other}"]`);
      await p.waitForTimeout(700);

      const after = (await p.locator('main').first().innerText().catch(() => '')).replace(/\s+/g, ' ').trim();
      const st = await p.evaluate((k) => ({
        lang: document.documentElement.getAttribute('lang'),
        saved: localStorage.getItem(k),
      }), storageKey);

      const r = [];
      r.push(['⚙️ presente', gear === 1, `count=${gear}`]);
      r.push(['desplegable dentro del cajón', cold.inDrawer, `inDrawer=${cold.inDrawer}`]);
      r.push(['fuera de la cabecera', !cold.inHeader, `inHeader=${cold.inHeader}`]);
      r.push(['primera fila del cajón', open.firstRowIsLanguage, `fila 0 de ${open.rows}`]);
      r.push(['oculto con el cajón cerrado', !cold.visible, `visible=${cold.visible}`]);
      r.push(['visible con el cajón abierto', open.btnVisible && open.drawerOpen, `drawerOpen=${open.drawerOpen}`]);
      r.push(['botón dentro del cajón', open.btnInsideDrawer, `label="${open.label.trim()}"`]);
      r.push(['cambia el idioma', after !== before && st.lang === other, `lang ${langBefore}->${st.lang}`]);
      r.push(['guarda la preferencia', !!st.saved, `${storageKey}=${st.saved}`]);
      r.push(['sin errores de JS', errors.length === 0, errors[0] || '']);

      const bad = r.filter(([, ok]) => !ok);
      console.log(`\n${proj}  ${bad.length ? 'FALLOS: ' + bad.length : 'OK  10/10'}`);
      for (const [name, ok, detail] of r) {
        if (!ok) { console.log(`   FALLA  ${name.padEnd(30)} ${detail}`); failures.push(`${proj}: ${name} (${detail})`); }
      }
      if (!bad.length) console.log(`   etiqueta del desplegable: "${open.label.trim()}"  ·  lang ${langBefore} -> ${st.lang}  ·  ${st.saved ? 'guardado' : 'sin guardar'}`);
    } catch (e) {
      console.log(`\n${proj}  ERROR  ${e.message.split('\n')[0]}`);
      failures.push(`${proj}: ${e.message.split('\n')[0]}`);
    }

    await ctx.close();
    server.close();
  }

  await browser.close();
  console.log('\n' + '='.repeat(60));
  console.log(failures.length ? `${failures.length} FALLO(S):\n  ` + failures.join('\n  ') : 'Los 7 proyectos: el selector de idioma esta dentro del ⚙️ y funciona.');
  process.exit(failures.length ? 1 : 0);
})();
