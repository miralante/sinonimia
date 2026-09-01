﻿# CLAUDE.md — AI agent workflow

This file provides guidance to Claude Code (claude.ai/code) when working
with code in this repository. It is intentionally short and stable;
anything that grows beyond a short rule belongs in the canonical sources
listed in §A.1.

The document is split in two blocks:

- **Block A — Workflow** (§A.1 … §A.4): rules that govern *how* an
  agent edits this repo (canonical sources, mandatory workflow,
  external/destructive operations, scope of the file).
- **Block B — Suite-wide policies** (§B.1 … §B.6): inherited rules
  from the Miralante metaproject that also apply here (service worker
  cache, language policy, UNE 153101 / WCAG, public-facing wording,
  graphify).

If two sections disagree, the more specific one wins: per-project
rules in Block A override the suite-wide rules in Block B for the
project at hand, and a rule about a specific topic wins over a
general one on the same block.

---

## Block A — Workflow

### A.1 Canonical sources

The canonical source for each topic prevails on that topic. If two
documents conflict, do not turn `CLAUDE.md` into a copy of both:
cross-check the code and fix the outdated doc in its canonical
location.

| Topic | Canonical source |
|---|---|
| Product, audience, accessibility rules, non-negotiable principles (Sinonimia: easy-read writing rules, gamification, no-PWA rules) | [`doc/en/SPEC.md`](doc/en/SPEC.md) ↔ [`doc/es/SPEC.md`](doc/es/SPEC.md) |
| Project roles (user, support, build) and who reads what first | [`doc/en/roles.md`](doc/en/roles.md) ↔ [`doc/es/roles.md`](doc/es/roles.md) |
| Architecture, structure, activity anatomy, APIs, contracts, tests, deploy (Sinonimia: dictionary schema, gamification mechanics, identifiers kept in Spanish) | [`doc/en/technical.md`](doc/en/technical.md) ↔ [`doc/es/tecnico.md`](doc/es/tecnico.md) |
| Internationalization (App.i18n core, formatting, recipe to add a third language; Sinonimia: language-agnostic `js/app.js`) | [`doc/en/I18N.md`](doc/en/I18N.md) ↔ [`doc/es/I18N.md`](doc/es/I18N.md) |
| Activity catalog | [`doc/en/activities.md`](doc/en/activities.md) ↔ [`doc/es/actividades.md`](doc/es/actividades.md) |
| Activity creation guide | [`doc/en/creating-activities-guide.md`](doc/en/creating-activities-guide.md) ↔ [`doc/es/guia-crear-actividades.md`](doc/es/guia-crear-actividades.md) |
| Coverage and therapeutic guidance | [`doc/en/team.md`](doc/en/team.md) ↔ [`doc/es/equipo.md`](doc/es/equipo.md) |
| Roadmap and closed product decisions | Git only: every PR leaves a message; reconstruct with `git log`. |
| Human contribution flow | [`CONTRIBUTING.md`](CONTRIBUTING.md) ↔ [`CONTRIBUTING.es.md`](CONTRIBUTING.es.md) |
| AI agent operational flow | `CLAUDE.md` (this file) |
| Contents / TOC | [`doc/en/CONTENTS.md`](doc/en/CONTENTS.md) ↔ [`doc/es/CONTENIDOS.md`](doc/es/CONTENIDOS.md) |
| Cloudflare deploy / cache contract (network-first vs cache-first SW) | [`CLOUDFLARE.md`](CLOUDFLARE.md) |
| Doc index | [`doc/en/index.md`](doc/en/index.md) ↔ [`doc/es/indice.md`](doc/es/indice.md) |
| Quick guide | [`doc/en/quick-guide.md`](doc/en/quick-guide.md) ↔ [`doc/es/guia-rapida.md`](doc/es/guia-rapida.md) |

#### What this is

