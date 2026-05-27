"use client";

import { motion } from "framer-motion";
import { Sparkles, Send, Crown, Star, Gem } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Perfume } from "@/data/perfumes";
import type { QuizAnswers } from "@/components/OlfactoryQuiz";
import { urlFor } from "@/sanity/lib/image";

// ==========================================
// Mapeamento de labels para a justificativa
// ==========================================

const vibeLabels: Record<string, string> = {
  elegante: "Elegância e Poder",
  fresco: "Frescor e Energia",
  misterioso: "Mistério e Sedução",
  aconchegante: "Conforto e Aconchego",
};

const cenarioLabels: Record<string, string> = {
  trabalho: "ambientes profissionais",
  encontro: "momentos românticos",
  passeio: "o dia a dia",
  balada: "noites memoráveis",
};

const aromaLabels: Record<string, string> = {
  citrico: "notas cítricas e frutadas",
  floral: "buquês florais delicados",
  amadeirado: "madeiras nobres e terrosas",
  gourmand: "aromas doces e envolventes",
};

const tipoLabels: Record<string, string> = {
  arabe: "perfumaria árabe",
  importado: "fragrâncias importadas",
  nacional: "perfumaria nacional",
  tanto_faz: "qualquer origem",
};

const rankLabels = [
  { label: "Seu Match Perfeito", icon: Crown, accent: "text-amber-500" },
  { label: "Alternativa Elegante", icon: Star, accent: "text-bd-salmon" },
  { label: "Descoberta Surpresa", icon: Gem, accent: "text-violet-400" },
];

// ==========================================
// Component
// ==========================================

interface QuizResultProps {
  perfumes: Perfume[];
  answers?: QuizAnswers;
  onExploreDetails: (perfume: Perfume) => void;
  settings?: { whatsappNumber?: string } | null;
}

