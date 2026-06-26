import React, { useState, useEffect } from "react";
import { Building2 } from "lucide-react";
import { agendamentoApi, getId, getDisplayName } from "@/lib/agendamentoApi";
import OptionCard from "./OptionCard";
import LoadingState from "./LoadingState";

export default function StepUnidade({ formData, updateFormData, onNext }) {
  const [unidades, setUnidades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    agendamentoApi.getUnidades()
      .then((data) => {
        const content = data.success && Array.isArray(data.content) ? data.content : [];
        setUnidades(content);
        setLoading(false);
      })
      .catch(() => { setLoading(false); });
  }, []);

  const selectDefault = () => {
    updateFormData({ unidade_id: 0, unidade_nome: "Unidade principal" });
    onNext();
  };

  if (loading) return <LoadingState message="Carregando unidades..." />;

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="font-heading font-bold text-2xl text-[#1E293B]">Escolha a unidade</h2>
        <p className="text-[#1E293B]/60 mt-2">Selecione onde deseja ser atendido</p>
      </div>
      <div className="grid gap-3 max-w-2xl mx-auto">
        {unidades.length === 0 ? (
          <OptionCard
            selected={true}
            onClick={selectDefault}
            icon={Building2}
            title="Unidade principal"
            subtitle="Atendimento presencial"
          />
        ) : (
          unidades.map((unidade) => (
            <OptionCard
              key={getId(unidade)}
              selected={formData.unidade_id === getId(unidade)}
              onClick={() => {
                updateFormData({ unidade_id: getId(unidade), unidade_nome: getDisplayName(unidade) });
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