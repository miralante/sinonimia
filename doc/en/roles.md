# Project roles

Sinonimia has **two differentiated roles**. Each has its own entry point:

| Role | Who they are | How they participate | Where to look first |
|---|---|---|---|
| 👤 **End user** | Anyone who runs into a difficult word (and, at its origin, people with intellectual disability in an occupational-therapy context — see [`SPEC.md`](SPEC.md)) | Uses the site directly, no sign-up or account. **Does not participate** in development. | The site itself (`index.html`) |
| 💻 **Contributor**: content or code | Whoever proposes a new word, a new language, or touches the code | Follows the process in [`../../CONTRIBUTING.md`](../../CONTRIBUTING.md): adds a word following the easy-read rules, or implements/reviews code changes. | [`../../CONTRIBUTING.md`](../../CONTRIBUTING.md) · [`technical.md`](technical.md) |

> 💡 Unlike projects with a dedicated "support" role (family, therapist)
> accompanying the end user while they use the tool, Sinonimia is designed
> to be used alone, with nobody needing to mediate. The therapeutic origin
> defines **which content rules apply** (easy-read language, pictograms,
> non-punitive gamification), not **who is allowed to use the site** — see
> "Who it's for" in [`SPEC.md`](SPEC.md).

---

## 🗺️ Where to start, by profile

| If you are… | Start with… |
|---|---|
| 🤔 I want to understand what Sinonimia is and why | [`SPEC.md`](SPEC.md) — product definition |
| 💻 I want to add a word or a language | [`../../CONTRIBUTING.md`](../../CONTRIBUTING.md) |
| 🛠️ I want to touch the code or understand the architecture | [`technical.md`](technical.md) |

---

## 🤝 A single-piece project

Unlike larger projects with separate content, design, and development
teams, Sinonimia is deliberately small: no build step, no backend, no
dependencies. Any contributor can, in principle, cover both fronts
(content and code), though it isn't required — see
[`../../CONTRIBUTING.md`](../../CONTRIBUTING.md) for the two contribution
paths kept separate.
