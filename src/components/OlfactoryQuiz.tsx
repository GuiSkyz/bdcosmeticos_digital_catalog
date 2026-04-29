"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Sparkles, Heart, MapPin, Volume2, Flower2, ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { Perfume } from "@/data/perfumes";

// ==========================================
// Types
// ==========================================

interface OlfactoryQuizProps {
  perfumes: Perfume[];
  onComplete: (result: Perfume, answers: QuizAnswers) => void;
}

export interface QuizAnswers {
  vibe: string;
  cenario: string;
  presenca: string;
  aroma: string;
}

interface QuizQuestion {
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  options: { label: string; description: string; value: string; emoji: string }[];
  key: keyof QuizAnswers;
}

// ==========================================
// Quiz Questions — Experiência Emocional
// ==========================================

const questions: QuizQuestion[] = [
  {
    title: "Como você quer se sentir hoje?",
    subtitle: "Escolha a energia que combina com você",
    icon: Heart,
    options: [
      {
        label: "Elegante e Poderoso(a)",
        description: "Presença que impõe respeito e admiração",
        value: "elegante",
        emoji: "👑",
      },
      {
        label: "Fresco(a) e Energizado(a)",
        description: "Leve como a brisa, vibrante como o sol",
        value: "fresco",
        emoji: "🌊",
      },
      {
        label: "Misterioso(a) e Sedutor(a)",
        description: "Um convite irresistível à curiosidade",
        value: "misterioso",
        emoji: "🌙",
      },
      {
        label: "Aconchegante e Confortável",
        description: "Quentinho como um abraço em dia frio",
        value: "aconchegante",
        emoji: "☁️",
      },
    ],
    key: "vibe",
  },
  {
    title: "Para qual momento?",
    subtitle: "O cenário perfeito define a fragrância ideal",
    icon: MapPin,
    options: [
      {
        label: "Dominar a sala de reunião",
        description: "Profissional, sofisticado, inesquecível",
        value: "trabalho",
        emoji: "💼",
      },
      {
        label: "Um jantar a dois",
        description: "Romance no ar, fragrância que encanta",
        value: "encontro",
        emoji: "🕯️",
      },
      {
        label: "Aproveitar o sol",
        description: "Passeio, café, momentos leves do dia",
        value: "passeio",
        emoji: "☀️",
      },
      {
        label: "A noite é uma criança",
        description: "Festa, energia, momentos memoráveis",
        value: "balada",
        emoji: "🪩",
      },
    ],
    key: "cenario",
  },
  {
    title: "Qual a sua assinatura?",
    subtitle: "Defina o nível de presença do seu perfume",
    icon: Volume2,
    options: [
      {
        label: "Segredo Íntimo",
        description: "Só quem te abraça sente — elegância silenciosa",
        value: "intima",
        emoji: "🤫",
      },
      {
        label: "Rastro Sutil",
        description: "Deixa uma trilha suave por onde passa",
        value: "moderada",
        emoji: "💨",
      },
      {
        label: "Presença Avassaladora",
        description: "Sente seu perfume antes de te ver chegar",
        value: "avassaladora",
        emoji: "🔥",
      },
    ],
    key: "presenca",
  },
  {
    title: "Qual aroma te atrai?",
    subtitle: "Seu instinto sabe — confie nele",
    icon: Flower2,
    options: [
      {
        label: "Cítricos e Frutas",
        description: "Limão siciliano, bergamota, frutas suculentas",
        value: "citrico",
        emoji: "🍋",
      },
      {
        label: "Flores e Buquês",
        description: "Jasmin, rosa, íris — jardins encantados",
        value: "floral",
        emoji: "🌸",
      },
      {
        label: "Madeiras e Florestas",
        description: "Sândalo, vetiver, cedro — terra e raízes",
        value: "amadeirado",
        emoji: "🪵",
      },
      {
        label: "Doces e Gourmand",
        description: "Baunilha, café, chocolate — pura tentação",
        value: "gourmand",
        emoji: "🍫",
      },
    ],
    key: "aroma",
  },
];

