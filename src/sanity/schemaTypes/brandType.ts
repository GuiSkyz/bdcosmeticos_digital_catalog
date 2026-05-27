import {defineField, defineType} from 'sanity'

export const brandType = defineType({
  name: 'brand',
  title: 'Marcas',
  type: 'document',
  icon: () => '🏷️',
  fields: [
    defineField({
      name: 'name',
      title: 'Nome da Marca',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo da Marca',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'logo',
    },
  },
})
