"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  Clock,
  Sparkles,
  Calendar,
  Wind,
  Send,
  Droplets,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { Perfume } from "@/data/perfumes";

interface ProductDetailPageProps {
  perfume: Perfume;
  onBack: () => void;
}

function NoteTag({ note }: { note: string }) {
  return (
    <Badge
      variant="outline"
      className="border-bd-salmon/30 text-bd-charcoal bg-white hover:bg-bd-cream 
                 rounded-full px-4 py-1.5 h-auto text-xs font-light tracking-wide
                 transition-all duration-300"
    >
      {note}
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
      className="p-5 bg-bd-cream rounded-2xl border border-bd-salmon/10 text-center
                 hover:shadow-lg hover:border-bd-salmon/30 transition-all duration-300"
    >
      <Icon size={22} className="mx-auto mb-3 text-bd-salmon" />
      <p className="text-[10px] uppercase text-bd-warm-gray font-bold tracking-wider mb-1">
        {label}
      </p>
      <p className="text-sm text-bd-charcoal font-medium">{value}</p>
    </motion.div>
  );
}

export function ProductDetailPage({ perfume, onBack }: ProductDetailPageProps) {
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
          className="flex items-center gap-2 text-bd-warm-gray mb-10 md:mb-14
                     hover:text-bd-salmon transition-all duration-300 
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
          className="bg-bd-cream rounded-3xl p-10 md:p-16 flex items-center justify-center
                     border border-bd-salmon/10"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={perfume.visuals.imagePrompt}
            className="max-h-[450px] md:max-h-[500px] drop-shadow-2xl"
            alt={perfume.name}
          />
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
            <p className="text-bd-salmon uppercase tracking-[0.3em] text-xs font-bold mb-6">
              {perfume.brand} • {perfume.olfactory.family}
            </p>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg md:text-xl italic text-bd-warm-gray mb-8 
                       border-l-4 border-bd-salmon pl-6 leading-relaxed font-light"
          >
            &ldquo;{perfume.tagline}&rdquo;
          </motion.p>

          {/* Full Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="text-sm text-bd-warm-gray leading-relaxed mb-10 font-light"
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
              <Droplets size={16} className="text-bd-salmon" />
              <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-bd-charcoal">
                Pirâmide Olfativa
              </h3>
            </div>

            <div className="space-y-6">
              {/* Top Notes */}
              <div className="pyramid-section">
                <p className="text-[10px] uppercase tracking-widest text-bd-salmon font-bold mb-2">
                  Notas de Topo
                </p>
                <div className="flex flex-wrap gap-2">
                  {perfume.olfactory.topNotes.map((note) => (
                    <NoteTag key={note} note={note} />
                  ))}
                </div>
              </div>

              {/* Heart Notes */}
              <div className="pyramid-section">
                <p className="text-[10px] uppercase tracking-widest text-bd-salmon font-bold mb-2">
                  Notas de Coração
                </p>
                <div className="flex flex-wrap gap-2">
                  {perfume.olfactory.heartNotes.map((note) => (
                    <NoteTag key={note} note={note} />
                  ))}
                </div>
              </div>

              {/* Base Notes */}
              <div className="pyramid-section">
                <p className="text-[10px] uppercase tracking-widest text-bd-salmon font-bold mb-2">
                  Notas de Base
                </p>
                <div className="flex flex-wrap gap-2">
                  {perfume.olfactory.baseNotes.map((note) => (
                    <NoteTag key={note} note={note} />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <Separator className="mb-10 bg-bd-salmon/15" />

          {/* Performance Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <PerformanceBlock
              icon={Clock}
              label="Fixação"
              value={perfume.performance.longevity}
              delay={0.5}
            />
            <PerformanceBlock
              icon={Wind}
              label="Projeção"
              value={perfume.performance.sillage}
              delay={0.55}
            />
            <PerformanceBlock
              icon={Sparkles}
              label="Ocasião"
              value={perfume.performance.occasion}
              delay={0.6}
            />
            <PerformanceBlock
              icon={Calendar}
              label="Estação"
              value={perfume.performance.season}
              delay={0.65}
            />
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
                  `https://wa.me/5500000000000?text=Olá! Gostaria de saber sobre o ${perfume.name} da ${perfume.brand}.`
                )
              }
              className="w-full bg-bd-charcoal text-white py-6 h-auto rounded-2xl text-xs uppercase 
                         tracking-[0.2em] font-bold hover:bg-bd-salmon shadow-xl transition-all 
                         duration-300 hover:shadow-2xl cursor-pointer"
            >
              <Send size={14} className="mr-2" />
              Consultar Disponibilidade via WhatsApp
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
