'use strict';

const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const PORT = 4174;
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.webmanifest': 'application/manifest+json',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
};

const server = http.createServer((request, response) => {
  // Strip query string and hash from URL before resolving the file path.
  // The dictionary-manifest references shards with ?v=... query params.
  let urlPath;
  try {
    urlPath = decodeURIComponent((request.url || '/').split('?')[0].split('#')[0]);
  } catch {
    response.writeHead(400);
    response.end('Bad request');
    return;
  }

  let filePath = path.resolve(ROOT, urlPath.replace(/^\/+/, '') || 'index.html');
  if (urlPath === '/') filePath = path.join(ROOT, 'index.html');
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  const relative = path.relative(ROOT, filePath);
  if (relative.startsWith('..') || path.isAbsolute(relative)) {
    response.writeHead(403);
    response.end('Forbidden');
    return;
  }

  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    response.writeHead(404);
    response.end('Not found: ' + urlPath);
    return;
  }

  response.writeHead(200, {
    'content-type': MIME_TYPES[path.extname(filePath).toLowerCase()] || 'application/octet-stream',
    'cache-control': 'no-store',
  });
  const stream = fs.createReadStream(filePath);
  stream.on('error', err => {
    if (!response.headersSent) {
      response.writeHead(500);
      response.end('Server error');
    }
  });
  stream.pipe(response);
});

server.listen(PORT, '127.0.0.1', () => {
  console.log('Sinonimia UI server running at http://127.0.0.1:' + PORT + '/');
});
