import { ShieldCheck, Users } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/premium-ui";
import { Card, CardContent } from "@/components/ui/card";
import { roleInfos } from "@/lib/mock-data";

export default function RolesPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Governança de acesso"
        title="Cargos"
        description="Papéis mockados usados para simular a experiência futura de permissões."
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {roleInfos.map((role) => (
          <Card key={role.role} className="overflow-hidden">
            <CardContent className="p-5">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-blue-600 text-white shadow-lg shadow-blue-600/15">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h2 className="text-lg font-bold text-slate-950 dark:text-white">{role.role}</h2>
              <p className="mt-2 min-h-16 text-sm leading-6 text-slate-600 dark:text-slate-400">{role.descricao}</p>
              <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm font-semibold text-slate-800 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
                <Users className="h-3.5 w-3.5" />
                {role.usuarios} usuários simulados
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
