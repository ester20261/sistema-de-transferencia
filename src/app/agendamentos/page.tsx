import Link from "next/link";
import { CalendarClock, ExternalLink, Truck } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { StatusBadge } from "@/components/status-badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { orders } from "@/lib/mock-data";
import { formatDateTime } from "@/lib/utils";

export default function SchedulesPage() {
  const scheduled = orders.filter((order) => order.dataAgendamento || ["Agendado", "Chegou", "Carregando"].includes(order.status));

  return (
    <AppShell>
      <div className="mb-6 rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-soft">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">Agenda logística</p>
        <h1 className="mt-1 text-2xl font-bold">Agendamentos</h1>
        <p className="text-slate-500">Agenda simulada de veículos, motoristas e janelas de carregamento.</p>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {scheduled.map((order) => (
          <Card key={order.id} className="overflow-hidden">
            <CardHeader className="bg-[linear-gradient(135deg,#f8fafc_0%,#eef7fb_100%)]">
              <div className="flex items-start justify-between gap-3">
                <div className="flex gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-950 text-white">
                    <Truck className="h-5 w-5" />
                  </div>
                  <div>
                  <p className="text-sm text-slate-500">{order.origem} → {order.destino}</p>
                  <h2 className="text-lg font-bold">{order.pedido}</h2>
                  </div>
                </div>
                <StatusBadge status={order.status} />
              </div>
            </CardHeader>
            <CardContent className="grid gap-3 text-sm md:grid-cols-2">
              <p><span className="font-semibold">Transportadora:</span> {order.transportadora ?? "-"}</p>
              <p><span className="font-semibold">Motorista:</span> {order.motorista ?? "-"}</p>
              <p><span className="font-semibold">Placa:</span> {order.placa ?? "-"}</p>
              <p><span className="font-semibold">Janela:</span> {order.dataAgendamento ? formatDateTime(order.dataAgendamento) : "A definir"}</p>
              <Link className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-sky-200 bg-sky-50 px-3 font-semibold text-sky-800 md:col-span-2" href={`/operacao/${order.id}`}>
                <CalendarClock className="h-4 w-4" />
                Abrir detalhes
                <ExternalLink className="h-3.5 w-3.5" />
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
