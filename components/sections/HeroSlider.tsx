"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

const slides = [
  {
    id: "amicizia",
    label: "Tra amici",
    subtitle: "della nostra amicizia.",
    subtitleColor: "#5FF4D4",
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
    label: "In coppia",
    subtitle: "del nostro amore.",
    subtitleColor: "#FFCAEC",
    image: "/images/hero-amore.jpg",
    tabColor: "#FFCAEC",
    tabText: "#242424",
  },
];

const disabledTabs = ["Lavoro", "Dating"];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const goToSlide = (index: number) => {
    if (animating || index === current) return;
    setAnimating(true);

    gsap.to([imageRef.current, textRef.current], {
      opacity: 0,
      duration: 0.35,
      ease: "power2.in",
      onComplete: () => {
        setCurrent(index);
        gsap.to([imageRef.current, textRef.current], {
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          onComplete: () => setAnimating(false),
        });
      },
    });
  };

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      const next = (current + 1) % slides.length;
      goToSlide(next);
    }, 5000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, animating]);

  const slide = slides[current];

  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden">
      {/* Background image con overlay blu scuro */}
      <div ref={imageRef} className="absolute inset-0 z-0">
        <Image
          src={slide.image}
          alt={slide.label}
          fill
          className="object-cover object-center"
          priority
        />
        {/* Overlay blu scuro come in Figma */}
        <div className="absolute inset-0" style={{ backgroundColor: "#1D2855", opacity: 0.72 }} />
      </div>

      {/* Testo centrato — sia verticalmente che orizzontalmente */}
      <div ref={textRef} className="relative z-10 h-full flex flex-col items-center justify-center text-center px-5">
        {/* Mini label "whatabout" */}
        <p
          className="text-bg-light/60 uppercase mb-4"
          style={{ fontFamily: "Funnel Display", fontWeight: 700, fontSize: "13px", letterSpacing: "0.12em" }}
        >
          whatabout
        </p>

        {/* Claim principale — stesso font, stesso stile, colore diverso */}
        <div>
          <span
            className="block text-bg-light uppercase leading-none"
            style={{
              fontFamily: "DX Playhigh Expanded",
              fontSize: "clamp(36px, 6.5vw, 80px)",
            }}
          >
            Parliamo di noi.
          </span>
          <span
            className="block uppercase leading-none"
            style={{
              fontFamily: "DX Playhigh Expanded",
              fontSize: "clamp(36px, 6.5vw, 80px)",
              color: slide.subtitleColor,
              transition: "color 0.3s ease",
            }}
          >
            {slide.subtitle}
          </span>
        </div>
      </div>

      {/* Tab target — in basso a sinistra come nel Figma */}
      <div className="absolute bottom-10 left-5 md:left-10 z-10 flex gap-2 flex-wrap">
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
