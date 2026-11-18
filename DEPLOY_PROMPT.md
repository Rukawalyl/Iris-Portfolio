# Deploy prompt — GitHub Pages

Copy everything below the line and paste it into an AI coding assistant that can run commands on your computer, such as Claude Code or Cursor. Open the assistant inside this folder (`iris-portfolio-github`) first.

---

Please deploy the static website in the current folder to GitHub Pages for me. Do the steps in order, and tell me plainly when you need me to do something (for example, log in in the browser).

Context: this is a finished static site — `index.html`, `assets/`, `data/` — with no build step and no dependencies. All animations run in the browser. It already includes `.github/workflows/pages.yml`, which publishes the site to GitHub Pages on every push to `main`. Do not change any website files.

1. Check that `git` and the GitHub CLI (`gh`) are installed.
   - If `gh` is missing, install it: `brew install gh` on Mac, `winget install GitHub.cli` on Windows.
   - Run `gh auth status`. If I'm not logged in, run `gh auth login`, choose GitHub.com, HTTPS, and login with a web browser, then wait for me to finish.
2. Create a public repository named `iris-portfolio` under my account and push this folder to it:
   `git init -b main && git add -A && git commit -m "Iris Li portfolio" && gh repo create iris-portfolio --public --source=. --remote=origin --push`
   - If the repository already exists, add it as `origin` and push to `main` instead.
3. Turn on GitHub Pages with GitHub Actions as the source:
   `gh api -X POST repos/{owner}/iris-portfolio/pages -f build_type=workflow`
   - Replace `{owner}` with my GitHub username, from `gh api user -q .login`.
   - If Pages is already on, run the same command with `-X PUT` instead.
4. Start the deploy and wait for it to finish:
   `gh workflow run "Deploy to GitHub Pages"`, then `gh run watch`.
5. Get the live address with `gh api repos/{owner}/iris-portfolio/pages -q .html_url`.
   - Open it, and check that it loads with no 404 and that its pages open: `#/about`, `#/resume`, `#/case-studies`, `#/coursework`.
6. Tell me the live link.
7. Tell me that to publish future edits, I just run `bash deploy.sh` in this folder.
