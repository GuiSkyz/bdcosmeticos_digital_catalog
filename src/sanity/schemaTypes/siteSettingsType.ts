import {defineField, defineType} from 'sanity'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Configurações do Site',
  type: 'document',
  icon: () => '⚙️',
  fields: [
    defineField({
      name: 'whatsappNumber',
      title: 'Número do WhatsApp',
      type: 'string',
      description: 'Número completo com DDI + DDD (Ex: 5511999999999). Sem espaços ou traços.',
      validation: (rule) => rule.required().regex(/^\d+$/, {name: 'digits', invert: false}),
    }),
    defineField({
      name: 'whatsappMessage',
      title: 'Mensagem Padrão do WhatsApp',
      type: 'string',
      description: 'Mensagem que aparece ao clicar no botão. Use {perfume} para o nome do produto.',
      initialValue: 'Olá! Gostaria de saber sobre o {perfume}.',
    }),
    defineField({
      name: 'instagramUrl',
      title: 'Link do Instagram',
      type: 'url',
    }),
    defineField({
      name: 'catalogTitle',
      title: 'Título do Catálogo',
      type: 'string',
      initialValue: 'BD Cosméticos | Alta Perfumaria Árabe',
    }),
    defineField({
      name: 'catalogDescription',
      title: 'Descrição SEO do Catálogo',
      type: 'text',
      rows: 3,
      initialValue: 'BD Cosméticos — Alta perfumaria árabe. Descubra fragrâncias exclusivas e encontre sua assinatura olfativa perfeita.',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Configurações do Site',
        subtitle: 'WhatsApp, Redes Sociais, SEO',
      }
    },
  },
})
