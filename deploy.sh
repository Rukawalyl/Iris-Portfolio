#!/usr/bin/env bash
# One-step publish: commits everything and pushes to GitHub.
# GitHub Pages (via .github/workflows/pages.yml) and Netlify (if the repo is connected) redeploy automatically.
#
# First time:   bash deploy.sh https://github.com/<your-username>/<repo-name>.git
# After that:   bash deploy.sh
set -e
cd "$(dirname "$0")"

if [ ! -d .git ]; then
  git init -q
  git branch -M main
fi

if [ -n "$1" ]; then
  git remote remove origin 2>/dev/null || true
  git remote add origin "$1"
fi

if ! git remote get-url origin >/dev/null 2>&1; then
  echo "No GitHub repo linked yet. Run:  bash deploy.sh https://github.com/<your-username>/<repo-name>.git"
  exit 1
fi

git add -A
git commit -q -m "Update portfolio $(date '+%Y-%m-%d %H:%M')" || echo "Nothing new to commit."
git push -u origin main
echo "Pushed. Your site will update in about a minute."
