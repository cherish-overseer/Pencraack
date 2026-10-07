import HelixContactHero from "@/components/HelixContactHero";
import HelixContactCards from "@/components/HelixContactCards";
import HelixContactForm from "@/components/HelixContactForm";

export const metadata = {
  title: "Contact Us | Pen Crack Editorial Studio",
  description: "Get in touch with Pen Crack editorial directors for academic research, book writing, and commercial copy inquiries.",
};

export default function ContactPage() {
  return (
    <div className="w-full">
      <HelixContactHero />
      <HelixContactCards />
      <HelixContactForm />
    </div>
  );
}
