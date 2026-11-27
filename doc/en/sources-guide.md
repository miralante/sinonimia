# Sources for words and pictograms

This guide gathers resources for discovering candidate words and finding
pictograms. Sources provide material, not editorial decisions: apply the
[acceptance criteria](creating-elements-guide.md#31-criteria-for-accepting-a-word)
and follow the [guide to creating entries](creating-elements-guide.md) before
adding a word to the dictionary.

## 1. Sources and what each is for

| Source | Contribution | How it's used |
|---|---|---|
| [Kaikki.org](https://kaikki.org/) | Wiktionary extract: Spanish lemmas (`lang_code === "es"`), inflected forms, and a proper-noun signal (`pos: "name"`). | Backbone of `es_list_clean.js` and of the ingestion's proper-noun filter (`proper-noun-check.js`). |
| [FrequencyWords](https://github.com/hermitdave/FrequencyWords) | General usage frequency (OpenSubtitles). | Prioritizes candidates; cached as `scripts/download/freq-es.txt`. |
| [Wikimedia](https://dumps.wikimedia.org/eswiktionary/latest/) | Raw Spanish Wiktionary titles. | Widens Kaikki's word coverage. Not Spanish-only (Spanish Wiktionary holds pages in other languages too), so it's always combined with Kaikki's `lang_code === "es"` filter. Keeps the [CC BY-SA](https://foundation.wikimedia.org/wiki/Policy:Terms_of_Use) license. |
| [Wikipedia](https://www.wikipedia.org/) | Thematic categories (legal, medical, financial...). | Grouped term lists (method E). |
| [listapalabras.com](https://www.listapalabras.com/) | Alphabetical list of 87,363 unique Spanish headwords (does not cover `Ñ`). | A raw word universe with no category of its own. `es-candidates-listapalabras.js` applies automatic filters for word form, coverage, proper nouns, frequency, and editorial rejections; difficulty still needs editorial review. It never filters by domain category (see criterion 4 in the [guide to creating entries](creating-elements-guide.md#31-criteria-for-accepting-a-word)). The result is ~66,600 real candidates, sorted with a root/suffix hint (not a filter) so the highest-signal ones get reviewed first. Fully processed — details in `scripts/ingest/PROGRESS.md`'s listapalabras.com section. |

## 2. Search methods

**A. Domain corpus and *keyness*.** The main method for one specific category. Collect 15-30 real excerpts under `dev/corpus/` (sources in section 3) and run:

```sh
node scripts/corpus-candidates.js dev/corpus/{categoria}-{idioma}.txt {idioma} 40
```

It compares corpus frequency against general language and prioritizes domain-specific words. It has worked well with employment contracts, payslips, severance letters, utility bills, property deeds, land-registry extracts, and mortgages.

**B. Existing plain-language glossaries.** Find an official glossary that explains terms simply (see section 3; verify they are still available). Don't copy definitions: write original Sinonimia wording and keep only what fits the project.

**C. General word list, filtered only by difficulty.** For broad expansion, not one category. Combine general vocabulary sources (Kaikki, Wikimedia, listapalabras.com, frequency) and apply automatic filters for word form, coverage, proper nouns, frequency, and editorial rejections. Difficulty still requires word-by-word review; never filter by whether a word appears in an external domain category (see step 4 in section 3.1 of the creating-elements guide). A domain-characteristic root or suffix (method F, or `shared/domain_stems.js`) can decide review order, never which words get discarded without review. CEFRLex/ELELex shouldn't be required for highly specialized legal, medical, or bureaucratic vocabulary: it may be absent from graded readers. The general Kaikki/Wikimedia/frequency scripts for both languages were retired 2026-09-09 once exhausted (see `scripts/ingest/PROGRESS.md`); `es-candidates-listapalabras.js` is now the only live implementation of this method.

**D. ARASAAC as a candidate source.**

```text
https://api.arasaac.org/api/pictograms/{language}/new/20000
```

Drop `schematic: true`, cross-reference with `content-status.js`, and check both meaning and image. The bank holds a lot of everyday AAC vocabulary that needs discarding. Useful categories: `law`, `financial services`, `public administration`, `disease`, `medical procedure`, `information technology`, `road safety`, `security and defense`.

**E. Wikipedia categories.**

```text
https://{es|en}.wikipedia.org/w/api.php?action=query&list=categorymembers&cmtitle=Category:{category}&cmlimit=500&format=json
```

Paginate with `cmcontinue`, strip parenthetical disambiguators, discard list/portal pages, check real-world use. Specific consumer-facing categories (contracts, taxes, insurance, mortgages, consumer protection, e-commerce) beat broad academic ones. Never use `Category:Disability` as a mass source.

**F. Wiktionary sense-domain categories.** Wikipedia groups *articles*, so a common word with one hard technical sense rarely shows up. Wiktionary tags each *sense* by domain instead, which does catch these polysemous words:

```text
https://{es|en}.wiktionary.org/w/api.php?action=query&list=categorymembers&cmtitle=Categoría:ES:{domain}&cmlimit=500&format=json
```

A hit here only confirms *one sense* qualifies: check which one before drafting, and write the entry for that sense only. It's also the best way to check whether a word already covered has another sense worth its own entry.

**2026-09-09 (maintainer directive): the script dedicated to this
method (`wiktionary_candidates.js`, with its `PLAN`,
`--list-categories`, and `--exhaustive`) was removed from the project
entirely.** Not because querying Wiktionary's category API is wrong —
as a *discovery* technique for a bounded batch of words to review by
hand it's still legitimate — but because in practice its output was
being cross-referenced against other word lists
(`es-candidates-listapalabras.js`, method C) as an **exclusion
filter** that discarded, without review, any word with no category
match — the exact opposite of the rule to assign a category after
assessing the word (criterion 4 in section 3.1 of the guide to creating entries). Sinonimia's editorial
criterion is a word's actual difficulty (criterion 2 in section 3.1 of the guide to creating entries),
never whether an external category — unstable, incomplete, and
inconsistent run to run, see `scripts/ingest/PROGRESS.md` — happened
to tag it. If this technique gets rebuilt in the future, it must
*annotate* a candidate list already selected by difficulty, never
*select* it.



## 3. Glossaries and corpora by category

| Category | ES / EN glossaries | ES / EN corpus |
|---|---|---|
| `tramites` | Plan de Lenguaje Claro de la AGE / plainlanguage.gov | BOE, tax and social-security letters / IRS, HMRC |
| `salud` | MedlinePlus / MedlinePlus, NIH | Patient leaflets, discharge summaries, consent forms |
| `vida-diaria` | Plena Inclusión, Easy-to-Read Europe / same | Appliance manuals, residents' notices, public transport |
| `finanzas` | Finanzas para Todos, CNMV / US CFPB | Bank statements, loans, banking products |
| `vivienda` | OCU / US HUD | Leases, deeds, mortgages, utilities |
| `trabajo` | SEPE / ACAS, US Department of Labor | Payslips, employment contracts, leave letters |
| `legal` | Plan de Lenguaje Claro de Justicia / US court self-help glossaries | Judgments, court notices, notarial documents |
| `tecnologia` | INCIBE, ONCE, IMSERSO / GCFGlobal, AARP | App help, terms of use, smartphones |
| `seguridad` | Protección Civil, 112, Red Cross / Ready.gov, OSHA | Evacuation, first aid |

## 4. Pictogram sources

| Source | Use |
|---|---|
| [OpenSymbols](https://www.opensymbols.org/) | Preferred search source: it brings several symbol banks together. Results may have different licenses; check each image's bank, author, and license. |
| [ARASAAC](https://arasaac.org/) | Pictogram bank and the search tool's alternative when OpenSymbols has no usable result. Attribution under CC BY-NC-SA is required. |

The `node scripts/search-pictogram.js` tool queries OpenSymbols when
available and uses ARASAAC as a fallback. The guide to creating entries
explains how to choose and associate an image.

## See also

- [Guide to creating entries](creating-elements-guide.md), with editorial criteria and the steps for preparing an entry.
- [Ingestion workflow and status](../../scripts/ingest/README.md) and [progress log](../../scripts/ingest/PROGRESS.md).
