import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PoemOfTheDayHero from "@/components/PoemOfTheDayHero";
import PoemArchives from "@/components/PoemArchives";
import HelixMarquee from "@/components/HelixMarquee";

export const metadata = {
  title: "Poem of the Day & Poetry Archives | Pen Crack Editorial Studio",
  description: "Read today's featured poem, listen to audio recitations, and explore Pen Crack's curated poetry collection.",
};

export default function PoemsPage() {
  return (
    <main className="min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden">
      <Header />
      <div className="flex-1">
        <PoemOfTheDayHero />
        <PoemArchives />
        <HelixMarquee />
      </div>
      <Footer />
    </main>
  );
}
