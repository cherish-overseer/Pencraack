"use client";

import Link from "next/link";
import { ArrowRight, Feather, ShieldCheck, Users, Sparkles } from "lucide-react";

export default function AbimbolaHero() {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:py-20 bg-background">
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline & CTAs (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            {/* Eyebrow */}
            <div className="mb-5 animate-fade-up">
              <span className="inline-flex items-center gap-2 text-brand-600 text-xs sm:text-[0.75rem] font-semibold tracking-[0.22em] uppercase bg-brand-600/10 px-3.5 py-1.5 rounded-full border border-brand-600/20">
                <Sparkles className="w-3.5 h-3.5 text-brand-600" />
                <span>A Studio with a Pen and a Purpose</span>
              </span>
            </div>

            {/* Headline with Gold/Brand Underline */}
            <h1 className="font-heading text-4xl sm:text-6xl lg:text-[4rem] font-extrabold leading-[1.08] text-brand-600 mb-6 tracking-tight animate-fade-up">
              For the one who is
              <br />
              thinking deeply
              <br />
              about{" "}
              <span className="relative inline-block italic font-heading text-[#823919]">
                words.
                <svg
                  className="absolute -bottom-3 left-0 w-[110%] h-[18px] pointer-events-none"
                  viewBox="0 0 100 20"
                  preserveAspectRatio="none"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2,8 Q40,0 98,4"
                    stroke="#823919"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M15,16 Q50,11 85,13"
                    stroke="#c9963f"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    opacity="0.8"
                  />
                </svg>
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-black text-base sm:text-lg font-serif leading-relaxed mb-8 max-w-xl animate-fade-up">
              We write with clarity, precision, and the quiet rigor of master wordsmiths. From university thesis support to commercial brand strategy and poetic publishing.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10 lg:mb-0 animate-fade-up">
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-600 text-white text-sm font-semibold tracking-wide rounded-full hover:bg-brand-700 transition-all duration-300 shadow-md active:scale-95 font-heading"
              >
                <span>Explore All Services</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-brand-600/30 bg-surface text-black text-sm font-semibold tracking-wide rounded-full hover:bg-background transition-all duration-300 shadow-sm font-heading"
              >
                <span>Request Custom Quote</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Luxury Framed Visual Artwork (5 cols) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md aspect-[4/5] rounded-[2.5rem] p-3 bg-gradient-to-b from-[#c9963f]/30 via-brand-600/20 to-transparent border border-brand-600/20 shadow-2xl overflow-hidden">
              <div className="w-full h-full rounded-[2rem] bg-gradient-to-br from-brand-600 via-stone-900 to-amber-950 p-8 flex flex-col justify-between text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex items-center justify-between relative z-10">
                  <span className="text-4xl select-none">✒️</span>
                  <span className="text-xs font-mono font-bold tracking-widest bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 uppercase">
                    Pen Crack Studio
                  </span>
                </div>

                <div className="space-y-3 relative z-10">
                  <span className="text-[#c9963f] text-xs font-mono uppercase tracking-widest block font-bold">
                    Editorial Architecture
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-white leading-tight">
                    Where Rigor Meets Creative Artistry.
                  </h3>
                  <p className="text-white/80 text-xs font-serif italic">
                    "Words have energy and persistence. They are a force for change."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Bar (abimbolalawuyi.com style) */}
      <div className="mt-16 border-y border-border bg-surface py-6 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-border">
          <div className="flex items-center gap-4 pt-4 md:pt-0">
            <span className="w-12 h-12 rounded-2xl bg-brand-600/10 text-brand-600 flex items-center justify-center shrink-0">
              <Feather className="w-6 h-6" />
            </span>
            <div>
              <p className="font-heading font-bold text-brand-600 text-base">Stories</p>
              <p className="text-black text-xs font-serif">that inspire & transform</p>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4 md:pt-0 md:pl-8">
            <span className="w-12 h-12 rounded-2xl bg-brand-600/10 text-brand-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </span>
            <div>
              <p className="font-heading font-bold text-brand-600 text-base">Academic Rigor</p>
              <p className="text-black text-xs font-serif">100% plagiarism-free standards</p>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4 md:pt-0 md:pl-8">
            <span className="w-12 h-12 rounded-2xl bg-brand-600/10 text-brand-600 flex items-center justify-center shrink-0">
              <Users className="w-6 h-6" />
            </span>
            <div>
              <p className="font-heading font-bold text-brand-600 text-base">Community</p>
              <p className="text-black text-xs font-serif">for thoughtful writers & readers</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
