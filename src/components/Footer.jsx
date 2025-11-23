import React, { useState } from 'react'

const FORM_ACTION = '' // Optional: replace with real endpoint

export default function Footer() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')
  const [showModal, setShowModal] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    // client-side validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error')
      return
    }
    setStatus('sending')
    try {
      if (FORM_ACTION) {
        const res = await fetch(FORM_ACTION, { method: 'POST', body: JSON.stringify({ email }), headers: { 'Content-Type': 'application/json' } })
        if (!res.ok) throw new Error('network')
        setStatus('success')
        setShowModal(true)
      } else {
        // local fallback
        const list = JSON.parse(localStorage.getItem('creatx_subs') || '[]')
        list.push({ email, ts: Date.now() })
        localStorage.setItem('creatx_subs', JSON.stringify(list))
        setStatus('success')
        setShowModal(true)
      }
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  return (
    <footer className="mt-12 border-t border-gray-600/40">
      <div className="max-w-6xl mx-auto py-12 px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm text-slate-300">

          <div>
            <div className="text-white font-bold text-lg">Creatx</div>
            <p className="mt-3 text-slate-400">Tiny animations, ready-to-use UI snippets, and playful micro-interactions for designers and developers.</p>
            <div className="mt-4 flex gap-3 text-slate-300">
              <a href="#" aria-label="Twitter" className="hover:text-white" title="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.43 1s-1 .6-1.7 1.05A4.48 4.48 0 0 0 16 1c-2.5 0-4.5 2.16-4 4.61A12.94 12.94 0 0 1 3 2s-4 9 5 13a13 13 0 0 1-7 2c9 5 20 0 20-11.5v-.5A7.72 7.72 0 0 0 23 3z"/></svg>
              </a>
              <a href="#" aria-label="GitHub" className="hover:text-white" title="GitHub">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.77-.25.77-.55 0-.27-.01-1-.02-1.95-3.2.7-3.88-1.38-3.88-1.38-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.74 2.68 1.24 3.33.95.1-.74.4-1.24.72-1.53-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.62 1.59.23 2.77.11 3.06.73.81 1.18 1.84 1.18 3.1 0 4.41-2.7 5.39-5.27 5.67.41.35.78 1.04.78 2.1 0 1.52-.01 2.75-.01 3.13 0 .3.2.66.78.55A11.51 11.51 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z"/></svg>
              </a>
              <a href="#" aria-label="Instagram" className="hover:text-white" title="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 5.5a4.5 4.5 0 1 0 .001 9.001A4.5 4.5 0 0 0 12 7.5zm4.75-.9a1.05 1.05 0 1 0 0 2.1 1.05 1.05 0 0 0 0-2.1z"/></svg>
              </a>
            </div>
          </div>

          <div>
            <div className="font-semibold text-white mb-3">Quick Links</div>
            <ul className="space-y-2">
              <li><a className="text-slate-300 hover:text-white" href="#">Home</a></li>
              <li><a className="text-slate-300 hover:text-white" href="#">Animations</a></li>
              <li><a className="text-slate-300 hover:text-white" href="#">Snippets</a></li>
              <li><a className="text-slate-300 hover:text-white" href="#">Contact</a></li>
            </ul>
          </div>

          <div>
            <div className="font-semibold text-white mb-3">Categories</div>
            <ul className="space-y-2">
              <li><a className="text-slate-300 hover:text-white" href="#">CSS Animations</a></li>
              <li><a className="text-slate-300 hover:text-white" href="#">UI Effects</a></li>
              <li><a className="text-slate-300 hover:text-white" href="#">Components</a></li>
              <li><a className="text-slate-300 hover:text-white" href="#">Games</a></li>
            </ul>
          </div>

          <div>
            <div className="font-semibold text-white mb-3">Newsletter</div>
            <p className="text-slate-400 mb-4">Subscribe to get the latest animation drops and code packs.</p>
            <form onSubmit={submit} className="flex flex-col gap-3">
              <label htmlFor="sub-email" className="sr-only">Enter your email</label>
              <input id="sub-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className="w-full px-4 py-3 rounded-full bg-[#0b1016] placeholder:text-slate-500 text-white border border-white/8 focus:outline-none" />
              <button type="submit" disabled={status==='sending'} className="w-full rounded-full px-4 py-3 bg-[#2b3036] hover:bg-[#3a3f44] text-white font-medium border border-white/8">{status==='sending' ? 'Sending...' : 'Subscribe'}</button>
            </form>
            <div className="mt-3 text-xs">
              {status === 'success' && <div className="text-green-400">Thanks — you'll be notified.</div>}
              {status === 'error' && <div className="text-rose-400">Please enter a valid email or try again.</div>}
            </div>
          </div>

        </div>
      </div>

      {/* full-width divider */}
      <div className="w-full border-t border-gray-600/40 my-4" />

      <div className="max-w-6xl mx-auto py-2 px-2">
        <div className="flex flex-col md:flex-row items-center justify-between text-sm text-slate-400">
          <div>© {new Date().getFullYear()} Creatx. All rights reserved.</div>
          <div className="mt-4 md:mt-0 flex items-center gap-6">
            <a className="hover:text-white" href="#">Privacy Policy</a>
            <a className="hover:text-white" href="#">Terms of Service</a>
            <a className="hover:text-white" href="#">Cookie Policy</a>
          </div>
        </div>
      </div>

      {/* Subscribe Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => { setShowModal(false); setStatus('idle') }} />
          <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl transform animate-scaleIn">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <h3 className="text-2xl font-semibold">Subscribed</h3>                
                <p className="mt-10 text-slate-300 text-lg">Thanks — you'll get our latest animation drops and code packs.</p>
              </div>
            </div>
            <div className="mt-8 text-right">
              <button onClick={() => { setShowModal(false); setStatus('idle') }} className="px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white">Done</button>
            </div>
          </div>
        </div>
      )}
    </footer>
  )
}
