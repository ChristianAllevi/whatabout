"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import { formatMoney } from "@/lib/shopify/format";
import { DELIVERY_LABEL, SHOP_CONFIG } from "@/lib/shop-config";

export default function CartDrawer() {
  const { cart, isOpen, closeCart, pending, message, setLineQuantity, removeLine } = useCart();
  const lines = cart?.lines ?? [];

  return (
    <>
      {/* Sfondo scuro */}
      <div
        onClick={closeCart}
        aria-hidden="true"
        className={`fixed inset-0 z-[60] bg-primary-dark/50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Carrello"
        aria-hidden={!isOpen}
        inert={!isOpen}
        className={`fixed top-0 right-0 z-[70] h-dvh w-full sm:w-[440px] bg-bg-light text-primary-dark flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 pt-6 pb-4">
          <h2 className="wa-h60 !text-[32px]">il tuo carrello</h2>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Chiudi il carrello"
            className="p-3 bg-primary rounded-btn"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M2 2l14 14M16 2L2 16" stroke="#FFF8E6" strokeWidth="2.4" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6">
          {lines.length === 0 ? (
            <div className="pt-10">
              <p className="font-body font-light text-[16px] leading-5">Il carrello è vuoto.</p>
              <Link href="/shop" onClick={closeCart} className="wa-btn-pink mt-6">
                vai allo shop
              </Link>
            </div>
          ) : (
            <ul className="flex flex-col gap-5 py-2">
              {lines.map((line) => {
                const atMax = line.maxQuantity !== null && line.quantity >= line.maxQuantity;
                return (
                  <li key={line.id} className="flex gap-4">
                    <Link
                      href={`/shop/${line.handle}`}
                      onClick={closeCart}
                      className="relative w-[88px] h-[88px] shrink-0 overflow-hidden rounded-[2px] bg-white"
                    >
                      {line.image && (
                        <Image
                          src={line.image.url}
                          alt={line.image.altText ?? line.title}
                          fill
                          sizes="88px"
                          className="object-cover"
                        />
                      )}
                    </Link>

                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/shop/${line.handle}`}
                        onClick={closeCart}
                        className="font-body font-bold text-[15px] leading-tight block"
                      >
                        {line.title}
                      </Link>
                      <p className="font-body text-[14px] mt-1 flex flex-wrap items-baseline gap-x-2">
                        {line.unitCompareAt && (
                          <span className="line-through opacity-60">{formatMoney(line.unitCompareAt)}</span>
                        )}
                        <span className="text-accent font-bold">{formatMoney(line.unitPrice)}</span>
                      </p>
                      <p className="font-body text-[12px] mt-1 opacity-80">Preordine · {DELIVERY_LABEL.toLowerCase()}</p>

                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center border border-primary-dark/30 rounded-[2px]">
                          <button
                            type="button"
                            disabled={pending}
                            onClick={() => setLineQuantity(line.id, line.quantity - 1)}
                            aria-label="Diminuisci la quantità"
                            className="w-8 h-8 font-body font-bold disabled:opacity-40"
                          >
                            −
                          </button>
                          <span className="w-8 text-center font-body font-bold text-[14px]">{line.quantity}</span>
                          <button
                            type="button"
                            disabled={pending || atMax}
                            onClick={() => setLineQuantity(line.id, line.quantity + 1)}
                            aria-label="Aumenta la quantità"
                            className="w-8 h-8 font-body font-bold disabled:opacity-40"
                          >
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          disabled={pending}
                          onClick={() => removeLine(line.id)}
                          className="font-body text-[13px] underline disabled:opacity-40"
                        >
                          rimuovi
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {lines.length > 0 && cart && (
          <div className="px-6 pt-4 pb-6 border-t border-primary-dark/15">
            {message && (
              <p role="status" className="mb-3 font-body text-[13px] text-accent font-bold">
                {message}
              </p>
            )}
            <div className="flex items-baseline justify-between font-body">
              <span className="font-bold uppercase text-[14px]">Subtotale</span>
              <span className="font-bold text-[18px]">{formatMoney(cart.subtotal)}</span>
            </div>
            <p className="mt-2 font-body text-[12px] leading-4 opacity-80">
              Stai acquistando in preordine: le spedizioni inizieranno entro il{" "}
              {SHOP_CONFIG.deliveryDate.toLowerCase()}. La spedizione verrà calcolata al checkout.{" "}
              {SHOP_CONFIG.pickupNote}
            </p>
            <a href={cart.checkoutUrl} className="wa-btn-pink mt-4 w-full">
              procedi al checkout
            </a>
          </div>
        )}
      </aside>
    </>
  );
}
