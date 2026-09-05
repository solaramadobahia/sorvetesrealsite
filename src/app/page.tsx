import AnimatedTestimonialGrid from "@/components/ui/testimonial-2";
import LinkButton from "@/components/LinkButton";
import {
  WhatsAppIcon,
  DeliveryIcon,
  StorePinIcon,
  InstagramIcon,
} from "@/components/Icons";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const SITE_PHOTOS = [
  { imgSrc: `${basePath}/fotos/foto-01.jpeg`, alt: "Sorvetes Real do Solar - Sorvete artesanal" },
  { imgSrc: `${basePath}/fotos/foto-02.jpeg`, alt: "Sorvetes Real do Solar - Loja Ribeira" },
  { imgSrc: `${basePath}/fotos/foto-03.jpeg`, alt: "Sorvetes Real do Solar - Picolés e Sorvetes" },
  { imgSrc: `${basePath}/fotos/foto-04.jpeg`, alt: "Sorvetes Real do Solar - Sabor Chocolate Africano" },
  { imgSrc: `${basePath}/fotos/foto-05.jpeg`, alt: "Sorvetes Real do Solar - Momentos Especiais" },
  { imgSrc: `${basePath}/fotos/foto-06.jpeg`, alt: "Sorvetes Real do Solar - Solar Amado Bahia" },
  { imgSrc: `${basePath}/fotos/foto-07.jpeg`, alt: "Sorvetes Real do Solar - Sorvete de Frutas" },
  { imgSrc: `${basePath}/fotos/foto-08.jpeg`, alt: "Sorvetes Real do Solar - Tradição Soteropolitana" },
  { imgSrc: `${basePath}/fotos/foto-09.jpeg`, alt: "Sorvetes Real do Solar - Experiência Real" },
  { imgSrc: `${basePath}/fotos/foto-10.jpeg`, alt: "Sorvetes Real do Solar - Ribeira Salvador" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-real-red text-white flex flex-col justify-between items-center w-full relative overflow-x-hidden selection:bg-real-gold selection:text-real-wine">
      <AnimatedTestimonialGrid testimonials={SITE_PHOTOS}>
        <div className="w-full flex flex-col items-center justify-between min-h-screen py-10 md:py-14 px-4">
          
          {/* 1. HERO & LOGO */}
          <header className="animate-stagger-1 z-20 flex flex-col items-center justify-center pt-6 sm:pt-10 md:pt-14 pb-4 w-full max-w-lg">
            <div className="relative w-64 sm:w-80 md:w-96 aspect-[1439/809] drop-shadow-xl transition-transform duration-300 hover:scale-105">
              <img
                src={`${basePath}/logos/Logo-real-do-solar-01.png`}
                alt="Sorvetes Real do Solar"
                className="w-full h-full object-contain"
                loading="eager"
              />
            </div>
            <p className="animate-stagger-2 text-real-gold font-bold text-2xl sm:text-3xl tracking-wider uppercase drop-shadow-md text-center mt-4 sm:mt-6">
              Made in Salvador, Bahia.
            </p>
          </header>

          {/* 2. BUTTONS / LINKS SECTION */}
          <section className="w-[90%] sm:w-full flex flex-col items-center justify-center py-8 gap-4 z-20 animate-stagger-3 max-w-[340px] sm:max-w-lg my-auto">
            <LinkButton
              variant="gold"
              href="http://api.whatsapp.com/send?phone=5571982908205&text="
              icon={<WhatsAppIcon className="w-7 h-7" />}
            >
              Fazer pedido - Consumidor
            </LinkButton>

            <LinkButton
              variant="gold"
              href="http://api.whatsapp.com/send?phone=5571987773174&text="
              icon={<WhatsAppIcon className="w-7 h-7" />}
            >
              Fazer pedido - Revendedor
            </LinkButton>

            <LinkButton
              variant="white"
              href="http://flow.page/deliveryreal"
              icon={<DeliveryIcon className="w-7 h-7" />}
            >
              Delivery
            </LinkButton>

            <LinkButton
              variant="gold"
              href="http://www.instagram.com/s/aGlnaGxpZ2h0OjE3OTc3MzUxMDI0NDkwMTky?story_media_id=2829511269317691198&igshid=YmMyMTA2M2Y="
              icon={<StorePinIcon className="w-7 h-7" />}
            >
              Nossas Lojas
            </LinkButton>

            <LinkButton
              variant="white"
              href="https://www.instagram.com/solaramadobahia/"
              icon={<InstagramIcon className="w-7 h-7" />}
            >
              Solar Amado Bahia - Loja Ribeira
            </LinkButton>
          </section>

          {/* 3. FOOTER */}
          <footer className="w-full py-6 pb-6 flex flex-col items-center justify-center gap-2 text-center text-real-white/90 z-20 animate-stagger-4">
            <a
              href="https://www.instagram.com/sorvetesreal/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-real-gold hover:text-white transition-colors duration-300 font-bold text-xl tracking-wider uppercase group"
            >
              <InstagramIcon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 text-real-gold group-hover:text-white" />
              <span>@sorvetesreal</span>
            </a>
            <p className="text-sm font-light tracking-widest opacity-80 uppercase text-white/80">
              Sorvetes Real &copy; {new Date().getFullYear()}
            </p>
          </footer>

        </div>
      </AnimatedTestimonialGrid>
    </main>
  );
}
