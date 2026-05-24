"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface FooterProps {
  phase: "incoming" | "countdown" | "reveal";
}

export default function Footer({ phase }: FooterProps) {
  return (
    <AnimatePresence>
      {phase === "reveal" && (
        <motion.footer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{
            duration: 1.2,
            ease: "easeOut",
          }}
          // Layout simplificado: 100% vertical (flex flex-col items-center)
          // y centrado para coincidir con lo que ves en tu localhost.
          className="
            relative 
            z-40
            w-full
            max-w-screen-2xl
            mx-auto

            px-5
            py-8
            md:px-10

            flex
            flex-col
            items-center
            justify-center

            gap-y-6

            text-[#1C1C1C]/80

            backdrop-blur-[2px]
            bg-transparent
          "
        >

          {/* ========================================= */}
          {/* LOGO IA MAKER (AGRANDADO A PEDIDO) */}
          {/* ========================================= */}
          <div className="flex justify-center items-center">
            {/* 🔥 Aquí está el cambio: w-[200px] h-[45px] en móvil y md:w-[260px] md:h-[58px] en escritorio. Es considerablemente más grande. */}
            <div className="relative w-[200px] h-[45px] md:w-[260px] md:h-[58px] opacity-60 hover:opacity-100 transition-opacity duration-300 brightness-0">
              <Image
                src="/LogoFooterBNTrans.png" 
                alt="Diseñado e Ingenierizado por IA MAKER STUDIO"
                fill
                style={{ objectFit: "contain" }} // Asegura que el logo no se deforme al crecer.
              />
            </div>
          </div>

          {/* ========================================= */}
          {/* COPYRIGHT CENTRADO */}
          {/* ========================================= */}
          <div className="text-center">
            <span className="text-[11px] sm:text-xs md:text-sm tracking-[0.04em]">
              &copy; {new Date().getFullYear()} OOPS! SE PUEDE. Todos los derechos reservados.
            </span>
          </div>

        </motion.footer>
      )}
    </AnimatePresence>
  );
}