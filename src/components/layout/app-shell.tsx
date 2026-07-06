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
  Menu,
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
    <div className="min-h-screen text-slate-950">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-white/10 bg-[linear-gradient(180deg,#07162d_0%,#0b2447_52%,#0f355f_100%)] px-4 py-5 text-white shadow-2xl shadow-slate-950/20 lg:block">
        <div className="mb-8 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/8 p-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/15 text-cyan-100 ring-1 ring-cyan-200/20">
            <LayoutGrid className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-cyan-100">LogiFlow</p>
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
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-blue-100/80 transition hover:bg-white/10 hover:text-white",
                  active && "bg-white text-blue-950 shadow-lg shadow-slate-950/15"
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
        <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/85 px-4 py-3 shadow-sm backdrop-blur-xl lg:px-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-950 text-white lg:hidden">
                <Menu className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">Ambiente de demonstração</p>
                <h2 className="text-xl font-bold text-slate-950">Gestão de solicitações e veículos</h2>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <select
                className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 shadow-sm outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
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
                  "whitespace-nowrap rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-600 shadow-sm",
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
