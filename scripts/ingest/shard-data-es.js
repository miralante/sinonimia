#!/usr/bin/env node
// Divide el diccionario español en ficheros válidos para Cloudflare Pages.
// El segundo fichero se carga después del principal y concatena sus entradas.
"use strict";
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const ROOT = path.join(__dirname, "..", "..");
const sourcePath = path.join(ROOT, "js", "data.es.js");
const shardPath = path.join(ROOT, "js", "data.es.2.js");
const limit = 23_500_000;
const source = fs.readFileSync(sourcePath, "utf8");
const marker = "DICCIONARIOS.es = [";
const start = source.indexOf(marker);
const end = source.lastIndexOf("];" );
if (start < 0 || end < start) throw new Error("No se encontró DICCIONARIOS.es");
const prefix = source.slice(0, start) + "DICCIONARIOS.es = ";
global.__DATA = undefined;
eval("global.__DATA = " + source.slice(start + marker.length - 1, end + 2));
const entries = global.__DATA.filter(Boolean);
const textFor = (items) => prefix + JSON.stringify(items) + ";\n";
let low = 1; let high = entries.length; let best = 0;
while (low <= high) {
  const mid = Math.floor((low + high) / 2);
  if (Buffer.byteLength(textFor(entries.slice(0, mid)), "utf8") <= limit) { best = mid; low = mid + 1; }
  else high = mid - 1;
}
if (!best || best >= entries.length) throw new Error(`No se pudo crear shard: best=${best}, total=${entries.length}`);
const mainText = textFor(entries.slice(0, best));
const rest = entries.slice(best);
const shardText = "/* Spanish dictionary continuation shard. Load after data.es.js. */\n" +
  "window.DICCIONARIOS = window.DICCIONARIOS || {};\n" +
  "DICCIONARIOS.es = DICCIONARIOS.es.concat(" + JSON.stringify(rest) + ");\n";
fs.writeFileSync(sourcePath, mainText, "utf8");
fs.writeFileSync(shardPath, shardText, "utf8");
const digest = (value) => crypto.createHash("sha256").update(value).digest("hex").slice(0, 10);
console.log(`Entradas: ${best} + ${rest.length} = ${entries.length}`);
console.log(`Principal: ${Buffer.byteLength(mainText)} bytes, hash ${digest(mainText)}`);
console.log(`Shard: ${Buffer.byteLength(shardText)} bytes, hash ${digest(shardText)}`);
