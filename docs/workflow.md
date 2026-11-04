# Workflow

Changes move **development → staging → production**, one step at a time,
always through pull requests.

| Stage | Branch | URL | Who can see it |
| --- | --- | --- | --- |
| Feature | `feature/*` etc. | `https://<branch>.preview.tonup.app` | Approved users (GitHub login) |
| Development | `develop` | https://dev.preview.tonup.app | Approved users (GitHub login) |
| Staging | `staging` | https://staging.preview.tonup.app | Approved users (GitHub login) |
| Production | `main` | https://tonup.app | Everyone |

Until launch, production shows only the **coming-soon page**; everything
else shows the full site (see "Coming soon vs. full site" in the README).
Launching is a normal change: set `launched: true` in `src/lib/site.ts`.

All four run on **one Cloudflare Worker**, `tonup-site`. `main` is its
production deployment; every other branch, including `develop` and
`staging`, is a Worker Preview with a fixed name (`dev`, `staging`) or the
branch name. Every non-production page shows a small ribbon (Preview,
Development or Staging), sends `noindex`, and serves a `robots.txt` that
blocks crawlers. The Worker has no `workers.dev` addresses, so the only way
in is through the domains above.

## Branches

| Prefix | For | Branches from | Merges into |
| --- | --- | --- | --- |
| `feature/<slug>` | New things | `develop` | `develop` |
| `fix/<slug>` | Bugs found before release | `develop` | `develop` |
| `chore/<slug>`, `docs/<slug>` | Tooling, deps, docs | `develop` | `develop` |
| `hotfix/<slug>` | Urgent production fixes | `main` | `main`, then back-merged |

Use short lowercase slugs: `feature/games-page`. The Preview name is the
branch name made DNS-safe (`feature/games-page` →
`feature-games-page.preview.tonup.app`, max 40 characters). The names
`staging`, `dev` and `www` are reserved; a branch that would turn into one
of them fails its Preview build with a message to rename it.

## Moving a change through

1. **Feature:** branch from `develop`, push, open a PR into `develop`.
   Cloudflare builds a Preview and comments its link on the PR. CI must pass.
   **Squash-merge.**
2. **Development:** merging deploys `develop` to dev.preview.tonup.app. Several
   features can collect here.
3. **Staging:** open a PR `develop → staging` when a batch is ready to
   release. **Merge commit** (no squash, so the branches keep the same
   history). Merging deploys staging.preview.tonup.app. Check it there.
4. **Production:** open a PR `staging → main`. **Merge commit.** Merging
   deploys tonup.app.

The **Promotion guard** CI job rejects PRs that skip a step (for example
`feature/* → main`).

### Hotfixes

1. Branch `hotfix/<slug>` from `main` and PR it into `main`. It gets its
   own Preview like any other branch; check the fix there before merging.
2. After it ships, back-merge: PR `main → staging`, then `staging → develop`,
   so nothing is lost on the next release.

## Rules on GitHub

`main`, `staging` and `develop` are protected:

- Changes only through pull requests; no direct or force pushes, no deletion.
- Required checks: **Promotion guard** and **Lint, typecheck, test, build**.
- Merge methods: squash for PRs into `develop`; merge commits for
  promotions. (GitHub allows both; pick the right one per the table above.)

`scripts/github-setup.sh` applies these settings with the `gh` CLI.

## Cloudflare

One Worker, `tonup-site`, connected to this repo in Workers Builds:

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Build command | `pnpm build` |
| Deploy command | `pnpm exec wrangler deploy` |
| Preview builds | Enabled, all non-production branches |
| Preview command | `pnpm preview:branch` |
| Build variable | `NEXT_TELEMETRY_DISABLED=1` |

`pnpm preview:branch` (`scripts/preview.ts`) picks the Preview name:
`staging` → `staging`, `develop` → `dev`, anything else → the DNS-safe
branch name.

**Access:** the Worker's Access rule is set to **Previews only**, so
tonup.app stays public and every Preview needs a GitHub login from an
approved user. A second, hostname-based Access application on
`*.preview.tonup.app` backs that up. See `docs/cloudflare-setup.md`.

**Preview housekeeping:** Cloudflare keeps up to 100 Previews per Worker on
the free plan and removes the least recently deployed beyond that. Delete
merged feature Previews now and then with
`pnpm exec wrangler preview delete --name <name>`. If `staging` or `dev`
ever disappears, the next merge into that branch recreates it.

## Local

```sh
pnpm dev                 # Next dev server
pnpm preview             # production build through the Worker (production)
pnpm build && pnpm exec wrangler dev --var SITE_ENV:preview   # see the Preview ribbon
pnpm preview:branch      # deploy your branch as a Preview by hand (needs wrangler login)
```
