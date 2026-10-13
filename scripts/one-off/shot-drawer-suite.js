#!/usr/bin/env node
/* one-off/shot-drawer-suite.js

   Captura del ⚙️ abierto en los 7 proyectos, para ver de un vistazo que el
   idioma es la primera fila del cajón y que la cabecera se queda solo con
   el engranaje.

   Se guardan en <proyecto>/test-results/ porque cada uno ya tiene esa
   carpeta y es donde sus tests dejan sus capturas. */
'use strict';
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require(path.join(__dirname, '..', '..', 'node_modules', 'playwright'));

const SUITE = path.resolve(__dirname, '..', '..', '..');
const PROJECTS = ['apptonomia', 'calculia', 'ludia', 'memofun', 'okeymoney', 'routime', 'sinonimia'];
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.woff2': 'font/woff2' };

function serve(root) {
  const s = http.createServer((req, res) => {
    const rel = decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '') || 'index.html';
    fs.readFile(path.join(root, rel), (err, buf) => {
      if (err) { res.writeHead(404).end(); return; }
      res.writeHead(200, { 'content-type': MIME[path.extname(rel)] || 'application/octet-stream' });
      res.end(buf);
    });
  });
  return new Promise((r) => s.listen(0, '127.0.0.1', () => r(s)));
}

(async () => {
  const browser = await chromium.launch();
  for (const proj of PROJECTS) {
    const root = path.join(SUITE, proj);
    const server = await serve(root);
    const base = `http://127.0.0.1:${server.address().port}`;
    const p = await (await browser.newContext({ viewport: { width: 900, height: 760 } })).newPage();
    await p.goto(base + '/index.html', { waitUntil: 'load' });
    await p.waitForTimeout(700);
    await p.click('.locale-settings-trigger');
    await p.waitForTimeout(500);

    const dir = path.join(root, 'test-results');
    fs.mkdirSync(dir, { recursive: true });
    const out = path.join(dir, 'drawer-idioma-dentro.png');
    await p.screenshot({ path: out });
    console.log(`  ${proj.padEnd(11)} ${path.relative(SUITE, out)}`);
    await p.context().close();
    server.close();
  }
  await browser.close();
})();
