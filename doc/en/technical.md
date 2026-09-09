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
`scripts/check.js` — is English. That includes the `I18N` object's keys
in `js/i18n.js` (e.g. `heroLabel`, `searchPlaceholder`, `topic_tramites`):
they are English identifiers like the rest of the code, referenced
verbatim in `index.html`'s `data-i18n="..."` attributes and in
`js/app.js`'s `t("...")` calls — only their *values* are per-language,
matching the convention used in the sibling project apptonomia. If you're
adding new code, follow that; if you're touching one of the exceptions
above, touch it everywhere it's used or not at all.

## System overview

Sinonimia is a static site: plain HTML, CSS, and vanilla JavaScript, no
build step, no bundler, no framework, no runtime dependencies. It runs by
opening `index.html` in a browser or serving the folder with any static
file server. `scripts/check.js` (Node, zero dependencies) is the only
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
scripts/check.js   the CI/local validation script
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
  `scripts/search-pictogram.js` to talk to OpenSymbols) is only
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

## Typography

The UI uses two self-hosted typefaces loaded from `css/fonts/`:

- **Atkinson Hyperlegible** (weights 400 and 700) — for high-contrast
  areas and short UI labels, chosen for the letter-shape
  disambiguation that helps readers with low vision.
- **Nunito** (variable, weight range 400–900) — for body text and
  reading flows, chosen for the warm humanist tone that keeps long
  explanations approachable.

Both fonts are SIL OFL 1.1 licensed and are bundled as `.woff2` files
in `css/fonts/`. The CSS exposes them through the `--fuente` custom
property, set in `:root` to
`'Atkinson Hyperlegible', 'Nunito', "Segoe UI", Verdana, Arial, sans-serif`
and applied to `body` (and the `about/privacidad.html` view) via
`font-family: var(--fuente)`. `@font-face` blocks use `font-display:
swap` so the first paint is never blocked on font loading.

This matches the rest of the suite (Apptonomia, Calculia, Memofun,
Okeymoney, Teclatlon, Routime) — every PWA of Miralante ships the same
two typefaces, self-hosted, never fetched from a CDN.

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

