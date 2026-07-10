// app/components/RegistrarVisita.tsx
"use client";

import { useEffect } from "react";
import { registrarVisita } from "../../lib/utils/visitas";

export default function RegistrarVisita() {
  useEffect(() => {
    const ultimaVisita = localStorage.getItem("ultima_visita_oops");
    const ahora = Date.now();
    const tiempoMinimo = 3 * 60 * 1000; // 3 minutos

    if (!ultimaVisita || (ahora - parseInt(ultimaVisita)) > tiempoMinimo) {
      registrarVisita();
      localStorage.setItem("ultima_visita_oops", String(ahora));
    }
  }, []);

  return null;
}