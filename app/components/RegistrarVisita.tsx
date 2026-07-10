// app/components/RegistrarVisita.tsx
"use client";

import { useEffect } from "react";
import { registrarVisita } from "../../lib/utils/visitas";

export default function RegistrarVisita() {
  useEffect(() => {
    console.log("🔍 RegistrarVisita: componente montado");
    
    const yaRegistrado = sessionStorage.getItem("visita_registrada");
    console.log("📌 yaRegistrado:", yaRegistrado);
    
    if (!yaRegistrado) {
      console.log("📝 Registrando visita...");
      registrarVisita();
      sessionStorage.setItem("visita_registrada", "true");
    } else {
      console.log("⏭️ Visita ya registrada en esta sesión");
    }
  }, []);

  return null;
}