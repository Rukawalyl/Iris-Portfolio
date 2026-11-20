<div style="color:#7030A0">
<h1>Iris-Portfolio</h1>
<p>Website, downloadable documents and original creative materials.</p>
<table><tr><th>Category</th><th>Location</th></tr><tr><td>Home portrait</td><td><a href="assets/images/home/">assets/images/home/</a></td></tr><tr><td>About photos</td><td><a href="assets/images/about/">assets/images/about/</a></td></tr><tr><td>Case study covers</td><td><a href="assets/images/projects/">assets/images/projects/</a></td></tr><tr><td>Coursework covers</td><td><a href="assets/images/coursework/">assets/images/coursework/</a></td></tr><tr><td>Education logos</td><td><a href="assets/images/logos/">assets/images/logos/</a></td></tr><tr><td>Resume PDF</td><td><a href="assets/files/Iris-Li-Resume.pdf">assets/files/Iris-Li-Resume.pdf</a></td></tr><tr><td>Case study PDFs</td><td><a href="portfolio-assets/files/projects/">portfolio-assets/files/projects/</a></td></tr><tr><td>Coursework PDFs</td><td><a href="portfolio-assets/files/coursework/">portfolio-assets/files/coursework/</a></td></tr><tr><td>Original photos and covers</td><td><a href="portfolio-assets/images/">portfolio-assets/images/</a></td></tr><tr><td>AI-readable asset manifest</td><td><a href="portfolio-assets/manifest.json">portfolio-assets/manifest.json</a></td></tr></table>
<p>Website content: <a href="data/">data/</a> · Styling and interactions: <a href="assets/">assets/</a> · Automated publishing: <a href=".github/workflows/pages.yml">GitHub Pages workflow</a></p>
<p>Privacy: this repository and its files are currently public. Images displayed on the website and downloadable PDFs are publicly accessible. Original materials are stored separately from website-ready images.</p>
</div>

<details><summary>Previous setup instructions (superseded)</summary>
<del>

# Iris Li — Portfolio

A static site: plain HTML, CSS and JavaScript, with no build step and no dependencies.
All the animations (the marble pool, the Journey line, the photo effects) run in the visitor's browser, so static hosting serves them exactly as they are.

## Deploy to GitHub Pages

**With an AI assistant:** open `DEPLOY_PROMPT.md` and paste the prompt into Claude Code or Cursor.

**Or do it yourself:**

1. On github.com, create an **empty** repository called `iris-portfolio`.
2. In Terminal, run:
   ```bash
   cd ~/Downloads/iris-portfolio-github && bash deploy.sh https://github.com/Rukawalyl/iris-portfolio.git
   ```
3. In the repository, go to **Settings → Pages → Source** and choose **GitHub Actions**. You only do this once.

Your site will be live at `https://rukawalyl.github.io/iris-portfolio/` in about a minute.

**Updating later:**
```bash
cd ~/Downloads/iris-portfolio-github && bash deploy.sh
```

## Preview on your own computer

```bash
cd ~/Downloads/iris-portfolio-github && python3 -m http.server 8000
```

Then open http://localhost:8000.

---

## Where everything lives

```
index.html                 page shell (nav, footer)
data/site.js               ALL page text: home, About, Journey, Resume, contact, footer
data/case-studies.js       5 case studies (order in the file = order on the site)
data/coursework.js         4 coursework projects
assets/css/style.css       colours and fonts (variables at the top)
assets/js/app.js           pages + interactions
assets/js/marbles.js       the marble pool on the homepage
assets/js/journey-art.js   Journey illustrations
assets/images/…            photos, covers, school logos
assets/fonts/              self-hosted fonts
.github/workflows/pages.yml  auto-deploy to GitHub Pages
deploy.sh                  one-step publish script
```

## Common edits

**Change text** — edit the files in `data/`. You never need to touch the code.

**Swap a photo** — put the new file in `assets/images/…` and update its path in `data/`.

**Add a case study** — copy one entry in `data/case-studies.js` and give it a new `id`. To show it on the homepage, add that id to `featured` in `data/site.js`.

**Resume PDF**
1. Put the PDF in `assets/files/`.
2. Set `resumeUrl: "assets/files/your-file.pdf"` in `data/site.js`.

**Logos in Education** — set `logo:` on an education entry. A white background is fine.

**AI Projects (reserved)** — add items to `aiProjects` in `data/site.js` with `published: true`. The section appears automatically.



</del>
</details>
