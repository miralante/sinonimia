# Deploying Sinonimia to Cloudflare Pages

This file is the **runbook** for whoever has to deploy or re-deploy the site.
It's deliberately outside the codebase (`.md` at the repo root, excluded
from the deploy by `wrangler.toml → pages_build_exclude`) so the public site
never exposes it.

> **Important:** Cloudflare credentials and GitHub Secrets are **never**
> stored in this repository. If any email, token, or account ID appears in a
> commit, rotate the credential and `git filter-repo` the history. See
> [SECURITY.md § Reporting a vulnerability](#) if that ever happens.

## When to read this

- First time the project is set up on Cloudflare.
- Rotating the API token (the old one was leaked / expired / you lost it).
- Onboarding a new maintainer with deploy rights.

## Pre-requisites

- A Cloudflare account. The current production account is the personal
  Outlook account of the project owner; if that changes, update
  `wrangler.toml → name` (project name is globally unique) before the next
  push.
- A GitHub account with **Maintain** access to this repo (to create secrets
  and let Actions run deploys).

## One-time setup

### 1. Create the Cloudflare Pages project

1. Sign in to the [Cloudflare dashboard](https://dash.cloudflare.com).
2. **Workers & Pages → Create → Pages → Connect to Git**.
3. Pick this GitHub repo and the `main` branch.
4. **Framework preset:** None.
5. **Build command:** *(leave empty — there is no build step).*
6. **Build output directory:** `.`.
7. Save. The first deploy will fail or sit idle; the GitHub Actions
   workflow takes over for actual deploys.

### 2. Create the Cloudflare API token

Use a scoped token, never the Global API Key.

1. **My Profile → API Tokens → Create Token.**
2. Use the **"Edit Cloudflare Pages"** template, or create a custom token
   with:
   - **Permissions:** Account → *Cloudflare Pages: Edit*.
   - **Account Resources:** restrict to the account this project belongs
     to.
   - **TTL:** the shortest option (≤ 1 day) so the token expires fast if
     forgotten.
3. Copy the token. **Cloudflare only shows it once.**

The Cloudflare **Account ID** is shown in the dashboard sidebar
(bottom-right) on any zone. Copy it too.

### 3. Add the GitHub Secrets

The deploy workflow
([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)) reads two
secrets:

| Secret name | Value |
|---|---|
| `CLOUDFLARE_API_TOKEN` | the API token from step 2 |
| `CLOUDFLARE_ACCOUNT_ID` | the account ID from step 2 |

Add them at **Settings → Secrets and variables → Actions → New repository
secret**. They are encrypted at rest and only exposed to Actions runs.

## Day-to-day

Nothing to do manually. Every push to `main` triggers:

1. The **Validar** workflow (`validate.yml`) — gates the deploy via PRs.
2. The **Deploy to Cloudflare Pages** workflow (`deploy.yml`) — re-runs the
   validator, then `wrangler pages deploy`s the repo root.

Pull requests automatically get a preview URL from Cloudflare Pages; no
extra workflow is needed.

## Rotating the API token

If the token ever leaks, expires, or you simply want a fresh one:

1. Create a new token in Cloudflare (step 2 above).
2. Update `CLOUDFLARE_API_TOKEN` in GitHub Secrets.
3. Revoke the old token from the same Cloudflare page.

There is no API call or cache to invalidate — the next deploy uses the new
secret.

## Updating the Cloudflare account

If the project moves to a different Cloudflare account (e.g. a new owner,
an organisation account, or a different personal email):

1. Create the new token on the new account.
2. Update both secrets in GitHub.
3. Update `wrangler.toml → name` if the project name on the new account
   differs.
4. The next push to `main` deploys to the new project.
