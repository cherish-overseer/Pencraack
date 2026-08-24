import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="w-full px-8 pt-16 pb-24 max-w-7xl mx-auto flex flex-col items-start text-left space-y-6">
      <h1 className="text-5xl md:text-6xl lg:text-[5.5rem] font-bold tracking-tight leading-[1.1] max-w-4xl text-brand-600 font-heading">
        We write. We read. We connect.
      </h1>
      <p className="text-lg md:text-xl text-black max-w-[42rem] leading-relaxed font-serif">
        Not sure how to say it? We help you say it well. Our team covers everything from academic writing to creative work. Whatever you need, written right.
      </p>
      <div className="pt-4">
        <Link
          href="/services"
          className="inline-flex items-center gap-3 bg-brand-600 hover:bg-brand-700 text-white px-8 py-4 rounded-xl text-base font-semibold transition-all shadow-md active:scale-95 group font-heading"
        >
          <span>Explore Our Services</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
}
