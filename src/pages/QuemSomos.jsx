import React from "react";
import HeroAbout from "@/components/about/HeroAbout";
import PillarsSection from "@/components/about/PillarsSection";
import InfrastructureSection from "@/components/about/InfrastructureSection";
import MedicalTeamSection from "@/components/about/MedicalTeamSection";
import CtaAbout from "@/components/about/CtaAbout";

export default function QuemSomos() {
  return (
    <div className="bg-[#F9FBFF]">
      <HeroAbout />
      <PillarsSection />
      <InfrastructureSection />
      <MedicalTeamSection />
      <CtaAbout />
    </div>
  );
}