import Link from "next/link";
import { Bell, CalendarPlus, FileWarning, ListPlus, PackageCheck, RadioTower, TrendingUp, Truck } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { StatusBadge } from "@/components/status-badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { auditLogs, notifications, orders } from "@/lib/mock-data";
import { formatDateTime } from "@/lib/utils";

export default function DashboardPage() {
  const metrics = [
    { label: "Total de pedidos", value: orders.length, change: "+12% mês", icon: ListPlus, tone: "from-blue-950 to-sky-700" },
    { label: "Em cotação", value: orders.filter((o) => o.status === "Em cotação").length, change: "3 prioridades", icon: Truck, tone: "from-amber-600 to-orange-500" },
    { label: "Agendados", value: orders.filter((o) => o.status === "Agendado").length, change: "próx. 24h", icon: CalendarPlus, tone: "from-sky-700 to-cyan-500" },
    { label: "Carregando", value: orders.filter((o) => o.status === "Carregando").length, change: "tempo real", icon: RadioTower, tone: "from-cyan-700 to-emerald-500" },
    { label: "Concluídos", value: orders.filter((o) => ["Entregue", "Carregamento concluído"].includes(o.status)).length, change: "97% SLA", icon: PackageCheck, tone: "from-emerald-700 to-green-500" },
    { label: "Pendências documentais", value: orders.filter((o) => o.statusDocumental !== "Completo").length, change: "atenção fiscal", icon: FileWarning, tone: "from-rose-700 to-red-500" }
  ];

  const byStatus = Array.from(new Set(orders.map((order) => order.status))).map((status) => ({
    status,
    count: orders.filter((order) => order.status === status).length,
    width: `${Math.max(18, (orders.filter((order) => order.status === status).length / orders.length) * 100)}%`
  }));

  return (
    <AppShell>
      <div className="mb-6 overflow-hidden rounded-2xl bg-[linear-gradient(135deg,#07162d_0%,#0b2b57_58%,#03698f_100%)] p-6 text-white shadow-premium">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100">Central operacional</p>
            <h1 className="mt-2 text-3xl font-bold">Dashboard executivo</h1>
            <p className="mt-2 max-w-2xl text-blue-100">Visão consolidada de solicitações, agenda de veículos, documentação e notificações da operação logística.</p>
          </div>
          <div className="flex gap-2">
            <Link className="inline-flex h-10 items-center gap-2 rounded-lg bg-white px-4 text-sm font-semibold text-blue-950 shadow-lg hover:bg-blue-50" href="/operacao">
              <ListPlus className="h-4 w-4" />
              Criar solicitação
            </Link>
            <Link className="inline-flex h-10 items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-4 text-sm font-semibold text-white hover:bg-white/15" href="/agendamentos">
              <CalendarPlus className="h-4 w-4" />
              Agendamentos
            </Link>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.label} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex items-center justify-between gap-4 p-5">
                  <div>
                    <p className="text-sm font-medium text-slate-500">{metric.label}</p>
                    <p className="mt-2 text-3xl font-bold text-slate-950">{metric.value}</p>
                    <p className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-emerald-700">
                      <TrendingUp className="h-3.5 w-3.5" />
                      {metric.change}
                    </p>
                  </div>
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${metric.tone} text-white shadow-lg`}>
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="font-bold">Operação em tempo real</h2>
                <p className="text-sm text-slate-500">Distribuição visual dos pedidos por status.</p>
              </div>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">Online</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {byStatus.map((item) => (
              <div key={item.status} className="space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <StatusBadge status={item.status} />
                  <span className="text-sm font-bold text-slate-700">{item.count}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-gradient-to-r from-blue-900 to-cyan-500" style={{ width: item.width }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-5">
          <Card>
            <CardHeader><h2 className="font-bold">Últimas alterações</h2></CardHeader>
            <CardContent className="space-y-4">
              {auditLogs.map((log) => (
                <div key={log.id} className="rounded-xl border border-slate-100 bg-slate-50/70 p-3">
                  <p className="text-sm font-semibold text-slate-900">{log.descricao}</p>
                  <p className="mt-1 text-xs text-slate-500">{log.autor} · {formatDateTime(log.dataHora)}</p>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader><h2 className="flex items-center gap-2 font-bold"><Bell className="h-4 w-4 text-sky-700" /> Notificações recentes</h2></CardHeader>
            <CardContent className="space-y-3">
              {notifications.map((item) => (
                <div key={item.id} className="rounded-xl border border-slate-100 bg-white p-3 shadow-sm">
                  <p className="text-sm font-semibold text-slate-900">{item.tipo}</p>
                  <p className="text-sm text-slate-600">{item.mensagem}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
