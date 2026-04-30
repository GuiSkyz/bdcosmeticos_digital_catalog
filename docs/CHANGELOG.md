# Changelog — BD Cosméticos Digital Catalog

> **Autor:** Tech Lead / Engenheiro de Software  
> **Última atualização:** 30 de Abril de 2026  
> **Versão atual:** 2.1.0

---

## [2.1.0] — 2026-04-30 — Tipo do Perfume (Árabe / Importado / Nacional)

### Adicionado

#### Schema Sanity (`perfumeType.ts`)
- **Campo `tipo`** — Radio com 3 opções: Árabe, Importado, Nacional (grupo "Detalhes do Produto")
- **Campo `quizTipo`** — Radio com 4 opções: Árabe, Importado, Nacional, Tanto Faz (grupo "Tags do Quiz")

#### Tipos TypeScript (`data/perfumes.ts`)
- Novo tipo `TipoPerfume = "Árabe" | "Importado" | "Nacional"`
- Novo tipo `QuizTipo = "arabe" | "importado" | "nacional" | "tanto_faz"`
- Campo `tipo?: TipoPerfume` adicionado à interface `Perfume`
- Campo `quizTipo?: QuizTipo` adicionado à interface `Perfume`

#### GROQ Query (`app/page.tsx`)
- Campos `tipo` e `quizTipo` incluídos na consulta de perfumes

#### Quiz Olfativo (`OlfactoryQuiz.tsx`)
- **5ª pergunta adicionada:** "Qual a origem do seu perfume ideal?"
  - Opções: 🕌 Árabe, ✈️ Importado, 🇧🇷 Nacional, 🌍 Tanto Faz
- Campo `tipo` adicionado à interface `QuizAnswers`
- Algoritmo de scoring atualizado: peso 2 para match exato, peso 1 para "Tanto Faz"
- Score máximo possível passou de 10 para 12

#### Resultado do Quiz (`QuizResult.tsx`)
- Labels de tipo adicionados (`tipoLabels`) para a justificativa
- Texto da justificativa inclui preferência de origem

#### Filtros do Catálogo (`CatalogApp.tsx`)
- **Novo filtro "Tipo"** — Árabe / Importado / Nacional (botões pill)
- Grid de filtros expandido para 3 colunas (Gênero, Tipo, Família)
- Estado `filterTipo` com lógica de limpeza e acumulação

#### Página de Detalhes (`ProductDetailPage.tsx`)
- **Badge "Tipo"** com ícone 🌍 (Globe) exibido junto aos badges de Gênero/Concentração/Volume

#### Card do Perfume (`PerfumeCard.tsx`)
- Tipo exibido na linha de subtítulo (ex: `Marca • Árabe • EDP`) nos dois layouts (grid e list)

### Arquivos Alterados

| Arquivo | Alteração |
|---------|-----------|
| `src/sanity/schemaTypes/perfumeType.ts` | +2 campos (`tipo`, `quizTipo`) |
| `src/data/perfumes.ts` | +2 tipos, +2 campos na interface |
| `src/app/page.tsx` | +2 campos na GROQ query |
| `src/components/OlfactoryQuiz.tsx` | +1 pergunta, scoring atualizado |
| `src/components/QuizResult.tsx` | +labels de tipo, justificativa |
| `src/components/CatalogApp.tsx` | +filtro Tipo, grid 3 colunas |
| `src/components/ProductDetailPage.tsx` | +badge Tipo com ícone Globe |
| `src/components/PerfumeCard.tsx` | +tipo no subtítulo (grid e list) |

---

## [2.0.0] — 2026-04-29 — Catálogo Profissional

---

## Visão Geral

Esta atualização transformou o catálogo digital de uma aplicação básica (MVP) em um produto de nível profissional, adicionando campos essenciais de perfumaria, ferramentas de busca e filtragem, favoritos offline e uma experiência de produto (PDP) completa.

---

## 1. Schema do Sanity CMS (`perfumeType.ts`)

### ANTES
```
groups: [Informações Básicas, Pirâmide Olfativa, Performance, Tags do Quiz]
fields: name, brand, slug, tagline, shortDescription, fullDescription, image
         olfactoryFamily, topNotes, heartNotes, baseNotes
         longevity, sillage, occasion, season
         quizVibe, quizCenario, quizPresenca, quizAroma
```

