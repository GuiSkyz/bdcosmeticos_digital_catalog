"use client";

import { motion } from "framer-motion";
import { Feather } from "lucide-react";

interface HeroSectionProps {
  onStartQuiz: () => void;
}

export function HeroSection({ onStartQuiz }: HeroSectionProps) {
  return (
    <section className="relative py-28 md:py-36 px-8 text-center bg-bd-cream overflow-hidden grain-overlay">
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
        {/* Small decorative icon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <div className="w-14 h-14 rounded-2xl bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm">
            <Feather size={22} className="text-bd-salmon" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-5xl md:text-7xl lg:text-8xl font-serif mb-6 text-bd-charcoal leading-tight"
        >
          Luxo em cada{" "}
          <span className="text-bd-salmon italic">Gota</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-2xl mx-auto text-bd-warm-gray font-light leading-relaxed mb-12 text-base md:text-lg"
        >
          Nossa curadoria árabe traz o que há de mais raro na perfumaria mundial.
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
                         text-bd-charcoal hover:text-bd-salmon transition-colors duration-300 font-semibold"
            >
              Iniciar Consultoria Digital
            </span>
            <motion.span
              className="text-bd-salmon"
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
