"use client";

import { useCart } from "@/components/cart/CartProvider";

// Icona del carrello con cerchietto accent e numero bianco quando ci sono articoli.
export default function CartButton({
  className = "",
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  const { count, openCart } = useCart();

  return (
    <button
      type="button"
      onClick={() => {
        onClick?.();
        openCart();
      }}
      aria-label={count > 0 ? `Apri il carrello (${count} articoli)` : "Apri il carrello"}
      className={`relative bg-primary rounded-btn flex items-center justify-center ${className}`}
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M3 4h2.2l1.6 10.2a1.5 1.5 0 0 0 1.5 1.3h8.1a1.5 1.5 0 0 0 1.5-1.2L19.5 8H6"
          stroke="#FFF8E6"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="9.5" cy="19.5" r="1.4" fill="#FFF8E6" />
        <circle cx="16.5" cy="19.5" r="1.4" fill="#FFF8E6" />
      </svg>
      {count > 0 && (
        <span className="absolute -top-2 -right-2 min-w-[22px] h-[22px] px-1 rounded-full bg-accent text-white font-body font-bold text-[12px] leading-none flex items-center justify-center">
          {count}
        </span>
      )}
    </button>
  );
}
