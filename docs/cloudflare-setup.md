# One-time Cloudflare setup

**Status:** not done yet. Follow these steps once to connect the
`tonup-site` Worker to this repo. They're the same steps as `tippytoe-site`,
so the GitHub login method in Zero Trust (step 2) already exists: reuse it.

Do these once, in order. Day-to-day work is in `docs/workflow.md`.

## 1. Domain

`tonup.app` must be a zone in the same Cloudflare account as the Worker
(Websites → the zone shows **Active**). Leave `preview.tonup.app` unused:
the Worker creates its `*.preview.tonup.app` wildcard DNS record and
certificate itself. Issuing the certificate can take a little while after
the first Preview.

## 2. GitHub login for Cloudflare Access

1. **Zero Trust** → Settings: note your team domain,
   `<team>.cloudflareaccess.com`.
2. On GitHub: Settings → Developer settings → OAuth Apps → **New OAuth App**
   - Homepage URL: `https://<team>.cloudflareaccess.com`
   - Authorization callback URL: `https://<team>.cloudflareaccess.com/cdn-cgi/access/callback`
   - Generate a client secret.
3. **Zero Trust** → Settings → Authentication → Login methods → **Add new** →
   GitHub. Paste the client ID and secret, save, then **Test**.

## 3. The Worker

Workers & Pages → **Create** → **Import a repository** →
`ncfritz/tonup-site`. Name the Worker **`tonup-site`** (it must match
`name` in `wrangler.jsonc`). Build settings:

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Build command | `pnpm build` |
| Deploy command | `pnpm exec wrangler deploy` |
| Preview builds (Settings → Build → Branch control) | Enabled for all non-production branches |
| Preview command | `pnpm preview:branch` |
| Build variable | `NEXT_TELEMETRY_DISABLED` = `1` |

The first production build attaches `tonup.app`, `www.tonup.app` and
the Preview-only `preview.tonup.app` domain from `wrangler.jsonc`.

## 4. Protect the Previews

Do this before pushing to `develop`, `staging` or any feature branch.

**a. Worker rule.** Worker → **Access** tab → **Protect this Worker behind
Access** → scope **Previews only**. Then refine it in Zero Trust (Access →
Applications → the new application → edit):

- **Login methods:** GitHub only, with instant auth so visitors go straight
  to GitHub.
- **Policy:** Action **Allow**, Include → **Emails** → the approved people's
  GitHub email addresses (the verified email on each GitHub account).

**b. Hostname backstop.** Cloudflare's docs don't spell out how the
Previews-only scope applies to Previews on custom domains, so add a second
application that covers them by hostname: Zero Trust → Access →
Applications → **Add an application** → Self-hosted → domain
`*.preview.tonup.app`, same login method and same policy. (Hostname rules
take precedence over Worker rules, so both stay in force.)

Never add an Access rule that covers all of `tonup.app` or `www.tonup.app`.
If you ever turn on account-wide "Protect all Workers" with **All traffic**,
add a **Bypass** policy for `tonup-site`, or production goes private.

## 5. Check it

- https://tonup.app loads with no login.
- Push `develop`: https://dev.preview.tonup.app sends you to a GitHub
  login, then shows the green **Development** ribbon. An unapproved GitHub
  account gets a Cloudflare "access denied" page.
- Same for `staging` at https://staging.preview.tonup.app (purple
  **Staging** ribbon).
- Open a PR from a `feature/*` branch: Cloudflare comments a Preview link
  `https://<branch>.preview.tonup.app`, which also needs the login.
