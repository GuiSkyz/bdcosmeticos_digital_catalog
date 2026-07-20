import { client } from "@/sanity/lib/client";
import { ClientWrapper } from "./ClientWrapper";
import type { Perfume, SiteSettings } from "@/data/perfumes";
import { notFound } from "next/navigation";

export const revalidate = 3600;

// GROQ — perfumes com notas dereferenciadas e novos campos
const PERFUMES_QUERY = `*[_type == "perfume" && isActive != false] | order(name asc) {
  _id,
  name,
  "brand": coalesce(brand->name, brand),
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
  volumes,
  "preco": coalesce(preco, (variations | order(preco asc))[0].preco),
  "hasVariations": count(variations) > 1,
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

export default async function PerfumePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const [perfumes, settings] = await Promise.all([
    client.fetch<Perfume[]>(PERFUMES_QUERY),
    client.fetch<SiteSettings | null>(SETTINGS_QUERY),
  ]);

  const perfume = perfumes.find((p) => p.slug?.current === slug || p._id === slug);

  if (!perfume) {
    console.log("NOT FOUND ERROR!");
    console.log("Target slug:", slug);
    console.log("Available slugs:", perfumes.map(p => p.slug?.current).join(", "));
    notFound();
  }

  return <ClientWrapper perfume={perfume} allPerfumes={perfumes} settings={settings} />;
}
