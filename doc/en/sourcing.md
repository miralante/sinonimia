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
node scripts/estado-contenido.js --detalle
```

to see which category+language combinations need work and which words
(and their synonyms) are already covered, so neither method below proposes
a duplicate.

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
   `node scripts/estado-contenido.js --detalle` for that category/language.
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
   `node scripts/estado-contenido.js --detalle` for that category/language.
4. Confirm by hand that each term fits the correct AIVD category — the
   source glossary's own classification doesn't have to match.
5. Write the entry in js/data.{idioma}.js, find a pictogram with
   scripts/buscar-pictograma.js, validate with scripts/validar.js.
```

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
