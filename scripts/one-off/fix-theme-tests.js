#!/usr/bin/env node
/* one-off/fix-theme-tests.js

   Ocho puertas fijaban el comportamiento que se acaba de quitar:

   - los 6 `ui-smoke.js` pulsaban el botón "auto" y comprobaban que el
     documento se quedaba SIN `data-theme`, y además guardaban
     `theme === 'auto'`;
   - el test de apptonomia daba por bueno que el tema por defecto fuera
     "sin atributo" y comprobaba que al emular un sistema oscuro la página
     se ponía oscura;
   - el de sinonimia daba por bueno que al apagar el contraste se volvía
     al tema "auto".

   No es solo quitar líneas: el test de apptonomia pasa a comprobar justo
   lo contrario de lo que comprobaba —que emular un sistema oscuro NO
   cambia la página— porque eso es lo que garantiza que el tema por
   defecto sea claro de verdad y no "lo que diga el sistema".

   Los anchors se adaptan al fin de línea de cada fichero, como en los
   parches anteriores. Si uno no aparece, ese fichero se salta sin
   escribir y se avisa. */

'use strict';
const fs = require('fs');
const path = require('path');

const SUITE = path.resolve(__dirname, '..', '..', '..');
const SMOKES = ['calculia', 'ludia', 'memofun', 'okeymoney', 'routime', 'sinonimia'].map(
  (p) => `${p}/scripts/ui-smoke.js`
);

// El clic en "auto" y su aserción, en cualquiera de los seis.
const AUTO_CLICK = new RegExp(
  '[ \\t]*await drawer\\.locator\\(\'\\[data-settings-theme="auto"\\]\'\\)\\.click\\(\\);\\r?\\n' +
  "[ \\t]*assert\\.strictEqual\\(await page\\.locator\\('html'\\)\\.getAttribute\\('data-theme'\\), null,\\r?\\n" +
  "[ \\t]*'[^']*'\\);\\r?\\n\\r?\\n",
  'g'
);

const EDITS = SMOKES.map((file) => ({
  file,
  steps: [
    { from: AUTO_CLICK, to: '' },
    // Tras quitar el clic a "auto", el último tema pulsado es "dark": el
    // contraste se activa encima sin cambiar el tema guardado.
    { from: "assert.strictEqual(saved.theme, 'auto');", to: "assert.strictEqual(saved.theme, 'dark');" },
  ],
}));

EDITS.push({
  file: 'apptonomia/tests/settings.spec.js',
  steps: [{
    from:
      "    await expect(page.locator('html')).not.toHaveAttribute('data-theme');\n" +
      '    const autoLight = await bodyColors();\n' +
      "    await page.emulateMedia({ colorScheme: 'dark' });\n" +
      '    await expect.poll(() => bodyColors().then(colors => colors.background)).not.toBe(autoLight.background);',
    to:
      '    // El tema por defecto es "light" y se queda en "light": emular un\n' +
      '    // sistema oscuro NO debe pintar la página de oscuro, porque ya no\n' +
      '    // queda la opción "auto" que le entregaba la decisión al sistema.\n' +
      "    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');\n" +
      '    const defaultColors = await bodyColors();\n' +
      "    await page.emulateMedia({ colorScheme: 'dark' });\n" +
      '    await expect.poll(() => bodyColors().then(colors => colors.background)).toBe(defaultColors.background);',
  }],
});

EDITS.push({
  file: 'sinonimia/tests/app.spec.js',
  steps: [{
    from:
      '  // Off: back to "auto", which means no data-theme at all so that\n' +
      '  // prefers-color-scheme decides.\n' +
      '  await contrast.uncheck();\n' +
      '  await page.waitForTimeout(SETTLE_MS);\n' +
      '  expect(await page.evaluate(() =>\n' +
      "    document.documentElement.hasAttribute('data-theme'))).toBe(false);",
    to:
      '  // Off: back to the saved theme, which is "light" when nobody has\n' +
      '  // chosen one. Before, turning contrast off restored "auto", which\n' +
      '  // left the attribute off and handed the decision to the system.\n' +
      '  await contrast.uncheck();\n' +
      '  await page.waitForTimeout(SETTLE_MS);\n' +
      '  expect(await page.evaluate(() =>\n' +
      "    document.documentElement.getAttribute('data-theme'))).toBe('light');",
  }],
});

let ok = 0;
for (const { file, steps } of EDITS) {
  const full = path.join(SUITE, file);
  if (!fs.existsSync(full)) { console.log(`  ? no existe ${file}`); process.exitCode = 1; continue; }
  let src = fs.readFileSync(full, 'utf8');
  const eol = src.includes('\r\n') ? '\r\n' : '\n';

  let out = src;
  let applied = 0;
  for (const step of steps) {
    const from = typeof step.from === 'string' ? step.from.replace(/\n/g, eol) : step.from;
    const to = typeof step.to === 'string' ? step.to.replace(/\n/g, eol) : step.to;
    if (from instanceof RegExp) {
      if (!from.test(out)) continue; // puede no aplicar (ya arreglado)
      from.lastIndex = 0;
      out = out.replace(from, to);
      applied++;
    } else {
      if (!out.includes(from)) {
        console.log(`  ! ${file}: falta un ancla — no toco este fichero`);
        process.exitCode = 1;
        out = null;
        break;
      }
      out = out.replace(from, to);
      applied++;
    }
  }

  if (out === null) continue;
  if (out === src) { console.log(`  = ${file}: ya estaba`); ok++; continue; }
  fs.writeFileSync(full, out, 'utf8');
  console.log(`  + ${file}: ${applied} cambio(s)`);
  ok++;
}
console.log(`\n${ok}/${EDITS.length} ficheros actualizados.`);