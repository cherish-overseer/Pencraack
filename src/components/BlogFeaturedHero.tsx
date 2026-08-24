"use client";

import Link from "next/link";
import { Clock, User, ArrowUpRight, Sparkles } from "lucide-react";

export default function BlogFeaturedHero() {
  return (
    <section className="w-full py-12 px-8 max-w-7xl mx-auto">
      <div className="bg-surface rounded-3xl border border-border overflow-hidden shadow-md group hover:shadow-xl hover:border-brand-600/40 transition-all duration-300 grid grid-cols-1 lg:grid-cols-12">
        {/* Left Column - Featured Image Graphic */}
        <div className="lg:col-span-6 bg-gradient-to-br from-brand-600 via-brand-700 to-stone-900 p-8 sm:p-12 text-white flex flex-col justify-between relative overflow-hidden min-h-[320px]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
          
          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-extrabold uppercase tracking-widest border border-white/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Top Story</span>
            </span>
          </div>

          <div className="relative z-10 space-y-3 mt-12">
            <span className="text-brand-300 font-serif text-sm font-semibold tracking-wide uppercase">
              AI & Publishing • Tech Trends
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold font-heading leading-tight text-white drop-shadow-sm">
              How Generative AI is Reshaping Academic Publishing & Authorship
            </h3>
          </div>
        </div>

        {/* Right Column - Article Details */}
        <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-xs text-muted font-serif">
              <span className="px-3 py-1 bg-brand-600/10 text-brand-600 rounded-full font-bold uppercase tracking-wider">
                Deep Dive
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-black font-medium">
                <Clock className="w-3.5 h-3.5 text-brand-600" />
                6 min read
              </span>
              <span>•</span>
              <span className="text-black">August 6, 2026</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-brand-600 font-heading leading-snug group-hover:text-brand-700 transition-colors">
              How Generative AI is Reshaping Academic Publishing & Authorship
            </h2>

            <p className="text-black text-base sm:text-lg font-serif leading-relaxed">
              As automated language models enter higher education and corporate marketing, human editorial directors unpack why peer-review rigor, original thought, and narrative warmth matter more than ever.
            </p>
          </div>

          <div className="pt-6 border-t border-border/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-600 text-white font-bold flex items-center justify-center font-heading text-sm">
                EV
              </div>
              <div>
                <h4 className="font-bold text-brand-600 text-sm font-heading">Dr. Eleanor Vance</h4>
                <p className="text-black text-xs font-serif">Senior Research Director</p>
              </div>
            </div>

            <span className="inline-flex items-center gap-1.5 text-brand-600 font-bold text-sm tracking-wide font-heading group-hover:translate-x-1 transition-transform">
              <span>Read Full Article</span>
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
