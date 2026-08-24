export default function CtaBanner() {
  return (
    <section className="w-full px-8 py-16 max-w-7xl mx-auto">
      <div className="relative w-full rounded-xl overflow-hidden bg-gradient-to-br from-[#003961] to-brand-800 p-12 md:p-16 flex flex-col md:flex-row items-center justify-between shadow-lg">
        <div 
          className="absolute right-0 bottom-0 top-0 w-full md:w-1/2 opacity-20 mix-blend-overlay transition-transform duration-1000 hover:scale-105" 
          style={{ backgroundImage: 'url(/cta-bg.png)', backgroundSize: 'cover', backgroundPosition: 'right center' }}>
        </div>
        <div className="relative z-10 max-w-xl text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-5 tracking-tight">Need a bespoke editorial solution?</h2>
          <p className="text-sky-100/90 text-lg mb-10 leading-relaxed max-w-md">
            Every project is unique. we offer free consultation.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <button className="bg-white text-brand-900 font-semibold px-6 py-3 rounded hover:bg-slate-50 transition-colors shadow-sm">
              Start a Project
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
