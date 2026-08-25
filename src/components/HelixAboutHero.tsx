"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function HelixAboutHero() {
  return (
    <section className="relative w-full py-20 md:py-32 px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 text-center max-w-4xl mx-auto space-y-8 animate-fade-up">

        {/* Main Animated Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-brand-600 font-heading leading-tight tracking-tight">
          <span className="bg-gradient-to-r from-brand-600 via-brand-700 to-brand-900 bg-clip-text text-transparent">
            PEN CRACK EDITORIAL STUDIO
          </span>
        </h1>

        {/* Hero Narrative (Black Body Text) */}
        <p className="text-black text-lg sm:text-xl md:text-2xl font-serif max-w-3xl mx-auto leading-relaxed">
          Pen Crack is a trailblazing remote-first writing and editorial studio dedicated to propelling authors, researchers, and enterprises towards success. We seamlessly integrate academic precision, commercial strategy, and creative literature.
        </p>

        {/* Action Buttons */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/#contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-8 py-4 rounded-xl font-medium text-base transition-all shadow-md hover:shadow-xl active:scale-95 group"
          >
            <span>Work With Us</span>
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
          <a
            href="#process"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-surface hover:bg-surface-hover text-brand-700 border border-border px-8 py-4 rounded-xl font-medium text-base transition-all active:scale-95"
          >
            <span>Explore Our Process</span>
          </a>
        </div>
      </div>
    </section>
  );
}
