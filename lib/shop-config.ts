// Impostazioni dello shop modificabili a mano a ogni release.

export const SHOP_CONFIG = {
  // Data indicativa di consegna dei preordini: cambia qui a ogni release.
  deliveryDate: "21 dicembre",
  // Nota mostrata accanto alla consegna (carrello e pagine prodotto).
  pickupNote: "Ritiro gratuito in sede disponibile dopo la data di consegna.",
  // Sotto questa soglia mostriamo "Ultimi N pezzi" invece di "Ne restano N".
  lowStockThreshold: 5,
} as const;

export const DELIVERY_LABEL = `Consegna prevista entro il ${SHOP_CONFIG.deliveryDate}`;

// Colore di sfondo delle card per edizione (stessi colori delle card della pagina Tower).
// Il colore si ricava da titolo, handle o tag del prodotto in Shopify.
const EDITION_COLORS: { keywords: string[]; color: string }[] = [
  { keywords: ["bundle"], color: "#FFF8E6" },
  { keywords: ["amicizia", "friendship"], color: "#B4C2FF" },
  { keywords: ["famiglia", "family"], color: "#5FF4D4" },
  { keywords: ["amore", "lovers"], color: "#FFCAEC" },
];

export function editionColor(product: { title: string; handle: string; tags: string[] }): string {
  const haystack = `${product.title} ${product.handle} ${product.tags.join(" ")}`.toLowerCase();
  return EDITION_COLORS.find((e) => e.keywords.some((k) => haystack.includes(k)))?.color ?? "#FFF8E6";
}
