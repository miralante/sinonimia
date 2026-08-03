# Languages — extending Sinonimia to more languages

> **Policy**: Sinonimia is a multilingual dictionary. Spanish (`es`) and
> English (`en`) are the two **defaults** shipped today, and the
> architecture is designed so that adding a third — or fourth — language
> requires **no changes at all to `js/app.js`**. This document is the
> step-by-step for extending to a new language (and for keeping an
> existing one healthy).
>
> **Other language**: [Español](../es/idiomas.md)
>
> See [`SPEC.md`](SPEC.md) for *what* Sinonimia is and the content rules
> every entry must follow; see [`technical.md`](technical.md) for the
> full code architecture. This document is the third pillar: it assumes
> you've read both, and only documents the cross-cutting rules that
> govern multi-language support.

---

## 1. Policy

Sinonimia's content policy is "as many languages as there are
contributors willing to keep them healthy". Today the dictionary ships
in Spanish and English; the architecture makes the cost of adding a
new language almost entirely editorial (write the words, translate the
UI), not engineering — that's a deliberate design choice.

What this policy is **not**:

- It is **not** "auto-translate one language from another". Each
  language's dictionary is written from scratch in that language,
  picking the words that are genuinely hard **in that language** (see
  "Why we don't translate word-for-word" in [`SPEC.md`](SPEC.md)'s
  "Process for expanding content").
- It is **not** "translate the UI and call it a day". A new language
  needs a real glossary of words in it; the dictionary is the product,
  not the chrome around it.
- It is **not** "symmetric". A language may legitimately have words that
  don't exist in any other (a bureaucratic term unique to one
  country's administration), and a Spanish/English word may have no
  equivalent in the new language at all. `traduccion` is optional and
  one-to-many.

## 2. Why the architecture already supports it

`js/app.js` is intentionally **language-agnostic**. Concretely:

- `AVAILABLE_LANGUAGES = Object.keys(DICCIONARIOS)` — every key present
  on the global `DICCIONARIOS` is automatically a working language.
- `translate(language, key, variables)` looks up `I18N[language][key]`
  with Spanish → English → raw-key fallback, so the UI never breaks
  because a key is missing in one language.
- The hash router (`#/<lang>/palabra/<id>`, `#/<lang>/juego`, …)
  validates the `<lang>` segment against `AVAILABLE_LANGUAGES` and
  redirects unknown languages to the default. The route *shape*
  (`palabra`, `juego`) is intentionally not translated, so all
  languages share the same URL grammar.
- Search, the alphabet filter, the topic filter, word-of-the-day,
  "Surprise me", both games, the progress bar, and the
  "write-your-own-sentence" feature are all driven by
  `activeDictionary = DICCIONARIOS[currentLanguage]`. None of them
  special-case `es` or `en`.
- `localStorage` is automatically namespaced per language (`…-aprendidas-<lang>`,
  `…-juego-aciertos-<lang>`, `…-mis-frases-<lang>`), so a new
  language starts with a clean slate and never collides with another.
- `scripts/validar.js` runs over **every** language in a single pass:
  adding a new language extends the same checks automatically.

What this means: a new language is a content + UI-copy exercise, not
a refactor. The only files you may need to **edit** are listed in
section 3; the only files you may need to **create** are listed in
section 4. Nothing in `js/app.js`, `css/styles.css`, or `scripts/`
changes.

## 3. Files that must change when adding a language

The order matters — the validator (`scripts/validar.js`) is the last
gate, and it fails if any of these steps is missed.

### 3.1 `js/i18n.js` — UI copy

The file ships two language blocks today (`es`, `en`). To add a third:

1. Copy the entire `en` (or `es`) block at the end of the `I18N`
   object.
2. Rename the new block's key to the ISO 639-1 code of the new
   language (e.g. `ca`, `gl`, `eu`, `fr`, `pt`, `de`).
3. Translate **every key** — don't leave any string in another
   language. The validator checks key-parity, not value parity, but a
   half-translated UI is worse than no translation at all.
4. Add an `idiomaNombre_<code>` key: this is the human-readable name
   the new language uses for itself in the **"Ver en {idioma}:
   {palabra}"** cross-language link. Today:
   - `idiomaNombre_es: "español"`
   - `idiomaNombre_en: "inglés"`
   For a new `ca` block: `idiomaNombre_ca: "català"`. Add it to **every
   existing block** too — that's how the cross-language chip reads the
   target language's *own* name for itself instead of a fallback.
5. Adjust `htmlLang` to the new language's locale. This drives the
   `<html lang="…">` attribute set by `js/app.js`'s boot path, which
   screen readers and search engines rely on.
