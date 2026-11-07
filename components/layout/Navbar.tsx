"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import AnimatedWordmark from "@/components/ui/AnimatedWordmark";
import MaskReveal from "@/components/ui/MaskReveal";

// Ogni quanti secondi il logo dell'header ripete l'animazione
const LOGO_LOOP_SECONDS = 8;

// Voci di menu: bianche, in secondary light quando la pagina è quella attiva.
// Al momento "il progetto" coincide con la homepage.
const NAV_ITEMS = [
  { label: "il progetto", href: "/", isActive: (p: string) => p === "/" },
  { label: "The WA Tower", href: "/what-about-tower", isActive: (p: string) => p.startsWith("/what-about-tower") },
];

// Link del menu mobile: per ora vuoti, da collegare quando esistono le pagine/profili
const LEGAL_LINKS = [
  { label: "privacy & cookie policy", href: "#" },
  { label: "termini e condizioni", href: "#" },
  { label: "domande frequenti", href: "#" },
];
const MENU_SOCIALS = [
  { name: "Instagram", href: "#", icon: "/social/whatabout-instagram-icon-white.svg" },
  { name: "TikTok", href: "#", icon: "/social/whatabout-tiktok-icon-white.svg" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openCount, setOpenCount] = useState(0);
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

        {/* Mobile hamburger: due barrette 30x16 (distanza 4px) che si sovrappongono in un "-" */}
        <button
          className="md:hidden p-3 bg-primary rounded-btn"
          onClick={() => {
            if (!menuOpen) setOpenCount((c) => c + 1);
            setMenuOpen(!menuOpen);
          }}
          aria-label={menuOpen ? "Chiudi menu" : "Apri menu"}
          aria-expanded={menuOpen}
        >
          <span className="relative block w-[30px] h-4">
            <span
              className="absolute left-0 w-full h-1.5 rounded-[1px] bg-bg-light transition-[top] duration-300 ease-in-out"
              style={{ top: menuOpen ? 5 : 0 }}
            />
            <span
              className="absolute left-0 w-full h-1.5 rounded-[1px] bg-bg-light transition-[top] duration-300 ease-in-out"
              style={{ top: menuOpen ? 5 : 10 }}
            />
          </span>
        </button>
        </header>
      </div>

      {/* Mobile overlay a tutto schermo (sotto l'header, così logo e icona restano visibili e cliccabili) */}
      <div
        className={`fixed inset-0 z-40 bg-primary flex flex-col overflow-y-auto px-6 pt-[84px] pb-8 transition-opacity duration-300 md:hidden ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <nav className="mt-[80px] flex flex-col gap-6">
          {NAV_ITEMS.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              aria-current={item.isActive(pathname) ? "page" : undefined}
              className={`font-display uppercase text-[60px] leading-none transition-colors ${
                item.isActive(pathname) ? "text-secondary-light" : "text-white"
              }`}
            >
              {/* key con openCount: ad ogni apertura il componente si rimonta e l'entrata riparte */}
              <MaskReveal key={openCount} className="block" delay={0.15 + i * 0.1}>
                {item.label}
              </MaskReveal>
            </Link>
          ))}
        </nav>

        <div className="mt-auto pt-16 text-bg-light">
          {/* TODO: collegare le pagine legali quando esistono */}
          <div className="flex flex-col gap-3.5 font-body font-bold uppercase text-[14px] leading-none">
            {LEGAL_LINKS.map((l) => (
              <Link key={l.label} href={l.href} onClick={() => setMenuOpen(false)}>
                {l.label}
              </Link>
            ))}
          </div>

          <div className="mt-10 flex items-end justify-between">
            <div className="flex flex-col items-start gap-3 font-body text-[14px] leading-none">
              <span>Progetto di</span>
              <Image src="/logo/ellelab-logo-white.svg" alt="Elle Lab" width={134} height={14} className="h-3.5 w-auto" />
            </div>
            {/* TODO: collegare i profili social */}
            <div className="flex items-center gap-5">
              {MENU_SOCIALS.map((s) => (
                <a key={s.name} href={s.href} aria-label={s.name}>
                  <Image src={s.icon} alt="" width={36} height={36} className="w-9 h-9" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
