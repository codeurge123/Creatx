import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import CardGrid from './components/CardGrid'
import CodeViewer from './components/CodeViewer'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AnimationPanel from './components/AnimationPanel'
import Home from './pages/Home'
import Create from './pages/Create'

const sampleCards = [
  {
    id: 'pulse-loader',
    title: 'Pulse Loader',
    description: 'A simple pulsing loader using CSS animation',
    language: 'HTML / CSS',
    html: `<div class="pulse-wrap"><div class="dot"></div></div>`,
    css: `.pulse-wrap{display:flex;align-items:center;justify-content:center;height:180px}.dot{width:24px;height:24px;border-radius:50%;background:#06b6d4;animation:pulse 1s infinite ease-in-out}@keyframes pulse{0%{transform:scale(1);opacity:1}70%{transform:scale(1.8);opacity:0}100%{opacity:0}}`,
    js: '',
    category: 'css'
  },
  {
    id: 'flip-card',
    title: '3D Flip Card',
    description: 'Card flips on hover to show back side',
    language: 'HTML / CSS',
    html: `<div class="flip-scene"><div class="flip-card"><div class="face front">Front</div><div class="face back">Back</div></div></div>`,
    css: `.flip-scene{perspective:1000px;display:flex;align-items:center;justify-content:center;height:220px}.flip-card{width:160px;height:100px;transform-style:preserve-3d;transition:transform .6s}.flip-scene:hover .flip-card{transform:rotateY(180deg)}.face{position:absolute;width:160px;height:100px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-weight:600}.front{background:linear-gradient(90deg,#3b82f6,#06b6d4);color:white}.back{background:#111827;color:#f8fafc;transform:rotateY(180deg)}`,
    js: '',
    category: 'css'
  },
  {
    id: 'float-bubbles',
    title: 'Floating Bubbles',
    description: 'Decorative floating bubbles animation',
    language: 'HTML / CSS',
    html: `<div class="bubbles"><span></span><span></span><span></span></div>`,
    css: `.bubbles{position:relative;height:180px;display:flex;align-items:center;justify-content:center}.bubbles span{position:absolute;width:22px;height:22px;border-radius:50%;background:rgba(59,130,246,0.7);animation:rise 6s infinite ease-in}.bubbles span:nth-child(2){left:40%;background:rgba(6,182,212,0.6);width:14px;height:14px;animation-duration:5s}.bubbles span:nth-child(3){left:65%;background:rgba(99,102,241,0.55);width:18px;height:18px;animation-duration:7s}@keyframes rise{0%{transform:translateY(40px);opacity:0}50%{opacity:1}100%{transform:translateY(-140px);opacity:0}}`,
    js: '',
    category: 'css'
  },
  {
    id: 'fade-text',
    title: 'Fade-in Text',
    description: 'Staggered fade-in text effect',
    language: 'HTML / CSS',
    html: `<div class="fade-wrap"><span>Design</span><span>Develop</span><span>Deploy</span></div>`,
    css: `.fade-wrap{display:flex;gap:12px;align-items:center;justify-content:center;height:160px}.fade-wrap span{opacity:0;transform:translateY(6px);animation:fadein .8s forwards;animation-delay:calc(var(--i)*0.15s)}.fade-wrap span:nth-child(1){--i:0}.fade-wrap span:nth-child(2){--i:1}.fade-wrap span:nth-child(3){--i:2}@keyframes fadein{to{opacity:1;transform:none}}`,
    js: '',
    category: 'css'
  },
  {
    id: 'bouncy-button',
    title: 'Bouncy Button',
    description: 'A playful bounce on hover for buttons',
    language: 'HTML / CSS',
    html: `<button class="bouncy">Click me</button>`,
    css: `.bouncy{padding:.6rem 1.1rem;border-radius:999px;border:none;background:linear-gradient(90deg,#f97316,#f43f5e);color:white;font-weight:600;transition:transform .18s cubic-bezier(.2,.9,.3,1)}.bouncy:hover{transform:translateY(-6px) scale(1.02)}.bouncy:active{transform:translateY(0) scale(.98)}`,
    js: '',
    category: 'css'
  },
  {
    id: 'ripple-effect',
    title: 'Ripple Effect',
    description: 'Click ripple using pure CSS + small JS',
    language: 'HTML / CSS / JS',
    html: `<div class="ripple-wrap"><button class="ripple-btn">Tap</button></div>`,
    css: `.ripple-wrap{display:flex;align-items:center;justify-content:center;height:160px}.ripple-btn{position:relative;overflow:hidden;padding:.6rem 1rem;border-radius:10px;border:none;background:#111827;color:white}.ripple-btn span{position:absolute;border-radius:50%;transform:scale(0);background:rgba(255,255,255,0.35);animation:rip 600ms linear}.ripple-btn span.done{display:none;}@keyframes rip{to{transform:scale(4);opacity:0}}`,
    js: `document.querySelector('.ripple-btn').addEventListener('click',function(e){const r=document.createElement('span');const rect=this.getBoundingClientRect();const size=Math.max(rect.width,rect.height);r.style.width=r.style.height=size+'px';r.style.left=(e.clientX-rect.left-size/2)+'px';r.style.top=(e.clientY-rect.top-size/2)+'px';this.appendChild(r);setTimeout(()=>r.remove(),700);})`,
    category: 'js'
  },
  {
    id: 'morphing-shape',
    title: 'Morphing Blob',
    description: 'Smooth morphing SVG-like blob with CSS',
    language: 'HTML / CSS',
    html: `<div class="blob"></div>`,
    css: `.blob{width:160px;height:160px;border-radius:40%;background:linear-gradient(135deg,#06b6d4,#3b82f6);animation:blob 4s infinite}@keyframes blob{0%{border-radius:40% 60% 40% 60%}33%{border-radius:60% 40% 60% 40%}66%{border-radius:50% 50% 30% 70%}100%{border-radius:40% 60% 40% 60%}}`,
    js: '',
    category: 'css'
  },
  {
    id: 'typewriter',
    title: 'Typewriter Text',
    description: 'Simple CSS + JS typewriter effect',
    language: 'HTML / CSS / JS',
    html: `<div class="typewriter"><span class="text"></span></div>`,
    css: `.typewriter{height:60px;display:flex;align-items:center;justify-content:center}.typewriter .text{font-weight:600;color:#0ea5a4;font-family:monospace;font-size:1.1rem}`,
    js: `const t=["Hello.","I am Creatx.","Tiny animations."],el=document.querySelector('.text');let i=0,j=0;function tick(){if(i>=t.length)return;i< t.length&&(el.textContent=t[i].slice(0,++j));if(j===t[i].length){i++;j=0;setTimeout(tick,800)}else setTimeout(tick,120)}tick();`,
    category: 'js'
  },
  {
    id: 'clicker-game',
    title: 'Clicker Game (JS)',
    description: 'Simple clicker game: click to increase score',
    language: 'HTML / CSS / JS',
    html: `<div class="clicker"><div class="score">0</div><div class="controls"><button class="btn">Click</button><button class="reset">Reset</button></div></div>`,
    css: `.clicker{display:flex;flex-direction:column;align-items:center;gap:12px;height:220px;justify-content:center}.clicker .score{font-size:2.4rem;font-weight:700;color:#111827;background:white;padding:8px 16px;border-radius:10px}.clicker .controls .btn,.clicker .controls .reset{margin:0 6px;padding:10px 14px;border-radius:8px;border:none;background:linear-gradient(90deg,#06b6d4,#3b82f6);color:white;cursor:pointer}`,
    js: `let score=0;const scoreEl=document.querySelector('.score');document.querySelector('.btn').addEventListener('click',()=>{score++;scoreEl.textContent=score});document.querySelector('.reset').addEventListener('click',()=>{score=0;scoreEl.textContent=score});`,
    category: 'js'
  }
]

