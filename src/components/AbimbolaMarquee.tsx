"use client";

export default function AbimbolaMarquee() {
  const statements = [
    "Clarity before Commitment",
    "A Studio with a Pen and a Purpose",
    "God Inspires. We write.",
    "Know Your Story Before You Publish",
    "Academic Rigor & Creative Artistry",
    "Whatever You Need, Written Right",
  ];

  return (
    <div className="w-full space-y-0">
      {/* Statement Quote Banner */}
      <section className="py-16 md:py-20 bg-surface text-center border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <p className="font-heading text-3xl sm:text-4xl md:text-5xl text-black italic leading-snug">
            God Inspires. <span className="text-brand-600 font-extrabold not-italic">We write.</span>
          </p>
        </div>
      </section>

      {/* Black Starburst Marquee */}
      <section className="bg-black py-4.5 overflow-hidden select-none">
        <div className="flex w-max animate-marquee">
          <div className="flex items-center gap-8 px-4 whitespace-nowrap">
            {statements.map((phrase, idx) => (
              <span key={idx} className="flex items-center gap-8">
                <span className="text-white/90 text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase font-mono">
                  {phrase}
                </span>
                <span className="text-[#c9963f] text-base">✦</span>
              </span>
            ))}
          </div>

          <div className="flex items-center gap-8 px-4 whitespace-nowrap" aria-hidden="true">
            {statements.map((phrase, idx) => (
              <span key={`dup-${idx}`} className="flex items-center gap-8">
                <span className="text-white/90 text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase font-mono">
                  {phrase}
                </span>
                <span className="text-[#c9963f] text-base">✦</span>
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
