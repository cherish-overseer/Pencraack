"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, Sparkles } from "lucide-react";
import QuoteModal from "./QuoteModal";

export default function Header() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu whenever the route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const navLinkClasses =
    "hover:text-brand-600 transition-colors pb-1 border-b-2 border-transparent hover:border-brand-600/30 whitespace-nowrap shrink-0";

  const mobileNavLinkClasses = (href: string) =>
    `flex items-center justify-between py-3 px-4 rounded-xl text-base font-heading font-medium transition-all ${
      pathname === href
        ? "bg-brand-600/10 text-brand-600 font-bold border border-brand-600/20"
        : "text-foreground hover:bg-surface hover:text-brand-600"
    }`;

  return (
    <>
      <header className="w-full flex items-center justify-between px-6 sm:px-8 py-5 max-w-7xl mx-auto relative z-40">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <Image
            src="/logo.png"
            alt="Pen Crack Logo"
            width={32}
            height={32}
            className="w-8 h-8 object-contain"
          />
          <span className="font-bold text-lg tracking-[0.15em] whitespace-nowrap font-heading">
            PEN CRACK
          </span>
        </Link>

        {/* Desktop Navigation (hidden on mobile) */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-7 text-sm font-medium text-foreground whitespace-nowrap flex-nowrap shrink-0">
          <Link href="/" className={navLinkClasses}>
            Home
          </Link>

          <div className="relative group inline-flex items-center shrink-0">
            <Link href="/services" className={navLinkClasses}>
              Services
            </Link>
            <div className="absolute top-full left-0 mt-4 w-[480px] bg-white border border-slate-200 shadow-xl rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 p-6 flex gap-6">
              <div className="flex-1">
                <h4 className="font-semibold text-brand-600 mb-3 text-xs uppercase tracking-wider">
                  Creative & Commercial
                </h4>
                <ul className="space-y-2 text-sm text-muted font-serif">
                  <li>
                    <Link
                      href="/services"
                      className="hover:text-brand-600 transition-colors"
                    >
                      Copywriting
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services"
                      className="hover:text-brand-600 transition-colors"
                    >
                      Editing
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services"
                      className="hover:text-brand-600 transition-colors"
                    >
                      Poetry
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services"
                      className="hover:text-brand-600 transition-colors"
                    >
                      Technical Writing
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services"
                      className="hover:text-brand-600 transition-colors"
                    >
                      Grant Writing
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services"
                      className="hover:text-brand-600 transition-colors"
                    >
                      Scriptwriting
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services"
                      className="hover:text-brand-600 transition-colors"
                    >
                      Newsletter
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services"
                      className="hover:text-brand-600 transition-colors"
                    >
                      Proofreading
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-brand-600 mb-3 text-xs uppercase tracking-wider">
                  Academic & Research
                </h4>
                <ul className="space-y-2 text-sm text-muted font-serif">
                  <li>
                    <Link
                      href="/services"
                      className="hover:text-brand-600 transition-colors"
                    >
                      Thesis Support
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services"
                      className="hover:text-brand-600 transition-colors"
                    >
                      White Papers
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services"
                      className="hover:text-brand-600 transition-colors"
                    >
                      UX Writing
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services"
                      className="hover:text-brand-600 transition-colors"
                    >
                      Content Strategy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services"
                      className="hover:text-brand-600 transition-colors"
                    >
                      Transcreation
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services"
                      className="hover:text-brand-600 transition-colors"
                    >
                      Speech Writing
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services"
                      className="hover:text-brand-600 transition-colors"
                    >
                      Resume Design
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services"
                      className="hover:text-brand-600 transition-colors"
                    >
                      Press Releases
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <Link href="/about" className={navLinkClasses}>
            About
          </Link>
          <Link href="/blog" className={navLinkClasses}>
            Blog
          </Link>
          <Link href="/poems" className={navLinkClasses}>
            Poems
          </Link>
          <Link href="/comics" className={navLinkClasses}>
            Comics
          </Link>
          <Link href="/contact" className={navLinkClasses}>
            Contact
          </Link>
        </nav>

        {/* Right Desktop CTA & Mobile Hamburger Trigger */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsQuoteOpen(true)}
            className="hidden sm:inline-flex bg-brand-700 hover:bg-brand-800 text-white px-5 py-2.5 text-sm font-medium transition-all shadow-sm hover:shadow-md active:scale-95 whitespace-nowrap shrink-0 font-heading cursor-pointer rounded-lg"
          >
            Get a Quote
          </button>

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl bg-surface border border-border text-foreground hover:text-brand-600 hover:border-brand-600/40 transition-colors"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-brand-600" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[73px] z-50 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-background border-b border-border shadow-2xl p-6 space-y-6 max-h-[calc(100vh-73px)] overflow-y-auto">
            <div className="space-y-1">
              <Link href="/" className={mobileNavLinkClasses("/")}>
                <span>Home</span>
                <ArrowRight className="w-4 h-4 opacity-50" />
              </Link>
              <Link href="/services" className={mobileNavLinkClasses("/services")}>
                <span>Services</span>
                <ArrowRight className="w-4 h-4 opacity-50" />
              </Link>
              <Link href="/about" className={mobileNavLinkClasses("/about")}>
                <span>About</span>
                <ArrowRight className="w-4 h-4 opacity-50" />
              </Link>
              <Link href="/blog" className={mobileNavLinkClasses("/blog")}>
                <span>Blog</span>
                <ArrowRight className="w-4 h-4 opacity-50" />
              </Link>
              <Link href="/poems" className={mobileNavLinkClasses("/poems")}>
                <span>Poems</span>
                <ArrowRight className="w-4 h-4 opacity-50" />
              </Link>
              <Link href="/comics" className={mobileNavLinkClasses("/comics")}>
                <span>Comics</span>
                <ArrowRight className="w-4 h-4 opacity-50" />
              </Link>
              <Link href="/contact" className={mobileNavLinkClasses("/contact")}>
                <span>Contact</span>
                <ArrowRight className="w-4 h-4 opacity-50" />
              </Link>
            </div>

            {/* Mobile Quote CTA Button */}
            <div className="pt-2 border-t border-border">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsQuoteOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white py-3.5 rounded-xl font-heading font-bold text-sm tracking-wide shadow-md active:scale-98 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>Get a Quote / Showcase</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quote Modal */}
      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
      />
    </>
  );
}
