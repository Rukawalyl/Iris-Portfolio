/* ==========================================================================
   Iris Li — Portfolio · app (v2)
   Hash router + page templates + interactions. Content lives in /data.
   ========================================================================== */
(function () {
  "use strict";

  const S = window.SITE, CS = window.CASE_STUDIES, CW = window.COURSEWORK;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduce = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const esc = (s = "") => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const pad = (n) => String(n).padStart(2, "0");

  /* ---------- Icons ---------- */
  const I = {
    arrow: '<svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4.5 11.5l7-7M5.5 4.5h6v6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    right: '<svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    left: '<svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    up: '<svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 13V3M4 7l4-4 4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    down: '<svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 3v9M4 8.5l4 4 4-4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    mail: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="5.5" width="18" height="13" rx="2.5" stroke="currentColor" stroke-width="1.5"/><path d="M3.8 7l8.2 6 8.2-6" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>',
    linkedin: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="4" y="9.5" width="3" height="10" rx="1" stroke="currentColor" stroke-width="1.5"/><circle cx="5.5" cy="5.6" r="1.6" stroke="currentColor" stroke-width="1.5"/><path d="M10.5 19.5v-10h3v1.4c.6-1 1.8-1.7 3.2-1.7 2.3 0 3.3 1.5 3.3 4v6.3h-3v-5.6c0-1.2-.5-1.9-1.5-1.9-1.1 0-2 .8-2 2.1v5.4h-3z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>',
    zoom: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="7" cy="7" r="4.5" stroke="currentColor" stroke-width="1.5"/><path d="M10.5 10.5L14 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
  };

  const mailto = () => `mailto:${S.email}?subject=${encodeURIComponent(S.emailSubject)}`;
  const btn = (label, href, { ghost = false, ext = false, icon = "arrow", cls = "" } = {}) =>
    `<a class="btn ${ghost ? "btn-ghost" : ""} ${cls}" href="${esc(href)}"${ext ? ' target="_blank" rel="noopener"' : ""}>${esc(label)}<span class="btn-ic">${I[icon]}</span></a>`;
  const linkArrow = (label, href, ext = false) =>
    `<a class="link-arrow" href="${esc(href)}"${ext ? ' target="_blank" rel="noopener"' : ""}>${esc(label)} ${ext ? I.arrow : I.right}</a>`;
  const linkExt = (label, href, ext = true) =>
    `<a class="link-ext" href="${esc(href)}"${ext ? ' target="_blank" rel="noopener"' : ""}>${esc(label)} ${I.arrow}</a>`;
  const img = (src, alt, title, lazy = true) =>
    `<img src="${esc(src)}" alt="${esc(alt)}" data-title="${esc(title || alt)}" ${lazy ? 'loading="lazy" ' : ""}decoding="async">`;
  // "[text](url)" → link
  const richText = (t) => esc(t).replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');

  /* ---------- Mini Markdown (case studies / coursework bodies) ---------- */
  function md(src) {
    const inline = (t) => esc(t).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/(^|[^*])\*(?!\s)(.+?)\*/g, "$1<em>$2</em>");
    const out = []; let para = [], list = [];
    const flushP = () => {
      if (!para.length) return;
      if (para.length === 1 && /^\*\*[^*]+\*\*$/.test(para[0].trim())) out.push(`<p class="label">${inline(para[0].trim())}</p>`);
      else out.push(`<p>${para.map(inline).join("<br>")}</p>`);
      para = [];
    };
    const flushL = () => { if (list.length) { out.push(`<ul>${list.map((l) => `<li>${inline(l)}</li>`).join("")}</ul>`); list = []; } };
    src.trim().split("\n").forEach((raw) => {
      const line = raw.trimEnd(); let m;
      if (!line.trim()) { flushP(); flushL(); }
      else if ((m = line.match(/^###\s+(.*)/)) && !line.startsWith("####")) { flushP(); flushL(); out.push(`<h2 id="s-${slug(m[1])}">${inline(m[1])}</h2>`); }
      else if ((m = line.match(/^####\s+(.*)/))) { flushP(); flushL(); out.push(`<h3>${inline(m[1])}</h3>`); }
      else if ((m = line.match(/^\s*[-*]\s+(.*)/))) { flushP(); list.push(m[1]); }
      else { flushL(); para.push(line.trim()); }
    });
    flushP(); flushL();
    return out.join("\n");
  }

  /* ---------- Shared blocks ---------- */
  function contactBlock() {
    const c = S.contact;
    return `
    <section class="contact" aria-labelledby="contact-title" data-marbles>
      <canvas aria-hidden="true"></canvas>
      <div class="wrap contact-inner">
        <p class="caps contact-eyebrow" data-reveal>${esc(c.eyebrow)}</p>
        <h2 id="contact-title" data-reveal style="--d:.08s">${esc(c.titleBefore)} <span class="accent">${esc(c.accent)}</span></h2>
        <div class="contact-icons" data-reveal style="--d:.16s">
          <a class="c-icon" href="${esc(S.linkedin)}" target="_blank" rel="noopener" aria-label="LinkedIn">${I.linkedin}</a>
          <button class="c-icon" type="button" aria-label="Show email address" aria-expanded="false" aria-controls="c-mail" data-mail-toggle>${I.mail}</button>
        </div>
        <div class="c-reveal" id="c-mail"><a href="${mailto()}">${esc(S.email)}</a><button type="button" data-copy="${esc(S.email)}">Copy</button></div>
      </div>
    </section>`;
  }

  const coverImg = (item, cls, extra = "") =>
    `<div class="${cls} ${item.coverFit === "contain" ? "contain" : ""}" style="background:${esc(item.coverBg || "")}" ${extra}>${img(item.cover, `${item.title} cover`, item.title, false)}</div>`;

  function card(item, href, caps, { summary = false } = {}) {
    return `
      <a class="card" href="${href}" data-reveal>
        ${coverImg(item, "card-media")}
        <h3>${esc(item.title)}</h3>
        <div class="caps">${esc(caps)}</div>
        ${summary ? `<p>${esc(item.summary)}</p>` : ""}
      </a>`;
  }

  /* ---------- Pages ---------- */
  const caseById = (id) => CS.find((c) => c.id === id);
  const catCaps = (c) => c.category;

  function home() {
    const h = S.hero;
    const featured = S.caseStudiesIntro.featured.map(caseById).filter(Boolean);
    const ai = (S.aiProjects || []).filter((p) => p.published);
    return `
    <section class="hero">
      <div class="wrap hero-grid">
        <div class="rise">
          <h1>Hi, I'm <span class="accent">${esc(S.shortName)}</span><span class="smile">:)</span></h1>
          <ul class="traits" aria-label="Traits">${h.traits.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
          <p class="lead">${esc(h.intro)}</p>
          <div>${btn(h.cta.label, h.cta.href, { icon: "right" })}</div>
        </div>
        <div class="portrait-wrap">
          <div class="orb" aria-hidden="true"></div>
          <svg class="neon" viewBox="0 0 400 400" aria-hidden="true">
            <g><path d="M200 34C292 30 368 96 364 196C360 300 290 366 196 364C104 362 34 296 38 196C42 104 112 38 200 34Z"/></g>
            <g><path d="M206 58C284 66 346 120 340 204C334 292 272 344 190 338C110 332 58 270 64 192C70 116 130 52 206 58Z"/><path d="M190 18C300 22 384 110 380 210C376 316 286 386 186 380C86 374 16 300 22 196C28 98 96 14 190 18Z"/></g>
          </svg>
          <div class="portrait-float"><div class="portrait-tilt" data-tilt><div class="portrait"><img src="${esc(h.portrait)}" alt="Portrait of Iris Li" fetchpriority="high"></div></div></div>
        </div>
      </div>
    </section>

    <section class="section" aria-labelledby="work-title" style="padding-top:clamp(40px,6vw,80px)">
      <div class="wrap">
        <div class="section-head">
          <div data-reveal>
            <h2 id="work-title" class="section-title">${esc(S.caseStudiesIntro.title)}</h2>
            <p class="section-desc">${esc(S.caseStudiesIntro.description)}</p>
          </div>
          <div data-reveal style="--d:.1s">${linkArrow("View all projects", "#/case-studies")}</div>
        </div>
        <div class="grid2">${featured.map((c) => card(c, `#/project/${c.id}`, catCaps(c))).join("")}</div>
      </div>
    </section>

    ${ai.length ? `
    <section class="section" aria-labelledby="ai-title" style="padding-top:0">
      <div class="wrap">
        <div class="section-head"><h2 id="ai-title" class="section-title" data-reveal>AI Projects</h2></div>
        <div class="grid2">${ai.map((p) => card({ ...p, summary: p.oneLineSummary }, p.caseStudyUrl || p.liveUrl || "#/", [p.year, p.status].filter(Boolean).join(" · "), { summary: true })).join("")}</div>
      </div>
    </section>` : ""}

    ${contactBlock()}`;
  }

  function caseStudies() {
    return `
    <header class="page-head left wrap rise">
      <h1>${esc(S.caseStudiesIntro.title)}</h1>
      <p class="lead">${esc(S.caseStudiesIntro.description)}</p>
    </header>
    <div class="wrap" style="padding-bottom:120px">
      <div class="grid2">${CS.map((c) => card(c, `#/project/${c.id}`, catCaps(c))).join("")}</div>
    </div>`;
  }

  function coursework() {
    return `
    <header class="page-head wrap rise">
      <h1>Graduate Coursework</h1>
      <p class="lead">${esc(window.COURSEWORK_INTRO)}</p>
    </header>
    <div class="wrap cw-grid">
      ${CW.map((c, i) => `
        <a class="cw-card" href="#/coursework/${c.id}" data-reveal style="--d:${(i % 2) * 0.1}s">
          <div class="cw-frame"><div class="ph">${img(c.cover, `${c.title} cover`, c.title)}</div></div>
          <div class="cw-meta"><b>${pad(i + 1)}</b><span>${esc([c.course, ...c.tags].join(" · "))}</span></div>
          <h3><span>${esc(c.title)}</span></h3>
        </a>`).join("")}
    </div>`;
  }

  /* Detail pages share the original reading layout */
  function reading({ backHref, backLabel, eyebrow, item, list, baseHref, kind, extraTop = "", links = "" }) {
    const i = list.indexOf(item);
    const prev = list[(i - 1 + list.length) % list.length], next = list[(i + 1) % list.length];
    return `
    <div class="reading" data-reading>
      <div class="reading-bg" aria-hidden="true"></div>
      <div class="progress" aria-hidden="true"></div>
      <div class="wrap back"><a class="link-arrow" href="${backHref}">${I.left} ${esc(backLabel)}</a></div>
      ${extraTop || `<header class="cw-head wrap rise">
        <p class="caps">${esc(eyebrow)}</p>
        <h1>${esc(item.title)}</h1>
      </header>`}
      <article class="cw-body" data-reveal>${md(item.body)}</article>
      ${links ? `<div class="cw-link wrap">${links}</div>` : ""}
      <div class="wrap" style="max-width:1000px">
        <nav class="next-prev" aria-label="More ${kind}">
          <a href="${baseHref}${prev.id}"><span class="caps">Previous</span><span>${esc(prev.title)}</span></a>
          <a href="${baseHref}${next.id}"><span class="caps">Next</span><span>${esc(next.title)}</span></a>
        </nav>
      </div>
    </div>`;
  }
  const serifLink = (label, href) => `<a class="link-serif" href="${esc(href)}" target="_blank" rel="noopener">${esc(label)} ${I.arrow}</a>`;

  function cwDetail(id) {
    const c = CW.find((x) => x.id === id);
    if (!c) return notFound();
    const href = c.pdfUrl || c.liveUrl;
    return reading({ backHref: "#/coursework", backLabel: "Back to coursework", eyebrow: c.course, item: c, list: CW, baseHref: "#/coursework/", kind: "coursework",
      links: href ? serifLink(c.linkLabel || "View Full Presentation Deck", href) : "" });
  }

  function caseDetail(id) {
    const c = caseById(id);
    if (!c) return notFound();
    const extraTop = `
      <header class="wrap cs-hero">
        ${coverImg(c, "cs-logo", 'role="button" tabindex="0" data-zoom aria-label="Enlarge image"')}
        <div class="cs-info rise">
          <p class="caps">${esc(c.category)}</p>
          <h1>${esc(c.title)}</h1>
          <p class="sum">${esc(c.summary)}</p>
          <div class="cs-skills">${c.skills.map((k) => `<span>${esc(k)}</span>`).join("")}</div>
          ${c.highlights && c.highlights.length ? `<div class="cs-stats">${c.highlights.map((h) => `<div><b><span>${esc(h.value)}</span></b><small>${esc(h.label)}</small></div>`).join("")}</div>` : ""}
        </div>
      </header>`;
    const links = [c.pdfUrl ? serifLink(c.pdfLabel || "View Full PDF", c.pdfUrl) : "", c.liveUrl ? serifLink("Visit Live Site", c.liveUrl) : "",
      c.brandUrl ? `<div style="margin-top:22px">${linkArrow("Company website", c.brandUrl, true)}</div>` : ""].join("");
    return reading({ backHref: "#/case-studies", backLabel: "Back to case studies", eyebrow: c.category, item: c, list: CS, baseHref: "#/project/", kind: "case studies", extraTop, links });
  }

  function about() {
    const a = S.about, j = S.journey;
    const roman = ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii"];
    return `
    <section class="wrap about">
      <div class="photo-col">
        <div class="photo-swap" role="button" tabindex="0" aria-label="Switch photo" data-swap>
          ${a.photos.map((p) => `<img src="${esc(p.src)}" alt="${esc(p.alt)}">`).join("")}
        </div>
        <div class="photo-dots" aria-hidden="true">${a.photos.map((_, i) => `<i class="${i ? "" : "on"}"></i>`).join("")}</div>
      </div>
      <div class="rise">
        <h1>${esc(a.title)}</h1>
        <p class="welcome">${esc(a.welcome)}</p>
        <div class="about-text">${a.paragraphs.map((p) => `<p>${richText(p)}</p>`).join("")}</div>
        <p class="signoff">${esc(a.signoff)}</p>
        <div class="icons">
          <a class="icon" href="${esc(S.linkedin)}" target="_blank" rel="noopener" aria-label="LinkedIn">${I.linkedin}</a>
          <a class="icon" href="${mailto()}" aria-label="Email ${esc(S.email)}" title="${esc(S.email)}">${I.mail}</a>
        </div>
      </div>
    </section>

    <section class="wrap journey" aria-labelledby="journey-title">
      <h2 id="journey-title" data-reveal>${esc(j.title)}</h2>
      <div class="j-track" data-journey>
        <svg class="j-svg" aria-hidden="true"><path class="base"/><path class="live"/><circle class="tip" r="9"/></svg>
        ${j.stops.map((st, i) => `
          <div class="j-stop">
            <span class="j-node" aria-hidden="true"></span>
            <div class="j-art" aria-hidden="true" data-art="${esc(st.art)}"></div>
            <div class="j-text"><span class="num">${roman[i]}</span><h3>${esc(st.city)}</h3><p>${esc(st.line)}</p></div>
          </div>`).join("")}
        <div class="j-end"><p>${esc(j.ending)}</p></div>
      </div>
    </section>`;
  }

  function resume() {
    const R = S.resume;
    return `
    <div class="wrap resume">
      <section class="r-top rise">
        <div>
          <p class="r-quote">“${esc(R.quote)}”</p>
          <p class="r-by">— ${esc(R.quoteBy)}</p>
          <p class="caps">Philosophy</p>
          <p class="r-phil">${esc(R.philosophy)}</p>
        </div>
        <a class="btn-line" href="${esc(S.resumeUrl)}" target="_blank" rel="noopener">Download Resume</a>
      </section>

      <section class="r-sec" aria-labelledby="r-exp">
        <div class="r-head">
          <h2 id="r-exp">Experience</h2>
          <div class="r-tabs" role="tablist" aria-label="Experience">
            <button role="tab" aria-selected="true" data-slide="0"><small>01</small>Work</button>
            <button role="tab" aria-selected="false" data-slide="1"><small>02</small>Education</button>
          </div>
        </div>
        <div class="r-slider" data-slider tabindex="0" aria-label="Work and education — swipe or use arrow keys">
          <div class="r-panel" role="tabpanel" aria-label="Work">
            <div class="r-grid">${S.experience.map((e) => `<div class="r-job"><h3>${esc(e.org)}</h3><div class="t">${esc(e.title)}</div><div class="d">${esc(e.dates)}</div></div>`).join("")}</div>
          </div>
          <div class="r-panel" role="tabpanel" aria-label="Education">
            ${S.education.map((e) => `<div class="edu" tabindex="0"><div class="edu-logo">${e.logo ? `<img src="${esc(e.logo)}" alt="${esc(e.school)} logo">` : ""}</div><div><div class="caps">${esc(e.school)}</div><h3>${esc(e.degree)}</h3></div></div>`).join("")}
          </div>
        </div>
        <p class="r-hint" aria-hidden="true"><i></i>Swipe</p>
      </section>

      <section class="r-sec" aria-labelledby="r-do">
        <h2 id="r-do">What I do</h2>
        <div class="do-grid">${S.whatIDo.map((g) => `<div><h3>${esc(g.title)}</h3><ul>${g.items.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>`).join("")}</div>
      </section>

      <section class="r-sec" aria-labelledby="r-sp" style="border-bottom:0">
        <h2 id="r-sp">Superpower</h2>
        <div class="powers">${S.superpowers.map((p) => `<div><h3>${esc(p.title)}</h3><p>${esc(p.text)}</p></div>`).join("")}</div>
      </section>
    </div>`;
  }

  function notFound() {
    return `<header class="page-head wrap" style="min-height:70vh"><h1>Lost the thread?</h1><p class="lead">That page doesn't exist (yet).</p>
      <p style="margin-top:28px">${btn("Back home", "#/", { icon: "right" })}</p></header>`;
  }

  /* ---------- Interactions ---------- */
  let cleanups = [];

  function mountSwap(root) {
    const el = $("[data-swap]", root);
    if (!el) return;
    const dots = $$(".photo-dots i", root);
    const set = (alt) => { el.classList.toggle("alt", alt); dots.forEach((d, i) => d.classList.toggle("on", i === (alt ? 1 : 0))); };
    const fine = window.matchMedia("(hover: hover)").matches;
    if (fine) { el.addEventListener("mouseenter", () => set(true)); el.addEventListener("mouseleave", () => set(false)); }
    el.addEventListener("click", () => set(!el.classList.contains("alt")));
    el.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); set(!el.classList.contains("alt")); } });
  }

  function mountJourney(root) {
    const track = $("[data-journey]", root);
    if (!track) return;
    const stops = $$(".j-stop", track), nodes = $$(".j-node", track), end = $(".j-end", track);
    const base = $(".j-svg .base", track), live = $(".j-svg .live", track), tip = $(".j-svg .tip", track);
    stops.forEach((st) => { const a = $(".j-art", st); a.innerHTML = window.JOURNEY_ART(a.dataset.art); });
    let len = 0, tipY = 1;
    function build() {
      const tr = track.getBoundingClientRect();
      const pts = nodes.map((n) => { const r = n.getBoundingClientRect(); return [r.left + r.width / 2 - tr.left, r.top + r.height / 2 - tr.top]; });
      const ex = pts[0][0], er = end.getBoundingClientRect(), endY = er.top - tr.top + 150;
      const narrow = window.matchMedia("(max-width: 960px)").matches;
      const amp = narrow ? 10 : 46;
      let d = `M${ex} 0`;
      let prev = [ex, 0];
      const seg = (to, k) => { const dy = to[1] - prev[1]; d += ` C${prev[0] + amp * k} ${prev[1] + dy * 0.35} ${to[0] - amp * k} ${prev[1] + dy * 0.65} ${to[0]} ${to[1]}`; prev = to; };
      pts.forEach((p, i) => seg(p, i % 2 ? -1 : 1));
      // pen-doodle finish: one loop, a short tail, and an ink dot
      const ly = endY - 110;
      seg([ex, ly], 1);
      d += ` C ${ex} ${ly + 34} ${ex + 46} ${ly + 34} ${ex + 46} ${ly + 6} C ${ex + 46} ${ly - 22} ${ex + 6} ${ly - 22} ${ex + 6} ${ly + 12} C ${ex + 6} ${ly + 50} ${ex - 12} ${ly + 62} ${ex - 6} ${endY - 9}`;
      tip.setAttribute("cx", ex - 6); tip.setAttribute("cy", endY); tipY = endY;
      base.setAttribute("d", d); live.setAttribute("d", d);
      len = live.getTotalLength();
      live.style.strokeDasharray = `${len}`;
      update();
    }
    function update() {
      const tr = track.getBoundingClientRect(), vh = window.innerHeight;
      const atBottom = scrollY + vh >= document.documentElement.scrollHeight - 4;
      const prog = atBottom ? 1 : Math.max(0, Math.min(1, (vh * 0.72 - tr.top) / tipY));
      live.style.strokeDashoffset = `${len * (1 - (reduce() ? 1 : prog))}`;
      stops.forEach((st, i) => { const r = nodes[i].getBoundingClientRect(); if (reduce() || r.top < vh * 0.66) st.classList.add("on"); });
      const done = reduce() || prog > 0.985;
      tip.classList.toggle("on", done); end.classList.toggle("on", done);
    }
    const onScroll = () => requestAnimationFrame(update);
    let rT; const onResize = () => { clearTimeout(rT); rT = setTimeout(build, 150); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    cleanups.push(() => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onResize); });
    requestAnimationFrame(build);
    if (document.fonts) document.fonts.ready.then(build);
  }

  function mountSlider(root) {
    const sl = $("[data-slider]", root);
    if (!sl) return;
    const tabs = $$(".r-tabs [data-slide]", root);
    const go = (i) => sl.scrollTo({ left: i * sl.clientWidth, behavior: reduce() ? "auto" : "smooth" });
    const sync = () => { const i = Math.round(sl.scrollLeft / Math.max(1, sl.clientWidth)); tabs.forEach((t, k) => t.setAttribute("aria-selected", k === i)); };
    sl.addEventListener("scroll", () => requestAnimationFrame(sync), { passive: true });
    tabs.forEach((t) => { const i = +t.dataset.slide; t.addEventListener("click", () => go(i)); t.addEventListener("mouseenter", () => go(i)); });
    sl.addEventListener("keydown", (e) => { if (e.key === "ArrowRight") { e.preventDefault(); go(1); } if (e.key === "ArrowLeft") { e.preventDefault(); go(0); } });
    // mouse drag to swipe
    let down = null;
    sl.addEventListener("pointerdown", (e) => { if (e.pointerType !== "mouse") return; down = { x: e.clientX, left: sl.scrollLeft }; sl.classList.add("dragging"); });
    window.addEventListener("pointermove", (e) => { if (down) sl.scrollLeft = down.left - (e.clientX - down.x); });
    const up = (e) => { if (!down) return; const dx = e.clientX - down.x; sl.classList.remove("dragging"); const cur = Math.round(down.left / sl.clientWidth); go(Math.abs(dx) > 60 ? (dx < 0 ? Math.min(1, cur + 1) : Math.max(0, cur - 1)) : cur); down = null; };
    window.addEventListener("pointerup", up);
    cleanups.push(() => window.removeEventListener("pointerup", up));
  }

  function mountReading(root) {
    const r = $("[data-reading]", root);
    if (!r) return;
    const bar = $(".progress", r), bg = $(".reading-bg", r);
    const onMove = (e) => { bg.style.setProperty("--mx", e.clientX + "px"); bg.style.setProperty("--my", e.clientY + "px"); };
    const onScroll = () => { const h = document.documentElement.scrollHeight - innerHeight; bar.style.setProperty("--p", h > 0 ? scrollY / h : 0); };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    cleanups.push(() => { window.removeEventListener("pointermove", onMove); window.removeEventListener("scroll", onScroll); });
  }

  function mountContact(root) {
    const host = $("[data-marbles]", root);
    if (!host) return;
    if (window.mountMarbles) cleanups.push(window.mountMarbles($("canvas", host), host));
    const t = $("[data-mail-toggle]", host), box = $(".c-reveal", host);
    t.addEventListener("click", () => { const o = t.getAttribute("aria-expanded") !== "true"; t.setAttribute("aria-expanded", o); box.classList.toggle("open", o); });
  }

  function mountTilt(root) {
    const el = $("[data-tilt]", root);
    if (!el || reduce() || !window.matchMedia("(hover: hover) and (min-width: 961px)").matches) return;
    const onMove = (e) => {
      const x = e.clientX / innerWidth - 0.5, y = e.clientY / innerHeight - 0.5;
      el.style.transform = `perspective(900px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translate(${x * 10}px, ${y * 10}px)`;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    cleanups.push(() => window.removeEventListener("pointermove", onMove));
  }

  let revealIO;
  function mountReveal(root) {
    const els = $$("[data-reveal]", root);
    if (reduce() || !("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("in")); return; }
    revealIO = revealIO || new IntersectionObserver((ents) => ents.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); revealIO.unobserve(en.target); } }), { rootMargin: "0px 0px -6% 0px", threshold: 0.06 });
    els.forEach((e) => revealIO.observe(e));
  }

  /* ---------- Router ---------- */
  const main = $("#main");
  function route() {
    const path = ("/" + location.hash.replace(/^#\/?/, "")).replace(/\/+$/, "") || "/";
    const p = path.split("/").filter(Boolean);
    let html, title = `${S.name} — Portfolio`, key = "";
    if (!p.length) { html = home(); key = "home"; }
    else if (p[0] === "about") { html = about(); title = "About — " + S.name; key = "about"; }
    else if (p[0] === "resume") { html = resume(); title = "Resume — " + S.name; key = "resume"; }
    else if (p[0] === "case-studies") { html = caseStudies(); title = "Case Studies — " + S.name; key = "cs"; }
    else if (p[0] === "project" && p[1]) { html = caseDetail(p[1]); const c = caseById(p[1]); if (c) title = c.title + " — " + S.name; key = "cs"; }
    else if (p[0] === "coursework" && p[1]) { html = cwDetail(p[1]); const c = CW.find((x) => x.id === p[1]); if (c) title = c.title + " — " + S.name; key = "cw"; }
    else if (p[0] === "coursework") { html = coursework(); title = "Coursework — " + S.name; key = "cw"; }
    else html = notFound();
    return { html, title, key };
  }

  let first = true;
  function render() {
    const { html, title, key } = route();
    const swap = () => {
      cleanups.forEach((f) => { try { f(); } catch (e) {} }); cleanups = [];
      main.innerHTML = `<div class="page">${html}</div>`;
      document.title = title;
      window.scrollTo(0, 0);
      setNav(key);
      const root = main.firstElementChild;
      mountSwap(root); mountTilt(root); mountJourney(root); mountSlider(root); mountReading(root); mountContact(root); mountReveal(root);
      if (!first) { const h = $("h1", root); if (h) { h.tabIndex = -1; h.focus({ preventScroll: true }); } }
      first = false;
    };
    const cur = main.firstElementChild;
    if (cur && !first && !reduce()) { cur.classList.add("leaving"); setTimeout(swap, 200); } else swap();
    closeMenu();
  }

  function setNav(key) {
    $$("[data-nav]").forEach((a) => {
      const on = a.dataset.nav === key || (a.dataset.nav === "portfolio" && (key === "cs" || key === "cw"));
      a.classList.toggle("active", on);
      if (on && a.tagName === "A") a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
    });
  }

  /* ---------- Global chrome ---------- */
  $("#footer").innerHTML = `
    <div class="wrap footer-row">
      <span>${S.footer.line.map(esc).join(" • ")}</span>
      <span>© ${esc(S.footer.copyright)}</span>
    </div>`;

  const header = $(".site-header");
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 12);
  window.addEventListener("scroll", onScroll, { passive: true });

  const ddBtn = $("[data-dd]"), dd = $("#dd-portfolio");
  const closeDd = () => { ddBtn.setAttribute("aria-expanded", "false"); dd.classList.remove("open"); };
  ddBtn.addEventListener("click", () => { const o = ddBtn.getAttribute("aria-expanded") !== "true"; ddBtn.setAttribute("aria-expanded", o); dd.classList.toggle("open", o); });
  document.addEventListener("click", (e) => { if (!e.target.closest(".has-dd")) closeDd(); });
  dd.addEventListener("click", closeDd);

  const menuBtn = $(".menu-btn");
  function closeMenu() { document.body.classList.remove("menu-open"); menuBtn.setAttribute("aria-expanded", "false"); }
  menuBtn.addEventListener("click", () => { const o = !document.body.classList.contains("menu-open"); document.body.classList.toggle("menu-open", o); menuBtn.setAttribute("aria-expanded", o); });

  const lb = $(".lightbox"), lbImg = $(".lightbox img");
  const closeLb = () => { lb.classList.remove("open"); lb.setAttribute("aria-hidden", "true"); };
  lb.addEventListener("click", (e) => { if (e.target !== lbImg) closeLb(); });

  const toast = (msg) => { const t = $(".toast"); t.textContent = msg; t.classList.add("show"); clearTimeout(t._t); t._t = setTimeout(() => t.classList.remove("show"), 2200); };

  document.addEventListener("click", (e) => {
    const z = e.target.closest("[data-zoom]");
    if (z) { const im = $("img", z); if (im) { lbImg.src = im.src; lbImg.alt = im.alt; lb.classList.add("open"); lb.setAttribute("aria-hidden", "false"); $(".lightbox button").focus(); } return; }
    const c = e.target.closest("[data-copy]");
    if (c) {
      const v = c.dataset.copy, label = c.textContent;
      const done = () => { c.textContent = "Copied"; c.classList.add("done"); toast("Email copied"); setTimeout(() => { c.textContent = label; c.classList.remove("done"); }, 1800); };
      const fail = () => { const a = c.closest(".c-row") && $(".val", c.closest(".c-row")); if (a) { const r = document.createRange(); r.selectNodeContents(a); const s = getSelection(); s.removeAllRanges(); s.addRange(r); } toast("Press ⌘/Ctrl + C to copy"); };
      if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(v).then(done, fail); else fail();
      return;
    }
    if (e.target.closest("[data-top]")) window.scrollTo({ top: 0, behavior: reduce() ? "auto" : "smooth" });
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { closeLb(); closeMenu(); closeDd(); }
    if ((e.key === "Enter" || e.key === " ") && e.target.matches("[data-zoom]")) { e.preventDefault(); e.target.click(); }
  });

  // Broken image → typographic cover
  document.addEventListener("error", (e) => {
    const im = e.target;
    if (im.tagName !== "IMG" || im.dataset.failed || im.closest(".lightbox")) return;
    im.dataset.failed = "1";
    const d = document.createElement("div"); d.className = "fallback"; d.textContent = im.dataset.title || "";
    im.replaceWith(d);
  }, true);

  window.addEventListener("hashchange", render);
  onScroll();
  render();
})();
