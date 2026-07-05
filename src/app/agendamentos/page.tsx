import Link from "next/link";
import { CalendarClock, ExternalLink } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { StatusBadge } from "@/components/status-badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { orders } from "@/lib/mock-data";
import { formatDateTime } from "@/lib/utils";

export default function SchedulesPage() {
  const scheduled = orders.filter((order) => order.dataAgendamento || ["Agendado", "Chegou", "Carregando"].includes(order.status));

  return (
    <AppShell>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Agendamentos</h1>
        <p className="text-slate-500">Agenda simulada de veículos, motoristas e janelas de carregamento.</p>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {scheduled.map((order) => (
          <Card key={order.id}>
            <CardHeader>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm text-slate-500">{order.origem} → {order.destino}</p>
                  <h2 className="text-lg font-bold">{order.pedido}</h2>
                </div>
                <StatusBadge status={order.status} />
              </div>
            </CardHeader>
            <CardContent className="grid gap-3 text-sm md:grid-cols-2">
              <p><span className="font-semibold">Transportadora:</span> {order.transportadora ?? "-"}</p>
              <p><span className="font-semibold">Motorista:</span> {order.motorista ?? "-"}</p>
              <p><span className="font-semibold">Placa:</span> {order.placa ?? "-"}</p>
              <p><span className="font-semibold">Janela:</span> {order.dataAgendamento ? formatDateTime(order.dataAgendamento) : "A definir"}</p>
              <Link className="inline-flex items-center gap-2 text-sky-700 md:col-span-2" href={`/operacao/${order.id}`}>
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
