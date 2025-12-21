import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'

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
            {/* <img src="/logo.png" alt="logo" className="h-7 w-6 rounded  object-cover" onError={(e)=>{e.currentTarget.onerror=null; e.currentTarget.style.display='none'}} /> */}
            <div className="text-white font-semibold text-3xl">Creatx.</div>
          </div>

          <div className="flex items-center gap-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "relative px-4 py-2 rounded-xl font-semibold bg-gradient-to-br from-[#7C3AED] to-[#3B82F6] bg-clip-text text-transparent scale-105 transition-all duration-200 nav-underline nav-underline-active"
                  : "relative px-4 py-2 rounded-xl text-slate-200 hover:bg-white/10 hover:text-white transition-all duration-200 nav-underline"
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/docs"
              className={({ isActive }) =>
                isActive
                  ? "relative px-4 py-2 rounded-xl font-semibold bg-gradient-to-br from-[#7C3AED] to-[#3B82F6] bg-clip-text text-transparent scale-105 transition-all duration-200 nav-underline nav-underline-active"
                  : "relative px-4 py-2 rounded-xl text-slate-200 hover:bg-white/10 hover:text-white transition-all duration-200 nav-underline"
              }
            >
              Docs
            </NavLink>

            <NavLink
              to="/library"
              className={({ isActive }) =>
                isActive
                  ? "relative px-4 py-2 rounded-xl font-semibold bg-gradient-to-br from-[#7C3AED] to-[#3B82F6] bg-clip-text text-transparent scale-105 transition-all duration-200 nav-underline nav-underline-active"
                  : "relative px-4 py-2 rounded-xl text-slate-200 hover:bg-white/10 hover:text-white transition-all duration-200 nav-underline"
              }
            >
              Animations
            </NavLink>

            <NavLink
              to="/create"
              className={({ isActive }) =>
                isActive
                  ? "relative px-4 py-2 rounded-xl font-semibold bg-gradient-to-br from-[#7C3AED] to-[#3B82F6] bg-clip-text text-transparent scale-105 transition-all duration-200 nav-underline nav-underline-active"
                  : "relative px-4 py-2 rounded-xl text-slate-200 hover:bg-white/10 hover:text-white transition-all duration-200 nav-underline"
              }
            >
              Create
            </NavLink>


          </div>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive
                ? "px-5 py-2 bg-white/10 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                : "px-5 py-2 bg-indigo-600 text-white hover:text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:bg-indigo-700"
            }
          >
            Login
          </NavLink>
        </div>
      </nav>
    </header>
  )
}
