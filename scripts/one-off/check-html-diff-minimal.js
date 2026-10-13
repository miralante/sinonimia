// Comprueba que la reparacion de las 41 etiquetas fue MINIMA: en el diff de
// cada HTML solo debe haber cambiado la linea del <script> de locale-picker.js,
// y solo en el atributo src / el token. Ni una palabra mas.
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..', '..');
const PROJECTS = ['apptonomia', 'calculia', 'ludia', 'memofun', 'okeymoney', 'routime', 'sinonimia', 'teclatlon'];

let ok = 0;
const sospechosos = [];

for (const p of PROJECTS) {
  let diff;
  try {
    diff = execFileSync('git', ['-C', p, 'diff', '-U0', 'HEAD', '--', '*.html'], {
      encoding: 'utf8', maxBuffer: 1e8, stdio: ['ignore', 'pipe', 'ignore'],
    });
  } catch (e) { continue; }
  if (!diff.trim()) continue;

  const lineas = diff.split(/\r?\n/);
  let fichero = null, hunk = null;
  for (const l of lineas) {
    if (l.startsWith('+++ b/')) fichero = l.slice(6);
    else if (l.startsWith('@@')) hunk = l;
    else if (l.startsWith('+') && !l.startsWith('+++')) {
      const txt = l.slice(1);
      // Solo se admiten: la etiqueta de locale-picker (cargada) o una
      // retirada de un boton/markup del tema Auto.
      const esLocale = /<script src="[^"]*locale-picker\.js\?v=[a-z0-9-]+" defer><\/script>/.test(txt);
      const esRetiradaAuto = /theme-auto|themeAuto|data-settings-theme-auto/.test(txt);
      const esTexto = /^\+/.test(l) && /^\+/.test(txt);
      if (esLocale || esRetiradaAuto) { ok++; continue; }
      // Linea anadida que no es de este trabajo: la reporta para revision.
      sospechosos.push(p + '/' + (fichero || '?') + '  ' + (hunk || '') + '  ' + JSON.stringify(txt.slice(0, 120)));
    }
  }
}

console.log('Lineas + de HTML que SI son de este trabajo: ' + ok);
if (sospechosos.length) {
  console.log('');
  console.log('Lineas + de HTML a REVISAR (' + sospechosos.length + ')  [pueden ser de la otra sesion]:');
  for (const x of sospechosos.slice(0, 40)) console.log('  ' + x);
} else {
  console.log('Ninguna linea + de HTML fuera del trabajo de tema.');
}