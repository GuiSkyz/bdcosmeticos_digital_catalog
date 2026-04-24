import {defineField, defineType} from 'sanity'

export const perfumeType = defineType({
  name: 'perfume',
  title: 'Perfumes',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nome do Perfume',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'brand',
      title: 'Marca',
      type: 'string',
      validation: (rule) => rule.required(),
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
    }),
    defineField({
      name: 'tagline',
      title: 'Frase de Efeito',
      type: 'string',
    }),
    defineField({
      name: 'shortDescription',
      title: 'Descrição Curta',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'fullDescription',
      title: 'Descrição Completa',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'image',
      title: 'Foto do Perfume',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    
    // --- PIRÂMIDE OLFATIVA ---
    defineField({
      name: 'olfactoryFamily',
      title: 'Família Olfativa',
      type: 'string',
      group: 'olfactory',
    }),
    defineField({
      name: 'topNotes',
      title: 'Notas de Topo',
      type: 'array',
      of: [{type: 'string'}],
      group: 'olfactory',
    }),
    defineField({
      name: 'heartNotes',
      title: 'Notas de Coração',
      type: 'array',
      of: [{type: 'string'}],
      group: 'olfactory',
    }),
    defineField({
      name: 'baseNotes',
      title: 'Notas de Fundo',
      type: 'array',
      of: [{type: 'string'}],
      group: 'olfactory',
    }),

    // --- PERFORMANCE ---
    defineField({
      name: 'longevity',
      title: 'Longevidade (Ex: 8h-10h)',
      type: 'string',
      group: 'performance',
    }),
    defineField({
      name: 'sillage',
      title: 'Projeção (Sillage)',
      type: 'string',
      group: 'performance',
    }),
    defineField({
      name: 'occasion',
      title: 'Ocasião',
      type: 'string',
      group: 'performance',
    }),
    defineField({
      name: 'season',
      title: 'Estação',
      type: 'string',
      group: 'performance',
    }),

    // --- QUIZ TAGS ---
    defineField({
      name: 'quizVibe',
      title: 'Vibe (Quiz)',
      type: 'string',
      options: {
        list: [
          {title: 'Fresco', value: 'fresco'},
          {title: 'Doce', value: 'doce'},
        ],
        layout: 'radio',
      },
      group: 'quiz',
    }),
    defineField({
      name: 'quizIntensity',
      title: 'Intensidade (Quiz)',
      type: 'string',
      options: {
        list: [
          {title: 'Sedutor', value: 'sedutor'},
          {title: 'Marcante', value: 'marcante'},
          {title: 'Poderoso', value: 'poderoso'},
        ],
        layout: 'radio',
      },
      group: 'quiz',
    }),
  ],
  groups: [
    {
      name: 'olfactory',
      title: 'Notas Olfativas',
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
})
