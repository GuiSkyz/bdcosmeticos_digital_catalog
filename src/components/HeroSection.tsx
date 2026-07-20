"use client";

import { motion } from "framer-motion";
import { Feather, ChevronDown } from "lucide-react";
import Image from "next/image";

interface HeroSectionProps {
  onStartQuiz: () => void;
}

export function HeroSection({ onStartQuiz }: HeroSectionProps) {
  // Configuração para o efeito de máquina de escrever
  const subtitle = "Nossa curadoria importada traz o que há de mais raro na perfumaria mundial. Deixe-nos guiar seus sentidos até a sua assinatura perfeita.";
  
  return (
    <section className="relative py-28 md:py-36 px-8 text-center bg-bd-cream overflow-hidden grain-overlay flex flex-col justify-center min-h-[90vh]">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image 
          src="/hero-bg.png" 
          alt="Luxury Background" 
          fill 
          priority
          className="object-cover"
        />
        {/* Subtle Glass Overlay (15%) */}
        <div className="absolute inset-0 bg-white/15 backdrop-blur-[2px]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bd-cream/30 to-bd-cream"></div>
      </div>



      <div className="relative z-10 flex flex-col items-center flex-1 justify-center">
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

        {/* Subtitle with Fade-In effect */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-2xl mx-auto text-bd-warm-gray-text font-light leading-relaxed mb-12 text-base md:text-lg inline-block"
        >
          {subtitle}
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }} // Delay reduzido
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

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }} // Aparece logo após o CTA
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-bd-warm-gray-text/60"
      >
        <span className="text-[9px] uppercase tracking-[0.3em] font-medium">Descubra</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={18} strokeWidth={1.5} />
        </motion.div>
      </motion.div>
    </section>
  );
}

