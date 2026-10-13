// Repara las 12 etiquetas <link> con href truncado a 'h' (el mismo fallo del
// script de tokens, pero en el atributo href en vez de src).
//
// METODO: no se deduce el token del valor corrupto (imposible: el script de
// tokens mezclo dos cadenas). Se reconstruye la linea desde HEAD, que es la
// fuente de verdad del atributo, y se aplica un bump DETERMINISTA del token:
//
//   - si HEAD ya tenia token  ->  nuevo = token_HEAD + 'a'
//   - si HEAD no tenia token ->  nuevo = token_base_del_proyecto + 'a'
//     (la base es el token que usan las otras paginas del mismo proyecto para
//      ese mismo fichero, p.ej. sinonimia-v4)
//
// ElProjects62/lo que hizo mi script es siempre appenDear 'a', asi que 'a' es
// la letra coherente con la convencion ya usada en esta tanda
// (apptonomia-v5ac -> apptonomia-v5aca).
//
// SEGURIDAD, antes de escribir en cada fichero:
//   (a) la linea rota aparece EXACTAMENTE una vez (si aparece mas, se aborta),
//   (b) la ruta resuelta existe en disco,
//   (c) el token resultante es distinto del de HEAD (si no, no se bumparia),
//   (d) la linea de HEAD tiene el atributo esperado (href= o stylesheet),
// Si algo no cuadra: registra el fallo, NO escribe ese fichero, codigo 1.
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..', '..', '..');

// Token base por proyecto para el caso "HEAD no tenia token".
const BASE_SIN_TOKEN = {
  apptonomia: 'apptonomia-v13',
  sinonimia: 'sinonimia-v4',
};

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

let reparados = 0;
const fallos = [];

for (const [proyecto, rel] of CASOS) {
  const rutaAbs = path.join(ROOT, proyecto, rel);
  const cur = fs.readFileSync(rutaAbs, 'utf8');
  const lineas = cur.split('\n');

  let headLineas = [];
  try {
    headLineas = execFileSync('git', ['-C', proyecto, 'show', 'HEAD:' + rel],
      { encoding: 'utf8', maxBuffer: 1e8, stdio: ['ignore', 'pipe', 'ignore'] }).split(/\r?\n/);
  } catch (e) {
    fallos.push(proyecto + '/' + rel + ': no se pudo leer HEAD');
    continue;
  }

  // (1) localizar la linea rota actual: un <link ... h...css...> sin href=
  const idxs = [];
  lineas.forEach((l, i) => {
    const et = (l.match(/<link\b[^>]*>/i) || [])[0];
    if (!et) return;
    if (/\shref=/i.test(et)) return;
    // atributo truncado: letra suelta pegada a una ruta de css
    if (/\sh(?=[^\s>]*\.css)/.test(et)) idxs.push(i);
  });
  if (idxs.length === 0) { continue; }             // ya arreglado
  if (idxs.length > 1) {
    fallos.push(proyecto + '/' + rel + ': ' + idxs.length + ' lineas rotas, se esperaba 1');
    continue;
  }
  const i = idxs[0];

  // (2) linea equivalente en HEAD: la que referencia styles.css y es un <link stylesheet>
  const idxHead = headLineas.findIndex((l) => {
    const et = (l.match(/<link\b[^>]*>/i) || [])[0];
    return et && /stylesheet/i.test(et) && /styles\.css/.test(et);
  });
  if (idxHead === -1) {
    fallos.push(proyecto + '/' + rel + ': no encontre la linea <link styles.css> en HEAD');
    continue;
  }
  const headEt = headLineas[idxHead].trim();
  const ruta = (headEt.match(/href="([^"?]+)/) || [])[1];
  if (!ruta) {
    fallos.push(proyecto + '/' + rel + ': la linea de HEAD no tiene href=" legible -> ' + headEt);
    continue;
  }

  // (3) validar que la ruta existe
  const destino = path.resolve(path.dirname(rutaAbs), ruta);
  if (!fs.existsSync(destino)) {
    fallos.push(proyecto + '/' + rel + ': la ruta "' + ruta + '" no existe (' + path.relative(ROOT, destino) + ')');
    continue;
  }

  // (4) calcular token nuevo
  const tokenHead = (headEt.match(/\?v=([^"]+)/) || [])[1];
  let tokenNuevo;
  if (tokenHead) {
    tokenNuevo = tokenHead.replace(/a+$/, '') + 'a';   // no encadenar 'a's
  } else {
    tokenNuevo = BASE_SIN_TOKEN[proyecto] + 'a';
  }
  if (!tokenNuevo || tokenNuevo === tokenHead) {
    fallos.push(proyecto + '/' + rel + ': token no cambia (HEAD="' + tokenHead + '" nuevo="' + tokenNuevo + '")');
    continue;
  }

  // (5) reconstruir la etiqueta: HEAD con el token nuevo
  const etNuevo = headEt.replace(/\?v=[^"]+/, '?v=' + tokenNuevo).replace(/\?v=(")/, '?v=' + tokenNuevo + '$1');
  // si HEAD no tenia token, hay que insertarlo antes de la comilla de cierre
  const etFinal = tokenHead ? etNuevo : etNuevo.replace(/">$/, '?v=' + tokenNuevo + '">');

  // (6) preservar la indentacion de la linea actual
  const indent = (lineas[i].match(/^\s*/) || [''])[0];
  const nuevaLinea = indent + etFinal;

  if (nuevaLinea === lineas[i]) {
    fallos.push(proyecto + '/' + rel + ': la reconstruccion no cambia nada');
    continue;
  }

  const antes = lineas[i].trim();
  lineas[i] = nuevaLinea;
  fs.writeFileSync(rutaAbs, lineas.join('\n'), 'utf8');
  reparados++;
  console.log('  ' + proyecto + '/' + rel + ':' + (i + 1));
  console.log('    - ' + antes);
  console.log('    + ' + nuevaLinea.trim());
}

console.log('\nReparados: ' + reparados + ' / ' + CASOS.length);
if (fallos.length) {
  console.log('FALLOS (' + fallos.length + ')  [NO se escribieron]:');
  for (const f of fallos) console.log('  ' + f);
  process.exitCode = 1;
}