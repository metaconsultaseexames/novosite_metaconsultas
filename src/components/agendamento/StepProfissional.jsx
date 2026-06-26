import React, { useState, useEffect } from "react";
import { UserRound } from "lucide-react";
import { agendamentoApi, getDisplayName } from "@/lib/agendamentoApi";
import OptionCard from "./OptionCard";
import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";

export default function StepProfissional({ formData, updateFormData, onNext }) {
  const [profissionais, setProfissionais] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    agendamentoApi.getProfissionais(formData.especialidade_id)
      .then((data) => { setProfissionais(data.content || []); setLoading(false); })
      .catch((e) => { setError(e.message || "Erro ao carregar profissionais"); setLoading(false); });
  }, []);

  if (loading) return <LoadingState message="Carregando profissionais..." />;
  if (error) return <ErrorState message={error} />;

  const semPreferencia = { id: null, nome_completo: "Sem preferência de profissional" };

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="font-heading font-bold text-2xl text-[#1E293B]">Escolha o profissional</h2>
        <p className="text-[#1E293B]/60 mt-2">Selecione com quem deseja ser atendido</p>
      </div>
      <div className="grid gap-3 max-w-2xl mx-auto">
        <OptionCard
          selected={formData.profissional_id === null && formData.profissional_nome === "Sem preferência de profissional"}
          onClick={() => {
            updateFormData({ profissional_id: null, profissional_nome: "Sem preferência de profissional" });
            onNext();
          }}
          icon={UserRound}
          title="Sem preferência"
          subtitle="Disponibilizar horários de qualquer profissional"
        />
        {profissionais.map((prof) => (
          <OptionCard
            key={prof.id}
            selected={formData.profissional_id === prof.id}
            onClick={() => {
              updateFormData({ profissional_id: prof.id, profissional_nome: getDisplayName(prof) });
              onNext();
            }}
            icon={UserRound}
            title={getDisplayName(prof)}
            subtitle={prof.especialidade_nome || prof.conselho_numero ? `${prof.conselho || "CRM"} ${prof.conselho_numero || ""}`.trim() : null}
          />
        ))}
      </div>
    </div>
  );
}