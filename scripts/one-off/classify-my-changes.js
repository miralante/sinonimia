// Clasifica los ficheros modificados de cada proyecto en MIOS / DE OTRA
// SESSION, para no commitear ni publicar trabajo ajeno por accidente.
const { execFileSync } = require('child_process');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..', '..');
const PROJECTS = ['apptonomia', 'calculia', 'ludia', 'memofun', 'okeymoney', 'routime', 'sinonimia', 'teclatlon'];

// Firmas de MI trabajo: el componente compartido, los tokens que subi, las
// paginas HTML reparadas, los sw.js, los smokes y los specs de tema/idioma.
const MIO = [
  /(^|\/)locale-picker\.js$/,
  /(^|\/)locale-picker\.css$/,
  /(^|\/)locale-picker-config\.js$/,
  /(^|\/)sw\.js$/,
  /(^|\/)ui-smoke\.js$/,
  /^scripts\/one-off\//,
  /tests\/settings\.spec\.js$/,
  /tests\/app\.spec\.js$/,
  /(^|\/)strings\.(es|en)\.js$/,
];

// Ficheros que se que son de la otra sesion (firma explicita).
const AJENO = [
  /roman-numerals|tools\/shapes|tools\/posneg|graphify|design\.md|TODO\.md|debug\.log/,
  /tools\/vocabulary\/data\.js$/,
  /tools\/emotions\//,
  /\.gitignore$/,
];

function esMio(rel) {
  if (AJENO.some((r) => r.test(rel))) return false;
  return MIO.some((r) => r.test(rel));
}

for (const p of PROJECTS) {
  let out = '';
  try {
    out = execFileSync('git', ['-C', p, 'status', '--porcelain'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
  } catch (e) { continue; }
  const mios = [], ajenos = [];
  for (const l of out.split(/\r?\n/).filter(Boolean)) {
    const est = l.slice(0, 2);
    const rel = l.slice(3).trim().replace(/^"|"$/g, '');
    if (est === '??') { ajenos.push('NUEVO  ' + rel); continue; }
    (esMio(rel) ? mios : ajenos).push(est + '     ' + rel);
  }
  console.log('======== ' + p + ' ========  mios=' + mios.length + '  ajenos=' + ajenos.length);
  if (mios.length) {
    console.log('  --- MIO ---');
    mios.slice(0, 200).forEach((x) => console.log('   ' + x));
    if (mios.length > 200) console.log('   ... y ' + (mios.length - 200) + ' mas');
  }
  if (ajenos.length) {
    console.log('  --- DE LA OTRA SESION ---');
    ajenos.slice(0, 25).forEach((x) => console.log('   ' + x));
    if (ajenos.length > 25) console.log('   ... y ' + (ajenos.length - 25) + ' mas');
  }
}