# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

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
`scripts/validar.js` enforces this with a blocklist scan over
`index.html` and `js/i18n.js` — it does not scan `js/data.*.js`, since a
dictionary entry about an actual disability-related bureaucratic term (e.g.
a disability-certificate procedure) would be legitimate content, not a
violation.

## Commands

There is no build step, no package.json, and no test framework — it's plain
HTML/CSS/JS served as static files.

- **Preview**: open `index.html` directly in a browser, or serve the folder
  with any static server (e.g. `npx serve .`). Everything runs client-side.
- **Validate everything** (this repo's only "test" step, and what CI runs
  on every PR via `.github/workflows/validate.yml`):
  ```
  node scripts/validar.js
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
Spanish (dictionary schema field names, `I18N` keys, HTML/CSS identifiers,
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

## Agent workflow — scratch scripts and the repo root

The repo root only holds files that are part of the shipped site or
tracked docs (`index.html`, `404.html`, `wrangler.toml`, this file, the
READMEs, etc.). When you (the agent) need to explore — batch-search
ARASAAC for a list of candidate terms, dump corpus entries to inspect
them, prototype a fallback strategy — the scratch script **must** live
in [`scripts/.scratch/`](scripts/.scratch/README.md), named
`<topic>_<purpose>.js` (no leading dot). **Do not** write `.tmp_*.js`,
`scratch.js`, or any other throwaway `.js`/`.sh` directly under the
repo root, even if you plan to delete it in the same session — `.gitignore`
ignores it but the root is not a scratch directory. The full rule and
rationale are in [`scripts/.scratch/README.md`](scripts/.scratch/README.md).
