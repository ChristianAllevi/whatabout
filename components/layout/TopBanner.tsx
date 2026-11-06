"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TopBanner() {
  const pathname = usePathname();
  const isTower = pathname === "/what-about-tower";

  return (
    <div className="h-11 flex items-center justify-center bg-accent px-4 text-center">
      {isTower ? (
        <p className="font-body font-bold uppercase text-bg-light text-[12px] md:text-[16px] leading-none">
          <Link href="#preordina" className="hover:opacity-80 transition-opacity">
            preordina ora the whatabout tower: prossima release: 21 novembre
          </Link>
        </p>
      ) : (
        <p className="font-body uppercase text-bg-light text-[12px] md:text-[16px] leading-none">
          <span className="font-bold">the what about tower</span>{" "}
          il nostro primo prodotto in pre vendita dal 21 novembre{" "}
          <Link href="/what-about-tower" className="font-bold hover:opacity-80 transition-opacity">
            iscriviti alla waiting list
          </Link>
        </p>
      )}
    </div>
  );
}
