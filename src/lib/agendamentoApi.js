import { base44 } from "@/api/base44Client";

const invoke = (payload) =>
  base44.functions.invoke("agendamento", payload).then((res) => res.data);

export const agendamentoApi = {
  getUnidades: () => invoke({ action: "unidades" }),
  getEspecialidades: () => invoke({ action: "especialidades" }),
  getProcedimentos: (especialidade_id) => invoke({ action: "procedimentos", especialidade_id }),
  getProfissionais: (especialidade_id) => invoke({ action: "profissionais", especialidade_id }),
  getDisponibilidade: (params) => invoke({ action: "disponibilidade", ...params }),
  buscarPaciente: (cpf) => invoke({ action: "buscarPaciente", cpf }),
  criarPaciente: (paciente) => invoke({ action: "criarPaciente", paciente }),
  editarPaciente: (paciente) => invoke({ action: "editarPaciente", paciente }),
  consultarCpf: (cpf, birthdate) => invoke({ action: "consultarCpf", cpf, birthdate }),
  criarAgendamento: (agendamento) => invoke({ action: "criarAgendamento", agendamento }),
};

export const getId = (item) =>
  item.especialidade_id || item.profissional_id || item.procedimento_id || item.id;

export const getDisplayName = (item) =>
  item.nome || item.empresa || item.descricao || item.especialidade ||
  item.procedimento || item.nome_completo || item.profissional || `Item ${getId(item)}`;