"use client";

import { useState } from "react";
import { Megaphone, PenTool, FileText, Landmark, Film, PenLine, CheckCircle2, ArrowRight, Mail } from "lucide-react";
import ServiceModal from "./ServiceModal";

const services = [
  {
    title: "Copywriting",
    description: "Persuasive narrative construction designed to convert. We blend psychological insights with crystalline prose for brands that demand authority.",
    icon: <Megaphone className="w-5 h-5 text-brand-600" />,
    badges: ["Conversion", "Brand Voice"],
    colSpan: "md:col-span-2",
  },
  {
    title: "Editing",
    description: "Refining raw drafts into polished masterpieces without losing the author's original intent or soul.",
    icon: <PenTool className="w-5 h-5 text-brand-600" />,
    link: true,
    colSpan: "md:col-span-1",
  },
  {
    title: "Poetry",
    description: "Lyrical composition and structural analysis for contemporary verse.",
    icon: <PenLine className="w-5 h-5 text-brand-600" />,
    colSpan: "md:col-span-1",
  },
  {
    title: "Technical Writing",
    description: "Simplifying complex systems into accessible, accurate documentation.",
    icon: <FileText className="w-5 h-5 text-brand-600" />,
    colSpan: "md:col-span-1",
  },
  {
    title: "Grant Writing",
    description: "Strategic proposals designed to secure funding for high-impact projects.",
    icon: <Landmark className="w-5 h-5 text-brand-600" />,
    colSpan: "md:col-span-1",
  },
  {
    title: "Scriptwriting",
    description: "Narrative architecture for film, stage, and digital media production.",
    icon: <Film className="w-5 h-5 text-brand-600" />,
    colSpan: "md:col-span-1",
  },
  {
    title: "Newsletter",
    description: "Engaging email campaigns and regular updates delivered directly to your audience.",
    icon: <Mail className="w-5 h-5 text-brand-600" />,
    colSpan: "md:col-span-1",
  },
  {
    title: "Proofreading",
    description: "The final line of defense against linguistic imperfection.",
    icon: <CheckCircle2 className="w-5 h-5 text-brand-600" />,
    colSpan: "md:col-span-1",
  },
];

export default function CreativeCommercial() {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  return (
    <section className="w-full px-8 py-16 max-w-7xl mx-auto">
      <span className="text-brand-600 text-xs font-bold tracking-[0.15em] uppercase mb-6 block">Our Expertise</span>
      <h2 className="text-3xl font-bold tracking-tight mb-10 text-foreground font-heading">Creative & Commercial</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((svc, i) => (
          <div
            key={i}
            onClick={() => setSelectedService(svc.title)}
            className={`group cursor-pointer bg-[#f8fafc] hover:bg-[#f1f5f9] border border-transparent hover:border-brand-600/30 transition-all duration-300 p-8 rounded-2xl flex flex-col items-start hover:-translate-y-1 hover:shadow-lg ${svc.colSpan}`}
          >
            <div className="mb-6 bg-white p-2.5 rounded-lg shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
              {svc.icon}
            </div>

            <h3 className="text-xl font-bold mb-3 text-foreground font-heading group-hover:text-brand-600 transition-colors">
              {svc.title}
            </h3>

            <p className="text-black font-serif leading-relaxed mb-6 flex-grow text-sm sm:text-base">
              {svc.description}
            </p>

            {svc.badges && (
              <div className="flex gap-2 mb-4">
                {svc.badges.map((badge, j) => (
                  <span key={j} className="bg-sky-50 text-brand-700 text-xs font-bold tracking-wide px-3 py-1.5 rounded-full border border-sky-100">
                    {badge}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-auto pt-4 flex items-center gap-2 text-xs font-bold text-brand-600 group-hover:underline">
              <span>View details & order</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {/* Service Modal */}
      <ServiceModal
        serviceName={selectedService}
        onClose={() => setSelectedService(null)}
      />
    </section>
  );
}
