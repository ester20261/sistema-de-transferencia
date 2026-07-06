"use client";

import { CalendarClock, FileText, History, Package } from "lucide-react";
import { LockedLabel } from "@/components/locked-label";
import { StatusBadge } from "@/components/status-badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input, Select, Textarea } from "@/components/ui/input";
import { canEdit } from "@/lib/permissions";
import type { AuditLog, OperationalStatus, Order, OrderField, Role } from "@/lib/types";
import { formatDateTime } from "@/lib/utils";

const statuses: OperationalStatus[] = [
  "Em cotação",
  "Agendado",
  "Chegou",
  "Carregando",
  "Carregamento concluído",
  "Em trânsito",
  "Entregue",
  "Cancelado",
  "Pendente documentação"
];

function Field({
  label,
  field,
  role,
  value,
  type = "text"
}: {
  label: string;
  field: OrderField;
  role: Role;
  value?: string | number;
  type?: string;
}) {
  const locked = !canEdit(role, field);
  return (
    <label className="space-y-1.5 text-sm font-medium text-slate-700 dark:text-slate-300">
      <LockedLabel label={label} locked={locked} />
      <Input disabled={locked} type={type} defaultValue={value ?? ""} />
    </label>
  );
}

export function OrderDetailPanel({ order, role, logs }: { order: Order; role: Role; logs: AuditLog[] }) {
  const statusLocked = !canEdit(role, "status");
  const docLocked = !canEdit(role, "statusDocumental");

  return (
    <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
      <div className="space-y-5">
        <Card className="overflow-hidden">
          <CardHeader className="bg-[linear-gradient(135deg,#f8fafc_0%,#eef4ff_100%)] dark:bg-none dark:bg-slate-900/70">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-600 text-white">
                  <Package className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-950 dark:text-white">Detalhes do pedido {order.pedido}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Campos bloqueados simulam permissões futuras por coluna.</p>
                </div>
              </div>
              <StatusBadge status={order.status} />
            </div>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <Field label="Pedido" field="pedido" role={role} value={order.pedido} />
            <Field label="Prioridade" field="prioridade" role={role} value={order.prioridade} />
            <Field label="Origem" field="origem" role={role} value={order.origem} />
            <Field label="Destino" field="destino" role={role} value={order.destino} />
            <Field label="Tipo de veículo solicitado" field="tipoVeiculoSolicitado" role={role} value={order.tipoVeiculoSolicitado} />
            <label className="space-y-1.5 text-sm font-medium text-slate-700 dark:text-slate-300">
              <LockedLabel label="Status operacional" locked={statusLocked} />
              <Select disabled={statusLocked} defaultValue={order.status}>
                {statuses.map((status) => (
                  <option key={status}>{status}</option>
                ))}
              </Select>
            </label>
            <label className="space-y-1.5 text-sm font-medium text-slate-700 dark:text-slate-300 md:col-span-2">
              <LockedLabel label="Observações" locked={!canEdit(role, "observacoes")} />
              <Textarea disabled={!canEdit(role, "observacoes")} defaultValue={order.observacoes ?? ""} />
            </label>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader>
            <h3 className="flex items-center gap-2 text-lg font-bold text-slate-950 dark:text-white"><CalendarClock className="h-5 w-5 text-blue-600" /> Agendamento, motorista e veículo</h3>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <Field label="Transportadora" field="transportadora" role={role} value={order.transportadora} />
            <Field label="Valor cotado" field="valorCotado" role={role} value={order.valorCotado} type="number" />
            <Field label="Motorista" field="motorista" role={role} value={order.motorista} />
            <Field label="CPF do motorista" field="cpfMotorista" role={role} value={order.cpfMotorista} />
            <Field label="Placa" field="placa" role={role} value={order.placa} />
            <Field label="Tipo confirmado" field="tipoVeiculoConfirmado" role={role} value={order.tipoVeiculoConfirmado} />
            <Field label="Data/hora de agendamento" field="dataAgendamento" role={role} value={order.dataAgendamento?.slice(0, 16)} type="datetime-local" />
            <label className="space-y-1.5 text-sm font-medium text-slate-700 dark:text-slate-300 md:col-span-2">
              <LockedLabel label="Observações da cotação" locked={!canEdit(role, "observacoesCotacao")} />
              <Textarea disabled={!canEdit(role, "observacoesCotacao")} defaultValue={order.observacoesCotacao ?? ""} />
            </label>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader>
            <h3 className="flex items-center gap-2 text-lg font-bold text-slate-950 dark:text-white"><FileText className="h-5 w-5 text-blue-600" /> Fiscal e documentação</h3>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <Field label="NF" field="nf" role={role} value={order.nf} />
            <Field label="CTE" field="cte" role={role} value={order.cte} />
            <Field label="MDFE" field="mdfe" role={role} value={order.mdfe} />
            <label className="space-y-1.5 text-sm font-medium text-slate-700 dark:text-slate-300">
              <LockedLabel label="Status documental" locked={docLocked} />
              <Select disabled={docLocked} defaultValue={order.statusDocumental}>
                <option>Pendente</option>
                <option>Parcial</option>
                <option>Completo</option>
              </Select>
            </label>
            <label className="space-y-1.5 text-sm font-medium text-slate-700 dark:text-slate-300 md:col-span-2">
              <LockedLabel label="Observações fiscais" locked={!canEdit(role, "observacoesFiscais")} />
              <Textarea disabled={!canEdit(role, "observacoesFiscais")} defaultValue={order.observacoesFiscais ?? ""} />
            </label>
          </CardContent>
        </Card>
      </div>
      <Card className="h-fit overflow-hidden">
        <CardHeader>
          <h3 className="flex items-center gap-2 text-lg font-bold text-slate-950 dark:text-white"><History className="h-5 w-5 text-blue-600" /> Histórico simulado</h3>
        </CardHeader>
        <CardContent className="space-y-4">
          {logs.map((log) => (
            <div key={log.id} className="relative border-l border-blue-200 pl-4 dark:border-blue-900">
              <span className="absolute -left-1.5 top-1 h-3 w-3 rounded-full bg-blue-600" />
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{log.autor}</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">{log.descricao}</p>
              <p className="mt-1 text-xs text-slate-400">{formatDateTime(log.dataHora)}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
