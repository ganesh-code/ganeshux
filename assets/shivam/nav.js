/* the nav shows where you are: Work through the work, Contact at the desk, About or Resume while those are open */
let navRoom = null;
const navLinks = { work: document.querySelector('.nav a[href="#work"]'), about: document.querySelector('.nav a[href="#about"]'), contact: document.querySelector('.nav a[href="#contact"]'), resume: document.querySelector('.nav a[href="#resume"]') };
function navSpy() {
  let k = "work";
  const f = document.getElementById("contact");
  if (f && f.getBoundingClientRect().top < innerHeight * .55) k = "contact";
  if (navRoom) k = navRoom;
  // the two mark icons: home while you're on the work, contact at the desk (or in About / Resume)
  document.querySelectorAll(".navbox .mark a").forEach(a => { const on = (a.hash === "#contact") === (k !== "work"); a.classList.toggle("on", on); on ? a.setAttribute("aria-current", "true") : a.removeAttribute("aria-current"); });
  for (const [n, a] of Object.entries(navLinks)) if (a) { a.classList.toggle("on", n === k); n === k ? a.setAttribute("aria-current", "true") : a.removeAttribute("aria-current"); }
}
addEventListener("scroll", navSpy, { passive: true }); addEventListener("resize", navSpy);
navLinks.contact && navLinks.contact.addEventListener("click", () => setTimeout(navSpy, 700));
navSpy();

/* the chevron menu: opens above the dock, closes on a pick, a tap elsewhere, Escape or when the dock hides */
(() => {
  const btn = document.getElementById("navMore"), menu = document.getElementById("navMenu"); if (!btn) return;
  const set = open => { menu.hidden = !open; btn.setAttribute("aria-expanded", String(open)); };
  btn.addEventListener("click", e => { e.stopPropagation(); set(menu.hidden); if (!menu.hidden) menu.querySelector("a").focus(); });
  menu.addEventListener("click", e => { if (e.target.closest("a")) set(false); });
  document.addEventListener("click", e => { if (!menu.hidden && !e.target.closest("#navMenu")) set(false); });
  addEventListener("keydown", e => { if (e.key === "Escape" && !menu.hidden) { set(false); btn.focus(); } });
  new MutationObserver(() => { if (document.documentElement.classList.contains("navhid")) set(false); }).observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  matchMedia("(max-width:640px)").addEventListener("change", e => { if (!e.matches) set(false); });
})();

