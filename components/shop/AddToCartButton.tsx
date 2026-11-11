"use client";

import { useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import type { Availability } from "@/lib/shopify/format";

// Pulsante "Aggiungi al carrello". Con showQuantity mostra anche il selettore di quantità.
export default function AddToCartButton({
  variantId,
  availability,
  showQuantity = false,
  className = "",
}: {
  variantId: string | null;
  availability: Availability;
  showQuantity?: boolean;
  className?: string;
}) {
  const { addItem, pending } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [busy, setBusy] = useState(false);

  const disabled = !variantId || availability.soldOut;
  const max = availability.max ?? 10;

  async function handleClick() {
    if (!variantId) return;
    setBusy(true);
    await addItem(variantId, quantity);
    setBusy(false);
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {showQuantity && !disabled && (
        <div className="flex items-center border border-primary-dark/30 rounded-[2px] h-[44px]">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            aria-label="Diminuisci la quantità"
            className="w-10 h-full font-body font-bold"
          >
            −
          </button>
          <span className="w-8 text-center font-body font-bold" aria-live="polite">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.min(max, q + 1))}
            disabled={quantity >= max}
            aria-label="Aumenta la quantità"
            className="w-10 h-full font-body font-bold disabled:opacity-40"
          >
            +
          </button>
        </div>
      )}

      <button
        type="button"
        onClick={handleClick}
        disabled={disabled || busy || pending}
        className={`wa-btn-pink flex-1 ${disabled ? "!bg-primary-dark/20 !text-primary-dark/60 cursor-not-allowed" : "cursor-pointer"} disabled:opacity-70`}
      >
        {disabled ? "esaurito" : busy ? "aggiungo…" : "aggiungi al carrello"}
      </button>
    </div>
  );
}
