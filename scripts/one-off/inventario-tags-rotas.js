// Inventario PRECISO de etiquetas <link>/<script> cuyo atributo href/src fue
// truncado a una letra por el script de tokens.
//
// Firma exacta del dano:  <link ... hRUTA?v=...>   o   <script ... sRUTA?v=...>
// es decir, tras un espacio viene 'h' o 's' pegado a una ruta (con / o .),
// sin el 'ref="' / 'rc="' que deberia precederla.
//
// Para cada una muestra la etiqueta equivalente en HEAD, que es la fuente de
// verdad para reconstruirla.
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..', '..');
const PROJECTS = ['apptonomia', 'calculia', 'ludia', 'memofun', 'okeymoney', 'routime', 'sinonimia', 'teclatlon'];
const SKIP = new Set(['node_modules', '.git', '.wrangler', '.claude', 'dist', 'build']);

// ' h' o ' s' seguido de algo que contiene / o . y NO es otro atributo conocido.
const ROTO = /\s(?:h|s)(?=[^ >"']*(?:\/|\.js|\.css|\.mjs))[^"'\s>]*/;
const ATRIBUTOS_OK = /(?:href|src|crossorigin|type|integrity|rel|media|defer|async|nomodule|id|fetchpriority|referrerpolicy|as|disabled)/i;

function walk(dir, out) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith('.') || SKIP.has(e.name)) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, out);
    else if (e.isFile() && /\.html?$/i.test(e.name)) out.push(full);
  }
}

const rotos = [];

for (const p of PROJECTS) {
  const files = [];
  walk(path.join(ROOT, p), files);
  for (const f of files) {
    const rel = path.relative(ROOT, f).split(path.sep).join('/');
    const relAlProyecto = path.relative(path.join(ROOT, p), f).split(path.sep).join('/');
    const src = fs.readFileSync(f, 'utf8');
    let head = null;
    try {
      head = execFileSync('git', ['-C', p, 'show', 'HEAD:' + relAlProyecto], { encoding: 'utf8', maxBuffer: 1e8, stdio: ['ignore', 'pipe', 'ignore'] });
    } catch (e) { head = null; }
    const headTags = head ? (head.match(/<link\b[^>]*>|<script\b[^>]*>/gi) || []) : [];

    src.split(/\r?\n/).forEach((line, i) => {
      const ets = line.match(/<link\b[^>]*>|<script\b[^>]*>/gi);
      if (!ets) return;
      for (const et of ets) {
        // token de la etiqueta
        const m = et.match(/\s(?:href|src)=/i);
        if (!m) {
          const r = ROTO.exec(et);
          if (!r) return;
          const trozo = r[0].slice(1).split('=')[0];
          // evita falsos positivos de atributos legitimos que empiezan por h/s
          if (ATRIBUTOS_OK.test(trozo)) return;
          rotos.push({
            proyecto: p, rel, linea: i + 1, rota: et.trim(),
            // busca en HEAD la etiqueta con la misma ruta base
            enHead: headTags.find((x) => {
              const ruta = x.match(/(?:href|src)="([^"?]+)/);
              const rotoRuta = r[0].slice(1).replace(/^[a-z]+/, '');
              return ruta && rotoRuta && ruta[1].split('/').pop() === rotoRuta.split('/').pop();
            }) || '(no encontrada en HEAD)',
          });
        }
      }
    });
  }
}

const porP = {};
for (const r of rotos) porP[r.proyecto] = (porP[r.proyecto] || 0) + 1;
console.log('Etiquetas con href/src truncado, por proyecto:');
for (const p of PROJECTS) console.log('  ' + p.padEnd(12) + (porP[p] || 0));
console.log('  TOTAL       ' + rotos.length);
console.log('');
for (const r of rotos) {
  console.log('  ' + r.proyecto + '/' + r.rel + ':' + r.linea);
  console.log('    AHORA: ' + r.rota);
  console.log('    HEAD:  ' + r.enHead.trim());
}