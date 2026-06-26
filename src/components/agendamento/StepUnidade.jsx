import React, { useState, useEffect } from "react";
import { Building2 } from "lucide-react";
import { agendamentoApi, getDisplayName } from "@/lib/agendamentoApi";
import OptionCard from "./OptionCard";
import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";

export default function StepUnidade({ formData, updateFormData, onNext }) {
  const [unidades, setUnidades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    agendamentoApi.getUnidades()
      .then((data) => { setUnidades(data.content || []); setLoading(false); })
      .catch((e) => { setError(e.message || "Erro ao carregar unidades"); setLoading(false); });
  }, []);

  if (loading) return <LoadingState message="Carregando unidades..." />;
  if (error) return <ErrorState message={error} />;

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="font-heading font-bold text-2xl text-[#1E293B]">Escolha a unidade</h2>
        <p className="text-[#1E293B]/60 mt-2">Selecione onde deseja ser atendido</p>
      </div>
      <div className="grid gap-3 max-w-2xl mx-auto">
        {unidades.length === 0 ? (
          <p className="text-center text-[#1E293B]/60 py-8">Nenhuma unidade disponível.</p>
        ) : (
          unidades.map((unidade) => (
            <OptionCard
              key={unidade.id}
              selected={formData.unidade_id === unidade.id}
              onClick={() => {
                updateFormData({ unidade_id: unidade.id, unidade_nome: getDisplayName(unidade) });
                onNext();
              }}
              icon={Building2}
              title={getDisplayName(unidade)}
              subtitle={unidade.endereco || unidade.logradouro || unidade.bairro}
            />
          ))
        )}
      </div>
    </div>
  );
}