/* 3nav: the work categories live in the bottom nav; picking one from elsewhere on the page brings you to the work */
(() => {
  const tabs = document.getElementById("tabs"), mark = document.querySelector(".navbox .mark"); if (!tabs || !mark) return;
  const box = document.createElement("div"); box.className = "catsnav glass"; box.appendChild(tabs); mark.after(box);
  // phones: an arrow and a fade on whichever edge hides more tabs
  const more = document.createElement("button"); more.type = "button"; more.className = "cats-more"; more.setAttribute("aria-label", "Show more categories");
  more.innerHTML = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 3l5 5-5 5"/></svg>';
  box.appendChild(more);
  const edge = () => { const over = tabs.scrollWidth > tabs.clientWidth + 4; box.classList.toggle("more", over && tabs.scrollLeft + tabs.clientWidth < tabs.scrollWidth - 4); box.classList.toggle("less", over && tabs.scrollLeft > 4); };
  tabs.addEventListener("scroll", edge, { passive: true }); new ResizeObserver(edge).observe(tabs); edge();
  more.addEventListener("click", () => tabs.scrollBy({ left: tabs.clientWidth * .7, behavior: "smooth" }));
  document.getElementById("when").insertAdjacentHTML("beforeend", '<svg class="rf" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13.5 8a5.5 5.5 0 1 1-1.6-3.9M13.5 2.5v3h-3"/></svg>');
  // one eased glide for every in-page move: 450ms for short hops, up to 900ms for the whole page
  const RMO = matchMedia("(prefers-reduced-motion: reduce)").matches, EASE = "cubic-bezier(.22,.8,.24,1)";
  const ease = k => k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
  let glideId = 0;
  const glide = y => new Promise(res => {
    const y0 = scrollY, d = Math.max(0, y) - y0, id = ++glideId; if (Math.abs(d) < 2 || RMO) { scrollTo({ top: y0 + d, behavior: "instant" }); return res(); }
    const dur = Math.min(900, Math.max(450, Math.sqrt(Math.abs(d)) * 20)), t0 = performance.now();
    (function f(n) { if (id !== glideId) return res(); const k = Math.min(1, (n - t0) / dur); scrollTo({ top: y0 + d * ease(k), behavior: "instant" }); k < 1 ? requestAnimationFrame(f) : res(); })(t0);
  });
  addEventListener("wheel", () => glideId++, { passive: true }); addEventListener("touchstart", () => glideId++, { passive: true });
  // switching tabs: the tab lights at once; the old cards fade out (220ms) while the page glides to the section;
  // then the grid swaps (its height held, so nothing jumps) and the new cards settle in, one after another
  const grid = document.getElementById("grid"), worksEl = document.getElementById("works"), lab = document.getElementById("secLabel");
  const shown = () => [...grid.children].filter(c => !c.classList.contains("gone")).sort((a, c) => a.style.order - c.style.order);
  let swapping = false;
  tabs.addEventListener("click", e => {
    const b = e.target.closest("button"); if (!b || b.dataset.go || RMO) return;
    e.stopPropagation(); if (swapping || b.getAttribute("aria-selected") === "true") return; swapping = true;
    [...tabs.children].forEach(x => x.setAttribute("aria-selected", String(x === b)));
    grid.style.minHeight = grid.offsetHeight + "px";
    const w = worksEl.getBoundingClientRect(), glid = (w.top < 0 || w.top > innerHeight * .6) ? glide(w.top + scrollY - 24) : Promise.resolve();
    lab.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 180, easing: "ease-in", fill: "forwards" });
    shown().forEach(c => c.animate([{ opacity: 1, transform: "none" }, { opacity: 0, transform: "translateY(-8px) scale(.99)" }], { duration: 220, easing: "cubic-bezier(.4,0,1,1)", fill: "forwards" }));
    setTimeout(() => {
      b.dataset.go = 1; b.click(); delete b.dataset.go;
      grid.getAnimations({ subtree: true }).forEach(a => a.cancel());
      lab.textContent = b.firstChild.textContent.trim(); lab.getAnimations().forEach(a => a.cancel());
      lab.animate([{ opacity: 0, transform: "translateY(4px)" }, { opacity: 1, transform: "none" }], { duration: 360, easing: EASE });
      shown().forEach((c, i) => c.animate([{ opacity: 0, transform: "translateY(24px) scale(.985)" }, { opacity: 1, transform: "none" }],
        { duration: 620, delay: Math.min(i, 6) * 70, easing: "cubic-bezier(.16,1,.3,1)", fill: "backwards" }));
      Promise.all([glid, new Promise(r => setTimeout(r, 400))]).then(() => { grid.style.minHeight = ""; swapping = false; });
    }, 220);
  }, true);
  tabs.addEventListener("click", e => { const b = e.target.closest("button"); if (b && RMO) lab.textContent = b.firstChild.textContent.trim(); });
  // in-page links (the SK signature, "Read more") glide instead of jumping
  document.addEventListener("click", e => {
    const a = e.target.closest('a[href^="#"]'); if (!a || e.defaultPrevented) return;
    const id = a.getAttribute("href").slice(1), el = id === "top" ? document.body : document.getElementById(id); if (!el) return;
    e.preventDefault(); glide(id === "top" ? 0 : el.getBoundingClientRect().top + scrollY - 24);
  });
})();