Sinonimia is a static, dependency-free plain-language dictionary. It
explains hard/technical words (bureaucratic, legal, health) using
short "lectura fácil" (easy-read) definitions, a synonym repeated
inside the same example sentence, and an ARASAAC pictogram. See
[`doc/en/SPEC.md`](doc/en/SPEC.md) (or [`doc/es/SPEC.md`](doc/es/SPEC.md))
for the full product definition — target audience, the easy-read
writing rules that every definition/example must follow, the
multi-language architecture, and the rules that govern the
gamification features. Read it before adding or editing dictionary
content; it is the source of truth, not this file.

One rule from `SPEC.md` worth surfacing here because it's easy to
break by accident when editing UI copy: the project's real objective
is occupational-therapy support for people with intellectual
disability, but **nothing user-facing may say so** — not in
`index.html`, not in any `I18N` string in `js/i18n.js`, in any
language. That framing only belongs in maintainer-facing docs
(`doc/*/SPEC.md`, this file, `CONTRIBUTING.md` /
`CONTRIBUTING.es.md`, `README.md` / `README.es.md`).
`scripts/check.js` enforces this with a blocklist scan over
`index.html` and `js/i18n.js` — it does not scan `js/data.*.js`, since
a dictionary entry about an actual disability-related bureaucratic
term (e.g. a disability-certificate procedure) would be legitimate
content, not a violation.

#### Commands

There is no build step, no package.json, and no test framework — it's
plain HTML/CSS/JS served as static files.

- **Preview**: open `index.html` directly in a browser, or serve the
  folder with any static server (e.g. `npx serve .`). Everything runs
  client-side.
- **Validate everything** (this repo's only "test" step, and what CI
  runs on every PR via `.github/workflows/check.yml`):
  ```
  node scripts/check.js
  ```
  It checks JS syntax, CSS brace balance, that every `ejemplo.palabra`
  / `ejemploSinonimo.palabra` is an exact (accent-insensitive)
  substring of its own `.texto` (word-highlighting and the
  fill-in-the-blank game silently fail to find it otherwise), that
  every `imagen.id` has a matching file in `img/`, that no dictionary
  entry has a duplicate `id`, that every `t()` key `js/app.js` uses
  exists in every `I18N` language block, and that every DOM id
  `js/app.js` looks up exists in `index.html`. It also enforces the
  no-disability-mention rule below by failing if `index.html` or
  `js/i18n.js` contain any blocklisted term. Read the script before
  changing the data-file format — it encodes the invariants that
  format relies on.
- **Planning new dictionary entries — don't read `js/data.<lang>.js`
  directly**: it's 1MB+/20,000+ lines per language, far too large to
  open wholesale just to check what a category already covers. Use
  `node scripts/estado-contenido.js --detalle --categoria <topic>
  --lang <es|en>` instead — scoped to the category+language you're
  about to work on, it lists every existing headword with its
  synonyms, definición and ejemplo, enough to avoid both duplicating
  a concept and recycling the same illustrative scenario across a
  category (see "Process for expanding content" in
  `doc/en/SPEC.md`). Reserve a direct read/grep of `js/data.<lang>.js`
  for surgical fixes to one already-located entry, never for planning
  what to add next.
- **Adding a pictogram for a new word**: search ARASAAC's public API
  — `https://api.arasaac.org/api/pictograms/es/search/<term>` — pick
  a non-schematic result whose keywords match, then download
  `https://static.arasaac.org/pictograms/<id>/<id>_500.png` into
  `img/<id>.png`. Images are licensed CC BY-NC-SA (Gobierno de Aragón
  / Sergio Palao); keep the attribution in the footer intact.

#### Architecture

**See [`doc/en/technical.md`](doc/en/technical.md) for the full
technical reference** — the file-by-file breakdown, the routing/state
model, the dictionary entry shape, the ARASAAC pictogram system, and
the gamification system. It also documents the project's language
policy (English for code/comments, Spanish/English for product
content) and the specific identifiers that are deliberately kept in
Spanish (dictionary schema field names, HTML/CSS identifiers,
`localStorage` keys, URL route segments) — read that list before
renaming anything, since those are shared data contracts, not stray
leftovers.

