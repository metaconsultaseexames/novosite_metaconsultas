import React, { useState } from "react";
import { Search, UserPlus, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { agendamentoApi } from "@/lib/agendamentoApi";

const onlyDigits = (str) => (str || "").replace(/\D/g, "");
const formatBRDate = (date) => {
  if (!date) return "";
  const d = new Date(date + "T00:00:00");
  return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
};

export default function StepPaciente({ formData, updateFormData, onNext }) {
  const [cpf, setCpf] = useState(formData.paciente?.cpf || "");
  const [birthdate, setBirthdate] = useState(formData.paciente?.data_nascimento || "");
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState(null);
  const [foundPatient, setFoundPatient] = useState(null);
  const [infosimplesData, setInfosimplesData] = useState(null);
  const [formMode, setFormMode] = useState(null); // "create" | "edit"
  const [patientForm, setPatientForm] = useState({});

  const handleVerify = async () => {
    setError(null);
    setFoundPatient(null);
    setInfosimplesData(null);
    setFormMode(null);

    const cleanCpf = onlyDigits(cpf);
    if (cleanCpf.length !== 11) { setError("Digite um CPF válido (11 dígitos)."); return; }
    if (!birthdate) { setError("Informe sua data de nascimento."); return; }

    setVerifying(true);
    try {
      const cpfResult = await agendamentoApi.consultarCpf(cleanCpf, birthdate);
      if (cpfResult.situacao !== "OK" && cpfResult.codigo !== "000") {
        setError(cpfResult.mensagem || "Não foi possível validar o CPF. Verifique os dados e tente novamente.");
        setVerifying(false);
        return;
      }
      const rfData = cpfResult.data || {};
      setInfosimplesData(rfData);

      const patientResult = await agendamentoApi.buscarPaciente(cleanCpf);
      const existing = patientResult.content && patientResult.content[0];
      if (existing) {
        setFoundPatient(existing);
        updateFormData({ paciente: existing });
      } else {
        const nomeParts = (rfData.nome || "").trim().split(/\s+/);
        setPatientForm({
          nome_completo: rfData.nome || "",
          cpf: cleanCpf,
          data_nascimento: birthdate,
          genero: rfData.genero === "MASCULINO" ? "M" : rfData.genero === "FEMININO" ? "F" : "",
          nome_mae: rfData.nome_mae || "",
          telefone: "",
          celular: "",
          email: "",
          cep: "",
          cidade: "",
          estado: "",
          endereco: "",
          numero: "",
          complemento: "",
          bairro: "",
        });
        setFormMode("create");
      }
    } catch (e) {
      setError(e.message || "Erro ao verificar CPF. Tente novamente.");
    }
    setVerifying(false);
  };

  const handleSavePatient = async () => {
    setError(null);
    setVerifying(true);
    try {
      const result = formMode === "create"
        ? await agendamentoApi.criarPaciente(patientForm)
        : await agendamentoApi.editarPaciente(patientForm);
      const savedPatient = result.content || result.data || result;
      if (savedPatient && savedPatient.id) {
        updateFormData({ paciente: savedPatient });
        onNext();
      } else if (foundPatient) {
        updateFormData({ paciente: foundPatient });
        onNext();
      } else {
        setError("Não foi possível salvar os dados do paciente.");
      }
    } catch (e) {
      setError(e.message || "Erro ao salvar paciente.");
    }
    setVerifying(false);
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="font-heading font-bold text-2xl text-[#1E293B]">Seus dados</h2>
        <p className="text-[#1E293B]/60 mt-2">Informe seu CPF e data de nascimento para continuar</p>
      </div>

      <div className="max-w-md mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-[#1E293B] mb-1.5">CPF</label>
            <input
              type="text"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              placeholder="000.000.000-00"
              maxLength={14}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F9FBFF] focus:outline-none focus:ring-2 focus:ring-[#735AAA]/20 focus:border-[#735AAA] transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1E293B] mb-1.5">Data de nascimento</label>
            <input
              type="date"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F9FBFF] focus:outline-none focus:ring-2 focus:ring-[#735AAA]/20 focus:border-[#735AAA] transition-all"
            />
          </div>
        </div>

        <button
          onClick={handleVerify}
          disabled={verifying || !cpf || !birthdate}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#46BEE6] to-[#735AAA] text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-[#735AAA]/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {verifying ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
          {verifying ? "Verificando..." : "Verificar CPF"}
        </button>

        {error && (
          <div className="mt-4 flex items-start gap-2 p-3 rounded-xl bg-red-50 text-red-600 text-sm">
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {foundPatient && (
          <div className="mt-6 p-5 rounded-2xl bg-green-50 border border-green-100">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span className="font-semibold text-green-700">Paciente encontrado!</span>
            </div>
            <p className="text-[#1E293B]">{foundPatient.nome_completo || foundPatient.nome}</p>
            <p className="text-sm text-[#1E293B]/60 mt-1">CPF: {foundPatient.cpf}</p>
            <button
              onClick={onNext}
              className="mt-4 w-full bg-[#735AAA] text-white py-2.5 rounded-xl font-semibold hover:bg-[#5d478a] transition-colors"
            >
              Continuar
            </button>
          </div>
        )}

        {formMode === "create" && (
          <div className="mt-6">
            <div className="flex items-center gap-2 mb-4">
              <UserPlus className="w-5 h-5 text-[#735AAA]" />
              <h3 className="font-heading font-semibold text-[#1E293B]">Novo cadastro</h3>
            </div>
            <p className="text-sm text-[#1E293B]/60 mb-4">Seus dados foram pré-preenchidos. Complete com seu contato e endereço.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input className="col-span-2 px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F9FBFF] focus:outline-none focus:ring-2 focus:ring-[#735AAA]/20 focus:border-[#735AAA]" placeholder="Nome completo" value={patientForm.nome_completo || ""} onChange={(e) => setPatientForm({ ...patientForm, nome_completo: e.target.value })} />
              <input className="px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F9FBFF] focus:outline-none focus:ring-2 focus:ring-[#735AAA]/20 focus:border-[#735AAA]" placeholder="Celular" value={patientForm.celular || ""} onChange={(e) => setPatientForm({ ...patientForm, celular: e.target.value })} />
              <input className="px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F9FBFF] focus:outline-none focus:ring-2 focus:ring-[#735AAA]/20 focus:border-[#735AAA]" placeholder="E-mail" value={patientForm.email || ""} onChange={(e) => setPatientForm({ ...patientForm, email: e.target.value })} />
              <input className="px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F9FBFF] focus:outline-none focus:ring-2 focus:ring-[#735AAA]/20 focus:border-[#735AAA]" placeholder="CEP" value={patientForm.cep || ""} onChange={(e) => setPatientForm({ ...patientForm, cep: e.target.value })} />
              <input className="px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F9FBFF] focus:outline-none focus:ring-2 focus:ring-[#735AAA]/20 focus:border-[#735AAA]" placeholder="Cidade" value={patientForm.cidade || ""} onChange={(e) => setPatientForm({ ...patientForm, cidade: e.target.value })} />
              <input className="px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F9FBFF] focus:outline-none focus:ring-2 focus:ring-[#735AAA]/20 focus:border-[#735AAA]" placeholder="Endereço" value={patientForm.endereco || ""} onChange={(e) => setPatientForm({ ...patientForm, endereco: e.target.value })} />
              <input className="px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F9FBFF] focus:outline-none focus:ring-2 focus:ring-[#735AAA]/20 focus:border-[#735AAA]" placeholder="Número" value={patientForm.numero || ""} onChange={(e) => setPatientForm({ ...patientForm, numero: e.target.value })} />
              <input className="px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F9FBFF] focus:outline-none focus:ring-2 focus:ring-[#735AAA]/20 focus:border-[#735AAA]" placeholder="Bairro" value={patientForm.bairro || ""} onChange={(e) => setPatientForm({ ...patientForm, bairro: e.target.value })} />
            </div>
            <button
              onClick={handleSavePatient}
              disabled={verifying}
              className="mt-4 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#46BEE6] to-[#735AAA] text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-[#735AAA]/30 transition-all duration-300 disabled:opacity-50"
            >
              {verifying ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle2 className="w-5 h-5" />}
              {verifying ? "Salvando..." : "Salvar e continuar"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}