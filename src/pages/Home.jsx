import React from "react";
import HeroSection from "@/components/home/HeroSection";
import SpecialtiesGrid from "@/components/home/SpecialtiesGrid";
import DifferentialsSection from "@/components/home/DifferentialsSection";
import TrustSection from "@/components/home/TrustSection";
import CtaSection from "@/components/home/CtaSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <SpecialtiesGrid />
      <DifferentialsSection />
      <TrustSection />
      <CtaSection />
    </>
  );
}