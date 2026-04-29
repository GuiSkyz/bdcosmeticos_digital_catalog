# 📋 Relatório de Integração — Dados Mock → Sanity CMS

**Projeto:** BD Cosméticos — Catálogo Digital  
**Data:** 28 de Abril de 2026  
**Tipo de mudança:** Migração da fonte de dados (Mock Local → Sanity CMS)

---

## 🧠 O que aconteceu? (Contexto do Problema)

O catálogo estava usando **dados hardcoded** — ou seja, os perfumes estavam escritos "na mão" direto no código TypeScript, dentro de um array chamado `perfumesMock`. Isso significa que para adicionar, editar ou remover um perfume, seria necessário **mexer no código** e fazer deploy novamente.

Com o **Sanity CMS** já configurado no projeto, o objetivo era passar a buscar os dados **dinamicamente do Sanity**, permitindo que os perfumes sejam gerenciados pelo painel administrativo (Sanity Studio) sem tocar em código.

### O erro que apareceu

```
'Perfume' only refers to a type, but is being used as a value here.
```

Esse erro acontecia porque alguém escreveu `perfumes={Perfume}` na `page.tsx`. `Perfume` é uma **interface TypeScript** — ela descreve o *formato* dos dados, mas **não é** os dados em si. É como se você passasse o *molde de uma forma de bolo* em vez do *bolo pronto*.

---

## 🏗️ Visão Geral da Arquitetura

### ANTES (Mock Local)

```
perfumes.ts (dados hardcoded) ──► page.tsx ──► CatalogApp
                                                 ├── PerfumeCard
                                                 ├── ProductDetailPage
                                                 ├── OlfactoryQuiz (importava mock direto)
                                                 └── QuizResult
```

> Os dados vinham de um **arquivo .ts local** com 3 perfumes escritos na mão.

### DEPOIS (Sanity CMS)

```
☁️ Sanity CMS (banco na nuvem)
       │
       │ GROQ Query
       ▼
  page.tsx (Server Component)
       │
       │ props
       ▼
   CatalogApp
       ├── PerfumeCard
       ├── ProductDetailPage
       ├── OlfactoryQuiz (recebe perfumes via prop)
       └── QuizResult
```

> Os dados agora vêm do **Sanity CMS** via query GROQ, passados por **props** para os componentes.

---

## 📁 Arquivo por Arquivo — Antes vs Depois

---

### 1. `src/data/perfumes.ts` — O Tipo de Dados

**O que este arquivo faz:** Define a "forma" (interface TypeScript) que descreve como um objeto de perfume deve ser estruturado.

#### ❌ ANTES — Estrutura aninhada + dados mock

```typescript
// Interfaces com objetos ANINHADOS
export interface Perfume {
  id: string;               // ID inventado ("arab-001")
  slug: string;              // slug como string simples
  name: string;
  brand: string;
  olfactory: {               // 👈 objeto aninhado
    family: string;
    topNotes: string[];
    heartNotes: string[];
    baseNotes: string[];
  };
  performance: {             // 👈 outro objeto aninhado
    longevity: string;
    sillage: string;
    occasion: string;
    season: string;
  };
  visuals: {                 // 👈 mais um aninhamento
    imagePrompt: string;     // URL externa hardcoded
  };
  quizTags: {                // 👈 e mais um
    vibe: "fresco" | "doce";
    intensity: "sedutor" | "marcante" | "poderoso";
  };
}

// Array com 3 perfumes escritos na mão
export const perfumesMock: Perfume[] = [
  { id: "arab-001", name: "Vulcan Feu", ... },
  { id: "arab-002", name: "Liquid Brun", ... },
  { id: "arab-005", name: "Club de Nuit Intense", ... },
];
```

#### ✅ DEPOIS — Estrutura flat alinhada ao Sanity

