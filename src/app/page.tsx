"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutGrid, List } from "lucide-react";
import { perfumesMock, type Perfume } from "@/data/perfumes";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { PerfumeCard } from "@/components/PerfumeCard";
import { OlfactoryQuiz } from "@/components/OlfactoryQuiz";
import { QuizResult } from "@/components/QuizResult";
import { ProductDetailPage } from "@/components/ProductDetailPage";
import { Footer } from "@/components/Footer";

// ==========================================
// BD COSMÉTICOS — Main Application
// ==========================================

type ViewState = "home" | "quiz" | "result" | "pdp";
type DisplayMode = "grid" | "list";

export default function HomePage() {
  const [view, setView] = useState<ViewState>("home");
  const [selectedPerfume, setSelectedPerfume] = useState<Perfume | null>(null);
  const [quizResult, setQuizResult] = useState<Perfume | null>(null);
  const [displayMode, setDisplayMode] = useState<DisplayMode>("grid");

  const navigateToPDP = (perfume: Perfume) => {
    setSelectedPerfume(perfume);
    setView("pdp");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateHome = () => {
    setView("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white text-bd-charcoal flex flex-col">
      {/* Navbar */}
      <Navbar
        onLogoClick={navigateHome}
        onQuizClick={() => {
          setView("quiz");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />

      {/* Views */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {/* ==========================================
              HOME VIEW
              ========================================== */}
          {view === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Hero */}
              <HeroSection onStartQuiz={() => setView("quiz")} />

              {/* Section Header + View Toggle */}
              <section className="container mx-auto px-6 md:px-8 pt-20 pb-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-center mb-10"
                >
                  <p className="text-[10px] uppercase tracking-[0.4em] text-bd-salmon font-bold mb-3">
                    Coleção Exclusiva
                  </p>
                  <h2 className="text-3xl md:text-4xl font-serif text-bd-charcoal">
                    Nossa Curadoria
                  </h2>
                </motion.div>

                {/* View Toggle */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  className="flex justify-center md:justify-end mb-8"
                >
                  <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-bd-cream border border-bd-salmon/10">
                    <button
                      onClick={() => setDisplayMode("grid")}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] uppercase tracking-widest font-bold 
                                  transition-all duration-300 cursor-pointer
                                  ${displayMode === "grid"
                                    ? "bg-white text-bd-charcoal shadow-sm"
                                    : "text-bd-warm-gray hover:text-bd-charcoal"
                                  }`}
                    >
                      <LayoutGrid size={13} />
                      Grid
                    </button>
                    <button
                      onClick={() => setDisplayMode("list")}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] uppercase tracking-widest font-bold 
                                  transition-all duration-300 cursor-pointer
                                  ${displayMode === "list"
                                    ? "bg-white text-bd-charcoal shadow-sm"
                                    : "text-bd-warm-gray hover:text-bd-charcoal"
                                  }`}
                    >
                      <List size={13} />
                      Lista
                    </button>
                  </div>
                </motion.div>
              </section>

              {/* Vitrine — Grid or List */}
              <section className="container mx-auto px-6 md:px-8 pb-20">
                <AnimatePresence mode="wait">
                  {displayMode === "grid" ? (
                    <motion.div
                      key="grid"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-3 gap-6 md:gap-8"
                    >
                      {perfumesMock.map((perfume, index) => (
                        <PerfumeCard
                          key={perfume.id}
                          perfume={perfume}
                          index={index}
                          layout="grid"
                          onClick={() => navigateToPDP(perfume)}
                        />
                      ))}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="list"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="max-w-3xl mx-auto flex flex-col gap-3"
                    >
                      {perfumesMock.map((perfume, index) => (
                        <PerfumeCard
                          key={perfume.id}
                          perfume={perfume}
                          index={index}
                          layout="list"
                          onClick={() => navigateToPDP(perfume)}
                        />
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </section>
            </motion.div>
          )}

          {/* ==========================================
              QUIZ VIEW
              ========================================== */}
          {view === "quiz" && (
            <motion.section
              key="quiz"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="py-16 md:py-24 px-6 md:px-8"
            >
              {/* Section Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-14"
              >
                <p className="text-[10px] uppercase tracking-[0.4em] text-bd-salmon font-bold mb-3">
                  Consultoria Digital
                </p>
                <h2 className="text-3xl md:text-4xl font-serif text-bd-charcoal mb-2">
                  Consultoria Olfativa
                </h2>
                <p className="text-bd-warm-gray text-sm font-light">
                  Encontre a sua assinatura em segundos
                </p>
              </motion.div>

              {/* Quiz Component */}
              <OlfactoryQuiz
                onComplete={(result) => {
                  setQuizResult(result);
                  setView("result");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
            </motion.section>
          )}

          {/* ==========================================
              RESULT VIEW
              ========================================== */}
          {view === "result" && quizResult && (
            <QuizResult
              key="result"
              perfume={quizResult}
              onExploreDetails={() => navigateToPDP(quizResult)}
            />
          )}

          {/* ==========================================
              PDP VIEW
              ========================================== */}
          {view === "pdp" && selectedPerfume && (
            <ProductDetailPage
              key="pdp"
              perfume={selectedPerfume}
              onBack={navigateHome}
            />
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
