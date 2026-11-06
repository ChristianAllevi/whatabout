import Image from "next/image";
import Link from "next/link";

const editions = [
  {
    id: "amicizia",
    name: "Friendship Edition",
    bg: "#B4C2FF",
    textColor: "#1D2855",
    image: "/images/torre-amicizia.png",
    available: true,
    cta: "Preordina ora",
  },
  {
    id: "famiglia",
    name: "Family Edition",
    bg: "#5FF4D4",
    textColor: "#063C3C",
    image: "/images/torre-amicizia.png",
    available: true,
    cta: "preordina ora",
  },
  {
    id: "amore",
    name: "Lovers Edition",
    bg: "#FFCAEC",
    textColor: "#242424",
    image: "/images/torre-amicizia.png",
    available: false,
    cta: "coming soon",
  },
];

export default function TowerPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex flex-col justify-center px-5 md:px-16 overflow-hidden pt-28">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/mattoncini.jpg"
            alt="What About Tower"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0" style={{ backgroundColor: "#1D2855", opacity: 0.75 }} />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto w-full flex flex-col md:flex-row gap-12 items-center">
          {/* Testo hero sx */}
          <div className="flex-1">
            <p
              className="font-body font-bold text-mini text-bg-light/50 uppercase tracking-widest mb-4"
            >
              the whatabout tower
            </p>
            <h1
              className="text-bg-light uppercase leading-tight"
              style={{
                fontFamily: "DX Playhigh Expanded",
                fontSize: "clamp(30px, 5.5vw, 70px)",
              }}
            >
              un dialogo da costruire.
              <br />
              mattoncino per mattoncino.
            </h1>
          </div>

          {/* Bullet punti dx */}
          <div className="flex-shrink-0 md:w-80">
            <ul className="flex flex-col gap-2">
              {[
                "un gioco cooperativo, da 2 a 8 persone.",
                "una torre.",
                "3 livelli da superare.",
                "insieme.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-accent mt-0.5">—</span>
                  <span
                    className="text-bg-light uppercase"
                    style={{ fontFamily: "DX Playhigh Expanded", fontSize: "clamp(13px, 1.5vw, 18px)" }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* SEZIONE: descrizione + preordine */}
      <section className="wa-section my-5 bg-primary-dark">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10 py-6">
          {/* Testo descrizione sx */}
          <div className="flex-1">
            <p className="font-body font-light text-body text-bg-light/80 mb-6">
              Ogni mattoncino diventa un argomento di discussione. Ogni livello va un po&apos;
              più in profondità, passando dagli argomenti più leggeri e divertenti, a quelli
              che non ti aspetti. Non si vince e non si perde: si gioca finché la torre è in
              piedi. E più dura, meglio è. I mattoncini d&apos;oro, intoccabili durante il
              gioco, si attivano alla fine come sfida finale.
            </p>
          </div>

          {/* Pre-ordine dx */}
          <div className="flex-shrink-0 md:w-72">
            <Link href="/shop" className="wa-btn wa-btn-primary block text-center mb-4">
              preordina ora
            </Link>
            <p
              className="font-body font-bold text-mini text-bg-light/50 uppercase tracking-widest mb-1"
            >
              prossima release:
            </p>
            <p
              className="text-bg-light uppercase mb-4"
              style={{ fontFamily: "DX Playhigh Expanded", fontSize: "24px" }}
            >
              21 novembre
            </p>
            <p className="font-body font-light text-detail text-bg-light/60 mb-6">
              Consegna prevista entro il: <strong className="text-bg-light">15 Dicembre</strong>
            </p>
            <p className="font-body font-light text-detail text-bg-light/60">
              Produciamo ogni torre a mano, su ordinazione. Per questa prima release lavoriamo
              su un massimo di 50 pezzi — per contenere gli sprechi e garantire la qualità di
              ogni singolo mattoncino. Iscriviti alla waiting list per uno sconto del 10% sul
              preordine.
            </p>
          </div>
        </div>
      </section>

      {/* SEZIONE: edizioni */}
      <section className="wa-section my-5 bg-bg-dark border border-white/10">
        <div className="max-w-6xl mx-auto py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {editions.map((ed) => (
              <div
                key={ed.id}
                className="rounded-section p-5 flex flex-col items-center text-center relative overflow-hidden"
                style={{ backgroundColor: ed.bg, minHeight: "400px" }}
              >
                {/* Immagine in background opacità 20% */}
                <div className="absolute inset-0 z-0 rounded-section overflow-hidden">
                  <Image
                    src={ed.image}
                    alt={ed.name}
                    fill
                    className="object-contain object-center"
                    style={{ opacity: 0.15, mixBlendMode: "luminosity" }}
                  />
                </div>

                <div className="relative z-10 flex flex-col items-center h-full w-full">
                  {/* Logo tower */}
                  <div className="mb-4" style={{ color: ed.textColor }}>
                    <p className="uppercase leading-none" style={{ fontFamily: "DX Playhigh Expanded", fontSize: "32px" }}>The</p>
                    <p className="uppercase leading-none" style={{ fontFamily: "DX Playhigh Expanded", fontSize: "32px" }}>Whatabout</p>
                    <p className="uppercase leading-none" style={{ fontFamily: "DX Playhigh Expanded", fontSize: "32px" }}>tower</p>
                  </div>

                  {/* Torre PNG al 100% */}
                  <div className="flex-1 flex items-center justify-center my-4">
                    <Image
                      src={ed.image}
                      alt={ed.name}
                      width={140}
                      height={210}
                      className="object-contain drop-shadow-lg"
                    />
                  </div>

                  {/* Edition label */}
                  <p
                    className="font-body font-bold text-mini uppercase tracking-widest mb-4"
                    style={{ color: ed.textColor, opacity: 0.7 }}
                  >
                    {ed.name}
                  </p>

                  {/* CTA */}
                  {ed.available ? (
                    <Link
                      href="/shop"
                      className="wa-btn w-full text-center"
                      style={{ backgroundColor: ed.textColor, color: ed.bg }}
                    >
                      {ed.cta}
                    </Link>
                  ) : (
                    <button
                      disabled
                      className="wa-btn w-full text-center opacity-50 cursor-not-allowed"
                      style={{ backgroundColor: ed.textColor, color: ed.bg }}
                    >
                      {ed.cta}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEZIONE: Elle Lab */}
      <section className="wa-section my-5 bg-bg-light">
        <div className="max-w-6xl mx-auto py-6">
          <p className="font-body font-bold text-mini text-bg-dark/40 uppercase tracking-widest mb-4">
            un progetto di elle lab
          </p>
          <div className="flex flex-col md:flex-row gap-10 items-start">
            <div className="flex-1">
              <h2
                className="text-bg-dark uppercase leading-tight mb-6"
                style={{
                  fontFamily: "DX Playhigh Expanded",
                  fontSize: "clamp(22px, 3vw, 40px)",
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
