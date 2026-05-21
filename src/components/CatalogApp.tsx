"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutGrid, List, Search, X, SlidersHorizontal, Heart } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { PerfumeCard } from "@/components/PerfumeCard";
import { OlfactoryQuiz } from "@/components/OlfactoryQuiz";
import type { QuizAnswers } from "@/components/OlfactoryQuiz";
import { QuizResult } from "@/components/QuizResult";
import { ProductDetailPage } from "@/components/ProductDetailPage";
import { Footer } from "@/components/Footer";
import { useFavorites } from "@/lib/useFavorites";
import type { Perfume, SiteSettings } from "@/data/perfumes";

// ==========================================
// BD COSMÉTICOS — Main Application
// ==========================================

interface CatalogAppProps {
    perfumes: Perfume[];
    settings?: SiteSettings | null;
}

type ViewState = "home" | "quiz" | "result" | "pdp";
type DisplayMode = "grid" | "list";

// Filter options
const GENERO_OPTIONS = ["Masculino", "Feminino", "Unissex"] as const;
const TIPO_OPTIONS = ["Árabe", "Importado", "Nacional"] as const;
const FAMILY_OPTIONS = [
    "Amadeirado", "Cítrico", "Floral", "Fougère", "Frutal",
    "Gourmand", "Oriental", "Aromático", "Aquático", "Chipre",
] as const;

