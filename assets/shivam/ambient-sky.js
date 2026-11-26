/**
 * ambient-sky.js
 * Transparent full-viewport WebGL cloud + night-star overlay using the exact
 * same fbm cumulus / fleck shaders and starfield as assets/shivam/scene.js,
 * synced live to the scene's time-of-day, weather, and pointer parallax.
 */
(() => {
  "use strict";
  if (typeof window === "undefined") return;

  const root = document.documentElement;
  const RM = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const canvas = document.createElement("canvas");
  canvas.id = "gx-ambient-sky";
  canvas.setAttribute("aria-hidden", "true");

  function mount() {
    if (!document.body) return;
    if (!document.getElementById("gx-ambient-sky")) {
      document.body.insertBefore(canvas, document.body.firstChild);
    }
  }
  if (document.body) mount();
  else document.addEventListener("DOMContentLoaded", mount, { once: true });

  const gl = canvas.getContext("webgl", { alpha: true, antialias: false, depth: false, premultipliedAlpha: false });
  if (!gl) return;

  const VS = "attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}";
  const FS = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec2 uRes;
uniform float uT, uNight, uGold, uCloud, uOver, uWarm, uCold;
uniform vec3 uSun;
uniform vec4 uMoon;
uniform vec2 uPar;

float h21(vec2 p){p=fract(p*vec2(233.34,851.73));p+=dot(p,p+23.45);return fract(p.x*p.y);}
float vn(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
 return mix(mix(h21(i),h21(i+vec2(1.,0.)),f.x),mix(h21(i+vec2(0.,1.)),h21(i+vec2(1.,1.)),f.x),f.y);}
const mat2 R=mat2(1.6,1.2,-1.2,1.6);
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*vn(p);p=R*p+vec2(3.1,1.7);a*=.5;}return v;}
float fb3(vec2 p){float v=0.,a=.5;for(int i=0;i<3;i++){v+=a*vn(p);p=R*p+vec2(3.1,1.7);a*=.5;}return v;}

float cTop(float x,float base,float amp,float fq,float sd,float bias){
 float cov=smoothstep(.46,.68,vn(vec2(x*fq*.62+sd*7.3,sd))+bias);
 if(cov<=0.)return base;
 float b=fb3(vec2(x*fq,sd*3.1));
 float puff=vn(vec2(x*fq*4.,sd))*.6+vn(vec2(x*fq*9.,sd+2.))*.4;
 return base+amp*cov*(.12+b*b*1.5+puff*.4);
}

vec3 cumulus(vec2 p,float hy,float base,float amp,float fq,float sd,float drift,float bias,vec2 sp){
 float x=p.x+drift;
 float t0=cTop(x,base,amp,fq,sd,bias);
 if(t0<=base+.003)return vec3(0.);
 float ero=fbm(vec2(x*fq*3.4,hy*fq*5.5)+sd)-.5;
 float top=t0+ero*amp*.3;
 float bot=base+(fb3(vec2(x*fq*1.8,sd*5.))-.5)*amp*.14;
 float dens=smoothstep(0.,.005+amp*.035,top-hy)*smoothstep(-.003,.014,hy-bot);
 if(dens<=0.)return vec3(0.);
 float e=.03/fq;
 float slope=(cTop(x+e,base,amp,fq,sd,bias)-cTop(x-e,base,amp,fq,sd,bias))/(2.*e);
 float side=clamp(-slope*clamp((sp.x-p.x)*3.,-1.,1.)*.35,-.5,.6);
 float v=clamp((hy-bot)/(top-bot+1e-4),0.,1.);
 float tex=fbm(vec2(x*fq*6.,hy*fq*8.)+sd*2.);
 float light=.2+.8*pow(v,.75)+.3*side+.5*(tex-.5);
 float edge=1.-smoothstep(0.,.025,top-hy);
 return vec3(light,edge,dens);
}

