// Reparacion GENERAL de etiquetas <link>/<script> con href/src truncado.
//
// Firma del dano (producida por bump-tokens-for-changed.js):
//     <link ... hRUTA?v=TOKEN" >      en vez de   <link ... href="RUTA?v=TOKEN">
//     <script ... sRUTA?v=TOKEN" >    en vez de   <script ... src="RUTA?v=TOKEN"
// Se perdieron los caracteres 'ref="' / 'rc="' y el token quedo duplicado.
//
// METODO (no deducir el token del valor corrupto, que es imposible):
//   reconstruir la etiqueta desde HEAD, que es la fuente de verdad del
//   atributo y del token, y aplicar un bump DETERMINISTA del token:
//       nuevo = token_HEAD (sin 'a's finales) + 'a'
//   porque en esta tanda el script siempre anadio una 'a' al token
//   (apptonomia-v5ac -> apptonomia-v5aca).
//
// SEGURIDAD. Antes de escribir CADA fichero:
//   (a) se localiza exactamente UNA etiqueta rota (si hay varias, todas se
//       reparan, pero cada una se valida),
//   (b) la ruta resuelta existe en disco,
//   (c) el token de HEAD se lee y es utilizable,
//   (d) HEAD tiene una linea equivalente (mismo fichero, <link>/<script> con la
//       misma ruta base) de la que copiar el atributo correcto.
// Si un fichero no cumple alguna, se registra y NO se escribe. Al final, si
// queda alguna etiqueta rota, codigo de salida 1.
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..', '..', '..');
const PROJECTS = ['apptonomia', 'calculia', 'ludia', 'memofun', 'okeymoney', 'routime', 'sinonimia', 'teclatlon'];
const SKIP = new Set(['node_modules', '.git', '.wrangler', '.claude', 'dist', 'build']);

// Token base cuando HEAD no traia ninguno (se usa el del propio proyecto).
const BASE_SIN_TOKEN = {
  apptonomia: 'apptonomia-v13',
  sinonimia: 'sinonimia-v4',
  calculia: 'calculia-v2bc',
  memofun: 'memofun-v2ca',
  okeymoney: 'okeymoney-v2bc',
  routime: 'routime-v3bce',
  ludia: '20260914-9bfgh',
  teclatlon: 'teclatlon-v1',
};

const ET = /<link\b[^>]*>|<script\b[^>]*>/gi;
const ATRIB_ROTO = /\s([hs])(?=[^ >"']*(?:\/|\.css|\.js))([^"'\s>]*\?v=[^"'\s>]*)/;

function walk(dir, out) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith('.') || SKIP.has(e.name)) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, out);
    else if (e.isFile() && /\.html?$/i.test(e.name)) out.push(full);
  }
}

let reparadas = 0, ficheros = 0, saltados = 0;
const fallos = [];

for (const proyecto of PROJECTS) {
  const files = [];
  walk(path.join(ROOT, proyecto), files);

  for (const f of files) {
    const src = fs.readFileSync(f, 'utf8');

    ET.lastIndex = 0;
    const rotas = [];
    let m;
    while ((m = ET.exec(src)) !== null) {
      const a = ATRIB_ROTO.exec(m[0]);
      if (a) rotas.push({ etiqueta: m[0], letra: a[1], resto: a[2] });
    }
    if (rotas.length === 0) continue;

    const relAlProyecto = path.relative(path.join(ROOT, proyecto), f).split(path.sep).join('/');
    let head = null;
    try {
      head = execFileSync('git', ['-C', proyecto, 'show', 'HEAD:' + relAlProyecto],
        { encoding: 'utf8', maxBuffer: 1e8, stdio: ['ignore', 'pipe', 'ignore'] });
    } catch (e) { head = null; }

    if (head === null) {
      saltados++;
      fallos.push(path.relative(ROOT, f) + ': sin HEAD, no se puede reconstruir');
      continue;
    }
    const headEtiquetas = head.match(/<link\b[^>]*>|<script\b[^>]*>/gi) || [];

    let texto = src;
    const rechazos = [];
    let cambios = 0;

    for (const r of rotas) {
      const esLink = /^<link/i.test(r.etiqueta);
      const atributo = esLink ? 'href' : 'src';
      // ruta rota: lo que sigue a la letra h/s, sin el ?v=...
      const ruta = r.resto.split('?v=')[0];
      const nombreBase = ruta.split('/').pop();

      // (d) etiqueta equivalente en HEAD
      const cand = headEtiquetas.find((x) => {
        const mm = x.match(/(?:href|src)="([^"?]+)/);
        return mm && mm[1].split('/').pop() === nombreBase;
      });
      if (!cand) { rechazos.push('ruta "' + ruta + '" no encontrada en HEAD'); continue; }

      // (b) la ruta existe en disco
      const destino = path.resolve(path.dirname(f), ruta);
      if (!fs.existsSync(destino)) {
        rechazos.push('ruta "' + ruta + '" no existe en disco (' + path.relative(ROOT, destino) + ')');
        continue;
      }

      // token
      const tokenHead = (cand.match(/\?v=([^"]+)/) || [])[1];
      const tokenNuevo = tokenHead
        ? tokenHead.replace(/a+$/, '') + 'a'
        : (BASE_SIN_TOKEN[proyecto] || 'v1') + 'a';

      // reconstruir: partir de HEAD, cambiar solo la ruta y el token
      let etNueva;
      if (tokenHead) {
        etNueva = cand.replace(/(?:href|src)="[^"?]+/, (s) => s.split('=')[0] + '="' + ruta);
        etNueva = etNueva.replace(/\?v=[^"]+/, '?v=' + tokenNuevo);
      } else {
        etNueva = cand.replace(/(?:href|src)="([^"]*)"/, (s, val) => s.replace(val, val + '?v=' + tokenNuevo));
      }
      // el atributo correcto debe llevar =" (comprobacion de seguridad)
      if (!new RegExp(atributo + '="').test(etNueva)) {
        rechazos.push('reconstruccion sin ' + atributo + '=" -> ' + etNueva);
        continue;
      }
      texto = texto.replace(r.etiqueta, etNueva);
      cambios++;
    }

    if (rechazos.length) {
      saltados++;
      fallos.push(path.relative(ROOT, f) + ': ' + rechazos.join(' | '));
      continue;   // no se escribe este fichero
    }
    if (cambios === 0) continue;

    // no debe quedar ninguna rota despues
    const restantes = (texto.match(new RegExp(ATRIB_ROTO.source, 'g')) || []).length;
    ET.lastIndex = 0;
    let quedan = 0, mm2;
    const ET2 = /<link\b[^>]*>|<script\b[^>]*>/gi;
    while ((mm2 = ET2.exec(texto)) !== null) if (ATRIB_ROTO.test(mm2[0])) quedan++;
    if (quedan !== 0) {
      saltados++;
      fallos.push(path.relative(ROOT, f) + ': quedan ' + quedan + ' etiquetas rotas tras reparar');
      continue;
    }

    fs.writeFileSync(f, texto, 'utf8');
    reparadas += cambios; ficheros++;
    console.log('  ' + path.relative(ROOT, f) + '  (' + cambios + ')');
  }
}

console.log('');
console.log('Reparadas ' + reparadas + ' etiqueta(s) en ' + ficheros + ' fichero(s).');
if (saltados) {
  console.log('Ficheros SIN ESCRIBIR (' + saltados + '):');
  for (const x of fallos) console.log('  ' + x);
  process.exitCode = 1;
} else {
  console.log('Sin rechazos.');
}