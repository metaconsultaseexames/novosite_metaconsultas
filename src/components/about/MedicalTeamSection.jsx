import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Stethoscope, Award } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";

const features = [
  {
    icon: ShieldCheck,
    title: "RQE Registrado",
    text: "Todos os nossos especialistas possuem Registro de Qualificação de Especialista (RQE) ativo, garantindo formação comprovada.",
  },
  {
    icon: Stethoscope,
    title: "Experiência Hospitalar",
    text: "Muitos de nossos médicos também atuam em grandes hospitais particulares, trazendo essa mesma expertise para a Meta.",
  },
  {
    icon: Award,
    title: "Seleção Rigorosa",
    text: "Corpo clínico rigorosamente selecionado por competência técnica, ética e capacidade de acolhimento humano.",
  },
];

export default function MedicalTeamSection() {
  return (
    <section className="relative overflow-hidden py-24 bg-gradient-to-br from-[#735AAA] to-[#5A4A9A]">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2cpIi8+PC9zdmc+')] opacity-40" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[#46BEE6] mb-3">
            Corpo Clínico
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight">
            O selo de qualidade da Clínica Meta
          </h2>
          <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
            Especialistas com RQE e vasta experiência, prontos para oferecer o melhor cuidado à sua saúde.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/15"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-5">
                <f.icon className="w-7 h-7 text-[#46BEE6]" />
              </div>
              <h3 className="font-heading font-bold text-lg text-white mb-3">{f.title}</h3>
              <p className="text-sm text-white/70 leading-relaxed">{f.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}