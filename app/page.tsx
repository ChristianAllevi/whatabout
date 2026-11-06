import HeroSlider from "@/components/sections/HeroSlider";
import TowerShowcaseImages from "@/components/sections/TowerShowcaseImages";
import ElleLabSection from "@/components/sections/ElleLabSection";
import Link from "next/link";

const display = { fontFamily: "DX Playhigh Expanded" } as const;
const h60 = {
  ...display,
  fontSize: "clamp(28px, 4.17vw, 60px)",
  lineHeight: "0.93",
  textTransform: "uppercase",
} as const;

export default function Home() {
  return (
    <>
      {/* HERO */}
      <HeroSlider />

      {/* SEZIONE: riscopriamo l'importanza del dialogo */}
      <section className="mt-[100px] md:mt-[165px] px-8 md:px-[180px]">
        <p className="font-body font-bold uppercase text-primary-dark text-[14px] leading-none mb-[47px]">
          riscopriamo l&apos;importanza del dialogo
        </p>
        <h2 className="text-primary-dark max-w-[900px]" style={h60}>
          con amici, famigliari, partner, colleghi o sconosciuti:{" "}
          <span className="text-primary">il dialogo ci fa crescere.</span>
        </h2>
        <p className="font-body font-light text-[16px] leading-6 text-primary-dark mt-[56px] md:ml-[367px] md:max-w-[713px]">
          What About nasce dall&apos;esigenza di ritrovare un dialogo e un contatto autentico con le
          persone. Esploriamo le sfumature del rapporto umano, in tutti i suoi contesti, attraverso la
          progettazione di prodotti e attività divertenti, che stimolino la conoscenza e la voglia di
          stare insieme.
        </p>
      </section>

      {/* SEZIONE: The Whatabout Tower */}
      <section className="relative mx-5 mt-[140px] md:mt-[150px] rounded-section bg-bg-light">
        {/* Etichetta rosa a cavallo del bordo superiore */}
        <div
          className="absolute left-1/2 -top-[62px] -translate-x-1/2 z-10 flex flex-col items-center uppercase text-white text-[28px] md:text-[37px] leading-[0.75] text-center"
          style={display}
        >
          <span className="bg-accent rounded-btn px-3 pt-3 pb-2">The</span>
          <span className="bg-accent rounded-btn px-4 pt-3 pb-2 -mt-px">Whatabout</span>
          <span className="bg-accent rounded-btn px-3 pt-3 pb-2 -mt-px">tower</span>
        </div>

        <div className="relative overflow-hidden rounded-section">
          <div className="relative z-10 px-8 md:pl-[159px] py-[110px] md:py-[120px] md:min-h-[560px]">
            <p className="font-body font-bold uppercase text-primary-dark text-[14px] leading-none mb-[46px]">
              un gioco cooperativo, da 2 a 8 persone.
            </p>
            <ul className="mb-[56px]" style={h60}>
              <li className="text-primary-dark">una torre.</li>
              <li className="text-primary">3 livelli da superare.</li>
              <li className="text-accent">insieme.</li>
            </ul>
            <Link href="/what-about-tower" className="wa-btn-pink">
              the whatabout tower
            </Link>
          </div>

          <TowerShowcaseImages towerTop={73} />
        </div>
      </section>

      {/* SEZIONE: Elle Lab */}
      <ElleLabSection />
    </>
  );
}
