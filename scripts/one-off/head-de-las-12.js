// Para cada <link> roto, saca la linea equivalente en HEAD: de ahi sale el
// atributo correcto (href=") y el token original. Con ambos datos se puede
// reconstruir sin adivinar.
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..', '..');

const CASOS = [
  ['apptonomia', 'about/index.html'],
  ['apptonomia', 'dev/index.html'],
  ['apptonomia', 'index.html'],
  ['apptonomia', 'legal/index.html'],
  ['apptonomia', 'team/index.html'],
  ['sinonimia', '404.html'],
  ['sinonimia', 'about/index.html'],
  ['sinonimia', 'config/index.html'],
  ['sinonimia', 'index.html'],
  ['sinonimia', 'legal/index.html'],
  ['sinonimia', 'legal/privacidad.html'],
  ['sinonimia', 'team/index.html'],
];

for (const [p, rel] of CASOS) {
  const f = path.join(ROOT, p, rel);
  const cur = fs.readFileSync(f, 'utf8').split(/\r?\n/);
  let head = [];
  try {
    head = execFileSync('git', ['-C', p, 'show', 'HEAD:' + rel], { encoding: 'utf8', maxBuffer: 1e8, stdio: ['ignore', 'pipe', 'ignore'] }).split(/\r?\n/);
  } catch (e) { /* sin HEAD */ }

  const ahora = cur.filter((l) => /<link\b[^>]*\sh(?:[^\s>]*)(?:\.css|\.js)/.test(l)).map((l) => l.trim());
  const enHead = head.filter((l) => l.includes('styles.css') || l.includes('tokens.css')).map((l) => l.trim());

  console.log('=== ' + p + '/' + rel + ' ===');
  console.log('  AHORA: ' + (ahora.join('\n          ') || '(ninguna)'));
  console.log('  HEAD:  ' + (enHead.join('\n          ') || '(ninguna)'));
  console.log('');
}