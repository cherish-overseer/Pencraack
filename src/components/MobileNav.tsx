"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePencrack } from "@/context/PencrackContext";

export default function MobileNav() {
  const pathname = usePathname();
  const { openAuth, showToast } = usePencrack();

  return (
    <nav className="mobnav">
      <div className="mn-row">
        <Link href="/" className={pathname === "/" ? "active" : ""}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 10.5 12 3l9 7.5M5 9v11h14V9" />
          </svg>
          <span>Home</span>
        </Link>

        <Link href="/stories" className={pathname === "/stories" ? "active" : ""}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <span>Explore</span>
        </Link>

        <div className="mn-create">
          <button
            onClick={() => openAuth("signup")}
            className="fab"
            title="Create Work"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </button>
          <span className="text-[11px] font-semibold text-[var(--muted)] text-center block">
            Create
          </span>
        </div>

        <button
          onClick={() => showToast("Library")}
          className="flex flex-col items-center gap-0.5 text-[11px] font-semibold text-[var(--muted)]"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          </svg>
          <span>Library</span>
        </button>

        <button
          onClick={() => openAuth("login")}
          className="flex flex-col items-center gap-0.5 text-[11px] font-semibold text-[var(--muted)]"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21a8 8 0 0 1 16 0" />
          </svg>
          <span>Profile</span>
        </button>
      </div>
    </nav>
  );
}
