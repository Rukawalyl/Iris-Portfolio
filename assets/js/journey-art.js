/* Journey illustrations — dense, engraving-style line drawings built procedurally.
   ink = main line · thin = hatching/detail · lime = lime accent fill · limeline = lime stroke
   Every stroke has pathLength="1" so it can be "drawn" when the stop scrolls into view. */
(function () {
  let seq = 0, s = 1;
  const rnd = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
  const r = (n) => Math.round(n * 10) / 10;
  const P = (d, c = "ink") => `<path class="${c}" pathLength="1" style="--d:${Math.min(seq++ * 0.03, 1.6).toFixed(2)}s" d="${d}"/>`;
  const C = (x, y, rad, c = "lime") => `<circle class="${c}" cx="${r(x)}" cy="${r(y)}" r="${r(rad)}" style="--d:${Math.min(seq++ * 0.015, 1.6).toFixed(2)}s"/>`;
  const rect = (x, y, w, h) => `M${r(x)} ${r(y)}h${r(w)}v${r(h)}h${r(-w)}Z`;
  const hatchV = (x, y, w, h, gap) => { let d = ""; for (let xx = x + gap / 2; xx < x + w; xx += gap) d += `M${r(xx)} ${r(y)}v${r(h)}`; return d; };
  const hatchH = (x, y, w, h, gap) => { let d = ""; for (let yy = y + gap / 2; yy < y + h; yy += gap) d += `M${r(x)} ${r(yy)}h${r(w)}`; return d; };
  const hatchD = (x, y, w, h, gap) => { // diagonal hatching clipped to a rect
    let d = "";
    for (let k = -h; k < w; k += gap) {
      const x0 = Math.max(x, x + k), y0 = y + Math.max(0, -k), x1 = Math.min(x + w, x + k + h), y1 = y + Math.min(h, w - k);
      if (x1 > x0) d += `M${r(x0)} ${r(y0)}L${r(x1)} ${r(y1)}`;
    }
    return d;
  };
  const windows = (x, y, w, h, cols, rows, fillRate = 0.3) => {
    let d = "", f = "";
    const cw = w / cols, rh = h / rows;
    for (let i = 0; i < rows; i++) for (let j = 0; j < cols; j++) {
      const wx = x + j * cw + cw * 0.22, wy = y + i * rh + rh * 0.22, ww = cw * 0.56, wh = rh * 0.5;
      d += rect(wx, wy, ww, wh);
      if (rnd() < fillRate) f += hatchV(wx, wy, ww, wh, 1.6);
    }
    return P(d, "thin") + (f ? P(f, "thin") : "");
  };
  const foliage = (cx, cy, rx, ry, n = 26) => {
    let d = "";
    for (let i = 0; i < n; i++) {
      const a = rnd() * Math.PI * 2, rr = Math.sqrt(rnd());
      const x = cx + Math.cos(a) * rx * rr, y = cy + Math.sin(a) * ry * rr, k = 3 + rnd() * 4;
      d += `M${r(x - k)} ${r(y)}q${r(k)} ${r(-k * 1.1)} ${r(k * 2)} 0`;
    }
    return d;
  };
  const crown = (cx, cy, rx, ry) => {
    let d = `M${r(cx - rx)} ${r(cy)}`; const n = 11;
    for (let i = 1; i <= n; i++) {
      const a = Math.PI + (i / n) * Math.PI * 2, x = cx + Math.cos(a) * rx, y = cy + Math.sin(a) * ry;
      d += `Q${r(cx + Math.cos(a - 0.3) * rx * 1.18)} ${r(cy + Math.sin(a - 0.3) * ry * 1.18)} ${r(x)} ${r(y)}`;
    }
    return d;
  };
  const building = (x, top, w, base, cols, shade = 0.34) => {
    const h = base - top;
    return P(rect(x, top, w, h)) + windows(x, top, w * (1 - shade), h, Math.max(1, Math.round(cols * (1 - shade))), Math.max(2, Math.round(h / 11)), 0.12) +
      P(hatchD(x + w * (1 - shade), top, w * shade, h, 2.6) + hatchV(x + w * (1 - shade), top, w * shade, h, 3.2), "thin");
  };
  const tree = (x, base, k = 1) =>
    P(`M${x} ${base}c${-1 * k} ${-14 * k} ${-1 * k} ${-26 * k} ${2 * k} ${-40 * k}M${x + 1 * k} ${base - 22 * k}l${-12 * k} ${-12 * k}M${x + 2 * k} ${base - 30 * k}l${10 * k} ${-10 * k}`) +
    P(crown(x, base - 52 * k, 26 * k, 20 * k)) + P(foliage(x, base - 52 * k, 22 * k, 15 * k), "thin");
  const blossomTree = (x, base, k = 1, flip = 1) => {
    let br = `M${x} ${base}c${2 * k * flip} ${-20 * k} ${-4 * k * flip} ${-34 * k} ${4 * k * flip} ${-52 * k}`;
    br += `M${x + 1 * k * flip} ${base - 30 * k}c${-14 * k * flip} ${-4 * k} ${-26 * k * flip} ${-14 * k} ${-34 * k * flip} ${-30 * k}`;
    br += `M${x + 3 * k * flip} ${base - 42 * k}c${14 * k * flip} ${-6 * k} ${26 * k * flip} ${-18 * k} ${30 * k * flip} ${-34 * k}`;
    br += `M${x + 4 * k * flip} ${base - 52 * k}c${-4 * k * flip} ${-12 * k} ${0} ${-24 * k} ${6 * k * flip} ${-30 * k}`;
    let out = P(br) + P(`M${x - 4 * k} ${base}h${8 * k}`, "thin");
    for (let i = 0; i < 46; i++) {
      const a = rnd() * Math.PI * 2, rr = Math.sqrt(rnd());
      const cx = x + flip * 2 * k + Math.cos(a) * 40 * k * rr, cy = base - 70 * k + Math.sin(a) * 24 * k * rr;
      out += C(cx, cy, (1.4 + rnd() * 2.4) * k, rnd() < 0.55 ? "lime" : "blossom");
    }
    return out;
  };
  const waves = (y, x0, x1, amp, step) => { let d = `M${x0} ${y}`; for (let x = x0; x < x1; x += step) d += ` q${step / 4} ${-amp} ${step / 2} 0 t${step / 2} 0`; return d; };
  const ripples = (y0, y1, x0, x1, gap = 7) => {
    let d = "";
    for (let y = y0; y < y1; y += gap) { let x = x0 + rnd() * 20; while (x < x1) { const len = 8 + rnd() * 26; d += `M${r(x)} ${r(y + rnd() * 2)}h${r(len)}`; x += len + 10 + rnd() * 26; } }
    return d;
  };
  const bird = (x, y, k = 1) => `M${x} ${y}q${4 * k} ${-5 * k} ${8 * k} 0q${4 * k} ${-5 * k} ${8 * k} 0`;
  const cloud = (x, y, k = 1) => `M${x} ${y}h${64 * k}c${8 * k} 0 ${9 * k} ${-12 * k} 0 ${-13 * k}c${2 * k} ${-13 * k} ${-16 * k} ${-17 * k} ${-22 * k} ${-7 * k}c${-6 * k} ${-13 * k} ${-26 * k} ${-11 * k} ${-26 * k} ${4 * k}c${-11 * k} ${-2 * k} ${-18 * k} ${11 * k} ${-16 * k} ${16 * k}`;
  const person = (x, y, k = 1) => P(`M${x} ${y}m-${2 * k} 0a${2 * k} ${2 * k} 0 1 0 ${4 * k} 0a${2 * k} ${2 * k} 0 1 0 -${4 * k} 0M${x} ${y + 2 * k}v${7 * k}l${-2 * k} ${7 * k}M${x} ${y + 9 * k}l${2 * k} ${7 * k}M${x - 3 * k} ${y + 5 * k}h${6 * k}`, "thin");

  /* i · Shenzhen — Civic Center under its great wing roof, Ping An Finance Center behind, Lotus Hill trees */
  function shenzhen() {
    seq = 0; s = 13; const g = 236; let o = "";
    o += C(338, 58, 24) + P("M338 24a34 34 0 1 1 -0.1 0", "limeline");
    o += P(cloud(30, 70, 0.8) + cloud(250, 46, 0.6), "thin") + P(bird(286, 84) + bird(304, 74, 0.8) + bird(272, 96, 0.6), "thin");
    // Ping An Finance Centre
    o += P(`M196 ${g - 60}L203 42L212 30L221 42L228 ${g - 60}M212 30V4M208 14h8`);
    o += P(hatchH(204, 50, 22, g - 112, 6) + `M209 42V${g - 60}M215 42V${g - 60}` + hatchV(218, 46, 8, g - 108, 2), "thin");
    // backdrop towers
    [[150, 70, 24], [176, 96, 18], [236, 78, 22], [260, 104, 20], [118, 112, 22], [286, 92, 26]].forEach(([x, top, w]) => { o += building(x, top, w, g - 60, 3); });
    // Civic Center: block + undulating grid-shell roof + hemisphere + central tower
    const by = g - 60;
    o += P(`M40 ${g}V${by + 18}H380V${g}`);
    o += P(hatchV(46, by + 26, 330, g - by - 30, 7), "thin");
    o += P(`M30 ${by + 18}C80 ${by - 28} 140 ${by - 20} 182 ${by - 4}C214 ${by + 8} 236 ${by + 8} 262 ${by - 6}C300 ${by - 26} 356 ${by - 22} 392 ${by + 18}`);
    let grid = ""; for (let x = 42; x < 384; x += 9) { const t = (x - 30) / 362; const yTop = by + 18 - Math.sin(t * Math.PI) * 32 * (1 - 0.6 * Math.exp(-Math.pow((t - 0.6) * 6, 2))); grid += `M${x} ${r(by + 18)}L${x} ${r(yTop)}`; }
    o += P(grid, "thin") + P(`M36 ${by + 8}C120 ${by - 22} 300 ${by - 22} 386 ${by + 8}`, "thin");
    o += P(`M196 ${by + 18}V${by - 26}h28V${by + 18}`) + P(hatchH(198, by - 22, 24, 40, 4), "thin");
    o += P(`M76 ${by + 18}a24 24 0 0 1 48 0`) + P(`M84 ${by + 18}a16 16 0 0 1 32 0M100 ${by - 6}v24`, "thin");
    // plaza, fountain, people, trees
    o += P(`M0 ${g}H420`) + P(`M150 ${g + 14}h120M120 ${g + 26}h180`, "thin");
    o += P(`M210 ${g + 10}c-8 -10 -8 -18 0 -24c8 6 8 14 0 24M204 ${g + 10}h12`, "limeline");
    o += person(150, g - 18, 0.9) + person(266, g - 16, 0.8) + person(300, g - 17, 0.9);
    o += tree(20, g + 4, 0.75) + tree(404, g + 4, 0.7) + tree(60, g + 6, 0.55);
    return o;
  }

  /* ii · Guangzhou — Canton Tower, the Pearl River, Sun Yat-sen University's memorial archway */
  function guangzhou() {
    seq = 0; s = 29; const g = 214, cx = 300; let o = "";
    o += P(cloud(160, 40, 0.7) + cloud(340, 70, 0.6), "thin") + P(bird(60, 50) + bird(80, 42, 0.8), "thin");
    // Canton Tower
    const top = 30, N = 20;
    const half = (y) => { const t = (y - top) / (g - top); return 9 + 26 * Math.pow(Math.abs(t - 0.62) / 0.62, 1.5) * (t < 0.62 ? 0.55 : 1); };
    const ys = Array.from({ length: N + 1 }, (_, i) => top + ((g - top) * i) / N);
    let L = "", R = ""; ys.forEach((y, i) => { L += `${i ? "L" : "M"}${r(cx - half(y))} ${r(y)}`; R += `${i ? "L" : "M"}${r(cx + half(y))} ${r(y)}`; });
    o += P(L) + P(R);
    let lat = ""; for (let i = 0; i < N - 2; i++) { const a = ys[i], b = ys[i + 3]; lat += `M${r(cx - half(a))} ${r(a)}L${r(cx + half(b) * 0.25)} ${r(b)}M${r(cx + half(a))} ${r(a)}L${r(cx - half(b) * 0.25)} ${r(b)}`; }
    o += P(lat, "thin");
    let rings = ""; for (let i = 1; i < N; i += 2) { const y = ys[i], h = half(y); rings += `M${r(cx - h)} ${r(y)}q${r(h)} 3 ${r(h * 2)} 0`; }
    o += P(rings, "thin") + P(`M${cx - 4} ${top}h8M${cx} ${top}V2`) + C(cx, 4, 2.6);
    // skyline either side
    o += P(`M352 ${g}V70L362 58L372 70V${g}M362 58V40`) + P(hatchD(352, 74, 20, g - 74, 6), "thin");
    o += P(`M380 ${g}V112h30V${g}`) + windows(380, 112, 30, g - 112, 3, 8, 0.2);
    o += P(`M236 ${g}V120h26V${g}`) + windows(236, 120, 26, g - 120, 2, 7, 0.2);
    // SYSU memorial archway (pailou)
    const ax = 30, aw = 150, ay = 128;
    o += P(`M${ax + 10} ${g}V${ay + 18}M${ax + 46} ${g}V${ay + 18}M${ax + 104} ${g}V${ay + 18}M${ax + 140} ${g}V${ay + 18}`);
    o += P(`M${ax + 46} ${ay + 40}h58M${ax + 10} ${ay + 52}h36M${ax + 104} ${ay + 52}h36`);
    o += P(`M${ax} ${ay + 18}h${aw}M${ax + 4} ${ay + 10}h${aw - 8}`);
    o += P(`M${ax - 8} ${ay + 10}Q${ax + 20} ${ay + 4} ${ax + 30} ${ay - 6}H${ax + 120}Q${ax + 130} ${ay + 4} ${ax + aw + 8} ${ay + 10}`);
    o += P(`M${ax + 40} ${ay - 6}V${ay - 16}h70V${ay - 6}M${ax + 32} ${ay - 16}Q${ax + 50} ${ay - 22} ${ax + 56} ${ay - 30}H${ax + 94}Q${ax + 100} ${ay - 22} ${ax + 118} ${ay - 16}`);
    o += P(rect(ax + 52, ay + 20, 46, 14) + `M${ax + 58} ${ay + 27}h6M${ax + 68} ${ay + 27}h6M${ax + 78} ${ay + 27}h6M${ax + 88} ${ay + 27}h4`, "thin");
    o += P(hatchH(ax + 30, ay - 4, 90, 8, 2.5) + hatchH(ax + 58, ay - 28, 34, 10, 2.5), "thin");
    // kapok tree with lime blossoms
    o += P(`M206 ${g}c-2 -20 2 -40 -4 -64M204 ${g - 40}l-16 -16M202 ${g - 52}l14 -14`);
    for (let i = 0; i < 20; i++) o += C(200 + (rnd() - 0.5) * 50, g - 70 + (rnd() - 0.5) * 30, 1.5 + rnd() * 2);
    // river, boat
    o += P(`M0 ${g}H420`) + P(waves(g + 12, 0, 420, 2.4, 30), "limeline") + P(ripples(g + 20, 296, 0, 420), "thin");
    o += P(`M250 ${g + 34}h80l-8 10h-64zM262 ${g + 34}v-10h50v10M270 ${g + 24}v-7h30v7`) + P(`M268 ${g + 30}h4M278 ${g + 30}h4M288 ${g + 30}h4M298 ${g + 30}h4`, "thin");
    o += P(ripples(g + 46, g + 56, 240, 340, 5), "thin");
    return o;
  }

  /* iii · Washington, D.C. — the White House, the Monument, cherry blossoms, and me */
  function dc() {
    seq = 0; s = 47; const g = 222; let o = "";
    o += P(cloud(250, 40, 0.7), "thin") + P(bird(110, 42) + bird(128, 34, 0.7), "thin");
    // Washington Monument behind
    o += P(`M318 ${g - 40}L322 34L326 26L330 34L334 ${g - 40}`) + P(hatchH(320, 40, 12, g - 84, 8), "thin");
    // White House: wings + portico
    const x0 = 90, x1 = 330, base = g - 6, top = 138;
    o += P(`M${x0} ${base}V${top}H${x1}V${base}`) + P(`M${x0 - 4} ${top}h${x1 - x0 + 8}M${x0 - 4} ${top - 6}h${x1 - x0 + 8}`);
    let bal = ""; for (let x = x0; x <= x1; x += 4) bal += `M${x} ${top - 6}v6`;
    o += P(bal, "thin");
    let win = ""; [[x0 + 12, 1], [x0 + 38, 1], [x0 + 64, 1], [x1 - 76, 1], [x1 - 50, 1], [x1 - 24, 1]].forEach(([x]) => { win += rect(x, top + 12, 12, 18) + rect(x, top + 44, 12, 18) + `M${x - 2} ${top + 10}l8 -5l8 5M${x - 2} ${top + 42}h16`; });
    o += P(win, "thin");
    // portico
    const px = 168, pw = 84;
    o += P(`M${px} ${base}V${top - 6}M${px + pw} ${base}V${top - 6}M${px - 6} ${top - 6}L${px + pw / 2} ${top - 30}L${px + pw + 6} ${top - 6}`);
    let cols = ""; for (let i = 0; i < 5; i++) { const x = px + 10 + i * 16; cols += `M${x} ${base}V${top}M${x + 4} ${base}V${top}`; }
    o += P(cols, "thin") + P(`M${px + 30} ${top - 14}a12 6 0 0 1 24 0`, "thin");
    o += P(`M${px + pw / 2} ${top - 30}V${top - 52}`) + P(`M${px + pw / 2} ${top - 52}h14v8h-14`, "limeline");
    o += P(hatchD(x0 + 2, base - 18, 70, 16, 4) + hatchD(x1 - 72, base - 18, 70, 16, 4), "thin");
    // fence + lawn
    let fence = ""; for (let x = 40; x < 390; x += 6) fence += `M${x} ${g + 18}v-12`;
    o += P(`M40 ${g + 6}h350M40 ${g + 18}h350`) + P(fence, "thin");
    o += P(`M0 ${g}H420`) + P(ripples(g + 26, 286, 0, 420, 8), "thin");
    // cherry blossoms framing the scene
    o += blossomTree(38, g + 20, 1.2, 1) + blossomTree(386, g + 20, 1.1, -1);
    // me, with a camera
    const mx = 352, my = g - 4;
    o += P(`M${mx} ${my - 40}a6 6 0 1 0 0.1 0M${mx - 7} ${my - 37}c-3 6 -3 14 -2 18M${mx + 6} ${my - 38}c3 6 3 12 2 16`);
    o += P(`M${mx - 1} ${my - 28}l-8 26h20l-8 -26M${mx - 3} ${my - 2}v14M${mx + 3} ${my - 2}v14M${mx - 4} ${my - 22}l-8 6l4 4M${mx + 2} ${my - 22}l-6 8`);
    o += P(rect(mx - 14, my - 18, 8, 6), "limeline");
    return o;
  }

  /* iv · Shenzhen, again — Shenzhen Bay at Nanshan: Spring Bamboo, the Tencent towers, the Spring Cocoon, the bay bridge */
  function shenzhen2() {
    seq = 0; s = 83; const g = 206; let o = "";
    o += P(cloud(30, 50, 0.7) + cloud(300, 34, 0.6), "thin") + P(bird(220, 40) + bird(238, 32, 0.7) + bird(252, 44, 0.6), "thin");
    // far skyline (Houhai) — thin, layered
    [[8, 128, 18], [28, 110, 16], [282, 118, 18], [304, 96, 14], [394, 124, 18]].forEach(([x, t, w]) => { o += P(rect(x, t, w, g - t) + hatchH(x + 2, t + 3, w - 4, g - t - 4, 5), "thin"); });
    // China Resources HQ — "Spring Bamboo": tapered shaft of ribs, rounded crown
    const cx = 168, base = g, top = 22;
    o += P(`M${cx - 22} ${base}C${cx - 24} 120 ${cx - 20} 60 ${cx - 12} 34Q${cx} ${top - 6} ${cx + 12} 34C${cx + 20} 60 ${cx + 24} 120 ${cx + 22} ${base}`);
    let ribs = ""; for (let i = -5; i <= 5; i++) { const t = i / 5; ribs += `M${r(cx + t * 22)} ${base}C${r(cx + t * 24)} 120 ${r(cx + t * 20)} 60 ${r(cx + t * 11)} ${r(36 - (1 - Math.abs(t)) * 8)}`; }
    o += P(ribs, "thin") + P(hatchH(cx - 20, 50, 40, base - 54, 7), "thin");
    o += P(hatchD(cx + 8, 40, 14, base - 44, 2.4), "thin");
    // Tencent Binhai Mansion — twin towers joined by three sky bridges
    const tx = 210;
    o += building(tx, 54, 30, g, 4) + building(tx + 52, 70, 28, g, 4);
    o += P(`M${tx + 30} 82h22v14h-22zM${tx + 30} 126h22v16h-22zM${tx + 30} 170h22v12h-22z`) + P(hatchH(tx + 31, 84, 20, 10, 2.5) + hatchH(tx + 31, 128, 20, 12, 2.5) + hatchH(tx + 31, 172, 20, 8, 2.5), "thin");
    // supporting Nanshan towers
    o += building(96, 92, 26, g, 3) + building(124, 120, 20, g, 2) + building(320, 84, 26, g, 3) + building(350, 112, 30, g, 3);
    o += P(`M96 92l13 -14l13 14M320 84h26M333 84v-14`);
    // Shenzhen Bay Sports Centre — the "Spring Cocoon" lattice shell
    const sx = 30, sw = 120, sy = g;
    o += P(`M${sx} ${sy}C${sx + 10} ${sy - 46} ${sx + sw - 10} ${sy - 46} ${sx + sw} ${sy}`);
    let lat = ""; for (let i = 1; i < 12; i++) { const x = sx + (sw * i) / 12; lat += `M${r(x)} ${sy}L${r(x + 14)} ${r(sy - 34 + Math.abs(i - 6) * 3)}M${r(x)} ${sy}L${r(x - 14)} ${r(sy - 34 + Math.abs(i - 6) * 3)}`; }
    o += P(lat, "thin") + P(`M${sx + 8} ${sy - 18}C${sx + 40} ${sy - 30} ${sx + 80} ${sy - 30} ${sx + sw - 8} ${sy - 18}`, "thin");
    // waterfront promenade + trees
    o += P(`M0 ${g}H420M0 ${g + 6}H420`) + P(hatchV(0, g, 420, 6, 6), "thin");
    o += tree(392, g + 2, 0.6) + tree(12, g + 2, 0.5);
    // Shenzhen Bay Bridge across the water
    o += P(`M200 ${g + 40}H420M200 ${g + 44}H420`);
    o += P(`M322 ${g + 44}L330 ${g - 6}L338 ${g + 44}M326 ${g + 18}h8`);
    let cab = ""; for (let i = 0; i < 6; i++) cab += `M330 ${g - 2 + i * 5}L${r(240 + i * 14)} ${g + 40}M330 ${g - 2 + i * 5}L${r(420 - i * 14)} ${g + 40}`;
    o += P(cab, "thin");
    // the bay: waves, reflections of the towers
    o += P(waves(g + 18, 0, 420, 2.2, 30), "limeline");
    o += P(ripples(g + 26, 296, 0, 420, 6), "thin");
    let refl = ""; [[cx - 18, 40], [tx + 4, 28], [tx + 56, 24], [100, 22], [324, 22]].forEach(([x, w]) => { for (let y = g + 50; y < 296; y += 5) { const j = (rnd() - 0.5) * 6; refl += `M${r(x + j)} ${y}h${r(w * (0.4 + rnd() * 0.5))}`; } });
    o += P(refl, "thin");
    o += C(cx, top - 2, 2.4) + C(tx + 15, 50, 2) + C(tx + 66, 66, 2);
    return o;
  }

  const art = { shenzhen, guangzhou, dc, shenzhen2 };
  window.JOURNEY_ART = (key) => `<svg viewBox="0 0 420 300" aria-hidden="true">${art[key] ? art[key]() : ""}</svg>`;
})();