Quick orientation: `js/app.js` is a single IIFE holding the whole
client app (hash router, rendering, accessibility controls, both
games). It's intentionally language-agnostic — it only ever reads
`activeDictionary` (`= DICCIONARIOS[currentLanguage]`) and calls
`t(key)`, never a hardcoded string or a hardcoded language's data
file. `js/i18n.js` is UI copy only, `js/data.es.js`/`js/data.en.js`
are the actual dictionary content, and `doc/en/SPEC.md` (or
`doc/es/SPEC.md`) holds the non-negotiable content/UX rules
(easy-read writing rules, "never gate content behind a game", etc.).

### A.2 Mandatory workflow

This repo may receive changes from the user and from several parallel
sessions. Read the affected source files before editing; never
overwrite in-flight work — re-read the file and reconcile if it
changed since your last read. Update the canonical source for the
topic, not a copy in `CLAUDE.md`. Keep `i18n` parity per the I18N
docs. For activity changes, follow `technical.md` §9 **and read
[`creating-activities-guide.md`](doc/en/creating-activities-guide.md)
first** (didactic, gamification, persuasion and neuromarketing
techniques for our audience); if a guide rule conflicts with `technical.md`,
`technical.md` wins. Update the catalogs and guides it names. Keep
changes minimal and on-target; do not bundle unrelated refactors.

#### A.2.1 Session start

Run before any modification:

```bash
git status --short
git log --oneline -3
node scripts/check.js
```

Keep uncommitted changes that are not yours (A.3 covers destructive
ops). If `check.js` already fails, find out whether the failure
belongs to the in-flight work before adding new changes.

#### A.2.2 Before editing

1. Classify the task with the canonical-sources table in §A.1.
2. Read the relevant sections and the affected code files.
3. For UI, content, or activities, always check `SPEC.md` §3–§4 and
   `technical.md` §5.
4. Closed project plan lives in `git log`. The canonical doc to use
   depends on the topic, not on an external roadmap.

#### A.2.3 Before finishing

1. Always run `node scripts/check.js`.
2. Report only verifications you actually ran; flag remaining manual
   tests.

#### A.2.4 Scratch scripts and the repo root

The repo root only holds files that are part of the shipped site or
tracked docs (`index.html`, `404.html`, `wrangler.toml`, this file,
the READMEs, etc.). When you (the agent) need to explore —
batch-search ARASAAC for a list of candidate terms, dump corpus
entries to inspect them, prototype a fallback strategy — the scratch
script **must** live in
[`scripts/ingest/explore/`](scripts/ingest/README.md), named
`<topic>_<purpose>.js` (no leading dot). **Do not** write `.tmp_*.js`,
`scratch.js`, or any other throwaway `.js`/`.sh` directly under the
repo root, even if you plan to delete it in the same session —
`.gitignore` ignores it but the root is not a scratch directory. The
full rule and rationale are in
[`scripts/ingest/README.md`](scripts/ingest/README.md).

`scripts/ingest/` also holds the batch-ingestion pipeline
(`pipeline/`), batch/fix data files (`batches/`, `fixes/`) and
ephemeral artifacts (`one-off/`). Those are the maintainer's working
area, not the agent's. The agent should not add, edit, or move
anything under `scripts/ingest/` unless the user explicitly asks for
batch work.

### A.3 External and destructive operations

- A deploy (even to a temporary Cloudflare Pages preview) is a
  network operation: request explicit approval before running it.
  Commands are in `technical.md` §12.5.
- Never publish, push, or open/close external resources without an
  explicit request or authorization.
- Never delete or revert changes from the user or another session to
  simplify your task; integrate them or explain the conflict.

### A.4 Out of scope for this file

Do not add here: product principles, accessibility rules, dictionary
schema, gamification design, easy-read writing rules, roadmaps, or
chronicles of resolved bugs/implementations. Those belong to the §A.1
sources. Detailed change history lives in Git; `CLAUDE.md` must stay
brief, operational, and stable.

---

## Block B — Suite-wide policies

### B.1 Service worker cache

