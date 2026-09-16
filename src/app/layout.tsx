import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#C02D2F",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://sorvetesreal.com.br"),
  title: {
    default: "Sorvetes Real do Solar | Made in Salvador, Bahia",
    template: "%s | Sorvetes Real do Solar",
  },
  description:
    "Sorvetes artesanais tradicionais da Bahia desde a histórica Ribeira, em Salvador. Pedidos para consumidor final, atacado para revendedores, delivery próprio e 53 lojas por toda a Bahia.",
  keywords: [
    "Sorvetes Real",
    "Solar Amado Bahia",
    "Ribeira",
    "Salvador",
    "Bahia",
    "Sorvete Artesanal",
    "Picolé",
    "Delivery de Sorvete",
    "Sorveteria Salvador",
    "Revenda de Sorvete",
    "Sorvetes Real Lojas",
  ],
  authors: [{ name: "Sorvetes Real do Solar" }],
  creator: "Sorvetes Real",
  publisher: "Sorvetes Real do Solar",
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Sorvetes Real do Solar | Made in Salvador, Bahia",
    description:
      "O autêntico sabor da Bahia. Sorvetes artesanais, picolés tradicionais, delivery em Salvador e 53 unidades por toda a Bahia.",
    url: "https://sorvetesreal.com.br",
    siteName: "Sorvetes Real do Solar",
    images: [
      {
        url: "/logos/Logo-real-do-solar-01.png",
        width: 1439,
        height: 809,
        alt: "Sorvetes Real do Solar - Logomarca Oficial",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sorvetes Real do Solar | Made in Salvador, Bahia",
    description:
      "Sorvetes artesanais tradicionais da Bahia. Delivery próprio e 53 lojas por toda a Bahia.",
    images: ["/logos/Logo-real-do-solar-01.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "geo.region": "BR-BA",
    "geo.placename": "Salvador, Bahia, Brasil",
    "geo.position": "-12.91974;-38.49752",
    ICBM: "-12.91974, -38.49752",
  },
};

const JSON_LD_ORGANIZATION = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["IceCreamShop", "LocalBusiness", "Organization"],
      "@id": "https://sorvetesreal.com.br/#organization",
      name: "Sorvetes Real do Solar",
      alternateName: ["Sorvetes Real", "Real do Solar", "Sorvetes Real Bahia"],
      url: "https://sorvetesreal.com.br",
      logo: "https://sorvetesreal.com.br/logos/Logo-real-do-solar-01.png",
      image: "https://sorvetesreal.com.br/fotos/foto-solar.jpg",
      description:
        "Tradicional fábrica e rede de sorvetes artesanais e picolés da Bahia, fundada e sediada no histórico Solar Amado Bahia na Ribeira, Salvador.",
      telephone: "+55-71-2132-0017",
      priceRange: "$",
      servesCuisine: [
        "Sorvete Artesanal",
        "Picolés",
        "Sobremesas Baianas",
        "Açaí",
      ],
      address: {
        "@type": "PostalAddress",
        streetAddress: "Rua Porto dos Tainheiros, 80, Solar Amado Bahia, Ribeira",
        addressLocality: "Salvador",
        addressRegion: "BA",
        postalCode: "40421-580",
        addressCountry: "BR",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: -12.91974,
        longitude: -38.49752,
      },
      areaServed: [
        { "@type": "AdministrativeArea", name: "Salvador" },
        { "@type": "AdministrativeArea", name: "Região Metropolitana de Salvador" },
        { "@type": "AdministrativeArea", name: "Litoral Norte da Bahia" },
        { "@type": "AdministrativeArea", name: "Bahia" },
      ],
      sameAs: [
        "https://www.instagram.com/sorvetesreal/",
        "https://www.instagram.com/solaramadobahia/",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://sorvetesreal.com.br/#website",
      url: "https://sorvetesreal.com.br",
      name: "Sorvetes Real do Solar",
      publisher: {
        "@id": "https://sorvetesreal.com.br/#organization",
      },
      inLanguage: "pt-BR",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="bg-[#C02D2F]">
      <head>
        {/* Preload Critical Typography */}
        <link
          rel="preload"
          href="/fonts/YanoneKaffeesatz-Regular.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/YanoneKaffeesatz-Bold.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
        {/* Preconnect for Google Maps API & Embed */}
        <link rel="preconnect" href="https://maps.google.com" />
        <link rel="dns-prefetch" href="https://maps.google.com" />

        {/* Structured Data: Organization & IceCreamShop (GEO & Local SEO) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(JSON_LD_ORGANIZATION),
          }}
        />
      </head>
      <body className="antialiased bg-[#C02D2F] text-white selection:bg-real-gold selection:text-real-wine min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
