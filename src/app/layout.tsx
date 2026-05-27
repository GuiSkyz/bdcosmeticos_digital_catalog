import type { Metadata } from "next";
import { Cinzel, Montserrat } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const revalidate = 0;

import { client } from "@/sanity/lib/client";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await client.fetch(`*[_type == "siteSettings"][0] {
    catalogTitle,
    catalogDescription
  }`);

  return {
    title: settings?.catalogTitle || "BD Cosméticos | Alta Perfumaria",
    description: settings?.catalogDescription || "Descubra fragrâncias exclusivas.",
    keywords: ["perfumaria", "perfume", "alta perfumaria", "BD Cosméticos", "fragrâncias"],
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${cinzel.variable} ${montserrat.variable} h-full`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
