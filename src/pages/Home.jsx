import React from "react";
import HeroSection from "@/components/home/HeroSection";
import QuickAccessGrid from "@/components/home/QuickAccessGrid";
import SpecialtiesGrid from "@/components/home/SpecialtiesGrid";
import DifferentialsSection from "@/components/home/DifferentialsSection";
import TrustSection from "@/components/home/TrustSection";
import CheckupBanner from "@/components/home/CheckupBanner";
import CtaSection from "@/components/home/CtaSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <QuickAccessGrid />
      <SpecialtiesGrid />
      <DifferentialsSection />
      <TrustSection />
      <CheckupBanner />
      <CtaSection />
    </>
  );
}