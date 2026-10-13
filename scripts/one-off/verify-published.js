#!/usr/bin/env node
/* one-off/verify-published.js

   Que el config publicado lleve `languageInDrawer: true` no demuestra nada:
   es una cadena. Lo que hay que comprobar en el sitio vivo es que el ⚙️
   exista, que el desplegable cuelgue de su cajón y que cambiar de idioma
   cambie el texto de verdad — en el origen publicado, con sus _headers y
   su service worker, no en un servidor local.

   Es la contraparte de `verify-language-in-drawer.js`, pero contra
   https://*.apptonomia.uk en vez del árbol de trabajo. */
'use strict';
const path = require('path');
const { chromium } = require(path.join(__dirname, '..', '..', 'node_modules', 'playwright'));

const SITES = process.argv.slice(2).length
  ? process.argv.slice(2)
  : [
      'https://apptonomia.uk/',
      'https://calculia.apptonomia.uk/',
      'https://memofun.apptonomia.uk/',
      'https://routime.apptonomia.uk/',
      'https://okeymoney.apptonomia.uk/',
      'https://ludia.apptonomia.uk/',
    ];

(async () => {
  const browser = await chromium.launch();
  let fails = 0;

  for (const url of SITES) {
    const ctx = await browser.newContext();
    const p = await ctx.newPage();
    const r = [];
    try {
      await p.goto(url, { waitUntil: 'load', timeout: 30000 });
      await p.waitForTimeout(900);

      const gear = await p.locator('.locale-settings-trigger').count();
      r.push(['⚙️ presente', gear === 1, `count=${gear}`]);
      if (gear !== 1) { report(url, r); fails++; await ctx.close(); continue; }

      const placement = await p.evaluate(() => {
        const lp = document.getElementById('locale-picker');
        const d = document.getElementById('accessibility-settings');
        return { inDrawer: !!(lp && d && d.contains(lp)), inHeader: !!(lp && lp.closest('.suite-controls')) };
      });
      r.push(['en el cajón', placement.inDrawer, '']);
      r.push(['fuera de la cabecera', !placement.inHeader, '']);

      const before = (await p.locator('body').innerText()).replace(/\s+/g, '');
      const langBefore = await p.evaluate(() => document.documentElement.getAttribute('lang'));
      await p.click('.locale-settings-trigger');
      await p.locator('#accessibility-settings').waitFor({ state: 'visible', timeout: 8000 });
      const drawer = p.locator('#accessibility-settings');
      const rowFirst = await p.evaluate(() => {
        const b = document.querySelector('#accessibility-settings .locale-settings-drawer-body');
        return !!(b && b.firstElementChild && b.firstElementChild.hasAttribute('data-settings-language-row'));
      });
      r.push(['primera fila del cajón', rowFirst, '']);

      await drawer.locator('.locale-picker-btn').click();
      await drawer.locator('.locale-picker-panel').waitFor({ state: 'visible', timeout: 8000 });
      const other = langBefore === 'en' ? 'es' : 'en';
      await drawer.locator(`.locale-picker-panel li[data-locale="${other}"]`).click();
      await p.waitForTimeout(1600);
      const after = (await p.locator('body').innerText()).replace(/\s+/g, '');
      const lang = await p.evaluate(() => document.documentElement.getAttribute('lang'));
      r.push(['cambia el idioma', after !== before && lang === other, `lang ${langBefore}->${lang}`]);
    } catch (e) {
      r.push(['sin error', false, e.message.split('\n')[0].slice(0, 70)]);
    }
    if (r.some(([, ok]) => !ok)) fails++;
    report(url, r);
    await ctx.close();
  }

  await browser.close();
  console.log('\n' + (fails ? `${fails} sitio(s) con fallos` : `Los ${SITES.length} sitios publicados cumplen.`));
  process.exit(fails ? 1 : 0);

  function report(url, rows) {
    const bad = rows.filter(([, ok]) => !ok);
    console.log(`\n${url}  ${bad.length ? 'FALLOS: ' + bad.length : 'OK ' + rows.length + '/' + rows.length}`);
    for (const [n, ok, d] of rows) if (!ok) console.log(`   FALLA ${n} ${d}`);
  }
})();