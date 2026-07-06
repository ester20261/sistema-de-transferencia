import Link from "next/link";
import { CalendarClock, ExternalLink, MapPin, Truck } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/premium-ui";
import { StatusBadge } from "@/components/status-badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { orders } from "@/lib/mock-data";
import { formatDateTime } from "@/lib/utils";

export default function SchedulesPage() {
  const scheduled = orders.filter((order) => order.dataAgendamento || ["Agendado", "Chegou", "Carregando"].includes(order.status));

  return (
    <AppShell>
      <PageHeader
        eyebrow="Agenda logística"
        title="Agendamentos"
        description="Agenda simulada de veículos, motoristas e janelas de carregamento."
      />
      <div className="grid gap-4 lg:grid-cols-2">
        {scheduled.map((order) => (
          <Card key={order.id} className="overflow-hidden">
            <CardHeader className="bg-[linear-gradient(135deg,#f8fafc_0%,#eef4ff_100%)] dark:bg-none dark:bg-slate-900/70">
              <div className="flex items-start justify-between gap-3">
                <div className="flex gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-600 text-white">
                    <Truck className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400"><MapPin className="h-3.5 w-3.5" /> {order.origem} → {order.destino}</p>
                    <h2 className="text-lg font-bold text-slate-950 dark:text-white">{order.pedido}</h2>
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
              <Link className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 font-semibold text-blue-800 md:col-span-2 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-200" href={`/operacao/${order.id}`}>
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
