# Guide to creating activities

> **How to design and add new content to Sinonimia: dictionary
> entries, games and games variants.**
>
> Sinonimia's "activities" are the **dictionary entries** (the main
> activity) and the two short **games** built on top of them. The
> pedagogical work happens when you write a good entry; the games
> themselves are fixed and consume whatever the dictionary has.
>
> This document does **not** duplicate the canonical pedagogical
> guide shared by the suite; it points to it and only lists what's
> specific to Sinonimia. If a rule here clashes with the canonical
> guide or with `technical.md`, `technical.md` wins.

---

## 1. The canonical pedagogical guide

The full didactic, gamification, persuasion and neuromarketing
techniques that all the apps of the Miralante suite share live in the
**Routime** repository under
[`creating-elements-guide.md`](https://github.com/thenkdframe/routime/blob/main/doc/en/creating-elements-guide.md).

Read it before designing anything. It covers (non-exhaustive):

- The 13 mandatory accessibility rules (with the rationale for each).
- The Socratic-method hint ladder (clue → bigger clue → answer).
- The positive-feedback palette (sounds, animations, micro-copy).
- The neuromarketing patterns adapted to the audience.
- The level-design checklist (Easy → Medium → Hard progression).

## 2. What's specific to Sinonimia

### 2.1 The unit of content is the entry, not the activity

Don't add a new "activity" folder for every topic. Add a new
**dictionary entry** to the right topic in `js/data.<lang>.js`. The
games (Match, Order) automatically pick up the new entry on the
next load.

If you genuinely need a new game mode (e.g. a new exercise type
that the runtime doesn't support), that's an engineering change, not
a content change — discuss it with the build role before opening a
PR.

### 2.2 The entry anatomy

Each entry follows the schema in [`technical.md`](technical.md) §"Data
model". Minimum required fields:

- `palabra` (the word itself, in the dictionary's language).
- `definicion` (easy-read definition, see [`SPEC.md`](SPEC.md)).
- `ejemplo` (an example sentence in the same language).
- `categoria` (one of the topics listed in
  [`activities.md`](activities.md) §1).
- `pictograma` (a pictogram reference; find it with
  `node scripts/search-pictogram.js`).

Optional fields:

- `traduccion` — closest equivalent(s) in another language
  (one-to-many is allowed).
- `notas` — internal notes, not shown to readers.

### 2.3 The "word must be hard in its own language" rule

This is the single most important editorial rule (see
[`SPEC.md`](SPEC.md) "Process for expanding content"). Sinonimia
**does not translate word-for-word** between dictionaries: each
language picks the words that are genuinely hard **in that
language**. A Spanish bureaucratic term that has no English
equivalent (and vice versa) is a normal and expected case.

### 2.4 Easy-read rules apply to every entry

The dictionary **is** the user-facing product. Every entry must
follow:

- **One idea per sentence** in the definition.
- **Everyday vocabulary** (no clinical or technical jargon left
  unexplained).
- **Short sentences** (see UNE 153101 rules summarised in
  [`SPEC.md`](SPEC.md)).
- **No clinical labels** about the reader (the entry never says "for
  people with X").

These rules apply equally to the example sentence and to the
optional translation.

### 2.5 The "Mis frases" feature is reader content, not editor content

The reader's own sentences ("Mis frases") are stored in the
reader's `localStorage` and never become dictionary entries. The
support role does not curate them; if a reader writes a sentence
that exposes a vocabulary gap, the right next step is to **add a
proper entry to the dictionary**, not to copy the reader's
sentence into it.

## 3. How to find candidate words

Writing an entry starts with a real candidate word. This section
explains where to look, what each source contributes, and what
criteria a word must meet to be accepted. **A source only proposes
words: it never decides by itself that a word merits an entry** —
that's always a human call.

To avoid duplicating a word, a synonym, or an example scenario, check
what already exists in the category you're targeting first:

```sh
node scripts/content-status.js
node scripts/content-status.js --detalle --categoria {categoria} --lang {idioma}
```

Do not open `js/data.{idioma}.js` directly; the files are very large.

### 3.1 Sources and what each is for

| Source | Contribution | How it's used |
|---|---|---|
| [Kaikki.org](https://kaikki.org/) | Wiktionary extract: Spanish lemmas (`lang_code === "es"`), inflected forms, and a proper-noun signal (`pos: "name"`). | Backbone of `es_list_clean.js` and of the ingestion's proper-noun filter (`proper-noun-check.js`). |
| [FrequencyWords](https://github.com/hermitdave/FrequencyWords) | General usage frequency (OpenSubtitles). | Prioritizes candidates; cached as `scripts/download/freq-es.txt`. |
| [Wikimedia](https://dumps.wikimedia.org/eswiktionary/latest/) | Raw Spanish Wiktionary titles. | Widens Kaikki's word coverage. Not Spanish-only (Spanish Wiktionary holds pages in other languages too), so it's always combined with Kaikki's `lang_code === "es"` filter. Keeps the [CC BY-SA](https://foundation.wikimedia.org/wiki/Policy:Terms_of_Use) license. |
| [ARASAAC](https://api.arasaac.org/) | Pictogram bank. | Pictograms for every entry, and also a direct candidate source (method D). |
| [OpenSymbols](https://www.opensymbols.org/) | Aggregator of several open-licensed symbol banks (ARASAAC, Sclera, Mulberry...) behind one API. | `search-pictogram.js`'s first choice (with `OPENSYMBOLS_SECRET`); falls back to ARASAAC when empty. Each bank carries its own license — check it on every result before using it. |
| [Wikipedia](https://www.wikipedia.org/) | Thematic categories (legal, medical, financial...). | Grouped term lists (method E). |
| [listapalabras.com](https://www.listapalabras.com/) | Alphabetical list of 87,363 unique Spanish headwords (does not cover `Ñ`). | A raw word universe with no category of its own. `es-candidates-listapalabras.js` filters only by difficulty criteria (criteria 1-5: valid word shape, not already covered, not a proper noun, not too common, not already declined) — never by domain category (see the 2026-09-09 note on criterion 6 below). The result is ~66,600 real candidates, sorted with a root/suffix hint (not a filter) so the highest-signal ones get reviewed first. Fully processed — details in `scripts/ingest/PROGRESS.md`'s listapalabras.com section. |

### 3.2 Criteria for accepting a word

1. **Real and documented.** In current use; drop archaisms, dialect forms, and rare loans.
2. **Genuinely hard.** Nothing the target user already understands. Frequency is a guide, not the sole measure; CEFRLex/ELELex helps rule out A1-A2 vocabulary, but its absence doesn't invalidate a specialized word. Automatic reject: everyday concrete nouns (table, duck), direct action verbs (eat, sleep), and early-acquisition basic vocabulary — none of these need an adapted definition. Conversely, abstract or intangible concepts (legend, warranty) and words with a double meaning or figurative sense are good candidates even when their general frequency is high: this applies with any method in section 3.3, not just method F (which catches it specifically per sense). In bulk sourcing (method C), this automatic rejection is enforced by `scripts/ingest/pipeline/filters/common-words.js`, deliberately conservative — see its header.
3. **Independent lemma.** No conjugations, plurals, or enclitic-pronoun forms lacking their own entry.
4. **No proper nouns.** People, surnames, cities, countries, brands.
5. **No existing coverage, unless it's a genuine homonym.** Drop it as a new entry if it already expresses the same concept as an existing one. But "same concept" isn't the same as "already covered": if the target user could run into this exact word in a real document, and it doesn't yet appear as the `palabra`, a `sinonimo`, or inside the `ejemplo` of that existing entry, don't just drop it — add it to that entry's `sinonimos` array. The app's search indexes that array (`matchesSearch` in `js/app.js`), so a real synonym left out of it is invisible to anyone who looks it up, even though the concept is "covered" in the entry. A second meaning just as hard is a legitimate candidate — a new entry with its own `id`/`situacion`/`definicion`, never a parenthetical clarifier in `palabra` (see "Words with double meaning" in `SPEC.md`). Once a word is accepted, check all of its hard senses, not just the first one you find. In bulk sourcing, this cross-check is enforced by `scripts/ingest/pipeline/filters/sinonimia-coverage.js`, which only catches an exact string match — deciding whether a real synonym deserves adding to the array even when the filter doesn't flag it as covered is still human work.
6. **Category: assigned, never filtered on.** A word that passes criteria 1-5 gets incorporated even if no AIVD category fits it today — don't reject it or force it into the least-bad category. If nothing fits, not even `vida-diaria`, propose a new category; you don't need a cluster of similar candidates, one well-grounded word is enough. `vida-diaria` stays valid only when it's genuinely the best fit, never the place a word lands for lack of anywhere better. Creating the category is the maintainer's call, but the proposal must be explicit — never drop the word silently. The methods in section 3.3 that use a category to cut a huge list down to size (E and F, especially) are *discovery* techniques, not the acceptance criterion: a word absent from every cross-referenced category isn't thereby rejected on difficulty, it just means that technique didn't surface it. And the reverse also holds: the category tag a word *does* surface under in method E or F (e.g. a Wikipedia or Wiktionary category named "Law") is a hint of where to look, never the final `situacion` — review each candidate on its own merits first (criteria 1-5), then decide its category with this same criterion 6, even if it ends up different from the tag that surfaced it.
7. **Its own scenario.** Don't reuse the same example context within a category.
8. **Length as a guide.** 4-12 letters as an initial heuristic, not an absolute rule.

No automated filter replaces human review. Topic filters based on substring matches create false positives: sharing letters with a legal stem doesn't mean a semantic link.

### 3.3 Search methods

**A. Domain corpus and *keyness*.** The main method for one specific category. Collect 15-30 real excerpts under `dev/corpus/` (sources in section 3.5) and run:

```sh
node scripts/corpus-candidates.js dev/corpus/{categoria}-{idioma}.txt {idioma} 40
```

It compares corpus frequency against general language and prioritizes domain-specific words. It has worked well with employment contracts, payslips, severance letters, utility bills, property deeds, land-registry extracts, and mortgages.

**B. Existing plain-language glossaries.** Find an official glossary that explains terms simply (section 3.5 is a starting point; verify it's still available). Don't copy definitions: write original Sinonimia wording and keep only what fits the project.

**C. General word list, filtered only by difficulty.** For broad expansion, not one category. Combine general vocabulary sources (Kaikki, Wikimedia, listapalabras.com, frequency) and filter only by section 3.2's criteria 1-5 (valid word shape, not already covered, not a proper noun, not too common, not already declined) — never by whether a word happens to show up in an external domain category, see the 2026-09-09 note on criterion 6 at the end of this section. Review the result word by word; a domain-characteristic root or suffix (method F, or `shared/domain_stems.js`) can decide review order, never which words get discarded without review. CEFRLex/ELELex shouldn't be required for highly specialized legal, medical, or bureaucratic vocabulary: it may be absent from graded readers. The general Kaikki/Wikimedia/frequency scripts for both languages were retired 2026-09-09 once exhausted (see `scripts/ingest/PROGRESS.md`); `es-candidates-listapalabras.js` is now the only live implementation of this method.

**D. ARASAAC as a candidate source.**

```text
https://api.arasaac.org/api/pictograms/{language}/new/20000
```

Drop `schematic: true`, cross-reference with `content-status.js`, and check both meaning and image. The bank holds a lot of everyday AAC vocabulary that needs discarding. Useful categories: `law`, `financial services`, `public administration`, `disease`, `medical procedure`, `information technology`, `road safety`, `security and defense`.

**E. Wikipedia categories.**

```text
https://{es|en}.wikipedia.org/w/api.php?action=query&list=categorymembers&cmtitle=Category:{category}&cmlimit=500&format=json
```

Paginate with `cmcontinue`, strip parenthetical disambiguators, discard list/portal pages, check real-world use. Specific consumer-facing categories (contracts, taxes, insurance, mortgages, consumer protection, e-commerce) beat broad academic ones. Never use `Category:Disability` as a mass source.

**F. Wiktionary sense-domain categories.** Wikipedia groups *articles*, so a common word with one hard technical sense rarely shows up. Wiktionary tags each *sense* by domain instead, which does catch these polysemous words:

```text
https://{es|en}.wiktionary.org/w/api.php?action=query&list=categorymembers&cmtitle=Categoría:ES:{domain}&cmlimit=500&format=json
```

A hit here only confirms *one sense* qualifies: check which one before drafting, and write the entry for that sense only. It's also the best way to check whether a word already covered has another sense worth its own entry.

**2026-09-09 (maintainer directive): the script dedicated to this
method (`wiktionary_candidates.js`, with its `PLAN`,
`--list-categories`, and `--exhaustive`) was removed from the project
entirely.** Not because querying Wiktionary's category API is wrong —
as a *discovery* technique for a bounded batch of words to review by
hand it's still legitimate — but because in practice its output was
being cross-referenced against other word lists
(`es-candidates-listapalabras.js`, method C) as an **exclusion
filter** that discarded, without review, any word with no category
match — the exact opposite of what criterion 6 says. Sinonimia's
editorial criterion is a word's actual difficulty (criteria 1-5),
never whether an external category — unstable, incomplete, and
inconsistent run to run, see `scripts/ingest/PROGRESS.md` — happened
to tag it. If this technique gets rebuilt in the future, it must
*annotate* a candidate list already selected by difficulty, never
*select* it.

### 3.4 Glossaries and corpora by category

| Category | ES / EN glossaries | ES / EN corpus |
|---|---|---|
| `tramites` | Plan de Lenguaje Claro de la AGE / plainlanguage.gov | BOE, tax and social-security letters / IRS, HMRC |
| `salud` | MedlinePlus / MedlinePlus, NIH | Patient leaflets, discharge summaries, consent forms |
| `vida-diaria` | Plena Inclusión, Easy-to-Read Europe / same | Appliance manuals, residents' notices, public transport |
| `finanzas` | Finanzas para Todos, CNMV / US CFPB | Bank statements, loans, banking products |
| `vivienda` | OCU / US HUD | Leases, deeds, mortgages, utilities |
| `trabajo` | SEPE / ACAS, US Department of Labor | Payslips, employment contracts, leave letters |
| `legal` | Plan de Lenguaje Claro de Justicia / US court self-help glossaries | Judgments, court notices, notarial documents |
| `tecnologia` | INCIBE, ONCE, IMSERSO / GCFGlobal, AARP | App help, terms of use, smartphones |
| `seguridad` | Protección Civil, 112, Red Cross / Ready.gov, OSHA | Evacuation, first aid |

### 3.5 Pictogram warnings

Always inspect the pictogram by hand. Literal keyword matching can return another meaning: an electricity-related word may produce an electric wheelchair, `cuentas` may produce beads, and `court` a tennis court.

If the chosen pictogram isn't from ARASAAC (for example, an OpenSymbols result from another bank), update the footer credits with the right license.

## 4. Batch tracking (bulk ingestion)

When one of the section 3.3 techniques produces many candidates at
once (especially methods C and F), the resulting entries are staged
as a **batch**
(`scripts/ingest/batches/batch_<lang>_<categoria>_<n>.js`) instead of
being written straight into `js/data.<lang>.js` one by one. A batch
moves through these stages — the script-by-script detail lives in
[`scripts/ingest/README.md`](../../scripts/ingest/README.md):

```
draft → validar-batch → dedupe-batch → ingesta_batch/insertar-batch
      → inject-batch-translations (ES→EN link) → fix_pictos (if needed)
      → delete the batch file
```

The last step is the one that doesn't always happen reliably by
hand, so `scripts/ingest/batches/` can accumulate files that are
actually already in the dictionary.

### 4.1 Checking a batch's status

```sh
node scripts/ingest/pipeline/estado-lotes.js            # one line per batch file
node scripts/ingest/pipeline/estado-lotes.js --detalle   # + which words in a batch are still pending
```

For each `batches/batch_<lang>_*.js` file, it cross-references every
entry (by `palabra`, or by `id` when present) against
`js/data.<lang>.js` and classifies it as:

- **LANDED (safe to delete)** — every entry in the batch already
  exists in the dictionary. The canonical content lives in
  `js/data.<lang>.js`, not in the batch file.
- **PARTIAL (needs attention)** — some entries landed, some didn't.
  Either the pipeline was interrupted mid-run, or the file was
  hand-edited with new entries after an earlier batch from it already
  landed. Run with `--detalle` to see which words are still pending,
  then decide by hand whether to finish inserting them or drop them.
- **PENDING (not run through the pipeline)** — nothing in the batch
  is in the dictionary yet. A genuine backlog item.
- **ERROR** — the file doesn't `require()` cleanly (syntax error, or
  it isn't a `module.exports = [...]` array). Needs a manual look
  before trusting any other classification.

This is always computed against the current `js/data.<lang>.js`,
never against a fixed snapshot: a batch's status changes every time
the pipeline runs, so a hand-written table would go stale before the
next batch.

### 4.2 Pitfall: CRLF breaks naive in-place edits

`js/data.es.js` and `js/data.en.js` use **CRLF** (`\r\n`) line
endings. Any pipeline script that replaces a field in place by
searching for a literal `"...,\n"` to find where it ends will get
`indexOf(...) === -1` on this repo's real files; if that `-1` feeds
into further arithmetic without a check (`-1 + 2 = 1`, then
`src.slice(1)`), the "replace" silently turns into "keep almost the
entire rest of the file and reappend it after the new field" — on
every call. Checkpointing the file after each batch compounds it
fast.

Any new script that touches these files in place must anchor field
boundaries with a regex matched against the field's real shape (see
`IMAGEN_FIELD_RE` in `scripts/ingest/pipeline/resustituir-pictos.js`
or `scripts/ingest/pipeline/fix_pictos.js`), never a bare newline
search.

## 5. The technical recipe

With the word chosen, write the entry using SPEC.md's easy-read
rules and add it by editing `js/data.<lang>.js` (and **only** that
file). The validator (`scripts/check.js`) runs over every language in
a single pass and will reject:

- An entry that doesn't match the schema.
- An entry whose topic is not in the catalogue.
- A duplicate word in the same language.
- An entry missing the easy-read rule checks described in
  [`SPEC.md`](SPEC.md).

Before opening the PR:

```sh
node scripts/search-pictogram.js <word> <language>
node scripts/content-status.js --detalle --categoria <categoria> --lang <lang>
node scripts/check.js
```

## 6. Compliance checklist before opening a PR

- [ ] Word chosen is genuinely hard **in this language**, not a
      word-for-word translation of a Spanish/English entry.
- [ ] Entry follows the schema in
      [`technical.md`](technical.md) §"Data model".
- [ ] Definition is easy-read (one idea per sentence, short, plain
      words).
- [ ] Example sentence uses the word in a concrete, real-life
      context.
- [ ] Pictogram found and inspected
      (`node scripts/search-pictogram.js`).
- [ ] No duplicate of an existing entry in the same language and
      topic.
- [ ] `node scripts/check.js` passes.

## 7. See also

- Canonical pedagogical guide (Routime):
  [creating-elements-guide.md](https://github.com/thenkdframe/routime/blob/main/doc/en/creating-elements-guide.md).
- Languages:
  [`languages.md`](languages.md).
- Technical recipe:
  [`technical.md`](technical.md).
- Product non-negotiables:
  [`SPEC.md`](SPEC.md).
- Catalogue of words and games:
  [`activities.md`](activities.md).
