import { createClient } from "next-sanity";
import fs from "fs";

const listText = `Crystalite \tMega Collection
Rosés love\tVurv
212 Vip Men\tCarolina Herrera
9 am pour femme\tafnan
9 pm (roxo) pour femme\tAfnan
9pm pour femme\tafnan
Abaan\tLattafa
Afnan 100ml\tLattafa 
Ahubbak love in paris\tArd Al Zaafaran
Ajmal 2\tAjmal 
Ajmal Ehsas Bloom\tArd Al Zaafaran
Al Hur\tLattafa
Al-A'raaf \tLailak
Alba Pour Femme\tLattafa
Alharamain collect 2 freya\tAl Haramain
Alora\tLattafa
Amarilo \tShakira
Amber Oud Aqua Dubai\tAL Haramain
Amerat al aráb\tAsdaaf (Lattafa)
Amn Island em spray\t
An island em spray\tDeo risala
Ana Abiyedh\tLattafa
Ana Al Malikah\tLattafa
Anarch\tMaison Alhambra
Angham\tLattafa
Aristocrat Rosé\tMaison Alhambra
Aurora cherry in the woods\tAurora Scents
Asad Bourbon\tLattafa
Ayat \tBidaya Parfums
Bad Boy\tCarolins Herrera
Badee Al Oud\tLattafa
Badee Al Oud Noble Blush \tLattafa
Badria\tLattafa
Bahjah\tLattafa
Barez Velvety\tLattafa
Basir Dreams\tLattafa
Bidaya Mawwal\tLattafa
Born in Roma Yellow Dream\tValentino
Borouj Amorous\tBorouj
Borouj Modernity\tBorouj
Brand Collection 169\tBrand Collection
Brand Collection 873\tBrand Collection
Burberry Brit for Him\tBurberry
Burberry for Women\tBurberry
Chants Tenderina\tMaison Alhambra
Chants Tenderina (30ml)\tMaison Alhambra
Chic velvet vert\tMaison Alhambra
Chronos Pour Homme\tMaison Alhambra
CK be\tCalvin Klein
Cleopatra\tAurora Scents
Club de Nuit Intense Man\tArmaf 
Club de Nuit Sillage\tArmaf
Club de Nuit Untold\tArmaf
Club de Nuit White Imperiale\tArmaf
Club de Nuit Woman\tArmaf
Clube de nuit bling \tarmaf
Confidential Private Gold\tLattafa
Crystalite Black Cristal\tMaison Alhambra
D’interieur (Home Spray)\tLattafa
Darling Blue Pour Femme\tMaison Alhambra
Donna\tValentino
Durrat Al Aroos\tAl Wataniah
Elliur\tBidaya Parfums
Emeer\tLattafa
Emilly in paris 100ml\tMaison Alhambra
Fackar Pride\tLattafa
Fackar Women\tLattafa
Fakhar Gold\tLattafa
Fire on Ice\tLattafa
Fleur Enigmatique\tMaison Alhambra
Forever Gold\tLattafa
Freya\tAlharamain collect 
Garden Eder sabah\tAl Wataniah 
Ghamr\tLattafa
Glacier Bella (30ml)\tMaison Alhambra
Gold Elixir\tLattafa
Gucci Guilty Pour Homme\tGucci
Gulnar Intense\tLattafa
habibi prince\tBidaya Parfums
Hamidi Ghaya\tHamidi
Hawas Black\tRasasi 
Hawas for him Kobra\tRasasi 
Hawas tropical\tRasasi 
Hayaati (Preto)\tLattafa
Hayaati Women (Rosa)\tLattafa
Hayyati Florence\tLattafa
Her Confession\tLattafa
Hugo Man\tHugo Boss
Ijlai Aura\tLattafa
Invictus Victory\tRabane
Jardin de Rêve 30ml\tMaisson Alhambra 
Jasoor\tLattafa
khamrah body cream\tLattafa
khamrah perfume\tLattafa
King Insurrection Collector\tReyane Tradition
La Rouge Baroque\tMaison Alhambra
La Rouge Baroque Extreme\tMaison Alhambra
Laffair musse legion\tMaison Alhambra
Lahdath\tLattafa
Lailak\tLattafa
Léonie 100ml\tMaison Alhambra
Leonie 30ml\tMaison Alhambra
Libre \tYvesSaintLaurent
Lomani yes\tLomani
Luree glow 100ml\tL'affair
Ma Reine Frais et Frais\tMaison Alhambra
Maahir \tLattafa
Maktub La vie\tBidaya Parfums
Match Point\tMaison Alhambra
Mawwal\tLattafa
Mayar Body splash\tL affair 
Mayar Cherry Intense\tlattafa
Mayar natural Intense (azul)\tLattafa
Mayar parfum d Interieur\tLattafa
Mayar perfume\tLattafa
Mayar spray\tLattafa
Mazharia\tLattafa
Me laffair \tL'affair
Million \tRabanne
Moghran \tMurjan
My story \tVurv 
Na Island (Spray)\tLattafa
Niche Emarati\tLattafa
Nitro Green\tDumont Paris
Nitro Platinum \tDumont Paris
Nour Mawwal Arabia\tMawwal
Nudo Green Iris\tMaison Alhambra
Olympus \tMeg Collection
Opulent Dubai\tLattafa
Opulent Dubai \tLattafa
Où de Muse Roseate\tL affair 
Oud 24 Hours Majestic Gold\tArd Al Zaafaran
Oud Al Khayali\tLattafa
Parfum de muse aquila\tL'affair
Perfume maramain freta\tMaramain
Philos pura \tMaison Alhambra
Pinnace\tLattafa
Qaed Al Fursan\tLattafa
Qandeel \tArd Al Zaafaran
Raed Al- A'raaf\tLattafa
Raheeq \tNusuk
Rahia Al Zahoor\tLattafa
Red Sky\tLattafa
Reyane insur King spray 100ml\t 
Rojo \tShakira
Ruslein\tLattafa
Sabah Al Ward Sugar\tAl Wataniah
Sabah Al Ward Valentine\tAl Wataniah
Sabah Garden Eder\tArd Al Zaafaran
Saheb Intense\tArd Al Zaafaran
Sahebat Al Jamal\t Ard Al Zaafaran
Sayf almajd \tDeo risala
Sayf Almajd (Spray)\tLattafa
Sayf Almajd spray\tRisala
Scarlet Bloom\tLattafa
Secret Pink\tLattafa
Sensuele \tRisala
Sensuele em spray\tDeo risala
Sensuele Risala (Spray)\tRisala
Ser Hubi\tLattafa
Shagaf Al Ward\tAl Wataniah
Shahrazad (Branco Decorado)\tLattafa
Sharaf  em spray\tDeo risala
Sherif\tLattafa
So Candid (30ml)\tMaison Alhambra
So Candid Maison\tMaison Alhambra
So Candid Rouge\tMaison Alhambra
Soho Aura\tMaison Alhambra
Souvenir Floral\tAfnan
Spray Mayar\tLattafa
Spray Yara Tous\tLattafa
Supremacy purple \tAfnan
Teriaq Intense\tLattafa
Tharwah Gold\tLattafa
The Kingdom\tLattafa
tofy caramel 100ml\tL affair 
Twilight jade \tParis Corner
Watani (Colorido)\tAl Wataniah
Ya Habibti\tLattafa
Yara (Rosa)\tLattafa
Yara Moi (Branco)\tLattafa
Yara Tous Oleo\tLattafa`;

