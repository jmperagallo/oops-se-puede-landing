"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/carta", label: "Carta" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/locales", label: "Locales" },
  { href: "/contacto", label: "Contacto" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Cerrar menú al cambiar de página
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Cerrar menú al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isOpen && !target.closest('header')) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  // Bloquear scroll cuando el menú está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#F8F6F2]/95 backdrop-blur-md border-b border-[#D8C7B5]/30 shadow-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16 md:h-20">
          
          {/* LOGO - VERSIÓN COMPACTA PARA MÓVIL */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
            <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-gradient-to-br from-[#556B5D] to-[#3d4f43] rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300">
              <span className="text-[#F8F6F2] font-serif text-xs sm:text-sm md:text-base font-bold">O!</span>
            </div>
            
            <div className="hidden sm:block">
              <span className="font-serif text-base md:text-xl text-[#1C1C1C] leading-tight block group-hover:text-[#556B5D] transition-colors duration-300">
                OOPS! SE PUEDE
              </span>
              <span className="font-sans text-[8px] md:text-[10px] text-[#B89B5E] tracking-[0.25em] uppercase block -mt-0.5 font-medium">
                Keto Baked · Specialty Coffee
              </span>
            </div>

            {/* Versión móvil del logo */}
            <div className="sm:hidden flex flex-col leading-tight">
              <span className="font-serif text-sm font-bold text-[#1C1C1C]">OOPS!</span>
              <span className="font-sans text-[6px] text-[#B89B5E] tracking-[0.15em] uppercase">Keto</span>
            </div>
          </Link>

          {/* NAVEGACIÓN DESKTOP */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    relative px-3 py-1.5 lg:px-4 lg:py-2 rounded-full text-xs lg:text-sm font-medium transition-all duration-300
                    ${isActive 
                      ? 'text-[#556B5D] bg-[#556B5D]/10' 
                      : 'text-[#1C1C1C]/70 hover:text-[#1C1C1C] hover:bg-[#D8C7B5]/20'
                    }
                  `}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-0.5 bg-[#B89B5E] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* ACCIONES */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/contacto"
              className="hidden sm:block bg-gradient-to-r from-[#556B5D] to-[#3d4f43] text-[#F8F6F2] px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-sm font-medium hover:shadow-lg hover:shadow-[#556B5D]/20 transition-all duration-300 hover:scale-105"
            >
              Reservar
            </Link>
            
            {/* BOTÓN HAMBURGUESA - MEJORADO */}
            <button
              className="md:hidden text-[#1C1C1C] p-1.5 sm:p-2 hover:bg-[#D8C7B5]/20 rounded-lg transition-all duration-200 relative z-50"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(!isOpen);
              }}
              aria-label="Menú"
            >
              {isOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* MENÚ MÓVIL - MEJORADO */}
      <div 
        className={`
          md:hidden fixed top-0 right-0 h-full w-full max-w-xs bg-[#F8F6F2] shadow-2xl transition-all duration-300 ease-in-out z-40
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
        style={{ top: 0 }}
      >
        {/* Espaciador para el header */}
        <div className="h-14 sm:h-16" />
        
        <nav className="flex flex-col p-4 sm:p-6 gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`
                  px-4 py-3 rounded-xl text-base font-medium transition-all duration-200
                  ${isActive 
                    ? 'text-[#556B5D] bg-[#556B5D]/10' 
                    : 'text-[#1C1C1C]/70 hover:text-[#1C1C1C] hover:bg-[#D8C7B5]/10'
                  }
                `}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/contacto"
            onClick={() => setIsOpen(false)}
            className="mt-3 bg-gradient-to-r from-[#556B5D] to-[#3d4f43] text-[#F8F6F2] px-6 py-3 rounded-xl text-center font-medium"
          >
            Reservar
          </Link>
        </nav>
      </div>

      {/* Overlay oscuro cuando el menú está abierto */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/30 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </header>
  );
}