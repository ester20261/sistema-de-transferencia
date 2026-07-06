import { Badge } from "@/components/ui/badge";
import type { OperationalStatus, Priority } from "@/lib/types";

const statusStyles: Record<OperationalStatus, string> = {
  "Em cotação": "border-amber-200 bg-amber-50 text-amber-800",
  Agendado: "border-sky-200 bg-sky-50 text-sky-800",
  Chegou: "border-indigo-200 bg-indigo-50 text-indigo-800",
  Carregando: "border-cyan-200 bg-cyan-50 text-cyan-800",
  "Carregamento concluído": "border-emerald-200 bg-emerald-50 text-emerald-800",
  "Em trânsito": "border-blue-200 bg-blue-50 text-blue-800",
  Entregue: "border-green-200 bg-green-50 text-green-800",
  Cancelado: "border-rose-200 bg-rose-50 text-rose-800",
  "Pendente documentação": "border-orange-200 bg-orange-50 text-orange-800"
};

const priorityStyles: Record<Priority, string> = {
  Alta: "border-rose-200 bg-rose-50 text-rose-800",
  Media: "border-yellow-200 bg-yellow-50 text-yellow-800",
  Baixa: "border-slate-200 bg-slate-50 text-slate-700"
};

export function StatusBadge({ status }: { status: OperationalStatus }) {
  return <Badge className={statusStyles[status]}>{status}</Badge>;
}

export function PriorityBadge({ priority }: { priority: Priority }) {
  return <Badge className={priorityStyles[priority]}>{priority}</Badge>;
}
