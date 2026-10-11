"use client";

import { useState } from "react";
import { usePencrack } from "@/context/PencrackContext";

export default function AuthModal() {
  const { isAuthOpen, closeAuth, authMode, openAuth, login, register } = usePencrack();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [isWriter, setIsWriter] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  if (!isAuthOpen) return null;

  const isSignup = authMode === "signup";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      if (isSignup) {
        const generatedUsername = username.trim() || email.split("@")[0].replace(/[^a-zA-Z0-9_]/g, "");
        const res = await register({
          fullName: name.trim(),
          username: generatedUsername,
          email: email.trim(),
          password,
          isWriter,
        });
        if (!res.success && res.error) {
          setErrorMessage(res.error);
        }
      } else {
        const res = await login(email.trim(), password);
        if (!res.success && res.error) {
          setErrorMessage(res.error);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemoLogin = async (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword("Password123!");
    setLoading(true);
    setErrorMessage("");
    await login(demoEmail, "Password123!");
    setLoading(false);
  };

  return (
    <div
      className="fixed inset-0 z-[500] bg-[rgba(40,25,16,0.55)] backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in"
      onClick={(e) => e.target === e.currentTarget && closeAuth()}
    >
      <div className="bg-[#faf5ee] border border-[#e8dccb] rounded-[28px] w-full max-w-[460px] shadow-[0_24px_60px_rgba(58,37,24,0.22)] overflow-hidden max-h-[92vh] flex flex-col">
        {/* ===================== TOP HEADER & CONTROLS ===================== */}
        <div className="p-6 sm:p-7 pb-4 relative border-b border-[#ebdcca] bg-[#fbf8f2]">
          {/* Close button */}
          <button
            type="button"
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-stone-200/70 hover:bg-stone-300 text-stone-600 grid place-items-center transition-colors cursor-pointer text-sm font-bold"
            onClick={closeAuth}
            aria-label="Close dialog"
          >
            ✕
          </button>

          {/* Segmented Mode Switcher */}
          <div className="inline-flex bg-[#ede1cf] p-1 rounded-xl mb-4 border border-[#dfceb9]">
            <button
              type="button"
              onClick={() => {
                setErrorMessage("");
                openAuth("login");
              }}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                !isSignup
                  ? "bg-white text-[var(--brown)] shadow-xs"
                  : "text-[var(--muted)] hover:text-[var(--brown)]"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setErrorMessage("");
                openAuth("signup");
              }}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                isSignup
                  ? "bg-white text-[var(--brown)] shadow-xs"
                  : "text-[var(--muted)] hover:text-[var(--brown)]"
              }`}
            >
              Create Account
            </button>
          </div>

          <h2 className="font-serif text-2xl sm:text-[26px] font-bold text-[var(--brown)] leading-tight">
            {isSignup ? "Join Pencrack" : "Welcome back"}
          </h2>
          <p className="text-[var(--muted)] text-xs sm:text-[13px] mt-1 leading-relaxed">
            {isSignup
              ? "Read African literature, support vetted creators, and publish your work."
              : "Access your reading library, author wallet, and published collections."}
          </p>

          {/* Sleek Demo Credentials Ribbon */}
          <div className="mt-4 pt-3 border-t border-[#ebdcca]/70 flex items-center justify-between gap-2">
            <span className="text-[11px] font-mono text-[var(--muted)] font-medium">Quick sign-in:</span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin("admin@pencrack.com")}
                className="px-2.5 py-1 rounded-lg bg-white border border-[#e2d2be] hover:border-[var(--brown)] hover:bg-[#faf5ee] text-[var(--brown)] font-semibold text-[11px] transition-all cursor-pointer flex items-center gap-1 shadow-xs"
                title="Log in as Administrator"
              >
                <span>👑</span>
                <span>Admin</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoLogin("adaeze@pencrack.com")}
                className="px-2.5 py-1 rounded-lg bg-white border border-[#e2d2be] hover:border-[var(--brown)] hover:bg-[#faf5ee] text-[var(--brown)] font-semibold text-[11px] transition-all cursor-pointer flex items-center gap-1 shadow-xs"
                title="Log in as Featured Writer"
              >
                <span>✍️</span>
                <span>Writer</span>
              </button>
            </div>
          </div>
        </div>

        {/* ===================== FORM BODY ===================== */}
        <div className="p-6 sm:p-7 overflow-y-auto flex-1 space-y-4">
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
              <span>⚠️</span>
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignup && (
              <>
                <div>
                  <label className="modal-label">Full Name</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-3.5 text-stone-400 text-xs pointer-events-none">
                      👤
                    </span>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Chinua Achebe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="modal-input !pl-9"
                    />
                  </div>
                </div>

                <div>
                  <label className="modal-label">
                    Username <span className="text-[var(--muted)] font-normal text-[11px]">(Optional)</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-3.5 text-stone-400 text-xs pointer-events-none font-mono">
                      @
                    </span>
                    <input
                      type="text"
                      placeholder="e.g. chinua.writes"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="modal-input !pl-9"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="modal-label">Email or Username</label>
              <div className="relative">
                <span className="absolute left-3.5 top-3.5 text-stone-400 text-xs pointer-events-none">
                  ✉️
                </span>
                <input
                  type="text"
                  required
                  placeholder="name@example.com or username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="modal-input !pl-9"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="modal-label !mb-0">Password</label>
                {!isSignup && (
                  <button
                    type="button"
                    onClick={() => {
                      setEmail("admin@pencrack.com");
                      setPassword("Password123!");
                    }}
                    className="text-[11px] text-[var(--accent)] hover:text-[var(--brown)] font-medium cursor-pointer"
                  >
                    Use default password?
                  </button>
                )}
              </div>
              <div className="relative">
                <span className="absolute left-3.5 top-3.5 text-stone-400 text-xs pointer-events-none">
                  🔒
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="modal-input !pl-9 !pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-stone-400 hover:text-stone-700 text-xs cursor-pointer p-1"
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </div>

            {isSignup && (
              <label className="flex items-start gap-3 p-3 rounded-xl bg-white border border-[#e8dccb] cursor-pointer hover:border-[var(--brown)] transition-colors">
                <input
                  type="checkbox"
                  checked={isWriter}
                  onChange={(e) => setIsWriter(e.target.checked)}
                  className="mt-0.5 rounded border-[#e8dccb] text-[var(--brown)] focus:ring-0 cursor-pointer"
                />
                <div className="text-xs">
                  <div className="font-bold text-[var(--brown)] flex items-center gap-1.5">
                    <span>✍️</span> Join as a Content Writer
                  </div>
                  <div className="text-[var(--muted)] text-[11px] leading-relaxed mt-0.5">
                    Publish stories, poems, and comics. Receive direct cash tips into your creator ledger wallet.
                  </div>
                </div>
              </label>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn btn-primary justify-center py-3.5 text-sm font-bold shadow-md hover:shadow-lg mt-3 cursor-pointer disabled:opacity-50 transition-all flex items-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <span>{isSignup ? "Create Account & Get Started" : "Sign In to Pencrack"}</span>
              )}
            </button>
          </form>

          {/* Footer switch prompt */}
          <div className="text-center text-xs text-[var(--muted)] pt-3 border-t border-[#ebdcca]">
            {isSignup ? (
              <span>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setErrorMessage("");
                    openAuth("login");
                  }}
                  className="text-[var(--brown)] font-bold hover:underline cursor-pointer"
                >
                  Sign in
                </button>
              </span>
            ) : (
              <span>
                New to Pencrack?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setErrorMessage("");
                    openAuth("signup");
                  }}
                  className="text-[var(--brown)] font-bold hover:underline cursor-pointer"
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
