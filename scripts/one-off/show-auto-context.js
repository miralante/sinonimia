// Muestra el contexto de cada referencia ejecutable a 'auto' / matchMedia
// para decidir si es un resto del tema auto o un uso legitimo (reduced-motion, etc).
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..', '..');
const CASOS = [
  ['teclatlon/app.js', /'auto'|"auto"/],
  ['teclatlon/assets/js/gate.js', /matchMedia\s*\(/],
];

function sinComentarios(src) {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' '))
    .replace(/^\s*\/\/.*$/gm, (m) => m.replace(/[^\n]/g, ' '));
}

for (const [f, re] of CASOS) {
  const lineas = fs.readFileSync(path.join(ROOT, f), 'utf8').split(/\r?\n/);
  const codigo = sinComentarios(lineas.join('\n')).split('\n');
  console.log('=== ' + f + '  (' + re.source + ') ===');
  codigo.forEach((l, i) => {
    if (re.test(l)) {
      const desde = Math.max(0, i - 1), hasta = Math.min(lineas.length, i + 2);
      for (let k = desde; k < hasta; k++) {
        console.log(String(k + 1).padStart(4) + ' | ' + lineas[k].trim());
      }
      console.log('    ---');
    }
  });
  console.log('');
}