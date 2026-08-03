# Contributing to Sinonimia

> 🌐 **Other languages:** [Español](CONTRIBUTING.es.md)

Sinonimia has **two differentiated roles** in its community (see
[`doc/en/roles.md`](doc/en/roles.md) for the rationale — unlike projects
with a dedicated support role, Sinonimia is designed to be used alone,
with nobody needing to mediate):

1. 👤 **End user** — anyone who runs into a difficult word (at its origin,
   people with intellectual disability in an occupational-therapy context).
   They use the site directly. **They do not read or write code**, and
   that is precisely the goal: the tool is for them.
2. 💻 **Contributor** — whoever proposes a new word, a new language, or
   touches the code. This role covers both content and code contributions;
   see the sections below.

This guide is for the **contributor** role. End users don't read this
documentation.

---

## 👥 The project roles

| # | Role | Who they are | Participate on GitHub |
|---|---|---|---|
| 1 | 👤 **End user** | Anyone who runs into a difficult word | No. Uses the site autonomously. Their experience is at the center of the product, but they don't read this documentation. |
| 2 | 💻 **Contributor** (content or code) | Whoever proposes a new word, a new language, or touches the code | **Yes**: with content (easy-read definitions, examples, pictograms) or with code (HTML/CSS/JS). |

> ⚠️ Purely technical decisions (GitHub, code architecture, infrastructure)
> are made by contributors, **not because the end user is ignored, but
> because that is each role's domain**. Product, content, language and UI
> design decisions **are tested and validated with them** whenever
> possible, and their feedback is the primary source for improvement.

See [`doc/en/roles.md`](doc/en/roles.md) for where each role should look
first.

---

## 🔀 GitHub workflow

This is the flow we use to integrate contributions in an orderly way.

### For any participating profile

```
1. 🔍 Search or create an issue (in Spanish or English)
2. 💬 Comment and agree on scope
3. 🌿 Create a branch (fork if you don't have push access)
4. ✏️  Make changes following our guides
5. 📤 Open a Pull Request (PR) referencing the issue
6. 👀 Wait for review (at least 1 from a maintainer)
7. ✅ Merge when approved
```

**Issue labels** (we use them to classify):

| Label | Meaning |
|---|---|
| `content` | New word, new definition, new example, new pictogram |
| `i18n` | New language, missing translation, locale fix |
| `UX` | Usability or accessibility improvement |
| `bug` | Reproducible error in behavior |
| `tech` | Technical implementation, refactor, technical debt |
| `docs` | Documentation changes |
| `good first issue` | Suitable for a first contribution |
| `needs-content` | Awaits content review before merge |
| `needs-dev` | Awaits developer review before merge |

### Branch conventions

- `feat/<slug>` — new features
- `fix/<slug>` — bug fixes
- `docs/<slug>` — documentation-only changes
- `content/<slug>` — new word or content changes (definitions, examples)
- `i18n/<code>` — translation to a language (e.g. `i18n/ca`, `i18n/gl`)

Examples:
- `content/new-word-aforo`
- `i18n/ca-catalan`
- `fix/audio-not-playing-on-mobile`

### Commits

- Message in **English** (repo convention), summary in imperative
- One thing per commit — large commits can be asked to be split
- If you close an issue, include `Closes #123` at the end

---

## 📝 Guide for content contributors

### What you can contribute

- **Add a new word** with its definition, synonym, two examples, and a pictogram
- **Add a new language** (full or partial coverage)
- **Review the wording** of existing entries (easy-read style, tone, accuracy)
- **Cross-link translations** between languages with the `traduccion` field
- **Suggest adaptations** for specific user profiles

### How to start

1. Read [`doc/en/SPEC.md`](doc/en/SPEC.md) — it isn't optional
   documentation. It contains the easy-read rules, the multi-language
   architecture, and the non-negotiable product constraints that your
   content must never break.