export function CatalogApp({ perfumes, settings }: CatalogAppProps) {
    const [view, setView] = useState<ViewState>("home");
    const [selectedPerfume, setSelectedPerfume] = useState<Perfume | null>(null);
    const [quizResults, setQuizResults] = useState<Perfume[] | null>(null);
    const [quizAnswers, setQuizAnswers] = useState<QuizAnswers | null>(null);
    const [displayMode, setDisplayMode] = useState<DisplayMode>("grid");

    // Search & Filters
    const [searchQuery, setSearchQuery] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    const [filterGenero, setFilterGenero] = useState<string | null>(null);
    const [filterTipo, setFilterTipo] = useState<string | null>(null);
    const [filterFamily, setFilterFamily] = useState<string | null>(null);
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

    // Favorites
    const { toggleFavorite, isFavorite } = useFavorites();

    // Filtered perfumes
    const filteredPerfumes = useMemo(() => {
        let result = perfumes;

        // Search
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            result = result.filter(
                (p) =>
                    p.name.toLowerCase().includes(q) ||
                    p.brand.toLowerCase().includes(q) ||
                    (p.olfactoryFamily ?? "").toLowerCase().includes(q)
            );
        }

        // Gênero
        if (filterGenero) {
            result = result.filter((p) => p.genero === filterGenero);
        }

        // Tipo
        if (filterTipo) {
            result = result.filter((p) => p.tipo === filterTipo);
        }

        // Família Olfativa
        if (filterFamily) {
            result = result.filter((p) => p.olfactoryFamily === filterFamily);
        }

        // Favoritos
        if (showFavoritesOnly) {
            result = result.filter((p) => isFavorite(p._id));
        }

        return result;
    }, [perfumes, searchQuery, filterGenero, filterTipo, filterFamily, showFavoritesOnly, isFavorite]);

    const hasActiveFilters = !!filterGenero || !!filterTipo || !!filterFamily || showFavoritesOnly;

    const clearFilters = () => {
        setFilterGenero(null);
        setFilterTipo(null);
        setFilterFamily(null);
        setShowFavoritesOnly(false);
        setSearchQuery("");
    };

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

                            {/* Section Header */}
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

                                {/* Search + Filter Bar */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.4, delay: 0.3 }}
                                    className="max-w-3xl mx-auto mb-6"
                                >
                                    {/* Search */}
                                    <div className="relative mb-4">
                                        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-bd-warm-gray" />
                                        <input
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            placeholder="Buscar por nome, marca ou família..."
                                            className="w-full pl-11 pr-10 py-3 rounded-2xl border border-bd-salmon/15 bg-bd-cream/30
                                                       text-sm text-bd-charcoal placeholder:text-bd-warm-gray/60 
                                                       focus:outline-none focus:border-bd-salmon/40 focus:bg-white
                                                       transition-all duration-300"
                                        />
                                        {searchQuery && (
                                            <button
                                                onClick={() => setSearchQuery("")}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-bd-warm-gray hover:text-bd-salmon cursor-pointer"
                                            >
                                                <X size={14} />
                                            </button>
                                        )}
                                    </div>

                                    {/* Filter Toggles */}
                                    <div className="flex flex-wrap items-center gap-2">
                                        <button
                                            onClick={() => setShowFilters(!showFilters)}
                                            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold
                                                       border transition-all duration-300 cursor-pointer
                                                       ${showFilters
                                                    ? "border-bd-salmon bg-bd-salmon/10 text-bd-salmon"
                                                    : "border-bd-salmon/15 text-bd-warm-gray hover:text-bd-salmon hover:border-bd-salmon/30"
                                                }`}
                                        >
                                            <SlidersHorizontal size={12} />
                                            Filtros
                                        </button>

                                        <button
                                            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                                            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold
                                                       border transition-all duration-300 cursor-pointer
                                                       ${showFavoritesOnly
                                                    ? "border-bd-salmon bg-bd-salmon/10 text-bd-salmon"
                                                    : "border-bd-salmon/15 text-bd-warm-gray hover:text-bd-salmon hover:border-bd-salmon/30"
                                                }`}
                                        >
                                            <Heart size={12} className={showFavoritesOnly ? "fill-bd-salmon" : ""} />
                                            Favoritos
                                        </button>

                                        {hasActiveFilters && (
                                            <button
                                                onClick={clearFilters}
                                                className="text-[10px] uppercase tracking-widest text-bd-salmon font-bold 
                                                           hover:underline cursor-pointer ml-2"
                                            >
                                                Limpar filtros
                                            </button>
                                        )}

                                        {/* View Toggle — right side */}
                                        <div className="ml-auto inline-flex items-center gap-1 p-1 rounded-xl bg-bd-cream border border-bd-salmon/10">
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
                                    </div>

                                    {/* Filter Dropdowns */}
                                    <AnimatePresence>
                                        {showFilters && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 p-4 bg-bd-cream/40 rounded-2xl border border-bd-salmon/10">
                                                    {/* Gênero */}
                                                    <div>
                                                        <label className="text-[10px] uppercase tracking-widest text-bd-warm-gray font-bold block mb-2">
                                                            Gênero
                                                        </label>
                                                        <div className="flex flex-wrap gap-2">
                                                            {GENERO_OPTIONS.map((g) => (
                                                                <button
                                                                    key={g}
                                                                    onClick={() => setFilterGenero(filterGenero === g ? null : g)}
                                                                    className={`px-3 py-1.5 rounded-full text-[10px] uppercase tracking-wider font-bold border
                                                                               transition-all duration-200 cursor-pointer
                                                                               ${filterGenero === g
                                                                            ? "bg-bd-salmon text-white border-bd-salmon"
                                                                            : "bg-white text-bd-charcoal border-bd-salmon/20 hover:border-bd-salmon"
                                                                        }`}
                                                                >
                                                                    {g}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* Tipo */}
                                                    <div>
                                                        <label className="text-[10px] uppercase tracking-widest text-bd-warm-gray font-bold block mb-2">
                                                            Tipo
                                                        </label>
                                                        <div className="flex flex-wrap gap-2">
                                                            {TIPO_OPTIONS.map((t) => (
                                                                <button
                                                                    key={t}
                                                                    onClick={() => setFilterTipo(filterTipo === t ? null : t)}
                                                                    className={`px-3 py-1.5 rounded-full text-[10px] uppercase tracking-wider font-bold border
                                                                               transition-all duration-200 cursor-pointer
                                                                               ${filterTipo === t
                                                                            ? "bg-bd-salmon text-white border-bd-salmon"
                                                                            : "bg-white text-bd-charcoal border-bd-salmon/20 hover:border-bd-salmon"
                                                                        }`}
                                                                >
                                                                    {t}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* Família */}
                                                    <div>
                                                        <label className="text-[10px] uppercase tracking-widest text-bd-warm-gray font-bold block mb-2">
                                                            Família Olfativa
                                                        </label>
                                                        <div className="flex flex-wrap gap-2">
                                                            {FAMILY_OPTIONS.map((f) => (
                                                                <button
                                                                    key={f}
                                                                    onClick={() => setFilterFamily(filterFamily === f ? null : f)}
                                                                    className={`px-3 py-1.5 rounded-full text-[10px] uppercase tracking-wider font-bold border
                                                                               transition-all duration-200 cursor-pointer
                                                                               ${filterFamily === f
                                                                            ? "bg-bd-salmon text-white border-bd-salmon"
                                                                            : "bg-white text-bd-charcoal border-bd-salmon/20 hover:border-bd-salmon"
                                                                        }`}
                                                                >
                                                                    {f}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            </section>

                            {/* Vitrine — Grid or List */}
                            <section className="container mx-auto px-6 md:px-8 pb-20">
                                {filteredPerfumes.length === 0 ? (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-center py-16"
                                    >
                                        <p className="text-bd-warm-gray font-light text-sm mb-2">
                                            Nenhum perfume encontrado.
                                        </p>
                                        <button
                                            onClick={clearFilters}
                                            className="text-bd-salmon text-xs uppercase tracking-widest font-bold hover:underline cursor-pointer"
                                        >
                                            Limpar filtros
                                        </button>
                                    </motion.div>
                                ) : (
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
                                                {filteredPerfumes.map((perfume, index) => (
                                                    <PerfumeCard
                                                        key={perfume._id}
                                                        perfume={perfume}
                                                        index={index}
                                                        layout="grid"
                                                        onClick={() => navigateToPDP(perfume)}
                                                        isFavorite={isFavorite(perfume._id)}
                                                        onToggleFavorite={toggleFavorite}
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
                                                {filteredPerfumes.map((perfume, index) => (
                                                    <PerfumeCard
                                                        key={perfume._id}
                                                        perfume={perfume}
                                                        index={index}
                                                        layout="list"
                                                        onClick={() => navigateToPDP(perfume)}
                                                        isFavorite={isFavorite(perfume._id)}
                                                        onToggleFavorite={toggleFavorite}
                                                    />
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                )}
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
                                perfumes={perfumes}
                                onComplete={(results, answers) => {
                                    setQuizResults(results);
                                    setQuizAnswers(answers);
                                    setView("result");
                                    window.scrollTo({ top: 0, behavior: "smooth" });
                                }}
                            />
                        </motion.section>
                    )}

                    {/* ==========================================
              RESULT VIEW
              ========================================== */}
                    {view === "result" && quizResults && quizResults.length > 0 && (
                        <QuizResult
                            key="result"
                            perfumes={quizResults}
                            answers={quizAnswers ?? undefined}
                            onExploreDetails={(perfume) => navigateToPDP(perfume)}
                            settings={settings}
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
                            allPerfumes={perfumes}
                            onNavigate={navigateToPDP}
                            settings={settings}
                            isFavorite={isFavorite(selectedPerfume._id)}
                            onToggleFavorite={toggleFavorite}
                        />
                    )}
                </AnimatePresence>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}
