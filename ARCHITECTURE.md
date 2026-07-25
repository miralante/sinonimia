# Sinonimia — Technical Architecture

This is the technical reference for developers working on Sinonimia's
codebase. For *what* the product is, *who* it's for, and the content rules
every dictionary entry must follow, see `PRODUCT.md` — that document is the
source of truth for product and content decisions; this one is the source
of truth for how the system is built.

## Project language policy

This is a project-wide convention, not a one-off style choice:

- **English** for all technical language: code identifiers (function names,
  variable names), code comments, this document, `CLAUDE.md`, and any other
  engineering documentation.
- **Spanish and English** for the end-user product: the dictionary content
  itself (`js/data.es.js`, `js/data.en.js`) and the interface copy
  (`js/i18n.js`), each in its own language.

In short: open the file in a text editor and it should read like an
English codebase; open the website and it should read like a Spanish or
English dictionary, depending on the language the visitor picked.

### Naming exceptions (read before renaming something)

A few identifiers are Spanish words and are **staying that way on purpose**,
because they are shared data contracts, not implementation details:

- **Dictionary schema field names** — `palabra`, `definicion`, `imagen`,
  `sinonimos`, `ejemplo`, `ejemploSinonimo`, `situacion` in every entry of
  `js/data.<lang>.js`. Renaming these would touch all 44+ dictionary
  entries across every language file and the schema documentation in
  `PRODUCT.md` and `CONTRIBUTING.md`, which teach Spanish-speaking
  contributors how to add a word using these exact field names.
- **`I18N` keys** in `js/i18n.js` (e.g. `heroEtiqueta`, `buscarPlaceholder`,
  `tema_tramites`) — referenced verbatim in `index.html`'s
  `data-i18n="..."` attributes and in `js/app.js`'s `t("...")` calls.
  Renaming them means touching every reference in lockstep across three
  files.
- **HTML `id`/`class` attributes and their CSS selectors** (e.g.
  `#vista-lista`, `.tarjeta`, `.boton-cta`) — shared literally between
  `index.html`, `css/styles.css`, and the string literals `js/app.js` passes
  to `getElementById` / `className`.
- **`localStorage` key names** (e.g. `sinonimia-idioma`,
  `sinonimia-aprendidas-<lang>`) — a persisted data contract; renaming
  would silently discard anyone's already-saved progress.
- **The `"palabra"` / `"juego"` URL path segments** in the hash router
  (`#/<lang>/palabra/<id>`, `#/<lang>/juego`) — deliberately not translated
  per language, so the route shape stays identical for every language
  (`#/en/palabra/rectify`, not `#/en/word/rectify`). This is a routing
  token, not user-facing text.

Everything else — function names, local variables, parameters, and every
comment in `js/app.js`, `js/i18n.js`, `js/data.*.js`, `css/styles.css`, and
`scripts/validar.js` — is English. If you're adding new code, follow that;
if you're touching one of the exceptions above, touch it everywhere it's
used or not at all.

## System overview

Sinonimia is a static site: plain HTML, CSS, and vanilla JavaScript, no
build step, no bundler, no framework, no runtime dependencies. It runs by
opening `index.html` in a browser or serving the folder with any static
file server. `scripts/validar.js` (Node, zero dependencies) is the only
tooling in the repo, and it only runs at commit/CI time — it never runs in
the browser.

```
index.html          markup for every view + data-i18n hooks
css/styles.css       all styling (custom properties for theming)
js/i18n.js           interface copy, per language
js/data.es.js        Spanish dictionary entries
js/data.en.js        English dictionary entries
js/app.js            the entire client app (router, rendering, state)
img/<arasaac-id>.png pictograms
scripts/validar.js   the CI/local validation script
```

## The three-file split for content vs. interface vs. logic

- **`js/i18n.js`** holds `I18N.<lang>` objects with only UI copy: button
  labels, headings, status messages. It is not dictionary content.
  `translate(language, key, variables)` looks up a key for a language,
  falling back to Spanish and then to the raw key if missing, and does
  simple `{placeholder}` substitution.
