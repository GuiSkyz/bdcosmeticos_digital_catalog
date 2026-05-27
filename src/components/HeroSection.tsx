"use client";

import { motion } from "framer-motion";
import { Feather } from "lucide-react";
import Image from "next/image";

interface HeroSectionProps {
  onStartQuiz: () => void;
}

export function HeroSection({ onStartQuiz }: HeroSectionProps) {
  return (
    <section className="relative py-28 md:py-36 px-8 text-center bg-bd-cream overflow-hidden grain-overlay">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image 
          src="/hero-bg.png" 
          alt="Luxury Background" 
          fill 
          priority
          className="object-cover"
        />
        {/* Glass Overlay */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bd-cream/50 to-bd-cream"></div>
      </div>

      {/* Decorative floating elements */}
      <motion.div
        className="absolute top-16 left-[10%] w-20 h-20 rounded-full bg-bd-salmon/5"
        animate={{ y: [0, -12, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-[15%] w-32 h-32 rounded-full bg-bd-salmon/5"
        animate={{ y: [0, 15, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="absolute top-1/2 right-[8%] w-14 h-14 rounded-full bg-bd-salmon/3"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <div className="relative z-10">
        {/* Small decorative logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center mb-6 md:mb-8"
        >
          <Image 
            src="/brand-logo-v2.png" 
            alt="BD Cosméticos" 
            width={180} 
            height={180} 
            className="object-contain w-auto h-12 md:h-16 drop-shadow-sm"
            priority
          />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-5xl md:text-7xl lg:text-8xl font-serif mb-6 text-bd-charcoal leading-tight"
        >
          Luxo em cada{" "}
          <span className="text-bd-salmon-text italic">Gota</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-2xl mx-auto text-bd-warm-gray-text font-light leading-relaxed mb-12 text-base md:text-lg"
        >
          Nossa curadoria importada traz o que há de mais raro na perfumaria mundial.
          Deixe-nos guiar seus sentidos até a sua assinatura perfeita.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex justify-center"
        >
          <button
            onClick={onStartQuiz}
            className="group relative inline-flex items-center gap-3 cursor-pointer"
          >
            <span
              className="border-b-2 border-bd-salmon text-[11px] uppercase tracking-[0.3em] py-2 
                         text-bd-charcoal hover:text-bd-salmon-text transition-colors duration-300 font-semibold"
            >
              Iniciar Consultoria Digital
            </span>
            <motion.span
              className="text-bd-salmon-text"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
