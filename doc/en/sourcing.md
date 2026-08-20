# Candidate word sources

Practical guide for finding, filtering, and reviewing new words for Sinonimia. It complements the "Process for expanding content" section in [`SPEC.md`](SPEC.md).

## 1. Quick workflow

1. Check the overall status:

   ```sh
   node scripts/estado-contenido.js
   ```

2. Choose a category and inspect only its entries:

   ```sh
   node scripts/estado-contenido.js --detalle --categoria {categoria} --lang {idioma}
   ```

   This avoids duplicates, covered synonyms, and repeated example scenarios. Do not open `js/data.{idioma}.js` directly; the files are very large.

3. Generate candidates with one of the methods in section 4.
4. Review every word for difficulty, real-world use, category, and conceptual duplication.
5. Write the entry using SPEC.md's easy-read rules.
6. Find and inspect a pictogram:

   ```sh
   node scripts/buscar-pictograma.js <word> <language>
   ```

7. Validate before incorporating the entry:

   ```sh
   node scripts/validar.js
   ```

A source only proposes words. It never decides by itself that a word merits an entry.

## 2. Source status

### Integrated and processed

| Source | Contribution | Status |
|---|---|---|
| [Kaikki.org](https://kaikki.org/) | Structured Wiktionary extract; supports `lang_code === "es"`, inflection, and proper-name filtering. | Integrated in `es_list_clean.js`. |
| [FrequencyWords](https://github.com/hermitdave/FrequencyWords) | General usage frequency based on OpenSubtitles. | Integrated as `scripts/.cache/freq-es.txt`. |
| [Wikimedia](https://dumps.wikimedia.org/eswiktionary/latest/) | `eswiktionary-latest-all-titles-in-ns0.gz`, main-namespace titles. | Integrated and streamed: 949,746 raw titles and 789,315 normalized forms in the dump used. |
| [ARASAAC](https://api.arasaac.org/) | Pictogram bank and possible source of already-illustrated candidates. | Tested as both a candidate and image source. |
| [Wikipedia](https://www.wikipedia.org/) | Thematic categories for legal, medical, financial, and other terminology. | Tested as a term list; pagination and manual review are required. |

Wikimedia is not a Spanish-only list: Spanish Wiktionary also contains pages in other languages. It is therefore combined with Kaikki and its `lang_code === "es"` filter. Wikimedia-derived data must preserve attribution and the [CC BY-SA](https://foundation.wikimedia.org/wiki/Policy:Terms_of_Use) license.

### Pending processing

| Source | Intended use | Remaining work |
|---|---|---|
| [listapalabras.com](https://www.listapalabras.com/) | Alphabetical list of Spanish headwords. | Apply common filters and cross-reference the dictionary. The existing capture has 89,086 raw and 87,363 unique words; it does not cover `Ñ`. |
| [RLA-ES](https://github.com/sbosio/rla-es) | Spanish Hunspell lexical universe. | Extract lemmas rather than every generated form; check the license and deduplicate. |
| [an-array-of-spanish-words](https://github.com/words/an-array-of-spanish-words) | Broad universe of about 636,000 forms; MIT license. | Remove conjugations, plurals, proper nouns, and orthographic noise. |
| [Open Multilingual WordNet](https://omwn.org/) | Spanish lemmas and synonym, hypernym, and hyponym relations. | Assess the Spanish resources and each included WordNet's license; use it for prioritization and synonym discovery, not as a flat list. |
| [Leipzig Corpora Collection](https://wortschatz.uni-leipzig.de/en/download/) | Language corpora and frequency data. | Choose a Spanish corpus, document its license, and compare its frequencies with `FrequencyWords`. |

These sources are not yet part of `scripts/ingest/pipeline/es_list_clean.js`.

## 3. Common criteria

1. **Lexical validity.** The word must be real and documented in current usage. A dictionary list may include archaisms, dialect forms, and rare loans.
2. **Difficulty.** Do not add everyday words the audience already understands. Frequency helps, but does not measure difficulty by itself. CEFRLex/ELELex can help exclude A1-A2 vocabulary; absence from it does not prove that a word is invalid.
3. **Independent lemma.** Drop conjugations, plurals, and enclitic-pronoun forms when they are not independent entries. Kaikki identifies `form-of` records; Hunspell and spelling lists need extra morphological analysis.
4. **Proper nouns.** Remove first names, surnames, cities, countries, and brands. Kaikki's `name` POS is useful, but doubtful cases still need review.
5. **Existing coverage.** Drop anything already present as a word, synonym, example word, or explanation in `js/data.es.js` or `js/data.en.js` — but only for that same sense. A word already in the dictionary can have a second meaning just as hard for the target user (a homonym, not a shade of nuance): that's a legitimate candidate for a second, independent entry, with its own `id`, `situacion`, and `definicion`, following the "Words with double meaning" model in `SPEC.md` — never add a parenthetical clarifier to the `palabra` field to tell them apart. Don't propose a second entry just because the other sense exists: it's only worth it if that sense is also hard to understand on its own.
6. **All qualifying senses.** When a candidate is accepted, review its
   different meanings. Include every sense that is hard to understand on its
   own and meets the other ingestion criteria. Independent meanings must be
   separate entries with their own `id`, `situacion`, `definicion`, and
   example; do not hide them in one definition or add parenthetical
   disambiguators to the `palabra` field. If a sense is ordinary or fails the
   criteria, record it as rejected and do not ingest it.
7. **Category.** The word must fit one AIVD category. `vida-diaria` is the
   catch-all only when no other category fits better — and only as long as
   there isn't a real cluster of candidates (not two or three stray ones)
   clearly pointing to a different category that doesn't exist yet. When
   sourcing turns up one of those clusters, propose the new category instead
   of forcing them into `vida-diaria`: that's how the consumer-rights cluster
   was resolved (2026-08-20, moved to `finanzas` after confirming real
   volume), and how the grief/social-exclusion one was ruled out (stayed in
   `vida-diaria` because it didn't justify a category of its own). The final
   call to create a category still belongs to the maintainer — a source or an
   ingestion batch doesn't create one by itself.
8. **Scenario.** Do not reuse the same example context within a category.
9. **Length.** As an initial heuristic, prioritize 4-12 letters in Spanish.
   This is not an absolute editorial rule.

No automated filter replaces human review. Topic filters based on substring matches create false positives: words can share letters with a legal stem without having a legal meaning.

## 4. Search methods

### A. Domain corpus and *keyness*

This is the main method for a specific category. Collect 15-30 real excerpts, save them under `dev/corpus/`, and run:

```sh
node scripts/candidatos-corpus.js dev/corpus/{categoria}-{idioma}.txt {idioma} 40
```

The script compares corpus frequency with general language and prioritizes domain-specific words. Suitable sources are listed in section 6. Review category, coverage, and difficulty manually before writing. It has worked well with employment contracts, payslips, severance letters, utility bills, service contracts, property deeds, land-registry extracts, and mortgages.

### B. Existing plain-language glossaries

Find an official or reference glossary that explains terms simply. Do not copy definitions: write original Sinonimia wording and retain only terms that fit the project. Section 5 is a starting point; verify that every source still exists and is genuinely plain language.

### C. General word lists and filters

This method is for broad expansion, not one category. Combine Kaikki, frequency, Wikimedia, and the future sources in section 2. Rank or prioritize by frequency, apply the common criteria, then add a category topic filter. Review the result word by word.

CEFRLex/ELELex can provide a positive B1-C1 signal, but it must not be required for highly specialised legal, medical, or bureaucratic vocabulary: those words may be absent from graded readers.

### D. ARASAAC as a candidate source

Download the pictogram bank, filter by categories, and look for concepts not yet in Sinonimia. An accepted candidate already has an image, but the bank contains much everyday AAC vocabulary that must be discarded.

Tested endpoint:

```text
https://api.arasaac.org/api/pictograms/{language}/new/20000
```

Drop `schematic: true`, cross-reference with `estado-contenido.js`, and check both meaning and image. Useful categories include `law`, `financial services`, `public administration`, `disease`, `medical procedure`, `information technology`, `road safety`, and `security and defense`.

### E. Wikipedia categories

Thematic categories can serve as grouped term lists:

```text
https://{es|en}.wikipedia.org/w/api.php?action=query&list=categorymembers&cmtitle=Category:{category}&cmlimit=500&format=json
```

Paginate with `cmcontinue`, remove parenthetical disambiguators, discard list and portal pages, and check whether the term appears in real documents. Specific consumer-facing categories are usually better than broad academic ones: contracts, taxes, insurance, mortgages, consumer protection, and e-commerce.

Do not use `Category:Disability` as a mass source. Related terms that arise naturally from another source are reviewed case by case.

### F. Wiktionary sense-domain categories

Wikipedia categories group *articles*, so a common word with one hard technical sense (e.g. `trabar`, `leyenda`) rarely surfaces — its overall frequency is too high even though one specific meaning is difficult. Wiktionary instead tags individual *senses* by domain, which catches exactly these polysemous words:

```text
https://{es|en}.wiktionary.org/w/api.php?action=query&list=categorymembers&cmtitle=Categoría:ES:{domain}&cmlimit=500&format=json
```

Useful domain categories: `Categoría:ES:Derecho`, `Categoría:ES:Finanzas`, `Categoría:ES:Medicina`, `Categoría:ES:Informática`, `Categoría:ES:Educación`, `Categoría:ES:Construcción`, `Categoría:ES:Seguridad` (and the English equivalents `Category:en:Law`, `Category:en:Finance`, `Category:en:Medicine`, `Category:en:Computing`, `Category:en:Education`). Paginate with `cmcontinue`; large categories (law, finance) can hit the API's pagination cap.

A hit here only means *one sense* of the word qualifies — check which sense triggered the tag before drafting, and write the entry for that sense only. This is also the best way to check whether a word already covered by one sense has another qualifying one: look it up in the domain category listing before assuming its other meanings are too common to matter.

## 5. Reference glossaries

| Category | Spanish | English |
|---|---|---|
| `tramites` | Plan de Lenguaje Claro de la AGE; ministries and municipalities | plainlanguage.gov; UK government style guide |
| `salud` | MedlinePlus; medical-society patient glossaries | MedlinePlus; NIH |
| `vida-diaria` | Plena Inclusión; Easy-to-Read Europe | Easy-to-Read Europe; plainlanguage.gov |
| `finanzas` | Finanzas para Todos; Banco de España/CNMV | Consumer Financial Protection Bureau |
| `vivienda` | OCU; municipal rental guides | HUD; UK renting guides |
| `trabajo` | SEPE; Spanish Ministry of Labour | ACAS; US Department of Labor |
| `legal` | Spanish Justice plain-language plan; Diccionario del Español Jurídico, with caution | US court self-help glossaries |
| `tecnologia` | INCIBE; Fundación ONCE; IMSERSO | GCFGlobal; DigitalLearn.org; AARP |
| `seguridad` | Protección Civil; 112; INSST; Red Cross | Ready.gov; American Red Cross; OSHA |

## 6. Domain corpora

| Category | Spanish | English |
|---|---|---|
| `tramites` | BOE, government notices, tax and social-security letters | Government notices, IRS/HMRC, official forms |
| `salud` | Patient leaflets, discharge summaries, consent forms | Patient leaflets, discharge summaries, consent forms |
| `vida-diaria` | Appliance manuals, residents' notices, public transport | Appliance manuals, landlord/tenant notices, transport |
| `finanzas` | Bank statements, loans, banking products | Bank statements, loans, product information |
| `vivienda` | Leases, deeds, mortgages, utilities | Leases, mortgages, utilities |
| `trabajo` | Payslips, employment contracts, leave letters, collective agreements | Payslips, employment contracts, leave letters |
| `legal` | Judgments, court notices, notarial documents | Court notices, legal filings, notarial documents |
| `tecnologia` | App help, terms of use, smartphone support | App manuals, terms of use, phone support |
| `seguridad` | Evacuation protocols, Protección Civil/112, first aid | FEMA/Ready.gov, Red Cross first aid |

## 7. Results and warnings

Documented passes using the general lexicon, CEFRLex, ARASAAC, and Wikipedia produced approximately 236 new words (128 ES and 108 EN). Wikipedia worked best for `legal`, `trabajo`, `finanzas`, and `seguridad`; `salud` yielded less because its categories are more technical.

Always inspect the pictogram. Literal matching against ARASAAC keywords can return another meaning: an electricity-related term may produce an electric wheelchair, `cuentas` may produce beads, and `court` may produce a tennis court. Never accept a downloaded image without looking at it.

OpenSymbols is already used as an alternative pictogram search, but not as a browsable candidate source. Its banks have different licenses, so using a non-ARASAAC image requires updating the footer credits.