const items = listText.split('\n').map(line => {
    const [name, brand] = line.split('\t');
    return { name: name?.trim(), brand: brand?.trim() || '' };
}).filter(i => i.name);

function normalize(str) {
    return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "");
}

async function run() {
    const client = createClient({
        projectId: "u8jk5vam",
        dataset: "production",
        useCdn: false,
        apiVersion: "2024-01-01"
    });

    const perfumes = await client.fetch('*[_type == "perfume"]{name, "brand": brand->name}');

    const results = [];
    const missing = [];
    
    for (const item of items) {
        const itemNorm = normalize(item.name);
        
        let found = perfumes.find(p => {
            const pNameNorm = normalize(p.name);
            return pNameNorm.includes(itemNorm) || itemNorm.includes(pNameNorm);
        });

        // Additional fallback: fuzzy match
        if (!found) {
            // trying partial words
            const words = itemNorm.split(/\\s+/);
            found = perfumes.find(p => {
                const pNameNorm = normalize(p.name);
                let matchCount = 0;
                for (const word of words) {
                    if (word.length > 3 && pNameNorm.includes(word)) matchCount++;
                }
                return matchCount >= Math.min(2, words.length);
            });
        }

        if (found) {
            results.push({ item, found });
        } else {
            missing.push(item);
        }
    }

    console.log("=== MISSING ITEMS ===");
    missing.forEach(m => console.log(`${m.name} (${m.brand})`));
    
    console.log("\n=== FOUND ITEMS ===");
    results.forEach(r => console.log(`${r.item.name} -> ${r.found.name} (${r.found.brand})`));
}

run();
