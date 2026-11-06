"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      {/* Banner height offset: banner is ~36px, navbar sits below it */}
      <nav className="fixed top-9 left-0 right-0 z-40 flex items-center justify-between px-5 py-3">
        {/* Logo — box con bordo */}
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          className="border border-white/40 rounded-btn px-3 py-2 hover:border-white/70 transition-colors"
        >
          <Image
            src="/logo/logo-bicolor.svg"
            alt="What About"
            width={110}
            height={19}
            priority
          />
        </Link>

        {/* Desktop — box menu a destra */}
        <div className="hidden md:flex border border-white/40 rounded-btn overflow-hidden">
          <Link
            href="/progetto"
            className="px-5 py-2.5 text-bg-light hover:bg-white/10 transition-colors uppercase"
            style={{ fontFamily: "DX Playhigh Expanded", fontSize: "13px", letterSpacing: "0.04em" }}
          >
            Il Progetto
          </Link>
          <div className="w-px bg-white/30" />
          <Link
            href="/tower"
            className="px-5 py-2.5 text-bg-light hover:bg-white/10 transition-colors uppercase"
            style={{ fontFamily: "DX Playhigh Expanded", fontSize: "13px", letterSpacing: "0.04em" }}
          >
            The Whatabout Tower
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 border border-white/40 rounded-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span className={`block w-5 h-0.5 bg-bg-light transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-5 h-0.5 bg-bg-light transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-0.5 bg-bg-light transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </nav>

      {/* Mobile overlay */}
      <div className={`fixed inset-0 z-40 bg-bg-dark flex flex-col items-center justify-center gap-10 transition-all duration-400 md:hidden ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <Image src="/logo/logo-light.svg" alt="What About" width={180} height={31} className="opacity-20 mb-6" />
        <Link href="/progetto" onClick={() => setMenuOpen(false)} className="text-bg-light uppercase" style={{ fontFamily: "DX Playhigh Expanded", fontSize: "32px" }}>
          Il Progetto
        </Link>
        <Link href="/tower" onClick={() => setMenuOpen(false)} className="text-bg-light uppercase" style={{ fontFamily: "DX Playhigh Expanded", fontSize: "32px" }}>
          The Whatabout Tower
        </Link>
      </div>
    </>
  );
}
