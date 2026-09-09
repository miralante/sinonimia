# Activities and word catalogue

> Sinonimia is a **dictionary** — the "activity" is the reading of
> an entry, and a small set of light games on top of the dictionary.
> There is no fixed grid of activities in the same sense as in
> the other apps of the suite (Calculia, Routime, Okeymoney). This
> document lists what Sinonimia actually exposes, in the same shape
> as `activities.md` in the other repos.

---

## 1. The dictionary itself (the main "activity")

The dictionary is the heart of the project. Every entry follows the
shape defined in [`SPEC.md`](SPEC.md) and the editorial rules in
[`SPEC.md`'s "Process for expanding content"](../../SPEC.md). Each
entry contains, at minimum:

- The **word** itself (in the dictionary's own language).
- An **easy-read definition** — short sentences, everyday vocabulary.
- An **example sentence** showing the word in context.
- An **optional** `traduccion` — the closest equivalent in another
  language (one-to-many is allowed).
- A **category** (administration, justice, health, finance, daily
  life…) used by the topic filter.
- A **pictogram** giving a visual cue.

### Topics currently shipped

The dictionary is organised by topic to make browsing easier:

| Topic | What it covers |
|---|---|
| **Administración** | Public administration, paperwork, certificates. |
| **Justicia** | Legal terms, court processes, rights. |
| **Salud** | Health, medical, anatomy, the doctor's office. |
| **Hacienda y finanzas** | Taxes, bank, social security, payroll. |
| **Vivienda y vida cotidiana** | Home, neighbourhood, daily life. |
| **Educación y trabajo** | School, training, employment, contracts. |

The exact categories and the per-topic word counts can be inspected
with `node scripts/content-status.js` (see
[`creating-elements-guide.md`](creating-elements-guide.md) §3).

---

## 2. The two games

Sinonimia ships two light games on top of the dictionary. They reuse
the entries already in `js/data.<lang>.js` — no separate "activity"
data file.

| Game | What it trains | Reference |
|---|---|---|
| **Match (Emparejar)** | Recognise a word from its definition. | [`technical.md`](technical.md) §"Games". |
| **Order (Ordenar)** | Reorder a scrambled example sentence. | [`technical.md`](technical.md) §"Games". |

The games are deliberately short: a session is **5–10 questions**,
not an exam. They reward progress with **easy-read encouragement**
messages, not with stars or score. There is no failure state and no
negative feedback (see [`SPEC.md`](SPEC.md) §3).

## 3. Word-of-the-day and "Surprise me"

Two low-effort features help passive vocabulary building:

- **Word of the day** — a deterministic pick per date, shown on the
  home screen.
- **"Surprise me"** (`Sorpréndeme`) — picks one entry at random from
  the active dictionary.

Both reuse the dictionary entries as-is and require no extra content.

## 4. "Write your own sentence" (Mis frases)

The reader can write and save their own example sentences for any
word. These sentences are **stored only in `localStorage`**, never
sent to a server, and stay private to the browser where they were
written. See [`team.md`](team.md) for the privacy note for families.

## 5. How to add a new entry

This is the support role's task. The short version:

1. Choose a topic and pick a word that is genuinely hard **in the
   target language** (see [`SPEC.md`](SPEC.md) "Process for
   expanding content").
2. Verify the word is not already covered with a similar definition
   (`node scripts/content-status.js --detalle`).
3. Write the entry following the easy-read rules in
   [`SPEC.md`](SPEC.md).
4. Find and inspect a pictogram
   (`node scripts/search-pictogram.js`).
5. Validate before opening the PR:
   `node scripts/check.js`.

The full editorial workflow, with candidate sources and acceptance
criteria, lives in
[`creating-elements-guide.md`](creating-elements-guide.md).

---

## See also

- Product: [`SPEC.md`](SPEC.md).
- Architecture: [`technical.md`](technical.md).
- Languages: [`languages.md`](languages.md).
- Sources and editorial workflow: [`creating-elements-guide.md`](creating-elements-guide.md).
