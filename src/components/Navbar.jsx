import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()

  const base = 'mx-auto max-w-6xl px-8 py-4 flex items-center justify-between rounded-3xl border transition-colors duration-200'
  // permanently use scrolled styles
  const scrolledClasses = 'bg-indigo-900/40 border-indigo-600/40 backdrop-blur-md shadow-xl'
  const boxClasses = `${base} ${scrolledClasses}`

  return (
    <header className="fixed top-7 left-0 right-0 z-50">
      <nav className="max-w-7xl mx-auto px-4">
        <div className={boxClasses}>
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate('/')} role="button" tabIndex={0}>
            <img src="/logo.png" alt="logo" className="h-10 w-10 rounded-full object-cover" onError={(e)=>{e.currentTarget.onerror=null; e.currentTarget.style.display='none'}} />
            <div className="text-white font-semibold text-lg">Creatx</div>
          </div>

          <div className="flex items-center gap-2">
            <Link to="/" className="px-3 py-1 rounded-md text-slate-200 hover:bg-white/10 hover:text-white transition-colors">Home</Link>
            <Link to="/library" className="px-3 py-1 rounded-md text-slate-200 hover:bg-white/10 hover:text-white transition-colors">Animations</Link>
            <Link to="/create" className="px-3 py-1 rounded-md text-slate-200 hover:bg-white/10 hover:text-white transition-colors">Create Animations</Link>
          </div>
        </div>
      </nav>
    </header>
  )
}
