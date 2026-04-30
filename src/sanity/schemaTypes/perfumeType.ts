import {defineField, defineType} from 'sanity'

export const perfumeType = defineType({
  name: 'perfume',
  title: 'Perfumes',
  type: 'document',
  groups: [
    {
      name: 'basic',
      title: 'Informações Básicas',
      default: true,
    },
    {
      name: 'details',
      title: 'Detalhes do Produto',
    },
    {
      name: 'olfactory',
      title: 'Pirâmide Olfativa',
    },
    {
      name: 'performance',
      title: 'Performance',
    },
    {
      name: 'quiz',
      title: 'Tags do Quiz',
    },
  ],
  fields: [
    // ─── INFORMAÇÕES BÁSICAS ────────────────────────────────
    defineField({
      name: 'name',
      title: 'Nome do Perfume',
      type: 'string',
      validation: (rule) => rule.required(),
      group: 'basic',
    }),
    defineField({
      name: 'brand',
      title: 'Marca',
      type: 'string',
      validation: (rule) => rule.required(),
      group: 'basic',
    }),
    defineField({
      name: 'slug',
      title: 'URL do Perfume (Slug)',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
      group: 'basic',
    }),
    defineField({
      name: 'tagline',
      title: 'Frase de Efeito',
      type: 'string',
      group: 'basic',
    }),
    defineField({
      name: 'shortDescription',
      title: 'Descrição Curta',
      type: 'text',
      rows: 3,
      group: 'basic',
    }),
    defineField({
      name: 'fullDescription',
      title: 'Descrição Completa',
      type: 'text',
      rows: 5,
      group: 'basic',
    }),
    defineField({
      name: 'image',
      title: 'Foto Principal',
      type: 'image',
      options: {
        hotspot: true,
      },
      group: 'basic',
    }),
    defineField({
      name: 'gallery',
      title: 'Galeria de Fotos',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
      description: 'Fotos adicionais do perfume (ângulos, lifestyle, embalagem).',
      group: 'basic',
    }),

    // ─── DETALHES DO PRODUTO ────────────────────────────────
    defineField({
      name: 'genero',
      title: 'Gênero',
      type: 'string',
      options: {
        list: [
          {title: 'Masculino', value: 'Masculino'},
          {title: 'Feminino', value: 'Feminino'},
          {title: 'Unissex', value: 'Unissex'},
        ],
        layout: 'radio',
      },
      group: 'details',
    }),
    defineField({
      name: 'tipo',
      title: 'Tipo do Perfume',
      type: 'string',
      options: {
        list: [
          {title: 'Árabe', value: 'Árabe'},
          {title: 'Importado', value: 'Importado'},
          {title: 'Nacional', value: 'Nacional'},
        ],
        layout: 'radio',
      },
      group: 'details',
    }),
    defineField({
      name: 'concentracao',
      title: 'Concentração',
      type: 'string',
      options: {
        list: [
          {title: 'Eau de Cologne (EDC)', value: 'EDC'},
          {title: 'Eau de Toilette (EDT)', value: 'EDT'},
          {title: 'Eau de Parfum (EDP)', value: 'EDP'},
          {title: 'Parfum / Extrait', value: 'Parfum'},
        ],
        layout: 'radio',
      },
      group: 'details',
    }),
    defineField({
      name: 'volumes',
      title: 'Volumes Disponíveis',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: '30ml', value: '30ml'},
          {title: '50ml', value: '50ml'},
          {title: '75ml', value: '75ml'},
          {title: '100ml', value: '100ml'},
          {title: '125ml', value: '125ml'},
          {title: '200ml', value: '200ml'},
        ],
      },
      group: 'details',
    }),
    defineField({
      name: 'preco',
      title: 'Preço (R$)',
      type: 'number',
      description: 'Valor em reais. Ex: 289.90',
      validation: (rule) => rule.positive(),
      group: 'details',
    }),

    // ─── PIRÂMIDE OLFATIVA (Referências Relacionais) ────────
    defineField({
      name: 'olfactoryFamily',
      title: 'Família Olfativa',
      type: 'string',
      options: {
        list: [
          {title: 'Amadeirado', value: 'Amadeirado'},
          {title: 'Cítrico', value: 'Cítrico'},
          {title: 'Floral', value: 'Floral'},
          {title: 'Fougère', value: 'Fougère'},
          {title: 'Frutal', value: 'Frutal'},
          {title: 'Gourmand', value: 'Gourmand'},
          {title: 'Oriental', value: 'Oriental'},
          {title: 'Aromático', value: 'Aromático'},
          {title: 'Aquático', value: 'Aquático'},
          {title: 'Chipre', value: 'Chipre'},
        ],
        layout: 'dropdown',
      },
      group: 'olfactory',
    }),
    defineField({
      name: 'topNotes',
      title: 'Notas de Topo',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'notaOlfativa'}]}],
      group: 'olfactory',
    }),
    defineField({
      name: 'heartNotes',
      title: 'Notas de Coração',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'notaOlfativa'}]}],
      group: 'olfactory',
    }),
    defineField({
      name: 'baseNotes',
      title: 'Notas de Fundo',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'notaOlfativa'}]}],
      group: 'olfactory',
    }),

    // ─── PERFORMANCE (Dropdowns Padronizados) ───────────────
    defineField({
      name: 'longevity',
      title: 'Fixação',
      type: 'string',
      options: {
        list: [
          {title: 'Íntima (até 4h)', value: 'Íntima'},
          {title: 'Moderada (4h a 8h)', value: 'Moderada'},
          {title: 'Longa (8h a 12h)', value: 'Longa'},
          {title: 'Eterna (12h+)', value: 'Eterna'},
        ],
        layout: 'radio',
      },
      group: 'performance',
    }),
    defineField({
      name: 'sillage',
      title: 'Projeção (Sillage)',
      type: 'string',
      options: {
        list: [
          {title: 'Discreta — Rente à pele', value: 'Discreta'},
          {title: 'Moderada — Quem te abraça sente', value: 'Moderada'},
          {title: 'Marcante — Deixa rastro leve', value: 'Marcante'},
          {title: 'Intensa — Toma conta do ambiente', value: 'Intensa'},
        ],
        layout: 'radio',
      },
      group: 'performance',
    }),
    defineField({
      name: 'occasion',
      title: 'Ocasião',
      type: 'string',
      options: {
        list: [
          {title: 'Dia a Dia', value: 'Dia a Dia'},
          {title: 'Trabalho', value: 'Trabalho'},
          {title: 'Encontro', value: 'Encontro'},
          {title: 'Formal', value: 'Formal'},
          {title: 'Balada', value: 'Balada'},
          {title: 'Assinatura', value: 'Assinatura'},
        ],
        layout: 'dropdown',
      },
      group: 'performance',
    }),
    defineField({
      name: 'season',
      title: 'Estação',
      type: 'string',
      options: {
        list: [
          {title: 'Verão', value: 'Verão'},
          {title: 'Primavera', value: 'Primavera'},
          {title: 'Outono', value: 'Outono'},
          {title: 'Inverno', value: 'Inverno'},
          {title: 'Versátil (Todas)', value: 'Versátil'},
        ],
        layout: 'dropdown',
      },
      group: 'performance',
    }),

    // ─── QUIZ OLFATIVO (4 Dimensões) ────────────────────────
    defineField({
      name: 'quizVibe',
      title: 'Vibe (Quiz)',
      description: 'Qual sentimento o perfume evoca?',
      type: 'string',
      options: {
        list: [
          {title: 'Elegante e Poderoso(a)', value: 'elegante'},
          {title: 'Fresco(a) e Energizado(a)', value: 'fresco'},
          {title: 'Misterioso(a) e Sedutor(a)', value: 'misterioso'},
          {title: 'Aconchegante e Confortável', value: 'aconchegante'},
        ],
        layout: 'radio',
      },
      group: 'quiz',
    }),
    defineField({
      name: 'quizCenario',
      title: 'Cenário (Quiz)',
      description: 'Qual o melhor cenário para este perfume?',
      type: 'string',
      options: {
        list: [
          {title: 'Trabalho', value: 'trabalho'},
          {title: 'Encontro Romântico', value: 'encontro'},
          {title: 'Passeio / Dia a Dia', value: 'passeio'},
          {title: 'Balada / Festa', value: 'balada'},
        ],
        layout: 'radio',
      },
      group: 'quiz',
    }),
    defineField({
      name: 'quizPresenca',
      title: 'Presença (Quiz)',
      description: 'Nível de projeção do perfume no Quiz.',
      type: 'string',
      options: {
        list: [
          {title: 'Íntima — Só quem abraça sente', value: 'intima'},
          {title: 'Moderada — Rastro sutil', value: 'moderada'},
          {title: 'Avassaladora — Sente antes de ver', value: 'avassaladora'},
        ],
        layout: 'radio',
      },
      group: 'quiz',
    }),
    defineField({
      name: 'quizAroma',
      title: 'Aroma Principal (Quiz)',
      description: 'Família aromática simplificada para o Quiz.',
      type: 'string',
      options: {
        list: [
          {title: 'Cítricos e Frutas', value: 'citrico'},
          {title: 'Flores e Buquês', value: 'floral'},
          {title: 'Madeiras e Florestas', value: 'amadeirado'},
          {title: 'Doces e Gourmand', value: 'gourmand'},
        ],
        layout: 'radio',
      },
      group: 'quiz',
    }),
    defineField({
      name: 'quizTipo',
      title: 'Tipo Preferido (Quiz)',
      description: 'Qual tipo de perfume se encaixa melhor no Quiz.',
      type: 'string',
      options: {
        list: [
          {title: 'Árabe', value: 'arabe'},
          {title: 'Importado', value: 'importado'},
          {title: 'Nacional', value: 'nacional'},
          {title: 'Tanto Faz', value: 'tanto_faz'},
        ],
        layout: 'radio',
      },
      group: 'quiz',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'brand',
      media: 'image',
    },
  },
})
