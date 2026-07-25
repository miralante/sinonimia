# SPEC.md — Product definition

> **This document defines WHAT Sinonimia is, WHO it's for, and why.**
>
> To know HOW the application is built (architecture, files), see
> [`technical.md`](technical.md).

---

## Who it's for

Sinonimia is a dictionary for **anyone who runs into a difficult word** in
a piece of paperwork, an official letter, or a doctor's appointment. It's
written to be understood on the first read, taking nothing for granted.

It makes no distinction about who uses it or why: the word "usufruct" or
"cephalalgia" is equally hard to understand the first time, whoever reads
it. Designing for first-read comprehension makes the site clearer for
everyone, not only for those who need it most.

It is not a general dictionary of synonyms. It only covers **difficult or
technical words** (from public administration, justice, and health) and
explains them so they can be understood on the first read.

## Objective and origin (internal context)

Sinonimia was born as a support tool in **occupational therapy**, designed
specifically for **people with intellectual disability**. That is the
project's real objective and the reason behind almost all of its design
rules: easy-read language isn't a style preference, it's the requirement
that makes the tool serve its purpose; gamification is light and never
punitive because the therapeutic context demands it; pictograms exist
because they're the standard visual support in augmentative communication.

This is context information for whoever maintains or contributes to the
project — it explains the "why" behind the rules below. It doesn't change
the previous section ("Who it's for"): from the point of view of whoever
uses the site, the text stays deliberately universal and names no group,
so that nobody feels singled out or excluded. A specific therapeutic
objective and inclusive public wording aren't contradictory: they're the
same design decision seen from the inside and from the outside.

See also [`roles.md`](roles.md) for who participates in the project and
how.

### Mandatory rule: zero mentions in the user-facing product

**No text the end user sees may mention, directly or indirectly,
intellectual disability, occupational therapy, or equivalent expressions**
("cognitive difficulties", "special needs", "different abilities", etc.).
This includes everything visible in the site's interface: `index.html`
(titles, meta description, static text), the `js/i18n.js` text in every
language (buttons, labels, messages, icon alt text), and the footer. The
reason is exactly the one from the previous section: that nobody who uses
the site feels singled out, inferior, or discriminated against by what the
site says about them.

Where it applies and where it doesn't:

- **It applies** to everything the end user sees on the site:
  `index.html`, `js/i18n.js`.
- **It doesn't apply** to the dictionary content (`js/data.<lang>.js`). If a
  difficult word related to disability as a bureaucratic procedure is added
  in the future (for example a disability-certificate procedure, or
  permanent-disability benefits), it's explained with total normality, just
  like any other word — the goal there is to define the word, not to
  describe whoever looks it up.
- **It doesn't apply** to the project's internal documentation (this
  document, [`../../CLAUDE.md`](../../CLAUDE.md),
  [`../../CONTRIBUTING.md`](../../CONTRIBUTING.md),
  [`../../README.md`](../../README.md), `roles.md`): those files are read
  by whoever maintains or contributes to the project, not by the end user,
  and that's exactly where the project's real objective must be explained
  (see the previous section).

This rule is checked automatically: `node scripts/validar.js` fails if any
of those terms show up in `index.html` or `js/i18n.js`.

## Design principle: easy-read language

All of Sinonimia's content is written following **easy-read** guidelines,
the Spanish standard UNE 153101:2018 EX, and Inclusion Europe's European
guidelines. This isn't a style detail: it's the main criterion, and it
overrides any other (including technical accuracy). If a definition is
correct but hard to understand, it's badly written.

Rules that apply to **every new word** added to `js/data.<lang>.js`:

1. **One idea per sentence.** No sentences with relative clauses, chained
   commas, or several ideas at once.
2. **Very short sentences.** 10-12 words per sentence, max. The full
   definition: 2 sentences at most.
3. **Familiar words.** If explaining a difficult word requires another
   difficult word, swap it for an everyday one.
4. **No avoidable abstractions.** "A paper" is better than "a document";
   "it hurts" is better than "it produces pain"; "it's not serious" is
   better than "it does not present severity".
5. **No metaphors, no irony, no double negatives.**
6. **Active, concrete voice.** Clear subject, clear verb.
7. **The example rules.** The example sentence must be a real, everyday
   situation (a bureaucratic errand, a doctor's visit, a message that
   arrives at home), never an abstract case.
