// app/page.tsx
"use client";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./components/sections/Hero";
import ProductosDestacados from "./components/sections/ProductosDestacados";
import Nosotros from "./components/sections/Nosotros";
import Ubicacion from "./components/sections/Ubicacion";
import Instagram from "./components/sections/Instagram"; // 👈 NUEVA LÍNEA

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen font-sans antialiased">
        <Hero />
        <ProductosDestacados />
        <Nosotros />
        <Ubicacion />
        <Instagram /> {/* 👈 AQUÍ SE AGREGA EL NUEVO MÓDULO */}
      </main>
      <Footer />
    </>
  );
}