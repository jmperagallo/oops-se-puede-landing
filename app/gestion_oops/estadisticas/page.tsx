// app/gestion_oops/estadisticas/page.tsx
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import DashboardStats from "../../components/admin/DashboardStats";
import DashboardVisits from "../../components/admin/DashboardVisits";

export default function EstadisticasPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/gestion_oops/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-pulse text-4xl mb-4">⏳</div>
            <p className="text-[#95a5a6]">Cargando estadísticas...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <AdminLayout>
      <div className="p-4 md:p-6">
        {/* Encabezado */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-[#1C1C1C] font-playfair">
            📊 Estadísticas
          </h1>
          <p className="text-sm text-[#95a5a6] font-montserrat mt-1">
            Resumen de visitas y métricas de OOPS! SE PUEDE
          </p>
        </div>

        {/* ✅ Estadísticas */}
        <DashboardStats />
        <DashboardVisits />
      </div>
    </AdminLayout>
  );
}