8. **Repetition with a synonym is the explanation, not decoration.** The
   same sentence is repeated, changing only the difficult word for the
   simple one, so it's understood through context, not through the
   definition.

Before saving a new word, read it out loud: if it sounds like legal or
clinical text, it needs to be rewritten.

## Design principle: the Socratic method in the games

When someone fails one of the two games, Sinonimia never just tells them
they're wrong: it redirects them to look again at the hint, the word, or
the example sentence, so they reason out the answer on the next attempt
instead of guessing at random. The game guides the reasoning toward the
answer; it never hands it over directly.

This is rule 4 of the gamification section below (failure message: never
"Wrong!", always an invitation to re-read the hint or the sentence, as
`juegoPalabraIncorrecto` already does in `js/i18n.js`). Any new failure
message added to the games, in any language, must follow the same pattern.

## Words with a double meaning

Some difficult words are also homonyms: the same word has two meanings
that have nothing to do with each other (for example Spanish "pensión" —
retirement pay, or a cheap guesthouse). Sinonimia treats these as **two
ordinary entries**, each with its own `id` and its own `situacion`, and
both deliberately use the same text in `palabra` (it isn't disambiguated
by adding something like "Pensión (money)" to the `palabra` field: each
entry is already distinguished by its `definicion` and by the topic pill
on its detail page, the same way a paper dictionary numbers senses instead
of inventing a different headword for each one).

This is safe because `js/app.js`'s internal index (`entryByName`, used to
link a synonym to its own entry and to pick the two games' wrong-answer
options) is built for several entries to share `palabra`: they never
overwrite each other, and if another word's synonym turns out ambiguous it
links to both, not to one picked at random. See "Dictionary entry shape"
in [`technical.md`](technical.md) for the technical
detail. The two entries for `pensión` (`es`) and `pension` (`en`) in
`js/data.*.js` are the reference case — copy them if you need to add
another homonym.

## Why "only difficult words"

The dictionary doesn't include common vocabulary (house, happy, eat...)
because that vocabulary is already understood. Sinonimia's value is in the
words that show up in letters from the town hall, in court proceedings, or
at the doctor's office — the ones that tend to leave out whoever doesn't
know them.

## Call to action and motivation (light gamification)

Looking up a word should feel quick and rewarding, not like filling out a
form. That's why the site includes, with no backend and no user accounts:

- **Word of the day**, with a clear button to jump straight to it.
- **"Surprise me"**, a button that leads to a random word, to explore
  without having to search.
- **Progress saved in the browser** (`localStorage`, no server): every word
  that's opened gets marked as discovered, with a counter and a progress
  bar. It's a visual reward, not a requirement to use the site.
- **CSS micro-animations** (card hover, the sentence-with-synonym fading
  in, the progress bar filling up) so the interface feels alive, with no
  heavy JavaScript or external dependencies.
- **"Write your own sentence"**, below the example sentences on every word:
  a field where the person writes their own sentence using the word, saved
  in `localStorage` (per word and language). The text isn't corrected or
  scored — the goal is practicing producing language, not getting it
  right. Saving it shows the sentence with a small visual reward.
- **Two games**, reachable from the "🎮 Play" button, which opens a menu to
  choose one:
  - **"Which word is it?"**: shows the topic, the definition, and the
    pictogram of a word, and you choose the right word among 3 options.
  - **"Complete the sentence"**: shows a word's example sentence with a
    blank where the difficult word goes, and you choose which one is
    missing among 3 options. Getting it right reveals the full sentence
    with the word highlighted, just like in the word's detail view.
  In both games, the options are shuffled on every question (so the
  answer's position can't be memorized), and there's no timer and no
  penalty: a wrong pick is marked red and you can keep trying the rest
  with no attempt limit. Correct answers from both games accumulate
  together, with a ⭐, in `localStorage` per language. Both games always
  use the words from the active language, so they work the same way when a
  new language is added — they don't need to be touched.

Rules governing gamification:

1. **Never hide or delay the definition, the synonym, or the example
   behind a click or a game.** Gamification rewards exploration; it must
   never be a barrier to understanding the word. If something competes
   with clarity, clarity wins.
2. **Never punitive.** No timers, no "lives", no harsh failure messages
   ("Wrong!", "You lost"). A failure in the game is treated like just
   another attempt: the person is invited to keep trying, never penalized.
