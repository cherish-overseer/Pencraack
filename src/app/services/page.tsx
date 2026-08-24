import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NumberedServices from "@/components/NumberedServices";
import CreativeCommercial from "@/components/CreativeCommercial";
import AcademicResearch from "@/components/AcademicResearch";
import HelixProcess from "@/components/HelixProcess";
import CtaBanner from "@/components/CtaBanner";
import HelixMarquee from "@/components/HelixMarquee";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Editorial & Writing Services | Pen Crack Studio",
  description: "Explore Pen Crack's comprehensive services in academic research, creative writing, ghostwriting, and commercial copy.",
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden">
      <Header />
      <div className="flex-1 space-y-12 py-12">
        {/* Services Page Header */}
        <section className="w-full px-8 max-w-7xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-600/10 border border-brand-600/20 text-brand-600 text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Editorial Offerings</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-brand-600 font-heading leading-tight">
            We Write. We Read. We Connect.
          </h1>

          <p className="text-black text-lg sm:text-xl font-serif max-w-3xl mx-auto leading-relaxed">
            From academic dissertations to fiction ghostwriting and corporate brand copy, our master editors and researchers craft every word with precision and passion.
          </p>
        </section>

        {/* Featured Service Sections */}
        <NumberedServices />
        <CreativeCommercial />
        <AcademicResearch />
        <HelixProcess />
        <CtaBanner />
        <HelixMarquee />
      </div>
      <Footer />
    </main>
  );
}
