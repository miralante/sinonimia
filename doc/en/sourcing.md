# Sourcing candidate words

Companion to "Process for expanding content" in [`SPEC.md`](SPEC.md) — that
section's step 3 describes two ways to find candidate words for a category
(an existing reference glossary, or a domain corpus scored for *keyness*
against general-language frequency with `scripts/candidatos-corpus.js`).
This file is the practical, copy-pasteable version of that step: a prompt
template for each method, and a table of plausible sources for every
`situacion` category, in `es` and `en`. The table is a starting point, not
a closed list — swap in whatever real source you can get your hands on.

Always start with:

```
node scripts/estado-contenido.js
```

to see which category+language combinations need work. Once you've picked
one, re-run scoped to it:

```
node scripts/estado-contenido.js --detalle --categoria {categoria} --lang {idioma}
```

to see which words (with their synonyms, definición and ejemplo) are
already covered, so neither method below proposes a duplicate or recycles
an illustrative scenario already used in that category. Scoping this way
also keeps the output small — never open `js/data.<lang>.js` directly to
answer this question, it's 1MB+/20,000+ lines per language.

## Prompt A — domain corpus + keyness (`candidatos-corpus.js`)

Fill in `{categoria}` (one of `tramites`, `salud`, `vida-diaria`,
`finanzas`, `vivienda`, `trabajo`, `legal`, `tecnologia`, `seguridad`) and
`{idioma}` (`es`, `en`...), then hand this to whoever — person or agent —
is doing the sourcing pass:

```
Gather a domain corpus for category {categoria} in {idioma} for the
Sinonimia plain-language dictionary.

1. Collect 15-30 REAL text excerpts (not invented) typical of that
   domain — see the corpus source table in doc/en/sourcing.md for
   {categoria}.
2. Paste the raw text (as it appears in the source, don't over-clean it)
   into a .txt file, e.g. dev/corpus/{categoria}-{idioma}.txt.
3. Run: node scripts/candidatos-corpus.js <file> {idioma} 40
4. Discard any candidate that already appears in
   `node scripts/estado-contenido.js --detalle --categoria {categoria} --lang {idioma}`.
5. For each candidate worth keeping, confirm by hand that it fits
   {categoria} and not another one (a domain ontology doesn't map 1:1 onto
   Sinonimia's AIVD categories — human judgment, not automatic).
6. Write the entry following SPEC.md's easy-read rules, find a pictogram
   with scripts/buscar-pictograma.js, validate with scripts/validar.js.
```

### Real example (2026-07-26 to 2026-08-16)

This technique isn't just theoretical — it's produced more real entries
than the other two, from concrete corpora kept in `dev/corpus/` (a
gitignored folder, maintainer content, not in the repo):

- `dev/corpus/trabajo-es.txt` — employment contracts, payslips, severance
  letters, collective layoffs.
- `dev/corpus/servicios-es.txt` — utility bills, service contracts,
  supply agreements.
- `dev/corpus/registro-propiedad-es.txt` — property deeds, land-registry
  extracts, mortgages.

Against those three corpora, `candidatos-corpus.js` (ranking by keyness
against hermitdave/FrequencyWords as the everyday-language baseline)
yielded, across two separate passes (commits `b40926e` and `5c48c64`): 34
ES + 34 EN from the first pass (spread across `trabajo`, `vivienda`,
`legal`, `tramites`) and a handful more genuine gaps on the second pass
(`comercializadora`, `distribuidora`, `prestatario`, `prestamista` / their
English mirrors — `energy supplier`, `grid operator`, `lender`; most
keyness candidates on the second pass were already covered by an existing
entry or synonym, a sign the real gap shrinks once a category already has
some body to it).

The same warning repeated in step 4b below showed up here first:
`5c48c64` had to hand-fix a pictogram that `ingesta_batch.js` matched to
"eléctrica" (electric) and got back an electric wheelchair — the
word-collision, not meaning-collision, problem isn't new this week, it's
been happening since the first time the automated pipeline ran.

## Prompt B — existing plain-language glossary

