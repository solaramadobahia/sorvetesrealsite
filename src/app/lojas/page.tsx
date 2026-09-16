import type { Metadata } from "next";
import StoreLocator from "@/components/StoreLocator";
import Link from "next/link";
import { ArrowLeftIcon, InstagramIcon } from "@/components/Icons";
import { STORES_DATA } from "@/data/stores";

export const metadata: Metadata = {
  title: "Nossas Lojas na Bahia | Encontre a Mais Próxima",
  description:
    "Encontre a unidade Sorvetes Real mais próxima de você em Salvador, Região Metropolitana, Litoral Norte, Ilha de Itaparica e Interior da Bahia. Mapa interativo com rota e GPS.",
  alternates: {
    canonical: "/lojas",
  },
  openGraph: {
    title: "Nossas Lojas na Bahia | Sorvetes Real do Solar",
    description:
      "53 lojas e pontos de venda em Salvador e toda a Bahia. Encontre a loja Sorvetes Real mais próxima de você!",
    url: "https://sorvetesreal.com.br/lojas",
    images: ["/logos/Logo-real-do-solar-01.png"],
  },
};

export default function LojasPage() {
  const jsonLdStores = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Lojas Sorvetes Real na Bahia",
    description: "Lista oficial de lojas e pontos de venda da Sorvetes Real em Salvador e na Bahia",
    numberOfItems: STORES_DATA.length,
    itemListElement: STORES_DATA.map((store, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@type": "IceCreamShop",
        name: `Sorvetes Real - ${store.name}`,
        address: {
          "@type": "PostalAddress",
          streetAddress: store.address,
          addressLocality: store.city,
          addressRegion: "BA",
          addressCountry: "BR",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: store.lat,
          longitude: store.lng,
        },
        telephone: store.phone,
        url: "https://sorvetesreal.com.br/lojas",
      },
    })),
  };

  return (
    <main className="min-h-screen bg-real-red text-white flex flex-col justify-between items-center w-full relative overflow-x-hidden selection:bg-real-gold selection:text-real-wine">
      {/* Schema JSON-LD para SEO & GEO Local */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdStores),
        }}
      />

      <div className="w-full flex flex-col items-center justify-between min-h-screen py-8 md:py-12 px-3 sm:px-4">
        
        {/* HEADER & LOGO */}
        <header className="z-20 flex flex-col items-center justify-center pt-2 sm:pt-4 w-full max-w-2xl mx-auto text-center">
          {/* Botão Voltar com amplo respiro até a logo */}
          <Link
            href="/"
            className="mb-8 sm:mb-10 inline-flex items-center gap-2.5 text-real-gold hover:text-white transition-all duration-300 font-bold text-sm sm:text-base bg-black/25 hover:bg-black/45 px-5 py-2.5 rounded-full border border-real-gold/40 shadow-md backdrop-blur-sm mx-auto hover:scale-105 active:scale-95"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            <span>Voltar ao Início</span>
          </Link>

          {/* Logo Oficial com dimensões explícitas para evitar CLS */}
          <div className="relative w-44 sm:w-56 md:w-64 aspect-[1439/809] drop-shadow-xl transition-transform duration-300 hover:scale-105 mx-auto">
            <img
              src="/logos/Logo-real-do-solar-01.png"
              alt="Sorvetes Real do Solar - Logo Oficial"
              width={256}
              height={144}
              className="w-full h-full object-contain"
              loading="eager"
              fetchPriority="high"
            />
          </div>
          
          {/* Título com amplo respiro da logo */}
          <h1 className="text-real-gold font-black text-3xl sm:text-4xl md:text-5xl tracking-wider uppercase drop-shadow-md text-center mt-8 sm:mt-10">
            Nossas Lojas
          </h1>
          <p className="text-white/90 text-sm sm:text-base font-medium text-center max-w-lg mt-2.5 drop-shadow-sm mx-auto">
            Encontre a unidade mais próxima de você
          </p>
        </header>

        {/* STORE LOCATOR COMPONENT WITH MAP */}
        <div className="w-full my-8 z-20">
          <StoreLocator />
        </div>

        {/* FOOTER */}
        <footer className="w-full py-6 flex flex-col items-center justify-center gap-2 text-center text-real-white/90 z-20 mx-auto">
          <a
            href="https://www.instagram.com/sorvetesreal/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-real-gold hover:text-white transition-colors duration-300 font-bold text-lg tracking-wider uppercase group"
          >
            <InstagramIcon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 text-real-gold group-hover:text-white" />
            <span>@sorvetesreal</span>
          </a>
          <p className="text-xs font-light tracking-widest opacity-80 uppercase text-white/80">
            Sorvetes Real &copy; {new Date().getFullYear()}
          </p>
        </footer>

      </div>
    </main>
  );
}
