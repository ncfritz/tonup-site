# tonup.app

The website for **Ton Up**, the darts scorer, trainer and rule book for iPhone.

Planned to follow the same setup as `tippytoe-site`: Next.js (App Router) as a
static export, served by a small Cloudflare Worker, with
`feature/* → develop → staging → main` promotion through pull requests.