```
Find an EXISTING plain-language glossary (not a jargon-heavy technical
one) for category {categoria} in {idioma}, for the Sinonimia dictionary.

1. Look for real, official, or reference sources written in plain
   language — see the glossary source table in doc/en/sourcing.md for
   {categoria}. Verify it's genuinely "plain language" and not a
   technical glossary that leaves jargon unexplained.
2. Extract the terms the glossary itself already explains simply. Write
   Sinonimia's own wording — don't copy the source text (copyright and
   house style both require original wording, not a translation of the
   source either).
3. Discard terms that already appear in
   `node scripts/estado-contenido.js --detalle --categoria {categoria} --lang {idioma}`.
4. Confirm by hand that each term fits the correct AIVD category — the
   source glossary's own classification doesn't have to match.
5. Write the entry in js/data.{idioma}.js, find a pictogram with
   scripts/buscar-pictograma.js, validate with scripts/validar.js.
```

**Honesty note**: unlike Prompts A and C (both with real documented passes
below, commit hash and numbers included), there's no trace in the git
history of this prompt ever actually being run against any of the
glossaries in the table below — MedlinePlus, SEPE, INCIBE, none of those
names show up in any commit message. The table is a reasonable starting
point (real sources, genuinely plain-language, plausible URLs), but **it
hasn't been verified in practice** yet. If you use it, confirm the source
still exists and is still genuinely plain language before trusting the
table entry, and consider adding the real result here the first time you
use it, the way A and C already have.

## Prompt C — general-frequency candidate list + filters

Unlike A and B (which look for candidates one category at a time), this
method builds a broad candidate pool covering every category at once,
starting from a general-language frequency corpus instead of a glossary
or domain corpus. It's for a "broad expansion" pass rather than filling
one specific gap. A raw frequency list carries a lot of noise — proper
nouns, conjugated forms, vocabulary that's already understood — so it
takes several chained filters before the list is worth reviewing by hand.
This section documents those filters and their sources, so they're
reproducible even without the exact script that implemented them.

> The reference implementation (`scripts/ingest/pipeline/es_list_clean.js`
> and `en_list_clean.js`) is the maintainer's local tooling and **is not in
> the repository** (all of `scripts/ingest/` is gitignored — see
> [`scripts/ingest/README.md`](../../scripts/ingest/README.md)). What *is*
> part of the project, and why it lives here, is the criteria: anyone
> (person or agent) can reproduce the same filtering by hand or with a new
> script by following this list.

