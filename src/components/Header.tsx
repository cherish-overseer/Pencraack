"use client";

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
    openAuth,
    logout,
    showToast,
  } = usePencrack();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: "Stories", href: "/stories" },
    { name: "Poetry", href: "/poems" },
    { name: "Comics", href: "/comics" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
  ];

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
            <button
              className="icon-btn"
              onClick={() => showToast("Search coming up in next update!")}
              title="Search"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </button>

            {!isLoggedIn ? (
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  className="btn btn-ghost btn-sm hidden sm:inline-flex"
                  onClick={() => openAuth("login")}
                >
                  Login
                </button>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() => openAuth("signup")}
                >
                  Sign Up
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  className="icon-btn hidden sm:grid"
                  onClick={() => showToast("Saved Library")}
                  title="My Library"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                  </svg>
                </button>
                <button
                  className="icon-btn"
                  onClick={() => showToast("No new notifications")}
                  title="Notifications"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                  </svg>
                  <span className="dot" />
                </button>
                <button
                  className="btn btn-primary btn-sm hidden sm:inline-flex"
                  onClick={() => showToast("Author Publishing Studio")}
                >
                  + Create
                </button>
                <img
                  className="avatar"
                  src="https://i.pravatar.cc/120?img=47"
                  alt="Avatar"
                  onClick={() => showToast("Author Dashboard")}
                  title="Dashboard"
                />
              </div>
            )}

            <button
              className="icon-btn hamburger"
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
            <button className="icon-btn" onClick={closeDrawer}>
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
                className="btn btn-ghost btn-block"
                onClick={() => {
                  closeDrawer();
                  openAuth("login");
                }}
              >
                Login
              </button>
              <button
                className="btn btn-primary btn-block"
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
              <button
                className="text-left py-3 px-3 font-semibold text-[var(--brown)] hover:bg-[var(--beige)] rounded-xl"
                onClick={() => {
                  closeDrawer();
                  showToast("Author Studio");
                }}
              >
                Create / Upload
              </button>
              <button
                className="text-left py-3 px-3 font-semibold text-[var(--brown)] hover:bg-[var(--beige)] rounded-xl"
                onClick={() => {
                  closeDrawer();
                  showToast("My Library");
                }}
              >
                My Library
              </button>
              <button
                className="text-left py-3 px-3 font-semibold text-rose-700 hover:bg-[var(--beige)] rounded-xl"
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
