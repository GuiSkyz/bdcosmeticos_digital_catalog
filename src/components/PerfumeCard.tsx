"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Clock, Wind, Heart } from "lucide-react";
import type { Perfume } from "@/data/perfumes";
import { urlFor } from "@/sanity/lib/image";

interface PerfumeCardProps {
  perfume: Perfume;
  href?: string;
  onClick?: () => void;
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
  href,
  onClick,
  index,
  layout = "grid",
  isFavorite = false,
  onToggleFavorite,
}: PerfumeCardProps) {
  const imageUrl = perfume.image
    ? urlFor(perfume.image).width(400).url()
    : "/placeholder.png";

  const defaultHref = `/perfume/${perfume.slug?.current || perfume._id}`;
  const linkHref = href || defaultHref;

  if (layout === "list") {
    return (
      <Link href={linkHref} onClick={onClick} className="block w-full">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
          className="group cursor-pointer flex items-center gap-6 md:gap-8 p-4 md:p-5 
                     rounded-2xl border border-transparent hover:border-bd-salmon/20 
                     hover:bg-bd-cream/50 hover:shadow-lg transition-all duration-300"
        >
        {/* Image */}
        <div
          className="w-20 h-24 md:w-24 md:h-28 flex-shrink-0 bg-bd-cream rounded-xl 
                      p-3 flex items-center justify-center overflow-hidden relative"
        >
          <Image
            src={imageUrl}
            width={200}
            height={250}
            className="object-contain transition-transform duration-500 group-hover:scale-105"
            alt={perfume.name}
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h3 className="text-lg md:text-xl font-serif text-bd-charcoal group-hover:text-bd-salmon-text transition-colors duration-300 truncate">
                {perfume.name}
              </h3>
              <p className="text-[10px] text-bd-salmon-text uppercase tracking-[0.2em] font-bold mt-0.5">
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
                        ? "fill-bd-salmon-text text-bd-salmon-text"
                        : "text-bd-salmon/50 hover:text-bd-salmon-text"
                    }`}
                  />
                </button>
              )}
              <ChevronRight
                size={18}
                className="text-bd-salmon/50 group-hover:text-bd-salmon-text group-hover:translate-x-1 
                           transition-all duration-300"
              />
            </div>
          </div>

          <p className="text-xs text-bd-warm-gray-text font-light leading-relaxed mt-2 line-clamp-2 hidden sm:block">
            {perfume.shortDescription}
          </p>

          {/* Quick Stats */}
          <div className="flex items-center gap-4 mt-2.5">
            <span className="inline-flex items-center gap-1 text-[10px] text-bd-warm-gray-text">
              <Clock size={11} className="text-bd-salmon-text/70" />
              {perfume.longevity ?? "—"}
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] text-bd-warm-gray-text">
              <Wind size={11} className="text-bd-salmon-text/70" />
              {perfume.sillage ?? "—"}
            </span>
            {(perfume.preco ?? 0) > 0 && (
              <span className="text-[11px] font-semibold text-bd-charcoal ml-auto">
                {perfume.hasVariations ? `A partir de ${formatPrice(perfume.preco as number)}` : formatPrice(perfume.preco as number)}
              </span>
            )}
          </div>
        </div>
        </motion.div>
      </Link>
    );
  }

  // Grid layout — e-commerce vitrine style
  return (
    <Link href={linkHref} onClick={onClick} className="block w-full h-full max-w-[260px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
        className="group cursor-pointer w-full relative flex flex-col h-full"
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
                ? "fill-bd-salmon-text text-bd-salmon-text"
                : "text-bd-warm-gray-text group-hover:text-bd-salmon-text"
            }`}
          />
        </button>
      )}

      {/* Image Container */}
      <div
        className="aspect-square bg-bd-cream rounded-xl overflow-hidden mb-3 p-4 
                    flex items-center justify-center transition-all duration-400
                    group-hover:shadow-lg border border-transparent group-hover:border-bd-salmon/20"
      >
        <Image
          src={imageUrl}
          width={400}
          height={400}
          className="max-h-[160px] object-contain transition-transform duration-500 ease-out group-hover:scale-105"
          alt={perfume.name}
        />
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1">
        <h3 className="text-sm font-serif mb-0.5 text-bd-charcoal group-hover:text-bd-salmon-text transition-colors duration-300">
          {perfume.name}
        </h3>
        <p className="text-[10px] text-bd-salmon-text uppercase tracking-[0.2em] font-bold mb-1">
          {perfume.brand}
          {perfume.tipo ? ` • ${perfume.tipo}` : ""}
          {perfume.concentracao ? ` • ${perfume.concentracao}` : ""}
        </p>
        <p className="text-[11px] text-bd-warm-gray-text line-clamp-2 font-light leading-snug">
          {perfume.shortDescription}
        </p>
        {(perfume.preco ?? 0) > 0 && (
          <p className="mt-auto pt-2 text-xs font-semibold text-bd-charcoal">
            {perfume.hasVariations ? `A partir de ${formatPrice(perfume.preco as number)}` : formatPrice(perfume.preco as number)}
          </p>
        )}
      </div>
      </motion.div>
    </Link>
  );
}
