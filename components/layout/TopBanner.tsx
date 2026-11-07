import Link from "next/link";

export default function TopBanner() {
  return (
    <div className="h-11 flex items-center justify-center bg-accent px-4 text-center">
      <p className="font-body font-bold uppercase text-bg-light text-[12px] md:text-[16px] leading-none">
        <Link href="/what-about-tower#preordina" className="hover:opacity-80 transition-opacity">
          preordina ora The What About Tower: prossima release: 21 novembre
        </Link>
      </p>
    </div>
  );
}
