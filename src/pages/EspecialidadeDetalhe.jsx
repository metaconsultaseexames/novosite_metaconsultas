import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { ArrowLeft, CheckCircle, MessageCircle, User, Shield } from "lucide-react";
import SpecialtyIcon from "@/components/shared/SpecialtyIcon";

const WHATSAPP_BASE = "https://wa.me/5500000000000?text=";

export default function EspecialidadeDetalhe() {
  const { slug } = useParams();
  const [specialty, setSpecialty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.Specialty.filter({ slug })
      .then((data) => setSpecialty(data[0] || null))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen pt-28 pb-24 bg-[#F9FBFF]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-80 rounded-3xl bg-gray-100 animate-pulse mb-8" />
          <div className="h-6 w-48 bg-gray-100 animate-pulse rounded mb-4" />
          <div className="h-4 w-full bg-gray-100 animate-pulse rounded" />
        </div>
      </div>
    );
  }

  if (!specialty) {
    return (
      <div className="min-h-screen pt-28 pb-24 flex items-center justify-center bg-[#F9FBFF]">
        <div className="text-center">
          <h2 className="font-heading font-bold text-2xl text-[#1E293B] mb-4">Especialidade não encontrada</h2>
          <Link to="/especialidades" className="text-[#735AAA] font-medium hover:underline">
            ← Voltar para Especialidades
          </Link>
        </div>
      </div>
    );
  }

  const whatsappMsg = encodeURIComponent(`Olá! Gostaria de agendar uma consulta em ${specialty.name}.`);

  return (
    <div className="min-h-screen pt-28 pb-24 bg-[#F9FBFF]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <Link
          to="/especialidades"
          className="inline-flex items-center gap-2 text-[#1E293B]/50 hover:text-[#735AAA] text-sm mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Todas as Especialidades
        </Link>

        {/* Hero banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-[#735AAA] to-[#46BEE6] rounded-3xl p-8 sm:p-12 mb-12 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-[80px] translate-x-1/3 -translate-y-1/3" />
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
              <SpecialtyIcon name={specialty.icon_name} className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="font-heading font-bold text-3xl sm:text-4xl text-white mb-3">{specialty.name}</h1>
              <p className="text-white/80 text-lg leading-relaxed max-w-2xl">
                {specialty.short_description}
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            {/* About */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-8 border border-gray-100"
            >
              <h2 className="font-heading font-bold text-xl text-[#1E293B] mb-4">
                Sobre a {specialty.name}
              </h2>
              <p className="text-[#1E293B]/70 leading-relaxed text-base">
                {specialty.full_description}
              </p>
            </motion.section>

            {/* Symptoms */}
            {specialty.symptoms && specialty.symptoms.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl p-8 border border-gray-100"
              >
                <h2 className="font-heading font-bold text-xl text-[#1E293B] mb-6">
                  Quando procurar um especialista?
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {specialty.symptoms.map((symptom) => (
                    <div key={symptom} className="flex items-center gap-3 p-3 rounded-xl bg-[#F9FBFF]">
                      <CheckCircle className="w-5 h-5 text-[#46BEE6] flex-shrink-0" />
                      <span className="text-[#1E293B]/80 text-sm">{symptom}</span>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}
          </div>

          <div className="space-y-6">
            {/* Doctor card */}
            {specialty.doctor_name && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl p-6 border border-gray-100"
              >
                <h3 className="font-heading font-bold text-lg text-[#1E293B] mb-5 flex items-center gap-2">
                  <User className="w-5 h-5 text-[#735AAA]" />
                  Corpo Clínico
                </h3>
                <div className="bg-gradient-to-br from-[#46BEE6]/5 to-[#735AAA]/5 rounded-xl p-5">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#46BEE6] to-[#735AAA] flex items-center justify-center mb-4">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <p className="font-heading font-bold text-base text-[#1E293B]">{specialty.doctor_name}</p>
                  <div className="mt-2 space-y-1">
                    <p className="text-xs font-mono text-[#735AAA] bg-[#735AAA]/10 inline-block px-2 py-0.5 rounded">
                      {specialty.doctor_crm}
                    </p>
                    <br />
                    <p className="text-xs font-mono text-[#46BEE6] bg-[#46BEE6]/10 inline-block px-2 py-0.5 rounded">
                      {specialty.doctor_rqe}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs text-[#1E293B]/40">
                  <Shield className="w-3.5 h-3.5" />
                  Registro verificado — CFM
                </div>
              </motion.div>
            )}

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-2xl p-6 text-center"
            >
              <h3 className="font-heading font-bold text-lg text-white mb-3">
                Agende sua consulta
              </h3>
              <p className="text-gray-400 text-sm mb-6">
                Atendimento rápido e humanizado em {specialty.name}.
              </p>
              <a
                href={`${WHATSAPP_BASE}${whatsappMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#46BEE6] to-[#735AAA] text-white w-full justify-center py-3.5 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
              >
                <MessageCircle className="w-5 h-5" />
                Agendar com {specialty.name}
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}