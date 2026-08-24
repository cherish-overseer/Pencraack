"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import QuoteModal from "./QuoteModal";

export default function Header() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const navLinkClasses = "hover:text-brand-600 transition-colors pb-1 border-b-2 border-transparent hover:border-brand-600/30 whitespace-nowrap shrink-0";

  return (
    <>
      <header className="w-full flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <Image src="/logo.png" alt="Pen Crack Logo" width={32} height={32} className="w-8 h-8 object-contain" />
          <span className="font-bold text-lg tracking-[0.15em] whitespace-nowrap">PEN CRACK</span>
        </Link>

        <nav className="hidden md:flex items-center gap-5 lg:gap-7 text-sm font-medium text-foreground whitespace-nowrap flex-nowrap shrink-0">
          <Link href="/" className={navLinkClasses}>Home</Link>

          <div className="relative group inline-flex items-center shrink-0">
            <Link href="/services" className={navLinkClasses}>Services</Link>
            <div className="absolute top-full left-0 mt-4 w-[480px] bg-white border border-slate-200 shadow-xl rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 p-6 flex gap-6">
              <div className="flex-1">
                <h4 className="font-semibold text-brand-600 mb-3 text-xs uppercase tracking-wider">Creative & Commercial</h4>
                <ul className="space-y-2 text-sm text-muted font-serif">
                  <li><Link href="/services" className="hover:text-brand-600 transition-colors">Copywriting</Link></li>
                  <li><Link href="/services" className="hover:text-brand-600 transition-colors">Editing</Link></li>
                  <li><Link href="/services" className="hover:text-brand-600 transition-colors">Poetry</Link></li>
                  <li><Link href="/services" className="hover:text-brand-600 transition-colors">Technical Writing</Link></li>
                  <li><Link href="/services" className="hover:text-brand-600 transition-colors">Grant Writing</Link></li>
                  <li><Link href="/services" className="hover:text-brand-600 transition-colors">Scriptwriting</Link></li>
                  <li><Link href="/services" className="hover:text-brand-600 transition-colors">Newsletter</Link></li>
                  <li><Link href="/services" className="hover:text-brand-600 transition-colors">Proofreading</Link></li>
                </ul>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-brand-600 mb-3 text-xs uppercase tracking-wider">Academic & Research</h4>
                <ul className="space-y-2 text-sm text-muted font-serif">
                  <li><Link href="/services" className="hover:text-brand-600 transition-colors">Thesis Support</Link></li>
                  <li><Link href="/services" className="hover:text-brand-600 transition-colors">White Papers</Link></li>
                  <li><Link href="/services" className="hover:text-brand-600 transition-colors">UX Writing</Link></li>
                  <li><Link href="/services" className="hover:text-brand-600 transition-colors">Content Strategy</Link></li>
                  <li><Link href="/services" className="hover:text-brand-600 transition-colors">Transcreation</Link></li>
                  <li><Link href="/services" className="hover:text-brand-600 transition-colors">Speech Writing</Link></li>
                  <li><Link href="/services" className="hover:text-brand-600 transition-colors">Resume Design</Link></li>
                  <li><Link href="/services" className="hover:text-brand-600 transition-colors">Press Releases</Link></li>
                </ul>
              </div>
            </div>
          </div>

          <Link href="/about" className={navLinkClasses}>About</Link>
          <Link href="/blog" className={navLinkClasses}>Blog</Link>
          <Link href="/poems" className={navLinkClasses}>Poems</Link>
          <Link href="/comics" className={navLinkClasses}>Comics</Link>
          <Link href="/contact" className={navLinkClasses}>Contact</Link>
        </nav>

        <button
          onClick={() => setIsQuoteOpen(true)}
          className="bg-brand-700 hover:bg-brand-800 text-white px-6 py-2.5 text-sm font-medium transition-all shadow-sm hover:shadow-md active:scale-95 whitespace-nowrap shrink-0 font-heading cursor-pointer"
        >
          Get a Quote
        </button>
      </header>

      {/* Quote Modal */}
      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
      />
    </>
  );
}
