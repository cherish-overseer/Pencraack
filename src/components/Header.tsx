"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePencrack } from "@/context/PencrackContext";

export default function Header() {
  const pathname = usePathname();
  const {
    isDrawerOpen,
    toggleDrawer,
    closeDrawer,
    isLoggedIn,
    user,
    openAuth,
    logout,
    showToast,
  } = usePencrack();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: "Stories", href: "/stories" },
    { name: "Poetry", href: "/poems" },
    { name: "Comics", href: "/comics" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "API Docs", href: "/api-docs" },
  ];

  const userAvatar =
    user?.avatarUrl || "https://i.pravatar.cc/120?img=32";
  const displayName =
    user?.fullName || user?.username || "Pencrack Member";

  return (
    <>
      <header className="nav">
        <div className="wrap nav-in">
          <Link href="/" className="logo">
            <span className="nib">✎</span>PENCRACK
          </Link>

          <nav className="nav-links">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={pathname === link.href ? "active" : ""}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="nav-right">
            {!isLoggedIn ? (
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  className="btn btn-ghost btn-sm hidden sm:inline-flex cursor-pointer"
                  onClick={() => openAuth("login")}
                >
                  Login
                </button>
                <button
                  type="button"
                  className="btn btn-primary btn-sm cursor-pointer"
                  onClick={() => openAuth("signup")}
                >
                  Sign Up
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2.5 relative">
                {user?.wallet && (
                  <div
                    className="hidden md:flex items-center gap-1.5 px-3 py-1 bg-[var(--beige)] border border-[var(--line)] rounded-full text-xs font-bold text-[var(--brown)] cursor-pointer"
                    title="Ledger Balance"
                    onClick={() =>
                      showToast(`Wallet Balance: ₦${Number(user.wallet?.availableBalance || 0).toLocaleString()}`, "info")
                    }
                  >
                    <span>💳</span>
                    <span>₦{Number(user.wallet?.availableBalance || 0).toLocaleString()}</span>
                  </div>
                )}

                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 cursor-pointer focus:outline-none"
                  >
                    <img
                      className="avatar border border-[var(--line)] hover:ring-2 hover:ring-[var(--brown)] transition-all"
                      src={userAvatar}
                      alt={displayName}
                    />
                    <span className="hidden lg:inline text-xs font-bold text-[var(--brown)] max-w-[110px] truncate">
                      {displayName}
                    </span>
                  </button>

                  {/* Desktop Dropdown */}
                  {isUserMenuOpen && (
                    <div
                      className="absolute right-0 mt-2 w-56 bg-white border border-[var(--line)] rounded-2xl shadow-[var(--shadow-lg)] py-2 z-50 animate-fade-in"
                      onMouseLeave={() => setIsUserMenuOpen(false)}
                    >
                      <div className="px-4 py-2 border-b border-[var(--line)]">
                        <p className="text-xs font-bold text-[var(--brown)] truncate">{displayName}</p>
                        <p className="text-[11px] text-[var(--muted)] truncate">{user?.email}</p>
                        {user?.roles && (
                          <div className="flex gap-1 mt-1">
                            {user.roles.map((r) => (
                              <span
                                key={r}
                                className="px-1.5 py-0.5 bg-[var(--beige)] text-[var(--brown-700)] rounded text-[9px] font-bold uppercase tracking-wider"
                              >
                                {r}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      <Link
                        href="/api-docs"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-xs text-[var(--ink)] hover:bg-[var(--beige)] font-medium"
                      >
                        <span>📖</span> Interactive API Docs
                      </Link>

                      <button
                        type="button"
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          showToast("Library synced");
                        }}
                        className="w-full text-left flex items-center gap-2 px-4 py-2 text-xs text-[var(--ink)] hover:bg-[var(--beige)] font-medium cursor-pointer"
                      >
                        <span>📚</span> My Reading Library
                      </button>

                      <div className="h-[1px] bg-[var(--line)] my-1" />

                      <button
                        type="button"
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          logout();
                        }}
                        className="w-full text-left flex items-center gap-2 px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 font-bold cursor-pointer"
                      >
                        <span>🚪</span> Log out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            <button
              className="icon-btn hamburger cursor-pointer"
              onClick={toggleDrawer}
              aria-label="Toggle menu"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`drawer ${isDrawerOpen ? "open" : ""}`}
        onClick={(e) => e.target === e.currentTarget && closeDrawer()}
      >
        <div className="drawer-panel">
          <div className="flex justify-between items-center mb-4">
            <span className="logo text-xl">
              <span className="nib">✎</span>PENCRACK
            </span>
            <button className="icon-btn cursor-pointer" onClick={closeDrawer}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeDrawer}
                className={pathname === link.href ? "bg-[var(--beige)] font-bold" : ""}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="h-[1px] bg-[var(--line)] my-4" />

          {!isLoggedIn ? (
            <div className="flex flex-col gap-2.5">
              <button
                className="btn btn-ghost btn-block cursor-pointer"
                onClick={() => {
                  closeDrawer();
                  openAuth("login");
                }}
              >
                Login
              </button>
              <button
                className="btn btn-primary btn-block cursor-pointer"
                onClick={() => {
                  closeDrawer();
                  openAuth("signup");
                }}
              >
                Sign Up
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-1.5">
              <div className="p-3 bg-[var(--beige)] rounded-xl mb-2">
                <p className="font-bold text-xs text-[var(--brown)]">{displayName}</p>
                <p className="text-[11px] text-[var(--muted)]">{user?.email}</p>
                {user?.wallet && (
                  <p className="text-xs font-bold text-emerald-700 mt-1">
                    Wallet: ₦{Number(user.wallet?.availableBalance || 0).toLocaleString()}
                  </p>
                )}
              </div>
              <button
                className="text-left py-2.5 px-3 font-semibold text-[var(--brown)] hover:bg-[var(--beige)] rounded-xl cursor-pointer"
                onClick={() => {
                  closeDrawer();
                  showToast("My Library");
                }}
              >
                My Library
              </button>
              <button
                className="text-left py-2.5 px-3 font-semibold text-rose-700 hover:bg-rose-50 rounded-xl cursor-pointer"
                onClick={() => {
                  closeDrawer();
                  logout();
                }}
              >
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
