"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#F8F6F2] font-sans antialiased">
        
        {/* ========================================= */}
        {/* HERO SECTION */}
        {/* ========================================= */}
        <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-[#F8F6F2] via-[#F8F6F2] to-[#e8e0d6]">
          
          {/* Decoración de fondo */}
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#B89B5E]/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#556B5D]/5 rounded-full blur-3xl" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 w-full">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              
              {/* Columna Izquierda - Texto */}
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
                    className="bg-[#556B5D] text-[#F8F6F2] px-8 py-3.5 rounded-full font-montserrat text-sm font-medium hover:bg-[#3d4f43] transition shadow-lg hover:shadow-xl"
                  >
                    Ver Carta
                  </Link>
                  <Link
                    href="#nosotros"
                    className="border-2 border-[#B89B5E] text-[#B89B5E] px-8 py-3.5 rounded-full font-montserrat text-sm font-medium hover:bg-[#B89B5E] hover:text-[#F8F6F2] transition"
                  >
                    Nuestra Historia
                  </Link>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-10">
                  {['Keto', 'Sin Azúcar', 'Sin Gluten', 'Comida Real', 'Café de Especialidad'].map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-1.5 bg-white/80 backdrop-blur-sm border border-[#D8C7B5]/50 text-[#1C1C1C]/80 text-xs font-montserrat rounded-full shadow-sm"
                    >
                      ✦ {tag}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Columna Derecha - Imagen Hero */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative flex justify-center"
              >
                <div className="relative w-full max-w-md aspect-square">
                  <div className="w-full h-full rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-tr from-[#D8C7B5]/40 to-[#D8C7B5]/10 flex items-center justify-center border border-white/50">
                    {/* Aquí va la imagen real del producto estrella */}
                    <div className="text-9xl opacity-90 drop-shadow-2xl">🥐</div>
                  </div>
                  {/* Badge flotante */}
                  <div className="absolute -bottom-4 -right-4 sm:bottom-0 sm:right-0 bg-white rounded-2xl shadow-xl p-4 max-w-[180px] border border-[#D8C7B5]/30">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#556B5D]/10 rounded-full flex items-center justify-center">
                        <span className="text-2xl">🌟</span>
                      </div>
                      <div>
                        <p className="font-montserrat text-[10px] text-[#1C1C1C]/60 uppercase tracking-wider">
                          Lo más pedido
                        </p>
                        <p className="font-playfair text-sm text-[#1C1C1C] font-semibold">
                          Croissant Keto
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ========================================= */}
        {/* SECCIÓN "LO MÁS PEDIDO" - CON PRODUCTOS REALES */}
        {/* ========================================= */}
        <section className="py-16 md:py-20 bg-[#F8F6F2]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <span className="font-montserrat text-[#B89B5E] text-sm tracking-[0.2em] uppercase font-medium">
                Lo más pedido
              </span>
              <h2 className="font-playfair text-3xl md:text-4xl text-[#1C1C1C] mt-1">
                ✦ Nuestros favoritos ✦
              </h2>
              <p className="font-montserrat text-[#1C1C1C]/60 mt-2 max-w-md mx-auto">
                Los productos que nuestros clientes aman y repiten
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {[
                { 
                  icon: '🥐', 
                  name: 'Croissant Keto', 
                  price: '$3.990',
                  description: 'Pan keto crujiente, perfecto para acompañar',
                  category: 'Panadería'
                },
                { 
                  icon: '🍋', 
                  name: 'Tarta de Limón', 
                  price: '$11.990',
                  description: 'Base de almendras, crema condensada, merengue suizo',
                  category: 'Tartas'
                },
                { 
                  icon: '🫐', 
                  name: 'Cheesecake Berries', 
                  price: '$5.900',
                  description: 'Galleta de almendras, queso crema y berries',
                  category: 'Cheesecakes'
                },
                { 
                  icon: '🍵', 
                  name: 'Alfajor Pistacho & Matcha', 
                  price: '$6.900',
                  description: 'Bizcocho de almendras, matcha y pistacho',
                  category: 'Alfajores Premium'
                },
              ].map((producto, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-4 md:p-6 text-center group cursor-pointer border border-[#D8C7B5]/20"
                >
                  {/* Emoji/Imagen del producto */}
                  <div className="text-5xl md:text-6xl mb-3 group-hover:scale-110 transition duration-300">
                    {producto.icon}
                  </div>
                  
                  {/* Nombre del producto */}
                  <h3 className="font-montserrat font-semibold text-[#1C1C1C] text-sm md:text-base">
                    {producto.name}
                  </h3>
                  
                  {/* Descripción corta */}
                  <p className="font-montserrat text-[#1C1C1C]/50 text-[10px] md:text-xs mt-1 line-clamp-2">
                    {producto.description}
                  </p>
                  
                  {/* Categoría */}
                  <span className="inline-block mt-2 text-[10px] font-montserrat text-[#B89B5E] bg-[#B89B5E]/10 px-2 py-0.5 rounded-full">
                    {producto.category}
                  </span>
                  
                  {/* Precio */}
                  <p className="font-playfair text-[#B89B5E] font-bold text-lg md:text-xl mt-2">
                    {producto.price}
                  </p>
                  
                  {/* Botón Agregar */}
                  <button className="mt-3 w-full bg-[#556B5D] text-[#F8F6F2] py-1.5 md:py-2 rounded-full text-xs md:text-sm font-montserrat hover:bg-[#3d4f43] transition shadow-md hover:shadow-lg">
                    Agregar +
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Botón Ver Carta Completa */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center mt-12"
            >
              <Link
                href="/carta"
                className="inline-block border-2 border-[#B89B5E] text-[#B89B5E] px-8 py-3 rounded-full font-montserrat text-sm font-medium hover:bg-[#B89B5E] hover:text-[#F8F6F2] transition"
              >
                Ver Carta Completa →
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ========================================= */}
        {/* SECCIÓN "NOSOTROS" */}
        {/* ========================================= */}
        <section id="nosotros" className="py-16 md:py-20 bg-[#D8C7B5]/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              
              {/* Imagen */}
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
                <div className="absolute -top-4 -right-4 bg-[#B89B5E] text-[#F8F6F2] px-4 py-2 rounded-full text-sm font-montserrat shadow-lg">
                  ✦ Desde 2025
                </div>
              </motion.div>

              {/* Texto */}
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

        {/* ========================================= */}
        {/* SECCIÓN "UBICACIÓN" */}
        {/* ========================================= */}
        <section className="py-16 md:py-20 bg-[#F8F6F2]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="font-playfair text-3xl md:text-4xl text-[#1C1C1C]">
                ✦ Visítanos ✦
              </h2>
              <p className="font-montserrat text-[#1C1C1C]/60 mt-2">
                Ven a disfrutar de una experiencia única
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8">
              
              {/* Mapa */}
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

              {/* Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-2xl p-8 shadow-xl flex flex-col justify-center"
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

                <div className="flex flex-wrap gap-4 mt-8 pt-8 border-t border-[#D8C7B5]/50">
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
                    className="flex-1 border border-[#B89B5E] text-[#B89B5E] px-6 py-3 rounded-full text-center font-montserrat text-sm hover:bg-[#B89B5E] hover:text-[#F8F6F2] transition"
                  >
                    Contactar
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}