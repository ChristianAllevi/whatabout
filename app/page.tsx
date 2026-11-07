import HeroSlider from "@/components/sections/HeroSlider";
import TowerShowcaseImages from "@/components/sections/TowerShowcaseImages";
import ElleLabSection from "@/components/sections/ElleLabSection";
import Link from "next/link";

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
        <h2 className="wa-h60 text-primary-dark max-w-[900px]">
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

      {/* SEZIONE: The What About Tower */}
      {/* TODO: qui andrà il logo The What About Tower a cavallo tra le due sezioni (in arrivo) */}
      <section className="relative mx-3 md:mx-4 lg:mx-5 mt-[100px] md:mt-[150px] rounded-section bg-bg-light">
        <div className="relative overflow-hidden rounded-section">
          <div className="relative z-10 px-5 md:pl-[159px] pt-[80px] pb-[80px] min-h-[604px] md:py-[120px] md:min-h-[560px]">
            <p className="font-body font-bold uppercase text-primary-dark text-[14px] leading-none mb-[22px] md:mb-[46px]">
              un gioco cooperativo, da 2 a 8 persone.
            </p>
            <ul className="wa-h60 mb-[46px] md:mb-[56px]">
              <li className="text-primary-dark">una torre.</li>
              <li className="text-primary">3 livelli da superare.</li>
              <li className="text-accent">insieme.</li>
            </ul>
            <Link href="/what-about-tower" className="wa-btn-pink">
              The What About Tower
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
