import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { Search, ArrowRight, MessageCircle } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import SpecialtyIcon from "@/components/shared/SpecialtyIcon";

const WHATSAPP_URL = "https://wa.me/5500000000000?text=Olá! Não encontrei a especialidade que procuro.";

export default function Especialidades() {
  const [specialties, setSpecialties] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.Specialty.list("order", 50)
      .then(setSpecialties)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = specialties.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-28 pb-24 bg-[#F9FBFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Nossas Especialidades"
          title="Especialidades Médicas"
          subtitle="Encontre o especialista ideal para cuidar da sua saúde. Navegue pelas áreas ou busque pelo nome."
        />

        {/* Search */}
        <div className="max-w-lg mx-auto mb-14">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1E293B]/30" />
            <input
              type="text"
              placeholder="Buscar especialidade..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-gray-200 text-[#1E293B] placeholder:text-[#1E293B]/30 focus:border-[#46BEE6] focus:ring-2 focus:ring-[#46BEE6]/20 outline-none transition-all text-base"
            />
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-48 rounded-2xl bg-white animate-pulse" />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {filtered.map((spec, i) => (
                <motion.div
                  key={spec.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={`/especialidade/${spec.slug}`}
                    className="group block bg-white rounded-2xl p-8 border border-gray-100 hover:border-[#46BEE6]/30 hover:shadow-xl hover:shadow-[#46BEE6]/10 transition-all duration-300 text-center h-full"
                  >
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-[#46BEE6]/10 to-[#735AAA]/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                      <SpecialtyIcon name={spec.icon_name} className="w-8 h-8 text-[#735AAA]" />
                    </div>
                    <h3 className="font-heading font-bold text-base text-[#1E293B] group-hover:text-[#735AAA] transition-colors mb-2">
                      {spec.name}
                    </h3>
                    <p className="text-sm text-[#1E293B]/50 leading-relaxed line-clamp-2">
                      {spec.short_description}
                    </p>
                    <div className="mt-4 inline-flex items-center gap-1 text-[#46BEE6] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      Saiba mais <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-16">
                <p className="text-[#1E293B]/50 text-lg mb-4">Nenhuma especialidade encontrada.</p>
              </div>
            )}
          </>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-[#1E293B]/50 mb-4">Não encontrou o que procurava?</p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#46BEE6] to-[#735AAA] text-white px-8 py-3.5 rounded-full font-semibold hover:shadow-lg hover:shadow-[#735AAA]/25 transition-all duration-300"
          >
            <MessageCircle className="w-5 h-5" />
            Fale Conosco
          </a>
        </motion.div>
      </div>
    </div>
  );
}