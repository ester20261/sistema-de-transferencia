import type { OrderField, PermissionLevel, Role } from "./types";

export const roles: Role[] = ["Admin", "Solicitante", "Agendador", "Fiscal / Documentação", "Visualizador"];

export const fieldLabels: Record<OrderField, string> = {
  pedido: "Pedido",
  prioridade: "Prioridade",
  origem: "Origem",
  destino: "Destino",
  tipoVeiculoSolicitado: "Tipo solicitado",
  status: "Status",
  transportadora: "Transportadora",
  valorCotado: "Valor cotado",
  motorista: "Motorista",
  cpfMotorista: "CPF",
  placa: "Placa",
  tipoVeiculoConfirmado: "Tipo confirmado",
  dataAgendamento: "Data/hora",
  nf: "NF",
  cte: "CTE",
  mdfe: "MDFE",
  statusDocumental: "Status documental",
  observacoes: "Observações",
  observacoesCotacao: "Obs. cotação",
  observacoesFiscais: "Obs. fiscais"
};

const requesterFields: OrderField[] = [
  "pedido",
  "prioridade",
  "origem",
  "destino",
  "tipoVeiculoSolicitado",
  "observacoes"
];

const schedulerFields: OrderField[] = [
  "status",
  "transportadora",
  "valorCotado",
  "motorista",
  "cpfMotorista",
  "placa",
  "tipoVeiculoConfirmado",
  "dataAgendamento",
  "observacoesCotacao"
];

const fiscalFields: OrderField[] = ["nf", "cte", "mdfe", "statusDocumental", "observacoesFiscais"];

export const columnPermissions: Record<OrderField, Record<Role, PermissionLevel>> = Object.keys(fieldLabels).reduce(
  (acc, key) => {
    const field = key as OrderField;
    acc[field] = {
      Admin: "Edita",
      Solicitante: requesterFields.includes(field) ? "Edita" : "Visualiza",
      Agendador: schedulerFields.includes(field) ? "Edita" : "Visualiza",
      "Fiscal / Documentação": fiscalFields.includes(field) ? "Edita" : "Visualiza",
      Visualizador: "Visualiza"
    };
    return acc;
  },
  {} as Record<OrderField, Record<Role, PermissionLevel>>
);

export function canEdit(role: Role, field: OrderField) {
  return columnPermissions[field][role] === "Edita";
}
