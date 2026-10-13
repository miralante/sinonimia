// Repara las 42 etiquetas <script> que corrompió bump-tokens-for-changed.js.
//
// Forma del daño (uniforme en las 42):
//   <script sRUTA?v=TOKENT_ROTO" defer></script>
// donde se perdieron los 4 caracteres 'rc="' y el token quedó duplicado:
//   ROTO = CORRECTO + sufijo_del_hash_sin_la_letra_final
// p.ej. apptonomia-v5aca -> apptonomia-v5acav5ac
//
// SEGURIDAD: antes de escribir nada en un fichero se valida que
//   (a) la ruta resuelva a un fichero REAL en disco, y
//   (b) el token deducido sea exactamente el esperado para ese proyecto.
// Si algo no cuadra, registra el fallo, NO escribe ese fichero y sale con
// código 1. Si al final queda alguna etiqueta rota, código 1.
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..', '..');
const PROJECTS = ['apptonomia', 'calculia', 'ludia', 'memofun', 'okeymoney', 'routime', 'sinonimia', 'teclatlon'];
const SKIP = new Set(['node_modules', '.git', '.wrangler', '.claude', 'dist', 'build']);

// Tokens correctos, ya subidos a proposito en la tanda anterior.
const ESPERADO = {
  apptonomia: 'apptonomia-v5aca',
  calculia: 'calculia-v5aaa',
  ludia: 'ludia-v4aaa',
  memofun: 'memofun-v4aaa',
  okeymoney: 'okeymoney-v4aaa',
  routime: 'routime-v2aaa',
  sinonimia: 'sinonimia-v6aaa',
  teclatlon: 'teclatlon-v4aaa',
};

// Etiqueta rota completa. Exige el cierre ' defer></script>' para no tocar
// la prosa de sinonimia/index.html:163 ('Same-origin <script src> satisfies the CSP').
const ROTO = /<script s(?!rc=)([^?"'\s]*)\?v=([^"']*)" defer><\/script>/g;

// De 'apptonomia-v5acav5ac' deduce 'apptonomia-v5aca'.
// El sufijo pegado es el token desde la 'v' del hash, sin la ultima letra.
function deduplicar(token) {
  const m = /^([a-z0-9]+-v[0-9a-f]+)([a-z]+)\1?(v[0-9a-f]+)[a-z]$/.exec(token);
  if (m) return m[1] + m[2];
  // Fallback explicito: el token es C + (C desde la 'v' del hash, sin ultima letra).
  const h = /-v([0-9a-f]+)/.exec(token);
  if (!h) return null;
  const i = token.indexOf(h[0]) + 1;          // indice de la 'v' del hash
  const sufijo = token.slice(i, -1);
  return sufijo && token.endsWith(sufijo) ? token.slice(0, -sufijo.length) : null;
}

function walk(dir, out) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith('.') || SKIP.has(e.name)) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, out);
    else if (e.isFile() && /\.html?$/i.test(e.name)) out.push(full);
  }
}

let reparados = 0, saltados = 0;
const fallos = [];
const detalle = [];

for (const proyecto of PROJECTS) {
  const files = [];
  walk(path.join(ROOT, proyecto), files);

  for (const f of files) {
    const src = fs.readFileSync(f, 'utf8');
    ROTO.lastIndex = 0;
    if (!ROTO.test(src)) continue;
    ROTO.lastIndex = 0;

    let texto = src;
    let cambios = 0;

    ROTO.lastIndex = 0;
    let m;
    const rechazos = [];
    while ((m = ROTO.exec(src)) !== null) {
      const [todo, ruta, tokenRoto] = m;
      const tokenOk = deduplicar(tokenRoto);

      if (tokenOk !== ESPERADO[proyecto]) {
        rechazos.push(`token: deducido "${tokenOk}" != esperado "${ESPERADO[proyecto]}"`);
        continue;
      }
      const destino = path.resolve(path.dirname(f), ruta.split('?')[0]);
      if (!fs.existsSync(destino)) {
        rechazos.push(`ruta: "${ruta}" no existe en disco (${path.relative(ROOT, destino)})`);
        continue;
      }
      texto = texto.replace(todo, `<script src="${ruta}?v=${tokenOk}" defer></script>`);
      cambios++;
    }

    if (rechazos.length) {
      saltados++;
      fallos.push(`${path.relative(ROOT, f)}: ${rechazos.join(' | ')}`);
      continue;   // NO se escribe este fichero
    }
    if (cambios === 0) continue;

    // Solo escribimos si ademas el numero de coincidencias coincide con los
    // reemplazos hechos (evita reescrituras parciales silenciosas).
    const restantes = (texto.match(ROTO) || []).length;
    if (restantes !== 0) {
      saltados++;
      fallos.push(`${path.relative(ROOT, f)}: quedan ${restantes} coincidencias sin reparar`);
      continue;
    }

    fs.writeFileSync(f, texto, 'utf8');
    reparados += cambios;
    detalle.push(`  ${path.relative(ROOT, f)}  (${cambios})`);
  }
}

console.log(`Reparadas: ${reparados} en ficheros: ${detalle.length}`);
for (const d of detalle) console.log(d);
if (fallos.length) {
  console.log(`\nFicheros SIN ESCRIBIR (${saltados}):`);
  for (const x of fallos) console.log('  ' + x);
  process.exitCode = 1;
} else {
  console.log('\nSin rechazos: todas las rutas existen y todos los tokens cuadran.');
}