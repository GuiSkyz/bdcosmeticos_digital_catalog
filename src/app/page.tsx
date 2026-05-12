import { client } from "@/sanity/lib/client";
import { CatalogApp } from "@/components/CatalogApp";
import type { Perfume, SiteSettings } from "@/data/perfumes";

export const revalidate = 60; // Revalidate the page every 60 seconds

// GROQ — perfumes com notas dereferenciadas e novos campos
const PERFUMES_QUERY = `*[_type == "perfume"] | order(name asc) {
  _id,
  name,
  "brand": brand->name,
  isFeatured,
  isNewRelease,
  slug,
  tagline,
  shortDescription,
  fullDescription,
  image,
  gallery,
  genero,
  tipo,
  concentracao,
  variations,
  olfactoryFamily,
  topNotes,
  heartNotes,
  baseNotes,
  longevity,
  sillage,
  occasion,
  season,
  quizVibe,
  quizCenario,
  quizPresenca,
  quizAroma,
  quizTipo
}`;

// GROQ — configurações do site (singleton)
const SETTINGS_QUERY = `*[_type == "siteSettings"][0] {
  whatsappNumber,
  whatsappMessage,
  instagramUrl,
  catalogTitle,
  catalogDescription
}`;

export default async function HomePage() {
  const [perfumes, settings] = await Promise.all([
    client.fetch<Perfume[]>(PERFUMES_QUERY),
    client.fetch<SiteSettings | null>(SETTINGS_QUERY),
  ]);

  return <CatalogApp perfumes={perfumes} settings={settings} />;
}
