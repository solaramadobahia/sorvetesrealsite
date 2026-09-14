import AnimatedTestimonialGrid from "@/components/ui/testimonial-2";
import LinkButton from "@/components/LinkButton";
import Link from "next/link";
import {
  WhatsAppIcon,
  DeliveryIcon,
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

const WHATSAPP_DELIVERY_STORES = [
  {
    name: "Paralela",
    subtitle: "Via WhatsApp: (71) 98707-3065",
    url: "https://api.whatsapp.com/send?phone=5571987073065",
  },
  {
    name: "Ribeira",
    subtitle: "Via WhatsApp: (71) 98425-1607",
    url: "https://api.whatsapp.com/send?phone=5571984251607",
  },
  {
    name: "Lauro de Freitas - Centro",
    subtitle: "Via WhatsApp: (71) 98266-7396",
    url: "https://api.whatsapp.com/send?phone=5571982667396",
  },
  {
    name: "Pirajá",
    subtitle: "Via WhatsApp: (71) 98769-4348",
    url: "https://api.whatsapp.com/send?phone=5571987694348",
  },
  {
    name: "Costa Azul",
    subtitle: "Via WhatsApp: (71) 99188-4679",
    url: "https://api.whatsapp.com/send?phone=5571991884679",
  },
  {
    name: "Abrantes",
    subtitle: "Via WhatsApp: (71) 98256-3334",
    url: "https://api.whatsapp.com/send?phone=5571982563334",
  },
  {
    name: "Garcia",
    subtitle: "Via WhatsApp: (71) 99112-2152",
    url: "https://api.whatsapp.com/send?phone=5571991122152",
  },
  {
    name: "Barra",
    subtitle: "Via WhatsApp: (71) 99380-1211",
    url: "https://api.whatsapp.com/send?phone=5571993801211",
  },
  {
    name: "Guarajuba",
    subtitle: "Via WhatsApp: (71) 98231-8595",
    url: "https://api.whatsapp.com/send?phone=5571982318595",
  },
  {
    name: "Praia do Forte",
    subtitle: "Via WhatsApp: (71) 99652-5371",
    url: "https://api.whatsapp.com/send?phone=5571996525371",
  },
];

const IFOOD_STORES = [
  {
    name: "Ribeira",
    subtitle: "Peça pelo iFood em Salvador",
    url: "https://www.ifood.com.br/delivery/salvador-ba/sorvetes-real---ribeira-ribeira/1e4db606-96a8-44fb-816b-d3ebffc6eb69",
  },
  {
    name: "Brotas",
    subtitle: "Peça pelo iFood em Salvador",
    url: "https://www.ifood.com.br/delivery/salvador-ba/sorvetes-real---brotas-brotas/040a430c-7b00-47b8-b4b7-8495bc2ddf97",
  },
  {
    name: "Cidade Baixa",
    subtitle: "Peça pelo iFood em Monte Serrat",
    url: "https://www.ifood.com.br/delivery/salvador-ba/sorvetes-real---cidade-baixa-monte-serrat/62a74c72-9ecb-4ea6-ab72-ec8b48fb38a2",
  },
  {
    name: "Praia do Forte",
    subtitle: "Peça pelo iFood em Mata de São João",
    url: "https://www.ifood.com.br/delivery/mata-de-sao-joao-ba/sorvetes-real-praia-do-forte-praia-do-forte/ed9c4021-99ee-47b4-9c88-e21544a053c8",
  },
];

export default function DeliveryPage() {
  return (
    <main className="min-h-screen bg-real-red text-white flex flex-col justify-between items-center w-full relative overflow-x-hidden selection:bg-real-gold selection:text-real-wine">
      <AnimatedTestimonialGrid testimonials={SITE_PHOTOS}>
        <div className="w-full flex flex-col items-center justify-between min-h-screen py-8 md:py-12 px-4">
          
          {/* HEADER & LOGO */}
          <header className="animate-stagger-1 z-20 flex flex-col items-center justify-center pt-4 sm:pt-6 w-full max-w-lg mx-auto text-center">
            <Link
              href="/"
              className="mb-4 inline-flex items-center gap-2 text-real-gold hover:text-white transition-colors duration-300 font-semibold text-sm sm:text-base bg-black/20 hover:bg-black/40 px-4 py-2 rounded-full border border-real-gold/30 backdrop-blur-sm mx-auto"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              <span>Voltar ao Início</span>
            </Link>

            <div className="relative w-48 sm:w-64 md:w-80 aspect-[1439/809] drop-shadow-xl transition-transform duration-300 hover:scale-105 mx-auto">
              <img
                src="/logos/Logo-real-do-solar-01.png"
                alt="Sorvetes Real do Solar"
                className="w-full h-full object-contain"
                loading="eager"
              />
            </div>
            
            <h1 className="animate-stagger-2 text-real-gold font-extrabold text-2xl sm:text-3xl tracking-wider uppercase drop-shadow-md text-center mt-4">
              Delivery
            </h1>
            <p className="text-white/90 text-sm sm:text-base font-light text-center max-w-md mt-1 drop-shadow-sm mx-auto">
              Faça o seu pedido no conforto de casa escolhendo a unidade mais próxima de você.
            </p>
          </header>

          {/* CONTENT / LINKS SECTION */}
          <div className="w-full max-w-[340px] sm:max-w-lg flex flex-col items-center justify-center gap-8 py-6 z-20 animate-stagger-3 my-4 mx-auto">
            
            {/* SECTION 1: WHATSAPP DELIVERY PRÓPRIO (HIGHLIGHTED FIRST) */}
            <section className="w-full flex flex-col items-center justify-center gap-3 text-center">
              <div className="w-full flex items-center justify-center gap-2 text-real-gold font-bold text-lg sm:text-xl border-b border-real-gold/30 pb-2 text-center">
                <WhatsAppIcon className="w-6 h-6 text-real-gold" />
                <h2>Delivery Próprio - WhatsApp</h2>
              </div>
              <div className="w-full flex flex-col items-center justify-center gap-3">
                {WHATSAPP_DELIVERY_STORES.map((store, index) => (
                  <LinkButton
                    key={index}
                    variant="gold"
                    showShimmer={true}
                    subtitle={store.subtitle}
                    href={store.url}
                    icon={<WhatsAppIcon className="w-6 h-6" />}
                  >
                    {store.name}
                  </LinkButton>
                ))}
              </div>
            </section>

            {/* SECTION 2: IFOOD */}
            <section className="w-full flex flex-col items-center justify-center gap-3 text-center">
              <div className="w-full flex items-center justify-center gap-2 text-real-gold font-bold text-lg sm:text-xl border-b border-real-gold/30 pb-2 text-center">
                <DeliveryIcon className="w-6 h-6 text-real-gold" />
                <h2>Peça no iFood</h2>
              </div>
              <div className="w-full flex flex-col items-center justify-center gap-3">
                {IFOOD_STORES.map((store, index) => (
                  <LinkButton
                    key={index}
                    variant="white"
                    subtitle={store.subtitle}
                    href={store.url}
                    icon={<DeliveryIcon className="w-6 h-6" />}
                  >
                    {store.name}
                  </LinkButton>
                ))}
              </div>
            </section>

          </div>

          {/* FOOTER */}
          <footer className="w-full py-6 flex flex-col items-center justify-center gap-2 text-center text-real-white/90 z-20 animate-stagger-4 mx-auto">
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
