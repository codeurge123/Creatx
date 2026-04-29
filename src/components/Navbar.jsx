import React from 'react'
import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { IoIosArrowForward } from "react-icons/io";
import { LogOut } from 'lucide-react';
import { userAPI } from '../services/userService';
import { clearAuthSession, getAccessToken, setStoredUser, subscribeToAuthChanges } from '../utils/auth';

export default function Navbar() {
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    checkAuthStatus()
  }, [])

  useEffect(() => {
    return subscribeToAuthChanges((detail) => {
      if (!detail?.isAuthenticated) {
        setIsAuthenticated(false)
        setUser(null)
        setLoading(false)
        return
      }

      if (detail.user) {
        setUser(detail.user)
        setIsAuthenticated(true)
        setLoading(false)
      } else {
        checkAuthStatus()
      }
    })
  }, [])

  const checkAuthStatus = async () => {
    try {
      const token = getAccessToken()
      if (token) {
        // Add a timeout to prevent hanging
        const timeoutId = setTimeout(() => {
          setIsAuthenticated(false)
          setUser(null)
          setLoading(false)
        }, 3000)
        
        try {
          const response = await userAPI.getCurrentUser()
          clearTimeout(timeoutId)
          setUser(response.data.data)
          setStoredUser(response.data.data)
          setIsAuthenticated(true)
          setLoading(false)
        } catch (error) {
          clearTimeout(timeoutId)
          console.error('Auth check failed:', error)
          clearAuthSession()
          setIsAuthenticated(false)
          setUser(null)
          setLoading(false)
        }
      } else {
        setIsAuthenticated(false)
        setUser(null)
        setLoading(false)
      }
    } catch (error) {
      console.error('Unexpected error in checkAuthStatus:', error)
      setIsAuthenticated(false)
      setUser(null)
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await userAPI.logout()
      clearAuthSession()
      setIsAuthenticated(false)
      setUser(null)
      navigate('/')
    } catch (error) {
      console.error('Logout failed:', error)
      // Force logout on client side
      clearAuthSession()
      setIsAuthenticated(false)
      setUser(null)
      navigate('/')
    }
  }

  const normal = 'bg-indigo-900/40 scale-105 shadow-xl backdrop-blur-md mx-auto max-w-8xl px-8 py-4 flex items-center justify-between rounded-3xl  transition-all duration-150'

  const scrolledStyle  = 'bg-indigo-900/40 border-indigo-600/40 scale-100 backdrop-blur-md shadow-xl mx-auto max-w-6xl px-8 py-4 flex items-center justify-between rounded-full transition-all duration-200';


  return (
    <header className="fixed top-7 left-0 right-0 z-50">
      <nav className="max-w-7xl mx-auto px-4">
        <div className={` ${scrolled ? scrolledStyle : normal}`}>
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
              to="/components"
              className={({ isActive }) =>
                isActive
                  ? "relative px-4 py-2 rounded-xl font-semibold bg-gradient-to-br from-[#7C3AED] to-[#3B82F6] bg-clip-text text-transparent scale-105 transition-all duration-200 nav-underline nav-underline-active"
                  : "relative px-4 py-2 rounded-xl text-slate-200 hover:bg-white/10 hover:text-white transition-all duration-200 nav-underline"
              }
            >
              Components
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

            <NavLink
              to="/community"
              className={({ isActive }) =>
                isActive
                  ? "relative px-4 py-2 rounded-xl font-semibold bg-gradient-to-br from-[#7C3AED] to-[#3B82F6] bg-clip-text text-transparent scale-105 transition-all duration-200 nav-underline nav-underline-active"
                  : "relative px-4 py-2 rounded-xl text-slate-200 hover:bg-white/10 hover:text-white transition-all duration-200 nav-underline"
              }
            >
              Community
            </NavLink>
          </div>

          <div className="flex items-center gap-2">
            {loading ? (
              <div className="w-8 h-8 animate-spin rounded-full border-2 border-white/20 border-t-white"></div>
            ) : isAuthenticated ? (
              <button
                onClick={() => navigate('/profile')}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-200 hover:text-white rounded-full transition-all duration-200"
              >
                <span className="h-7 w-7 rounded-full bg-indigo-500 flex items-center justify-center text-xs font-semibold text-white">
                  {user?.name?.[0]?.toUpperCase() || "U"}
                </span>
                <span className="text-sm font-semibold">Profile</span>
              </button>
            ) : (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive
                    ? "px-5 py-2 bg-white/10 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
                    : "px-5 py-2 bg-indigo-600 text-white hover:text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:bg-indigo-700"
                }
              >
                <div className='flex items-center gap-2'>
                  Get Started
                  <div className=''>
                    <IoIosArrowForward />
                  </div>
                </div>
              </NavLink>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}


