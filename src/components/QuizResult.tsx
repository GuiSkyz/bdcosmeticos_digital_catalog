"use client";

import { motion } from "framer-motion";
import { Sparkles, Send } from "lucide-react";
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

// ==========================================
// Component
// ==========================================

interface QuizResultProps {
  perfume: Perfume;
  answers?: QuizAnswers;
  onExploreDetails: () => void;
}

export function QuizResult({ perfume, answers, onExploreDetails }: QuizResultProps) {
  // Build justification text
  const justification = answers
    ? `Com base no seu desejo por ${vibeLabels[answers.vibe] ?? answers.vibe}, perfeito para ${cenarioLabels[answers.cenario] ?? answers.cenario}, e sua afinidade com ${aromaLabels[answers.aroma] ?? answers.aroma}, nossa curadoria selecionou:`
    : null;

  return (
    <motion.section
      key="result"
      initial={{ scale: 0.92, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="py-16 md:py-24 px-6 md:px-8 container mx-auto text-center"
    >
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
          >
            <p className="text-[10px] uppercase tracking-[0.4em] text-bd-warm-gray font-bold mb-2">
              Seu Match Perfeito
            </p>
            <h1 className="text-4xl md:text-5xl font-serif mb-2 text-bd-charcoal">
              {perfume.name}
            </h1>
            <p className="text-xs text-bd-salmon uppercase tracking-[0.2em] font-bold mb-4">
              {perfume.brand}
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
              src={perfume.image ? urlFor(perfume.image).width(500).url() : "/placeholder.png"}
              className="max-h-full mx-auto drop-shadow-lg"
              alt={perfume.name}
            />
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-sm text-bd-warm-gray mb-10 leading-relaxed italic font-light"
          >
            &ldquo;{perfume.tagline}&rdquo;
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="flex flex-col gap-4"
          >
            <Button
              onClick={onExploreDetails}
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
                  `https://wa.me/5500000000000?text=Olá! O Quiz indicou o ${perfume.name}. Gostaria de mais informações.`
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
    </motion.section>
  );
}