The CI validation (`scripts/check.js`) doesn't currently run any
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
  the `languageName_<lang>` key that has to be added in **every**
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
of eleven values shared across every language (`tramites`, `salud`,
`vida-diaria`, `finanzas`, `vivienda`, `trabajo`, `legal`, `tecnologia`,
`seguridad`, `educacion`, `conocimiento`) — it's a
filter key, not display text; its label per language lives in
`js/i18n.js` as `topic_<situacion>`. The `palabra` field *inside*
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
where the human editor disambiguates the rest. `scripts/check.js`
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
(`js/i18n.js`'s `footerCreditsHtml` key) and must stay intact.

**Finding a pictogram**: run `node scripts/search-pictogram.js "<term>" es`.
It tries **[OpenSymbols](https://www.opensymbols.org)** first — an
aggregator that queries ARASAAC, Sclera, Mulberry, and other open-licensed
banks behind one API, searchable directly in Spanish (`locale=es`) — using
a personal, free "shared secret" (requested at
https://www.opensymbols.org/api) read from the `OPENSYMBOLS_SECRET`
environment variable. Never commit that secret.

```
OPENSYMBOLS_SECRET=xxxx node scripts/search-pictogram.js "corregir un error" es
```

If you already have a short-lived access token (the JSON the secret
exchange returns, e.g. `{"access_token": "temp::...", "expires": "..."}`),
pass it as `OPENSYMBOLS_TOKEN` instead — the script skips the exchange
step and uses the token directly. Useful when the token was generated
ahead of time by another tool:

```
OPENSYMBOLS_TOKEN=temp::... node scripts/search-pictogram.js "corregir un error" es
```

**The script automatically falls back to ARASAAC's own public API** (no
key needed, `searchArasaac()` in the script) whenever OpenSymbols isn't
usable: neither `OPENSYMBOLS_SECRET` nor `OPENSYMBOLS_TOKEN` is set, the
OpenSymbols token/search request fails (bad secret, network error, rate
limit, service down), or OpenSymbols returns zero results for the term.
That fallback is why the script also works with no setup at all:

```
node scripts/search-pictogram.js "corregir un error" es
```

Either path only lists candidates (bank, license, author, image URL) for a
human to review; nothing is downloaded or picked automatically.

**Multi-license caveat**: unlike the ARASAAC-only fallback, an OpenSymbols
result can come from a bank with a *different* license (e.g. Sclera is
CC BY-NC, Mulberry is CC BY-SA — check each result's `license`/`author`
fields). The footer's `footerCreditsHtml` currently only credits ARASAAC; the
moment a non-ARASAAC image is actually added to `img/`, that key needs to
grow a credit line for the new bank too. Don't add a non-ARASAAC image
without updating it in the same change.

Whichever path finds it, check `img/` first — the concept you need might
already be there.

**Category fallback when no pictogram exists at all**: some words —
mostly abstract legal/financial/administrative terms (*tributario*,
*vencimiento*, *hipotecar*) — have no non-schematic pictogram in ARASAAC,
full stop. Confirm this before falling back, don't assume it: try the
word itself, its `sinonimos`, and a couple of synonyms of the definition
against `search-pictogram.js` (OpenSymbols + ARASAAC). Verified by hand
across a real batch: of 18 terms with zero ARASAAC hits, 16 also
returned zero OpenSymbols results across every bank it aggregates — for
this class of word, there is often genuinely nothing to find, in any
bank.

When that's confirmed, don't leave the entry on whatever image the
ingest pipeline happened to have on hand — that's how earlier batches
ended up with entries pointing at a specific cathedral or a Christmas
Yule log for a finance term, which is worse than an honestly generic
icon. Assign the deliberate per-`situacion` default from
[`scripts/category-pictogram-defaults.js`](../../scripts/category-pictogram-defaults.js)
instead:

| `situacion` | pictogram id | keyword(s) |
| --- | --- | --- |
| `tramites` | 21802 | documento |
| `salud` | 2467 | médico, doctor |
| `vida-diaria` | 8717 | vida |
| `finanzas` | 4630 | dinero |
| `vivienda` | 2317 | casa |
| `trabajo` | 11457 | mercado laboral, empleo |
| `legal` | 11291 | juez, magistrado |
| `tecnologia` | 11459 | tecnología |
| `seguridad` | 12260 | protección, seguridad |
| `educacion` | 8098 | educación, formación |
| `conocimiento` | 2450 | libro |

These are the same generic pictograms that most entries in each
category already ended up sharing organically during earlier ingest
runs — this table makes that existing pattern deliberate and documented
instead of accidental, and gives every future batch a defined fallback
instead of an ingest error to fix by hand later.

## Gamification

Word-of-the-day, "surprise me", a discovery progress bar, a free-text
"write your own sentence" box, and two multiple-choice games
(`renderWordGame`, `renderSentenceGame`, reached through `renderGameMenu`)
all live in `js/app.js`, all read from `activeDictionary`, and none of them
special-case a language. `SPEC.md` documents the rules that constrain
any future gamification (never hide content behind an interaction, never
make a game punitive) — read it before adding a third game.

## Validation (`scripts/check.js`)

Zero-dependency Node script, run locally and in CI
(`.github/workflows/check.yml`) on every push/PR. It checks, in order:
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

## Growing the content (`scripts/content-status.js`)

A second zero-dependency script, separate from validation: it reports word
counts per `situacion` category and per language, flags categories below
the 8-word threshold, and (with `--detalle`, optionally scoped with
`--categoria <topic>` and `--lang <es|en>`) lists every existing headword
with its synonyms, definición and ejemplo, so a new entry doesn't
duplicate a concept or recycle an illustrative scenario already covered —
all without opening the megabyte-plus `js/data.<lang>.js` files directly.
It's the bookkeeping half of content growth — it deliberately does
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

## Suite pattern — how every app of Miralante is built

> 🌐 **Other language:** [Spanish](../es/tecnico.md#8-patrón-de-la-suite-cómo-se-construye-cada-app-de-miralante)

This section is the **canonical, cross-project guide** for how
every app of the [Miralante suite](https://apptonomia.uk) is
built and maintained. It is the source of truth that overrides
any single repo's `technical.md` / `tecnico.md` when they
disagree, because the goal is to keep the seven sibling apps
(Apptonomia, Calculia, Memofun, Okeymoney, Sinonimia, Teclatlon,
Routime) consistent: same shape, same conventions, same
deploy, same i18n, same offline behaviour.

A change to this section is a **suite-wide change** and must be
applied to every repo. A change to a project's other sections
in this file is project-specific and stays there.

> **Source of truth for product rules** in this repo:
> [`SPEC.md`](SPEC.md).
> **Source of truth for i18n**: [`I18N.md`](I18N.md).
> This section does **not** redefine those; it codifies the
> pattern they all share.

### 0 The pattern in one paragraph

Every app of the Miralante suite is a **static, dependency-free,
offline-first PWA** built from the same minimal skeleton:

1. A small set of **standalone HTML pages** at the repo root
   (one activity) or under `tools/<slug>/` (multi-activity hubs).
2. Every page is a **real, navigable URL** — there is **no SPA
   routing**, no in-page view switching, no `pushState`. Each
   page reloads on entry; navigation between pages is a normal
   `<a>` click.
3. Hidden routes (`about/`, `team/`, `legal/`, `config/`) share
   the same shape: `index.html` + `styles.css` + `strings.<locale>.js`
   pair, with **interlinking in the footer** so any of them is
   one click away from any other.
4. A **service worker** (`sw.js`, network-first) caches the shell
   (`FILES` list, bumped `VERSION`) so the app works offline.
5. **No build step**, no `package.json`, no frameworks, no
   bundlers, no CDN JS. The repo root is the deploy output.

### 1 The standalone-page shape

This is the pattern every hidden route and every public route
follows. The shape is identical across the suite; only the
contents change.

#### 1.1.1 The five-folder skeleton

Every app exposes the same five folders:

```
<app>/
  index.html              # Public entry point (the activity)
  app.js                  # Logic
  data.js                 # Locale-neutral layouts + per-locale content
  strings.es.js           # Spanish UI text (source of truth)
  strings.en.js           # English UI text
  styles.css              # App-specific styles
  assets/
    css/{tokens,base,components}.css
    fonts/                # Self-hosted Atkinson Hyperlegible + Nunito
    img/                  # App icon + decorative imagery
    js/{utils,i18n,tts,storage,feedback}.js
  about/                  # Hidden route: presentation
    index.html
    styles.css
    strings.es.js
    strings.en.js
  team/                   # Hidden route: who builds it
    index.html
    styles.css
    strings.es.js
    strings.en.js
  legal/                  # Data-protection page (linked from the footer)
    index.html
    styles.css
    strings.es.js
    strings.en.js
  config/                 # Settings (only on apps that need it)
    index.html
    app.js
    styles.css
    strings.es.js
    strings.en.js
  manifest.json
  sw.js
  _headers
  404.html
  robots.txt
  sitemap.xml
```

Single-activity apps (Teclatlon, Okeymoney) put `index.html` at
the repo root. Multi-activity apps (Apptonomia, Calculia) put
`tools/<slug>/index.html` per activity and a `site/index.html`
landing page; the four hidden folders live at the repo root.

#### 1.1.2 The HTML shell of a standalone page

Every standalone page opens with the same boilerplate. Below,
the **template**; deviations are called out where they apply.

```html
<!DOCTYPE html>
<html lang="es" data-i18n-title="pageTitle">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sinonimia — Sobre este proyecto</title>
  <!-- Hidden route: not linked from the main menu and should not be
       indexed. Aimed at anyone who wants to know what Teclatlon is:
       families, professionals, journalists, funders, contributors. -->
  <meta name="robots" content="noindex, nofollow">
  <meta name="description" content="…">
  <meta name="theme-color" content="#FAF7F2">
  <link rel="stylesheet" href="../assets/css/tokens.css">
  <link rel="stylesheet" href="../assets/css/base.css">
  <link rel="stylesheet" href="../assets/css/components.css">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="container {legal|about}">
    <header class="cabecera-{legal|about}">
      <div class="idioma-selector" role="group" aria-label="Elegir idioma">
        <button type="button" class="btn-idioma" id="btnIdiomaEs"
                data-locale="es" aria-pressed="false">🇪🇸 Español</button>
        <button type="button" class="btn-idioma" id="btnIdiomaEn"
                data-locale="en" aria-pressed="false">🇬🇧 English</button>
      </div>
      <img src="../assets/img/icono.svg" alt="" width="80" height="80"
           class="logo-{legal|about}">
      <h1>…</h1>
      <p class="lema" data-i18n="tagline">…</p>
      <p class="entradilla" data-i18n="lead">…</p>
      <nav class="indice">…optional, only on long pages…</nav>
    </header>

    <main class="pila">
      <section class="card">…</section>
    </main>

    <footer class="pie-{legal|about}">
      <a class="btn btn-secundario" href="../"
         data-i18n="footerActivities">Ir a la aplicación</a>
      <a class="btn btn-secundario" href="../legal/"
         data-i18n="footerDataProtection">Protección de datos</a>
      <a class="btn btn-secundario" href="../about/"
         data-i18n="footerAbout">Sobre este proyecto</a>
      <a class="btn btn-secundario" href="../team/"
         data-i18n="footerTeamGuide">Quiénes la hacen</a>
      <a class="btn btn-secundario" href="../config/"
         data-i18n="footerSettings">Ajustes</a>
    </footer>
  </div>

  <script src="../assets/js/utils.js"></script>
  <script src="../assets/js/i18n.js"></script>
  <script src="strings.es.js"></script>
  <script src="strings.en.js"></script>
  <script>
    (function () {
      'use strict';
      function paintLanguageSelector() {
        var active = App.i18n.locale();
        document.getElementById('btnIdiomaEs')
          .setAttribute('aria-pressed', String(active === 'es'));
        document.getElementById('btnIdiomaEn')
          .setAttribute('aria-pressed', String(active === 'en'));
      }
      document.getElementById('btnIdiomaEs')
        .addEventListener('click', function () { App.i18n.setLocale('es'); });
      document.getElementById('btnIdiomaEn')
        .addEventListener('click', function () { App.i18n.setLocale('en'); });
      paintLanguageSelector();
    })();
  </script>
  <script>
    /* Register the SW from this entry point so it is active for any
       later navigation, matching what the main index.html and the
       other standalone pages already do. */
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('../sw.js').catch(function () {});
    }
  </script>
</body>
</html>
```

**Notes:**

- `data-i18n-title="pageTitle"` on `<html>` lets `assets/js/i18n.js`
  fill `document.title` during `init()`. The hardcoded `<title>`
  is the fallback the browser tab would show before i18n.js
  executes (and the SW cache fallback).
- The page's own class on the `<div class="container …">` wrapper
  is what the page-specific `styles.css` scopes its rules under
  (`legal-page`, `about-page`, `team-page`). No more `.sp-*`
  ancestor prefixes (those were a SPA-merge leftover, retired in
  2026-09; see `git log`).
- The footer is **always** the same five links (in the same
  order) on `about/`, `team/` and `legal/`. `config/` gets a
  stripped footer that only returns to the SPA. The app root
  (`index.html`) does **not** render this footer (it has its own
  footer with the reset button and the data-protection link —
  see §2 above).

#### 1.1.3 The strings pair

Each standalone folder ships its own `strings.es.js` /
`strings.en.js`. They follow the **flat-key, IIFE-register**
pattern; `scripts/check.js` extracts the dictionary via
`vm.createContext` with a stub `App.i18n.register` and enforces
key parity between locales.

```javascript
/* legal/strings.es.js — page text (ES). */
(function () {
  'use strict';
  App.i18n.register({
    pageTitle: 'Protección de datos',
    pageDescription: 'Teclatlon: qué datos guarda, dónde y por qué. …',
    routeNotice: 'Esta página no se enlaza desde la aplicación. …',
    tagline: 'Sin registro. Sin cookies. Sin analítica.',
    lead: 'Teclatlon no pide tus datos personales. …',
    navResponsible: 'Quién trata tus datos',
    navData: 'Qué guardamos',
    /* …more keys… */
    footerActivities: 'Ir a la aplicación',
    footerAbout: 'Sobre este proyecto',
    footerTeamGuide: 'Quiénes la hacen',
    footerSettings: 'Ajustes'
  }, 'es');
})();
```

Keys are flat (no `legal.pageTitle` style namespacing); the page
**is** the namespace, because the file lives in its own folder.
Common keys (`core.back`, `core.listen`, `core.dataProtection`)
already ship in `assets/js/i18n.js` and are not redefined here.

#### 1.1.4 The standalone stylesheet

Each standalone folder ships its own `styles.css`. It is **the
old `assets/css/subpages.css` split per page**, with the
`.sp-legal` / `.sp-about` ancestor prefixes dropped (they were
a SPA-merge leftover). The page wrapper class
(`<div class="legal-page">`, `<div class="about-page">`, etc.)
is what the CSS scopes under:

```css
.legal-page { max-width: 880px; }
.legal-page .cabecera-legal { … }
.legal-page .indice a { … }
.legal-page section { … }
```

Do **not** introduce per-page classnames that collide with the
shared components (`base.css` already defines `.cabecera`,
`.lema`, `.indice`, `.btn`, `.card`, `.pila`, …). When the
standalone page needs a different look, scope the rule under
the page class — never under a generic `.cabecera` or `.indice`.

### 2 The shared core

Every app of the suite ships the same six files under
`assets/js/`, in the same load order, with the same exported
shape. Trimming is allowed; **adding** functionality back is
forbidden unless it serves a concrete need (the trimming notes
in §2.1 above are the canonical rationale).

| Module | Surface | Required by |
|---|---|---|
| `utils.js` | `App.utils.shuffle / $ / $$ / reducedMotion / wakeLock` | every page |
| `i18n.js` | `App.i18n.{locale, setLocale, lang, register, t, pick, apply, SUPPORTED, DEFAULT_LOCALE, LABEL, FLAG}` | every page |
| `tts.js` | `App.tts.speak` | only pages that read aloud (most do) |
| `storage.js` | `App.storage.{get, set, remove}` | only pages that read or write `localStorage` (`index.html`, `config/`) |
| `feedback.js` | `App.feedback.{success, encourage, celebrate}` | only the activity's `app.js` |

The load order is `utils.js → i18n.js → tts.js → storage.js →
feedback.js → strings.<locale>.js → data.js → app.js`. `i18n.js`
must load **before** `tts.js` and `feedback.js`, which read the
active language.

Both `strings.es.js` and `strings.en.js` always load (they're
not gated by `locale`); `App.i18n.locale()` decides which one
is active. The locale picks itself from
`localStorage['teclatlon:locale']` first, then
`navigator.language` (`'es'` fallback).

### 3 The PWA contract

The service worker is **network-first, cache-fallback**, declared
in `sw.js` and committed next to `manifest.json`. The contract:

```javascript
var VERSION = 'teclatlon-vN';
var FILES = [
  './index.html',
  './404.html',
  './manifest.json',
  './app.js',
  './data.js',
  './strings.es.js',
  './strings.en.js',
  './styles.css',
  /* one entry per file in the app shell, including every
     standalone page's index.html, styles.css and
     strings.<locale>.js pair */
  './legal/index.html',
  './legal/styles.css',
  './legal/strings.es.js',
  './legal/strings.en.js',
  /* …about/, team/, config/ likewise… */
  './assets/css/tokens.css',
  './assets/css/base.css',
  './assets/css/components.css',
  './assets/fonts/…woff2',
  './assets/js/utils.js',
  './assets/js/i18n.js',
  './assets/js/tts.js',
  './assets/js/storage.js',
  './assets/js/feedback.js',
  './assets/img/icono.svg'
];
```

Two rules govern changes to `FILES`:

1. **New file → add it to `FILES`.** The `install` handler
   puts each file individually (never `cache.addAll`, which
   aborts on the first failure and bricks the cache for
   everyone).
2. **Any change to a cached file → bump `VERSION`**
   (`'teclatlon-vN'` → `'teclatlon-vN+1'`). Without the bump,
   an offline user is stuck on the old version forever,
   because the `activate` handler only purges caches with a
   different name.

`scripts/check-version-bump.js` enforces (2): it
`git show HEAD:sw.js` to see what `VERSION` was at the last
commit, compares against the current `VERSION`, and checks
that `FILES` and the diff against HEAD agree. If they don't,
the script fails and the `cache-bump` CI job fails too.

Every standalone page also runs
`navigator.serviceWorker.register('../sw.js')` from its inline
script, so a direct visit to `/legal/`, `/about/` or `/team/`
primes the SW for the SPA root the same way `index.html` does.

### 4 i18n invariants

These are non-negotiable across the suite. A locale change is
incomplete until **every** file in this list is updated:

1. `assets/js/i18n.js#SUPPORTED` and `#DEFAULT_LOCALE`.
2. `assets/js/i18n.js#BCP47` mapping (for `speechSynthesis`
   voice selection).
3. The pre-paint detector in `index.html` (the inline
   `<script>` that picks the locale before first paint — see
   §2.5 above).
4. `strings.<locale>.js` and every per-folder
   `strings.<locale>.js` pair (`legal/`, `about/`, `team/`,
   `config/`).
5. `data.js`: every locale-split array
   (`DATA.lessons.<locale>`, `DATA.words.<locale>`,
   `DATA.templates.<locale>`, `DATA.numpadSteps.<locale>`).
6. `sw.js`: add the new `strings.<locale>.js` files to
   `FILES` and bump `VERSION`.
7. `scripts/check.js`: the parity check works in N locales
   with no code change (it picks up every
   `strings.<locale>.js` pair via `fs.readdirSync`); confirm
   the script still passes after the locale is added.

The full step-by-step recipe (with example code) is in
[`I18N.md`](I18N.md).

### 5 What is **forbidden** (across the suite)

These are anti-patterns observed at some point and explicitly
retired; the commit history is the source of truth for each
retirement. The rule is "if you find yourself reaching for one
of these, stop and re-read this section".

- **No SPA / no `pushState` / no `view-*` sections.** Every
  page is its own URL. Do not merge `legal/`, `about/`,
  `team/` into `index.html` as hidden sections, even with a
  redirect shim. This was tried in 2026-09 (`spa: merge`) and
  reverted in the same release; see `git log` for the lessons
  learned. Navigation between pages must always be a real
  `<a>` click, and every hidden route must be one click away
  from any other via the shared footer.
- **No `App.goLegal` / `App.goAbout` / `view-legal` /
  `view-about` / `sp-legal` / `sp-about` / `sp-idioma` /
  `subpages.css`.** These all belong to the retired SPA-merge
  model.
- **No `_redirects` SPA catch-all.** Cloudflare rejects it
  as a loop; documented in `CLOUDFLARE.md` and in the deploy
  recipe.
- **No `data-app-blocked="mobile"` flash.** The pre-paint
  script is a single inline `<script>` in `<head>`; do not
  split it into a separate `.js` (CSP `script-src 'self'`
  would still allow it, but the synchronous timing guarantee
  only holds for inline scripts in the head).
- **No `package.json`, no `node_modules`.** The repo is the
  build output. A package manifest would force Cloudflare to
  run `npm install` on every build, overshooting the 25 MiB
  asset limit.
- **No JS CDNs.** All fonts, icons and JS ship in `assets/`.
- **No ES module imports** (`<script type="module">`). The
  app must work from `file://` for offline use; ES modules
  break that.
- **No real-time database, no login, no cookies, no
  analytics.** Persistence is `localStorage` only.
- **No tappable on-screen keyboard** in apps that target the
  physical computer keyboard (Teclatlon, Okeymoney's typed
  amounts, Sinonimia's typed words). The on-screen keyboard
  is decorative only.

### 6 Validation checklist

Run this on every PR that touches any of the surface files
(`*.html`, `*.js`, `*.css`, `sw.js`, `manifest.json`, `data.js`):

```bash
node scripts/check.js           # must report OK (N checks, no failures)
node scripts/check-version-bump.js   # must pass
```

Then open the affected pages in a browser at
`http://localhost:<port>/<route>` and walk through the manual
smoke:

- `index.html` boots into the name screen or the menu depending
  on saved state; `localStorage` roundtrip works; the "🗑️
  Borrar mi progreso" button resets both the data and the UI.
- `/legal/` loads with the localized h1, tagline and footer;
  the language switcher toggles `lang`, `document.title` and
  every `data-i18n` text without a stale flash.
- `/about/` and `/team/` likewise; their footer links navigate
  to each other and to `/legal/` and `/config/` without reloads
  before the SW primes.
- `/config/` lists the saved state and its two reset buttons
  work (two-step confirm).
- Refresh once after first load and verify
  `navigator.serviceWorker.controller` is non-null.

If any of the above fails, the change does not match the suite
pattern and must be revised before landing.

### 7 Cross-repo differences (what this section does **not** cover)

Every app is a single-activity variant of the pattern above.
The per-app differences — what is shared with the suite, what
is trimmed, and what is intentionally different — are
documented in each repo's `technical.md` § "Other apps of the
suite: real differences" (the project-specific delta). Use
that section to decide whether a deviation in one repo is
intentional before copying it to another.

This canonical section lives in **every repo's**
`technical.md` / `tecnico.md`, kept in sync. If you change it
in one repo, mirror it across the others in the same PR.

### 8 See also

- §2 above — Teclatlon-specific recipes and contracts that
  build on this pattern.
- [`I18N.md`](I18N.md) — how to add a new language while keeping
  the i18n invariants intact.
- [`CLOUDFLARE.md`](../../CLOUDFLARE.md) — deploy and SW/header
  contracts at the Cloudflare Workers level.
- [`SPEC.md`](SPEC.md) §"Mandatory rule" — the accessibility and
  no-clinical-mention invariants every page must respect.

---


