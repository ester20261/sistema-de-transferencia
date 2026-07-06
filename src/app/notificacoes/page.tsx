import Link from "next/link";
import { Bell, CheckCircle2, Circle } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/premium-ui";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { notifications, orders } from "@/lib/mock-data";
import { formatDateTime } from "@/lib/utils";

export default function NotificationsPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Eventos operacionais"
        title="Central de notificações"
        description="Eventos simulados para alterações, cotação, agenda e documentação."
      />
      <div className="space-y-4">
        {notifications.map((notification) => {
          const order = orders.find((item) => item.id === notification.pedidoId);
          return (
            <Card key={notification.id}>
              <CardContent className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between">
                <div className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white shadow-lg shadow-blue-600/15">
                    <Bell className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <Badge className="border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">{notification.tipo}</Badge>
                      {notification.lida ? (
                        <span className="inline-flex items-center gap-1 text-xs text-emerald-700 dark:text-emerald-300"><CheckCircle2 className="h-3.5 w-3.5" /> Lida</span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs text-blue-700 dark:text-blue-300"><Circle className="h-3.5 w-3.5 fill-blue-600" /> Não lida</span>
                      )}
                    </div>
                    <p className="font-semibold text-slate-900 dark:text-slate-100">{notification.mensagem}</p>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{formatDateTime(notification.dataHora)}</p>
                  </div>
                </div>
                {order ? (
                  <Link className="inline-flex h-9 items-center rounded-lg border border-blue-200 bg-blue-50 px-3 text-sm font-semibold text-blue-800 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-200" href={`/operacao/${order.id}`}>
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
