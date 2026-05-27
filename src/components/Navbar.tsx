"use client";
import Image from "next/image";

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
      className="w-full py-2 px-6 md:px-10 flex justify-between items-center 
                 border-b border-bd-salmon/10 sticky top-0 z-50 
                 bg-white/90 backdrop-blur-md"
    >
      {/* Logo */}
      <button
        onClick={onLogoClick}
        className="flex items-center gap-3 group cursor-pointer"
      >
        <Image 
          src="/brand-logo-v2.png" 
          alt="BD Cosméticos Logo" 
          width={120} 
          height={120} 
          className="object-contain hover:opacity-80 transition-opacity duration-300 w-auto h-12 md:h-16"
        />
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
