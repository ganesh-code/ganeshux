import{r as R,j as N,E as Te}from"./index--rniiPa8.js";const Ae=151;function pe(l){if(typeof l!="string")return null;const c=l.match(/^(\d+)/);if(!c)return null;const a=Number.parseInt(c[1],10);return Number.isSafeInteger(a)&&a>0?a:null}function we({brands:l,userAgent:c=""}={}){if(Array.isArray(l)){const u=l.find(f=>f&&/^Chromium$/i.test(f.brand)),r=pe(u?.version);if(r!==null)return r}if(typeof c!="string")return null;const a=c.match(/(?:Chromium|HeadlessChrome|Chrome)\/(\d+)/i);return a?pe(a[1]):null}function Se(l={}){const c=we(l);return c!==null&&c>=Ae}function Ce(){return typeof navigator>"u"?{}:{brands:navigator.userAgentData?.brands,userAgent:navigator.userAgent}}function ve(l,c){if(l.defaultPrevented)return!1;const card=document.querySelector(".experience-about-card-wrap--desktop")||document.querySelector(".about-me-card");const a=card?Math.round(card.offsetLeft-(window.innerWidth-card.offsetWidth)/2):(c.scrollWidth-c.clientWidth);if(a<=1)return!1;const u=Math.abs(l.deltaX)>Math.abs(l.deltaY)?l.deltaX:l.deltaY;if(u===0)return!1;if(u>0){if(c.scrollLeft<a-2){l.preventDefault();c.scrollLeft=Math.min(c.scrollLeft+u,a);return!0}else{const curY=window.lenis?window.lenis.scroll:window.scrollY;if(window.lenis){window.lenis.scrollTo(curY+u,{immediate:true})}else{window.scrollBy({top:u,behavior:"auto"})};if(l.cancelable)l.preventDefault();return!1}}if(u<0){const curY=window.lenis?window.lenis.scroll:window.scrollY;if(curY>1){if(window.lenis){window.lenis.scrollTo(Math.max(0,curY+u),{immediate:true})}else{window.scrollBy({top:u,behavior:"auto"})};if(l.cancelable)l.preventDefault();return!1}if(c.scrollLeft>1){l.preventDefault();c.scrollLeft=Math.max(c.scrollLeft+u,0);return!0}}return!1}function Xe(l,c,a){return a!=="horizontal"||c.contains(l.target)?!1:ve(l,c)}const Le={zone:240,angle:80,rounding:150,perspective:700,direction:"in",axis:"vertical",ease:240,smoothing:.1,top:!0,bottom:!0,tumble:0,tilt:0,edgeBlur:0,suspended:!1},Ye=`#version 300 es
precision highp float;
layout(location = 0) in vec2 aPos;
out vec2 vUv;
void main () {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`,ze=`#version 300 es
precision highp float;
in vec2 vUv;
out vec4 outColor;
uniform sampler2D uContent;
uniform float uZone;
uniform float uAngle;
uniform float uPersp;
uniform float uDir;
uniform float uTopAmt;
uniform float uBotAmt;
uniform float uMaxX;
uniform float uPxY;
uniform float uPxX;
uniform float uCover;
uniform vec3 uBg;
uniform vec2 uMouse;
uniform float uTiltX;
uniform float uTiltY;
uniform float uPhi;
uniform float uRound;
uniform float uAxis;
uniform float uEdgeBlur;

vec3 foldEdge (float sy, float amt) {
  float yf = 1.0 - uZone;
  if (amt < 1e-4) return vec3(sy, 0.0, 1.0);
  float theta = uAngle * amt;
  if (uRound < 1e-4) {
    float s = sin(theta) * uDir;
    float c = cos(theta);
    float denom = max(c * uPersp + s * (0.5 - sy), 1e-5);
    float tRaw = uPersp * (sy - yf) / denom;
    float t = clamp(tRaw, 0.0, uZone);
    float z = max(t * s, -0.85 * uPersp);
    float alpha = 1.0 - smoothstep(uZone, uZone + 2.0 * uPxY, tRaw);
    return vec3(yf + t, z, alpha);
  }
  if (sy <= yf) return vec3(sy, 0.0, 1.0);
  float R = min(uRound, uZone);
  float r = R / theta;
  float ca = cos(theta);
  float sa = sin(theta);
  float yA = r * sa;
  float zA = r * (1.0 - ca);
  float prevSy = yf;
  float prevZ = 0.0;
  float prevU = 0.0;
  float bestU = -1.0;
  float bestZ = 0.0;
  float maxSy = yf;
  float du = uZone / 40.0;
  for (int i = 1; i <= 40; i++) {
    float u = du * float(i);
    float Y;
    float Zm;
    if (u <= R) {
      float a = u / r;
      Y = r * sin(a);
      Zm = r * (1.0 - cos(a));
    } else {
      Y = yA + (u - R) * ca;
      Zm = zA + (u - R) * sa;
    }
    Y += yf;
    float Z = max(Zm * uDir, -0.85 * uPersp);
    float scr = 0.5 + (Y - 0.5) * uPersp / (uPersp + Z);
    if ((prevSy - sy) * (scr - sy) <= 0.0 && abs(scr - prevSy) > 1e-7) {
      float f = clamp((sy - prevSy) / (scr - prevSy), 0.0, 1.0);
      bestU = mix(prevU, u, f);
      bestZ = mix(prevZ, Z, f);
      if (uDir > 0.0) break;
    }
    maxSy = max(maxSy, scr);
    prevSy = scr;
    prevZ = Z;
    prevU = u;
  }
  if (bestU < 0.0) {
    float alpha = 1.0 - smoothstep(maxSy - uPxY, maxSy + uPxY, sy);
    return vec3(1.0, prevZ, alpha);
  }
  return vec3(yf + bestU, bestZ, 1.0);
}

vec2 tipPlane (float sy, float phi) {
  float s = sin(phi);
  float c = cos(phi);
  float denom = max(c * uPersp + s * (sy - 0.5), 1e-4);
  float t = uPersp * (1.0 - sy) / denom;
  return vec2(1.0 - t, t * s);
}

void main () {
  vec2 uv = mix(vUv, vUv.yx, uAxis);
  float cx = uMaxX * 0.5;
  float zSum = 0.0;

  if (abs(uPhi) > 1e-4) {
    if (uPhi > 0.0) {
      vec2 r = tipPlane(uv.y, uPhi);
      uv.y = r.x;
      zSum += r.y;
    } else {
      vec2 r = tipPlane(1.0 - uv.y, -uPhi);
      uv.y = 1.0 - r.x;
      zSum += r.y;
    }
  }

  float zG = uTiltX * (uv.x - cx) + uTiltY * (uv.y - 0.5);
  zSum += zG;
  uv.y = 0.5 + (uv.y - 0.5) * (uPersp + zG) / uPersp;

  float inTop = step(1.0 - uZone, uv.y);
  float inBot = step(uv.y, uZone);

  vec3 top = foldEdge(uv.y, uTopAmt);
  vec3 bot = foldEdge(1.0 - uv.y, uBotAmt);

  float srcY = uv.y;
  srcY = mix(srcY, top.x, inTop);
  srcY = mix(srcY, 1.0 - bot.x, inBot);

  zSum += inTop * top.y + inBot * bot.y;
  float alpha = mix(1.0, top.z, inTop) * mix(1.0, bot.z, inBot);

  float srcX = cx + (uv.x - cx) * (uPersp + zSum) / uPersp;

  alpha *= smoothstep(-2.0 * uPxX, 0.0, srcX);
  alpha *= 1.0 - smoothstep(uMaxX, uMaxX + 2.0 * uPxX, srcX);
  alpha *= smoothstep(-2.0 * uPxY, 0.0, srcY);
  alpha *= 1.0 - smoothstep(1.0, 1.0 + 2.0 * uPxY, srcY);

  vec2 p = vec2(
    clamp(srcX, 0.0005, uMaxX - 0.0005),
    clamp(srcY, 0.0005, 0.9995)
  );
  vec2 sampleUv = mix(vec2(p.x, 1.0 - p.y), vec2(p.y, 1.0 - p.x), uAxis);
  float foldCoord = mix(vUv.y, vUv.x, uAxis);
  float edgeDistance = min(foldCoord, 1.0 - foldCoord);
  float edgeRamp = 1.0 - smoothstep(0.0, uZone * 1.1, edgeDistance);
  float edgeFold = mix(uBotAmt, uTopAmt, step(0.5, foldCoord));
  float blurLod = uEdgeBlur * uAxis * edgeFold * edgeRamp * edgeRamp;
  vec4 base = textureLod(uContent, sampleUv, blurLod);

  outColor = vec4(base.rgb, alpha * base.a);
}`;function Ue(){if(typeof document>"u")return!1;const l=document.createElement("canvas"),c=l.getContext("2d");return!!(c&&typeof c.drawElementImage=="function"&&typeof l.requestPaint=="function")}const It="data-canvasui-hover",z="data-canvasui-content",_e=`:is([${It}], :hover:where(:not([${z}], [${z}] *)))`;function Be(){if(typeof document>"u"||document.documentElement.dataset.canvasuiHoverRules==="")return;document.documentElement.dataset.canvasuiHoverRules="";const l=a=>{for(const u of Array.from(a))if(u instanceof CSSStyleRule){if(u.selectorText.includes(":hover"))try{u.selectorText=u.selectorText.replace(/:hover\b/g,_e)}catch{}u.cssRules.length&&l(u.cssRules)}else if("cssRules"in u)try{l(u.cssRules)}catch{}};for(const a of Array.from(document.styleSheets))try{l(a.cssRules)}catch{}const c=document.createElement("style");c.textContent=`[${z}], [${z}] * { cursor: var(--canvasui-cursor, auto) !important; }`,document.head.appendChild(c)}function De(l,c={}){const a={...Le,...c},{source:u,content:r,output:f}=l,n=f.getContext("webgl2",{alpha:!0,depth:!1,stencil:!1,antialias:!1,premultipliedAlpha:!1});if(!n||n.isContextLost())return null;const U=u.getContext("2d"),x=u,h=!!(U&&typeof U.drawElementImage=="function"&&typeof x.requestPaint=="function");let O=!1,_=0,ft=()=>{};h&&(x.onpaint=()=>{if(!a.suspended)try{U.reset();const e=U.drawElementImage(r,0,0);e&&typeof u.updateElementGeometry=="function"&&u.updateElementGeometry(r,{canvasTransform:e}),O=!0,ft()}catch{}});function dt(e,t){const o=n.createShader(e);return n.shaderSource(o,t),n.compileShader(o),n.getShaderParameter(o,n.COMPILE_STATUS)||console.error("Bend shader error:",n.getShaderInfoLog(o)),o}const E=dt(n.VERTEX_SHADER,Ye),S=dt(n.FRAGMENT_SHADER,ze),M=n.createProgram();n.attachShader(M,E),n.attachShader(M,S),n.linkProgram(M);const d={},B=n.getProgramParameter(M,n.ACTIVE_UNIFORMS);for(let e=0;e<B;e++){const t=n.getActiveUniform(M,e);d[t.name]=n.getUniformLocation(M,t.name)}const D=n.createBuffer();n.bindBuffer(n.ARRAY_BUFFER,D),n.bufferData(n.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),n.STATIC_DRAW),n.enableVertexAttribArray(0),n.vertexAttribPointer(0,2,n.FLOAT,!1,0,0);const mt=n.createTexture();n.bindTexture(n.TEXTURE_2D,mt),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR_MIPMAP_LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MAG_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE),n.texImage2D(n.TEXTURE_2D,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,new Uint8Array([0,0,0,0])),n.generateMipmap(n.TEXTURE_2D);let ht=1,Q=[0,0,0];const St=document.createElement("canvas");St.width=St.height=1;const J=St.getContext("2d",{willReadFrequently:!0});function Ft(){if(!J)return;let e=r;for(;e;){const t=getComputedStyle(e).backgroundColor;if(t&&t!=="transparent"&&t!=="rgba(0, 0, 0, 0)"){J.clearRect(0,0,1,1),J.fillStyle=t,J.fillRect(0,0,1,1);const[o,i,s,m]=J.getImageData(0,0,1,1).data;if(m>0){Q=[o/255,i/255,s/255];return}}e=e.parentElement}try{const cb=getComputedStyle(document.documentElement).getPropertyValue("--current-bg")||"#EAE5DC";J.clearRect(0,0,1,1),J.fillStyle=cb.trim(),J.fillRect(0,0,1,1);const[o,i,s,m]=J.getImageData(0,0,1,1).data;if(m>0){Q=[o/255,i/255,s/255];return}}catch{}Q=[1,1,1]}function Ct(){const e=Math.min(window.devicePixelRatio||1,2),t=Math.max(1,Math.round(f.clientWidth*e)),o=Math.max(1,Math.round(f.clientHeight*e));(f.width!==t||f.height!==o)&&(f.width=t,f.height=o);const i=a.axis==="horizontal",s=i?r.clientHeight:r.clientWidth,m=i?f.clientHeight:f.clientWidth;if(ht=1,h){const p=Math.max(1,Math.round(u.clientWidth)),b=Math.max(1,Math.round(u.clientHeight));(u.width!==p*e||u.height!==b*e)&&(u.width=p*e,u.height=b*e),x.requestPaint()}}let tt=0,et=0,I=0,F=0,A=0,T=0,C=0,X=0,Z=0,H=0;function nt(){const e=a.axis==="horizontal",t=e?r.scrollWidth-r.clientWidth:r.scrollHeight-r.clientHeight,o=e?r.scrollLeft:r.scrollTop,i=Math.max(a.ease,1),s=m=>{const p=Math.min(Math.max(m/i,0),1);return p*p*(3-2*p)};tt=t>1&&a.top?s(o):0,et=t>1&&a.bottom?s(t-o):0}Ct(),nt(),Ft();function xe(){!h||!O||(O=!1,Ft(),n.bindTexture(n.TEXTURE_2D,mt),n.texImage2D(n.TEXTURE_2D,0,n.RGBA,n.RGBA,n.UNSIGNED_BYTE,u),n.generateMipmap(n.TEXTURE_2D))}function ge(){xe();const e=Math.max(f.clientHeight,1),t=Math.max(f.clientWidth,1),o=a.axis==="horizontal",i=o?t:e,s=o?e:t,m=Math.min(Math.max(a.zone,8)/i,.49);n.useProgram(M),n.activeTexture(n.TEXTURE0),n.bindTexture(n.TEXTURE_2D,mt),n.uniform1i(d.uContent,0),n.uniform1f(d.uZone,m),n.uniform1f(d.uAngle,Math.min(Math.max(a.angle,1),160)*(Math.PI/180)),n.uniform1f(d.uPersp,Math.max(a.perspective,50)/i),n.uniform1f(d.uDir,a.direction==="in"?-1:1),n.uniform1f(d.uTopAmt,I),n.uniform1f(d.uBotAmt,F),n.uniform1f(d.uMaxX,ht),n.uniform1f(d.uPxY,1.5/i),n.uniform1f(d.uPxX,1.5/s),n.uniform1f(d.uCover,h?1:0),n.uniform3f(d.uBg,Q[0],Q[1],Q[2]),d.uMouse&&(()=>{const r=f.getBoundingClientRect();n.uniform2f(d.uMouse,Yt?(Qt-r.left)*(f.width/(r.width||1)):-1e4,Yt?(r.bottom-Jt)*(f.height/(r.height||1)):-1e4)})(),n.uniform1f(d.uTiltX,Z),n.uniform1f(d.uTiltY,H),n.uniform1f(d.uPhi,T),n.uniform1f(d.uRound,Math.min(Math.max(a.rounding,0)/i,m)),n.uniform1f(d.uAxis,o?1:0),n.uniform1f(d.uEdgeBlur,Math.min(Math.max(a.edgeBlur,0),5)),n.bindFramebuffer(n.FRAMEBUFFER,null),n.viewport(0,0,f.width,f.height),n.drawArrays(n.TRIANGLE_STRIP,0,4)}let pt=0,Xt=performance.now(),Lt=!1,G=!1,vt=!0;const xt=window.matchMedia("(prefers-reduced-motion: reduce)");let k=xt.matches;function Zt(e){if(Lt||a.suspended){G=!1;return}if(!vt){G=!1;return}const t=Math.min((e-Xt)/1e3,1/30);Xt=e;const o=a.smoothing,i=k||o<=0?1:1-Math.exp(-t/Math.max(o,1e-4));I+=(tt-I)*i,F+=(et-F)*i,Math.abs(tt-I)<.001&&(I=tt),Math.abs(et-F)<.001&&(F=et),A*=Math.exp(-t/.22),Math.abs(A)<.5&&(A=0);const s=k||a.tumble<=0?0:Math.tanh(A/500)*.4*Math.min(a.tumble,1);T+=(s-T)*Math.min(t/.09,1),s===0&&Math.abs(T)<1e-4&&(T=0),(k||a.tilt<=0)&&(C=0,X=0);const m=Math.min(t/.15,1);if(Z+=(C-Z)*m,H+=(X-H)*m,Math.abs(C-Z)<1e-4&&(Z=C),Math.abs(X-H)<1e-4&&(H=X),h&&_>0&&x.requestPaint(),ge(),!O&&_===0&&I===tt&&F===et&&A===0&&T===0&&Z===C&&H===X){G=!1;return}pt=requestAnimationFrame(Zt)}function g(){Lt||a.suspended||G||!vt||(G=!0,Xt=performance.now(),pt=requestAnimationFrame(Zt))}ft=g,g();function Ht(){nt(),h&&x.requestPaint(),Yt&&te(Qt,Jt),g()}r.addEventListener("scroll",Ht,{passive:!0});function gt(){a.suspended||(h&&x.requestPaint(),g())}r.addEventListener("load",gt,!0),r.addEventListener("loadeddata",gt,!0);function Wt(){_+=1,!a.suspended&&(h&&x.requestPaint(),g())}function yt(){_=Math.max(0,_-1),!a.suspended&&(h&&x.requestPaint(),g())}r.addEventListener("animationstart",Wt,!0),r.addEventListener("animationend",yt,!0),r.addEventListener("animationcancel",yt,!0);function Nt(e){if(e.defaultPrevented)return;const t=a.axis==="horizontal";if(!t)return;const o=Math.abs(e.deltaX)>Math.abs(e.deltaY)?e.deltaX:e.deltaY;if(o===0)return;const card=document.querySelector(".experience-about-card-wrap--desktop")||document.querySelector(".about-me-card");const i=card?Math.round(card.offsetLeft-(window.innerWidth-card.offsetWidth)/2):(r.scrollWidth-r.clientWidth);if(i<=1)return;const s=r.scrollLeft;if(o>0){if(s<i-2){e.preventDefault();r.scrollLeft=Math.min(s+o,i)}else{const curY=window.lenis?window.lenis.scroll:window.scrollY;if(window.lenis){window.lenis.scrollTo(curY+o,{immediate:true})}else{window.scrollBy({top:o,behavior:"auto"})};if(e.cancelable)e.preventDefault()}return}if(o<0){const curY=window.lenis?window.lenis.scroll:window.scrollY;if(curY>1){if(window.lenis){window.lenis.scrollTo(Math.max(0,curY+o),{immediate:true})}else{window.scrollBy({top:o,behavior:"auto"})};if(e.cancelable)e.preventDefault();return}if(s>1){e.preventDefault();r.scrollLeft=Math.max(s+o,0);return}}}r.addEventListener("wheel",Nt,{passive:!1});const Ot=u.parentElement;function Gt(e){Xe(e,r,a.axis)}Ot?.addEventListener("wheel",Gt,{capture:!0,passive:!1});let ot=!1,rt=null;function ye(e){if(!h)return null;const t=f.getBoundingClientRect();if(t.width===0||t.height===0)return null;const o=Et(e.clientX-t.left,e.clientY-t.top);if(o.alpha<.5)return null;const i=t.left+o.x,s=t.top+o.y,m=document.elementFromPoint(i,s);return!m||!r.contains(m)?null:{target:m,clientX:i,clientY:s}}function kt(e,t,o,i=null){return new PointerEvent(e,{bubbles:!0,cancelable:!1,composed:!0,pointerId:t.pointerId,pointerType:t.pointerType,isPrimary:t.isPrimary,width:t.width,height:t.height,pressure:t.pressure,tangentialPressure:t.tangentialPressure,tiltX:t.tiltX,tiltY:t.tiltY,twist:t.twist,clientX:o?.clientX??t.clientX,clientY:o?.clientY??t.clientY,screenX:t.screenX,screenY:t.screenY,ctrlKey:t.ctrlKey,shiftKey:t.shiftKey,altKey:t.altKey,metaKey:t.metaKey,button:t.button,buttons:t.buttons,relatedTarget:i})}function qt(e,t=null){if(rt){ot=!0;try{rt.dispatchEvent(kt("pointerout",e,null,t)),x.requestPaint()}finally{ot=!1,rt=null}}}function Ee(e){const t=ye(e),o=t?.target.closest?.("[data-canvasui-pointer-tilt]")??null;if(rt!==o&&(qt(e,o),rt=o),!(!t||!o)){ot=!0;try{t.target.dispatchEvent(kt("pointermove",e,t)),x.requestPaint()}finally{ot=!1}}}function Kt(e){if(!ot&&e.isPrimary){Qt=e.clientX,Jt=e.clientY,Yt=!0,te(e.clientX,e.clientY),Ee(e),g();if(a.tilt>0&&!k){const t=f.getBoundingClientRect();if(t.width>0&&t.height>0){const o=(e.clientX-t.left)/t.width-.5,i=.5-(e.clientY-t.top)/t.height,s=Math.min(a.tilt,1)*.14;a.axis==="horizontal"?(C=i*s,X=-o*s):(C=-o*s,X=-i*s)}}}}r.addEventListener("pointermove",Kt,{passive:!0});function jt(){Yt=!1,bt(null),qt(new PointerEvent("pointerleave",{pointerId:1,isPrimary:!0})),C=0,X=0,g()}r.addEventListener("pointerleave",jt);function Et(e,t){const o=Math.max(f.clientWidth,1),i=Math.max(f.clientHeight,1),s=a.axis==="horizontal",m=s?o:i,p=Math.max(a.perspective,50)/m,b=Math.min(Math.max(a.zone,8)/m,.49),ue=Math.min(Math.max(a.rounding,0)/m,b),Me=Math.min(Math.max(a.angle,1),160)*(Math.PI/180),Ut=a.direction==="in"?-1:1,_t=ht*.5,ce=s?1-t/i:e/o;let y=s?e/o:1-t/i,q=0;if(Math.abs(T)>1e-4){const v=(P,w)=>{const L=Math.sin(w),j=Math.cos(w),W=Math.max(j*p+L*(P-.5),1e-4),it=p*(1-P)/W;return[1-it,it*L]};if(T>0){const P=v(y,T);y=P[0],q+=P[1]}else{const P=v(1-y,-T);y=1-P[0],q+=P[1]}}const fe=Z*(ce-_t)+H*(y-.5);q+=fe,y=.5+(y-.5)*((p+fe)/p);const de=(v,P)=>{const w=1-b;if(P<1e-4)return[v,0,1];const L=Me*P;if(ue<1e-4){const V=Math.sin(L)*Ut,Y=Math.cos(L),lt=Math.max(Y*p+V*(.5-v),1e-5),$=p*(v-w)/lt,At=Math.min(Math.max($,0),b),ut=Math.max(At*V,-.85*p);return[w+At,ut,$>b?0:1]}if(v<=w)return[v,0,1];const j=Math.min(ue,b),W=j/L,it=Math.cos(L),me=Math.sin(L),be=W*me,Pe=W*(1-it);let st=w,Tt=0,Bt=0,Dt=-1,he=0;const Re=b/40;for(let V=1;V<=40;V++){const Y=Re*V;let lt,$;if(Y<=j){const ct=Y/W;lt=W*Math.sin(ct),$=W*(1-Math.cos(ct))}else lt=be+(Y-j)*it,$=Pe+(Y-j)*me;const At=w+lt,ut=Math.max($*Ut,-.85*p),wt=.5+(At-.5)*p/(p+ut);if((st-v)*(wt-v)<=0&&Math.abs(wt-st)>1e-7){const ct=Math.min(Math.max((v-st)/(wt-st),0),1);if(Dt=Bt+(Y-Bt)*ct,he=Tt+(ut-Tt)*ct,Ut>0)break}st=wt,Tt=ut,Bt=Y}return Dt<0?[1,Tt,0]:[w+Dt,he,1]};let K=y,at=1;if(y>=1-b){const v=de(y,I);K=v[0],q+=v[1],at*=v[2]}else if(y<=b){const v=de(1-y,F);K=1-v[0],q+=v[1],at*=v[2]}const Rt=_t+(ce-_t)*((p+q)/p);return(Rt<0||Rt>ht||K<0||K>1)&&(at=0),s?{x:K*o,y:(1-Rt)*i,alpha:at}:{x:Rt*o,y:(1-K)*i,alpha:at}}let Mt=!1,Vt=[],$t=null,Qt=0,Jt=0,Yt=!1;h&&(Be(),r.setAttribute(z,""));function bt(e){window.__activeHoverElement=e;window.dispatchEvent(new CustomEvent("canvashoverchange",{detail:e}));if(e===$t)return;$t=e;const t=new Set;for(let o=e;o&&(t.add(o),o!==r);o=o.parentElement);for(const o of Vt)t.has(o)||o.removeAttribute(It);for(const o of t)o.setAttribute(It,"");if(Vt=Array.from(t),e){r.removeAttribute(z);const o=getComputedStyle(e).cursor;r.setAttribute(z,""),r.style.setProperty("--canvasui-cursor",o),u.style.cursor=o}else r.style.removeProperty("--canvasui-cursor"),u.style.removeProperty("cursor")}function te(e,t){if(!h)return;const o=f.getBoundingClientRect();if(o.width===0||o.height===0)return;const i=Et(e-o.left,t-o.top);if(i.alpha<.5){bt(null);return}const s=document.elementFromPoint(o.left+i.x,o.top+i.y);bt(s&&r.contains(s)?s:null)}function ee(e){if(Mt||!h||e.button!==0)return;const t=f.getBoundingClientRect();if(t.width===0||t.height===0)return;const o=e.clientX-t.left,i=e.clientY-t.top,s=Et(o,i);if(s.alpha<.5){e.preventDefault(),e.stopPropagation();return}if(Math.hypot(s.x-o,s.y-i)<1.5)return;e.preventDefault(),e.stopPropagation();const m=document.elementFromPoint(t.left+s.x,t.top+s.y);if(m){Mt=!0;try{m.dispatchEvent(new MouseEvent("click",{bubbles:!0,cancelable:!0,composed:!0,view:window,detail:e.detail,clientX:t.left+s.x,clientY:t.top+s.y,screenX:e.screenX,screenY:e.screenY,ctrlKey:e.ctrlKey,shiftKey:e.shiftKey,altKey:e.altKey,metaKey:e.metaKey,button:e.button})),m instanceof HTMLElement&&m.matches("input, textarea, select, [contenteditable]")&&m.focus()}finally{Mt=!1}}}r.addEventListener("click",ee,!0);function ne(e,t){const o=document;if(typeof o.caretPositionFromPoint=="function"){const s=o.caretPositionFromPoint(e,t);return s?{node:s.offsetNode,offset:s.offset}:null}const i=o.caretRangeFromPoint?.(e,t);return i?{node:i.startContainer,offset:i.startOffset}:null}function oe(e){const t=f.getBoundingClientRect();if(t.width===0||t.height===0)return null;const o=Et(e.clientX-t.left,e.clientY-t.top);if(o.alpha<.5)return null;const i=t.left+o.x,s=t.top+o.y;return Math.hypot(i-e.clientX,s-e.clientY)<1.5?null:{x:i,y:s}}let Pt=!1;function re(e){if(Mt||!h||e.button!==0)return;const t=oe(e);if(!t)return;e.preventDefault();const o=ne(t.x,t.y);if(!o||!r.contains(o.node))return;const i=window.getSelection();i&&(i.removeAllRanges(),i.collapse(o.node,o.offset),Pt=!0)}function ae(e){if(!Pt)return;if(!(e.buttons&1)){Pt=!1;return}const t=oe(e),o=t?ne(t.x,t.y):null,i=window.getSelection();o&&i&&i.anchorNode&&r.contains(o.node)&&i.extend(o.node,o.offset)}function ie(){Pt=!1}r.addEventListener("mousedown",re,!0),window.addEventListener("mousemove",ae,!0),window.addEventListener("mouseup",ie,!0);function se(){k=xt.matches,g()}xt.addEventListener("change",se);const zt=new ResizeObserver(()=>{Ct(),nt(),g()});zt.observe(f),zt.observe(r);const le=new IntersectionObserver(e=>{vt=e[e.length-1]?.isIntersecting??!0,vt&&g()});return le.observe(f),{setOptions(e){const t=!!a.suspended;if(Object.assign(a,e),a.suspended){cancelAnimationFrame(pt),G=!1;return}t&&h&&x.requestPaint(),nt(),g()},resize(){Ct(),nt(),g()},destroy(){Lt=!0,cancelAnimationFrame(pt),bt(null),r.removeAttribute(z),r.removeEventListener("scroll",Ht),r.removeEventListener("load",gt,!0),r.removeEventListener("loadeddata",gt,!0),r.removeEventListener("animationstart",Wt,!0),r.removeEventListener("animationend",yt,!0),r.removeEventListener("animationcancel",yt,!0),r.removeEventListener("wheel",Nt),Ot?.removeEventListener("wheel",Gt,!0),r.removeEventListener("pointermove",Kt),r.removeEventListener("pointerleave",jt),r.removeEventListener("click",ee,!0),r.removeEventListener("mousedown",re,!0),window.removeEventListener("mousemove",ae,!0),window.removeEventListener("mouseup",ie,!0),zt.disconnect(),le.disconnect(),xt.removeEventListener("change",se),n.deleteTexture(mt),n.deleteProgram(M),n.deleteShader(E),n.deleteShader(S),n.deleteBuffer(D),h&&(x.onpaint=null)}}}const Ie=()=>()=>{};function Fe({children:l,className:c,style:a,requiresVideoSupport:u=!1,...r}){const f=R.useRef(null),n=R.useRef(null),U=R.useRef(null),x=R.useRef(null),[h]=R.useState(r),[O,_]=R.useState(!1),ft=R.useSyncExternalStore(Ie,Ue,()=>!1),dt=!u||Se(Ce()),E=ft&&dt&&!O;R.useEffect(()=>{if(!E)return;const d=f.current,B=n.current,D=U.current;if(!(!d||!B||!D))return x.current=De({source:d,content:B,output:D},h),E&&!x.current&&_(!0),()=>{x.current?.destroy(),x.current=null}},[h,E]),R.useEffect(()=>{const onWheel=(e)=>{if(e.defaultPrevented)return;if(r.axis!=="horizontal")return;const track=n.current;if(!track)return;const card=document.querySelector(".experience-about-card-wrap--desktop")||document.querySelector(".about-me-card");const maxScroll=card?Math.round(card.offsetLeft-(window.innerWidth-card.offsetWidth)/2):(track.scrollWidth-track.clientWidth);if(maxScroll<=1)return;const curY=window.lenis?window.lenis.scroll:window.scrollY;const delta=Math.abs(e.deltaX)>Math.abs(e.deltaY)?e.deltaX:e.deltaY;if(delta===0)return;if(delta>0){if(curY<=1&&track.scrollLeft<maxScroll-2){e.preventDefault();track.scrollLeft=Math.min(track.scrollLeft+delta,maxScroll);return}}if(delta<0){if(curY>1)return;if(track.scrollLeft>1){e.preventDefault();track.scrollLeft=Math.max(track.scrollLeft+delta,0);return}}};window.addEventListener("wheel",onWheel,{passive:!1});return()=>window.removeEventListener("wheel",onWheel);},[r.axis]),R.useEffect(()=>{x.current?.setOptions(r)});const S=r.axis==="horizontal",M={position:"relative",width:"100%",height:"100%",overflowX:S?"auto":"hidden",overflowY:S?"hidden":"auto",touchAction:S?"pan-x":"pan-y"};return N.jsxs("div",{className:c,"data-bend-root":!0,"data-bend-mode":E?"native":"fallback","data-bend-suspended":r.suspended?"":void 0,style:{position:"relative",...a},children:[E?N.jsx("canvas",{ref:f,"data-bend-source":!0,content:"drawable",layoutsubtree:"true",suppressHydrationWarning:!0,style:{position:"absolute",inset:0,width:"100%",height:"100%",opacity:0,zIndex:1},children:N.jsx("div",{ref:n,drawable:"","data-bend-scroll":!0,"data-bend-axis":S?"horizontal":"vertical",style:M,children:l})}):N.jsx("div",{ref:n,"data-bend-scroll":!0,"data-bend-axis":S?"horizontal":"vertical",style:M,children:l}),E?N.jsx("canvas",{ref:U,"data-bend-output":!0,"aria-hidden":!0,style:{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:2}}):null]})}function He(){const[l,c]=R.useState("idle");return N.jsx(Fe,{className:"home-bend",requiresVideoSupport:!0,suspended:l!=="idle"&&l!=="settling",axis:"horizontal",zone:240,angle:80,rounding:150,perspective:700,ease:240,smoothing:.1,tumble:0,tilt:0,edgeBlur:3.25,direction:"in",top:!0,bottom:!0,children:N.jsx(Te,{animatedEntrance:!0,onOverlayPhaseChange:c})})}export{He as default};
