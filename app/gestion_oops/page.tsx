// app/gestion_oops/page.tsx
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function GestionOopsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/gestion_oops/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div className="p-10 text-center">Cargando...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Panel de Administración</h1>
      <p>Bienvenido, {session.user?.name || "Admin"} 👋</p>
      <p className="text-sm text-gray-500 mt-4">Aquí irá el dashboard con módulos.</p>
    </div>
  );
}