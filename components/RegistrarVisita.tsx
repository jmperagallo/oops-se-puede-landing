// components/RegistrarVisita.tsx
"use client";

import { useEffect } from "react";
import { registrarVisita } from "../lib/utils/visitas";

export default function RegistrarVisita() {
  useEffect(() => {
    const yaRegistrado = sessionStorage.getItem("visita_registrada");
    if (!yaRegistrado) {
      registrarVisita();
      sessionStorage.setItem("visita_registrada", "true");
    }
  }, []);

  return null;
}