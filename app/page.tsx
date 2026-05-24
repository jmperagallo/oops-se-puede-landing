"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Footer from "@/components/Footer";

export default function Home() {
  const [phase, setPhase] = useState<"incoming" | "countdown" | "reveal">("incoming");
  const [count, setCount] = useState(5);

  useEffect(() => {
    const incomingTimeout = setTimeout(() => setPhase("countdown"), 3000);
    return () => clearTimeout(incomingTimeout);
  }, []);

  useEffect(() => {
    if (phase !== "countdown") return;
    if (count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setPhase("reveal");
    }
  }, [count, phase]);

  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.6, delayChildren: 0.4 }
    }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 25, filter: "blur(8px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)", 
      transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <main className="relative min-h-screen w-full bg-[#F8F6F2] flex flex-col justify-between overflow-x-hidden font-sans antialiased">
      
      {/* 🎬 VIDEO DE FONDO */}
      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0 opacity-40">
        <source src="/Video Granos Cafe.mp4" type="video/mp4" />
      </video>
      
      {/* 🤍 CAPA BLANCA EDITORIAL */}
      <div className="absolute inset-0 bg-white/50 backdrop-blur-[2px] z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/70 z-0 pointer-events-none" />

      {/* Espaciador superior */}
      <div className="h-4 md:h-16 z-10" />

      <AnimatePresence mode="wait">
        
        {/* FASE 1: PRÓXIMAMENTE */}
        {phase === "incoming" && (
          <motion.div
            key="incoming"
            initial={{ opacity: 0, filter: "blur(10px)", scale: 0.9 }}
            animate={{ opacity: [0, 1, 1, 0], filter: ["blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"], scale: 1 }}
            transition={{ duration: 2.8, times: [0, 0.2, 0.8, 1], ease: "easeInOut" }}
            className="relative z-10 w-full text-center px-4 my-auto"
          >
            <h2 className="text-[2.5rem] sm:text-[6rem] md:text-[10rem] lg:text-[14rem] font-light tracking-[0.12em] text-[#9A7B40] uppercase ml-[0.12em] leading-none drop-shadow-sm">
              Próximamente
            </h2>
          </motion.div>
        )}

        {/* FASE 2: CONTEO (Corregido para centrado absoluto perfecto) */}
        {phase === "countdown" && count > 0 && (
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
            <motion.div
              key={`count-${count}`}
              initial={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
              animate={{ opacity: [0, 1, 1, 0], scale: [0.9, 1, 1, 1.1], filter: ["blur(8px)", "blur(0px)", "blur(0px)", "blur(8px)"] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.95, times: [0, 0.15, 0.85, 1] }}
              className="text-center"
            >
              <h1 className="text-[4.5rem] sm:text-[8rem] md:text-[13rem] lg:text-[18rem] font-serif italic font-medium text-[#1C1C1C] select-none leading-none drop-shadow-sm">
                {count}
              </h1>
            </motion.div>
          </div>
        )}

        {/* FASE 3: REVELACIÓN EDITORIAL */}
        {phase === "reveal" && (
          <motion.div
            key="reveal"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative z-20 w-full flex flex-col items-center justify-center p-4 sm:p-8 md:p-12 text-center my-auto"
          >
            <div className="w-full max-w-screen-2xl flex flex-col items-center py-2">

              {/* 🎯 LOGO TRIPLICADO Y RESPONSIVO */}
              <motion.div 
                variants={itemVariants} 
                className="relative w-full max-w-[320px] h-[140px] sm:max-w-[600px] sm:h-[260px] md:max-w-[1000px] md:h-[420px] lg:max-w-[1500px] lg:h-[550px] mb-6 md:mb-10 brightness-0 opacity-90"
              >
                <Image
                  src="/Logo Transparente.png"
                  alt="OOPS! SE PUEDE KETO BAKED"
                  fill
                  style={{ objectFit: "contain" }}
                  priority
                />
              </motion.div>

              {/* TÍTULO EMOCIONAL */}
              <motion.h3 
                variants={itemVariants} 
                className="text-xl sm:text-4xl md:text-5xl lg:text-6xl font-sans font-extrabold text-[#1C1C1C] tracking-tight max-w-5xl leading-[1.3] mb-6 md:mb-8 px-2"
              >
                &quot;El placer de disfrutar sin culpas <br className="hidden sm:block" /> está por comenzar.&quot;
              </motion.h3>

              <motion.div variants={itemVariants} className="w-12 sm:w-16 h-[2px] bg-[#B89B5E] mb-6 md:mb-8" />

              {/* TEXTO EDITORIAL */}
              <motion.p 
                variants={itemVariants} 
                className="text-base sm:text-xl md:text-2xl lg:text-3xl font-serif italic text-[#4A4A4A] max-w-3xl leading-relaxed mb-8 md:mb-12 font-medium px-2"
              >
                OOPS! SE PUEDE... Muy pronto, una pastelería artesanal premium y café de especialidad diseñados para tu bienestar llegarán a su sitio web.
              </motion.p>

              {/* PILARES DE MARCA */}
              <motion.div 
                variants={itemVariants} 
                className="flex flex-wrap justify-center items-center gap-x-3 gap-y-2 text-xs sm:text-base md:text-lg lg:text-xl tracking-[0.15em] sm:tracking-[0.2em] text-[#9A7B40] uppercase font-bold px-4"
              >
                <span>Keto</span>
                <span className="text-[#1C1C1C]/20 select-none text-xs sm:text-base">•</span>
                <span>Sin Azúcar</span>
                <span className="text-[#1C1C1C]/20 select-none text-xs sm:text-base">•</span>
                <span>Sin Gluten</span>
                <span className="text-[#1C1C1C]/20 select-none text-xs sm:text-base">•</span>
                <span>Comida Real</span>
              </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🌟 LLAMADA AL MÓDULO DEL FOOTER (Corregido etiqueta externa) */}
      <Footer phase={phase} />

    </main>
  );
}