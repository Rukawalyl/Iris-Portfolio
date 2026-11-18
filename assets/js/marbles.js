/* Marble pool — a 2D physics pile drawn as glossy 3D pearls and glass marbles.
   Colours follow the site: ink, lime, pearl, champagne, stone. The pointer pushes marbles away.
   Pauses off-screen; with reduced motion it renders a settled, static pile. */
(function () {
  // base colour, highlight colour, shadow colour, translucency (glass = lighter, softer edge)
  const KINDS = [
    { base: "#1C1C1A", hi: "#8E8D86", lo: "#050504", w: 4 },          // glossy ink
    { base: "#C9EE3F", hi: "#F6FFD0", lo: "#7C9A12", w: 4 },          // lime
    { base: "#E9E8E2", hi: "#FFFFFF", lo: "#A9A79D", w: 5 },          // pearl
    { base: "#CDBF9C", hi: "#F7F0DC", lo: "#8C7C57", w: 3 },          // champagne
    { base: "#B7B6AF", hi: "#F1F0EB", lo: "#77766F", w: 2 },          // stone
    { base: "#DDEFA0", hi: "#FFFFFF", lo: "#9DB548", w: 2, glass: 1 }, // lime glass
    { base: "#D8D7D1", hi: "#FFFFFF", lo: "#9C9B94", w: 2, glass: 1 }, // clear glass
  ];
  const pick = () => { const t = KINDS.reduce((a, k) => a + k.w, 0); let x = Math.random() * t; for (const k of KINDS) if ((x -= k.w) < 0) return k; return KINDS[0]; };

  window.mountMarbles = function (canvas, host) {
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let W = 0, H = 0, balls = [], raf = 0, running = false;
    const mouse = { x: -999, y: -999, vx: 0, vy: 0, on: false };

    function size() {
      const rect = host.getBoundingClientRect(), dpr = Math.min(2, window.devicePixelRatio || 1);
      W = rect.width; H = rect.height;
      canvas.width = W * dpr; canvas.height = H * dpr; canvas.style.width = W + "px"; canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function make() {
      const k = 0.6 + 0.4 * Math.min(1, W / 1200);
      const count = Math.round(Math.max(22, Math.min(56, W / 26)));
      balls = [];
      for (let i = 0; i < count; i++) {
        const r = (14 + Math.random() * 34) * k;
        balls.push({ x: r + Math.random() * (W - 2 * r), y: -r - Math.random() * H * 1.4, vx: (Math.random() - 0.5) * 2, vy: 0, r, m: r * r, k: pick() });
      }
    }

    function step() {
      const g = 0.42, sub = 2;
      for (let s = 0; s < sub; s++) {
        for (const b of balls) {
          b.vy += g / sub;
          if (mouse.on) {
            const dx = b.x - mouse.x, dy = b.y - mouse.y, d = Math.hypot(dx, dy), reach = b.r + 70;
            if (d < reach && d > 0.01) { const f = ((reach - d) / reach) * 1.6; b.vx += (dx / d) * f + mouse.vx * 0.04; b.vy += (dy / d) * f + mouse.vy * 0.04; }
          }
          b.vx *= 0.995; b.vy *= 0.995;
          b.x += b.vx / sub; b.y += b.vy / sub;
          if (b.y + b.r > H) { b.y = H - b.r; b.vy *= -0.38; b.vx *= 0.96; }
          if (b.x - b.r < 0) { b.x = b.r; b.vx *= -0.6; }
          if (b.x + b.r > W) { b.x = W - b.r; b.vx *= -0.6; }
        }
        for (let i = 0; i < balls.length; i++) {
          const a = balls[i];
          for (let j = i + 1; j < balls.length; j++) {
            const b = balls[j], dx = b.x - a.x, dy = b.y - a.y, min = a.r + b.r, d2 = dx * dx + dy * dy;
            if (d2 >= min * min || d2 === 0) continue;
            const d = Math.sqrt(d2), nx = dx / d, ny = dy / d, ov = min - d, tm = a.m + b.m;
            a.x -= nx * ov * (b.m / tm); a.y -= ny * ov * (b.m / tm); b.x += nx * ov * (a.m / tm); b.y += ny * ov * (a.m / tm);
            const rv = (b.vx - a.vx) * nx + (b.vy - a.vy) * ny;
            if (rv < 0) { const imp = (-(1.42) * rv) / (1 / a.m + 1 / b.m); a.vx -= (imp / a.m) * nx; a.vy -= (imp / a.m) * ny; b.vx += (imp / b.m) * nx; b.vy += (imp / b.m) * ny; }
          }
        }
      }
      mouse.vx *= 0.8; mouse.vy *= 0.8;
    }

    function drawBall({ x, y, r, k }) {
      // body: off-centre radial gradient for a lit sphere
      const body = ctx.createRadialGradient(x - r * 0.35, y - r * 0.4, r * 0.05, x + r * 0.1, y + r * 0.15, r * 1.05);
      body.addColorStop(0, k.hi);
      body.addColorStop(k.glass ? 0.35 : 0.42, k.base);
      body.addColorStop(1, k.lo);
      ctx.globalAlpha = k.glass ? 0.82 : 1;
      ctx.fillStyle = body; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.2832); ctx.fill();
      ctx.globalAlpha = 1;
      // bounce light from the floor / neighbours along the lower edge
      const bounce = ctx.createRadialGradient(x + r * 0.25, y + r * 0.75, 0, x + r * 0.25, y + r * 0.75, r * 0.75);
      bounce.addColorStop(0, k.glass ? "rgba(255,255,255,.55)" : "rgba(255,255,255,.22)"); bounce.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = bounce; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.2832); ctx.fill();
      // glass marbles: bright inner rim
      if (k.glass) { ctx.strokeStyle = "rgba(255,255,255,.7)"; ctx.lineWidth = Math.max(1, r * 0.07); ctx.beginPath(); ctx.arc(x, y, r * 0.9, 0.3, 2.6); ctx.stroke(); }
      // soft specular window + sharp glint
      const spec = ctx.createRadialGradient(x - r * 0.38, y - r * 0.45, 0, x - r * 0.38, y - r * 0.45, r * 0.42);
      spec.addColorStop(0, "rgba(255,255,255,.95)"); spec.addColorStop(0.35, "rgba(255,255,255,.45)"); spec.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = spec; ctx.beginPath(); ctx.arc(x - r * 0.38, y - r * 0.45, r * 0.42, 0, 6.2832); ctx.fill();
      ctx.fillStyle = "rgba(255,255,255,.95)"; ctx.beginPath(); ctx.ellipse(x - r * 0.42, y - r * 0.5, r * 0.11, r * 0.07, -0.7, 0, 6.2832); ctx.fill();
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      // contact shadows first
      for (const b of balls) {
        const near = Math.max(0, 1 - (H - (b.y + b.r)) / 160);
        if (near <= 0) continue;
        const sh = ctx.createRadialGradient(b.x, H - 1, 0, b.x, H - 1, b.r * 1.1);
        sh.addColorStop(0, `rgba(20,20,18,${0.18 * near})`); sh.addColorStop(1, "rgba(20,20,18,0)");
        ctx.fillStyle = sh; ctx.beginPath(); ctx.ellipse(b.x, H - 1, b.r * 1.1, b.r * 0.22, 0, 0, 6.2832); ctx.fill();
      }
      for (const b of balls) if (b.y - b.r < H) drawBall(b);
    }

    function loop() { step(); draw(); raf = running ? requestAnimationFrame(loop) : 0; }
    const start = () => { if (!running) { running = true; raf = requestAnimationFrame(loop); } };
    const stop = () => { running = false; cancelAnimationFrame(raf); raf = 0; };
    const onMove = (e) => { const r = canvas.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top; if (mouse.on) { mouse.vx = x - mouse.x; mouse.vy = y - mouse.y; } mouse.x = x; mouse.y = y; mouse.on = true; };
    const onLeave = () => { mouse.on = false; mouse.x = mouse.y = -999; };
    let rT;
    const onResize = () => { clearTimeout(rT); rT = setTimeout(() => { const oldW = W; size(); balls.forEach((b) => { b.x = Math.min(W - b.r, b.x * (W / (oldW || W))); }); if (reduce) draw(); }, 120); };

    size(); make();
    if (reduce) { balls.forEach((b, i) => { b.y = H * 0.4 - i * 8; }); for (let i = 0; i < 900; i++) step(); draw(); }
    else { host.addEventListener("pointermove", onMove); host.addEventListener("pointerleave", onLeave); draw(); }
    window.addEventListener("resize", onResize);
    const io = new IntersectionObserver(([en]) => { if (reduce) return; if (en.isIntersecting) start(); else stop(); }, { threshold: 0.12 });
    io.observe(host);
    return () => { stop(); io.disconnect(); window.removeEventListener("resize", onResize); host.removeEventListener("pointermove", onMove); host.removeEventListener("pointerleave", onLeave); };
  };
})();
