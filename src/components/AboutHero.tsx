import Link from "next/link";

export default function AboutHero() {
  return (
    <section className="w-full py-12 md:py-20 px-8 max-w-7xl mx-auto">
      {/* Breadcrumb & Title */}
      <div className="mb-12 text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start gap-2 text-xs uppercase tracking-widest text-brand-600 font-semibold mb-3">
          <Link href="/" className="hover:underline">Home</Link>
          <span>/</span>
          <span>About Us</span>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-600 mb-4 font-heading">
          About Pen Crack
        </h1>
        <p className="text-black text-lg md:text-xl max-w-2xl font-serif">
          Mastering the art of the written word. High-fidelity writing services tailored for academic precision and commercial impact.
        </p>
      </div>

      <div className="bg-surface p-8 md:p-12 rounded-2xl border border-border shadow-sm">
        <div className="max-w-4xl space-y-6">
          <div>
            <span className="inline-block px-3 py-1 bg-brand-500/10 text-brand-700 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
              Writing Solution Agency
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-600 mb-4 font-heading">
              We are the premier writing & editorial company created to meet your needs
            </h2>
            <p className="text-black text-base leading-relaxed mb-6 font-serif">
              Helping you tell the right stories and create authoritative content is our forte. Built on speed, rigorous standards, and affordability, our team ensures your written material commands attention and respect.
            </p>
          </div>

          {/* Bullet Points Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-6 border-t border-border">
            {[
              "Hire top writers & editors",
              "Save time, stress & money",
              "Track project updates",
              "Enjoy timely delivery",
              "Dedicated account managers",
              "Work with true professionals",
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3.5 rounded-lg bg-background border border-border/60">
                <div className="w-6 h-6 rounded-full bg-brand-600/15 text-brand-600 flex items-center justify-center shrink-0 text-xs font-bold">
                  ✓
                </div>
                <span className="text-black text-sm font-medium font-serif">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
