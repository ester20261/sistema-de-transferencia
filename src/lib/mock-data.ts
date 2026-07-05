import type { AuditLog, Notification, Order, RoleInfo, User } from "./types";

export const orders: Order[] = [
  {
    id: "ord-001",
    pedido: "PED-1048",
    prioridade: "Alta",
    origem: "Joinville, SC",
    destino: "Campinas, SP",
    tipoVeiculoSolicitado: "Truck baú",
    status: "Em cotação",
    transportadora: "Rota Sul Express",
    valorCotado: 4850,
    motorista: "Carlos Menezes",
    cpfMotorista: "123.456.789-10",
    placa: "RSL-4A82",
    statusDocumental: "Pendente",
    observacoes: "Carga paletizada com janela de coleta pela manhã.",
    atualizadoPor: "Ana Solicitante",
    ultimaAtualizacao: "2026-07-05T11:40:00-03:00"
  },
  {
    id: "ord-002",
    pedido: "PED-1051",
    prioridade: "Media",
    origem: "Sorocaba, SP",
    destino: "Betim, MG",
    tipoVeiculoSolicitado: "Carreta sider",
    status: "Agendado",
    transportadora: "Atlas Transportes",
    valorCotado: 7200,
    motorista: "Rafael Santos",
    cpfMotorista: "321.654.987-22",
    placa: "ATS-9C14",
    tipoVeiculoConfirmado: "Carreta sider",
    dataAgendamento: "2026-07-06T08:30:00-03:00",
    nf: "NF-89321",
    statusDocumental: "Parcial",
    observacoesCotacao: "Motorista confirmado na portaria 2.",
    atualizadoPor: "Bruno Agendador",
    ultimaAtualizacao: "2026-07-05T12:15:00-03:00"
  },
  {
    id: "ord-003",
    pedido: "PED-1054",
    prioridade: "Baixa",
    origem: "Curitiba, PR",
    destino: "Porto Alegre, RS",
    tipoVeiculoSolicitado: "VUC refrigerado",
    status: "Carregando",
    transportadora: "FrioLog",
    valorCotado: 3900,
    motorista: "Helena Duarte",
    cpfMotorista: "456.222.111-03",
    placa: "FRL-7B29",
    tipoVeiculoConfirmado: "VUC refrigerado",
    dataAgendamento: "2026-07-05T14:00:00-03:00",
    nf: "NF-89342",
    cte: "CTE-55102",
    mdfe: "MDFE-77011",
    statusDocumental: "Completo",
    observacoesFiscais: "Documentos conferidos.",
    atualizadoPor: "Clara Fiscal",
    ultimaAtualizacao: "2026-07-05T14:22:00-03:00"
  },
  {
    id: "ord-004",
    pedido: "PED-1057",
    prioridade: "Alta",
    origem: "Osasco, SP",
    destino: "Rio de Janeiro, RJ",
    tipoVeiculoSolicitado: "Toco baú",
    status: "Pendente documentação",
    transportadora: "Litoral Cargo",
    valorCotado: 5150,
    motorista: "Diego Lima",
    cpfMotorista: "789.111.222-44",
    placa: "LTC-2D50",
    nf: "NF-89401",
    statusDocumental: "Pendente",
    observacoesFiscais: "Aguardando emissão de CTE.",
    atualizadoPor: "Clara Fiscal",
    ultimaAtualizacao: "2026-07-05T13:35:00-03:00"
  },
  {
    id: "ord-005",
    pedido: "PED-1060",
    prioridade: "Media",
    origem: "Limeira, SP",
    destino: "Vitória, ES",
    tipoVeiculoSolicitado: "Carreta baú",
    status: "Entregue",
    transportadora: "Navega Log",
    valorCotado: 6650,
    motorista: "Patrícia Ramos",
    cpfMotorista: "555.444.333-20",
    placa: "NVG-1E90",
    tipoVeiculoConfirmado: "Carreta baú",
    dataAgendamento: "2026-07-03T09:00:00-03:00",
    nf: "NF-89112",
    cte: "CTE-54998",
    mdfe: "MDFE-76902",
    statusDocumental: "Completo",
    atualizadoPor: "Sistema Demo",
    ultimaAtualizacao: "2026-07-04T17:48:00-03:00"
  }
];

export const notifications: Notification[] = [
  {
    id: "not-001",
    tipo: "Novo pedido",
    mensagem: "PED-1048 entrou em cotação e precisa de transportadora.",
    dataHora: "2026-07-05T11:42:00-03:00",
    lida: false,
    pedidoId: "ord-001"
  },
  {
    id: "not-002",
    tipo: "Documentação pendente",
    mensagem: "PED-1057 está sem CTE e MDFE.",
    dataHora: "2026-07-05T13:36:00-03:00",
    lida: false,
    pedidoId: "ord-004"
  },
  {
    id: "not-003",
    tipo: "Veículo agendado",
    mensagem: "PED-1051 foi agendado para 06/07 às 08:30.",
    dataHora: "2026-07-05T12:16:00-03:00",
    lida: true,
    pedidoId: "ord-002"
  }
];

export const auditLogs: AuditLog[] = [
  {
    id: "log-001",
    pedidoId: "ord-001",
    autor: "Ana Solicitante",
    descricao: "Criou solicitação PED-1048 com prioridade alta.",
    dataHora: "2026-07-05T11:40:00-03:00"
  },
  {
    id: "log-002",
    pedidoId: "ord-002",
    autor: "Bruno Agendador",
    descricao: "Confirmou motorista, placa e data de agendamento.",
    dataHora: "2026-07-05T12:15:00-03:00"
  },
  {
    id: "log-003",
    pedidoId: "ord-004",
    autor: "Clara Fiscal",
    descricao: "Sinalizou pendência documental para CTE e MDFE.",
    dataHora: "2026-07-05T13:35:00-03:00"
  }
];

export const users: User[] = [
  { id: "usr-1", nome: "Marina Admin", email: "admin@demo.local", cargo: "Admin", ativo: true, ultimoAcesso: "2026-07-05T14:10:00-03:00" },
  { id: "usr-2", nome: "Ana Solicitante", email: "ana@demo.local", cargo: "Solicitante", ativo: true, ultimoAcesso: "2026-07-05T11:45:00-03:00" },
  { id: "usr-3", nome: "Bruno Agendador", email: "bruno@demo.local", cargo: "Agendador", ativo: true, ultimoAcesso: "2026-07-05T12:20:00-03:00" },
  { id: "usr-4", nome: "Clara Fiscal", email: "clara@demo.local", cargo: "Fiscal / Documentação", ativo: true, ultimoAcesso: "2026-07-05T13:41:00-03:00" },
  { id: "usr-5", nome: "Victor Viewer", email: "viewer@demo.local", cargo: "Visualizador", ativo: false, ultimoAcesso: "2026-07-02T09:05:00-03:00" }
];

export const roleInfos: RoleInfo[] = [
  { role: "Admin", descricao: "Acesso total aos pedidos, permissões e cadastros administrativos.", usuarios: 1 },
  { role: "Solicitante", descricao: "Cria pedidos e mantém os dados iniciais da solicitação.", usuarios: 6 },
  { role: "Agendador", descricao: "Gerencia cotação, transportadora, motorista, veículo e agenda.", usuarios: 4 },
  { role: "Fiscal / Documentação", descricao: "Atualiza NF, CTE, MDFE e status documental.", usuarios: 3 },
  { role: "Visualizador", descricao: "Acompanha a operação sem permissão de edição.", usuarios: 8 }
];
