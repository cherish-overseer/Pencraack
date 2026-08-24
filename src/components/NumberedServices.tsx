"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import ServiceModal from "./ServiceModal";

const services = [
  { title: "UX Writing", desc: "Digital product microcopy & user journeys" },
  { title: "Content Strategy", desc: "Editorial planning, topical authority & roadmaps" },
  { title: "Transcreation", desc: "Cultural translation & global content adaptation" },
  { title: "Speech Writing", desc: "Public address, keynotes & executive remarks" },
  { title: "Resume Design", desc: "Executive CVs, bios & ATS optimization" },
  { title: "Press Releases", desc: "AP-style announcements for media outlets" },
];

export default function NumberedServices() {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  return (
    <section className="w-full px-8 py-16 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {services.map((svc, i) => (
          <div
            key={i}
            onClick={() => setSelectedService(svc.title)}
            className="group cursor-pointer flex flex-col items-start border-l-[3px] border-brand-600/20 hover:border-brand-600 pl-6 py-2 transition-all duration-300 hover:translate-x-1"
          >
            <h4 className="text-[1.15rem] font-bold text-foreground mb-1.5 font-heading group-hover:text-brand-600 transition-colors flex items-center gap-2">
              <span>{svc.title}</span>
              <ArrowRight className="w-4 h-4 text-brand-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h4>
            <p className="text-sm text-black font-serif mb-2">{svc.desc}</p>
            <span className="text-xs font-bold text-brand-600 uppercase tracking-wider font-heading group-hover:underline">
              Order service →
            </span>
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