// ==========================================
// Scoring Algorithm
// ==========================================

function findBestMatch(perfumes: Perfume[], answers: QuizAnswers): Perfume {
  let bestScore = -1;
  let bestPerfume = perfumes[0];

  for (const perfume of perfumes) {
    let score = 0;

    // Vibe match (peso 3 — mais importante, é a emoção)
    if (perfume.quizVibe === answers.vibe) score += 3;

    // Cenário match (peso 2)
    if (perfume.quizCenario === answers.cenario) score += 2;

    // Presença match (peso 2)
    if (perfume.quizPresenca === answers.presenca) score += 2;

    // Aroma match (peso 3 — tão importante quanto a vibe)
    if (perfume.quizAroma === answers.aroma) score += 3;

    if (score > bestScore) {
      bestScore = score;
      bestPerfume = perfume;
    }
  }

  return bestPerfume;
}

// ==========================================
// Component
// ==========================================

export function OlfactoryQuiz({ perfumes, onComplete }: OlfactoryQuizProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({
    vibe: "",
    cenario: "",
    presenca: "",
    aroma: "",
  });

  const handleSelect = (value: string) => {
    const key = questions[step].key;
    const newAnswers = { ...answers, [key]: value };
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      const result = findBestMatch(perfumes, newAnswers);
      onComplete(result, newAnswers);
    }
  };

  const currentQuestion = questions[step];
  const IconComponent = currentQuestion.icon;

  return (
    <Card className="border-bd-salmon/20 bg-white shadow-2xl rounded-3xl max-w-2xl mx-auto overflow-visible ring-0">
      <CardContent className="p-8 md:p-12">
        {/* Progress Bar */}
        <div className="mb-10 flex justify-between items-center">
          <span className="text-[10px] uppercase tracking-[0.3em] text-bd-salmon font-bold">
            Passo {step + 1} de {questions.length}
          </span>
          <div className="flex gap-1.5">
            {questions.map((_, i) => (
              <motion.div
                key={i}
                className="h-1 rounded-full"
                initial={false}
                animate={{
                  width: i <= step ? "2rem" : "0.75rem",
                  backgroundColor: i <= step ? "#D2B4A3" : "#E8D5C8",
                }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              />
            ))}
          </div>
        </div>

        {/* Back Button */}
        {step > 0 && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setStep(step - 1)}
            className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-bd-warm-gray 
                       hover:text-bd-salmon transition-all duration-300 font-bold mt-4 cursor-pointer group"
          >
            <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform duration-300" />
            Voltar
          </motion.button>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -30, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-12 h-12 rounded-2xl bg-bd-cream flex items-center justify-center">
                <IconComponent size={20} className="text-bd-salmon" />
              </div>
            </div>

            {/* Question */}
            <h2 className="text-2xl md:text-3xl font-serif text-center mb-2 text-bd-charcoal">
              {currentQuestion.title}
            </h2>
            <p className="text-center text-bd-warm-gray text-sm mb-10 font-light">
              {currentQuestion.subtitle}
            </p>

            {/* Options */}
            <div className="grid gap-4">
              {currentQuestion.options.map((opt) => (
                <motion.button
                  key={opt.value}
                  onClick={() => handleSelect(opt.value)}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full text-left p-6 border border-bd-salmon/20 rounded-2xl 
                             hover:bg-bd-cream hover:border-bd-salmon hover:shadow-lg
                             transition-all duration-300 group flex justify-between items-center cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-xl flex-shrink-0">{opt.emoji}</span>
                    <div>
                      <span className="text-sm font-semibold text-bd-charcoal block mb-1">
                        {opt.label}
                      </span>
                      <span className="text-xs text-bd-warm-gray font-light">
                        {opt.description}
                      </span>
                    </div>
                  </div>
                  <ChevronRight
                    size={18}
                    className="text-bd-salmon opacity-0 group-hover:opacity-100 transition-all duration-300 
                               group-hover:translate-x-1 flex-shrink-0 ml-4"
                  />
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
