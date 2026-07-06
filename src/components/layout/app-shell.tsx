"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Bell,
  CalendarClock,
  ChevronRight,
  Gauge,
  KeyRound,
  LayoutGrid,
  LogOut,
  Menu,
  Moon,
  Plus,
  Search,
  ShieldCheck,
  Sun,
  Table2,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { roles } from "@/lib/permissions";
import type { Role } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";

const navGroups = [
  {
    title: "Operação",
    items: [
      { href: "/dashboard", label: "Dashboard", icon: Gauge },
      { href: "/operacao", label: "Tabela operacional", icon: Table2 },
      { href: "/agendamentos", label: "Agendamentos", icon: CalendarClock },
      { href: "/notificacoes", label: "Notificações", icon: Bell }
    ]
  },
  {
    title: "Administração",
    items: [
      { href: "/usuarios", label: "Usuários", icon: Users },
      { href: "/cargos", label: "Cargos", icon: ShieldCheck },
      { href: "/permissoes", label: "Permissões", icon: KeyRound }
    ]
  }
];

const nav = navGroups.flatMap((group) => group.items);

export function getStoredRole(): Role {
  if (typeof window === "undefined") return "Admin";
  const role = window.localStorage.getItem("mock-role") as Role | null;
  return role && roles.includes(role) ? role : "Admin";
}

function getStoredTheme() {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem("theme") === "dark";
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [role, setRole] = useState<Role>("Admin");
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setRole(getStoredRole());
    setDark(getStoredTheme());
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    window.localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  function changeRole(nextRole: Role) {
    window.localStorage.setItem("mock-role", nextRole);
    setRole(nextRole);
    window.dispatchEvent(new Event("mock-role-change"));
  }

  const current = useMemo(() => nav.find((item) => pathname === item.href) ?? nav.find((item) => pathname.startsWith(item.href)), [pathname]);

  return (
    <div className="min-h-screen text-slate-950 dark:text-slate-50">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-slate-950/10 bg-slate-950 px-4 py-5 text-white shadow-2xl shadow-slate-950/20 lg:block">
        <div className="mb-7 flex items-center gap-3 rounded-lg border border-white/10 bg-white/8 p-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-500 text-white shadow-lg shadow-blue-500/20">
            <LayoutGrid className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase text-blue-200">LogiFlow</p>
            <h1 className="text-lg font-bold">Operacional</h1>
          </div>
        </div>

        <nav className="space-y-6">
          {navGroups.map((group) => (
            <div key={group.title}>
              <p className="mb-2 px-3 text-[11px] font-semibold uppercase text-slate-400">{group.title}</p>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const active = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white",
                        active && "bg-white text-slate-950 shadow-lg shadow-slate-950/20"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="absolute bottom-5 left-4 right-4 rounded-lg border border-white/10 bg-white/8 p-3">
          <div className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-sm font-bold">
              {role.slice(0, 2).toUpperCase()}
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-slate-950 bg-emerald-400" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">Usuário demo</p>
              <p className="truncate text-xs text-slate-400">{role}</p>
            </div>
          </div>
        </div>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/86 px-4 py-3 shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/86 lg:px-8">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-950 text-white lg:hidden">
                <Menu className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1 text-xs font-semibold text-slate-500 dark:text-slate-400">
                  <span>LogiFlow</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                  <span className="text-blue-700 dark:text-blue-300">{current?.label ?? "Operação"}</span>
                </div>
                <h2 className="truncate text-lg font-bold text-slate-950 dark:text-white">Gestão de solicitações e veículos</h2>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="relative min-w-[220px] flex-1 md:flex-none">
                <Search className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                <input
                  className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-blue-950/60"
                  placeholder="Pesquisar operação..."
                />
              </div>
              <Button className="h-10" onClick={() => router.push("/operacao")}>
                <Plus className="h-4 w-4" />
                Nova Solicitação
              </Button>
              <button
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
                aria-label="Notificações"
                onClick={() => router.push("/notificacoes")}
              >
                <Bell className="h-4 w-4" />
              </button>
              <button
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
                aria-label="Alternar tema"
                onClick={() => setDark((value) => !value)}
              >
                {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
              <select
                className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 shadow-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
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
                  "whitespace-nowrap rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300",
                  pathname === item.href && "border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-200"
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
