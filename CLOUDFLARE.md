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
> <https://sinonimia.miralante.workers.dev>. Sinonimia is the
> canonical example of the in-suite shape (`wrangler.toml` +
> `[assets]`); Calculia, Okeymoney, Memofun, Teclatlon and Routime
> all use the same model. Do not "fix" by deleting `wrangler.toml` —
> it would break the deploy.
>
> **Part of the Miralante suite.** Sinonimia is one of the six
> runtime apps (Calculia, Memofun, Okeymoney, Routime, Sinonimia,
> Teclatlon) that share the same author, the same accessibility-first
> / no-backend philosophy, and the same Cloudflare deploy story.
> The canonical group-wide guide lives in
> [Apptonomia's `CLOUDFLARE.md`](https://github.com/miralante/apptonomia/blob/master/CLOUDFLARE.md);
> this document is the Sinonimia-specific runbook on top of it.

## How it works

1. The repo is connected to a Cloudflare Workers project named
   `sinonimia` (Workers & Pages → Connect to Git).
2. Every push to `main` triggers a build in Cloudflare's
   infrastructure via Workers Builds, which reads [`wrangler.toml`](wrangler.toml)
   to deploy the repo root as a static-assets Worker (no `main`
   script).
3. The build is a no-op: no `build command`, no `output directory`
   other than `.`, so the static files are served as-is.
4. The `check.yml` GitHub Action still runs on every push and PR to
   gate content, but it does not deploy.

[`wrangler.toml`](wrangler.toml) is the actual deploy configuration
Workers Builds reads — not just a convenience for local CLI use. It
pins the project name (`name = "sinonimia"`), declares
`[assets] directory = "."` (no `main` script), and
`not_found_handling = "404-page"` so Cloudflare serves this repo's
own `404.html` for an unmatched path instead of a bare empty 404
(verified live: `curl` against an unknown path returns the real,
styled page).

## Files in this repository

| File | Purpose |
|---|---|
| `_headers` | Cache and security headers |
| `wrangler.toml` | Pins the project name + the `[assets]` binding + `not_found_handling = "404-page"` |
| `.github/workflows/check.yml` | `node scripts/check.js` and friends on every push/PR (does **not** deploy) |
| `.github/workflows/smoke-prod.yml` | Optional: periodic smoke test against the live URL |

No `_redirects`, no `functions/`, no Cloudflare service-account
keys. Every section of the site ships its own real `index.html`,
so Cloudflare's implicit per-directory `index.html` lookup handles
deep links without any rewrite rule.

## Configuration in Cloudflare

| Setting | Value |
|---|---|
| Framework preset | None |
| Build command | *(empty)* |
| Build output directory | `.` |
| Production branch | `main` |
| Root directory | *(empty — repo root)* |

No environment variables are required: the app makes no server-side
calls. The ARASAAC pictograms are public static images, served from
`https://static.arasaac.org`.

## Required Cloudflare headers

The site uses a [`_headers`](_headers) file at the repo root to set
security headers (CSP, X-Frame-Options, Referrer-Policy,
Permissions-Policy, etc.) and a one-year immutable cache for the
dictionary, CSS, images, and app scripts. Cloudflare reads this
file on every deploy and applies the rules automatically — no
dashboard configuration needed.

## Dictionary file-shard contract

Cloudflare's file-size limit applies to each published asset, not to the
site as a whole. The dictionary therefore uses ordered file shards:
`js/dictionary-manifest.js` lists every `js/data.<lang>[.<shard>].js` file,
and `js/dictionary-loader.js` loads them before the application starts. Each
shard has its own content-hash query string and is cached independently.

When any shard approaches the per-file limit, split its ordered entries into
another shard and add it to the manifest. Do not increase the size of the
existing shard or add a page-specific hardcoded script tag. This is the
standard file-shard contract for the static applications in the Apptonomia
suite; `scripts/check.js` validates the manifest and every shard hash.

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

## Do not migrate to Pages

An earlier version of this file described migrating *from* Workers
*to* Pages — that migration never actually happened (or was
reverted): the live site (<https://sinonimia.miralante.workers.dev>)
is a `*.workers.dev` address, `wrangler.toml` is committed and
live, and Cloudflare's own current guidance is to prefer Workers +
static assets over classic Pages for new static sites. Treat "Pages"
as the legacy option here, not the target. If a future migration
is ever genuinely wanted, verify against Cloudflare's current docs
rather than reusing the old steps that were here — they described
a different Cloudflare product shape than what this project's
`wrangler.toml` uses today.