2. Run `node scripts/estado-contenido.js` (add `--detalle` to see the
   words and synonyms that already exist per category). It tells you
   which categories have few words and keeps you from proposing a concept
   that's already covered under another word.
3. For the full procedure, see **"Process for expanding content"** in
   [`doc/en/SPEC.md`](doc/en/SPEC.md).

### How to add a word

0. Run `node scripts/estado-contenido.js` first to pick a category that
   needs more words.
1. Pick its language's file: `js/data.es.js` or `js/data.en.js`. Each
   language is expanded separately: the diagnosis from step 0 counts
   categories language by language, and a word doesn't need an equivalent
   in the other language. Look for candidate terms in a source for the
   language you're editing — don't translate words from the other file.
2. Copy an entire `{ ... }` block and fill in its fields. The comment at
   the top of each file explains every field.
3. Follow [`doc/en/SPEC.md`](doc/en/SPEC.md)'s easy-read rules to the
   letter: short sentences, one idea per sentence, familiar words, no
   avoidable abstractions. Read it out loud when you're done: if it
   sounds like legal or clinical text, rewrite it.
4. Check that `ejemplo.palabra` and `ejemploSinonimo.palabra` appear
   verbatim inside `ejemplo.texto` and `ejemploSinonimo.texto` (with the
   exact conjugation or gender) — the site's word-highlighting and the
   fill-in-the-blank game depend on it.
5. If the word has a clear equivalent in another language, add a
   `traduccion` field linking it by id — a string for one-to-one, an
   array for one-to-many. This is optional: when the new word's pictogram
   is unique on both sides, the shared-pictogram fallback in `js/app.js`
   picks the link for you. But because ARASAAC has only one "money"
   pictogram, one "document" pictogram, etc., the fallback resolves only
   a fraction of entries — without an explicit `traduccion`, a Spanish
   word whose pictogram is shared by several unrelated words (the common
   case) won't link to its English counterpart. Add the field by hand
   to `js/data.es.js` (or to whichever language's file you're editing).
