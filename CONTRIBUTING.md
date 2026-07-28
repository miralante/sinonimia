# Contributing to Sinonimia

> 🌐 **Other languages:** [Español](CONTRIBUTING.es.md)

Thanks for spending time on this project. Before anything else: **read
[`doc/en/SPEC.md`](doc/en/SPEC.md)**. It isn't optional documentation —
it's the rules that make Sinonimia useful to whoever needs it, and they
override any other consideration (including a definition's technical
accuracy).

## Adding a word

0. Before choosing which word to add, run `node scripts/estado-contenido.js`
   (add `--detalle` to see the words and synonyms that already exist per
   category). It tells you which categories have few words and keeps you
   from proposing a concept that's already covered under another word. See
   "Process for expanding content" in [`doc/en/SPEC.md`](doc/en/SPEC.md)
   for the full procedure.
1. Pick its language's file: `js/data.es.js` or `js/data.en.js`. Each
   language is expanded separately: step 0's diagnosis counts categories
   language by language, and a word doesn't need an equivalent in the
   other language (look for candidate terms in a source for the language
   you're editing, don't translate words from the other file). See
   "Process for expanding content" in [`doc/en/SPEC.md`](doc/en/SPEC.md).
2. Copy an entire `{ ... }` block and fill in its fields. The comment at
   the top of each file explains every field.
3. Follow [`doc/en/SPEC.md`](doc/en/SPEC.md)'s easy-read rules to the
   letter: short sentences, one idea per sentence, familiar words, no
   avoidable abstractions. Read it out loud when you're done: if it sounds
   like legal or clinical text, rewrite it.
4. Check that `ejemplo.palabra` and `ejemploSinonimo.palabra` appear
   verbatim inside `ejemplo.texto` and `ejemploSinonimo.texto` (with the
   exact conjugation or gender) — the site's word-highlighting and the
   fill-in-the-blank game depend on it. `node scripts/validar.js` warns you
   if it doesn't match.
5. If the word has a clear equivalent in another language, add a
   `traduccion` field linking it by id — a string for one-to-one, an
   array for one-to-many (a Spanish word with several valid English
   translations, or several Spanish words that all map to the same
   English word). This is optional: when the new word's pictogram is
   unique on both sides, the shared-pictogram fallback in `js/app.js`
   picks the link for you. But because ARASAAC has only one "money"
   pictogram, one "document" pictogram, etc., the fallback resolves
   only a fraction of entries — without an explicit `traduccion`, a
   Spanish word whose pictogram is shared by several unrelated words
   (the common case) won't link to its English counterpart. Edit
   `scripts/.mapping.js` and run `node scripts/inject-translations.js`
   (idempotent) to add the field to `js/data.es.js`.
6. It needs a pictogram. Before downloading anything, check whether an
   image for that concept already exists in `img/` — it can be reused
   across words and languages. To search for candidates:
   ```
   node scripts/buscar-pictograma.js "keyword" <lang>
   ```
   Use the same language code as the word (`es`, `en`...) — don't leave it
   as `es` if the word is in another language. It searches
   **OpenSymbols** first (aggregates ARASAAC, Sclera, Mulberry, and other
   banks) if you have the `OPENSYMBOLS_SECRET` environment variable set
   (get one free at https://www.opensymbols.org/api — they ask for an
   organization, email, and intended use; never commit it to the
   repository). **Without that variable, or if OpenSymbols fails or finds
   nothing, the script automatically falls back to ARASAAC's public API
   alone** (that part needs no key). Either way it only lists candidates
   with their bank, license, and author — the pictogram is downloaded by
   hand into `img/<id>.png`.
   - The search is literal, not by meaning: if the word's exact term
     returns nothing (common with abstract words like "aforo" or
     "incidencia"), try a synonym of it or of its definition before giving
     up — there's almost always a pictogram for the concept, even if it
     isn't indexed under that exact word.
   - On Windows, if downloading the image with `curl` fails with a
     `schannel`/certificate-revocation error, add `--ssl-no-revoke` to the
     command.
   - **Important note on licensing**: if the chosen pictogram isn't from
     ARASAAC, note its bank, license, and author — the footer credit
     (`js/i18n.js`, key `pieCreditosHtml`) currently only mentions ARASAAC
     and needs to be expanded before merging the change. See "Pictograms"
     in `doc/en/technical.md`.
6. `situacion` has to be one of the keys shared across every language:
   `tramites`, `salud`, `vida-diaria`, `finanzas`, `vivienda`, `trabajo`, or
   `legal` (see "Multi-language architecture" in
   [`doc/en/SPEC.md`](doc/en/SPEC.md) for what each one covers). Don't
   invent a new key for two or three stray words, and if one is genuinely
   needed, also add its label in `js/i18n.js` (`tema_<key>`) for every
   language.

7. Run `node scripts/validar.js` and `node scripts/validate-mapping.js`
   to make sure the new word is well-formed and (if you added a
   `traduccion` in step 5) the cross-language link resolves.

## Adding a language

It's described step by step in "How to add a new language" in
[`doc/en/SPEC.md`](doc/en/SPEC.md). In short: a new block in `I18N`
(`js/i18n.js`), a new `js/data.<lang>.js` file, its `<script>` tag in
`index.html`, and a button in the language selector. `js/app.js` doesn't
need to be touched: it already works with any language that appears in
`DICCIONARIOS`.

## Code changes

- No build and no framework: plain HTML, CSS, and JavaScript. Keep it that
  way — it's a design decision (see "Maintenance" in
  [`doc/en/SPEC.md`](doc/en/SPEC.md)), not a temporary limitation.
- If you add a feature to the interface (especially gamification), review
  [`doc/en/SPEC.md`](doc/en/SPEC.md)'s rules: never hide the definition,
  the synonym, or the example behind a click or a game, and never make the
  interaction punitive (no timers, no "lives", no harsh failure messages).
- Interface text goes in `js/i18n.js`, never hardcoded in `js/app.js` or
  `index.html`. If you add new text, add its key in **every** language in
  `I18N`.

## Before submitting a change

```
node scripts/validar.js
```

Checks the syntax of the JS files, CSS brace balance, that every word has
a pictogram and well-formed examples, that interface keys exist in every
language, and that the ids `js/app.js` uses exist in `index.html`. It also
runs automatically on every pull request.

## Code of conduct

This project follows `CODE_OF_CONDUCT.md`. Participating means accepting
it.
