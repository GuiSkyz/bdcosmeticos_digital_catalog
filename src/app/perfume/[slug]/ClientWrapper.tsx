"use client";

import { useRouter } from "next/navigation";
import { ProductDetailPage } from "@/components/ProductDetailPage";
import { useFavorites } from "@/lib/useFavorites";
import type { Perfume, SiteSettings } from "@/data/perfumes";

interface ClientWrapperProps {
  perfume: Perfume;
  allPerfumes: Perfume[];
  settings: SiteSettings | null;
}

export function ClientWrapper({ perfume, allPerfumes, settings }: ClientWrapperProps) {
  const router = useRouter();
  const { toggleFavorite, isFavorite } = useFavorites();

  const handleBack = () => {
    // Se quiser garantir que volte pra home ou histórico
    router.push("/#catalogo");
  };

  const handleNavigate = (similarPerfume: Perfume) => {
    const similarSlug = similarPerfume.slug?.current || similarPerfume._id;
    router.push(`/perfume/${similarSlug}`);
  };

  return (
    <ProductDetailPage
      perfume={perfume}
      allPerfumes={allPerfumes}
      settings={settings}
      onBack={handleBack}
      onNavigate={handleNavigate}
      isFavorite={isFavorite(perfume._id)}
      onToggleFavorite={toggleFavorite}
    />
  );
}
