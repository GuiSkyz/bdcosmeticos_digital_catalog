"use client";

import { motion } from "framer-motion";
import { ChevronRight, Clock, Wind } from "lucide-react";
import type { Perfume } from "@/data/perfumes";

interface PerfumeCardProps {
  perfume: Perfume;
  onClick: () => void;
  index: number;
  layout?: "grid" | "list";
}

export function PerfumeCard({
  perfume,
  onClick,
  index,
  layout = "grid",
}: PerfumeCardProps) {
  if (layout === "list") {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
        onClick={onClick}
        className="group cursor-pointer flex items-center gap-6 md:gap-8 p-4 md:p-5 
                   rounded-2xl border border-transparent hover:border-bd-salmon/20 
                   hover:bg-bd-cream/50 hover:shadow-lg transition-all duration-300"
      >
        {/* Image */}
        <div
          className="w-20 h-24 md:w-24 md:h-28 flex-shrink-0 bg-bd-cream rounded-xl 
                      p-3 flex items-center justify-center overflow-hidden"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={perfume.visuals.imagePrompt}
            className="max-h-full transition-transform duration-500 group-hover:scale-105"
            alt={perfume.name}
            loading="lazy"
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h3 className="text-lg md:text-xl font-serif text-bd-charcoal group-hover:text-bd-salmon transition-colors duration-300 truncate">
                {perfume.name}
              </h3>
              <p className="text-[9px] text-bd-salmon uppercase tracking-[0.2em] font-bold mt-0.5">
                {perfume.brand} • {perfume.olfactory.family}
              </p>
            </div>
            <ChevronRight
              size={18}
              className="text-bd-salmon/40 group-hover:text-bd-salmon group-hover:translate-x-1 
                         transition-all duration-300 flex-shrink-0 mt-1"
            />
          </div>

          <p className="text-xs text-bd-warm-gray font-light leading-relaxed mt-2 line-clamp-2 hidden sm:block">
            {perfume.shortDescription}
          </p>

          {/* Quick Stats */}
          <div className="flex items-center gap-4 mt-2.5">
            <span className="inline-flex items-center gap-1 text-[10px] text-bd-warm-gray">
              <Clock size={11} className="text-bd-salmon/60" />
              {perfume.performance.longevity}
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] text-bd-warm-gray">
              <Wind size={11} className="text-bd-salmon/60" />
              {perfume.performance.sillage}
            </span>
          </div>
        </div>
      </motion.div>
    );
  }

  // Grid layout — e-commerce vitrine style
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
      onClick={onClick}
      className="group cursor-pointer max-w-[260px] mx-auto w-full"
    >
      {/* Image Container — compact vitrine */}
      <div
        className="aspect-square bg-bd-cream rounded-xl overflow-hidden mb-3 p-4 
                    flex items-center justify-center transition-all duration-400
                    group-hover:shadow-lg border border-transparent group-hover:border-bd-salmon/20"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={perfume.visuals.imagePrompt}
          className="max-h-[160px] object-contain transition-transform duration-500 ease-out group-hover:scale-105"
          alt={perfume.name}
          loading="lazy"
        />
      </div>

      {/* Info — compact */}
      <div>
        <h3 className="text-sm font-serif mb-0.5 text-bd-charcoal group-hover:text-bd-salmon transition-colors duration-300">
          {perfume.name}
        </h3>
        <p className="text-[8px] text-bd-salmon uppercase tracking-[0.2em] font-bold mb-1">
          {perfume.brand}
        </p>
        <p className="text-[11px] text-bd-warm-gray line-clamp-2 font-light leading-snug">
          {perfume.shortDescription}
        </p>
      </div>
    </motion.div>
  );
}
