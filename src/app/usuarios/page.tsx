import { Edit3, Plus, UserX } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader, UserAvatar } from "@/components/premium-ui";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { users } from "@/lib/mock-data";
import { formatDateTime } from "@/lib/utils";

export default function UsersPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Administração"
        title="Usuários"
        description="Cadastro administrativo mockado, sem persistência real."
        action={<Button><Plus className="h-4 w-4" /> Adicionar usuário</Button>}
      />
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-slate-950 text-xs uppercase text-slate-300 dark:bg-slate-900">
              <tr>
                <th className="px-4 py-3">Nome</th>
                <th className="px-4 py-3">E-mail</th>
                <th className="px-4 py-3">Cargo</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Último acesso</th>
                <th className="px-4 py-3">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {users.map((user, index) => (
                <tr key={user.id} className={index % 2 ? "bg-slate-50/60 transition hover:bg-blue-50 dark:bg-slate-900/35 dark:hover:bg-blue-950/30" : "bg-white transition hover:bg-blue-50 dark:bg-slate-950 dark:hover:bg-blue-950/30"}>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-2 font-semibold text-slate-950 dark:text-white">
                      <UserAvatar name={user.nome} />
                      {user.nome}
                    </span>
                  </td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3">{user.cargo}</td>
                  <td className="px-4 py-3">
                    <span className={user.ativo ? "rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-200" : "rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-500 dark:bg-slate-900"}>
                      {user.ativo ? "Ativo" : "Inativo"}
                    </span>
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
