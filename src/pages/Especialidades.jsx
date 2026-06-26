import React from "react";
import SpecialtiesHero from "@/components/specialties/SpecialtiesHero";
import SpecialtiesGrid from "@/components/specialties/SpecialtiesGrid";
import SpecialtiesDifferentials from "@/components/specialties/SpecialtiesDifferentials";
import SpecialtiesCheckup from "@/components/specialties/SpecialtiesCheckup";
import SpecialtiesFaq from "@/components/specialties/SpecialtiesFaq";

export default function Especialidades() {
  return (
    <div className="bg-[#F9FBFF]">
      <SpecialtiesHero />
      <SpecialtiesGrid />
      <SpecialtiesDifferentials />
      <SpecialtiesCheckup />
      <SpecialtiesFaq />
    </div>
  );
}