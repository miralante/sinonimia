# Detailed contents — Sinonimia

> 🌐 **Other language:** [Español](../es/CONTENIDOS.md)

This document is the **detailed didactic index of Sinonimia**. It
expands on [`activities.md`](activities.md) and
[`creating-elements-guide.md`](creating-elements-guide.md) by
listing every dictionary entry, theme and pedagogical concept
shipped with the app, and pointing back to the canonical doc for
each one.

Sinonimia is a single-activity plain-language dictionary: there is
no `tools/` shell, no per-tool routing. The "content" of the app
is therefore the **dictionary corpus** (`js/data.<lang>.js`),
grouped by category and keyed by ARASAAC pictogram id.

Use this document as the **workbook for Sinonimia**: when a new
headword is proposed, when a category is rebalanced, or when the
easy-read examples are reviewed, this is the document to read
first.

> **Source of truth for product rules**: [`SPEC.md`](SPEC.md).
> **Source of truth for pedagogy and easy-read writing rules**:
> [`creating-elements-guide.md`](creating-elements-guide.md).
> **Source of truth for dictionary schema, gamification mechanics
> and the list of identifiers deliberately kept in Spanish**:
> [`technical.md`](technical.md).
> This document does **not** redefine rules; it indexes the content
> that those rules produce.

---

## 0. How this document is organized

1. The single activity (hash-routed `js/app.js`).
2. Categories (bureaucratic, legal, health, …).
3. Dictionary entries, category by category, in didactic order.
4. Gamification mechanics (the two games).
5. Pedagogical concepts (what each headword works on).
6. Restrictions and forbidden content.

> **Note**: Sinonimia targets the **plain-language reading use
> case**. The dictionary content is intentionally language-agnostic
> in `js/app.js` — it goes through `DICCIONARIOS[currentLanguage]`
> and `t(key)`, so adding a third language requires no changes to
> `js/app.js`. See [`I18N.md`](I18N.md) for the step-by-step.

---

## 1. The activity

| Activity | Slug | Didactic objective | Key vocabulary |
|---|---|---|---|
| Sinonimia (plain-language dictionary) | n/a (single-activity app) | Replacing hard / technical / bureaucratic words with an everyday synonym plus an easy-read definition, a same-sentence example and an ARASAAC pictogram. | sinónimo, definición, ejemplo, lectura fácil, pictograma, burocracia, certificado. |

---

## 2. Categories

This section is the **placeholder for the per-category inventory**.
When you add a category or rebalance coverage, document it here
(name, scope, typical user question, related headwords) and link
back to the section in
[`creating-elements-guide.md`](creating-elements-guide.md) that
governs the addition.

Sections to flesh out as the project grows:

- 2.1 Bureaucratic / administrative.
- 2.2 Legal.
- 2.3 Health.
- 2.4 Education.
- 2.5 Finance (where it overlaps with disability-related
  procedures).
- 2.6 Daily life / housing.

---

## 3. Dictionary entries, category by category

This section is the **placeholder for the headword inventory per
category**. To see the actual headword list for a given category,
use `node scripts/content-status.js --detalle --categoria <topic>
--lang <es|en>` (see [`quick-guide.md`](quick-guide.md)) — that
script lists every existing headword with its synonyms, definition
and example, scoped to one category + one language. Reserve direct
reads of `js/data.<lang>.js` for surgical fixes only.

---

## 4. Gamification mechanics

Sinonimia ships two games that operate on the same dictionary
content; the games are **not** additional content, they reuse the
entries in `js/data.<lang>.js`:

- **Word hunt** (highlights the headword in the example sentence).
- **Fill in the blank** (the synonym slot is left empty in the
  example, the learner fills it in).

Both games read the same entry shape and never bypass the
`js/i18n.js` localization layer. See
[`technical.md`](technical.md) for the implementation details.

---

## 5. Pedagogical concepts (what each headword works on)

- Recognising bureaucratic jargon in everyday text.
- Mapping a hard word to an everyday synonym.
- Reading a definition written at the "lectura fácil" reading
  level (UNE 153101; see [`SPEC.md`](SPEC.md) §3.3).
- Using the example sentence as a contextual cue.

---

## 6. Restrictions and forbidden content

- **No clinical / disability mention in any user-facing surface**
  (see [`SPEC.md`](SPEC.md) § "Mandatory rule: zero mentions in
  the user-facing product"). `scripts/check.js` enforces this on
  `index.html` and `js/i18n.js` with a blocklist scan.
- **Dictionary entries that name a clinical concept by its
  real-world name are allowed** (e.g. an entry about a disability
  certificate procedure): that is content, not audience labelling.
  `scripts/check.js` does **not** scan `js/data.<lang>.js` for
  this reason.
- **Spanish-first content** (`es` is the source of truth; see
  [`I18N.md`](I18N.md)).

---

## See also

- [`index.md`](index.md) — top-level doc index.
- [`quick-guide.md`](quick-guide.md) — one-page orientation.
- [`team.md`](team.md) — coverage and therapeutic guidance.
