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

async function findPerfumesWithoutImages() {
  const perfumes = await client.fetch(
    `*[_type == 'perfume' && !defined(image) && !(_id in path('drafts.**'))]{_id, name} | order(name asc)`
  )

  console.log(`\n📦 Total de perfumes sem foto: ${perfumes.length}\n`)
  perfumes.forEach((p, i) => {
    console.log(`${i + 1}. ${p.name}`)
  })
}

findPerfumesWithoutImages().catch((err) => {
  console.error('❌ Erro:', err.message)
  process.exit(1)
})
