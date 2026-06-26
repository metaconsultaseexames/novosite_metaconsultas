import React from "react";
import { motion } from "framer-motion";
import { Cpu, Users, Zap, ShieldCheck } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";

const differentials = [
  {
    icon: Cpu,
    title: "Tecnologia de Ponta",
    description: "Equipamentos de última geração para diagnósticos precisos e tratamentos modernos.",
  },
  {
    icon: Users,
    title: "Corpo Clínico Qualificado",
    description: "Médicos especialistas com formação nas melhores instituições do país.",
  },
  {
    icon: Zap,
    title: "Agilidade nos Resultados",
    description: "Resultados de exames em até 24 horas, com laudos digitais disponíveis online.",
  },
  {
    icon: ShieldCheck,
    title: "Confiança e Transparência",
    description: "Preços acessíveis e comunicação clara em cada etapa do seu atendimento.",
  },
];

export default function DifferentialsSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#735AAA] to-[#46BEE6]" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Por que escolher a Meta"
          title="Diferenciais que fazem a diferença"
          subtitle="Combinamos excelência técnica com cuidado humanizado para oferecer a melhor experiência em saúde."
          light
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {differentials.map((diff, i) => (
            <motion.div
              key={diff.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-7 hover:bg-white/20 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <diff.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-heading font-bold text-lg text-white mb-2">{diff.title}</h3>
              <p className="text-white/70 text-sm leading-relaxed">{diff.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}