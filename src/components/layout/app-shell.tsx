"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Bell,
  CalendarClock,
  Gauge,
  KeyRound,
  LayoutGrid,
  LogOut,
  ShieldCheck,
  Table2,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { roles } from "@/lib/permissions";
import type { Role } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: Gauge },
  { href: "/operacao", label: "Operação", icon: Table2 },
  { href: "/agendamentos", label: "Agendamentos", icon: CalendarClock },
  { href: "/notificacoes", label: "Notificações", icon: Bell },
  { href: "/usuarios", label: "Usuários", icon: Users },
  { href: "/cargos", label: "Cargos", icon: ShieldCheck },
  { href: "/permissoes", label: "Permissões", icon: KeyRound }
];

export function getStoredRole(): Role {
  if (typeof window === "undefined") return "Admin";
  const role = window.localStorage.getItem("mock-role") as Role | null;
  return role && roles.includes(role) ? role : "Admin";
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [role, setRole] = useState<Role>("Admin");

  useEffect(() => {
    setRole(getStoredRole());
  }, []);

  function changeRole(nextRole: Role) {
    window.localStorage.setItem("mock-role", nextRole);
    setRole(nextRole);
    window.dispatchEvent(new Event("mock-role-change"));
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-slate-200 bg-white px-4 py-5 lg:block">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-sky-700 text-white">
            <LayoutGrid className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-500">LogiFlow</p>
            <h1 className="text-lg font-bold">Operacional</h1>
          </div>
        </div>
        <nav className="space-y-1">
          {nav.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100",
                  active && "bg-sky-50 text-sky-800"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
      <div className="lg:pl-72">
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur lg:px-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Ambiente de demonstração</p>
              <h2 className="text-xl font-bold text-slate-950">Gestão de solicitações e veículos</h2>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <select
                className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm"
                value={role}
                onChange={(event) => changeRole(event.target.value as Role)}
                aria-label="Perfil mockado"
              >
                {roles.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
              <Button variant="secondary" onClick={() => router.push("/login")}>
                <LogOut className="h-4 w-4" />
                Sair
              </Button>
            </div>
          </div>
          <div className="mt-3 flex gap-2 overflow-x-auto lg:hidden">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "whitespace-nowrap rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600",
                  pathname === item.href && "border-sky-200 bg-sky-50 text-sky-800"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </header>
        <main className="px-4 py-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
