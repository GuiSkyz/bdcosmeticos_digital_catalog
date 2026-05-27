// Script: Atualiza preços dos perfumes no Sanity em batch
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

// ─── Lista de preços ───
const priceList = [
  { name: "Rose's Love", price: 250 },
  { name: "212 VIP Men", price: 520 },
  { name: "9 am pour femme", price: 290 },
  { name: "9pm Pour Femme", price: 300, note: "roxo" },
  { name: "9pm pour femme", price: 290, altMatch: true },
  { name: "Abaan", price: 280 },
  { name: "Afnan", price: 190, note: "100ml" },
  { name: "Ahubbak Love in Paris", price: 210 },
  { name: "Ajmal 2", price: 280 },
  { name: "Ajmal Ehsas Bloom", price: 220 },
  { name: "Al Hur", price: 240 },
  { name: "Al-A'raaf", price: 220 },
  { name: "Alba Pour Femme", price: 270 },
  { name: "Al Haramain Portfolio Freya", price: 280 },
  { name: "Alora", price: 180 },
  { name: "Dance Amarillo", price: 590 },
  { name: "Amber Oud Aqua Dubai", price: 320 },
  { name: "Ameerat Al Arab", price: 299 },
  { name: "Amn Island", price: 199 },
  { name: "An Island", price: 210 },
  { name: "Ana Abiyedh", price: 300 },
  { name: "Ana Al Malikah", price: 280 },
  { name: "Anarch", price: 300 },
  { name: "Angham", price: 250 },
  { name: "Aristocrat Rosé", price: 270 },
  { name: "Asad", price: 300 },
  { name: "Cherry in the Woods", price: 330, note: "Aurora" },
  { name: "Ayat", price: 260 },
  { name: "Bad Boy", price: 550 },
  { name: "Badee Al Oud Noble Blush", price: 310 },
  { name: "Badee Al Oud", price: 300, note: "sem Noble Blush" },
  { name: "Badria", price: 250 },
  { name: "Bahjah", price: 250 },
  { name: "Barez Velvety", price: 260 },
  { name: "Basir Dreams", price: 260 },
  { name: "Bidaya Mawwal", price: 290 },
  { name: "Born in Roma Yellow Dream", price: 750 },
  { name: "Borouj Amorous", price: 400 },
  { name: "Borouj Modernity", price: 380 },
  { name: "Brand Collection 169", price: 110 },
  { name: "Brand Collection 873", price: 550 },
  { name: "Burberry Brit for Him", price: 220 },
  { name: "Burberry for Women", price: 130 },
  { name: "Chants Tenderina", price: 300 },
  { name: "Chants Tenderina (30ml)", price: 240 },
  { name: "Chic Velvet Vert", price: 280 },
  { name: "Chronos Pour Homme", price: 260 },
  { name: "CK Be", price: 350 },
  { name: "Cleopatra", price: 240 },
  { name: "Club de Nuit Intense Man", price: 350 },
  { name: "Club de Nuit Sillage", price: 380 },
  { name: "Club de Nuit Untold", price: 350 },
  { name: "Club de Nuit White Imperiale", price: 330 },
  { name: "Club de Nuit Woman", price: 350 },
  { name: "Club de Nuit", price: 350, note: "Bling" },
  { name: "Confidential Private Gold", price: 220 },
  { name: "Crystalite", price: 160, note: "Mega" },
  { name: "Crystalite Black Cristal", price: 180 },
  { name: "D'Interieur Home Spray", price: 135 },
  { name: "Darling Blue Pour Femme", price: 180 },
  { name: "Donna Born In Roma", price: 750 },
  { name: "Durrat Al Aroos", price: 260 },
  { name: "Elliur", price: 300 },
  { name: "Emeer", price: 360 },
  { name: "Emilly in Paris", price: 450 },
  { name: "Fakhar Pride", price: 230 },
  { name: "Fakhar Women", price: 260 },
  { name: "Fakhar Gold", price: 260 },
  { name: "Fire on Ice", price: 240 },
  { name: "Fleur Enigmatique", price: 240 },
  { name: "Forever Gold", price: 280 },
  { name: "Freya", price: 290 },
  { name: "Garden Eder Sabah", price: 250 },
  { name: "Ghamr", price: 270 },
  { name: "Glacier Bella", price: 120 },
  { name: "Gold Elixir", price: 290 },
  { name: "Gucci Guilty Pour Homme", price: 650 },
  { name: "Gulnar Intense", price: 250 },
  { name: "Habibi Prince", price: 250 },
  { name: "Ghaya", price: 300 },
  { name: "Hawas Black", price: 380 },
  { name: "Hawas kobra", price: 400 },
  { name: "Hawas Tropical", price: 340 },
  { name: "Hayaati", price: 240, note: "Preto" },
  { name: "Hayaati Women", price: 250, note: "Rosa" },
  { name: "Hayyati Florence", price: 210 },
  { name: "Her Confession", price: 270 },
  { name: "Hugo Man", price: 420 },
  { name: "Ijlai Aura", price: 290 },
  { name: "Invictus Victory", price: 650 },
  { name: "Jardin de Rêve", price: 150 },
  { name: "Jasoor", price: 270 },
  { name: "Khamrah Body Cream", price: 190 },
  { name: "Khamrah", price: 300, note: "perfume" },
  { name: "King Insurrection Collector", price: 330 },
  { name: "La Rouge Baroque", price: 360 },
  { name: "La Rouge Baroque Extreme", price: 270 },
  { name: "Laffair Musse Legion", price: 260 },
  { name: "Lahdath", price: 250 },
  { name: "Lailak", price: 270 },
  { name: "Léonie", price: 300, note: "100ml" },
  { name: "Libre", price: 750 },
  { name: "Lomani Yes", price: 185 },
  { name: "Luree Glow", price: 190 },
  { name: "Ma Reine Frais et Frais", price: 260 },
  { name: "Maahir", price: 300 },
  { name: "Maktub La Vie", price: 290 },
  { name: "Match Point", price: 270 },
  { name: "Mawwal", price: 260 },
  { name: "Mayar Body Splash", price: 150 },
  { name: "Mayar Cherry Intense", price: 320 },
  { name: "Mayar Natural Intense", price: 340, note: "Azul" },
  { name: "Mayar Parfum d'Interieur", price: 180 },
  { name: "Mayar", price: 300, note: "perfume" },
  { name: "Mayar Spray", price: 420 },
  { name: "Mazharia", price: 280 },
  { name: "Me L'Affaire", price: 260 },
  { name: "1 Million", price: 520 },
  { name: "Moghran", price: 290 },
  { name: "My Story", price: 200 },
  { name: "Na Island", price: 190 },
  { name: "Niche Emarati", price: 380 },
  { name: "Nitro Green", price: 420 },
  { name: "Nitro Platinum", price: 440 },
  { name: "Nour Mawwal", price: 270 },
  { name: "Nudo Green Iris", price: 280 },
  { name: "Olympus", price: 300 },
  { name: "Opulent Dubai", price: 300 },
  { name: "Où de Muse Roseate", price: 160 },
  { name: "Oud 24 Hours Majestic Gold", price: 250 },
  { name: "Oud Al Khayali", price: 270 },
  { name: "Parfum de Muse Aquila", price: 160 },
  { name: "Fattan", price: 260 },
  { name: "Philos Pura", price: 200 },
  { name: "Pinnace", price: 290 },
  { name: "Qaed Al Fursan", price: 290 },
  { name: "Qandeel", price: 220 },
  { name: "Raed Al-A'raaf", price: 230 },
  { name: "Raheeq", price: 290 },
  { name: "Rahia Al Zahoor", price: 270 },
  { name: "Red Sky", price: 260 },
  { name: "Reyane Insurrection King", price: 330 },
  { name: "Rojo", price: 210 },
  { name: "Ruslein", price: 250 },
  { name: "Sabah Al Ward Sugar", price: 280 },
  { name: "Sabah Al Ward Valentine", price: 280 },
  { name: "Sabah Garden Eder", price: 280 },
  { name: "Saheb Intense", price: 280 },
  { name: "Sahebat Al Jamal", price: 250 },
  { name: "Sayf Almajd", price: 260 },
  { name: "Scarlet Bloom", price: 290 },
  { name: "Secret Pink", price: 270 },
  { name: "Sensuele", price: 270 },
  { name: "Sensuele (Spray)", price: 200 },
  { name: "Ser Hubi", price: 540 },
  { name: "Shagaf Al Ward", price: 300 },
  { name: "Shahrazad", price: 270 },
  { name: "Sharaf Blend Spray", price: 220 },
  { name: "Sherif", price: 240 },
  { name: "So Candid Maison", price: 290 },
  { name: "So Candid Rouge", price: 270 },
  { name: "Soho Aura", price: 280 },
  { name: "Souvenir Floral Bouquet", price: 320 },
  { name: "Spray Yara Tous", price: 230 },
  { name: "Supremacy Purple", price: 330 },
  { name: "Teriaq Intense", price: 330 },
  { name: "Tharwah Gold", price: 310 },
  { name: "Tofy Caramel", price: 75 },
  { name: "Twilight Jade", price: 270 },
  { name: "Watani", price: 300 },
  { name: "Ya Habibti", price: 280 },
  { name: "Yara", price: 260, note: "Rosa" },
  { name: "Yara Moi", price: 280 },
  { name: "Yara Tous Oleo", price: 280 },
  { name: "Yara Tous Body Splash", price: 170 },
  { name: "Lattafa Fakhar Platin", price: 230 },
  { name: "Sabah Al Ward", price: 280 },
  { name: "Insurrection II Wild", price: 330 },
  { name: "Insurrection II King", price: 330 },
  { name: "Bidaya", price: 260 },
  { name: "Rasasi Hawas Tropical", price: 340 },
  { name: "L'Affaire Musse Legion", price: 260 },
  { name: "The Kingdom", price: 300 },
]

