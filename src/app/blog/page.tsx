import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogFeaturedHero from "@/components/BlogFeaturedHero";
import BlogRiver from "@/components/BlogRiver";
import HelixMarquee from "@/components/HelixMarquee";
import { Sparkles } from "lucide-react";

export const metadata = {
  title: "Blog & Editorial Insights | Pen Crack Studio",
  description: "Explore Pen Crack's latest articles on academic writing, publishing trends, AI authorship, and creative ghostwriting.",
};

export default function BlogPage() {
  return (
    <main className="min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden">
      <Header />
      <div className="flex-1 space-y-8 py-12">
        {/* Page Header */}
        <section className="w-full px-8 max-w-7xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-600/10 border border-brand-600/20 text-brand-600 text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tech & Editorial Insights</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-brand-600 font-heading">
            Pen Crack Blog & Essays
          </h1>

          <p className="text-black text-lg sm:text-xl font-serif max-w-2xl mx-auto">
            Deep-dives into academic research methods, literary craft, commercial copywriting, and publishing trends.
          </p>
        </section>

        <BlogFeaturedHero />
        <BlogRiver />
        <HelixMarquee />
      </div>
      <Footer />
    </main>
  );
}
