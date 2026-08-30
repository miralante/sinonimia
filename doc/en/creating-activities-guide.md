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
techniques that all Apptonomia-sibling projects share live in the
**Routime** repository under
[`creating-activities-guide.md`](https://github.com/thenkdframe/routime/blob/main/doc/en/creating-activities-guide.md).

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
  `node scripts/buscar-pictograma.js`).

Optional fields:

- `traduccion` — closest equivalent(s) in another language
  (one-to-many is allowed).
- `audio` — pronunciation or example-sentence audio.
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

## 3. The technical recipe

Adding an entry requires editing `js/data.<lang>.js` (and **only**
that file). The validator (`scripts/check.js`) runs over every
language in a single pass and will reject:

- An entry that doesn't match the schema.
- An entry whose topic is not in the catalogue.
- A duplicate word in the same language.
- An entry missing the easy-read rule checks described in
  [`SPEC.md`](SPEC.md).

Before opening the PR:

```sh
node scripts/estado-contenido.js --detalle --categoria <categoria> --lang <lang>
node scripts/check.js
```

## 4. Compliance checklist before opening a PR

- [ ] Word chosen is genuinely hard **in this language**, not a
      word-for-word translation of a Spanish/English entry.
- [ ] Entry follows the schema in
      [`technical.md`](technical.md) §"Data model".
- [ ] Definition is easy-read (one idea per sentence, short, plain
      words).
- [ ] Example sentence uses the word in a concrete, real-life
      context.
- [ ] Pictogram found and inspected
      (`node scripts/buscar-pictograma.js`).
- [ ] No duplicate of an existing entry in the same language and
      topic.
- [ ] `node scripts/check.js` passes.

## 5. See also

- Canonical pedagogical guide (Routime):
  [creating-activities-guide.md](https://github.com/thenkdframe/routime/blob/main/doc/en/creating-activities-guide.md).
- Sources and editorial workflow:
  [`sourcing.md`](sourcing.md).
- Languages:
  [`languages.md`](languages.md).
- Technical recipe:
  [`technical.md`](technical.md).
- Product non-negotiables:
  [`SPEC.md`](SPEC.md).
- Catalogue of words and games:
  [`activities.md`](activities.md).
