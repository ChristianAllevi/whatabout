"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const MASK_HIDDEN = "inset(100% 0% 0% 0%)";
const MASK_SHOWN = "inset(0% 0% 0% 0%)";
const TEXT_TRAVEL = 60; // % di altezza percorsa dal testo (stessi valori della hero in homepage)

interface MaskRevealProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  /** Ritardo in secondi prima dell'entrata */
  delay?: number;
}

/**
 * Entrata di una riga di testo con maschera dal basso verso l'alto:
 * il bordo della maschera si apre mentre il testo sale (leggermente più lento).
 * Parte al caricamento della pagina, solo in entrata.
 */
export default function MaskReveal({ children, className = "", style, delay = 0 }: MaskRevealProps) {
  const maskRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({ delay })
        .fromTo(
          maskRef.current,
          { clipPath: MASK_HIDDEN },
          {
            clipPath: MASK_SHOWN,
            duration: 0.65,
            ease: "power3.out",
            onComplete: () => {
              gsap.set(maskRef.current, { clearProps: "clipPath" });
            },
          },
          0
        )
        .fromTo(textRef.current, { yPercent: TEXT_TRAVEL }, { yPercent: 0, duration: 0.65, ease: "power3.out" }, 0);
    });
    return () => ctx.revert();
  }, [delay]);

  return (
    <span
      ref={maskRef}
      className={`${className} py-[0.06em] -my-[0.06em]`}
      // Parte chiusa: nessun pixel visibile prima che parta l'animazione
      style={{ ...style, clipPath: MASK_HIDDEN }}
    >
      <span ref={textRef} className="block">
        {children}
      </span>
    </span>
  );
}
