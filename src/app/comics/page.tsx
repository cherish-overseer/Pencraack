import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ComicBrowseView from "@/components/ComicBrowseView";
import HelixMarquee from "@/components/HelixMarquee";

export const metadata = {
  title: "Browse Comics & Webtoons | Pen Crack Editorial Studio",
  description: "Browse Pen Crack's library of serialized graphic novels, action webtoons, and manga.",
};

export default function ComicsPage() {
  return (
    <main className="min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden">
      <Header />
      <div className="flex-1">
        <ComicBrowseView />
        <HelixMarquee />
      </div>
      <Footer />
    </main>
  );
}
