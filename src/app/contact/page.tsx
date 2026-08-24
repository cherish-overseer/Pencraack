import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HelixContactHero from "@/components/HelixContactHero";
import HelixContactCards from "@/components/HelixContactCards";
import HelixContactForm from "@/components/HelixContactForm";
import HelixMarquee from "@/components/HelixMarquee";

export const metadata = {
  title: "Contact Us | Pen Crack Editorial Studio",
  description: "Get in touch with Pen Crack editorial directors for academic research, book writing, and commercial copy inquiries.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden">
      <Header />
      <div className="flex-1">
        <HelixContactHero />
        <HelixContactCards />
        <HelixContactForm />
        <HelixMarquee />
      </div>
      <Footer />
    </main>
  );
}
