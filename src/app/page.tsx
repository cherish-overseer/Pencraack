import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HelftHero from "@/components/HelftHero";
import HelftProjects from "@/components/HelftProjects";
import HelftPhilosophy from "@/components/HelftPhilosophy";
import HelixMarquee from "@/components/HelixMarquee";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden">
      <Header />
      <div className="flex-1 space-y-12">
        <HelftHero />
        <HelftProjects />
        <HelftPhilosophy />
        <HelixMarquee />
      </div>
      <Footer />
    </main>
  );
}
