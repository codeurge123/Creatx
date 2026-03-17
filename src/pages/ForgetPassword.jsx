import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { userAPI } from '../services/userService'

export default function ForgetPassword() {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        setMessage('')

        try {
            await userAPI.forgotPassword(email)
            setMessage('Password reset email sent! Check your inbox.')
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to send reset email')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen px-4 sm:px-6">
            <div className="w-full max-w-sm sm:max-w-md">
                {/* Back Button */}
                <div className="absolute top-6 left-6 z-50">
                    <Link
                        to="/login"
                        className="flex fixed items-center gap-2 bg-indigo-500/20 border border-indigo-400/30 text-white/80 hover:text-white px-4 py-2 rounded-xl transition text-sm sm:text-base"
                    >
                        ← Back to Login
                    </Link>
                </div>

                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl">
                    <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                        Reset Password
                    </h1>

                    <p className="text-center text-white/60 text-sm sm:text-base mb-6">
                        Enter your email address and we'll send you a link to reset your password.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm text-white/80 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="you@example.com"
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-white placeholder-white/40"
                            />
                        </div>

                        {error && (
                            <div className="text-red-400 text-sm text-center bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                                {error}
                            </div>
                        )}

                        {message && (
                            <div className="text-green-400 text-sm text-center bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                                {message}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Sending..." : "Send Reset Link"}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-white/60">
                        Remember your password?{" "}
                        <Link
                            to="/login"
                            className="text-indigo-400 hover:text-indigo-300 font-semibold"
                        >
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}