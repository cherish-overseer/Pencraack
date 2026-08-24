"use client";

import { Users, ShieldCheck, Flame } from "lucide-react";

export default function HelixPillars() {
  const pillars = [
    {
      icon: Users,
      title: "Who We Are",
      text: "Pen Crack is focused on empowering authors, academics, and brands. We believe exceptional ideas deserve world-class storytelling and editorial precision.",
    },
    {
      icon: ShieldCheck,
      title: "Why Us",
      text: "We deliver uncompromising quality in every manuscript. We combine 21st-century editorial methodologies with absolute academic integrity and speed.",
    },
    {
      icon: Flame,
      title: "Our Difference",
      text: "We are driven by a passion for perfection, guaranteeing that your project is handled by dedicated specialists with complete confidentiality.",
    },
  ];

  return (
    <section className="w-full py-16 px-8 max-w-7xl mx-auto border-t border-border/80">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {pillars.map((pillar, idx) => {
          const Icon = pillar.icon;
          return (
            <div
              key={idx}
              className="group relative bg-surface p-8 md:p-10 rounded-2xl border border-border hover:border-brand-600/40 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="w-14 h-14 rounded-2xl bg-brand-600/10 text-brand-600 flex items-center justify-center group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-brand-600 font-heading">
                  {pillar.title}
                </h3>
                <p className="text-black text-base leading-relaxed font-serif">
                  {pillar.text}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
