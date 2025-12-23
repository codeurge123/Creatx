// App.jsx
import { useState, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import CardGrid from "./components/CardGrid";
import CodeViewer from "./components/CodeViewer";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AnimationPanel from "./components/AnimationPanel";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Login from "./pages/Login.jsx";
import DocsShell from "./pages/DocsShell.jsx";
import {
  Heart,
  X,
  Copy,
  Check,
  Edit,
  Maximize2
} from 'lucide-react';
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css"; // VS Code dark-like
import "prismjs/components/prism-markup"; // HTML
import "prismjs/components/prism-css";
import "prismjs/components/prism-javascript";


const sampleCards = [
  {
    id: "pulse-loader",
    title: "Pulse Loader",
    description: "A simple pulsing loader using CSS animation",
    language: "HTML / CSS",
    html: `<div class="pulse-wrap"><div class="dot"></div></div>`,
    css: `.pulse-wrap{display:flex;align-items:center;justify-content:center;height:180px}.dot{width:24px;height:24px;border-radius:50%;background:#06b6d4;animation:pulse 1s infinite ease-in-out}@keyframes pulse{0%{transform:scale(1);opacity:1}70%{transform:scale(1.8);opacity:0}100%{opacity:0}}`,
    js: "",
    category: "css",
  },
  {
    id: "flip-card",
    title: "3D Flip Card",
    description: "Card flips on hover to show back side",
    language: "HTML / CSS",
    html: `<div class="flip-scene"><div class="flip-card"><div class="face front">Front</div><div class="face back">Back</div></div></div>`,
    css: `.flip-scene{perspective:1000px;display:flex;align-items:center;justify-content:center;height:220px}.flip-card{width:160px;height:100px;transform-style:preserve-3d;transition:transform .6s}.flip-scene:hover .flip-card{transform:rotateY(180deg)}.face{position:absolute;width:160px;height:100px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-weight:600}.front{background:linear-gradient(90deg,#3b82f6,#06b6d4);color:white}.back{background:#111827;color:#f8fafc;transform:rotateY(180deg)}`,
    js: "",
    category: "css",
  },
  {
    id: "float-bubbles",
    title: "Floating Bubbles",
    description: "Decorative floating bubbles animation",
    language: "HTML / CSS",
    html: `<div class="bubbles"><span></span><span></span><span></span></div>`,
    css: `.bubbles{position:relative;height:180px;display:flex;align-items:center;justify-content:center}.bubbles span{position:absolute;width:22px;height:22px;border-radius:50%;background:rgba(59,130,246,0.7);animation:rise 6s infinite ease-in}.bubbles span:nth-child(2){left:40%;background:rgba(6,182,212,0.6);width:14px;height:14px;animation-duration:5s}.bubbles span:nth-child(3){left:65%;background:rgba(99,102,241,0.55);width:18px;height:18px;animation-duration:7s}@keyframes rise{0%{transform:translateY(40px);opacity:0}50%{opacity:1}100%{transform:translateY(-140px);opacity:0}}`,
    js: "",
    category: "css",
  },
  {
    id: "fade-text",
    title: "Fade-in Text",
    description: "Staggered fade-in text effect",
    language: "HTML / CSS",
    html: `<div class="fade-wrap"><span>Design</span><span>Develop</span><span>Deploy</span></div>`,
    css: `.fade-wrap{display:flex;gap:12px;align-items:center;justify-content:center;height:160px}.fade-wrap span{opacity:0;transform:translateY(6px);animation:fadein .8s forwards;animation-delay:calc(var(--i)*0.15s)}.fade-wrap span:nth-child(1){--i:0}.fade-wrap span:nth-child(2){--i:1}.fade-wrap span:nth-child(3){--i:2}@keyframes fadein{to{opacity:1;transform:none}}`,
    js: "",
    category: "css",
  },
  {
    id: "bouncy-button",
    title: "Bouncy Button",
    description: "A playful bounce on hover for buttons",
    language: "HTML / CSS",
    html: `<button class="bouncy">Click me</button>`,
    css: `.bouncy{padding:.6rem 1.1rem;border-radius:999px;border:none;background:linear-gradient(90deg,#f97316,#f43f5e);color:white;font-weight:600;transition:transform .18s cubic-bezier(.2,.9,.3,1)}.bouncy:hover{transform:translateY(-6px) scale(1.02)}.bouncy:active{transform:translateY(0) scale(.98)}`,
    js: "",
    category: "css",
  },
  {
    id: "ripple-effect",
    title: "Ripple Effect",
    description: "Click ripple using pure CSS + small JS",
    language: "HTML / CSS / JS",
    html: `<div class="ripple-wrap"><button class="ripple-btn">Tap</button></div>`,
    css: `.ripple-wrap{display:flex;align-items:center;justify-content:center;height:160px}.ripple-btn{position:relative;overflow:hidden;padding:.6rem 1rem;border-radius:10px;border:none;background:#111827;color:white}.ripple-btn span{position:absolute;border-radius:50%;transform:scale(0);background:rgba(255,255,255,0.35);animation:rip 600ms linear}.ripple-btn span.done{display:none;}@keyframes rip{to{transform:scale(4);opacity:0}}`,
    js: `document.querySelector('.ripple-btn').addEventListener('click',function(e){const r=document.createElement('span');const rect=this.getBoundingClientRect();const size=Math.max(rect.width,rect.height);r.style.width=r.style.height=size+'px';r.style.left=(e.clientX-rect.left-size/2)+'px';r.style.top=(e.clientY-rect.top-size/2)+'px';this.appendChild(r);setTimeout(()=>r.remove(),700);})`,
    category: "js",
  },
  {
    id: "morphing-shape",
    title: "Morphing Blob",
    description: "Smooth morphing SVG-like blob with CSS",
    language: "HTML / CSS",
    html: `<div class="blob"></div>`,
    css: `.blob{width:160px;height:160px;border-radius:40%;background:linear-gradient(135deg,#06b6d4,#3b82f6);animation:blob 4s infinite}@keyframes blob{0%{border-radius:40% 60% 40% 60%}33%{border-radius:60% 40% 60% 40%}66%{border-radius:50% 50% 30% 70%}100%{border-radius:40% 60% 40% 60%}}`,
    js: "",
    category: "css",
  },
  {
    id: "typewriter",
    title: "Typewriter Text",
    description: "Simple CSS + JS typewriter effect",
    language: "HTML / CSS / JS",
    html: `<div class="typewriter"><span class="text"></span></div>`,
    css: `.typewriter{height:60px;display:flex;align-items:center;justify-content:center}.typewriter .text{font-weight:600;color:#0ea5a4;font-family:monospace;font-size:1.1rem}`,
    js: `const t=["Hello.","I am Creatx.","Tiny animations."],el=document.querySelector('.text');let i=0,j=0;function tick(){if(i>=t.length)return;i< t.length&&(el.textContent=t[i].slice(0,++j));if(j===t[i].length){i++;j=0;setTimeout(tick,800)}else setTimeout(tick,120)}tick();`,
    category: "js",
  },
  {
    id: "clicker-game",
    title: "Clicker Game (JS)",
    description: "Simple clicker game: click to increase score",
    language: "HTML / CSS / JS",
    html: `<div class="clicker"><div class="score">0</div><div class="controls"><button class="btn">Click</button><button class="reset">Reset</button></div></div>`,
    css: `.clicker{display:flex;flex-direction:column;align-items:center;gap:12px;height:220px;justify-content:center}.clicker .score{font-size:2.4rem;font-weight:700;color:#111827;background:white;padding:8px 16px;border-radius:10px}.clicker .controls .btn,.clicker .controls .reset{margin:0 6px;padding:10px 14px;border-radius:8px;border:none;background:linear-gradient(90deg,#06b6d4,#3b82f6);color:white;cursor:pointer}`,
    js: `let score=0;const scoreEl=document.querySelector('.score');document.querySelector('.btn').addEventListener('click',()=>{score++;scoreEl.textContent=score});document.querySelector('.reset').addEventListener('click',()=>{score=0;scoreEl.textContent=score});`,
    category: "js",
  },
  {
    id: "neon-text",
    title: "Neon Text Glow",
    description: "Pulsing neon glow effect for headings",
    language: "HTML / CSS",
    html: `<h1 class="neon">Creatx</h1>`,
    css: `.neon{font-size:2rem;font-weight:800;color:#fff;text-transform:uppercase;letter-spacing:2px;text-align:center;padding:40px 0;text-shadow:0 0 6px rgba(99,102,241,0.6),0 0 18px rgba(59,130,246,0.45);animation:neonPulse 2s infinite}@keyframes neonPulse{0%{text-shadow:0 0 6px rgba(99,102,241,0.2)}50%{text-shadow:0 0 12px rgba(59,130,246,0.9),0 0 28px rgba(6,182,212,0.6)}100%{text-shadow:0 0 6px rgba(99,102,241,0.2)}}`,
    js: "",
    category: "css",
  },
  {
    id: "skeleton-loader",
    title: "Skeleton Loader",
    description: "Placeholder skeleton shimmer for loading content",
    language: "HTML / CSS",
    html: `<div class="skeleton-card"><div class="img"></div><div class="line short"></div><div class="line"></div></div>`,
    css: `.skeleton-card{width:260px;padding:16px;border-radius:8px;background:#f3f4f6;display:flex;flex-direction:column;gap:10px;align-items:flex-start}.skeleton-card .img{width:100%;height:120px;border-radius:6px;background:linear-gradient(90deg,#e5e7eb 25%,#f3f4f6 50%,#e5e7eb 75%);background-size:200% 100%;animation:shimmer 1.2s infinite}.skeleton-card .line{height:12px;width:100%;border-radius:6px;background:#e5e7eb}.skeleton-card .short{width:60%}@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}`,
    js: "",
    category: "css",
  },
  {
    id: "hover-underline",
    title: "Animated Underline Link",
    description: "Link with an elastic underline that grows on hover",
    language: "HTML / CSS",
    html: `<a class="underline" href="#">Explore</a>`,
    css: `.underline{position:relative;color:#0f172a;font-weight:600;text-decoration:none;padding-bottom:4px}.underline::after{content:"";position:absolute;left:0;bottom:0;height:3px;width:0;background:linear-gradient(90deg,#06b6d4,#3b82f6);border-radius:3px;transition:width .36s cubic-bezier(.2,.9,.3,1)}.underline:hover::after{width:100%}`,
    js: "",
    category: "css",
  },
  {
    id: "skew-carousel",
    title: "Skewed Card Carousel (CSS)",
    description: "Horizontal card strip with subtle skew and hover scale",
    language: "HTML / CSS",
    html: `<div class="skew-wrap"><div class="card">1</div><div class="card">2</div><div class="card">3</div></div>`,
    css: `.skew-wrap{display:flex;gap:14px;align-items:center;justify-content:center;height:180px;transform:skewY(-4deg)}.skew-wrap .card{width:140px;height:120px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-weight:700;background:linear-gradient(135deg,#06b6d4,#3b82f6);transform:skewY(4deg);transition:transform .32s ease,box-shadow .32s ease}.skew-wrap .card:hover{transform:skewY(4deg) scale(1.06);box-shadow:0 12px 30px rgba(2,6,23,0.2)}`,
    js: "",
    category: "css",
  },
  {
    id: "confetti-js",
    title: "Mini Confetti Burst",
    description: "Small confetti burst on button click (JS)",
    language: "HTML / CSS / JS",
    html: `<div class="confetti-wrap"><button class="confetti-btn">Celebrate</button></div>`,
    css: `.confetti-wrap{display:flex;align-items:center;justify-content:center;height:180px}.confetti-btn{padding:.6rem 1rem;border-radius:8px;border:none;background:#10b981;color:white;font-weight:700;cursor:pointer;position:relative;overflow:visible}`,
    js: `function burstConfetti(el){for(let i=0;i<30;i++){const p=document.createElement('span');p.style.position='absolute';p.style.width='8px';p.style.height='8px';p.style.background=['#f97316','#f43f5e','#06b6d4','#8b5cf6'][Math.floor(Math.random()*4)];p.style.left='50%';p.style.top='50%';p.style.opacity=1;p.style.transform='translate(-50%,-50%)';p.style.borderRadius='2px';el.appendChild(p);const vx=(Math.random()-0.5)*12;const vy=-Math.random()*12;const rot=(Math.random()-0.5)*720;const dur=600+Math.random()*600;requestAnimationFrame(()=>{p.animate([{transform:\`translate(-50%,-50%) translate(\${vx*0}px,\${vy*0}px) rotate(0deg)\` ,opacity:1},{transform:\`translate(-50%,-50%) translate(\${vx*10}px,\${vy*10}px) rotate(\${rot}deg)\`,opacity:0}],{duration:dur,easing:'cubic-bezier(.2,.9,.3,1)'}).onfinish=()=>p.remove()})}}document.querySelector('.confetti-btn').addEventListener('click',function(){burstConfetti(this)})`,
    category: "js",
  },
  {
    id: "wave-loader",
    title: "Wave Loader",
    description: "Bouncing wave bars animation",
    language: "HTML / CSS",
    html: `<div class="wave"><span></span><span></span><span></span><span></span><span></span></div>`,
    css: `.wave{display:flex;gap:6px;align-items:end;height:120px;justify-content:center}
.wave span{width:8px;height:20px;background:#3b82f6;border-radius:4px;animation:wave 1s infinite ease-in-out}
.wave span:nth-child(2){animation-delay:.1s}
.wave span:nth-child(3){animation-delay:.2s}
.wave span:nth-child(4){animation-delay:.3s}
.wave span:nth-child(5){animation-delay:.4s}
@keyframes wave{0%,100%{height:20px}50%{height:60px}}`,
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
animation:spin 1s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}`,
    js: "",
    category: "css",
  },

  {
    id: "heart-pulse",
    title: "Heart Pulse",
    description: "Beating heart animation",
    language: "HTML / CSS",
    html: `<div class="heart"></div>`,
    css: `.heart{width:60px;height:60px;position:relative;
background:#f43f5e;transform:rotate(45deg);animation:pulse 1.2s infinite}
.heart::before,.heart::after{content:"";position:absolute;width:60px;height:60px;
background:#f43f5e;border-radius:50%}
.heart::before{left:-50%}
.heart::after{top:-50%}
@keyframes pulse{0%,100%{transform:scale(1) rotate(45deg)}
50%{transform:scale(1.2) rotate(45deg)}}`,
    js: "",
    category: "css",
  },

  {
    id: "mask-text",
    title: "Text Reveal Mask",
    description: "Smooth masked text reveal animation",
    language: "HTML / CSS",
    html: `<h2 class="mask-text">Creatx Animations</h2>`,
    css: `.mask-text{font-size:2rem;font-weight:700;position:relative;overflow:hidden}
.mask-text::after{content:"";position:absolute;left:0;top:0;width:100%;height:100%;
background:#06b6d4;animation:reveal 1.6s forwards}
@keyframes reveal{to{transform:translateX(100%)}}`,
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
border-radius:8px;border:none;font-weight:600;transition:transform .2s}
.pop-btn:hover{transform:scale(1.15)}
.pop-btn:active{transform:scale(.95)}`,
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
transition:transform .12s ease-out;z-index:9999}`,
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
    css: `.auto-type{font-size:1.3rem;font-weight:700;color:#3b82f6;font-family:monospace}`,
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
border:none;border-radius:8px;font-weight:600}
.spark{position:absolute;width:6px;height:6px;background:white;border-radius:50%;
pointer-events:none;opacity:0;animation:spark .6s forwards}
@keyframes spark{0%{transform:scale(1);opacity:1}
100%{transform:scale(3);opacity:0}}`,
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
justify-content:center;transition:.3s}
.panel.show{right:0}
.open-panel{padding:8px 14px;background:#06b6d4;color:white;border:none}`,
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
animation:floatUp 1.8s forwards}
@keyframes floatUp{to{transform:translateY(-80px);opacity:0}}`,
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
  from{opacity:0;transform:translateY(20px)}
  to{opacity:1;transform:none}
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
    css: `.anim-list{list-style:none;padding:0}
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
  from{opacity:0;transform:translateY(10px)}
  to{opacity:1;transform:none}
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

function FooterController() {
  const location = useLocation();

  // hide footer only on login page
  if (location.pathname === "/login") return null;

  return <Footer />;
}
function NavbarController() {
  const location = useLocation();

  // hide footer only on login page
  if (location.pathname === "/login") return null;

  return <Navbar />;
}


function Library() {
  const [category, setCategory] = useState("all");
  const [selectedCard, setSelectedCard] = useState(null);
  const [favorites, setFavorites] = useState({});
  const [copied, setCopied] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const filteredCards = category === "all"
    ? sampleCards
    : sampleCards.filter(c => c.category === category);

  const displayedCards = showAll ? filteredCards : filteredCards.slice(0, 6);

  const toggleFavorite = (id) => {
    setFavorites(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const copyCode = () => {
    if (!selectedCard) return;

    const code = `<!-- HTML -->
${selectedCard.html}

/* CSS */
${selectedCard.css}

${selectedCard.js ? `// JavaScript\n${selectedCard.js}` : ''}`;

    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen   text-white p-6">
      <div className="max-w-7xl mx-auto">

        {/* Category Filters */}
        <div className="flex gap-3 mb-8">
          <button
            onClick={() => {
              setCategory("all");
              setShowAll(false);
            }}
            className={`px-6 py-2 rounded-full font-medium transition-all ${category === "all"
              ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/50"
              : "bg-white/5 text-gray-300 hover:bg-white/10"
              }`}
          >
            All
          </button>
          <button
            onClick={() => {
              setCategory("css");
              setShowAll(false);
            }}
            className={`px-6 py-2 rounded-full font-medium transition-all ${category === "css"
              ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/50"
              : "bg-white/5 text-gray-300 hover:bg-white/10"
              }`}
          >
            CSS
          </button>
          <button
            onClick={() => {
              setCategory("js");
              setShowAll(false);
            }}
            className={`px-6 py-2 rounded-full font-medium transition-all ${category === "js"
              ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/50"
              : "bg-white/5 text-gray-300 hover:bg-white/10"
              }`}
          >
            JS
          </button>
        </div>

        {/* Animation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedCards.map((card) => (
            <AnimationCard
              key={card.id}
              card={card}
              isFavorite={favorites[card.id]}
              onToggleFavorite={() => toggleFavorite(card.id)}
              onClick={() => setSelectedCard(card)}
            />
          ))}
        </div>

        {/* View All Button */}
        {!showAll && filteredCards.length > 6 && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setShowAll(true)}
              className="px-8 py-3 relative top-[-49px]   bg-indigo-500 hover:from-indigo-600 rounded-full font-semibold shadow-lg transition-all hover:scale-105"
            >
              View All Animations ({filteredCards.length})
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedCard && (
        <AnimationModal
          card={selectedCard}
          isFavorite={favorites[selectedCard.id]}
          onToggleFavorite={() => toggleFavorite(selectedCard.id)}
          onClose={() => setSelectedCard(null)}
          onCopy={copyCode}
          copied={copied}
        />
      )}
    </div>
  );
}

function AnimationCard({ card, isFavorite, onToggleFavorite, onClick }) {
  return (
    <div
      className="relative group bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl overflow-hidden border border-white/10 hover:border-indigo-500/50 transition-all  hover:scale-105"
    >
      {/* Preview Area */}
      <div className="h-48 bg-black/20 flex items-center justify-center p-4">
        <PreviewContent card={card} />
      </div>

      {/* Card Content */}
      <div className="p-4 cursor-pointer" onClick={onClick}>
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-left text-white">{card.title}</h3>
            <p className="text-sm text-gray-400 text-left mt-1">{card.description}</p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite();
            }}
            className="ml-2 p-2 rounded-full hover:bg-white/10 transition-all"
          >
            <Heart
              size={20}
              className={`transition-all ${isFavorite
                ? "fill-red-500 text-red-500"
                : "text-gray-400 hover:text-red-400"
                }`}
            />
          </button>
        </div>
        <span className="inline-block px-3 py-1 text-xs rounded-full bg-indigo-500/20 text-indigo-300">
          {card.language}
        </span>
      </div>
    </div>
  );
}

function AnimationModal({ card, isFavorite, onToggleFavorite, onClose, onCopy, copied }) {
  const [showFullCode, setShowFullCode] = useState(false);

  const formatCode = (code, type) => {
    if (!code) return '';

    if (type === 'html') {
      let indent = 0;
      const indentSize = 2;

      return code
        .replace(/>\s*</g, ">\n<") // break tags into lines
        .split("\n")
        .map(line => {
          let trimmed = line.trim();

          // closing tag → decrease indent first
          if (/^<\/.+>/.test(trimmed)) {
            indent--;
          }

          const formatted =
            " ".repeat(Math.max(indent, 0) * indentSize) + trimmed;

          // opening tag that is NOT self-closing → increase indent
          if (
            /^<[^/!][^>]*>$/.test(trimmed) &&
            !trimmed.endsWith("/>") &&
            !trimmed.includes("</")
          ) {
            indent++;
          }

          return trimmed ? formatted : "";
        })
        .filter(Boolean)
        .join("\n");
    }

    if (type === "css") {
      return code
        .replace(/\{/g, " {\n")
        .replace(/\}/g, "\n}\n")
        .replace(/;/g, ";\n")
        .split("\n")
        .map(line => {
          // indent inside blocks
          if (
            line.startsWith("}") ||
            line.startsWith("@keyframes")
          ) return line.trim();

          if (line.includes("{")) return line.trim();

          return line.trim() ? "  " + line.trim() : "";
        })
        .filter(Boolean)
        .join("\n");
    }


    if (type === 'js') {
      let indent = 0;

      return code
        .replace(/;/g, ";\n")
        .replace(/\{/g, " {\n")
        .replace(/\}/g, "\n}\n")
        .split("\n")
        .map(line => {
          if (line.includes("}")) indent -= 1;

          const formatted = "  ".repeat(Math.max(indent, 0)) + line.trim();

          if (line.includes("{")) indent += 1;

          return formatted.trim() ? formatted : "";
        })
        .filter(Boolean)
        .join("\n");
    }

    return code;
  };

  useEffect(() => {
    document.body.classList.add("modal-open");
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, []);



  const totalLines =
    (card.html ? formatCode(card.html, 'html').split('\n').length : 0) +
    (card.css ? formatCode(card.css, 'css').split('\n').length : 0) +
    (card.js ? formatCode(card.js, 'js').split('\n').length : 0);

  return (
    <>
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-white/10 max-w-7xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white">{card.title}</h2>
              <p className="text-gray-400 mt-1">{card.description}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={onToggleFavorite}
                className="p-2 rounded-full hover:bg-white/10 transition-all"
              >
                <Heart
                  size={24}
                  className={`transition-all ${isFavorite
                    ? "fill-red-500 text-red-500"
                    : "text-gray-400 hover:text-red-400"
                    }`}
                />
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10 transition-all"
              >
                <X size={24} className="text-gray-400" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="grid justify-center md:grid-cols-[60%_35%] items-start gap-6 p-6 overflow-y-auto max-h-[calc(90vh-180px)]">

            {/* Code Section - Left Side */}
            <div className="space-y-4 min-h-[650px]">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-indigo-300">Code</h3>
                {totalLines > 15 && (
                  <button
                    onClick={() => setShowFullCode(true)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-sm transition-all"
                  >
                    <Maximize2 size={14} />
                    View Complete Code
                  </button>
                )}
              </div>

              {/* VS Code Style Editor */}
              <div className="space-y-4">
                {card.html && (
                  <CodeBlock
                    code={formatCode(card.html, 'html')}
                    language="HTML"
                    maxLines={totalLines > 15 ? 5 : null}
                  />
                )}

                {card.css && (
                  <CodeBlock
                    code={formatCode(card.css, 'css')}
                    language="CSS"
                    maxLines={totalLines > 15 ? 7 : null}
                  />
                )}

                {card.js && (
                  <CodeBlock
                    code={formatCode(card.js, 'js')}
                    language="JavaScript"
                    maxLines={totalLines > 15 ? 5 : null}
                  />
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={onCopy}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium transition-all"
                >
                  {copied ? (
                    <>
                      <Check size={18} />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={18} />
                      Copy Code
                    </>
                  )}
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/20 rounded-lg font-medium transition-all">
                  <Edit size={18} />
                  Edit
                </button>
              </div>
            </div>

            {/* Preview Section - Right Side */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-cyan-300">Preview</h3>
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-white/10 p-8 min-h-[500px] flex items-center justify-center shadow-xl sticky top-0">
                <PreviewContent card={card} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full Code Modal */}
      {showFullCode && (
        <FullCodeModal
          card={card}
          formatCode={formatCode}
          onClose={() => setShowFullCode(false)}
        />
      )}
    </>
  );
}

function CodeBlock({ code, language, maxLines }) {
  const codeRef = useRef(null);

  const lines = code.split("\n");
  const isLimited = typeof maxLines === "number";
  const isTruncated = isLimited && lines.length > maxLines;

  const visibleCode = isTruncated
    ? lines.slice(0, maxLines).join("\n")
    : code;

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [visibleCode]);

  return (
    <div className="bg-[#1e1e1e] rounded-xl overflow-hidden border border-white/10 shadow-xl text-left relative">
      {/* Header */}
      <div className="bg-[#323233] px-4 py-2 flex items-center gap-2 border-b border-white/5">
        <span className="text-xs text-gray-400 uppercase">{language}</span>
      </div>

      {/* Code */}
      <div className="relative">
        <pre className="p-4 overflow-x-auto text-sm leading-relaxed">
          <code
            ref={codeRef}
            className={`language-${language.toLowerCase()} whitespace-pre`}
          >
            {visibleCode}
          </code>
        </pre>

        {/* Fade only in preview */}
        {isTruncated && (
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#1e1e1e] to-transparent pointer-events-none" />
        )}
      </div>
    </div>
  );
}




function FullCodeModal({ card, formatCode, onClose }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-white/10 max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-2xl font-bold text-white">Complete Code</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 transition-all"
          >
            <X size={24} className="text-gray-400" />
          </button>
        </div>

        {/* Full Code Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)] space-y-4">
          {card.html && (
            <CodeBlock
              code={formatCode(card.html, 'html')}
              language="HTML"
            />
          )}

          {card.css && (
            <CodeBlock
              code={formatCode(card.css, 'css')}
              language="CSS"
            />
          )}

          {card.js && (
            <CodeBlock
              code={formatCode(card.js, 'js')}
              language="JavaScript"
            />
          )}
        </div>
      </div>
    </div>
  );
}

function PreviewContent({ card }) {
  const previewRef = useRef(null);

  useEffect(() => {
    if (!previewRef.current) return;

    const container = previewRef.current;
    const previewDiv = container.querySelector(".preview-content");

    if (!previewDiv) return;

    // Clear previous content
    previewDiv.innerHTML = "";

    // Inject HTML
    previewDiv.innerHTML = card.html;

    // Inject CSS
    let styleEl = document.createElement("style");
    styleEl.innerHTML = card.css || "";
    previewDiv.appendChild(styleEl);

    // Run JS safely
    if (card.js) {
      requestAnimationFrame(() => {
        try {
          const scopedScript = new Function(
            "container",
            `
  const document = container.ownerDocument;
  const window = document.defaultView;
  ${card.js}
`
          );

          scopedScript(previewDiv);

        } catch (err) {
          console.error("Preview JS error:", err);
        }
      });
    }

    return () => {
      previewDiv.innerHTML = "";
    };
  }, [card]);

  return (
    <div ref={previewRef} className="w-full">
      <div className="preview-content"></div>
    </div>
  );
}

function AlertNotify({ message, onClose }) {
  const [visible, setVisible] = useState(false);

  // Animate IN on mount
  useEffect(() => {
    setVisible(true);
  }, []);

  // Animate OUT then close
  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 500); // match animation duration
  };

  return (
    <div
      className={`
        fixed bottom-6 left-6 z-50
        bg-red-700 text-white
        px-4 py-4 rounded-lg shadow-lg
        flex items-center gap-3
        transition-all duration-300 ease-out
        ${visible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-6 scale-95"}
      `}
    >
      <span>{message}</span>
      <button
        onClick={handleClose}
        className="p-1 rounded bg-red-700 hover:border-1 hover:border-red-800 hover:bg-red-800 transition"
      >
        <X size={16} />
      </button>
    </div>
  );
}

function App() {
  const [selected, setSelected] = useState(sampleCards[0]);
  const [category, setCategory] = useState("all");
  const [cards] = useState(sampleCards);

  useEffect(() => {
    const filtered = category === "all" ? cards : cards.filter((c) => c.category === category);
    if (!filtered.some((c) => c.id === selected?.id)) {
      setSelected(filtered[0] || cards[0] || null);
    }
  }, [category, cards]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <BrowserRouter>
      <div className="w-full min-h-screen text-white flex flex-col">
        <NavbarController />

        <main className="site-main max-w-6xl mx-auto pt-28 pb-8 px-4 flex-1 w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/docs" element={<DocsShell />} />
            <Route
              path="/library"
              element={
                <Library
                  selected={selected}
                  setSelected={setSelected}
                  category={category}
                  setCategory={setCategory}
                  cards={cards}
                />
              }
            />
            <Route path="/create" element={<Create />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>

        <FooterController />

        <div className="hidden md:block">
          <AnimationPanel />
        </div>
        <div className="hidden md:block">
          <AlertNotify message={"This site is currently under maintenance."} />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
