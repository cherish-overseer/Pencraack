"use client";

import { useState } from "react";
import { CheckCircle2, ChevronRight } from "lucide-react";

export default function HelixProcess() {
  const [activeTab, setActiveTab] = useState(0);

  const steps = [
    {
      number: "Step One",
      title: "Discovery & Strategy",
      subtitle: "Briefing + Architectural Outline",
      desc: "We collaborate with you to define your core message, target audience, tone of voice, and academic or commercial publishing standards.",
      highlights: [
        "In-depth project questionnaire & discovery call",
        "Target reader persona definition",
        "Structural outline & chapter roadmap",
      ],
    },
    {
      number: "Step Two",
      title: "Writing & Editing",
      subtitle: "Developmental Craft + Drafting",
      desc: "We employ dual-layer research and line-by-line editorial refinement, prioritizing authoritative voice, engagement, and syntax perfection.",
      highlights: [
        "Iterative chapter/draft milestone deliveries",
        "Rigorous fact-checking & reference validation",
        "Developmental & copy-editing reviews",
      ],
    },
    {
      number: "Step Three",
      title: "Support & Polish",
      subtitle: "Proofreading + Final Delivery",
      desc: "We perform multi-pass proofreading, formatting, and publishing consultation, ensuring your work is ready for instant release.",
      highlights: [
        "Final polish & plagiarism check report",
        "Manuscript layout & digital formatting",
        "Post-delivery revision window & support",
      ],
    },
  ];

  return (
    <section id="process" className="w-full py-20 px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="inline-block px-3 py-1 bg-brand-600/10 text-brand-600 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
          Our Methodology
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-600 font-heading">
          Three Step Editorial Process
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Step Navigation Tabs (Left 4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {steps.map((step, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 flex items-center justify-between group ${
                activeTab === idx
                  ? "bg-brand-600 text-white border-brand-600 shadow-lg scale-[1.02]"
                  : "bg-surface text-brand-900 border-border hover:border-brand-600/30"
              }`}
            >
              <div>
                <span
                  className={`text-xs uppercase font-semibold tracking-wider block mb-1 ${
                    activeTab === idx ? "text-brand-400" : "text-brand-600"
                  }`}
                >
                  {step.number}
                </span>
                <h4 className="text-xl font-bold font-heading">{step.title}</h4>
              </div>
              <ChevronRight
                className={`w-5 h-5 transition-transform duration-300 ${
                  activeTab === idx ? "translate-x-1 text-white" : "text-muted group-hover:translate-x-1"
                }`}
              />
            </button>
          ))}
        </div>

        {/* Selected Step Display Panel (Right 8 cols) */}
        <div className="lg:col-span-8 bg-surface p-8 sm:p-10 md:p-12 rounded-3xl border border-border shadow-md min-h-[380px] flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-brand-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-brand-600/10 text-brand-700 rounded-md text-xs font-semibold uppercase tracking-wider">
                {steps[activeTab].subtitle}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-brand-600 font-heading">
              {steps[activeTab].title}
            </h3>

            <p className="text-black text-base sm:text-lg leading-relaxed font-serif">
              {steps[activeTab].desc}
            </p>

            <div className="pt-4 border-t border-border/80 space-y-3">
              <h5 className="text-xs uppercase tracking-widest text-brand-600 font-semibold mb-2">
                Key Deliverables:
              </h5>
              {steps[activeTab].highlights.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-600 shrink-0" />
                  <span className="text-black text-sm sm:text-base font-serif">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
