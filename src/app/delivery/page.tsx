import AnimatedTestimonialGrid from "@/components/ui/testimonial-2";
import LinkButton from "@/components/LinkButton";
import Link from "next/link";
import {
  WhatsAppIcon,
  DeliveryIcon,
  IFoodIcon,
  ArrowLeftIcon,
  InstagramIcon,
} from "@/components/Icons";

const SITE_PHOTOS = [
  { imgSrc: "/fotos/foto-01.jpeg", alt: "Sorvetes Real do Solar - Sorvete artesanal" },
  { imgSrc: "/fotos/foto-02.jpeg", alt: "Sorvetes Real do Solar - Loja Ribeira" },
  { imgSrc: "/fotos/foto-03.jpeg", alt: "Sorvetes Real do Solar - Picolés e Sorvetes" },
  { imgSrc: "/fotos/foto-04.jpeg", alt: "Sorvetes Real do Solar - Sabor Chocolate Africano" },
  { imgSrc: "/fotos/foto-05.jpeg", alt: "Sorvetes Real do Solar - Momentos Especiais" },
  { imgSrc: "/fotos/foto-06.jpeg", alt: "Sorvetes Real do Solar - Solar Amado Bahia" },
  { imgSrc: "/fotos/foto-07.jpeg", alt: "Sorvetes Real do Solar - Sorvete de Frutas" },
  { imgSrc: "/fotos/foto-08.jpeg", alt: "Sorvetes Real do Solar - Tradição Soteropolitana" },
  { imgSrc: "/fotos/foto-09.jpeg", alt: "Sorvetes Real do Solar - Experiência Real" },
  { imgSrc: "/fotos/foto-10.jpeg", alt: "Sorvetes Real do Solar - Ribeira Salvador" },
];

const IFOOD_STORES = [
  {
    name: "Sorvetes Real - Ribeira",
    subtitle: "Peça pelo iFood em Salvador",
    url: "https://www.ifood.com.br/delivery/salvador-ba/sorvetes-real---ribeira-ribeira/1e4db606-96a8-44fb-816b-d3ebffc6eb69",
  },
  {
    name: "Sorvetes Real - Brotas",
    subtitle: "Peça pelo iFood em Salvador",
    url: "https://www.ifood.com.br/delivery/salvador-ba/sorvetes-real---brotas-brotas/040a430c-7b00-47b8-b4b7-8495bc2ddf97",
  },
  {
    name: "Sorvetes Real - Cidade Baixa",
    subtitle: "Peça pelo iFood em Monte Serrat",
    url: "https://www.ifood.com.br/delivery/salvador-ba/sorvetes-real---cidade-baixa-monte-serrat/62a74c72-9ecb-4ea6-ab72-ec8b48fb38a2",
  },
  {
    name: "Sorvetes Real - Praia do Forte",
    subtitle: "Peça pelo iFood em Mata de São João",
    url: "https://www.ifood.com.br/delivery/mata-de-sao-joao-ba/sorvetes-real-praia-do-forte-praia-do-forte/ed9c4021-99ee-47b4-9c88-e21544a053c8",
  },
];

const WHATSAPP_DELIVERY_STORES = [
  {
    name: "Delivery Paralela",
    subtitle: "WhatsApp Direct: (71) 98707-3065",
    url: "https://api.whatsapp.com/send?phone=5571987073065",
  },
  {
    name: "Delivery Pirajá",
    subtitle: "WhatsApp Direct: (71) 98769-4348",
    url: "https://api.whatsapp.com/send?phone=5571987694348",
  },
  {
    name: "Delivery Nova Dias D'Ávila",
    subtitle: "WhatsApp Direct: (71) 99919-7677",
    url: "https://api.whatsapp.com/send?phone=5571999197677",
  },
  {
    name: "Delivery Itacimirim",
    subtitle: "WhatsApp Direct: (71) 99303-3809",
    url: "https://api.whatsapp.com/send?phone=5571993033809",
  },
  {
    name: "Delivery Guarajuba",
    subtitle: "WhatsApp Direct: (71) 98231-8595",
    url: "https://api.whatsapp.com/send?phone=5571982318595",
  },
  {
    name: "Delivery Praia do Forte",
    subtitle: "WhatsApp Direct: (71) 99652-5371",
    url: "https://api.whatsapp.com/send?phone=5571996525371",
  },
  {
    name: "Delivery Ribeira",
    subtitle: "WhatsApp Direct: (71) 98425-1607",
    url: "https://api.whatsapp.com/send?phone=5571984251607",
  },
];

