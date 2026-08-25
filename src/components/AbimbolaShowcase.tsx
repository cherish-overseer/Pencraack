"use client";

import { useState } from "react";
import { ArrowRight, Sparkles, BookOpen, FileText, Feather } from "lucide-react";
import ServiceModal from "./ServiceModal";

interface ShowcaseCard {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  synopsis: string;
  badge: string;
  badgeType: "free" | "paid";
  serviceKey: string;
  gradient: string;
  icon: string;
}

const SHOWCASE_DATA: ShowcaseCard[] = [
  {
    id: "1",
    category: "ACADEMIC & RESEARCH",
    title: "The Dissertation & Thesis Suite",
    subtitle: "Doctoral, Masters & Undergraduate Research",
    synopsis:
      "A rigorous, comprehensive research and editorial suite designed to walk alongside candidates through thesis defense, data analysis, and peer-review publishing standards.",
    badge: "Free Consultation",
    badgeType: "free",
    serviceKey: "Thesis Support",
    gradient: "from-[#823919] via-stone-900 to-amber-950",
    icon: "🏛️",
  },
  {
    id: "2",
    category: "COMMERCIAL & BRAND",
    title: "Persuasive Copywriting Architecture",
    subtitle: "Brand Storytelling & Conversion Copy",
    synopsis:
      "Strategic messaging, high-converting website copy, and corporate thought-leadership monographs designed for clarity, authority, and emotional resonance.",
    badge: "Custom Edition",
    badgeType: "paid",
    serviceKey: "Copywriting",
    gradient: "from-stone-950 via-brand-700 to-stone-900",
    icon: "📣",
  },
  {
    id: "3",
    category: "LITERARY & POETRY",
    title: "The Architecture of Solitude",
    subtitle: "Lyrical Verse Anthology & Publishing",
    synopsis:
      "Original poetic compositions, anthology curation, and verse publishing crafted with rhythm, cadence, and profound literary depth for discerning readers.",
    badge: "Limited Edition",
    badgeType: "paid",
    serviceKey: "Poetry",
    gradient: "from-stone-900 via-amber-900 to-[#3d1a0b]",
    icon: "📜",
  },
];

export default function AbimbolaShowcase() {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  return (
    <section id="books" className="py-20 lg:py-28 px-6 lg:px-12 bg-surface border-b border-border">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16 space-y-4">
          <span className="inline-flex items-center gap-2 text-brand-600 text-xs font-bold tracking-[0.2em] uppercase bg-brand-600/10 px-3.5 py-1.5 rounded-full border border-brand-600/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Works & Services</span>
          </span>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-600">
            Words crafted to meet you exactly{" "}
            <em className="text-[#823919] not-italic italic font-heading">where you are</em>
          </h2>

          <p className="text-black max-w-xl mx-auto text-base font-serif leading-relaxed">
            Each service comes from a real season, a real question, and a rigorous literary standard. Commission the work that speaks to where you are right now.
          </p>
        </div>

        {/* 3-Column Luxury Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SHOWCASE_DATA.map((card) => (
            <div
              key={card.id}
              onClick={() => setSelectedService(card.serviceKey)}
              className="bg-background rounded-3xl overflow-hidden border border-border/80 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group cursor-pointer hover:-translate-y-1.5"
            >
              {/* Card Cover Art */}
              <div className="aspect-[4/3] overflow-hidden relative bg-stone-900">
                <div
                  className={`w-full h-full bg-gradient-to-br ${card.gradient} p-8 flex flex-col justify-between text-white group-hover:scale-105 transition-transform duration-700`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-4xl select-none">{card.icon}</span>
                    <span className="text-xs font-mono font-bold tracking-widest bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 uppercase">
                      2026
                    </span>
                  </div>

                  <div>
                    <span className="text-[#c9963f] text-xs font-mono uppercase tracking-wider block font-bold">
                      {card.category}
                    </span>
                    <h4 className="text-xl font-bold font-heading text-white line-clamp-2 mt-1">
                      {card.title}
                    </h4>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-8 flex flex-col flex-1 justify-between space-y-6">
                <div className="space-y-2">
                  <span className="text-brand-600 text-[11px] font-bold tracking-widest uppercase font-mono">
                    {card.category}
                  </span>
                  <h3 className="font-heading text-xl font-bold text-brand-600 group-hover:text-brand-700 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-black text-sm font-serif leading-relaxed line-clamp-3">
                    {card.synopsis}
                  </p>
                </div>

                <div className="pt-4 border-t border-border flex items-center justify-between gap-4">
                  <span
                    className={`inline-flex items-center text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider ${
                      card.badgeType === "free"
                        ? "bg-emerald-500/10 text-emerald-800 border border-emerald-500/20"
                        : "bg-brand-600/10 text-brand-600 border border-brand-600/20"
                    }`}
                  >
                    {card.badge}
                  </span>

                  <button className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full border border-brand-600/30 text-brand-600 text-xs font-bold font-heading group-hover:bg-brand-600 group-hover:text-white transition-all">
                    <span>Order Brief</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Service Modal */}
      <ServiceModal
        serviceName={selectedService}
        onClose={() => setSelectedService(null)}
      />
    </section>
  );
}
