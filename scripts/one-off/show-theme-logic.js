// Muestra las lineas del componente que hablan de tema, para revisar de un
// vistazo que no queda ninguna referencia a 'auto' ni a prefers-color-scheme.
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..', '..');
const destino = process.argv[2] || 'apptonomia/assets/js/locale-picker.js';
const src = fs.readFileSync(path.join(ROOT, destino), 'utf8');

const CLAVES = [
  'THEMES', 'DEFAULT', 'theme', 'applyTheme', 'prefers-color-scheme',
  'data-theme', 'contrast', 'matchMedia', 'systemTheme', 'locale-picker:settings',
];

console.log('=== ' + destino + ' ===');
src.split(/\r?\n/).forEach((l, i) => {
  const t = l.trim();
  if (!t) return;
  if (CLAVES.some((k) => t.includes(k))) {
    console.log(String(i + 1).padStart(4) + ' | ' + t);
  }
});

const malo = [];
for (const pat of ['prefers-color-scheme', 'matchMedia', "themeAuto", "'auto'", '"auto"', 'systemTheme']) {
  const n = (src.match(new RegExp(pat.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
  if (n) malo.push(pat + ' x' + n);
}
console.log('');
console.log(malo.length ? 'REFERENCIAS A REVISAR: ' + malo.join(', ') : 'Sin referencias a auto / prefers-color-scheme / matchMedia.');