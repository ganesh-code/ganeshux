/* motion reels play while on screen and pause when they scroll away; reduced motion shows the poster with controls */
(() => {
  const vids = [...document.querySelectorAll("#grid .reelbox video")]; if (!vids.length) return;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) { vids.forEach(v => v.controls = true); return; }
  const io = new IntersectionObserver(es => es.forEach(e => { const v = e.target; if (e.isIntersecting && !v.closest(".gone")) v.play().catch(() => {}); else v.pause(); }), { threshold: .35 });
  vids.forEach(v => io.observe(v));
})();

/* Visual cards open a full-size, keyboard-navigable lightbox. */
(() => {
  const cards = [...document.querySelectorAll('#grid .card[data-cats~="visual"]')].filter(c => c.querySelector('.reelbox img'));
  if (!cards.length) return;
  const box = document.createElement('div');
  box.className = 'visual-lightbox'; box.hidden = true; box.setAttribute('role','dialog'); box.setAttribute('aria-modal','true'); box.setAttribute('aria-label','Visual project preview');
  box.innerHTML = '<button class="vl-close" type="button" aria-label="Close preview"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg></button><button class="vl-prev" type="button" aria-label="Previous image"><svg viewBox="0 0 24 24"><path d="m15 18-6-6 6-6"/></svg></button><img alt=""><button class="vl-next" type="button" aria-label="Next image"><svg viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></svg></button><div class="vl-caption"></div>';
  document.body.appendChild(box);
  const image = box.querySelector('img'), caption = box.querySelector('.vl-caption'), closeBtn = box.querySelector('.vl-close');
  let current = 0, returnFocus = null;
  function show(index) {
    current = (index + cards.length) % cards.length;
    const card = cards[current], source = card.querySelector('.reelbox img');
    image.src = source.currentSrc || source.src; image.alt = source.alt || card.querySelector('h3').textContent;
    caption.textContent = [...card.querySelectorAll('.tags span')].map(tag => tag.textContent.trim()).join(' · ') || card.querySelector('h3').textContent;
  }
  function close() { box.hidden = true; document.body.style.overflow = ''; if (returnFocus?.isConnected) returnFocus.focus(); }
  cards.forEach((card, i) => card.addEventListener('click', e => {
    if (e.target.closest('a,button')) return;
    e.preventDefault(); returnFocus = card; show(i); box.hidden = false; document.body.style.overflow = 'hidden'; closeBtn.focus();
  }));
  closeBtn.addEventListener('click', close);
  box.querySelector('.vl-prev').addEventListener('click', () => show(current - 1));
  box.querySelector('.vl-next').addEventListener('click', () => show(current + 1));
  box.addEventListener('click', e => { if (e.target === box) close(); });
  document.addEventListener('keydown', e => {
    if (box.hidden) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') show(current - 1);
    else if (e.key === 'ArrowRight') show(current + 1);
  });
})();