3. **Nothing is corrected or scored as "incorrect" outside the game
   itself.** "Write your own sentence" is never validated or judged: any
   sentence the person writes is saved and celebrated the same way.
4. **Socratic method on failure.** When a wrong option is chosen, the
   message never just says it's wrong: it always redirects to the hint or
   the sentence ("Read the hint again: which word fits best?"), so the
   person reasons out their own answer on the next attempt instead of just
   guessing at random. The correct answer is never given directly.
5. **Options must be distinguishable by contrast.** In both games,
   non-correct words are chosen first from a different topic than the
   target word's (`pickDistractorEntries` in `js/app.js`), and only fall
   back to another word from the same topic if there aren't enough from
   different topics. The hint itself shows the target's topic (a
   `tema-pill` badge) so that contrast is something the person can
   actually see and use, not something they have to already know. That
   way, re-reading the hint or the sentence lets you rule out options
   because they don't fit the topic, instead of having to guess among
   similar-looking options.
6. **Stars as positive reinforcement, never as a score that can be
   lost.** Every correct answer adds a ⭐ to the counter (`juegoAciertos`
   in `js/i18n.js`), with a small animation when it's earned. There are no
   stars that get taken away, no maximum, no leaderboard: they're a
   cumulative reward, not a grade.

## Multi-language architecture

Sinonimia is designed to support several languages (Spanish today, English
and whatever else is needed in the future), with no backend and no build
step. Each piece lives in its own file:

- `js/i18n.js` — the **fixed interface text** (buttons, labels, messages)
  in an `I18N` object with one key per language (`es`, `en`...). This is
  NOT dictionary content, it's the site's own labels.
- `js/data.<lang>.js` — **that language's dictionary**, as a list appended
  to `DICCIONARIOS.<lang>` (e.g. `DICCIONARIOS.es`, `DICCIONARIOS.en`).
  Each language has its own words: "usufructo" (es) and "usufruct" (en)
  don't need to share anything beyond the block's structure.
- Each word's `situacion` field uses a **key shared across every
  language**, so the topic filter works the same way in any language. Its
  visible label in each language is defined in `js/i18n.js`
  (`tema_<key>`), never in the data file. The current keys are:

  - `tramites` — general administrative procedures (notices, resolutions,
    official documents that don't fit better in another category).
  - `salud` — medical and healthcare terms.
  - `vida-diaria` — everyday-situation vocabulary that doesn't fit any more
    specific category.
  - `finanzas` — money, banks, debts, savings, taxes.
  - `vivienda` — renting, mortgages, residence registration, home
    utilities.
  - `trabajo` — employment contracts, payslips, sick leave, worker rights.
  - `legal` — rights, consent, judicial processes, legal representation.

  These seven categories come from the **IADL (instrumental activities of
  daily living)**, the framework occupational therapy uses to identify
  which areas of adult life tend to need more support to gain autonomy —
  which is why finance, housing, employment, and legal are treated as
  their own areas instead of a generic "paperwork" catch-all. Don't add a
  new category for two or three stray words: it needs a real handful of
  words to justify it, or the topic filter ends up with near-empty boxes.
- The `imagen.id` field is the pictogram's identifier in ARASAAC. ARASAAC
  is a multi-language pictogram bank: the same image serves the same
  concept in any language, so two words in different languages can point
  to the same `imagen.id` and share the `img/<id>.png` file without
  downloading it twice.
- The URL remembers the language: `#/es/palabra/subsanar`,
  `#/en/palabra/rectify`. Switching language doesn't try to translate the
  word you were viewing: it goes back to the list, in the new language.
- Progress ("discovered words"), game correct-answer counts, and custom
  sentences are saved per language (`localStorage`, keys
  `sinonimia-aprendidas-<lang>`, `sinonimia-juego-aciertos-<lang>`, and
  `sinonimia-mis-frases-<lang>`), because they're different content
  dictionaries.

### How to add a new language

1. Copy the entire `es` (or `en`) block inside `I18N` in `js/i18n.js` and
   translate it, key by key.
2. Create `js/data.<lang>.js` copying the structure of `js/data.es.js` and
   write that language's difficult words (there's no need to translate the
   existing words: pick whichever are genuinely difficult in that
   language). Use the shared `situacion` keys.
3. Add `<script src="js/data.<lang>.js"></script>` in `index.html`, next to
   the other `data.*.js` scripts.