This project ships a service worker. **Behavior**: `sw.js` is
**cache-first** — every file in `ARCHIVOS` is served from the
cache; the network is only consulted when the request is not in
the cache. Same model as Calculia, Memofun, Okeymoney and Routime
(Teclatlon is the network-first exception; see its own `CLAUDE.md`).

**The cache is silent and persistent**. The developer sees a
change on a hard refresh, but users with the PWA installed keep
seeing the old version until either the SW itself is refreshed or
the cache is purged. The only reliable way to refresh the
deployed app after a new deploy is to bump `VERSION` in `sw.js`,
because the SW's `install` handler compares its `VERSION` against
the active cache name and only re-fetches + activates when they
differ.

**Rule — bump `VERSION` on every commit that touches any cached
file** (i.e. anything in `ARCHIVOS`, or a new file that should be
cached):

- Edit `sw.js` and increment the `VERSION` literal (e.g.
  `sinonimia-v1` → `sinonimia-v2`).
- Add any new file to `ARCHIVOS` at the same time.
- The `?v=` content-hash on `<script src="js/data.*.js">` (enforced
  by `scripts/check.js`) handles dictionary revisions independently
  — the SW caches the file with whatever `?v=` is on the tag at
  install time, and the next deploy ships the new tag, so a new
  dictionary revision picks up automatically without bumping
  `VERSION` as long as no other cached file changed.

The cost of bumping is one integer; the cost of not bumping is
"the deployed app keeps serving the old version after a deploy".
Bump liberally rather than conservatively. Full contract:
[`CLOUDFLARE.md`](CLOUDFLARE.md) § "Cache contract". This rule is
also the source of §A.2.3 step 2.

### B.2 Language policy

- **UI**: multilingual. Default locales are **Spanish (es)** and
  **English (en)**; es is the default and the source of truth for
  every product decision that is not dictated by maintainers. The
  architecture is intentionally language-agnostic: `js/app.js` never
  reads a hardcoded language's data file — it goes through
  `DICCIONARIOS[currentLanguage]` and `t(key)`, so adding a third
  language requires **no changes to `js/app.js`** (see
  [`doc/en/I18N.md`](doc/en/I18N.md) or
  [`doc/es/I18N.md`](doc/es/I18N.md) for the step-by-step).
- **Technical code**: **always English** — variables, functions,
  identifiers, comments, and commit messages. UI text lives in
  `js/i18n.js` (one `I18N.<lang>` block per language); dictionary
  content lives in `js/data.<lang>.js`. Identifiers that are
  deliberately kept in Spanish are listed in `doc/en/technical.md`
  (e.g. dictionary schema field names, `localStorage` keys, URL route
  segments) — read that list before renaming anything, since those
  are shared data contracts.
- **Product changes apply to all locales by default**: any change to
  product content (UI strings, dictionary entries, examples,
  pictograms, game copy, accessibility labels, catalog entries, etc.)
  **must be applied to every supported locale** — at minimum `es`
  and `en`. Spanish (`es`) is the source of truth when not dictated
  otherwise; English (`en`) must keep parity. If a new locale is
  added, the same change applies there too. Never ship a product
  change that exists only in one language.
- **Self-test for "did I cover both languages?"**: search the new
  string or data shape in the `es` files, then the `en` files; if
  the `es` change has no `en` mirror (or vice versa), it is not
  done. `scripts/check.js` enforces key parity of `t()` keys in
  `js/i18n.js` (it fails if `js/app.js` calls a key missing from any
  `I18N` block) but does not enforce translation quality or
  dictionary-parity — proofread both.

### B.3 UNE 153101 reference

All seven sibling projects follow **UNE 153101:2018 EX** (Spanish
easy-read standard) and Inclusion Europe's European easy-read
guidelines as the normative basis for the cognitive accessibility
principles that guide content and UI: short sentences, one idea per
sentence, everyday vocabulary, no clinical or technical jargon in
what the end user reads. This is the standard each `SPEC.md` cites
when it states the "easy read always" rule (see `doc/en/SPEC.md`
§3.3 or its mirror in `doc/es/SPEC.md` §3.3). Adding a new language
or a new piece of UI copy means following UNE 153101 — not
paraphrasing it.

