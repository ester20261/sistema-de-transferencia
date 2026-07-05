"use client";

import { Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { OrderTable } from "@/components/order-table";
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
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Tabela operacional</h1>
        <p className="text-slate-500">Planilha operacional com busca, filtros e bloqueios por perfil.</p>
      </div>
      <Card className="mb-5">
        <CardHeader>
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="font-bold">Criar nova solicitação</h2>
              <p className="text-sm text-slate-500">Disponível para Admin e Solicitante nesta simulação.</p>
            </div>
            <span className="rounded-md bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-600">{role}</span>
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
          {message ? <p className="rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-700 lg:col-span-6">{message}</p> : null}
        </CardContent>
      </Card>
      <OrderTable orders={orders} role={role} />
    </AppShell>
  );
}
