﻿# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Service worker / PWA cache

Sinonimia is **not a PWA** — there is no `sw.js` and no `manifest.json`.
Pages are served fresh on every visit (the simple plain-HTML dictionary
use case doesn't justify the offline-app complexity). Unlike Calculia,
Apptonomia and Teclatlon, there is no `VERSION` to bump here — anything
you commit is what the next visitor downloads. No cache contract to
maintain.

## What this is

Sinonimia is a static, dependency-free plain-language dictionary. It explains
hard/technical words (bureaucratic, legal, health) using short "lectura
fácil" (easy-read) definitions, a synonym repeated inside the same example
sentence, and an ARASAAC pictogram. See [`doc/en/SPEC.md`](doc/en/SPEC.md)
(or [`doc/es/SPEC.md`](doc/es/SPEC.md)) for the full product
definition — target audience, the easy-read writing rules that every
definition/example must follow, the multi-language architecture, and the
rules that govern the gamification features. Read it before adding or
editing dictionary content; it is the source of truth, not this file.

One rule from `SPEC.md` worth surfacing here because it's easy to break
by accident when editing UI copy: the project's real objective is
occupational-therapy support for people with intellectual disability, but
**nothing user-facing may say so** — not in `index.html`, not in any
`I18N` string in `js/i18n.js`, in any language. That framing only belongs
in maintainer-facing docs (`doc/*/SPEC.md`, this file, `CONTRIBUTING.md` /
`CONTRIBUTING.es.md`, `README.md` / `README.es.md`).
`scripts/check.js` enforces this with a blocklist scan over
`index.html` and `js/i18n.js` — it does not scan `js/data.*.js`, since a
dictionary entry about an actual disability-related bureaucratic term (e.g.
a disability-certificate procedure) would be legitimate content, not a
violation.

## UNE 153101 reference (suite-wide)

All seven sibling projects follow **UNE 153101:2018 EX** (Spanish
easy-read standard) and Inclusion Europe's European easy-read
guidelines as the normative basis for the cognitive accessibility
principles that guide content and UI: short sentences, one idea per
sentence, everyday vocabulary, no clinical or technical jargon in
what the end user reads. This is the standard each `SPEC.md` cites
when it states the "easy read always" rule (see `doc/en/SPEC.md` §3.3
or its mirror in `doc/es/SPEC.md` §3.3). Adding a new language or a
new piece of UI copy means following UNE 153101 — not paraphrasing
it.

## WCAG AAA baseline (suite-wide)

This project conforms to WCAG 2.1 at **AA minimum** and adopts the
**AAA criteria that apply to the suite's audience** whenever feasible.
Full conformance at AAA is not feasible for a whole web application
(the W3C itself states AAA is meant for specific contexts); the rule
below lists the AAA criteria that ARE applicable and that this project
honours.

Adopted AAA criteria:

- **1.4.6 Contrast (Enhanced)** — text contrast ≥ 7:1 (large text
  ≥ 4.5:1). WCAG AA (4.5:1) is the legal floor; AAA is the design
  target. Verified pairs in Okeymoney (`#F2F4F8` on `#161A21` = 14.6:1,
  `#B7BDC9` on `#161A21` = 8.4:1) already meet AAA; this project aims
  at the same ratio when its token palette is next touched.
- **3.1.5 Reading Level** — content for the general public does not
  require advanced reading ability. Already complied with through
  UNE 153101 (see the section above) and Inclusion Europe's easy-read
  guidelines (the dictionary's `definicion` and `ejemplo` fields are
  written against this rule — see `SPEC.md` §3.3).
- **1.4.1 Use of Color** — color is never the only means of conveying
  information. Every feedback state (success / hint / error) also uses
  shape, icon, text or sound, so users with color-vision deficiencies
  are not excluded.

The product-facing wording in `doc/en/SPEC.md` (and the Spanish mirror
in `doc/es/SPEC.md`) references this baseline using the literal phrase
**"WCAG AA minimum, AAA whenever possible"**, mirroring the suite-wide
rule in the metaproject's `apptonomia/CLAUDE.md`.

### Public-facing wording: "usuario/a tipo" euphemism

When presenting the project to **the general public** (press, talks, public
READMEs that anyone can read, the metaproject landing at `apptonomia.uk`,
etc.) the term **"discapacidad intellectual" / "intellectual disability"**
must not be used as a way to describe the audience of the app — even when
the surrounding text would otherwise be public. The accepted euphemism for
that audience in those surfaces is **"usuario/a tipo"** (plural
"usuarios/as tipo"), used as a generic profile marker, not as a label for
any real person.

Where the euphemism applies and where it doesn't:

- **Applies** to any text that anyone outside the project can read without
  authentication: `README.md`, `README.es.md`, the portal at
  `apptonomia.uk`, public talks, social media copy, press notes, marketing
  material. In these surfaces, refer to the audience as "el/la usuario/a
  tipo" or "usuarios/as tipo" of the app.
- **Does NOT apply** to internal documentation (`CLAUDE.md`,
  `doc/en/SPEC.md`, `doc/es/SPEC.md`, `technical.md`, `roles.md`,
  `CONTRIBUTING.md`, `CONTRIBUTING.es.md`) — those files are read by
  maintainers and contributors, and **"discapacidad intellectual" /
  "intellectual disability" remains the canonical term there**, because
  the project needs an explicit, unambiguous explanation of its real
  objective for whoever maintains it.
- **Does NOT apply** to dictionary content (`js/data.*.js`): a dictionary
  entry about a real bureaucratic concept (a disability certificate, a
  permanent-disability benefit, etc.) names the concept as it is named in
  the real world — that is content, not labelling of an audience.
- **Does NOT apply** to the UI of the site itself: the rule in
  `doc/es/SPEC.md` §2.3 / `doc/en/SPEC.md` §"Mandatory rule: zero mentions
  in the user-facing product" continues to forbid **any** mention,
  including "usuario/a tipo", in `index.html` / `js/i18n.js` /
  `about/privacidad.html`. The euphemism is for the outside world, not
  for what the visitor reads on the site.

Rationale: presenting the project's real objective in maintainer docs is
useful and necessary; presenting it in marketing or landing surfaces is
neither necessary nor respectful of the audience — "usuario/a tipo" lets
public material describe what the app is for (who the typical profile
is) without publicly naming a clinical group.


## Language policy

- **UI**: multilingual. Default locales are **Spanish (es)** and
  **English (en)**; es is the default and the source of truth for
  every product decision that is not dictated by maintainers. The
  architecture is intentionally language-agnostic: js/app.js never
  reads a hardcoded language's data file — it goes through
  DICCIONARIOS[currentLanguage] and 	(key), so adding a third
  language requires **no changes to js/app.js** (see
  [doc/en/I18N.md](doc/en/I18N.md) or [doc/es/I18N.md](doc/es/I18N.md)
  for the step-by-step).
- **Technical code**: **always English** — variables, functions,
  identifiers, comments, and commit messages. UI text lives in
  js/i18n.js (one I18N.<lang> block per language); dictionary
  content lives in js/data.<lang>.js. Identifiers that are deliberately
  kept in Spanish are listed in doc/en/technical.md (e.g. dictionary
  schema field names, localStorage keys, URL route
  segments) — read that list before renaming anything, since those are
  shared data contracts.
- **Product changes apply to all locales by default**: any change to
  product content (UI strings, dictionary entries, examples,
  pictograms, game copy, accessibility labels, catalog entries, etc.)
  **must be applied to every supported locale** — at minimum es and
  en. Spanish (es) is the source of truth when not dictated
  otherwise; English (en) must keep parity. If a new locale is added,
  the same change applies there too. Never ship a product change that
  exists only in one language.
- **Self-test for "did I cover both languages?"**: search the new
  string or data shape in the es files, then the en files; if
  the es change has no en mirror (or vice versa), it is not done.
  scripts/check.js enforces key parity of 	() keys in
  js/i18n.js (it fails if js/app.js calls a key missing from any
  I18N block) but does not enforce translation quality or
  dictionary-parity — proofread both.

## Commands

There is no build step, no package.json, and no test framework — it's plain
HTML/CSS/JS served as static files.

- **Preview**: open `index.html` directly in a browser, or serve the folder
  with any static server (e.g. `npx serve .`). Everything runs client-side.
- **Validate everything** (this repo's only "test" step, and what CI runs
  on every PR via `.github/workflows/check.yml`):
  ```
  node scripts/check.js
  ```
  It checks JS syntax, CSS brace balance, that every `ejemplo.palabra` /
  `ejemploSinonimo.palabra` is an exact (accent-insensitive) substring of its
  own `.texto` (word-highlighting and the fill-in-the-blank game silently
  fail to find it otherwise), that every `imagen.id` has a matching file in
  `img/`, that no dictionary entry has a duplicate `id`, that every `t()`
  key `js/app.js` uses exists in every `I18N` language block, and that every
  DOM id `js/app.js` looks up exists in `index.html`. It also enforces the
  no-disability-mention rule below by failing if `index.html` or
  `js/i18n.js` contain any blocklisted term. Read the script before
  changing the data-file format — it encodes the invariants that format
  relies on.
- **Planning new dictionary entries — don't read `js/data.<lang>.js`
  directly**: it's 1MB+/20,000+ lines per language, far too large to open
  wholesale just to check what a category already covers. Use
  `node scripts/estado-contenido.js --detalle --categoria <topic> --lang
  <es|en>` instead — scoped to the category+language you're about to work
  on, it lists every existing headword with its synonyms, definición and
  ejemplo, enough to avoid both duplicating a concept and recycling the
  same illustrative scenario across a category (see "Process for
  expanding content" in `doc/en/SPEC.md`). Reserve a direct
  read/grep of `js/data.<lang>.js` for surgical fixes to one
  already-located entry, never for planning what to add next.
- **Adding a pictogram for a new word**: search ARASAAC's public API —
  `https://api.arasaac.org/api/pictograms/es/search/<term>` — pick a
  non-schematic result whose keywords match, then download
  `https://static.arasaac.org/pictograms/<id>/<id>_500.png` into `img/<id>.png`.
  Images are licensed CC BY-NC-SA (Gobierno de Aragón / Sergio Palao);
  keep the attribution in the footer intact.

## Architecture

**See [`doc/en/technical.md`](doc/en/technical.md) for the full technical reference** — the file-by-file
breakdown, the routing/state model, the dictionary entry shape, the ARASAAC
pictogram system, and the gamification system. It also documents the
project's language policy (English for code/comments, Spanish/English for
product content) and the specific identifiers that are deliberately kept in
Spanish (dictionary schema field names, HTML/CSS identifiers,
`localStorage` keys, URL route segments) — read that list before renaming
anything, since those are shared data contracts, not stray leftovers.

Quick orientation: `js/app.js` is a single IIFE holding the whole client
app (hash router, rendering, accessibility controls, both games). It's
intentionally language-agnostic — it only ever reads `activeDictionary`
(`= DICCIONARIOS[currentLanguage]`) and calls `t(key)`, never a hardcoded
string or a hardcoded language's data file. `js/i18n.js` is UI copy only,
`js/data.es.js`/`js/data.en.js` are the actual dictionary content, and
`doc/en/SPEC.md` (or `doc/es/SPEC.md`) holds the non-negotiable content/UX
rules (easy-read writing rules, "never gate content behind a game", etc.).

## graphify

This project has a knowledge graph at `graphify-out/` with god nodes, community structure, and cross-file relationships.

- For codebase questions, first run `graphify query "<question>"` when `graphify-out/graph.json` exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than `GRAPH_REPORT.md` or raw grep output.
- If `graphify-out/wiki/index.md` exists, use it for broad navigation instead of raw source browsing.
- Read `graphify-out/GRAPH_REPORT.md` only for broad architecture review or when `query`/`path`/`explain` do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).

## Agent workflow — scratch scripts and the repo root

The repo root only holds files that are part of the shipped site or
tracked docs (`index.html`, `404.html`, `wrangler.toml`, this file, the
READMEs, etc.). When you (the agent) need to explore — batch-search
ARASAAC for a list of candidate terms, dump corpus entries to inspect
them, prototype a fallback strategy — the scratch script **must** live
in [`scripts/ingest/explore/`](scripts/ingest/README.md), named
`<topic>_<purpose>.js` (no leading dot). **Do not** write `.tmp_*.js`,
`scratch.js`, or any other throwaway `.js`/`.sh` directly under the
repo root, even if you plan to delete it in the same session — `.gitignore`
ignores it but the root is not a scratch directory. The full rule and
rationale are in [`scripts/ingest/README.md`](scripts/ingest/README.md).

`scripts/ingest/` also holds the batch-ingestion pipeline
(`pipeline/`), batch/fix data files (`batches/`, `fixes/`) and
ephemeral artifacts (`one-off/`). Those are the maintainer's working
area, not the agent's. The agent should not add, edit, or move
anything under `scripts/ingest/` unless the user explicitly asks for
batch work.
