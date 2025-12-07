import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()
  return (
    <main className="w-full px-6">
      <div className="w-full max-w-6xl mx-auto">
        <section className="min-h-[85vh] flex items-center justify-center bg-white/5 rounded-2xl shadow-xl px-8 py-12 text-center overflow-hidden relative">
          <div className="w-full">
            <h1 className="text-6xl md:text-8xl font-extrabold text-white animate-fadeUp" style={{ animationDelay: '80ms' }}>Create beautiful micro-interactions</h1>
            <p className="mt-6 text-slate-300 max-w-3xl mx-auto text-xl md:text-2xl animate-fadeUp" style={{ animationDelay: '220ms' }}>A curated library of tiny CSS and JS animations — preview them, copy the code, and drop them into your projects.</p>

            <div className="mt-12 flex items-center justify-center gap-4 animate-fadeUp" style={{ animationDelay: '360ms' }}>
              <button onClick={() => navigate('/library')} className="px-6 py-4 rounded-full bg-indigo-600 text-white font-semibold hover:opacity-95">Explore Animations</button>
              <button className="px-6 py-4 rounded-full bg-transparent border border-white/10 text-white font-semibold hover:bg-white/5">Learn More</button>
            </div>
          </div>

          {/* subtle animated background shapes (kept inside hero; overflow hidden on section prevents scroll) */}
          <div className="pointer-events-none absolute -right-20 -top-20 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl animate-fadeUp" style={{ animationDelay: '120ms' }} />
          <div className="pointer-events-none absolute -left-16 bottom-0 w-64 h-64 bg-rose-500/6 rounded-full blur-2xl animate-fadeUp" style={{ animationDelay: '180ms' }} />
        </section>

        <section className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          <article className="border border-gray-800 bg-white/3 rounded-xl p-8 text-center flex flex-col items-center gap-4 home-card transition-transform duration-300 transform hover:-translate-y-3 hover:scale-105 hover:shadow-2xl cursor-pointer"
            role="button" tabIndex={0}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect()
              e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
              e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.setProperty('--mouse-x', '50%')
              e.currentTarget.style.setProperty('--mouse-y', '50%')
            }}>
            <div className="feature-icon rounded-full bg-indigo-700/10 text-indigo-300 animate-float flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-9 h-9 text-indigo-300"><path d="M12 2v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M12 16v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" /></svg>
            </div>
            <h4 className="font-semibold text-white text-lg">Easy to Use</h4>
            <p className="mt-2 text-slate-300">Copy-ready snippets that work in any project.</p>
          </article>

          <article className="border border-gray-800 bg-white/3 rounded-xl p-8 text-center flex flex-col items-center gap-4 home-card transition-transform duration-300 transform hover:-translate-y-3 hover:scale-105 hover:shadow-2xl cursor-pointer"
            role="button" tabIndex={0}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect()
              e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
              e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.setProperty('--mouse-x', '50%')
              e.currentTarget.style.setProperty('--mouse-y', '50%')
            }}>
            <div className="feature-icon rounded-full bg-emerald-700/8 text-emerald-300 animate-pulse-soft flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-9 h-9 text-emerald-300"><path d="M3 12h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M12 3v18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <h4 className="font-semibold text-white text-lg">Lightweight</h4>
            <p className="mt-2 text-slate-300">Minimal CSS & JS with small footprint.</p>
          </article>

          <article className="bg-white/3 border border-gray-800 rounded-xl p-8 text-center flex flex-col items-center gap-4 home-card transition-transform duration-300 transform hover:-translate-y-3 hover:scale-105 hover:shadow-2xl cursor-pointer"
            role="button" tabIndex={0}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect()
              e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
              e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.setProperty('--mouse-x', '50%')
              e.currentTarget.style.setProperty('--mouse-y', '50%')
            }}>
            <div className="feature-icon rounded-full bg-rose-600/10 text-rose-300 animate-rotate-slow flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-rose-300"><path d="M12 2a10 10 0 100 20 10 10 0 000-20z" stroke="currentColor" strokeWidth="1.2" /></svg>
            </div>
            <h4 className="font-semibold text-white text-lg">Customizable</h4>
            <p className="mt-2 text-slate-300">Adjust sizes, colors, and timings easily.</p>
          </article>
        </section>

        <section id="about" className="mt-16">
          <div className="max-w-4xl mx-auto">
            <article className="bg-white/4 rounded-xl p-6 md:p-10 hover:border hover:border-gray-800 shadow-lg home-card transition-transform duration-300 transform hover:-translate-y-2 hover:shadow-2xl" >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white text-left">About Creatx</h3>
                  <p className="mt-4 text-slate-300 text-left text-lg">Creatx is a tiny library of handcrafted micro-interactions and small UI patterns. Each snippet is designed to be lightweight, easy to integrate, and fully customizable so you can drop it into your project and iterate fast.</p>
                  <div className="mt-6 flex items-center gap-4">
                    <button className="px-5 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-md mt-4 text-white font-semibold">Get Started</button>
                    <Link to="/docs"
                      onClick={() => window.scrollTo(0, 0)}
                      className="px-5 py-3 border border-white/10 mt-4 rounded-md text-white/90">See Docs</Link>
                  </div>
                </div>
                <div className="text-left">
                  <ul className="space-y-4 text-slate-300">
                    <li className="flex items-start gap-3">
                      <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-indigo-700/10 text-indigo-300">✓</span>
                      <span>Copy-ready, drop-in snippets.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-emerald-700/10 text-emerald-300">⚡</span>
                      <span>Minimal footprint and no dependencies.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-rose-600/10 text-rose-300">🎛️</span>
                      <span>Easy theming and timing tweaks.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </article>
          </div>
        </section>
      </div>
    </main >
  )
}
