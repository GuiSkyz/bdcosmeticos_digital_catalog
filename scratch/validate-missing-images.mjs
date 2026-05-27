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

async function validate() {
  // Busca todos os perfumes sem imagem
  const perfumes = await client.fetch(
    `*[_type == 'perfume' && !defined(image) && !(_id in path('drafts.**'))]{
      _id, 
      name, 
      brand->{name},
      tipo,
      variations
    } | order(name asc)`
  )

  // Busca todos os perfumes COM imagem para ver se algum dos "sem foto" já existe com foto
  const withImages = await client.fetch(
    `*[_type == 'perfume' && defined(image) && !(_id in path('drafts.**'))]{
      _id, 
      name,
      brand->{name}
    }`
  )

  const normalize = (str) => str.toLowerCase().replace(/[^a-z0-9]/g, '')

  const withImagesNormalized = withImages.map(p => ({ ...p, norm: normalize(p.name) }))

  console.log(`\n🔍 Validando ${perfumes.length} perfumes sem foto...`)

  let potentialDuplicates = []
  let missingPrices = []
  
  for (const p of perfumes) {
    const normName = normalize(p.name)
    
    // Verifica se já existe um perfume COM foto com nome parecido
    const isDupWithImage = withImagesNormalized.find(wi => 
      wi.norm === normName || 
      (wi.norm.length > 5 && normName.includes(wi.norm)) ||
      (normName.length > 5 && wi.norm.includes(normName))
    )

    if (isDupWithImage) {
      potentialDuplicates.push({ 
        noImage: p.name, 
        withImage: isDupWithImage.name,
        withImageId: isDupWithImage._id
      })
    }

    // Verifica se tem preço zerado (indicativo de cadastro abandonado)
    let hasValidPrice = false
    if (p.variations && p.variations.length > 0) {
      if (p.variations[0].preco > 0) hasValidPrice = true
    }
    
    if (!hasValidPrice) {
      missingPrices.push(p.name)
    }
  }

  console.log('\n--- ⚠️ POSSÍVEIS DUPLICADOS DE PERFUMES QUE JÁ TÊM FOTO ---')
  if (potentialDuplicates.length === 0) console.log('Nenhum encontrado.')
  potentialDuplicates.forEach(d => {
    console.log(`- Sem foto: "${d.noImage}" | Já existe com foto: "${d.withImage}"`)
  })

  console.log('\n--- 💰 PERFUMES SEM FOTO E COM PREÇO ZERADO (Podem ser rascunhos) ---')
  if (missingPrices.length === 0) console.log('Nenhum encontrado.')
  missingPrices.forEach(m => console.log(`- ${m}`))

}

validate().catch(console.error)