4. Add a button in `.idioma-selector` in `index.html`:
   `<button class="idioma-btn" data-lang="<lang>">XX</button>`.

None of this touches `js/app.js`: search, routing, progress, and word of
the day already work for any language that appears in `DICCIONARIOS`.

## Process for expanding content

Writing an easy-read definition needs human judgment — it can't be
templated without it showing (that's why `scripts/validar.js` checks the
shape of the data, but never a definition's quality: only a person, or an
AI, reading it out loud, can judge that). What can be automated is the
bookkeeping that needs to happen before writing anything, and that's what
`scripts/estado-contenido.js` does. The full process, repeatable every time
the dictionary needs to grow:

1. **Diagnosis**: `node scripts/estado-contenido.js` — counts words by
   category and language, flags categories with fewer than 8 words (the
   threshold the "Multi-language architecture" section above already
   required, so the topic filter doesn't end up with empty boxes), and
   warns if one language has fallen far behind another in the same
   category. With `--detalle` it also lists every existing word with its
   synonyms, so you don't propose a term that's already covered under
   another word.
2. **Pick a category and a language** from the ones the diagnosis flagged.
   The diagnosis deliberately counts each language separately: content
   isn't shared across languages (see "Multi-language architecture"
   above), so each category+language combination is worked independently,
   even though a single pass can cover several.
3. **Look for candidate terms** for that category **in a reference source
   for the chosen language** (for `es`, plain-language or patient-facing
   medical glossaries in Spanish; for `en` or another language, that
   language's own "plain language" equivalent — not a Spanish glossary
   translated by hand), discarding ones that already show up in that
   language's `--detalle` listing. **Don't translate words that already
   exist in the other language**: each language picks whichever words are
   genuinely difficult in that language, and they don't have to match the
   other language's list (the same point "How to add a new language"
   already makes when bootstrapping a new language applies equally when
   growing an existing one).
4. **Write each entry** following this document's easy-read rules to the
   letter, **in the chosen language** — the whole entry (`definicion`,
   `sinonimos`, `ejemplo`, `ejemploSinonimo`) goes in `js/data.<lang>.js`,
   never mixed with another language.
5. **Find the pictogram** with
   `node scripts/buscar-pictograma.js "<term>" <lang>`, using the same
   language code as the word (`es`, `en`...), not always `es` (uses
   OpenSymbols if `OPENSYMBOLS_SECRET` is set, otherwise falls back to
   ARASAAC alone). Before searching, check whether the concept already has
   a pictogram in `img/` from a word in another language — ARASAAC's
   pictograms are drawings with no text, so the same `imagen.id` serves
   the same concept in any language.
6. **Validate**: `node scripts/validar.js` before considering the word
   done. It checks every language's words at once, so one run is enough
   even if you touched several `js/data.<lang>.js` files.

This process doesn't run on its own or on a cron — there's no server to
run it on, and fully automating it would violate the rule that every
definition gets reviewed by hand. It's a procedure so that anyone (person
or agent) who wants to expand the dictionary knows exactly where to start
and which steps can't be skipped, **in any language the dictionary has**.

### A real end-to-end example

A real case is more useful than the abstract list of steps. In a pass
through `vida-diaria` (the weakest category in both languages: 3 words in
`es`, 0 in `en`), the full process left the category at 8 words in `es`
and 5 in `en` — `aforo`, `franja horaria`, `justificante`, `incidencia`,
`extravío`, and `overdue`, `complimentary`, `duplicate`, `enclosed`,
`lost property`. Two non-obvious things came out of that pass that weren't
documented before:

- **`scripts/buscar-pictograma.js` searches by literal word match, not by
  meaning.** Exact terms like "aforo", "capacidad", "justificante", or
  "incidencia" returned no results in ARASAAC, but a more common synonym
  did ("lleno", "completo", "recibo", "problema"). If the exact term finds
  nothing, try a synonym of the word itself or of its definition before
  giving up on the pictogram.
- **Two words in different languages can share `imagen.id`** if they
  represent the same concept, as the multi-language architecture section
  above already explains: `extravío` (es) and `lost property` (en) both
  use pictogram 16159 ("lost item(s)"), without downloading it twice.

## Maintenance

All the content lives in plain files (`js/i18n.js`, `js/data.*.js`), with
no database or backend. Adding a word means copying a block in its
language's file and filling it in following the rules above. No need to
touch HTML, CSS, or the search engine.
