// components/admin/DashboardStats.tsx
"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase/client";

interface Stats {
  totalProductos: number;
  totalCategorias: number;
  visitasHoy: number;
  visitasTotal: number;
}

export default function DashboardStats() {
  const [stats, setStats] = useState<Stats>({
    totalProductos: 0,
    totalCategorias: 0,
    visitasHoy: 0,
    visitasTotal: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarStats();
  }, []);

  const cargarStats = async () => {
    setLoading(true);

    const { count: totalProductos } = await supabase
      .from("productos")
      .select("*", { count: "exact", head: true });

    const { count: totalCategorias } = await supabase
      .from("categorias")
      .select("*", { count: "exact", head: true });

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const hoyISO = hoy.toISOString();

    const { count: visitasHoy } = await supabase
      .from("visitas")
      .select("*", { count: "exact", head: true })
      .gte("fecha_visita", hoyISO);

    const { count: visitasTotal } = await supabase
      .from("visitas")
      .select("*", { count: "exact", head: true });

    setStats({
      totalProductos: totalProductos || 0,
      totalCategorias: totalCategorias || 0,
      visitasHoy: visitasHoy || 0,
      visitasTotal: visitasTotal || 0,
    });

    setLoading(false);
  };

  const cards = [
    { title: "Productos", value: stats.totalProductos, icon: "🍰", color: "border-[#B89B5E]" },
    { title: "Categorías", value: stats.totalCategorias, icon: "📂", color: "border-[#556B5D]" },
    { title: "Visitas Hoy", value: stats.visitasHoy, icon: "👀", color: "border-[#3498db]" },
    { title: "Visitas Totales", value: stats.visitasTotal, icon: "📊", color: "border-[#2c3e50]" },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow-md p-6 animate-pulse">
            <div className="h-4 bg-[#D8C7B5]/30 rounded w-1/2 mb-2" />
            <div className="h-8 bg-[#D8C7B5]/30 rounded w-3/4" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`bg-white rounded-xl shadow-md p-6 border-t-4 ${card.color} hover:shadow-lg transition`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl">{card.icon}</span>
            <span className="text-xs font-montserrat text-[#95a5a6] uppercase tracking-wide">{card.title}</span>
          </div>
          <p className="text-3xl font-bold text-[#1C1C1C]">{card.value}</p>
        </div>
      ))}
    </div>
  );
}