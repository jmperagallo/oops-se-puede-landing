// app/components/admin/DashboardVisits.tsx
"use client";

import { useState, useEffect } from "react";
import { supabaseAdmin } from "../../../lib/supabase/client"; // ✅ USAR supabaseAdmin

interface Visita {
  id: string;
  ip_address: string;
  pais: string;
  dispositivo_tipo: string;
  navegador: string;
  fecha_visita: string;
}

export default function DashboardVisits() {
  const [visitas, setVisitas] = useState<Visita[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarVisitas();
  }, []);

  const cargarVisitas = async () => {
    setLoading(true);
    console.log("🔍 Cargando visitas con supabaseAdmin...");

    try {
      // ✅ Usar supabaseAdmin en lugar de supabase
      const { data, error } = await supabaseAdmin
        .from("visitas")
        .select("*")
        .order("fecha_visita", { ascending: false })
        .limit(10);

      if (error) {
        console.error("❌ Error cargando visitas:", error);
      } else {
        console.log("✅ Visitas cargadas:", data?.length || 0);
        setVisitas(data || []);
      }
    } catch (error) {
      console.error("❌ Error inesperado:", error);
    }

    setLoading(false);
  };

  const formatearFecha = (fecha: string) => {
    const d = new Date(fecha);
    return d.toLocaleDateString("es-CL") + " " + d.toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
      <div className="px-6 py-4 border-b border-[#D8C7B5]/30">
        <h3 className="font-playfair text-lg text-[#1C1C1C]">🌎 Últimas visitas</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#f8f9fa]">
            <tr>
              <th className="text-left p-4 text-sm font-semibold text-[#7f8c8d]">Fecha/Hora</th>
              <th className="text-left p-4 text-sm font-semibold text-[#7f8c8d]">IP</th>
              <th className="text-left p-4 text-sm font-semibold text-[#7f8c8d]">País</th>
              <th className="text-left p-4 text-sm font-semibold text-[#7f8c8d]">Dispositivo</th>
              <th className="text-left p-4 text-sm font-semibold text-[#7f8c8d]">Navegador</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="text-center py-8 text-[#95a5a6]">Cargando...</td></tr>
            ) : visitas.length === 0 ? (
              <tr><td colSpan={5} className="text-center py-8 text-[#95a5a6]">📭 No hay visitas registradas aún</td></tr>
            ) : (
              visitas.map((visita) => (
                <tr key={visita.id} className="border-b border-[#f1f1f1] hover:bg-[#fafbfc] transition">
                  <td className="p-4 text-sm">{formatearFecha(visita.fecha_visita)}</td>
                  <td className="p-4 text-sm font-mono text-[#95a5a6]">{visita.ip_address}</td>
                  <td className="p-4 text-sm">
                    <span className="bg-[#D8C7B5]/20 px-2 py-1 rounded-full text-xs">{visita.pais || "Desconocido"}</span>
                  </td>
                  <td className="p-4 text-sm">
                    {visita.dispositivo_tipo === "Móvil" && "📱"}
                    {visita.dispositivo_tipo === "Tablet" && "📱"}
                    {visita.dispositivo_tipo === "Escritorio" && "💻"}
                    {visita.dispositivo_tipo || "💻"}
                  </td>
                  <td className="p-4 text-sm text-[#95a5a6]">{visita.navegador || "—"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}