"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, Feather, ShieldCheck, Sparkles } from "lucide-react";

export default function HelftPhilosophy() {
  return (
    <section className="w-full py-20 px-8 max-w-7xl mx-auto border-t border-border">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative">
        {/* Left Column: Studio Philosophy & Ethos (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-600/10 text-brand-600 rounded-full text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Studio Ethos</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-brand-600 font-heading leading-tight">
            Where Academic Rigor Meets Creative Artistry
          </h2>

          <p className="text-black text-base sm:text-lg font-serif leading-relaxed">
            Founded on the principle that words build worldviews, Pen Crack merges university-level editorial precision with modern narrative architecture. Whether advising a doctoral candidate or crafting a commercial brand story, we honor the weight of every word.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4 font-serif text-sm">
            <div className="flex items-center gap-2 text-black font-semibold">
              <ShieldCheck className="w-4 h-4 text-brand-600" />
              <span>100% Plagiarism-Free</span>
            </div>
            <div className="flex items-center gap-2 text-black font-semibold">
              <Feather className="w-4 h-4 text-brand-600" />
              <span>Master Authors & Editors</span>
            </div>
          </div>
        </div>

        {/* Vertical Hairline Divider for Desktop */}
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-border -translate-x-1/2" />

        {/* Right Column: Architectural Category Navigation (6 cols) */}
        <div className="lg:col-span-6 space-y-6 lg:pl-8">
          <span className="text-brand-600 text-xs font-bold tracking-[0.2em] uppercase block">
            Explore Studio Sections
          </span>

          <div className="space-y-4 font-heading">
            <Link
              href="/services"
              className="group flex items-center justify-between p-5 rounded-2xl bg-surface border border-border hover:border-brand-600/40 hover:bg-background transition-all duration-300"
            >
              <div>
                <h4 className="text-xl font-bold text-brand-600 group-hover:text-brand-700">Services Directory</h4>
                <p className="text-black text-xs font-serif mt-0.5">Copywriting, Editing, Thesis Support & White Papers</p>
              </div>
              <ArrowRight className="w-5 h-5 text-brand-600 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/about"
              className="group flex items-center justify-between p-5 rounded-2xl bg-surface border border-border hover:border-brand-600/40 hover:bg-background transition-all duration-300"
            >
              <div>
                <h4 className="text-xl font-bold text-brand-600 group-hover:text-brand-700">About Pen Crack</h4>
                <p className="text-black text-xs font-serif mt-0.5">Our 3-pillar editorial process, team & history</p>
              </div>
              <ArrowRight className="w-5 h-5 text-brand-600 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/blog"
              className="group flex items-center justify-between p-5 rounded-2xl bg-surface border border-border hover:border-brand-600/40 hover:bg-background transition-all duration-300"
            >
              <div>
                <h4 className="text-xl font-bold text-brand-600 group-hover:text-brand-700">Blog & Tech Insights</h4>
                <p className="text-black text-xs font-serif mt-0.5">TechCrunch-style analysis on AI & publishing</p>
              </div>
              <ArrowRight className="w-5 h-5 text-brand-600 group-hover:translate-x-1 transition-transform" />
            </Link>

            <div className="grid grid-cols-2 gap-4">
              <Link
                href="/poems"
                className="group p-4 rounded-2xl bg-surface border border-border hover:border-brand-600/40 hover:bg-background transition-all duration-300 flex items-center justify-between"
              >
                <div>
                  <h4 className="text-base font-bold text-brand-600">Poems</h4>
                  <p className="text-black text-[11px] font-serif">Poem of the Day</p>
                </div>
                <ArrowRight className="w-4 h-4 text-brand-600 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/comics"
                className="group p-4 rounded-2xl bg-surface border border-border hover:border-brand-600/40 hover:bg-background transition-all duration-300 flex items-center justify-between"
              >
                <div>
                  <h4 className="text-base font-bold text-brand-600">Comics</h4>
                  <p className="text-black text-[11px] font-serif">Webtoons Browse</p>
                </div>
                <ArrowRight className="w-4 h-4 text-brand-600 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
