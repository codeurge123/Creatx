import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { userAPI } from "../services/userService";
import { isAuthenticated, setAuthSession } from "../utils/auth";

const initialForm = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function normalizeRegistrationForm(formData) {
  return {
    name: formData.name.trim(),
    email: formData.email.trim().toLowerCase(),
    password: formData.password,
    confirmPassword: formData.confirmPassword,
  };
}

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (isAuthenticated()) {
    return <Navigate to="/components" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const normalized = normalizeRegistrationForm(formData);

    if (!normalized.name || !normalized.email || !normalized.password) {
      setError("Name, email, and password are required.");
      return;
    }

    if (normalized.password !== normalized.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (normalized.password.length < 8) {
      setError("Password must be at least 8 characters long!");
      return;
    }

    if (!/[A-Z]/.test(normalized.password) || !/[a-z]/.test(normalized.password) || !/\d/.test(normalized.password)) {
      setError("Password must include upper-case, lower-case, and a number.");
      return;
    }

    setLoading(true);

    try {
      await userAPI.register({
        name: normalized.name,
        email: normalized.email,
        password: normalized.password,
      });

      const loginResponse = await userAPI.login({
        email: normalized.email,
        password: normalized.password,
      });
      const { accessToken, refreshToken, user } = loginResponse.data.data;
      setAuthSession({ accessToken, refreshToken, user });

      navigate("/components");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (


    <div className="flex items-center justify-center min-h-[100svh] px-4 sm:px-6 py-20 sm:py-0">
      {/* Header */}
      <div className="absolute top-6 left-6 z-50">
        <Link
          to="/"
          className="flex fixed items-center gap-2 bg-indigo-500/20 border border-indigo-400/30 text-white/80 hover:text-white px-4 py-2 rounded-xl transition text-sm sm:text-base"
        >
          ← Back to Home
        </Link>
      </div>
      <div className="w-full max-w-sm sm:max-w-md">

        {/* Card */}
        <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl">

          <h1 className="text-2xl sm:text-3xl font-bold mb-2 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Create Account
          </h1>

          <p className="text-white/60 text-sm sm:text-base mb-6 sm:mb-8">
            Join Creatx and start building components
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Name */}
            <div>
              <label className="block text-sm text-white/80 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                minLength={2}
                placeholder="John Doe"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-white placeholder-white/40 text-sm sm:text-base"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm text-white/80 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-white placeholder-white/40 text-sm sm:text-base"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-white/80 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={8}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-white placeholder-white/40 text-sm sm:text-base"
              />
              <p className="mt-2 text-xs text-white/45">
                Use at least 8 characters with upper-case, lower-case, and a number.
              </p>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm text-white/80 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                minLength={8}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-white placeholder-white/40 text-sm sm:text-base"
              />
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2 text-xs sm:text-sm">
              <input
                type="checkbox"
                required
                className="w-4 h-4 mt-1 rounded border-white/20 bg-white/5 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-white/70">
                I agree to the{" "}
                <Link
                  to="/terms"
                  className="text-indigo-400 hover:text-indigo-300"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  to="/privacy"
                  className="text-indigo-400 hover:text-indigo-300"
                >
                  Privacy Policy
                </Link>
              </span>
            </div>

            {error && (
              <div className="text-red-400 text-sm text-center bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                {error}
              </div>
            )}

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg font-semibold hover:opacity-90 transition text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center text-sm text-white/60">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-indigo-400 hover:text-indigo-300 font-semibold"
            >
              Sign in
            </Link>
          </div>

          <div className="mt-4 text-center text-xs text-white/45">
            After signup, we sign you in automatically and take you to the Components library.
          </div>

        </div>

        {/* Footer Text */}
        <div className="mt-6 text-center">
          <p className="text-white/50 text-xs">
            By signing up, you'll get access to our full library of micro-interactions and components.
          </p>
        </div>

      </div>
    </div>
  );
}
