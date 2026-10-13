// Comprueba que NO queda ninguna referencia EJECUTABLE a 'auto' ni a
// prefers-color-scheme: solo se admiten dentro de comentarios o cadenas de
// texto que describen el motivo del cambio.
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..', '..');
const FICHEROS = [
  'apptonomia/assets/js/locale-picker.js',
  'calculia/assets/js/locale-picker.js',
  'ludia/assets/js/locale-picker.js',
  'memofun/assets/js/locale-picker.js',
  'okeymoney/assets/js/locale-picker.js',
  'routime/assets/js/locale-picker.js',
  'sinonimia/js/locale-picker.js',
  'teclatlon/assets/js/locale-picker.js',
  'teclatlon/app.js',
  'teclatlon/assets/js/gate.js',
  'apptonomia/css/styles.css',
  'ludia/assets/css/styles.css',
  'sinonimia/css/styles.css',
  'calculia/assets/css/tokens.css',
  'memofun/assets/css/tokens.css',
  'okeymoney/assets/css/tokens.css',
  'routime/assets/css/tokens.css',
];

// Quito comentarios de linea y de bloque para dejar solo codigo ejecutable.
function sinComentarios(src) {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' '))
    .replace(/^\s*\/\/.*$/gm, (m) => m.replace(/[^\n]/g, ' '));
}

const SOSPECHOSOS = [
  /prefers-color-scheme/,
  /matchMedia\s*\(\s*['"`]prefers-color-scheme/,
  /'auto'/,
  /"auto"/,
  /\bsystemTheme\b/,
  /themeAuto/,
];

let codigoSospechoso = 0;
let menciones = [];

for (const f of FICHEROS) {
  const p = path.join(ROOT, f);
  if (!fs.existsSync(p)) { console.log('FALTA  ' + f); continue; }
  const crudo = fs.readFileSync(p, 'utf8');
  const codigo = sinComentarios(crudo);

  for (const re of SOSPECHOSOS) {
    const c = codigo.match(new RegExp(re.source, 'g'));
    if (c) {
      codigoSospechoso += c.length;
      console.log('CODIGO  ' + f + '  ' + re.source + '  x' + c.length);
    }
  }
  const enComentario = (crudo.match(/prefers-color-scheme|themeAuto|'auto'|"auto"/g) || []).length;
  if (enComentario) menciones.push('  ' + f.padEnd(38) + enComentario + ' mencion(es), todas en comentario');
}

console.log('');
if (menciones.length) {
  console.log('Menciones solo en comentarios (informativas):');
  menciones.forEach((m) => console.log(m));
}
console.log('');
console.log(codigoSospechoso === 0
  ? 'OK: cero referencias ejecutables a auto / prefers-color-scheme / matchMedia.'
  : 'FALLO: ' + codigoSospechoso + ' referencias ejecutables. Revisar arriba.');
if (codigoSospechoso !== 0) process.exitCode = 1;