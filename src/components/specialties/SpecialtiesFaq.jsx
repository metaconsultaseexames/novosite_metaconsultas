import React from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/5500000000000?text=Olá, gostaria de agendar uma consulta na Clínica Meta";

export default function SpecialtiesFaq() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border-2 border-dashed border-[#46BEE6]/30 bg-[#F9FBFF] p-10 text-center"
        >
          <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#1E293B] mb-3">
            Não encontrou a especialidade que procurava?
          </h3>
          <p className="text-[#1E293B]/60 leading-relaxed mb-6 max-w-xl mx-auto">
            Estamos em constante expansão. Entre em contato com nossa central para verificar novos atendimentos.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#46BEE6] to-[#735AAA] text-white px-8 py-3.5 rounded-full font-semibold hover:shadow-lg hover:shadow-[#735AAA]/25 transition-all duration-300"
          >
            <MessageCircle className="w-5 h-5" />
            Falar com a Central no WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}