### DEPOIS
```
groups: [Informações Básicas, Detalhes do Produto (NOVO), Pirâmide, Performance, Quiz]
fields: 
  + gallery          → array de imagens (lifestyle, ângulos, embalagem)
  + genero           → radio: Masculino / Feminino / Unissex
  + concentracao     → radio: EDC / EDT / EDP / Parfum
  + volumes          → array: 30ml, 50ml, 75ml, 100ml, 125ml, 200ml
  + preco            → number (validação positive)
```

### POR QUE MUDOU?
- **Gênero, concentração e volume** são informações básicas que qualquer cliente de perfume espera ver. Sem esses dados, o catálogo parecia incompleto.
- **Preço** — mesmo com venda via WhatsApp, exibir o preço gera transparência e confiança.
- **Galeria** — um perfume premium precisa de mais de uma foto (produto, embalagem, lifestyle).

---

## 2. Novo Schema: `siteSettingsType.ts` (CRIADO)

### ANTES
O número de WhatsApp (`5500000000000`) estava **hardcoded** no código-fonte. Para trocar o número, era necessário editar o código e fazer um novo deploy.

### DEPOIS
```typescript
// siteSettingsType.ts — Documento Singleton no Sanity
fields: [
  whatsappNumber,     // "5511999999999"
  whatsappMessage,    // "Olá! Gostaria de saber sobre o {perfume}."
  instagramUrl,       // URL do Instagram
  catalogTitle,       // Título SEO do site
  catalogDescription, // Meta description
]
```

### POR QUE MUDOU?
O cliente pode trocar o número de WhatsApp, o texto da mensagem e o link do Instagram **diretamente pelo Sanity Studio**, sem precisar de um programador ou deploy.

---

## 3. Tipos TypeScript (`data/perfumes.ts`)

### ANTES
```typescript
export interface Perfume {
  _id: string;
  slug, name, brand, tagline, ...
  image?: SanityImage;
  olfactoryFamily?, topNotes?, heartNotes?, baseNotes?
  longevity?, sillage?, occasion?, season?
  quizVibe?, quizCenario?, quizPresenca?, quizAroma?
}
```

### DEPOIS
```typescript
export interface SiteSettings {
  whatsappNumber: string;
  whatsappMessage?: string;
  instagramUrl?: string;
  catalogTitle?: string;
  catalogDescription?: string;
}

export type Genero = "Masculino" | "Feminino" | "Unissex";
export type Concentracao = "EDC" | "EDT" | "EDP" | "Parfum";

export interface Perfume {
  // ... tudo que existia antes +
  gallery?: SanityImage[];
  genero?: Genero;
  concentracao?: Concentracao;
  volumes?: string[];
  preco?: number;
}
```

### POR QUE MUDOU?
Os tipos TypeScript são o "contrato" entre o Sanity CMS e o frontend. Se adicionamos campos no Sanity, **obrigatoriamente** precisamos refletir no tipo TypeScript. Isso garante autocomplete, validação e prevenção de erros.

---

## 4. Next.js Config (`next.config.ts`)

### ANTES
```typescript
const nextConfig: NextConfig = {
  /* vazio */
};
```

### DEPOIS
```typescript
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io", pathname: "/images/**" },
    ],
  },
};
```

### POR QUE MUDOU?
O componente `next/image` da Next.js **precisa saber quais domínios são permitidos** para servir imagens otimizadas. Sem essa configuração, o `<Image>` do Next.js retornaria erro ao tentar carregar imagens do CDN do Sanity.

---

## 5. `PerfumeCard.tsx` — Card de Produto

### ANTES
- Usava `<img>` com `eslint-disable`
- Sem botão de favoritar
- Sem preço
- Sem concentração

### DEPOIS
- Usa `next/image` (otimização automática: WebP/AVIF, lazy loading)
- Botão de coração para favoritar
- Exibe preço formatado (R$)
- Exibe concentração (EDP, EDT, etc.)
- Props: `isFavorite` e `onToggleFavorite`

---

## 6. `OlfactoryQuiz.tsx` — Quiz Olfativo

### ANTES
- Sem botão "Voltar" — se o usuário errava uma resposta, precisava refazer tudo

### DEPOIS
- Botão "← Voltar" aparece a partir do Passo 2
- Animação suave ao voltar
- Não reseta as respostas anteriores

---

## 7. `ProductDetailPage.tsx` — Página de Detalhes

### ANTES
- 1 imagem fixa
- WhatsApp hardcoded
- Sem tags de gênero/concentração/volume
- Sem preço
- Sem botão de compartilhar
- Sem seção "Perfumes Similares"
- Sem botão de favoritar

