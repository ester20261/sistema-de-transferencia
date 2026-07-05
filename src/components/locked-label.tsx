import { Lock } from "lucide-react";

export function LockedLabel({ label, locked }: { label: string; locked: boolean }) {
  return (
    <span className="inline-flex items-center gap-1">
      {label}
      {locked ? <Lock className="h-3.5 w-3.5 text-slate-400" aria-label="Campo bloqueado" /> : null}
    </span>
  );
}
