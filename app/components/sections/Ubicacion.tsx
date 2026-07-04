"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Ubicacion() {
  return (
    <section className="py-16 md:py-20 bg-[#969E75]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-playfair text-3xl md:text-4xl text-[#F8F6F2]">
            ✦ Visítanos ✦
          </h2>
          <p className="font-montserrat text-[#F8F6F2]/80 mt-2">
            Ven a disfrutar de una experiencia única
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl overflow-hidden shadow-xl h-[300px] lg:h-[400px]"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3345.123456789!2d-71.5123456!3d-32.9123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzLCsDU0JzQ0LjUiUyA3McKwMzAnNDQuNSJX!5e0!3m2!1ses!2scl!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
              title="Ubicación OOPS! SE PUEDE"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#F8F6F2] rounded-2xl p-8 shadow-xl flex flex-col justify-center"
          >
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <span className="text-2xl">📍</span>
                <div>
                  <p className="font-montserrat font-semibold text-[#1C1C1C]">Dirección</p>
                  <p className="font-montserrat text-[#1C1C1C]/70">
                    Av. Blanca Estela 1560, Concón
                  </p>
                  <p className="font-montserrat text-[#1C1C1C]/50 text-sm">
                    Strip Center Dúo
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="text-2xl">🕐</span>
                <div>
                  <p className="font-montserrat font-semibold text-[#1C1C1C]">Horario</p>
                  <p className="font-montserrat text-[#1C1C1C]/70">
                    Lun - Sáb: 09:30 - 20:00
                  </p>
                  <p className="font-montserrat text-[#1C1C1C]/70">
                    Dom: 09:30 - 19:00
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="text-2xl">📞</span>
                <div>
                  <p className="font-montserrat font-semibold text-[#1C1C1C]">Contacto</p>
                  <p className="font-montserrat text-[#1C1C1C]/70">
                    +56 9 1234 5678
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mt-8 pt-8 border-t border-[#D8C7B5]/30">
              <Link
                href="https://wa.me/56912345678"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-[#556B5D] text-[#F8F6F2] px-6 py-3 rounded-full text-center font-montserrat text-sm hover:bg-[#3d4f43] transition shadow-lg flex items-center justify-center gap-2"
              >
                <span>📱</span> Pedir por WhatsApp
              </Link>
              <Link
                href="/contacto"
                className="flex-1 border border-[#556B5D] text-[#556B5D] px-6 py-3 rounded-full text-center font-montserrat text-sm hover:bg-[#556B5D] hover:text-[#F8F6F2] transition"
              >
                Contactar
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}