6. It needs a pictogram. Before downloading anything, check whether an
   image for that concept already exists in `img/` — it can be reused
   across words and languages. To search for candidates:
   ```
   node scripts/buscar-pictograma.js "keyword" <lang>
   ```
   Use the same language code as the word (`es`, `en`...). It searches
   **OpenSymbols** first (aggregates ARASAAC, Sclera, Mulberry, and other
   banks) if you have the `OPENSYMBOLS_SECRET` environment variable set
   (get one free at https://www.opensymbols.org/api — never commit it).
   **Without that variable, or if OpenSymbols fails or finds nothing,
   the script automatically falls back to ARASAAC's public API alone**
   (that part needs no key). Either way it only lists candidates with
   their bank, license, and author — the pictogram is downloaded by hand
   into `img/<id>.png`.
   - The search is literal, not by meaning: if the word's exact term
     returns nothing (common with abstract words like "aforo" or
     "incidencia"), try a synonym of it or of its definition before
     giving up.
   - On Windows, if downloading the image with `curl` fails with a
     `schannel`/certificate-revocation error, add `--ssl-no-revoke`.
   - **Important note on licensing**: if the chosen pictogram isn't from
     ARASAAC, note its bank, license, and author — the footer credit
     (`js/i18n.js`, key `pieCreditosHtml`) currently only mentions ARASAAC
     and needs to be expanded before merging the change. See "Pictograms"
     in `doc/en/technical.md`.
7. `situacion` has to be one of the keys shared across every language:
   `tramites`, `salud`, `vida-diaria`, `finanzas`, `vivienda`, `trabajo`,
   `legal`, `tecnologia`, or `seguridad` (see "Multi-language
   architecture" in [`doc/en/SPEC.md`](doc/en/SPEC.md) for what each one
   covers). Don't invent a new key for two or three stray words, and if
   one is genuinely needed, also add its label in `js/i18n.js`
   (`tema_<key>`) for every language.
8. Run `node scripts/validar.js` to make sure the new word is well-formed
   and (if you added a `traduccion` in step 5) the cross-language link
   resolves.

### How to add a language

The full step-by-step lives in [`doc/en/I18N.md`](doc/en/I18N.md). That
document is the canonical reference — the short summary is "a new block
in `I18N` (`js/i18n.js`), a new `js/data.<lang>.js` file, its `<script>`
tag in `index.html`, and a button in the language selector", but the
full guide covers the `bootstrap-i18n.js` mirror, the `about.js`
whitelist, the parallel `data-lang-block` blocks on `about/*` and
`404.html`, the `idiomaNombre_<lang>` key that has to be added in every
existing `I18N` block, the `traduccion` cross-link conventions, the
per-category 8-word threshold, and a complete checklist. `js/app.js`
doesn't need to be touched: it already works with any language that
appears in `DICCIONARIOS`.

### How to review a content PR

When a PR adds or changes content, your review as a content contributor
validates that:

- The definition follows the easy-read rules
- `ejemplo.palabra` and `ejemploSinonimo.palabra` are present verbatim
- The pictogram is appropriate and properly licensed
- The cross-language `traduccion` link (if present) resolves

---

## 💻 Guide for code contributors (developers)

### What you can contribute

- Add new words, languages, or cross-language links
- Fix bugs and improve performance
- Refactor shared code (`js/app.js`, `js/i18n.js`, `js/bootstrap-i18n.js`)
- Improve accessibility, PWA, responsive
- Keep `doc/en/technical.md` up to date

### How to start

1. Read [`doc/en/SPEC.md`](doc/en/SPEC.md) §3–§4 — product constraints
   and principles.
2. Read [`doc/en/technical.md`](doc/en/technical.md) entirely — you'll
   understand the architecture, the dictionary schema, and the recipes.
3. Run `node scripts/validar.js` to verify your environment is good.

### Quick recipes

- **New word** → the "How to add a word" section above
- **New language** → [`doc/en/I18N.md`](doc/en/I18N.md) §5
- **Pictogram sourcing** → `scripts/buscar-pictograma.js`

### Checklist before opening a PR

- `node scripts/validar.js` passes without errors
- Tested on mobile (responsive 360 px)
- No console errors
- If you changed UI strings, the keys exist in every `I18N` block
- If you added a DOM id that `js/app.js` looks up, it exists in
  `index.html`

---

## 🚫 What this repo does NOT accept

(They're here so they don't get suggested and we all save time)

- **Changes that break easy-read, accessibility or privacy** — they are
  the non-negotiable product constraints ([SPEC §3](doc/en/SPEC.md))
- **New dependencies** (npm, CDNs) — vanilla HTML/CSS/JS only, see
  [`doc/en/technical.md`](doc/en/technical.md)
- **Features that add pressure** to the end user (visible timers,
  rankings, comparisons, "game over")
- **Clinical or bureaucratic language in the UI** — only allowed in
  `doc/*` internal documentation; user-facing content must be easy-read
  and must never mention the project's occupational-therapy origin
- **Personal data** of any kind — the site runs on `localStorage` only
- **Imposing technical decisions on the end user** — their experience is
  always cared for from design; they aren't consulted about GitHub

---

## 📞 Communication

- **Issues** → main channel for proposals, bugs, questions
- **Discussions** (if enabled) → for open debate, general questions, help
- **Pull Request reviews** → for review of specific changes

> 💡 **Tip**: if your contribution crosses boundaries (e.g. a new word
> that needs a content review and a cross-language link that needs a
> developer review), open **two related issues** or one issue with both
> labels (`needs-content`, `needs-dev`). That way both know they need to
> step in.

---

## 📜 Code of conduct

This project follows [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md).
Participating means accepting it.

---

## 🙏 Thanks

Thanks for devoting time to a tool that helps make language a little more
accessible to whoever needs it.
