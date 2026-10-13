#!/usr/bin/env node
/* one-off/probe-idioma-subpages.js

   Comprueba si el desplegable de idioma del componente compartido REALMENTE
   cambia el idioma en las subpáginas de sinonimia.

   Esas páginas usan `data-lang-block="es"|"en"` con CSS en función de
   `<html data-lang>`: un mecanismo distinto del de las tablas de i18n que
   usa la portada. El desplegable solo conoce `App.i18n` y `cfg.onChange`;

   So: open each page, open the ⚙️, pick the other language, and see whether
   the visible text changed. */
'use strict';
const path = require('path');
const { chromium } = require(path.join(__dirname, '..', '..', 'node_modules', 'playwright'));

const ORIGIN = process.env.SMOKE_BASE || 'http://127.0.0.1:4173';
const PAGES = [
  ['index.html', 'la portada (referencia: esta SÍ funciona)'],
  ['about/index.html', 'about/'],
  ['config/index.html', 'config/'],
  ['team/index.html', 'team/'],
  ['legal/index.html', 'legal/ (botones antiguos)'],
  ['legal/privacidad.html', 'legal/privacidad (botones antiguos)'],
];

(async () => {
  const browser = await chromium.launch();
  for (const [page, label] of PAGES) {
    const ctx = await browser.newContext();
    const p = await ctx.newPage();
    try {
      await p.goto(ORIGIN + '/' + page, { waitUntil: 'load' });
      await p.waitForTimeout(500);

      const gear = await p.locator('.locale-settings-trigger').count();
      const legacy = await p.locator('.idioma-btn').count();
      const appI18n = await p.evaluate(() => !!(window.App && window.App.i18n));

      // Texto visible del CONTENIDO (no de la cabecera, que es igual en
      // los dos idiomas), con el idioma inicial.
      const before = (await p.locator('main').first().innerText()).replace(/\s+/g, ' ').slice(0, 80);
      const langBefore = await p.evaluate(() => document.documentElement.getAttribute('lang'));
      const dataLangBefore = await p.evaluate(() => document.documentElement.getAttribute('data-lang'));

      let switched = null;
      const headerBtn = p.locator('#locale-picker .locale-picker-btn');
      const drawerBtn = p.locator('#accessibility-settings .locale-picker-btn');
      if (await headerBtn.count()) {
        // Modelo de cabecera (sinonimia): el desplegable está junto al ⚙️.
        await headerBtn.click();
        await p.waitForTimeout(200);
        const other = langBefore === 'en' ? 'es' : 'en';
        await p.locator(`#locale-picker .locale-picker-panel li[data-locale="${other}"]`).click();
        await p.waitForTimeout(500);
        switched = {
          changed: (await p.locator('main').first().innerText()).replace(/\s+/g, ' ').slice(0, 80) !== before,
          lang: await p.evaluate(() => document.documentElement.getAttribute('lang')),
          saved: await p.evaluate(() => localStorage.getItem('sinonimia-idioma')),
        };
      } else if (await drawerBtn.count()) {
        await p.click('.locale-settings-trigger');
        await p.waitForTimeout(250);
        await drawerBtn.click();
        await p.waitForTimeout(200);
        const other = langBefore === 'en' ? 'es' : 'en';
        await p.locator(`#accessibility-settings .locale-picker-panel li[data-locale="${other}"]`).click();
        await p.waitForTimeout(500);
        switched = {
          changed: (await p.locator('main').first().innerText()).replace(/\s+/g, ' ').slice(0, 80) !== before,
          lang: await p.evaluate(() => document.documentElement.getAttribute('lang')),
          saved: await p.evaluate(() => localStorage.getItem('sinonimia-idioma')),
        };
      } else if (legacy > 0) {
        const other = dataLangBefore === 'en' ? 'es' : 'en';
        await p.click(`.idioma-btn[data-lang="${other}"]`);
        await p.waitForTimeout(400);
        switched = {
          changed: (await p.locator('main').first().innerText()).replace(/\s+/g, ' ').slice(0, 80) !== before,
          lang: await p.evaluate(() => document.documentElement.getAttribute('data-lang')),
          saved: '(no persiste)',
        };
      }

      const verdict = !switched ? 'SIN CONTROL DE IDIOMA' : switched.changed ? 'FUNCIONA' : '*** NO HACE NADA ***';
      console.log(
        `${page.padEnd(22)} gear=${gear} botones=${legacy} App.i18n=${appI18n ? 'si' : 'NO '}  ->  ${verdict}`
      );
      console.log(`   "${before}"`);
      if (switched) console.log(`   "${(await p.locator('main').first().innerText()).replace(/\s+/g, ' ').slice(0, 80)}"  lang=${switched.lang} localStorage=${switched.saved}`);
    } catch (e) {
      console.log(`${page.padEnd(22)} ERROR ${e.message.split('\n')[0]}`);
    }
    await ctx.close();
  }
  await browser.close();
})();