6. If the language reads right-to-left (e.g. `ar`, `he`, `fa`),
   document here that `css/styles.css` needs a `dir="rtl"` rule for
   `<html>` in that language — this is the one piece of CSS that
   genuinely varies per language, and the only one `scripts/validar.js`
   doesn't catch automatically.

### 3.2 `js/data.<code>.js` — the dictionary

New file. The shape of an entry is documented in
[`technical.md`](technical.md) under "Dictionary entry shape", and the
comment at the top of `js/data.es.js` lists every field with an
example. Two rules specific to multi-language content:

- **`situacion` is a shared key across every language.** Pick from
  `tramites`, `salud`, `vida-diaria`, `finanzas`, `vivienda`,
  `trabajo`, `legal`, `tecnologia`, `seguridad`. These nine categories
  are the **IADL areas** (see [`SPEC.md`](SPEC.md)), the framework
  occupational therapy uses for adult-life autonomy — they are not a
  domain taxonomy, and they don't change with the language. If a
  category is genuinely missing for the new language's culture, do
  **not** invent a new one for a handful of words; see "When to add a
  new `situacion`" in [`SPEC.md`](SPEC.md) for the threshold (a real
  handful of words that justifies it, and a `tema_<key>` label added
  in **every** `I18N` block in the same commit).
- **`traduccion` is optional.** When set, it's the authoritative
  cross-language link. When absent, the shared-pictogram fallback in
  `js/app.js` (each `imagen.id` is unique within each language, so two
  entries with the same pictogram link) picks the link. Because
  ARASAAC has only one "money" / "document" / "pen" pictogram, the
  fallback resolves only a fraction of cross-links — for most entries
  in a third language, you'll want to write `traduccion` by hand in
  both directions (`<code>` entries pointing at `es`/`en` ids, and
  `es`/`en` entries pointing back at the new `<code>` ids where
  equivalents exist).

The header of each data file also says so explicitly — read it before
adding the first entry.

### 3.3 `index.html` — script tag, language button, meta tags

Two additions, in this order (the file's `<script>` order must put
**all** `data.*.js` before `app.js`):

1. `<script src="js/data.<code>.js"></script>` — placed alongside
   the existing `<script src="js/data.es.js">` and
   `<script src="js/data.en.js">`. Without this tag,
   `DICCIONARIOS.<code>` is undefined when `app.js` boots, and the
   language will silently disappear.
2. Inside the `.idioma-selector` block, add a button:
   `<button type="button" class="idioma-btn" data-lang="<code>" aria-pressed="false"><FLAG/NATIVE LABEL></button>`.
   - The button label is the **endonym** (the language's name for
     itself), not "Catalan" or "Spanish" — `Català`, `Español`,
     `English`, `Português`. This is the convention used by the
     existing buttons.
   - Don't translate `data-lang`: it's the URL token, and route
     segments are deliberately not translated (see
     [`technical.md`](technical.md) — "Naming exceptions").

The `<html lang>` attribute is set dynamically by `js/app.js` from
`I18N[currentLanguage].htmlLang`, so it doesn't need to be hardcoded
in the HTML.

### 3.4 `about/index.html` and `about/privacidad.html` — dual-language blocks

These pages are built as parallel `data-lang-block="<code>"` blocks
(one per language), not via `I18N`. They ship their own `about.js`,
which:

- Reads `?lang=…` from the URL to deep-link to a specific language,
  with an `if (requested === "es" || requested === "en")` whitelist
  at the top.
- Sets `<html data-lang="<code>">` and toggles which
  `data-lang-block` is visible via CSS (`[data-lang-block]` rules at
  the bottom of `css/styles.css`, scoped to `.page-about` /
  `.page-privacidad`).

When adding a language:

1. **Whitelist the new code in `about.js`**: extend the `if`
   condition so `?lang=<code>` is accepted and the `data-lang`
   attribute is set on `<html>`. Without this, deep links to the new
   language silently fall back to whatever was already on `<html>`.
2. **Add `data-lang-block="<code>"` parallel blocks**: for every
   element that currently has `data-lang-block="es"` and
   `data-lang-block="en"` (headings, paragraphs, buttons, footer
   note), add a third block in the new language. Visibility is
   controlled by CSS attribute selectors keyed on the root's
   `data-lang`, so the new block will automatically appear when the
   new language is picked.
3. Same applies to `about/privacidad.html`.

This is the **only** page family that uses `data-lang-block` instead
of `I18N`; everything else goes through the central `t()` helper.
Don't move the about pages to `I18N` as part of adding a language —
keep the convention as it is, and just add a parallel block plus
the whitelist entry.

### 3.5 `js/bootstrap-i18n.js` — pre-paint strings

