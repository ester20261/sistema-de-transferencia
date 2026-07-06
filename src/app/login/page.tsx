"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  BarChart3,
  CheckCircle2,
  FileWarning,
  LockKeyhole,
  Mail,
  MapPinned,
  PackageCheck,
  Route,
  ShieldCheck,
  Truck,
  UserRoundCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input, Select } from "@/components/ui/input";
import { roles } from "@/lib/permissions";
import type { Role } from "@/lib/types";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<Role>("Admin");

  function enter() {
    window.localStorage.setItem("mock-role", role);
    router.push("/dashboard");
  }

  const indicators = [
    { label: "Pedidos monitorados", value: "1.248", icon: BarChart3 },
    { label: "Veículos ativos", value: "86", icon: Truck },
    { label: "Documentações pendentes", value: "14", icon: FileWarning },
    { label: "Operações concluídas", value: "97%", icon: PackageCheck }
  ];

  return (
    <main className="grid min-h-screen bg-slate-100 text-slate-950 lg:grid-cols-[1.08fr_0.92fr]">
      <section className="premium-grid relative overflow-hidden bg-[radial-gradient(circle_at_20%_10%,rgba(96,165,250,0.28),transparent_28rem),linear-gradient(135deg,#0f172a_0%,#1e3a8a_52%,#2563eb_100%)] px-6 py-10 text-white lg:px-16">
        <div className="relative z-10 flex min-h-full flex-col justify-between gap-10">
          <div>
            <div className="mb-10 flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-white/12 text-blue-100 ring-1 ring-white/20">
                <Truck className="h-7 w-7" />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase text-blue-100">LogiFlow</p>
                <h1 className="text-2xl font-bold">Operacional</h1>
              </div>
            </div>
            <p className="mb-4 inline-flex rounded-full border border-blue-200/25 bg-white/10 px-3 py-1 text-xs font-semibold uppercase text-blue-100">
              Ambiente de Demonstração
            </p>
            <h2 className="max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
              Operação logística clara, auditável e pronta para escala.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-blue-100">
              Solicitações, agenda de veículos, documentação fiscal e permissões por perfil em uma experiência corporativa simples de operar.
            </p>
          </div>

          <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
            <div className="glass-panel relative min-h-72 overflow-hidden rounded-lg p-6">
              <div className="absolute inset-0 opacity-80">
                <div className="absolute left-10 top-16 h-3 w-3 rounded-full bg-blue-200 shadow-[0_0_22px_rgba(191,219,254,0.9)]" />
                <div className="absolute right-20 top-10 h-3 w-3 rounded-full bg-emerald-300 shadow-[0_0_22px_rgba(110,231,183,0.9)]" />
                <div className="absolute bottom-16 left-1/2 h-3 w-3 rounded-full bg-amber-300 shadow-[0_0_22px_rgba(252,211,77,0.9)]" />
                <div className="absolute left-14 top-20 h-px w-[68%] rotate-6 bg-blue-100/45" />
                <div className="absolute right-24 top-16 h-px w-[48%] rotate-[138deg] bg-white/35" />
                <div className="absolute bottom-20 left-24 h-px w-[58%] -rotate-12 bg-emerald-100/35" />
              </div>
              <div className="relative grid h-full gap-4 md:grid-cols-3">
                <div className="rounded-lg border border-white/15 bg-white/10 p-4">
                  <Route className="mb-4 h-6 w-6 text-blue-100" />
                  <p className="text-xs uppercase text-blue-100">Rota</p>
                  <p className="mt-2 text-lg font-bold">Joinville → Campinas</p>
                </div>
                <div className="self-center rounded-lg border border-white/15 bg-white/10 p-4">
                  <MapPinned className="mb-4 h-6 w-6 text-emerald-200" />
                  <p className="text-xs uppercase text-blue-100">Agenda</p>
                  <p className="mt-2 text-lg font-bold">86 veículos</p>
                </div>
                <div className="self-end rounded-lg border border-white/15 bg-white/10 p-4">
                  <ShieldCheck className="mb-4 h-6 w-6 text-amber-200" />
                  <p className="text-xs uppercase text-blue-100">Fiscal</p>
                  <p className="mt-2 text-lg font-bold">CTE / MDFE</p>
                </div>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
              {indicators.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="animate-in rounded-lg border border-white/15 bg-white/10 p-4 shadow-2xl shadow-slate-950/10 backdrop-blur">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm text-blue-100">{item.label}</p>
                        <p className="mt-1 text-2xl font-bold">{item.value}</p>
                      </div>
                      <Icon className="h-5 w-5 text-blue-100" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="flex items-center justify-center px-6 py-10 text-slate-950">
        <Card className="w-full max-w-md border-slate-200/80 shadow-premium">
          <CardContent className="space-y-6 p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                  <UserRoundCheck className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-bold">Acesso operacional</h2>
                <p className="mt-1 text-sm text-slate-500">Selecione um perfil fictício para navegar.</p>
              </div>
              <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                Ambiente de Demonstração
              </span>
            </div>
            <label className="space-y-1.5 text-sm font-medium text-slate-700">
              E-mail
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                <Input className="pl-9" defaultValue="usuario@demo.local" />
              </div>
            </label>
            <label className="space-y-1.5 text-sm font-medium text-slate-700">
              Senha
              <div className="relative">
                <LockKeyhole className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                <Input className="pl-9" type="password" defaultValue="demonstracao" />
              </div>
            </label>
            <label className="space-y-1.5 text-sm font-medium text-slate-700">
              Perfil fictício
              <Select className="bg-slate-50" value={role} onChange={(event) => setRole(event.target.value as Role)}>
                {roles.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </Select>
            </label>
            <Button className="h-11 w-full" onClick={enter}>
              <CheckCircle2 className="h-4 w-4" />
              Entrar
            </Button>
            <p className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs leading-5 text-amber-800">
              Demonstração visual: ainda não há autenticação real, backend ou Supabase conectado.
            </p>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
