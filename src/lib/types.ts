export type Role = "Admin" | "Solicitante" | "Agendador" | "Fiscal / Documentação" | "Visualizador";

export type Priority = "Alta" | "Media" | "Baixa";

export type OperationalStatus =
  | "Em cotação"
  | "Agendado"
  | "Chegou"
  | "Carregando"
  | "Carregamento concluído"
  | "Em trânsito"
  | "Entregue"
  | "Cancelado"
  | "Pendente documentação";

export type DocumentStatus = "Pendente" | "Parcial" | "Completo";

export type OrderField =
  | "pedido"
  | "prioridade"
  | "origem"
  | "destino"
  | "tipoVeiculoSolicitado"
  | "status"
  | "transportadora"
  | "valorCotado"
  | "motorista"
  | "cpfMotorista"
  | "placa"
  | "tipoVeiculoConfirmado"
  | "dataAgendamento"
  | "nf"
  | "cte"
  | "mdfe"
  | "statusDocumental"
  | "observacoes"
  | "observacoesCotacao"
  | "observacoesFiscais";

export type PermissionLevel = "Edita" | "Visualiza";

export interface Order {
  id: string;
  pedido: string;
  prioridade: Priority;
  origem: string;
  destino: string;
  tipoVeiculoSolicitado: string;
  status: OperationalStatus;
  transportadora?: string;
  valorCotado?: number;
  motorista?: string;
  cpfMotorista?: string;
  placa?: string;
  tipoVeiculoConfirmado?: string;
  dataAgendamento?: string;
  nf?: string;
  cte?: string;
  mdfe?: string;
  statusDocumental: DocumentStatus;
  observacoes?: string;
  observacoesCotacao?: string;
  observacoesFiscais?: string;
  atualizadoPor: string;
  ultimaAtualizacao: string;
}

export interface Notification {
  id: string;
  tipo: string;
  mensagem: string;
  dataHora: string;
  lida: boolean;
  pedidoId: string;
}

export interface AuditLog {
  id: string;
  pedidoId: string;
  autor: string;
  descricao: string;
  dataHora: string;
}

export interface User {
  id: string;
  nome: string;
  email: string;
  cargo: Role;
  ativo: boolean;
  ultimoAcesso: string;
}

export interface RoleInfo {
  role: Role;
  descricao: string;
  usuarios: number;
}
