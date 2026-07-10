// app/components/sections/Nosotros.tsx
"use client";

import { motion } from "framer-motion";

export default function Nosotros() {
  return (
    <section id="nosotros" className="py-16 md:py-20 bg-[#FBF3E0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-[#D8C7B5]/30 flex items-center justify-center">
              <div className="text-8xl">🏠</div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#B89B5E]/10 rounded-full blur-2xl" />
            </div>
            <div className="absolute -top-4 -right-4 bg-[#B89B5E] text-[#FBF3E0] px-4 py-2 rounded-full text-sm font-montserrat shadow-lg">
              ✦ Desde 2025
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <span className="font-montserrat text-[#B89B5E] text-sm tracking-[0.2em] uppercase font-medium">
              Nuestra Historia
            </span>
            <h2 className="font-playfair text-3xl md:text-4xl text-[#1C1C1C] mt-2">
              Comer saludable <br />
              <span className="text-[#B89B5E]">sí puede ser delicioso</span>
            </h2>
            <p className="font-montserrat text-[#1C1C1C]/70 leading-relaxed mt-6">
              Somos una cafetería y pastelería especializada en alimentación Keto, 
              sin azúcar, sin gluten y basada en comida real.
            </p>
            <p className="font-montserrat text-[#1C1C1C]/70 leading-relaxed mt-4">
              Pensada para personas que buscan disfrutar sin culpas y también 
              para quienes viven con alergias alimentarias, diabetes o intolerancias.
            </p>
            <p className="font-montserrat text-[#1C1C1C]/70 leading-relaxed mt-4">
              Más que una cafetería, somos un espacio donde lo saludable se siente 
              cálido, elegante y delicioso.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}