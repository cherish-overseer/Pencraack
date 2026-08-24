"use client";

import Link from "next/link";
import { ChevronDown, ArrowRight } from "lucide-react";

export default function HelftHero() {
  return (
    <section className="relative w-full pt-16 pb-20 px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
      {/* Category Tag (Helft & Pinta style) */}
      <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-brand-600/10 border border-brand-600/20 text-brand-600 text-xs font-semibold uppercase tracking-[0.2em] mb-8 animate-fade-up">
        <span>Editorial Architecture</span>
        <span>•</span>
        <span>Literary Studio</span>
      </div>

      {/* Main Architectural Headline */}
      <h1 className="text-5xl sm:text-7xl md:text-8xl font-extrabold text-brand-600 font-heading leading-[1.05] tracking-tight max-w-5xl mb-8 animate-fade-up">
        We write. We read. We connect.
      </h1>

      {/* Subheadline (Black Body Text) */}
      <p className="text-black text-lg sm:text-2xl font-serif max-w-2xl leading-relaxed mb-10 animate-fade-up">
        Not sure how to say it? We help you say it well. Our team covers everything from academic research to creative ghostwriting.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
        <Link
          href="/services"
          className="inline-flex items-center gap-3 bg-brand-600 hover:bg-brand-700 text-white px-8 py-4 rounded-xl text-base font-semibold transition-all shadow-md active:scale-95 group font-heading"
        >
          <span>Explore All Services</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 bg-surface hover:bg-background border border-border text-black px-8 py-4 rounded-xl text-base font-semibold transition-all hover:border-brand-600/40 font-heading"
        >
          <span>Request Custom Quote</span>
        </Link>
      </div>

      {/* Helft & Pinta Vertical Separator Hairline */}
      <div className="w-full flex flex-col items-center">
        <div className="w-[1px] h-16 bg-gradient-to-b from-brand-600/40 to-brand-600" />
        <a
          href="#projects"
          className="w-10 h-10 rounded-full border border-brand-600/30 flex items-center justify-center text-brand-600 hover:bg-brand-600 hover:text-white transition-colors duration-300 -mt-2 bg-background shadow-sm"
          aria-label="Scroll to featured projects"
        >
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
