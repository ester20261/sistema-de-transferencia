import Link from "next/link";
import { Bell, CalendarPlus, FileWarning, ListPlus, MapPinned, PackageCheck, RadioTower, Route, Truck } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { NotificationItem, StatCard } from "@/components/premium-ui";
import { StatusBadge } from "@/components/status-badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { auditLogs, notifications, orders } from "@/lib/mock-data";
import { formatDateTime } from "@/lib/utils";

export default function DashboardPage() {
  const metrics = [
    { label: "Total de pedidos", value: orders.length, change: "+12% mês", icon: ListPlus, tone: "blue" as const },
    { label: "Em cotação", value: orders.filter((o) => o.status === "Em cotação").length, change: "3 prioridades", icon: Truck, tone: "amber" as const },
    { label: "Agendados", value: orders.filter((o) => o.status === "Agendado").length, change: "próx. 24h", icon: CalendarPlus, tone: "cyan" as const },
    { label: "Carregando", value: orders.filter((o) => o.status === "Carregando").length, change: "tempo real", icon: RadioTower, tone: "emerald" as const },
    { label: "Concluídos", value: orders.filter((o) => ["Entregue", "Carregamento concluído"].includes(o.status)).length, change: "97% SLA", icon: PackageCheck, tone: "emerald" as const },
    { label: "Pendências fiscais", value: orders.filter((o) => o.statusDocumental !== "Completo").length, change: "atenção fiscal", icon: FileWarning, tone: "red" as const }
  ];

  const byStatus = Array.from(new Set(orders.map((order) => order.status))).map((status) => ({
    status,
    count: orders.filter((order) => order.status === status).length,
    width: `${Math.max(18, (orders.filter((order) => order.status === status).length / orders.length) * 100)}%`
  }));

  return (
    <AppShell>
      <section className="animate-in mb-6 overflow-hidden rounded-lg bg-[linear-gradient(135deg,#0f172a_0%,#1e3a8a_58%,#2563eb_100%)] p-6 text-white shadow-premium">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase text-blue-100">Central operacional</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">Dashboard executivo</h1>
            <p className="mt-2 max-w-2xl text-blue-100">Visão consolidada de solicitações, agenda de veículos, documentação e notificações da operação logística.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link className="inline-flex h-10 items-center gap-2 rounded-lg bg-white px-4 text-sm font-semibold text-blue-700 shadow-lg hover:bg-blue-50" href="/operacao">
              <ListPlus className="h-4 w-4" />
              Criar solicitação
            </Link>
            <Link className="inline-flex h-10 items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-4 text-sm font-semibold text-white hover:bg-white/15" href="/agendamentos">
              <CalendarPlus className="h-4 w-4" />
              Agendamentos
            </Link>
          </div>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {metrics.map((metric) => (
          <StatCard key={metric.label} {...metric} />
        ))}
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-[1.12fr_0.88fr]">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="font-bold text-slate-950 dark:text-white">Operação em andamento</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">Distribuição visual dos pedidos por status.</p>
              </div>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-200">Online</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {byStatus.map((item) => (
              <div key={item.status} className="space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <StatusBadge status={item.status} />
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{item.count}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-900">
                  <div className="h-full rounded-full bg-gradient-to-r from-blue-600 to-emerald-500" style={{ width: item.width }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="flex items-center gap-2 font-bold text-slate-950 dark:text-white">
              <MapPinned className="h-4 w-4 text-blue-600" />
              Mapa operacional
            </h2>
          </CardHeader>
          <CardContent>
            <div className="relative h-72 overflow-hidden rounded-lg border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(148,163,184,0.16)_1px,transparent_1px),linear-gradient(rgba(148,163,184,0.16)_1px,transparent_1px)] bg-[length:38px_38px]" />
              <div className="absolute left-[18%] top-[24%] h-3 w-3 rounded-full bg-blue-600 shadow-[0_0_22px_rgba(37,99,235,0.8)]" />
              <div className="absolute right-[22%] top-[35%] h-3 w-3 rounded-full bg-emerald-500 shadow-[0_0_22px_rgba(16,185,129,0.8)]" />
              <div className="absolute bottom-[22%] left-[44%] h-3 w-3 rounded-full bg-amber-500 shadow-[0_0_22px_rgba(245,158,11,0.8)]" />
              <div className="absolute left-[20%] top-[28%] h-px w-[52%] rotate-6 bg-blue-400/70" />
              <div className="absolute bottom-[26%] left-[45%] h-px w-[33%] -rotate-[32deg] bg-emerald-400/70" />
              <div className="absolute bottom-4 left-4 rounded-lg border border-white bg-white/90 p-3 text-sm shadow-soft dark:border-slate-800 dark:bg-slate-950/90">
                <p className="font-semibold text-slate-950 dark:text-white">Corredores ativos</p>
                <p className="text-slate-500 dark:text-slate-400">Sul, Sudeste e documentação fiscal</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-3">
        <Card>
          <CardHeader><h2 className="font-bold text-slate-950 dark:text-white">Pedidos recentes</h2></CardHeader>
          <CardContent className="space-y-3">
            {orders.slice(0, 4).map((order) => (
              <Link key={order.id} href={`/operacao/${order.id}`} className="flex items-center justify-between rounded-lg border border-slate-100 p-3 transition hover:bg-blue-50 dark:border-slate-800 dark:hover:bg-blue-950/30">
                <div>
                  <p className="font-semibold text-slate-950 dark:text-white">{order.pedido}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{order.origem} → {order.destino}</p>
                </div>
                <StatusBadge status={order.status} />
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><h2 className="font-bold text-slate-950 dark:text-white">Timeline</h2></CardHeader>
          <CardContent className="space-y-4">
            {auditLogs.map((log) => (
              <div key={log.id} className="relative border-l border-blue-200 pl-4 dark:border-blue-900">
                <span className="absolute -left-1.5 top-1 h-3 w-3 rounded-full bg-blue-600" />
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{log.descricao}</p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{log.autor} · {formatDateTime(log.dataHora)}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="flex items-center gap-2 font-bold text-slate-950 dark:text-white"><Bell className="h-4 w-4 text-blue-600" /> Notificações</h2>
          </CardHeader>
          <CardContent className="space-y-3">
            {notifications.map((item) => (
              <NotificationItem key={item.id} title={item.tipo} message={item.mensagem} unread={!item.lida} />
            ))}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
