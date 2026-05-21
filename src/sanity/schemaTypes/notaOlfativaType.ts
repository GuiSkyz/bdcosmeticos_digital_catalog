import {defineField, defineType} from 'sanity'

export const notaOlfativaType = defineType({
  name: 'notaOlfativa',
  title: 'Notas Olfativas',
  type: 'document',
  icon: () => '🌿',
  fields: [
    defineField({
      name: 'name',
      title: 'Nome da Nota',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Categoria',
      type: 'string',
      description: 'Agrupamento principal da nota (para organização no Studio)',
      options: {
        list: [
          {title: 'Cítrica', value: 'citrica'},
          {title: 'Frutada', value: 'frutada'},
          {title: 'Floral', value: 'floral'},
          {title: 'Especiada', value: 'especiada'},
          {title: 'Amadeirada', value: 'amadeirada'},
          {title: 'Gourmand', value: 'gourmand'},
          {title: 'Almiscarada', value: 'almiscarada'},
          {title: 'Aromática', value: 'aromática'},
          {title: 'Aquática', value: 'aquatica'},
          {title: 'Resinosa', value: 'resinosa'},
        ],
        layout: 'dropdown',
      },
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
    },
    prepare({title, subtitle}) {
      const categoryLabels: Record<string, string> = {
        citrica: '🍋 Cítrica',
        frutada: '🍑 Frutada',
        floral: '🌸 Floral',
        especiada: '🌶️ Especiada',
        amadeirada: '🪵 Amadeirada',
        gourmand: '🍫 Gourmand',
        almiscarada: '🤍 Almiscarada',
        aromática: '🌿 Aromática',
        aquatica: '💧 Aquática',
        resinosa: '🪨 Resinosa',
      }
      return {
        title: title,
        subtitle: subtitle ? categoryLabels[subtitle] ?? subtitle : '',
      }
    },
  },
  orderings: [
    {
      title: 'Nome (A-Z)',
      name: 'nameAsc',
      by: [{field: 'name', direction: 'asc'}],
    },
    {
      title: 'Categoria',
      name: 'categoryAsc',
      by: [{field: 'category', direction: 'asc'}],
    },
  ],
})