vec3 cloudCol(vec3 c,vec2 p,vec2 sp,vec2 mp,vec3 sunC){
 vec3 lit=mix(vec3(.78,.90,1.),vec3(1.,.82,.65),uGold);
 vec3 sh=mix(vec3(.50,.73,.96),vec3(.75,.56,.68),uGold);
 lit=mix(lit,vec3(.32,.38,.52),uNight);sh=mix(sh,vec3(.14,.18,.28),uNight);
 lit=mix(lit,mix(vec3(.68,.75,.84),vec3(.22,.25,.32),uNight),uOver*.65);
 sh=mix(sh,mix(vec3(.45,.52,.62),vec3(.10,.12,.18),uNight),uOver*.8);
 vec3 col=mix(sh,lit,clamp(c.x,0.,1.))+max(c.x-1.,0.)*.18;
 col+=c.y*exp(-length(p-sp)*5.)*0.45*uSun.z*sunC;
 col+=c.y*exp(-length(p-mp)*6.)*0.45*uMoon.z*vec3(.8,.86,1.);
 return clamp(col,0.,1.);
}

void main(){
 vec2 uv=gl_FragCoord.xy/uRes;
 float a=uRes.x/uRes.y;
 vec2 p=vec2(uv.x*a,uv.y);
 vec2 sp=vec2(uSun.x*a,uSun.y),mp=vec2(uMoon.x*a,uMoon.y);
 float hy=uv.y;
 vec3 sunC=mix(vec3(1.,.96,.84),vec3(1.,.6,.3),uGold);
 sunC=mix(sunC,vec3(1.,.8,.55),uWarm*.4);

 vec3 outCol=vec3(0.);
 float outAlpha=0.;

 // Twinkling night stars when night > 0
 if(uNight>.01){
  vec2 g=p*68.;vec2 id=floor(g);float r=h21(id);
  if(r>.962){
   vec2 f=fract(g)-.5-(vec2(h21(id+3.1),h21(id+7.7))-.5)*.6;
   float s=(r-.962)*30.;
   float tw=.6+.4*sin(uT*(1.+r*4.)+r*40.);
   float st=smoothstep(.08*s+.04,0.,length(f))*tw*uNight;
   outCol+=vec3(.92,.95,1.)*st;
   outAlpha=max(outAlpha,st*0.85);
  }
 }

 float px=uPar.x;
 // Upper cumulus clouds scattered left & right
 vec3 c1=cumulus(p,hy,.62,.16,3.2,2.1,uCloud*.45+px*.012,-.08+.26*exp(-pow((uv.x-.16)/.18,2.))+.24*exp(-pow((uv.x-.82)/.18,2.))+uOver*.25,sp);
 if(c1.z>0.){
  vec3 cc=cloudCol(c1,p,sp,mp,sunC);
  float al=c1.z*mix(.48,.34,uNight);
  outCol=mix(outCol,cc,smoothstep(0.,.05,al));
  outAlpha=max(outAlpha,al);
 }

 // Mid/lower drifting cumulus clouds
 vec3 c2=cumulus(p,hy,.14,.14,3.8,7.4,uCloud*.65+px*.018,-.12+.25*exp(-pow((uv.x-.78)/.16,2.))+.22*exp(-pow((uv.x-.14)/.14,2.))+uOver*.28,sp);
 if(c2.z>0.){
  vec3 cc=cloudCol(c2,p,sp,mp,sunC);
  float al=c2.z*mix(.42,.30,uNight);
  outCol=mix(outCol,cc,smoothstep(0.,.05,al));
  outAlpha=max(outAlpha,al);
 }

 // High wispy cloud flecks
 vec2 hp=vec2(p.x+uCloud*1.05+px*.022,hy);
 float fl=fbm(vec2(hp.x*4.5,hp.y*9.5)+fb3(hp*vec2(7.,11.))*.8);
 float fd=smoothstep(.60,.75,fl)*smoothstep(.15,.45,hy)*(1.-smoothstep(.92,1.,hy))*.55;
 if(fd>0.){
  vec3 cc=cloudCol(vec3(.62+(fl-.6)*3.,1.-smoothstep(.60,.68,fl),fd),p,sp,mp,sunC);
  float al=fd*mix(.38,.24,uNight);
  outCol=mix(outCol,cc,smoothstep(0.,.05,al));
  outAlpha=max(outAlpha,al);
 }

 gl_FragColor=vec4(outCol,clamp(outAlpha,0.,1.));
}
`;

  function compile(type, src) {
    const sh = gl.createShader(type);
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    return sh;
  }

  const prog = gl.createProgram();
  gl.attachShader(prog, compile(gl.VERTEX_SHADER, VS));
  gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FS));
  gl.linkProgram(prog);
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
  const locA = gl.getAttribLocation(prog, "a");
  gl.enableVertexAttribArray(locA);
  gl.vertexAttribPointer(locA, 2, gl.FLOAT, false, 0, 0);

  const U = (n) => gl.getUniformLocation(prog, n);
  const uRes = U("uRes"), uT = U("uT"), uNight = U("uNight"), uGold = U("uGold"),
        uCloud = U("uCloud"), uOver = U("uOver"), uWarm = U("uWarm"), uCold = U("uCold"),
        uSun = U("uSun"), uMoon = U("uMoon"), uPar = U("uPar");

  let W = 0, H = 0;
  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    W = Math.max(1, Math.floor(window.innerWidth * dpr));
    H = Math.max(1, Math.floor(window.innerHeight * dpr));
    canvas.width = W;
    canvas.height = H;
    gl.viewport(0, 0, W, H);
  }
  resize();
  window.addEventListener("resize", resize);

  let parX = 0, parTX = 0;
  window.addEventListener("pointermove", (e) => {
    parTX = (e.clientX / Math.max(1, window.innerWidth) - 0.5) * 2;
  }, { passive: true });

  let t0 = performance.now(), simT = 0, cloud = 0, nightVal = 0;
  function frame(now) {
    const dt = Math.min((now - t0) / 1000, 0.05);
    t0 = now;
    if (!RM) {
      simT += dt;
      cloud += dt * 0.008;
    }
    parX += (parTX - parX) * Math.min(1, dt * 3);

    const sc = window.__gxSceneState;
    const isNightDom = root.classList.contains("dark") || root.getAttribute("data-sky") === "night" || root.getAttribute("data-theme-bg") === "dark";
    const targetNight = sc ? sc.night : (isNightDom ? 1 : 0);
    nightVal += (targetNight - nightVal) * Math.min(1, dt * 6);

    const gold = sc && typeof sc.gold === "number" ? sc.gold : 0;
    const over = sc && sc.amt ? sc.amt.over : 0;
    const warm = sc && sc.amt ? sc.amt.warm : 0;
    const cold = sc && sc.amt ? sc.amt.cold : 0;
    const sun = sc && sc.sun ? sc.sun : [0.75, 0.72, 1 - nightVal];
    const moon = sc && sc.moon ? sc.moon : [0.22, 0.72, nightVal, 0.5];

    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform2f(uRes, W, H);
    gl.uniform1f(uT, simT);
    gl.uniform1f(uNight, nightVal);
    gl.uniform1f(uGold, gold);
    gl.uniform1f(uCloud, simT * 0.028 + (sc ? sc.cloud * 2.0 : 0));
    gl.uniform1f(uOver, over);
    gl.uniform1f(uWarm, warm);
    gl.uniform1f(uCold, cold);
    gl.uniform3f(uSun, sun[0], sun[1], sun[2]);
    gl.uniform4f(uMoon, moon[0], moon[1], moon[2], moon[3]);
    gl.uniform2f(uPar, parX, 0);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    if (!RM) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
