// app/components/admin/AdminHome.tsx
"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MODULOS } from "./Modulos";

export default function AdminHome() {
  const { data: session } = useSession();
  const nombre = session?.user?.name || "Admin";

  return (
    <div className="p-4 md:p-6 bg-[#F8F6F2] min-h-[calc(100vh-64px)]">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <h1 className="font-playfair text-3xl md:text-4xl text-[#1C1C1C]">
          ¡Hola, {nombre}! 👋
        </h1>
        <p className="font-montserrat text-[#95a5a6] mt-2 text-sm md:text-base">
          Selecciona un módulo para comenzar a trabajar
        </p>
        <div className="w-16 h-1 bg-[#B89B5E] mx-auto mt-4 rounded-full" />
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
        {MODULOS.map((modulo, index) => (
          <motion.div
            key={modulo.slug}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.06 }}
          >
            <Link
              href={modulo.href}
              className="group block bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 text-center border-2 border-transparent hover:border-[#B89B5E] hover:-translate-y-1"
            >
              <div className="text-5xl md:text-6xl mb-3 group-hover:scale-110 transition-transform duration-300">
                {modulo.icon}
              </div>
              <h3 className="font-montserrat font-semibold text-[#1C1C1C] text-sm md:text-base">
                {modulo.label}
              </h3>
              <p className="text-xs text-[#95a5a6] mt-1 line-clamp-2">{modulo.desc}</p>
              <div className="w-8 h-0.5 bg-[#B89B5E] mx-auto mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 text-center text-xs text-[#95a5a6] border-t border-[#D8C7B5]/30 pt-6">
        <span>💡 Sistema de administración OOPS! SE PUEDE v1.0</span>
      </div>
    </div>
  );
}