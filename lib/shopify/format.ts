import { SHOP_CONFIG } from "@/lib/shop-config";
import type { Money, ProductVariant } from "./types";

export function formatMoney(m: Money): string {
  return new Intl.NumberFormat("it-IT", { style: "currency", currency: m.currencyCode }).format(m.amount);
}

export function discountPercent(price: Money, compareAt: Money | null): number | null {
  if (!compareAt || compareAt.amount <= price.amount) return null;
  return Math.round((1 - price.amount / compareAt.amount) * 100);
}

export type Availability = {
  label: string;
  soldOut: boolean;
  // Quantità massima acquistabile (null = non nota)
  max: number | null;
};

export function getAvailability(v: ProductVariant | null): Availability {
  if (!v) return { label: "Non disponibile", soldOut: true, max: 0 };

  const qty = v.quantityAvailable;
  if (!v.availableForSale || (qty !== null && qty <= 0)) {
    return { label: "Esaurito", soldOut: true, max: 0 };
  }
  if (qty === null) return { label: "Disponibile", soldOut: false, max: null };

  const low = qty <= SHOP_CONFIG.lowStockThreshold;
  return {
    label: low ? `Ultimi ${qty} pezzi` : `Ne restano ${qty}`,
    soldOut: false,
    max: qty,
  };
}
