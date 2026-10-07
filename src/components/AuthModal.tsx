"use client";

import { useState } from "react";
import { usePencrack } from "@/context/PencrackContext";

export default function AuthModal() {
  const { isAuthOpen, closeAuth, authMode, openAuth, login } = usePencrack();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  if (!isAuthOpen) return null;

  const isSignup = authMode === "signup";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login();
  };

  return (
    <div
      className="fixed inset-0 z-[500] bg-[rgba(58,37,24,0.45)] backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
      onClick={(e) => e.target === e.currentTarget && closeAuth()}
    >
      <div className="bg-[var(--cream)] rounded-[var(--r-lg)] w-full max-w-[440px] shadow-[var(--shadow-lg)] overflow-hidden max-h-[92vh] overflow-y-auto">
        <div className="p-7 pb-0 relative">
          <button
            className="absolute top-4 right-4 w-9 h-9 rounded-xl text-[var(--brown)] grid place-items-center hover:bg-[var(--beige)] transition-colors"
            onClick={closeAuth}
          >
            ✕
          </button>
          <h2 className="font-serif text-2xl font-bold text-[var(--brown)]">
            {isSignup ? "Create your account" : "Welcome back"}
          </h2>
          <p className="text-[var(--muted)] text-sm mt-1">
            {isSignup
              ? "Join Pencrack to read, write, and support great literature."
              : "Log in to read, support, and publish on Pencrack."}
          </p>
        </div>

        <div className="p-7 space-y-4">
          <div className="flex flex-col gap-2.5">
            <button
              onClick={login}
              type="button"
              className="flex items-center justify-center gap-2.5 p-3 border border-[var(--line)] rounded-xl bg-white font-semibold text-sm text-[var(--ink)] hover:border-[var(--brown)] transition-colors"
            >
              <span>🔑 Continue with Google</span>
            </button>
            <button
              onClick={login}
              type="button"
              className="flex items-center justify-center gap-2.5 p-3 border border-[var(--line)] rounded-xl bg-white font-semibold text-sm text-[var(--ink)] hover:border-[var(--brown)] transition-colors"
            >
              <span>🍎 Continue with Apple</span>
            </button>
          </div>

          <div className="flex items-center gap-3 text-[var(--muted)] text-xs my-3">
            <div className="flex-1 h-[1px] bg-[var(--line)]" />
            <span>or</span>
            <div className="flex-1 h-[1px] bg-[var(--line)]" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {isSignup && (
              <div>
                <label className="block text-xs font-semibold text-[var(--brown)] mb-1 uppercase tracking-wider">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3.5 border border-[var(--line)] rounded-xl font-sans text-sm bg-white text-[var(--ink)] focus:outline-none focus:border-[var(--accent)]"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-[var(--brown)] mb-1 uppercase tracking-wider">
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3.5 border border-[var(--line)] rounded-xl font-sans text-sm bg-white text-[var(--ink)] focus:outline-none focus:border-[var(--accent)]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--brown)] mb-1 uppercase tracking-wider">
                Password
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3.5 border border-[var(--line)] rounded-xl font-sans text-sm bg-white text-[var(--ink)] focus:outline-none focus:border-[var(--accent)]"
              />
            </div>

            <button
              type="submit"
              className="w-full btn btn-primary justify-center py-3.5 text-base font-bold shadow-md mt-2"
            >
              {isSignup ? "Create Account" : "Log In"}
            </button>
          </form>

          <div className="text-center text-xs text-[var(--muted)] pt-2">
            {isSignup ? (
              <span>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => openAuth("login")}
                  className="text-[var(--brown)] font-bold hover:underline"
                >
                  Log in
                </button>
              </span>
            ) : (
              <span>
                New to Pencrack?{" "}
                <button
                  type="button"
                  onClick={() => openAuth("signup")}
                  className="text-[var(--brown)] font-bold hover:underline"
                >
                  Create an account
                </button>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
