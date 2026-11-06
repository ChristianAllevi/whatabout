import HeroSlider from "@/components/sections/HeroSlider";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* HERO */}
      <HeroSlider />

      {/* SEZIONE: riscopriamo l'importanza del dialogo */}
      <section className="wa-section my-5 bg-primary-dark">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10 items-start py-6">
          {/* Titolo grande a sinistra */}
          <div className="flex-1">
            <h2
              className="text-bg-light uppercase leading-tight"
              style={{
                fontFamily: "DX Playhigh Expanded",
                fontSize: "clamp(28px, 4vw, 52px)",
              }}
            >
              riscopriamo l&apos;importanza del dialogo
            </h2>
          </div>
          {/* Testo a destra */}
          <div className="flex-1">
            <p className="font-body font-light text-body text-bg-light/70">
              con amici, familiari, partner, colleghi o sconosciuti: il dialogo ci fa crescere.
            </p>
            <p className="font-body font-light text-body text-bg-light/70 mt-4">
              What About nasce dall&apos;esigenza di ritrovare un dialogo e un contatto autentico
              con le persone. Progettiamo giochi, oggetti e attività per rompere il ghiaccio,
              stimolare il dialogo e — perché no — scoprire cose imbarazzanti sulle persone
              che pensi di conoscere bene.
            </p>
          </div>
        </div>
      </section>

      {/* SEZIONE: lancio The Whatabout Tower */}
      <section className="wa-section my-5 bg-bg-dark border border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 items-center py-6">
          {/* Logo Tower + immagine a sinistra */}
          <div className="flex-shrink-0 flex flex-col items-center gap-6 w-full md:w-auto">
            <div className="text-center">
              <p
                className="text-bg-light uppercase leading-none"
                style={{ fontFamily: "DX Playhigh Expanded", fontSize: "clamp(28px, 4vw, 52px)" }}
              >
                The
              </p>
              <p
                className="text-accent uppercase leading-none"
                style={{ fontFamily: "DX Playhigh Expanded", fontSize: "clamp(28px, 4vw, 52px)" }}
              >
                Whatabout
              </p>
              <p
                className="text-bg-light uppercase leading-none"
                style={{ fontFamily: "DX Playhigh Expanded", fontSize: "clamp(28px, 4vw, 52px)" }}
              >
                tower
              </p>
            </div>
            <Image
              src="/images/torre-amicizia.png"
              alt="What About Tower"
              width={200}
              height={300}
              className="object-contain drop-shadow-2xl"
            />
          </div>

          {/* Bullet + CTA a destra */}
          <div className="flex-1">
            <p
              className="font-body font-bold text-mini text-bg-light/40 uppercase tracking-widest mb-6"
            >
              the whatabout tower
            </p>
            <ul className="flex flex-col gap-3 mb-8">
              {[
                "un gioco cooperativo, da 2 a 8 persone.",
                "una torre.",
                "3 livelli da superare.",
                "insieme.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-accent mt-1">—</span>
                  <span
                    className="text-bg-light uppercase"
                    style={{ fontFamily: "DX Playhigh Expanded", fontSize: "clamp(16px, 2vw, 24px)" }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            <Link href="/tower" className="wa-btn wa-btn-primary">
              Scopri la tower
            </Link>
          </div>
        </div>
      </section>

      {/* SEZIONE: Elle Lab */}
      <section className="wa-section my-5 bg-bg-light">
        <div className="max-w-6xl mx-auto py-6">
          <p
            className="font-body font-bold text-mini text-bg-dark/40 uppercase tracking-widest mb-4"
          >
            un progetto di elle lab
          </p>
          <div className="flex flex-col md:flex-row gap-10 items-start">
            <div className="flex-1">
              <h2
                className="text-bg-dark uppercase leading-tight mb-6"
                style={{
                  fontFamily: "DX Playhigh Expanded",
                  fontSize: "clamp(24px, 3.5vw, 44px)",
                }}
              >
                promuoviamo il dialogo e l&apos;interazione attraverso attività e produzioni artigianali.
              </h2>
              <Link href="/progetto" className="wa-btn wa-btn-dark">
                scopri chi siamo
              </Link>
            </div>
            <div className="flex-1">
              <p className="font-body font-light text-body text-bg-dark/70">
                Elle Lab è un piccolo laboratorio milanese dove progettiamo e costruiamo cose
                con le mani — workshop creativi, installazioni, e produzioni artigianali come
                What About. Stampa 3D, incisione laser, idee strane: tutto fatto in casa,
                con l&apos;obiettivo di avvicinare le persone attraverso la creatività.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="h-5" />
    </>
  );
}
