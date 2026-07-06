import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LogiFlow Operacional",
  description: "Frontend mockado para gestão de solicitações e agendamento de veículos"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
