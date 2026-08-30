# Quick guide

> 🌐 **Other language:** [Español](../es/guia-rapida.md)

This guide explains step by step how to use Sinonimia: from opening
it to looking up a word, playing a short game, switching language or
installing it on your phone. It also includes **four ways to open
the app**, ordered from easiest to hardest.

> 📦 The detailed step-by-step version (with the full PWA install
> walkthrough and a complete troubleshooting section) lives in the
> canonical cross-suite guide:
> [`routime/doc/en/quick-guide.md`](https://github.com/thenkdframe/routime/blob/main/doc/en/quick-guide.md).
> The **opening flow, PWA install and troubleshooting are identical**
> across the Apptonomia-sibling projects. This document only lists
> what's specific to Sinonimia (mostly: there is no fixed grid of
> activities — the dictionary **is** the activity).

---

## 1. How to open Sinonimia

There are **four ways**, ordered from easiest to hardest. The full
walkthrough is in the canonical guide linked above. The short
version:

| # | Method | What you need | Offline? | PWA installable? |
|---|---|---|---|---|
| **A** | From the internet ([sinonimia.apptonomia.uk](https://sinonimia.apptonomia.uk)) | A browser | ❌ | ✅ |
| **B** | Downloading the ZIP from GitHub | A browser | ❌ | ❌ |
| **C** | Local server with Python | Python 3 | ❌ | ✅ |
| **D** | Local server with Node.js | Node.js | ✅ | ✅ |

> 💡 If you just want to **try the app**, use method **A** or **B**.
> For the **full experience** (PWA, offline mode, "Add to home
> screen"), use **C** or **D**.

---

## 2. The main screen

The home screen of Sinonimia is the **search box**. There is no
fixed grid of mini-games — the dictionary **is** the activity. The
home shows:

- A **search input** (autocomplete after a couple of characters).
- The **alphabet filter** (jump to words starting with a letter).
- The **topic filter** (browse by domain — administration, justice,
  health…).
- The **word of the day** and **"Surprise me"** buttons.
- A link to the two games (Match and Order).

## 3. Looking up a word

1. Type the word in the search box.
2. Pick the entry from the dropdown.
3. Read the **definition**, then the **example sentence**, then the
   pictogram.
4. Optional: use **"Write your own sentence"** (Mis frases) to save
   a personal example for the word. It is stored only in this
   browser's `localStorage`.

## 4. Filtering by topic

Use the **topic filter** to browse a whole domain (e.g. all
administrative words, all health words). The topic list reflects the
shipped catalogue — see [`activities.md`](activities.md) §1.

## 5. The two games

From the home screen, you can also start one of two short games
(see [`activities.md`](activities.md) §2):

- **Match** — match a word to its definition.
- **Order** — reorder a scrambled example sentence.

Sessions are **5–10 questions**, not an exam. There is no failure
state.

## 6. Audio

When the entry has audio (e.g. a recorded pronunciation or the
example sentence read aloud), a 🔊 button appears. Sinonimia
respects `prefers-reduced-motion` and the audio preference in
settings.

## 7. Response messages

Sinonimia has **no failure state** in the games. A wrong match or
out-of-order sentence produces a friendly "almost there, try again"
message. There are **no stars**, **no score**, **no negative
feedback** — see [`SPEC.md`](SPEC.md) §3.

## 8. Progress and known words

The reader can mark a word as **known** (👍) from the entry page.
Known words are remembered in the browser's `localStorage` and can
be reviewed or reset from settings. See [`team.md`](team.md) for the
privacy note for families.

## 9. Changing language

Open the language menu from the header (globe icon 🌐). Available:
**Spanish (default)** and **English**. Each language has its own
dictionary, games and progress. See
[`languages.md`](languages.md) for how to add a new locale.

## 10. Personal settings

Open `/settings` (the exact path depends on the deployment; Sinonimia
uses a hash router — see [`technical.md`](technical.md)). From there:

- View **My known words** (per language).
- Reset the **known words** and **"Mis frases"** for a language
  (with a confirmation prompt, since it's destructive).
- Manage the audio and reduced-motion preferences.

## 11. Install the app on mobile

The full steps (Android / iOS / desktop) are in the canonical guide.
Short version: open Sinonimia in the browser, choose "Add to home
screen" / "Install", confirm.

## 12. Troubleshooting

See **§11 Troubleshooting** in the canonical guide — those items
apply identically to Sinonimia.

## 13. More help

- Product: [`SPEC.md`](SPEC.md).
- Architecture: [`technical.md`](technical.md).
- Word and games catalogue: [`activities.md`](activities.md).
- Languages: [`languages.md`](languages.md).
- For families and support staff: [`team.md`](team.md).

## 14. Quick summary

1. Open Sinonimia (4 methods; easiest is **A**).
2. Search a word or filter by topic.
3. Read definition + example; mark the word as known if you want.
4. Optionally, save your own example sentence ("Mis frases").
5. Optional: play a 5–10 question game.
6. Switch language with 🌐; install as PWA for offline use.
