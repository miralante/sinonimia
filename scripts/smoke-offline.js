#!/usr/bin/env node
'use strict';

/*
 * scripts/smoke-offline.js — end-to-end check of the lazy dictionary and of
 * the offline copy, in a real browser.
 *
 *   node scripts/smoke-offline.js
 *
 * What it proves:
 *   1. A cold visit downloads only the ACTIVE language's index (no other
 *      language, no detail chunks beyond what the page shows).
 *   2. Opening a word fetches just its small detail chunk and shows the
 *      example sentences and the translation link.
 *   3. The service worker stores the whole dictionary (both languages) in the
 *      background and the page says so.
 *   4. With the network CUT and the page reloaded: the home renders, a word
 *      opens, the sentence game plays, and the other language works.
 *   5. Serving the same data again causes no re-download (data cache is keyed
 *      by content hash and survives).
 *
 * Needs Playwright (same PLAYWRIGHT_MODULE_PATH convention as ui-smoke.js).
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE_PATH || 'playwright');

const ROOT = path.resolve(__dirname, '..');
const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml', '.png': 'image/png',
};

function startServer(counter, everything) {
  const server = http.createServer((req, res) => {
    const urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
    let file = path.resolve(ROOT, urlPath.replace(/^\/+/, '') || 'index.html');
    if (urlPath === '/') file = path.join(ROOT, 'index.html');
    if (!file.startsWith(ROOT + path.sep) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
      res.writeHead(404); res.end('Not found'); return;
    }
    everything.push(urlPath);
    if (/\/js\/dict\./.test(urlPath)) counter.push(path.basename(urlPath));
    res.writeHead(200, { 'content-type': MIME[path.extname(file)] || 'application/octet-stream' });
    fs.createReadStream(file).pipe(res);
  });
  return new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', () => resolve(server));
  });
}

const manifest = (() => {
  const ctx = {}; ctx.globalThis = ctx;
  new Function('globalThis', fs.readFileSync(path.join(ROOT, 'js/dictionary-data.js'), 'utf8'))(ctx);
  return ctx.SINONIMIA_DICTIONARY_DATA;
})();
const totalFiles = Object.values(manifest.languages)
  .reduce((n, l) => n + l.index.length + l.detail.length, 0);

async function main() {
  const served = [];
  const everything = [];
  const server = await startServer(served, everything);
  const base = 'http://127.0.0.1:' + server.address().port;
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ serviceWorkers: 'allow', locale: 'es-ES' });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));

  try {
    // 1. Cold visit: only the Spanish index.
    await page.goto(base + '/#/es/', { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('#word-list .card', { timeout: 60000 });
    const initial = served.slice();
    assert.ok(initial.length > 0 && initial.every((f) => /^dict\.es\.idx\.\d+\.js$/.test(f)),
      'La primera carga solo debe pedir el índice del idioma activo, pidió: ' + initial.join(', '));

    // 2. Open a word: one small detail chunk, with sentences and translation link.
    await page.goto(base + '/#/es/word/subsanar');
    await page.waitForSelector('#detail-view:not([hidden]) h2', { timeout: 30000 });
    assert.equal((await page.locator('#detail-view h2').first().textContent()).trim(), 'Subsanar');
    assert.ok(await page.locator('#detail-view .sentences').count(), 'El detalle debe mostrar las frases de ejemplo');
    assert.ok(await page.locator('.detail-translation').count(), 'El detalle debe mostrar el enlace a la traducción');
    const detailChunks = served.filter((f) => /\.det\.\d+\.js$/.test(f));
    assert.ok(detailChunks.length <= 2, 'Abrir una palabra no debe pedir más de un fragmento de detalle: ' + detailChunks.join(', '));

    // 3. The whole dictionary is stored in the background.
    await page.waitForFunction(() => {
      const el = document.getElementById('offline-status');
      return el && !el.hidden && /guardadas/.test(el.textContent);
    }, null, { timeout: 120000 });
    const stored = await page.evaluate(async () => (await (await caches.open('sinonimia-data')).keys()).length);
    assert.equal(stored, totalFiles, 'La caché de datos debe contener los ' + totalFiles + ' ficheros del diccionario');

    // 3b. Pictograms are NOT downloaded on their own: only an offer is shown.
    const pictogramRequests = () => everything.filter((p) => /^\/img\/\d+\.png$/.test(p)).length;
    assert.ok(pictogramRequests() < manifest.images.length / 2,
      'Los pictogramas no deben descargarse todos sin que la persona lo pida (' + pictogramRequests() + ')');
    const offer = page.locator('#offline-images');
    await offer.waitFor({ state: 'visible', timeout: 30000 });
    assert.match(await offer.textContent(), /\d+ MB/, 'El ofrecimiento debe indicar el tamaño');
    await offer.click();
    await page.waitForFunction(() => /dibujos están guardados/.test(document.getElementById('offline-status').textContent),
      null, { timeout: 180000 });
    const storedImages = await page.evaluate(async () => (await (await caches.open('sinonimia-img')).keys()).length);
    assert.equal(storedImages, manifest.images.length,
      'La caché de imágenes debe contener los ' + manifest.images.length + ' pictogramas');

    // 4. Network cut, page reloaded.
    await context.setOffline(true);
    const requestsBeforeCut = everything.length;
    await page.goto(base + '/#/es/', { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('#word-list .card', { timeout: 30000 });
    await page.goto(base + '/#/es/word/comparecer');
    await page.waitForSelector('#detail-view:not([hidden]) h2', { timeout: 30000 });
    assert.equal((await page.locator('#detail-view h2').first().textContent()).trim(), 'Comparecer');
    assert.ok(await page.locator('#detail-view .sentences').count(), 'Sin conexión el detalle debe mostrar sus frases');

    await page.goto(base + '/#/es/juego/frase');
    await page.waitForSelector('#game-view .game-option', { timeout: 30000 });
    assert.equal(await page.locator('#game-view .game-option').count(), 3, 'El juego de la frase debe funcionar sin conexión');

    await page.goto(base + '/#/en/');
    await page.waitForFunction(() => document.documentElement.lang === 'en' &&
      document.querySelectorAll('#word-list .card').length > 0, null, { timeout: 30000 });
    await page.goto(base + '/#/en/word/apostille');
    await page.waitForSelector('#detail-view:not([hidden]) h2', { timeout: 30000 });
    assert.equal((await page.locator('#detail-view h2').first().textContent()).trim(), 'Apostille');

    // Nothing at all (shell, dictionary, pictograms) may reach the server while
    // offline, and the pictograms on screen must really be drawn.
    const offlineRequests = everything.slice(requestsBeforeCut);
    assert.deepEqual(offlineRequests, [], 'Sin conexión no debe pedirse nada al servidor: ' + offlineRequests.join(', '));
    await page.goto(base + '/#/es/word/comparecer');
    await page.waitForSelector('#detail-view:not([hidden]) .detail-image', { timeout: 30000 });
    assert.ok(await page.locator('#detail-view .detail-image').evaluate((img) =>
      img.complete && img.naturalWidth > 0), 'Sin conexión el pictograma de la palabra debe verse');

    // 5. Back online: nothing is downloaded again.
    await context.setOffline(false);
    const before = served.length;
    await page.goto(base + '/#/es/', { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('#word-list .card', { timeout: 30000 });
    await page.waitForTimeout(6000); // past the 3 s delay of the offline-copy request
    assert.equal(served.length, before, 'Con la copia offline completa no debe volver a descargarse el diccionario');
    // The choice is remembered, and nothing is left to download.
    assert.equal(await page.locator('#offline-images').isVisible(), false, 'Con los dibujos guardados no debe ofrecerse de nuevo');
    const pictogramsAfter = pictogramRequests();
    await page.waitForTimeout(1500);
    assert.equal(pictogramRequests(), pictogramsAfter, 'No deben volver a descargarse pictogramas ya guardados');

    assert.deepEqual(errors, [], 'Errores de JavaScript en la página: ' + errors.join(' | '));
    console.log('Offline smoke PASS (' + totalFiles + ' dictionary files and ' + manifest.images.length +
      ' pictograms stored, ' + initial.length + ' index shard(s) on cold load)');
  } finally {
    await browser.close().catch(() => {});
    await new Promise((resolve) => server.close(resolve));
  }
}

main().catch((error) => {
  console.error('Offline smoke FAIL: ' + (error.stack || error.message));
  process.exitCode = 1;
});
