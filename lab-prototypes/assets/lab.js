// EY.ai Lab prototype kit: page registry, shell (header / nav / team-decision bar), and small SVG + UI helpers.
// Every page is <body data-page="id"> + <main class="page"><section id="stage" class="stage glass"></section><aside id="side" class="side"></aside></main>.
const Lab = (() => {
  const C = { yellow: "#ffe600", purple: "#8b5cf6", magenta: "#e040fb", blue: "#4aa3ff", cyan: "#19d3da", orange: "#ff9a3d", green: "#3ee0a0", red: "#ff6b6b", grey: "#9a9aa6", ink: "#05030f" };

  // group, id (= file name), title, lede, ask (what the team should decide)
  const G = { A: "Whiteboard · the 13 concepts", B: "Prompts, agents & harnesses", C: "Operating model", D: "AI in the organisation", E: "Engineering safely", F: "Strategy & risk" };
  const PAGES = [
    ["A", "whiteboard", "The whiteboard", "All thirteen concepts on one zoomable board, with the links between them. Tap a node to open its page.", "Is this the right map and the right grouping, or should some concepts merge?"],
    ["A", "01-taxonomy", "AI taxonomy", "AI, Quant AI, Generative AI and Agentic AI are nested and overlapping families. Openness is a separate axis: closed, open-weights, open-source, local.", "Nested sets or a 2×2? And do we name example models on the client version?"],
    ["A", "02-landscape", "Industry & offerings: chip to data", "The AI industry as a stack. Zoom from energy and chips up to applications and data, and see who plays where.", "How many company names do we show, and do we add EY alliances?"],
    ["A", "03-intelligence-ml", "Intelligence & machine learning", "Machine learning is fitting a function to examples. Drag the points and watch a model learn its boundary live.", "Is a live training demo the right depth for a leadership audience?"],
    ["A", "04-vibe-coding", "Vibe-coding", "From autocomplete to vibe-coding to governed engineering: who holds the intent, the code, the review and the proof?", "Do we position vibe-coding as a risk, a stage, or a legitimate prototyping mode?"],
    ["A", "05-harness-terms", "Harness, prompt, loop: the terms", "The engineering vocabulary as an exploded stack: model, prompt, context, tools, loop, harness, agent, platform.", "Which eight terms make the cut for the shared glossary?"],
    ["A", "06-agent-anatomy", "Skills, tools, agents, memory, knowledge", "One request, traced through an agent: what it knows, what it remembers, what it can do, and how it has been taught to do it.", "Request trace or static anatomy as the default view?"],
    ["A", "07-graph-engineering", "Graph engineering", "Turning code and knowledge into a graph the AI can traverse, so answers follow real links instead of text that merely looks similar.", "Code graph or enterprise knowledge graph as the lead example?"],
    ["A", "08-prompts", "Prompts", "A prompt is not one message. It is a stack of roles and material assembled on every call.", "Keep as a separate page or fold into prompt engineering?"],
    ["A", "09-hitl-dial", "Human-in-the-loop: the dial", "Autonomy is a setting, not a property. Turn the dial per decision type: human-only, approval gates, or full automation.", "Dial (this page) or live workflow (next page) for the main deck?"],
    ["A", "10-hitl-workflow", "Human-in-the-loop: live workflow", "A running workflow with intervention points. Place the gates and watch throughput, risk and human load respond.", "Dial (previous page) or live workflow (this page) for the main deck?"],
    ["A", "11-hallucination", "Hallucination & reliability", "A model predicts likely text, not true text. Reliability comes from the layers you put around it.", "Token-probability view or swiss-cheese layers as the headline?"],
    ["A", "12-context-window", "Context window & memory", "Everything the model can use must fit in one window: instructions, tools, memory, documents, history, your input, and its own output.", "How technical should the token numbers be?"],
    ["A", "13-api-mcp", "API & MCP", "APIs connect one system to another. MCP is a common plug so any AI application can use any tool without a custom integration each time.", "Is the N×M versus N+M picture enough, or do we show a real call sequence?"],
    ["B", "14-prompt-engineering", "What makes a good prompt", "Build a prompt piece by piece and watch the quality rise. Then follow the same ideas up the ladder to chains, agents and governed platforms.", "Which example task resonates most with our audience?"],
    ["B", "15-agentic-loop", "The agentic loop: what is a harness?", "Step through an agent doing real work. Switch harness features off and see exactly what breaks.", "Coding task or business task as the worked example?"],
    ["B", "24-multi-agent", "Multi-agent systems", "Six patterns for combining model calls: chaining, routing, parallelisation, orchestrator-workers, evaluator-optimiser, and the autonomous agent.", "Which three patterns do we lead with?"],
    ["C", "16-operating-model-builder", "Operating model builder", "Build a flow yourself, assign each step to a human, an agent or an automated gate, then zoom from value chain down to single steps.", "Which reference processes ship as presets?"],
    ["C", "17-before-after", "Before and after", "Handoffs, manual gates and drifting documents morph into computable artefacts, automated gates, and agents plus humans at the critical decisions.", "Does the morph tell the story of slides 8–9, or do we need numbers on it?"],
    ["C", "18-roles", "Where roles move", "Business owners, architects, risk, engineers and QA: what each one spends time on before and after.", "Are these the right five roles, and are the shifts credible to each group?"],
    ["C", "19-engagement-arc", "The EY engagement arc", "Five ways EY can help, as one journey from first conversation to a running, governed operating model.", "The five steps here are drafted, not taken from the deck. Please confirm the wording."],
    ["D", "20-ai-in-companies", "AI within companies: the leadership view", "Three ways to look at the same question: where AI creates value, how deep it goes, and how you build it.", "Which of the three views is the leadership one-pager?"],
    ["D", "21-prototype-spoke", "The AI prototype", "What an AI prototype is, what it must prove on every spoke, and who in EY to call for each one.", "Single-solution or portfolio-level view as the default? And who owns each spoke?"],
    ["D", "25-maturity", "AI maturity model", "Score the organisation on six dimensions and see the profile, the level, and the next three moves.", "Five levels and six dimensions: are these ours, or do we align to an existing EY model?"],
    ["E", "22-testing", "Testing: the safety net under AI-written code", "At code level, tests are what let you accept code you did not write. See them catch a bad change, and see how evals extend the idea to AI output.", "How much real code do we show?"],
    ["E", "23-sdlc", "SDLC agentic platform: build versus integrate", "The software lifecycle as governed cycles. Choose per stage whether to build, integrate or buy, and see what the platform must provide.", "Does this match the current build-versus-integrate position?"],
    ["F", "26-economics", "Cost & compute economics", "What an AI workload costs, and what moves the number: volume, model tier, context size, caching, agent loops, and where it runs.", "Prices are illustrative inputs. Do we ship real price sheets?"],
    ["F", "27-build-buy-integrate", "Build, buy or integrate", "Position a use case on five questions and see where it lands, and why.", "Are the five questions and their weights right?"],
    ["F", "28-security", "AI security threats", "The attack surface of an AI system. Pick a threat and follow its path, then see which controls stop it.", "Do we align the list to OWASP's LLM Top 10 naming?"],
  ].map(([g, id, title, lede, ask], i) => ({ g, group: G[g], id, file: id + ".html", title, lede, ask, n: i }));

  // ---------- element helpers ----------
  const NS = "http://www.w3.org/2000/svg";
  const apply = (e, a) => {
    for (const k in a) {
      const v = a[k];
      if (v == null) continue;
      if (k === "text") e.textContent = v;
      else if (k === "html") e.innerHTML = v;
      else if (k === "on") for (const ev in v) e.addEventListener(ev, v[ev]);
      else if (k === "class" && !(e instanceof SVGElement)) e.className = v;
      else if (k === "style" && typeof v === "object") Object.assign(e.style, v);
      else e.setAttribute(k, v);
    }
    return e;
  };
  const s = (tag, a = {}, parent) => { const e = apply(document.createElementNS(NS, tag), a); parent && parent.append(e); return e; };
  const h = (tag, a = {}, parent) => { const e = apply(document.createElement(tag), a); parent && parent.append(e); return e; };
  const $ = (id) => document.getElementById(id);
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, k) => a + (b - a) * k;
  const ease = (k) => (k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2);
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const tween = (ms, fn, e = ease) => new Promise((res) => {
    const t0 = performance.now();
    (function step(t) { const k = clamp((t - t0) / ms, 0, 1); fn(e(k)); k < 1 ? requestAnimationFrame(step) : res(); })(t0);
  });
  const hexA = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})`; };

  // ---------- SVG helpers ----------
  let uid = 0;
  function svg(parent, w, hgt, a = {}) {
    const el = s("svg", { viewBox: `0 0 ${w} ${hgt}`, role: "img", ...a }, parent);
    el._defs = s("defs", {}, el);
    const f = s("filter", { id: "glow", x: "-50%", y: "-50%", width: "200%", height: "200%" }, el._defs);
    s("feGaussianBlur", { stdDeviation: 6, result: "b" }, f);
    const m = s("feMerge", {}, f); s("feMergeNode", { in: "b" }, m); s("feMergeNode", { in: "SourceGraphic" }, m);
    el._arrows = {};
    return el;
  }
  const root = (e) => (e.tagName === "svg" ? e : e.ownerSVGElement);
  function arrow(el, color) {
    const r = root(el);
    if (!r._arrows[color]) {
      const id = "ar" + ++uid;
      const mk = s("marker", { id, viewBox: "0 0 10 10", refX: 8.5, refY: 5, markerWidth: 7, markerHeight: 7, orient: "auto-start-reverse" }, r._defs);
      s("path", { d: "M0 0 L10 5 L0 10 z", fill: color }, mk);
      r._arrows[color] = `url(#${id})`;
    }
    return r._arrows[color];
  }
  // wrapped SVG text; max = characters per line
  function text(parent, x, y, str, o = {}) {
    const { size = 14, weight = 500, fill = "#fff", anchor = "middle", max = 0, lh = 1.25, ...rest } = o;
    const t = s("text", { x, y, "font-size": size, "font-weight": weight, fill, "text-anchor": anchor, ...rest }, parent);
    const lines = [];
    for (const para of String(str).split("\n")) {
      if (!max) { lines.push(para); continue; }
      let cur = "";
      for (const w of para.split(" ")) { if ((cur + " " + w).trim().length > max && cur) { lines.push(cur); cur = w; } else cur = (cur + " " + w).trim(); }
      lines.push(cur);
    }
    if (lines.length === 1) t.textContent = lines[0];
    else lines.forEach((l, i) => s("tspan", { x, dy: i ? size * lh : 0, text: l }, t));
    t._lines = lines.length;
    return t;
  }
  // rounded "glass" node centred on x,y
  function node(parent, o) {
    const { x, y, w = 170, h: hh = 64, label = "", sub = "", color = C.yellow, rx = 16, size = 17, subSize = 12, fill = "rgba(20,12,45,.86)", max = 0, on, cls } = o;
    const g = s("g", { style: on ? "cursor:pointer" : null, class: cls }, parent);
    const rect = s("rect", { x: x - w / 2, y: y - hh / 2, width: w, height: hh, rx, fill, stroke: color, "stroke-width": 2 }, g);
    const lt = text(g, x, sub ? y - 2 : y + size * 0.35, label, { size, weight: 700, max });
    if (lt._lines > 1) lt.setAttribute("y", y - ((lt._lines - 1) * size * 1.25) / 2 + size * 0.35 - (sub ? 8 : 0));
    const st = sub ? text(g, x, y + subSize + 8 + (lt._lines > 1 ? ((lt._lines - 1) * size * 1.25) / 2 : 0), sub, { size: subSize, weight: 400, fill: "rgba(255,255,255,.62)" }) : null;
    if (on) g.addEventListener("click", on);
    Object.assign(g, { rect, lt, st, cx: x, cy: y, w, h: hh, color });
    g.active = (v, c = color) => { rect.setAttribute("stroke-width", v ? 4.5 : 2); rect.setAttribute("stroke", c); rect.style.filter = v ? `drop-shadow(0 0 14px ${c})` : "none"; g.style.opacity = v === false ? 0.45 : 1; };
    g.dim = (v) => (g.style.opacity = v ? 0.5 : 1);
    return g;
  }
  // edge between two points; curve bends the line (px, perpendicular)
  function edge(parent, a, b, o = {}) {
    const { color = "rgba(255,255,255,.4)", width = 2, dash, arrow: ar = true, curve = 0, opacity = 1 } = o;
    const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2, dx = b[0] - a[0], dy = b[1] - a[1], len = Math.hypot(dx, dy) || 1;
    const cx = mx - (dy / len) * curve, cy = my + (dx / len) * curve;
    return s("path", { d: `M${a[0]} ${a[1]} Q${cx} ${cy} ${b[0]} ${b[1]}`, fill: "none", stroke: color, "stroke-width": width, "stroke-dasharray": dash, opacity, "marker-end": ar ? arrow(parent, color) : null, "stroke-linecap": "round" }, parent);
  }
  // point on a node's border facing another point (so edges stop at the box)
  function port(n, toward, pad = 4) {
    const dx = toward[0] - n.cx, dy = toward[1] - n.cy;
    if (!dx && !dy) return [n.cx, n.cy];
    const k = Math.min((n.w / 2 + pad) / Math.abs(dx || 1e-6), (n.h / 2 + pad) / Math.abs(dy || 1e-6));
    return [n.cx + dx * k, n.cy + dy * k];
  }
  const link = (parent, n1, n2, o = {}) => edge(parent, port(n1, [n2.cx, n2.cy]), port(n2, [n1.cx, n1.cy]), o);
  // animate a dot along a path
  function token(parent, path, o = {}) {
    const { color = C.yellow, r = 7, ms = 900, reverse = false } = o;
    const len = path.getTotalLength(), dot = s("circle", { r, fill: color, filter: "url(#glow)" }, parent);
    return tween(ms, (k) => { const p = path.getPointAtLength(len * (reverse ? 1 - k : k)); dot.setAttribute("cx", p.x); dot.setAttribute("cy", p.y); }).then(() => dot.remove());
  }
  // pan + zoom a <g> inside an svg (wheel, drag, pinch). Returns {fit, reset, zoom}.
  function panzoom(svgEl, g, o = {}) {
    const { min = 0.5, max = 6 } = o;
    let k = 1, tx = 0, ty = 0;
    const set = () => g.setAttribute("transform", `translate(${tx} ${ty}) scale(${k})`);
    const pt = (e) => { const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(svgEl.getScreenCTM().inverse()); return [p.x, p.y]; };
    const zoomAt = (x, y, f) => { const nk = clamp(k * f, min, max); f = nk / k; tx = x - (x - tx) * f; ty = y - (y - ty) * f; k = nk; set(); o.onZoom && o.onZoom(k); };
    svgEl.addEventListener("wheel", (e) => { e.preventDefault(); const [x, y] = pt(e); zoomAt(x, y, Math.exp(-e.deltaY * 0.0016)); }, { passive: false });
    const ptrs = new Map(); let last = null, moved = 0;
    svgEl.addEventListener("pointerdown", (e) => { ptrs.set(e.pointerId, pt(e)); last = null; moved = 0; });
    svgEl.addEventListener("pointermove", (e) => {
      if (!ptrs.has(e.pointerId)) return;
      const prev = ptrs.get(e.pointerId), cur = pt(e); ptrs.set(e.pointerId, cur);
      if (ptrs.size === 1) { tx += cur[0] - prev[0]; ty += cur[1] - prev[1]; moved += Math.abs(cur[0] - prev[0]) + Math.abs(cur[1] - prev[1]); if (moved > 6) svgEl.setPointerCapture(e.pointerId); set(); }
      else if (ptrs.size === 2) { const [p1, p2] = [...ptrs.values()], d = Math.hypot(p1[0] - p2[0], p1[1] - p2[1]); if (last) zoomAt((p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2, d / last); last = d; }
    });
    const up = (e) => { ptrs.delete(e.pointerId); last = null; };
    svgEl.addEventListener("pointerup", up); svgEl.addEventListener("pointercancel", up);
    // swallow the click that ends a drag, so panning never opens a node
    svgEl.addEventListener("click", (e) => { if (moved > 6) { e.stopPropagation(); e.preventDefault(); moved = 0; } }, true);
    const vb = svgEl.viewBox.baseVal;
    const to = (nk, ntx, nty, ms = 600) => { const [k0, x0, y0] = [k, tx, ty]; return tween(ms, (q) => { k = lerp(k0, nk, q); tx = lerp(x0, ntx, q); ty = lerp(y0, nty, q); set(); }).then(() => o.onZoom && o.onZoom(k)); };
    return {
      fit: (bx, by, bw, bh, pad = 40, ms) => { const nk = clamp(Math.min((vb.width - pad * 2) / bw, (vb.height - pad * 2) / bh), min, max); return to(nk, vb.width / 2 - (bx + bw / 2) * nk, vb.height / 2 - (by + bh / 2) * nk, ms); },
      reset: (ms) => to(1, 0, 0, ms), zoom: (f) => zoomAt(vb.width / 2, vb.height / 2, f), get k() { return k; },
    };
  }
  function zoomButtons(stageEl, pz) {
    const z = h("div", { class: "zoomctl" }, stageEl);
    h("button", { class: "btn sm", text: "+", "aria-label": "Zoom in", on: { click: () => pz.zoom(1.35) } }, z);
    h("button", { class: "btn sm", text: "−", "aria-label": "Zoom out", on: { click: () => pz.zoom(1 / 1.35) } }, z);
    h("button", { class: "btn sm", text: "Reset", on: { click: () => pz.reset() } }, z);
    return z;
  }

  // ---------- UI helpers ----------
  function seg(parent, opts, cur, onChange) {
    const el = h("div", { class: "seg", role: "tablist" }, parent);
    const set = (id, fire = true) => { [...el.children].forEach((b) => b.classList.toggle("on", b.dataset.id === String(id))); el.value = id; fire && onChange && onChange(id); };
    for (const o of opts) { const [id, label] = Array.isArray(o) ? o : [o, o]; h("button", { type: "button", "data-id": id, text: label, on: { click: () => set(id) } }, el); }
    set(cur, false); el.set = set;
    return el;
  }
  function slider(parent, o, onInput) {
    const { label, min = 0, max = 100, step = 1, value = 50, fmt = (v) => v } = o;
    const f = h("label", { class: "field" }, parent), row = h("div", { class: "row" }, f);
    h("span", { text: label }, row); const out = h("b", {}, row);
    const inp = h("input", { type: "range", min, max, step, value }, f);
    const upd = (fire) => { const v = +inp.value; out.textContent = fmt(v); inp.style.setProperty("--p", ((v - min) / (max - min)) * 100 + "%"); fire && onInput && onInput(v); };
    inp.addEventListener("input", () => upd(true)); upd(false);
    f.input = inp; f.set = (v, fire = false) => { inp.value = v; upd(fire); }; Object.defineProperty(f, "value", { get: () => +inp.value });
    return f;
  }
  function toggle(parent, label, checked, onChange) {
    const l = h("label", { class: "tog" }, parent), inp = h("input", { type: "checkbox" }, l);
    inp.checked = !!checked; h("span", { class: "sw" }, l); h("span", { html: label }, l);
    inp.addEventListener("change", () => onChange && onChange(inp.checked));
    l.input = inp; return l;
  }
  const card = (parent, title, html = "", cls = "") => { const c = h("div", { class: "card glass " + cls }, parent); title && h("h3", { text: title }, c); const b = h("div", { html }, c); c.body = b; return c; };
  function readout(parent) {
    const c = h("div", { class: "card glass readout" }, parent), k = h("div", { class: "k" }, c), t = h("div", { class: "t" }, c), b = h("div", { class: "b" }, c);
    c.set = (kk, tt, bb = "") => { k.textContent = kk; t.textContent = tt; b.innerHTML = bb; c.classList.remove("fadein"); void c.offsetWidth; c.classList.add("fadein"); };
    return c;
  }
  function kpis(parent, defs) {
    const wrap = h("div", { class: "kpis" }, parent), out = {};
    for (const [id, label, note] of defs) { const k = h("div", { class: "kpi" }, wrap); h("small", { text: label }, k); const b = h("b", { text: "–" }, k); const sp = h("span", { text: note || "" }, k); out[id] = (v, c, n) => { b.textContent = v; b.style.color = c || "#fff"; if (n != null) sp.textContent = n; }; }
    out.el = wrap; return out;
  }
  const legend = (parent, items) => { const l = h("div", { class: "legend" }, parent); for (const [label, c] of items) h("span", { html: `<i style="--c:${c}"></i>${label}` }, l); return l; };
  const store = { get: (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } }, set: (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} } };

  // ---------- shell ----------
  function ribbons() {
    const bg = h("div", { class: "bg" }); const sv = s("svg", { viewBox: "0 0 1600 1000", preserveAspectRatio: "none" }, bg), d = s("defs", {}, sv);
    const pal = { A: ["#7b2ff7", "#e040fb", "#2a6bff"], B: ["#2a6bff", "#19d3da", "#7b2ff7"], C: ["#ff8a3d", "#7b2ff7", "#19d3da"], D: ["#e040fb", "#ff8a3d", "#2a6bff"], E: ["#19d3da", "#3ee0a0", "#7b2ff7"], F: ["#ff6b6b", "#7b2ff7", "#ff8a3d"] }[document.body.dataset.pal || "A"];
    pal.forEach((c, i) => { const g = s("linearGradient", { id: "rb" + i, x1: 0, y1: 0, x2: 1, y2: 1 }, d); s("stop", { offset: 0, "stop-color": c, "stop-opacity": 0 }, g); s("stop", { offset: 0.5, "stop-color": c }, g); s("stop", { offset: 1, "stop-color": c, "stop-opacity": 0 }, g); });
    s("path", { d: "M-100 900 C 300 500, 800 800, 900 400 S 1400 100, 1700 60", stroke: "url(#rb0)", "stroke-width": 110 }, sv);
    s("path", { d: "M-100 200 C 400 400, 600 60, 1000 300 S 1200 800, 1700 880", stroke: "url(#rb1)", "stroke-width": 80 }, sv);
    s("path", { d: "M500 -100 C 300 300, 1200 400, 800 700 S 1300 1000, 1100 1100", stroke: "url(#rb2)", "stroke-width": 60 }, sv);
    document.body.prepend(bg);
  }
  function shell() {
    const id = document.body.dataset.page, P = PAGES.find((p) => p.id === id);
    if (P) document.body.dataset.pal = P.g;
    ribbons();
    if (!P) return; // hub builds its own header
    document.title = `${P.title} · EY.ai Lab prototypes`;
    const prev = PAGES[P.n - 1], next = PAGES[P.n + 1];
    const top = h("header", { class: "top" });
    h("a", { class: "lab", href: "index.html", html: "Lab<small>prototypes</small>" }, top);
    const ttl = h("div", { class: "ttl" }, top);
    h("div", { class: "eyebrow", text: /^\d\d/.test(P.id) ? `${P.group} · page ${P.id.slice(0, 2)}` : `${P.group} · overview` }, ttl);
    h("h1", { text: P.title }, ttl); h("p", { class: "lede", text: P.lede }, ttl);
    const nav = h("nav", {}, top);
    h("a", { class: "btn sm", href: prev ? prev.file : "index.html", text: prev ? "‹ Prev" : "‹ Hub", title: prev ? prev.title : "Hub" }, nav);
    h("a", { class: "btn sm", href: "index.html", text: "Hub" }, nav);
    h("a", { class: "btn sm", href: next ? next.file : "index.html", text: next ? "Next ›" : "Hub ›", title: next ? next.title : "Hub" }, nav);
    document.body.insertBefore(top, document.querySelector("main"));
    // team decision bar
    const foot = h("footer", { class: "foot" }), d = h("div", { class: "decide glass" }, foot), saved = store.get("lab.vote." + id, {});
    h("div", { class: "q", html: `<small>For the team to decide</small>${P.ask}` }, d);
    const vote = h("div", { class: "vote" }, d);
    const mark = () => [...vote.children].forEach((b) => b.classList.toggle("on", b.dataset.v === saved.v));
    for (const [v, label] of [["keep", "Keep"], ["tweak", "Tweak"], ["drop", "Drop"]]) h("button", { class: "btn sm", "data-v": v, text: label, on: { click: () => { saved.v = saved.v === v ? null : v; store.set("lab.vote." + id, saved); mark(); } } }, vote);
    mark();
    const ta = h("textarea", { placeholder: "Notes for fine-tuning this visual…", "aria-label": "Notes" }, d); ta.value = saved.note || "";
    ta.addEventListener("input", () => { saved.note = ta.value; store.set("lab.vote." + id, saved); });
    document.body.append(foot);
    addEventListener("keydown", (e) => { if (/INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return; if (e.key === "ArrowRight" && e.altKey && next) location.href = next.file; if (e.key === "ArrowLeft" && e.altKey && prev) location.href = prev.file; });
  }
  // report script errors to a parent selftest frame
  addEventListener("error", (e) => parent !== window && parent.postMessage({ labError: String(e.message), page: document.body && document.body.dataset.page }, "*"));
  addEventListener("unhandledrejection", (e) => parent !== window && parent.postMessage({ labError: String(e.reason), page: document.body && document.body.dataset.page }, "*"));
  document.addEventListener("DOMContentLoaded", shell);

  return { C, G, PAGES, s, h, $, clamp, lerp, ease, wait, tween, hexA, svg, arrow, text, node, edge, port, link, token, panzoom, zoomButtons, seg, slider, toggle, card, readout, kpis, legend, store };
})();
