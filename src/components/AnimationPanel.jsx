import React, { useEffect, useRef, useState } from 'react'
// no router hooks needed here

const snippets = [
  {
    id: 'pulse-dot',
    title: 'Pulse Dot',
    code: `<!-- HTML -->\n<div class="pulse-wrap"><div class="dot"></div></div>\n\n/* CSS */\n.pulse-wrap{display:flex;align-items:center;justify-content:center;height:120px}\n.dot{width:20px;height:20px;border-radius:50%;background:#06b6d4;animation:pulse 1s infinite ease-in-out}\n@keyframes pulse{0%{transform:scale(1);opacity:1}70%{transform:scale(1.8);opacity:0}100%{opacity:0}}`
  },
  {
    id: 'float-bubble',
    title: 'Floating Bubble',
    code: `<!-- HTML -->\n<div class="bubble"></div>\n\n/* CSS */\n.bubble{width:48px;height:48px;border-radius:50%;background:linear-gradient(135deg,#06b6d4,#3b82f6);animation:float 3s ease-in-out infinite}\n@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}`
  },
  {
    id: 'ripple-btn',
    title: 'Click Ripple',
    code: `<!-- HTML -->\n<button class="ripple-btn">Tap</button>\n\n/* CSS */\n.ripple-btn{position:relative;overflow:hidden;padding:.6rem 1rem;border-radius:8px;border:none;background:#111827;color:white}\n.ripple-btn span{position:absolute;border-radius:50%;transform:scale(0);background:rgba(255,255,255,0.28);animation:rip 600ms linear}\n@keyframes rip{to{transform:scale(4);opacity:0}}\n\n/* small JS to attach (optional) */\ndocument.querySelectorAll('.ripple-btn').forEach(btn=>btn.addEventListener('click',function(e){const r=document.createElement('span');const rect=this.getBoundingClientRect();const size=Math.max(rect.width,rect.height);r.style.width=r.style.height=size+'px';r.style.left=(e.clientX-rect.left-size/2)+'px';r.style.top=(e.clientY-rect.top-size/2)+'px';this.appendChild(r);setTimeout(()=>r.remove(),700);}));`
  },
  {
    id: 'fade-words',
    title: 'Staggered Fade',
    code: `<!-- HTML -->\n<div class="fade-wrap"><span>Design</span><span>Build</span><span>Ship</span></div>\n\n/* CSS */\n.fade-wrap{display:flex;gap:.6rem;align-items:center}\n.fade-wrap span{opacity:0;transform:translateY(6px);animation:fadein .7s forwards;animation-delay:calc(var(--i)*0.12s)}\n.fade-wrap span:nth-child(1){--i:0}\n.fade-wrap span:nth-child(2){--i:1}\n.fade-wrap span:nth-child(3){--i:2}\n@keyframes fadein{to{opacity:1;transform:none}}`
  }
]

