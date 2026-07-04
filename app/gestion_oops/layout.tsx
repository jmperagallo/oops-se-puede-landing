// app/gestion_oops/layout.tsx
"use client";

import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function GestionOopsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/gestion_oops/login";

  return (
    <SessionProvider>
      <div className={isLoginPage ? "" : "min-h-screen bg-[#f0f2f5]"}>
        {children}
      </div>
    </SessionProvider>
  );
}