```typescript
// Interface que espelha EXATAMENTE o que o Sanity retorna
export interface Perfume {
  _id: string;                          // ID do Sanity (gerado automaticamente)
  slug: { _type: "slug"; current: string }; // Slug como objeto do Sanity
  name: string;
  brand: string;
  image?: SanityImage;                  // Referência de asset do Sanity

  // Campos FLAT (sem aninhamento)
  olfactoryFamily?: string;             // era olfactory.family
  topNotes?: string[];                  // era olfactory.topNotes
  heartNotes?: string[];                // era olfactory.heartNotes
  baseNotes?: string[];                 // era olfactory.baseNotes
  longevity?: string;                   // era performance.longevity
  sillage?: string;                     // era performance.sillage
  occasion?: string;                    // era performance.occasion
  season?: string;                      // era performance.season
  quizVibe?: "fresco" | "doce";         // era quizTags.vibe
  quizIntensity?: "sedutor" | "marcante" | "poderoso"; // era quizTags.intensity
}

// ❌ perfumesMock foi REMOVIDO — dados agora vêm do Sanity
```

> **📌 Por que flat?** Quando você cria fields no Sanity Schema, eles ficam todos no nível raiz do documento. Não existe `olfactory.topNotes` — existe só `topNotes`. A interface precisa espelhar isso.

> **💡 Dica:** Os campos opcionais (`?`) foram adicionados porque um perfume pode ser cadastrado no Sanity Studio sem preencher todos os campos. Sem o `?`, o TypeScript reclamaria se algum campo viesse `undefined`.

---

### 2. `src/app/page.tsx` — A Página Principal

**O que este arquivo faz:** É o ponto de entrada da aplicação. Busca os dados e entrega para o componente `CatalogApp`.

#### ❌ ANTES — Importava mock + passava tipo como valor

```tsx
import { perfumesMock } from "@/data/perfumes";
import { CatalogApp } from "@/components/CatalogApp";
import { Perfume } from "@/data/perfumes";  // 👈 importava o TIPO

export default function HomePage() {
  return <CatalogApp perfumes={Perfume} />;
  //                           ^^^^^^^ ERRO! Perfume é um tipo, não dados
}
```

#### ✅ DEPOIS — Server Component que busca do Sanity

```tsx
import { client } from "@/sanity/lib/client";
import { CatalogApp } from "@/components/CatalogApp";
import type { Perfume } from "@/data/perfumes";

// Query GROQ — a "linguagem SQL" do Sanity
const PERFUMES_QUERY = `*[_type == "perfume"] | order(name asc) {
  _id, name, brand, slug, tagline, shortDescription, fullDescription,
  image, olfactoryFamily, topNotes, heartNotes, baseNotes,
  longevity, sillage, occasion, season, quizVibe, quizIntensity
}`;

// 👇 "async" = função assíncrona (espera os dados chegarem)
export default async function HomePage() {
  const perfumes = await client.fetch<Perfume[]>(PERFUMES_QUERY);
  return <CatalogApp perfumes={perfumes} />;
}
```

> **📝 Nota:** **Server Component** é um componente que roda **no servidor** do Next.js, não no navegador. Isso significa que a query ao Sanity acontece antes da página ser enviada ao usuário — o HTML já chega pronto com os dados. Mais rápido, mais seguro (o token nunca vai pro browser).

> **💡 Dica:** **GROQ** (Graph-Relational Object Queries) é a linguagem de consulta do Sanity. O `*[_type == "perfume"]` significa "pega todos os documentos do tipo perfume". O `| order(name asc)` ordena por nome alfabeticamente.

---

### 3. `src/components/CatalogApp.tsx` — O Componente Central

**O que este arquivo faz:** Gerencia toda a navegação entre views (home, quiz, resultado, página do produto).

#### Mudanças pontuais:

| Linha | Antes | Depois | Por quê |
|-------|-------|--------|---------|
| `key` do map | `key={perfume.id}` | `key={perfume._id}` | O Sanity usa `_id` (com underscore) como identificador |
| OlfactoryQuiz | `<OlfactoryQuiz onComplete={...} />` | `<OlfactoryQuiz perfumes={perfumes} onComplete={...} />` | Quiz precisa dos dados para fazer o match |

> **📝 Nota:** O `key` no React é obrigatório quando renderizamos listas. Ele precisa ser um **valor único** — o `_id` do Sanity é perfeito para isso porque é garantidamente único.

---

### 4. `src/components/PerfumeCard.tsx` — Card de Perfume

**O que este arquivo faz:** Renderiza cada perfume na vitrine (grid ou lista).

#### Mudanças nos acessos a dados:

