"use client";

import { Eye, Lock, Search } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { LockedLabel } from "@/components/locked-label";
import { PriorityBadge, StatusBadge } from "@/components/status-badge";
import { Card } from "@/components/ui/card";
import { Input, Select } from "@/components/ui/input";
import { canEdit } from "@/lib/permissions";
import type { OperationalStatus, Order, Priority, Role } from "@/lib/types";
import { formatCurrency, formatDateTime } from "@/lib/utils";

const allStatuses: (OperationalStatus | "Todos")[] = [
  "Todos",
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

const allPriorities: (Priority | "Todas")[] = ["Todas", "Alta", "Media", "Baixa"];

export function OrderTable({ orders, role }: { orders: Order[]; role: Role }) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<OperationalStatus | "Todos">("Todos");
  const [priority, setPriority] = useState<Priority | "Todas">("Todas");
  const origins = ["Todas", ...Array.from(new Set(orders.map((order) => order.origem)))];
  const [origin, setOrigin] = useState("Todas");

  const filtered = useMemo(() => {
    return orders.filter((order) => {
      const text = `${order.pedido} ${order.origem} ${order.destino} ${order.transportadora ?? ""} ${order.motorista ?? ""}`.toLowerCase();
      return (
        text.includes(search.toLowerCase()) &&
        (status === "Todos" || order.status === status) &&
        (priority === "Todas" || order.prioridade === priority) &&
        (origin === "Todas" || order.origem === origin)
      );
    });
  }, [orders, origin, priority, search, status]);

  const lockedTransport = !canEdit(role, "transportadora");
  const lockedDocs = !canEdit(role, "nf");

  return (
    <Card className="overflow-hidden">
      <div className="border-b border-slate-100 p-4">
        <div className="grid gap-3 md:grid-cols-[1fr_180px_160px_220px]">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input className="pl-9" placeholder="Buscar pedido, origem, motorista..." value={search} onChange={(event) => setSearch(event.target.value)} />
          </div>
          <Select value={status} onChange={(event) => setStatus(event.target.value as OperationalStatus | "Todos")}>
            {allStatuses.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </Select>
          <Select value={priority} onChange={(event) => setPriority(event.target.value as Priority | "Todas")}>
            {allPriorities.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </Select>
          <Select value={origin} onChange={(event) => setOrigin(event.target.value)}>
            {origins.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </Select>
        </div>
      </div>
      <div className="sheet-scroll overflow-x-auto">
        <table className="min-w-[1380px] w-full border-collapse text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3">Pedido</th>
              <th className="px-4 py-3">Prioridade</th>
              <th className="px-4 py-3">Origem</th>
              <th className="px-4 py-3">Destino</th>
              <th className="px-4 py-3">Tipo solicitado</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3"><LockedLabel label="Transportadora" locked={lockedTransport} /></th>
              <th className="px-4 py-3"><LockedLabel label="Valor" locked={!canEdit(role, "valorCotado")} /></th>
              <th className="px-4 py-3"><LockedLabel label="Motorista" locked={!canEdit(role, "motorista")} /></th>
              <th className="px-4 py-3"><LockedLabel label="CPF" locked={!canEdit(role, "cpfMotorista")} /></th>
              <th className="px-4 py-3"><LockedLabel label="Placa" locked={!canEdit(role, "placa")} /></th>
              <th className="px-4 py-3"><LockedLabel label="NF" locked={lockedDocs} /></th>
              <th className="px-4 py-3"><LockedLabel label="CTE" locked={!canEdit(role, "cte")} /></th>
              <th className="px-4 py-3"><LockedLabel label="MDFE" locked={!canEdit(role, "mdfe")} /></th>
              <th className="px-4 py-3">Atualizado por</th>
              <th className="px-4 py-3">Última atualização</th>
              <th className="px-4 py-3">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((order) => (
              <tr key={order.id} className="bg-white hover:bg-slate-50">
                <td className="px-4 py-3 font-semibold text-slate-900">{order.pedido}</td>
                <td className="px-4 py-3"><PriorityBadge priority={order.prioridade} /></td>
                <td className="px-4 py-3">{order.origem}</td>
                <td className="px-4 py-3">{order.destino}</td>
                <td className="px-4 py-3">{order.tipoVeiculoSolicitado}</td>
                <td className="px-4 py-3"><StatusBadge status={order.status} /></td>
                <td className="px-4 py-3">{lockedTransport ? <Lock className="h-4 w-4 text-slate-400" /> : order.transportadora ?? "-"}</td>
                <td className="px-4 py-3">{formatCurrency(order.valorCotado)}</td>
                <td className="px-4 py-3">{order.motorista ?? "-"}</td>
                <td className="px-4 py-3">{order.cpfMotorista ?? "-"}</td>
                <td className="px-4 py-3">{order.placa ?? "-"}</td>
                <td className="px-4 py-3">{order.nf ?? "-"}</td>
                <td className="px-4 py-3">{order.cte ?? "-"}</td>
                <td className="px-4 py-3">{order.mdfe ?? "-"}</td>
                <td className="px-4 py-3">{order.atualizadoPor}</td>
                <td className="px-4 py-3">{formatDateTime(order.ultimaAtualizacao)}</td>
                <td className="px-4 py-3">
                  <Link
                    href={`/operacao/${order.id}`}
                    className="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-3 text-sm font-medium text-slate-800 transition hover:bg-slate-50"
                  >
                    <Eye className="h-4 w-4" />
                    Abrir
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
