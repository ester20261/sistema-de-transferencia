import { ShieldCheck } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { roleInfos } from "@/lib/mock-data";

export default function RolesPage() {
  return (
    <AppShell>
      <div className="mb-6 rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-soft">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">Governança de acesso</p>
        <h1 className="mt-1 text-2xl font-bold">Cargos</h1>
        <p className="text-slate-500">Papéis mockados usados para simular a experiência futura de permissões.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {roleInfos.map((role) => (
          <Card key={role.role} className="overflow-hidden">
            <CardContent className="p-5">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-950 to-sky-700 text-white shadow-lg shadow-sky-900/15">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h2 className="text-lg font-bold">{role.role}</h2>
              <p className="mt-2 min-h-16 text-sm text-slate-600">{role.descricao}</p>
              <p className="mt-4 inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm font-semibold text-slate-800">{role.usuarios} usuários simulados</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
