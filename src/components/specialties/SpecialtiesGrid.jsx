import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { Search, ArrowRight } from "lucide-react";
import SpecialtyIcon from "@/components/shared/SpecialtyIcon";
import { smartSearch } from "@/lib/smartSearch";
import HighlightText from "@/components/shared/HighlightText";

export default function SpecialtiesGrid() {
  const [specialties, setSpecialties] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.Specialty.list("order", 50)
      .then(setSpecialties)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = smartSearch(specialties, search, [
    { key: "name", weight: 3 },
    { key: "symptoms", weight: 2 },
    { key: "short_description", weight: 1.5 },
    { key: "pain_points", weight: 1 },
    { key: "doctor_name", weight: 1 },
  ]);

  return (
    <section className="py-16 sm:py-24 bg-[#F9FBFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search */}
        <div className="max-w-lg mx-auto mb-14">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1E293B]/30" />
            <input
              type="text"
              placeholder="Buscar por nome, sintoma ou especialidade..."
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
                    className="group block bg-white rounded-2xl p-8 border border-gray-100 hover:border-[#735AAA]/30 hover:shadow-xl hover:shadow-[#735AAA]/10 transition-all duration-300 text-center h-full"
                  >
                    <div className="w-20 h-20 mx-auto flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <SpecialtyIcon
                        name={spec.icon_name}
                        slug={spec.slug}
                        className="w-16 h-16 object-contain drop-shadow-md"
                      />
                    </div>
                    <h3 className="font-heading font-bold text-base text-[#1E293B] group-hover:text-[#735AAA] transition-colors mb-2">
                      <HighlightText text={spec.name} query={search} />
                    </h3>
                    <p className="text-sm text-[#1E293B]/50 leading-relaxed line-clamp-2">
                      <HighlightText text={spec.short_description} query={search} />
                    </p>
                    <div className="mt-4 inline-flex items-center gap-1 text-[#735AAA] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      Saiba mais <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-16">
                <p className="text-[#1E293B]/50 text-lg">Nenhuma especialidade encontrada.</p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}