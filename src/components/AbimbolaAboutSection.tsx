"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function AbimbolaAboutSection() {
  const credentials = [
    "Master Thesis & Dissertation Support",
    "Commercial Copywriting & Strategic Brand Voice",
    "Poetry Anthologies & Lyrical Verse Publications",
    "100% Original, Plagiarism-Free Academic Standards",
    "Senior Literary Editors & Ghostwriters — 15+ Years Combined",
  ];

  return (
    <section id="about" className="py-20 lg:py-28 px-6 lg:px-12 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">
          {/* Left Column (7 cols) */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div>
              <span className="inline-flex items-center gap-2 text-brand-600 text-xs font-bold tracking-[0.2em] uppercase mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>About Pen Crack Studio</span>
              </span>

              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-600 leading-tight">
                We believe every idea holds a story worth{" "}
                <em className="text-[#823919] not-italic italic font-heading">writing down.</em>
              </h2>
            </div>

            <div className="space-y-5 text-black text-base sm:text-lg font-serif leading-relaxed">
              <p>
                At Pen Crack, we are the team writers, researchers, and brands come to when they need to think something through. About academic rigor. About commercial clarity. About the words that will shape their next chapter.
              </p>
              <p>
                We merge university-level research precision with compelling narrative architecture. We have sat with authors at every stage — those holding an early draft, those preparing a doctoral dissertation, and enterprise founders launching their brand into the world.
              </p>
              <p>
                At the heart of everything we do is one belief: that words deserve clarity, dedication, and craft.
              </p>
            </div>

            {/* Dashed Credentials List */}
            <div className="space-y-3 pt-2">
              {credentials.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 text-sm font-serif">
                  <span className="text-brand-600 font-bold text-base select-none mt-0.5">—</span>
                  <span className="text-black font-medium">{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-brand-600 font-heading text-sm font-bold tracking-wide uppercase hover:text-brand-700 transition-colors border-b-2 border-brand-600/30 pb-1"
              >
                <span>Explore Our Story & Process</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Visual Artwork Card (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-stone-900 to-black p-8 sm:p-12 shadow-2xl border border-brand-600/20 text-white min-h-[460px] flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#c9963f]/20 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#c9963f] bg-white/10 px-3.5 py-1 rounded-full border border-white/20">
                  Established 2024
                </span>
                <span className="text-2xl select-none">✦</span>
              </div>

              <div className="relative z-10 space-y-4 pt-12">
                <p className="font-heading text-2xl sm:text-3xl italic text-white leading-relaxed">
                  "We believe every life holds a lesson, and every idea holds a story worth writing down."
                </p>
                <div className="pt-4 border-t border-white/20">
                  <p className="text-[#c9963f] font-heading font-bold text-sm">
                    Pen Crack Editorial Directors
                  </p>
                  <p className="text-white/70 text-xs font-serif">
                    Literary Directors · Academic Researchers · Narrative Strategists
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
