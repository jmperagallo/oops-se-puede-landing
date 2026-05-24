"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface FooterProps {
  phase: "incoming" | "countdown" | "reveal";
}

export default function Footer({ phase }: FooterProps) {
  if (phase !== "reveal") return null;

  return (
    <motion.footer 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
      transition={{ delay: 2.2, duration: 1.2 }}
      className="relative z-20 w-full text-center py-6 px-6 border-t border-[#1C1C1C]/5 flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto gap-y-4"
    >
      {/* Izquierda: Copyright */}
      <p className="text-xs sm:text-sm text-[#4A4A4A]/70 font-sans tracking-wide order-3 md:order-1">
        &copy; {new Date().getFullYear()} OOPS! SE PUEDE. Todos los derechos reservados.
      </p>
      
      {/* Centro: Crédito de Ingeniería de Diseño (IA Maker Studio) */}
      <div className="relative w-[180px] h-[40px] opacity-40 hover:opacity-90 transition-opacity duration-300 brightness-0 order-1 md:order-2">
        <Image
          src="/LogoFooterBNTrans.png" 
          alt="Diseñado por IA MAKER STUDIO"
          fill
          style={{ objectFit: "contain" }}
        />
      </div>
      
      {/* Derecha: Redes de Contacto */}
      <div className="flex gap-x-6 text-xs sm:text-sm font-sans tracking-widest uppercase font-semibold text-[#9A7B40] order-2 md:order-3">
        <a 
          href="https://instagram.com/oops.sepuede" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:text-[#1C1C1C] transition-colors duration-200"
        >
          Instagram
        </a>
        <a 
          href="https://wa.me/569xxxxxxxx" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:text-[#1C1C1C] transition-colors duration-200"
        >
          Contacto
        </a>
      </div>
    </motion.footer>
  );
}