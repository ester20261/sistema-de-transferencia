import type { ReactNode } from "react";
import { Bell, Inbox, LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function PageHeader({
  eyebrow,
  title,
  description,
  action,
  meta
}: {
  eyebrow: string;
  title: string;
  description: string;
  action?: ReactNode;
  meta?: ReactNode;
}) {
  return (
    <section className="animate-in mb-6 rounded-lg border border-slate-200/80 bg-white/92 p-5 shadow-soft dark:border-slate-800 dark:bg-slate-950/78">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-semibold uppercase text-blue-700 dark:text-blue-300">{eyebrow}</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-950 dark:text-slate-50 md:text-3xl">{title}</h1>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-500 dark:text-slate-400">{description}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {meta}
          {action}
        </div>
      </div>
    </section>
  );
}

export function UserAvatar({ name, className }: { name: string; className?: string }) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <span className={cn("inline-flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white shadow-sm", className)}>
      {initials}
    </span>
  );
}

export function StatCard({
  label,
  value,
  change,
  icon: Icon,
  tone = "blue"
}: {
  label: string;
  value: string | number;
  change: string;
  icon: LucideIcon;
  tone?: "blue" | "emerald" | "amber" | "red" | "cyan";
}) {
  const tones = {
    blue: "bg-blue-600 text-white shadow-blue-600/20",
    emerald: "bg-emerald-500 text-white shadow-emerald-500/20",
    amber: "bg-amber-500 text-white shadow-amber-500/20",
    red: "bg-red-500 text-white shadow-red-500/20",
    cyan: "bg-cyan-500 text-white shadow-cyan-500/20"
  };

  return (
    <Card className="animate-in overflow-hidden">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
            <p className="mt-2 text-3xl font-bold tracking-tight text-slate-950 dark:text-white">{value}</p>
          </div>
          <div className={cn("flex h-11 w-11 items-center justify-center rounded-lg shadow-lg", tones[tone])}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
        <div className="mt-4 flex items-end justify-between gap-3">
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-900 dark:text-slate-300">{change}</span>
          <div className="h-10 w-24 rounded-md bg-gradient-to-t from-blue-100 to-transparent dark:from-blue-950/50">
            <div className="mini-chart h-full rounded-md bg-blue-500/35" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function NotificationItem({ title, message, unread }: { title: string; message: string; unread?: boolean }) {
  return (
    <div className="flex gap-3 rounded-lg border border-slate-100 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-950">
      <div className={cn("mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg", unread ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500 dark:bg-slate-900")}>
        <Bell className="h-4 w-4" />
      </div>
      <div>
        <p className="text-sm font-semibold text-slate-950 dark:text-slate-50">{title}</p>
        <p className="text-sm leading-5 text-slate-500 dark:text-slate-400">{message}</p>
      </div>
    </div>
  );
}

export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-8 text-center dark:border-slate-800 dark:bg-slate-950">
      <Inbox className="mx-auto h-8 w-8 text-slate-400" />
      <p className="mt-3 font-semibold text-slate-900 dark:text-slate-100">{title}</p>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{description}</p>
    </div>
  );
}
