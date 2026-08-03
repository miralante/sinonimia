# Sinonimia — Technical Architecture

This is the technical reference for developers working on Sinonimia's
codebase. For *what* the product is, *who* it's for, and the content rules
every dictionary entry must follow, see [`SPEC.md`](SPEC.md)
(or [`../es/SPEC.md`](../es/SPEC.md)) — that document is the source of
truth for product and content decisions; this one is the source of truth
for how the system is built.

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
  `doc/*/SPEC.md` and `../../CONTRIBUTING.md`/`../../CONTRIBUTING.es.md`,
  which teach contributors how to add a word using these exact field names.
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

## Hosting

Sinonimia is deployed on **Cloudflare Pages** (not Cloudflare Workers,
not a generic static host). The distinction matters when you're
debugging a deploy or adding a runtime feature:

- Pages serves the repo as-is: there's no build step, no bundler, no
  edge function, no Worker. Every HTML/CSS/JS file in the repo root
  (and `about/`, for the `/about/*` pages) is published verbatim.
- Configuration lives in two places. **`_headers`** at the repo root
  is read on every deploy and applies the security headers (CSP,
  `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`,
  `Cross-Origin-*`) and the one-year immutable `Cache-Control` for
  `js/data.*`, `css/*`, `img/*`, `js/app.js`, and `js/i18n.js`. The
  CSP is the strictest correct one that still lets the app actually
  run — see the per-directive comments in `_headers` for the
  rationale, including why we keep a single `style-src` instead of
  splitting into `style-src-elem` (Safari had inconsistent support).
- **`wrangler.toml`** pins the Pages project name (`name = "sinonimia"`)
  and the publish directory (`pages_build_output_dir = "."`) so a
  manual `wrangler pages deploy . --project-name=sinonimia` from a
  developer machine does the same thing Cloudflare's GitHub
  integration does on every push to `main`. The wrangler CLI does
  **not** know it's a Pages project, so plain `wrangler deploy`
  fails with `Missing entry-point to Worker script or to assets
  directory` — use the Pages subcommand instead.

Operational details (dashboard settings, rollback, custom domains,
the Pages-vs-Workers migration history) live in [`../../DEPLOY.md`](../../DEPLOY.md),
not here — this doc only covers what affects the code.

### What this means for code

- **No server-side runtime.** No Worker, no Functions, no edge
  handlers. Every feature you add has to run in the browser, or be
  pre-computed at content-edit time and shipped in a static file.
  This is why the validation pipeline, the content census, the
  pictogram search, and the translation injector are all `node
  scripts/*.js` invoked locally/CI, not server endpoints.
- **No env vars, no secrets at runtime.** The app makes no
  server-side calls; `OPENSYMBOLS_SECRET` (used by
  `scripts/buscar-pictograma.js` to talk to OpenSymbols) is only
  read from the developer's shell environment at content-edit time.
- **Cache is content-addressed by path, not hash.** HTML is cached
  per the default (so users see updates on reload); the dictionary,
  CSS, images, and the two non-data scripts are cached for a year
  with `immutable`. To bust the cache when the dictionary schema
  changes, rename the file (`js/data.es.v2.js`) and update the
  `<script>` tag in `index.html` in the same commit. Don't try to
  add a hashed-bundler step just to fix a cache problem — rename
  the file instead.

## Browser support

Sinonimia targets **evergreen desktop browsers** (Chrome, Edge,
Firefox) **plus Safari on macOS and iOS/iPadOS**. iPad is the most
common device in the project's intended occupational-therapy
settings, and iPhone users get only Safari by default — Safari
support is therefore not optional, it's part of the definition of
"works".

In practice this means:

