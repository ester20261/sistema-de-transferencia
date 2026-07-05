import Link from "next/link";
import { Bell, CalendarPlus, FileWarning, ListPlus, PackageCheck, Truck } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { StatusBadge } from "@/components/status-badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { auditLogs, notifications, orders } from "@/lib/mock-data";
import { formatDateTime } from "@/lib/utils";

export default function DashboardPage() {
  const metrics = [
    { label: "Total de pedidos", value: orders.length, icon: ListPlus },
    { label: "Em cotação", value: orders.filter((o) => o.status === "Em cotação").length, icon: Truck },
    { label: "Agendados", value: orders.filter((o) => o.status === "Agendado").length, icon: CalendarPlus },
    { label: "Carregando", value: orders.filter((o) => o.status === "Carregando").length, icon: Truck },
    { label: "Concluídos", value: orders.filter((o) => ["Entregue", "Carregamento concluído"].includes(o.status)).length, icon: PackageCheck },
    { label: "Pendências documentais", value: orders.filter((o) => o.statusDocumental !== "Completo").length, icon: FileWarning }
  ];

  const byStatus = Array.from(new Set(orders.map((order) => order.status))).map((status) => ({
    status,
    count: orders.filter((order) => order.status === status).length
  }));

  return (
    <AppShell>
      <div className="mb-6 flex flex-col justify-between gap-3 md:flex-row md:items-end">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-slate-500">Visão rápida da operação com dados fictícios.</p>
        </div>
        <div className="flex gap-2">
          <Link className="inline-flex h-10 items-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-white hover:bg-sky-700" href="/operacao">
            <ListPlus className="h-4 w-4" />
            Criar solicitação
          </Link>
          <Link className="inline-flex h-10 items-center gap-2 rounded-md border border-slate-200 bg-white px-4 text-sm font-medium text-slate-800 hover:bg-slate-50" href="/agendamentos">
            <CalendarPlus className="h-4 w-4" />
            Agendamentos
          </Link>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.label}>
              <CardContent className="flex items-center justify-between p-5">
                <div>
                  <p className="text-sm text-slate-500">{metric.label}</p>
                  <p className="mt-2 text-3xl font-bold">{metric.value}</p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-sky-50 text-sky-700">
                  <Icon className="h-5 w-5" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <div className="mt-6 grid gap-5 xl:grid-cols-3">
        <Card>
          <CardHeader><h2 className="font-bold">Status da operação</h2></CardHeader>
          <CardContent className="space-y-3">
            {byStatus.map((item) => (
              <div key={item.status} className="flex items-center justify-between gap-3">
                <StatusBadge status={item.status} />
                <span className="text-sm font-semibold">{item.count}</span>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><h2 className="font-bold">Últimas alterações</h2></CardHeader>
          <CardContent className="space-y-4">
            {auditLogs.map((log) => (
              <div key={log.id}>
                <p className="text-sm font-semibold">{log.descricao}</p>
                <p className="text-xs text-slate-500">{log.autor} · {formatDateTime(log.dataHora)}</p>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><h2 className="flex items-center gap-2 font-bold"><Bell className="h-4 w-4" /> Notificações recentes</h2></CardHeader>
          <CardContent className="space-y-4">
            {notifications.map((item) => (
              <div key={item.id} className="rounded-md border border-slate-100 p-3">
                <p className="text-sm font-semibold">{item.tipo}</p>
                <p className="text-sm text-slate-600">{item.mensagem}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
