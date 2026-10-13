#!/usr/bin/env node
/* one-off/language-in-drawer-suite.js

   Pasa los seis proyectos que aún tenían el selector de idioma en la
   cabecera al modelo de Apptonomia: el desplegable DENTRO del cajón del ⚙️,
   y el ⚙️ solo en la fila de la cabecera.

   Teclatlon queda fuera: ya lo tenía dentro de su cajón propio y apaga el
   ⚙️ compartido (`settings: false`), así que la opción no aplicaría.

   Por proyecto toca tres cosas:

   1) `locale-picker-config.js`: una línea, `languageInDrawer: true`.

   2) `scripts/ui-smoke.js`: su bloque afirmaba explícitamente lo contrario
      —"El selector de idioma no debe vivir dentro del cajón de ajustes"—
      y que el ⚙️ es hermano inmediato del desplegable. Se reescribe para
      comprobar lo nuevo: abrir el ⚙️, cambiar el idioma desde dentro, y que
      el engranaje quede el último de su fila.

   3) El `?v=` del config en sus páginas. El componente NO cambia (la opción
      ya existía desde el arreglo de Apptonomia), pero el contenido del
      config sí, y con un token viejo el navegador se queda con la copia
      anterior: el desplegable sigue en la cabecera y no se ve por qué.

   Todo se valida antes de escribir: si un ancla no aparece, el script para
   sin tocar nada. */
'use strict';
const fs = require('fs');
const path = require('path');

const SUITE = path.resolve(__dirname, '..', '..', '..');

const PROJECTS = [
  { name: 'calculia', config: 'assets/js/locale-picker-config.js', token: '1ab' },
  { name: 'ludia', config: 'assets/js/locale-picker-config.js', token: '2ab' },
  { name: 'memofun', config: 'assets/js/locale-picker-config.js', token: '2ab' },
  { name: 'okeymoney', config: 'assets/js/locale-picker-config.js', token: '1ab' },
  { name: 'routime', config: 'assets/js/locale-picker-config.js', token: '1ab' },
  { name: 'sinonimia', config: 'js/locale-picker-config.js', token: '1ab' },
];

const CONFIG_ANCHOR = 'window.LocalePickerConfig = {';
const CONFIG_INSERT =
  CONFIG_ANCHOR +
  '\n  /* El selector de idioma va DENTRO del cajón del ⚙️, como primera\n' +
  '     fila, y el ⚙️ se queda solo en la cabecera. Antes vivía al lado\n' +
  '     del ⚙️ en la fila de controles y eran dos sitios donde cambiar\n' +
  '     preferencias. Coste: un clic más para llegar al idioma. */\n' +
  '  languageInDrawer: true,';

/* El bloque del smoke que fija el modelo de cabecera. Empieza en el
   comentario "El idioma es un control de primer nivel en la cabecera" y
   termina en la aserción de `data-settings-more`, que se conserva. */
const SMOKE_START = '    /* El idioma es un control de primer nivel en la cabecera, no un';
const SMOKE_END_MARK = 'El cajón no debe enlazar a la página de ajustes propia del proyecto';

const NEW_SMOKE = `    /* El idioma vive DENTRO del cajón de ajustes (\`languageInDrawer\` en el
       config de esta app), no como control suelto en la cabecera: hay que
       abrir el ⚙️ para cambiarlo. La recarga anterior deja el cajón
       cerrado, así que se abre aquí. */
    await page.locator('.locale-settings-trigger').click();
    const languageDrawer = page.locator('#accessibility-settings');
    await languageDrawer.waitFor({ state: 'visible', timeout: NAV_TIMEOUT });

    const languagePicker = languageDrawer.locator('.locale-picker-btn');
    await languagePicker.click();
    const english = languageDrawer.locator('.locale-picker-panel li[data-locale="en"]');
    await english.waitFor({ state: 'visible', timeout: NAV_TIMEOUT });
    await english.click();
    /* Choosing a language swaps the document, so for an instant there is
       no documentElement at all. The predicate has to answer "not yet"
       instead of throwing, otherwise the TypeError ends the wait instead
       of polling through the navigation. */
    await page.waitForFunction(() =>
      !!(document.documentElement && document.documentElement.lang.slice(0, 2) === 'en'),
    null, { timeout: NAV_TIMEOUT });
    assert.strictEqual((await page.locator('html').getAttribute('lang') || '').slice(0, 2), 'en',
      'El desplegable del cajón debe cambiar el idioma activo de la app');
    assert.strictEqual((await languagePicker.locator('.locale-picker-current').textContent()).trim(), 'EN');

    /* El ⚙️ se queda solo en la fila de la cabecera y el idioma, dentro.
       Se comprueba que el engranaje es el último de su fila en vez de que
       esté solo, porque esa fila puede llevar otros controles. */
    const gearRow = await page.evaluate(() => {
      const gear = document.querySelector('.locale-settings-trigger');
      const drawer = document.getElementById('accessibility-settings');
      const picker = document.getElementById('locale-picker');
      return {
        pickerInDrawer: drawer.contains(picker),
        gearIsLast: !!gear && gear.parentNode.lastElementChild === gear,
        alignsEnd: getComputedStyle(gear.parentNode).justifyContent === 'flex-end',
      };
    });
    assert.strictEqual(await page.locator('#accessibility-settings .locale-picker-btn').count(), 1,
      'El cajón debe traer el desplegable de idioma');
    assert.ok(gearRow.pickerInDrawer, 'El selector de idioma debe vivir dentro del cajón de ajustes');
    assert.ok(gearRow.gearIsLast, 'El engranaje debe quedar arriba a la derecha, el último de su fila');
    assert.ok(gearRow.alignsEnd, 'La fila de controles debe alinearse al final para quedar arriba a la derecha');
    assert.strictEqual(await page.locator('#accessibility-settings [data-settings-more]').count(), 0,
      'El cajón no debe enlazar a la página de ajustes propia del proyecto');`;

