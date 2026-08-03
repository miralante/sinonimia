# Cloudflare Pages — Sinonimia

> **Production branch & automatic deploy.** Sinonimia deploys
> **automatically on every push to `main`** via the **Cloudflare
> Git connector** configured in the Cloudflare dashboard. There is no
> GitHub Actions workflow that deploys — the only workflow in
> `.github/workflows/validate.yml` runs `node scripts/validar.js` on
> every push and PR to gate content, but it does **not** deploy. The
> Cloudflare dashboard is the source of truth for project settings.
>
> **Part of a group of sibling projects.** Sinonimia is one of five
> static PWAs that share the same author, the same accessibility-first
> / no-backend philosophy, and the same Cloudflare deploy story.
> **Apptonomia is the main project** of the group. The canonical
> Cloudflare guide for the group lives in
> [Apptonomia's `CLOUDFLARE.md`](https://github.com/thenkdframe/apptonomia/blob/master/CLOUDFLARE.md);
> this document is the Sinonimia-specific runbook on top of it.
>
> Sinonimia uses the **Workers + static assets** model (`wrangler.toml`
> + `[assets]`) rather than the classic Pages model used by Apptonomia
> and Teclatlon. That is intentional: the existing Cloudflare dashboard
> project for `sinonimia` is a Worker with "Workers Builds", not a Pages
> project, and that's the shape Cloudflare currently recommends for
> static sites. Do not "fix" this by deleting `wrangler.toml` — it
> would break the deploy.

Sinonimia is deployed on **Cloudflare Pages**, using its built-in
GitHub integration. There is no custom GitHub Actions workflow — the
Cloudflare dashboard owns the build and deploy.

## How it works

1. The repo `miralante/sinonimia` is connected to a Cloudflare Pages
   project named `sinonimia`.
2. Every push to `main` triggers a Pages build in Cloudflare's
   infrastructure.
3. The build is a no-op: no `build command`, no `output directory` other
   than `.`, so the static files are served as-is.
4. The `validate.yml` GitHub Action still runs on every push and PR
   to gate content, but it does not deploy.

`wrangler.toml` is kept for two reasons:
- It pins the project name (`name = "sinonimia"`) so anyone running
  the local `wrangler` CLI for debugging sees the same project.
- It declares `pages_build_output_dir = "."` so a manual `wrangler
  pages deploy` (run from a developer machine) does the same thing
  Cloudflare's CI does. Cloudflare itself doesn't need this file —
  the dashboard configuration is the source of truth at deploy time.

## Configuration in Cloudflare

When the project is set up in the Cloudflare dashboard:

| Setting | Value |
|---|---|
| Framework preset | None |
| Build command | *(empty)* |
| Build output directory | `.` |
| Production branch | `main` |
| Root directory | *(empty — repo root)* |

No environment variables are required: the app makes no server-side calls.
The ARASAAC pictograms are public static images, served from
`https://static.arasaac.org`.

## Required Cloudflare headers

The site uses a `_headers` file at the repo root to set
security headers (CSP, X-Frame-Options, Referrer-Policy,
Permissions-Policy, etc.) and a one-year immutable cache for the
dictionary, CSS, images, and app scripts. Cloudflare Pages reads this
file on every deploy and applies the rules automatically — no
dashboard configuration needed.

## How to redeploy

Nothing to do. Push to `main` and Cloudflare Pages rebuilds.

For a manual rebuild (e.g. after Cloudflare itself had an incident),
go to the Cloudflare dashboard → Workers & Pages → sinonimia → "Create
deployment" → choose a branch or upload a directory.

## How to roll back

Cloudflare dashboard → Workers & Pages → sinonimia → **Deployments**.
Each successful build is listed with a timestamp. Click any of them
and select **"Retry deployment"** or **"Rollback to this deployment"**.

## How to add a custom domain

Cloudflare dashboard → Workers & Pages → sinonimia → **Custom
domains** → **Set up a custom domain** → follow the wizard. The DNS
will be configured automatically if the domain is already on
Cloudflare, or by CNAME if it is on another provider.

## Rotating credentials

There are no API tokens or secrets to rotate. The GitHub integration
is a one-time OAuth authorisation; revoking it is a matter of
removing the app's access on
[github.com/settings/applications](https://github.com/settings/applications).

## Migrating from Workers to Pages

This project has been on Workers with `[assets]` before, and migrated
to Pages. If you're doing the same:

1. Delete the existing Worker `sinonimia` from the dashboard — Pages
   and Workers share the project name namespace, so a stale Worker
   will block Pages from taking the same name.
2. Create a Pages project with the same name (`sinonimia`), connected
   to the same GitHub repo. Cloudflare will reuse the same
   `*.pages.dev` subdomain.
3. The DNS records (`A`, `AAAA` for `*.pages.dev`) are managed by
   Cloudflare; nothing to update by hand.
4. The custom headers in `_headers` carry over as-is — Pages reads
   the same file format as Workers.