```diff
- import type { Perfume } from "@/data/perfumes";
+ import type { Perfume } from "@/data/perfumes";
+ import { urlFor } from "@/sanity/lib/image";     // 👈 novo import

  // IMAGENS
- src={perfume.visuals.imagePrompt}                 // URL direta (hardcoded)
+ src={perfume.image                                // Referência do Sanity
+   ? urlFor(perfume.image).width(400).url()         // transforma em URL real
+   : "/placeholder.png"}                            // fallback se não tiver imagem

  // FAMÍLIA OLFATIVA
- {perfume.brand} • {perfume.olfactory.family}
+ {perfume.brand}{perfume.olfactoryFamily ? ` • ${perfume.olfactoryFamily}` : ""}

  // PERFORMANCE
- {perfume.performance.longevity}
+ {perfume.longevity ?? "—"}                         // "—" se não existir

- {perfume.performance.sillage}
+ {perfume.sillage ?? "—"}
```

> **⚠️ Importante:** **`urlFor()`** é uma função utilitária do Sanity que transforma a referência de asset (`image-05ce9a...png`) em uma URL real de imagem otimizada. O `.width(400)` pede uma versão com 400px de largura — o Sanity redimensiona automaticamente na CDN.

> **💡 Dica:** O operador **`??`** é o "nullish coalescing". Ele retorna o valor da direita **somente** se o da esquerda for `null` ou `undefined`. É diferente do `||` que também dispara para `""` e `0`.

---

### 5. `src/components/ProductDetailPage.tsx` — Página de Detalhe

**O que este arquivo faz:** Mostra todos os detalhes de um perfume ao clicar nele.

#### Mesma lógica do PerfumeCard:

```diff
  // IMAGEM
- src={perfume.visuals.imagePrompt}
+ src={perfume.image ? urlFor(perfume.image).width(600).url() : "/placeholder.png"}

  // FAMÍLIA
- {perfume.brand} • {perfume.olfactory.family}
+ {perfume.brand}{perfume.olfactoryFamily ? ` • ${perfume.olfactoryFamily}` : ""}

  // NOTAS OLFATIVAS (com proteção contra undefined)
- {perfume.olfactory.topNotes.map(...)}
+ {(perfume.topNotes ?? []).map(...)}        // se for undefined, usa array vazio

- {perfume.olfactory.heartNotes.map(...)}
+ {(perfume.heartNotes ?? []).map(...)}

- {perfume.olfactory.baseNotes.map(...)}
+ {(perfume.baseNotes ?? []).map(...)}

  // PERFORMANCE
- value={perfume.performance.longevity}
+ value={perfume.longevity ?? "—"}

- value={perfume.performance.sillage}
+ value={perfume.sillage ?? "—"}

- value={perfume.performance.occasion}
+ value={perfume.occasion ?? "—"}

- value={perfume.performance.season}
+ value={perfume.season ?? "—"}
```

> **⚠️ Cuidado:** **Sem o `?? []`**, se `topNotes` viesse `undefined` do Sanity (perfume ainda não preenchido completamente), o `.map()` causaria erro: `Cannot read properties of undefined (reading 'map')`. O `?? []` garante que sempre teremos um array, mesmo que vazio.

---

### 6. `src/components/OlfactoryQuiz.tsx` — Quiz Olfativo

**O que este arquivo faz:** Faz perguntas ao usuário e encontra o perfume ideal com base nas respostas.

#### ❌ ANTES — Importava mock direto

```tsx
import { perfumesMock, type Perfume } from "@/data/perfumes";

interface OlfactoryQuizProps {
  onComplete: (result: Perfume) => void;
  // ❌ não recebia perfumes — buscava do mock direto
}

export function OlfactoryQuiz({ onComplete }: OlfactoryQuizProps) {
  // ...
  const exactMatch = perfumesMock.find(
    (p) => p.quizTags.vibe === newAnswers.vibe &&     // 👈 estrutura aninhada
           p.quizTags.intensity === newAnswers.intensity
  );
  onComplete(exactMatch || partialMatch || perfumesMock[0]);
}
```

#### ✅ DEPOIS — Recebe perfumes via prop

