"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

const slides = [
  {
    id: "amicizia",
    label: "Tra amici",
    subtitle: "della nostra amicizia.",
    subtitleColor: "#B4C2FF",
    image: "/images/hero-amicizia.jpg",
    tabColor: "#B4C2FF",
    tabText: "#1D2855",
  },
  {
    id: "famiglia",
    label: "In famiglia",
    subtitle: "della nostra famiglia.",
    subtitleColor: "#5FF4D4",
    image: "/images/hero-famiglia.jpg",
    tabColor: "#5FF4D4",
    tabText: "#063C3C",
  },
  {
    id: "amore",
    label: "In amore",
    subtitle: "del nostro amore.",
    subtitleColor: "#FFCAEC",
    image: "/images/hero-amore.jpg",
    tabColor: "#FFCAEC",
    tabText: "#242424",
  },
];

const disabledTabs = ["Team building", "Tra sconosciuti"];

const FADE_DURATION = 0.8;
const FADE_EASE = "power1.inOut";
// Seconda frase: il bordo della maschera (clip-path) spazza la frase mentre il testo si muove
// nella stessa direzione, ma più lentamente (parallasse). Uscita: alto → basso. Entrata: basso → alto.
const MASK_HIDDEN = "inset(100% 0% 0% 0%)"; // niente visibile
const MASK_SHOWN = "inset(0% 0% 0% 0%)"; // tutto visibile
const TEXT_TRAVEL = 60; // % di altezza percorsa dal testo mentre la maschera lo spazza
const OUT = { duration: 0.5, ease: "power2.inOut" };
const IN = { duration: 0.65, ease: "power3.out" };
const IN_DELAY = 0.35;
const AUTOPLAY_MS = 5000;

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const animatingRef = useRef(false);
  const zRef = useRef(1);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const maskRefs = useRef<(HTMLSpanElement | null)[]>([]); // maschera (clip-path)
  const textRefs = useRef<(HTMLSpanElement | null)[]>([]); // testo (transform)

  // Stato iniziale delle frasi non attive: maschera chiusa, quindi nessun pixel visibile
  useLayoutEffect(() => {
    maskRefs.current.forEach((el, i) => {
      if (el && i !== 0) gsap.set(el, { clipPath: MASK_HIDDEN, autoAlpha: 0 });
    });
    textRefs.current.forEach((el, i) => {
      if (el && i !== 0) gsap.set(el, { yPercent: TEXT_TRAVEL });
    });
  }, []);

  // Dissolvenza incrociata:
  // - immagini: la nuova sfuma SOPRA la precedente (che resta opaca fino a fine transizione,
  //   così lo sfondo non diventa mai bianco);
  // - testi: il vecchio sfuma fuori mentre il nuovo sfuma dentro, nello stesso momento.
  const goToSlide = (index: number) => {
    if (animatingRef.current || index === current) return;
    animatingRef.current = true;
    const prev = current;

    zRef.current += 1;
    gsap.set(imageRefs.current[index], { zIndex: zRef.current, opacity: 0 });

    gsap
      .timeline({
        onComplete: () => {
          gsap.set(imageRefs.current[prev], { opacity: 0 });
          animatingRef.current = false;
        },
      })
      .to(imageRefs.current[index], { opacity: 1, duration: FADE_DURATION, ease: FADE_EASE }, 0)
      // frase uscente: la maschera si chiude dall'alto verso il basso, il testo scende con lei
      .to(
        maskRefs.current[prev],
        { clipPath: MASK_HIDDEN, ...OUT, onComplete: () => { gsap.set(maskRefs.current[prev], { autoAlpha: 0 }); } },
        0
      )
      .to(textRefs.current[prev], { yPercent: TEXT_TRAVEL, ...OUT }, 0)
      // frase entrante: la maschera si apre dal basso verso l'alto, il testo sale con lei
      .fromTo(
        maskRefs.current[index],
        { clipPath: MASK_HIDDEN, autoAlpha: 1 },
        { clipPath: MASK_SHOWN, ...IN },
        IN_DELAY
      )
      .fromTo(textRefs.current[index], { yPercent: TEXT_TRAVEL }, { yPercent: 0, ...IN }, IN_DELAY);

    setCurrent(index);
  };

  // Auto-advance
  useEffect(() => {
    const timer = setTimeout(() => {
      goToSlide((current + 1) % slides.length);
    }, AUTOPLAY_MS);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  const slide = slides[current];

  return (
    <section className="relative mx-3 md:mx-4 lg:mx-5 h-[640px] rounded-section overflow-hidden text-white">
      {/* Immagini di sfondo impilate, ognuna con il suo overlay blu scuro */}
      <div className="absolute inset-0 z-0">
        {slides.map((s, i) => (
          <div
            key={s.id}
            ref={(el) => {
              imageRefs.current[i] = el;
            }}
            className="absolute inset-0"
            style={{ opacity: i === 0 ? 1 : 0 }}
            aria-hidden={i !== current}
          >
            <Image
              src={s.image}
              alt={s.label}
              fill
              className="object-cover object-center"
              priority={i === 0}
            />
            <div className="absolute inset-0" style={{ backgroundColor: "#1D2855", opacity: 0.72 }} />
          </div>
        ))}
      </div>

      {/* Testo centrato: label e prima frase fisse, solo la seconda frase cambia */}
      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col items-center justify-center text-center px-5">
        <p className="font-body font-bold uppercase text-white text-[14px] leading-none mb-[60px]">
          What About
        </p>
        <div
          className="uppercase"
          style={{
            fontFamily: "DX Playhigh Expanded",
            fontSize: "clamp(36px, 5.6vw, 80px)",
            lineHeight: "0.925",
          }}
        >
          <span className="block text-white">Parliamo di noi.</span>
          {/* Le frasi sono impilate nella stessa cella. Ognuna ha una maschera (clip-path)
              e, dentro, il testo che si muove. */}
          <span className="grid overflow-hidden py-[0.06em] -my-[0.06em]">
            {slides.map((s, i) => (
              <span
                key={s.id}
                ref={(el) => {
                  maskRefs.current[i] = el;
                }}
                className="block [grid-area:1/1]"
                style={{
                  clipPath: i === 0 ? MASK_SHOWN : MASK_HIDDEN,
                  visibility: i === 0 ? "visible" : "hidden",
                }}
                aria-hidden={i !== current}
              >
                <span
                  ref={(el) => {
                    textRefs.current[i] = el;
                  }}
                  className="block"
                  style={{ color: s.subtitleColor }}
                >
                  {s.subtitle}
                </span>
              </span>
            ))}
          </span>
        </div>
      </div>

      {/* Tab target — in basso a sinistra */}
      <div className="absolute bottom-10 left-5 md:left-10 z-20 flex gap-2 flex-wrap">
        {slides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => goToSlide(i)}
            className="px-4 py-1.5 rounded-btn transition-all duration-300"
            style={{
              fontFamily: "Funnel Display",
              fontWeight: 700,
              fontSize: "12px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              backgroundColor: i === current ? slide.tabColor : "transparent",
              color: i === current ? slide.tabText : "#FFF8E6",
              border: `1.5px solid ${i === current ? slide.tabColor : "rgba(255,248,230,0.35)"}`,
              opacity: i === current ? 1 : 0.65,
            }}
          >
            {s.label}
          </button>
        ))}
        {disabledTabs.map((label) => (
          <button
            key={label}
            disabled
            className="px-4 py-1.5 rounded-btn cursor-not-allowed"
            style={{
              fontFamily: "Funnel Display",
              fontWeight: 700,
              fontSize: "12px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              backgroundColor: "transparent",
              color: "rgba(255,248,230,0.25)",
              border: "1.5px solid rgba(255,248,230,0.15)",
            }}
          >
            {label}
          </button>
        ))}
      </div>
    </section>
  );
}
