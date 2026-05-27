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

async function execute() {
  const idsToDelete = [
    "60790c96-f878-43c1-90e1-cfdd81f9e594", // Hamidi Ghaya (price 0)
    "b1099959-0e61-415a-93ab-93f1a5eea830", // Aristocrat Rosé (price 0)
    "7239d9d0-b983-4227-ae7e-785f5bfc7718", // Crystalite Black Crystal (price 0)
    "3b71fd1d-5127-4630-b476-2b1d2ce9e13f"  // Amn Island (Spray) - keeping Na Island
  ]
  
  for (const id of idsToDelete) {
    try {
      await client.delete(id)
      console.log(`Deleted ${id}`)
    } catch (e) {
      console.log(`Error deleting ${id}:`, e.message)
    }
  }

  const ajmal = await client.fetch(`*[_type == 'perfume' && name match 'Ajmal 2*' && !(_id in path('drafts.**'))]{_id, name, variations}`)
  console.log("Ajmal matches:", JSON.stringify(ajmal, null, 2))
}

execute().catch(console.error)
