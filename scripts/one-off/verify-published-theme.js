// Verificacion POST-DESPLIEGUE sobre los sitios reales.
// Para cada proyecto:
//   1. descarga el HTML y confirma que NO hay etiquetas con href/src truncado
//      (el fallo que rompia la carga de CSS y del componente de idioma);
//   2. confirma que el token ?v= del locale-picker.js es el nuevo;
//   3. descarga el locale-picker.js servido y confirma que su lista de temas
//      es ['light','dark'] (sin 'auto') y que el defecto es 'light'.
const https = require('https');

const ESPERADO_TOKEN = {
  apptonomia: 'apptonomia-v5aca', calculia: 'calculia-v5aaa', ludia: 'ludia-v4aaa',
  memofun: 'memofun-v4aaa', okeymoney: 'okeymoney-v4aaa', routime: 'routime-v2aaa',
  sinonimia: 'sinonimia-v6aaa', teclatlon: 'teclatlon-v4aaa',
};
const RUTA_PICKER = {
  apptonomia: '/assets/js/locale-picker.js', calculia: '/assets/js/locale-picker.js',
  ludia: '/assets/js/locale-picker.js', memofun: '/assets/js/locale-picker.js',
  okeymoney: '/assets/js/locale-picker.js', // routime sirve el componente desde site/, con ruta ../assets/...
  routime: '/site/../assets/js/locale-picker.js',
  sinonimia: '/js/locale-picker.js', teclatlon: '/assets/js/locale-picker.js',
};
// URL real de cada sitio. apptonomia no tiene dominio propio: solo
// responde en workers.dev. routime sirve una portada que redirige a
// site/index.html, que es donde vive el componente.
const URL_BASE = {
  apptonomia: 'https://apptonomia.miralante.workers.dev',
  calculia: 'https://calculia.apptonomia.uk',
  ludia: 'https://ludia.apptonomia.uk',
  memofun: 'https://memofun.apptonomia.uk',
  okeymoney: 'https://okeymoney.apptonomia.uk',
  routime: 'https://routime.apptonomia.uk/site/',
  sinonimia: 'https://sinonimia.apptonomia.uk',
  teclatlon: 'https://teclatlon.apptonomia.uk',
};
const PROYECTOS = Object.keys(ESPERADO_TOKEN);

function get(url) {
  return new Promise((res, rej) => {
    https.get(url, { headers: { 'cache-control': 'no-cache' } }, (r) => {
      if (r.statusCode >= 300 && r.statusCode < 400 && r.headers.location) {
        return get(r.headers.location).then(res, rej);
      }
      let d = '';
      r.on('data', (c) => (d += c));
      r.on('end', () => res({ status: r.statusCode, body: d }));
    }).on('error', rej);
  });
}

// Firma del dano: atributo reducido a h/s pegado a una ruta con ?v=
const ET = /<link\b[^>]*>|<script\b[^>]*>/gi;
const ROTO = /\s[hs](?=[^ >"']*(?:\/|\.css|\.js))[^"'\s>]*\?v=/;

(async () => {
  let todoOk = true;
  for (const p of PROYECTOS) {
    const base = URL_BASE[p];
    const problemas = [];
    try {
      // La URL base ya puede acabar en '/', como la de routime (/site/), asi que
      // se normaliza para no construir 'site//' con una barra duplicada.
      const html = await get(base.replace(/\/+$/, '') + '/');
      if (html.status !== 200) problemas.push('HTTP ' + html.status);

      // 1. etiquetas rotas en la portada
      ET.lastIndex = 0;
      let m, rotas = 0;
      while ((m = ET.exec(html.body)) !== null) if (ROTO.test(m[0])) rotas++;
      if (rotas) problemas.push(rotas + ' etiqueta(s) con href/src truncado');

      // 2. token del componente
      const tok = html.body.match(/locale-picker\.js\?v=([a-z0-9-]+)/);
      if (!tok) problemas.push('no se encuentra locale-picker.js en el HTML');
      else if (tok[1] !== ESPERADO_TOKEN[p]) problemas.push('token "' + tok[1] + '" != ' + ESPERADO_TOKEN[p]);

      // 3. el componente servido. Su ruta puede ser relativa ('../assets/...'
      //    en routime), asi que se resuelve contra la URL de la pagina.
      const urlJs = new URL(RUTA_PICKER[p], base.replace(/\/+$/, '') + '/').href;
      const js = await get(urlJs + '?v=' + ESPERADO_TOKEN[p]);
      if (js.status !== 200) problemas.push('locale-picker.js HTTP ' + js.status);
      else {
        const themes = js.body.match(/var THEMES = \[([^\]]+)\]/);
        if (!themes) problemas.push('no se encuentra THEMES en el JS servido');
        else if (themes[1].includes("'auto'")) problemas.push('THEMES todavia incluye auto');
        if (!/: 'light'|theme: 'light'|'light'\s*:/.test(js.body)) problemas.push('no se encuentra el defecto light');
        if (js.body.includes('themeAuto')) problemas.push('el JS servido aun tiene themeAuto');
      }
    } catch (e) {
      problemas.push('excepcion: ' + e.message);
    }
    const ok = problemas.length === 0;
    if (!ok) todoOk = false;
    console.log((ok ? 'OK   ' : 'FALLO') + '  ' + p.padEnd(12) + (ok ? 'sin auto, claro por defecto, sin etiquetas rotas' : problemas.join(' | ')));
  }
  console.log('');
  console.log(todoOk ? 'Los 8 sitios publicados sirven el tema correcto.' : 'HAY SITIOS QUE REVISAR.');
  if (!todoOk) process.exitCode = 1;
})();