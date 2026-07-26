# Deploying Sinonimia to Cloudflare

Sinonimia is deployed as a **Cloudflare Worker with static assets**, using
"Workers Builds" — Cloudflare's built-in GitHub integration for Workers.
There is no custom GitHub Actions workflow — Cloudflare's own CI owns the
build and deploy.

Note this is *not* a Cloudflare Pages project. The dashboard groups both
products under "Workers & Pages", which makes them easy to confuse, but
they're separate resources with separate APIs (`wrangler deploy` vs.
`wrangler pages deploy`). Sinonimia's resource is a Worker — check the
dashboard URL to confirm: `.../workers/services/view/sinonimia/...`, not
`.../pages/view/sinonimia/...`.

## How it works

1. The repo `miralante/sinonimia` is connected to a Worker named
   `sinonimia` via the [Cloudflare Workers and Pages GitHub
   App](https://github.com/apps/cloudflare-workers-and-pages).
2. Every push to `main` triggers a "Workers Build" in Cloudflare's
   infrastructure, which reads [`wrangler.toml`](wrangler.toml) and runs
   `wrangler deploy`.
3. `wrangler.toml` declares no `main` script — just an `[assets]` binding
   pointing at the repo root (`directory = "."`), so the Worker serves the
   static files as-is with no server-side code.
4. The `validate.yml` GitHub Action still runs on every push and PR to
   gate content, but it does not deploy.

## Configuration in Cloudflare

Everything needed is in `wrangler.toml` — there's nothing to set by hand in
the dashboard's build settings. If you're wiring up the GitHub integration
from scratch (**Workers & Pages → Create → Import a repository**), accept
the defaults; Cloudflare detects `wrangler.toml` and uses it.

No environment variables are required: the app makes no server-side calls.
The ARASAAC pictograms are public static images, served from
`https://static.arasaac.org`.

## Required headers

The site uses a `_headers` file at the repo root to set security headers
(CSP, X-Frame-Options, Referrer-Policy, Permissions-Policy, etc.) and a
one-year immutable cache for the dictionary, CSS, images, and app scripts.
Workers static assets read this file the same way Pages does — no
dashboard configuration needed.

## How to redeploy

Nothing to do. Push to `main` and Cloudflare rebuilds.

For a manual redeploy (e.g. after a Cloudflare-side incident), go to the
Cloudflare dashboard → Workers & Pages → `sinonimia` → **Deployments** →
**Retry deployment**, or trigger a new "Workers Build" from the **Builds**
tab.

## How to roll back

Cloudflare dashboard → Workers & Pages → `sinonimia` → **Deployments**.
Each successful deploy is listed with a timestamp. Click one and select
**"Rollback to this deployment"**.

## How to add a custom domain

Cloudflare dashboard → Workers & Pages → `sinonimia` → **Domains & Routes**
→ **Add** → **Custom domain** → follow the wizard. The DNS will be
configured automatically if the domain is already on Cloudflare, or by
CNAME if it is on another provider.

## Rotating credentials

There are no API tokens or secrets to rotate. The GitHub integration is a
one-time OAuth authorisation; revoking it is a matter of removing the
app's access on
[github.com/settings/applications](https://github.com/settings/applications).
