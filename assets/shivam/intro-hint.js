/* first-load hint: spotlight the sun/moon, blur the rest, show a dragging hand briefly */
(function(){
  var veil = document.getElementById('loadVeil'), hand = document.getElementById('loadHand');
  if(!veil || !hand || !window.sunSpot) return;
  var done = false;
  function place(){
    try{
      var p = window.sunSpot(), x = Math.round(p[0]), y = Math.round(p[1]);
      veil.style.setProperty('--sx', x + 'px'); veil.style.setProperty('--sy', y + 'px');
      hand.style.setProperty('--sx', x + 'px'); hand.style.setProperty('--sy', y + 'px');
    }catch(e){}
  }
  function label(){
    var night = document.documentElement.getAttribute('data-sky') === 'night';
    hand.querySelector('.t').textContent = night ? 'Drag the moon' : 'Drag the sun';
  }
  function hide(){ if(done) return; done = true; veil.classList.remove('on'); hand.classList.remove('on'); }
  function show(){ if(done) return; place(); label(); veil.classList.add('on'); hand.classList.add('on'); setTimeout(hide, 7000); }
  window.addEventListener('pointerdown', hide);
  window.addEventListener('keydown', function(e){ if(e.key === 'Escape') hide(); });
  window.addEventListener('resize', function(){ if(!done) place(); });
  new MutationObserver(function(){ if(!done) label(); }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-sky'] });
  // paused for now: it stayed up too long. The egg button's periodic shimmer (easter-eggs.js) points people to the interactions instead.
  // setTimeout(show, 1100);
})();
