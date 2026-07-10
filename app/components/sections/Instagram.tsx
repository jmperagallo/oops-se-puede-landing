// app/components/sections/Instagram.tsx
"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Instagram() {
  useEffect(() => {
    if (!document.querySelector('script[src="//www.instagram.com/embed.js"]')) {
      const script = document.createElement("script");
      script.async = true;
      script.src = "//www.instagram.com/embed.js";
      document.body.appendChild(script);
    }
  }, []);

  return (
    <section className="py-16 md:py-20 bg-[#FBF3E0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <span className="font-montserrat text-[#B89B5E] text-sm tracking-[0.2em] uppercase font-medium">
            Síguenos
          </span>
          <h2 className="font-playfair text-3xl md:text-4xl text-[#1C1C1C] mt-1">
            ✦ Nuestro Instagram ✦
          </h2>
          <p className="font-montserrat text-[#1C1C1C]/60 mt-2 max-w-md mx-auto">
            Lo que estamos creando en tiempo real
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full"
        >
          <div
            className="w-full instagram-feed-wrapper"
            dangerouslySetInnerHTML={{
              __html: `
                <blockquote 
                  class="instagram-media" 
                  data-instgrm-permalink="https://www.instagram.com/oops.sepuede/" 
                  data-instgrm-version="14" 
                  style="
                    background: #FBF3E0; 
                    border: none;
                    padding: 0;
                    margin: 0 auto;
                    max-width: 100%;
                    width: 100%;
                    min-width: 0;
                    box-shadow: none;
                  "
                >
                </blockquote>
              `,
            }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-8 md:mt-12"
        >
          <Link
            href="https://www.instagram.com/oops.sepuede"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border-2 border-[#B89B5E] text-[#B89B5E] px-8 py-3 rounded-full font-montserrat text-sm font-medium hover:bg-[#B89B5E] hover:text-[#FBF3E0] transition"
          >
            Ver más en Instagram →
          </Link>
        </motion.div>
        
      </div>

      <style jsx>{`
        .instagram-feed-wrapper :global(.instagram-media) {
          background: #FBF3E0 !important;
          border: none !important;
          padding: 0 !important;
          margin: 0 !important;
          box-shadow: none !important;
        }
        
        .instagram-feed-wrapper :global(.instagram-media) > div:first-child {
          display: none !important;
        }
        .instagram-feed-wrapper :global(.instagram-media) > div:last-child {
          display: none !important;
        }
        .instagram-feed-wrapper :global(.instagram-media) > div:nth-child(2) {
          width: 100% !important;
          max-width: 100% !important;
        }
        .instagram-feed-wrapper :global(.instagram-media) img {
          width: 100% !important;
          height: auto !important;
        }
      `}</style>
    </section>
  );
}