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
