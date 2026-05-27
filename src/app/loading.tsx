"use client";

import { motion } from "framer-motion";
import { Droplets } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      <motion.div
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.5, 1, 0.5] 
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="w-16 h-16 rounded-2xl bg-bd-cream flex items-center justify-center mb-6"
      >
        <Droplets size={24} className="text-bd-salmon" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center"
      >
        <h2 className="text-xl font-serif text-bd-charcoal tracking-widest mb-2">BD COSMÉTICOS</h2>
        <p className="text-xs text-bd-warm-gray uppercase tracking-widest font-light">
          Preparando a coleção...
        </p>
      </motion.div>
    </div>
  );
}
