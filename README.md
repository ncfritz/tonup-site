# tonup.app

The website for **Ton Up**, the darts scorer, trainer and rule book for
iPhone. Next.js (App Router) built as a static export and served by a small
Cloudflare Worker. Same setup as `tippytoe-site`, minus its app backend.

## Develop

```sh
pnpm install
pnpm dev          # http://localhost:3000
pnpm preview      # production build served through the Worker (wrangler dev)
pnpm lint && pnpm typecheck && pnpm test
```

## How it's put together

- **Static export** (`output: "export"` in `next.config.ts`): `next build`
  writes plain files to `out/`. No server code runs.
- **Worker** (`worker/index.ts`): serves `out/` as static assets with
  security headers (strict CSP: nothing loads from other origins). In
  production it redirects `www` to the apex; elsewhere it adds `noindex`,
  a crawler-blocking `robots.txt` and an environment ribbon.
- **Pages**: `/` (home), `/games` (every game and practice mode) and
  `/pricing` (Ton Up vs Pro). The look is the "Oche" direction from the
  website concepts: chalk-paper ground, ink type, one oche-red accent.
- **Catalog** (`src/lib/catalog.ts`): the games, drills and training tools,
  and which need Pro (app ADR 0009). Home, `/games` and `/pricing` all read
  from it, and `pnpm test` checks the counts (26 games: 6 in the app, 20 with
  Pro). Keep it in step with the app.
- **App screens**: `src/components/Phones.tsx` draws three app screens
  (scoring on the board, a drill, a rules page). They're illustrations; swap
  in real screenshots once the app's UI is final.
- **Fonts**: Space Grotesk and JetBrains Mono are bundled from `src/fonts`
  (OFL), so the site makes no requests to Google. `src/fonts/og/` holds the
  `.woff` files the generated social image uses.

## Coming soon vs. full site

Until launch, **production shows a coming-soon page** and nothing else. The
build decides (`src/lib/mode.ts`): while `launched` is false in
`src/lib/site.ts`, a production build (Workers Builds on `main`, or
`pnpm deploy`) aliases the home page to `src/home/ComingSoonHome.tsx` and
`scripts/postbuild.ts` drops the full-site-only pages, so none of the
unreleased site ships. Dev, staging and Previews always show the full site.

```sh
pnpm dev:soon                          # coming-soon page locally
# or open /coming-soon on dev, staging or any Preview
DEPLOY_TARGET=production pnpm build    # build exactly what production gets
```

## Settings to fill in

`src/lib/site.ts`:

- `appStoreUrl`: while it's `null`, every App Store button reads "Coming
  soon to the App Store". Once it's set, use Apple's official badge artwork.
- `supportEmail` and `company`: hidden until set.
- `prices`: US prices from app ADR 0009; keep them in step with App Store
  Connect.
- `launched`: set to `true` to put the full site on tonup.app.

## Environments and workflow

| Stage | Branch | URL |
| --- | --- | --- |
| Feature | `feature/*` … | `https://<branch>.preview.tonup.app` (login) |
| Development | `develop` | https://dev.preview.tonup.app (login) |
| Staging | `staging` | https://staging.preview.tonup.app (login) |
| Production | `main` | https://tonup.app |

One Cloudflare Worker serves all of them: `main` is its production
deployment and every other branch is a Worker Preview.

- [docs/workflow.md](docs/workflow.md): branches, PRs, promotion, hotfixes.
- [docs/cloudflare-setup.md](docs/cloudflare-setup.md): one-time Cloudflare
  and Access setup.
- `scripts/github-setup.sh`: creates `develop`/`staging` and applies branch
  protection.