### DEPOIS
- **Galeria de imagens** com thumbnails clicáveis
- **WhatsApp dinâmico** via `siteSettings`
- **Tags visuais**: Gênero, Concentração, Volume
- **Preço formatado** em destaque
- **Botão Compartilhar** (Web Share API com fallback para clipboard)
- **Seção "Perfumes Similares"** baseada na família olfativa
- **Botão Favoritar** (coração)
- Usa `next/image` em todos os pontos

---

## 8. `CatalogApp.tsx` — Aplicação Principal

### ANTES
- Lista todos os perfumes sem filtro
- Sem barra de busca
- Sem filtros
- Sem favoritos

### DEPOIS
- **Barra de Busca** — filtra por nome, marca ou família olfativa
- **Filtro por Gênero** — Masculino / Feminino / Unissex
- **Filtro por Família Olfativa** — 10 opções
- **Filtro Favoritos** — mostra apenas os perfumes curtidos
- **Estado vazio** — mensagem amigável quando nenhum resultado é encontrado
- **Limpar filtros** — botão de reset

---

## 9. `useFavorites.ts` — Hook de Favoritos (CRIADO)

### ANTES
Não existia.

### DEPOIS
```typescript
export function useFavorites() {
  // Lê do localStorage ao montar
  // Persiste automaticamente ao mudar
  return { favorites, toggleFavorite, isFavorite };
}
```
Permite que o cliente "curta" perfumes sem precisar de login. Persiste entre sessões via `localStorage`.

---

## 10. GROQ Query (`page.tsx`)

### ANTES
```groq
*[_type == "perfume"] {
  _id, name, brand, slug, tagline, shortDescription, fullDescription, image,
  olfactoryFamily, topNotes[]->{...}, heartNotes[]->{...}, baseNotes[]->{...},
  longevity, sillage, occasion, season,
  quizVibe, quizCenario, quizPresenca, quizAroma
}
```

### DEPOIS
```groq
*[_type == "perfume"] | order(name asc) {
  ...tudo anterior +
  gallery,
  genero,
  concentracao,
  volumes,
  preco
}

// + Nova query separada:
*[_type == "siteSettings"][0] {
  whatsappNumber, whatsappMessage, instagramUrl, catalogTitle, catalogDescription
}
```

### POR QUE MUDOU?
- Novos campos precisam ser buscados na query
- A `siteSettings` é um documento singleton (por isso `[0]`)
- Adicionamos `| order(name asc)` para ordenação alfabética

---

## Resumo de Arquivos

| Arquivo | Status | Descrição |
|---------|--------|-----------|
| `src/sanity/schemaTypes/siteSettingsType.ts` | 🆕 CRIADO | Schema de configurações do site |
| `src/sanity/schemaTypes/perfumeType.ts` | ✏️ ALTERADO | +5 campos, +1 grupo |
| `src/sanity/schemaTypes/index.ts` | ✏️ ALTERADO | Registrou siteSettingsType |
| `src/data/perfumes.ts` | ✏️ ALTERADO | +SiteSettings, +Genero, +Concentracao |
| `next.config.ts` | ✏️ ALTERADO | Configuração de imagens remotas |
| `src/app/page.tsx` | ✏️ ALTERADO | 2 queries GROQ, passa settings |
| `src/lib/useFavorites.ts` | 🆕 CRIADO | Hook de favoritos (localStorage) |
| `src/components/PerfumeCard.tsx` | ✏️ REESCRITO | next/image, favoritos, preço |
| `src/components/OlfactoryQuiz.tsx` | ✏️ ALTERADO | Botão "Voltar" |
| `src/components/ProductDetailPage.tsx` | ✏️ REESCRITO | Galeria, share, similares, favs |
| `src/components/CatalogApp.tsx` | ✏️ REESCRITO | Busca, filtros, favoritos |

---

## ⚠️ Bugfix Detectado e Corrigido Durante Testes

**Arquivo:** `ProductDetailPage.tsx`  
**Problema:** Quando notas olfativas são referências no Sanity mas os documentos referenciados não existem (foram deletados ou nunca criados), o GROQ retorna `null` dentro do array. O `.map()` tentava acessar `note._id` de um item `null`, causando crash.

**Solução:** Adicionamos `.filter(Boolean)` antes de `.map()` em todos os arrays de notas:
```diff
- {(perfume.topNotes ?? []).map((note) => ...)}
+ {(perfume.topNotes ?? []).filter(Boolean).map((note) => ...)}
```

**Lição:** Sempre adicione `.filter(Boolean)` antes de iterar sobre arrays que vêm de referências do Sanity.
