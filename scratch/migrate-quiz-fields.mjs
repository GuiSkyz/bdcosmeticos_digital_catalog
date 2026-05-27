// Migration: converte quiz fields de string para array em todos os perfumes
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

const QUIZ_FIELDS = ['quizVibe', 'quizCenario', 'quizPresenca', 'quizAroma', 'quizTipo']

async function migrate() {
  // Busca todos os perfumes com qualquer campo quiz preenchido (somente published)
  const allPerfumes = await client.fetch(
    `*[_type == 'perfume' && !(_id in path("drafts.**")) && (defined(quizVibe) || defined(quizCenario) || defined(quizPresenca) || defined(quizAroma) || defined(quizTipo))]{_id, name, quizVibe, quizCenario, quizPresenca, quizAroma, quizTipo}`
  )

  console.log(`\n📦 Total de perfumes com quiz fields: ${allPerfumes.length}\n`)

  let migrated = 0
  let skipped = 0

  // Processa em lotes de 50
  const batchSize = 50
  for (let i = 0; i < allPerfumes.length; i += batchSize) {
    const batch = allPerfumes.slice(i, i + batchSize)
    let transaction = client.transaction()

    for (const perfume of batch) {
      const patches = {}
      let needsPatch = false

      for (const field of QUIZ_FIELDS) {
        const value = perfume[field]
        if (value && typeof value === 'string') {
          // Converte string para array
          patches[field] = [value]
          needsPatch = true
        }
        // Se já é array ou undefined, não mexe
      }

      if (needsPatch) {
        // Patch somente no published
        transaction = transaction.patch(perfume._id, (p) => p.set(patches))
        migrated++
        console.log(`  ✅ ${perfume.name} → ${Object.keys(patches).join(', ')}`)
      } else {
        skipped++
      }
    }

    await transaction.commit({ autoGenerateArrayKeys: true })
    console.log(`  📤 Lote ${Math.floor(i / batchSize) + 1} enviado (${batch.length} docs)`)
  }

  console.log(`\n🎉 Migração concluída!`)
  console.log(`   ✅ Migrados: ${migrated}`)
  console.log(`   ⏭️  Já estavam ok: ${skipped}\n`)
}

migrate().catch((err) => {
  console.error('❌ Erro na migração:', err.message)
  process.exit(1)
})
