const https = require('https');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..', '..');

function get(url) {
  return new Promise((res, rej) => {
    https.get(url, { headers: { 'cache-control': 'no-cache' } }, (r) => {
      if (r.statusCode >= 300 && r.statusCode < 400 && r.headers.location) return get(r.headers.location).then(res, rej);
      let d = ''; r.on('data', (c) => (d += c)); r.on('end', () => res({ status: r.statusCode, body: d }));
    }).on('error', rej);
  });
}

(async () => {
  console.log('=== dominios declarados en cada wrangler.toml ===');
  for (const p of ['apptonomia', 'calculia', 'ludia', 'memofun', 'okeymoney', 'routime', 'sinonimia', 'teclatlon']) {
    const c = fs.readFileSync(path.join(ROOT, p, 'wrangler.toml'), 'utf8');
    const m = c.match(/pattern\s*=\s*"([^"]+)"/g);
    console.log('  ' + p.padEnd(12) + (m ? m.join(', ') : '(sin ruta personalizada)'));
  }

  console.log('');
  console.log('=== apptonomia: que resuelve ===');
  for (const u of ['https://apptonomia.apptonomia.uk/', 'https://apptonomia.miralante.workers.dev/']) {
    try { const r = await get(u); console.log('  ' + u + ' -> HTTP ' + r.status + ' (' + r.body.length + ' bytes)'); }
    catch (e) { console.log('  ' + u + ' -> ' + e.message); }
  }

  console.log('');
  console.log('=== routime: donde esta el componente en el HTML servido ===');
  const r = await get('https://routime.apptonomia.uk/');
  console.log('  HTTP ' + r.status);
  (r.body.match(/<script[^>]*src=[^>]*>/gi) || []).slice(0, 20).forEach((x) => console.log('    ' + x));
  console.log('  menciones de locale-picker: ' + (r.body.match(/locale-picker/gi) || []).length);
})();