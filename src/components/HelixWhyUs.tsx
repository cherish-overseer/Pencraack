"use client";

import { Sparkles } from "lucide-react";

export default function HelixWhyUs() {
  return (
    <section className="w-full py-20 px-8 max-w-7xl mx-auto border-t border-border">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side: Headline & Narrative */}
        <div className="space-y-8">
          <div>
            <span className="inline-block px-3 py-1 bg-brand-600/10 text-brand-600 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
              Our Core Philosophy
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-600 font-heading leading-tight">
              Passionate About Creating Quality Literature & Content
            </h2>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-brand-700 font-heading">
              We Love What We Do
            </h3>
            <p className="text-black text-base leading-relaxed font-serif">
              We are an editorial agency working closely with authors, academics, and enterprise teams. We build insightful content strategies, refine unique voices, and craft lasting value in every manuscript.
            </p>
          </div>

          <div className="space-y-4 pt-2">
            <h3 className="text-xl font-bold text-brand-700 font-heading">
              Why Work With Us
            </h3>
            <p className="text-black text-base leading-relaxed font-serif">
              If you ask our clients what it's like working with Pen Crack, they'll talk about how deeply we care about their success. For us, authentic editorial partnerships fuel real academic and commercial achievements.
            </p>
          </div>
        </div>

        {/* Right Side: Visual Feature Card */}
        <div className="bg-surface p-8 sm:p-10 rounded-3xl border border-border shadow-md space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/10 rounded-full blur-2xl -mr-10 -mt-10" />

          <div className="space-y-6 relative z-10">
            <div className="w-12 h-12 rounded-xl bg-brand-600 text-white flex items-center justify-center font-bold">
              <Sparkles className="w-6 h-6" />
            </div>

            <h3 className="text-2xl font-bold text-brand-600 font-heading">
              Our Uncompromising Standard
            </h3>

            <p className="text-black text-base leading-relaxed font-serif">
              Every piece of writing that leaves Pen Crack undergoes multi-stage editorial review, plagiarism checks, and style alignment to guarantee your work commands respect in print and digital channels alike.
            </p>

            <div className="pt-4 border-t border-border flex items-center justify-between">
              <span className="text-black text-xs font-semibold uppercase tracking-wider">
                100% Plagiarism Free Guarantee
              </span>
              <span className="text-brand-600 font-bold text-sm font-heading">
                Pen Crack Assurance
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
