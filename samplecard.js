export const sampleCards = [
  {
    id: "pulse-loader",
    title: "Pulse Loader",
    description: "A simple pulsing loader using CSS animation",
    language: "HTML / CSS",
    html: `<div class="pulse-wrap"><div class="dot"></div></div>`,
    css: `.pulse-wrap{display:flex;align-items:center;justify-content:center;height:180px;}.dot{width:24px;height:24px;border-radius:50%;background:#06b6d4;animation:pulse 1s infinite ease-in-out;}@keyframes pulse{0%{transform:scale(1);opacity:1;}70%{transform:scale(1.8);opacity:0;}100%{transform: scale(1);
opacity:0;}}`,
    js: "",
    category: "css",
  },
  {
    id: "flip-card",
    title: "3D Flip Card",
    description: "Card flips on hover to show back side",
    language: "HTML / CSS",
    html: `<div class="flip-scene"><div class="flip-card"><div class="face front">Front</div><div class="face back">Back</div></div></div>`,
    css: `.flip-scene{perspective:1000px;display:flex;align-items:center;justify-content:center;height:220px;}.flip-card{width:160px;height:100px;transform-style:preserve-3d;transition:transform .6s;}.flip-scene:hover .flip-card{transform:rotateY(180deg);}.face{position:absolute;width:160px;height:100px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-weight:600;}.front{background:linear-gradient(90deg,#3b82f6,#06b6d4);color:white;}.back{background:#111827;color:#f8fafc;transform:rotateY(180deg);}`,
    js: "",
    category: "css",
  },
  {
    id: "float-bubbles",
    title: "Floating Bubbles",
    description: "Decorative floating bubbles animation",
    language: "HTML / CSS",
    html: `<div class="bubbles"><span></span><span></span><span></span></div>`,
    css: `.bubbles{position:relative;height:180px;display:flex;align-items:center;justify-content:center;}.bubbles span{position:absolute;width:22px;height:22px;border-radius:50%;background:rgba(59,130,246,0.7);animation:rise 6s infinite ease-in;}.bubbles span:nth-child(2){left:40%;background:rgba(6,182,212,0.6);width:14px;height:14px;animation-duration:5s;}.bubbles span:nth-child(3){left:65%;background:rgba(99,102,241,0.55);width:18px;height:18px;animation-duration:7s;}@keyframes rise{0%{transform:translateY(40px);opacity:0;}50%{opacity:1;}100%{transform:translateY(-140px);opacity:0;}}`,
    js: "",
    category: "css",
  },
  {
    id: "fade-text",
    title: "Fade-in Text",
    description: "Staggered fade-in text effect",
    language: "HTML / CSS",
    html: `<div class="fade-wrap"><span>Design</span><span>Develop</span><span>Deploy</span></div>`,
    css: `.fade-wrap{display:flex;gap:12px;align-items:center;justify-content:center;height:160px;}.fade-wrap span{opacity:0;transform:translateY(6px);animation:fadein .8s forwards;animation-delay:calc(var(--i)*0.15s)}.fade-wrap span:nth-child(1){--i:0;}.fade-wrap span:nth-child(2){--i:1;}.fade-wrap span:nth-child(3){--i:2;}@keyframes fadein{to{opacity:1;transform:none;}}`,
    js: "",
    category: "css",
  },
  {
    id: "bouncy-button",
    title: "Bouncy Button",
    description: "A playful bounce on hover for buttons",
    language: "HTML / CSS",
    html: `<button class="bouncy">Click me</button>`,
    css: `.bouncy{padding:.6rem 1.1rem;border-radius:999px;border:none;background:linear-gradient(90deg,#f97316,#f43f5e);color:white;font-weight:600;transition:transform .18s cubic-bezier(.2,.9,.3,1);}.bouncy:hover{transform:translateY(-6px) scale(1.02);}.bouncy:active{transform:translateY(0) scale(.98);}`,
    js: "",
    category: "css",
  },
  {
    id: "ripple-effect",
    title: "Ripple Effect",
    description: "Click ripple using pure CSS + small JS",
    language: "HTML / CSS / JS",
    html: `<div class="ripple-wrap"><button class="ripple-btn">Tap</button></div>`,
    css: `.ripple-wrap{display:flex;align-items:center;justify-content:center;height:160px;}.ripple-btn{position:relative;overflow:hidden;padding:.6rem 1rem;border-radius:10px;border:none;background:#111827;color:white;}.ripple-btn span{position:absolute;border-radius:50%;transform:scale(0);background:rgba(255,255,255,0.35);animation:rip 600ms linear;}.ripple-btn span.done{display:none;}@keyframes rip{to{transform:scale(4);opacity:0;}}`,
    js: `document.querySelector('.ripple-btn').addEventListener('click',function(e){const r=document.createElement('span');const rect=this.getBoundingClientRect();const size=Math.max(rect.width,rect.height);r.style.width=r.style.height=size+'px';r.style.left=(e.clientX-rect.left-size/2)+'px';r.style.top=(e.clientY-rect.top-size/2)+'px';this.appendChild(r);setTimeout(()=>r.remove(),700);})`,
    category: "js",
  },
  {
    id: "morphing-shape",
    title: "Morphing Blob",
    description: "Smooth morphing SVG-like blob with CSS",
    language: "HTML / CSS",
    html: `<div class="blob"></div>`,
    css: `.blob{width:160px;height:160px;border-radius:40%;background:linear-gradient(135deg,#06b6d4,#3b82f6);animation:blob 4s infinite;}@keyframes blob{0%{border-radius:40% 60% 40% 60%;}33%{border-radius:60% 40% 60% 40%;}66%{border-radius:50% 50% 30% 70%;}100%{border-radius:40% 60% 40% 60%;}}`,
    js: "",
    category: "css",
  },
  {
    id: "typewriter",
    title: "Typewriter Text",
    description: "Simple CSS + JS typewriter effect",
    language: "HTML / CSS / JS",
    html: `<div class="typewriter"><span class="text"></span></div>`,
    css: `.typewriter{height:60px;display:flex;align-items:center;justify-content:center;}.typewriter .text{font-weight:600;color:#0ea5a4;font-family:monospace;font-size:1.1rem;}`,
    js: `const t=["Hello.","I am Creatx.","Tiny animations."],el=document.querySelector('.text');let i=0,j=0;function tick(){if(i>=t.length)return;i< t.length&&(el.textContent=t[i].slice(0,++j));if(j===t[i].length){i++;j=0;setTimeout(tick,800)}else setTimeout(tick,120)}tick();`,
    category: "js",
  },
  {
    id: "clicker-game",
    title: "Clicker Game (JS)",
    description: "Simple clicker game: click to increase score",
    language: "HTML / CSS / JS",
    html: `<div class="clicker"><div class="score">0</div><div class="controls"><button class="btn">Click</button><button class="reset">Reset</button></div></div>`,
    css: `.clicker{display:flex;flex-direction:column;align-items:center;gap:12px;height:220px;justify-content:center;}.clicker .score{font-size:2.4rem;font-weight:700;color:#111827;background:white;padding:8px 16px;border-radius:10px;}.clicker .controls .btn,.clicker .controls .reset{margin:0 6px;padding:10px 14px;border-radius:8px;border:none;background:linear-gradient(90deg,#06b6d4,#3b82f6);color:white;cursor:pointer;}`,
    js: `let score=0;const scoreEl=document.querySelector('.score');document.querySelector('.btn').addEventListener('click',()=>{score++;scoreEl.textContent=score});document.querySelector('.reset').addEventListener('click',()=>{score=0;scoreEl.textContent=score});`,
    category: "js",
  },
  {
    id: "skeleton-loader",
    title: "Skeleton Loader",
    description: "Placeholder skeleton shimmer for loading content",
    language: "HTML / CSS",
    html: `<div class="skeleton-card"><div class="img"></div><div class="line short"></div><div class="line"></div></div>`,
    css: `.skeleton-card{width:260px;padding:16px;border-radius:8px;background:#f3f4f6;display:flex;flex-direction:column;gap:10px;align-items:flex-start;}.skeleton-card .img{width:100%;height:120px;border-radius:6px;background:linear-gradient(90deg,#e5e7eb 25%,#f3f4f6 50%,#e5e7eb 75%);background-size:200% 100%;animation:shimmer 1.2s infinite;}.skeleton-card .line{height:12px;width:100%;border-radius:6px;background:#e5e7eb}.skeleton-card .short{width:60%;}@keyframes shimmer{0%{background-position:200% 0;}100%{background-position:-200% 0;}}`,
    js: "",
    category: "css",
  },
  {
    id: "hover-underline",
    title: "Animated Underline Link",
    description: "Link with an elastic underline that grows on hover",
    language: "HTML / CSS",
    html: `<a class="underline" href="#">Explore</a>`,
    css: `.underline{position:relative;color:white;font-weight:600;text-decoration:none;padding-bottom:4px;}.underline::after{content:"";position:absolute;left:0;bottom:0;height:3px;width:0;background:linear-gradient(90deg,#06b6d4,#3b82f6);border-radius:3px;transition:width .36s cubic-bezier(.2,.9,.3,1);}.underline:hover::after{width:100%;}`,
    js: "",
    category: "css",
  },
  {
    id: "skew-carousel",
    title: "Skewed Card Carousel (CSS)",
    description: "Horizontal card strip with subtle skew and hover scale",
    language: "HTML / CSS",
    html: `<div class="skew-wrap"><div class="card">1</div><div class="card">2</div><div class="card">3</div></div>`,
    css: `.skew-wrap{display:flex;gap:14px;align-items:center;justify-content:center;height:180px;transform:skewY(-4deg);}.skew-wrap .card{width:140px;height:120px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-weight:700;background:linear-gradient(135deg,#06b6d4,#3b82f6);transform:skewY(4deg);transition:transform .32s ease,box-shadow .32s ease;}.skew-wrap .card:hover{transform:skewY(4deg) scale(1.06);box-shadow:0 12px 30px rgba(2,6,23,0.2);}`,
    js: "",
    category: "css",
  },
  {
    id: "confetti-js",
    title: "Mini Confetti Burst",
    description: "Small confetti burst on button click (JS)",
    language: "HTML / CSS / JS",
    html: `<div class="confetti-wrap"><button class="confetti-btn">Celebrate</button></div>`,
    css: `.confetti-wrap{display:flex;align-items:center;justify-content:center;height:180px;}.confetti-btn{padding:.6rem 1rem;border-radius:8px;border:none;background:#10b981;color:white;font-weight:700;cursor:pointer;position:relative;overflow:visible;}`,
    js: `function burstConfetti(el){for(let i=0;i<30;i++){const p=document.createElement('span');p.style.position='absolute';p.style.width='8px';p.style.height='8px';p.style.background=['#f97316','#f43f5e','#06b6d4','#8b5cf6'][Math.floor(Math.random()*4)];p.style.left='50%';p.style.top='50%';p.style.opacity=1;p.style.transform='translate(-50%,-50%)';p.style.borderRadius='2px';el.appendChild(p);const vx=(Math.random()-0.5)*12;const vy=-Math.random()*12;const rot=(Math.random()-0.5)*720;const dur=600+Math.random()*600;requestAnimationFrame(()=>{p.animate([{transform:\`translate(-50%,-50%) translate(\${vx*0}px,\${vy*0}px) rotate(0deg)\` ,opacity:1},{transform:\`translate(-50%,-50%) translate(\${vx*10}px,\${vy*10}px) rotate(\${rot}deg)\`,opacity:0}],{duration:dur,easing:'cubic-bezier(.2,.9,.3,1)'}).onfinish=()=>p.remove()})}}document.querySelector('.confetti-btn').addEventListener('click',function(){burstConfetti(this)})`,
    category: "js",
  },
  {
    id: "wave-loader",
    title: "Wave Loader",
    description: "Bouncing wave bars animation",
    language: "HTML / CSS",
    html: `<div class="wave"><span></span><span></span><span></span><span></span><span></span></div>`,
    css: `.wave{display:flex;gap:6px;align-items:flex-end;height:120px;justify-content:center;}
.wave span{width:8px;height:8px;background:#3b82f6;border-radius:100%;animation:wave .8s ease-in infinite}
.wave span:nth-child(2){animation-delay:.1s;}
.wave span:nth-child(3){animation-delay: .2s;}
.wave span:nth-child(4){animation-delay: .3s;}
.wave span:nth-child(5){animation-delay: .4s;}
@keyframes wave{0%,100%{height:20px;}50%{height:60px;}}`,
    js: "",
    category: "css",
  },

  {
    id: "rotate-border",
    title: "Rotating Border Loader",
    description: "Circular loader using rotating borders",
    language: "HTML / CSS",
    html: `<div class="ring"></div>`,
    css: `.ring{width:60px;height:60px;border-radius:50%;
border:6px solid transparent;border-top-color:#06b6d4;border-right-color:#3b82f6;
animation:spin 1s linear infinite;}
@keyframes spin{to{transform:rotate(360deg);}}`,
    js: "",
    category: "css",
  },
  {
    id: "mask-text",
    title: "Text Reveal Mask",
    description: "Smooth masked text reveal animation",
    language: "HTML / CSS",
    html: `<h2 class="mask-text">Creatx Animations</h2>`,
    css: `.mask-text{font-size:2rem;font-weight:700;position:relative;overflow:hidden;}
.mask-text::after{content:"";position:absolute;left:0;top:0;width:100%;height:100%;
background:#06b6d4;animation:reveal 1.6s forwards infinite;}
@keyframes reveal{to{transform:translateX(100%);}}`,
    js: "",
    category: "css",
  },

  {
    id: "elastic-pop",
    title: "Elastic Pop Button",
    description: "Spring pop button hover animation",
    language: "HTML / CSS",
    html: `<button class="pop-btn">Hover Me</button>`,
    css: `.pop-btn{padding:.7rem 1.2rem;background:#10b981;color:white;
border-radius:8px;border:none;font-weight:600;transition:transform .2s;}
.pop-btn:hover{transform:scale(1.15);}
.pop-btn:active{transform:scale(.95);}`,
    js: "",
    category: "css",
  },

  {
    id: "autotype-words",
    title: "Auto Typing Words",
    description: "Looping auto-typing effect",
    language: "HTML / CSS / JS",
    html: `<div class="auto-type"></div>`,
    css: `.auto-type{font-size:1.3rem;font-weight:700;color:#3b82f6;font-family:monospace;}`,
    js: `const words=["Animate","Create","Design","Build"];
let i=0,j=0,el=document.querySelector('.auto-type');
function write(){
  el.textContent=words[i].slice(0,j++);
  if(j<=words[i].length) setTimeout(write,120);
  else{ setTimeout(()=>{ j=0; i=(i+1)%words.length; write(); },700); }
}
write();`,
    category: "js",
  },

  {
    id: "sparkle-hover",
    title: "Sparkle Hover",
    description: "Tiny sparkles on button hover",
    language: "HTML / CSS / JS",
    html: `<button class="spark-btn">Hover</button><div class="spark-container"></div>`,
    css: `.spark-btn{position:relative;padding:10px 16px;background:#3b82f6;color:white;
border:none;border-radius:8px;font-weight:600;}
.spark{position:absolute;width:6px;height:6px;background:white;border-radius:50%;
pointer-events:none;opacity:0;animation:spark .6s forwards;}
@keyframes spark{0%{transform:scale(1);opacity:1;}
100%{transform:scale(3);opacity:0;}}`,
    js: `const container=document.querySelector('.spark-container');
document.querySelector('.spark-btn').addEventListener('mousemove',e=>{
  const s=document.createElement('span');
  s.className='spark';
  s.style.left=e.clientX+'px';
  s.style.top=e.clientY+'px';
  container.appendChild(s);
  setTimeout(()=>s.remove(),600);
});`,
    category: "js",
  },

  {
    id: "slide-panel",
    title: "Slide-in Panel",
    description: "Side panel slides in with JS toggle",
    language: "HTML / CSS / JS",
    html: `<button class="open-panel">≡</button><div class="panel">Welcome To Creatx</div>`,
    css: `.panel{position:fixed;right:-200px;top:0;width:100px;height:100vh;
background:#1f2937;color:white;display:flex;align-items:center;
justify-content:center;transition:.3s;}
.panel.show{right:0;}
.open-panel{padding:8px 14px;background:#06b6d4;color:white;border:none;}`,
    js: `document.querySelector('.open-panel').onclick=()=>{
 document.querySelector('.panel').classList.toggle('show');
};`,
    category: "js",
  },

  {
    id: "floating-emojis",
    title: "Floating Reaction Emojis",
    description: "Emojis float upward on click",
    language: "HTML / CSS / JS",
    html: `<div class="emoji-box"></div><button class="emoji-btn">React</button>`,
    css: `.emoji{position:absolute;font-size:1.6rem;
animation:floatUp 1.8s forwards;}
@keyframes floatUp{to{transform:translateY(-80px);opacity:0;}}`,
    js: `document.querySelector('.emoji-btn').onclick=()=>{
  const e=document.createElement('div');
  e.className='emoji';
  e.textContent=['❤️','🔥','🎉','✨'][Math.floor(Math.random()*4)];
  e.style.left=100+'px';
  e.style.top=200+'px';
  document.body.appendChild(e);
  setTimeout(()=>e.remove(),1800);
};`,
    category: "js",
  },
  {
    id: "fade-content",
    title: "Fade Content",
    description: "Fade-in animation on load",
    language: "HTML / CSS",
    html: `<div class="fade-box">Fade Content</div>`,
    css: `.fade-box{
  padding:20px;
  border-radius:12px;
  background:linear-gradient(135deg,#06b6d4,#3b82f6);
  color:white;
  font-weight:600;
  animation:fadeIn 4s ease-out forwards infinite;
}
@keyframes fadeIn{
  from{opacity:0;transform:translateY(20px);}
  to{opacity:1;transform:none;}
}`,
    js: "",
    category: "css",
  },

  {
    id: "tilted-card",
    title: "Tilted Card",
    description: "3D tilt card following cursor",
    language: "HTML / CSS / JS",
    html: `<div class="tilt-card">Tilt Me</div>`,
    css: `.tilt-card{
  width:220px;
  height:140px;
  border-radius:16px;
  background:linear-gradient(135deg,#8b5cf6,#06b6d4);
  color:white;
  display:flex;
  align-items:center;
  justify-content:center;
  font-weight:700;
  transition:transform .15s ease-out;
  transform-style:preserve-3d;
}`,
    js: `const card=document.querySelector('.tilt-card');
card.addEventListener('mousemove',e=>{
  const r=card.getBoundingClientRect();
  const x=e.clientX-r.left;
  const y=e.clientY-r.top;
  const rx=-(y/r.height-0.5)*20;
  const ry=(x/r.width-0.5)*20;
  card.style.transform=\`rotateX(\${rx}deg) rotateY(\${ry}deg)\`;
});
card.addEventListener('mouseleave',()=>{
  card.style.transform='rotateX(0) rotateY(0)';
});`,
    category: "js",
  },

  {
    id: "animated-list",
    title: "Animated List",
    description: "Staggered list reveal",
    language: "HTML / CSS",
    html: `<ul class="anim-list">
  <li style="--d:0s">Design</li>
  <li style="--d:.15s">Develop</li>
  <li style="--d:.3s">Deploy</li>
</ul>`,
    css: `.anim-list{list-style:none;padding:0;}
.anim-list li{
  margin-bottom:10px;
  padding:10px 14px;
  background:#111827;
  color:white;
  border-radius:8px;
  opacity:0;
  animation:slideUp 4s forwards infinite;
  animation-delay:var(--d);
}
@keyframes slideUp{
  from{opacity:0;transform:translateY(10px);}
  to{opacity:1;transform:none;}
}`,
    js: "",
    category: "css",
  },

  {
    id: "glass-card",
    title: "Glass Card",
    description: "Glassmorphism hover animation",
    language: "HTML / CSS",
    html: `<div class="glass-card">Glass Card</div>`,
    css: `.glass-card{
  width:240px;
  height:140px;
  backdrop-filter:blur(14px);
  background:rgba(255,255,255,.12);
  border-radius:16px;
  border:1px solid rgba(255,255,255,.25);
  display:flex;
  align-items:center;
  justify-content:center;
  color:white;
  font-weight:600;
  transition:transform .3s ease;
}
.glass-card:hover{
  transform:scale(1.06);
}`,
    js: "",
    category: "css",
  },
  {
    id: "liquid-button",
    title: "Liquid Fill Button",
    description: "Button fills with liquid animation on hover",
    language: "HTML / CSS",
    html: `<button class="liquid-btn"><span>Hover</span></button>`,
    css: `.liquid-btn{position:relative;padding:12px 28px;border:2px solid #06b6d4;background:transparent;color:#06b6d4;border-radius:50px;font-weight:600;overflow:hidden;transition:color .4s;}.liquid-btn::before{content:"";position:absolute;bottom:0;left:0;width:100%;height:0;background:#06b6d4;transition:height .4s cubic-bezier(.4,0,.2,1);z-index:-1;}.liquid-btn:hover{color:white;}.liquid-btn:hover::before{height:100%;}.liquid-btn span{position:relative;z-index:1;}`,
    js: "",
    category: "css",
  },
  {
    id: "parallax-cards",
    title: "Parallax Layer Cards",
    description: "Multi-layer parallax effect on mouse move",
    language: "HTML / CSS / JS",
    html: `<div class="parallax-wrap"><div class="layer layer-1"></div><div class="layer layer-2"></div><div class="layer layer-3"></div></div>`,
    css: `.parallax-wrap{position:relative;width:280px;height:200px;overflow:hidden;border-radius:16px;}.layer{position:absolute;width:100%;height:100%;transition:transform .2s ease-out;}.layer-1{background:linear-gradient(135deg,#667eea,#764ba2);}.layer-2{background:radial-gradient(circle at 30% 30%,rgba(255,255,255,.3),transparent);}.layer-3{background:radial-gradient(circle at 70% 70%,rgba(6,182,212,.4),transparent);}`,
    js: `const wrap=document.querySelector('.parallax-wrap');const layers=document.querySelectorAll('.layer');wrap.addEventListener('mousemove',e=>{const rect=wrap.getBoundingClientRect();const x=(e.clientX-rect.left)/rect.width-.5;const y=(e.clientY-rect.top)/rect.height-.5;layers.forEach((l,i)=>{const depth=(i+1)*10;l.style.transform=\`translate(\${x*depth}px,\${y*depth}px)\`;});});wrap.addEventListener('mouseleave',()=>{layers.forEach(l=>l.style.transform='translate(0,0)');});`,
    category: "js",
  },
  {
    id: "magnetic-button",
    title: "Magnetic Button",
    description: "Button follows cursor when nearby",
    language: "HTML / CSS / JS",
    html: `<div class="mag-wrap"><button class="mag-btn">Magnetic</button></div>`,
    css: `.mag-wrap{display:flex;align-items:center;justify-content:center;height:200px;}.mag-btn{padding:12px 24px;background:linear-gradient(135deg,#f093fb,#f5576c);border:none;border-radius:10px;color:white;font-weight:700;transition:transform .15s ease;}`,
    js: `const btn=document.querySelector('.mag-btn');const wrap=document.querySelector('.mag-wrap');wrap.addEventListener('mousemove',e=>{const rect=btn.getBoundingClientRect();const x=e.clientX-(rect.left+rect.width/2);const y=e.clientY-(rect.top+rect.height/2);const dist=Math.sqrt(x*x+y*y);if(dist<120){const pull=Math.max(0,1-dist/120);btn.style.transform=\`translate(\${x*pull*.4}px,\${y*pull*.4}px)\`;}else{btn.style.transform='translate(0,0)';}});wrap.addEventListener('mouseleave',()=>{btn.style.transform='translate(0,0)';});`,
    category: "js",
  },
  {
    id: "reveal-text",
    title: "Text Scramble Reveal",
    description: "Matrix-style text scramble looping effect",
    language: "HTML / CSS / JS",
    html: `<div class="scramble">CREATX</div>`,
    css: `.scramble{font-size:2.4rem;font-weight:800;font-family:monospace;color:#10b981;letter-spacing:4px;}`,
    js: `const chars='!@#$%^&*()_+-=[]{}|;:,.<>?';const text='CREATX';const el=document.querySelector('.scramble');function scramble(){let frame=0;const interval=setInterval(()=>{if(frame>30){el.textContent=text;clearInterval(interval);setTimeout(scramble,2000);return;}let str='';for(let i=0;i<text.length;i++){if(frame/30>i/text.length)str+=text[i];else str+=chars[Math.floor(Math.random()*chars.length)];}el.textContent=str;frame++;},60);}scramble();`,
    category: "js",
  },
  {
    id: "aurora-bg",
    title: "Aurora Background",
    description: "Animated aurora borealis gradient",
    language: "HTML / CSS",
    html: `<div class="aurora"></div>`,
    css: `.aurora{width:100%;height:200px;background:linear-gradient(45deg,#667eea,#764ba2,#f093fb,#4facfe);background-size:400% 400%;animation:aurora 8s ease infinite;border-radius:12px;}@keyframes aurora{0%{background-position:0% 50%;}50%{background-position:100% 50%;}100%{background-position:0% 50%;}}`,
    js: "",
    category: "css",
  },
  {
    id: "counter-up",
    title: "Count Up Animation",
    description: "Animated number counter looping infinitely",
    language: "HTML / CSS / JS",
    html: `<div class="counter" data-target="1247">0</div>`,
    css: `.counter{font-size:3rem;font-weight:800;color:#3b82f6;text-align:center;}`,
    js: `const counter=document.querySelector('.counter');const target=+counter.getAttribute('data-target');const increment=target/100;let current=0;const update=()=>{current+=increment;if(current<target){counter.textContent=Math.ceil(current);requestAnimationFrame(update);}else{counter.textContent=target;setTimeout(()=>{current=0;counter.textContent='0';update();},1500);}};update();`,
    category: "js",
  },
  {
    id: "breathing-circle",
    title: "Breathing Circle",
    description: "Calm breathing meditation animation",
    language: "HTML / CSS",
    html: `<div class="breathe"></div>`,
    css: `.breathe{width:120px;height:120px;border-radius:50%;background:radial-gradient(circle,#06b6d4,#3b82f6);animation:breathe 4s ease-in-out infinite;}@keyframes breathe{0%,100%{transform:scale(1);opacity:.6;}50%{transform:scale(1.3);opacity:1;}}`,
    js: "",
    category: "css",
  },
  {
    id: "ink-spread",
    title: "Ink Spread Effect",
    description: "Ink spreading transition on click",
    language: "HTML / CSS / JS",
    html: `<div class="ink-wrap"><button class="ink-trigger">Spread</button><div class="ink-overlay"></div></div>`,
    css: `.ink-wrap{position:relative;display:flex;align-items:center;justify-content:center;height:200px;}.ink-trigger{padding:10px 20px;background:#111827;color:white;border:none;border-radius:8px;font-weight:600;z-index:2;}.ink-overlay{position:absolute;width:0;height:0;border-radius:50%;background:#06b6d4;transform:translate(-50%,-50%);pointer-events:none;transition:all .8s cubic-bezier(.4,0,.2,1);}`,
    js: `document.querySelector('.ink-trigger').addEventListener('click',function(e){const overlay=document.querySelector('.ink-overlay');const rect=this.getBoundingClientRect();overlay.style.left=(rect.left+rect.width/2)+'px';overlay.style.top=(rect.top+rect.height/2)+'px';overlay.style.width='0';overlay.style.height='0';setTimeout(()=>{overlay.style.width='600px';overlay.style.height='600px';},10);setTimeout(()=>{overlay.style.width='0';overlay.style.height='0';},1000);});`,
    category: "js",
  },
  {
    id: "split-flap",
    title: "Split Flap Display",
    description: "Retro split-flap board animation looping",
    language: "HTML / CSS / JS",
    html: `<div class="flap-board"><div class="flap">0</div></div>`,
    css: `.flap-board{display:flex;justify-content:center;height:160px;align-items:center;}.flap{width:60px;height:80px;background:#111827;color:#10b981;font-size:2.4rem;font-weight:800;display:flex;align-items:center;justify-content:center;border-radius:8px;position:relative;overflow:hidden;transition:transform .15s;}.flap::before{content:"";position:absolute;top:50%;left:0;right:0;height:2px;background:#000;z-index:1;}`,
    js: `const flap=document.querySelector('.flap');let num=0;setInterval(()=>{flap.style.transform='rotateX(90deg)';setTimeout(()=>{num=(num+1)%10;flap.textContent=num;flap.style.transform='rotateX(0)';},150);},2000);`,
    category: "js",
  },
  {
    id: "gradient-border",
    title: "Animated Gradient Border",
    description: "Rotating gradient border effect",
    language: "HTML / CSS",
    html: `<div class="grad-border"><div class="grad-content">Premium</div></div>`,
    css: `.grad-border{padding:3px;background:linear-gradient(45deg,#f093fb,#f5576c,#4facfe,#667eea);background-size:300% 300%;animation:gradRotate 3s linear infinite;border-radius:12px;display:inline-block;}.grad-content{background:#0f172a;color:white;padding:12px 24px;border-radius:10px;font-weight:700;}@keyframes gradRotate{to{background-position:300% 300%;}}`,
    js: "",
    category: "css",
  },
  {
    id: "bounce-in",
    title: "Bounce In Elements",
    description: "Elements bounce in sequentially and repeat",
    language: "HTML / CSS",
    html: `<div class="bounce-wrap"><div class="box" style="--i:0"></div><div class="box" style="--i:1"></div><div class="box" style="--i:2"></div><div class="box" style="--i:3"></div></div>`,
    css: `.bounce-wrap{display:flex;gap:16px;justify-content:center;height:180px;align-items:center;}.box{width:60px;height:60px;background:linear-gradient(135deg,#667eea,#764ba2);border-radius:10px;opacity:0;animation:bounceIn 4s cubic-bezier(.68,-.55,.265,1.55) infinite;animation-delay:calc(var(--i)*.10s);}@keyframes bounceIn{0%,80%{opacity:0;transform:scale(0)translateY(-40px);}20%,60%{opacity:1;transform:scale(1)translateY(0);}}`,
    js: "",
    category: "css",
  },
  {
    id: "slide-menu",
    title: "Sliding Menu Items",
    description: "Menu slides in with stagger repeatedly",
    language: "HTML / CSS",
    html: `<ul class="slide-menu"><li style="--i:0">Home</li><li style="--i:1">About</li><li style="--i:2">Services</li><li style="--i:3">Contact</li></ul>`,
    css: `.slide-menu{list-style:none;padding:0;}.slide-menu li{padding:12px 20px;background:#111827;color:white;margin-bottom:8px;border-radius:8px;animation:slideIn 5s ease-in-out infinite;animation-delay:calc(var(--i)*.1s);}@keyframes slideIn{0%,80%{transform:translateX(-100%);opacity:0;}15%,65%{transform:translateX(0);opacity:1;}}`,
    js: "",
    category: "css",
  },
  {
    id: "noise-text",
    title: "Glitch Noise Text",
    description: "Glitchy text effect with color shift",
    language: "HTML / CSS",
    html: `<div class="glitch" data-text="GLITCH">GLITCH</div>`,
    css: `.glitch{position:relative;font-size:2.4rem;font-weight:800;color:#fff;}.glitch::before,.glitch::after{content:attr(data-text);position:absolute;left:0;top:0;}.glitch::before{animation:glitch1 .4s infinite;color:#0ff;}.glitch::after{animation:glitch2 .4s infinite;color:#f0f;}@keyframes glitch1{0%{clip-path:inset(40% 0 60% 0);transform:translate(-2px,2px);}100%{clip-path:inset(20% 0 80% 0);transform:translate(2px,-2px);}}@keyframes glitch2{0%{clip-path:inset(60% 0 40% 0);transform:translate(2px,-2px);}100%{clip-path:inset(80% 0 20% 0);transform:translate(-2px,2px);}}`,
    js: "",
    category: "css",
  },
  {
    id: "progress-ring",
    title: "Circular Progress Ring",
    description: "Animated SVG circular progress looping",
    language: "HTML / CSS / JS",
    html: `<svg class="progress-ring" width="120" height="120"><circle class="ring-bg" cx="60" cy="60" r="52" /><circle class="ring-progress" cx="60" cy="60" r="52" /></svg>`,
    css: `.progress-ring{transform:rotate(-90deg);}.ring-bg{fill:none;stroke:#e5e7eb;stroke-width:8;}.ring-progress{fill:none;stroke:#06b6d4;stroke-width:8;stroke-linecap:round;stroke-dasharray:327;stroke-dashoffset:327;animation:progress 2s ease-in-out infinite;}@keyframes progress{0%,100%{stroke-dashoffset:327;}50%{stroke-dashoffset:82;}}`,
    js: "",
    category: "css",
  },
  {
    id: "hover-lift",
    title: "Hover Lift Card",
    description: "Card lifts with shadow on hover",
    language: "HTML / CSS",
    html: `<div class="lift-card">Hover Card</div>`,
    css: `.lift-card{width:200px;height:120px;background:linear-gradient(135deg,#667eea,#764ba2);color:white;border-radius:16px;display:flex;align-items:center;justify-content:center;font-weight:700;transition:transform .3s,box-shadow .3s;box-shadow:0 4px 6px rgba(0,0,0,.1);}.lift-card:hover{transform:translateY(-12px);box-shadow:0 20px 40px rgba(102,126,234,.4);}`,
    js: "",
    category: "css",
  },
  {
    id: "shake-alert",
    title: "Shake Alert",
    description: "Alert box shakes to grab attention",
    language: "HTML / CSS / JS",
    html: `<button class="shake-btn">Show Alert</button><div class="alert hidden">⚠️ Alert!</div>`,
    css: `.alert{padding:12px 20px;background:#ef4444;color:white;border-radius:8px;font-weight:600;margin-top:12px;}.alert.hidden{display:none;}.alert.shake{animation:shake .4s;}@keyframes shake{0%,100%{transform:translateX(0);}25%{transform:translateX(-10px);}75%{transform:translateX(10px);}}`,
    js: `document.querySelector('.shake-btn').onclick=()=>{const alert=document.querySelector('.alert');alert.classList.remove('hidden');alert.classList.add('shake');setTimeout(()=>alert.classList.remove('shake'),400);};`,
    category: "js",
  },
  {
    id: "text-wave",
    title: "Wave Text Animation",
    description: "Letters wave up and down",
    language: "HTML / CSS",
    html: `<div class="wave-text"><span style="--i:0">W</span><span style="--i:1">A</span><span style="--i:2">V</span><span style="--i:3">E</span></div>`,
    css: `.wave-text{display:flex;gap:4px;font-size:2rem;font-weight:800;justify-content:center;}.wave-text span{display:inline-block;animation:wave 1s ease-in-out infinite;animation-delay:calc(var(--i)*.1s);}@keyframes wave{0%,100%{transform:translateY(0);}50%{transform:translateY(-12px);}}`,
    js: "",
    category: "css",
  },
  {
    id: "toggle-switch",
    title: "Animated Toggle Switch",
    description: "Smooth toggle with transition",
    language: "HTML / CSS / JS",
    html: `<label class="toggle"><input type="checkbox" class="toggle-input"><span class="toggle-slider"></span></label>`,
    css: `.toggle{position:relative;display:inline-block;width:54px;height:28px;}.toggle-input{opacity:0;width:0;height:0;}.toggle-slider{position:absolute;cursor:pointer;inset:0;background:#ccc;border-radius:28px;transition:.3s;}.toggle-slider::before{content:"";position:absolute;height:20px;width:20px;left:4px;bottom:4px;background:white;border-radius:50%;transition:.3s;}.toggle-input:checked+.toggle-slider{background:#06b6d4;}.toggle-input:checked+.toggle-slider::before{transform:translateX(26px);}`,
    js: "",
    category: "css",
  },
  {
    id: "zoom-image",
    title: "Image Zoom Hover",
    description: "Image zooms smoothly on hover",
    language: "HTML / CSS",
    html: `<div class="zoom-wrap"><div class="zoom-img"></div></div>`,
    css: `.zoom-wrap{width:240px;height:160px;overflow:hidden;border-radius:12px;}.zoom-img{width:100%;height:100%;background:linear-gradient(135deg,#667eea,#764ba2);transition:transform .4s ease;}.zoom-wrap:hover .zoom-img{transform:scale(1.15);}`,
    js: "",
    category: "css",
  },
  {
    id: "particles-float",
    title: "Floating Particles",
    description: "Mesmerizing floating particle system",
    language: "HTML / CSS",
    html: `<div class="particles"><span style="--x:20%;--y:30%;--d:8s"></span><span style="--x:60%;--y:70%;--d:6s"></span><span style="--x:80%;--y:20%;--d:10s"></span><span style="--x:30%;--y:80%;--d:7s"></span><span style="--x:70%;--y:40%;--d:9s"></span></div>`,
    css: `.particles{position:relative;width:100%;height:200px;background:linear-gradient(135deg,#1e1e2e,#2d2d44);border-radius:16px;overflow:hidden;}.particles span{position:absolute;width:12px;height:12px;background:rgba(99,102,241,0.6);border-radius:50%;left:var(--x);top:var(--y);animation:particleFloat var(--d) infinite ease-in-out;box-shadow:0 0 20px rgba(99,102,241,0.8);}@keyframes particleFloat{0%,100%{transform:translate(0,0) scale(1);opacity:0.4;}50%{transform:translate(30px,-40px) scale(1.5);opacity:1;}}`,
    js: "",
    category: "css",
  },
  {
    id: "neon-pulse",
    title: "Neon Pulse Border",
    description: "Pulsing neon border with glow",
    language: "HTML / CSS",
    html: `<div class="neon-box">Premium</div>`,
    css: `.neon-box{width:200px;height:120px;display:flex;align-items:center;justify-content:center;color:white;font-weight:700;font-size:1.4rem;background:#0f0f23;border:3px solid #6366f1;border-radius:12px;box-shadow:0 0 20px rgba(99,102,241,0.5),inset 0 0 20px rgba(99,102,241,0.1);animation:neonPulse 2s infinite ease-in-out;}@keyframes neonPulse{0%,100%{border-color:#6366f1;box-shadow:0 0 20px rgba(99,102,241,0.5),inset 0 0 20px rgba(99,102,241,0.1);}50%{border-color:#06b6d4;box-shadow:0 0 40px rgba(6,182,212,1),inset 0 0 30px rgba(6,182,212,0.3);}}`,
    js: "",
    category: "css",
  },
  {
    id: "radar-scan",
    title: "Radar Scan Effect",
    description: "Rotating radar sweep animation",
    language: "HTML / CSS",
    html: `<div class="radar"><div class="sweep"></div><div class="dot" style="--x:60%;--y:40%"></div><div class="dot" style="--x:30%;--y:70%"></div><div class="dot" style="--x:75%;--y:25%"></div></div>`,
    css: `.radar{position:relative;width:160px;height:160px;background:#0a0a0f;border-radius:50%;border:2px solid #06b6d4;box-shadow:0 0 30px rgba(6,182,212,0.3);}.sweep{position:absolute;width:100%;height:100%;background:conic-gradient(from 0deg,transparent,rgba(6,182,212,0.4),transparent 90deg);border-radius:50%;animation:radarSweep 3s linear infinite;}.dot{position:absolute;width:8px;height:8px;background:#06b6d4;border-radius:50%;left:var(--x);top:var(--y);box-shadow:0 0 10px #06b6d4;animation:dotPulse 2s infinite ease-in-out;}@keyframes radarSweep{to{transform:rotate(360deg);}}@keyframes dotPulse{0%,100%{opacity:0.4;transform:scale(1);}50%{opacity:1;transform:scale(1.5);}}`,
    js: "",
    category: "css",
  },
  {
    id: "matrix-rain",
    title: "Matrix Rain Effect",
    description: "Falling matrix code animation",
    language: "HTML / CSS / JS",
    html: `<div class="matrix-wrap"><canvas class="matrix-canvas" width="280" height="200"></canvas></div>`,
    css: `.matrix-wrap{background:#000;border-radius:12px;overflow:hidden;}.matrix-canvas{display:block;}`,
    js: `const canvas=document.querySelector('.matrix-canvas');const ctx=canvas.getContext('2d');const chars='01アイウエオカキクケコサシスセソ';const fontSize=14;const columns=canvas.width/fontSize;const drops=Array(Math.floor(columns)).fill(1);function draw(){ctx.fillStyle='rgba(0,0,0,0.05)';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.fillStyle='#0f0';ctx.font=fontSize+'px monospace';for(let i=0;i<drops.length;i++){const text=chars[Math.floor(Math.random()*chars.length)];ctx.fillText(text,i*fontSize,drops[i]*fontSize);if(drops[i]*fontSize>canvas.height&&Math.random()>0.975)drops[i]=0;drops[i]++;}}setInterval(draw,33);`,
    category: "js",
  },
  {
    id: "cyber-grid",
    title: "Cyberpunk Grid",
    description: "Animated neon grid background",
    language: "HTML / CSS",
    html: `<div class="cyber-grid"></div>`,
    css: `.cyber-grid{width:100%;height:200px;background-color:#0a0a0f;background-image:linear-gradient(0deg,transparent 24%,rgba(99,102,241,.3) 25%,rgba(99,102,241,.3) 26%,transparent 27%,transparent 74%,rgba(99,102,241,.3) 75%,rgba(99,102,241,.3) 76%,transparent 77%,transparent),linear-gradient(90deg,transparent 24%,rgba(6,182,212,.3) 25%,rgba(6,182,212,.3) 26%,transparent 27%,transparent 74%,rgba(6,182,212,.3) 75%,rgba(6,182,212,.3) 76%,transparent 77%,transparent);background-size:50px 50px;animation:gridMove 3s linear infinite;border-radius:12px;box-shadow:inset 0 0 50px rgba(99,102,241,0.2);}@keyframes gridMove{to{background-position:50px 50px;}}`,
    js: "",
    category: "css",
  },
  {
    id: "loading-bars",
    title: "Equalizer Loading Bars",
    description: "Dynamic equalizer-style loader",
    language: "HTML / CSS",
    html: `<div class="equalizer"><span style="--i:0"></span><span style="--i:1"></span><span style="--i:2"></span><span style="--i:3"></span><span style="--i:4"></span><span style="--i:5"></span><span style="--i:6"></span></div>`,
    css: `.equalizer{display:flex;gap:8px;align-items:flex-end;height:140px;justify-content:center;}.equalizer span{width:10px;background:linear-gradient(180deg,#06b6d4,#3b82f6);border-radius:4px 4px 0 0;animation:equalize 1.2s ease-in-out infinite;animation-delay:calc(var(--i)*0.1s);}@keyframes equalize{0%,100%{height:20px;}50%{height:100px;}}`,
    js: "",
    category: "css",
  },
  {
    id: "typing-cursor",
    title: "Typing Cursor Effect",
    description: "Realistic typing with blinking cursor",
    language: "HTML / CSS / JS",
    html: `<div class="typing-wrap"><span class="typed-text"></span><span class="cursor">|</span></div>`,
    css: `.typing-wrap{font-size:1.4rem;font-weight:600;color:#06b6d4;font-family:monospace;min-height:60px;display:flex;align-items:center;justify-content:center;}.cursor{animation:blink 0.7s infinite;}@keyframes blink{0%,49%{opacity:1;}50%,100%{opacity:0;}}`,
    js: `const texts=["Building the future...","Creating magic...","Coding dreams...","Design systems..."];let textIndex=0;let charIndex=0;let isDeleting=false;const typedEl=document.querySelector('.typed-text');function type(){const current=texts[textIndex];if(!isDeleting&&charIndex<current.length){typedEl.textContent=current.slice(0,++charIndex);setTimeout(type,100);}else if(isDeleting&&charIndex>0){typedEl.textContent=current.slice(0,--charIndex);setTimeout(type,50);}else{isDeleting=!isDeleting;if(!isDeleting){textIndex=(textIndex+1)%texts.length;}setTimeout(type,isDeleting?500:1000);}}type();`,
    category: "js",
  },
  {
    id: "scan-line",
    title: "CRT Scan Line Effect",
    description: "Retro terminal scan line animation",
    language: "HTML / CSS",
    html: `<div class="crt-screen"><div class="scanline"></div><div class="crt-text">> SYSTEM READY_</div></div>`,
    css: `.crt-screen{position:relative;width:280px;height:160px;background:#0a0f0a;border-radius:8px;display:flex;align-items:center;justify-content:center;overflow:hidden;box-shadow:inset 0 0 30px rgba(0,255,0,0.1);}.crt-text{color:#0f0;font-family:monospace;font-size:1.2rem;z-index:1;text-shadow:0 0 10px #0f0;}.scanline{position:absolute;width:100%;height:3px;background:rgba(0,255,0,0.3);box-shadow:0 0 10px rgba(0,255,0,0.5);animation:scan 4s linear infinite;}@keyframes scan{0%{top:-3px;}100%{top:100%;}}`,
    js: "",
    category: "css",
  },
  {
    id: "bubble-pop",
    title: "Bubble Pop Animation",
    description: "Interactive bubbles that pop and regenerate",
    language: "HTML / CSS / JS",
    html: `<div class="bubble-container"></div>`,
    css: `.bubble-container{position:relative;width:100%;height:200px;background:linear-gradient(135deg,#667eea,#764ba2);border-radius:16px;overflow:hidden;}.bubble{position:absolute;border-radius:50%;background:radial-gradient(circle at 30% 30%,rgba(255,255,255,0.8),rgba(255,255,255,0.3));animation:rise 4s ease-in infinite;cursor:pointer;}.bubble:hover{animation-play-state:paused;}@keyframes rise{0%{transform:translateY(0) scale(0);opacity:0;}10%{opacity:1;}90%{opacity:1;}100%{transform:translateY(-250px) scale(1);opacity:0;}}`,
    js: `const container=document.querySelector('.bubble-container');function createBubble(){const bubble=document.createElement('div');bubble.className='bubble';const size=Math.random()*40+20;bubble.style.width=size+'px';bubble.style.height=size+'px';bubble.style.left=Math.random()*100+'%';bubble.style.bottom='-50px';bubble.style.animationDuration=(Math.random()*2+3)+'s';container.appendChild(bubble);bubble.addEventListener('click',()=>bubble.remove());setTimeout(()=>bubble.remove(),5000);}setInterval(createBubble,800);createBubble();`,
    category: "js",
  },
  {
    id: "ribbon-wave",
    title: "Flowing Ribbon Wave",
    description: "Smooth ribbon wave animation",
    language: "HTML / CSS",
    html: `<div class="ribbon-wave"></div>`,
    css: `.ribbon-wave{width:100%;height:120px;background:linear-gradient(90deg,#667eea,#764ba2,#f093fb,#667eea);background-size:200% 100%;position:relative;animation:flowRibbon 3s linear infinite;}.ribbon-wave::before,.ribbon-wave::after{content:"";position:absolute;width:100%;height:100%;background:inherit;}.ribbon-wave::before{top:-10px;opacity:0.5;animation:waveShape 2s ease-in-out infinite;}.ribbon-wave::after{top:10px;opacity:0.3;animation:waveShape 2s ease-in-out infinite reverse;}@keyframes flowRibbon{to{background-position:200% 0;}}@keyframes waveShape{0%,100%{clip-path:polygon(0 0,100% 0,100% 100%,0 100%);}50%{clip-path:polygon(0 20%,100% 0,100% 80%,0 100%);}}`,
    js: "",
    category: "css",
  },
  {
    id: "pixel-transition",
    title: "Pixel Dissolve Effect",
    description: "Pixelated transition animation",
    language: "HTML / CSS",
    html: `<div class="pixel-box"><div class="pixel-content">PIXEL</div></div>`,
    css: `.pixel-box{width:200px;height:140px;background:#111827;border-radius:12px;overflow:hidden;position:relative;}.pixel-content{width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:white;font-weight:800;font-size:1.6rem;background:linear-gradient(135deg,#06b6d4,#3b82f6);animation:pixelate 3s infinite;}@keyframes pixelate{0%,100%{filter:blur(0px);opacity:1;}25%{filter:blur(0px);opacity:1;}40%{filter:blur(8px);opacity:0.6;}60%{filter:blur(8px);opacity:0.6;}75%{filter:blur(0px);opacity:1;}}`,
    js: "",
    category: "css",
  },
  {
    id: "orbit-loader",
    title: "Planet Orbit Loader",
    description: "Orbital rotation loading animation",
    language: "HTML / CSS",
    html: `<div class="orbit-wrap"><div class="orbit-center"></div><div class="orbit-path"><div class="orbit-dot"></div></div><div class="orbit-path orbit-2"><div class="orbit-dot"></div></div></div>`,
    css: `.orbit-wrap{position:relative;width:140px;height:140px;}.orbit-center{position:absolute;width:20px;height:20px;background:linear-gradient(135deg,orange,orange);border-radius:50%;top:50%;left:50%;transform:translate(-50%,-50%);box-shadow:0 0 20px rgba(102,126,234,0.8);}.orbit-path{position:absolute;width:100%;height:100%;border:2px solid orange;border-radius:50%;animation:orbit 3s linear infinite;}.orbit-2{animation-duration:2s;width:70%;height:70%;top:15%;left:15%;}.orbit-dot{position:absolute;width:12px;height:12px;background:orange;border-radius:50%;top:0;left:50%;transform:translateX(-50%);box-shadow:0 0 10px orange;}@keyframes orbit{to{transform:rotate(360deg);}}`,
    js: "",
    category: "css",
  },
  {
    id: "flip-counter",
    title: "Flip Number Counter",
    description: "Mechanical flip counter animation",
    language: "HTML / CSS / JS",
    html: `<div class="flip-counter"><div class="flip-digit">0</div></div>`,
    css: `.flip-counter{perspective:400px;height:80px;display:flex;justify-content:center;align-items:center;}.flip-digit{width:60px;height:80px;background:linear-gradient(180deg,#1f2937 50%,#111827 50%);color:#06b6d4;font-size:2.4rem;font-weight:800;display:flex;align-items:center;justify-content:center;border-radius:8px;position:relative;transform-style:preserve-3d;box-shadow:0 2px 10px rgba(0,0,0,0.5);}.flip-digit::before{content:"";position:absolute;width:100%;height:2px;background:#000;top:50%;left:0;z-index:1;}`,
    js: `const digit=document.querySelector('.flip-digit');let count=0;setInterval(()=>{digit.style.transform='rotateX(90deg)';setTimeout(()=>{count=(count+1)%10;digit.textContent=count;digit.style.transform='rotateX(0deg)';},150);},2000);`,
    category: "js",
  },
  {
    id: "aurora-wave",
    title: "Aurora Wave Effect",
    description: "Northern lights wave animation",
    language: "HTML / CSS",
    html: `<div class="aurora-container"><div class="aurora-wave"></div><div class="aurora-wave wave-2"></div><div class="aurora-wave wave-3"></div></div>`,
    css: `.aurora-container{position:relative;width:100%;height:180px;background:#0a0a14;border-radius:16px;overflow:hidden;}.aurora-wave{position:absolute;width:200%;height:100%;background:linear-gradient(90deg,transparent,rgba(102,126,234,0.4),rgba(139,92,246,0.4),transparent);animation:auroraShift 6s linear infinite;}.wave-2{background:linear-gradient(90deg,transparent,rgba(6,182,212,0.3),rgba(99,102,241,0.3),transparent);animation-duration:8s;animation-delay:-2s;}.wave-3{background:linear-gradient(90deg,transparent,rgba(244,63,94,0.2),rgba(251,146,60,0.2),transparent);animation-duration:10s;animation-delay:-4s;}@keyframes auroraShift{from{transform:translateX(-50%);}to{transform:translateX(0%);}}`,
    js: "",
    category: "css",
  },
];
