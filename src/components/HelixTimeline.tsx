"use client";

export default function HelixTimeline() {
  const milestones = [
    {
      year: "2018",
      title: "Studio Foundation",
      desc: "Established Pen Crack as a boutique writing and academic editorial consultancy focused on manuscript refinement.",
    },
    {
      year: "2021",
      title: "Expansion into Research & Copy",
      desc: "Launched dedicated academic research and commercial content divisions to serve universities, author clients, and enterprises.",
    },
    {
      year: "2024",
      title: "1,000+ Manuscripts Milestone",
      desc: "Reached over 1,000 published doctoral theses, corporate white papers, and commercial book projects with zero plagiarism.",
    },
    {
      year: "2026",
      title: "Global Digital Editorial Studio",
      desc: "Expanded into a full-scale remote-first international editorial agency serving clients across 15+ countries.",
    },
  ];

  return (
    <section className="w-full py-20 px-8 max-w-7xl mx-auto border-t border-border">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="inline-block px-3 py-1 bg-brand-600/10 text-brand-600 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
          Our Journey
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-600 font-heading">
          Milestones & Legacy
        </h2>
      </div>

      <div className="space-y-6 max-w-4xl mx-auto">
        {milestones.map((item, idx) => (
          <div
            key={idx}
            className="group bg-surface p-6 sm:p-8 rounded-2xl border border-border hover:border-brand-600/40 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center gap-6"
          >
            <div className="px-5 py-2 rounded-xl bg-brand-600/10 text-brand-600 font-extrabold text-2xl font-heading shrink-0 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
              {item.year}
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-brand-700 font-heading">
                {item.title}
              </h3>
              <p className="text-black text-sm sm:text-base font-serif leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
