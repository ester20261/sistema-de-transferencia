import { Check, Eye, Lock } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
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
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Permissões por coluna</h1>
        <p className="text-slate-500">Matriz visual preparada para futuramente receber regras do Supabase.</p>
      </div>
      <Card className="overflow-hidden">
        <CardHeader>
          <div className="flex flex-wrap gap-2">
            <Badge className="border-emerald-200 bg-emerald-50 text-emerald-700"><Check className="h-3.5 w-3.5" /> Edita</Badge>
            <Badge className="border-slate-200 bg-slate-50 text-slate-700"><Eye className="h-3.5 w-3.5" /> Visualiza</Badge>
          </div>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="min-w-[900px] w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3">Coluna</th>
                {roles.map((role) => (
                  <th key={role} className="px-4 py-3">{role}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {visibleFields.map((field) => (
                <tr key={field} className="bg-white">
                  <td className="px-4 py-3 font-semibold">{fieldLabels[field]}</td>
                  {roles.map((role) => {
                    const permission = columnPermissions[field][role];
                    return (
                      <td key={role} className="px-4 py-3">
                        {permission === "Edita" ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                            <Check className="h-3.5 w-3.5" /> Edita
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600">
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
