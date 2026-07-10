// app/components/sections/Hero.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#FBF3E0]">
      
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-40"
        >
          <source src="/Video Granos Cafe.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#FBF3E0]/60 backdrop-blur-[2px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block font-montserrat text-[#B89B5E] text-sm tracking-[0.3em] uppercase mb-4 font-medium">
              Keto Baked · Specialty Coffee
            </span>

            <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-[#1C1C1C] leading-[1.1]">
              OOPS!
              <br />
              <span className="text-[#B89B5E]">SE PUEDE</span>
            </h1>

            <p className="font-serif text-lg sm:text-xl text-[#1C1C1C]/70 italic mt-6 max-w-lg">
              "Transformamos la pastelería saludable en una verdadera experiencia."
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                href="/carta"
                className="bg-[#556B5D] text-[#FBF3E0] px-8 py-3.5 rounded-full font-montserrat text-sm font-medium hover:bg-[#3d4f43] transition shadow-lg hover:shadow-xl"
              >
                Ver Carta
              </Link>
              <Link
                href="#nosotros"
                className="border-2 border-[#B89B5E] text-[#B89B5E] px-8 py-3.5 rounded-full font-montserrat text-sm font-medium hover:bg-[#B89B5E] hover:text-[#FBF3E0] transition"
              >
                Nuestra Historia
              </Link>
            </div>

            <div className="flex flex-wrap gap-2 mt-10">
              {['Keto', 'Sin Azúcar', 'Sin Gluten', 'Comida Real', 'Café de Especialidad'].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-1.5 bg-white/80 backdrop-blur-sm border border-[#1C1C1C]/10 text-[#1C1C1C]/80 text-xs font-montserrat rounded-full shadow-sm"
                >
                  ✦ {tag}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center"
          >
            <div className="relative w-full max-w-md aspect-square">
              <div className="w-full h-full rounded-3xl overflow-hidden shadow-2xl border border-white/50">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src="/Video Granos Cafe.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/10" />
              </div>
              
              <div className="absolute -bottom-4 -right-4 sm:bottom-0 sm:right-0 bg-white rounded-2xl shadow-xl p-4 max-w-[180px] border border-[#D8C7B5]/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#556B5D]/10 rounded-full flex items-center justify-center">
                    <span className="text-2xl">☕</span>
                  </div>
                  <div>
                    <p className="font-montserrat text-[10px] text-[#1C1C1C]/60 uppercase tracking-wider">
                      Destacado
                    </p>
                    <p className="font-playfair text-sm text-[#1C1C1C] font-semibold">
                      Café de Especialidad
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}