# Contributing to Sinonimia

> 🌐 **Other languages:** [Español](CONTRIBUTING.es.md)
>
> **Part of the [Miralante](https://apptonomia.uk) suite** —
> Sinonimia is one of seven sibling projects (Apptonomia, Calculia,
> Memofun, Okeymoney, Routime, Sinonimia, Teclatlon) that share the
> same workflow, the same accessibility rules and the same code of
> conduct. This repo ships **Sinonimia** itself.

Thanks for your interest in contributing. This guide covers the GitHub
workflow we follow across the suite, the project roles, and the small
set of recipes that keep every sibling consistent.

---

## 🔀 GitHub workflow

```text
1. 🔍 Search or create an issue (in Spanish or English)
2. 💬 Comment and agree on scope
3. 🌿 Create a branch (fork if you don't have push access)
4. ✏️  Make changes following the recipes below
5. 📤 Open a Pull Request (PR) referencing the issue
6. 👀 Wait for review (at least 1 from a maintainer)
7. ✅ Merge when approved
```

**Issue labels** (used to classify incoming work):

| Label | Meaning |
|---|---|
| `UX` | Usability or experience improvement |
| `content` | Texts, translations, accessibility copy |
| `bug` | Reproducible error in behaviour |
| `tech` | Technical implementation, refactor |
| `docs` | Documentation changes |
| `good first issue` | Suitable for a first contribution |

### Branch conventions

- `feat/<slug>` — new features
- `fix/<slug>` — bug fixes
- `docs/<slug>` — documentation-only changes
- `content/<slug>` — content-only changes (definitions, examples, pictograms)
- `i18n/<code>` — translation to a language (e.g. `i18n/ca`, `i18n/gl`)

### Commits

- Message in **English** (repo convention), summary in imperative.
- One thing per commit — large commits can be asked to be split.
- If you close an issue, include `Closes #123` at the end.

---

## 👥 Project roles

Sinonimia has **two differentiated roles** in its community (unlike
most siblings that have a dedicated support role):

| # | Role | Reads what first |
|---|---|---|
| 1 | 👤 **End user** | The app — never this file. |
| 3 | 💻 **Contributor** (content or code) | This file, plus `doc/en/SPEC.md`, `doc/en/technical.md`, and `CLAUDE.md`. |

> Technical decisions live with the contributor role, **not because
> the end user is ignored, but because that is each role's domain.**
> Product, content, language and UI design decisions **are tested and
> validated with end users whenever possible**, and their feedback is
> the primary source for improvement.

---

## 📝 What you can contribute

- **Add a new word** with its definition, synonym, two examples, and
  a pictogram (see `doc/en/SPEC.md` for the easy-read rules).
- **Add a new language** (full or partial coverage).
- **Review the wording** of existing entries (easy-read style, tone,
  accuracy).
- **Cross-link translations** between languages with the `traduccion`
  field.
- **Bug fixes** — anything that breaks in any supported browser.
- **Security headers / CSP** — tightening the policy in `_headers`.

For batch additions (10+ new words at once) the workflow still
applies; see [`scripts/ingest/README.md`](scripts/ingest/README.md)
for the maintainer's pipeline.

---

## 🌐 Recipes

### Copy fix / new word

1. Read `doc/en/SPEC.md` — it isn't optional. It contains the
   easy-read rules, the multi-language architecture, and the
   non-negotiable product constraints.
2. Run `node scripts/content-status.js --detalle --categoria <topic>
   --lang <es|en>` to see the headwords that already exist.
3. Edit `js/data.<lang>.js` and fill in its fields following the spec.
4. `ejemplo.palabra` and `ejemploSinonimo.palabra` must appear verbatim
   inside `ejemplo.texto` and `ejemploSinonimo.texto` (site
   highlighting depends on it).
5. Add a `traduccion` cross-link by id if the word has a clear
   counterpart.
6. Source a pictogram via `node scripts/search-pictogram.js` (ARASAAC
   or OpenSymbols; respect the license noted by the script).
7. Run `node scripts/build-dictionary-data.js` (it regenerates the
   index and detail files the browser actually loads), bump `VERSION`
   in `sw.js`, then run `node scripts/check.js` to verify everything
   resolves and nothing generated is stale.

### New language

See `doc/en/i18n.md` for the full step-by-step (a new `I18N` block, a
new `js/data.<lang>.js`, its `<script>` tag, a button). `js/app.js`
doesn't need to be touched: it already works with any language that
appears in `DICCIONARIOS`.

### Accessibility fix

Read `doc/en/SPEC.md` §3 first — non-negotiable product constraints
live there (buttons ≥ 64×64 px, WCAG AA contrast with AAA as the
design target, easy-read copy, no-pressure feedback). Anything that
breaks them will be rejected.

### Adding or tightening a security header

Headers live in `_headers`. The CSP is intentionally tight
(`script-src 'self'`, no inline scripts; JSON-LD is data and does not
require `unsafe-inline`). Tightening is welcome; loosening almost
never is — open an issue first.

---

## ✅ Checklist before opening a PR

- [ ] `node scripts/check.js` passes locally.
- [ ] If you added or changed words, **every supported locale** is
      still in lock-step (or you noted the gap explicitly).
- [ ] Pictograms are credited (`footerCreditsHtml` in `js/i18n.js`
      mentions their bank, license, and author).
- [ ] You tested in at least one real desktop browser (Chrome /
      Firefox / Safari).
- [ ] You did not add any new runtime dependency — vanilla HTML / CSS /
      JS only.
- [ ] You did not loosen the CSP in `_headers` without an issue.

---

## 🚫 What this repo does NOT accept

- **Loosening the CSP** (`script-src 'self'` stays strict).
- **New runtime dependencies** — vanilla HTML / CSS / JS only.
- **Analytics / telemetry / third-party calls of any kind.**
- **Personal data** of any kind.
- **Gating content behind a game** — see `doc/en/SPEC.md`.
- **A SPA, a router, or a build step.**

---

## 📞 Communication

- **Issues** → main channel for proposals, bugs, questions.
- **Pull Request reviews** → for review of specific changes.

---

## 📜 Code of conduct

This project follows [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md).
Participating means accepting it.

---

## 🙏 Thanks

Thanks for devoting time to a tool that helps people understand the
world a little more clearly.
