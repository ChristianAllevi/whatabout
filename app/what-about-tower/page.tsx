import Image from "next/image";
import Link from "next/link";
import TowerShowcaseImages from "@/components/sections/TowerShowcaseImages";
import ElleLabSection from "@/components/sections/ElleLabSection";
import MaskReveal from "@/components/ui/MaskReveal";

const h80 = {
  fontFamily: "DX Playhigh Expanded",
  fontSize: "clamp(36px, 5.6vw, 80px)",
  lineHeight: "0.925",
  textTransform: "uppercase",
} as const;

const editions = [
  {
    id: "amicizia",
    name: "Friendship Edition",
    bg: "#B4C2FF",
    photo: "/images/hero-amicizia.jpg",
    available: true,
    cta: "preordina ora",
  },
  {
    id: "famiglia",
    name: "Family Edition",
    bg: "#5FF4D4",
    photo: "/images/hero-famiglia.jpg",
    available: true,
    cta: "preordina ora",
  },
  {
    id: "amore",
    name: "Lovers Edition",
    bg: "#FFCAEC",
    photo: "/images/hero-amore.jpg",
    available: false,
    cta: "coming soon",
  },
];

export default function TowerPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative mx-3 md:mx-4 lg:mx-5 h-[640px] rounded-section overflow-hidden text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/mattoncini.jpg"
            alt=""
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0" style={{ backgroundColor: "#1D2855", opacity: 0.85 }} />
        </div>

        {/* Torre ritagliata in basso a destra */}
        <Image
          src="/images/torre-amicizia.png"
          alt="The What About Tower"
          width={640}
          height={640}
          priority
          className="absolute z-10 w-[320px] h-[320px] md:w-[640px] md:h-[640px] right-1/2 translate-x-1/2 md:right-[-57px] md:translate-x-0 bottom-[-50px] md:bottom-[-99px] object-contain pointer-events-none"
        />

        <div className="relative z-20 h-full flex flex-col items-center justify-start md:justify-center text-center px-5 pt-[140px] md:pt-0 pointer-events-none">
          <p className="font-body font-bold uppercase text-white text-[14px] leading-none mb-[60px]">
            The What About Tower
          </p>
          <h1>
            <span className="block text-white" style={h80}>
              un dialogo da costruire.
            </span>
            <MaskReveal className="block text-accent" style={h80} delay={0.3}>
              mattoncino per mattoncino.
            </MaskReveal>
          </h1>
        </div>
      </section>

      {/* SEZIONE: il gioco (box crema) */}
      <section className="relative mx-3 md:mx-4 lg:mx-5 mt-3 md:mt-4 lg:mt-5 rounded-section bg-bg-light">
        <div className="relative overflow-hidden rounded-section">
          <div className="relative z-10 px-5 md:pl-[159px] pt-[80px] pb-[80px] min-h-[656px] md:pt-[128px] md:pb-[120px] md:min-h-[604px]">
            <p className="font-body font-bold uppercase text-primary-dark text-[14px] leading-none mb-[22px] md:mb-[47px]">
              un gioco cooperativo, da 2 a 8 persone.
            </p>
            <ul className="wa-h60 mb-[24px] md:mb-[50px]">
              <li className="text-primary-dark">una torre.</li>
              <li className="text-primary">3 livelli da superare.</li>
              <li className="text-accent">insieme.</li>
            </ul>
            <p className="font-body font-light text-[16px] leading-5 text-primary-dark md:max-w-[520px]">
              Ogni mattoncino porta con sé un argomento, una storia, un momento da condividere. Più la
              torre sta in piedi, più il dialogo va in profondità - passando da tematiche leggere e
              divertenti a quelle più inaspettate. Non si vince e non si perde: si collabora e si gioca
              finché la torre rimane in piedi.
            </p>
          </div>

          <TowerShowcaseImages towerTop={94} showTowerOnMobile={false} />
        </div>
      </section>

      {/* SEZIONE: preordina */}
      <section
        id="preordina"
        className="mt-[100px] md:mt-[165px] px-8 md:px-[180px] scroll-mt-24"
      >
        <div className="grid grid-cols-1 md:grid-cols-[547px_1fr] gap-10 md:gap-0 items-start">
          <h2 className="wa-h60">
            <span className="block text-accent">preordina ora</span>
            <span className="block text-primary-dark">prossima release:</span>
            <span className="block text-primary">21 novembre</span>
          </h2>
          <div className="font-body font-light text-[16px] leading-5 text-primary-dark md:max-w-[530px]">
            <p>
              Produciamo ogni torre artigianalmente, nel nostro laboratorio. Per questa prima release
              abbiamo scelto di lavorare su un numero limitato di pezzi - massimo 50 - per contenere gli
              sprechi e garantire la qualità di ogni singolo mattoncino. Preordina per essere tra le
              prime persone a ricevere la torre.
            </p>
            <p className="font-body font-bold mt-5">Consegna prevista entro il: 21 Dicembre</p>
          </div>
        </div>

        {/* Edizioni */}
        <div className="mt-[70px] grid grid-cols-1 md:grid-cols-3 gap-5">
          {editions.map((ed) => (
            <article
              key={ed.id}
              className="relative overflow-hidden rounded-card h-[410px] p-5 flex flex-col justify-between"
              style={{ backgroundColor: ed.bg }}
            >
              {/* Foto tinta con il colore dell'edizione */}
              <Image
                src={ed.photo}
                alt=""
                fill
                sizes="(min-width: 768px) 347px, 100vw"
                className="object-cover object-left"
                style={{ mixBlendMode: "luminosity", opacity: 0.2 }}
              />
              <Image
                src="/images/torre-amicizia.png"
                alt={`The What About Tower — ${ed.name}`}
                width={350}
                height={350}
                className="absolute w-[350px] h-[350px] right-[-86px] top-[100px] max-w-none pointer-events-none"
              />

              <div className="relative z-10">
                <p className="uppercase leading-[0.95] text-[40px]" style={{ fontFamily: "DX Playhigh Expanded" }}>
                  <span className="block text-primary-dark">The</span>
                  <span className="block text-primary">What About</span>
                  <span className="block text-primary-dark">Tower</span>
                </p>
                <span className="inline-block mt-[14px] bg-white text-accent rounded-[2px] px-2 py-1 font-body font-bold uppercase text-[11px] leading-none tracking-[0.04em]">
                  {ed.name}
                </span>
              </div>

              <div className="relative z-10">
                {ed.available ? (
                  <Link href="/shop" className="wa-btn-pink">
                    {ed.cta}
                  </Link>
                ) : (
                  <span
                    className="wa-btn-pink cursor-not-allowed"
                    style={{ backgroundColor: "#FFFFFF", color: "#FF2EB3" }}
                    aria-disabled="true"
                  >
                    {ed.cta}
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* SEZIONE: Elle Lab */}
      <ElleLabSection />
    </>
  );
}
