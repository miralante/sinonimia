# Sinonimia 📖

> 🌐 **Other languages:** [Español](README.es.md)

A plain-language dictionary for difficult words: paperwork, justice, and
health. Every word has a short definition, a simple synonym, an everyday
sentence (repeated with the synonym), and a pictogram. Written to follow
**easy-read** guidelines (Spanish standard UNE 153101:2018 EX), so it's
understood on the first read.

No build, no backend, no dependencies: plain HTML, CSS, and JavaScript,
made to be easy to maintain and to extend.

## Try it

Nothing to install. Just open `index.html` in a browser, or serve the
folder with any static server, for example:

```
npx serve .
```

## What it includes

- **Instant search** (by the difficult word or by its meaning), topic
  filter, and browsing by letter.
- **Spanish and English**, with an architecture designed to add more
  languages (see "Adding a new language" in `PRODUCT.md`).
- **Accessibility**: adjustable font size, high contrast, visible focus,
  keyboard navigation, `aria-live` on dynamic messages.
- **Light gamification** with no backend or accounts: word of the day, a
  "surprise me" button, progress saved in the browser, a field to write
  your own sentence with each word, and two practice games ("Which word is
  it?" and "Complete the sentence").
- **Pictograms from [ARASAAC](https://arasaac.org)**, shared across
  languages when they represent the same concept.

## Project documentation

- **`PRODUCT.md`** (in Spanish) — the product definition: who it's for, the
  easy-read rules every definition and example must follow, the
  multi-language architecture, and the rules governing gamification. It's
  the source of truth for content: read it before adding or editing words.
- **`ARCHITECTURE.md`** — the technical document: how the system is built,
  file by file, and the project's language policy (English for code and
  comments, Spanish/English for product content).
- **`CLAUDE.md`** — technical guide for anyone (person or agent) touching
  the code.
- **`CONTRIBUTING.md`** (in Spanish) — how to propose a new word, a new
  language, or a code change, and how to validate a change before
  submitting it.

## Validating changes

```
node scripts/validar.js
```

Checks the syntax of the JS files, that CSS braces are balanced, that every
word has its pictogram and well-formed examples, that interface text keys
exist in every language, and that the ids `js/app.js` uses exist in
`index.html`. It also runs on every pull request
(`.github/workflows/validate.yml`).

## Expanding the dictionary

```
node scripts/estado-contenido.js --detalle
```

Before adding words, this command reports which categories have few
(fewer than 8) and lists the ones that already exist with their synonyms,
to avoid repeating a concept. It's the first step of the process described
in "Process for expanding content" in `PRODUCT.md`.

## License

- The **code** (HTML/CSS/JS) belongs to its contributors, under the MIT
  license (see `LICENSE`).
- The **dictionary content** (definitions, synonyms, sentences) is under
  Creative Commons Attribution-ShareAlike 4.0 (CC BY-SA 4.0).
- The **pictograms** in `img/` are not ours: they're from
  [ARASAAC](https://arasaac.org) (author Sergio Palao, owned by the
  Government of Aragón), under a CC BY-NC-SA license. If you add a new
  pictogram from ARASAAC, keep that license and the footer attribution —
  they can't be used commercially without ARASAAC's permission.

## Credits

Definitions and examples are based on public "plain language" glossaries
from government and court bodies (IVAP, Red de Lenguaje Claro) and on
medical glossaries written for patients.