export function QuizResult({ perfumes, answers, onExploreDetails, settings }: QuizResultProps) {
  const mainPerfume = perfumes[0];
  const alternatives = perfumes.slice(1, 3);

  // Build justification text
  const justification = answers
    ? `Com base no seu desejo por ${vibeLabels[answers.vibe] ?? answers.vibe}, perfeito para ${cenarioLabels[answers.cenario] ?? answers.cenario}, sua afinidade com ${aromaLabels[answers.aroma] ?? answers.aroma} e preferência por ${tipoLabels[answers.tipo] ?? "qualquer origem"}, nossa curadoria selecionou:`
    : null;

  const whatsappNumber = settings?.whatsappNumber ?? "5500000000000";

  return (
    <motion.section
      key="result"
      initial={{ scale: 0.92, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="py-16 md:py-24 px-6 md:px-8 container mx-auto"
    >
      {/* ─── MAIN RESULT ─── */}
      <Card
        className="max-w-xl mx-auto bg-bd-cream rounded-3xl border-bd-salmon/20 
                   shadow-2xl overflow-visible ring-0"
      >
        <CardContent className="p-10 md:p-14">
          {/* Sparkle Icon */}
          <motion.div
            initial={{ rotate: -10, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3, type: "spring" }}
          >
            <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center mx-auto mb-8 shadow-sm">
              <Sparkles className="text-bd-salmon" size={28} />
            </div>
          </motion.div>

          {/* Labels */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 mb-2">
              <Crown size={14} className="text-amber-500" />
              <p className="text-[10px] uppercase tracking-[0.4em] text-bd-warm-gray font-bold">
                {rankLabels[0].label}
              </p>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif mb-2 text-bd-charcoal">
              {mainPerfume.name}
            </h1>
            <p className="text-xs text-bd-salmon uppercase tracking-[0.2em] font-bold mb-4">
              {mainPerfume.brand}
            </p>
          </motion.div>

          {/* Justification */}
          {justification && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="text-sm text-bd-warm-gray leading-relaxed font-light mb-8 
                         border-l-4 border-bd-salmon pl-4 text-left mx-auto max-w-sm italic"
            >
              {justification}
            </motion.p>
          )}

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="aspect-square w-56 md:w-64 mx-auto mb-8 bg-white rounded-3xl p-6 shadow-sm 
                       border border-bd-salmon/10"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={mainPerfume.image ? urlFor(mainPerfume.image).width(500).url() : "/placeholder.png"}
              className="max-h-full mx-auto drop-shadow-lg"
              alt={mainPerfume.name}
            />
          </motion.div>

          {/* Tagline */}
          {mainPerfume.tagline && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-sm text-bd-warm-gray mb-10 leading-relaxed italic font-light text-center"
            >
              &ldquo;{mainPerfume.tagline}&rdquo;
            </motion.p>
          )}

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="flex flex-col gap-4"
          >
            <Button
              onClick={() => onExploreDetails(mainPerfume)}
              className="w-full bg-bd-charcoal text-white py-5 h-auto rounded-xl text-xs uppercase 
                         tracking-widest font-bold hover:bg-bd-salmon transition-all duration-300 
                         shadow-lg hover:shadow-xl cursor-pointer"
            >
              Explorar Detalhes
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                window.open(
                  `https://wa.me/${whatsappNumber}?text=Olá! O Quiz indicou o ${mainPerfume.name}. Gostaria de mais informações.`
                )
              }
              className="w-full border-bd-charcoal text-bd-charcoal py-5 h-auto rounded-xl text-xs 
                         uppercase tracking-widest font-bold hover:bg-bd-charcoal hover:text-white 
                         transition-all duration-300 cursor-pointer"
            >
              <Send size={14} className="mr-2" />
              Falar com Especialista
            </Button>
          </motion.div>
        </CardContent>
      </Card>

      {/* ─── ALTERNATIVES ─── */}
      {alternatives.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="max-w-xl mx-auto mt-10"
        >
          <p className="text-[10px] uppercase tracking-[0.4em] text-bd-warm-gray font-bold text-center mb-6">
            Também combina com você
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {alternatives.map((perfume, i) => {
              const rank = rankLabels[i + 1];
              const RankIcon = rank.icon;

              return (
                <motion.div
                  key={perfume._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 1.0 + i * 0.15 }}
                >
                  <Card
                    className="bg-white rounded-2xl border-bd-salmon/15 shadow-md 
                               hover:shadow-xl hover:border-bd-salmon/30 transition-all duration-300 
                               overflow-hidden ring-0 group cursor-pointer"
                    onClick={() => onExploreDetails(perfume)}
                  >
                    <CardContent className="p-6">
                      {/* Rank Badge */}
                      <div className="inline-flex items-center gap-1.5 mb-4">
                        <RankIcon size={12} className={rank.accent} />
                        <span className="text-[9px] uppercase tracking-[0.3em] text-bd-warm-gray font-bold">
                          {rank.label}
                        </span>
                      </div>

                      {/* Image + Info */}
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-20 flex-shrink-0 bg-bd-cream rounded-xl p-2 
                                        border border-bd-salmon/10">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={
                              perfume.image
                                ? urlFor(perfume.image).width(200).url()
                                : "/placeholder.png"
                            }
                            className="w-full h-full object-contain drop-shadow-sm"
                            alt={perfume.name}
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-base font-serif text-bd-charcoal truncate mb-0.5 
                                         group-hover:text-bd-salmon transition-colors duration-300">
                            {perfume.name}
                          </h3>
                          <p className="text-[10px] text-bd-salmon uppercase tracking-[0.15em] font-bold mb-2">
                            {perfume.brand}
                          </p>
                          {perfume.tagline && (
                            <p className="text-[11px] text-bd-warm-gray italic font-light line-clamp-2">
                              &ldquo;{perfume.tagline}&rdquo;
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}
    </motion.section>
  );
}
