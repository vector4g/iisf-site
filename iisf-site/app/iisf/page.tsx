import type { Metadata } from "next";
import Header from "@/components/iisf/Header";
import Hero from "@/components/iisf/Hero";
import Governance from "@/components/iisf/Governance";
import FoundingStory from "@/components/iisf/FoundingStory";
import ResearchPillars from "@/components/iisf/ResearchPillars";
import ResearchFellowship from "@/components/iisf/ResearchFellowship";
import SupportSection from "@/components/iisf/SupportSection";
import ContactSection from "@/components/iisf/ContactSection";
import CharterModalProvider from "@/components/iisf/CharterModalProvider";
import Footer from "@/components/iisf/Footer";

export const metadata: Metadata = {
  title: "International Intersectional Safety Foundation",
  description:
    "Guardians of the Algorithm — IISF stewards the Charter of Fundamental Intersectional Safety Rights.",
  alternates: { canonical: "https://intersectionalsafety.org" },
  robots: { index: false, follow: true },
};

export default function IISFPage() {
  return (
    <main className="min-h-screen bg-[#05060a] text-slate-100">
      <CharterModalProvider>
        <Header />
        <Hero />
        <Governance />
        <FoundingStory />
        <ResearchPillars />
        <ResearchFellowship />
        <SupportSection />
        <ContactSection />
        <Footer />
      </CharterModalProvider>
    </main>
  );
}
