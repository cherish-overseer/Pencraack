"use client";

import { Sparkles } from "lucide-react";

export default function HelixMarquee() {
  const marqueeItems = [
    "We Guarantee Unparalleled Editorial Rigor",
    "Academic Integrity & Creative Excellence",
    "Fast, 100% Plagiarism-Free Delivery",
    "Dedicated Account & Editorial Directors",
    "Tailored Literary & Commercial Solutions",
  ];

  return (
    <div className="w-full bg-brand-600 text-white py-4 overflow-hidden border-y border-brand-700 shadow-inner">
      <div className="flex whitespace-nowrap animate-marquee">
        {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, idx) => (
          <div key={idx} className="flex items-center gap-6 mx-6 text-sm font-semibold tracking-wider uppercase font-heading">
            <Sparkles className="w-4 h-4 text-brand-400 shrink-0" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
