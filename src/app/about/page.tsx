import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HelixAboutHero from "@/components/HelixAboutHero";
import HelixPillars from "@/components/HelixPillars";
import HelixProcess from "@/components/HelixProcess";
import HelixWhyUs from "@/components/HelixWhyUs";
import CtaBanner from "@/components/CtaBanner";

export const metadata = {
  title: "About Us | Pen Crack Editorial Studio",
  description: "Helixgade-inspired about page for Pen Crack - Premier writing and editorial solution studio.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden">
      <Header />
      <div className="flex-1">
        <HelixAboutHero />
        <HelixPillars />
        <HelixProcess />
        <HelixWhyUs />
        <CtaBanner />
      </div>
      <Footer />
    </main>
  );
}
