import { AlertCircle, CheckCircle2, Clock3, FileWarning, Loader2, MapPinCheck, PackageCheck, RadioTower, Truck, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { OperationalStatus, Priority } from "@/lib/types";

const statusStyles: Record<OperationalStatus, string> = {
  "Em cotação": "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-200",
  Agendado: "border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-900/60 dark:bg-blue-950/40 dark:text-blue-200",
  Chegou: "border-indigo-200 bg-indigo-50 text-indigo-800 dark:border-indigo-900/60 dark:bg-indigo-950/40 dark:text-indigo-200",
  Carregando: "border-cyan-200 bg-cyan-50 text-cyan-800 dark:border-cyan-900/60 dark:bg-cyan-950/40 dark:text-cyan-200",
  "Carregamento concluído": "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-200",
  "Em trânsito": "border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-900/60 dark:bg-blue-950/40 dark:text-blue-200",
  Entregue: "border-green-200 bg-green-50 text-green-800 dark:border-green-900/60 dark:bg-green-950/40 dark:text-green-200",
  Cancelado: "border-red-200 bg-red-50 text-red-800 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-200",
  "Pendente documentação": "border-orange-200 bg-orange-50 text-orange-800 dark:border-orange-900/60 dark:bg-orange-950/40 dark:text-orange-200"
};

const statusIcons: Record<OperationalStatus, typeof Clock3> = {
  "Em cotação": Clock3,
  Agendado: Truck,
  Chegou: MapPinCheck,
  Carregando: Loader2,
  "Carregamento concluído": PackageCheck,
  "Em trânsito": RadioTower,
  Entregue: CheckCircle2,
  Cancelado: XCircle,
  "Pendente documentação": FileWarning
};

const priorityStyles: Record<Priority, string> = {
  Alta: "border-red-200 bg-red-50 text-red-800 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-200",
  Media: "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-200",
  Baixa: "border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
};

export function StatusBadge({ status }: { status: OperationalStatus }) {
  const Icon = statusIcons[status];
  return (
    <Badge className={statusStyles[status]}>
      <Icon className="h-3.5 w-3.5" />
      {status}
    </Badge>
  );
}

export function PriorityBadge({ priority }: { priority: Priority }) {
  return (
    <Badge className={priorityStyles[priority]}>
      <AlertCircle className="h-3.5 w-3.5" />
      {priority}
    </Badge>
  );
}
