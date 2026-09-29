# Third-party licenses

The main code in this repository is licensed under the
[MIT License](LICENSE) of the Miralante Sinonimia project. This file
documents the licenses of the third-party assets shipped in the
deployed site (the dictionary entries themselves, and the
pictograms).

---

## Dictionary content

The dictionary content — definitions, examples, synonyms, and the
per-entry strings — **is not part of the MIT-licensed code**. It is
licensed under the **Creative Commons Attribution-ShareAlike 4.0
license (CC BY-SA 4.0)** so the lexicon can be reused, adapted and
re-shared by anyone, including for commercial purposes, as long as
attribution is preserved and derivative works carry the same license.

- Full license text:
  <https://creativecommons.org/licenses/by-sa/4.0/>
- Legal code: <https://creativecommons.org/licenses/by-sa/4.0/legalcode>

Recommended attribution when reusing the dictionary content:

> "Sinonimia dictionary content, Miralante suite, licensed under
> CC BY-SA 4.0."

The dictionary content lives in `js/data.<lang>.js` (one ordered
shard per language, listed in `js/dictionary-manifest.js`). Each
entry also carries its own context (synonym, ejemplo) under the same
license.

---

## Pictograms

The pictograms in `img/` are **not original to this project**. They
come from **ARASAAC** (https://arasaac.org), authored by
**Sergio Palao** and owned by the **Gobierno de Aragón**, and are
distributed under the **Creative Commons
Attribution-NonCommercial-ShareAlike license (CC BY-NC-SA)**.

- ARASAAC portal: <https://arasaac.org>
- License terms: <https://creativecommons.org/licenses/by-nc-sa/4.0/>

Their original license and attribution are kept intact in the
in-site footer (the `footerCreditsHtml` key in `js/i18n.js`). When
reusing the pictograms, keep their original attribution; do not
remove or alter it.

---

## Other source data

Some entries draw on additional public-domain reference sources
(such as definitions in the public domain or institutions that
publish under permissive terms). For each entry, the source — when
material is non-original — is named in the entry's `fuente` field in
`js/data.<lang>.js`. When the entry's text is fully original to this
project, no `fuente` is recorded.

---

If you have a question about reusing any of the above, open an
issue and tag it with the `legal` label.
