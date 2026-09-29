# Cloudflare Workers (static assets) — Sinonimia

> **Production branch & automatic deploy.** Sinonimia deploys
> **automatically on every push to `main`** via the **Cloudflare
> Git connector**. The GitHub Actions workflow
> [`.github/workflows/check.yml`](.github/workflows/check.yml) runs
> `node scripts/check.js` on every push and PR but does **not**
> deploy. The Cloudflare dashboard is the source of truth for
> project settings.
>
> **This project is deployed as a Cloudflare Worker (static assets),
> not classic Cloudflare Pages.** Live at
> <https://sinonimia.miralante.workers.dev>.
>
> **Part of the Miralante suite.** Sinonimia is **one of the seven
> siblings** (Apptonomia, Calculia, Memofun, Okeymoney, Routime,
> Sinonimia, Teclatlon) that share the same author, the same
> accessibility-first / no-backend philosophy, and the same Cloudflare
> deploy story. The canonical group-wide guide lives in
> [Apptonomia's `CLOUDFLARE.md`](https://github.com/miralante/apptonomia/blob/master/CLOUDFLARE.md)
> (the metaproject root, this very file); the per-sibling
> `CLOUDFLARE.md` documents only the project-specific bits
> (custom domain, build command, CI workflow name).

## How it works

1. The repo is connected to a Cloudflare Workers project named
   `sinonimia` (Workers & Pages → Connect to Git).
2. Every push to `main` triggers a build in Cloudflare's
   infrastructure via Workers Builds, which reads
   [`wrangler.toml`](wrangler.toml) to deploy the repo root as a
   static-assets Worker (no `main` script).
3. The build is otherwise a no-op: no `output directory` other than
   `.`, so the static files are served as-is.
4. The `check.yml` GitHub Action still runs on every push and PR
   to gate content, but it does not deploy.

[`wrangler.toml`](wrangler.toml) is the actual deploy configuration
Workers Builds reads — not just a convenience for local CLI use. It
pins the project name (`name = "sinonimia"`) and declares
`[assets] directory = "."` (no `main` script), plus
`not_found_handling = "404-page"` so Cloudflare serves this repo's
own `404.html` for an unmatched path instead of a bare empty 404
(verified live: `curl` against an unknown path returns the real,
styled page).

> **Do not "fix" by deleting `wrangler.toml`** or by switching to
> the legacy `pages_build_output_dir` Pages shape. Sinonimia's
> Cloudflare dashboard project is already a Worker with "Workers
> Builds", and Cloudflare's own current guidance is to prefer
> Workers + static assets over classic Pages for new static sites.
> `wrangler pages deploy` and the Pages shape do not apply here —
> use `wrangler deploy` if you ever need to push from a dev
> machine.

## Files in this repository

| File | Purpose |
|---|---|
| `_headers` | Cache and security headers |
| `wrangler.toml` | Pins the project name + the `[assets]` binding + `not_found_handling = "404-page"` |
| `.github/workflows/check.yml` | `node scripts/check.js` and friends on every push/PR (does **not** deploy) |
| `.github/workflows/smoke-prod.yml` | Optional: periodic smoke test against the live URL |

Every section of the site ships its own real `index.html`, so
Cloudflare's implicit per-directory `index.html` lookup handles
deep links without any rewrite rule.

No `_redirects`, no `functions/`, no `package.json`, no Cloudflare
service-account keys.

## Configuration in Cloudflare

| Setting | Value |
|---|---|
| Framework preset | None |
| Build command | *(empty)* |
| Build output directory | `.` |
| Production branch | `main` |
| Root directory | *(empty — repo root)* |

No environment variables are required: the app makes no
server-side calls. The ARASAAC pictograms are public static images,
served from `https://static.arasaac.org`.

## Required Cloudflare headers

The site uses a [`_headers`](_headers) file at the repo root to set
security headers (CSP, X-Frame-Options, Referrer-Policy,
Permissions-Policy, etc.) and a cache policy: a one-year immutable
cache for the dictionary, CSS, images, and app scripts. Cloudflare
reads this file on every deploy and applies the rules
automatically — no dashboard configuration needed.

## `*.workers.dev` subdomain — Triggers

For a static-assets Worker, Cloudflare only serves requests over a
**route** (a `*.workers.dev` subdomain or a custom domain). Without
one, the project deploys fine — the build succeeds, files are
uploaded, "Deployments" lists the commit — but the dashboard shows
**"No active routes"** and every URL returns empty.

**Fix — one click in the dashboard:**

1. Workers & Pages → `sinonimia` → **Settings** → **Triggers** (or
   **Routes**, depending on the dashboard version).
2. Under **Workers.dev subdomain**, click **Enable** (or **Add**).
   Cloudflare assigns the URL immediately; no rebuild needed.
3. If the dashboard only shows a routes table, add a route
   manually:
   - **Route pattern**: `*/*`
   - **Zone**: `workers.dev` (the account's free `*.workers.dev` zone)
   - **Worker**: `sinonimia`
4. Once the route is active, if the latest commit isn't already
   showing as the **Active** deployment, go to **Deployments** →
   click the most recent successful build → **Retry deployment** (or
   **Promote to deploy**).

> **Cannot be set in `wrangler.toml`.** The `workers.dev` binding is
> a per-project dashboard setting; it is not declared anywhere in
> the repo. `wrangler deploy` from the CLI does not apply here
> either — Workers Builds owns the deploy, and the dashboard owns
> the routes.

## Service worker cache

`sw.js` is **cache-first** — the same strategy used by every PWA
sibling of the suite (`calculia`, `memofun`, `okeymoney`,
`routime`; `teclatlon` uses network-first, and `apptonomia`
ships no SW).

- `sw.js` declares a `VERSION` string (e.g. `sinonimia-vN`).
- `sw.js` declares a `FILES` (or `ARCHIVOS`) array listing every file
  the SW pre-caches on install.
- A change to any file in `FILES` requires bumping `VERSION` in the
  same commit.
- `scripts/check-version-bump.js` is the CI gate that fails the
  build when a cached file changed but `VERSION` didn't.

The cost of bumping is one integer; the cost of not bumping is
"the user thinks the fix didn't land". Bump liberally rather than
conservatively. See `CLAUDE.md` §B.1 for the canonical rule.

## CI — pre-deploy gate

Every push to `main` and every PR against `main` runs
[`.github/workflows/check.yml`](.github/workflows/check.yml) plus
[`.github/workflows/smoke-prod.yml`](.github/workflows/smoke-prod.yml),
which gate content before the Cloudflare Git connector ever sees
the commit. The CI workflow does **not** deploy — deploy is
exclusively the Cloudflare dashboard reading `wrangler.toml` and
`_headers`. No GitHub secret is required, no `wrangler login` is
needed locally.

## Custom domain

Sinonimia has no custom domain at the moment — it is served at the
default `*.workers.dev` URL
(<https://sinonimia.miralante.workers.dev>). To add one, follow
**How to add a custom domain** below.

## How to redeploy

Nothing to do. Push to `main` and Cloudflare rebuilds.

For a manual rebuild (e.g. after Cloudflare itself had an
incident), go to the Cloudflare dashboard → Workers & Pages →
`sinonimia` → **Create deployment** → choose a branch or upload a
directory.

For a one-off preview outside the Git connector (e.g. to test a
dirty worktree without pushing):

```bash
npx wrangler deploy
```

## How to roll back

Cloudflare dashboard → Workers & Pages → `sinonimia` →
**Deployments**. Each successful build is listed with a timestamp.
Click any of them and select **"Retry deployment"** or **"Rollback
to this deployment"**.

## How to add a custom domain

Cloudflare dashboard → Workers & Pages → `sinonimia` → **Custom
domains** → **Set up a custom domain** → follow the wizard. DNS is
configured automatically if the domain is already on Cloudflare, or
by CNAME if it is on another provider.

## Rotating credentials

There are no API tokens or secrets to rotate. The GitHub
integration is a one-time OAuth authorisation; revoking it is a
matter of removing the app's access on
[github.com/settings/applications](https://github.com/settings/applications).

## See also

- [`CLAUDE.md`](CLAUDE.md) — the per-sibling AI agent workflow; the
  cache contract in §B.1 is the source of truth for the SW
  `VERSION` rule.
- `wrangler.toml` — the actual deploy configuration Workers Builds
  reads.
- [`CONTRIBUTING.md`](CONTRIBUTING.md) — the human contribution
  flow that produces the commits that Git connector picks up.
- Apptonomia's `CLOUDFLARE.md` — the metaproject root, this very
  template, but with `{{DISPLAY}} = Apptonomia`.
