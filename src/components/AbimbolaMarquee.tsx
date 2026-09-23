"use client";

import { Sparkles } from "lucide-react";

export default function AbimbolaMarquee() {
  const marqueeItems = [
    "We Guarantee Unparalleled Editorial Rigor",
    "Academic Integrity & Creative Excellence",
    "Fast, 100% Plagiarism-Free Delivery",
    "Dedicated Account & Editorial Directors",
    "Tailored Literary & Commercial Solutions",
  ];

  return (
    <div className="w-full space-y-0">
      {/* Statement Quote Banner */}
      <section className="py-16 md:py-20 bg-surface text-center border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <p className="font-heading text-3xl sm:text-4xl md:text-5xl text-black italic leading-snug">
            God Inspires. <span className="text-brand-600 font-extrabold not-italic">We write.</span>
          </p>
        </div>
      </section>

      {/* Brand Brown Marquee Banner (same as Service Page) */}
      <section className="w-full bg-brand-600 text-white py-4 overflow-hidden border-y border-brand-700 shadow-inner select-none">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-6 mx-6 text-sm font-semibold tracking-wider uppercase font-heading"
            >
              <Sparkles className="w-4 h-4 text-brand-400 shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
