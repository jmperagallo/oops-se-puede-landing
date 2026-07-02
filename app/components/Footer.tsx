// app/components/Footer.tsx
"use client";

import Link from "next/link";

interface FooterProps {
  phase?: "incoming" | "countdown" | "reveal";
}

export default function Footer({ phase }: FooterProps) {
  return (
    <footer className="relative z-10 bg-gradient-to-b from-[#1C1C1C]/90 to-[#1C1C1C] text-[#F8F6F2]/80 border-t border-[#B89B5E]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Marca */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-[#B89B5E] to-[#9A7B40] rounded-full flex items-center justify-center shadow-md">
              <span className="text-[#1C1C1C] font-serif text-xs font-bold">O!</span>
            </div>
            <div>
              <p className="font-serif text-sm text-[#F8F6F2] leading-tight">
                OOPS! SE PUEDE
              </p>
              <p className="font-sans text-[8px] text-[#B89B5E] tracking-[0.2em] uppercase">
                Keto Baked · Specialty Coffee
              </p>
            </div>
          </div>

          {/* Redes Sociales */}
          <div className="flex items-center gap-6">
            <Link
              href="https://www.instagram.com/oops.sepuede"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F8F6F2]/50 hover:text-[#B89B5E] transition-all duration-300 text-sm"
            >
              Instagram
            </Link>
            <Link
              href="https://wa.me/56912345678"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F8F6F2]/50 hover:text-[#B89B5E] transition-all duration-300 text-sm"
            >
              WhatsApp
            </Link>
            <span className="text-[#F8F6F2]/10">|</span>
            <Link
              href="/contacto"
              className="text-[#F8F6F2]/50 hover:text-[#B89B5E] transition-all duration-300 text-sm"
            >
              Contacto
            </Link>
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right">
            <p className="text-[10px] text-[#F8F6F2]/40 tracking-[0.04em]">
              &copy; {new Date().getFullYear()} OOPS! SE PUEDE.
            </p>
            <p className="text-[8px] text-[#F8F6F2]/20 mt-0.5">
              Hecho con ❤️ en Concón, Chile
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}