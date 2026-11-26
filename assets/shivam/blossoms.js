/* Cherry blossom shower when the portrait is clicked */
(function(){
  var portrait = document.getElementById('portrait');
  if(!portrait) return;
  function shower(){
    window.found && found("blossom");
    for(var i = 0; i < 30; i++){
      var p = document.createElement('i');
      p.className = 'petal';
      var s = 8 + Math.random() * 11;
      p.style.width = s + 'px';
      p.style.height = (s * 0.82) + 'px';
      p.style.left = (Math.random() * 100) + 'vw';
      p.style.setProperty('--dx', (Math.random() * 180 - 90) + 'px');
      p.style.animationDuration = (2.6 + Math.random() * 2.4) + 's';
      p.style.animationDelay = (Math.random() * 0.7) + 's';
      p.style.opacity = (0.7 + Math.random() * 0.3).toFixed(2);
      document.body.appendChild(p);
      (function(el){ setTimeout(function(){ el.remove(); }, 6200); })(p);
    }
  }
  portrait.addEventListener('click', shower);
  portrait.addEventListener('pointerenter', function(e){ if(e.pointerType !== 'mouse' || !window.showHint) return; var r = portrait.getBoundingClientRect(); showHint('click for cherry blossoms', r.right - 6, r.top + 8, false); });
  portrait.addEventListener('pointerleave', function(){ window.hideHint && hideHint(); });
  portrait.addEventListener('pointerdown', function(){ window.hideHint && hideHint(); });
  portrait.addEventListener('keydown', function(e){
    if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); shower(); }
  });
})();
