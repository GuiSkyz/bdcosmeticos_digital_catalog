"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronRight, Clock, Wind, Heart } from "lucide-react";
import type { Perfume } from "@/data/perfumes";
import { urlFor } from "@/sanity/lib/image";

interface PerfumeCardProps {
  perfume: Perfume;
  onClick: () => void;
  index: number;
  layout?: "grid" | "list";
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
}

function formatPrice(value?: number) {
  if (!value) return null;
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function PerfumeCard({
  perfume,
  onClick,
  index,
  layout = "grid",
  isFavorite = false,
  onToggleFavorite,
}: PerfumeCardProps) {
  const imageUrl = perfume.image
    ? urlFor(perfume.image).width(400).height(500).url()
    : "/placeholder.png";

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
          className="w-20 h-24 md:w-24 md:h-[120px] flex-shrink-0 bg-bd-cream rounded-xl 
                      overflow-hidden relative"
        >
          <Image
            src={imageUrl}
            fill
            sizes="100px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            alt={perfume.name}
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
                {perfume.brand}
                {perfume.tipo ? ` • ${perfume.tipo}` : ""}
                {perfume.olfactoryFamily ? ` • ${perfume.olfactoryFamily}` : ""}
                {perfume.concentracao ? ` • ${perfume.concentracao}` : ""}
              </p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0 mt-1">
              {onToggleFavorite && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(perfume._id);
                  }}
                  className="p-1 cursor-pointer"
                  aria-label={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                >
                  <Heart
                    size={16}
                    className={`transition-all duration-300 ${
                      isFavorite
                        ? "fill-bd-salmon text-bd-salmon"
                        : "text-bd-salmon/30 hover:text-bd-salmon"
                    }`}
                  />
                </button>
              )}
              <ChevronRight
                size={18}
                className="text-bd-salmon/40 group-hover:text-bd-salmon group-hover:translate-x-1 
                           transition-all duration-300"
              />
            </div>
          </div>

          <p className="text-xs text-bd-warm-gray font-light leading-relaxed mt-2 line-clamp-2 hidden sm:block">
            {perfume.shortDescription}
          </p>

          {/* Quick Stats */}
          <div className="flex items-center gap-4 mt-2.5">
            <span className="inline-flex items-center gap-1 text-[10px] text-bd-warm-gray">
              <Clock size={11} className="text-bd-salmon/60" />
              {perfume.longevity ?? "—"}
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] text-bd-warm-gray">
              <Wind size={11} className="text-bd-salmon/60" />
              {perfume.sillage ?? "—"}
            </span>
            {perfume.variations && perfume.variations.length > 0 && (
              <span className="text-[11px] font-semibold text-bd-charcoal ml-auto">
                A partir de {formatPrice(perfume.variations[0].preco)}
              </span>
            )}
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
      className="group cursor-pointer max-w-[260px] mx-auto w-full relative"
    >
      {/* Favorite button */}
      {onToggleFavorite && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(perfume._id);
          }}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm 
                     flex items-center justify-center shadow-sm hover:shadow-md 
                     transition-all duration-300 cursor-pointer"
          aria-label={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        >
          <Heart
            size={14}
            className={`transition-all duration-300 ${
              isFavorite
                ? "fill-bd-salmon text-bd-salmon"
                : "text-bd-warm-gray group-hover:text-bd-salmon"
            }`}
          />
        </button>
      )}

      {/* Image Container */}
      <div
        className="aspect-[4/5] bg-bd-cream rounded-xl overflow-hidden mb-3 relative
                    transition-all duration-400 group-hover:shadow-lg 
                    border border-transparent group-hover:border-bd-salmon/20"
      >
        <Image
          src={imageUrl}
          fill
          sizes="(max-width: 768px) 50vw, 260px"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          alt={perfume.name}
        />
      </div>

      {/* Info */}
      <div>
        <h3 className="text-sm font-serif mb-0.5 text-bd-charcoal group-hover:text-bd-salmon transition-colors duration-300">
          {perfume.name}
        </h3>
        <p className="text-[8px] text-bd-salmon uppercase tracking-[0.2em] font-bold mb-1">
          {perfume.brand}
          {perfume.tipo ? ` • ${perfume.tipo}` : ""}
          {perfume.concentracao ? ` • ${perfume.concentracao}` : ""}
        </p>
        <p className="text-[11px] text-bd-warm-gray line-clamp-2 font-light leading-snug">
          {perfume.shortDescription}
        </p>
        {perfume.variations && perfume.variations.length > 0 && (
          <p className="text-xs font-semibold text-bd-charcoal mt-1.5">
            A partir de {formatPrice(perfume.variations[0].preco)}
          </p>
        )}
      </div>
    </motion.div>
  );
}
