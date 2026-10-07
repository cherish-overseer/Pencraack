import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { PencrackProvider } from "@/context/PencrackContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileNav from "@/components/MobileNav";
import GiftModal from "@/components/GiftModal";
import ServiceRequestModal from "@/components/ServiceRequestModal";
import AuthModal from "@/components/AuthModal";
import ReaderModal from "@/components/ReaderModal";
import ToastContainer from "@/components/ToastContainer";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PENCRACK — Read. Write. Share. Support.",
  description:
    "A home for writers and readers to share stories, poems, blogs, comics, and ideas while connecting with a community that values great writing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="min-h-screen flex flex-col bg-[var(--cream)] text-[var(--ink)] antialiased">
        <PencrackProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <MobileNav />

          {/* Global Modals & Notifications */}
          <GiftModal />
          <ServiceRequestModal />
          <AuthModal />
          <ReaderModal />
          <ToastContainer />
        </PencrackProvider>
      </body>
    </html>
  );
}
