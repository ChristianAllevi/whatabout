// Impostazioni dello shop modificabili a mano a ogni release.

export const SHOP_CONFIG = {
  // Data indicativa di consegna dei preordini: cambia qui a ogni release.
  deliveryDate: "15 Dicembre",
  // Nota mostrata accanto alla consegna (carrello e pagine prodotto).
  pickupNote: "Possibilità di ritiro gratuito presso la sede di Elle Lab, a Milano.",
  // Sotto questa soglia mostriamo "Ultimi N pezzi" invece di "Ne restano N".
  lowStockThreshold: 5,
} as const;

export const DELIVERY_LABEL = `Inizio spedizioni entro il ${SHOP_CONFIG.deliveryDate}`;

// Messaggio mostrato nel banner "preordine" delle card (hover su desktop, tap su mobile).
export const PREORDER_INFO = `Questo prodotto è in preordine: significa che andremo in produzione solo con il numero di pezzi che verranno preordinati. Quindi le spedizioni non saranno immediate, inizieranno entro il ${SHOP_CONFIG.deliveryDate.toLowerCase()}. Ti aggiorneremo via email per ogni novità riguardante il tuo preordine.`;

// Titolo prodotto su due righe: "What About Tower" + nome edizione (es. "Set Famiglia").
// Divide su separatori come "-", "–", ":" oppure subito dopo "What About Tower".
export function splitProductTitle(title: string): [string, string] {
  const sep = title.split(/\s+[-–—:|]\s+|:\s*/);
  if (sep.length > 1) return [sep[0].trim(), sep.slice(1).join(" ").trim()];
  const m = title.match(/^(what about tower)\s+(.+)$/i);
  if (m) return [m[1], m[2]];
  return [title, ""];
}

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
