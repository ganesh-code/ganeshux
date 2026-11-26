/* ================= Footer: the desk, the flip book, the CV ================= */
// fill these in: empty values show "coming soon" instead of opening a link
const CONTACT = { email: "ganeshmuniganti@gmail.com", phone: "+91 93902 46685", whatsapp: "https://wa.me/919390246685", linkedin: "https://www.linkedin.com/in/ganesh-muniganti-4454b0267/", x: "ganesh_ux", behance: "https://www.linkedin.com/in/ganesh-muniganti-4454b0267/", config: "https://www.linkedin.com/in/ganesh-muniganti-4454b0267/", post: "https://www.linkedin.com/in/ganesh-muniganti-4454b0267/" }; // config: the Config post (windmill card); post: the post the desk polaroid opens
(() => {
  const toastEl = document.getElementById("ftoast"); let tt;
  const toast = m => { toastEl.textContent = m; toastEl.classList.add("on"); clearTimeout(tt); tt = setTimeout(() => toastEl.classList.remove("on"), 2200); };
  document.querySelectorAll("[data-show]").forEach(el => { const v = CONTACT[el.dataset.show]; if (v) el.textContent = el.dataset.show === "x" ? "@" + v.replace(/^@/, "") : v; });
  document.querySelectorAll("[data-contact]").forEach(el => el.addEventListener("click", () => {
    const k = el.dataset.contact, v = CONTACT[k];
    if (el.tagName === "A") return; // real links (LinkedIn, X, WhatsApp, Behance) open on their own
    if (!v) { toast("Coming soon"); return; }
    if (k === "email") { openMail(); return; }
    if (k === "phone") { open(CONTACT.whatsapp, "_blank", "noopener"); return; }   // the number card opens a WhatsApp chat
    const url = k === "x" ? "https://x.com/" + v.replace(/^@/, "") : v;
    open(url, "_blank", "noopener");
  }));

  // the polaroid: the windmill featured at Config
  const pc = document.getElementById("polaC");
  const drawPola = () => {
    const c = pc.getContext("2d"), g = c.createLinearGradient(0, 0, 0, 380);
    g.addColorStop(0, "#7fb2e3"); g.addColorStop(.55, "#cfe3f2"); g.addColorStop(.56, "#5c8fbf"); g.addColorStop(1, "#3f6f9c");
    c.fillStyle = g; c.fillRect(0, 0, 300, 380);
    if (polaImg.naturalWidth) c.drawImage(polaImg, 55, 0, 490, 620, 0, 0, 300, 380); // the windmill from the Config animation, without its white caption band
  };
  const polaImg = new Image(); polaImg.onload = drawPola; polaImg.src = "motion/windmill.jpg"; drawPola();

  // rooms: open, close, blur behind
  let lastFocus = null;
  const openRoom = r => { navRoom = r.id === "cvRoom" ? "resume" : r.id === "bookRoom" ? "about" : null; navSpy(); lastFocus = document.activeElement; r.hidden = false; requestAnimationFrame(() => r.classList.add("on")); document.documentElement.style.overflow = "hidden"; r.querySelector(".x").focus(); };
  const closeRoom = r => { r.querySelectorAll("video").forEach(v => v.pause()); navRoom = null; navSpy(); r.classList.remove("on"); document.documentElement.style.overflow = ""; setTimeout(() => { r.hidden = true; }, 350); lastFocus && lastFocus.focus(); };
  document.querySelectorAll(".room").forEach(r => {
    r.addEventListener("click", e => { if (e.target.closest("[data-close]") || !e.target.closest(".leaf, .ctl, .cvsheet, .cfgcard, .letter")) closeRoom(r); });
  });
  addEventListener("keydown", e => {
    const r = document.querySelector(".room.on"); if (!r) return;
    if (e.key === "Escape") closeRoom(r);
    if (r.id === "bookRoom" && e.key === "ArrowRight") turn(1);
    if (r.id === "bookRoom" && e.key === "ArrowLeft") turn(-1);
  });

  // the thesis: every face is a page; leaves hold two faces (front on the right, back on the left once turned)
  const crest = `<svg class="crest" viewBox="0 0 80 96" aria-hidden="true"><path d="M8 6h64v40c0 24-18 38-32 46C26 84 8 70 8 46z" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M14 12h52v34c0 20-15 32-26 39C29 78 14 66 14 46z" fill="none" stroke="currentColor" stroke-width=".9"/><g fill="none" stroke="currentColor" stroke-width="1.5"><ellipse cx="40" cy="44" rx="20" ry="7.5"/><ellipse cx="40" cy="44" rx="20" ry="7.5" transform="rotate(60 40 44)"/><ellipse cx="40" cy="44" rx="20" ry="7.5" transform="rotate(-60 40 44)"/></g><circle cx="40" cy="44" r="3" fill="currentColor"/></svg>`;
  const hd = (l, r) => `<div class="run"><span>${l}</span><span>${r}</span></div>`;
  const sc = h => `<div class="scr" aria-hidden="true">${h}</div>`;
  const ch = (n, t) => `<div class="chap"><span>Chapter ${n}</span><b>${n}</b></div><h5>${t}</h5><div class="crule"></div>`;
  // two Feynman diagrams: e⁻e⁻ scattering by photon exchange, and e⁺e⁻ → γ* → μ⁺μ⁻
  const FEYN = `<figure class="feyn" aria-label="Two Feynman diagrams"><svg viewBox="0 0 600 135" aria-hidden="true"><g><path class="ln" d="M20 30H180M20 100H180"/><path class="ph" d="M100 30q-8 5 0 10t0 10t0 10t0 10t0 10t0 10t0 10"/><circle cx="100" cy="30" r="3"/><circle cx="100" cy="100" r="3"/><text x="8" y="24">e⁻</text><text x="172" y="24">e⁻</text><text x="8" y="94">e⁻</text><text x="172" y="94">e⁻</text><text x="112" y="68">γ</text></g><g transform="translate(310 0)"><path class="ln" d="M20 20L100 60M20 100L100 60M180 60L270 25M180 60L270 95"/><path class="ph" d="M100 60q5 -8 10 0t10 0t10 0t10 0t10 0t10 0t10 0"/><circle cx="100" cy="60" r="3"/><circle cx="180" cy="60" r="3"/><text x="6" y="16">e⁻</text><text x="6" y="112">e⁺</text><text x="254" y="16">μ⁻</text><text x="254" y="114">μ⁺</text><text x="130" y="52">γ*</text></g><text x="100" y="130" text-anchor="middle">e⁻e⁻ → e⁻e⁻</text><text x="460" y="130" text-anchor="middle">e⁺e⁻ → μ⁺μ⁻</text></svg></figure>`;
  // margin sketches, one per page, drawn from what the page says
  const fig = (w, vb, body, css = "") => `<figure class="sketch" style="width:${w}%;${css}" aria-hidden="true"><svg viewBox="${vb}">${body}</svg></figure>`;
  const SK = {
    // ch 1: a cherry blossom on a branch, labelled like a Photoshop layer
    sakura: fig(62, "0 0 300 130", `<path d="M10 112C80 98 140 102 290 64M150 100C160 84 170 74 186 64"/><g transform="translate(205 58)"><path d="M0 0C-10 -8 -9 -24 -3 -28L0 -24L3 -28C9 -24 10 -8 0 0Z" transform="rotate(0)"/><path d="M0 0C-10 -8 -9 -24 -3 -28L0 -24L3 -28C9 -24 10 -8 0 0Z" transform="rotate(72)"/><path d="M0 0C-10 -8 -9 -24 -3 -28L0 -24L3 -28C9 -24 10 -8 0 0Z" transform="rotate(144)"/><path d="M0 0C-10 -8 -9 -24 -3 -28L0 -24L3 -28C9 -24 10 -8 0 0Z" transform="rotate(216)"/><path d="M0 0C-10 -8 -9 -24 -3 -28L0 -24L3 -28C9 -24 10 -8 0 0Z" transform="rotate(288)"/><circle r="3"/></g><g transform="translate(84 104) scale(.55)"><path d="M0 0C-10 -8 -9 -24 -3 -28L0 -24L3 -28C9 -24 10 -8 0 0Z" transform="rotate(0)"/><path d="M0 0C-10 -8 -9 -24 -3 -28L0 -24L3 -28C9 -24 10 -8 0 0Z" transform="rotate(72)"/><path d="M0 0C-10 -8 -9 -24 -3 -28L0 -24L3 -28C9 -24 10 -8 0 0Z" transform="rotate(144)"/><path d="M0 0C-10 -8 -9 -24 -3 -28L0 -24L3 -28C9 -24 10 -8 0 0Z" transform="rotate(216)"/><path d="M0 0C-10 -8 -9 -24 -3 -28L0 -24L3 -28C9 -24 10 -8 0 0Z" transform="rotate(288)"/><circle r="3"/></g><text x="214" y="122">sakura, layer 1</text>`),
    // ch 2: three things that met in product design
    venn: fig(66, "0 0 300 186", `<g><circle class="o" cx="115" cy="66" r="50"/><circle class="o" cx="185" cy="66" r="50"/><circle class="o" cx="150" cy="118" r="50"/><text x="70" y="18" text-anchor="middle">graphic design</text><text x="236" y="18" text-anchor="middle">storytelling</text><text x="150" y="184" text-anchor="middle">psychology</text><text x="150" y="96" text-anchor="middle">product</text></g>`, "--mh:calc(var(--pw) * .3);--fs:24px"),
    // ch 3: the learning curve, from physics books to Config
    curve: fig(72, "0 0 300 132", `<path class="ax" d="M14 122H292M14 122V8"/><path d="M20 112Q80 108 120 88T200 55T275 18"/><circle cx="75" cy="104" r="2.6"/><circle cx="120" cy="88" r="2.6"/><circle cx="200" cy="55" r="2.6"/><circle cx="275" cy="18" r="2.6"/><text x="86" y="120">books</text><text x="114" y="80" text-anchor="end">professors</text><text x="194" y="47" text-anchor="end">design mentors</text><text x="268" y="14" text-anchor="end">Config</text><text x="290" y="131" text-anchor="end">time</text>`),
    // closing: you and me, exchanging a hello
    hello: fig(60, "0 0 300 110", `<path d="M40 25H270M40 85H270"/><path class="ph" d="M150 25q-8 5 0 10t0 10t0 10t0 10t0 10t0 10"/><circle cx="150" cy="25" r="2.6"/><circle cx="150" cy="85" r="2.6"/><text x="6" y="30">me</text><text x="6" y="90">you</text><text x="164" y="60">hello</text>`)
  };
  const FACES = [
    { c: "cover", h: `<div class="frame">${crest}<div class="ct">A Designer<br>Who Studied Physics</div><div class="cs">Anime, cherry blossoms, and Indian mythology</div><div class="cr"></div><div class="ca">GANESH</div><div class="cd">Product designer · MMXXVI</div></div>` },
    { c: "endp", h: `<div class="plate"><small>EX LIBRIS</small><b>Ganesh</b><small>Product designer</small></div>` },
    { c: "titlep", h: `${crest}<div class="tt">A Designer<br>Who Studied Physics</div><div class="ts">Anime, cherry blossoms, and Indian mythology</div><div class="tb">by</div><div class="ta">Ganesh</div><div class="tm">A product designer who studied physics, loves stories, and keeps finding things out.</div><div class="tu">Bengaluru<br>2026</div>` },
    { h: `${hd("Chapter 1", "Where it started")}${ch(1, "Where it started")}<p class="drop">I loved anime, and that is where the cherry blossoms came in. Growing up, I wanted my own images to look like them, so I picked up Photoshop and tried turning them into cherry blossom pictures. It took a lot of skill and time.</p><p>Then I went to engineering college, where everything around me was tech. I got pulled in by that too.</p>${sc("E = mc² &nbsp;·&nbsp; E² = (pc)² + (mc²)²")}${SK.sakura}` },
    { h: `${hd("Chapter 2", "Finding design")}${ch(2, "Finding design")}<p>Graphic design, storytelling, and later psychology in product design. None of it felt like a switch. It all happened naturally.</p><p>And that took me to product design, a space I love being in.</p>${sc("iℏ ∂ψ/∂t = Ĥψ")}${SK.venn}` },
    { h: `${hd("Chapter 3", "Learning from the best")}${ch(3, "Learning from the best")}<p>From learning from great books and professors in physics, to learning from big names in the design industry, I was fortunate on this front. I also got featured at Figma Config.</p>${sc("<s>G = 8πT</s> &nbsp; G<sub>μν</sub> + Λg<sub>μν</sub> = (8πG/c⁴) T<sub>μν</sub>")}${SK.curve}` },
    { h: `${hd("Chapter 4", "Off the clock")}${ch(4, "Off the clock")}<p>I like making something for myself: art, stories, or anything in between. I always love reading and learning about new things.</p><p>As Richard Feynman said, finding things out is the kick I get.</p>${sc("Δx · Δp ≥ ℏ/2")}${FEYN}` },
    { h: `${hd("Closing", "")}${ch(5, "Say hello")}<p>If you want to make something together, or just talk about what you are finding out, pick a card on the desk. The envelope is for email, the stamp for LinkedIn, the ticket for X.</p><p>I am most regular on LinkedIn, so my DMs are always open.</p>${sc("(iγ<sup>μ</sup>∂<sub>μ</sub> − m)ψ = 0")}${SK.hello}<div class="colo">Bengaluru, 2026.</div>` },
    { c: "endp", h: `` },
    { c: "cover back", h: `<div class="frame"><div class="cd" style="margin-top:auto">Ganesh Muniganti · Product designer</div></div>` }
  ];
  const book = document.getElementById("book"), nL = FACES.length / 2;
  const face = (f, side) => `<div class="face ${side}${f.c ? " " + f.c : ""}">${f.h}</div>`;
  // the page block: a few sheets stacked under each side, more on the side that holds more pages
  const stk = side => { const s = document.createElement("div"); s.className = "stk " + side; for (let i = 0; i < 6; i++) s.appendChild(document.createElement("i")); book.appendChild(s); return s; };
  const stL = stk("l"), stR = stk("r");
  for (let i = 0; i < nL; i++) {
    const lf = document.createElement("div"); lf.className = "leaf"; lf.style.zIndex = nL - i;
    lf.innerHTML = face(FACES[i * 2], "a") + face(FACES[i * 2 + 1], "b");
    lf.addEventListener("click", () => turn(lf.classList.contains("flip") ? -1 : 1));
    book.appendChild(lf);
  }
  const leaves = [...book.querySelectorAll(".leaf")]; let at = 0;
  const ONE = matchMedia("(max-width:700px)").matches, one = () => ONE, N = () => ONE ? leaves.length : nL;
  const stacks = () => {
    const k = one() ? 0 : 1, l = Math.round(6 * at / nL), r = 6 - l;
    [...stL.children].forEach((e, i) => e.style.opacity = k && i < l && at > 0 ? 1 : 0);
    [...stR.children].forEach((e, i) => e.style.opacity = i < (one() ? 6 - Math.round(6 * at / N()) : r) && at < N() ? 1 : 0);
  };
  const label = () => {
    const n = document.getElementById("bkNo");
    if (one()) n.textContent = at === 0 ? "cover" : `page ${at} of ${N() - 1}`;
    else n.textContent = at === 0 ? "cover" : at === nL ? "back" : `pages ${at * 2 - 1}–${at * 2}`;
    document.getElementById("bkPrev").disabled = at === 0; document.getElementById("bkNext").disabled = at >= N() - (one() ? 1 : 0);
    stacks();
  };
  function turn(d) {
    const to = Math.max(0, Math.min(N() - (one() ? 1 : 0), at + d)); if (to === at) return;
    if (d > 0) { const lf = leaves[at]; lf.classList.add("flip"); lf.style.zIndex = 100 + at; }
    else { const lf = leaves[to]; lf.classList.remove("flip"); setTimeout(() => { lf.style.zIndex = N() - to; }, 450); }
    at = to; book.classList.toggle("closed", at === 0); book.classList.toggle("ended", !one() && at === nL); label();
  }
  // phones: one face per page, so the backs ride along as extra fronts
  if (one()) {
    leaves.forEach(l => l.remove()); leaves.length = 0;
    FACES.slice(0, -1).forEach((f, i) => { const lf = document.createElement("div"); lf.className = "leaf"; lf.style.zIndex = 50 - i; lf.innerHTML = face(f, "a"); lf.addEventListener("click", () => turn(1)); book.appendChild(lf); leaves.push(lf); });
  }
  // every opening starts from the front cover
  const resetBook = () => {
    leaves.forEach((lf, i) => { lf.style.transition = "none"; lf.classList.remove("flip"); lf.style.zIndex = N() - i; });
    book.style.transition = "none"; at = 0; book.classList.add("closed"); book.classList.remove("ended"); label();
    void book.offsetWidth; leaves.forEach(lf => lf.style.transition = ""); book.style.transition = "";
  };
  document.getElementById("bkPrev").addEventListener("click", () => turn(-1));
  document.getElementById("bkNext").addEventListener("click", () => turn(1));
  label();
  let opening; const openBook = () => { resetBook(); openRoom(document.getElementById("bookRoom"));
    // then the cover swings open to the title page, like picking up a real book
    clearTimeout(opening); opening = setTimeout(() => { turn(1); if (ONE) opening = setTimeout(() => turn(1), 950); }, 600); };
  const openCV = () => openRoom(document.getElementById("cvRoom"));
  // the letter: write a note, then it opens in the visitor's mail app, addressed and ready to send
  const mailRoom = document.getElementById("mailRoom"), ltMsg = document.getElementById("ltMsg"), ltName = document.getElementById("ltName");
  document.getElementById("ltTo").textContent = CONTACT.email;
  function openMail() { openRoom(mailRoom); setTimeout(() => ltMsg.focus(), 360); }
  document.getElementById("ltCopy").addEventListener("click", () => navigator.clipboard?.writeText(CONTACT.email).then(() => toast("Email copied"), () => toast(CONTACT.email)));
  document.getElementById("letter").addEventListener("submit", e => {
    e.preventDefault();
    const msg = ltMsg.value.trim(), name = ltName.value.trim(); if (!msg) { ltMsg.focus(); return; }
    const subject = "Hello from " + (name || "your portfolio"), body = "Dear Ganesh,\n\n" + msg + (name ? "\n\nYours,\n" + name : "");
    location.href = "mailto:" + CONTACT.email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    toast("Opening your mail app"); closeRoom(mailRoom);
  });
  // the Config card: the windmill opens it with the Config post, the desk polaroid with the footer post
  let cfgUrl = CONTACT.config;
  const cfgVid = document.getElementById("cfgVid"), cfgArt = document.getElementById("cfgArt"), STILL = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (STILL) cfgVid.controls = true;
  const openCfg = (url = CONTACT.config) => { cfgUrl = url; document.getElementById("cfgGo").href = url; openRoom(document.getElementById("cfgRoom")); if (!STILL) { cfgVid.currentTime = 0; cfgVid.play().catch(() => {}); } };
  // tap either polaroid to swap them, with a fluid move: each one glides, scales and turns from its old place to its new one (FLIP)
  cfgArt.addEventListener("click", e => {
    if (!e.target.closest(".ph")) return;
    const cards = [...cfgArt.children], box = c => ({ x: c.offsetLeft + c.offsetWidth / 2, y: c.offsetTop + c.offsetHeight / 2, w: c.offsetWidth }), rot = c => c.classList.contains("front") ? -3 : 6;
    const first = cards.map(c => ({ ...box(c), r: rot(c) }));
    if (!STILL) cards.forEach(c => c.style.transition = "none"); // a CSS transition would override the move below
    cards.forEach(c => { c.classList.toggle("front"); c.classList.toggle("back"); });
    if (STILL) return;
    cards.forEach((c, i) => {
      const f = first[i], l = box(c), dx = f.x - l.x, dy = f.y - l.y, s = f.w / l.w, up = c.classList.contains("front");
      c.animate([
        { transform: `translate(${dx}px, ${dy}px) scale(${s}) rotate(${f.r}deg)` },
        { transform: `translate(${dx * .4}px, ${dy * .4 - (up ? 18 : -6)}px) scale(${s + (1 - s) * .6 + (up ? .03 : 0)}) rotate(${(f.r + rot(c)) / 2 + (up ? -2 : 2)}deg)`, offset: .55 },
        { transform: `rotate(${rot(c)}deg)` }
      ], { duration: 720, easing: "cubic-bezier(.22,.8,.24,1)" }).onfinish = () => { c.style.transition = ""; };
    });
  });
  window.openConfig = openCfg;
  document.getElementById("openCfg").addEventListener("click", () => openCfg(CONTACT.post));
  document.getElementById("openAbout").addEventListener("click", openBook);
  document.getElementById("cvDl").addEventListener("click", e => { e.preventDefault(); toast("PDF coming soon"); });
  // the nav's About and Resume open the same papers
  // go to the desk first, so people see where the thesis and the CV live, then open them
  const toDesk = (open, el) => { const d = document.getElementById(el), r = d.getBoundingClientRect();
    const far = Math.abs(r.top + r.height / 2 - innerHeight / 2) > 40;
    d.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "center" });
    setTimeout(() => { d.classList.add("pick"); setTimeout(() => { d.classList.remove("pick"); open(); }, 260); }, far ? 750 : 0); };
  document.querySelectorAll('.nav a[href="#about"]').forEach(a => a.addEventListener("click", e => { e.preventDefault(); toDesk(openBook, "openAbout"); }));
  document.querySelectorAll('.nav a[href="#resume"]').forEach(a => a.addEventListener("click", e => { e.preventDefault(); toDesk(openCV, "openCV"); }));
})();
