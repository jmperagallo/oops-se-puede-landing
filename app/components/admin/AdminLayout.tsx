// app/components/admin/AdminLayout.tsx
"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const MODULOS_NAV = [
  { slug: "dashboard", label: "Dashboard", icon: "📊", href: "/gestion_oops" },
  { slug: "categorias", label: "Categorías", icon: "📂", href: "/gestion_oops/categorias" },
  { slug: "productos", label: "Productos", icon: "🍰", href: "/gestion_oops/productos" },
  { slug: "prospectos", label: "Prospectos", icon: "📧", href: "/gestion_oops/prospectos" },
  { slug: "usuarios", label: "Usuarios", icon: "🛡️", href: "/gestion_oops/usuarios" },
  { slug: "galeria", label: "Galería", icon: "📷", href: "/gestion_oops/galeria" },
  { slug: "pedidos", label: "Pedidos", icon: "📦", href: "/gestion_oops/pedidos" },
  { slug: "configuracion", label: "Configuración", icon: "⚙️", href: "/gestion_oops/configuracion" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8F6F2]">
      {/* Navbar superior */}
      <nav className="bg-[#1C1C1C] text-white px-4 md:px-6 h-16 flex items-center justify-between sticky top-0 z-50 shadow-lg">
        <Link href="/gestion_oops" className="flex items-center gap-2">
          <span className="font-playfair text-xl">OOPS!</span>
          <span className="text-xs text-[#B89B5E] bg-[#B89B5E]/20 px-2 py-1 rounded-full">
            Admin
          </span>
        </Link>
        
        <div className="flex items-center gap-4">
          <span className="text-sm text-[#bdc3c7] hidden md:block">
            Panel de Control
          </span>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="bg-[#c0392b] text-white px-4 py-1.5 rounded-full text-sm hover:bg-[#e74c3c] transition"
          >
            Salir
          </button>
          
          <button
            className="md:hidden text-white p-1"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden md:block w-64 bg-white min-h-[calc(100vh-64px)] shadow-lg p-4">
          <nav className="space-y-1">
            {MODULOS_NAV.map((modulo) => {
              const isActive = pathname === modulo.href;
              return (
                <Link
                  key={modulo.slug}
                  href={modulo.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                    isActive
                      ? "bg-[#556B5D]/10 text-[#556B5D] font-semibold"
                      : "text-[#1C1C1C]/70 hover:bg-[#D8C7B5]/20 hover:text-[#1C1C1C]"
                  }`}
                >
                  <span className="text-xl">{modulo.icon}</span>
                  <span className="font-montserrat text-sm">{modulo.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Menú móvil */}
        {menuOpen && (
          <div className="md:hidden fixed inset-0 top-16 bg-white z-40 p-4 shadow-xl">
            <nav className="space-y-1">
              {MODULOS_NAV.map((modulo) => {
                const isActive = pathname === modulo.href;
                return (
                  <Link
                    key={modulo.slug}
                    href={modulo.href}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                      isActive
                        ? "bg-[#556B5D]/10 text-[#556B5D] font-semibold"
                        : "text-[#1C1C1C]/70 hover:bg-[#D8C7B5]/20 hover:text-[#1C1C1C]"
                    }`}
                  >
                    <span className="text-xl">{modulo.icon}</span>
                    <span className="font-montserrat text-sm">{modulo.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        )}

        {/* Contenido principal */}
        <main className="flex-1 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}