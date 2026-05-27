"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Clock,
  Sparkles,
  Calendar,
  Wind,
  Send,
  Droplets,
  Share2,
  Heart,
  User,
  Beaker,
  Package,
  Globe,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { Perfume, NotaOlfativa, SiteSettings } from "@/data/perfumes";
import { urlFor } from "@/sanity/lib/image";

// ==========================================
// Props
// ==========================================

interface ProductDetailPageProps {
  perfume: Perfume;
  onBack: () => void;
  allPerfumes?: Perfume[];
  onNavigate?: (perfume: Perfume) => void;
  settings?: SiteSettings | null;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
}

// ==========================================
// Sub-Components
// ==========================================

function NoteTag({ note }: { note: NotaOlfativa | string }) {
  const label = typeof note === "string" ? note : note.name;
  return (
    <Badge
      variant="outline"
      className="border-bd-salmon/30 text-bd-charcoal bg-white hover:bg-bd-cream 
                 rounded-full px-4 py-1.5 h-auto text-xs font-light tracking-wide
                 transition-all duration-300 truncate max-w-[140px]"
    >
      {label}
    </Badge>
  );
}

function PerformanceBlock({
  icon: Icon,
  label,
  value,
  delay,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  value: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="p-5 bg-bd-cream rounded-2xl border border-bd-salmon/10 text-center min-h-[120px]
                 flex flex-col items-center justify-center
                 hover:shadow-lg hover:border-bd-salmon/30 transition-all duration-300"
    >
      <Icon size={22} className="mx-auto mb-3 text-bd-salmon-text" />
      <p className="text-[10px] uppercase text-bd-warm-gray-text font-bold tracking-wider mb-1">
        {label}
      </p>
      <p className="text-sm text-bd-charcoal font-medium line-clamp-2 px-1">{value}</p>
    </motion.div>
  );
}

