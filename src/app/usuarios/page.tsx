import { Edit3, Plus, UserX } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { users } from "@/lib/mock-data";
import { formatDateTime } from "@/lib/utils";

export default function UsersPage() {
  return (
    <AppShell>
      <div className="mb-6 flex flex-col justify-between gap-3 rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-soft md:flex-row md:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">Administração</p>
          <h1 className="mt-1 text-2xl font-bold">Usuários</h1>
          <p className="text-slate-500">Cadastro administrativo mockado, sem persistência real.</p>
        </div>
        <Button><Plus className="h-4 w-4" /> Adicionar usuário</Button>
      </div>
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-[860px] w-full text-left text-sm">
            <thead className="bg-slate-900 text-xs uppercase text-slate-200">
              <tr>
                <th className="px-4 py-3">Nome</th>
                <th className="px-4 py-3">E-mail</th>
                <th className="px-4 py-3">Cargo</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Último acesso</th>
                <th className="px-4 py-3">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((user) => (
                <tr key={user.id} className="bg-white transition hover:bg-sky-50/60">
                  <td className="px-4 py-3 font-semibold">{user.nome}</td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3">{user.cargo}</td>
                  <td className="px-4 py-3">
                    <span className={user.ativo ? "text-emerald-700" : "text-slate-500"}>{user.ativo ? "Ativo" : "Inativo"}</span>
                  </td>
                  <td className="px-4 py-3">{formatDateTime(user.ultimoAcesso)}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Button variant="secondary" className="h-9 px-3"><Edit3 className="h-4 w-4" /> Editar</Button>
                      <Button variant="ghost" className="h-9 px-3"><UserX className="h-4 w-4" /> Desativar</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </AppShell>
  );
}
