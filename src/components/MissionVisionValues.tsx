export default function MissionVisionValues() {
  return (
    <section className="w-full py-16 px-8 max-w-7xl mx-auto border-t border-border">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h4 className="text-brand-600 font-semibold text-xs tracking-widest uppercase mb-3">
          WHO WE ARE
        </h4>
        <h2 className="text-3xl md:text-4xl font-bold text-brand-600 font-heading">
          Built on Precision, Driven by Impact
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Mission */}
        <div className="bg-surface p-8 rounded-2xl border border-border shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            <div className="w-12 h-12 rounded-xl bg-brand-600/10 text-brand-600 flex items-center justify-center mb-6 text-2xl font-bold font-heading">
              01
            </div>
            <h3 className="text-2xl font-bold text-brand-600 mb-4 font-heading">
              Our Mission
            </h3>
            <p className="text-black text-base leading-relaxed font-serif">
              Our clients are central to everything we do. As an organization, our mission is to empower authors, academics, and enterprises to communicate with clarity, authority, and elegance.
            </p>
          </div>
        </div>

        {/* Vision */}
        <div className="bg-surface p-8 rounded-2xl border border-border shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            <div className="w-12 h-12 rounded-xl bg-brand-600/10 text-brand-600 flex items-center justify-center mb-6 text-2xl font-bold font-heading">
              02
            </div>
            <h3 className="text-2xl font-bold text-brand-600 mb-4 font-heading">
              Our Vision
            </h3>
            <p className="text-black text-base leading-relaxed font-serif">
              We are a dedicated collective of seasoned editors, writers, and research strategists. Our vision is to set the global benchmark for writing excellence and impactful content creation.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="bg-surface p-8 rounded-2xl border border-border shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            <div className="w-12 h-12 rounded-xl bg-brand-600/10 text-brand-600 flex items-center justify-center mb-6 text-2xl font-bold font-heading">
              03
            </div>
            <h3 className="text-2xl font-bold text-brand-600 mb-4 font-heading">
              Our Values
            </h3>
            <p className="text-black text-base leading-relaxed font-serif">
              We foster shared values of academic integrity, creative excellence, transparency, consistency, and client synergy. Every project undergoes rigorous quality control.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
