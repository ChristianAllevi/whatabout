"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AnimatedWordmark from "@/components/ui/AnimatedWordmark";

// Ogni quanti secondi il logo dell'header ripete l'animazione
const LOGO_LOOP_SECONDS = 8;

// Voci di menu: bianche, in secondary light quando la pagina è quella attiva.
// Al momento "il progetto" coincide con la homepage.
const NAV_ITEMS = [
  { label: "il progetto", href: "/", isActive: (p: string) => p === "/" },
  { label: "the whatabout tower", href: "/what-about-tower", isActive: (p: string) => p.startsWith("/what-about-tower") },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      {/* Header sticky: altezza 0, quindi si sovrappone all'hero che segue.
          Posizione naturale = bordo alto dell'hero (banner + margine hero); allo scroll si incolla al top.
          Distanza dal margine di pagina (lati e alto): 12px mobile, 16px tablet, 20px desktop. */}
      <div className="sticky top-0 z-50 h-0 mt-3 md:mt-4 lg:mt-5">
        <header className="flex items-center justify-between px-6 md:px-8 lg:px-10 pt-3 md:pt-4 lg:pt-5">
        {/* Logo — box crema, padding 10px, raggio 4px */}
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          className="bg-bg-light rounded-btn p-2.5 hover:opacity-90 transition-opacity"
        >
          <AnimatedWordmark
            variant="bicolor"
            trigger="mount"
            delay={0.2}
            loopEvery={LOGO_LOOP_SECONDS}
            className="w-[140px] md:w-[218px]"
          />
        </Link>

        {/* Tablet/desktop — box menu primary, padding 20px, raggio 4px */}
        <nav className="hidden md:flex items-center bg-primary rounded-btn p-5">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={item.isActive(pathname) ? "page" : undefined}
              className={`font-display uppercase text-[24px] leading-none px-5 transition-colors hover:text-secondary-light ${
                item.isActive(pathname) ? "text-secondary-light" : "text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-3 bg-primary rounded-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
        </header>
      </div>

      {/* Mobile overlay (sotto l'header, così l'hamburger resta cliccabile) */}
      <div className={`fixed inset-0 z-40 bg-primary flex flex-col items-center justify-center gap-10 transition-all duration-300 md:hidden ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setMenuOpen(false)}
            aria-current={item.isActive(pathname) ? "page" : undefined}
            className={`font-display uppercase text-[32px] transition-colors ${
              item.isActive(pathname) ? "text-secondary-light" : "text-white"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </>
  );
}
