// Como se referencia app.js en el HTML de teclatlon: si lleva ?v=,
// cambiar su contenido obliga a subir ese token (el navegador lo cachea).
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..', '..');
const PROY = 'teclatlon';

function walk(d, o) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (e.name.startsWith('.') || e.name === 'node_modules') continue;
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p, o);
    else if (/\.html?$/i.test(e.name)) o.push(p);
  }
}

const files = [];
walk(path.join(ROOT, PROY), files);

const conToken = new Map();
const sinToken = [];
for (const f of files) {
  const s = fs.readFileSync(f, 'utf8');
  const rel = path.relative(ROOT, f).split(path.sep).join('/');
  s.split(/\r?\n/).forEach((l) => {
    const m = l.match(/src=["']([^"']*app\.js)(\?v=([^"']+))?["']/);
    if (m) {
      if (m[3]) {
        const k = m[3];
        if (!conToken.has(k)) conToken.set(k, []);
        conToken.get(k).push(rel);
      } else {
        sinToken.push(rel + '  ->  ' + m[1]);
      }
    }
  });
}

console.log('=== app.js con token ?v= ===');
for (const [tok, lst] of conToken) {
  console.log('  token "' + tok + '" en ' + lst.length + ' pagina(s):');
  lst.slice(0, 12).forEach((x) => console.log('     ' + x));
}
console.log('');
console.log('=== app.js SIN token ?v= ===');
sinToken.forEach((x) => console.log('  ' + x));
console.log('');
console.log('app.js en disco: ' + fs.existsSync(path.join(ROOT, PROY, 'app.js')));