import React, { useState, useEffect } from "react";
import { Stethoscope } from "lucide-react";
import { agendamentoApi, getDisplayName } from "@/lib/agendamentoApi";
import OptionCard from "./OptionCard";
import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";

export default function StepEspecialidade({ formData, updateFormData, onNext }) {
  const [especialidades, setEspecialidades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    agendamentoApi.getEspecialidades()
      .then((data) => { setEspecialidades(data.content || []); setLoading(false); })
      .catch((e) => { setError(e.message || "Erro ao carregar especialidades"); setLoading(false); });
  }, []);

  if (loading) return <LoadingState message="Carregando especialidades..." />;
  if (error) return <ErrorState message={error} />;

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="font-heading font-bold text-2xl text-[#1E293B]">Qual especialidade?</h2>
        <p className="text-[#1E293B]/60 mt-2">Selecione a especialidade médica desejada</p>
      </div>
      <div className="grid gap-3 max-w-2xl mx-auto">
        {especialidades.length === 0 ? (
          <p className="text-center text-[#1E293B]/60 py-8">Nenhuma especialidade disponível.</p>
        ) : (
          especialidades.map((esp) => (
            <OptionCard
              key={esp.id}
              selected={formData.especialidade_id === esp.id}
              onClick={() => {
                updateFormData({ especialidade_id: esp.id, especialidade_nome: getDisplayName(esp) });
                onNext();
              }}
              icon={Stethoscope}
              title={getDisplayName(esp)}
            />
          ))
        )}
      </div>
    </div>
  );
}