- **No transpilation, no polyfills, no bundler.** The site ships
  the JavaScript as it is written, served as ES modules via
  `<script src="...">`. The language features actually used are
  `const`/`let`, arrow functions, template literals, destructuring,
  spread, `Array.prototype.includes` / `find` / `filter` / `map`,
  `Object.entries`, `localStorage`, `URLSearchParams`, and the DOM
  APIs they call. All of those have shipped in Safari for years.
  If you want to use something newer (top-level `await`, `?.` on
  older WebKit, `structuredClone`, the Temporal proposal, etc.),
  check [caniuse.com](https://caniuse.com) for the iOS Safari
  version that's still receiving updates in your target country
  before adding it — not the latest macOS Safari.
- **No build step means no automatic prefixing.** When you add a
  CSS feature that's only prefixed on WebKit (`-webkit-*`), you
  have to add the prefixed property alongside the unprefixed one
  by hand. `css/styles.css` is the only stylesheet, so this is a
  one-file audit.
- **The CSP in `_headers` has already been shaped around Safari.**
  The comment block above the `Content-Security-Policy` line calls
  out that we use a single `style-src` directive on purpose because
  Safari had inconsistent support for `style-src-elem`. The
  `Cross-Origin-Resource-Policy: same-origin` + `Cross-Origin-Opener-Policy: same-origin`
  pairing is also chosen so the site stays embeddable in iframes
  without credentials instead of forcing `credentialless` (which
  Safari shipped later than Chromium). When you change the CSP,
  re-read those comments first.
- **No browser detection, no UA sniffing.** Safari-vs-everyone-else
  branches are forbidden — they're how WebKit-only quirks become
  permanent tax on the codebase. If a feature genuinely doesn't
  work on Safari, either find a cross-browser equivalent or
  document the gap explicitly in `SPEC.md` (don't hide it).
- **Touch and keyboard on iPad.** The accessibility controls and
  the two multiple-choice games must remain operable with iPad's
  on-screen keyboard and external Bluetooth keyboards, not just
  with a mouse. Anything you add that intercepts `keydown` should
  also work for the keys iPadOS remaps (e.g. `Meta` for `Ctrl`,
  `Alt+Left` for `Back`).

The CI validation (`scripts/validar.js`) doesn't currently run any
browser tests — there's no headless Chrome / WebDriver in the repo
and no CI budget for one. Before adding a browser-automation
dependency, see the "no runtime dependencies" point above: every
dependency that lands in the repo has to be justified against the
zero-runtime principle.

## Service-worker kill-switch

Sinonimia does not ship a service worker of its own, and the CSP
in [`_headers`](../../_headers) sets `worker-src 'none'` to keep
it that way. Chrome can still show `Response served by service
worker has redirections` in DevTools, though, when something
*else* registered a SW against this origin — a stale Cloudflare
Pages preview, a browser extension, or a `*.pages.dev` PWA cache
left over from an older deploy. The warning is about the
intercepting SW, not about Sinonimia's own code, but it confuses
editors and reviewers, so a small defensive block at the bottom
of [`index.html`](../../index.html) calls
`navigator.serviceWorker.getRegistrations()` and `.unregister()`s
anything it finds at load time. The query is wrapped in
try/catch so browsers without the SW API (or in private mode
where it is unavailable) still work.

If a future version of Sinonimia genuinely needs a SW (e.g. for
offline use of `js/data.*.js`), this block has to be removed **in
the same commit** that adds the registration, and the
`worker-src 'none'` directive in `_headers` has to be relaxed.
That's the only reason the kill-switch is commented in the HTML
itself — so the next person to touch it knows exactly what to do.

## The three-file split for content vs. interface vs. logic

- **`js/i18n.js`** holds `I18N.<lang>` objects with only UI copy: button
  labels, headings, status messages. It is not dictionary content.
  `translate(language, key, variables)` looks up a key for a language,
  falling back to Spanish and then to the raw key if missing, and does
  simple `{placeholder}` substitution.
- **`js/data.es.js`**, **`js/data.en.js`** each populate a shared global,
  `DICCIONARIOS.<lang>`, with that language's dictionary entries. Adding a
  language means adding a new `js/data.<lang>.js` file (see
  `SPEC.md`'s "How to add a new language") — `js/app.js` needs no
  changes, since it
  only ever reads whatever languages exist as keys on `DICCIONARIOS`.
  The full step-by-step for a new language — including the mirrored
  strings in `js/bootstrap-i18n.js`, the `about.js` whitelist and the
  parallel `data-lang-block` blocks on `about/*` and `404.html`, and
  the `idiomaNombre_<lang>` key that has to be added in **every**
  existing `I18N` block — is in [`languages.md`](languages.md) (or
  [`../es/idiomas.md`](../es/idiomas.md) in Spanish). That document is
  the canonical "how to add a language" reference; the SPEC.md /
  technical.md sections are the short summaries.
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
`SPEC.md`'s architecture section.

## Dictionary entry shape

Every entry (see the Naming exceptions above for why these field names stay
Spanish) has: `id`, `palabra`, `imagen: {id, alt}`, `definicion`,
`sinonimos[]`, `ejemplo: {palabra, texto}`, `ejemploSinonimo: {palabra,
texto}`, `situacion`, and **optionally** `traduccion`. `situacion` is one
of nine values shared across every language (`tramites`, `salud`,
`vida-diaria`, `finanzas`, `vivienda`, `trabajo`, `legal`, `tecnologia`,
`seguridad`) — it's a
filter key, not display text; its label per language lives in
`js/i18n.js` as `tema_<situacion>`. The `palabra` field *inside*
`ejemplo` / `ejemploSinonimo` is the exact inflected/agreed form used
in that sentence (not necessarily the dictionary headword) — that's
what `createHighlightedSentence()` and `createSentenceWithBlank()`
search for, to highlight or blank it out.

`id` is the only field required to be unique — `palabra` isn't, on purpose:
a homograph (two unrelated meanings sharing one word, e.g. "pensión" —
retirement pay / a guesthouse) is modeled as two ordinary entries with the
same `palabra` and different `id`/`situacion`/`definicion` (see "Palabras
con doble significado" in `SPEC.md`). `entryByName` in `js/app.js`
(keyed by normalized `palabra`, used to cross-link a synonym to its own
entry and to pick the two games' multiple-choice options) reflects this:
it maps a name to an **array** of entries rather than overwriting, so a
second entry with the same `palabra` never silently shadows the first.
Synonym cross-links that resolve to more than one entry render a link per
match instead of guessing; `pickDistractorEntries` additionally excludes
any entry whose `palabra` matches the target's, so a homograph's twin can
never appear as a same-looking distractor option in either game.

### `traduccion`: linking the same concept across languages

```js
traduccion: { en: "pension-payment" }                     // one equivalent
traduccion: { en: ["pension-payment", "retirement-work"] } // several EN words for one ES concept
```

`traduccion` is an **optional** object keyed by language code. Its values
are the `id` of the equivalent entry in that language — a single string
for one-to-one links, or an array for one-to-many links (a Spanish word
with several valid English translations, or several Spanish words that
all map to the same English word). When set, `traduccion` is the
authoritative cross-language link; when not set, the shared-pictogram
fallback described in the next section applies.

Why is this field needed when ARASAAC pictograms already link concepts
across languages? Because ARASAAC has only one "money" pictogram, one
"document" pictogram, one "pen" pictogram, etc., and the dictionary has
many unrelated words that share each of those — so the unique-pictogram
fallback can only resolve a fraction of the entries. `traduccion` is
where the human editor disambiguates the rest. `scripts/validar.js`
checks the shape (object keyed by language code, values are strings or
arrays of strings) and that every referenced id exists in the target
language's dictionary.

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

If you already have a short-lived access token (the JSON the secret
exchange returns, e.g. `{"access_token": "temp::...", "expires": "..."}`),
pass it as `OPENSYMBOLS_TOKEN` instead — the script skips the exchange
step and uses the token directly. Useful when the token was generated
ahead of time by another tool:

```
OPENSYMBOLS_TOKEN=temp::... node scripts/buscar-pictograma.js "corregir un error" es
```

**The script automatically falls back to ARASAAC's own public API** (no
key needed, `searchArasaac()` in the script) whenever OpenSymbols isn't
usable: neither `OPENSYMBOLS_SECRET` nor `OPENSYMBOLS_TOKEN` is set, the
OpenSymbols token/search request fails (bad secret, network error, rate
limit, service down), or OpenSymbols returns zero results for the term.
That fallback is why the script also works with no setup at all:

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
special-case a language. `SPEC.md` documents the rules that constrain
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
`js/app.js` looks up with `getElementById` exists in `index.html`; that
any `traduccion` field on an entry is well-formed (object keyed by
language code, values are strings or arrays of strings) and references
ids that exist in the target language's dictionary; and that neither
`index.html` nor `js/i18n.js` contains any of a blocklist of
disability/therapy-related terms (the user-facing product's non-negotiable
rule from `SPEC.md` — `js/data.*.js` is deliberately exempt, since a
disability-related bureaucratic term could be a legitimate future entry).

## Growing the content (`scripts/estado-contenido.js`)

A second zero-dependency script, separate from validation: it reports word
counts per `situacion` category and per language, flags categories below
the 8-word threshold, and (with `--detalle`) lists every existing headword
and its synonyms so a new entry doesn't duplicate a concept already
covered. It's the bookkeeping half of content growth — it deliberately does
not draft definitions, since that requires the editorial judgment described
in `SPEC.md`'s "Process for expanding content", which this script's
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

## Hidden routes

### `/about/`

Public-facing presentation of the project, aimed at organizations,
funders, journalists, and new contributors who want to understand what
Sinonimia is without opening the source code. Five sections: the
project's origin (including the occupational-therapy/intellectual-
disability context that `index.html` never names), the six non-negotiable
principles (easy-read language, synonym repetition, ARASAAC pictograms,
non-punitive gamification, multi-language architecture, sober technology),
how the site is built (static, no backend, `localStorage` only, MIT +
CC BY-SA 4.0), the current dictionary stats per IADL area, and how to
help. The footer links back to the dictionary (`../index.html`).

**No public link points at it**: not from `index.html`, not from
`README.md`/`README.es.md`, not from anywhere in `doc/`. It's reached only
by typing the URL, and carries `<meta name="robots" content="noindex,
nofollow">`. Keep it up to date, in both languages, whenever the word
counts or the design principles change — but never add end-user-facing
text there in a way that implies it's linked from the product; that page
is not for the person using the dictionary.