### B.4 WCAG AAA baseline

This project conforms to WCAG 2.1 at **AA minimum** and adopts the
**AAA criteria that apply to the suite's audience** whenever feasible.
Full conformance at AAA is not feasible for a whole web application
(the W3C itself states AAA is meant for specific contexts); the list
below enumerates the AAA criteria that ARE applicable and that this
project honours.

Adopted AAA criteria:

- **1.4.6 Contrast (Enhanced)** — text ≥ 7:1 (large text ≥ 4.5:1).
  WCAG AA is the floor; AAA is the design target. Okeymoney is the
  suite's verified reference for this criterion (`#F2F4F8` on
  `#161A21` = 14.6:1, `#B7BDC9` on `#161A21` = 8.4:1).
- **3.1.5 Reading Level** — already covered by UNE 153101 (§B.3)
  and applied to the dictionary's `definicion` and `ejemplo` fields.
- **1.4.1 Use of Color** — color is never the only channel. Feedback
  states (success / hint / error) also use shape, icon, text or
  sound.

The literal phrase **"WCAG AA minimum, AAA whenever possible"** lives
in `doc/en/SPEC.md` §3.6 / §5 (mirror in `doc/es/SPEC.md`). This
section mirrors the metaproject's `apptonomia/CLAUDE.md`.

### B.5 Public-facing wording: "persona tipo" euphemism

Applies to the whole Miralante suite and the `apptonomia.uk`
landing. The suite's real objective lives in internal docs; public
surfaces use **"persona tipo"** instead.

#### B.5.1 Where each term is allowed

- **"Discapacidad intelectual"** / **"intellectual disability"** —
  internal docs only (`CLAUDE.md`, `doc/<lang>/SPEC.md`,
  `technical.md` / `tecnico.md`, `roles.md`, `CONTRIBUTING.md`,
  `CONTRIBUTING.es.md`, `scripts/`). Forbidden in any public-facing
  surface, README, talk, press note or marketing material.
- **"Persona tipo"** — public surfaces only (`README.md`,
  `README.es.md`, talks, social copy, press notes, marketing,
  contributor-facing docs that double as public description, e.g.
  `CONTRIBUTING.md`).
- It does **not** apply to the UI of the app itself: each project's
  zero-mention rule (`doc/en/SPEC.md` §3.4 / `doc/es/SPEC.md` §3.4)
  forbids **any** mention — including "persona tipo" — in
  `index.html`, `app.js`, `strings.<locale>.js`, `js/i18n.js`,
  `about/privacidad.html`, etc.
- It does **not** apply to content that names a clinical concept
  by its real-world name (e.g. a dictionary entry about a disability
  certificate): that is content, not audience labelling.

#### B.5.2 Rationale

Maintainer docs describe the project's real purpose so contributors
can serve it. Public surfaces describe the audience generically via
"persona tipo" without publicly naming a clinical group. This rule
is mirrored in `apptonomia/CLAUDE.md` and every sibling's
`CLAUDE.md` / `SPEC.md`.

### B.6 graphify

This project has a knowledge graph at `graphify-out/` with god nodes,
community structure, and cross-file relationships.

- For codebase questions, first run `graphify query "<question>"`
  when `graphify-out/graph.json` exists. Use `graphify path "<A>"
  "<B>"` for relationships and `graphify explain "<concept>"` for
  focused concepts. These return a scoped subgraph, usually much
  smaller than `GRAPH_REPORT.md` or raw grep output.
- If `graphify-out/wiki/index.md` exists, use it for broad
  navigation instead of raw source browsing.
- Read `graphify-out/GRAPH_REPORT.md` only for broad architecture
  review or when `query`/`path`/`explain` do not surface enough
  context.
- After modifying code, run `graphify update .` to keep the graph
  current (AST-only, no API cost).
