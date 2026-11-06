import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-bg-dark border-t border-white/10">
      {/* Main footer content */}
      <div className="wa-section my-0 py-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Col 1: Navigazione + legale */}
          <div>
            <p
              className="text-bg-light/40 uppercase mb-4"
              style={{ fontFamily: "Funnel Display", fontWeight: 700, fontSize: "11px", letterSpacing: "0.14em" }}
            >
              Navigazione
            </p>
            <nav className="flex flex-col gap-2">
              {[
                { label: "Il Progetto", href: "/progetto" },
                { label: "The Whatabout Tower", href: "/tower" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-bg-light/70 hover:text-bg-light transition-colors uppercase"
                  style={{ fontFamily: "DX Playhigh Expanded", fontSize: "14px" }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="mt-8 flex flex-col gap-2">
              {[
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Termini e Condizioni", href: "/termini" },
                { label: "FAQ", href: "/faq" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-bg-light/40 hover:text-bg-light/70 transition-colors"
                  style={{ fontFamily: "Funnel Display", fontWeight: 400, fontSize: "12px" }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Col 2: Collaborazioni */}
          <div>
            <p
              className="text-bg-light/40 uppercase mb-4"
              style={{ fontFamily: "Funnel Display", fontWeight: 700, fontSize: "11px", letterSpacing: "0.14em" }}
            >
              Collaborazioni
            </p>
            <p className="text-bg-light/60 mb-2" style={{ fontFamily: "Funnel Display", fontWeight: 300, fontSize: "13px" }}>
              Per collaborazioni, press e partnership:
            </p>
            <a
              href="mailto:ciao@ellelab.it"
              className="text-bg-light hover:text-primary-light transition-colors"
              style={{ fontFamily: "DX Playhigh Expanded", fontSize: "14px" }}
            >
              ciao@ellelab.it
            </a>
          </div>

          {/* Col 3: Ordini */}
          <div>
            <p
              className="text-bg-light/40 uppercase mb-4"
              style={{ fontFamily: "Funnel Display", fontWeight: 700, fontSize: "11px", letterSpacing: "0.14em" }}
            >
              Ordini & Assistenza
            </p>
            <p className="text-bg-light/60 mb-2" style={{ fontFamily: "Funnel Display", fontWeight: 300, fontSize: "13px" }}>
              Per domande su ordini e spedizioni:
            </p>
            <a
              href="mailto:ordini@ellelab.it"
              className="text-bg-light hover:text-primary-light transition-colors"
              style={{ fontFamily: "DX Playhigh Expanded", fontSize: "14px" }}
            >
              ordini@ellelab.it
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 px-5 md:px-16 py-5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <Image
            src="/logo/logo-light.svg"
            alt="What About"
            width={100}
            height={18}
            className="opacity-30"
          />

          {/* Address */}
          <p
            className="text-bg-light/30 text-center"
            style={{ fontFamily: "Funnel Display", fontWeight: 300, fontSize: "11px" }}
          >
            Elle Lab — Via Emilio Faà di Bruno 7, 20149 Milano — P.IVA IT12345678901
          </p>

          {/* Copyright */}
          <p
            className="text-bg-light/30"
            style={{ fontFamily: "Funnel Display", fontWeight: 300, fontSize: "11px" }}
          >
            © 2025 What About. Tutti i diritti riservati.
          </p>
        </div>
      </div>
    </footer>
  );
}
