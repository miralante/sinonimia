// Inject `traduccion: { en: "..." }` (or array literal) into every entry
// in js/data.es.js that appears in scripts/.mapping.js. Uses regex over
// the file's text — robust because each entry block always ends with
// `situacion: "<key>",` followed by `  },`. We insert the `traduccion`
// field on a new line right after the `situacion` line, inside the same
// block.
//
// Idempotent: re-running it removes any prior `traduccion: { en: ... }`
// line we added (matched by a unique marker comment) before adding the
// fresh one, so it's safe to run multiple times.
const fs = require("fs");
const vm = require("vm");

function loadDictionaries() {
  const merged = { DICCIONARIOS: {} };
  for (const lang of ["es", "en"]) {
    const ctx = { window: {}, DICCIONARIOS: {} };
    vm.createContext(ctx);
    vm.runInContext(fs.readFileSync(`js/data.${lang}.js`, "utf8"), ctx, {
      filename: `js/data.${lang}.js`,
    });
    Object.assign(merged.DICCIONARIOS, ctx.DICCIONARIOS);
  }
  return merged.DICCIONARIOS;
}
function loadMap() {
  const ctx = {};
  vm.createContext(ctx);
  const raw = fs.readFileSync("scripts/.mapping.js", "utf8");
  const cleaned = raw.replace(/if \(typeof module !== "undefined"\) module\.exports = TRADUCCIONES;\s*$/, "TRADUCCIONES;");
  ctx.TRADUCCIONES = vm.runInContext(cleaned, ctx, { filename: "scripts/.mapping.js" });
  return ctx.TRADUCCIONES;
}

const DICCS = loadDictionaries();
const MAP = loadMap();

const FILE = "js/data.es.js";
// Read as Buffer and normalise CRLF → LF so the regex (which uses
// `\n`) matches lines regardless of the file's line endings. We
// restore the original line endings on write below.
const rawBytes = fs.readFileSync(FILE);
const isCrlf = rawBytes.includes(0x0d);
let src = rawBytes.toString("utf8").replace(/\r\n/g, "\n");

// Marker that wraps every `traduccion: { en: ... }` line we add. Lets us
// strip a previous run before re-injecting (idempotency).
const MARKER_OPEN = "/*traduccion-start*/";
const MARKER_CLOSE = "/*traduccion-end*/";

// Remove any previously-injected lines (they live inside their entry
// block and are always between the markers, all on a single line).
const rePrev = new RegExp(
  "    " + MARKER_OPEN.replace(/[/*]/g, "\\$&") + "[^\\n]*" + MARKER_CLOSE.replace(/[/*]/g, "\\$&") + "\\n",
  "g",
);
const beforeStrip = src;
src = src.replace(rePrev, "");
const stripped = beforeStrip.length - src.length;
if (stripped > 0) console.log(`stripped ${stripped} chars of previous injection`);

let injected = 0;
let notFound = [];
for (const entry of DICCS.es) {
  const value = MAP[entry.id];
  if (!value) continue;

  // Build the `traduccion` line with consistent formatting:
  //   - string -> traduccion: { en: "id" },
  //   - array  -> traduccion: { en: ["id1", "id2"] },
  const valueStr = Array.isArray(value)
    ? "[" + value.map((v) => '"' + v.replace(/"/g, '\\"') + '"').join(", ") + "]"
    : '"' + value.replace(/"/g, '\\"') + '"';
  const traduccionLine = `    ${MARKER_OPEN}traduccion: { en: ${valueStr} },${MARKER_CLOSE}\n`;

  // Find this entry's block in the file. Each block opens with
  // `    id: "<id>",` and we anchor on that exact line, then look for
  // the next `    situacion: "<key>",` line that follows at a *deeper*
  // indentation (the entry fields), then insert immediately after it.
  // To avoid catastrophic backtracking on a 5400-line file, the body
  // match is restricted to lines indented with 4 spaces (the entry
  // fields), and we anchor at the start of the `id` line.
  const escapedId = entry.id.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\$&");
  const idLineRe = new RegExp(
    "(^    id: \"" + escapedId + "\",\\n(?:    [^\\n]*\\n)*?    situacion: \"[^\"]*\",\\n)",
    "m",
  );
  const m = idLineRe.exec(src);
  if (!m) {
    notFound.push(entry.id);
    continue;
  }
  const insertAt = m.index + m[0].length;
  src = src.slice(0, insertAt) + traduccionLine + src.slice(insertAt);
  injected++;
}

if (notFound.length > 0) {
  console.error(`✗ Could not locate these ES ids in ${FILE}: ${notFound.join(", ")}`);
  process.exit(1);
}

fs.writeFileSync(FILE, isCrlf ? src.replace(/\n/g, "\r\n") : src, "utf8");
console.log(`✓ injected traduccion into ${injected} entries in ${FILE} (line endings preserved: ${isCrlf ? "CRLF" : "LF"})`);