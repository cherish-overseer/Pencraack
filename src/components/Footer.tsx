"use client";

import Link from "next/link";
import { usePencrack } from "@/context/PencrackContext";

export default function Footer() {
  const { openAuth, showToast } = usePencrack();

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <div className="logo mb-3.5">
              <span className="nib">✎</span>PENCRACK
            </div>
            <p className="text-[#d9c3ac] max-w-[300px] text-sm leading-relaxed">
              A home for writers and readers to share stories, poems, blogs, comics and ideas — and to support the people behind them.
            </p>
          </div>

          <div>
            <h5>Explore</h5>
            <Link href="/blog">Blog</Link>
            <Link href="/stories">Stories</Link>
            <Link href="/poems">Poetry</Link>
            <Link href="/comics">Comics</Link>
          </div>

          <div>
            <h5>Platform</h5>
            <Link href="/services">Services</Link>
            <Link href="/about">About</Link>
            <button
              onClick={() => openAuth("signup")}
              className="text-left text-[#d9c3ac] hover:text-white py-1 text-sm block"
            >
              Start Writing
            </button>
            <Link href="/services">Request Service</Link>
          </div>

          <div>
            <h5>Company</h5>
            <button
              onClick={() => showToast("Careers coming soon")}
              className="text-left text-[#d9c3ac] hover:text-white py-1 text-sm block"
            >
              Careers
            </button>
            <button
              onClick={() => showToast("Privacy Policy")}
              className="text-left text-[#d9c3ac] hover:text-white py-1 text-sm block"
            >
              Privacy
            </button>
            <button
              onClick={() => showToast("Terms of Service")}
              className="text-left text-[#d9c3ac] hover:text-white py-1 text-sm block"
            >
              Terms
            </button>
            <Link href="/about">Contact</Link>
          </div>
        </div>

        <div className="foot-bottom">
          <span>© 2026 Pencrack. Crafted for storytellers.</span>
          <span>Made with ☕ and ink in Lagos, Nigeria</span>
        </div>
      </div>
    </footer>
  );
}
