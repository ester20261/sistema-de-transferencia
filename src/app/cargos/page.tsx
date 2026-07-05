import { ShieldCheck } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { roleInfos } from "@/lib/mock-data";

export default function RolesPage() {
  return (
    <AppShell>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Cargos</h1>
        <p className="text-slate-500">Papéis mockados usados para simular a experiência futura de permissões.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {roleInfos.map((role) => (
          <Card key={role.role}>
            <CardContent className="p-5">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-sky-50 text-sky-700">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h2 className="text-lg font-bold">{role.role}</h2>
              <p className="mt-2 min-h-16 text-sm text-slate-600">{role.descricao}</p>
              <p className="mt-4 text-sm font-semibold text-slate-900">{role.usuarios} usuários simulados</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
