"use client";

import { useEffect, useState } from "react";

export default function HelixMetrics() {
  const [counts, setCounts] = useState({ years: 0, projects: 0, satisfaction: 0 });

  useEffect(() => {
    const duration = 1500;
    const steps = 30;
    const stepTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setCounts({
        years: Math.min(10, Math.floor(progress * 10)),
        projects: Math.min(1000, Math.floor(progress * 1000)),
        satisfaction: Math.min(99, Math.floor(progress * 99)),
      });

      if (step >= steps) clearInterval(timer);
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  const metrics = [
    {
      value: `${counts.years}+`,
      title: "Years of Experience",
      desc: "Our senior editors bring over a decade of combined publishing and academic expertise.",
    },
    {
      value: `${counts.projects.toLocaleString()}+`,
      title: "Successful Projects",
      desc: "From doctoral dissertations to bestselling fiction, technical papers, and brand copy.",
    },
    {
      value: `${counts.satisfaction}%`,
      title: "Satisfied Clients",
      desc: "Maintaining an exceptional benchmark in quality assurance and on-time delivery.",
    },
  ];

  return (
    <section className="w-full py-16 px-8 max-w-7xl mx-auto overflow-hidden">
      <div className="bg-surface p-8 sm:p-12 rounded-3xl border border-border shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left divide-y md:divide-y-0 md:divide-x divide-border">
          {metrics.map((metric, idx) => (
            <div key={idx} className={`${idx !== 0 ? "pt-8 md:pt-0 md:pl-8" : ""} space-y-3`}>
              <h3 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-brand-600 font-heading tracking-tight">
                {metric.value}
              </h3>
              <h4 className="text-xl font-bold text-brand-700 font-heading">
                {metric.title}
              </h4>
              <p className="text-black text-sm leading-relaxed font-serif">
                {metric.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
