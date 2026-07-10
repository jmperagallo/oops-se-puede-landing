// app/components/sections/ProductosDestacados.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function ProductosDestacados() {
  const productosDestacados = [
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
  ];

  return (
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
          {productosDestacados.map((producto, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-4 md:p-6 text-center group cursor-pointer border-t-4 border-[#D8C7B5]/50"
            >
              <div className="text-5xl md:text-6xl mb-3 group-hover:scale-110 transition duration-300">
                {producto.icon}
              </div>
              <h3 className="font-montserrat font-semibold text-[#1C1C1C] text-sm md:text-base">
                {producto.name}
              </h3>
              <p className="font-montserrat text-[#1C1C1C]/50 text-[10px] md:text-xs mt-1 line-clamp-2">
                {producto.description}
              </p>
              <span className="inline-block mt-2 text-[10px] font-montserrat text-[#B89B5E] bg-[#B89B5E]/10 px-2 py-0.5 rounded-full">
                {producto.category}
              </span>
              <p className="font-playfair text-[#B89B5E] font-bold text-lg md:text-xl mt-2">
                {producto.price}
              </p>
              <button className="mt-3 w-full bg-[#556B5D] text-[#FBF3E0] py-1.5 md:py-2 rounded-full text-xs md:text-sm font-montserrat hover:bg-[#3d4f43] transition shadow-md hover:shadow-lg">
                Agregar +
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            href="/carta"
            className="inline-block border-2 border-[#B89B5E] text-[#B89B5E] px-8 py-3 rounded-full font-montserrat text-sm font-medium hover:bg-[#B89B5E] hover:text-[#FBF3E0] transition"
          >
            Ver Carta Completa →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}