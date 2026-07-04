// app/gestion_oops/login/page.tsx
"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Credenciales incorrectas. Intente de nuevo.");
      } else {
        router.push("/gestion_oops");
        router.refresh();
      }
    } catch (error) {
      setError("Ocurrió un error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1C1C1C] to-[#2c3e50] p-4">
      {/* Decoración */}
      <div className="absolute inset-0 opacity-10 bg-[url('/Logo Transparente.png')] bg-repeat bg-[length:200px] pointer-events-none" />
      
      <div className="relative z-10 bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 md:p-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-[#556B5D] rounded-full flex items-center justify-center shadow-lg">
              <span className="text-3xl font-bold text-white font-serif">O!</span>
            </div>
          </div>
          <h1 className="font-serif text-2xl text-[#1C1C1C]">OOPS! SE PUEDE</h1>
          <p className="text-sm text-[#95a5a6] font-montserrat mt-1">Panel de Administración</p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-[#555] mb-1">
              Correo Electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-[#ddd] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#556B5D] focus:border-transparent transition"
              placeholder="admin@oops.cl"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#555] mb-1">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-[#ddd] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#556B5D] focus:border-transparent transition"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#556B5D] text-white py-3 rounded-lg font-medium hover:bg-[#3d4f43] transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Iniciando sesión..." : "ACCEDER AL PANEL"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link 
            href="/" 
            className="text-sm text-[#95a5a6] hover:text-[#556B5D] transition"
          >
            ← Volver al sitio web
          </Link>
        </div>

        {/* Footer del login */}
        <div className="mt-8 pt-6 border-t border-[#eee] text-center">
          <p className="text-xs text-[#bbb]">
            Sistema interno de administración
          </p>
        </div>
      </div>
    </div>
  );
}