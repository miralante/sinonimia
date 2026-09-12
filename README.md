# Sinonimia 📖

> 🌐 **Other languages:** [Español](README.es.md)
>
> 🚀 **Try it live:** [sinonimia.apptonomia.uk](https://sinonimia.apptonomia.uk/)

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![No dependencies](https://img.shields.io/badge/dependencies-none-success.svg)](#-features)
[![Static site](https://img.shields.io/badge/build-none-informational.svg)](#-features)
[![No PWA](https://img.shields.io/badge/PWA-none-lightgrey.svg)](#-features)
[![i18n](https://img.shields.io/badge/i18n-es%20%7C%20en-yellow.svg)](#-project-documentation-bilingual)
[![CI](https://img.shields.io/badge/CI-node%20scripts%2Fcheck.js-blue.svg)](.github/workflows/check.yml)

A plain-language dictionary for difficult words: paperwork, justice,
and health. Every word has a short definition, a simple synonym, an
everyday sentence (repeated with the synonym), and a pictogram.
Written to follow **easy-read** guidelines (Spanish standard UNE
153101:2018 EX), so it's understood on the first read.

No build, no backend, no dependencies: plain HTML, CSS, and
JavaScript, made to be easy to maintain and to extend.

- 🌐 **App**: [sinonimia.apptonomia.uk](https://sinonimia.apptonomia.uk/)
- 📦 **Repository**: [github.com/miralante/sinonimia](https://github.com/miralante/sinonimia)
- 💻 **Run locally**: open `index.html` directly in a browser, or serve
  the folder with any static server (`npx serve .` /
  `python -m http.server 8080`).

---

## 🚀 Try it live

Sinonimia is deployed at **[sinonimia.apptonomia.uk](https://sinonimia.apptonomia.uk/)**
— open it in your browser and use it directly, no installation
needed.

---

## ✨ Features

- **Instant search** (by the difficult word or by its meaning),
  topic filter, and browsing by letter.
- **Spanish and English**, with an architecture designed to add more
  languages (see "How to add a new language" in
  [`doc/en/spec.md`](doc/en/spec.md)).
- **Light gamification** with no backend or accounts: word of the
  day, a "surprise me" button, progress saved in the browser, a
  field to write your own sentence with each word, and two practice
  games ("Which word is it?" and "Complete the sentence").
- **Pictograms from [ARASAAC](https://arasaac.org)**, shared across
  languages when they represent the same concept.
- **Accessibility**: adjustable font size, high contrast, visible
  focus, keyboard navigation, `aria-live` on dynamic messages.
- 🪶 **Zero runtime dependencies** — pure HTML/CSS/JS, no build.
- 🔒 **Privacy by default** — no backend, no database, no telemetry,
  no third-party runtime.

---

## 👥 Roles in the project

| Role | Who they are | How they participate | Where they look first |
|---|---|---|---|
| 👤 **End user** (typical user profile) | Runs into a difficult word | Uses the site directly, no sign-up or account | The site itself (`index.html`) |
| 💻 **Contributor** (content or code) | Proposes a new word, a new language, or touches the code | Follows the process in [`CONTRIBUTING.md`](CONTRIBUTING.md): adds a word following the easy-read rules, or implements/reviews code changes | [`CONTRIBUTING.md`](CONTRIBUTING.md) · [`technical.md`](doc/en/technical.md) |

Sinonimia only has two roles — there is no dedicated "support"
position: the dictionary is designed to be used on one's own, without
needing anyone to mediate. See [`doc/en/roles.md`](doc/en/roles.md)
for the full role description and how Sinonimia fits the trio-vs-
pair-vs-sole patterns across the apps of the suite.

---

## 📚 Project documentation (bilingual)

All project documentation lives in the `doc/` folder plus a few files
at the repository root:

| Language | Entry point |
|---|---|
| 🇬🇧 English (this file) | [`doc/en/index.md`](doc/en/index.md) |
| 🇪🇸 Español | [`doc/es/indice.md`](doc/es/indice.md) |

| Topic | Document |
|---|---|
| Product, audience, easy-read rules | [`doc/en/spec.md`](doc/en/spec.md) · [`doc/es/spec.md`](doc/es/spec.md) |
| Architecture and technical reference | [`doc/en/technical.md`](doc/en/technical.md) · [`doc/es/tecnico.md`](doc/es/tecnico.md) |
| Internationalization (add a language) | [`doc/en/i18n.md`](doc/en/i18n.md) · [`doc/es/i18n.md`](doc/es/i18n.md) |
| Roles (trio / pair / sole across the suite) | [`doc/en/roles.md`](doc/en/roles.md) · [`doc/es/roles.md`](doc/es/roles.md) |
| Deploy runbook (Cloudflare Workers) | [`CLOUDFLARE.md`](CLOUDFLARE.md) |
| AI agent operational workflow | `CLAUDE.md` |

### 📄 Other repo documents

| Document | Audience |
|---|---|
| [`CONTRIBUTING.md`](CONTRIBUTING.md) | Anyone who wants to contribute (family, therapists, devs) |
| `CLAUDE.md` | AI agents: operational workflow, coordination and approvals |
| [`CLOUDFLARE.md`](CLOUDFLARE.md) | Canonical Cloudflare Workers deploy guide for the suite (Sinonimia + Apptonomia + Calculia, Memofun, Okeymoney, Teclatlon) |
| Project history | Lives in `git log`; no external roadmap is maintained |

---

## 🛠️ Preparing / Expanding content

To expand the dictionary:

```bash
node scripts/content-status.js
node scripts/content-status.js --detalle --categoria <topic> --lang <es|en>
```

Before adding words, the first command reports which categories have
few (fewer than 8); the second, scoped to the category+language you
picked, lists the words that already exist there with their synonyms,
definition, and example — to avoid repeating a concept or an
illustrative scenario, without ever opening the multi-megabyte
`js/data.<lang>.js` directly. It's the first step of the process
described in "Process for expanding content" in
[`doc/en/spec.md`](doc/en/spec.md).

---

## ✅ Validating changes

```bash
node scripts/check.js
```

No `npm install` needed — the script only uses Node's standard library.
It checks the syntax of JS files, that CSS braces are balanced, that
every word has its pictogram and well-formed examples, that interface
text keys exist in every language, and that the ids `js/app.js` uses
exist in `index.html`. It also runs on every pull request
([`.github/workflows/check.yml`](.github/workflows/check.yml)).

---

## ☁️ Deploying

Sinonimia is a fully static site (HTML/CSS/JS, no build step), so it
ships directly to **[Cloudflare Workers (static assets)](https://developers.cloudflare.com/workers/static-assets/)**
through its built-in GitHub integration. The HTTP headers security
policy is in [`_headers`](_headers), and the static-assets binding is
in [`wrangler.toml`](wrangler.toml). See [`CLOUDFLARE.md`](CLOUDFLARE.md)
for the runbook (rebuild, rollback, custom domain, credential
rotation).

To deploy your own fork:

1. Create a Cloudflare Workers project from this repo in the
   dashboard (**Workers & Pages → Create → Connect to Git**). Build
   command is empty; `wrangler.toml` declares the static-assets
   directory.
2. Push to `main`. Cloudflare rebuilds and deploys automatically. The
   validation workflow
   ([`.github/workflows/check.yml`](.github/workflows/check.yml))
   still runs on every push and PR to gate content, but it does not
   deploy.

Pull requests automatically get a preview URL — no extra workflow is
needed.

---

## 🛡️ Security

Sinonimia is a fully client-side static site: no backend, no database,
no telemetry, no third-party runtime. The threat model is essentially
"what a hostile offline page could do to the same origin", which the
browser already sandboxes. See [`SECURITY.md`](SECURITY.md) (or
[`SECURITY.es.md`](SECURITY.es.md)) for how to report a suspected
issue privately.

---

## 📄 License

Sinonimia ships **three** licences, one per asset kind:

- The **code** (HTML/CSS/JS) belongs to its contributors, under the
  **MIT** license (see [`LICENSE`](LICENSE)).
- The **dictionary content** (definitions, synonyms, sentences) is
  under **Creative Commons Attribution-ShareAlike 4.0 (CC BY-SA 4.0)**.
- The **pictograms** in `img/` are not ours: they're from
  [ARASAAC](https://arasaac.org) (author Sergio Palao, owned by the
  Government of Aragón), under a **CC BY-NC-SA** license. If you add a
  new pictogram from ARASAAC, keep that license and the footer
  attribution — they can't be used commercially without ARASAAC's
  permission.

---

## 🧹 Housekeeping

There is no `node_modules` and no build artifacts in this repo. To
clear the local PWA cache during development, unregister the service
worker from DevTools (`Application → Service workers → Unregister`)
and clear site data.

The `scripts/.cache/` directory (frequency-word lists downloaded by
`corpus-candidates.js`) can be cleared with:

```bash
node scripts/clean-downloads.js            # dry-run: shows what would be removed
node scripts/clean-downloads.js --apply    # actually delete it
```

The next call to `corpus-candidates.js` rebuilds the cache
automatically. `scripts/ingest/` (the maintainer's batch pipeline,
batch/fix data files, and one-off exploration scripts) is **not**
touched by this command — clear it by hand if you want to, or read
[`scripts/ingest/README.md`](scripts/ingest/README.md) to see what's
in there and how it's organized.

---

## 🙏 Credits

Definitions and examples are based on public "plain language"
glossaries from government and court bodies (IVAP, Red de Lenguaje
Claro) and on medical glossaries written for patients.

---

## 🌐 The Miralante suite — projects in the suite

Sinonimia is one of **six apps** in the **Miralante** suite, sharing
the same author, the same accessibility-first / no-backend philosophy
and the same deploy story. Apptonomia, on top of being an app itself,
also acts as the **landing portal** that introduces the whole suite.
None of the seven repos is the "main" one — they are peers; this is
just the original product this group grew out of.

| Project | What it is | Repository |
|---|---|---|
| **Apptonomia** *(portal — landing only, no app)* | Landing page that introduces the Miralante suite (not a runtime app) | [github.com/miralante/apptonomia](https://github.com/miralante/apptonomia) |
| [Calculia](https://calculia.apptonomia.uk/) | Math and logical reasoning | [github.com/miralante/calculia](https://github.com/miralante/calculia) |
| [Memofun](https://memofun.apptonomia.uk/) | Flashcards built around meaningful learning | [github.com/miralante/memofun](https://github.com/miralante/memofun) |
| [Okeymoney](https://okeymoney.apptonomia.uk/) | Personal finance and everyday autonomy | [github.com/miralante/okeymoney](https://github.com/miralante/okeymoney) |
| [Routime](https://routime.apptonomia.uk/) | Activities for routines and daily-life skills | [github.com/miralante/routime](https://github.com/miralante/routime) |
| [Sinonimia](https://sinonimia.apptonomia.uk/) | Easy-read dictionary | [github.com/miralante/sinonimia](https://github.com/miralante/sinonimia) |
| [Teclatlon](https://teclatlon.apptonomia.uk/) | Touch-typing with a physical keyboard | [github.com/miralante/teclatlon](https://github.com/miralante/teclatlon) |

The canonical Cloudflare / deploy guide for the group lives in
[Apptonomia's `CLOUDFLARE.md`](https://github.com/miralante/apptonomia/blob/master/CLOUDFLARE.md).
This repo uses the **Workers + static assets** model (`wrangler.toml`
+ `[assets]`), which is a different shape than Apptonomia/Teclatlon's
classic Pages model — see [`CLOUDFLARE.md`](CLOUDFLARE.md) for the
local runbook.

## More about this project

- [About this project](https://sinonimia.apptonomia.uk/about/)
- [Privacy](https://sinonimia.apptonomia.uk/legal/privacidad.html)

