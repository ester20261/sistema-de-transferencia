import Link from "next/link";
import { Bell, CheckCircle2, Circle } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { notifications, orders } from "@/lib/mock-data";
import { formatDateTime } from "@/lib/utils";

export default function NotificationsPage() {
  return (
    <AppShell>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Central de notificações</h1>
        <p className="text-slate-500">Eventos simulados para alterações, cotação, agenda e documentação.</p>
      </div>
      <div className="space-y-4">
        {notifications.map((notification) => {
          const order = orders.find((item) => item.id === notification.pedidoId);
          return (
            <Card key={notification.id}>
              <CardContent className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between">
                <div className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-sky-700">
                    <Bell className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <Badge className="border-slate-200 bg-slate-50 text-slate-700">{notification.tipo}</Badge>
                      {notification.lida ? (
                        <span className="inline-flex items-center gap-1 text-xs text-emerald-700"><CheckCircle2 className="h-3.5 w-3.5" /> Lida</span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs text-sky-700"><Circle className="h-3.5 w-3.5 fill-sky-600" /> Não lida</span>
                      )}
                    </div>
                    <p className="font-semibold text-slate-900">{notification.mensagem}</p>
                    <p className="mt-1 text-sm text-slate-500">{formatDateTime(notification.dataHora)}</p>
                  </div>
                </div>
                {order ? (
                  <Link className="text-sm font-medium text-sky-700" href={`/operacao/${order.id}`}>
                    Abrir {order.pedido}
                  </Link>
                ) : null}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </AppShell>
  );
}