function Library({ selected, setSelected, category, setCategory, cards }) {
  return (
    <div className="app-body flex flex-col md:flex-row gap-6">
      <aside className="left-panel md:w-80">
        <div className="sticky top-20">
          <div className="mb-4 flex items-center gap-2">
            <button onClick={() => { setCategory('all'); setSelected(cards[0]) }} className={`px-3 py-1 rounded-full text-sm ${category==='all' ? 'bg-indigo-600 text-white' : 'text-white/80 bg-white/3'}`}>All</button>
            <button onClick={() => { setCategory('css'); setSelected(cards.find(s=>s.category==='css')||cards[0]) }} className={`px-3 py-1 rounded-full text-sm ${category==='css' ? 'bg-indigo-600 text-white' : 'text-white/80 bg-white/3'}`}>CSS</button>
            <button onClick={() => { setCategory('js'); setSelected(cards.find(s=>s.category==='js')||cards[0]) }} className={`px-3 py-1 rounded-full text-sm ${category==='js' ? 'bg-indigo-600 text-white' : 'text-white/80 bg-white/3'}`}>JS</button>
          </div>
          <CardGrid cards={cards.filter(c => category === 'all' ? true : c.category === category)} onSelect={setSelected} selectedId={selected?.id} />
        </div>
      </aside>
      <main className="right-panel flex-1">
        <CodeViewer card={selected} />
      </main>
    </div>
  )
}

function App() {
  const [selected, setSelected] = useState(sampleCards[0])
  const [category, setCategory] = useState('all')

  return (
    <BrowserRouter>
      <div className="w-full min-h-screen text-white">
        <Navbar />

        <main className="site-main max-w-6xl mx-auto pt-28 pb-8 px-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/library" element={<Library selected={selected} setSelected={setSelected} category={category} setCategory={setCategory} cards={sampleCards} />} />
            <Route path="/create" element={<Create />} />
          </Routes>
        </main>
        <Footer />

        <AnimationPanel />
      </div>
    </BrowserRouter>
  )
}

export default App
