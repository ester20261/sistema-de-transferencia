"use client";

import { ClipboardList, Plus, ShieldCheck } from "lucide-react";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { OrderTable } from "@/components/order-table";
import { PageHeader } from "@/components/premium-ui";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input, Select, Textarea } from "@/components/ui/input";
import { orders as seedOrders } from "@/lib/mock-data";
import type { Order, Priority } from "@/lib/types";
import { useMockRole } from "@/lib/use-mock-role";

export default function OperationPage() {
  const role = useMockRole();
  const [orders, setOrders] = useState<Order[]>(seedOrders);
  const [form, setForm] = useState({
    pedido: "",
    prioridade: "Media" as Priority,
    origem: "",
    destino: "",
    tipoVeiculoSolicitado: "",
    observacoes: ""
  });
  const [message, setMessage] = useState("");

  const canCreate = role === "Admin" || role === "Solicitante";
  const nextPreview = useMemo(() => form.pedido || `PED-${1060 + orders.length}`, [form.pedido, orders.length]);

  function createOrder() {
    if (!canCreate) return;
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      pedido: nextPreview,
      prioridade: form.prioridade,
      origem: form.origem || "Origem demo",
      destino: form.destino || "Destino demo",
      tipoVeiculoSolicitado: form.tipoVeiculoSolicitado || "Truck baú",
      status: "Em cotação",
      statusDocumental: "Pendente",
      observacoes: form.observacoes,
      atualizadoPor: role,
      ultimaAtualizacao: new Date().toISOString()
    };
    setOrders((current) => [newOrder, ...current]);
    setMessage(`Solicitação ${newOrder.pedido} criada e notificação simulada enviada ao agendador.`);
    setForm({ pedido: "", prioridade: "Media", origem: "", destino: "", tipoVeiculoSolicitado: "", observacoes: "" });
  }

  return (
    <AppShell>
      <PageHeader
        eyebrow="Controle operacional"
        title="Tabela operacional"
        description="Planilha profissional com busca, filtros e bloqueios visuais por perfil."
        meta={<span className="inline-flex items-center gap-2 rounded-lg border border-blue-100 bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-900 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-200"><ShieldCheck className="h-4 w-4" /> Perfil: {role}</span>}
      />
      <Card className="mb-5 overflow-hidden">
        <CardHeader className="bg-[linear-gradient(135deg,#f8fafc_0%,#eef4ff_100%)] dark:bg-none dark:bg-slate-900/70">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-600 text-white">
                <ClipboardList className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-bold text-slate-950 dark:text-white">Criar nova solicitação</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">Disponível para Admin e Solicitante nesta simulação.</p>
              </div>
            </div>
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-semibold text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">{role}</span>
          </div>
        </CardHeader>
        <CardContent className="grid gap-3 lg:grid-cols-6">
          <Input disabled={!canCreate} placeholder="Número do pedido" value={form.pedido} onChange={(e) => setForm({ ...form, pedido: e.target.value })} />
          <Select disabled={!canCreate} value={form.prioridade} onChange={(e) => setForm({ ...form, prioridade: e.target.value as Priority })}>
            <option>Alta</option>
            <option>Media</option>
            <option>Baixa</option>
          </Select>
          <Input disabled={!canCreate} placeholder="Origem" value={form.origem} onChange={(e) => setForm({ ...form, origem: e.target.value })} />
          <Input disabled={!canCreate} placeholder="Destino" value={form.destino} onChange={(e) => setForm({ ...form, destino: e.target.value })} />
          <Input disabled={!canCreate} placeholder="Tipo de veículo" value={form.tipoVeiculoSolicitado} onChange={(e) => setForm({ ...form, tipoVeiculoSolicitado: e.target.value })} />
          <Button disabled={!canCreate} onClick={createOrder}>
            <Plus className="h-4 w-4" />
            Salvar
          </Button>
          <Textarea disabled={!canCreate} className="lg:col-span-6" placeholder="Observações" value={form.observacoes} onChange={(e) => setForm({ ...form, observacoes: e.target.value })} />
          {message ? <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-800 lg:col-span-6 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200">{message}</p> : null}
        </CardContent>
      </Card>
      <OrderTable orders={orders} role={role} />
    </AppShell>
  );
}