This tiny script runs synchronously from `<head>` before the first
paint, so an English-speaking user doesn't briefly see Spanish
content. It mirrors **only** the three `<head>`-relevant keys
(`htmlLang`, `metaTitulo`, `metaDescripcion`) — the full `I18N`
copy lives in `js/i18n.js`. The script hardcodes a `BOOTSTRAP_I18N`
object keyed by language code, and an `AVAILABLE` array used by
`resolveLang()`.

When adding a language:

1. Add a `<code>: { htmlLang, metaTitulo, metaDescripcion }` entry
   to `BOOTSTRAP_I18N`. The strings must match the same keys in
   `I18N.<code>` (kept in two places on purpose — `bootstrap-i18n.js`
   can't load `js/i18n.js` from `<head>` without a circular
   dependency, so they're mirrored by hand). `scripts/validar.js`
   doesn't enforce this mirror (the strings are dynamic), but if
   they drift, the title and meta description flash between the
   pre-paint and the post-`app.js` versions.
2. Add the new code to the `AVAILABLE` array — otherwise
   `resolveLang()` will silently fall back to the default for
   matching browser locales and hash routes.

### 3.6 Other touchpoints

- **`404.html`**: contains the same `data-lang-block` blocks for ES
  and EN. Add a third block in the new language.
- **`README.md`** and **`README.es.md`**: when the dictionary reaches
  the threshold described in
  [`SPEC.md`](SPEC.md) → "Process for expanding content", add a
  short "Try it" sentence in the new language.
- **`doc/{en,es}/SPEC.md`** and **`doc/en/technical.md`** /
  **`doc/es/tecnico.md`**: add a one-line note in the multi-language
  section pointing at this document, if the existing text is updated.

## 4. Files that don't change

Worth listing explicitly, because "what does NOT need to change" is
where the architecture decision shows up:

- **`js/app.js`** — never. If you find yourself wanting to edit it
  for a new language, that's a bug in this document, not in
  `app.js`. Read it again.
- **`css/styles.css`** — except for the RTL caveat in 3.1 step 6.
  The language selector, the topic pills, the search box, the games,
  and the typography rules are language-agnostic.
- **`scripts/validar.js`** — it iterates over `Object.keys(I18N)` and
  `Object.keys(DICCIONARIOS)` automatically. It will, however,
  **flag** a new language that doesn't satisfy the existing checks
  (every entry has a unique id, a valid `situacion`, a pictogram file,
  examples that match the headword). A red CI is expected on the
  first commit of a new language; iterate until it's green.
- **`scripts/estado-contenido.js`** — counts words per `situacion` per
  language. A new language starts at 0; the script will suggest the
  nine categories in order of need.
- **The CSP in `_headers`** — no language-specific sources.
- **Routing / URL grammar** — route tokens (`palabra`, `juego`) are
  not translated on purpose. URLs stay
  `#/<lang>/palabra/<id>` for every language.

## 5. Cross-language linking — `traduccion` and the pictogram fallback

`js/app.js` resolves cross-language links in two passes; both are
documented in detail in [`technical.md`](technical.md) under
"Dictionary entry shape → `traduccion`: linking the same concept
across languages". The summary relevant to a new language:

1. **Pass 1 (preferred)**: an entry's `traduccion.<code>` field lists
   the `id`s in the target language that mean the same concept. For
   a Spanish word with several valid Catalan translations, use an
   **array** of ids (`traduccion: { ca: ["foo", "bar"] }`).
2. **Pass 2 (fallback)**: if `traduccion` doesn't mention a
   language, fall back to "both entries share a unique pictogram".
   This works only when each language has exactly one entry per
   pictogram; ARASAAC has only one "money" pictogram, so it can't
   resolve many entries on its own.

In a new language, the typical sequence when adding a word is:

1. Decide on the headword and `situacion`.
2. Look up the equivalent (if any) in `es` and `en` by id, and add
   `traduccion: { es: "<id>", en: "<id>" }` to the new entry.
3. Add `traduccion: { <code>: "<new-id>" }` to the existing `es`/`en`
   entries so the link works in **both** directions. A link only
   written on one side is half a link.
4. Only if the new word genuinely has no equivalent in `es` or `en`
   (a culture-specific term) skip this step — and don't invent an
   artificial equivalence to fill the gap.

## 6. Per-language persistence and why it's automatic

`localStorage` keys are namespaced by language code (`…-<lang>`),
because the three things the app saves — discovered words, game
correct-answer counts, "your own sentence" per word — are content of
that specific dictionary, not of the user. The namespacing is
hardcoded in `js/app.js` and uses `currentLanguage` as the suffix.
Practical consequences:

- A user with progress in `es` and `en` who switches to a new `ca`
  starts at zero in `ca`. That's correct: they haven't discovered
  any Catalan words yet.
- Renaming the language code (`ca` → `cat`) silently loses the saved
  progress for that language. Don't rename a code after launch — the
  URL token, the `I18N` key, the `DICCIONARIOS` key, the data-file
  name, the `<script>` tag's filename, the `data-lang` attribute,
  and the `localStorage` suffix are **all the same string**, and
  they're all persisted state contracts.

## 7. The cross-language UX: switching language loses the word

`js/app.js`'s router intentionally goes back to the **list view** in
the new language when you switch languages, instead of trying to
translate the word you were looking at. This is a design choice, not
a bug:

- A given headword often doesn't exist in the other language.
- The two dictionaries aren't aligned 1:1 (English may have a word
  Spanish doesn't, and vice versa).
- "Translate this word" is exactly what the user was using the site
  to avoid.

The cross-language link on each word's detail page is the
**explicit** way to jump to the equivalent entry in another language;
the language switcher is for "I want to browse in a different
language". Keep the distinction.

## 8. Adding a new `situacion` category across languages

Cross-listing because it's a multi-language decision:

- See [`SPEC.md`](SPEC.md) → "Process for expanding content" for the
  threshold (a real handful of words, not two or three stray ones).
- The new key is added to the same `situacion` field in **every**
  language's data file's entries that justify it, and a
  `tema_<key>` label is added in **every** `I18N` block, all in the
  same commit. The nine existing keys (`tramites`, `salud`,
  `vida-diaria`, `finanzas`, `vivienda`, `trabajo`, `legal`,
  `tecnologia`, `seguridad`) are the AIVD framework — they apply to
  every language because they describe adult-life areas, not
  cultural concepts. A new key is only justified if it's also an
  AIVD-shaped area.

## 9. When NOT to add a new language

Adding a language is cheap code-wise but real editorial work. Don't
do it if:

- You're just translating the UI for marketing reasons: the
  dictionary is the product. A language with 5 entries isn't
  useful, and below the 8-word-per-category threshold that
  [`SPEC.md`](SPEC.md) sets, the topic filter is full of empty boxes.
- The "language" is actually a regional variant of an existing one
  (es-ES vs. es-MX): keep it in the same dictionary. The
  per-language progress storage is per *language*, not per locale,
  precisely so we don't fragment that way.
- You can't write the easy-read rules for it: if the source language
  doesn't have a plain-language convention analogous to UNE
  153101:2018 EX or Inclusion Europe, the content can't satisfy the
  editorial rules and the dictionary will read like jargon dressed
  up. Wait until the rules exist.

## 10. Reference: a complete checklist

For the person who just said "let's add Catalan":

1. `node scripts/estado-contenido.js` — see the current per-language
   per-category counts.
2. Create `js/data.ca.js` with the first ~20 entries in `ca`,
   following the easy-read rules of [`SPEC.md`](SPEC.md) →
   "Design principle: easy-read language".
3. Add a `ca` block to `I18N` in `js/i18n.js` (copy `en`, translate
   every key, set `htmlLang: "ca"`, add `idiomaNombre_ca: "català"`).
4. Add `idiomaNombre_ca` to `es` and `en` blocks too.
5. In `index.html`, add the `<script src="js/data.ca.js">` tag
   **before** `<script src="js/app.js">`, and add a language
   selector button.
6. In `about/index.html` and `about/privacidad.html`, add parallel
   `data-lang-block="ca"` blocks for every existing dual block, and
   extend the `if (requested === "es" || requested === "en")`
   whitelist in `about.js` to include `"ca"`.
7. In `404.html`, add the `ca` text for the message and the three
   buttons.
8. In `js/bootstrap-i18n.js`, add a `ca` entry to `BOOTSTRAP_I18N`
   with `htmlLang`, `metaTitulo`, and `metaDescripcion` mirroring
   the same keys in `I18N.ca`, and add `"ca"` to the `AVAILABLE`
   array.
9. Find pictograms: `node scripts/buscar-pictograma.js "<term>" ca`
   for each new entry (it auto-falls-back to ARASAAC if
   OpenSymbols has no Catalan hits).
10. Add `traduccion` fields in **both directions** between the new
    entries and their `es`/`en` equivalents.
11. Run `node scripts/validar.js` — fix anything red.
12. Run `node scripts/estado-contenido.js --detalle` — confirm the
    category counts are no longer below 8 for `ca` in the
    categories you filled.
13. Update `README.md` / `README.es.md` "Try it" section with a
    Catalan sentence.
14. Open the page, click the new language button, and read three
    random entries out loud — if any one sounds like a translated
    legal text, rewrite it. Easy-read doesn't translate.

That's the whole procedure. `js/app.js` doesn't appear once in the
list, and that's the point.