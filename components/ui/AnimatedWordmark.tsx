"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

// useLayoutEffect nel browser, useEffect lato server (evita warning SSR)
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

type Variant = "cream" | "bicolor";

const FILES: Record<Variant, { what: string; about: string }> = {
  cream: { what: "/logo/logo-what-cream.svg", about: "/logo/logo-about-cream.svg" },
  bicolor: { what: "/logo/logo-what-blue.svg", about: "/logo/logo-about-pink.svg" },
};

// Proporzioni del contenitore: wordmark completo (1358×240) o logo header (218×38)
const ASPECT: Record<Variant, string> = {
  cream: "1358 / 240",
  bicolor: "218 / 38",
};

/**
 * Le due parole si muovono in direzioni opposte.
 * dir = 1  → "WHAT":  entra dall'alto verso il basso
 * dir = -1 → "ABOUT": entra dal basso verso l'alto
 * Posizioni in % ricavate dal wordmark originale (WHAT 0–644, ABOUT 638–1357 su 1358).
 */
const PIECES = [
  { key: "what" as const, dir: 1, w: 180, h: 66, box: { left: "0%", top: "1.42%", width: "47.25%" } },
  { key: "about" as const, dir: -1, w: 201, h: 67, box: { left: "47%", top: "0%", width: "52.8%" } },
];

const SHOWN = "inset(0% 0% 0% 0%)";
const TRAVEL = 35; // % di altezza percorsa dal logo dentro la maschera

// Maschera chiusa prima di entrare: si apre dal lato da cui arriva la parola
const hiddenIn = (dir: number) => (dir === 1 ? "inset(0% 0% 100% 0%)" : "inset(100% 0% 0% 0%)");
// Maschera chiusa dopo l'uscita: si chiude dal lato opposto, nello stesso verso del movimento
const hiddenOut = (dir: number) => (dir === 1 ? "inset(100% 0% 0% 0%)" : "inset(0% 0% 100% 0%)");

interface AnimatedWordmarkProps {
  variant?: Variant;
  className?: string;
  /** "mount": parte al caricamento. "inView": parte quando entra in viewport (scroll). */
  trigger?: "mount" | "inView";
  /** Se impostato, ogni N secondi la parola esce e rientra (loop). */
  loopEvery?: number;
  /** Ritardo (s) prima della prima entrata */
  delay?: number;
}

export default function AnimatedWordmark({
  variant = "cream",
  className = "",
  trigger = "mount",
  loopEvery,
  delay = 0,
}: AnimatedWordmarkProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const maskRefs = useRef<(HTMLDivElement | null)[]>([]);
  const innerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useIsoLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    // Chi preferisce meno movimento vede il logo fermo
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const masks = maskRefs.current;
    const inners = innerRefs.current;
    let observer: IntersectionObserver | undefined;

    const ctx = gsap.context(() => {
      const setClosed = () =>
        PIECES.forEach((p, i) => {
          gsap.set(masks[i], { clipPath: hiddenIn(p.dir) });
          gsap.set(inners[i], { yPercent: -TRAVEL * p.dir });
        });

      const enter = () => {
        const tl = gsap.timeline();
        PIECES.forEach((p, i) => {
          tl.to(masks[i], { clipPath: SHOWN, duration: 1, ease: "power3.out" }, 0);
          tl.to(inners[i], { yPercent: 0, duration: 1.2, ease: "power3.out" }, 0);
        });
        return tl;
      };

      const exit = () => {
        const tl = gsap.timeline({ onComplete: setClosed });
        PIECES.forEach((p, i) => {
          tl.to(masks[i], { clipPath: hiddenOut(p.dir), duration: 0.6, ease: "power2.inOut" }, 0);
          tl.to(inners[i], { yPercent: TRAVEL * p.dir, duration: 0.6, ease: "power2.inOut" }, 0);
        });
        return tl;
      };

      // Loop: esce, rientra, poi aspetta loopEvery secondi e ricomincia
      const scheduleLoop = () => {
        if (!loopEvery) return;
        gsap.delayedCall(loopEvery, () => {
          gsap
            .timeline({ onComplete: scheduleLoop })
            .add(exit())
            .add(enter(), "+=0.1");
        });
      };

      const start = () => {
        const first = enter().delay(delay);
        first.eventCallback("onComplete", scheduleLoop);
      };

      setClosed();

      if (trigger === "mount") {
        start();
      } else {
        observer = new IntersectionObserver(
          ([entry]) => {
            if (!entry.isIntersecting) return;
            observer?.disconnect();
            ctx.add(start);
          },
          { threshold: 0.3 }
        );
        observer.observe(root);
      }
    }, root);

    return () => {
      observer?.disconnect();
      ctx.revert();
    };
  }, [trigger, loopEvery, delay]);

  const files = FILES[variant];

  return (
    <div
      ref={rootRef}
      role="img"
      aria-label="What About"
      className={`relative ${className}`}
      style={{ aspectRatio: ASPECT[variant] }}
    >
      {PIECES.map((p, i) => (
        <div key={p.key} className="absolute" style={p.box}>
          <div
            ref={(el) => {
              maskRefs.current[i] = el;
            }}
          >
            <div
              ref={(el) => {
                innerRefs.current[i] = el;
              }}
            >
              <Image src={files[p.key]} alt="" aria-hidden width={p.w} height={p.h} className="w-full h-auto block" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
