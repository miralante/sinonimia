// Sanity-check TRADUCCIONES (scripts/.mapping.js) against the live data
// files. Validates:
//   - every ES id and EN id in the map exists in its data file
//   - coverage: every ES entry is either auto-matched (unique-pictogram
//     on both sides) or has an entry in TRADUCCIONES — otherwise it will
//     remain without a link.
const fs = require("fs");
const vm = require("vm");
function loadInNewContext(src, filename) {
  const ctx = { window: {}, DICCIONARIOS: {} };
  vm.createContext(ctx);
  vm.runInContext(src, ctx, { filename });
  return ctx;
}
// Load both data files in SEPARATE contexts and merge their DICCIONARIOS,
// because each data file does `DICCIONARIOS = {}` followed by `DICCIONARIOS.es = [...]`,
// and re-using one context for both files loses the first language's keys.
const merged = { DICCIONARIOS: {} };
for (const lang of ["es", "en"]) {
  const ctx = loadInNewContext(fs.readFileSync(`js/data.${lang}.js`, "utf8"), `js/data.${lang}.js`);
  Object.assign(merged.DICCIONARIOS, ctx.DICCIONARIOS);
}
const ctx = loadInNewContext("", "validate-mapping");
Object.assign(ctx, merged);
const raw = fs.readFileSync("scripts/.mapping.js", "utf8");
const cleaned = raw.replace(/if \(typeof module !== "undefined"\) module\.exports = TRADUCCIONES;\s*$/, "TRADUCCIONES;");
ctx.TRADUCCIONES = vm.runInContext(cleaned, ctx, { filename: "scripts/.mapping.js" });
const map = ctx.TRADUCCIONES;

const es = ctx.DICCIONARIOS.es;
const en = ctx.DICCIONARIOS.en;
const esById = new Map(es.map((e) => [e.id, e]));
const enById = new Map(en.map((e) => [e.id, e]));

let errors = 0;
function err(msg) { errors++; console.error("✗ " + msg); }
function ok(msg) { console.log("✓ " + msg); }

for (const [esId, rawValue] of Object.entries(map)) {
  const enIds = Array.isArray(rawValue) ? rawValue : [rawValue];
  if (!esById.has(esId)) err(`ES id "${esId}" not found in js/data.es.js`);
  for (const enId of enIds) {
    if (!enById.has(enId)) err(`EN id "${enId}" not found in js/data.en.js (claimed by ES ${esId})`);
  }
  if (new Set(enIds).size !== enIds.length) err(`ES "${esId}" declares duplicate EN ids: ${enIds.join(", ")}`);
}

function byPictogram(entries) {
  const m = new Map();
  for (const e of entries) {
    const list = m.get(e.imagen.id) || [];
    list.push(e);
    m.set(e.imagen.id, list);
  }
  return m;
}
const esByPic = byPictogram(es);
const enByPic = byPictogram(en);
const autoMatched = new Set();
for (const e of es) {
  if (esByPic.get(e.imagen.id).length === 1 && enByPic.get(e.imagen.id) && enByPic.get(e.imagen.id).length === 1) {
    autoMatched.add(e.id);
  }
}

const mappedEsIds = new Set(Object.keys(map));
const missing = [];
for (const e of es) {
  if (autoMatched.has(e.id)) continue;
  if (mappedEsIds.has(e.id)) continue;
  missing.push(`${e.id}  "${e.palabra}"  [${e.situacion}]`);
}
if (missing.length === 0) ok(`coverage: every ES entry is either auto-matched or in TRADUCCIONES (${es.length} total)`);
else { console.warn(`coverage: ${missing.length} ES entries still have no link to EN (likely ES-specific or pending):`); for (const m of missing) console.warn("    " + m); }

ok(`TRADUCCIONES has ${Object.keys(map).length} entries`);
ok(`auto-matched ${autoMatched.size}; TRADUCCIONES covers ${mappedEsIds.size}; combined: ${autoMatched.size + mappedEsIds.size} of ${es.length} ES entries`);
ok(`ES total=${es.length}, EN total=${en.length}`);

if (errors > 0) {
  console.error("\n" + errors + " problem(s).");
  process.exit(1);
} else {
  console.log("\nAll mapping checks passed.");
}