import Link from "next/link";

export default function ElleLabSection() {
  return (
    <section className="mt-[100px] md:mt-[165px] px-8 md:px-10 text-center flex flex-col items-center">
      <p className="font-body font-bold uppercase text-primary-dark text-[14px] leading-none mb-[47px]">
        un progetto di elle lab
      </p>
      <h2 className="wa-h60 text-primary max-w-[1000px]">
        promuoviamo il dialogo e l&apos;interazione attraverso attività e produzioni artigianali.
      </h2>
      <p className="font-body font-light text-[16px] leading-5 text-primary-dark mt-[57px] max-w-[1062px]">
        Elle Lab è un piccolo laboratorio milanese, dove progettiamo e diamo vita a workshop, eventi
        creativi e produzioni artigianali come What About. Stampa 3D, incisione laser e molto altro:
        tutto fatto in casa, con l&apos;obiettivo di avvicinare le persone attraverso la creatività.
      </p>
      <Link href="/progetto" className="wa-btn-pink mt-[60px]">
        scopri chi siamo
      </Link>
    </section>
  );
}
