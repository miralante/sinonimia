# CLAUDE.md — AI agent workflow

## About this project

Sinonimia is an **easy-read dictionary for difficult words** — from public administration, justice and health, plus a smaller `conocimiento` ("general knowledge") section for everyday abstract or scientific vocabulary. Every entry is written to be understood on the first read, taking nothing for granted. It is one of the seven siblings of the Apptonomia suite.

## Other projects in the Apptonomia suite

This project is one of seven siblings. The rest of the suite (paths
relative to this folder, all under `Miralante/`):

- **Apptonomia** — the metaproject root and the public landing at https://apptonomia.uk/, linking out to each sibling app. Folder: [`../apptonomia/`](../apptonomia/) · CLAUDE.md: [`../apptonomia/CLAUDE.md`](../apptonomia/CLAUDE.md)
- **Calculia** — math and logical reasoning with short, visual activities. Folder: [`../calculia/`](../calculia/) · CLAUDE.md: [`../calculia/CLAUDE.md`](../calculia/CLAUDE.md)
- **Memofun** — study flashcards for autonomous review, one idea per card. Folder: [`../memofun/`](../memofun/) · CLAUDE.md: [`../memofun/CLAUDE.md`](../memofun/CLAUDE.md)
- **Okeymoney** — personal finance and everyday financial autonomy, with a personal-finance simulator. Folder: [`../okeymoney/`](../okeymoney/) · CLAUDE.md: [`../okeymoney/CLAUDE.md`](../okeymoney/CLAUDE.md)
- **Sinonimia** *(this project)* — easy-read dictionary of difficult words, with synonyms and ARASAAC pictograms.
- **Teclatlon** — touch typing on the physical computer keyboard, finger by finger. Folder: [`../teclatlon/`](../teclatlon/) · CLAUDE.md: [`../teclatlon/CLAUDE.md`](../teclatlon/CLAUDE.md)
- **Routime** — everyday activities to train mind and daily-life skills between sessions. Folder: [`../routime/`](../routime/) · CLAUDE.md: [`../routime/CLAUDE.md`](../routime/CLAUDE.md)

This file provides guidance to Claude Code (claude.ai/code) when working
with code in this repository. It is intentionally short and stable;
anything that grows beyond a short rule belongs in the canonical sources
listed in §A.1.

The document is split in two blocks:

- **Block A — Workflow** (§A.1 … §A.4): rules that govern *how* an
  agent edits this repo (canonical sources, mandatory workflow,
  external/destructive operations, scope of the file).
