/*
 * scripts/ingest/pipeline/filters/common-words.js
 *
 * Second of the two "consult before analysis" pre-filters (first is
 * filters/sinonimia-coverage.js). Drops words in the MAX_RANK most
 * frequent rows of scripts/download/freq-es.txt — the automatic-rejection
 * bucket doc/es/guia-crear-elementos.md §3.2 criterion 2 already names
 * (everyday concrete nouns, basic vocabulary) — plus a small hand-picked
 * MANUAL_COMMON_WORDS list (see below) for words criterion 2 clearly
 * covers but that rank too low in freq-es.txt for the rank cutoff alone
 * to catch.
 *
 * MAX_RANK = 400, calibrated by spot-checking freq-es.txt against
 * guia-crear-elementos.md's own "too common" review calls, not a round
 * number:
 *   - safe to auto-drop (rank <= 400): cosa 187, policía 256, forma 283,
 *     caso 288 — all confirmed manual rejects.
 *   - must NOT be caught by raising this: auto 452, abogado 774,
 *     asesinato 730, vista 810, causa 1097, interés ~1917, acto 1994,
 *     leyenda 3583, garantía 6574. "leyenda"/"garantía" are §3.2's own
 *     examples of frequent-but-legitimately-hard words; "causa"/"acto"/
 *     "vista" were rejected by hand too but rank far above any threshold
 *     that stays safe for leyenda/garantía — no single cutoff reproduces
 *     every human call (OpenSubtitles dialogue over-represents crime/
 *     legal/medical vocab). Don't raise MAX_RANK without re-checking it
 *     against a fresh rank sample — see §3.2: "la frecuencia orienta
 *     pero no decide por sí sola".
 *
 * 2026-09-09: MANUAL_COMMON_WORDS added, hand-picked from
 * listapalabras.com's ~63,000-word no-hint candidate pool (see
 * PROGRESS.md) rather than raising MAX_RANK. Method: ranked that whole
 * pool against freq-es.txt, read every word with rank 401-3000 by hand
 * (800 words), and kept only the ones with zero plausible legal/salud/
 * finanzas/tramites/seguridad/tecnologia connection — deliberately more
 * conservative than a blanket rank raise would be, since this same file
 * already documents real frequent-but-hard words in that exact rank
 * band (abogado 774, asesinato 730, causa 1097). Excluded on sight:
 * anything crime/violence-adjacent (arma, disparo, criminal, víctima),
 * anything political/legal-adjacent even if common (política, ministro,
 * legal, voto, distrito), anything medical-adjacent (droga, enfermo,
 * suicidio), anything financial-adjacent (pago, precio, fortuna),
 * proper-noun/OCR-scraping artifacts from the frequency corpus itself
 * (Roma, sheriff, ADN, single letters), and profanity/slang. What's
 * left is direct-action verbs, basic adjectives, everyday concrete
 * nouns, numbers and days of the week — exactly criterion 2's own
 * examples, just not frequent enough in OpenSubtitles dialogue to rank
 * under 400. This is a one-time hand-curated list, not a registry that
 * grows via a script (unlike rejected-words.js) — extend it by editing
 * this file directly, with the same word-by-word care.
 *
 * 2026-09-09, second batch: added after a genuine random sample of the
 * no-hint pool (used to estimate how many candidates it still holds —
 * see PROGRESS.md) turned up more of the same "criterion-2-transparent
 * but underranked in freq-es.txt" shape (heno, saxófono, videoclub,
 * etc.). Same exclusion discipline — a word that's merely *rare or
 * archaic* (not one of criterion 2's automatic-reject categories) does
 * NOT belong here even if it's obviously out of this project's scope
 * (dulcémele, panoplia, quirquincho): this filter is for "too easy to
 * need an entry", not "not our topic" — an off-topic-but-genuinely-hard
 * word has no filter and is meant to just sit unreviewed, not get
 * silently swept into either bucket.
 *
 * 2026-09-10, third batch: added after hand-reviewing the 312 words
 * listapalabras.com's stem/suffix hint tagged for priority review (see
 * PROGRESS.md). Most of the -ción/-miento/-encia/-orio/-sión/-ario
 * suffix families turned out to be everyday, fully transparent
 * nominalizations of already-basic verbs/adjectives (explicación,
 * situación, atención, movimiento, experiencia, laboratorio, visión,
 * bancario...) that criterion 2 already calls "vocabulario básico de
 * adquisición temprana" even though they don't look like the concrete
 * nouns in its own examples — a small child says "no es justo" long
 * before they'd need an adapted definition of "justicia", but the same
 * is true of "explicación" or "atención". Same discipline as the two
 * batches above: a word from this same suffix family that turned out to
 * have a real specialized/legal/technical sense not covered by its
 * everyday reading (habilitación, torsión, oratoria, espiratorio,
 * etc.) was drafted as a dictionary entry instead — see the
 * corresponding PROGRESS.md entry — never added here just because it
 * shares a suffix with words that are common.
 *
 * Degrades to a no-op (available: false, empty set) if freq-es.txt is
 * missing — callers MUST warn visibly, same contract as
 * proper-noun-check.js's Kaikki-cache guard. MANUAL_COMMON_WORDS is
 * still applied even if freq-es.txt is missing (it doesn't depend on
 * that file), but `available` reflects freq-es.txt's presence, per the
 * existing contract every caller already checks.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const { normalizeWord } = require('../shared/normalize-word');

const CACHE = path.resolve(__dirname, '..', '..', '..', 'download');
const FREQ_CACHE = path.join(CACHE, 'freq-es.txt');

const DEFAULT_MAX_RANK = 400;

// Hand-picked 2026-09-09, see file header. Days of the week, numbers,
// direct-action verbs, basic adjectives, everyday concrete nouns — none
// with a plausible legal/salud/finanzas/tramites/seguridad/tecnologia
// reading.
const MANUAL_COMMON_WORDS = [
  // días y números
  'lunes', 'martes', 'jueves', 'viernes', 'sábado', 'domingo',
  'cuatro', 'seis', 'ocho', 'nueve', 'diez', 'doce', 'veinte', 'cien',
  'ciento', 'tercer', 'segundo', 'primer',
  // verbos de acción directa
  'vivir', 'comer', 'dormir', 'trabajar', 'pensar', 'creer', 'buscar',
  'jugar', 'perder', 'usar', 'poner', 'empezar', 'llevar', 'cerrar',
  'abrir', 'escribir', 'escuchar', 'mirar', 'mantener', 'terminar',
  'comprar', 'estudiar', 'viajar', 'elegir', 'permitir', 'mover',
  'respirar', 'construir', 'recoger', 'compartir', 'mostrar', 'tirar',
  'limpiar', 'crear', 'continuar', 'funcionar', 'volar', 'ayudar',
  'conseguir', 'esperar', 'dar', 'seguir', 'cuidar', 'conducir',
  'actuar', 'comenzar', 'enviar', 'manejar', 'descubrir', 'sobrevivir',
  'discutir', 'responder', 'cortar', 'huir', 'decidir', 'servir',
  'permanecer', 'gritar', 'amar', 'lograr', 'demostrar',
  // adjetivos básicos
  'fácil', 'difícil', 'pequeño', 'fuerte', 'joven', 'especial',
  'extraño', 'diferente', 'tranquilo', 'bonito', 'imposible',
  'necesario', 'interesante', 'amable', 'verdadero', 'triste',
  'inteligente', 'hermoso', 'excelente', 'completo', 'posible', 'malo',
  'duro', 'raro', 'divertido', 'propio', 'oscuro', 'profundo',
  'sencillo', 'cómodo', 'elegante', 'precioso', 'corto', 'corta',
  'claro', 'clara', 'frío', 'fría', 'sucio', 'complicado', 'gordo',
  'guapo', 'valiente', 'antiguo', 'famoso', 'aburrido', 'honesto',
  'obvio', 'suave', 'particular', 'poderoso', 'fresco', 'adorable',
  'feo', 'emocionante',
  // sustantivos cotidianos concretos
  'coche', 'teléfono', 'comida', 'música', 'perro', 'mesa', 'foto',
  'cena', 'boda', 'cumpleaños', 'regalo', 'sorpresa', 'botella',
  'distancia', 'autobús', 'video', 'vídeo', 'desayuno', 'almuerzo',
  'aventura', 'verano', 'invierno', 'lago', 'moda', 'vaso', 'sonrisa',
  'charla', 'viaje', 'reloj', 'ruido', 'tierra', 'cielo', 'mar',
  'bosque', 'pelo', 'cabello', 'leche', 'carretera', 'camioneta',
  'carro', 'motor', 'bolsillo', 'pizza', 'madera', 'arena', 'bola',
  'disco', 'pintura', 'teatro', 'campamento', 'granja',
  // 2026-09-09, segunda tanda: de una muestra aleatoria de 400 palabras
  // del pool sin pista (ver PROGRESS.md), no de una revisión por rango
  // de frecuencia — mismo criterio de exclusión estricto.
  'abiertamente', 'acariciar', 'bikini', 'caprichoso', 'caldero',
  'cierva', 'decorar', 'descapotable', 'galimatías', 'heno',
  'inolvidable', 'ineludible', 'ordenado', 'pantanoso', 'peluche',
  'penoso', 'pisada', 'previamente', 'primariamente', 'profundizar',
  'recipiente', 'redondel', 'respuesta', 'rica', 'semanalmente',
  'serrar', 'surgir', 'teleadicto', 'tembloso', 'testarudo',
  'tolerable', 'traspalear', 'turístico', 'veintiocho', 'videoclub',
  'saxófono',
  // 2026-09-10, tercera tanda: de los 312 candidatos con pista de
  // listapalabras.com (ver PROGRESS.md), familias de sufijo -ción/
  // -miento/-encia/-orio/-sión/-ario/-aje/-anza/-ancia/-ista/-tad que
  // resultaron ser nominalizaciones transparentes de verbos/adjetivos
  // ya básicos, no vocabulario técnico.
  'asignatura', 'universitario', 'ahorrar', 'confianza', 'incendiar',
  'aprendizaje', 'masaje', 'mensaje', 'personaje', 'porcentaje',
  'circunstancia', 'ganancia', 'mercancía', 'sustancia', 'vigilancia',
  'enseñanza', 'venganza', 'extraordinaria', 'extraordinario',
  'necesaria', 'secretaria', 'secretaría', 'bancario', 'diario',
  'empresario', 'funerario', 'inmobiliario', 'innecesario', 'mobiliario',
  'ordinario', 'sanitario', 'urinario', 'bañista', 'entrevista',
  'dificultad', 'libertad', 'nominación', 'sindical',
  'actuación', 'acumulación', 'agrupación', 'alimentación', 'ampliación',
  'animación', 'aparición', 'atención', 'cancelación', 'capacitación',
  'clasificación', 'colección', 'comprobación', 'concepción',
  'configuración', 'confirmación', 'construcción', 'contradicción',
  'corporación', 'corrección', 'creación', 'cremación', 'delegación',
  'descripción', 'designación', 'detección', 'dicción', 'dirección',
  'donación', 'duración', 'edición', 'educación', 'emoción', 'erupción',
  'explicación', 'fabricación', 'facción', 'finalización', 'financiación',
  'fundación', 'generación', 'grabación', 'habitación', 'imitación',
  'imperfección', 'incorporación', 'infracción', 'inmigración',
  'inspección', 'instalación', 'instrucción', 'intención', 'interacción',
  'inundación', 'invención', 'lección', 'liberación', 'limitación',
  'manipulación', 'marcación', 'medición', 'meditación', 'modificación',
  'ocupación', 'opción', 'ovación', 'participación', 'percepción',
  'perturbación', 'planificación', 'plantación', 'población', 'posición',
  'preocupación', 'preparación', 'presentación', 'prohibición',
  'propagación', 'publicación', 'puntuación', 'ración', 'reacción',
  'reaparición', 'recepción', 'recomendación', 'recuperación',
  'reputación', 'respiración', 'sanación', 'sensación', 'separación',
  'situación', 'suscripción', 'tracción', 'unificación', 'utilización',
  'validación', 'ventilación', 'verificación', 'votación', 'reposición',
  'señalización', 'sensibilización',
  'suficiencia', 'vivencia', 'adolescencia', 'advertencia', 'asistencia',
  'audiencia', 'ciencia', 'conferencia', 'confidencia', 'esencia',
  'experiencia', 'inocencia', 'inteligencia', 'interferencia',
  'penitencia', 'preferencia', 'presencia', 'prudencia', 'referencia',
  'tendencia', 'violencia',
  'comportamiento', 'crecimiento', 'envejecimiento', 'funcionamiento',
  'mantenimiento', 'movimiento', 'nacimiento', 'sentimiento',
  'sufrimiento', 'agotamiento', 'endurecimiento', 'enrojecimiento',
  'contradictoria', 'categoría', 'contradictorio', 'envoltorio',
  'laboratorio', 'obligatorio', 'recordatorio', 'respiratorio',
  'territorio',
  'discusión', 'emisión', 'ilusión', 'impresión', 'misión', 'profesión',
  'revisión', 'televisión', 'transmisión', 'visión', 'figuración',
  'denominación',
];

// Returns { set: Set<foldedWord>, available: boolean, maxRank: number }.
// freq-es.txt is one "word frequency" pair per line (space-separated,
// NOT tab — see es-candidates.js's loadFreq()), already sorted by
// descending frequency, so rank == line position (1-based).
function loadCommonWords(options) {
  const maxRank = (options && options.maxRank) || DEFAULT_MAX_RANK;
  const set = new Set();
  for (const word of MANUAL_COMMON_WORDS) set.add(normalizeWord(word));
  if (!fs.existsSync(FREQ_CACHE)) {
    return { set: set, available: false, maxRank: maxRank };
  }
  const text = fs.readFileSync(FREQ_CACHE, 'utf8');
  const lines = text.split(/\r?\n/);
  let rank = 0;
  for (const line of lines) {
    if (!line) continue;
    rank++;
    if (rank > maxRank) break;
    const sp = line.indexOf(' ');
    const word = sp >= 0 ? line.slice(0, sp) : line;
    if (word) set.add(normalizeWord(word));
  }
  return { set: set, available: true, maxRank: maxRank };
}

function isCommonWord(word, commonSet) {
  return commonSet.has(normalizeWord(word));
}

module.exports = { loadCommonWords, isCommonWord, normalizeWord, DEFAULT_MAX_RANK, MANUAL_COMMON_WORDS };
