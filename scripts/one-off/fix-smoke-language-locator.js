#!/usr/bin/env node
/* one-off/fix-smoke-language-locator.js — versión 3 (definitiva)

   Ninguna de las dos versiones anteriores bastaba sola:

   - v1 abría el ⚙️ dentro de `languageLocator()` pero dejaba el cajón
     abierto, y el backdrop bloqueaba `exerciseForms`,
     `exerciseFullFunctionality` y `exerciseControls`.
   - v2 cerraba en `finally` pero abría una sola vez al empezar
     `exerciseLanguages()`, y `App.i18n.setLocale()` hace
     `location.reload()`: al cambiar de idioma la página se recarga y el
     ⚙️ vuelve a cerrarse. La segunda llamada a `languageLocator()` se
     quedaba esperando a un botón invisible y el smoke reventaba en
     `exerciseLanguages` → `languageLocator:159`.

   Las dos cosas son necesarias y no se estorban: se abre justo antes de
   pulsar (que es cuando puede hacer falta) y se cierra una vez, al
   terminar el ejercicio. */

'use strict';
const fs = require('fs');
const path = require('path');

const SUITE = path.resolve(__dirname, '..', '..', '..');
const FILES = ['calculia', 'ludia', 'memofun', 'okeymoney', 'routime'].map((p) =>
  path.join(SUITE, p, 'scripts', 'ui-smoke.js')
);

// --- A: dentro de languageLocator(), abrir el cajón si está cerrado -----
const A_OLD =
  "  const btn = page.locator('#locale-picker .locale-picker-btn');\n" +
  '  if (await btn.count()) {\n' +
  "    const panel = page.locator('#locale-picker .locale-picker-panel');\n";

const A_NEW =
  "  const btn = page.locator('#locale-picker .locale-picker-btn');\n" +
  '  if (await btn.count()) {\n' +
  '    /* Con `languageInDrawer` el desplegable vive DENTRO del cajon, asi\n' +
  '       que no siempre esta a la vista. No basta con abrirlo una vez al\n' +
  '       principio: `App.i18n.setLocale()` hace `location.reload()`, y al\n' +
  '       recargar el cajon vuelve a cerrarse. Se abre aqui, justo antes de\n' +
  '       pulsar, que es cuando puede hacer falta. El cierre lo hace\n' +
  '       `exerciseLanguages()` en su `finally`. */\n' +
  "    const drawer = page.locator('#accessibility-settings');\n" +
  '    if (await drawer.count() && !await drawer.isVisible().catch(() => false)) {\n' +
  "      await page.locator('.locale-settings-trigger').click();\n" +
  "      await drawer.waitFor({ state: 'visible', timeout: 5000 });\n" +
  '    }\n' +
  "    const panel = page.locator('#locale-picker .locale-picker-panel');\n";

// --- B: en exerciseLanguages(), solo contar y cerrar ---------------------
const B_OLD =
  '  /* Con `languageInDrawer` el idioma no esta en la cabecera: hay que abrir\n' +
  '     el ⚙️ para llegar a el. Se abre una vez aqui, no en `languageLocator()`,\n' +
  '     porque el helper tambien se llama en el camino que sale temprano y ahi\n' +
  '     no hay quien lo cierre. */\n' +
  "  const drawer = page.locator('#accessibility-settings');\n" +
  '  const hasDrawer = await drawer.count();\n' +
  '  if (hasDrawer && !await drawer.isVisible().catch(() => false)) {\n' +
  "    await page.locator('.locale-settings-trigger').click();\n" +
  "    await drawer.waitFor({ state: 'visible', timeout: 5000 });\n" +
  '  }\n';

const B_NEW =
  '  /* Abrir el ⚙️ es cosa de `languageLocator()`, que es quien lo necesita y\n' +
  '     quien sabe si hace falta: entre una llamada y otra la app puede\n' +
  '     recargar y cerrarlo. Aquí solo se cuenta si existe, para poder\n' +
  '     devolverlo a su sitio al terminar con el `finally` de abajo. */\n' +
  "  const hasDrawer = await page.locator('#accessibility-settings').count();\n";

let ok = 0;
for (const file of FILES) {
  const rel = path.relative(SUITE, file);
  let src = fs.readFileSync(file, 'utf8');
  let changed = false;

  if (src.includes('await drawer.waitFor({ state: \'visible\', timeout: 5000 });\n    }\n    const panel')) {
    console.log(`  = ${rel}: A ya aplicada`);
  } else if (src.includes(A_OLD)) {
    src = src.replace(A_OLD, A_NEW);
    console.log(`  + ${rel}: A — languageLocator abre el cajón`);
    changed = true;
  } else {
    console.log(`  ! ${rel}: no encuentro el ancla A — no toco nada`);
    process.exitCode = 1;
    continue;
  }

  if (src.includes('const hasDrawer = await page.locator')) {
    console.log(`  = ${rel}: B ya aplicada`);
  } else if (src.includes(B_OLD)) {
    src = src.replace(B_OLD, B_NEW);
    console.log(`  + ${rel}: B — exerciseLanguages solo cuenta y cierra`);
    changed = true;
  } else {
    console.log(`  ! ${rel}: no encuentro el ancla B — no toco nada`);
    process.exitCode = 1;
    continue;
  }

  if (changed) fs.writeFileSync(file, src, 'utf8');
  ok++;
}
console.log(`\n${ok} fichero(s) con el helper correcto.`);
