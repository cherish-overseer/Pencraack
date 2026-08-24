"use client";

import { useState } from "react";
import { GraduationCap, FileBarChart, CheckCircle2, ArrowRight } from "lucide-react";
import ServiceModal from "./ServiceModal";

export default function AcademicResearch() {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  return (
    <section className="w-full px-8 py-16 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold tracking-tight mb-10 text-foreground font-heading">
        Academic & Research
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Thesis Support */}
        <div
          onClick={() => setSelectedService("Thesis Support")}
          className="group cursor-pointer bg-[#f8fafc] hover:bg-[#f1f5f9] border border-transparent hover:border-brand-600/30 transition-all duration-300 p-10 rounded-2xl flex flex-col items-start hover:-translate-y-1 hover:shadow-lg"
        >
          <div className="mb-6 bg-white p-3 rounded-lg shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
            <GraduationCap className="w-6 h-6 text-brand-600" />
          </div>

          <h3 className="text-2xl font-bold mb-4 text-foreground font-heading group-hover:text-brand-600 transition-colors">
            Thesis Support
          </h3>

          <p className="text-black font-serif leading-relaxed mb-8 text-base">
            Comprehensive structural and linguistic guidance for Master's and PhD candidates across all disciplines.
          </p>

          <div className="space-y-3 mb-8 w-full font-serif">
            <div className="flex items-center gap-3 text-sm font-medium text-black">
              <CheckCircle2 className="w-4 h-4 text-brand-600" />
              Citation Integrity (APA, Chicago, MLA)
            </div>
            <div className="flex items-center gap-3 text-sm font-medium text-black">
              <CheckCircle2 className="w-4 h-4 text-brand-600" />
              Argument Flow Analysis & Peer-Review
            </div>
          </div>

          <div className="mt-auto pt-4 flex items-center gap-2 text-xs font-bold text-brand-600 group-hover:underline font-heading">
            <span>View details & order thesis support</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 2: White Papers */}
        <div
          onClick={() => setSelectedService("White Papers")}
          className="group cursor-pointer bg-[#f8fafc] hover:bg-[#f1f5f9] border border-transparent hover:border-brand-600/30 transition-all duration-300 p-10 rounded-2xl flex flex-col items-start hover:-translate-y-1 hover:shadow-lg"
        >
          <div className="mb-6 bg-white p-3 rounded-lg shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
            <FileBarChart className="w-6 h-6 text-brand-600" />
          </div>

          <h3 className="text-2xl font-bold mb-4 text-foreground font-heading group-hover:text-brand-600 transition-colors">
            White Papers
          </h3>

          <p className="text-black font-serif leading-relaxed mb-8 text-base">
            Authoritative reports and guides that establish thought leadership in competitive industry sectors.
          </p>

          <div className="space-y-3 mb-8 w-full font-serif">
            <div className="flex items-center gap-3 text-sm font-medium text-black">
              <CheckCircle2 className="w-4 h-4 text-brand-600" />
              Data Visualization & Case Studies
            </div>
            <div className="flex items-center gap-3 text-sm font-medium text-black">
              <CheckCircle2 className="w-4 h-4 text-brand-600" />
              Market Research & Technical Depth
            </div>
          </div>

          <div className="mt-auto pt-4 flex items-center gap-2 text-xs font-bold text-brand-600 group-hover:underline font-heading">
            <span>View details & order white papers</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
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
