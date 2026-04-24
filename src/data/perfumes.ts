// ==========================================
// BD COSMÉTICOS — Perfume Data (Mock)
// ==========================================

export interface PerfumeOlfactory {
  family: string;
  topNotes: string[];
  heartNotes: string[];
  baseNotes: string[];
}

export interface PerfumePerformance {
  longevity: string;
  sillage: string;
  occasion: string;
  season: string;
}

export interface PerfumeVisuals {
  imagePrompt: string;
}

export interface PerfumeQuizTags {
  vibe: "fresco" | "doce";
  intensity: "sedutor" | "marcante" | "poderoso";
}

export interface Perfume {
  id: string;
  slug: string;
  name: string;
  brand: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  olfactory: PerfumeOlfactory;
  performance: PerfumePerformance;
  visuals: PerfumeVisuals;
  quizTags: PerfumeQuizTags;
}

export const perfumesMock: Perfume[] = [
  {
    id: "arab-001",
    slug: "vulcan-feu",
    name: "Vulcan Feu",
    brand: "French Avenue",
    tagline: "O frescor vulcânico e a força do ambroxan.",
    shortDescription:
      "Uma obra-prima que equilibra cítricos efervescentes com madeiras densas.",
    fullDescription:
      "Vulcan Feu é a representação do poder masculino encapsulado. Abrindo com uma explosão cítrica e luminosa de toranja, ele rapidamente revela seu núcleo magnético dominado por um ambroxan de altíssima qualidade. Perfeito para quem busca uma presença limpa, mas autoritária.",
    olfactory: {
      family: "Cítrico Amadeirado",
      topNotes: ["Toranja", "Gengibre", "Bergamota"],
      heartNotes: ["Ambroxan", "Notas Minerais", "Pimenta Rosa"],
      baseNotes: ["Notas Amadeiradas", "Almíscar", "Vetiver"],
    },
    performance: {
      longevity: "8h-10h",
      sillage: "Intensa",
      occasion: "Trabalho / Eventos",
      season: "Verão / Primavera",
    },
    visuals: {
      imagePrompt:
        "https://wsrv.nl/?url=fimgs.net/mdimg/perfume/375x500.105520.jpg&w=600&fit=contain&bg=FAF6F3",
    },
    quizTags: { vibe: "fresco", intensity: "marcante" },
  },
  {
    id: "arab-002",
    slug: "liquid-brun",
    name: "Liquid Brun",
    brand: "French Avenue",
    tagline: "A doçura opulenta, quente e viciante.",
    shortDescription:
      "A interpretação definitiva da realeza gourmand árabe.",
    fullDescription:
      "Liquid Brun é um abraço quente e luxuoso. Com uma estrutura gourmand refinada, o pralinê e a baunilha de Madagascar são cortados por especiarias finas que impedem a fragrância de ser enjoativa.",
    olfactory: {
      family: "Âmbar Baunilha",
      topNotes: ["Flor de Laranjeira", "Bergamota", "Canela"],
      heartNotes: ["Baunilha", "Pralinê", "Elemi"],
      baseNotes: ["Almíscar", "Madeira de Guaiac", "Ambroxan"],
    },
    performance: {
      longevity: "12h+",
      sillage: "Radiante",
      occasion: "Encontros / Noite",
      season: "Inverno / Outono",
    },
    visuals: {
      imagePrompt:
        "https://wsrv.nl/?url=fimgs.net/mdimg/perfume/375x500.94713.jpg&w=600&fit=contain&bg=FAF6F3",
    },
    quizTags: { vibe: "doce", intensity: "sedutor" },
  },
  {
    id: "arab-005",
    slug: "club-de-nuit-intense",
    name: "Club de Nuit Intense",
    brand: "Armaf",
    tagline: "A lenda moderna que dispensa apresentações.",
    shortDescription:
      "A fera da Armaf. O perfume mais elogiado da década.",
    fullDescription:
      "A combinação de bétula esfumaçada, abacaxi e couro cria uma aura de masculinidade alfa que atrai a atenção de todos.",
    olfactory: {
      family: "Cítrico Especiado",
      topNotes: ["Limão", "Abacaxi", "Groselha"],
      heartNotes: ["Bétula", "Jasmim"],
      baseNotes: ["Almíscar", "Âmbar Gris", "Patchouli"],
    },
    performance: {
      longevity: "12h+",
      sillage: "Monstruosa",
      occasion: "Versátil",
      season: "Todas",
    },
    visuals: {
      imagePrompt:
        "https://wsrv.nl/?url=fimgs.net/mdimg/perfume/375x500.34696.jpg&w=600&fit=contain&bg=FAF6F3",
    },
    quizTags: { vibe: "fresco", intensity: "poderoso" },
  },
];
