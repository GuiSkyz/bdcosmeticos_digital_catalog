# Manual do Catálogo Digital — BD Cosméticos

> **Versão:** 2.2.0  
> **Tecnologias:** Next.js 16, TypeScript, Sanity CMS, Tailwind CSS  
> **Público-alvo:** Desenvolvedores que irão dar manutenção no projeto

---

## Sumário

1. [Arquitetura do Projeto](#1-arquitetura-do-projeto)
2. [Como Rodar Localmente](#2-como-rodar-localmente)
3. [Estrutura de Pastas](#3-estrutura-de-pastas)
4. [Sanity CMS — Schemas e Studio](#4-sanity-cms--schemas-e-studio)
5. [Fluxo de Dados (GROQ → Components)](#5-fluxo-de-dados-groq--components)
6. [Componentes Principais](#6-componentes-principais)
7. [Quiz Olfativo — Como Funciona](#7-quiz-olfativo--como-funciona)
8. [Favoritos (localStorage)](#8-favoritos-localstorage)
9. [Busca e Filtros](#9-busca-e-filtros)
10. [Como Adicionar um Novo Perfume](#10-como-adicionar-um-novo-perfume)
11. [Como Alterar o WhatsApp](#11-como-alterar-o-whatsapp)
12. [Deploy](#12-deploy)

---

## 1. Arquitetura do Projeto

```
Cliente (Browser)
    ↓
Next.js (Server Components)
    ↓ GROQ Queries
Sanity CMS (Content Lake)
    ↓ CDN
Sanity Image CDN (cdn.sanity.io)
```

**O fluxo é:**
1. O `page.tsx` (Server Component) faz 2 queries GROQ para o Sanity
2. Os dados retornam como JSON
3. O `CatalogApp` (Client Component) recebe os dados via `props`
4. Toda interatividade (quiz, filtros, favoritos) acontece no client

---

## 2. Como Rodar Localmente

```bash
# 1. Instalar dependências
npm install

# 2. Criar o arquivo .env.local (se não existir)
# Crie na raiz do projeto com:
NEXT_PUBLIC_SANITY_PROJECT_ID=seu_project_id
NEXT_PUBLIC_SANITY_DATASET=production

# 3. Iniciar o dev server
npm run dev

# 4. Abrir no browser
# App:    http://localhost:3000
# Studio: http://localhost:3000/studio
```

---

## 3. Estrutura de Pastas

```
src/
├── app/
│   ├── page.tsx             ← Server Component (GROQ queries)
│   ├── layout.tsx           ← Layout raiz (fontes, metadata)
│   ├── globals.css          ← Design tokens (cores, variáveis)
│   └── studio/              ← Sanity Studio embeddido
│
├── components/
│   ├── CatalogApp.tsx       ← Componente principal (orquestra tudo)
│   ├── Navbar.tsx           ← Navegação fixa no topo
│   ├── HeroSection.tsx      ← Seção de destaque com CTA
│   ├── PerfumeCard.tsx      ← Card do perfume (grid e list)
│   ├── ProductDetailPage.tsx← Página de detalhes completa (PDP)
│   ├── OlfactoryQuiz.tsx    ← Quiz de 5 perguntas
│   ├── QuizResult.tsx       ← Resultado do quiz
│   ├── Footer.tsx           ← Rodapé
│   └── ui/                  ← Componentes base (shadcn/ui)
│
├── data/
│   └── perfumes.ts          ← Tipos TypeScript (interfaces e enums)
│
├── lib/
│   └── useFavorites.ts      ← Hook de favoritos (localStorage)
│
└── sanity/
    ├── env.ts               ← Variáveis de ambiente do Sanity
    ├── lib/
    │   ├── client.ts        ← Cliente Sanity (next-sanity)
    │   └── image.ts         ← Helper para URLs de imagem
    └── schemaTypes/
        ├── index.ts         ← Registro de schemas
        ├── perfumeType.ts   ← Schema do documento Perfume
        ├── notaOlfativaType.ts ← Schema de Notas Olfativas
        └── siteSettingsType.ts ← Schema de Configurações do Site
```

---

## 4. Sanity CMS — Schemas e Studio

### 4.1. Perfume (`perfumeType`)

Cada perfume no CMS tem **5 abas** no editor:

| Aba | Campos |
|-----|--------|
| **Informações Básicas** | Nome, Marca (Referência), Slug, Destaque, Lançamento, Tagline, Descrição Curta, Descrição Completa, Foto Principal, Galeria |
| **Detalhes do Produto** | Gênero, Tipo (Árabe/Importado/Nacional), Concentração, **Variações** (array com Volume, Preço e Status de Disponibilidade) |
| **Pirâmide Olfativa** | Família Olfativa (dropdown), Notas de Topo/Coração/Fundo (referências) |
| **Performance** | Fixação (radio), Projeção (radio), Ocasião (dropdown), Estação (dropdown) |
| **Tags do Quiz** | Vibe, Cenário, Presença, Aroma, Tipo Preferido (todos radio) |

### 4.2. Marcas e Notas Olfativas (`brandType` e `notaOlfativaType`)

Documentos separados para Marcas (ex: Lattafa, Dior) e Notas (ex: Bergamota, Sândalo).
- **Por que separados?** Porque a mesma marca ou nota aparece em vários perfumes. Em vez de digitar manualmente toda vez (com risco de erro de digitação), você as cadastra uma vez só e apenas "seleciona" na hora de criar o perfume.

### 4.3. Configurações do Site (`siteSettingsType`)

Documento **singleton** (só existe 1). Campos:
- Número do WhatsApp
- Mensagem padrão do WhatsApp (com variável `{perfume}`)
- URL do Instagram
- Título e descrição SEO

---

## 5. Fluxo de Dados (GROQ → Components)

```
page.tsx (Server)
   │
   ├── GROQ 1: Busca TODOS os perfumes com notas expandidas
   │           *[_type == "perfume"] | order(name asc) { ... topNotes[]->{ _id, name, category } ... }
   │
   ├── GROQ 2: Busca configurações do site
   │           *[_type == "siteSettings"][0] { ... }
   │
   └── Passa para: <CatalogApp perfumes={perfumes} settings={settings} />
                      │
                      ├── Navbar
                      ├── HeroSection
                      ├── PerfumeCard[] (com filtros/busca)
                      ├── OlfactoryQuiz → QuizResult
                      └── ProductDetailPage (com similares)
```

### O operador `->` no GROQ

```groq
topNotes[]->{ _id, name, category }
```

O `->` é o **operador de dereferência**. Ele pega a referência (que é só um ID) e busca o documento completo. Sem ele, você receberia apenas `{ _ref: "abc123" }`.

---

## 6. Componentes Principais

### 6.1. `CatalogApp.tsx` — O Orquestrador

Gerencia 4 estados de view:
- `home` → Hero + Vitrine com busca/filtros
- `quiz` → Quiz Olfativo (4 passos)
- `result` → Resultado do quiz
- `pdp` → Página de detalhes do perfume

**Funcionalidades:**
- Busca por texto (nome, marca, família)
- Filtro por gênero (Masculino/Feminino/Unissex)
- Filtro por tipo (Árabe/Importado/Nacional)
- Filtro por família olfativa
- Filtro de favoritos
- Toggle entre Grid e Lista

### 6.2. `PerfumeCard.tsx` — Card do Produto

Dois layouts:
- **Grid**: Card vertical com imagem quadrada
- **List**: Card horizontal estilo lista

Exibe: nome, marca, tipo (Árabe/Importado/Nacional), concentração, preço, fixação, projeção.  
Tem botão de favoritar (coração).

### 6.3. `ProductDetailPage.tsx` — PDP

A página mais rica do catálogo:
- Galeria de imagens com thumbnails
- Tags visuais (gênero, tipo, concentração)
- **Variações Listadas** (Preço, Volume e Etiqueta de Estoque dinâmicas)
- Pirâmide olfativa (notas como badges)
- Performance grid (fixação, projeção, ocasião, estação)
- Botão WhatsApp (com número dinâmico e mensagem automática)
- Botões de Compartilhar e Favoritar
- Seção "Perfumes Similares" (mesma família olfativa)

---

## 7. Quiz Olfativo — Como Funciona

### Perguntas (5 passos):

| Passo | Pergunta | Dimensão |
|-------|----------|----------|
| 1 | "Como você quer se sentir hoje?" | Vibe (emoção) |
| 2 | "Para qual momento?" | Cenário (ocasião) |
| 3 | "Qual a sua assinatura?" | Presença (projeção) |
| 4 | "Qual aroma te atrai?" | Aroma (família) |
| 5 | "Qual a origem do seu perfume ideal?" | Tipo (origem) |

### Algoritmo de Scoring

```
Para cada perfume:
  score = 0
  Se quizVibe == resposta.vibe        → score += 3 (peso alto)
  Se quizCenario == resposta.cenario  → score += 2
  Se quizPresenca == resposta.presenca → score += 2
  Se quizAroma == resposta.aroma      → score += 3 (peso alto)
  Se quizTipo == resposta.tipo        → score += 2 (match exato)
  Se resposta.tipo == "tanto_faz"     → score += 1 (bônus parcial)

Retorna o perfume com maior score.
Score máximo possível: 12
```

**Para que o quiz funcione:**
Cada perfume precisa ter os 5 campos de quiz preenchidos no Sanity (aba "Tags do Quiz").

---

## 8. Favoritos (localStorage)

O hook `useFavorites` salva os IDs dos perfumes curtidos no `localStorage` do browser.

```typescript
const { favorites, toggleFavorite, isFavorite } = useFavorites();

// Adicionar/remover favorito
toggleFavorite("perfume-123");

// Verificar se é favorito
const fav = isFavorite("perfume-123"); // true ou false
```

**Limitações:**
- Não sincroniza entre dispositivos
- Se o usuário limpar dados do browser, perde os favoritos
- Não requer login (vantagem para catálogo simples)

---

## 9. Busca e Filtros

### Busca
A busca é **client-side** — filtra a lista de perfumes já carregada em memória. Procura por:
- Nome do perfume
- Nome da marca
- Família olfativa

### Filtros
- **Gênero**: Masculino, Feminino, Unissex (apenas 1 por vez)
- **Tipo**: Árabe, Importado, Nacional (apenas 1 por vez)
- **Família Olfativa**: 10 opções (apenas 1 por vez)
- **Favoritos**: Toggle que mostra só os perfumes curtidos

Filtros são **cumulativos** — busca + gênero + família funcionam juntos.

---

## 10. Como Adicionar um Novo Perfume

1. Acesse `http://localhost:3000/studio` (ou a URL de produção do Studio)
2. No menu lateral, se a **Marca** do perfume ainda não existir, crie ela primeiro em "Marcas".
3. Clique em **Perfumes** e depois no botão **"+"** para criar um novo.
4. Preencha as 5 abas:
   - **Básicas**: Nome, selecione a Marca, clique em "Generate" no Slug, Destaques, descrições e fotos.
   - **Detalhes**: Gênero, Tipo, Concentração e crie as **Variações** (Adicione o volume, o preço e defina o status de estoque para cada variação).
   - **Pirâmide**: Selecione as notas olfativas.
   - **Performance**: Fixação, Projeção, Ocasião, Estação.
   - **Quiz**: Preencha os 5 campos (Vibe, Cenário, Presença, Aroma e Tipo Preferido).
5. Clique em **Publish**

> **Dica:** Se a nota olfativa que você precisa não existe, vá em "Notas Olfativas" no menu lateral e crie antes.

---

## 11. Como Alterar o WhatsApp

1. Acesse o Sanity Studio
2. No menu lateral, clique em **Configurações do Site**
3. Altere o campo **"Número do WhatsApp"** (formato: `5511999999999`)
4. Opcionalmente, altere a **"Mensagem Padrão"** (use `{perfume}` onde quer que apareça o nome do produto)
5. Clique em **Publish**

A mudança é **instantânea** — não precisa de novo deploy.

---

## 12. Deploy

### Vercel (Recomendado)
```bash
# 1. Instalar Vercel CLI
npm i -g vercel

# 2. Deploy
vercel

# 3. Configurar variáveis de ambiente no dashboard da Vercel:
# NEXT_PUBLIC_SANITY_PROJECT_ID
# NEXT_PUBLIC_SANITY_DATASET
```

### Build Local
```bash
npm run build  # Gera o build de produção
npm start      # Roda o build localmente
```

---

## Glossário

| Termo | Significado |
|-------|-------------|
| **GROQ** | Linguagem de query do Sanity (como SQL para Sanity) |
| **Schema** | Definição da estrutura dos documentos no Sanity |
| **Singleton** | Documento que só pode existir 1 vez (ex: siteSettings) |
| **Dereferência** | `->` no GROQ — expande uma referência em seu documento completo |
| **PDP** | Product Detail Page — página de detalhes do produto |
| **SPA** | Single Page Application — navegação sem reload |
| **Server Component** | Componente Next.js que roda no servidor (acesso a DB) |
| **Client Component** | Componente com `"use client"` (interatividade no browser) |
| **Slug** | Versão URL-friendly do nome (ex: "Royal Oud" → "royal-oud") |
| **CDN** | Content Delivery Network — rede de distribuição global |
