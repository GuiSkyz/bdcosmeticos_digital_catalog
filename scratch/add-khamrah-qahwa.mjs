// Script: Adiciona Khamrah Qahwa ao catálogo
import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: join(__dirname, '..', '.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

async function addPerfume() {
  // Busca o brand Lattafa
  const brand = await client.fetch(`*[_type == 'brand' && name match 'Lattafa'][0]{_id, name}`)
  if (!brand) {
    console.error('❌ Brand Lattafa não encontrado')
    process.exit(1)
  }
  console.log(`✅ Brand encontrado: ${brand.name} (${brand._id})`)

  const doc = {
    _type: 'perfume',
    name: 'Khamrah Qahwa',
    slug: { _type: 'slug', current: 'khamrah-qahwa' },
    brand: { _type: 'reference', _ref: brand._id },
    tagline: 'A fusão perfeita entre o calor do oriente e a sofisticação do café.',
    shortDescription: 'Uma versão intensamente rica e envolvente do clássico Khamrah, agora com uma assinatura marcante de café torrado e especiarias.',
    fullDescription: 'Khamrah Qahwa é uma obra-prima da perfumaria oriental que eleva a experiência gourmand. A fragrância abre com uma explosão calorosa de canela e cardamomo, complementada pela vivacidade do gengibre. No coração, a doçura resinosa do praline e das frutas cristalizadas se funde a um acorde autêntico e encorpado de café arábica (Qahwa). A base conforta os sentidos com a opulência do âmbar, a cremosidade da baunilha e a profundidade do benjoim, criando uma atmosfera aconchegante, sensual e intensamente sofisticada. Ideal para quem busca uma assinatura noturna e marcante em climas amenos.',
    genero: 'Unissex',
    tipo: 'Árabe',
    concentracao: 'EDP',
    variations: [
      { _key: 'var1', preco: 0, status: 'esgotado', volume: '100ml' },
    ],
    olfactoryFamily: 'Oriental Especiado Gourmand',
    topNotes: ['Canela', 'Cardamomo', 'Gengibre'],
    heartNotes: ['Pralinê', 'Café', 'Frutas Cristalizadas', 'Flores Brancas'],
    baseNotes: ['Baunilha', 'Âmbar', 'Benjoim', 'Fava Tonka', 'Almíscar'],
    longevity: 'Longa',
    sillage: 'Marcante',
    occasion: 'Encontro',
    season: 'Inverno',
    isFeatured: false,
    isNewRelease: false,
    quizVibe: ['misterioso'],
    quizCenario: ['encontro'],
    quizPresenca: ['avassaladora'],
    quizAroma: ['gourmand'],
    quizTipo: ['arabe'],
  }

  const result = await client.create(doc)
  console.log(`\n🎉 Perfume criado com sucesso!`)
  console.log(`   📄 ID: ${result._id}`)
  console.log(`   🏷️  Nome: ${result.name}`)
  console.log(`   🔗 Slug: ${result.slug.current}`)
}

addPerfume().catch((err) => {
  console.error('❌ Erro:', err.message)
  process.exit(1)
})
