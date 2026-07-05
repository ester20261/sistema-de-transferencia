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
      <div className="mb-5">
        <Link href="/operacao" className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-sky-700">
          <ArrowLeft className="h-4 w-4" />
          Voltar para operação
        </Link>
        <h1 className="text-2xl font-bold">Pedido {order.pedido}</h1>
        <p className="text-slate-500">Edição visual com permissões mockadas para o perfil {role}.</p>
      </div>
      <OrderDetailPanel order={order} role={role} logs={logs.length ? logs : auditLogs} />
    </AppShell>
  );
}
