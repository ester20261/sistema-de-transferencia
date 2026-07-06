import { Check, Eye, Lock } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/premium-ui";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader } from "@/components/ui/card";
import { columnPermissions, fieldLabels, roles } from "@/lib/permissions";
import type { OrderField } from "@/lib/types";

const visibleFields: OrderField[] = [
  "pedido",
  "origem",
  "destino",
  "transportadora",
  "motorista",
  "nf",
  "cte",
  "mdfe",
  "statusDocumental"
];

export default function PermissionsPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Controle granular"
        title="Permissões por coluna"
        description="Matriz visual preparada para futuramente receber regras do Supabase."
      />
      <Card className="overflow-hidden">
        <CardHeader className="bg-[linear-gradient(135deg,#f8fafc_0%,#eef4ff_100%)] dark:bg-none dark:bg-slate-900/70">
          <div className="flex flex-wrap gap-2">
            <Badge className="border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200"><Check className="h-3.5 w-3.5" /> Edita</Badge>
            <Badge className="border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"><Eye className="h-3.5 w-3.5" /> Visualiza</Badge>
          </div>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-slate-950 text-xs uppercase text-slate-300 dark:bg-slate-900">
              <tr>
                <th className="px-4 py-3">Coluna</th>
                {roles.map((role) => (
                  <th key={role} className="px-4 py-3">{role}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {visibleFields.map((field, index) => (
                <tr key={field} className={index % 2 ? "bg-slate-50/60 transition hover:bg-blue-50 dark:bg-slate-900/35 dark:hover:bg-blue-950/30" : "bg-white transition hover:bg-blue-50 dark:bg-slate-950 dark:hover:bg-blue-950/30"}>
                  <td className="px-4 py-3 font-semibold text-slate-950 dark:text-white">{fieldLabels[field]}</td>
                  {roles.map((role) => {
                    const permission = columnPermissions[field][role];
                    return (
                      <td key={role} className="px-4 py-3">
                        {permission === "Edita" ? (
                          <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200">
                            <Check className="h-3.5 w-3.5" /> Edita
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
                            <Lock className="h-3.5 w-3.5" /> Visualiza
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </AppShell>
  );
}