- **Block B — Suite-wide policies** (§B.1 … §B.5): inherited rules
  from the Miralante metaproject that also apply here (service worker
  cache, language policy, accessibility pointer to `spec.md`,
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
| Product, audience, accessibility rules, non-negotiable principles (Sinonimia: easy-read writing rules, gamification, no-PWA rules) | [`doc/en/spec.md`](doc/en/spec.md) ↔ [`doc/es/spec.md`](doc/es/spec.md) |
| Project roles (user, support, build) and who reads what first | [`doc/en/roles.md`](doc/en/roles.md) ↔ [`doc/es/roles.md`](doc/es/roles.md) |
| Architecture, structure, activity anatomy, APIs, contracts, tests, deploy (Sinonimia: dictionary schema, gamification mechanics, identifiers kept in Spanish) | [`doc/en/technical.md`](doc/en/technical.md) ↔ [`doc/es/tecnico.md`](doc/es/tecnico.md) |
| Internationalization (App.i18n core, formatting, recipe to add a third language; Sinonimia: language-agnostic `js/app.js`) | [`doc/en/i18n.md`](doc/en/i18n.md) ↔ [`doc/es/i18n.md`](doc/es/i18n.md) |
| Activity catalog | [`doc/en/activities.md`](doc/en/activities.md) ↔ [`doc/es/actividades.md`](doc/es/actividades.md) |
| Coverage and therapeutic guidance | [`doc/en/team.md`](doc/en/team.md) ↔ [`doc/es/equipo.md`](doc/es/equipo.md) |
| Roadmap and closed product decisions | Git only: every PR leaves a message; reconstruct with `git log`. |
| Human contribution flow | [`CONTRIBUTING.md`](CONTRIBUTING.md) ↔ [`CONTRIBUTING.es.md`](CONTRIBUTING.es.md) |
| AI agent operational flow | `CLAUDE.md` (this file) |
| Contents / TOC | [`doc/en/contents.md`](doc/en/contents.md) ↔ [`doc/es/contenidos.md`](doc/es/contenidos.md) |
| Cloudflare deploy / cache contract (network-first vs cache-first SW) | [`CLOUDFLARE.md`](CLOUDFLARE.md) |
| Doc index | [`doc/en/index.md`](doc/en/index.md) ↔ [`doc/es/indice.md`](doc/es/indice.md) |
| Quick guide | [`doc/en/quick-guide.md`](doc/en/quick-guide.md) ↔ [`doc/es/guia-rapida.md`](doc/es/guia-rapida.md) |

#### What this is

Sinonimia is a static, dependency-free plain-language dictionary. It
explains hard/technical words (bureaucratic, legal, health) using
short "lectura fácil" (easy-read) definitions, a synonym repeated
inside the same example sentence, and an ARASAAC pictogram. See
[`doc/en/spec.md`](doc/en/spec.md) (or [`doc/es/spec.md`](doc/es/spec.md))
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
  `node scripts/content-status.js --detalle --categoria <topic>
  --lang <es|en>` instead — scoped to the category+language you're
  about to work on, it lists every existing headword with its
  synonyms, definición and ejemplo, enough to avoid both duplicating
  a concept and recycling the same illustrative scenario across a
  category (see "Process for expanding content" in
  `doc/en/spec.md`). Reserve a direct read/grep of `js/data.<lang>.js`
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
are the actual dictionary content, and `doc/en/spec.md` (or
`doc/es/spec.md`) holds the non-negotiable content/UX rules
(easy-read writing rules, "never gate content behind a game", etc.).

### A.2 Mandatory workflow

This repo may receive changes from the user and from several parallel
sessions. Read the affected source files before editing; never
overwrite in-flight work — re-read the file and reconcile if it
changed since your last read. Update the canonical source for the
topic, not a copy in `CLAUDE.md`. Keep `i18n` parity per the I18N
docs. For activity changes, follow `technical.md` §9 **and read
[`creating-elements-guide.md`](doc/en/creating-elements-guide.md)
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

#### A.2.5 Token discipline during batch ingestion

When the user does ask for batch work: only three steps in the
ingestion pipeline may spend tokens — deciding which candidate words
to accept, writing their `definicion`/`sinonimos`/`ejemplo`/
`ejemploSinonimo`/`alt`, and visually verifying an ARASAAC pictogram
before trusting it. Every other step (scraping, filtering, deduping,
slugifying an `id`, searching/downloading pictograms, appending to
`js/data.<lang>.js`, injecting `traduccion` links, bumping `?v=` /
`sw.js VERSION`) **must** run through a script — reuse one under
`scripts/ingest/pipeline/`, or extend one with a minimal flag, rather
than reasoning through the equivalent work by hand. Full rule and
rationale: [`scripts/ingest/README.md`](scripts/ingest/README.md)'s
"Token discipline" section.

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

`sw.js` is **cache-first**: every file in `FILES` is served from
the cache; the network is only consulted when the request is not in
the cache. The cache is silent and persistent — users with the PWA
installed keep seeing the old version after a deploy until `VERSION`
in `sw.js` is bumped. **Rule**: bump `VERSION` on every commit that
touches any file in `FILES`, and add any new file to `FILES` at the
same time. Run `node scripts/check-version-bump.js` to verify the
bump is consistent. Full contract: [`CLOUDFLARE.md`](CLOUDFLARE.md)
§ "Cache contract".

### B.2 Language policy

- **UI**: multilingual. Default locales are **Spanish (es)** and
  **English (en)**; es is the default and the source of truth for
  every product decision that is not dictated by maintainers. The
  architecture is intentionally language-agnostic: `js/app.js` never
  reads a hardcoded language's data file — it goes through
  `DICCIONARIOS[currentLanguage]` and `t(key)`, so adding a third
  language requires **no changes to `js/app.js`** (see
  [`doc/en/i18n.md`](doc/en/i18n.md) or
  [`doc/es/i18n.md`](doc/es/i18n.md) for the step-by-step).
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

### B.3 Accessibility & public-facing wording (pointer)

The canonical source for UNE 153101 / easy-read, WCAG AA + AAA
baseline, and the public-facing "persona tipo" euphemism is
[`doc/en/spec.md`](doc/en/spec.md) §3.3 / §3.4 / §3.6 / §5 (mirror
[`doc/es/spec.md`](doc/es/spec.md)). Per `§A.1`, those are the
authoritative documents for product, audience and accessibility
rules — `CLAUDE.md` does not duplicate them here.

### B.4 graphify

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

### B.5 GEO, AEO and LLMO (suite-wide reference)

This project follows the suite-wide GEO/AEO/LLMO layers defined in
[`../apptonomia/doc/en/guia-de-cumplimiento.md` §7](../apptonomia/doc/en/guia-de-cumplimiento.md#7-geo-aeo-and-llmo-search--answer-engine--and-llm-visibility)
↔ [`../apptonomia/doc/es/guia-de-cumplimiento.md` §7](../apptonomia/doc/es/guia-de-cumplimiento.md#7-geo-aeo-y-llmo-presencia-en-buscadores-answer-engines-y-llms)
and summarised in [`../apptonomia/CLAUDE.md` §B.6](../apptonomia/CLAUDE.md#b6-geo-aeo-and-llmo-search--answer-engine--and-llm-visibility):

- **GEO** — six `<meta name="DC.*">` rendered by `scripts/build-head.js`
  from `app.config.json > dc*` (geography-agnostic, Dublin Core).
- **AEO** — `FAQPage` JSON-LD injected into the existing `@graph` by
  `scripts/build-head.js`, with 3–5 `{question, answer}` pairs sourced
  from `app.config.json > faq[]`. No visible FAQ block on the landing.
- **LLMO** — `/llms.txt` at the project root, linked from `<head>`
  via `<link rel="alternate" type="text/markdown">`, generated by
  `scripts/build-llms-txt.js` from `app.config.json > llms*`. Plus a
  known-AI-crawler allowlist (GPTBot, ClaudeBot, CCBot, Google-Extended,
  Applebot-Extended, PerplexityBot, anthropic-ai, cohere-ai, Claude-Web)
  in `robots.txt`.

`scripts/check.js` enforces the four gates (Dublin Core count,
`FAQPage` node, `llms.txt` existence, AI-crawler UA list). The
canonical source for the policy is the metaproject's guide §7.