export default function AnimationPanel() {
  // Show panel by default
  const [open, setOpen] = useState(true)
  const [copiedId, setCopiedId] = useState(null)
  const [announce, setAnnounce] = useState('')
  const panelRef = useRef(null)
  const toggleRef = useRef(null)
  const [tab, setTab] = useState('library') // 'library' | 'shared'
  const LOCAL_KEY = 'creatx_user_snippets'
  const SHARED_KEY = 'creatx_shared_snippets'

  const [localSnippets, setLocalSnippets] = useState(() => {
    try { return JSON.parse(localStorage.getItem(LOCAL_KEY) || '[]') } catch { return [] }
  })
  const [sharedSnippets, setSharedSnippets] = useState(() => {
    try { return JSON.parse(localStorage.getItem(SHARED_KEY) || '[]') } catch { return [] }
  })

  useEffect(() => {
    // When opened, move focus into the panel. On close, return focus to toggle.
    if (open) {
      const focusable = panelRef.current?.querySelector('button, [tabindex]')
      focusable?.focus()
      const onKey = (e) => {
        if (e.key === 'Escape') setOpen(false)
      }
      window.addEventListener('keydown', onKey)
      return () => window.removeEventListener('keydown', onKey)
    } else {
      toggleRef.current?.focus()
    }
  }, [open])

  const copy = async (text, id, title) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedId(id)
      setAnnounce(`${title} copied to clipboard`)
      setTimeout(() => setCopiedId(null), 1200)
      setTimeout(() => setAnnounce(''), 1400)
    } catch (err) {
      console.error('copy failed', err)
      setAnnounce('Copy failed')
      setTimeout(() => setAnnounce(''), 1400)
    }
  }

  const [expandedId, setExpandedId] = useState(null)

  // create moved to separate page

  function SnippetItem({ item }) {
    const isExpanded = expandedId === item.id
    // Build a structured preview (first few lines) preserving formatting
    const lines = item.code.split('\n')
    const previewLines = lines.slice(0, 4)
    const more = lines.length > 4

    return (
      <div className="border border-white/6 rounded-lg p-3 bg-white/3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <div className="text-sm font-semibold">{item.title}</div>
              <div className="text-[11px] text-white/60 px-2 py-0.5 rounded bg-white/4">{item.id}</div>
            </div>
            {!isExpanded && (
              <pre className="mt-2 text-[11px] text-white/60 whitespace-pre-wrap max-h-20 overflow-hidden">{previewLines.join('\n')}{more ? '\n…' : ''}</pre>
            )}
          </div>

            <div className="flex-shrink-0 flex items-center gap-2">
            <button
              onClick={() => copy(item.code, item.id, item.title)}
              aria-pressed={copiedId === item.id}
              className={`text-xs px-3 py-1 rounded shadow-sm transition-colors duration-150 ${copiedId===item.id ? 'bg-indigo-500 text-white copy-anim' : 'bg-indigo-600 hover:bg-indigo-500 text-white'}`}>
              {copiedId===item.id ? 'Copied' : 'Copy'}
            </button>

            <button onClick={() => setExpandedId(isExpanded ? null : item.id)} aria-expanded={isExpanded} className="text-xs px-2 py-1 rounded bg-white/6 text-white/90 hover:bg-white/8">
              {isExpanded ? 'Hide' : 'Show'}
            </button>

            {/** if this snippet exists in localSnippets (owner) show Delete */}
            {localSnippets.some(s => s.id === item.id) && (
              <button onClick={() => { if (confirm('Delete this animation?')) deleteSnippet(item.id) }} className="text-xs px-2 py-1 rounded bg-red-600 ml-1">Delete</button>
            )}
          </div>
        </div>

        {isExpanded && (
          <pre className="mt-3 text-xs font-mono bg-black/40 p-2 rounded max-h-44 overflow-auto whitespace-pre text-white/70 text-[12px]">
            <code>{item.code}</code>
          </pre>
        )}
      </div>
    )
  }

  const persistLocal = (arr) => {
    try { localStorage.setItem(LOCAL_KEY, JSON.stringify(arr)) } catch (e) { console.error(e) }
  }
  const persistShared = (arr) => {
    try { localStorage.setItem(SHARED_KEY, JSON.stringify(arr)) } catch (e) { console.error(e) }
  }

  const effectiveTab = tab

  // adding snippets is handled on the Create page; panel only lists/copies/deletes

  // listen for external snippet updates (from Create page)
  useEffect(() => {
    const onChange = () => {
      try {
        const saved = JSON.parse(localStorage.getItem(LOCAL_KEY) || '[]')
        const shared = JSON.parse(localStorage.getItem(SHARED_KEY) || '[]')
        setLocalSnippets(Array.isArray(saved) ? saved : [])
        setSharedSnippets(Array.isArray(shared) ? shared : [])
      } catch (e) { console.error(e) }
    }
    window.addEventListener('creatx:snippets-changed', onChange)
    return () => window.removeEventListener('creatx:snippets-changed', onChange)
  }, [])

  const deleteSnippet = (id) => {
    const nextLocal = localSnippets.filter(s => s.id !== id)
    setLocalSnippets(nextLocal)
    persistLocal(nextLocal)
    const nextShared = sharedSnippets.filter(s => s.id !== id)
    setSharedSnippets(nextShared)
    persistShared(nextShared)
    // notify
    window.dispatchEvent(new Event('creatx:snippets-changed'))
  }

  

  return (
    <div>
      <div className="fixed bottom-6 right-6 z-50">
        <div className="flex items-end gap-3">
          {open && (
            <aside
              id="animation-panel"
              ref={panelRef}
              role="dialog"
              aria-modal="false"
              aria-label="Animation snippets"
              className="w-96 max-w-[92vw] bg-[#071124cc] backdrop-blur-md border border-white/6 rounded-xl p-3 shadow-xl animate-scaleIn"
              tabIndex={-1}
            >
              <div className="flex items-center justify-between mb-3">
                <div className='text-left'> 
                  <strong className="text-sm">Animations</strong>
                  <div className="text-[11px] text-white/60">Copy small animation snippets</div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setOpen(false)} className="text-xs px-2 py-1 rounded bg-white/3">Close</button>
                </div>
              </div>

              <div className="mb-3 flex gap-2">
                <button onClick={() => setTab('library')} className={`px-3 py-1 rounded text-sm ${effectiveTab === 'library' ? 'bg-indigo-600 text-white' : 'bg-white/4 text-white/80'}`}>Library</button>
                <button onClick={() => setTab('shared')} className={`px-3 py-1 rounded text-sm ${effectiveTab === 'shared' ? 'bg-indigo-600 text-white' : 'bg-white/4 text-white/80'}`}>Shared</button>
              </div>

              <div className="space-y-3 overflow-y-auto max-h-[52vh] pr-1">
                {effectiveTab === 'library' && (
                  <div className="space-y-3 ">
                    {[...localSnippets, ...snippets].map(s => (
                      <SnippetItem key={s.id} item={s} />
                    ))}
                  </div>
                )}

                {effectiveTab === 'shared' && (
                  <div className="space-y-3">
                    {sharedSnippets.length === 0 ? (
                      <div className="text-sm text-white/60">No shared animations yet. When others share, they will appear here.</div>
                    ) : (
                      sharedSnippets.map(s => <SnippetItem key={s.id} item={s} />)
                    )}
                  </div>
                )}

                {/* create functionality removed from panel; use the Create page */}
              </div>

              <div aria-live="polite" className="sr-only">{announce}</div>
            </aside>
          )}

            <button
            ref={toggleRef}
            onClick={() => setOpen(v => !v)}
            aria-expanded={open}
            aria-controls="animation-panel"
            title="Open animations"
              className="w-12 h-12 rounded-full bg-indigo-600 shadow-lg flex items-center justify-center ring-2 ring-white/6"
          >
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 5v14M5 12h14" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
      </div>
    </div>
  )
}
