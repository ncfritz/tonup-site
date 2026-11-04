#!/usr/bin/env bash
# Applies the branch conventions in docs/workflow.md to the GitHub repo.
# Needs the gh CLI, logged in as a repo admin. Safe to re-run.
set -euo pipefail

REPO="${1:-ncfritz/tonup-site}"
CHECKS='["Promotion guard","Lint, typecheck, test, build"]'

echo "Repo: $REPO"

# Long-lived branches, all starting from main.
main_sha=$(gh api "repos/$REPO/git/ref/heads/main" --jq .object.sha)
for b in staging develop; do
  if gh api "repos/$REPO/git/ref/heads/$b" >/dev/null 2>&1; then
    echo "branch $b exists"
  else
    gh api "repos/$REPO/git/refs" -f ref="refs/heads/$b" -f sha="$main_sha" >/dev/null
    echo "created branch $b"
  fi
done

# develop is where work starts; allow squash (features) and merge commits
# (promotions); no rebase merges; tidy up merged feature branches.
gh api -X PATCH "repos/$REPO" \
  -f default_branch=develop \
  -F allow_squash_merge=true -F allow_merge_commit=true -F allow_rebase_merge=false \
  -F delete_branch_on_merge=true >/dev/null
echo "repo settings updated (default branch: develop)"

# PRs only, required checks, no force pushes or deletion. The protection
# also applies to admins, so nobody skips a step by accident.
for b in main staging develop; do
  gh api -X PUT "repos/$REPO/branches/$b/protection" --input - >/dev/null <<JSON
{
  "required_status_checks": { "strict": false, "contexts": $CHECKS },
  "enforce_admins": true,
  "required_pull_request_reviews": { "required_approving_review_count": 0 },
  "restrictions": null,
  "allow_force_pushes": false,
  "allow_deletions": false,
  "required_linear_history": false
}
JSON
  echo "protected $b"
done

echo "Done."
