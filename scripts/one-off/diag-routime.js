const https = require('https');
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..', '..', '..');

function get(url) {
  return new Promise((res, rej) => {
    https.get(url, { headers: { 'cache-control': 'no-cache' } }, (r) => {
      if (r.statusCode >= 300 && r.statusCode < 400 && r.headers.location) return get(r.headers.location).then(res, rej);
      let d = ''; r.on('data', (c) => (d += c)); r.on('end', () => res({ status: r.statusCode, body: d, url }));
    }).on('error', rej);
  });
}

(async () => {
  console.log('=== routime.apptonomia.uk : primeros 600 chars del cuerpo ===');
  const r = await get('https://routime.apptonomia.uk/');
  console.log('  final URL efectiva: ' + r.url);
  console.log('  ' + JSON.stringify(r.body.slice(0, 600)));
  console.log('');
  console.log('  numero de <script> totales: ' + (r.body.match(/<script/gi) || []).length);
  console.log('  numero de <link> totales:   ' + (r.body.match(/<link/gi) || []).length);

  console.log('');
  console.log('=== routime/index.html LOCAL ===');
  const loc = fs.readFileSync(path.join(ROOT, 'routime', 'index.html'), 'utf8');
  console.log('  bytes: ' + Buffer.byteLength(loc));
  console.log('  <script> totales: ' + (loc.match(/<script/gi) || []).length);
  console.log('  menciones locale-picker: ' + (loc.match(/locale-picker/gi) || []).length);
  (loc.match(/<script[^>]*>/gi) || []).forEach((x) => console.log('    ' + x));

  console.log('');
  console.log('=== donde vive el componente en routime ===');
  const rutas = ['index.html', 'site/index.html', 'about/index.html'];
  for (const f of rutas) {
    const p = path.join(ROOT, 'routime', f);
    if (!fs.existsSync(p)) { console.log('  ' + f + ': no existe'); continue; }
    const s = fs.readFileSync(p, 'utf8');
    console.log('  ' + f + ': ' + (s.match(/locale-picker/gi) || []).length + ' menciones');
  }
})();