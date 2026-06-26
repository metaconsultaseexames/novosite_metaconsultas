import React from "react";
import { Heart, Flower2, Baby, Bone, Sparkles, Eye, Monitor, Brain, Stethoscope } from "lucide-react";

const iconMap = {
  Heart, Flower2, Baby, Bone, Sparkles, Eye, Monitor, Brain, Stethoscope,
};

export default function SpecialtyIcon({ name, className = "w-6 h-6" }) {
  const Icon = iconMap[name] || Stethoscope;
  return <Icon className={className} />;
}