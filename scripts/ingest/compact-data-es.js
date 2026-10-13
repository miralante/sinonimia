#!/usr/bin/env node
// Compactación segura: conserva el encabezado y serializa la matriz de
// entradas como JSON compacto. El fichero sigue siendo JavaScript válido,
// pero evita repetir espacios y saltos de línea en decenas de miles de
// objetos.
"use strict";
const fs = require("fs");
const path = require("path");
const file = path.join(__dirname, "..", "..", "js", "data.es.js");
const source = fs.readFileSync(file, "utf8");
const marker = "DICCIONARIOS.es = [";
const start = source.indexOf(marker);
const end = source.lastIndexOf("];" );
if (start < 0 || end < start) throw new Error("No se encontró la matriz DICCIONARIOS.es");
const prefix = source.slice(0, start) + "DICCIONARIOS.es = ";
const arraySource = source.slice(start + marker.length - 1, end + 2);
global.__COMPACT_DATA = undefined;
// eslint-disable-next-line no-eval
eval("global.__COMPACT_DATA = " + arraySource);
if (!Array.isArray(global.__COMPACT_DATA)) throw new Error("DICCIONARIOS.es no es una matriz");
const entries = global.__COMPACT_DATA.filter(Boolean);
const compact = prefix + JSON.stringify(entries) + ";\n";
fs.writeFileSync(file, compact, "utf8");
console.log(`Compactado: ${source.length} -> ${compact.length} caracteres`);
