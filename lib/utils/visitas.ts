// lib/utils/visitas.ts
import { supabase } from "../supabase/client";

export async function registrarVisita() {
  try {
    const ip = await obtenerIP();
    const pais = await obtenerPais(ip);
    const dispositivo = obtenerDispositivo();
    const navegador = obtenerNavegador();
    const url = typeof window !== "undefined" ? window.location.pathname : "";

    const { error } = await supabase.from("visitas").insert({
      ip_address: ip,
      pais: pais,
      dispositivo_tipo: dispositivo.tipo,
      dispositivo_nombre: dispositivo.nombre,
      navegador: navegador,
      url_visitada: url,
    });

    if (error) console.error("❌ Error registrando visita:", error);
  } catch (error) {
    console.error("❌ Error en registrarVisita:", error);
  }
}

async function obtenerIP(): Promise<string> {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    return data.ip || "0.0.0.0";
  } catch {
    return "0.0.0.0";
  }
}

async function obtenerPais(ip: string): Promise<string> {
  try {
    const response = await fetch(`https://ipapi.co/${ip}/country_name/`);
    const pais = await response.text();
    return pais || "Desconocido";
  } catch {
    return "Desconocido";
  }
}

function obtenerDispositivo(): { tipo: string; nombre: string } {
  if (typeof window === "undefined") return { tipo: "Desconocido", nombre: "Desconocido" };
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return { tipo: "Tablet", nombre: "Tablet" };
  }
  if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    return { tipo: "Móvil", nombre: "Móvil" };
  }
  return { tipo: "Escritorio", nombre: "Escritorio" };
}

function obtenerNavegador(): string {
  if (typeof window === "undefined") return "Desconocido";
  const ua = navigator.userAgent;
  if (ua.indexOf("Chrome") > -1) return "Chrome";
  if (ua.indexOf("Firefox") > -1) return "Firefox";
  if (ua.indexOf("Safari") > -1) return "Safari";
  if (ua.indexOf("Edge") > -1) return "Edge";
  if (ua.indexOf("Opera") > -1) return "Opera";
  return "Otro";
}