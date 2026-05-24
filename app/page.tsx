"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.6, delayChildren: 0.4 }
    }
  };

  // 1️⃣ AQUÍ ESTÁ EL FIX DE TYPESCRIPT: ease: "easeOut"
  const itemVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)", 
      transition: { duration: 1.2, ease: "easeOut" } 
    }
  };

  return (
    <main className="relative min-h-screen w-full bg-[#F8F6F2] flex items-center justify-center overflow-hidden font-sans antialiased">
      
      {/* 🎬 VIDEO DE FONDO */}
      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0 opacity-40">
        <source src="/Video Granos Cafe.mp4" type="video/mp4" />
      </video>
      
      {/* 🤍 CAPA BLANCA TRANSPARENTE SOBRE TODA LA PANTALLA */}
      <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-white/80 z-0 pointer-events-none" />

      <AnimatePresence mode="wait">
        
        {/* FASE 1: PRÓXIMAMENTE */}
        {phase === "incoming" && (
          <motion.div
            key="incoming"
            initial={{ opacity: 0, filter: "blur(10px)", scale: 0.9 }}
            animate={{ opacity: [0, 1, 1, 0], filter: ["blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"], scale: 1 }}
            transition={{ duration: 2.8, times: [0, 0.2, 0.8, 1], ease: "easeInOut" }}
            className="relative z-10 w-full text-center px-4"
          >
            <h2 className="text-[4rem] sm:text-[7rem] md:text-[10rem] lg:text-[14rem] font-light tracking-[0.15em] text-[#9A7B40] uppercase ml-[0.15em] leading-none drop-shadow-sm">
              Próximamente
            </h2>
          </motion.div>
        )}

        {/* FASE 2: CONTEO */}
        {phase === "countdown" && count > 0 && (
          <motion.div
            key={`count-${count}`}
            initial={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
            animate={{ opacity: [0, 1, 1, 0], scale: [0.9, 1, 1, 1.1], filter: ["blur(8px)", "blur(0px)", "blur(0px)", "blur(8px)"] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.95, times: [0, 0.15, 0.85, 1] }}
            className="absolute inset-0 flex items-center justify-center z-10"
          >
            <h1 className="text-[5.5rem] sm:text-[9rem] md:text-[13rem] lg:text-[18rem] font-serif italic font-medium text-[#1C1C1C] select-none leading-none drop-shadow-sm">
              {count}
            </h1>
          </motion.div>
        )}

        {/* FASE 3: REVELACIÓN EDITORIAL */}
        {phase === "reveal" && (
          <motion.div
            key="reveal"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center"
          >
            <div className="relative w-full max-w-screen-2xl flex flex-col items-center">

              {/* 1. LOGO GIGANTE */}
              <motion.div 
                variants={itemVariants} 
                className="relative w-full max-w-[720px] h-[300px] md:max-w-[1320px] md:h-[480px] mb-16 brightness-0 opacity-90"
              >
                <Image
                  src="/Logo Transparente.png"
                  alt="OOPS! SE PUEDE KETO BAKED"
                  fill
                  style={{ objectFit: "contain" }}
                  priority
                />
              </motion.div>

              {/* 2. TÍTULO EMOCIONAL */}
              <motion.h3 
                variants={itemVariants} 
                className="text-3xl sm:text-5xl md:text-6xl font-sans font-extrabold text-[#1C1C1C] tracking-tight max-w-4xl leading-[1.2] mb-8"
              >
                &quot;El placer de disfrutar sin culpas <br className="hidden sm:block" /> está por comenzar.&quot;
              </motion.h3>

              {/* Linea divisoria */}
              <motion.div variants={itemVariants} className="w-16 h-[2px] bg-[#B89B5E] mb-8" />

              {/* 3. TEXTO EDITORIAL */}
              <motion.p 
                variants={itemVariants} 
                className="text-lg sm:text-2xl md:text-3xl font-serif italic text-[#4A4A4A] max-w-3xl leading-relaxed mb-12 font-medium"
              >
                OOPS! SE PUEDE... Muy pronto, una pastelería artesanal premium y café de especialidad diseñados para tu bienestar llegarán a su sitio web.
              </motion.p>

              
              {/* 3. TEXTO EDITORIAL */}
              <motion.p 
                variants={itemVariants} 
                className="text-lg sm:text-2xl md:text-3xl font-serif italic text-[#4A4A4A] max-w-3xl leading-relaxed mb-12 font-medium"
              >
                OOPS! SE PUEDE... Muy pronto, una pastelería artesanal premium y café de especialidad diseñados para tu bienestar llegarán a su sitio web.
              </motion.p>

              {/* 4. PILARES */}
              <motion.div 
                variants={itemVariants} 
                className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-sm sm:text-lg md:text-xl tracking-[0.2em] text-[#9A7B40] uppercase font-bold"
              >
                <span>Keto</span>
                <span className="text-[#1C1C1C]/20 select-none">•</span>
                <span>Sin Azúcar</span>
                <span className="text-[#1C1C1C]/20 select-none">•</span>
                <span>Sin Gluten</span>
                <span className="text-[#1C1C1C]/20 select-none">•</span>
                <span>Comida Real</span>
              </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}