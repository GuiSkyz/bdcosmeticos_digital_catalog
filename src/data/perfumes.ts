// ==========================================
// BD COSMÉTICOS — Types (Sanity)
// ==========================================

export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
}

// --- Nota Olfativa (Referência expandida) ---
export interface NotaOlfativa {
  _id: string;
  name: string;
  category?: string;
}

// --- Site Settings ---
export interface SiteSettings {
  whatsappNumber: string;
  whatsappMessage?: string;
  instagramUrl?: string;
  catalogTitle?: string;
  catalogDescription?: string;
}

// --- Enums Padronizados ---
export type Fixacao = "Íntima" | "Moderada" | "Longa" | "Eterna";
export type Projecao = "Discreta" | "Moderada" | "Marcante" | "Intensa";
export type Estacao = "Verão" | "Primavera" | "Outono" | "Inverno" | "Versátil";
export type Ocasiao = "Dia a Dia" | "Trabalho" | "Encontro" | "Formal" | "Balada" | "Assinatura";
export type Genero = "Masculino" | "Feminino" | "Unissex";
export type TipoPerfume = "Árabe" | "Importado" | "Nacional";
export type Concentracao = "EDC" | "EDT" | "EDP" | "Parfum";

// --- Quiz Enums ---
export type QuizVibe = "elegante" | "fresco" | "misterioso" | "aconchegante";
export type QuizCenario = "trabalho" | "encontro" | "passeio" | "balada";
export type QuizPresenca = "intima" | "moderada" | "avassaladora";
export type QuizAroma = "citrico" | "floral" | "amadeirado" | "gourmand";
export type QuizTipo = "arabe" | "importado" | "nacional" | "tanto_faz";

export interface Perfume {
  _id: string;
  slug: { _type: "slug"; current: string };
  name: string;
  brand: string;
  tagline?: string;
  shortDescription?: string;
  fullDescription?: string;
  image?: SanityImage;
  gallery?: SanityImage[];

  // Detalhes do produto
  genero?: Genero;
  tipo?: TipoPerfume;
  concentracao?: Concentracao;
  volumes?: string[];
  preco?: number;

  // Olfactory (dereferenced notes)
  olfactoryFamily?: string;
  topNotes?: NotaOlfativa[];
  heartNotes?: NotaOlfativa[];
  baseNotes?: NotaOlfativa[];

  // Performance (padronizado)
  longevity?: Fixacao;
  sillage?: Projecao;
  occasion?: Ocasiao;
  season?: Estacao;

  // Quiz tags (5 dimensões)
  quizVibe?: QuizVibe;
  quizCenario?: QuizCenario;
  quizPresenca?: QuizPresenca;
  quizAroma?: QuizAroma;
  quizTipo?: QuizTipo;
}
