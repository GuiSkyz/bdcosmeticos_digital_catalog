"use client";

import { motion } from "framer-motion";
import { Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  onLogoClick: () => void;
  onQuizClick: () => void;
}

export function Navbar({ onLogoClick, onQuizClick }: NavbarProps) {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full py-4 px-4 sm:px-6 md:px-10 flex justify-between items-center 
                 border-b border-bd-salmon/10 sticky top-0 z-50 
                 bg-white/90 backdrop-blur-md"
    >
      {/* Logo */}
      <button
        onClick={onLogoClick}
        className="flex items-center gap-2 sm:gap-3 group cursor-pointer"
      >
        <div
          className="hidden sm:flex w-9 h-9 rounded-xl bg-bd-cream items-center justify-center 
                        group-hover:bg-bd-salmon/20 transition-colors duration-300"
        >
          <Droplets size={16} className="text-bd-salmon" />
        </div>
        <span className="text-base sm:text-lg md:text-xl font-serif tracking-[0.15em] sm:tracking-[0.2em] text-bd-charcoal">
          BD COSMÉTICOS
        </span>
      </button>

      {/* CTA */}
      <Button
        onClick={onQuizClick}
        className="bg-bd-charcoal text-white text-[10px] px-6 py-2 h-auto rounded-full 
                   uppercase tracking-widest font-semibold
                   hover:bg-bd-salmon transition-all duration-300 
                   shadow-sm hover:shadow-lg cursor-pointer"
      >
        Quiz Olfativo
      </Button>
    </motion.nav>
  );
}
