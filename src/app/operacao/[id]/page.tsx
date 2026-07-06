"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { OrderDetailPanel } from "@/components/order-detail-panel";
import { PageHeader } from "@/components/premium-ui";
import { auditLogs, orders } from "@/lib/mock-data";
import { useMockRole } from "@/lib/use-mock-role";

export default function OrderDetailsPage({ params }: { params: { id: string } }) {
  const role = useMockRole();
  const order = orders.find((item) => item.id === params.id) ?? orders[0];
  const logs = auditLogs.filter((log) => log.pedidoId === order.id);

  return (
    <AppShell>
      <PageHeader
        eyebrow="Centro do pedido"
        title={`Pedido ${order.pedido}`}
        description={`Edição visual com permissões mockadas para o perfil ${role}.`}
        meta={<span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">{order.origem} → {order.destino}</span>}
        action={
          <Link href="/operacao" className="inline-flex h-10 items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 text-sm font-semibold text-blue-800 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-200">
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Link>
        }
      />
      <OrderDetailPanel order={order} role={role} logs={logs.length ? logs : auditLogs} />
    </AppShell>
  );
}
