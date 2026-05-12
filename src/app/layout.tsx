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

export const metadata: Metadata = {
  title: "BD Cosméticos | Alta Perfumaria Árabe",
  description:
    "BD Cosméticos — Alta perfumaria árabe. Descubra fragrâncias exclusivas e encontre sua assinatura olfativa perfeita.",
  keywords: ["perfumaria", "perfume árabe", "alta perfumaria", "BD Cosméticos", "fragrâncias"],
  openGraph: {
    title: "BD Cosméticos | Alta Perfumaria Árabe",
    description: "BD Cosméticos — Alta perfumaria árabe. Descubra fragrâncias exclusivas e encontre sua assinatura olfativa.",
    url: "https://bdcosmeticos.com",
    siteName: "BD Cosméticos",
    images: [
      {
        url: "/placeholder.png", // Em produção, usar uma imagem real da marca (ex: 1200x630)
        width: 1200,
        height: 630,
        alt: "BD Cosméticos - Alta Perfumaria Árabe",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BD Cosméticos | Alta Perfumaria Árabe",
    description: "BD Cosméticos — Alta perfumaria árabe. Descubra fragrâncias exclusivas.",
  },
  themeColor: "#FAF7F5", // bd-cream
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "BD Cosm.",
  },
};

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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
