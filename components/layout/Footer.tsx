import Image from "next/image";
import Link from "next/link";
import AnimatedWordmark from "@/components/ui/AnimatedWordmark";

// TODO: sostituire con gli URL reali dei profili
const socials = [
  { name: "Instagram", href: "https://www.instagram.com/", icon: "/social/whatabout-instagram-icon-white.svg" },
  { name: "TikTok", href: "https://www.tiktok.com/", icon: "/social/whatabout-tiktok-icon-white.svg" },
];

function SocialLinks({ className = "", iconClassName = "" }: { className?: string; iconClassName?: string }) {
  return (
    <div className={`flex items-center gap-5 ${className}`}>
      {socials.map((s) => (
        <a
          key={s.name}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.name}
          className="hover:opacity-70 transition-opacity"
        >
          <Image src={s.icon} alt="" width={48} height={48} className={iconClassName} />
        </a>
      ))}
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-primary text-bg-light rounded-section mt-[160px] mx-3 md:mx-4 lg:mx-5 mb-3 md:mb-4 lg:mb-5 p-5">
      {/* Wordmark */}
      <AnimatedWordmark variant="cream" trigger="inView" className="w-full" />

      {/* Mobile: icone social subito sotto il wordmark (su desktop stanno nella riga finale) */}
      <SocialLinks className="md:hidden mt-[80px] px-5" iconClassName="w-9 h-9" />

      {/* Contatti + link. Mobile: contatti sopra, link sotto. Desktop: link a sinistra, contatti a destra. */}
      <div className="mt-[50px] md:mt-[60px] px-5 md:px-0 grid grid-cols-1 md:grid-cols-[598fr_762fr] gap-[80px] md:gap-0">
        <div className="flex flex-col gap-[50px] md:col-start-2 md:row-start-1">
          <div>
            <p className="font-body font-bold uppercase text-[14px] leading-none mb-5">info &amp; collaborazioni</p>
            <a
              href="mailto:hello@thewhataboutproject.it"
              className="font-body font-medium text-[20px] md:text-[36px] leading-none hover:opacity-70 transition-opacity break-all"
            >
              hello@thewhataboutproject.it
            </a>
          </div>
          <div>
            <p className="font-body font-bold uppercase text-[14px] leading-none mb-5">info ordini &amp; spedizioni</p>
            <a
              href="mailto:help@thewhataboutproject.it"
              className="font-body font-medium text-[20px] md:text-[36px] leading-none hover:opacity-70 transition-opacity break-all"
            >
              help@thewhataboutproject.it
            </a>
          </div>
        </div>

        <nav className="flex flex-col gap-3.5 font-body font-bold uppercase text-[14px] leading-none md:col-start-1 md:row-start-1">
          <Link href="/privacy" className="hover:opacity-70 transition-opacity">
            privacy &amp; cookie policy
          </Link>
          <Link href="/termini" className="hover:opacity-70 transition-opacity">
            termini e condizioni
          </Link>
          <Link href="/faq" className="hover:opacity-70 transition-opacity">
            domande frequenti
          </Link>
        </nav>
      </div>

      {/* Riga finale: logo Elle Lab + indirizzo, copyright (+ social su desktop) */}
      <div className="mt-[80px] md:mt-[100px] px-5 md:px-0 grid grid-cols-1 md:grid-cols-[591fr_769fr] gap-10 md:gap-0 font-body text-[14px] leading-none">
        <div className="flex flex-col items-start gap-6 md:gap-3">
          <Image src="/logo/ellelab-logo-white.svg" alt="Elle Lab" width={134} height={14} className="h-3.5 w-auto" />
          <span>Via Bernardo Rucellai, 12 - 20126 Milano MI</span>
        </div>
        <div className="flex items-end justify-between gap-5">
          <p>Copyright 2026 What About</p>
          <SocialLinks className="hidden md:flex" iconClassName="w-12 h-12" />
        </div>
      </div>
    </footer>
  );
}