```tsx
import type { Perfume } from "@/data/perfumes";
// ❌ não importa mais perfumesMock

interface OlfactoryQuizProps {
  perfumes: Perfume[];  // 👈 novo! recebe dados via prop
  onComplete: (result: Perfume) => void;
}

export function OlfactoryQuiz({ perfumes, onComplete }: OlfactoryQuizProps) {
  // ...
  const exactMatch = perfumes.find(       // 👈 usa a prop
    (p) => p.quizVibe === newAnswers.vibe &&          // 👈 flat
           p.quizIntensity === newAnswers.intensity
  );
  onComplete(exactMatch || partialMatch || perfumes[0]);
}
```

> **📝 Nota:** **Por que passar por prop em vez de importar?** Porque `perfumesMock` não existe mais. Os dados agora vêm do Sanity, e o fluxo correto no Next.js App Router é: **Server Component busca → passa por props → Client Components usam**. Isso mantém uma "fonte única de verdade" (single source of truth).

---

### 7. `src/components/QuizResult.tsx` — Resultado do Quiz

**O que este arquivo faz:** Mostra o perfume recomendado pelo quiz.

```diff
+ import { urlFor } from "@/sanity/lib/image";

  // IMAGEM
- src={perfume.visuals.imagePrompt}
+ src={perfume.image ? urlFor(perfume.image).width(500).url() : "/placeholder.png"}
```

---

## 🗺️ Mapa de Correspondência — Campos Antigos vs Novos

| Acesso Antigo (Mock) | Acesso Novo (Sanity) | Tipo |
|---|---|---|
| `perfume.id` | `perfume._id` | `string` |
| `perfume.slug` | `perfume.slug.current` | `string` |
| `perfume.visuals.imagePrompt` | `urlFor(perfume.image).url()` | `string` (URL) |
| `perfume.olfactory.family` | `perfume.olfactoryFamily` | `string?` |
| `perfume.olfactory.topNotes` | `perfume.topNotes` | `string[]?` |
| `perfume.olfactory.heartNotes` | `perfume.heartNotes` | `string[]?` |
| `perfume.olfactory.baseNotes` | `perfume.baseNotes` | `string[]?` |
| `perfume.performance.longevity` | `perfume.longevity` | `string?` |
| `perfume.performance.sillage` | `perfume.sillage` | `string?` |
| `perfume.performance.occasion` | `perfume.occasion` | `string?` |
| `perfume.performance.season` | `perfume.season` | `string?` |
| `perfume.quizTags.vibe` | `perfume.quizVibe` | `string?` |
| `perfume.quizTags.intensity` | `perfume.quizIntensity` | `string?` |

---

## 📌 Conceitos Chave para Memorizar

### 1. Tipo vs Valor

```typescript
// TIPO — descreve formato, só existe em tempo de compilação
interface Perfume { name: string; brand: string; }

// VALOR — dados reais, existem em tempo de execução
const meuPerfume: Perfume = { name: "Vulcan", brand: "French Avenue" };

// ❌ ERRADO: passar o tipo como se fosse dados
<CatalogApp perfumes={Perfume} />

// ✅ CERTO: passar os dados
<CatalogApp perfumes={meuPerfume} />
```

### 2. Server Component vs Client Component

| | Server Component | Client Component |
|---|---|---|
| Onde roda | Servidor (Node.js) | Navegador |
| Pode usar `async/await` | ✅ Sim | ❌ Não |
| Pode usar `useState/useEffect` | ❌ Não | ✅ Sim |
| Pode acessar banco de dados | ✅ Sim | ❌ Não |
| Precisa de `"use client"` | Não (padrão) | Sim |

### 3. O Fluxo de Dados no Next.js App Router

```
Sanity CMS (nuvem)
    ↓ GROQ query
page.tsx (Server Component) — busca dados
    ↓ props
CatalogApp (Client Component) — gerencia estado/UI
    ↓ props
PerfumeCard, ProductDetailPage, etc. — renderizam dados
```

---

## ✅ Resultado Final

- O catálogo agora busca perfumes **dinamicamente do Sanity**
- Para adicionar novos perfumes, basta cadastrar no **Sanity Studio**
- Não é mais necessário alterar código para atualizar o catálogo
- A imagem do Sanity é resolvida via **CDN otimizada** com `urlFor()`
- Todos os campos são **protegidos contra undefined** (`??`)