function htmlFiles(dir) {
  const out = [];
  (function walk(d) {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      if (/node_modules|graphify-out|_mojibake|doc[\\/]templates|test-results|playwright-report/.test(e.name)) continue;
      const full = path.join(d, e.name);
      if (e.isDirectory()) walk(full);
      else if (e.isFile() && /\.html?$/.test(e.name)) out.push(full);
    }
  })(dir);
  return out;
}

/* ---------- validar antes de escribir ---------- */
const plan = [];
for (const p of PROJECTS) {
  const projDir = path.join(SUITE, p.name);

  const cfgFile = path.join(projDir, p.config);
  const cfg = fs.readFileSync(cfgFile, 'utf8');
  if (cfg.indexOf(CONFIG_ANCHOR) === -1) throw new Error(p.name + ': el config no tiene «' + CONFIG_ANCHOR + '»');
  if (cfg.indexOf('languageInDrawer') !== -1) throw new Error(p.name + ': el config ya trae languageInDrawer');

  const smokeFile = path.join(projDir, 'scripts', 'ui-smoke.js');
  const smoke = fs.readFileSync(smokeFile, 'utf8');
  const startAt = smoke.indexOf(SMOKE_START);
  if (startAt === -1) throw new Error(p.name + ': ui-smoke.js no tiene el bloque del modelo de cabecera');
  const markAt = smoke.indexOf(SMOKE_END_MARK, startAt);
  if (markAt === -1) throw new Error(p.name + ': ui-smoke.js no tiene la aserción data-settings-more');
  const endAt = smoke.indexOf('\n', smoke.indexOf(');', markAt));
  if (endAt === -1) throw new Error(p.name + ': no se encuentra el final del bloque');
  const block = smoke.slice(startAt, endAt);
  if (block.indexOf('no debe vivir dentro del cajón') === -1) {
    throw new Error(p.name + ': el bloque no es el esperado (no afirma lo contrario)');
  }

  const pages = htmlFiles(projDir).filter((f) => fs.readFileSync(f, 'utf8').indexOf('locale-picker-config.js') !== -1);
  if (!pages.length) throw new Error(p.name + ': ninguna página referencia el config');

  plan.push({ p, cfgFile, cfg, smokeFile, smoke, startAt, endAt, block, pages });
}

/* ---------- escribir ---------- */
for (const item of plan) {
  const { p, cfgFile, cfg, smokeFile, smoke, startAt, endAt, block, pages } = item;

  fs.writeFileSync(cfgFile, cfg.replace(CONFIG_ANCHOR, CONFIG_INSERT), 'utf8');

  const smokeOut = smoke.slice(0, startAt) + NEW_SMOKE + smoke.slice(endAt);
  fs.writeFileSync(smokeFile, smokeOut, 'utf8');

  let bumped = 0;
  for (const file of pages) {
    let src = fs.readFileSync(file, 'utf8');
    const next = src.replace(
      /locale-picker-config\.js(\?v=[^"\s]*)?/g,
      'locale-picker-config.js?v=' + p.token
    );
    if (next !== src) { fs.writeFileSync(file, next, 'utf8'); bumped++; }
  }

  console.log(
    '  ' + p.name.padEnd(10) +
    ' config ok · smoke ' + block.split('\n').length + ' lineas -> ' + NEW_SMOKE.split('\n').length +
    ' · ' + bumped + '/' + pages.length + ' paginas con ?v=' + p.token
  );
}

console.log('\n' + plan.length + ' proyectos con el idioma dentro del cajón.');