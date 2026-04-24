"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { perfumesMock, type Perfume } from "@/data/perfumes";

interface OlfactoryQuizProps {
  onComplete: (result: Perfume) => void;
}

interface QuizQuestion {
  title: string;
  subtitle: string;
  options: { label: string; description: string; value: string }[];
  key: "vibe" | "intensity";
}

const questions: QuizQuestion[] = [
  {
    title: "Como você prefere sua primeira impressão?",
    subtitle: "A abertura revela o caráter da fragrância",
    options: [
      {
        label: "Fresca e Energizante",
        description: "Cítricos vibrantes, frutas efervescentes",
        value: "fresco",
      },
      {
        label: "Quente e Aconchegante",
        description: "Baunilha envolvente, especiarias sedutoras",
        value: "doce",
      },
    ],
    key: "vibe",
  },
  {
    title: "Qual o nível de presença que você deseja?",
    subtitle: "Defina a intensidade da sua assinatura",
    options: [
      {
        label: "Sedutor",
        description: "Elegante e rente à pele, íntimo e convidativo",
        value: "sedutor",
      },
      {
        label: "Marcante",
        description: "Equilibrado e memorável, presença segura",
        value: "marcante",
      },
      {
        label: "Poderoso",
        description: "Dominante e avassalador, deixa rastro por onde passa",
        value: "poderoso",
      },
    ],
    key: "intensity",
  },
];

export function OlfactoryQuiz({ onComplete }: OlfactoryQuizProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<{
    vibe: string;
    intensity: string;
  }>({ vibe: "", intensity: "" });

  const handleSelect = (value: string) => {
    const key = questions[step].key;
    const newAnswers = { ...answers, [key]: value };
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      // Find best match: prioritize both matches, then single match
      const exactMatch = perfumesMock.find(
        (p) =>
          p.quizTags.vibe === newAnswers.vibe &&
          p.quizTags.intensity === newAnswers.intensity
      );
      const partialMatch = perfumesMock.find(
        (p) =>
          p.quizTags.vibe === newAnswers.vibe ||
          p.quizTags.intensity === newAnswers.intensity
      );
      onComplete(exactMatch || partialMatch || perfumesMock[0]);
    }
  };

  const currentQuestion = questions[step];

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
                  width: i <= step ? "2rem" : "1rem",
                  backgroundColor: i <= step ? "#D2B4A3" : "#E8D5C8",
                }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              />
            ))}
          </div>
        </div>

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
                <Sparkles size={20} className="text-bd-salmon" />
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
                  <div>
                    <span className="text-sm font-semibold text-bd-charcoal block mb-1">
                      {opt.label}
                    </span>
                    <span className="text-xs text-bd-warm-gray font-light">
                      {opt.description}
                    </span>
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
