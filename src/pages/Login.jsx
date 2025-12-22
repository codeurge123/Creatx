import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Login({ onNavigate }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate();

    const handleSubmit = () => {
        console.log('Login:', { email, password })
    }

    return (
        <div className="flex items-center justify-center p-4 relative">
            <button
                onClick={() => navigate('/')}
                className="absolute top-0 left-6 text-white/60 hover:text-white/90 text-sm transition-colors flex items-center gap-2"
            >
                <span>←</span> Back to Home
            </button>
            <div className="w-full max-w-md mt-16 mb-16">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">Creatx.</h1>
                    <p className="text-white/60">Welcome back to your animations</p>
                </div>

                <div
                    className="backdrop-blur-xl bg-white/10 rounded-2xl p-8 shadow-2xl border border-white/20 transition-all duration-300"
                    onMouseMove={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect()
                        e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
                        e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.setProperty('--mouse-x', '50%')
                        e.currentTarget.style.setProperty('--mouse-y', '50%')
                    }}
                    style={{
                        background: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(99, 102, 241, 0.1), transparent 50%)',
                    }}
                >
                    <h2 className="text-2xl font-bold text-white mb-6">Sign In</h2>

                    <div className="space-y-4">
                        <form action="">

                            <div>
                                <label className="block mt-2 text-sm font-medium text-white/80 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-white placeholder-white/40"
                                    placeholder="bansalyash316@gmail.com"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mt-2 text-sm font-medium text-white/80 mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-white placeholder-white/40"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>

                            <div className="flex mt-4 items-center justify-between text-sm">
                                <label className="flex items-center text-white/60 cursor-pointer">
                                    <input type="checkbox" className="mr-2 rounded" />
                                    Remember me
                                </label>
                                <a href="#" className="text-indigo-400 hover:text-indigo-300 transition-colors">
                                    Forgot password?
                                </a>
                            </div>

                            <button
                                onClick={handleSubmit}
                                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-[1.02] shadow-lg mt-7"
                            >
                                Sign In
                            </button>
                        </form>
                    </div>
                </div>

                <p className="text-center text-white/60 mt-6">
                    Don't have an account?{' '}
                    <button
                        onClick={() => onNavigate('register')}
                        className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors"
                    >
                        Sign Up
                    </button>
                </p>
            </div>
        </div>
    )
}

function Register({ onNavigate }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value })
    }

    const handleSubmit = () => {
        console.log('Register:', formData)
    }
    const navigate = useNavigate();

    return (
        <div className="flex items-center mt-0 justify-center p-4 relative">
            <button
                onClick={() => navigate('/')}
                className="absolute top-5 left-6 text-white/60 hover:text-white/90 text-sm transition-colors flex items-center gap-2"
            >
                <span>←</span> Back to Home
            </button>
            <div className="w-full max-w-md mb-20">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">Creatx.</h1>
                    <p className="text-white/60">Start creating beautiful animations</p>
                </div>

                <div
                    className="backdrop-blur-xl bg-white/10 rounded-2xl p-8 shadow-2xl border border-white/20 transition-all duration-300"
                    onMouseMove={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect()
                        e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
                        e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.setProperty('--mouse-x', '50%')
                        e.currentTarget.style.setProperty('--mouse-y', '50%')
                    }}
                    style={{
                        background: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(147, 51, 234, 0.1), transparent 50%)',
                    }}
                >
                    <h2 className="text-2xl font-bold text-white mb-6">Create Account</h2>

                    <div className="space-y-4">
                        <form action="">
                            <div>
                                <label className="block text-sm font-medium text-white/80 mb-2">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => handleChange('name', e.target.value)}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-white placeholder-white/40"
                                    placeholder="Yash Bansal"
                                    required
                                />
                            </div>

                            <div>

                                <label className="block mt-2 text-sm font-medium text-white/80 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => handleChange('email', e.target.value)}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-white placeholder-white/40"
                                    placeholder="bansalyash316@gmmail.com"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mt-2 text-sm font-medium text-white/80 mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) => handleChange('password', e.target.value)}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-white placeholder-white/40"
                                    placeholder="••••••••"
                                    required

                                />
                            </div>

                            <div>
                                <label className="block mt-2 text-sm font-medium text-white/80 mb-2">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    value={formData.confirmPassword}
                                    onChange={(e) => handleChange('confirmPassword', e.target.value)}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-white placeholder-white/40"
                                    placeholder="••••••••"
                                    required

                                />
                            </div>

                            <div className="flex items-center mt-4 ml-1 text-sm">
                                <input type="checkbox" className="mr-2 rounded" />
                                <label className="text-white/60">
                                    I agree to the Terms of Service and Privacy Policy
                                </label>
                            </div>

                            <button
                                onClick={handleSubmit}
                                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-[1.02] shadow-lg mt-8"
                            >
                                Create Account
                            </button>
                        </form>
                    </div>
                </div>

                <p className="text-center text-white/60 mt-6">
                    Already have an account?{' '}
                    <button
                        onClick={() => onNavigate('login')}
                        className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
                    >
                        Sign In
                    </button>
                </p>
            </div>
        </div >
    )
}


export default function AuthDemo() {
    const [currentPage, setCurrentPage] = useState('login')

    return (
        <div className="fixed inset-14 overflow-hidden">
            {currentPage === 'login' ? (
                <Login onNavigate={setCurrentPage} />
            ) : (
                <Register onNavigate={setCurrentPage} />
            )}
        </div>
    )
}