export default function DeliveryPage() {
  return (
    <main className="min-h-screen bg-real-red text-white flex flex-col justify-between items-center w-full relative overflow-x-hidden selection:bg-real-gold selection:text-real-wine">
      <AnimatedTestimonialGrid testimonials={SITE_PHOTOS}>
        <div className="w-full flex flex-col items-center justify-between min-h-screen py-8 md:py-12 px-4">
          
          {/* HEADER & LOGO */}
          <header className="animate-stagger-1 z-20 flex flex-col items-center justify-center pt-4 sm:pt-6 w-full max-w-lg">
            <Link
              href="/"
              className="self-start mb-4 inline-flex items-center gap-2 text-real-gold hover:text-white transition-colors duration-300 font-semibold text-sm sm:text-base bg-black/20 hover:bg-black/40 px-4 py-2 rounded-full border border-real-gold/30 backdrop-blur-sm"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              <span>Voltar ao Início</span>
            </Link>

            <div className="relative w-48 sm:w-64 md:w-80 aspect-[1439/809] drop-shadow-xl transition-transform duration-300 hover:scale-105">
              <img
                src="/logos/Logo-real-do-solar-01.png"
                alt="Sorvetes Real do Solar"
                className="w-full h-full object-contain"
                loading="eager"
              />
            </div>
            
            <h1 className="animate-stagger-2 text-real-gold font-extrabold text-2xl sm:text-3xl tracking-wider uppercase drop-shadow-md text-center mt-4">
              Lojas & Delivery
            </h1>
            <p className="text-white/90 text-sm sm:text-base font-light text-center max-w-md mt-1 drop-shadow-sm">
              Escolha a unidade mais próxima de você para pedir via iFood ou WhatsApp Delivery Próprio.
            </p>
          </header>

          {/* CONTENT / LINKS SECTION */}
          <div className="w-full max-w-[340px] sm:max-w-lg flex flex-col gap-8 py-6 z-20 animate-stagger-3 my-4">
            
            {/* SECTION 1: IFOOD */}
            <section className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-real-gold font-bold text-lg sm:text-xl border-b border-real-gold/30 pb-2">
                <DeliveryIcon className="w-6 h-6 text-real-gold" />
                <h2>Peça no iFood</h2>
              </div>
              <div className="flex flex-col gap-3">
                {IFOOD_STORES.map((store, index) => (
                  <LinkButton
                    key={index}
                    variant="gold"
                    showShimmer={true}
                    subtitle={store.subtitle}
                    href={store.url}
                    icon={<DeliveryIcon className="w-6 h-6" />}
                  >
                    {store.name}
                  </LinkButton>
                ))}
              </div>
            </section>

            {/* SECTION 2: WHATSAPP DELIVERY PRÓPRIO */}
            <section className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-real-gold font-bold text-lg sm:text-xl border-b border-real-gold/30 pb-2">
                <WhatsAppIcon className="w-6 h-6 text-real-gold" />
                <h2>WhatsApp - Delivery Próprio</h2>
              </div>
              <div className="flex flex-col gap-3">
                {WHATSAPP_DELIVERY_STORES.map((store, index) => (
                  <LinkButton
                    key={index}
                    variant="white"
                    subtitle={store.subtitle}
                    href={store.url}
                    icon={<WhatsAppIcon className="w-6 h-6" />}
                  >
                    {store.name}
                  </LinkButton>
                ))}
              </div>
            </section>

          </div>

          {/* FOOTER */}
          <footer className="w-full py-6 flex flex-col items-center justify-center gap-2 text-center text-real-white/90 z-20 animate-stagger-4">
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
      </AnimatedTestimonialGrid>
    </main>
  );
}
