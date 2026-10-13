// Para cada etiqueta <link>/<script> rota, muestra la MISMA etiqueta en HEAD,
// para reconstruirla con certeza en vez de deducir el token.
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..', '..');
const PROJECTS = ['apptonomia', 'calculia', 'ludia', 'memofun', 'okeymoney', 'routime', 'sinonimia', 'teclatlon'];
const SKIP = new Set(['node_modules', '.git', '.wrangler', '.claude', 'dist', 'build']);

// Atributo reducido a una letra pegada a la ruta:  hRUTA  o  sRUTA
const ROTO_ATRIB = /\s(?:h|s)(?=[^ >]*[\/.])[^"'\s>]*/;

function walk(dir, out) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith('.') || SKIP.has(e.name)) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, out);
    else if (e.isFile() && /\.html?$/i.test(e.name)) out.push(full);
  }
}

let total = 0;
for (const p of PROJECTS) {
  const files = [];
  walk(path.join(ROOT, p), files);
  const delP = [];
  for (const f of files) {
    const rel = path.relative(ROOT, f).split(path.sep).join('/');
    const relAlProyecto = path.relative(path.join(ROOT, p), f).split(path.sep).join('/');
    const src = fs.readFileSync(f, 'utf8');
    const rotoLineas = src.split(/\r?\n/);

    let head = null;
    try {
      head = execFileSync('git', ['-C', p, 'show', 'HEAD:' + relAlProyecto], { encoding: 'utf8', maxBuffer: 1e8, stdio: ['ignore', 'pipe', 'ignore'] });
    } catch (e) { head = null; }

    rotoLineas.forEach((line, i) => {
      const ets = line.match(/<link\b[^>]*>|<script\b[^>]*>/gi);
      if (!ets) return;
      for (const et of ets) {
        const m = ROTO_ATRIB.exec(et);
        if (!m) continue;
        total++;
        let enHead = '(sin HEAD)';
        if (head) {
          const cand = head.split(/\r?\n/).map((l) => (l.match(/<link\b[^>]*>|<script\b[^>]*>/gi) || [])).flat()
            .filter((x) => /[\/.]/.test(x))
            .find((x) => {
              const ruta = x.match(/(?:href|src)="([^"?]+)/);
              return ruta && x.includes(ruta[1].split('/').pop());
            });
          if (cand) enHead = cand.trim();
        }
        delP.push({ rel, linea: i + 1, rota: et.trim(), enHead });
      }
    });
  }
  if (delP.length) {
    console.log('======== ' + p + '  (' + delP.length + ') ========');
    for (const d of delP) {
      console.log('  ' + d.rel + ':' + d.linea);
      console.log('    AHORA: ' + d.rota);
      console.log('    HEAD: ' + d.enHead);
    }
  }
}
console.log('\nTOTAL etiquetas con atributo roto: ' + total);