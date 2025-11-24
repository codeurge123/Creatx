import React, { useState } from "react";
import { Link } from "react-router-dom";

const FORM_ACTION = ""; // Optional: replace with real endpoint

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [showModal, setShowModal] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    // client-side validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    try {
      if (FORM_ACTION) {
        const res = await fetch(FORM_ACTION, {
          method: "POST",
          body: JSON.stringify({ email }),
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) throw new Error("network");
        setStatus("success");
        setShowModal(true);
      } else {
        // local fallback
        const list = JSON.parse(localStorage.getItem("creatx_subs") || "[]");
        list.push({ email, ts: Date.now() });
        localStorage.setItem("creatx_subs", JSON.stringify(list));
        setStatus("success");
        setShowModal(true);
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <footer className="mt-12 border-t border-gray-600/40">
      <div className="max-w-6xl mx-auto py-12 px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm text-slate-300">
          <div>
            <div className="text-white text-left font-semibold text-xl">
              Creatx.
            </div>
            <p className="mt-3 text-left text-slate-400">
              Tiny animations, ready-to-use UI snippets, and playful
              micro-interactions for designers and developers.
            </p>
            <div className="mt-4 flex gap-4 text-slate-300">
              {/* X / Twitter */}
              <a
                href="https://twitter.com"
                target="_blank"
                aria-label="Twitter"
                className="hover:text-white transition-transform duration-200 hover:scale-110"
                title="Twitter"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="h-6 w-6"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.488 11.24H16.35l-5.215-6.817-5.97 6.817H1.857l7.73-8.832L1.5 2.25h6.066l4.713 6.231 5.965-6.231z" />
                </svg>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com"
                target="_blank"
                aria-label="GitHub"
                className="hover:text-white transition-transform duration-200 hover:scale-110"
                title="GitHub"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0.5C5.37 0.5 0 5.87 0 12.5c0 5.29 3.438 9.775 8.207 11.366.6.111.793-.261.793-.577 0-.285-.01-1.04-.016-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.744.083-.729.083-.729 1.205.085 1.84 1.27 1.84 1.27 1.07 1.834 2.807 1.303 3.492.996.108-.792.418-1.303.762-1.603-2.665-.303-5.466-1.362-5.466-6.062 0-1.34.465-2.433 1.236-3.293-.124-.303-.536-1.523.116-3.176 0 0 1.008-.322 3.3 1.257a11.52 11.52 0 0 1 6.018 0c2.292-1.579 3.3-1.257 3.3-1.257.652 1.653.24 2.873.118 3.176.771.86 1.236 1.953 1.236 3.293 0 4.712-2.807 5.756-5.48 6.053.43.37.823 1.103.823 2.222 0 1.606-.014 2.899-.014 3.293 0 .319.19.694.801.576C20.57 22.27 24 17.79 24 12.5 24 5.87 18.63.5 12 .5z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                aria-label="Instagram"
                className="hover:text-white transition-transform duration-200 hover:scale-110"
                title="Instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 5.25A4.75 4.75 0 1 0 16.75 12 4.76 4.76 0 0 0 12 7.25zm5.25-1.5a1.25 1.25 0 1 0 1.25 1.25 1.25 1.25 0 0 0-1.25-1.25z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <div className="ml-5 font-semibold text-lg text-left text-white mb-3">
              Quick Links
            </div>
            <ul className="ml-5 space-y-2 text-left">
              <li>
                <Link
                  className="text-slate-300 text-sm hover:text-white"
                  to=""
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className="text-slate-300 text-sm hover:text-white"
                  to="/library"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                >
                  Animations
                </Link>
              </li>
              <li>
                <Link
                  className="text-slate-300 text-sm hover:text-white"
                  to="/create"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                >
                  Create
                </Link>
              </li>
              <li>
                <Link className="text-slate-300 text-sm hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="font-semibold text-lg text-white text-left mb-3">
              Categories
            </div>
            <ul className="space-y-2 text-left">
              <li>
                <a className="text-slate-300 text-sm hover:text-white" href="#">
                  CSS Animations
                </a>
              </li>
              <li>
                <a className="text-slate-300 text-sm hover:text-white" href="#">
                  UI Effects
                </a>
              </li>
              <li>
                <a className="text-slate-300 text-sm hover:text-white" href="#">
                  Components
                </a>
              </li>
              <li>
                <a className="text-slate-300 text-sm hover:text-white" href="#">
                  Games
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className="font-semibold text-white text-lg text-left mb-3">Newsletter</div>
            <p className="text-slate-400 text-left mb-4">
              Subscribe to get the latest animation drops and code packs.
            </p>
            <form onSubmit={submit} className="flex flex-col gap-3">
              <label htmlFor="sub-email" className="sr-only">
                Enter your email
              </label>
              <input
                id="sub-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-full bg-[#0b1016] placeholder:text-slate-500 text-white border border-white/8 focus:outline-none"
              />
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full rounded-full px-4 py-3 bg-[#2b3036] hover:bg-[#3a3f44] text-white font-medium border border-white/8"
              >
                {status === "sending" ? "Sending..." : "Subscribe"}
              </button>
            </form>
            <div className="mt-3 text-xs">
              {status === "success" && (
                <div className="text-green-400">
                  Thanks — you'll be notified.
                </div>
              )}
              {status === "error" && (
                <div className="text-rose-400">
                  Please enter a valid email or try again.
                </div>
              )}
              {status === "idle" && (<div className="text-slate-500">We respect your privacy.</div>)}
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
            <a className="hover:text-white" href="#">
              Privacy Policy
            </a>
            <a className="hover:text-white" href="#">
              Terms of Service
            </a>
            <a className="hover:text-white" href="#">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>

      {/* Subscribe Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => {
              setShowModal(false);
              setStatus("idle");
            }}
          />
          <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl transform animate-scaleIn">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <h3 className="text-2xl font-semibold">Subscribed</h3>
                <p className="mt-10 text-slate-300 text-lg">
                  Thanks — you'll get our latest animation drops and code packs.
                </p>
              </div>
            </div>
            <div className="mt-8 text-right">
              <button
                onClick={() => {
                  setShowModal(false);
                  setStatus("idle");
                  setEmail("");
                }}
                className="px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
