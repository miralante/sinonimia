# Deploying Sinonimia to Cloudflare Pages

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

The custom `wrangler.toml` and `deploy.yml` workflow that the project
briefly had have been removed; Cloudflare's own CI is enough for a
zero-build static site.

## Configuration in Cloudflare

When the project is set up in the Cloudflare dashboard:

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