- **`js/data.es.js`**, **`js/data.en.js`** each populate a shared global,
  `DICCIONARIOS.<lang>`, with that language's dictionary entries. Adding a
  language means adding a new `js/data.<lang>.js` file (see `PRODUCT.md`'s
  "How to add a new language") — `js/app.js` needs no changes, since it
  only ever reads whatever languages exist as keys on `DICCIONARIOS`.
- **`js/app.js`** is a single IIFE containing the whole client app. It never
  hardcodes a UI string or a specific language's data — it only reads
  `activeDictionary` (`= DICCIONARIOS[currentLanguage]`) and calls `t(key)`.

## Routing and view state

Hash-based, no History API: `#/<lang>/`, `#/<lang>/palabra/<id>`,
`#/<lang>/juego`, `#/<lang>/juego/palabra`, `#/<lang>/juego/frase`.
`route()` parses the hash, resolves/validates the language segment first
(redirecting to `initialLanguage()`'s pick if it's missing or invalid), then
dispatches to one of the render functions. Exactly one of `#vista-lista` /
`#vista-detalle` / `#vista-juego` is unhidden at a time via `showView(name)`.
There's no virtual DOM and no diffing: every render function does
`innerHTML = ""` on its container and rebuilds it from scratch.

`currentLanguage` drives everything downstream: `buildIndexes()` rebuilds
the active dictionary's lookup tables (`entryById`, `entryByName` — the
latter used to cross-link a synonym to its own dictionary entry) whenever
the language changes. All persisted state (discovery progress, game score,
user-written sentences) is namespaced per language in `localStorage`, since
the two dictionaries are unrelated content — see the key names in
`PRODUCT.md`'s architecture section.

## Dictionary entry shape

Every entry (see the Naming exceptions above for why these field names stay
Spanish) has: `id`, `palabra`, `imagen: {id, alt}`, `definicion`,
`sinonimos[]`, `ejemplo: {palabra, texto}`, `ejemploSinonimo: {palabra,
texto}`, `situacion`. `situacion` is one of seven values shared across every
language (`tramites`, `salud`, `vida-diaria`, `finanzas`, `vivienda`,
`trabajo`, `legal`) — it's a filter key, not display text; its label per
language lives in `js/i18n.js` as `tema_<situacion>`. The `palabra` field
*inside* `ejemplo` / `ejemploSinonimo` is the exact inflected/agreed form
used in that sentence (not necessarily the dictionary headword) — that's
what `createHighlightedSentence()` and `createSentenceWithBlank()` search
for, to highlight or blank it out.

