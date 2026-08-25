import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AbimbolaHero from "@/components/AbimbolaHero";
import AbimbolaMarquee from "@/components/AbimbolaMarquee";
import AbimbolaAboutSection from "@/components/AbimbolaAboutSection";
import AbimbolaShowcase from "@/components/AbimbolaShowcase";
import AbimbolaBlogPreview from "@/components/AbimbolaBlogPreview";
import AbimbolaCommunity from "@/components/AbimbolaCommunity";
import AbimbolaNewsletter from "@/components/AbimbolaNewsletter";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-background text-foreground overflow-x-clip">
      <Header />
      <div className="flex-1 space-y-0">
        <AbimbolaHero />
        <AbimbolaMarquee />
        <AbimbolaAboutSection />
        <AbimbolaShowcase />
        <AbimbolaBlogPreview />
        <AbimbolaCommunity />
        <AbimbolaNewsletter />
      </div>
      <Footer />
    </main>
  );
}
