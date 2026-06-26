import React from "react";
import { Heart, Flower2, Baby, Bone, Sparkles, Eye, Monitor, Brain, Activity, Apple, Stethoscope, Droplet } from "lucide-react";

const iconMap = {
  Heart, Flower2, Baby, Bone, Sparkles, Eye, Monitor, Brain, Activity, Apple, Stethoscope, Droplet,
};

export default function SpecialtyIcon({ name, className = "w-6 h-6" }) {
  const Icon = iconMap[name] || Stethoscope;
  return <Icon className={className} />;
}