1. **Lexical validity** — the candidate has to be a real, general-use
   word, not an archaism, dialectalism, or obscure loanword. Source:
   [rspeer/wordfreq](https://github.com/rspeer/wordfreq),
   `small_es.msgpack.gz` / `small_en.msgpack.gz` (~35,000 / ~29,000 words
   spread across ~600 frequency bins). Without this filter, a
   Wiktionary-type source returns a lot of completist noise.
2. **Proper nouns** — first names, surnames, cities, and countries get
   dropped. Sources (the same English-language lists work for `es` too,
   since a proper noun doesn't translate):
   - First/given names:
     [dominictarr/random-name](https://github.com/dominictarr/random-name)
     and
     [smashew/NameDatabases](https://github.com/smashew/NameDatabases)
     (`first names/us.txt`).
   - Surnames: smashew/NameDatabases (`surnames/us.txt`).
   - Cities:
     [datasets/world-cities](https://github.com/datasets/world-cities).
   - Countries:
     [umpirsky/country-list](https://github.com/umpirsky/country-list).
   For `es` this is auxiliary: the primary proper-noun source is Kaikki's
   `name` part-of-speech tag (next point) — these lists only catch
   international names that show up in the frequency corpus without
   their own Spanish Wiktionary entry.
3. **Non-independent ("form-of") forms and word families** — Wiktionary
   documents every grammatical inflection (conjugation, participle
   gender/number, plural...) as its own entry, tagged `form-of` the base
   entry. An entry whose only senses are `form-of` isn't a useful
   dictionary headword on its own. Source: [Kaikki.org](https://kaikki.org/)
   (Wiktextract extracts), filtered to `lang_code === "es"` / `"en"`
   since the extract documents dozens of languages at once.
   - An inflected form collapses into its base **only if the base is
     also already in the candidate pool** (never invents a base that
     wasn't already present).
   - **`es`**: gerunds (`-ando/-iendo/-yendo`) and participles used as
     adjectives (`-ado/-ada/-ido/-ida` and their plurals) collapse into
     the infinitive; the Spanish gerund almost never has its own
     Wiktionary entry (unlike English), so that collapse is done by
     direct morphological reconstruction, not by `form-of`. Verb +
     enclitic-pronoun forms (`abandonarlo`, `decírselo`) are always
     dropped — never a dictionary headword, whether or not the
     infinitive is itself a candidate. Deverbal nouns (`abandono`,
     `trabajo`, `cambio`) only collapse into the infinitive when Kaikki
     confirms that exact word is also the first-person form of that verb
     — this avoids touching nouns that coincidentally match a
     conjugation (`cocina`, `campo`, `gasto` have no such record and stay
     untouched).
   - **`en`**: gerunds (`-ing`) only collapse if Kaikki gives them no
     independent entry of their own — English lexicalizes gerunds as
     nouns often (`housing`, `meeting`, `premises`), Spanish almost never
     does. Past participles and third-person forms collapse
     unconditionally. Plurals collapse unless they're on a hand-curated
     exception list for meanings that diverge from the singular
     (`customs` ≠ "habits", `arms` ≠ "arm", `damages` ≠ "harm",
     `proceedings` ≠ "a proceeding").
4. **Elementary vocabulary already understood** — the frequency filter
   (point 1) conflates "rare in the corpus" with "hard for the target
   audience," and those aren't the same thing: in `small_es.msgpack.gz`,
   "abeja" (bee, bin 553 of 600) is literally rarer than "custodia"
   (custody, bin 489) and about as rare as "allanamiento" (unlawful entry,
   bin 552) — a frequency cutoff that drops "abeja" would also drop real
   legal terms. This needs a source built to measure learning difficulty,
   not raw frequency. Source: [CEFRLex](https://cental.uclouvain.be/cefrlex/)
   — frequency-by-CEFR-level lexicons (A1-C1) for learners of a foreign
   language:
   - `es`: [ELELex](https://cental.uclouvain.be/cefrlex/elelex/)
     (TSV at
     `https://cental.uclouvain.be/cefrlex/static/resources/es/ELELex.tsv`,
     14,290 items).
   - `en`: [EFLLex](https://cental.uclouvain.be/cefrlex/efllex/)
     (TSV at
     `https://cental.uclouvain.be/cefrlex/static/resources/en/EFLLex.tsv`).
   - License **CC BY-NC-SA 4.0** (same family as ARASAAC's): non-commercial
     use, keep attribution if the derived data is redistributed.
   - Rule: drop a candidate if it's **attested** (the `nb_doc@a1` or
     `nb_doc@a2` column is > 0, i.e. it shows up in at least one document
     at that level) at A1 or A2 — elementary vocabulary that "Why 'only
     hard words'" in [`SPEC.md`](SPEC.md) already asks to exclude. Don't
     use the word's level of *peak* frequency: CEFRLex's corpus is built
     from a handful of specific readers per level, so a word can peak at
     B2 just because one B2 text happened to mention it repeatedly, while
     still being clearly elementary vocabulary — "abeja" (bee) is exactly
     that case: its highest ELELex frequency falls at B2, but it's
     attested in an A2 document, which is the signal that actually
     matters. A candidate absent from the list, or only attested from B1
     up, stays in the pool — absence from a language-learning lexicon is a
     signal it's specialized vocabulary, not that it's invalid. This rule
     is more aggressive than it looks (it drops ~3,600 `es` candidates /
     ~1,800 `en` candidates in one pass) and can catch the occasional
     moderately technical word that only shows up incidentally in an A2
     text (`acceder`, `actitud`) — step 4 of "Writing each entry" is still
     the final filter, so the cost of a false positive here is low.
4b. **Positive signal: B1-C1 as a boost, not a replacement** — step 4 only
   *drops* candidates (A1/A2-attested); it never uses the rest of
   CEFRLex's columns for anything. You can go one step further and use
   attestation at B1, B2 or C1 (`nb_doc@b1/b2/c1` > 0) as a positive
   signal that a candidate is worth a human look — instead of just "not
   proven elementary", require "proven intermediate-to-advanced".
   Combined with a domain filter (topic-stem matching per category, or
   Prompt A's own corpus) this shrinks the "not A1/A2" pool down to a
   handful that's actually worth reviewing word by word.

   **Important caveat**: CEFRLex is built from graded readers and
   exam-prep material for language learners — genuinely specialised
   bureaucratic/medical/legal jargon ("power of attorney", "council tax
   registration") is often simply **absent** from CEFRLex, not "attested
   at C1". Requiring positive B1-C1 attestation drops that vocabulary
   just as aggressively as step 4 drops elementary vocabulary — so treat
   this as a *complementary* filter that widens the candidate pool with
   intermediate-to-advanced general-register vocabulary (most useful for
   less jargon-heavy categories like `vida-diaria`, `seguridad`, or the
   more colloquial end of `legal`), not a replacement for step 4 on the
   rest of the categories.

5. **Already covered in the dictionary** — drop any candidate that's
   already a `palabra`, in `sinonimos`, the `ejemplo` / `ejemploSinonimo`
   word, or appears inside an existing entry's `definicion` text (a word
   already used to explain another one is already covered), across both
   `js/data.es.js` and `js/data.en.js`, with simple regular-plural
   variants. Same principle Prompts A and B already apply via
   `scripts/estado-contenido.js --detalle`, just run in bulk over a large
   list instead of by hand candidate-by-candidate.
6. **Length** — a cheap heuristic to cut noise: 4-12 letters for `es`,
   4-10 for `en` (Spanish words run a bit longer on average). Doesn't
   replace the filters above, just avoids processing acronyms, stray
   abbreviations, and unwieldy long compounds that make poor standalone
   dictionary entries.

None of these filters replace step 5 of "Finding candidate terms"
(confirming by hand that each candidate fits its category) — they just
shrink the starting pool down to something worth reviewing person by
person.

### Real example from two passes (2026-08-18/19)

A real case helps more than an abstract list of criteria. Two back-to-back
passes with Prompt C, each pulling from a different source:

- **Pass 1 — general lexicon (Kaikki + wordfreq) + topic-stem filter.**
  Starting pool: 96,511 `es` words / 58,140 `en` words (the entire
  Kaikki/wordfreq vocabulary not already in the dictionary, with no
  difficulty filter). The per-category stem filter cut that to 543 `es` /
  154 `en`; hand editorial review left **23 `es` / 13 `en`** that
  genuinely met the bar ("shows up in a council letter, a court case, or
  a doctor's appointment").
- **Pass 2 — positive CEFRLex B1-C1 signal (step 4b) + the same stem
  filter.** Starting pool: only `es`/`en` words **attested** at B1, B2 or
  C1 and not at A1/A2 (5,956 `es` / 5,860 `en`). The stem filter cut that
  to 51 `es` / 31 `en`; hand review left **17 `es` / 9 `en`**.

Three things not obvious before that came out of these two passes:

- **The topic-stem filter throws a fair number of false positives from
  substring collisions, not meaning** — same failure mode as the
  existing "bee"/"custody" warning in step 4, but at the whole-word
  level: Spanish "confianza" (trust) and "coherencia" (coherence) aren't
  finance/legal terms, they just share letters with "fianza"
  (bond/surety) and "herencia" (inheritance); "reemplazar" (replace)
  matched only because it contains "emplaz-" (from "emplazamiento",
  legal summons), with no actual connection to the legal category. Read
  every candidate — don't just trust that the stem appears.
- **`ingesta_batch.js` searches ARASAAC by literal term match, and that
  produces false positives that are worse than "no result"** (unlike the
  case already documented in `SPEC.md`, where the problem is nothing
  comes back at all): searching "cuentas" for Spanish "presupuestario"
  returned jewelry beads (the other meaning of "cuentas"); searching
  "company" for English "shareholder" returned a group of people
  ("accompanied/company", not "business"); searching "court" for
  "litigate" returned a tennis court. **Open and look at every
  downloaded image — never trust the keyword ARASAAC filed it under.**
  Of the 43 words ingested across these two passes, 14 initial
  pictograms had to be corrected by hand after actually viewing them.
  This isn't a new problem: the same failure shows up in other sessions'
  history — `5c48c64` (2026-08-16, Prompt A) with "eléctrica" (electric)
  returning an electric wheelchair, `be08c21` (2026-08-16) with the
  medical abbreviation "ENT" returning a pavement/sidewalk. Four separate
  sessions, same failure — worth treating as a structural part of the
  process, not a one-off slip.
- **Step 4b (positive CEFRLex B1-C1) gives a much smaller but
  higher-precision pool** than the unfiltered general lexicon: 51+31 raw
  candidates versus 543+154, with a similar editorial acceptance rate
  (~35% vs ~24%) but far less noise to wade through by hand. This
  confirms step 4b's own caveat: it's a complementary source, not a
  replacement for the general-lexicon pass on heavily jargon-specific
  categories (`legal`, `salud`) where the most specialised vocabulary
  doesn't even show up in CEFRLex.

## Prompt D — ARASAAC as a source (not just an illustrator)

Prompts A-C find the word first and search for a pictogram afterwards —
and that second step fails often (see the keyword-collision warnings
above). This prompt flips the order: start from ARASAAC's own pictogram
bank and find which already-illustrated concepts aren't a Sinonimia entry
yet. Every word that comes out of this **already has a guaranteed
pictogram** — it removes, at the root, the problem that cost the most
time across this week's two passes.

`api.arasaac.org` doesn't obviously document an "all pictograms"
endpoint, but `GET /api/pictograms/{locale}/new/{n}` (meant for "the N
newest pictograms") in practice **returns the entire bank if `n` is
larger than the total** — verified live: `n=20000` returned all 13,802
pictograms ARASAAC currently has, with their `categories`, `keywords` (in
the requested language) and the `schematic` flag, in one ~2-3 second
call. No key or account needed.

```
1. Download the whole bank:
   GET https://api.arasaac.org/api/pictograms/{locale}/new/20000
2. Filter by the ARASAAC categories closest to the AIVD category you
   care about (see the table below), and drop schematic:true (schematic
   pictograms tend to be worse editorial candidates).
3. Drop anything already covered — same as every other prompt, cross
   against
   `node scripts/estado-contenido.js --detalle --categoria {categoria} --lang {idioma}`.
4. Review by hand: ARASAAC's bank is built for AAC (augmentative and
   alternative communication) boards, not bureaucratic vocabulary — most
   of what comes out is concrete, everyday verbs/objects/actions
   ("bandage", "take your temperature", "tip"), exactly what SPEC.md asks
   to exclude. Only a small fraction fits "shows up in an official
   letter, a court case, or a doctor's appointment"; the rest is there to
   be discarded, not written up.
5. Write the entry, validate with scripts/validar.js. No need to search
   for the pictogram — you already have its `_id` from step 1.
```

ARASAAC categories that tend to map onto a Sinonimia AIVD category (out
of 567 total categories in the bank — most are generic AAC vocabulary
with no relation, see the real example below):

| AIVD category | Matching ARASAAC categories |
|---|---|
| `legal` | `law`, `law and justice`, `court document`, `legal institution` |
| `finanzas` | `financial services`, `money` |
| `tramites` | `public administration` |
| `salud` | `disease`, `symptom`, `medical procedure`, `medical test`, `medicament`, `medical document`, `medical documentation`, `orthopedic product` |
| `tecnologia` | `information technology` |
| `seguridad` | `road safety`, `security and defense` |
| `educacion` | `educational document`, `educational institution` |

### Real example (2026-08-19)

Downloaded the full bank (13,802 `es` pictograms) and cross-referenced it
against `js/data.es.js`, filtering by the 20 ARASAAC categories in the
table above and dropping `schematic:true`: **495 uncovered candidates**.
A sample of the first 60 confirms step 4's warning — mostly AAC-board
noise ("apply cream", "remove glucose sensor", "put on a plaster",
"tip"), but with genuinely good finds mixed in: `colegio de abogados`
("bar association", `law`), `cambio de moneda` and `servicio de envío de
dinero` ("currency exchange"/"money transfer service", `financial
services`), `tinnitus` and `reflujo gástrico` (`symptom`/`disease`),
`corsé ortopédico` ("orthopedic corset", `orthopedic product`), `escáner
de maletas` and `validar tarjeta` ("luggage scanner"/"validate a card",
`security and defense`). Eyeballed hit rate on the sample: lower than
step 4b (CEFRLex), but every accepted candidate arrives with none of the
ghost-pictogram risk that hit 14 of the 43 words across the previous two
passes.

**On OpenSymbols**: `scripts/buscar-pictograma.js` and
`scripts/ingest/pipeline/resustituir-pictos.js` already integrate it, but
**only as a term search** (`GET /api/v2/symbols?q=...`), not a browsable
bank — there's no ARASAAC-style `/new/{n}` equivalent, so it can't mine
new candidates without already having a word in mind. It also requires a
key (`OPENSYMBOLS_SECRET`, requested at
https://www.opensymbols.org/api — not configured on this machine, so it
couldn't be tested live) and aggregates banks with licenses different
from ARASAAC's (Sclera CC BY-NC, Mulberry CC BY-SA, twemoji CC BY...) —
using a non-ARASAAC image requires updating the footer credit
(`pieCreditosHtml` in `js/i18n.js`) in the same change, see "Pictograms"
in `technical.md`. As a **candidate** source (what this document is
about), OpenSymbols adds nothing ARASAAC alone doesn't already provide —
its real value in this project stays what's already documented: a
pictogram alternative when ARASAAC has nothing good for a word already
chosen.

## Prompt E — Wikipedia categories as a term list

Same idea as Prompt D (mine an already-curated list instead of ranking
frequency) but with Wikipedia instead of ARASAAC: Wikipedia's
field-specific categories (`Category:Legal_terminology`,
`Category:Medical_terminology`...) are, in practice, an already-filtered
jargon glossary — editors decided each concept was notable enough for its
own article. MediaWiki's API exposes it with no key required:

```
GET https://{es|en}.wikipedia.org/w/api.php?action=query&list=categorymembers
    &cmtitle=Category:{category}&cmlimit=500&format=json
```

Tested live (2026-08-19), category size by domain:

| Category | `es` | `en` |
|---|---|---|
| Legal (`Términos_jurídicos` / `Legal_terminology`) | 383 | 327 |
| Medical (`Términos_médicos` / `Medical_terminology`) | 500+ (paginated) | 404 |
| Financial (`Terminología_financiera` / —) | 35 | **no equivalent category exists** under any reasonable name tried (`Finance_terminology`, `Financial_terms`, `Banking_terminology` — all three empty); English Wikipedia's financial category tree is much more scattered than its legal/medical one. |

A sample from `Categoría:Términos_jurídicos` gives a sense of the
precision: `Abandono (Derecho)`, `Aberratio ictus`, `Abrogación`,
`Absolución (derecho)`, `Abuso del derecho`, `Acta notarial`, `Acto
jurídico` — genuine jargon, much denser in "actually hard" terms than
Prompt D (ARASAAC), which mostly returns everyday AAC vocabulary.

```
1. Download the full category (paginate with `cmcontinue` if needed, the
   API tells you when there's more):
   GET https://{locale}.wikipedia.org/w/api.php?action=query&list=categorymembers
       &cmtitle=Category:{category}&cmlimit=500&format=json
2. Clean the titles: strip parenthetical disambiguators ("Absolución
   (derecho)" -> "absolución"), drop "List of...", "Portal:...",
   "Appendix:..." pages that aren't a single concept.
3. Drop anything already covered (estado-contenido.js --detalle, same as
   every other prompt).
4. Confirm by hand that the term is a real word actually in current use
   in that field, not a Latin/academic technicality no professional
   would use in a letter (heavy filtering needed here: "Aberratio ictus"
   is legal Latin, not something that shows up in a court notice).
5. Write the entry, search for a pictogram (unlike Prompt D, Wikipedia
   doesn't hand you one for free — you DO need to search here).
```

**On "free Spanish/English dictionaries"**: two are already in use, just
documented elsewhere in this file — Kaikki.org (Wiktionary extract, step
3 of Prompt C) is exactly that, a free bilingual dictionary at massive
scale, already feeding `es_list_clean.js`/`en_list_clean.js`. The one not
yet tried is **dictionaryapi.dev**
(`api.dictionaryapi.dev/api/v2/entries/en/<word>`, free, no key, also
sourced from Wiktionary) — tested live, it works but intermittently (two
502s before a 200), and only looks up **one word at a time**: useful for
verifying/enriching a candidate already chosen (pulling a plain-English
reference definition), not for discovering new candidates in bulk. As a
candidate source it adds nothing Kaikki doesn't already provide at scale.

**Broad categories vs. specific ones**: Wikipedia's big thematic
categories (`Legal_terminology`, `Medical_terminology`,
`Pedagogía`...) are dominated by academic/textbook jargon — a lot to
discard for every usable word. Narrower, consumer-facing categories give
a much better hit rate: `Categoría:Contratos`, `Categoría:Impuestos_de_España`,
`Categoría:Seguros` (`es`) and `Category:Contract_law`,
`Category:Tax_terms`, `Category:Consumer_protection` (`en`) produced
terms like "fine print", "co-payment", "termination clause", "tax
refund", or "right to repair" — vocabulary that genuinely shows up in a
bank letter or an insurance policy, not just a law textbook. Before
pulling from a broad category, check whether a narrower sibling category
exists for the specific procedure/document/product — it almost always
yields more with less filtering.

**A category deliberately left unmined**: `Category:Disability` /
`Categoría:Discapacidad` exists and has real vocabulary, but **it was
not mined on purpose** — even though `js/data.*.js` is out of scope for
`scripts/validar.js`'s forbidden-terms scan (a dictionary entry about an
actual disability-related procedure would be legitimate content, not a
violation), systematically bulk-extracting vocabulary from that specific
category crosses the line from "the occasional bureaucratic term that
happens to relate to disability" into "a content source centered on
disability" — exactly what this project avoids by design (see the
zero-mentions rule above). If a disability-adjacent term shows up
naturally from another category (e.g. "disability certificate" turning
up in a search of official documents), treat it case by case with the
usual editorial judgment — just don't turn this category into a mining
source.

**Diminishing returns in `salud`**: beyond the categories already
documented, `Category:Pharmacy`/`Categoría:Farmacología` and
`Category:Mental_health`/`Categoría:Salud_mental` yielded very little
usable — the first is almost entirely chemical/active-ingredient
nomenclature, the second mixes abstract clinical theory with sensitive
terminology that needs more editorial caution than usual. At this point
(see the session balance table below) `salud` is the AIVD category with
the least room left in this technique — Prompt A (a real corpus: patient
leaflets, discharge summaries) remains the better bet for expanding it
further.

### Session mining balance across categories (2026-08-19/20)

Ten straight batches with Prompt E (plus one with D), one Wikipedia
category at a time, until hitting the diminishing returns described
above:

| AIVD category | Words accepted (approx. es+en) | Wikipedia categories used |
|---|---|---|
| `legal` | ~35 | Términos_jurídicos/Legal_terminology, Contratos/Contract_law |
| `trabajo` | ~30 | Derecho_laboral/Labour_law, Seguridad_social/Social_security |
| `finanzas` | ~28 | Terminología_financiera/Insurance, Impuestos_de_España/Tax_terms, Hipotecas/Mortgage |
| `seguridad` | ~25 | Seguridad/Safety, Prevención_de_riesgos_laborales/Occupational_safety_and_health, Emergency_services |
| `tramites` | ~20 | Administración_pública/Public_administration |
| `vivienda` | ~18 | Urbanismo/Real_estate, Renting |
| `tecnologia` | ~15 | Terminología_informática/Computing_terminology, Comercio_electrónico/E-commerce |
| `educacion` | ~10 | Pedagogía, Student_financial_aid |
| `salud` | ~8 | Términos_médicos/Medical_terminology (partial), Patient_safety |

**Session total: 236 new words** (128 es / 108 en) across 10 batches,
spread across the four techniques documented in this file (general
lexicon, CEFR B1-C1, ARASAAC, Wikipedia). `salud` clearly lagged behind
because its Wikipedia categories are the most technical/sensitive of the
nine — the next gap to fill with Prompt A if this expansion is picked
back up.

## Source table — reference glossaries

| category | `es` | `en` |
|---|---|---|
| `tramites` | Plan de Lenguaje Claro (AGE), guías de lenguaje claro de ministerios/ayuntamientos | plainlanguage.gov, UK gov content style guide |
| `salud` | MedlinePlus en español, glosarios de pacientes de sociedades médicas | MedlinePlus, NIH plain-language health glossaries |
| `vida-diaria` | guías de lectura fácil generalistas (Plena Inclusión, Easy-to-Read Europe) | Easy-to-Read Europe, plainlanguage.gov everyday-life guides |
| `finanzas` | "Finanzas para Todos" (Banco de España / CNMV) | Consumer Financial Protection Bureau (CFPB) glossary |
| `vivienda` | guías de consumo de vivienda (OCU), guías municipales de alquiler | HUD plain-language glossary, UK "renting a home" guides |
| `trabajo` | glosario laboral del SEPE / Ministerio de Trabajo | UK ACAS plain-English glossary, US DOL plain-language guides |
| `legal` | Plan de Lenguaje Claro de Justicia, Diccionario del Español Jurídico (RAE — use with caution, not always "plain") | US courts self-help plain-language glossaries |
| `tecnologia` | glosarios de alfabetización digital (INCIBE, Fundación ONCE, IMSERSO) | GCFGlobal, DigitalLearn.org, AARP tech glossaries |
| `seguridad` | Protección Civil, 112, INSST, Cruz Roja | Ready.gov (FEMA), American Red Cross, OSHA plain-language terms |

## Source table — domain corpus

| category | `es` | `en` |
|---|---|---|
| `tramites` | resoluciones/notificaciones oficiales (BOE o administración local), cartas de Hacienda/Seguridad Social, formularios | US/UK government notices, IRS/HMRC letters, official forms |
| `salud` | prospectos de medicamentos, informes de alta hospitalaria, consentimientos informados | patient leaflets, hospital discharge summaries, informed consent forms |
| `vida-diaria` | instrucciones de electrodomésticos, avisos de comunidad de vecinos, folletos de transporte público | appliance manuals, HOA/tenant notices, public transport leaflets |
| `finanzas` | extractos bancarios, contratos de préstamo, folletos de productos bancarios | bank statements, loan agreements, product disclosure sheets |
| `vivienda` | contratos de alquiler, escrituras/hipotecas, facturas de suministros | lease agreements, mortgage documents, utility bills |
| `trabajo` | nóminas, contratos laborales, cartas de baja médica, convenios colectivos | payslips, employment contracts, sick-leave letters |
| `legal` | sentencias, notificaciones judiciales, documentos notariales | court notices, legal filings, notarized documents |
| `tecnologia` | manuales de apps, condiciones de uso, ayuda de smartphones | app manuals, terms of service, phone support articles |
| `seguridad` | protocolos de evacuación, avisos de Protección Civil/112, folletos de primeros auxilios | FEMA/Ready.gov notices, Red Cross first-aid leaflets |