// ─── Normaliza string para comparação ───
function normalize(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '')
}

async function updatePrices() {
  // Busca todos os perfumes do Sanity
  const perfumes = await client.fetch(
    `*[_type == 'perfume' && !(_id in path("drafts.**"))]{_id, name, variations}`
  )

  console.log(`\n📦 Perfumes no Sanity: ${perfumes.length}`)
  console.log(`💰 Preços na lista: ${priceList.length}\n`)

  let updated = 0
  let notFound = []
  let noVariation = []

  const batchSize = 50
  const matched = []

  for (const item of priceList) {
    const normalizedItem = normalize(item.name)

    // Busca por match exato ou parcial
    let perfume = perfumes.find(p => normalize(p.name) === normalizedItem)

    if (!perfume) {
      // Tenta match parcial (nome contém)
      perfume = perfumes.find(p =>
        normalize(p.name).includes(normalizedItem) ||
        normalizedItem.includes(normalize(p.name))
      )
    }

    if (!perfume) {
      notFound.push(item.name)
      continue
    }

    if (!perfume.variations || perfume.variations.length === 0) {
      noVariation.push(item.name)
      continue
    }

    matched.push({ perfume, price: item.price, itemName: item.name })
  }

  // Processa em lotes
  for (let i = 0; i < matched.length; i += batchSize) {
    const batch = matched.slice(i, i + batchSize)
    let transaction = client.transaction()

    for (const { perfume, price, itemName } of batch) {
      // Atualiza o preço da primeira variação
      const newVariations = perfume.variations.map((v, idx) => {
        if (idx === 0) {
          return { ...v, preco: price }
        }
        return v
      })

      transaction = transaction.patch(perfume._id, (p) =>
        p.set({ variations: newVariations })
      )
      updated++
      console.log(`  ✅ ${perfume.name} → R$ ${price}`)
    }

    await transaction.commit()
    console.log(`  📤 Lote ${Math.floor(i / batchSize) + 1} enviado\n`)
  }

  console.log(`\n🎉 Atualização concluída!`)
  console.log(`   ✅ Atualizados: ${updated}`)

  if (notFound.length > 0) {
    console.log(`\n   ⚠️  Não encontrados (${notFound.length}):`)
    notFound.forEach(n => console.log(`      - ${n}`))
  }

  if (noVariation.length > 0) {
    console.log(`\n   ⚠️  Sem variação cadastrada (${noVariation.length}):`)
    noVariation.forEach(n => console.log(`      - ${n}`))
  }
}

updatePrices().catch((err) => {
  console.error('❌ Erro:', err.message)
  process.exit(1)
})
