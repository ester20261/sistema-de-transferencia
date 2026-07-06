"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { OrderDetailPanel } from "@/components/order-detail-panel";
import { auditLogs, orders } from "@/lib/mock-data";
import { useMockRole } from "@/lib/use-mock-role";

export default function OrderDetailsPage({ params }: { params: { id: string } }) {
  const role = useMockRole();
  const order = orders.find((item) => item.id === params.id) ?? orders[0];
  const logs = auditLogs.filter((log) => log.pedidoId === order.id);

  return (
    <AppShell>
      <div className="mb-5 rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-soft">
        <Link href="/operacao" className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-sky-700">
          <ArrowLeft className="h-4 w-4" />
          Voltar para operação
        </Link>
        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">Centro do pedido</p>
            <h1 className="mt-1 text-2xl font-bold">Pedido {order.pedido}</h1>
            <p className="text-slate-500">Edição visual com permissões mockadas para o perfil {role}.</p>
          </div>
          <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm font-semibold text-slate-700">
            {order.origem} → {order.destino}
          </span>
        </div>
      </div>
      <OrderDetailPanel order={order} role={role} logs={logs.length ? logs : auditLogs} />
    </AppShell>
  );
}
