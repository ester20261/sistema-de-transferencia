"use client";

import { useEffect, useState } from "react";
import { roles } from "./permissions";
import type { Role } from "./types";

export function useMockRole() {
  const [role, setRole] = useState<Role>("Admin");

  useEffect(() => {
    const readRole = () => {
      const stored = window.localStorage.getItem("mock-role") as Role | null;
      setRole(stored && roles.includes(stored) ? stored : "Admin");
    };
    readRole();
    window.addEventListener("mock-role-change", readRole);
    return () => window.removeEventListener("mock-role-change", readRole);
  }, []);

  return role;
}