function formatPrice(value?: number) {
  if (!value) return null;
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

const CONCENTRATION_LABELS: Record<string, string> = {
  EDC: "Eau de Cologne",
  EDT: "Eau de Toilette",
  EDP: "Eau de Parfum",
  Parfum: "Parfum / Extrait",
};

// ==========================================
// Main Component
// ==========================================

export function ProductDetailPage({
  perfume,
  onBack,
  allPerfumes,
  onNavigate,
  settings,
  isFavorite = false,
  onToggleFavorite,
}: ProductDetailPageProps) {
  const [activeImage, setActiveImage] = useState(0);

  // Build image list: main + gallery
  const allImages = [
    perfume.image,
    ...(perfume.gallery ?? []),
  ].filter(Boolean);

  const currentImageUrl = allImages[activeImage]
    ? urlFor(allImages[activeImage]!).width(600).url()
    : "/placeholder.png";

  // Similar perfumes (same family, different perfume)
  const similarPerfumes = allPerfumes
    ?.filter(
      (p) =>
        p._id !== perfume._id &&
        p.olfactoryFamily &&
        p.olfactoryFamily === perfume.olfactoryFamily
    )
    .slice(0, 3);

  // WhatsApp
  const whatsappNumber = settings?.whatsappNumber ?? "5500000000000";
  const whatsappMessage = (settings?.whatsappMessage ?? "Olá! Gostaria de saber sobre o {perfume}.")
    .replace("{perfume}", `${perfume.name} da ${perfume.brand}`);

  // Share
  const handleShare = async () => {
    const shareData = {
      title: `${perfume.name} — BD Cosméticos`,
      text: `Confira ${perfume.name} da ${perfume.brand} na BD Cosméticos!`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // user cancelled
      }
    } else {
      await navigator.clipboard.writeText(
        `${shareData.text}\n${shareData.url}`
      );
      alert("Link copiado!");
    }
  };

  return (
    <motion.section
      key="pdp"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="py-12 md:py-16 px-6 md:px-8 container mx-auto max-w-7xl"
    >
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-bd-warm-gray-text mb-10 md:mb-14
                     hover:text-bd-salmon-text transition-all duration-300 
                     uppercase text-[10px] tracking-widest font-bold group cursor-pointer"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform duration-300"
          />
          Voltar à Coleção
        </button>
      </motion.div>

      {/* Main 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Left: Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-4"
        >
          <div
            className="bg-bd-cream rounded-3xl p-10 md:p-16 flex items-center justify-center
                        border border-bd-salmon/10 relative"
          >
            {/* Favorite + Share buttons */}
            <div className="absolute top-4 right-4 flex gap-2">
              {onToggleFavorite && (
                <button
                  onClick={() => onToggleFavorite(perfume._id)}
                  className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center 
                             shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
                  aria-label="Favoritar"
                >
                  <Heart
                    size={18}
                    className={`transition-all duration-300 ${
                      isFavorite
                        ? "fill-bd-salmon-text text-bd-salmon-text"
                        : "text-bd-warm-gray-text hover:text-bd-salmon-text"
                    }`}
                  />
                </button>
              )}
              <button
                onClick={handleShare}
                className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center 
                           shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
                aria-label="Compartilhar"
              >
                <Share2 size={18} className="text-bd-warm-gray-text hover:text-bd-salmon-text transition-colors duration-300" />
              </button>
            </div>

            <Image
              src={currentImageUrl}
              width={600}
              height={600}
              className="max-h-[450px] md:max-h-[500px] object-contain drop-shadow-2xl"
              alt={perfume.name}
              priority
            />
          </div>

          {/* Gallery Thumbnails */}
          {allImages.length > 1 && (
            <div className="flex gap-3 justify-center">
              {allImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`w-16 h-16 rounded-xl border-2 p-2 flex items-center justify-center overflow-hidden cursor-pointer
                             transition-all duration-300 ${
                               activeImage === i
                                 ? "border-bd-salmon bg-bd-cream"
                                 : "border-transparent bg-bd-cream/50 hover:border-bd-salmon/30"
                             }`}
                >
                  <Image
                    src={img ? urlFor(img).width(100).url() : "/placeholder.png"}
                    width={100}
                    height={100}
                    className="max-h-full object-contain"
                    alt={`${perfume.name} foto ${i + 1}`}
                  />
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Right: Details */}
        <div className="flex flex-col justify-center">
          {/* Title Area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-3 text-bd-charcoal">
              {perfume.name}
            </h1>
            <p className="text-bd-salmon-text uppercase tracking-[0.3em] text-xs font-bold mb-4">
              {perfume.brand}
              {perfume.olfactoryFamily ? ` • ${perfume.olfactoryFamily}` : ""}
            </p>

            {/* Detail Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {perfume.genero && (
                <Badge variant="outline" className="border-bd-salmon/20 bg-bd-cream/60 text-bd-charcoal rounded-full px-3 py-1 h-auto text-[10px] font-bold tracking-wider uppercase">
                  <User size={10} className="mr-1.5" />
                  {perfume.genero}
                </Badge>
              )}
              {perfume.tipo && (
                <Badge variant="outline" className="border-bd-salmon/20 bg-bd-cream/60 text-bd-charcoal rounded-full px-3 py-1 h-auto text-[10px] font-bold tracking-wider uppercase">
                  <Globe size={10} className="mr-1.5" />
                  {perfume.tipo}
                </Badge>
              )}
              {perfume.concentracao && (
                <Badge variant="outline" className="border-bd-salmon/20 bg-bd-cream/60 text-bd-charcoal rounded-full px-3 py-1 h-auto text-[10px] font-bold tracking-wider uppercase">
                  <Beaker size={10} className="mr-1.5" />
                  {CONCENTRATION_LABELS[perfume.concentracao] ?? perfume.concentracao}
                </Badge>
              )}
              {perfume.volumes && perfume.volumes.length > 0 && (
                <Badge variant="outline" className="border-bd-salmon/20 bg-bd-cream/60 text-bd-charcoal rounded-full px-3 py-1 h-auto text-[10px] font-bold tracking-wider uppercase">
                  <Package size={10} className="mr-1.5" />
                  {perfume.volumes.join(" / ")}
                </Badge>
              )}
            </div>

            {(perfume.preco ?? 0) > 0 && (
              <div className="mt-6 mb-6">
                <span className="text-2xl font-serif text-bd-charcoal font-semibold">
                  {perfume.hasVariations ? `A partir de ${formatPrice(perfume.preco as number)}` : formatPrice(perfume.preco as number)}
                </span>
              </div>
            )}
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg md:text-xl italic text-bd-warm-gray-text mb-8 
                       border-l-4 border-bd-salmon pl-6 leading-relaxed font-light"
          >
            &ldquo;{perfume.tagline}&rdquo;
          </motion.p>

          {/* Full Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="text-sm text-bd-warm-gray-text leading-relaxed mb-10 font-light"
          >
            {perfume.fullDescription}
          </motion.p>

          <Separator className="mb-10 bg-bd-salmon/15" />

          {/* Olfactory Pyramid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-10"
          >
            <div className="flex items-center gap-2 mb-6">
              <Droplets size={16} className="text-bd-salmon-text" />
              <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-bd-charcoal">
                Pirâmide Olfativa
              </h3>
            </div>

            <div className="space-y-6">
              {/* Top Notes */}
              <div className="pyramid-section">
                <p className="text-[10px] uppercase tracking-widest text-bd-salmon-text font-bold mb-2">
                  Notas de Topo
                </p>
                <div className="flex flex-wrap gap-2">
                  {(perfume.topNotes ?? []).filter(Boolean).map((note) => (
                    <NoteTag key={typeof note === "string" ? note : note._id} note={note} />
                  ))}
                </div>
              </div>

              {/* Heart Notes */}
              <div className="pyramid-section">
                <p className="text-[10px] uppercase tracking-widest text-bd-salmon-text font-bold mb-2">
                  Notas de Coração
                </p>
                <div className="flex flex-wrap gap-2">
                  {(perfume.heartNotes ?? []).filter(Boolean).map((note) => (
                    <NoteTag key={typeof note === "string" ? note : note._id} note={note} />
                  ))}
                </div>
              </div>

              {/* Base Notes */}
              <div className="pyramid-section">
                <p className="text-[10px] uppercase tracking-widest text-bd-salmon-text font-bold mb-2">
                  Notas de Base
                </p>
                <div className="flex flex-wrap gap-2">
                  {(perfume.baseNotes ?? []).filter(Boolean).map((note) => (
                    <NoteTag key={typeof note === "string" ? note : note._id} note={note} />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <Separator className="mb-10 bg-bd-salmon/15" />

          {/* Performance Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <PerformanceBlock icon={Clock} label="Fixação" value={perfume.longevity ?? "—"} delay={0.5} />
            <PerformanceBlock icon={Wind} label="Projeção" value={perfume.sillage ?? "—"} delay={0.55} />
            <PerformanceBlock icon={Sparkles} label="Ocasião" value={perfume.occasion ?? "—"} delay={0.6} />
            <PerformanceBlock icon={Calendar} label="Estação" value={perfume.season ?? "—"} delay={0.65} />
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Button
              onClick={() =>
                window.open(
                  `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`
                )
              }
              className="w-full bg-bd-charcoal text-white py-4 sm:py-6 h-auto rounded-2xl text-[10px] sm:text-xs uppercase 
                         tracking-widest sm:tracking-[0.2em] font-bold hover:bg-bd-salmon shadow-xl transition-all 
                         duration-300 hover:shadow-2xl cursor-pointer whitespace-normal text-center px-4"
            >
              <Send size={14} className="mr-2 shrink-0 inline-block" />
              <span>Consultar via WhatsApp</span>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Similar Perfumes */}
      {similarPerfumes && similarPerfumes.length > 0 && onNavigate && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-20"
        >
          <Separator className="mb-12 bg-bd-salmon/15" />
          <div className="text-center mb-10">
            <p className="text-[10px] uppercase tracking-[0.4em] text-bd-salmon-text font-bold mb-2">
              Você também pode gostar
            </p>
            <h3 className="text-2xl font-serif text-bd-charcoal">
              Perfumes da família {perfume.olfactoryFamily}
            </h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {similarPerfumes.map((p) => (
              <motion.div
                key={p._id}
                whileHover={{ scale: 1.02 }}
                onClick={() => onNavigate(p)}
                className="cursor-pointer text-center group"
              >
                <div className="bg-bd-cream rounded-xl p-6 mb-3 border border-transparent 
                                group-hover:border-bd-salmon/20 group-hover:shadow-lg transition-all duration-300">
                  <Image
                    src={p.image ? urlFor(p.image).width(300).url() : "/placeholder.png"}
                    width={300}
                    height={300}
                    className="max-h-[140px] mx-auto object-contain"
                    alt={p.name}
                  />
                </div>
                <h4 className="text-sm font-serif text-bd-charcoal group-hover:text-bd-salmon-text transition-colors duration-300">
                  {p.name}
                </h4>
                <p className="text-[10px] text-bd-salmon-text uppercase tracking-widest font-bold">
                  {p.brand}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.section>
  );
}
