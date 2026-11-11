"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  addToCartAction,
  getCartAction,
  updateCartLineAction,
} from "@/lib/shopify/cart-actions";
import type { Cart, CartResult } from "@/lib/shopify/types";

// Nel browser conserviamo solo l'ID del carrello; il resto vive su Shopify.
const STORAGE_KEY = "wa_cart_id";

function readStoredId(): string | null {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}
function writeStoredId(id: string | null) {
  try {
    if (id) window.localStorage.setItem(STORAGE_KEY, id);
    else window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* storage non disponibile (es. navigazione privata): il carrello vale solo per la sessione */
  }
}

type CartContextValue = {
  cart: Cart | null;
  count: number;
  isOpen: boolean;
  pending: boolean;
  message: string | null;
  openCart: () => void;
  closeCart: () => void;
  addItem: (variantId: string, quantity?: number) => Promise<void>;
  setLineQuantity: (lineId: string, quantity: number) => Promise<void>;
  removeLine: (lineId: string) => Promise<void>;
};

const CartContext = createContext<CartContextValue | null>(null);

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart va usato dentro <CartProvider>");
  return ctx;
}

export default function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const apply = useCallback((r: CartResult) => {
    if (r.expired) {
      setCart(null);
      writeStoredId(null);
    } else if (r.cart) {
      // Un carrello vuoto non serve più: la prossima aggiunta ne crea uno nuovo
      const hasItems = r.cart.totalQuantity > 0;
      setCart(hasItems ? r.cart : null);
      writeStoredId(hasItems ? r.cart.id : null);
    }
    setMessage(r.message ?? null);
  }, []);

  // Al caricamento ripristina il carrello salvato
  useEffect(() => {
    const id = readStoredId();
    if (!id) return;
    let cancelled = false;
    getCartAction(id).then((r) => {
      if (!cancelled) apply(r);
    });
    return () => {
      cancelled = true;
    };
  }, [apply]);

  // Blocca lo scroll della pagina e chiude con Esc mentre il drawer è aperto
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  const addItem = useCallback(
    async (variantId: string, quantity = 1) => {
      setPending(true);
      setMessage(null);
      const r = await addToCartAction(cart?.id ?? readStoredId(), variantId, quantity);
      apply(r);
      setPending(false);
      setIsOpen(true);
    },
    [cart, apply]
  );

  const setLineQuantity = useCallback(
    async (lineId: string, quantity: number) => {
      if (!cart) return;
      setPending(true);
      setMessage(null);
      apply(await updateCartLineAction(cart.id, lineId, quantity));
      setPending(false);
    },
    [cart, apply]
  );

  const removeLine = useCallback((lineId: string) => setLineQuantity(lineId, 0), [setLineQuantity]);

  const value = useMemo<CartContextValue>(
    () => ({
      cart,
      count: cart?.totalQuantity ?? 0,
      isOpen,
      pending,
      message,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      addItem,
      setLineQuantity,
      removeLine,
    }),
    [cart, isOpen, pending, message, addItem, setLineQuantity, removeLine]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
