export const sampleCards = [
  {
    id: "pulse-loader",
    title: "Pulse Loader",
    description: "A simple pulsing loader using CSS animation",
    language: "HTML / CSS",
    html: `<div class="pulse-wrap"><div class="dot"></div></div>`,
    css: `.pulse-wrap{display:flex;align-items:center;justify-content:center;height:180px;}.dot{width:24px;height:24px;border-radius:50%;background:#06b6d4;animation:pulse 1s infinite ease-in-out;}@keyframes pulse{0%{transform:scale(1);opacity:1;}70%{transform:scale(1.8);opacity:0;}100%{opacity:0;}}`,
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
    id: "neon-text",
    title: "Neon Text Glow",
    description: "Pulsing neon glow effect for headings",
    language: "HTML / CSS",
    html: `<h1 class="neon">Creatx</h1>`,
    css: `.neon{font-size:2rem;font-weight:800;color:#fff;text-transform:uppercase;letter-spacing:2px;text-align:center;padding:40px 0;text-shadow:0 0 6px rgba(99,102,241,0.6),0 0 18px rgba(59,130,246,0.45);animation:neonPulse 2s infinite;}@keyframes neonPulse{0%{text-shadow:0 0 6px rgba(99,102,241,0.2);}50%{text-shadow:0 0 12px rgba(59,130,246,0.9),0 0 28px rgba(6,182,212,0.6);}100%{text-shadow:0 0 6px rgba(99,102,241,0.2);}}`,
    js: "",
    category: "css",
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
    css: `.wave{display:flex;gap:6px;align-items:end;height:120px;justify-content:center;}
.wave span{width:8px;height:20px;background:#3b82f6;border-radius:4px;animation:wave 1s infinite ease-in-out}
.wave span:nth-child(2){animation-delay:.1s;}
.wave span:nth-child(3){animation-delay:.2s;}
.wave span:nth-child(4){animation-delay:.3s;}
.wave span:nth-child(5){animation-delay:.4s;}
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
background:#06b6d4;animation:reveal 1.6s forwards;}
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
    id: "cursor-trail",
    title: "Cursor Trail Dots",
    description: "Dots follow cursor with a smooth delay",
    language: "HTML / CSS / JS",
    html: `<div class="trail"></div>`,
    css: `.trail{position:fixed;pointer-events:none;width:12px;height:12px;
background:#06b6d4;border-radius:50%;transform:translate(-50%,-50%);
transition:transform .12s ease-out;z-index:9999;}`,
    js: `const dot=document.querySelector('.trail');
window.addEventListener('mousemove',e=>{
 dot.style.transform=\`translate(\${e.clientX}px,\${e.clientY}px)\`;
});`,
    category: "js",
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
    html: `<button class="open-panel">Open</button><div class="panel">Hello!</div>`,
    css: `.panel{position:fixed;right:-200px;top:0;width:200px;height:100vh;
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
  animation:fadeIn .6s ease-out forwards;
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
  animation:slideUp .4s forwards;
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
];
