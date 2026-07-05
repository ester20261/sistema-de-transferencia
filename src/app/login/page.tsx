"use client";

import { useRouter } from "next/navigation";
import { Truck, UserRoundCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input, Select } from "@/components/ui/input";
import { roles } from "@/lib/permissions";
import type { Role } from "@/lib/types";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<Role>("Admin");

  function enter() {
    window.localStorage.setItem("mock-role", role);
    router.push("/dashboard");
  }

  return (
    <main className="grid min-h-screen bg-slate-950 text-white lg:grid-cols-[1.1fr_0.9fr]">
      <section className="flex items-center px-6 py-12 lg:px-16">
        <div className="max-w-2xl">
          <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-lg bg-sky-500">
            <Truck className="h-7 w-7" />
          </div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-sky-200">Ambiente de demonstração</p>
          <h1 className="text-4xl font-bold leading-tight md:text-6xl">LogiFlow Operacional</h1>
          <p className="mt-5 max-w-xl text-lg text-slate-300">
            Gestão visual de solicitações, agendamentos, documentos fiscais e permissões por perfil, usando dados fictícios nesta primeira versão.
          </p>
        </div>
      </section>
      <section className="flex items-center justify-center bg-slate-100 px-6 py-10 text-slate-950">
        <Card className="w-full max-w-md">
          <CardContent className="space-y-5 p-6">
            <div>
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-sky-50 text-sky-700">
                <UserRoundCheck className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-bold">Entrar no sistema</h2>
              <p className="mt-1 text-sm text-slate-500">Login visual sem autenticação real.</p>
            </div>
            <label className="space-y-1.5 text-sm font-medium text-slate-700">
              E-mail
              <Input defaultValue="usuario@demo.local" />
            </label>
            <label className="space-y-1.5 text-sm font-medium text-slate-700">
              Senha
              <Input type="password" defaultValue="demonstracao" />
            </label>
            <label className="space-y-1.5 text-sm font-medium text-slate-700">
              Perfil fictício
              <Select value={role} onChange={(event) => setRole(event.target.value as Role)}>
                {roles.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </Select>
            </label>
            <Button className="w-full" onClick={enter}>
              Entrar
            </Button>
            <p className="rounded-md bg-amber-50 px-3 py-2 text-xs text-amber-700">
              Demonstração frontend: dados mockados, sem backend e sem chaves reais.
            </p>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
