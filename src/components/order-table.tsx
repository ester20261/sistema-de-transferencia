"use client";

import { ChevronsUpDown, Eye, Filter, Lock, MoreHorizontal, Search } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { LockedLabel } from "@/components/locked-label";
import { UserAvatar } from "@/components/premium-ui";
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
    <Card className="overflow-hidden border-slate-200/90">
      <div className="border-b border-slate-100 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-900/70">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div>
            <h2 className="font-bold text-slate-950 dark:text-white">Pedidos operacionais</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">{filtered.length} registros encontrados</p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
            <Filter className="h-3.5 w-3.5" />
            Filtros ativos
          </span>
        </div>
        <div className="grid gap-3 md:grid-cols-[1fr_190px_160px_220px]">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
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
        <table className="w-full min-w-[1460px] border-collapse text-left text-sm">
          <thead className="sticky top-0 z-10 bg-slate-950 text-xs uppercase text-slate-300 shadow-sm dark:bg-slate-900">
            <tr>
              {["Pedido", "Prioridade", "Origem", "Destino", "Tipo solicitado", "Status"].map((head) => (
                <th key={head} className="px-4 py-3 font-semibold">
                  <span className="inline-flex items-center gap-1">{head}<ChevronsUpDown className="h-3 w-3 text-slate-500" /></span>
                </th>
              ))}
              <th className="px-4 py-3 font-semibold"><LockedLabel label="Transportadora" locked={lockedTransport} /></th>
              <th className="px-4 py-3 font-semibold"><LockedLabel label="Valor" locked={!canEdit(role, "valorCotado")} /></th>
              <th className="px-4 py-3 font-semibold"><LockedLabel label="Motorista" locked={!canEdit(role, "motorista")} /></th>
              <th className="px-4 py-3 font-semibold"><LockedLabel label="CPF" locked={!canEdit(role, "cpfMotorista")} /></th>
              <th className="px-4 py-3 font-semibold"><LockedLabel label="Placa" locked={!canEdit(role, "placa")} /></th>
              <th className="px-4 py-3 font-semibold"><LockedLabel label="NF" locked={lockedDocs} /></th>
              <th className="px-4 py-3 font-semibold"><LockedLabel label="CTE" locked={!canEdit(role, "cte")} /></th>
              <th className="px-4 py-3 font-semibold"><LockedLabel label="MDFE" locked={!canEdit(role, "mdfe")} /></th>
              <th className="px-4 py-3 font-semibold">Atualizado por</th>
              <th className="px-4 py-3 font-semibold">Última atualização</th>
              <th className="px-4 py-3 font-semibold">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white dark:divide-slate-800 dark:bg-slate-950">
            {filtered.map((order, index) => (
              <tr key={order.id} className={index % 2 ? "bg-slate-50/55 transition hover:bg-blue-50 dark:bg-slate-900/35 dark:hover:bg-blue-950/30" : "transition hover:bg-blue-50 dark:hover:bg-blue-950/30"}>
                <td className="px-4 py-3 font-bold text-blue-700 dark:text-blue-300">{order.pedido}</td>
                <td className="px-4 py-3"><PriorityBadge priority={order.prioridade} /></td>
                <td className="px-4 py-3 text-slate-700 dark:text-slate-300">{order.origem}</td>
                <td className="px-4 py-3 text-slate-700 dark:text-slate-300">{order.destino}</td>
                <td className="px-4 py-3 text-slate-700 dark:text-slate-300">{order.tipoVeiculoSolicitado}</td>
                <td className="px-4 py-3"><StatusBadge status={order.status} /></td>
                <td className="px-4 py-3">{lockedTransport ? <span className="inline-flex rounded-full bg-slate-100 p-1.5 dark:bg-slate-800"><Lock className="h-4 w-4 text-slate-400" /></span> : order.transportadora ?? "-"}</td>
                <td className="px-4 py-3">{formatCurrency(order.valorCotado)}</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-2">
                    <UserAvatar name={order.motorista ?? "Sem motorista"} className="h-7 w-7 text-[10px]" />
                    {order.motorista ?? "-"}
                  </span>
                </td>
                <td className="px-4 py-3">{order.cpfMotorista ?? "-"}</td>
                <td className="px-4 py-3">{order.placa ?? "-"}</td>
                <td className="px-4 py-3">{order.nf ?? "-"}</td>
                <td className="px-4 py-3">{order.cte ?? "-"}</td>
                <td className="px-4 py-3">{order.mdfe ?? "-"}</td>
                <td className="px-4 py-3">{order.atualizadoPor}</td>
                <td className="px-4 py-3">{formatDateTime(order.ultimaAtualizacao)}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/operacao/${order.id}`}
                      className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 text-sm font-semibold text-blue-800 transition hover:border-blue-300 hover:bg-blue-100 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-200"
                    >
                      <Eye className="h-4 w-4" />
                      Abrir
                    </Link>
                    <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between border-t border-slate-100 bg-white px-4 py-3 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
        <span>Página 1 de 1</span>
        <span>{filtered.length} de {orders.length} pedidos</span>
      </div>
    </Card>
  );
}
