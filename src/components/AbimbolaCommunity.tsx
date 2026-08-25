"use client";

import Link from "next/link";
import { ArrowRight, Check, Sparkles } from "lucide-react";

export default function AbimbolaCommunity() {
  const benefits = [
    "1-on-1 editorial review session with a senior literary director",
    "Comprehensive thesis argumentation & structure flow evaluation",
    "Bi-monthly literary letters & narrative craft masterclasses",
    "Plagiarism-free & university citation verification guidelines",
    "Priority turnaround on rush commercial copy & publishing briefs",
  ];

  return (
    <section id="community" className="py-20 lg:py-28 px-6 lg:px-12 bg-surface border-b border-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column (6 cols) */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <span className="inline-flex items-center gap-2 text-brand-600 text-xs font-bold tracking-[0.2em] uppercase bg-brand-600/10 px-3.5 py-1.5 rounded-full border border-brand-600/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>The Clarity Space</span>
            </span>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-600 leading-tight">
              You should not have to figure out your narrative{" "}
              <em className="text-[#823919] not-italic italic font-heading">alone.</em>
            </h2>

            <p className="text-black text-base sm:text-lg font-serif leading-relaxed">
              The Clarity Space is Pen Crack's collaborative editorial initiative for researchers, authors, and founders who want to think deeply about their writing, refine their manuscript, and publish with authority.
            </p>

            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold tracking-wide rounded-full transition-all duration-300 shadow-md active:scale-95 font-heading"
              >
                <span>Start Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Benefits Card (6 cols) */}
          <div className="lg:col-span-6">
            <div className="bg-background rounded-3xl p-8 sm:p-10 shadow-lg border border-border space-y-6">
              <div className="flex items-start justify-between border-b border-border pb-5">
                <div>
                  <h3 className="font-heading text-2xl font-bold text-brand-600">
                    The Clarity Space
                  </h3>
                  <p className="text-black text-xs font-serif mt-0.5">
                    Pen Crack Editorial Masterclass & Collaboration Suite
                  </p>
                </div>
                <span className="px-3.5 py-1.5 bg-brand-600/10 text-brand-600 text-xs font-mono font-bold tracking-wider uppercase rounded-full border border-brand-600/20">
                  Annual 2026
                </span>
              </div>

              <div className="space-y-4 pt-1">
                {benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-black text-sm font-serif">
                    <span className="w-5 h-5 rounded-full bg-brand-600/10 text-brand-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </span>
                    <span className="leading-snug">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
