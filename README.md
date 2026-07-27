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
  languages (see "How to add a new language" in [`doc/en/SPEC.md`](doc/en/SPEC.md)).
- **Accessibility**: adjustable font size, high contrast, visible focus,
  keyboard navigation, `aria-live` on dynamic messages.
- **Light gamification** with no backend or accounts: word of the day, a
  "surprise me" button, progress saved in the browser, a field to write
  your own sentence with each word, and two practice games ("Which word is
  it?" and "Complete the sentence").
- **Pictograms from [ARASAAC](https://arasaac.org)**, shared across
  languages when they represent the same concept.

## Project documentation

All project documentation lives in the `doc/` folder, plus a few files at
the repository root:

| Language | Entry point |
|---|---|
| 🇬🇧 English (this file) | [`doc/en/index.md`](doc/en/index.md) |
| 🇪🇸 Español | [`doc/es/indice.md`](doc/es/indice.md) |

| If you want to… | Start with |
|---|---|
| Understand what Sinonimia is and who it's for | [`doc/en/SPEC.md`](doc/en/SPEC.md) — the product definition: easy-read rules, multi-language architecture, gamification rules. Source of truth for content: read it before adding or editing words. |
| Know who participates in the project and how | [`doc/en/roles.md`](doc/en/roles.md) |
| See the technical architecture | [`doc/en/technical.md`](doc/en/technical.md) — how the system is built, file by file, and the project's language policy (English for code and comments, Spanish/English for product content). |
| Add a word, a language, or a code change | [`CONTRIBUTING.md`](CONTRIBUTING.md) / [`CONTRIBUTING.es.md`](CONTRIBUTING.es.md) |
| Have an AI agent touch the code | `CLAUDE.md` |

## Validating changes

```
node scripts/validar.js
```

Checks the syntax of the JS files, that CSS braces are balanced, that every
word has its pictogram and well-formed examples, that interface text keys
exist in every language, and that the ids `js/app.js` uses exist in
`index.html`. It also runs on every pull request
(`.github/workflows/validate.yml`).

## Deploying

Sinonimia is a fully static site (HTML/CSS/JS, no build step), so it
ships directly to **[Cloudflare Pages](https://pages.cloudflare.com)**
through its built-in GitHub integration — there is no custom GitHub
Actions workflow. The HTTP headers security policy is in
[`_headers`](_headers). See [`DEPLOY.md`](DEPLOY.md) for the runbook.

To deploy your own fork:

1. Create a Cloudflare Pages project from this repo in the dashboard
   (**Workers & Pages → Create → Pages → Connect to Git**). Build
   command is empty; output directory is `.`.
2. Push to `main`. Cloudflare rebuilds and deploys automatically. The
   validation workflow ([`.github/workflows/validate.yml`](.github/workflows/validate.yml))
   still runs on every push and PR to gate content, but it does not
   deploy.

Pull requests automatically get a preview URL on `*.pages.dev` — no
extra workflow is needed.

## Expanding the dictionary

```
node scripts/estado-contenido.js --detalle
```

Before adding words, this command reports which categories have few
(fewer than 8) and lists the ones that already exist with their synonyms,
to avoid repeating a concept. It's the first step of the process described
in "Process for expanding content" in [`doc/en/SPEC.md`](doc/en/SPEC.md).

## Housekeeping

The `scripts/.cache/` directory (frequency-word lists downloaded by
`candidatos-corpus.js`) can be cleared with:

```
npm run clean-cache          # dry-run: shows what would be removed
node scripts/limpiar-cache.js --apply   # actually delete it
```

The next call to `candidatos-corpus.js` rebuilds the cache automatically.
`scripts/.scratch/` (the maintainer's one-off exploration scripts) is
**not** touched by this command — clear it by hand if you want to.

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
