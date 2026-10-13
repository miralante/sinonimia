#!/usr/bin/env node
// Elimina una segunda inserción accidental de un lote identificado por su
// cabecera. Solo actúa cuando hay exactamente dos cabeceras iguales.
"use strict";
const fs = require("fs");
const path = require("path");
const file = path.resolve(process.argv[2]);
const header = process.argv[3];
if (!file || !header) throw new Error("Uso: repair-duplicate-header.js <archivo> <cabecera>");
const source = fs.readFileSync(file, "utf8");
const marker = "// --- " + header + " ---";
const hits = []; let at = source.indexOf(marker); while (at >= 0) { hits.push(at); at = source.indexOf(marker, at + marker.length); }
if (hits.length !== 2) throw new Error(`Se esperaban 2 cabeceras «${marker}», encontradas ${hits.length}`);
const closing = source.lastIndexOf("];" );
if (closing < hits[1]) throw new Error("No se encontró un cierre válido después del segundo bloque");
const repaired = source.slice(0, hits[1]).replace(/,\s*$/, "") + "\n];\n";
fs.writeFileSync(file, repaired, "utf8");
console.log(`Bloque duplicado eliminado: ${source.length} -> ${repaired.length}`);
