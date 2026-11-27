# Guide to creating entries

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
Apptonomia's canonical guide at
[`creating-elements-guide.md`](https://github.com/miralante/apptonomia/blob/main/doc/en/creating-elements-guide.md).

Read it before designing anything. It covers (non-exhaustive):

- Principles for clear learning objectives and audience adaptation.
- Accessibility and comprehension guidance for instructions and interactions.
- A graduated hint sequence, responses to mistakes and respectful reinforcement.
- Responsible gamification without pressure or penalties.
- A pre-publication checklist.

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
  (one-to-many is allowed). When the equivalent headword exists in the
  other dictionary, link both records with `traduccion`; add the
  reciprocal link if it is missing.
- `notas` — internal notes, not shown to readers.

### 2.3 The "word must be hard in its own language" rule

This is the single most important editorial rule (see
[`SPEC.md`](SPEC.md) "Process for expanding content"). Sinonimia
**does not translate word-for-word** between dictionaries: each
language picks the words that are genuinely hard **in that
language**. A Spanish technical or bureaucratic term that has no English
equivalent (and vice versa) is a normal and expected case.

When adding a headword, also check the other language's dictionary. If it
already contains an equivalent headword, add a `traduccion` link in the new
entry and in the existing entry so the relationship works in both
directions. If the equivalent has no entry yet, create one only when it is
genuinely difficult in that language too; do not force a literal translation.

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

## 3. How to create an entry

Use the [sources guide](sources-guide.md) to find candidates. Before drafting
an entry, check that the word is not excluded and is not already covered in
the dictionary or target category.

To avoid duplicating a word, a synonym, or an example scenario, check
what already exists in the category you're targeting first:

```sh
node scripts/content-status.js
node scripts/content-status.js --detalle --categoria {categoria} --lang {idioma}
```

Do not open `js/data.{idioma}.js` directly; the files are very large.

**Search precaution:** a match may be in an entry's headword or in its
synonym list. Check which field matched before deciding that the word is
missing. If it appears as a synonym, inspect the entry it belongs to: the
word is already discoverable there, but it may still need its own entry if
it adds a distinct meaning or useful information. A match in an example is
not an entry or a synonym. Do not reject or duplicate a candidate until you
have checked the kind of match.

### 3.1 Criteria for accepting a word

Evaluate each word **on its own and in its specific sense**. Apply these
steps to candidates from every source and to entries already in the dictionary.

#### 1. Confirm that the word is valid

- It must be documented and in current use. Exclude archaic, obsolete,
  rare, little-known, or very restricted words, even if a dictionary lists
  them. A technical word is not automatically out of scope: keep current,
  useful terms people may encounter in real documents related to Sinonimia.
- Check each new candidate in the dictionary for its language: [RAE/DLE](https://dle.rae.es/)
  for `es`, or [Collins English Dictionary](https://www.collinsdictionary.com/dictionary/english)
  for `en` (use `https://www.collinsdictionary.com/dictionary/english/<word>`
  for Collins). Confirm that the headword or a recognized variant exists and
  documents the proposed sense. This check is required for ingestion, not an
  optional writing aid. If no verifiable entry exists, reject the word. Recheck
  it only after correcting the form and verifying the correction. Do not copy
  the dictionary's definition.
- Reject invented or invalid forms. Reconsider a typo only after correcting
  it and verifying the correct form.
- Do not add adverbs as standalone entries. Also exclude grammatical or
  functional words—such as prepositions, conjunctions, determiners, and
  particles—when they only express a relationship, degree, or circumstance
  and do not add a lexical meaning that needs explanation. Apply this to the
  specific sense: if a headword also has an independent sense in another part
  of speech, assess that sense separately.
- Keep the infinitive/base form, not a conjugated verb form. Reject plurals
  and enclitic-pronoun forms unless they have their own independent entry.
- Reject numerals and ordinals when the entry only names a number or order.
  Assess any other independent sense of the same headword separately.
- Reject proper nouns (people, surnames, cities, countries, and brands) and
  demonyms, even if they appear in the reference dictionary: DLE for Spanish
  or Collins for English.
- The definition must match the documented sense. Remove an entry with an
  incorrect definition; keep it only after correcting the definition and
  confirming that it faithfully describes a current sense.

#### 2. Check whether the word needs an explanation

- **Reference user:** Sinonimia's internal goal is to support people with
  intellectual disabilities who are learning vocabulary, often in
  occupational therapy. The website is also useful to anyone who encounters
  a difficult word. Assume no prior knowledge: the explanation should be
  understood on first reading, use familiar words, and include a pictogram
  when helpful. Assess difficulty for someone who understands everyday
  words and situations but may need help with specialized, technical, or
  bureaucratic vocabulary.
- **Decision question:** Is the user likely to understand this word and this
  sense without help? If yes, it does not need an entry. Exclude familiar,
  common, concrete, transparent words and basic actions the user likely
  understands. If Sinonimia needs to explain it, it may be a candidate.
- Judge the difficulty of the **word and sense**, not how easy it is to write
  the explanation. A frequent word may have a hard sense that deserves an
  entry. Keep abstract or intangible terms such as *legend* or *warranty*.
- Frequency and CEFRLex/ELELex are review signals, not automatic rules. A
  technical word's absence from CEFRLex/ELELex does not disqualify it. The
  `scripts/ingest/pipeline/filters/common-words.js` filter helps with bulk
  sourcing in method C in the [sources guide](sources-guide.md#2-search-methods) but does not limit editorial judgment.

#### 3. Decide whether the word needs its own entry

- Do not reject an independent lexical form just because another entry
  covers the same concept. If the target user may encounter that exact word
  in a real document and it has no standalone entry, it may deserve one even
  if it appears as a synonym or in an example. For instance, `Tetrapléjico`
  may have an entry even if `Cuadripléjico` exists; people may search for
  either form literally.
- Choose between an entry and a synonym based on what the reader needs: use
  a synonym for a minor variant or rewording; create an entry when the word
  needs its own explanation, category, example, or grammatical form. Search
  indexes the headword, definition, and synonyms (`matchesSearch` in
  `js/app.js`), but reaching a related entry does not ensure the word is
  explained clearly enough.
- Review all hard senses of a word. Each independent sense that meets the
  criteria may have its own entry with its own `id`, `situacion`, and
  `definicion`; do not add a parenthetical clarification to the headword
  (see "Words with double meaning" in `SPEC.md`).
- Automatic mining rejects a word only when its lemma already appears in an
  entry's `word` field. If it appears only as a synonym or example, it remains
  a candidate for editorial review.

#### 4. Check scope and assign a category

- Exclude senses naming plants, trees, fruits, or animals, including species
  and taxonomic groups; natural-history vocabulary is out of scope. Decide
  by the entry's meaning, not partial matches in its headword. Keep a distinct
  sense that names an independent process, condition, or in-scope concept,
  such as a disease caused by an animal. Substring filters can produce false
  positives: sharing letters with a legal stem does not prove a semantic link.
- Exclude senses explicitly restricted to a particular region or country.
  Check the geographic label for that sense, not the word's origin. If an
  entry combines a regional sense with an independent general-use sense,
  keep only the general sense when it is hard; otherwise remove the entry.
  Do not keep a local sense just because a dictionary records it.
- **Assign** the category after assessing the word; do not use category
  membership to accept or reject it. Categories in methods E and F in the
  [sources guide, section 2](sources-guide.md#2-search-methods) help discover candidates: absence from a cross-reference category does
  not disqualify a word. A Wikipedia or Wiktionary category label (for
  example, "Law") is a clue, not the final `situacion`.
- If no current category fits, propose a new one, even for one well-grounded
  candidate. Do not force the word into the least-bad category. `vida-diaria`
  is valid when it genuinely fits, not as a catch-all. The maintainer decides
  whether to create a category, and the proposal must be explicit; never drop
  the word silently.

#### 5. Complete the entry

- Use an original example scenario; do not reuse the same context within a
  category.
- As an initial guide, prefer headwords of 4-12 letters. This is a heuristic,
  not an absolute rule.

No filter replaces editorial review by a person or an AI agent; both must
apply the same criteria.

When rejecting a candidate, record it with
`node scripts/ingest/pipeline/shared/record-rejection.js --lang <es|en> word`.
Filters consult that list so declined words are not proposed again. When
excluding an existing entry, record its `id`, headword, and reason in
`scripts/ingest/pipeline/decisions/editorial-exclusions-en.json`. These
decisions are enforced when rebuilding the dictionary and when mining or
ingesting candidates; excluding an entry does not create synonyms or search
redirects. See the workflow and ingestion status in
[`scripts/ingest/README.md`](../../scripts/ingest/README.md) and
[`scripts/ingest/PROGRESS.md`](../../scripts/ingest/PROGRESS.md).

### 3.2 How to add pictograms

1. Search the headword in [OpenSymbols](https://www.opensymbols.org/) with
   `node scripts/search-pictogram.js "<headword>" <language>`. If no suitable
   image appears, try a synonym or a short description; the search also checks
   ARASAAC as a fallback.
2. Choose an image that matches the entry's sense. Reuse another entry's
   `image.id` when its image fits; otherwise save the image as
   `img/<id>.png` and set that id and a short alt text in the entry's
   `image` field.
3. For an image from another bank, record its source, author, and license,
   and update the footer credits in `js/i18n.js`.

## 4. Batch tracking (bulk ingestion)

When one of the methods in [section 2 of the sources guide](sources-guide.md#2-search-methods) produces many candidates at
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
- [ ] Equivalent in the other language checked; when it exists, both
      entries have the corresponding `traduccion` link.
- [ ] `node scripts/check.js` passes.

## 7. See also

- Canonical pedagogical guide (Apptonomia):
  [creating-elements-guide.md](https://github.com/miralante/apptonomia/blob/main/doc/en/creating-elements-guide.md).
- Languages:
  [`languages.md`](languages.md).
- Technical recipe:
  [`technical.md`](technical.md).
- Product non-negotiables:
  [`SPEC.md`](SPEC.md).
- Candidate word sources:
  [`sources-guide.md`](sources-guide.md).
- Catalogue of words and games:
  [`activities.md`](activities.md).
