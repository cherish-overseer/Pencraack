"use client";

import { useState } from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import ServiceModal from "./ServiceModal";

interface ProjectItem {
  id: string;
  title: string;
  category: string;
  serviceKey: string;
  gradient: string;
  iconSymbol: string;
  year: string;
}

const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "1",
    title: "Les Invalides: Monograph & Thesis Suite",
    category: "Academic Research • PhD Thesis Support",
    serviceKey: "Thesis Support",
    gradient: "from-[#823919] via-stone-900 to-amber-950",
    iconSymbol: "🏛️",
    year: "2026",
  },
  {
    id: "2",
    title: "Persuasive Brand & Corporate Copywriting",
    category: "Commercial Copywriting • Brand Strategy",
    serviceKey: "Copywriting",
    gradient: "from-amber-800 via-orange-900 to-stone-900",
    iconSymbol: "📣",
    year: "2026",
  },
  {
    id: "3",
    title: "The Architecture of Solitude: Verse Anthology",
    category: "Poetry & Lyrical Verse Composition",
    serviceKey: "Poetry",
    gradient: "from-stone-950 via-amber-900 to-[#3d1a0b]",
    iconSymbol: "📜",
    year: "2026",
  },
  {
    id: "4",
    title: "Tomb Raider King: Legacy Series",
    category: "Comics & Illustrated Webtoons",
    serviceKey: "Editing",
    gradient: "from-orange-800 via-amber-700 to-yellow-900",
    iconSymbol: "🎨",
    year: "2026",
  },
  {
    id: "5",
    title: "Enterprise Thought Leadership & White Papers",
    category: "Corporate White Papers • Market Research",
    serviceKey: "White Papers",
    gradient: "from-stone-900 via-stone-800 to-amber-900",
    iconSymbol: "📊",
    year: "2026",
  },
  {
    id: "6",
    title: "Technical Systems & API Documentation",
    category: "Technical Writing • System Guides",
    serviceKey: "Technical Writing",
    gradient: "from-amber-900 via-stone-900 to-black",
    iconSymbol: "💻",
    year: "2026",
  },
];

export default function HelftProjects() {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  return (
    <section id="projects" className="w-full py-16 px-8 max-w-7xl mx-auto space-y-12">
      {/* Section Title (Helft & Pinta Architectural Header) */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-border pb-6 gap-4">
        <div>
          <span className="text-brand-600 text-xs font-bold tracking-[0.2em] uppercase block mb-2">
            Selected Works & Editorial Commissions
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-brand-600 font-heading">
            Index / Featured Projects
          </h2>
        </div>
        <p className="text-black text-sm font-serif max-w-xs sm:text-right">
          A showcase of academic monographs, commercial brand copy, and literary works.
        </p>
      </div>

      {/* Helft & Pinta Loop Projets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {PROJECTS_DATA.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedService(item.serviceKey)}
            className="group cursor-pointer space-y-4"
          >
            {/* Cover Image Container with Hover Scale */}
            <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-stone-900 shadow-sm border border-border group-hover:shadow-2xl group-hover:border-brand-600/50 transition-all duration-500">
              <div
                className={`w-full h-full bg-gradient-to-br ${item.gradient} p-8 flex flex-col justify-between text-white group-hover:scale-105 transition-transform duration-700`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-4xl select-none">{item.iconSymbol}</span>
                  <span className="text-xs font-mono font-bold tracking-widest bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                    {item.year}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-brand-300 text-xs font-mono uppercase tracking-wider">
                    {item.category}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold font-heading text-white line-clamp-2">
                    {item.title}
                  </h3>
                </div>
              </div>

              {/* Hover Badge Prompt */}
              <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md text-white text-xs font-bold px-4 py-2 rounded-xl border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 font-heading">
                <span>View Brief & Order</span>
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>

            {/* Helft & Pinta Minimalist Caption */}
            <div className="space-y-1 pt-1">
              <h2 className="text-xl sm:text-2xl font-bold text-brand-600 font-heading group-hover:text-brand-700 transition-colors leading-snug">
                {item.title}
              </h2>
              <h3 className="text-black text-sm font-serif italic">
                {item.category}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Service Order Modal */}
      <ServiceModal
        serviceName={selectedService}
        onClose={() => setSelectedService(null)}
      />
    </section>
  );
}
