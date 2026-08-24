"use client";

import Link from "next/link";
import { Mail, Sparkles } from "lucide-react";

export default function HelixContactHero() {
  return (
    <section className="relative w-full py-16 md:py-24 px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-brand-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 text-center max-w-3xl mx-auto space-y-6 animate-fade-up">
        {/* Breadcrumb */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-600/10 border border-brand-600/20 text-brand-600 text-xs font-semibold uppercase tracking-widest">
          <Link href="/" className="hover:underline">Home</Link>
          <span>/</span>
          <span>Contact</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-brand-600 font-heading leading-tight tracking-tight">
          Contact Us
        </h1>

        {/* Subtitle (Black Body Text) */}
        <p className="text-black text-lg sm:text-xl font-serif leading-relaxed">
          Have a project brief, an academic manuscript, or a corporate inquiry? Connect with our editorial directors today to discuss your vision.
        </p>
      </div>
    </section>
  );
}