`id` is the only field required to be unique — `palabra` isn't, on purpose:
a homograph (two unrelated meanings sharing one word, e.g. "pensión" —
retirement pay / a guesthouse) is modeled as two ordinary entries with the
same `palabra` and different `id`/`situacion`/`definicion` (see "Palabras
con doble significado" in `PRODUCT.md`). `entryByName` in `js/app.js`
(keyed by normalized `palabra`, used to cross-link a synonym to its own
entry and to pick the two games' multiple-choice options) reflects this:
it maps a name to an **array** of entries rather than overwriting, so a
second entry with the same `palabra` never silently shadows the first.
Synonym cross-links that resolve to more than one entry render a link per
match instead of guessing; `pickDistractorEntries` additionally excludes
any entry whose `palabra` matches the target's, so a homograph's twin can
never appear as a same-looking distractor option in either game.

## Pictograms: ARASAAC (+ OpenSymbols for search)

Every entry's `imagen.id` is a pictogram id, and today every image in
`img/` comes from **[ARASAAC](https://arasaac.org)** (Aragonese Portal for
Augmentative and Alternative Communication), a public pictogram bank
maintained by the Government of Aragón, authored by Sergio Palao. Sinonimia
downloads and serves these images locally at `img/<arasaac-id>.png` (not
hotlinked). Two dictionary entries — in the same language or across
languages — can point at the same `imagen.id` and share one file, since
ARASAAC's drawings are language-neutral concepts, not localized text.

ARASAAC's license (CC BY-NC-SA) requires attribution and forbids commercial
use without ARASAAC's permission; the attribution lives in the page footer
(`js/i18n.js`'s `pieCreditosHtml` key) and must stay intact.

**Finding a pictogram**: run `node scripts/buscar-pictograma.js "<term>" es`.
It tries **[OpenSymbols](https://www.opensymbols.org)** first — an
aggregator that queries ARASAAC, Sclera, Mulberry, and other open-licensed
banks behind one API, searchable directly in Spanish (`locale=es`) — using
a personal, free "shared secret" (requested at
https://www.opensymbols.org/api) read from the `OPENSYMBOLS_SECRET`
environment variable. Never commit that secret.

```
OPENSYMBOLS_SECRET=xxxx node scripts/buscar-pictograma.js "corregir un error" es
```

**The script automatically falls back to ARASAAC's own public API** (no
key needed, `searchArasaac()` in the script) whenever OpenSymbols isn't
usable: `OPENSYMBOLS_SECRET` isn't set, the OpenSymbols token/search request
fails (bad secret, network error, rate limit, service down), or OpenSymbols
returns zero results for the term. That fallback is why the script also
works with no setup at all:

```
node scripts/buscar-pictograma.js "corregir un error" es
```

Either path only lists candidates (bank, license, author, image URL) for a
human to review; nothing is downloaded or picked automatically.

**Multi-license caveat**: unlike the ARASAAC-only fallback, an OpenSymbols
result can come from a bank with a *different* license (e.g. Sclera is
CC BY-NC, Mulberry is CC BY-SA — check each result's `license`/`author`
fields). The footer's `pieCreditosHtml` currently only credits ARASAAC; the
moment a non-ARASAAC image is actually added to `img/`, that key needs to
grow a credit line for the new bank too. Don't add a non-ARASAAC image
without updating it in the same change.

Whichever path finds it, check `img/` first — the concept you need might
already be there.

## Gamification

Word-of-the-day, "surprise me", a discovery progress bar, a free-text
"write your own sentence" box, and two multiple-choice games
(`renderWordGame`, `renderSentenceGame`, reached through `renderGameMenu`)
all live in `js/app.js`, all read from `activeDictionary`, and none of them
special-case a language. `PRODUCT.md` documents the rules that constrain
any future gamification (never hide content behind an interaction, never
make a game punitive) — read it before adding a third game.

## Validation (`scripts/validar.js`)

Zero-dependency Node script, run locally and in CI
(`.github/workflows/validate.yml`) on every push/PR. It checks, in order:
JS syntax of every file; CSS brace balance; that every dictionary entry has
a unique id, a valid `situacion`, an `imagen.id` with a matching file under
`img/`, and `ejemplo`/`ejemploSinonimo` whose `palabra` is a real
(accent-insensitive) substring of their own `texto`; that every `t()` key
`js/app.js` uses exists in every `I18N` language block; that every DOM id
`js/app.js` looks up with `getElementById` exists in `index.html`; and that
neither `index.html` nor `js/i18n.js` contains any of a blocklist of
disability/therapy-related terms (the user-facing product's non-negotiable
rule from `PRODUCT.md` — `js/data.*.js` is deliberately exempt, since a
disability-related bureaucratic term could be a legitimate future entry).

## Growing the content (`scripts/estado-contenido.js`)

A second zero-dependency script, separate from validation: it reports word
counts per `situacion` category and per language, flags categories below
the 8-word threshold, and (with `--detalle`) lists every existing headword
and its synonyms so a new entry doesn't duplicate a concept already
covered. It's the bookkeeping half of content growth — it deliberately does
not draft definitions, since that requires the editorial judgment described
in `PRODUCT.md`'s "Proceso para ampliar el contenido", which this script's
output feeds into.

Read the script before changing the data-file format: it encodes the
invariants that format relies on, in executable form.

## Accessibility

Font-size stepper and a high-contrast toggle are implemented with CSS
custom properties on `:root`, overridden by a `body.alto-contraste` class —
not by duplicating rules per theme. Both preferences persist in
`localStorage`. Dynamic UI regions (`#resultados-info`, the "your sentence
saved" notice, game feedback) use `aria-live="polite"`; focus is moved to
the new view's heading on every navigation (`h2.focus()`).
