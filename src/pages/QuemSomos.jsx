import React from "react";
import { motion } from "framer-motion";
import { Heart, Target, Eye, Award, Users, Building, MessageCircle } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";

const ABOUT_IMG = "https://media.base44.com/images/public/6a3dce71c9e933d4c38e8c9c/89a95bdf2_generated_50eb2211.png";
const WHATSAPP_URL = "https://wa.me/5500000000000?text=Olá! Gostaria de mais informações sobre a Clínica Meta.";

const values = [
  { icon: Heart, title: "Humanização", text: "Cada paciente é único. Nosso atendimento é pautado pelo respeito, empatia e escuta ativa." },
  { icon: Target, title: "Excelência", text: "Buscamos a melhoria contínua em processos, tecnologia e formação profissional." },
  { icon: Eye, title: "Transparência", text: "Comunicação clara e honesta em cada etapa do cuidado com a sua saúde." },
  { icon: Award, title: "Ética", text: "Todas as nossas práticas seguem rigorosamente as normas do Conselho Federal de Medicina." },
];

const timeline = [
  { year: "2015", text: "Fundação da Clínica Meta com foco em atendimento acessível e de qualidade." },
  { year: "2018", text: "Ampliação do corpo clínico e inauguração do centro de exames de imagem." },
  { year: "2021", text: "Implantação da telemedicina e laudos digitais para maior comodidade." },
  { year: "2024", text: "Modernização completa dos equipamentos e expansão das especialidades." },
];

export default function QuemSomos() {
  return (
    <div className="min-h-screen pt-28 pb-24 bg-[#F9FBFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Quem Somos"
          title="A Clínica Meta"
          subtitle="Tradição e modernidade unidas pelo compromisso com a saúde da sua família."
        />

        {/* Hero block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid lg:grid-cols-2 gap-12 items-center mb-20"
        >
          <div>
            <h3 className="font-heading font-bold text-2xl text-[#1E293B] mb-6">
              Cuidar de pessoas é a nossa razão de existir
            </h3>
            <div className="space-y-4 text-[#1E293B]/70 leading-relaxed">
              <p>
                A Clínica Meta nasceu do sonho de democratizar o acesso à saúde de qualidade. Desde a nossa fundação, acreditamos que um atendimento médico excelente não precisa ser inacessível — e trabalhamos todos os dias para provar isso.
              </p>
              <p>
                Com um corpo clínico formado por especialistas qualificados e uma infraestrutura moderna, oferecemos mais de 20 especialidades médicas e uma ampla gama de exames diagnósticos. Nosso compromisso é com a precisão dos diagnósticos, a agilidade nos resultados e, acima de tudo, o acolhimento humanizado em cada consulta.
              </p>
              <p>
                Somos uma clínica popular com alma de excelência. Aqui, cada paciente é tratado como único, com respeito à sua história e atenção às suas necessidades. Essa é a essência da Meta: saúde de qualidade ao seu alcance.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-3 bg-gradient-to-br from-[#46BEE6]/15 to-[#735AAA]/15 rounded-3xl blur-xl" />
            <img
              src={ABOUT_IMG}
              alt="Instrumentos médicos modernos representando tecnologia e precisão"
              className="relative rounded-3xl shadow-lg w-full object-cover"
            />
          </div>
        </motion.div>

        {/* Mission, Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 border border-gray-100"
          >
            <div className="w-12 h-12 rounded-xl bg-[#735AAA]/10 flex items-center justify-center mb-5">
              <Target className="w-6 h-6 text-[#735AAA]" />
            </div>
            <h3 className="font-heading font-bold text-xl text-[#1E293B] mb-3">Nossa Missão</h3>
            <p className="text-[#1E293B]/70 leading-relaxed">
              Promover saúde de qualidade com acessibilidade, combinando tecnologia de ponta, profissionais qualificados e atendimento humanizado, contribuindo para o bem-estar da comunidade.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-8 border border-gray-100"
          >
            <div className="w-12 h-12 rounded-xl bg-[#46BEE6]/10 flex items-center justify-center mb-5">
              <Eye className="w-6 h-6 text-[#46BEE6]" />
            </div>
            <h3 className="font-heading font-bold text-xl text-[#1E293B] mb-3">Nossa Visão</h3>
            <p className="text-[#1E293B]/70 leading-relaxed">
              Ser referência em saúde popular no Brasil, reconhecida pela excelência clínica, inovação tecnológica e compromisso ético com cada paciente que confia em nosso cuidado.
            </p>
          </motion.div>
        </div>

        {/* Values */}
        <SectionHeading
          label="Nossos Valores"
          title="O que nos guia"
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {values.map((val, i) => (
            <motion.div
              key={val.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-white rounded-2xl p-6 border border-gray-100 text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#46BEE6]/10 to-[#735AAA]/10 flex items-center justify-center mx-auto mb-4">
                <val.icon className="w-6 h-6 text-[#735AAA]" />
              </div>
              <h4 className="font-heading font-bold text-base text-[#1E293B] mb-2">{val.title}</h4>
              <p className="text-sm text-[#1E293B]/60 leading-relaxed">{val.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Timeline */}
        <SectionHeading
          label="Nossa Trajetória"
          title="Marcos da nossa história"
        />
        <div className="max-w-3xl mx-auto mb-16">
          {timeline.map((item, i) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-6 mb-8 last:mb-0"
            >
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#46BEE6] to-[#735AAA] flex items-center justify-center text-white font-heading font-bold text-xs flex-shrink-0">
                  {item.year}
                </div>
                {i < timeline.length - 1 && <div className="w-px flex-1 bg-gradient-to-b from-[#735AAA]/30 to-transparent mt-2" />}
              </div>
              <div className="bg-white rounded-xl p-5 border border-gray-100 flex-1">
                <p className="text-[#1E293B]/70 text-sm leading-relaxed">{item.text}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#46BEE6] to-[#735AAA] text-white px-8 py-3.5 rounded-full font-semibold hover:shadow-lg hover:shadow-[#735AAA]/25 transition-all duration-300"
          >
            <MessageCircle className="w-5 h-5" />
            Entre em Contato
          </a>
        </motion.div>
      </div>
    </div>
  );
}