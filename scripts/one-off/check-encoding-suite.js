// Comprobacion de codificacion COMPARANDO CONTRA HEAD.
//
// Un U+FFFD o un BOM preexistente no es un fallo de esta tanda: el repo ya
// traia varios. Lo que hay que detectar es lo que ha cambiado a worse, asi
// que se separa en tres grupos:
//   INTRODUCIDO  -> 'ahora' tiene el problema y HEAD no        = fallo mio
//   ARREGLADO    -> HEAD lo tenia y 'ahora' ya no             = improvement
//   PREEXISTENTE -> esta igual en HEAD                        = ajeno
//   NUEVO        -> fichero sin versionar (lo crea otra sesion) = revisar a mano
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..', '..', '..');
const PROJECTS = ['apptonomia', 'calculia', 'ludia', 'memofun', 'okeymoney', 'routime', 'sinonimia', 'teclatlon'];
const SKIP = new Set(['node_modules', '.git', '.wrangler', '.claude', 'dist', 'build']);
const EXT = new Set(['.html', '.js', '.css']);

const MOJIBAKE = [
  '\u00c3\u00a9', '\u00c3\u00a1', '\u00c3\u00ad', '\u00c3\u00b3', '\u00c3\u00ba', '\u00c3\u00b1',
  '\u00c3\u00bc', '\u00c3\u00b6', '\u00c3\u00a4', '\u00c3\u00a8', '\u00c3\u00a7', '\u00c3\u00ab',
  '\u00e2\u20ac', '\u00c2\u00ab', '\u00c2\u00bb', '\u00c2\u00b0', '\u00c2\u00b7', '\u00c2\u00a1',
  '\u00c2\u00bf', '\u00ef\u00bf\u00bd', '\u00f0\u0178',
];

function git(p, args, buf) {
  try { return execFileSync('git', ['-C', p].concat(args), { encoding: buf ? 'buffer' : 'utf8', maxBuffer: 1e8, stdio: ['ignore', 'pipe', 'ignore'] }); }
  catch (e) { return null; }
}
function hasBOM(b) { return b[0] === 0xEF && b[1] === 0xBB && b[2] === 0xBF; }
// Un script de deteccion lleva los literales de mojibake por dentro: se ignora.
function esDetector(rel) { return /(^|[\\/])(scripts|tools-bin)[\\/]/.test(rel) || /fix-encoding|check-encoding|check-tokens-encoding|revert-cp1252/.test(rel); }

function problemas(buf) {
  const out = [];
  if (hasBOM(buf)) out.push('BOM');
  const s = buf.toString('utf8');
  if (s.includes('\uFFFD')) out.push('U+FFFD(' + (s.match(/\uFFFD/g) || []).length + ')');
  for (const m of MOJIBAKE) if (s.includes(m)) { out.push('MOJIBAKE'); break; }
  return out;
}

function walk(dir, out) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith('.') || SKIP.has(e.name)) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, out);
    else if (e.isFile() && EXT.has(path.extname(e.name).toLowerCase())) out.push(full);
  }
}

const introducidos = [], preexistentes = [], nuevos = [];

for (const p of PROJECTS) {
  const files = [];
  walk(path.join(ROOT, p), files);
  for (const f of files) {
    const rel = path.relative(ROOT, f).split(path.sep).join('/');
    if (esDetector(rel)) continue;
    const cur = fs.readFileSync(f);
    const pc = problemas(cur);
    if (pc.length === 0) continue;
    const relAlProyecto = path.relative(path.join(ROOT, p), f).split(path.sep).join('/');
    const head = git(p, ['show', 'HEAD:' + relAlProyecto], true);
    if (!head) { nuevos.push(rel + '  -> ' + pc.join(',')); continue; }
    const ph = problemas(head);
    // 'Introducido' = hay algun problema AHORA que HEAD no tenia.
    // Si HEAD ya lo traia y sigue igual, es preexistente (ajeno a esta tanda).
    const nuevosAhora = pc.filter((x) => !ph.some((y) => y === x || y.startsWith(x.split('(')[0])));
    if (nuevosAhora.length === 0) {
      preexistentes.push(rel + '  (HEAD tambien: ' + ph.join(',') + ')');
    } else {
      introducidos.push(rel + '  -> ahora ' + pc.join(',') + ' | HEAD ' + (ph.length ? ph.join(',') : 'limpio'));
    }
  }
}

if (preexistentes.length) { console.log('PREEXISTENTES, ya estaban en HEAD (' + preexistentes.length + ')  [ajenos a esta tanda]:'); for (const x of preexistentes) console.log('  ' + x); console.log(''); }
if (nuevos.length) { console.log('SIN VERSIONAR, con problemas (' + nuevos.length + ')  [otra sesion, no tocar]:'); for (const x of nuevos) console.log('  ' + x); console.log(''); }
if (introducidos.length) {
  console.log('INTRODUCIDOS ESTA TANDA (' + introducidos.length + ')  <-- FALLO:');
  for (const x of introducidos) console.log('  ' + x);
  process.exitCode = 1;
} else {
  console.log('Ningun fichero ha EMPEZADO a tener BOM, U+FFFD o mojibake en esta tanda.');
}